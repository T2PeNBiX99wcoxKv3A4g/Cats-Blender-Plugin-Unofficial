import {existsSync, readFileSync} from "node:fs";
import {execFileSync} from "node:child_process";
import {dirname, join, resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {defineConfig} from "vitepress";

import {site} from "../../site.config.mjs";
import {labels} from "./labels.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const docsRoot = resolve(here, "..");

/** Every language has its own folder; the old hash routes are redirected from the site root. */
const prefixOf = (language) => `/${language}`;

/** The wiki pages carry the anchor of their English heading (`## 目次 {#contents}`); it is not part of the title. */
const plainTitle = (text) => text.replace(/\s*\{#[^}]*\}\s*$/, "").trim();

/**
 * VitePress asks git for the date with a quoted `--pretty` argument, which the Windows build
 * of git answers with quotes around the date; `new Date` then returns NaN and the line stays
 * empty. Asking for the date here keeps "Last updated" working on every platform.
 */
function lastCommit(file) {
    try {
        return execFileSync("git", ["log", "-1", "--format=%cs", "--", file], {
            cwd: docsRoot,
            encoding: "utf8",
            stdio: ["ignore", "pipe", "ignore"],
        }).trim();
    } catch {
        return "";
    }
}


/** Sidebar text comes from the page heading, so a page is written once and its title is not repeated here. */
function titleOf(language, slug) {
    const path = join(docsRoot, prefixOf(language), `${slug}.md`);
    if (!existsSync(path)) return slug;

    const heading = readFileSync(path, "utf8").split("\n").find((line) => /^#\s+\S/.test(line));
    return heading ? plainTitle(heading.replace(/^#\s+/, "")) : slug;
}

/** One sidebar block per group, in the order `site.config.mjs` lists them. */
function sidebar(language) {
    const groups = [];

    for (const group of site.groups) {
        const items = group.docs
            .filter((slug) => existsSync(join(docsRoot, prefixOf(language), `${slug}.md`)))
            .map((slug) => ({text: titleOf(language, slug), link: `${prefixOf(language)}/${slug}`}));

        if (items.length > 0) {
            groups.push({text: labels[language].group[group.id] ?? group.id, collapsed: false, items});
        }
    }

    return {[`${prefixOf(language)}/`]: groups};
}

function nav(language) {
    return [
        {text: labels[language].nav.docs, link: `${prefixOf(language)}/Overview`},
        {text: labels[language].nav.releases, link: site.releases},
        {text: labels[language].nav.github, link: site.repository},
    ];
}

function languageConfig(language) {
    const theme = labels[language].theme;

    return {
        nav: nav(language),
        sidebar: sidebar(language),
        footer: labels[language].footer,
        // The outline keeps the same depth in every language; only its caption is translated.
        outline: {level: [2, 3], ...(theme.outline ?? {})},
        docFooter: theme.docFooter,
        lastUpdated: {formatOptions: {dateStyle: "medium"}, ...(theme.lastUpdated ?? {})},
        darkModeSwitchLabel: theme.darkModeSwitchLabel,
        sidebarMenuLabel: theme.sidebarMenuLabel,
        returnToTopLabel: theme.returnToTopLabel,
        langMenuLabel: theme.langMenuLabel,
        search: {provider: "local", options: {translations: theme.search}},
    };
}

export default defineConfig({
    base: site.base,
    title: site.name,
    description: site.description,
    // "Last updated" comes from the commit that touched the page; the deploy workflow checks out the full history.
    lastUpdated: true,
    // GitHub Pages serves files, not routes: links keep their .html suffix.
    cleanUrls: false,
    head: [
        ["link", {rel: "icon", type: "image/png", href: `${site.base}cats.png`}],
    ],
    // The generated home pages are not in git, so they show no date.
    transformPageData(pageData) {
        if (pageData.lastUpdated === false) return;
        const date = pageData.filePath ? lastCommit(pageData.filePath) : "";
        pageData.lastUpdated = date ? +new Date(date) : undefined;
    },
    themeConfig: {
        logo: {src: "/cats.png", alt: site.name, width: 28, height: 28},
        ...languageConfig(site.defaultLanguage),
    },
    locales: Object.fromEntries(
        site.languages.map((language) => [
            language,
            {
                label: labels[language].language,
                lang: language,
                themeConfig: languageConfig(language),
            },
        ])
    ),
});
