# Frequently Asked Questions (FAQ) {#frequently-asked-questions-faq}

Common questions about Cats Blender Plugin for Blender 4.2 LTS through 5.4.

## General Questions {#general-questions}

### What is Cats Blender Plugin? {#what-is-cats-blender-plugin}

Cats is a tool designed to shorten the steps needed to import and optimize models for VRChat. It supports various model formats including MMD, XNALara, Source Engine, VRM, and more.

### Is this the official Cats plugin? {#is-this-the-official-cats-plugin}

This is the **Unofficial Cats Plugin**, maintained by the community. The original official Cats plugin has been abandoned since 2022. This version continues active development with support for modern Blender versions.

For more information, see [What is the status of Official Cats?](#what-is-the-status-of-official-cats)

### What Blender version do I need? {#what-blender-version-do-i-need}

Cats requires **Blender 4.2 LTS or newer**; 4.2 LTS through 5.4 are supported. Blender 4.1 and older cannot load the extension. See [Version Support](./Version-Support.md) for details.

We also only support the steam version and the blender.org version. Windows Store, Linux Package managers version of blender, snap store and the flatpack version are not supported.

### Is Cats free? {#is-cats-free}

Yes, Cats is completely free and open source under the MIT License.

### Where can I download Cats? {#where-can-i-download-cats}

- **Repository & Releases:** [GitHub](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/releases)

---

## Installation Questions {#installation-questions}

### How do I install Cats? {#how-do-i-install-cats}

See the complete [Installation](./Installation.md) guide. Quick version:
1. Download the ZIP file (don't extract)
2. Open Blender 5.2+
3. Edit > Preferences > Extensions
4. Install from Disk
5. Select the ZIP file
6. Enable the extension

### Do I need to restart Blender after installation? {#do-i-need-to-restart-blender-after-installation}

Yes, it's recommended to restart Blender after installing or updating Cats for best results.

### Can I have multiple versions of Cats installed? {#can-i-have-multiple-versions-of-cats-installed}

No, only install one version of Cats. Remove old versions before installing new ones.

### Where are my settings saved? {#where-are-my-settings-saved}

Settings are stored in Cats' own user data folder, not in your `.blend` files, so they survive Cats updates. See [Settings](./Settings.md#settings-file-location) for exact locations.

---

## Compatibility Questions {#compatibility-questions}

### Does Cats work on Blender 4.x? {#does-cats-work-on-blender-4x}

Cats works on Blender 4.2 LTS through 5.4. Blender 4.1 and older cannot load the extension, and there is no alternative build for them.

### Can I open Blender 5.2 / 5.3 files in older Blender versions? {#can-i-open-blender-52-53-files-in-older-blender-versions}

Not recommended. Files saved in Blender 5.2 / 5.3 may not open correctly in older versions, potentially causing data loss or crashes.

### What model formats does Cats support? {#what-model-formats-does-cats-support}

**Import formats:**
- MMD: `.pmx`, `.pmd`
- XNALara: `.xps`, `.mesh`, `.ascii`
- Source Engine: `.smd`, `.qc`, `.vta`, `.dmx`
- VRM: `.vrm`
- FBX: `.fbx`
- Collada: `.dae`
- ZIP archives containing models

**Export formats:**
- FBX (for Unity/VRChat)
- GLTF (for Resonite)

---

## Feature Questions {#feature-questions}

### Can I see Pose Mode? {#can-i-see-pose-mode}

Pose Mode appears in the [Quick Access](./Quick-Access.md) panel only when:
- You have a model imported
- The model has a valid armature

Import a model first, then Pose Mode options will appear.

### Why can't I use the Atlas feature? {#why-cant-i-use-the-atlas-feature}

The [Atlas Generator](./Optimization.md#atlas-generator) is built into Cats and needs nothing installed. It is still marked **alpha**: it works, but check the result before exporting.

The old **Atlas Generator (Legacy)** panel, which needed the Shotariya Material Combiner add-on, was **removed in `5.3.1.0`**. If you are looking for it, use the Atlas Generator instead; with Material Combiner still installed, its **Import Material Combiner Settings** button copies your old settings across.

### Why can't I use the Scaling feature? {#why-cant-i-use-the-scaling-feature}

Scaling is built into Cats and doesn't need Immersive Scaler or any other add-on any more. If the buttons are greyed out, Cats can't find an armature: select your avatar's armature in the Cats armature dropdown, or make it the active object. See [Scaling](./Scaling.md#common-scale-issues).

### Should I use Fix MMD Model on my Booth avatar? {#should-i-use-fix-mmd-model-on-my-booth-avatar}

**NO!** Fix MMD Model should **ONLY** be used on fresh, unprocessed MMD/VRM files. Do NOT use it on:
- Store-bought models (Booth, Gumroad, etc.)
- Models already set up for Unity
- Custom models you're creating

See [Converters](./Converters.md) for details.

---

## Workflow Questions {#workflow-questions}

### What order should I do things in? {#what-order-should-i-do-things-in}

Recommended workflow:

1. **Import** model
2. **Fix MMD Model** (if fresh MMD/VRM only)
3. **Translate** names to English
4. **Apply transformations** if needed
5. **Scale** to correct height
6. **Combine materials / Create atlas**
7. **Set up eye tracking**
8. **Set up visemes**
9. **Optimize** (bone merging, cleanup)
10. **Export**

**Key:** Combine materials / create the atlas **BEFORE** eye tracking and visemes!

### Why should I atlas before eye tracking and visemes? {#why-should-i-atlas-before-eye-tracking-and-visemes}

Do material combining and atlassing **BEFORE** setting up:
- Eye tracking
- Visemes
- Other shape key configurations

The old Material Combiner add-on could misalign shape keys when run after these. The built-in Atlas Generator only changes materials and UVs, but keeping material work first keeps the workflow predictable. Always do materials first!

### How do I prepare a model for VRChat? {#how-do-i-prepare-a-model-for-vrchat}

1. Import using Cats
2. Fix MMD Model (if applicable only if it is a VRM or MMD model)
3. Translate to English
4. Scale to 160-180cm
5. Optimize materials and bones
6. Set up eye tracking (optional)
7. Set up visemes (optional)
8. Export FBX for Unity
9. Import to Unity and set up materials there

---

## Troubleshooting Questions {#troubleshooting-questions}

### Why doesn't Cats show up after installation? {#why-doesnt-cats-show-up-after-installation}

Common causes:
- Extension not enabled (check Preferences > Extensions)
- Blender not restarted
- Wrong Cats version for your Blender
- Sidebar hidden (press N in 3D Viewport)

See [Troubleshooting](./Troubleshooting.md#extension-doesnt-appear-after-installation) for detailed solutions.

### Why is my model black/has no textures? {#why-is-my-model-blackhas-no-textures}

Common causes:
- Wrong viewport shading mode (press Z, select Material Preview)
- Textures not linked properly
- After atlassing: the atlas material is a plain Principled BSDF (set up materials in Unity instead)

See [Troubleshooting](./Troubleshooting.md#model-appears-black-or-no-textures) for solutions.

### Why does my avatar look too big/small in VRChat? {#why-does-my-avatar-look-too-bigsmall-in-vrchat}

- Check scale in Blender using [Scaling](./Scaling.md) panel
- Recommended height: 160-180cm
- Apply transformations before export
- Verify Unity import scale is 1.0

### What are these policy violation warnings? {#what-are-these-policy-violation-warnings}

These warnings appear in Blender 5.2 / 5.3 due to Cats using legacy methods for loading third-party addons like MMD Tools. **These warnings are expected and safe to ignore** - everything still works correctly.

---

## Optimization Questions {#optimization-questions}

### How do I reduce my avatar's polygon count? {#how-do-i-reduce-my-avatars-polygon-count}

1. Use Remove Doubles in [Optimization](./Optimization.md) panel
2. Use Tuxedo Blender Plugin for decimation
3. Join meshes
4. Remove unnecessary mesh detail manually

### How do I reduce draw calls? {#how-do-i-reduce-draw-calls}

1. **Combine materials** in [Optimization](./Optimization.md)
2. **Create texture atlas** with the built-in [Atlas Generator](./Optimization.md#atlas-generator)
3. **Join meshes**
4. Reduce number of separate materials

### How do I reduce bone count? {#how-do-i-reduce-bone-count}

Use [Bones & Weights](./Optimization.md#bones-weights) in the Optimization panel:
- Start with merge ratio 0.5
- Enable "Keep Merged Bones" for safety
- Test before running cleanup operations
- Remove zero weight bones after merging

### What's the difference between combining materials and creating an atlas? {#whats-the-difference-between-combining-materials-and-creating-an-atlas}

- **Combine Materials:** Merges materials with same properties into one
- **Create Atlas:** Combines multiple textures into one large texture
- Atlas typically provides better performance improvement
- Both reduce draw calls

---

## Technical Questions {#technical-questions}

### Does Cats work with Steam/Microsoft Store Blender? {#does-cats-work-with-steammicrosoft-store-blender}

While Cats may work, **we recommend downloading Blender from blender.org** instead:
- Steam version: Some users report issues
- Microsoft Store version: Known permission problems
- Official download: Most reliable

### Can I use Cats offline? {#can-i-use-cats-offline}

Yes, except for:
- Online translation services (Google, DeepL, LibreTranslate, MyMemory). The internal dictionary works offline.
- Downloading the latest translations
- Update checker (requires internet to check for updates)
- Everything else works offline

Cats follows Blender's **Edit > Preferences > System > Network > Allow Online Access** setting. With it off, Cats makes no network connections at all: the update check is skipped, translation downloads are refused, and translation falls back to the internal dictionary.

### Does Cats collect any data? {#does-cats-collect-any-data}

No. Cats doesn't collect, transmit, or store any user data. The only network connections are:
- The online translation service you select (only when you use the translation feature) - see [Translation](./Translation.md)
- The update server (when checking for updates)
- The translation files in this repository (only when you click to download the latest translations)

None of these happen while Blender's **Allow Online Access** is turned off.

### Are my translation API keys saved in my .blend files? {#are-my-translation-api-keys-saved-in-my-blend-files}

No. Since `5.3.1.0` your DeepL / LibreTranslate API keys, LibreTranslate URL and MyMemory email are only stored in Cats' own settings file, never in a `.blend`, so sharing a file never shares your keys. Keys that older versions saved into a file are removed from it when you open it; save the file again to make that stick. If you have already shared files made with an older version, consider replacing your API key.

### Is Cats still maintained? {#is-cats-still-maintained}

Yes. Cats is maintained by the community and supports **Blender 4.2 LTS through 5.4** (5.2 LTS recommended). Development happens on the [repository](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial).

---

## Update Questions {#update-questions}

### How do I update Cats? {#how-do-i-update-cats}

1. Download the new version from the [repository releases](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/releases)
2. Close Blender
3. Remove old Cats version (Preferences > Extensions)
4. Restart Blender
5. Install new version
6. Enable extension

See [Settings](./Settings.md#installing-updates) for details.

### How often should I update? {#how-often-should-i-update}

Update when:
- New features you want are released
- Bug fixes for issues you're experiencing
- Major Blender updates
- Security updates (announced on the repository)

### Will updating break my existing projects? {#will-updating-break-my-existing-projects}

Usually no, but:
- Always backup projects before updating
- Test on non-critical files first
- Read release notes for breaking changes
- Can revert to old version if needed

---

## Original Cats Questions {#original-cats-questions}

### What is the status of Official Cats? {#what-is-the-status-of-official-cats}

**The Official Cats Blender Plugin is abandoned.** Timeline:

- **Last Release:** June 27, 2021
- **Last Main Update:** January 25, 2022
- **Current Status:** 100% abandoned as of 2024

**What happened:**
- Original developers (Absolute Quantum/Hotox) disappeared from the internet
- No contact possible despite multiple attempts
- Patreon was taking payments until Neoneko worked with Patreon safety team to remove it (took 6+ months)
- No updates for 3+ years
- No support or communication

**Unofficial Cats:**
- Maintained by the community
- Supports latest Blender versions
- Regular updates and bug fixes
- Active community support

### Should I use old tutorial videos? {#should-i-use-old-tutorial-videos}

Be cautious with old tutorials:
- Many use outdated Official Cats
- UI has changed significantly
- Some advice is outdated or incorrect
- Look for tutorials using Unofficial Cats and Blender 5.2+

**Common bad advice in old tutorials:**
- Manually editing code (never necessary)
- Removing "Testing" from code (breaks things)
- Using incompatible Cats versions
- Outdated workflows

### How can I help spread awareness? {#how-can-i-help-spread-awareness}

1. **Comment on YouTube videos:**
   - Note if video uses outdated Cats
   - Share link to Unofficial Cats
   - Mention Blender 5.2 / 5.3 support

2. **Update forum posts:**
   - Correct outdated information
   - Link to current documentation
   - Share success stories

3. **Create content:**
   - Make updated tutorials
   - Write guides
   - Share on social media

---

## Platform-Specific Questions {#platform-specific-questions}

### Does Cats work for platforms other than VRChat? {#does-cats-work-for-platforms-other-than-vrchat}

Yes! Cats works for:
- **VRChat** - Primary target
- **ChilloutVR** - Compatible workflow
- **Resonite** - Has dedicated export option
- **Other VR platforms** - Generally compatible
- **General 3D use** - Optimization tools useful anywhere

### Does Cats work with Quest avatars? {#does-cats-work-with-quest-avatars}

Yes, the optimization tools are especially useful for Quest:
- Material combining and atlasing
- Bone merging
- Polygon reduction (with other tools)
- All help meet Quest limitations

### Can I use Cats for non-VR models? {#can-i-use-cats-for-non-vr-models}

Yes! Many features are useful for any 3D workflow:
- Model importing
- Armature merging
- Material optimization
- Translation tools
- General mesh operations

---

## Advanced Questions {#advanced-questions}

### Can I modify Cats? {#can-i-modify-cats}

Yes! Cats is open source (MIT License):
- View source on GitHub
- Modify for personal use
- Contribute improvements
- Fork for custom versions

### How do I report bugs? {#how-do-i-report-bugs}

1. Check [Troubleshooting](./Troubleshooting.md) first
2. Search GitHub issues for similar reports
3. If new bug, open GitHub issue with:
   - Cats version
   - Blender version
   - Steps to reproduce
   - Expected vs actual behavior
   - Error messages/screenshots

### How can I contribute? {#how-can-i-contribute}

Several ways to contribute:
- Report bugs
- Suggest features (discuss first)
- Submit pull requests
- Help with translations
- Write documentation

Everything happens on the [repository](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial).

### Where can I request features? {#where-can-i-request-features}

1. Open an issue on the [repository](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/issues)
2. Check if the feature is already planned
3. Be specific about your use case
4. Understand it may not be implemented

---

## Getting Help {#getting-help}

### Where can I ask questions? {#where-can-i-ask-questions}

- **This Wiki** - feature guides and troubleshooting
- **[Repository issues](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/issues)** - bug reports and questions

> We no longer run a Discord server or website. All support happens on the repository.

### What information should I include when asking for help? {#what-information-should-i-include-when-asking-for-help}

- Blender version (exact)
- Cats version (exact)
- What you're trying to do
- What happens instead
- Error messages (full text)
- Screenshots if relevant
- Steps to reproduce

### My question isn't answered here {#my-question-isnt-answered-here}

Check:
1. Relevant feature pages in this wiki
2. [Troubleshooting](./Troubleshooting.md) page
3. Search existing issues on the [repository](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/issues)
4. Open a new issue if it isn't already documented

---

**Related Pages:**
- [Installation](./Installation.md) - Setup guide
- [Troubleshooting](./Troubleshooting.md) - Problem solving
- [Version Support](./Version-Support.md) - Compatibility info
- All feature pages for specific tools

---

