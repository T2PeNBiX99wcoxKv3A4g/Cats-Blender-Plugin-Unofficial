# Converters

The **Converters** panel (formerly "MMD Options") is the home for tools that convert models from one rig/format to another, plus MMD-specific cleanup. It's where you prepare a freshly imported model for Unity/VRChat.

It contains three areas:

1. **Rigify conversion** - convert a Rigify/Metarig armature to a Cats-compatible one
2. **Platform conversion** - Source/Valve bone names and Koikatsu shape key fixes
3. **MMD Cleanup** - Fix MMD Model and rigid-body/joint removal

---

## Rigify → Cats

The **Convert Rigify to Cats** button is always visible, but is **greyed out until a Rigify or Metarig armature is active**. When Cats detects one, an info box appears and the button becomes available.

Fix MMD Model can't process a Rigify rig directly, so convert it first, then continue your normal workflow.

**Options:**
- **Merge Twist Bones** - fold Rigify's twist bones into their parents during conversion.

**How to use:**
1. Select your Rigify/Metarig armature.
2. When the button lights up, click **Convert Rigify to Cats**.
3. Continue with the rest of your workflow.

---

## Platform Conversion

### Convert Bones To Valve

Renames the armature's main bones to the **ValveBiped** convention used by the Source engine (Source Filmmaker, GMod, etc.), for example `hips` becomes `ValveBiped.Bip01_Pelvis`. Finger bones are renamed too, since the GMod conversion script needs them.

This only renames bones, it does not change the hierarchy or the rest pose.

**Requirements:** your model needs the CATS standard bone names first, so run **Fix MMD Model** before this.

**When to use:** exporting to Source Engine / Valve games.

> ⚠ **Check your right-side bones if you converted with an older Cats.**
>
> Older versions mapped seven short-form right-side names onto the **left** side, so bones called `R_Shoulder`, `R_Arm`, `R_Elbow`, `R_Wrist`, `R_Leg`, `R_Knee` or `R_Ankle` came out as `ValveBiped.Bip01_L_*`. Models using the spelled-out CATS names (`Right shoulder`, `Right arm`, …) were never affected.
>
> Re-run the converter on a **fresh copy** of the model to fix it. It can't repair an FBX you already exported, and re-running it on an armature that is already mis-named won't help either, because the ValveBiped names no longer match anything it looks for.

### Fix Koikatsu Shapekeys

Cleans up the split shape keys that **Koikatsu / Illusion** exports produce. Koikatsu spreads one expression across several keys (`eye_face.fXX` plus `eye_siroL`/`eye_line_u`, and `kuti_face.fXX` plus `kuti_ha`/`kuti_sita`), which makes them unusable on their own.

The tool merges each matching group into a single `eyes_XX` or `mouth_XX` shape key, caps the sliders at sensible maximums, and removes the originals it consumed.

**When to use:** on a freshly imported Koikatsu model, before setting up [visemes](Visemes).

---

## MMD Cleanup

### Fix MMD Model

This is the main tool for converting a fresh MMD/VRM model into a Unity/VRChat-ready rig.

> ⚠ **WARNING: Fix MMD Model is only for fresh MMD / VRM imports that have NOT been set up for Unity.**
>
> **DO NOT use it if:**
> - Your model was purchased from Booth, Gumroad or a similar store
> - Your model has already been set up for Unity/VRChat
> - You are building your own custom model from scratch
>
> Fix Model was never a "fix anything" button. it's a converter for specific import formats. The same warning is shown in [Quick Access](Quick-Access), where the button also lives.

> 🚫 **Ignore these warnings at your own risk.** If you run Fix MMD Model on anything other than a fresh MMD/VRM import, after all the warnings Cats and this wiki give you, that is entirely on you. **Do not open an issue about it** you will be pointed straight back to these warnings and it will be closed immediately.

> 💡 The **⚙ settings gear** next to the button opens **Model Settings** (keep end bones, keep twist bones, join meshes, connect bones, remove zero-weight, protected bones, etc.). See [Settings](Settings) for details.

#### What it does

1. **Reparents bones** - reorganizes the hierarchy for Unity
2. **Removes unnecessary bones** - strips MMD-specific/unused bones
3. **Renames & translates** - Japanese → English, standardized names ([Translation](Translation)). Since `5.2.4.0` shape keys and materials can use the **author's English names** from the PMX file; the shape-key setting is in ⚙ Model Settings
4. **Merges weight paints** - redistributes vertex weights
5. **Rotates hips** - corrects hip rotation for Unity
6. **Removes constraints** - clears MMD-specific constraints/IK
7. **Deletes unused vertex groups** - cleans empty weight groups
8. **Converts morphs to shape keys**

#### How to use

1. Import your fresh MMD or VRM model via [Quick Access](Quick-Access).
2. Select the armature.
3. Click **Fix MMD Model** (in Converters or Quick Access).
4. Wait for it to finish (complex models can take a minute).
5. Review the result.

### Remove Rigid Bodies and Joints

Removes MMD physics components (rigid bodies + joint constraints). VRChat uses Unity's physics, so MMD physics aren't compatible and should be removed.

**How to use:** select your model and click **Remove Rigid Bodies and Joints**.

**What it matches:** any object under your model whose name contains `rigidbodies` or `joints`, in any capitalisation — `Rigidbodies`, `RIGIDBODIES` and `rigidbodies` are all caught. Matching runs one and two levels below the model's top-level parent, and deleting a match takes its whole sub-tree with it, so nested physics groups go in one pass.

> 💡 **This is not the same as the global setting, and you still need it.** **Remove Rigidbodies + Joints** in [Settings](Settings) is on by default and runs whenever you press a Cats button, but it deletes whole *collections* named `rigidbody` — it does not look at joints, and it does not look at loose objects. This button works on *objects* parented under your model and does catch joints. Keep using it on MMD imports.

---

## Typical MMD → VRChat Workflow

1. **Import** your `.pmx`/`.pmd`/`.vrm` via [Quick Access](Quick-Access).
2. **Fix MMD Model** (Converters or Quick Access).
3. **Remove Rigid Bodies and Joints**.
4. **Combine Materials** and other cleanup ([Optimization](Optimization)).
5. **Optimize** - atlas, bone merging, remove doubles.
6. Set up [Eye Tracking](Eye-Tracking) and [Visemes](Visemes).
7. **Export** an FBX for Unity via [Quick Access](Quick-Access), and set up materials in Unity.

---

## Common Issues

**Model looks broken after Fix MMD Model** it was probably already Unity-ready. Undo (Ctrl+Z), re-import the original, and don't run Fix MMD Model on it.

**Bones have odd/English names** this is expected; names are translated and standardized for VRChat.

**Some materials are black** usually fine; set materials up in Unity. You can also try **Convert All to PNG** in [Optimization](Optimization).

**Model looks rotated in Blender** Blender and Unity use different coordinate systems; export handles this and it'll be correct in Unity.

---

## VRM Notes

VRM models generally need the same treatment as MMD models:
- Run **Fix MMD Model** on fresh VRM files (VRoid exports, etc.)
- Don't run Fix MMD Model on already-processed VRM models

There is no VRM-specific shape key tool. **Fix Koikatsu Shapekeys** is for Koikatsu exports only, see the note above.

Cats works alongside the **VRM Add-on for Blender** use it to import `.vrm`, then use Cats to process and optimize.

---

**Related Pages:**
- [Quick Access](Quick-Access) - Import/Export, and the other Fix MMD Model button
- [Optimization](Optimization) - Post-conversion optimization
- [Translation](Translation) - Name translation
- [Visemes](Visemes) / [Eye Tracking](Eye-Tracking) - Avatar feature setup

---

