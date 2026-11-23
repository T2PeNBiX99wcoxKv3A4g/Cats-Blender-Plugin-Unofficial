# MIT License
#
# Blender does not remember the FBX exporter's options: they live in the window manager
# for the current session, so every restart (and, depending on how the file was opened,
# every project) starts from the operator defaults again. The only built-in way to reuse
# them is an operator preset, which still has to be picked by hand in the export dialog.
#
# This module stores a chosen preset in Cats' user data and writes it into the exporter's
# last-used properties on startup and whenever a file is opened, so the export dialog is
# already configured. It also provides a button that opens the dialog with those values.

import ast
import json
import os
import re

import addon_utils
import bpy
from bpy.app.handlers import persistent

from . import user_data
from .register import register_wrap
from .translations import t

OPERATOR_ID = 'export_scene.fbx'
OPERATOR_MODULE = 'io_scene_fbx'

DEFAULT_PRESET = 'Cats default'

# Used when no Blender preset has been chosen. Matches a Unity/VRChat workflow: no leaf
# bones, no baked animation, all-scale, Y primary bone axis.
DEFAULT_VALUES = {
    'use_selection': False,
    'use_visible': False,
    'use_active_collection': False,
    'global_scale': 1.0,
    'apply_unit_scale': True,
    'apply_scale_options': 'FBX_SCALE_ALL',
    'use_space_transform': True,
    'bake_space_transform': False,
    'object_types': {'EMPTY', 'MESH', 'ARMATURE', 'OTHER'},
    'use_mesh_modifiers': False,
    'use_mesh_modifiers_render': True,
    'mesh_smooth_type': 'OFF',
    'colors_type': 'SRGB',
    'prioritize_active_color': False,
    'use_subsurf': False,
    'use_mesh_edges': False,
    'use_tspace': False,
    'use_triangles': False,
    'use_custom_props': False,
    'add_leaf_bones': False,
    'primary_bone_axis': 'Y',
    'secondary_bone_axis': 'X',
    'use_armature_deform_only': False,
    'armature_nodetype': 'NULL',
    'bake_anim': False,
    'bake_anim_use_all_bones': True,
    'bake_anim_use_nla_strips': True,
    'bake_anim_use_all_actions': True,
    'bake_anim_force_startend_keying': True,
    'bake_anim_step': 1.0,
    'bake_anim_simplify_factor': 1.0,
    'path_mode': 'AUTO',
    'embed_textures': False,
    'axis_forward': '-Z',
    'axis_up': 'Y',
}

# Presets are plain `op.attribute = value` lines. Only those lines are read, and only
# literals, so a preset file can never run code here.
_ASSIGNMENT = re.compile(r"^\s*op\.([A-Za-z_]\w*)\s*=\s*(.+?)\s*$")


def settings_file(ensure_dir=False):
    return user_data.user_data_path('fbx_export.json', ensure_dir=ensure_dir)


_cache = None


def load_file_settings():
    global _cache
    if _cache is not None:
        return dict(_cache)

    try:
        with open(settings_file(), encoding='utf8') as file:
            data = json.load(file)
    except (OSError, ValueError):
        data = {}
    _cache = data if isinstance(data, dict) else {}
    return dict(_cache)


def save_file_settings(**changes):
    global _cache
    data = load_file_settings()
    data.update(changes)
    try:
        with open(settings_file(ensure_dir=True), 'w', encoding='utf8') as file:
            json.dump(data, file, ensure_ascii=False, indent=4)
    except OSError as e:
        print('CATS: could not save the FBX export settings:', e)
        return False
    _cache = data
    return True


def preset_directory():
    try:
        return bpy.utils.user_resource('SCRIPTS', path='presets/operator/' + OPERATOR_ID)
    except (AttributeError, TypeError):
        return ''


def available_presets():
    directory = preset_directory()
    if not directory or not os.path.isdir(directory):
        return []
    names = [os.path.splitext(name)[0] for name in os.listdir(directory)
             if name.endswith('.py')]
    return sorted(names, key=str.lower)


def preset_values(name):
    """Values of a preset, or None when it cannot be read."""
    if name == DEFAULT_PRESET:
        return dict(DEFAULT_VALUES)

    path = os.path.join(preset_directory(), name + '.py')
    try:
        with open(path, encoding='utf8') as file:
            source = file.read()
    except OSError as e:
        print(f'CATS: could not read the FBX preset {path}: {e}')
        return None

    values = {}
    for line in source.splitlines():
        match = _ASSIGNMENT.match(line)
        if not match:
            continue
        try:
            values[match.group(1)] = ast.literal_eval(match.group(2))
        except (ValueError, SyntaxError, MemoryError, RecursionError):
            continue
    return values or None


def stored_preset_name():
    """The selected preset, '' when applying is turned off."""
    data = load_file_settings()
    return data['preset'] if 'preset' in data else DEFAULT_PRESET


def operator_properties():
    """The exporter's last-used properties, or None when it is unavailable."""
    if not addon_utils.check(OPERATOR_MODULE)[1]:
        return None
    window_manager = getattr(bpy.context, 'window_manager', None)
    if window_manager is None:
        return None
    try:
        return window_manager.operator_properties_last(OPERATOR_ID)
    except (AttributeError, TypeError, RuntimeError) as e:
        print('CATS: the FBX exporter is not available:', e)
        return None


def apply_values(values):
    """Write values into the exporter's last-used properties. Unknown ones are skipped."""
    properties = operator_properties()
    if properties is None or not values:
        return 0

    applied = 0
    for name, value in values.items():
        prop = properties.bl_rna.properties.get(name)
        if prop is None or prop.is_readonly:
            continue
        try:
            if prop.type == 'ENUM' and prop.is_enum_flag:
                value = set(value)
            setattr(properties, name, value)
            applied += 1
        except (TypeError, ValueError, AttributeError) as e:
            print(f'CATS: could not set the FBX option {name}: {e}')
    return applied


def apply_stored():
    """Apply the stored preset. Returns the number of options that were set."""
    name = stored_preset_name()
    if not name:
        return 0
    values = preset_values(name)
    if not values:
        print(f'CATS: the FBX preset "{name}" is not readable, keeping the defaults')
        return 0
    return apply_values(values)


@persistent
def apply_on_load(_dummy=None):
    apply_stored()


def _apply_once():
    apply_stored()
    return None


def start_apply_timer():
    """Apply once Blender has finished starting up.

    Add-ons are registered while Blender is still enabling the built-in ones, so the
    export operator may not exist yet during register().
    """
    try:
        if bpy.app.timers.is_registered(_apply_once):
            bpy.app.timers.unregister(_apply_once)
        bpy.app.timers.register(_apply_once, first_interval=1.0)
    except (AttributeError, ValueError) as e:
        print('CATS: could not schedule the FBX settings:', e)


def stop_apply_timer():
    if bpy.app.timers.is_registered(_apply_once):
        bpy.app.timers.unregister(_apply_once)


def register_apply_on_load():
    if apply_on_load not in bpy.app.handlers.load_post:
        bpy.app.handlers.load_post.append(apply_on_load)


def unregister_apply_on_load():
    if apply_on_load in bpy.app.handlers.load_post:
        bpy.app.handlers.load_post.remove(apply_on_load)


def enable_exporter():
    """The exporter is built in but can be disabled in the preferences."""
    if addon_utils.check(OPERATOR_MODULE)[1]:
        return True
    try:
        addon_utils.enable(OPERATOR_MODULE)
    except (ImportError, AttributeError) as e:
        print('CATS: could not enable the FBX exporter:', e)
        return False
    return addon_utils.check(OPERATOR_MODULE)[1]


@register_wrap
class SetFbxPreset(bpy.types.Operator):
    bl_idname = 'cats_export.set_fbx_preset'
    bl_label = t('FbxExport.setPreset')
    bl_options = {'INTERNAL'}

    preset: bpy.props.StringProperty()

    def execute(self, context):
        save_file_settings(preset=self.preset)
        applied = apply_stored()
        if not self.preset:
            self.report({'INFO'}, t('FbxExport.offNow'))
        else:
            self.report({'INFO'}, t('FbxExport.applied', applied))
        return {'FINISHED'}


@register_wrap
class ApplyFbxSettings(bpy.types.Operator):
    bl_idname = 'cats_export.apply_fbx_settings'
    bl_label = t('FbxExport.apply')
    bl_description = t('FbxExport.applyDesc')
    bl_options = {'INTERNAL'}

    def execute(self, context):
        if not enable_exporter():
            self.report({'ERROR'}, t('FbxExport.noExporter'))
            return {'CANCELLED'}
        applied = apply_stored()
        self.report({'INFO'}, t('FbxExport.applied', applied))
        return {'FINISHED'}


@register_wrap
class ExportFbxWithPreset(bpy.types.Operator):
    bl_idname = 'cats_export.export_fbx'
    bl_label = t('FbxExport.exportButton')
    bl_description = t('FbxExport.exportDesc')
    bl_options = {'INTERNAL'}

    def execute(self, context):
        if not enable_exporter():
            self.report({'ERROR'}, t('FbxExport.noExporter'))
            return {'CANCELLED'}
        apply_stored()
        bpy.ops.export_scene.fbx('INVOKE_DEFAULT')
        return {'FINISHED'}


@register_wrap
class FbxPresetMenu(bpy.types.Menu):
    bl_idname = 'CATS_MT_fbx_preset_menu'
    bl_label = t('FbxExport.preset')

    def draw(self, context):
        layout = self.layout
        current = stored_preset_name()

        def entry(preset, text):
            row = layout.operator(SetFbxPreset.bl_idname, text=text,
                                  icon='CHECKMARK' if preset == current else 'BLANK1')
            row.preset = preset

        entry(DEFAULT_PRESET, t('FbxExport.defaultPreset'))
        for name in available_presets():
            entry(name, name)
        layout.separator()
        entry('', t('FbxExport.off'))
