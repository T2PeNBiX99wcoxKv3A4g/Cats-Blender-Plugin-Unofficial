# Troubleshooting {#troubleshooting}

Common issues and solutions for Cats Blender Plugin.

## Quick Troubleshooting {#quick-troubleshooting}

> 💡 **First Steps:** Before diving into specific issues:
> 1. Make sure you're using **Blender 4.2 LTS or newer**
> 2. Verify you have the **latest version of Cats**
> 3. **Restart Blender** after installing/updating Cats
> 4. Check that Cats is **enabled** in Extensions preferences

---

## Installation Issues {#installation-issues}

### Extension Doesn't Appear After Installation {#extension-doesnt-appear-after-installation}

**Symptoms:**
- Installed Cats but can't find it
- No Cats tab in sidebar
- Extension not in list

**Solutions:**

1. **Check if Enabled:**
   - Edit > Preferences > Extensions
   - Search for "Cats"
   - Ensure checkbox is checked

2. **Restart Blender:**
   - Close Blender completely
   - Reopen Blender
   - Check again

3. **Verify Installation:**
   - Make sure you installed the ZIP file (don't extract it)
   - Verify you used "Install from Disk"
   - Check you downloaded a Cats version for Blender 5.2 / 5.3

4. **Check Blender Version:**
   - Help > About Blender
   - Must be 4.2 LTS or newer
   - Download correct Cats version for your Blender

5: **Ensure the sidebar is open by pressing N**

### Installation Gives Errors {#installation-gives-errors}

**Possible Causes:**
- Wrong Cats version for your Blender
- Corrupted download
- Permission issues
- Conflicting extensions

**Solutions:**

1. **Verify Version Match:**
   - Blender 4.2 LTS through 5.4 all run the current Cats release; Blender 4.1 and older cannot load the extension
   - Match your Cats version to your Blender version (see [Version Support](./Version-Support.md))

2. **Re-download:**
   - Delete partial download
   - Download fresh copy
   - Verify file isn't corrupted

3. **Check Permissions:**
   - Ensure Blender can write to extensions folder
   - Run Blender as administrator (Windows)
   - Check folder permissions

4. **Remove Conflicting Extensions:**
   - Old Cats versions
   - Incompatible add-ons (Like MMD Tools, cats comes with the latest MMD Tools, there will conflict with each other)
   - Restart after removal

### Cats Tab Not Visible in Sidebar {#cats-tab-not-visible-in-sidebar}

**Solutions:**

1. **Press N:**
   - In 3D Viewport, press **N** key
   - Toggles sidebar visibility

2. **Look for Cats Tab:**
   - Check all tabs in sidebar
   - Should see "Cats" tab
   - Click to open

3. **Verify Extension is Enabled:**
   - Edit > Preferences > Extensions
   - Find Cats
   - Check enabled checkbox

---

## Import/Export Issues {#importexport-issues}

### Model Won't Import {#model-wont-import}

**Symptoms:**
- Import button does nothing
- Error messages during import
- Blender crashes

**Solutions:**

1. **Check File Format:**
   - Verify supported format (.pmx, .pmd, .fbx, .vrm, etc.)
   - File isn't corrupted
   - File size is reasonable

2. **Check File Path:**
   - No special characters in path
   - Path isn't too long
   - File isn't in use by another program

3. **Try Blender's Native Importer:**
   - File > Import
   - If that fails, file may be corrupted

4. **Check Console for Errors:**
   - Window > Toggle System Console
   - Look for error messages
   - Report specific errors

---

## Model Display Issues {#model-display-issues}

### Model Appears Black or No Textures {#model-appears-black-or-no-textures}

**Symptoms:**
- Model is all black
- Textures don't show
- Materials look wrong

**Solutions:**

1. **Switch Viewport Shading:**
   - Press Z key
   - Select "Material Preview" or "Rendered"
   - "Solid" mode may not show textures

2. **Check Material Properties:**
   - Select mesh
   - Open Material Properties panel
   - Verify materials exist
   - Check if textures are loaded

3. **Texture Paths:**
   - Materials may reference missing textures
   - Relink textures if needed
   - Use "Find Missing Files" in Blender

4. **After creating an atlas:**
   - The atlas material is a plain Principled BSDF, toon/MToon looks are not kept
   - Set up materials properly in Unity
   - See [Atlas Generator Issues](#atlas-generator-issues)

### Model is Inverted/Inside Out {#model-is-invertedinside-out}

**Symptoms:**
- Mesh appears inside-out
- Backfaces showing
- Shading looks wrong

**Solutions:**

1. **Recalculate Normals:**
   - [Optimization → Mesh Cleanup](./Optimization.md#mesh-cleanup) panel
   - Click "Recalculate Normals"

2. **Check in Edit Mode:**
   - Tab to Edit Mode
   - Enable Face Orientation (overlay)
   - Blue = correct, Red = inverted

3. **Flip Normals if Necessary:**
   - Select all faces
   - Use "Flip Normals" in Mesh Cleanup
   - Only if entire mesh is inverted

### Wrong Scale in VRChat/Unity {#wrong-scale-in-vrchatunity}

**Symptoms:**
- Avatar too big or too small
- Not at expected height
- Proportions wrong

**Solutions:**

1. **Check Scale in Blender:**
   - Use [Scaling](./Scaling.md) panel
   - Measure actual height
   - Scale to correct size (160-180cm recommended)

2. **Apply Transformations:**
   - [Optimization → Mesh Cleanup](./Optimization.md#mesh-cleanup)
   - "Apply Transformations"
   - Before export

3. **Unity Import Scale:**
   - Should be 1.0 for FBX
   - Check import settings in Unity
   - Don't scale in Unity, scale in Blender

---

## Feature-Specific Issues {#feature-specific-issues}

### Eye Tracking Not Working {#eye-tracking-not-working}

**Symptoms:**
- Eyes don't move
- Blinking doesn't work
- Setup seems broken

**Solutions:**

1. **Verify Bone Selection:**
   - [Eye Tracking](./Eye-Tracking.md) panel
   - Check head, left eye, right eye bones selected
   - Use correct bones

2. **Check Weight Painting:**
   - Eyes must be weighted to eye bones
   - 100% weight recommended
   - No weight bleeding

3. **Test in Blender:**
   - Use test controls in Eye Tracking panel
   - Verify eyes move
   - Check blinking shape keys

4. **Material / Atlas Order:**
   - Did you combine materials or atlas **after** eye tracking?
   - Set up eye tracking **after** material combining and atlassing
   - May need to redo setup

### Visemes Don't Work {#visemes-dont-work}

**Symptoms:**
- Mouth doesn't move for lip sync
- Shape keys not assigned
- Preview doesn't show movement

**Solutions:**

1. **Check Shape Key Assignment:**
   - [Visemes](./Visemes.md) panel
   - Verify Mouth A, O, CH assigned
   - Use correct shape keys

2. **Verify Shape Keys Exist:**
   - Select mesh
   - Open Shape Keys panel
   - Confirm mouth shape keys present

3. **Test with Preview:**
   - Use preview in Visemes panel
   - Check each viseme individually
   - Adjust intensity if needed

4. **Translation Issues:**
   - Translate shape keys before viseme setup
   - Don't translate after setup
   - May break references

### Bone Merging Causes Issues {#bone-merging-causes-issues}

**Symptoms:**
- Model breaks after bone merging
- Weights look wrong
- Animations broken

**Solutions:**

1. **Check Merge Settings:**
   - [Optimization](./Optimization.md) panel
   - Start with lower merge ratio (0.5)
   - Enable "Keep Merged Bones" for safety

2. **Test Before Cleanup:**
   - Merge bones first
   - Test thoroughly
   - Clean up only if merge is good

3. **Verify Armature After:**
   - Check bone hierarchy
   - Test animations
   - Verify weights look correct

4. **Undo if Necessary:**
   - Ctrl+Z to undo
   - Try different settings
   - Or work from backup

---

## Atlas Generator Issues {#atlas-generator-issues}

> 💡 The old **Atlas Generator (Legacy)** panel (Material Combiner) was **removed in `5.3.1.0`**, and with it every Pillow and Material Combiner install problem. The built-in [Atlas Generator](./Optimization.md#atlas-generator) needs nothing installed. It is still marked alpha, so if it misbehaves please report it with the line it printed in the Blender Info log.

### I Can't Find Atlas Generator (Legacy) / Material Combiner {#i-cant-find-atlas-generator-legacy-material-combiner}

The legacy panel no longer exists. Use **Optimization > Atlas Generator** instead. If Material Combiner is still installed, its **Import Material Combiner Settings** button copies your old atlas settings, material ticks and layers across. Material Combiner itself is a third-party add-on and is not supported by Cats any more.

### Textures Missing or Wrong in the Atlas {#textures-missing-or-wrong-in-the-atlas}

**Possible Causes:**
- Cats couldn't find the material's texture through its shader (the row shows a ⚠ icon)
- Procedural, mixed or vertex-coloured material with no single image
- Texture file missing on disk

**Solutions:**
1. Turn on **Bake** for materials marked ⚠, so Cycles renders them instead
2. Relink missing textures (File > External Data > Find Missing Files)
3. Use **Preview Result** to check what will be packed before building

### Atlas Colours Look Too Dark {#atlas-colours-look-too-dark}

Builds before `5.3.1.0` wrote flat-colour and tinted materials too dark. Update Cats and rebuild the atlas; colours now match the viewport.

### Building a Second Atlas Changed My First One {#building-a-second-atlas-changed-my-first-one}

Builds before `5.3.1.0` reused the names `Cats_Atlas_01` / `Cats_Atlas_Mat_01`, so atlassing a second avatar in the same file overwrote the first. Each build now gets its own names (`Cats_Atlas_01_2` and so on). Rebuild the affected atlas after updating.

### Atlas Disappeared After Reopening the File {#atlas-disappeared-after-reopening-the-file}

With **Save to Folder** and an empty or unwritable folder, builds before `5.3.1.0` neither saved nor packed the atlas, so it was gone on reload. The atlas is now packed into the `.blend` when saving fails, and the build warns you. Set a writable **Folder** to get PNG files.

### Baking Problems {#baking-problems}

- **"cannot be baked" error:** the object is not in the current view layer, for example it is in an excluded collection. Include the collection, or untick that object's materials
- **Vertex colours were overwritten:** builds before `5.3.1.0` baked into colour attributes when Blender's bake output was set to Color Attributes. Baking now always targets image textures; undo or restore the vertex colours from a backup
- **A baked material looked wrong on one of several objects:** fixed in `5.3.1.0`, objects sharing a baked material are now baked together

---

## Performance Issues {#performance-issues}

### Cats Operations Very Slow {#cats-operations-very-slow}

**Symptoms:**
- Tools take minutes to complete
- Hang or freeze during operations

**Possible Causes:**
- Very complex model
- Many objects/meshes
- Slow computer

**Solutions:**

1. **Be Patient:**
   - Complex operations take time
   - Cats is working
   - Check console for progress

2. **Simplify First:**
   - Remove unnecessary objects
   - Join meshes before operations
   - Clean up model first

3. **Close Other Programs:**
   - Free up RAM
   - Close browser, etc.
   - Give Blender resources

---

## Error Messages {#error-messages}

### "No Armature Selected" {#no-armature-selected}

**Solution:**
- Select your armature object
- Must select armature, not mesh
- In Object Mode

### "No Mesh Found" {#no-mesh-found}

**Solution:**
- Ensure meshes are present
- Meshes must be parented to armature
- Check object visibility

### "Shape Keys Not Found" {#shape-keys-not-found}

**Solution:**
- Verify mesh has shape keys
- Check correct mesh is selected
- Shape keys must exist for viseme/eye tracking

### "Bone Not Found" {#bone-not-found}

**Solution:**
- Verify bone names
- Refresh bone list
- Check bone exists in armature

### Policy Violation Warnings (Blender 5.2 / 5.3) {#policy-violation-warnings-blender-52-53}

**Symptoms:**
- Warnings about extension policies
- Alerts about legacy methods

**This is Expected:**
- Cats uses legacy methods for third-party addons
- Warnings are safe to ignore
- Everything still works correctly
- No action needed

---

## Getting Additional Help {#getting-additional-help}

### Before Asking for Help {#before-asking-for-help}

1. **Check This Page:** Many issues covered here
2. **Read Relevant Wiki Pages:** Feature-specific guides
3. **Try Search:** existing issues on the repository
4. **Verify Version:** Using supported Blender 5.2+

### When Asking for Help {#when-asking-for-help}

Include:
- Blender version (exact)
- Cats version
- What you're trying to do
- What happens instead
- Error messages (exact text)
- Screenshots if relevant
- Console output if available

### Where to Get Help {#where-to-get-help}

- **Repository issues:** Bug reports and questions
- **GitHub Issues:** Bug reports and feature requests
- **This Wiki:** Documentation and guides

### What NOT to Report {#what-not-to-report}

- Issues with unsupported Blender versions or blender versions which are not the blender.org or steam version (anything before 5.2 is not supported)
- Third-party extension problems (Material Combiner, etc.; Cats no longer integrates with Material Combiner)
- General Blender questions (use Blender forums)
- Feature requests without discussion first

---

## Common Workflow Issues {#common-workflow-issues}

### Order of Operations Wrong {#order-of-operations-wrong}

**Many issues stem from wrong order:**

**Correct Order:**
1. Import model
2. Fix MMD (if MMD model, fresh only)
3. Translate names
4. Apply transformations if needed
5. **Combine materials/Create atlas**
6. **Set up eye tracking**
7. **Set up visemes**
8. Final optimization
9. Export

**Key Point:** Combine materials / create the atlas **BEFORE** eye tracking and visemes!

### Backup Management {#backup-management}

**Always Keep Backups:**
- Before major operations
- After completing stages
- Save incremental versions
- Use version control if possible

**Good Backup Practice:**
```
my_model_01_import.blend
my_model_02_fixed.blend
my_model_03_optimized.blend
my_model_04_rigged.blend
my_model_05_final.blend
```

---

**Related Pages:**
- [FAQ](./FAQ.md) - Frequently asked questions
- [Installation](./Installation.md) - Setup help
- [Version Support](./Version-Support.md) - Compatibility info
- All feature pages for specific tools

---

