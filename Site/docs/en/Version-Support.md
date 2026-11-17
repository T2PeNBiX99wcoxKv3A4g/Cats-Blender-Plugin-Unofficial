# Version Support

Which Blender versions Cats supports, and where to get older releases.

## Currently Supported

| Blender | Status | End of Life |
|---|---|---|
| **5.2 LTS** | ✅ Supported (recommended) | 1 month after the next Blender LTS is released (no date set yet) |
| **5.3** | ✅ Supported | When Blender 5.4 is released |

The current Cats release is **`5.3.1.0`** and runs on both Blender 5.2 and 5.3.

> ⚠ **Blender 5.1 and below are not supported.** See [End of Life](#end-of-life-versions) below.

## End of Life Versions

> ⚠ **Do not report issues for these versions, they are no longer supported.**

Cats for Blender **5.1 and every earlier version** is end of life. No new features, no bug fixes, and issues will be closed with a "please upgrade" response.

| Blender | Support ended | Last Cats release for it |
|---|---|---|
| **5.1** | November 2026 (Cats `5.3.1.0`) | `5.3.0.0` |

Older, unsupported Cats releases are archived here:
- **[Releases](https://git.neoneko.org/Yusarina/Cats-Blender-Plugin/releases)** - Cats `5.3.0.0` and earlier, the last releases that install on Blender 5.1
- **[Legacy releases Blender 3.6 - 5.0 (Disroot)](https://git.disroot.org/Neoneko/Cats-Blender-Plugin/releases)**
- **[Legacy wiki (Disroot)](https://git.disroot.org/Neoneko/Cats-Blender-Plugin/wiki)** - documentation for those older versions
-  **[Original Cats Blender Plugin Blender 3.5 and Below (GitHub)](https://github.com/absolute-quantum/cats-blender-plugin)**

If you must stay on an older Blender, download the matching legacy Cats release from the link above and understand it is unsupported.

## Support Policy

We support **two Blender versions at a time: one current minor release and one LTS.** Right now that's **Blender 5.3** (minor) and **Blender 5.2 LTS**.

- **Minor releases:** when a new minor version of Blender is released, we drop support for the previous minor, usually within about a week of the new release.
- **LTS releases:** when a new LTS is released, we keep supporting the previous LTS for **one month** alongside the new one, after which it becomes end of life.
- **Older versions** may still receive occasional bug patches when new versions are released, but no new features.

## Upgrading Blender

1. **Download** Blender 5.2 LTS from [blender.org](https://www.blender.org/download/) (it can coexist with older installs).
2. **Install Cats** - remove any old Cats version first, then follow the [Installation](Installation) guide.
3. **Migrate projects** - open your `.blend` files in the new Blender, test, and keep backups.

> 📝 Blender opens files from older versions, but files saved in a newer Blender may not open correctly in older ones. Migrating from 3.x may require opening/saving in 4.x first.

## Checking Your Versions

**Cats version:** Edit > Preferences > Extensions > "Cats Blender Plugin".
**Blender version:** Help > About Blender.

**Updating Cats:** watch for update notices in the [Settings](Settings) panel, grab the latest from [Releases](https://git.neoneko.org/Yusarina/Cats-Blender-Plugin/releases), follow the [Installation](Installation) guide, and restart Blender.

## Getting Help

- **Supported (Blender 5.2 / 5.3):** open an issue on the [repository](https://git.neoneko.org/Yusarina/Cats-Blender-Plugin) or check this wiki.
- **Unsupported versions:** no official support, issues will be closed. Please upgrade to a supported Blender.

> We no longer run a Discord server or website all support happens on the Git repository.

---

**Related Pages:**
- [Installation](Installation) - Install Cats
- [Settings](Settings) - Update management
- [FAQ](FAQ) - Common questions
- [Troubleshooting](Troubleshooting) - Solving issues

---

**Last Updated:** November 10, 2026 |  **Plugin Version:** 5.3.1.0 | **Blender:** 5.2 and 5.3 (5.2 LTS recommended)
