# Changelog

## [unreleased]

### ⛰️  Features

- Add a version compatibility layer and hide Collada on Blender 5.0+ - ([23cdd39](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/23cdd392a022a0138904aa26052205b1da421f02))
- Add Traditional Chinese UI translation - ([1de68e4](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/1de68e477c069ad7e6d472f0246a37a497b8e124))
- Extend support down to Blender 4.2 LTS - ([50ce77f](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/50ce77f6307c7d4e103b7b34f89d7b37ad59a43c))
- Point updater and translation downloads at this repository - ([0b44252](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/0b44252843c206961b6b5dae7b3700b8ba34cbb8))
- Support Blender 5.4 and update manifest to the current schema - ([2e5805f](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/2e5805f1ed4ff982d2f356684fc5939e07df87f6))

### 🐛 Bug Fixes

- Make OpenCC optional so a missing wheel cannot stop MMD Tools loading - ([6fd1036](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/6fd103690204a81b1c1022b39e9a2062b179e572))
- Make pose mode enter/exit work on every supported Blender - ([54e927f](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/54e927f62f4156591832a41995d7ffecfc74f8e0))
- Add recursion guard to enum items callback for defense-in-depth - ([d432251](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/d4322512133e91ea6a47db635e28b41c5f72a639))
- Prevent infinite recursion in enum property fix during object deletion - ([60743bb](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/60743bbd62a75616d3e36ae31e0e9ce1c0b10192))

### 🚜 Refactor

- Keep PoseBone.hide as base logic and shim it for Blender 4.x - ([de0f47d](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/de0f47d5d0208c0a838998d49f4859733fd37d13))
- Modernize UI for Blender 5.0 and fix eye tracking panel errors - ([985c3f3](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/985c3f300f9e9c323ef1574bb0005cbc52aad576))

### 📚 Documentation

- Document the compatibility policy - ([d3ba7ae](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/d3ba7aeee07717846409ca35e3ea35daae735ac2))
- Drop the upstream comparison section from the README - ([6cbbf01](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/6cbbf0176342a63b9c2a6510d98551d7bb62754a))
- Document the supported Blender range and the new language - ([db7a8fe](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/db7a8feb5f48eab7d27d538ae038aa81a5130a57))
- Rewrite README for the independent fork - ([9ed84ef](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/9ed84eff91f0906c3771880862eef710c9778c41))

### ⚡ Performance

- Defer the requests and OpenCC imports to cut start-up by ~135ms - ([7f702e7](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/7f702e79f37419407d0a57c4ab2c86bd7f20c847))

### 🎨 Styling

- Format code to fix line length and import ordering - ([0c3cef3](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/0c3cef3407d4e2f076aed287eed64f3860b45a6f))

### ⚙️ Miscellaneous Tasks

- Restore the 5.3.8 version after a mangled automated bump - ([ba57fc3](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/ba57fc310620a666a733bd7f063ec6d6220f4991))
- Adopt the shared release workflows and enable Dependabot - ([3e62c4d](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/3e62c4d4d15c9d30439a4b15b35060ee94c27561))
- Update extension build workflow actions - ([99062a7](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/99062a75d5f6b01f5a63ec69749c578a31cac0df))
- Drop the maintainer email address from the manifest - ([b4b1c1b](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/b4b1c1ba7b592fe95dc2cf4b7b4d7e4cde8a248a))
- Release 5.3.6 - ([35de6ba](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/35de6ba391f1cbf8aed0d75d9a4ed47367c9a5ad))
- Release 5.3.4 - ([84f4212](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/84f42126dcff666b07bd28a179a3b8a1a0af2a21))
- Keep Blender out of the extension payload - ([ac16c75](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/ac16c750c114b2e6a8f019fae194047ae2604fe4))
- Grant the token write access so releases can be published - ([478f8bc](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/478f8bc23112d7860e77c18ee48ba67dc49f1105))
- Create the output directory before building - ([3a0ca64](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/3a0ca64c7db74c5993cdd120144a5004d22184d2))
- Replace stale test workflow with extension build - ([fd5f426](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/fd5f426afb5dc7e84393aa25488ea6c1a6e7465d))
- Drop dead immersive_scaler submodule config - ([e6f7925](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/e6f79257cf2aa1e72496edded1ee09bbdcb0324e))

### Fix

- Prevent enum warnings when deleting armatures in Blender 5.0 - ([9ba43f6](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/9ba43f6c1d8cdb68edc37d50aa3ffa9a79e6c464))
- Prevent crash when removing bone collections in EDIT mode - ([4cdbf2d](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/4cdbf2dfabdd52d6be1ac9c480ce5bf03dd1ffb2))
- Armature merge respects Apply Transforms checkbox - ([3b20d14](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/3b20d14030941fa0962d07acdb886e6a95239060))
- Prevent crash when removing bone collections in EDIT mode - ([6c8bea3](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/6c8bea3430e5ee8ee83a4163c720c56e7e69cac7))
- Armature merge respects Apply Transforms checkbox - ([04b87f4](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/04b87f48a0c310250ee9d0b9af8375c3975375b9))

### Action

- Update version in `blender_manifest.toml` and update `CHANGELOG.md` - ([59d8b8e](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/commit/59d8b8e649e81015027dbc1fcbcff2f6ca0a7a07))

## New Contributors ❤️

* @opencode-agent[bot] made their first contribution
* @github-actions[bot] made their first contribution
* @T2PeNBiX99wcoxKv3A4g made their first contribution
* @ made their first contribution
* @RinaDev-xyz made their first contribution
* @lazulit3 made their first contribution
* @rurre made their first contribution

<!-- generated by git-cliff -->
