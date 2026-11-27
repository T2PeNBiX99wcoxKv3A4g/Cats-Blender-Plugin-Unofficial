# Optimization {#optimization}

The **Optimization** panel provides tools for reducing your model's complexity and improving performance. It's a container with sub-panels grouped by what they act on:

- **Materials** - combine materials, convert textures to PNG
- **Mesh Cleanup** - join, separate, remove doubles, normals, transforms
- **Shape Keys** - remove unused, repair, optimize static
- **Bones & Weights** - merge bones and weights, delete unused bones/groups
- **Atlas Generator** - the built-in texture atlas tool (still marked **alpha**)

> 📝 **These panels were recently reorganized.** *Material Operations* is now **Materials** (mesh work moved out of it), *Mesh & Bone Cleanup* is now **Bones & Weights** and the old nested *Mesh Tools* panel was split into **Mesh Cleanup** and **Shape Keys**. *Atlas Generation* moved to the bottom of the list.

> 📝 **Since `5.3.1.0` the Material Combiner integration is gone.** The *Atlas Generator (Legacy)* sub-panel has been removed and the built-in tool, previously *Atlas Generator (New)*, is now simply **Atlas Generator**.

## Table of Contents {#table-of-contents}
- [Materials](#materials)
- [Mesh Cleanup](#mesh-cleanup)
- [Shape Keys](#shape-keys)
- [Bones & Weights](#bones-weights)
- [Atlas Generation](#atlas-generation)
  - [Atlas Generator](#atlas-generator)
- [Optimization Workflow](#optimization-workflow)

---

## Materials {#materials}

Tools for optimizing the materials and textures on your model.

### Combine Materials {#combine-materials}
Merges multiple materials into fewer materials:
- Reduces draw calls
- Improves performance
- Maintains texture assignments
- Preserves UV maps
- Ideal for objects sharing similar materials

**How to use:**
1. Select your model
2. Click **Combine Materials**
3. Materials with the same properties will be merged

### Convert All to PNG {#convert-all-to-png}
Converts all textures in your model to PNG format:
- Ensures maximum compatibility across platforms
- Maintains alpha channels
- Helps prevent texture issues in-game
- Standard format for VRChat

**How to use:**
1. Select your model
2. Click **Convert All to PNG**
3. All textures will be converted and saved

---

## Mesh Cleanup {#mesh-cleanup}

Everything that reshapes or tidies up mesh objects.

### Join Meshes {#join-meshes}

**All:**
- Combines all meshes into one object
- Maintains material assignments
- Preserves vertex groups and weights
- Ideal for final optimization

**Selected:**
- Merges only chosen meshes
- Perfect for partial optimization
- Keeps other meshes separate
- Useful for selective optimization

**How to use:**
1. Select meshes (for **Selected**)
2. Click the appropriate join button
3. Meshes will be combined

### Separate By {#separate-by}

Split a mesh into multiple objects.

- **Materials** - one object per material. Good for organizing complex models or optimizing specific sections.
- **Loose Parts** - one object per disconnected piece. Useful for finding stray/hidden geometry.
- **Shapes** - creates separate meshes from shape keys (advanced; useful for editing or analysis).

> ⚠ Separation isn't always easy to undo, save first.

### Remove Doubles {#remove-doubles}
Eliminates duplicate vertices in your mesh:
- Adjustable threshold for precise control
- Reduces vertex count
- Fixes common mesh issues
- Improves performance

**How to use:**
1. Select your mesh
2. Set the merge distance threshold
3. Click **Remove Doubles**
4. Duplicate vertices within the threshold will be merged

### Normals {#normals}

- **Recalculate** - fixes inside-out faces and shading issues by making face directions consistent. This is the one you usually want (after mesh edits, boolean ops, or import shading problems).
- **Flip** - inverts *all* normals. Only use this if the entire mesh is inside-out.

### Transforms {#transforms}

**Apply Transformations** bakes an object's position, rotation and scale into the mesh and resets the transform to defaults. Important **before merging models** and **before creating shape keys** and after scaling.

The small button beside it applies transforms to **all** objects at once.

> ⚠ Applying transforms can't be easily undone, save first.

### When to Use Each Feature {#when-to-use-each-feature}

- **Join Meshes:** For final optimization before export
- **Separate By:** When you need to isolate part of a model
- **Remove Doubles:** When a mesh has overlapping or duplicate vertices
- **Recalculate Normals:** When shading looks wrong
- **Apply Transformations:** Before merging models or creating shape keys

> ⚠ **Important:** These operations are permanent. Always save your work before using these tools. Consider keeping a backup of your original files.

---

## Shape Keys {#shape-keys}

- **Remove Unused Shapekeys** - removes shape keys that don't actually deform the mesh, reducing file size.
- **Repair Broken Shapekeys** - undoes a bogus offset that some Blender operations bake into *every* shape key at once. See below.
- **Optimize Static Shapekeys** - keeps only the vertices a shape key actually moves, significantly reducing file size. Safe and recommended before export.

### Repair Broken Shapekeys, in detail {#repair-broken-shapekeys-in-detail}

Certain Blender operations leave every non-basis shape key displaced by the same wrong amount, so the mesh jumps to a strange pose the moment *any* key is dialled above zero.

The tool works out that common offset by comparing all the non-basis keys vertex by vertex and taking the position **most of them agree on**, then subtracts it from each key. Keys carrying a genuine expression on top of the corruption keep that expression, they only lose the shared error.

**Use it when:** every shape key is wrong in the same way. That's the shape of damage it's built for.

> ⚠ **Not a general repair button.** If only one or two keys are broken, or each is broken differently, there is no majority to find and the result will be wrong. Fix those by hand.

> 💡 It needs at least one non-basis shape key to compare against. On a mesh with only a Basis it does nothing and says so.

### Preparing for VRChat upload {#preparing-for-vrchat-upload}

1. Remove Unused Shapekeys
2. Optimize Static Shapekeys
3. Recalculate Normals (see [Mesh Cleanup](#mesh-cleanup))
4. Proceed to export

---

## Bones & Weights {#bones-weights}

The Bones & Weights sub-panel (formerly "Mesh & Bone Cleanup" and "Bone Merging" before that) provides advanced tools for optimizing your avatar's armature and reducing bone count.

### Merge Bones {#merge-bones}

#### Merge Options {#merge-options}

**Merge Mesh:**
- Available when multiple meshes are present
- Combines meshes before bone operations
- Preserves weight assignments

**Merge Bone:**
- Controls which bones to merge
- Smart selection based on bone influence
- Preserves important bones automatically

**Merge Ratio:**
- Sets the merging threshold (0.0 to 1.0)
- Higher values merge more aggressively
- Lower values are more conservative
- Recommended: Start with 0.5 and adjust

#### Primary Actions {#primary-actions}

**Refresh Root:**
- Updates root bone references
- Fixes hierarchy issues
- Ensures proper bone relations
- Use after making changes to armature

**Bone Merge:**
- Executes the merging process
- Combines selected bones based on settings
- Redistributes weights intelligently
- Reduces overall bone count

### Merge Weights {#merge-weights}

**To Parents:**
- Combines all weight groups
- Optimizes weight distribution
- Reduces overall weight count
- Good for final optimization

**To Active:**
- Transfers weights to active object
- Ideal for specific mesh optimization
- Maintains weight influence
- Use for selective optimization

#### Additional Options {#additional-options}

**Keep Merged Bones:**
- Retains merged bones as backup
- Allows for reverting changes
- Useful for testing results
- Disable for maximum optimization

**Merge Visible Meshes Only:**
- Processes only visible objects
- Helps with selective optimization
- Maintains hidden backups
- Good for iterative workflow

### Delete {#delete}

**Zero Weight Bones:**
- Deletes bones with no weight influence
- Reduces armature complexity
- Improves performance
- Safe to use in most cases

**Constraints:**
- Clears bone constraints
- Simplifies armature behavior
- Reduces computation needs
- Use if constraints aren't needed

**Zero Weight Vertex Groups:**
- Cleans empty vertex groups
- Reduces file size
- Improves viewport performance
- Safe cleanup operation

**Keep Twist Bones Option:**
- Preserves important animation bones
- Maintains smooth deformations
- Prevents animation issues
- Enable for better animation quality

**Keep Empty Parent Bones:**
- Retains parent bones even without weights
- Maintains hierarchy integrity
- Prevents structural issues
- Enable for complex rigs

**Skip Hidden Bones:**
- Ignores hidden bones during cleanup
- Preserves specific rig setups
- Ensures hidden bones remain unaffected
- Use when you have helper bones

### Bone Tools {#bone-tools}

**Duplicate Bones:**
- Creates copies of selected bones
- Useful for custom rigging
- Maintains original structure
- Advanced feature for custom rigs

**Connect Bones:**
- Points each bone's tail at its child, so a limb reads as one continuous chain instead of a row of floating bones
- Connects a bone to its parent **only where the parent has a single child**, which is where the bone's head already sits on the parent's tail
- Deliberately leaves branching joints alone (shoulders and hips off the spine, finger bases off the wrist)
- Runs the same operation as the **Connect Bones** checkbox in Fix MMD Model's ⚙ Model Settings, so you don't need both

> ⚠ Connecting a bone is **not** cosmetic. Blender snaps the bone's head onto its parent's tail, which moves the bone. That is why Cats only connects the cases where nothing has to move, connecting everything would drag both arms and both legs into the middle of the spine.

> The digitigrade-leg and twist-bone *generation* tools are not here, they have their own [Bone Tools](./Bone-Tools.md) panel.

### Best Practices {#best-practices}

1. **Always start with a backup** - Bone merging significantly modifies your armature
2. **Test merge ratios** - Try different values on a copy first
3. **Check animations after merging** - Ensure movements still work correctly
4. **Use cleanup tools last** - Do all modifications before cleanup
5. **Keep twist bones** - Unless you're absolutely sure you don't need them
6. **Refresh root after changes** - Keep bone hierarchy up to date

### Workflow Example {#workflow-example}

1. Start with **Merge Ratio** at 0.5
2. Enable **Keep Merged Bones** for safety
3. Click **Bone Merge**
4. Check the result
5. If satisfactory, run **Zero Weight Bones**
6. Then **Zero Weight Vertex Groups**
7. Finally **Constraints** if not needed

> ⚠ **Warning:** These operations significantly modify your armature structure. Always keep a backup of your original file before proceeding. Test on a copy first if you're unsure.

---

## Atlas Generation {#atlas-generation}

A texture atlas combines many textures into one larger texture so that many materials can become one. That:
- Reduces draw calls significantly
- Improves avatar performance
- Helps meet platform texture and material limits
- Simplifies material management

Cats has one atlas sub-panel under Optimization, the built-in **Atlas Generator**:

| | Atlas Generator |
|---|---|
| **Status** | **Alpha** |
| **Needs installing** | Nothing, it is built into Cats |
| **Maps** | Albedo, normal, emission, roughness, metallic, AO, height |
| **Padding** | Edge-extended, so mip levels don't bleed between cells |
| **Procedural / mixed materials** | Optional Cycles bake per material |
| **Originals** | Removed from the mesh by default, kept in the file |

> 📝 **Material Combiner is no longer supported.** The *Atlas Generator (Legacy)* panel that drove Shotariya's Material Combiner was removed in `5.3.1.0`. If you still have Material Combiner installed, the **Import Material Combiner Settings** button (see [Output](#output)) copies its settings into the built-in tool.

> 🧪 **The tool is still marked alpha.** It works end to end and is tested, but check the result before you export, keep a backup and please report anything odd. Undo works and the original materials stay in the file.

### Atlas Generator {#atlas-generator}

The built-in atlas tool. It needs no extra add-ons and no Pillow: everything runs on numpy, which ships with Blender, so there is no installer, no admin prompt and no restart.

The result of a build is, per layer, one Principled BSDF material named `Cats_Atlas_Mat_01` (02, 03… for further layers), one atlas image per map named `Cats_Atlas_01`, `Cats_Atlas_01_Normal`, `Cats_Atlas_01_Emission` and so on and the UVs of every included face rewritten into the atlas. Materials that would produce an identical cell (same texture, same tint) share one cell automatically.

Every build gets names nothing in the file uses yet. If `Cats_Atlas_01` already exists, for example from atlassing a second avatar in the same file, the new build is named `Cats_Atlas_01_2` / `Cats_Atlas_Mat_01_2` (then `_3` and so on), so an earlier atlas is never overwritten.

Objects that share one mesh (linked duplicates made with Alt+D) are handled once per mesh, so their shared UVs are only rewritten once.

#### Materials {#materials-1}

Click **Generate Material List** (later **Update Material List**) to list every mesh in the scene with its materials. Each material row has:

- **Include** checkbox: whether it goes into the atlas
- A ⚠ icon when Cats could not find the material's texture through its shader and had to guess. That usually means a procedural or heavily mixed material; consider turning on **Bake** for it
- **Bake** toggle: render this material with Cycles instead of copying its texture (see [Baking](#baking))
- **Layer** number: materials on the same layer share an atlas. Use layers to build several atlases in one run, for example one for the body and one for clothing

Click a row to see its per-material settings below the list:

- **Multiply Color**: multiply the material's base colour into its texture. On by default
- **Custom Size** with **Width** / **Height**: cap this one material's cell below the global maximum

Refreshing the list keeps your ticks and layers. A previous run's `Cats_Atlas_Mat_*` material is listed but unticked by default, so rebuilding does not atlas the last atlas.

#### Atlas Settings {#atlas-settings}

- **Atlas Size**: how the packed size is rounded. **Power of 2** (default, what VRChat and Unity want), **Quadratic** (square), **Automatic** (exact packed size), **Custom** and **Strict Custom**
- **Max Width** / **Max Height**: the atlas never exceeds this. Cells are shrunk proportionally to fit. Default 4096
- **Padding**: each cell's border is extended outward this many pixels. This is what stops neighbouring cells bleeding into each other at lower mip levels in-game. Default 4. Padding never pushes an atlas up to the next power of two; the cells give up a fraction of a percent instead
- **Color Size**: cell size for materials that have a colour but no texture. Default 32
- **Max Tiling**: the most texture repeats a material can ask for when its UVs run outside 0–1. Stops a stray vertex at U = 900 producing an enormous cell. Default 8
- **Crop to UVs**: only the part of each texture the UVs actually use goes into the atlas. On by default; turn off to keep whole textures
- **Pixel Art**: nearest-neighbour resampling, for pixel-art textures
- **Remap All UV Maps**: rewrite every UV map, not only the one the texture samples. Off by default, secondary UV maps on an avatar usually carry something else
- **Remove Original Materials**: drop the material slots the atlas made unused. On by default. The material datablocks stay in the file until you purge, so a wrong build is recoverable by hand as well as by Undo

#### Maps {#maps}

Albedo is always generated. Tick any of **Normal**, **Emission**, **Roughness**, **Metallic**, **Ambient Occlusion** and **Height** to generate those too, from the same layout, each with the correct colour space (sRGB for albedo and emission, Non-Color for the rest). Normal and emission are on by default.

> On Blender 5.3, Cats sets these colour spaces by their standard interop IDs rather than by name, so atlases also come out right with custom OpenColorIO configs (for example ACES) that don't have spaces called "sRGB" or "Non-Color". On Blender 5.2 the names are used.

Colours are handled the way Blender shades them. Base colours and tints are converted to sRGB before they land in an albedo or emission atlas, tints are multiplied in linear space and 16-bit / float textures (EXR, HDR, 16-bit PNG) are encoded to sRGB too. Since `5.3.1.0` this means flat-colour and tinted materials match the viewport; older builds wrote them noticeably too dark.

A map is only written if at least one included material actually has data for it; you will not get seven identical grey images for a model that only has albedo. Ambient occlusion has no shader input to trace, so it is matched by texture name and always marked ⚠.

- **Pack for Unity**: with Metallic and Roughness both on, writes one `_MetallicSmoothness` map (metallic in RGB, smoothness in alpha) instead of the two separate images, which is what Unity's Standard shader takes
- **Secondary Scale**: **Full**, **Half** or **Quarter** resolution for every map except albedo. Normal and roughness atlases rarely need full resolution and because the layout is shared no UV change is needed

In the generated material, normal is wired through a Normal Map node, emission gets strength 1, roughness and metallic go to their inputs. AO, height and the packed map are added as image nodes but left unconnected, they exist to be assigned in Unity.

The material copies the surface settings (roughness, metallic, specular, IOR, coat and sheen) of the first included material that uses a Principled BSDF, so the atlassed model shades like the original. If none does (MMD, toon or MToon shaders), it is diffuse-only with no specular, which matches how those shaders look and how Fix MMD Model sets up its export shader.

#### Baking {#baking}

For materials whose **Bake** toggle is on, Cats renders each enabled map with Cycles instead of copying a texture. A procedural, layered or vertex-coloured material has no single image to copy, but it can be rendered.

- **Bake Size**: square resolution of each baked material. Default 1024
- **Bake Samples**: Cycles samples. Only ambient occlusion needs more than a few. Default 8

All objects with a baked material are baked together, so a material used on several objects gets one image holding every object's faces.

Every render setting the bake touches (engine, bake output target, samples, device, bake passes) is restored afterwards, including if it fails. Baking always uses the CPU and always bakes to image textures, even if your bake output is set to Color Attributes, so your vertex colours are never overwritten.

> ⚠ Objects that are not in the current view layer (for example in an excluded collection) cannot be baked. The build stops with an error naming the object.

> ⚠ **Cycles has no bake pass for metallic or height**, so those two maps are always copied, never baked. A warning names them when a bake runs with either enabled.

> ⚠ **Baking uses the material's existing UV layout.** Mirrored geometry is fine: overlapping islands mean last-write-wins, which is what you want there. Genuinely overlapping but *different* islands will fight over the same pixels; the panel shows this caveat whenever any material has Bake on.

#### Output {#output}

- **Save Atlas**: **Pack into .blend** (default) or **Save to Folder**, which writes each map as PNG into **Folder**. An existing file is never overwritten, a `_2`, `_3`… suffix is added instead. If the folder is empty or cannot be written the build still succeeds and warns; the images are packed into the .blend instead so they are not lost
- **Import Material Combiner Settings**: shown only while the Material Combiner add-on is still installed, to help you move over. Copies its atlas size, dimensions, crop, pixel-art, colour size and save path, plus its per-material settings and your material ticks and layers, into the Atlas Generator. Its packer choice is not carried (there is one packer) and its **Gaps** value is copied into **Padding** even though the two mean different things; the operator reports both

#### Building {#building}

- **Preview Result**: packs without writing anything and reports, per layer, how many materials went into how many cells, the atlas size and the fill percentage
- **Create Atlas**: builds. The report line reads, for example, `Layer 1: 10 materials packed into 3 cells, 2048x1024, 96% filled, 2 maps`

If every ticked material on a layer turns out to share one texture, there is nothing to pack, so Cats simply merges them into one material at the texture's own size and says so. A layer with only one ticked material is an error: there is nothing to combine.

#### Known Limitations (alpha) {#known-limitations-alpha}

- The output is always a plain Principled BSDF. MMD toon and sphere shading, MToon and other shader-specific looks are not preserved; the atlas is meant to go to Unity through FBX
- Out-of-range UVs are handled per material, not per island: a material with one island at 0–1 and another at 5–6 gets a six-tile-wide cell. Rare and **Max Tiling** caps it
- The **Custom** size mode currently behaves the same as **Automatic**
- The preview does not account for **Bake Size**

#### Ordering {#ordering}

Atlas **before** eye tracking and visemes. Atlassing changes materials and UVs, not shape keys, but the workflow in the [FAQ](./FAQ.md) still applies.

---

## Optimization Workflow {#optimization-workflow}

### Recommended Order {#recommended-order}

1. **Mesh Cleanup:**
   - Apply transformations
   - Join meshes if needed
   - Remove doubles
   - Recalculate normals if shading looks wrong

2. **Shape Keys:**
   - Remove unused and optimize static shape keys

3. **Materials:**
   - Combine materials

4. **Atlas Generation:**
   - Create a texture atlas with the Atlas Generator
   - Reduce material count

5. **Bones & Weights:**
   - Merge bones
   - Clean up unused bones and weights

6. **Final Check:**
   - Test animations
   - Verify materials
   - Check vertex counts

### Performance Tips {#performance-tips}

- Atlasing gives the biggest performance boost
- Bone merging helps with platform limits
- Material combining reduces draw calls
- Remove doubles reduces vertex count

---

**Related Pages:**
- [Quick Access](./Quick-Access.md) - Basic model operations
- [Merge & Attach](./Merge-and-Attach.md) - Merging multiple models
- [Bone Tools](./Bone-Tools.md) - Digitigrade legs and twist bone generation
- [Translation](./Translation.md) - Translate names before optimizing
- [Troubleshooting](./Troubleshooting.md) - Common optimization issues

---

