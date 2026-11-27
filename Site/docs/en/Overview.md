> ℹ **These pages document the Cats Blender Plugin feature set.** They were written for the upstream release this fork continues from; this build supports Blender 4.2 LTS through 5.4.
>

# Cats Blender Plugin - Wiki {#cats-blender-plugin---wiki}

Welcome to the documentation for the **Cats Blender Plugin**, maintained as an unofficial community continuation.

Cats is a tool designed to shorten the steps needed to import and optimize models for VRChat and other platforms. It supports a wide range of formats including MMD, XNALara, Mixamo, Source Engine, VRM, glTF/GLB, FBX, DAE and more.

## Version Support {#version-support}

| | |
|---|---|
| **Supported Blender** | **4.2 LTS** through **5.4** |
| **Recommended** | **Blender 5.2 LTS** |


## Quick Links {#quick-links}

### Getting Started {#getting-started}
- [Installation](./Installation.md) - How to install Cats and its optional add-ons
- [Version Support](./Version-Support.md) - Supported and end-of-life versions

### Interface Guides {#interface-guides}
- [Quick Access](./Quick-Access.md) - Import/Export, **Fix MMD Model**, quick actions, and pose mode
- [Optimization](./Optimization.md) - Materials, mesh cleanup, shape keys, bones & weights, and the built-in atlas generator (alpha)
- [Converters](./Converters.md) - Rigify, Source/Valve, VRM, and MMD cleanup (formerly "MMD Options")
- [Merge & Attach](./Merge-and-Attach.md) - Merge armatures and attach meshes (formerly "Custom Model Creation")
- [Translation](./Translation.md) - The new multi-service translation system
- [Bone Tools](./Bone-Tools.md) - Digitigrade legs and twist bones
- [UV Tools](./UV-Tools.md) - Align UV edges and find the shortest seam path
- [Visemes](./Visemes.md) - Lip-sync setup
- [Eye Tracking](./Eye-Tracking.md) - Eye movement and blinking setup
- [Bone Parenting](./Bone-Parenting.md) - Root bone management
- [Scaling](./Scaling.md) - Built-in avatar rescaling, finger spreading and scale matching
- [Settings](./Settings.md) - Plugin configuration and updates

### Help & Support {#help-support}
- [Troubleshooting](./Troubleshooting.md) - Common issues and solutions
- [FAQ](./FAQ.md) - Frequently asked questions

## What's New in 5.3.1.0 {#whats-new-in-5310}

- **Blender 4.2 LTS and newer** - 4.2 LTS through 5.4 are supported. See [Version Support](./Version-Support.md).
- **Material Combiner removed** - the *Atlas Generator (Legacy)* panel is gone. The built-in tool is now simply **[Atlas Generator](./Optimization.md#atlas-generator)**; **Import Material Combiner Settings** still copies your old settings across if Material Combiner is installed.
- **Atlas fixes** - each build gets its own names, so atlassing a second avatar no longer overwrites the first one's atlas (and saving to a folder never overwrites existing PNGs). Flat-colour and tinted materials now come out in the right colours instead of too dark. Linked-duplicate meshes are no longer remapped twice, baked materials shared between objects keep every object's faces, baking always targets image textures (never your vertex colours) and a failed save to folder packs the atlas into the .blend instead of losing it. Large builds use much less memory and downscaled textures alias less.
- **API keys stay out of your .blend files** - DeepL / LibreTranslate keys, the LibreTranslate URL and the MyMemory email are only kept in Cats' own settings file, and keys saved into older files are removed when the file is opened. See [Translation](./Translation.md).
- **Language changes reload only Cats**, not every add-on, and a damaged or half-downloaded translation file no longer stops Cats from loading; it falls back to the bundled or English file.
- **Cats no longer changes your Blender preferences** when it loads, and your Cats settings are re-applied whenever you open a .blend.
- **Updates across Blender versions** - the updater now lists every release, not only ones made for your Blender version; Blender itself blocks anything your version can't run.
- **Fixes** - VMD motion import on Blender 5.x, scaler tools crashing on F9 redo, Remove Doubles damaging shape keys when run more than once in a session, and some panels and operators missing after a reload.
- The **Support Us** button was removed from the Credits panel.

## What's New in 5.2.4.0 {#whats-new-in-5240}

- **Built-in atlas tool (alpha)** - a new **[Atlas Generator (New)](./Optimization.md#atlas-generator)** sub-panel that atlases without Material Combiner or Pillow. Generates albedo plus optional normal, emission, roughness, metallic, AO and height maps from one layout, pads cells by edge-extending so mip levels don't bleed, and can bake procedural materials with Cycles. **Material Combiner stays the default** for now and is removed in the Blender 5.3 release.
- **MMD author English names** - the English names the model's author stored in the PMX file are now used when translating. Shape keys go dictionary → author name → online service, controlled by a new **Author Names** setting in [Translation](./Translation.md#author-names-mmd) (**Fill Gaps** / **Prefer Author Names** / **Off**) that Fix MMD Model mirrors; materials use them by default, toggleable. Bones and objects are unchanged. Fix MMD Model keeps the names before deleting the MMD root, and the translation CSV export gains a *source* column. Lightly tested, feedback wanted.
- **MMD Tools 4.5.14** bundled.
- Licence text corrected to MIT throughout.

## What's New in 5.2.3.0 {#whats-new-in-5230}

- **Reorganized interface** - the panels were restructured so tools live where you'd expect them. **Fix MMD Model** now sits at the top in [Quick Access](./Quick-Access.md); all format conversions moved into a single [Converters](./Converters.md) panel.
- **New translation system** - a pluggable [Translation](./Translation.md) backend lets you choose between the internal dictionary, Google, DeepL, LibreTranslate or MyMemory. The old bundled Google module is gone.
- **[UV Tools](./UV-Tools.md)** - a brand-new panel with *Align UV Edges to Target* and *Find Shortest Seam Path*.
- **[Bone Tools](./Bone-Tools.md)** - digitigrade legs and twist-bone generation now have their own home.
- **glTF / GLB import** and unified Rigify detection.
- **Blender 5.1 & 5.2** support (5.2 LTS recommended).

## Key Features {#key-features}

- **Model Import/Export** - MMD, XNALara, Source, VRM, glTF/GLB, FBX, DAE and more
- **Fix MMD Model** - one-click conversion of fresh MMD/VRM imports for Unity/VRChat
- **Optimization** - material combining, texture atlasing (built-in, no extra add-ons), bone merging, remove doubles
- **Converters** - Rigify → Cats, Source/Valve, VRM fixes, MMD cleanup
- **Merge & Attach** - combine armatures and attach meshes
- **Translation** - internal dictionary first, with optional online services to fill the gaps
- **Eye Tracking & Visemes** - automated setup for VRChat avatars
- **UV & Bone Tools** - targeted mesh/rig helpers

## Community & Support {#community-support}

- **Source & Releases:** [GitHub](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial)

> We no longer run a Discord server or website. All support, bug reports and discussion happen on the Git repository above.

## Contributing {#contributing}

We welcome contributions! If you'd like to help improve Cats, feel free to open a pull request on the [repository](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial).

---

