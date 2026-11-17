# Bone Tools

**Bone Tools** is a panel for *generating* new bone structures on your armature. These tools were previously buried in "Other Options" and now have their own home (they aren't cleanup/optimization, so they don't belong under [Optimization](Optimization)).

---

## Create Digitigrade Legs

Converts a standard humanoid leg setup into a **digitigrade** (animal-style) configuration the reverse-jointed legs used on many furry/creature avatars.

- Restructures the leg bones
- Adds the proper bone configuration for digitigrade movement

**Requirements:** a properly rigged humanoid leg to start from, and an understanding of digitigrade anatomy.

### Tutorial

Generating the bones is only half the job, you also need aim constraints set up for the legs to behave correctly.

> 📖 **[Digitigrade aim constraint setup](https://www.furaffinity.net/view/44035707/)** (FurAffinity)
>
> ⚠ This setup is **desktop-only**. It does not work in VR.

Neither the tutorial nor its author are affiliated with Cats, we link it because it is the clearest walkthrough we know of.

---

## Generate Twist Bones

Adds a **twist-bone** system for smoother arm/leg deformation. Twist bones sit between joints and distribute rotation, which reduces the "candy-wrapper" pinching you get on wrists and upper arms.

- **Upper Body** also generate twist bones for the upper arms/limbs.

**Consider:** twist bones increase the bone count and require correct weight painting to be useful.

### Tutorial

The generated bones need constraints set up before they do anything.

> 📖 **[Twist bone constraint setup](https://www.youtube.com/watch?v=eOwd5KNypfA)** (YouTube)
>
> 📝 You can skip straight to the Unity section, the Blender part is what Cats already did for you.

Neither the tutorial nor its author are affiliated with Cats, we link it because it is the clearest walkthrough we know of.

---

## When to use these

- You want higher-quality deformation and have bone budget to spare (twist bones).
- You're building an animal/creature avatar that needs reverse-jointed legs (digitigrade).

Run these **after** your rig is fixed and translated, and **before** final weight cleanup.

---

**Related Pages:**
- [Optimization](Optimization) - Mesh & bone cleanup lives here
- [Mesh Cleanup](Optimization#mesh-cleanup) - General mesh preparation
- [Bone Parenting](Bone-Parenting) - Root bone management
- [Troubleshooting](Troubleshooting) - Common rigging issues

---

**Last Updated:** July 29, 2026 |  **Plugin Version:** 5.3.1.0 | **Blender:** 5.2 and 5.3 (5.2 LTS recommended)
