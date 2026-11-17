# Quick Access

The **Quick Access** panel is the top panel and your starting point. It gathers the most common actions: quick mesh operations, import/export, **Fix MMD Model**, and pose mode.

## Panel layout (top to bottom)

1. **Update / version notices** (only shown when relevant)
2. **Quick Actions**  Combine Materials, Join All Meshes
3. **Import / Export**
4. **Armature selector** (shown when you have more than one armature)
5. **Fix MMD Model** (+ settings gear)
6. **Pose Mode**

---

## Quick Actions

Fast one-click operations, kept at the top:

- **Combine Materials** - merges materials with matching properties to reduce draw calls.
- **Join All Meshes** - combines all meshes into a single object (keeps materials, vertex groups and weights).

> ⚠ Join All Meshes is permanent, save first.

---

## Import Model

Imports a model with sensible settings for a VRChat workflow.

### Supported formats

- **MMD:** `.pmx`, `.pmd`
- **XNALara:** `.xps`, `.mesh`, `.ascii`
- **Source Engine:** `.smd`, `.qc`, `.vta`, `.dmx`
- **VRM:** `.vrm`
- **glTF / GLB:** `.gltf`, `.glb`
- **FBX:** `.fbx`
- **DAE:** `.dae` (Collada)
- **ZIP:** `.zip` (compressed model packages)

> Other formats may work, but the ones above are the ones we fully support.

**How to import:** click **Import Model**, pick your file, and import. Cats applies optimal settings automatically.

---

## Export Model

- **FBX for Unity** - exports with Unity/VRChat-friendly scale, rotation and armature settings.
- **Resonite (glTF)** - exports glTF 2.0 for Resonite.

**How to export:** click the relevant export button, choose a location, and save.

---

## Fix MMD Model

The **Fix MMD Model** button (with a **⚙ settings gear** beside it) lives here at the top for discoverability. It converts a **fresh** MMD/VRM import into a Unity/VRChat-ready rig.

> ⚠ **Only for freshly imported MMD / VRM models.** Do **not** run it on models already set up for Unity/VRChat, store-bought models, or your own custom builds. The same warning is shown right above the button in the panel.

> 🚫 **Ignore these warnings at your own risk.** If you run Fix MMD Model on anything other than a fresh MMD/VRM import, after all the warnings Cats and this wiki give you, that is entirely on you. **Do not open an issue about it** you will be pointed straight back to these warnings and it will be closed immediately.

Full details, including everything the button does and the settings behind the gear, are on the [Converters](Converters) page (Fix MMD Model also appears there, in the MMD Cleanup section).

---

## Pose Mode

Enter pose mode to manipulate your armature.

- **Start Pose Mode** - enters pose mode (the small button starts *without* resetting the current pose).
- While in pose mode:
  - **Stop Pose Mode** - (small button stops without resetting)
  - **Pose to Shape Key** - bakes the current pose into a new shape key (great for custom expressions)
  - **Apply as Rest Pose** - sets the current pose as the armature's rest pose

> ⚠ Apply as Rest Pose permanently changes the rest pose, save first.

---

## Typical workflow

1. **Import** your model.
2. If it's a fresh MMD/VRM import, run **Fix MMD Model**.
3. **Translate** names ([Translation](Translation)).
4. Optimize ([Optimization](Optimization)), set up [Eye Tracking](Eye-Tracking) and [Visemes](Visemes).
5. **Export** for your target platform.

---

**Related Pages:**
- [Converters](Converters) - Fix MMD Model details, Rigify/Valve/VRM conversions
- [Optimization](Optimization) - Reduce materials, bones and vertices
- [Merge & Attach](Merge-and-Attach) - Combine models
- [Settings](Settings) - Export and model-fix behaviour

---

**Last Updated:** July 28, 2026 |  **Plugin Version:** 5.3.1.0 | **Blender:** 5.2 and 5.3 (5.2 LTS recommended)
