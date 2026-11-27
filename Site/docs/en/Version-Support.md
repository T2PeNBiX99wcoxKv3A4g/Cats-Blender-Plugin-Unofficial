# Version Support {#version-support}

Which Blender versions this build of Cats supports.

## Supported Versions {#supported-versions}

| Blender | Status |
|---|---|
| **4.2 LTS** | ✅ Supported (minimum) |
| **4.5 LTS** | ✅ Supported |
| **5.0** | ✅ Supported |
| **5.1** | ✅ Supported |
| **5.2 LTS** | ✅ Supported (recommended) |
| **5.3** | ✅ Supported |
| **5.4** | ✅ Supported (alpha builds only) |

One build covers all of them. The same ZIP installs on every version in the table, so you do
not have to match a Cats release to a Blender release.

## Unsupported Versions {#unsupported-versions}

> ⚠ **Blender 4.1 and older are not supported.**

Cats ships as a Blender **extension**, and the extension system only exists from Blender 4.2
onwards. Older versions cannot install it at all, with or without a warning.

## Why 4.2 Is the Floor {#why-42-is-the-floor}

Blender 4.2 introduced extensions: a manifest, an install dialog, and automatic installation
of bundled Python wheels. This add-on uses all three, so there is no way to load it on an
older Blender without rewriting it as a legacy add-on.

If you need to run Cats on something older than 4.2, the last release that still worked
there is the original project, which is no longer maintained.

## Support Policy {#support-policy}

Cats is an unofficial community continuation. Support is best effort:

- Issues and questions go to the [GitHub repository](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/issues).
- Every Blender version in the table above is tested before a release.
- There is no end-of-life schedule. When a Blender release drops out of support, the release
  notes say so.
- Releases are cut from `main` automatically, so the newest build is always the one on the
  [releases page](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/releases).

## Upgrading {#upgrading}

1. **Download** the newest release from the [releases page](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/releases).
2. **Install Cats** - follow the [Installation](./Installation.md) guide. Blender replaces the
   previous version in place.
3. **Restart Blender** so the new code is loaded.
4. **Migrate projects** - open your `.blend` files, check the result, and keep backups.

> 📝 Blender opens files from older versions, but files saved in a newer Blender may not open
> correctly in older ones.

## Checking Your Versions {#checking-your-versions}

- **Cats version:** Edit > Preferences > Get Extensions, then look at *Cats Blender Plugin
  (Unofficial)*.
- **Blender version:** Help > About Blender.

**Updating Cats:** the built-in updater in the [Settings](./Settings.md) panel lists every
release; Blender refuses to install one your Blender cannot run.

## Getting Help {#getting-help}

- Open an issue on the [repository](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/issues).
- Check [Troubleshooting](./Troubleshooting.md) and the [FAQ](./FAQ.md) first.

---

**Related Pages:**
- [Installation](./Installation.md) - Install Cats
- [Settings](./Settings.md) - Update management
- [FAQ](./FAQ.md) - Common questions
- [Troubleshooting](./Troubleshooting.md) - Solving issues
