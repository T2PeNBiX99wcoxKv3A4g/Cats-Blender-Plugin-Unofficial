# Contributing

## Compatibility policy

Cats supports Blender 4.2 LTS and newer, but the code is written for the **newest**
supported Blender first.

1. **Base logic targets the newest supported Blender.** Write the modern API as if older
   versions did not exist.
2. **Older versions get a targeted shim, never a downgrade of shared code.** If 4.x
   cannot run the modern call, branch *that call* behind a capability flag in
   `tools/compat.py`. Do not replace a new API with an old equivalent everywhere.
3. **Version checks live in `tools/compat.py`** as named feature flags (`HAS_COLLADA`,
   `HAS_POSE_BONE_HIDE`) or helpers (`set_pose_bone_hidden()`). Feature code asks the
   flag; it does not call `bpy.app.version` itself.

The reason is maintenance. When Blender changes an API again, there is exactly one place
to revisit. Code that was quietly downgraded to an older API has no obvious place to
look and gives no hint that a newer API exists.

### Example

`PoseBone.hide` was added in Blender 5.0. Correct:

```python
# tools/compat.py
HAS_POSE_BONE_HIDE = at_least(5, 0)

def set_pose_bone_hidden(pose_bone, hidden):
    if HAS_POSE_BONE_HIDE:
        pose_bone.hide = hidden          # base logic, modern
    else:
        pose_bone.bone.hide = hidden     # shim for 4.2 - 4.5

# feature code
Compat.set_pose_bone_hidden(pb, False)
```

Wrong:

```python
pb.bone.hide = False   # works on every version today, but silently drops the newer API
                       # and there is now nothing to find when Blender changes it again
```

When a difference is only a context problem rather than a version problem, fix the
context instead of adding a flag. Example: `bpy.ops.object.hide_view_clear()` polls only
in Object Mode, so code that runs from Pose Mode uses the data API
(`obj.hide_set(False)`) — this is not version-dependent and needs no `compat` entry.

## Verifying a version difference

Do not guess from release notes. Check against real builds.

Operator existence and arguments:

```python
getattr(getattr(bpy.ops, namespace), operator).get_rna_type()   # properties, not hasattr
```

`hasattr(bpy.ops.x, "y")` always returns `True` in Blender; it only fails when called.

RNA properties (mesh, armature, material, pose bone...):

```python
"hide" in bpy.types.PoseBone.bl_rna.properties     # correct
hasattr(bpy.types.PoseBone, "hide")                # always False for RNA properties
```

Data values that differ between versions (Principled BSDF socket names, colour spaces,
render engine identifiers, icon names) can be dumped per build and diffed.

## Tested builds

Everything in `README.md` is verified against these builds:

| Blender | Build |
|---|---|
| 4.2 LTS | 4.2.23 |
| 4.5 LTS | 4.5.16 |
| 5.0 | 5.0.1 |
| 5.1 | 5.1.2 |
| 5.2 LTS | 5.2.4 |
| 5.3 | 5.3.0 |
| 5.4 | 5.4.0 alpha (daily build) |

Test with an isolated profile so an experiment cannot damage a real one:

```powershell
$env:BLENDER_USER_CONFIG = "<dir>\config"
$env:BLENDER_USER_SCRIPTS = "<dir>\scripts"
$env:BLENDER_USER_EXTENSIONS = "<dir>\extensions"
$env:BLENDER_USER_DATAFILES = "<dir>\datafiles"
```

Operators that poll for a 3D View (pose mode, export, most UI tools) cannot run under
`blender -b`; drive them from a GUI session with a timer that reports and quits.

## Vendored code

`mmd_tools_local/` is vendored from [MMD Tools](https://github.com/MMD-Blender/blender_mmd_tools).
Cats-specific patches to it must be added to `scripts/vendor_mmd_tools.py`
(`apply_local_patches`), otherwise the next vendoring run silently drops them.

## Release checklist

1. Bump `version` in `blender_manifest.toml` and `CATS_VERSION` in `__init__.py`. They
   must match.
2. Build: `blender --command extension build --source-dir . --output-dir dist`.
3. Install the built ZIP and run the feature checks on several supported versions.
4. Commit, then push a tag (`git push origin <version>`). The `Build extension` workflow
   publishes the tagged ZIP as a GitHub Release, which is what the built-in updater
   reads.
5. Write release notes: the updater shows them in the "show patchnotes" panel.
