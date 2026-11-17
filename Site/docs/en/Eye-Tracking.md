# Eye Tracking

The Eye Tracking panel provides tools for setting up eye movement and blinking animations on your avatars for VRChat.

## Overview

Eye tracking allows your avatar's eyes to follow your real-world eye movements in VR, and set up blinking animations. This feature is essential for natural-looking avatars in VRChat.

## Mode Selection

The Eye Tracking panel offers two modes:

### SDK3 Mode
- Simplified setup for VRChat SDK3
- Automatic bone rotation configuration
- Direct eye bone assignment
- **Recommended for most users**
- Faster setup process

### Legacy Mode
- Complete eye tracking setup
- Customizable eye movement
- Advanced blinking controls
- Shape key integration
- More control over parameters

> 💡 **Tip:** Do not use Legacy Mode for VRChat, Legacy mode is only for other games like ChilloutVR, VRChat eye tracking is now set up in Unity.

---

## SDK3 Mode Setup

SDK3 Mode provides a streamlined setup process.

### Requirements
- Eye bones in your armature
- Head bone in your armature
- Properly weighted eyes

### Step-by-Step Setup

1. **Select Mode:**
   - Choose **SDK3 Mode** in the panel

2. **Select Bones:**
   - **Head Bone:** Select your head bone
   - **Left Eye Bone:** Select left eye bone
   - **Right Eye Bone:** Select right eye bone

3. **Configure Movement:**
   - Cats will automatically set up rotation limits
   - Eye bones will be configured for tracking

4. **Test:**
   - Use the testing controls
   - Verify eye movement is natural

That's it, not you have to set the rest up in Unity.

---

## Legacy Mode Setup

Legacy Mode provides more control and options for other games or software like ChilloutVR.

### Bone Selection

#### Head Bone
- Select the main head bone
- Used as reference for eye rotation
- Usually named "Head" or "head"

#### Eye Bones
- **Left Eye Bone:** Left eye control bone
- **Right Eye Bone:** Right eye control bone
- These bones should be parented to the head
- Typically named "Eye_L" / "Eye_R" or similar

> 📝 **Note:** Cats can auto-detect bones with common names.

### Shape Key Configuration

For blinking and eye animations:

#### Wink Shape Keys
- **Wink Left:** Shape key for left eye closed
- **Wink Right:** Shape key for right eye closed
- Used for blinking and winking expressions

#### Lower Lid Controls
- **Lower Lid Left:** Shape key for left lower lid
- **Lower Lid Right:** Shape key for right lower lid
- Creates more natural blink animations
- Optional but recommended

### Eye Movement Settings

**Distance Adjustment:**
- Controls how far eyes can move
- Higher values = more movement
- Lower values = more subtle
- Default is usually good

**Rotation Controls:**
- X Axis: Horizontal movement (left/right)
- Y Axis: Vertical movement (up/down)
- Adjust these during testing

### Additional Options

**Disable Eye Blinking:**
- Prevents automatic blinking
- Use if you want manual control
- Or if model doesn't support blinking

**Disable Eye Movement:**
- Locks eye rotation
- Eyes won't follow gaze
- Use for stylized or static eyes

**Eye Distance:**
- Adjusts spacing between eye targets
- Fine-tune for your model
- Affects how eyes converge

**Mesh Selection:**
- For multi-mesh models
- Select which mesh contains shape keys
- Usually the body or face mesh

---

## Testing Mode

Both modes include testing features.

### Eye Movement Testing

**Real-Time Preview:**
- Test eye rotation in Blender
- See how eyes move
- Verify natural movement

**X/Y Axis Controls:**
- Sliders to test horizontal/vertical movement
- Move eyes left/right and up/down
- Check full range of motion

**Distance Adjustment:**
- Test how far eyes move
- Adjust for your model's proportions

**Reset Position:**
- Return eyes to center
- Clear all test rotations
- Start fresh

### Blinking Controls

**Blink Shape Testing:**
- Test wink shape keys
- Verify eyelids close properly
- Check both eyes individually

**Lower Lid Animation:**
- Test lower lid movement
- Ensure natural blink appearance
- Verify shape key assignment

**Animation Preview:**
- See full blink cycle
- Check timing and smoothness

---

## Workflow

### Basic Eye Tracking Setup

1. **Choose your mode** (SDK3 for VRChat, Legacy for other games that need it)
2. **Select bones:**
   - Head bone
   - Left and right eye bones
3. **If using Legacy, set up shape keys:**
   - Wink left/right
   - Lower lids (optional)
4. **Test eye movement:**
   - Use X/Y controls
   - Verify natural motion
5. **Test blinking:**
   - Check blink shapes
   - Adjust if needed
6. **Export your model**

### Advanced Setup (Legacy Mode)

1. **Select Legacy Mode**
2. **Configure bones** as above
3. **Set up all shape keys:**
   - Wink left
   - Wink right
   - Lower lid left
   - Lower lid right
4. **Adjust settings:**
   - Eye distance
   - Movement range
   - Rotation limits
5. **Test thoroughly:**
   - All directions
   - Blinking
   - Combinations
6. **Fine-tune:**
   - Adjust distances
   - Tweak shape key strength
7. **Export**

---

## Tips and Best Practices

### Bone Setup

**Eye Bone Position:**
- Should be centered in the eyeball
- Not at the surface
- Rotation pivot point

**Eye Bone Rotation:**
- Should be aligned with head
- Z-axis pointing forward (usually)
- Test in multiple directions

### Weight Painting

**Eye Mesh Weights:**
- Eyes should be 100% weighted to their eye bones
- No weight bleeding to other bones
- Clean weight distribution

**Eyelid Weights:**
- Can have mixed weights between head and eye bones
- Depends on desired deformation
- Test blinking to verify

### Shape Key Creation

**Good Wink Shape Keys:**
- Eyes fully closed
- Natural eyelid position
- Matches eye shape
- No clipping or gaps

**Good Lower Lid Shape Keys:**
- Subtle movement
- Follows upper lid motion
- Natural squint appearance
- Optional but adds realism

### Testing

**In Blender:**
- Test all directions
- Check at extreme ranges
- Verify blinking
- Look from multiple angles

**In VRChat:**
- Test with actual eye tracking
- Check with others
- Verify in mirrors
- Adjust if needed

---

## Common Issues

### Eyes Don't Move

**Possible causes:**
- Eye bones not selected
- Eye bones not weighted properly
- Movement disabled in settings

**Solutions:**
- Verify bone selection
- Check weight painting on eye meshes
- Ensure "Disable Eye Movement" is off

### Eyes Look Weird When Moving

**Possible causes:**
- Incorrect bone rotation
- Wrong pivot points
- Bad weight painting

**Solutions:**
- Check eye bone rotation (should match head forward direction)
- Verify bone is centered in eye mesh
- Fix weight painting on eyes

### Blinking Doesn't Work

**Possible causes:**
- Shape keys not assigned
- Wrong mesh selected
- Blinking disabled

**Solutions:**
- Verify wink shape keys are assigned
- Select correct mesh in panel
- Check "Disable Eye Blinking" is off

### Eyes Cross or Diverge Incorrectly

**Possible causes:**
- Eye distance setting wrong
- Bone positions incorrect

**Solutions:**
- Adjust eye distance slider
- Verify eye bones are positioned correctly
- Test with different distance values

### Eyelids Clip Through Eyes

**Possible causes:**
- Shape keys too extreme
- Mesh topology issues

**Solutions:**
- Adjust shape keys to be less extreme
- Fix mesh topology around eyes
- Use shape key drivers to limit range

---

## Integration Notes

### With Material Combining and Atlassing

> ⚠ **Important:** Set up eye tracking **AFTER** combining materials and creating an atlas. The old Material Combiner add-on could misalign shape keys if run after eye tracking setup; the built-in [Atlas Generator](Optimization#atlas-generator) only changes materials and UVs, but keep the same order.

**Recommended order:**
1. Import model
2. Combine materials / Create atlas
3. Set up eye tracking
4. Set up visemes
5. Export

---

**Related Pages:**
- [Visemes](Visemes) - Setting up lip sync
- [Quick Access](Quick-Access) - Import/Export
- [Shape Keys](Optimization#shape-keys) - Shape key tools
- [Troubleshooting](Troubleshooting) - Common issues

**External Resources:**
- [VRChat Eye Tracking Documentation](https://docs.vrchat.com/docs/eye-tracking)

---

**Last Updated:** November 10, 2026 |  **Plugin Version:** 5.3.1.0 | **Blender:** 5.2 and 5.3 (5.2 LTS recommended)
