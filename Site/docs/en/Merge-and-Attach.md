# Merge & Attach

The **Merge & Attach** panel (formerly "Custom Model Creation") provides tools for merging armatures and attaching meshes to build combined or customized models.

## Overview

This panel has two main modes:
- **Armature Mode** - merge two complete armatures together
- **Mesh Mode** - attach individual meshes to an existing armature

A tutorial button at the top walks you through the process step by step.

---

## Armature Mode

Use Armature Mode to combine two rigged models into one.

### Requirements
- At least two armatures in your scene
- Both armatures should have meshes attached

### Main Settings

- **Merge Same Bones** - automatically combines bones with matching names. Ideal when both models share a similar skeleton (e.g. two VRChat-standard models).
- **Apply Transforms** - applies current transforms before merging. Recommended, prevents scale/rotation issues.
- **Join Meshes** - combines meshes after merging into a single object.
- **Remove Zero Weight Bones** - cleans up unused bones after the merge.
- **Cleanup Shape Keys** - removes duplicate/unused shape keys during the merge.

### Merge Selection

- **Merge Into** - the target (base) armature that receives the merged content (usually your main character).
- **To Merge** - the armature to combine in (usually clothing, accessories or extra parts).
- **Attach to Bone** *(when "Merge Same Bones" is disabled)* - the bone to attach the merged armature to (e.g. wings to the spine).

**What "Attach to Bone" actually does:** only the **root** bones of the merged armature are reparented onto your chosen bone. Everything below them keeps its own hierarchy, so a tail rig attached to `Spine` stays a tail, it just hangs off the spine now. Bones in the merged armature whose names clash with the base armature are folded into the base bone of the same name, and their weights are merged into the matching vertex group.

**Physics is cleaned up for you:** merging strips rigid-body and joint objects from **both** armatures first, including nested physics groups, so you don't need to run [Remove Rigid Bodies and Joints](Converters#remove-rigid-bodies-and-joints) beforehand.

### How to Use

1. Import both models into your scene.
2. Select the **Merge Into** armature (your base model).
3. Select the **To Merge** armature (the model to add).
4. Choose your settings:
   - Enable **Merge Same Bones** if the skeletons match.
   - Enable **Apply Transforms** (recommended).
   - Enable **Join Meshes** for a single-mesh result.
5. If not merging same bones, pick **Attach to Bone**.
6. Click **Merge**.

**Common uses:** base body + rigged clothing/hair, adding rigged accessories (wings, tails, props).

---

## Mesh Mode

Use Mesh Mode to attach a standalone mesh to an existing armature.

### Requirements
- At least one armature in your scene
- At least one unrigged mesh object

### Settings & Selection

- **Join Meshes** - combine the attached mesh with existing meshes.
- **Merge Into** - the target armature.
- **Attach Mesh** - the (unrigged) mesh to attach.
- **Attach to Bone** - the bone the mesh will follow (e.g. a hat to the head bone).

### How to Use

1. Ensure you have an armature and an unrigged mesh.
2. Switch to **Mesh Mode**.
3. Select the **Merge Into** armature.
4. Select the **Attach Mesh**.
5. Choose the **Attach to Bone**.
6. Enable **Join Meshes** if desired.
7. Click **Attach**.

**Common uses:** rigid attachments (hats, glasses, props) and simple non-deforming clothing.

---

## Tips & Best Practices

**Before merging:** position models correctly, match scale, save a backup, and name bones clearly (helps "Merge Same Bones").

**During merging:** start with **Apply Transforms** enabled, prefer **Merge Same Bones** when possible, and keep **Join Meshes** off initially so issues are easier to fix.

**After merging:** check weight painting, test animations, review the bone hierarchy, and optimize via [Optimization](Optimization) if needed.

### Troubleshooting

- **Mesh in wrong location** → enable **Apply Transforms** and retry.
- **Bones don't merge** → verify names match exactly (case-sensitive) and positions are similar.
- **Mesh doesn't follow the armature** → confirm it's weighted and vertex groups match bone names.
- **Shape keys disappear** → enable **Cleanup Shape Keys**.
- **Merged parts sit at the world origin instead of on the chosen bone** → the merged armature's roots weren't reparented. Re-open the **Attach to Bone** dropdown and reselect the bone, then merge again. Make sure **Merge Same Bones** is off, it ignores **Attach to Bone** entirely.
- **"Please fix your model" / transform errors** → one or both armatures has a parent object (usually an Empty from the importer) with non-default transforms. Apply transforms on the parent (Ctrl+A → All Transforms), or enable **Merge Same Bones**, which deletes clean parents for you.

---

## Limitations

- Armature Mode needs at least 2 armatures; Mesh Mode needs at least 1 armature and 1 mesh.
- Very complex merges take time; some custom constraints may need manual fixing.

> ⚠ **Always back up your models before merging.** Results vary with model complexity.

---

**Related Pages:**
- [Optimization](Optimization) - Post-merge optimization
- [Bone Parenting](Bone-Parenting) - Managing bone hierarchy
- [Troubleshooting](Troubleshooting) - Common merge issues

---

