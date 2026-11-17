# Scaling

The Scaling panel rescales your avatar's proportions and height for VR platforms such as VRChat. It is built into Cats, so there is nothing extra to install.

> 📝 **Replaces Immersive Scaler.** Earlier versions of Cats needed the separate Immersive Scaler add-on. The external Immersive Scaler is no longer maintained, so Cats now ships its own scaler based on it. The tools, settings and results are the same as Immersive Scaler's. If you still have Immersive Scaler installed, you can remove it: Cats no longer uses it.

## Overview

Proper avatar scaling is crucial for VR experiences:
- Ensures comfortable viewing in VR
- Maintains correct proportions relative to the world
- Meets platform height recommendations
- Provides better social interaction in VR

Unlike simply resizing the model, the scaler adjusts **proportions**: it splits the required change between arms and legs, keeps limb thickness under control, moves the avatar onto the floor and then scales it to your target height. Armature and meshes are changed together, shape keys included.

## Requirements

- A humanoid armature selected in Cats' armature dropdown (or set as the active object)
- Recognisable bones for shoulders, arms, elbows, wrists, legs, knees, ankles and eyes. Common naming schemes (VRChat/Unity, MMD after **Fix Model**, `Left arm`, `UpperArm.L`, `Thigh_R` and so on) are detected automatically. If a bone isn't found, set it by hand with [Bone Overrides](#bone-overrides).

If no armature is found, the buttons are greyed out and hovering them explains why.

---

## Avatar Rescale

The main section. Set the values, then click **Rescale Armature**.

| Setting | Default | What it does |
|---|---|---|
| **Target Height** | 1.61 m | Height of the highest vertex after scaling. With **Scale to Eyes** on, this is the eye height instead. |
| **Leg/Arm Scaling** | 55% | How much of the proportion change is done by the legs. The rest is done by the arms. |
| **Custom Arm Ratio** | 0.4537 | The arm-to-height proportion to scale to, the same as VRChat's `--custom-arm-ratio` launch option. Higher means longer arms. 0.4537 is VRChat's default. |
| **Center Model** | Off | Moves the model to X/Y = 0. |

The small arrow button next to a value **reads it from the current avatar**:
- next to **Target Height**: sets the target to the avatar's current height
- next to **Custom Arm Ratio**: sets the ratio from the avatar's current proportions
- next to **Upper Body Percentage** / **Upper Leg Percent**: reads the current percentage

This is handy for keeping one value as it is while changing the others.

### Customization

Expand **Customization** for finer control:

| Setting | Default | What it does |
|---|---|---|
| **Arm Thickness** | 50% | How much arm thickness is kept or added when arms are lengthened or shortened. |
| **Leg Thickness** | 50% | The same for legs. |
| **Upper Leg Percent** | 53% | How much of the hip-to-heel distance is upper leg. |
| **Extra Leg Length** | 0 m | How far below the real floor the legs should reach, i.e. how far below your real floor the VRChat floor should be. |
| **Scale to Eyes** | Off | Makes **Target Height** the eye height instead of the top of the head. |
| **Show bone mapping** | Off | Shows the [Bone Overrides](#bone-overrides) section. |

### Core functionality toggle

Expand **Core functionality toggle** to turn individual steps off. Mostly useful for troubleshooting:

- **Skip Main Rescale**: skip the proportion adjustment
- **Skip move to floor**: don't move the avatar onto the floor
- **Skip Height Scaling**: don't do the final scale to the target height
- **Scale by Relative Proportions**: scale the torso by **Upper Body Percentage** instead of using **Leg/Arm Scaling**. Works better for VRChat's upper-body-locked modes.
- **Keep Head Size**: try to keep the head the same size by scaling the torso instead

---

## Finger Spreading

Rotates the finger bones so they spread out from the wrist, which gives better-looking hands with VRChat's finger tracking and gestures.

Expand **Customization** for:
- **Ignore thumb** *(on by default)*: leave the thumb alone
- **Spread Factor** *(default 1)*: how far to rotate. 1 points each finger directly away from the wrist.

Click **Spread Fingers** to apply.

---

## Hip fix (beta)

**Shrink Hip bone** moves the hip bone much closer to the spine. Some models have a very long hip bone, which bends badly in full-body tracking. This is beta, check the result before exporting.

---

## Bone Overrides

Shown when **Show bone mapping** is ticked under Customization. Each row is one bone the scaler uses: shoulders, arms, elbows, wrists, legs, knees, ankles, toes and eyes on both sides, the neck, head, hips, spine, chest and upper chest, plus every finger bone (used by [Finger Spreading](#finger-spreading)). Click the button on a row to pick the matching bone from a searchable list.

Only use overrides when a bone isn't detected automatically, or the wrong bone was picked. Leave the rest on their default.

---

## Scale Matching

Shown only when the scene has **more than one armature**. It scales one armature's proportions to match another, e.g. to make an outfit armature match the body:

1. Pick the **Reference Armature** (the one to match)
2. Pick the **Scaling Armature** (the one to change)
3. Click **Match Scale**

---

## Basic Workflow

1. **Import your model** using [Quick Access](Quick-Access)
2. **Fix Model** if it's an MMD/VRM model
3. Open the **Scaling** panel
4. Set **Target Height** (or click the arrow to keep the current height)
5. Click **Rescale Armature**
6. Optionally **Spread Fingers**
7. Check the result, then export

Every scaler button can be undone with **Ctrl+Z**.

---

## Best Practices

### Recommended Avatar Heights

**For VRChat:**

| Height Range | Description | Use Case |
|-------------|-------------|----------|
| 165cm (5'5") | Ideal average | Most versatile, comfortable for all |
| 160-170cm | Comfortable range | Good for most avatars |
| 150-160cm | Shorter avatars | Cute characters, children |
| 170-180cm | Taller avatars | Tall characters, warriors |
| 140-150cm | Very short | Chibi, small creatures |
| 180-200cm | Very tall | Giants, monsters (use sparingly) |

**General Guidelines:**
- Too short: Hard to interact with world objects
- Too tall: Can clip through ceilings, appears intimidating
- Average: Most comfortable for social interaction
- Consider your avatar type and use case

### When to Scale

**Scale BEFORE:**
- Setting up eye tracking
- Setting up visemes
- Creating shape keys
- Final optimization
- Exporting

**Scale AFTER:**
- Importing model
- Fixing MMD model
- Basic mesh cleanup

### Testing Scale

**In VRChat:**
- Test in-game before finalizing
- Ask others how you appear
- Check mirror view
- Test interaction with world objects

---

## Common Scale Issues

### Buttons are greyed out

No armature was found. Select your avatar's armature in Cats' armature dropdown, or click it in the viewport so it is the active object.

### A bone is reported missing, or the result looks twisted

The scaler couldn't find a bone, or picked the wrong one. Tick **Show bone mapping** under Customization and set that bone in [Bone Overrides](#bone-overrides).

### Avatar Appears Wrong Size in VRChat

**Possible causes:**
- Scaled incorrectly in Blender
- Export settings wrong
- Unity import scale issues

**Solutions:**
- Click the arrow next to **Target Height** to read the avatar's current height and check it
- Use correct export settings in Cats
- Check Unity import scale (should be 1.0 for FBX)

### Proportions Look Wrong After Scaling

**Possible causes:**
- Model was resized manually before using the scaler
- Wrong bones detected
- Settings too extreme

**Solutions:**
- Undo, then try again with **Leg/Arm Scaling** and the thickness values closer to their defaults
- Check [Bone Overrides](#bone-overrides)
- Use **Core functionality toggle** to run one step at a time and see which one causes the problem

---

## Integration Notes

### With Optimization

Scale before or after optimization:
- Doesn't significantly affect [Optimization](Optimization) tools
- Bone merging works at any scale
- Atlas creation works at any scale

### With Export

Using [Quick Access](Quick-Access) export:
- Cats handles scale correctly
- FBX export maintains scale
- No additional settings needed

---

**Related Pages:**
- [Quick Access](Quick-Access) - Import/Export
- [Merge & Attach](Merge-and-Attach) - Merging models
- [Troubleshooting](Troubleshooting) - Scale issues

**External Resources:**
- [VRChat Avatar Scaling Guidelines](https://docs.vrchat.com/docs/avatar-scaling)
- [Immersive Scaler](https://github.com/triazo/immersive_scaler) - the original add-on Cats' scaler is based on

---

