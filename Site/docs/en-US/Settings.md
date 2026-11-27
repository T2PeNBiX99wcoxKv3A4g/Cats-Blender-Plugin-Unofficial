# Settings {#settings}

The Settings and Updates panel provides configuration options and update management for Cats Blender Plugin.

## General Settings {#general-settings}

### Export Options {#export-options}

#### Embed Textures {#embed-textures}
- Includes textures directly in exported files
- Increases file size
- Self-contained exports
- Useful for sharing models

**When to enable:**
- Sharing FBX files with textures
- One-file distribution
- No separate texture management needed

> **DO NOT EMBED TEXTURES IF YOU ARE CREATING SOMETHING FOR UNITY/ VRCHAT MATERAILS SHOULD BE SETUP IN UNITY**

**When to disable:**
- Keeping file size small
- Managing textures separately in Unity
- Better organization of assets

#### Remove Rigidbodies/Joints {#remove-rigidbodiesjoints}
- Cleans physics during export
- Removes MMD physics data
- Reduces file complexity
- Recommended for VRChat exports

**When to enable:**
- Exporting MMD models
- Don't need physics data
- Cleaner exports

**When to disable:**
- Need to preserve physics
- Using physics in target application

#### Export Translation CSV {#export-translation-csv}
- Generates translation files during export
- Creates CSV with name mappings
- Since `5.2.4.0` includes a **source** column: dictionary, MMD author name, or the online service
- Useful for documentation
- Reference for translations

**When to enable:**
- Need translation documentation
- Want to review translations
- Creating model documentation

**When to disable:**
- Don't need translation records
- Reducing export time

#### Custom Export Directory {#custom-export-directory}
- Set preferred save location for exports
- Remembers your choice
- Faster workflow
- Organized file management

**How to set:**
1. Click folder icon
2. Navigate to desired location
3. Select folder
4. Future exports default here

---

## Language Settings {#language-settings}

### Interface Language {#interface-language}

Cats supports multiple languages for the user interface.

#### Available Languages {#available-languages}

- **English (en_US)** - Default
- **Japanese (ja_JP)**
- **Korean (ko_KR)**
- Additional languages as community provides translations

#### Changing Language {#changing-language}

1. Select language from dropdown
2. After about two seconds Cats reloads itself (only Cats, not your other add-ons)
3. UI elements update to selected language

No Blender restart is needed. If the labels don't change, restart Blender.

#### Custom Language Files {#custom-language-files}

Cats supports custom translation files:
- Bundled files are in `resources/translations/` inside the extension; **Download Latest Translations** saves newer copies to the `translations` folder in Cats' [user data folder](#settings-file-location), and those are used first
- A damaged or half-downloaded language file is skipped: Cats falls back to the bundled copy, then to English, instead of failing to load
- JSON format
- Community can contribute translations
- Add new languages easily

### Translation Management {#translation-management}

**Translation File Structure:**
- Each language has a JSON file
- Contains UI string mappings
- Easy to edit and extend
- Template available for new languages

---

## Debug Options {#debug-options}

### Maintenance Tools {#maintenance-tools}

#### Reset Google Dictionary {#reset-google-dictionary}
- Clears cached Google Translate data
- Useful if translations are incorrect
- Forces fresh translations
- Safe to use

**When to use:**
- Translations seem wrong
- Want fresh translation data
- After major updates
- Troubleshooting translation issues

**How to use:**
1. Click **Reset Google Dictionary**
2. Confirm action
3. Dictionary cache cleared

#### Translation Debugging (Dev Branch) {#translation-debugging-dev-branch}
- Available in development branch
- Shows translation process details
- Helps identify translation issues
- For advanced users/developers

#### System Cache Cleanup {#system-cache-cleanup}
- Clears various cached data
- Resets temporary files
- Can help with strange issues
- Safe to use periodically

**When to use:**
- Plugin behaving strangely
- After updates
- Troubleshooting unexplained issues

#### Configuration Reset Options {#configuration-reset-options}
- Restore default settings
- Clear custom configurations
- Return to fresh install state
- Use if settings are corrupted

> ⚠ **Warning:** Configuration reset cannot be undone. Your custom settings will be lost.

---

## Update Management {#update-management}

### Version Control {#version-control}

#### Update Notifications {#update-notifications}
- Automatic check for new versions
- Shows when updates are available
- Displays in plugin interface
- Non-intrusive notifications

**Configuration:**
- Enable/disable update checks
- Set check frequency
- Choose notification style

#### Automatic Update Checks {#automatic-update-checks}
- Runs once in the background when Cats loads
- Checks the releases on [GitHub](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/releases)
- Compares with installed version
- Shows update button when available

Since `5.3.1.0` the updater lists every Cats release, not only the ones made for your Blender version, because one release can support more than one Blender version. Blender itself checks each release's supported Blender range and refuses to install one your Blender can't run.

**How it works:**
1. Cats checks the release list on GitHub
2. Compares version numbers
3. Notifies if newer version exists
4. Provides download link

> **Requires Blender's Online Access.** Cats only checks for updates when **Edit > Preferences > System > Network > Allow Online Access** is turned on. With it off, the automatic check is skipped silently, and **Check for Updates** shows a message telling you online access is disabled.

#### Version Compatibility Info {#version-compatibility-info}
- Shows if Blender version is supported
- Warns about incompatible versions
- Recommends correct versions
- Prevents installation issues

#### Release Notes Access {#release-notes-access}
- View changelog for updates
- See what's new
- Understand bug fixes
- Access from update notification

### Managing Updates {#managing-updates}

#### Checking for Updates Manually {#checking-for-updates-manually}

1. Open Settings panel
2. Click **Check for Updates**
3. Wait for check to complete
4. Follow prompts if update available

#### Installing Updates {#installing-updates}

1. Download new version from link provided
2. Close Blender
3. Remove old version:
   - Go to Edit > Preferences > Extensions
   - Find Cats
   - Remove extension
4. Restart Blender
5. Install new version
6. Enable extension

> 📝 **Note:** Always restart Blender between removing old and installing new versions for cleanest installation.

#### Understanding Version Numbers {#understanding-version-numbers}

Cats uses semantic versioning with three parts:

- **Major.Minor.Patch** (for example `5.5.0`)
- **Major.Minor** tracks the Blender series this continuation started from; the same build still installs on every supported Blender version
- **Patch** counts releases, features and fixes together

Examples:

- `5.3.9` - a patch release
- `5.4.0` - the release that added the documentation site
- `5.5.0` - the release that added every UI language to the site

See [Version Support](./Version-Support.md) for which Blender versions each release supports.

---

## Settings Best Practices {#settings-best-practices}

### Export Settings {#export-settings}

**Recommended for VRChat:**
- ❌ Embed Textures: Off (handle in Unity)
- ✅ Remove Rigidbodies/Joints: On
- ❌ Export Translation CSV: Off (unless needed)
- ✅ Custom Export Directory: Set to your project folder

**Recommended for Sharing Models:**
- ✅ Embed Textures: On (easier for recipients)
- ✅ Remove Rigidbodies/Joints: On
- ✅ Export Translation CSV: On (documentation)
- ✅ Custom Export Directory: Set to exports folder

### Update Settings {#update-settings}

**Recommended:**
- ✅ Enable automatic update checks
- ✅ Check daily or weekly
- ✅ Read release notes before updating
- ✅ Keep backups before major updates

### Language Settings {#language-settings-1}

**For Best Experience:**
- Use English if comfortable (most documentation in English)
- Use native language for better understanding
- Report missing translations to help community
- Check if your language is available

---

## Troubleshooting Settings {#troubleshooting-settings}

### Settings Not Saving {#settings-not-saving}

**Possible causes:**
- Permission issues
- Corrupted preferences
- Blender not closing properly

**Solutions:**
- Check folder permissions
- Reset configuration
- Save Blender preferences manually
- Reinstall if necessary

### Updates Not Showing {#updates-not-showing}

**Possible causes:**
- Blender's **Allow Online Access** is turned off
- Update check disabled
- No internet connection
- Firewall blocking github.com
- VPN interfering
- A proxy or security software replacing HTTPS certificates (Cats verifies the update server's certificate)

**Solutions:**
- Turn on **Edit > Preferences > System > Network > Allow Online Access**
- Enable update checks
- Check internet connection
- Allow github.com in firewall
- Temporarily disable VPN
- Check the System Console: `URL ERROR` means Cats could not reach the update server or its certificate was not trusted

### Language Not Changing {#language-not-changing}

**Possible causes:**
- The automatic reload of Cats failed (check the System Console for `Cats reload failed`)
- Translation file missing
- Corrupted language file (Cats then falls back to the bundled file or English)

**Solutions:**
- Restart Blender completely
- Verify translation file exists
- Click **Download Latest Translations** again, or reinstall if needed

---
## Settings File Location {#settings-file-location}

Cats keeps its settings in its own user data folder, which survives Cats updates. It is the extension's folder under Blender's `extensions/.user` directory (the repository part is usually `user_default` when installed from disk):
- Windows: `%APPDATA%\Blender Foundation\Blender\5.x\extensions\.user\user_default\cats_blender_plugin\`
- macOS: `~/Library/Application Support/Blender/5.x/extensions/.user/user_default/cats_blender_plugin/`
- Linux: `~/.config/blender/5.x/extensions/.user/user_default/cats_blender_plugin/`

It holds:
- `settings.json` - your Cats settings, including translation service API keys
- `dictionary_google.json` - the cache of online translations
- `dictionary.json` and `translations/` - downloaded dictionary and language files

Your settings are global: they are re-applied every time you open a `.blend`, so a file saved with other values doesn't override them. Since `5.3.1.0` translation API keys, the LibreTranslate URL and the MyMemory email are **never written into `.blend` files**, and any that older versions saved into a file are removed from it when the file is opened.

> ⚠ **Warning:** Manual editing of these files can cause issues. Use the Settings panel when possible.

---

## Integration with Blender Preferences {#integration-with-blender-preferences}

Cats respects Blender's preferences:
- File paths
- Language settings (when possible)
- Interface scale
- Theme settings

Cats does **not** change your Blender preferences when it loads. Older versions switched on file compression and changed the add-on support filter; since `5.3.1.0` your preferences are left exactly as you set them.

---

## Changes Requiring Restart {#changes-requiring-restart}

Some settings require Blender restart:
- ❌ Language changes (Cats reloads itself)
- ✅ Major configuration resets
- ❌ Export options (immediate effect)
- ❌ Update checks (immediate effect)

---

**Related Pages:**
- [Installation](./Installation.md) - Installing Cats
- [Quick Access](./Quick-Access.md) - Using export features
- [Troubleshooting](./Troubleshooting.md) - Common issues
- [FAQ](./FAQ.md) - Frequently asked questions

---

