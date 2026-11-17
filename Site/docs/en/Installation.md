# Installation Guide

This guide covers installing Cats Blender Plugin for **Blender 4.2 LTS through 5.4** (5.2 LTS recommended).

> #### If you were told to follow these instructions and clearly have not, your issue will be closed no ifs, no buts.

## Requirements

### Required Software
- **Blender 4.2 LTS or newer** (through 5.4; we recommend **Blender 5.2 LTS**)
  - Download from [blender.org](https://www.blender.org/download/)
  - Use the official build from blender.org or the Steam version. Other builds are not supported.

> ⚠ **Blender 4.1 and below are not supported.** The add-on ships as a Blender extension, and the extension system only exists from 4.2 onwards.


### Python Dependencies
- If Blender uses a custom Python install, ensure **NumPy** is available.

> ⚠ **Windows Store users:** Cats may work with the Windows Store build of Blender, but it is not officially supported. Use the official build from [blender.org](https://www.blender.org/).

> ⚠ **Linux users:** We do **not** support distro or package-manager builds of Blender, including Snap and Flatpak versions. These builds often do not use Blender's bundled Python environment, which causes compatibility issues with wheels and other dependencies.
>
> We are not going to bend over backwards for users who refuse to use the official build because of some pointless Linux culture war about how "my distro does everything better." Use the official Blender build from [blender.org](https://www.blender.org/). **It's fucking simple.**
>
> We are Linux users ourselves, and we hate that this even needs to be said. Just use the official version from the Blender website.
>
> Any issue caused by using an unsupported distro, Snap, Flatpak, or other repackaged build will be closed immediately. Our stance on this is clear.

## Installation Steps

### Step 1: Download Cats

Get the latest release from the repository:
- **Releases:** [GitHub](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/releases)

> 📝 Download the ZIP and **do NOT extract it** Blender's extension system needs the original ZIP.

> 📝 Make sure you **don't** already have the original/official Cats installed; the two conflict. Restart Blender if you had another version installed.

### Step 2: Install via Blender's Extension System

1. Open **Blender 5.2 or 5.3**.
2. Go to **Edit > Preferences**.
3. Select the **Extensions** tab.
4. Click **Install from Disk** (the down-arrow icon, top-right).
5. Select the Cats ZIP and click **Install from Disk**.

### Step 3: Enable the Extension

Cats usually enables automatically. If not, search "cats" in the Extensions list and tick the box next to it.

### Step 4: Verify Installation

1. Open the **3D Viewport**.
2. Press **N** to open the sidebar.
3. Click the **Cats** tab.

## Optional Dependencies

Some features used to need additional add-ons. None are required any more:

### Material Combiner (texture atlasing)
No longer needed or supported. Since `5.3.1.0` Cats only has its built-in [Atlas Generator](Optimization#atlas-generator), and the old *Atlas Generator (Legacy)* panel that drove Material Combiner is gone. If Material Combiner is still installed you can use **Import Material Combiner Settings** once to carry your settings over, then remove it.

### Scaling tools
No longer needed. The [Scaling](Scaling) panel used to require the separate Immersive Scaler add-on. Cats now has its own scaler built in. If you still have Immersive Scaler installed, you can remove it.

## Troubleshooting Installation

**Extension doesn't appear** - check it's enabled in Extensions preferences, confirm your Blender version is supported (4.2 LTS through 5.4), and **restart Blender completely**.

**Errors during install** - confirm your Blender version is supported (4.2 LTS through 5.4), re-download in case the ZIP is corrupt, and check you have write permission to the extensions folder.

**Cats tab missing** - press **N**, confirm the extension is enabled, and check the console (Window > Toggle System Console) for errors.

**Don't install separate MMD Tools** - Cats bundles its own MMD Tools; a separate install will conflict. Remove any standalone MMD Tools we tend to keep this updated, but you can update it yourself.

**Previously installed an older version** - remove it, **restart Blender**, then install the new version.

## Next Steps

- Read the [Quick Access](Quick-Access) guide for the basics.
- Browse the [Interface Guides](Home#interface-guides).
- Check the [FAQ](FAQ) and [Troubleshooting](Troubleshooting) if you run into issues.

---

**Need help?** See the [Troubleshooting](Troubleshooting) page, or open an issue on the [repository](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial).

---

