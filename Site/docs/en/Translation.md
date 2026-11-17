# Translation

The **Translation** panel translates Japanese (and other) names to English so your model works cleanly in English tooling, Unity and VRChat. In `5.2.3.0` it has its own dedicated panel and a **pluggable, multi-service backend**.

## How it works

Translation always happens in two phases:

1. **Internal dictionary first.** Cats' bundled dictionary is applied to every name. This is offline, instant, and never rate-limited.
2. **Online service fills the gaps.** Anything the dictionary can't resolve is sent to the online service you choose. Results are cached, so repeat names never hit the network again.

This means the internal dictionary is *always* used, the service dropdown only decides **which online service handles the leftovers**.

Since `5.2.4.0` there is a step in between for MMD models: the **English names the model's author stored in the PMX file** (MMD Tools shows them as *Name(Eng)*). See [Author Names](#author-names-mmd) below.

## Choosing a service

The **Translation Service** dropdown offers:

| Service | Needs | Notes |
|---|---|---|
| **Internal Dictionary Only** | nothing | Offline. No network calls at all; untranslated text is left as-is. |
| **Google Translate** *(default)* | nothing | Free endpoint, no key. Can be rate-limited/temporarily blocked. Matches the old default behaviour. |
| **DeepL** | API key | Free or Pro DeepL key. High quality, native batch translation. |
| **LibreTranslate** | URL (+ optional key) | Public server or your own self-hosted instance. |
| **MyMemory** | nothing (email optional) | Free; adding an email raises the daily quota. |

When you pick a service that needs credentials, the relevant field(s) appear in the panel:
- **DeepL** → DeepL API Key
- **LibreTranslate** → LibreTranslate URL and optional API Key
- **MyMemory** → optional email

> 🔒 Your service choice and credentials are stored in Cats' **global settings** (see [Settings](Settings#settings-file-location)), not inside the `.blend` file, so API keys never travel with your models. Before `5.3.1.0` the API keys, LibreTranslate URL and MyMemory email were also saved into each `.blend`; opening such a file with `5.3.1.0` or newer removes them (save the file to make it stick). If you shared files made with an older version, consider replacing your API key.

> 💡 If an online service is unavailable (no key, offline, or rate-limited), translation **degrades gracefully** to whatever the internal dictionary could do, rather than failing.

> Online services only run when Blender's **Edit > Preferences > System > Network > Allow Online Access** is turned on. With it off, Cats uses the internal dictionary only and shows a warning saying online access is disabled. **Internal Dictionary Only** works either way.

## Translate buttons

- **Translate All** translates everything below in one click
- **Shape Keys**
- **Objects**
- **Bones**
- **Materials**

## Author Names (MMD)

PMX files carry an optional English name for every bone, shape key and material, written by the model's author. From `5.2.4.0` Cats can use them, which is often better than any dictionary or online service because the author knew what the key *does*.

- **Author Names (Shape Keys)** decides how they are used for shape keys:
  - **Fill Gaps** *(default)* dictionary first; the author's English name is used only for keys the dictionary cannot fully translate, before asking the online service.
  - **Prefer Author Names** the author's name wins whenever there is one. Everything else goes through the dictionary and online service as usual.
  - **Off** ignore them and translate with the dictionary and online service only, as before `5.2.4.0`.
- **Author Names (Materials)** *(on by default)* use the author's English material names instead of translating the Japanese ones. Names that are empty, not plain English, or shared by several materials are skipped and translated as usual.

**Bones and objects never use author names.** Fix MMD Model relies on the dictionary's bone names to recognise the rig, so bone translation is unchanged.

The shape-key setting is mirrored in **Fix MMD Model**'s ⚙ Model Settings, and Fix MMD Model records the names before it deletes the MMD root so they are still available afterwards. The translation report tells you how many names came from the author, and the [Export Translation CSV](Settings#export-translation-csv) gains a *source* column saying where each name came from.

> 🧪 **New and lightly tested.** This works on the models it was built against, but it needs more MMD models with English names run through it. If a shape key or material comes out with a name you didn't expect, switch the setting to **Off**, and please report the model.

## Options

- **Skip Dictionary for Shape Keys** *(online only)* legacy behaviour: ignore the internal dictionary for shape keys and translate them entirely with the selected online service. Only needed if you rely on the exact shape-key names from Cats 0.9.0 and earlier.
- **Skip Locked Shape Keys** locked shape keys are left untranslated (useful to protect intentionally named keys).

## Best practices

**DO:**
- ✅ Translate early right after import / Fix MMD Model
- ✅ Translate **before** setting up visemes or eye tracking
- ✅ Let the cache do its job on repeated runs

**DON'T:**
- ❌ Translate again *after* setting up visemes/eye tracking (it can break references)
- ❌ Translate the same model repeatedly (can cause duplicated words)

### When to translate

**Before:** visemes, eye tracking, custom shape keys, merging with other models.
**After:** importing a model, running Fix MMD Model.

## Resetting the cache

The online-translation cache can be cleared from the [Settings](Settings) panel (**Reset Google Dictionary**). This is handy if a bad translation got cached or you switch services and want fresh results.

---

**Related Pages:**
- [Quick Access](Quick-Access) - Import your model first
- [Converters](Converters) - Fix MMD Model translates as part of its process
- [Settings](Settings) - Reset the translation cache
- [Visemes](Visemes) / [Eye Tracking](Eye-Tracking) - Do these *after* translating

---

