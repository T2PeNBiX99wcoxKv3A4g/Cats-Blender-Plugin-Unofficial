# Bone Parenting {#bone-parenting}

The Bone Parenting panel helps you manage and set up root bones for your armature, which is essential for proper model rigging and animation.

## What is a Root Bone? {#what-is-a-root-bone}

The root bone is the top-level parent bone in your armature hierarchy:
- All other bones are children of the root (directly or indirectly)
- Controls overall model position and rotation
- Essential for proper animation
- Required for VRChat avatars

## Why Root Bones Matter {#why-root-bones-matter}

A properly set root bone ensures:
- Correct model behavior in-game
- Proper animation playback
- Correct IK (Inverse Kinematics) behavior
- VRChat compatibility

## Root Bone Selection {#root-bone-selection}

The panel displays available bones that can serve as the root bone.

### Choosing a Root Bone {#choosing-a-root-bone}

**Typically the root bone is:**
- At the center of the model
- Named "Root", "Hips", "Armature", or similar
- The bone that should never move relative to world space
- The parent of the spine/hip bones

**Common root bone names:**
- Root
- Hips
- Armature
- Hip
- pelvis
- root_bone

---

## Main Actions {#main-actions}

### Refresh Root {#refresh-root}

Updates the root bone list and hierarchy information.

**When to use:**
- After importing a model
- After making changes to the armature
- After merging armatures
- When bone list seems outdated

**How to use:**
1. Click **Refresh Root**
2. Wait for the list to update
3. Review available root bones

### Set Root {#set-root}

Establishes the selected bone as the root of the armature.

**What it does:**
- Reorganizes bone hierarchy
- Sets up proper parenting
- Ensures selected bone is at top level
- Updates armature structure

**How to use:**
1. Select desired bone from the list
2. Click **Set Root**
3. Verify hierarchy in Blender's bone view

---

## Workflow {#workflow}

### Setting Up Root Bone (New Model) {#setting-up-root-bone-new-model}

1. **Import your model**
2. **Open Bone Parenting panel**
3. **Click Refresh Root**
4. **Review available bones**
5. **Select appropriate root bone**
6. **Click Set Root**
7. **Verify hierarchy**

### Fixing Root Bone Issues {#fixing-root-bone-issues}

If your model has incorrect root:

1. **Identify correct bone** (usually Hips or Root)
2. **Click Refresh Root**
3. **Select correct bone**
4. **Click Set Root**
5. **Test animations**
6. **Save changes**

### After Armature Merging {#after-armature-merging}

After using [Merge & Attach](./Merge-and-Attach.md):

1. **Refresh Root** to update hierarchy
2. **Check if root is correct**
3. **Set Root** if needed
4. **Verify merged bones are properly parented**

---

## Use Cases {#use-cases}

### Preparing Model for VRChat {#preparing-model-for-vrchat}

1. Import model
2. Fix MMD model (if needed only use on MMD and VRM models)
3. **Set proper root bone**
4. Configure eye tracking and visemes
5. Export

### Fixing Imported Models {#fixing-imported-models}

Some importers don't set root correctly:

1. Model appears at wrong position
2. Animations don't work correctly
3. **Solution:** Set proper root bone

### After Merging Models {#after-merging-models}

When combining armatures:

1. Merged armature may have confused hierarchy
2. **Refresh and Set Root** to fix
3. Ensures clean bone structure

### Creating Custom Rigs {#creating-custom-rigs}

When building custom rigs:

1. Create bones
2. **Set Root** at the start
3. Build hierarchy from root
4. Keeps structure organized

---

## Best Practices {#best-practices}

### Choosing Root Bone {#choosing-root-bone}

**DO:**
- ✅ Choose central, main bone
- ✅ Pick bone at character center
- ✅ Use Hips for humanoid rigs
- ✅ Verify it makes logical sense

**DON'T:**
- ❌ Choose end-bones (fingers, toes)
- ❌ Select helper bones
- ❌ Pick bones that should move independently
- ❌ Use arbitrary bones

### When to Refresh {#when-to-refresh}

**Refresh Root after:**
- Importing models
- Merging armatures
- Adding or deleting bones
- Duplicating armatures
- Major hierarchy changes

### After Setting Root {#after-setting-root}

**Always verify:**
1. Open armature in Edit Mode
2. Check bone hierarchy (shift-click bones to see parents)
3. Verify root bone has no parent
4. Confirm other bones trace back to root
5. Test pose mode to ensure everything moves correctly

---

## Common Issues {#common-issues}

### Root Bone List is Empty {#root-bone-list-is-empty}

**Possible causes:**
- No armature selected
- Armature has no bones
- Panel needs refresh

**Solutions:**
- Select your armature object
- Click Refresh Root
- Verify armature has bones

### Wrong Bone Appears as Root {#wrong-bone-appears-as-root}

**Possible causes:**
- Hierarchy wasn't updated
- Import issue
- Previous setup incorrect

**Solutions:**
- Click Refresh Root
- Select correct bone
- Click Set Root
- Verify change took effect

### Animations Break After Setting Root {#animations-break-after-setting-root}

**This is rare, but possible:**
- Some animations might need rebaking
- Animation constraints may need adjustment
- Usually animations adapt automatically

**Solutions:**
- Save backup before setting root
- Test animations after change
- If broken, undo and investigate further

### Can't Set Root on Specific Bone {#cant-set-root-on-specific-bone}

**Possible causes:**
- Bone is locked
- Bone has constraints preventing it
- Armature is in Edit Mode

**Solutions:**
- Switch to Object or Pose Mode
- Unlock bone if locked
- Remove preventing constraints

---

## Understanding Bone Hierarchy {#understanding-bone-hierarchy}

### How Hierarchies Work {#how-hierarchies-work}

```
Root ("Armature" for VRC models) (top level)
├── Hips
│   ├── Spine
│   │   ├── Chest
│   │   │   ├── Neck
│   │   │   │   └── Head
│   │   │   ├── Shoulder.L
│   │   │   │   └── Arm.L
│   │   │   └── Shoulder.R
│   │   │       └── Arm.R
│   ├── Leg.L
│   └── Leg.R
```

- Each bone can have one parent
- Each bone can have multiple children
- Root has no parent

### Why Hierarchy Matters {#why-hierarchy-matters}

- **Animation:** Children follow parent rotations
- **IK:** Bone chains need proper hierarchy
- **VRChat:** Expects specific hierarchy for avatars
- **Export:** Unity needs correct bone structure

---

**Related Pages:**
- [Merge & Attach](./Merge-and-Attach.md) - Merging armatures
- [Optimization](./Optimization.md) - Bone merging tools
- [Quick Access](./Quick-Access.md) - Model import/export
- [Troubleshooting](./Troubleshooting.md) - Common bone issues

---

