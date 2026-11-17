# MIT License

import bpy

from .. import globs
from .. import updater
from .main import ToolPanel, layout_split, draw_section, draw_wiki_button
from ..tools import settings as Settings
from ..tools.register import register_wrap
from ..tools.translations import t, DownloadTranslations
from ..tools.fbx_export import ApplyFbxSettings, FbxPresetMenu, stored_preset_name

WIKI = 'UpdaterPanel.wikiURL'


@register_wrap
class UpdaterPanel(ToolPanel, bpy.types.Panel):
    bl_idname = 'VIEW3D_PT_updater_v3'
    bl_label = t('UpdaterPanel.label')
    bl_options = {'DEFAULT_CLOSED'}
    bl_order = 110

    def draw_header_preset(self, context):
        draw_wiki_button(self.layout, WIKI, pad=1.5)

    def draw(self, context):
        layout = self.layout
        box = layout.box()

        # Settings section
        settings_col = draw_section(box, t('UpdaterPanel.name'), globs.ICON_SETTINGS,
                                    WIKI, 'general-settings')

        settings_col.separator()

        # General settings
        row = settings_col.row(align=True)
        row.prop(context.scene, 'embed_textures')
        
        row = settings_col.row(align=True)
        row.prop(context.scene, 'remove_rigidbodies_joints_global')
        
        row = settings_col.row(align=True)
        row.prop(context.scene, "export_translate_csv")
        
        settings_col.separator(factor=0.5)
        lbl = settings_col.row(align=True)
        lbl.scale_y = 0.75
        lbl.label(text=t('Scene.customfoldershapekeycsv.label'))
        settings_col.prop(context.scene, "custom_translate_csv_export_dir", text="")

        settings_col.separator()

        # Quick Access section visibility
        qa_col = settings_col.column(align=True)
        qa_label = qa_col.row(align=True)
        qa_label.scale_y = 0.75
        qa_label.label(text=t('UpdaterPanel.quickAccessSections'), icon='OPTIONS')
        qa_col.prop(context.scene, 'qa_show_import')
        qa_col.prop(context.scene, 'qa_show_actions')
        qa_col.prop(context.scene, 'qa_show_fix_model')
        qa_col.prop(context.scene, 'qa_show_pose')

        settings_col.separator()

        # Optional GitHub token for the update check
        gh_col = settings_col.column(align=True)
        gh_label = gh_col.row(align=True)
        gh_label.scale_y = 0.75
        gh_label.label(text=t('UpdaterPanel.githubToken'), icon='URL')
        gh_col.prop(context.scene, 'github_token', text='')
        gh_warn = gh_col.column(align=True)
        gh_warn.scale_y = 0.7
        gh_warn.label(text=t('UpdaterPanel.githubTokenWarn1'), icon='INFO')
        gh_warn.label(text=t('UpdaterPanel.githubTokenWarn2'), icon='BLANK1')
        gh_warn.label(text=t('UpdaterPanel.githubTokenWarn3'), icon='BLANK1')

        # Shown after a check that had to fall back to an anonymous request.
        if updater.token_rejected:
            gh_rejected = gh_col.column(align=True)
            gh_rejected.scale_y = 0.7
            gh_rejected.label(text=t('UpdaterPanel.githubTokenRejected'), icon='ERROR')
            gh_rejected.label(text=t('UpdaterPanel.githubTokenRejected2'), icon='BLANK1')

        settings_col.separator()

        # Language settings
        lang_row = settings_col.row(align=True)
        lang_split = layout_split(lang_row, factor=0.56)
        lang_split.label(text=t('Scene.ui_lang.label') + ':')
        lang_split.prop(context.scene, 'ui_lang', text='')

        box.separator()

        # FBX export settings. Blender keeps the exporter's options in memory only, so
        # Cats stores a preset and writes it back after every restart.
        fbx_col = draw_section(box, t('FbxExport.section'), 'EXPORT')
        preset_row = fbx_col.row(align=True)
        preset_row.label(text=t('FbxExport.preset') + ':')
        preset_row.menu(FbxPresetMenu.bl_idname, text=stored_preset_name() or t('FbxExport.off'))
        preset_row.operator(ApplyFbxSettings.bl_idname, text='', icon='FILE_REFRESH')

        fbx_note = fbx_col.column(align=True)
        fbx_note.scale_y = 0.7
        fbx_note.label(text=t('FbxExport.note1'), icon='INFO')
        fbx_note.label(text=t('FbxExport.note2'), icon='BLANK1')

        # Dev branch options
        if globs.dev_branch:
            settings_col.separator()
            row = settings_col.row(align=True)
            row.operator(DownloadTranslations.bl_idname)

        settings_col.separator()

        # Debug options
        debug_col = draw_section(box, t('UpdaterPanel.debugSection'), 'CONSOLE',
                                 WIKI, 'debug-options')

        row = debug_col.row(align=True)
        row.scale_y = 0.75
        row.operator(Settings.ResetGoogleDictButton.bl_idname, icon='X')
        
        if globs.dev_branch:
            row = debug_col.row(align=True)
            row.scale_y = 0.75
            row.operator(Settings.DebugTranslations.bl_idname, icon='X')

        # Settings changed warning
        if Settings.settings_changed():
            warning_box = box.box()
            warning_col = warning_box.column(align=True)
            
            row = warning_col.row(align=True)
            row.scale_y = 0.75
            row.label(text=t('UpdaterPanel.requireRestart1'), icon='ERROR')
            
            row = warning_col.row(align=True)
            row.scale_y = 0.75
            row.label(text=t('UpdaterPanel.requireRestart2'), icon='BLANK1')
            
            row = warning_col.row(align=True)
            row.operator(Settings.RevertChangesButton.bl_idname, icon='RECOVER_LAST')

        # Updater section
        updater_box = box.box()
        updater.draw_updater_panel(context, updater_box)

