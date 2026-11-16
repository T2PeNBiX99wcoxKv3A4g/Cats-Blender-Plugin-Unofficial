# MIT License

"""Environment compatibility helpers.

Cats supports Blender 4.2 LTS and newer, and that range is not uniform:

* some operators and node types were removed between 4.2 and 5.4,
* some optional Python packages are expensive to import but are only needed by
  a single feature.

Version- and environment-dependent behaviour lives here, so feature code can
ask a question instead of hard-coding a version number.
"""

import importlib.util

import bpy


# --- Blender version ---------------------------------------------------------

def at_least(major, minor=0):
    """Whether the running Blender is at least ``major.minor``."""
    return bpy.app.version[:2] >= (major, minor)


def before(major, minor=0):
    """Whether the running Blender is older than ``major.minor``."""
    return bpy.app.version[:2] < (major, minor)


# Collada/DAE import and export (``bpy.ops.wm.collada_import`` and
# ``collada_export``) were removed in Blender 5.0.
HAS_COLLADA = before(5, 0)


# --- Deferred optional dependencies ------------------------------------------

_requests = None
_requests_resolved = False


def requests_available():
    """Whether ``requests`` can be imported, without importing it."""
    try:
        return importlib.util.find_spec("requests") is not None
    except (ImportError, ValueError):
        return False


def get_requests():
    """The ``requests`` module, or ``None`` when it is not installed.

    Resolved on first use: importing it pulls in urllib3, socket and ssl,
    which costs roughly 85 ms of add-on start-up time and is only needed by
    the online features.
    """
    global _requests, _requests_resolved
    if not _requests_resolved:
        _requests_resolved = True
        try:
            import requests as module
        except ImportError:
            _requests = None
        else:
            _requests = module
            # Blender's bundled urllib3 warns about the certificate setup on
            # some Linux distributions; Cats has always silenced that.
            try:
                module.packages.urllib3.disable_warnings(
                    module.packages.urllib3.exceptions.InsecureRequestWarning)
            except Exception:
                pass
    return _requests
