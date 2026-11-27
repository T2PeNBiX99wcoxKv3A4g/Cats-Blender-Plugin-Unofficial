// Writes the pages that are not written by hand:
//
//   ../README.md        -> docs/<language>/index.md   (home: hero from site.config + README body)
//   the language list   -> docs/index.md              (redirect, keeps the old `#/docs/<page>` links working)
//
// Run automatically by `docs:dev` and `docs:build`.
import {copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync} from "node:fs";
import {dirname, join, resolve} from "node:path";
import {fileURLToPath} from "node:url";

import {site} from "../site.config.mjs";
import {labels} from "../docs/.vitepress/labels.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const siteRoot = resolve(here, "..");
const docsRoot = join(siteRoot, "docs");
const readmePath = resolve(siteRoot, "..", "README.md");

if (!existsSync(readmePath)) throw new Error(`README.md not found at ${readmePath}`);

/** The README opens with the project title, which the hero already shows. */
const readme = readFileSync(readmePath, "utf8")
    .replace(/^#\s+.*(\r?\n)+/, "")
    // The README links the license file in the repository; the site has no copy of it.
    .replaceAll("](LICENSE)", `](${site.repository}/blob/main/LICENSE)`)
    .trim();

const yaml = (text) => JSON.stringify(text);

function home(language) {
    const label = labels[language];
    const prefix = `/${language}`;
    const note = label.homeNote ? `> ${label.homeNote}\n\n` : "";

    return `---
layout: home
hero:
  image:
    src: "/cats.png"
    alt: ${yaml(`${site.name} ${site.suffix}`)}
  name: ${yaml(site.name)}
  text: ${yaml(site.suffix.toUpperCase())}
  tagline: ${yaml(site.tagline)}
  actions:
    - theme: brand
      text: ${yaml(label.nav.docs)}
      link: ${yaml(`${prefix}/Overview`)}
    - theme: alt
      text: ${yaml(label.nav.releases)}
      link: ${yaml(site.releases)}
---

${note}${readme}
`;
}

/**
 * The site root is a redirect, handled by `docs/.vitepress/theme/index.ts` because VitePress
 * compiles script tags inside markdown as part of the page (they would run during the build).
 * This page is what a reader without JavaScript sees.
 */
function rootRedirect() {
    return `---
layout: false
title: ${site.name} ${site.suffix}
---

# ${site.name} ${site.suffix}

<p>
    The documentation opens in <a href="${site.base}en/">English</a>. Other languages:
    <a href="${site.base}ja/">日本語</a>, <a href="${site.base}ko/">한국어</a>,
    <a href="${site.base}zh-CN/">简体中文</a>, <a href="${site.base}zh-TW/">繁體中文</a>.
</p>
`;
}

mkdirSync(docsRoot, {recursive: true});
writeFileSync(join(docsRoot, "index.md"), rootRedirect(), "utf8");

for (const language of site.languages) {
    const directory = join(docsRoot, language);
    mkdirSync(directory, {recursive: true});
    writeFileSync(join(directory, "index.md"), home(language), "utf8");
}

// The navigation bar and the tab both use the add-on's own icon.
const icon = resolve(siteRoot, "..", "resources", "icons", "other", "cats1.png");
if (existsSync(icon)) {
    mkdirSync(join(docsRoot, "public"), {recursive: true});
    copyFileSync(icon, join(docsRoot, "public", "cats.png"));
}

console.log(`prepared ${site.languages.length} home pages and the root redirect`);
