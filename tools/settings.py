# MIT License

import bpy
import base64
import collections
import copy
import ctypes
import json
import os
import pathlib
import time
from bpy.app.handlers import persistent
from collections import OrderedDict
from contextlib import contextmanager
from datetime import datetime, timezone

from . import translate as Translate
from . import translation_providers
from . import user_data
from .translations import t
from .. import globs
from ..tools.register import register_wrap

main_dir = pathlib.Path(os.path.dirname(__file__)).parent.resolve()
resources_dir = os.path.join(str(main_dir), "resources")
# Runtime settings live in the user data directory, not inside the (possibly
# read-only, update-wiped) extension package. LEGACY_SETTINGS_FILE is the old
# in-package location, kept only so existing settings can be migrated once.
LEGACY_SETTINGS_FILE = os.path.join(resources_dir, "settings.json")

settings_data = None
settings_data_unchanged = None
settings_timer_running = False
settings_timer_started_at = None

# Settings name = [Default Value, Require Blender Restart]
settings_default = OrderedDict()
settings_default['embed_textures'] = [False, False]
settings_default['ui_lang'] = ["auto", False]
# Translation backend selection + credentials. Stored globally (not per-blend)
# so API keys never end up inside a .blend file. See tools/translation_providers.py.
settings_default['translation_service'] = [translation_providers.SERVICE_GOOGLE, False]
settings_default['deepl_api_key'] = ["", False]
settings_default['libretranslate_url'] = ["https://libretranslate.com", False]
settings_default['libretranslate_api_key'] = ["", False]
settings_default['mymemory_email'] = ["", False]
# Optional GitHub token for the update check. Unauthenticated requests to the GitHub
# API are rate limited per IP, which a shared connection can exhaust.
# Blender has no encrypted secret storage, so this is kept in Cats' own settings file
# in plain text and should be a token with no scopes at all.
settings_default['github_token'] = ["", False]
# Quick Access section visibility, so unused tools can be hidden.
settings_default['qa_show_import'] = [True, False]
settings_default['qa_show_actions'] = [True, False]
settings_default['qa_show_fix_model'] = [True, False]
settings_default['qa_show_pose'] = [True, False]

CREDENTIAL_SETTINGS = ('deepl_api_key', 'libretranslate_url', 'libretranslate_api_key',
                       'mymemory_email', 'github_token')

# The subset above that is actually secret. libretranslate_url is a plain URL, so it is
# stored readably; encrypting it would only make settings.json harder to inspect.
SECRET_SETTINGS = ('deepl_api_key', 'libretranslate_api_key', 'mymemory_email',
                   'github_token')

lock_settings = False


# --- Protection of stored credentials ---------------------------------------
#
# Blender has no secret storage of its own, so the values above would otherwise sit in
# settings.json as plain text. On Windows they are encrypted with DPAPI, which ties the
# ciphertext to the current Windows account: another user on the same machine cannot
# decrypt it, and neither can the file after being copied to another machine.
#
# On other platforms a keyed obfuscation derived from the user and host name is used
# instead. It is not cryptography: it only keeps the value out of plain sight and makes
# settings.json unusable on another machine, so a copied credential has to be re-entered.
_SECRET_PREFIX = 'dpapi1:'   # Windows DPAPI, tied to the Windows account
_OBF_PREFIX = 'obf1:'        # keyed XOR, for platforms without an equivalent API

_dpapi_cache = None


def _dpapi():
    """Lazily bind CryptProtectData / CryptUnprotectData (Windows only)."""
    global _dpapi_cache
    if _dpapi_cache is not None:
        return _dpapi_cache

    from ctypes import wintypes

    class DataBlob(ctypes.Structure):
        _fields_ = [("cbData", wintypes.DWORD),
                    ("pbData", ctypes.POINTER(ctypes.c_char))]

    crypt32 = ctypes.WinDLL("crypt32", use_last_error=True)
    kernel32 = ctypes.WinDLL("kernel32", use_last_error=True)

    crypt32.CryptProtectData.argtypes = [
        ctypes.POINTER(DataBlob), wintypes.LPCWSTR, ctypes.POINTER(DataBlob),
        ctypes.c_void_p, ctypes.c_void_p, wintypes.DWORD, ctypes.POINTER(DataBlob)]
    crypt32.CryptProtectData.restype = wintypes.BOOL

    crypt32.CryptUnprotectData.argtypes = [
        ctypes.POINTER(DataBlob), ctypes.POINTER(wintypes.LPWSTR), ctypes.POINTER(DataBlob),
        ctypes.c_void_p, ctypes.c_void_p, wintypes.DWORD, ctypes.POINTER(DataBlob)]
    crypt32.CryptUnprotectData.restype = wintypes.BOOL

    kernel32.LocalFree.argtypes = [ctypes.c_void_p]
    kernel32.LocalFree.restype = ctypes.c_void_p

    _dpapi_cache = (DataBlob, crypt32, kernel32)
    return _dpapi_cache


def _blob(data):
    """Build a DATA_BLOB plus the buffer that has to stay alive while it is used."""
    DataBlob = _dpapi()[0]
    buffer = ctypes.create_string_buffer(data, len(data))
    return DataBlob(len(data), ctypes.cast(buffer, ctypes.POINTER(ctypes.c_char))), buffer


def _take_blob(blob):
    """Copy a DATA_BLOB's contents and free the memory the API allocated."""
    _, _, kernel32 = _dpapi()
    data = ctypes.string_at(blob.pbData, blob.cbData)
    kernel32.LocalFree(ctypes.cast(blob.pbData, ctypes.c_void_p))
    return data


def protect_secret(value):
    """Protect a credential for storage. Plain text is returned when that is impossible."""
    if not value or value.startswith((_SECRET_PREFIX, _OBF_PREFIX)):
        return value

    if os.name == 'nt':
        protected = _protect_dpapi(value)
        if protected is not None:
            return protected

    return _protect_obfuscated(value)


def unprotect_secret(value):
    """Read back a stored credential. Returns an empty string if it cannot be read."""
    if not value:
        return value
    if value.startswith(_SECRET_PREFIX):
        return _unprotect_dpapi(value)
    if value.startswith(_OBF_PREFIX):
        return _unprotect_obfuscated(value)
    return value


def _protect_dpapi(value):
    """DPAPI encryption, or None when it is unavailable/failed."""
    try:
        DataBlob, crypt32, _ = _dpapi()
        blob_in, _keep_alive = _blob(value.encode('utf-8'))
        blob_out = DataBlob()
        if not crypt32.CryptProtectData(ctypes.byref(blob_in), None, None, None, None,
                                        0, ctypes.byref(blob_out)):
            return None
        return _SECRET_PREFIX + base64.b64encode(_take_blob(blob_out)).decode('ascii')
    except Exception as e:
        print('CATS: DPAPI encryption unavailable, falling back to obfuscation:', e)
        return None


def _unprotect_dpapi(value):
    try:
        DataBlob, crypt32, _ = _dpapi()
        blob_in, _keep_alive = _blob(base64.b64decode(value[len(_SECRET_PREFIX):]))
        blob_out = DataBlob()
        if not crypt32.CryptUnprotectData(ctypes.byref(blob_in), None, None, None, None,
                                          0, ctypes.byref(blob_out)):
            print('CATS: a stored credential could not be decrypted (another Windows account?)')
            return ""
        return _take_blob(blob_out).decode('utf-8')
    except Exception as e:
        print('CATS: could not decrypt a stored credential:', e)
        return ""


def _obfuscation_key():
    """Key material for the fallback scheme: user + host + platform.

    This is deliberately not cryptography. It only makes settings.json unreadable at a
    glance and non-portable between machines. Losing either the user name or the host
    name means a stored credential cannot be recovered; it has to be entered again.
    """
    import getpass
    import hashlib
    import socket

    parts = []
    for getter in (getpass.getuser, socket.gethostname, lambda: os.name):
        try:
            parts.append(str(getter()))
        except Exception:
            pass

    return hashlib.sha256(('cats-blender-plugin|' + '|'.join(parts)).encode('utf-8')).digest()


def _xor_stream(key, data):
    import hashlib

    out = bytearray(len(data))
    for block_index in range(0, (len(data) + 31) // 32):
        block = hashlib.sha256(key + block_index.to_bytes(8, 'big')).digest()
        for offset, byte in enumerate(block):
            position = block_index * 32 + offset
            if position >= len(data):
                break
            out[position] = data[position] ^ byte
    return bytes(out)


def _protect_obfuscated(value):
    import hashlib

    key = _obfuscation_key()
    payload = value.encode('utf-8')
    tag = hashlib.sha256(key + b'tag' + payload).digest()[:8]
    return _OBF_PREFIX + base64.b64encode(_xor_stream(key, tag + payload)).decode('ascii')


def _unprotect_obfuscated(value):
    import hashlib

    try:
        key = _obfuscation_key()
        raw = _xor_stream(key, base64.b64decode(value[len(_OBF_PREFIX):]))
        tag, payload = raw[:8], raw[8:]
        if hashlib.sha256(key + b'tag' + payload).digest()[:8] != tag:
            print('CATS: a stored credential does not match this machine/user; re-enter it')
            return ""
        return payload.decode('utf-8')
    except Exception as e:
        print('CATS: could not read a stored credential:', e)
        return ""


@contextmanager
def settings_lock_context():
    global lock_settings
    lock_settings = True
    try:
        yield
    finally:
        lock_settings = False


@register_wrap
class RevertChangesButton(bpy.types.Operator):
    bl_idname = 'cats_settings.revert'
    bl_label = t('RevertChangesButton.label')
    bl_description = t('RevertChangesButton.desc')
    bl_options = {'INTERNAL'}

    def execute(self, context):
        for setting in settings_default.keys():
            if setting in CREDENTIAL_SETTINGS:
                # Stored behind get/set callbacks; they save themselves on change.
                continue
            setattr(bpy.context.scene, setting, settings_data_unchanged.get(setting))
        save_settings()
        self.report({'INFO'}, t('RevertChangesButton.success'))
        return {'FINISHED'}


@register_wrap
class ResetGoogleDictButton(bpy.types.Operator):
    bl_idname = 'cats_settings.reset_google_dict'
    bl_label = t('ResetGoogleDictButton.label')
    bl_description = t('ResetGoogleDictButton.desc')
    bl_options = {'INTERNAL'}

    def execute(self, context):
        Translate.reset_google_dict()
        Translate.load_translations()
        self.report({'INFO'}, t('ResetGoogleDictButton.resetInfo'))
        return {'FINISHED'}


@register_wrap
class DebugTranslations(bpy.types.Operator):
    bl_idname = 'cats_settings.debug_translations'
    bl_label = t('DebugTranslations.label')
    bl_description = t('DebugTranslations.desc')
    bl_options = {'INTERNAL'}

    def execute(self, context):
        bpy.context.scene.debug_translations = True
        provider = translation_providers.get_active_provider()
        try:
            if not provider.is_available():
                raise translation_providers.TranslationError("provider unavailable")
            provider.translate_text('猫')
        except Exception:
            bpy.context.scene.debug_translations = False
            self.report({'INFO'}, t('DebugTranslations.error'))
            return {'FINISHED'}

        bpy.context.scene.debug_translations = False
        self.report({'INFO'}, t('DebugTranslations.success'))
        return {'FINISHED'}


def load_settings():
    global settings_data, settings_data_unchanged

    user_data.migrate_legacy_file(LEGACY_SETTINGS_FILE, user_data.settings_file())

    try:
        with open(user_data.settings_file(), encoding="utf8") as file:
            settings_data = json.load(file, object_pairs_hook=collections.OrderedDict)
    except FileNotFoundError:
        print("SETTINGS FILE NOT FOUND!")
        reset_settings(full_reset=True)
        return
    except json.decoder.JSONDecodeError:
        print("ERROR FOUND IN SETTINGS FILE")
        reset_settings(full_reset=True)
        return

    if not settings_data:
        print("NO DATA IN SETTINGS FILE")
        reset_settings(full_reset=True)
        return

    to_reset_settings = []

    for setting in ['last_supporter_update']:
        if setting not in settings_data and setting not in to_reset_settings:
            to_reset_settings.append(setting)
            print('RESET SETTING', setting)

    for setting in settings_default.keys():
        if setting not in settings_data and setting not in to_reset_settings:
            to_reset_settings.append(setting)
            print('RESET SETTING', setting)

    utc_now = datetime.strptime(datetime.now(timezone.utc).strftime(globs.time_format), globs.time_format)
    for setting in ['last_supporter_update']:
        if setting not in to_reset_settings and settings_data.get(setting):
            try:
                timestamp = datetime.strptime(settings_data.get(setting), globs.time_format)
            except ValueError:
                to_reset_settings.append(setting)
                print('RESET TIME', setting)
                continue

            time_delta = (utc_now - timestamp).total_seconds()
            if time_delta < 0:
                to_reset_settings.append(setting)
                print('TIME', setting, 'IN FUTURE!', time_delta)

    if to_reset_settings:
        reset_settings(to_reset_settings=to_reset_settings)
        return

    # Older versions stored credentials as plain text; protect them in place.
    encrypt_stored_credentials()

    settings_data_unchanged = copy.deepcopy(settings_data)


def save_settings():
    try:
        with open(user_data.settings_file(ensure_dir=True), 'w', encoding="utf8") as outfile:
            json.dump(settings_data, outfile, ensure_ascii=False, indent=4)
    except OSError as e:
        print(f"CATS: could not save settings to {user_data.settings_file()}: {e}")


def reset_settings(full_reset=False, to_reset_settings=None):
    if not to_reset_settings:
        full_reset = True

    global settings_data, settings_data_unchanged

    if full_reset:
        settings_data = OrderedDict()
        settings_data['last_supporter_update'] = None

        for setting, value in settings_default.items():
            settings_data[setting] = value[0]

    else:
        for setting in to_reset_settings:
            if setting in settings_default.keys():
                settings_data[setting] = settings_default[setting][0]
            else:
                settings_data[setting] = None

    save_settings()

    settings_data_unchanged = copy.deepcopy(settings_data)
    print('SETTINGS RESET')


def start_apply_settings_timer():
    global settings_timer_running, settings_timer_started_at
    settings_timer_started_at = time.monotonic()
    settings_timer_running = True
    if not bpy.app.timers.is_registered(apply_settings_timer):
        bpy.app.timers.register(apply_settings_timer, first_interval=0.3)


def apply_settings_timer():
    global settings_timer_running
    if not settings_timer_running:
        return None

    if settings_timer_started_at and time.monotonic() - settings_timer_started_at > 5:
        release_lock()
        settings_timer_running = False
        return None

    with settings_lock_context():
        if apply_settings():
            settings_timer_running = False
            return None

    return 0.3


def release_lock():
    global lock_settings
    print("Settings lock timed out, releasing lock")
    lock_settings = False


def credential_accessors(setting):
    """get/set callbacks for a CREDENTIAL_SETTINGS scene property."""

    def getter(_self):
        if not settings_data:
            return settings_default[setting][0]
        return unprotect_secret(settings_data.get(setting) or "")

    def setter(_self, value):
        if settings_data is None:
            return
        if setting not in SECRET_SETTINGS:
            if settings_data.get(setting) == value:
                return
            settings_data[setting] = value
            save_settings()
            return
        # Compare the readable value: encryption is randomised, so the stored form
        # differs on every call even when the credential itself did not change.
        if unprotect_secret(settings_data.get(setting) or "") == value:
            return
        settings_data[setting] = protect_secret(value)
        save_settings()

    return getter, setter


def encrypt_stored_credentials():
    """Protect secrets still stored as plain text by older versions."""
    if settings_data is None:
        return False

    changed = False
    for setting in CREDENTIAL_SETTINGS:
        value = settings_data.get(setting)
        if not value or not isinstance(value, str):
            continue

        if setting not in SECRET_SETTINGS:
            # A URL is not a secret: undo protection from an earlier build.
            if value.startswith((_SECRET_PREFIX, _OBF_PREFIX)):
                settings_data[setting] = unprotect_secret(value)
                changed = True
            continue

        if value.startswith((_SECRET_PREFIX, _OBF_PREFIX)):
            continue
        protected = protect_secret(value)
        if protected != value:
            settings_data[setting] = protected
            changed = True

    if changed:
        save_settings()
        print('CATS: encrypted stored credentials')
    return changed


def purge_stored_credentials():
    """Remove credential values that older Cats versions stored inside the open .blend."""
    for scene in bpy.data.scenes:
        sys_props = scene.bl_system_properties_get()
        if sys_props is None:
            continue
        for setting in CREDENTIAL_SETTINGS:
            if setting in sys_props:
                del sys_props[setting]


def apply_settings():
    if not hasattr(bpy.context, 'scene'):
        return False

    try:
        purge_stored_credentials()
    except AttributeError:
        return False

    try:
        settings_to_reset = []
        for setting in settings_default.keys():
            if setting in CREDENTIAL_SETTINGS:
                continue
            try:
                setattr(bpy.context.scene, setting, settings_data.get(setting))
            except TypeError:
                settings_to_reset.append(setting)
        if settings_to_reset:
            reset_settings(to_reset_settings=settings_to_reset)
            print("RESET SETTING ON TIMER:", setting)
    except AttributeError:
        return False

    print('Settings applied successfully')
    return True


def stop_apply_settings_timer():
    global settings_timer_running

    print("Stopping settings timer...")
    settings_timer_running = False
    if bpy.app.timers.is_registered(apply_settings_timer):
        bpy.app.timers.unregister(apply_settings_timer)
    print("Settings timer stopped.")


@persistent
def apply_settings_on_load(_dummy):
    """Re-apply the user's global Cats settings after a .blend is opened."""
    if settings_data is None:
        return
    with settings_lock_context():
        apply_settings()


def register_load_post_handler():
    if apply_settings_on_load not in bpy.app.handlers.load_post:
        bpy.app.handlers.load_post.append(apply_settings_on_load)


def unregister_load_post_handler():
    if apply_settings_on_load in bpy.app.handlers.load_post:
        bpy.app.handlers.load_post.remove(apply_settings_on_load)


def settings_changed():
    for setting, value in settings_default.items():
        if setting in CREDENTIAL_SETTINGS:
            continue
        if value[1] and settings_data.get(setting) != settings_data_unchanged.get(setting):
            return True
    return False


def update_settings(self, context):
    update_settings_core(self, context)


def update_settings_core(self, context):
    print("update_settings_core function called")
    settings_changed_tmp = False
    if lock_settings:
        print("Settings are locked, returning")
        return settings_changed_tmp

    with settings_lock_context():
        for setting in settings_default.keys():
            if setting in CREDENTIAL_SETTINGS:
                # The scene value is the decrypted text, the stored value is the
                # protected blob; comparing them would rewrite the file forever.
                continue
            old = settings_data[setting]
            new = getattr(bpy.context.scene, setting)
            print(f"Checking setting: {setting}")
            print(f"Old value: {old}")
            print(f"New value: {new}")
            if old != new:
                print(f"Setting {setting} changed")
                settings_data[setting] = new
                settings_changed_tmp = True

        if settings_changed_tmp:
            print("Settings changed, saving settings")
            save_settings()
        else:
            print("No settings changed")

    return settings_changed_tmp


def get_embed_textures():
    return settings_data.get('embed_textures')


def get_ui_lang():
    return settings_data.get('ui_lang')


def get_translation_service():
    return settings_data.get('translation_service') if settings_data else None


def _read_credential(setting):
    """Readable value of a stored credential (the stored form may be encrypted)."""
    if not settings_data:
        return ""
    return unprotect_secret(settings_data.get(setting) or "")


def get_deepl_api_key():
    return _read_credential('deepl_api_key')


def get_libretranslate_url():
    return _read_credential('libretranslate_url')


def get_libretranslate_api_key():
    return _read_credential('libretranslate_api_key')


def get_mymemory_email():
    return _read_credential('mymemory_email')


def get_github_token():
    return _read_credential('github_token')


def get_quick_access_visibility():
    """Which Quick Access sections are shown, as booleans."""
    if not settings_data:
        return {'import': True, 'actions': True, 'fix_model': True, 'pose': True}
    return {
        'import': settings_data.get('qa_show_import', True),
        'actions': settings_data.get('qa_show_actions', True),
        'fix_model': settings_data.get('qa_show_fix_model', True),
        'pose': settings_data.get('qa_show_pose', True),
    }
