// Writes the pages that are not written by hand:
//
//   site.config.mjs + labels.mjs -> docs/<language>/index.md  (hero + feature cards)
//   the language list            -> docs/index.md             (redirect, keeps the old hash routes)
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

const yaml = (text) => JSON.stringify(text);

/** The page's H1, without the anchor the wiki pages carry (`## 目次 {#contents}`). */
function titleOf(language, slug) {
    const path = join(docsRoot, language, `${slug}.md`);
    if (!existsSync(path)) return slug;

    const heading = readFileSync(path, "utf8").split("\n").find((line) => /^#\s+\S/.test(line));
    return heading ? heading.replace(/^#\s+/, "").replace(/\s*\{#[^}]*\}\s*$/, "").trim() : slug;
}

/** Hero plus one card per feature; the card titles are the page titles, so they stay translated. */
function home(language) {
    const label = labels[language];
    const prefix = `/${language}`;

    const features = (label.home?.features ?? [])
        .map(
            ({slug, details}) =>
                `  - title: ${yaml(titleOf(language, slug))}\n` +
                `    details: ${yaml(details)}\n` +
                `    link: ${yaml(`${prefix}/${slug}`)}`
        )
        .join("\n");

    return `---
layout: home
hero:
  image:
    src: "/cats-cream.svg"
    alt: ${yaml(`${site.name} ${site.suffix}`)}
  name: ${yaml(site.name)}
  text: ${yaml(site.suffix.toUpperCase())}
  tagline: ${yaml(label.home?.tagline ?? site.tagline)}
  actions:
    - theme: brand
      text: ${yaml(label.nav.docs)}
      link: ${yaml(`${prefix}/Overview`)}
    - theme: alt
      text: ${yaml(label.nav.releases)}
      link: ${yaml(site.releases)}
features:
${features}
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

// The add-on's own PNG stays as the favicon fallback for old browsers.
const icon = resolve(siteRoot, "..", "resources", "icons", "other", "cats1.png");
if (existsSync(icon)) {
    mkdirSync(join(docsRoot, "public"), {recursive: true});
    copyFileSync(icon, join(docsRoot, "public", "cats.png"));
}

console.log(`prepared ${site.languages.length} home pages and the root redirect`);
