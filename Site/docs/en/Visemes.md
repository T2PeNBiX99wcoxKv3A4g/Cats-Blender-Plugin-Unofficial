# Visemes

The Visemes panel helps you set up viseme shape keys for lip sync and facial animations in VRChat.

## What Are Visemes?

Visemes are mouth shapes that correspond to different speech sounds. They allow your avatar to lip sync automatically in VRChat when you speak.

VRChat uses three main viseme shapes:
- **Mouth A ('ah'):** Open mouth for vowel sounds
- **Mouth O ('oh'):** Rounded lips for 'o' and 'u' sounds  
- **Mouth CH:** Closed, forward lips for 'ch' and 'sh' sounds

## Requirements

- A mesh with shape keys for mouth movements
- Properly named shape keys (or ability to assign them)

## Mesh Selection

When you have multiple meshes in your scene:
- **Select the target mesh** that contains your face/mouth
- This is usually the body or head mesh
- The mesh must have shape keys

## Viseme Settings

### Preview Controls

**Preview Visemes:**
- Test viseme shapes in real-time
- See how each shape looks
- Adjust values while previewing

**Stop Preview:**
- Return to default state
- Resets all shape keys to 0
- Exit preview mode

**Preview Selection:**
- Dropdown to choose specific viseme to test
- Test Mouth A, Mouth O, or Mouth CH individually
- Useful for fine-tuning each shape

### Shape Key Assignment

Cats needs to know which shape keys correspond to each viseme.

#### Mouth A ('ah' sound)
- Select the shape key for open mouth
- Used for vowel sounds like 'a', 'e'
- Usually the widest mouth opening
- Example names: "a", "ah", "mouth_open"

**How to assign:**
1. Click the dropdown for Mouth A
2. Select the appropriate shape key from your mesh
3. Test with Preview

#### Mouth O ('oh' sound)
- Select the shape key for rounded lips
- Used for 'o' and 'u' sounds
- Lips form an O shape
- Example names: "o", "oh", "mouth_o"

**How to assign:**
1. Click the dropdown for Mouth O
2. Select the appropriate shape key
3. Test with Preview

#### Mouth CH
- Select the shape key for closed, forward lips
- Used for 'ch', 'sh' sounds
- Lips pushed forward but mostly closed
- Example names: "ch", "mouth_ch", "sil"

**How to assign:**
1. Click the dropdown for Mouth CH
2. Select the appropriate shape key
3. Test with Preview

### Shape Intensity

- Adjusts the strength/multiplier of viseme shapes
- Range: 0.0 to 2.0 (typically)
- Default: 1.0 (Default should be fine in most cases)
- **Lower values:** More subtle lip sync
- **Higher values:** More exaggerated lip sync

**How to adjust:**
1. Move the slider or enter a value
2. Use Preview to see the effect
3. Find a natural-looking intensity
4. Recommended range: 0.8 to 1.2

## Auto Viseme Setup

The **Auto Viseme Setup** feature attempts to automatically configure visemes:

**What it does:**
- Searches for common shape key names
- Automatically assigns them to viseme slots
- Creates basic lip sync configuration
- Sets default intensity values

**How to use:**
1. Click **Auto Viseme Setup**
2. Review the assignments
3. Adjust if needed
4. Test with Preview

**When it works best:**
- Models with standard shape key names
- MMD models (after fixing)
- Models from common sources

> 💡 **Tip:** Even if Auto Setup doesn't get everything right, it's a good starting point. You can manually adjust assignments afterward.

## Workflow

### Basic Viseme Setup

1. **Import your model** using [Quick Access](Quick-Access)
2. **Open the Visemes panel**
3. **Select your mesh** (if you have multiple)
4. **Try Auto Viseme Setup** first
5. **Review assignments:**
   - Check each viseme shape key
   - Adjust if needed
6. **Test with Preview:**
   - Preview each viseme
   - Adjust intensity
7. **Export your model**

### Manual Viseme Setup

If Auto Setup doesn't work or you need more control:

1. **Identify your shape keys:**
   - Go to Shape Keys panel in Blender
   - Note which shapes are for mouth movements
2. **Assign each viseme manually:**
   - Mouth A: Open mouth shape
   - Mouth O: Rounded mouth shape
   - Mouth CH: Closed/forward mouth shape
3. **Test each one:**
   - Use Preview to verify
   - Adjust intensity as needed

## Tips and Best Practices

### Creating Good Visemes

If creating shape keys from scratch:

**Mouth A:**
- Jaw should be open
- Teeth visible
- Tongue slightly visible
- Natural 'ah' expression

**Mouth O:**
- Lips form an O shape
- Jaw slightly open
- Lips pushed slightly forward
- Like saying 'oh' or 'oo'

**Mouth CH:**
- Lips closed or nearly closed
- Lips pushed forward
- Like the ending of 'much' or 'ssh'
- Slight pucker

### Testing Visemes

1. **Test in Blender first:**
   - Use Preview feature
   - Check from multiple angles
   - Verify shapes look natural
2. **Test in VRChat:**
   - Upload and test in-game
   - Ask others how it looks
   - Adjust if needed

### Common Issues

**Visemes too subtle:**
- Increase Shape Intensity
- Check that shape keys have enough movement
- Verify correct shape keys are assigned

**Visemes too exaggerated:**
- Decrease Shape Intensity
- Check that shape key values aren't too extreme
- Test in VRChat (may look different than in Blender)

**Mouth doesn't move:**
- Verify visemes are assigned
- Check that shape keys exist on the correct mesh
- Ensure mesh is selected in Visemes panel

**Wrong shapes appear:**
- Check viseme assignments
- Verify shape key names
- Re-assign manually if needed

## Advanced Options

### Multiple Meshes

If your avatar has separate meshes:
- Body mesh with visemes
- Head mesh with visemes
- Only one mesh can have active visemes
- Choose the mesh that should animate

### Custom Viseme Systems

Some models use different viseme systems:
- Standard 3-viseme (VRChat default)
- 15-viseme (advanced, not covered here)
- Custom blend shapes

Cats supports the standard 3-viseme system.

## Viseme Systems Explained

### Why 3 Visemes?

VRChat's simplified system uses 3 visemes because:
- Efficient for real-time lip sync
- Good balance of accuracy and performance
- Easier to set up than full phoneme systems
- Works well with voice recognition

### How It Works in VRChat

1. VRChat analyzes your voice input
2. Determines which sounds you're making
3. Activates appropriate viseme shape keys
4. Blends between shapes for smooth animation

## Oculus Viseme Reference

For more detailed information about viseme implementation:
- [Official Oculus Viseme Reference](https://developer.oculus.com/documentation/unreal/audio-ovrlipsync-viseme-reference/)

---

## Integration with Other Tools

### After Material Combining

> ⚠ **Important:** Set up visemes **AFTER** combining materials and creating an atlas. The old Material Combiner add-on could misalign shape keys if run after viseme setup; the built-in [Atlas Generator](Optimization#atlas-generator) only changes materials and UVs, but keep the same order.

**Recommended order:**
1. Import model
2. Fix MMD model (if needed and only if vrm/mmd model)
3. Combine materials / Create atlas
4. Set up visemes
5. Set up eye tracking
6. Export

### With Eye Tracking

Visemes and [Eye Tracking](Eye-Tracking) work together:
- Both use shape keys
- Can be set up independently
- Test both after setup
- No conflicts between them

---

**Related Pages:**
- [Eye Tracking](Eye-Tracking) - Setting up eye movement
- [Quick Access](Quick-Access) - Import/Export
- [Shape Keys](Optimization#shape-keys) - Shape key tools
- [Troubleshooting](Troubleshooting) - Common issues

---

