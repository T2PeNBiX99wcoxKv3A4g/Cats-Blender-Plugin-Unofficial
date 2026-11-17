import {site} from "./generated/site";

export type DocEntry = {
    slug: string;
    title: string;
    markdown: string;
    translated: boolean;
};

const rawDocs = import.meta.glob("../docs/*/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
}) as Record<string, string>;

/** `${language}/${slug}` -> markdown source */
const docs = new Map<string, string>();
for (const [path, markdown] of Object.entries(rawDocs)) {
    const match = path.match(/\/docs\/([^/]+)\/(.+)\.md$/);
    if (!match) continue;
    docs.set(`${match[1]}/${match[2]}`, markdown);
}

function titleOf(markdown: string, fallback: string): string {
    const heading = markdown.split("\n").find((line) => /^#\s+\S/.test(line));
    return heading ? heading.replace(/^#\s+/, "").trim() : fallback;
}

/** Pages that exist for the given language, falling back to the default language. */
export function loadDoc(slug: string, language: string): DocEntry | null {
    const localised = docs.get(`${language}/${slug}`);
    const fallback = docs.get(`${site.defaultLanguage}/${slug}`);
    const markdown = localised ?? fallback;
    if (!markdown) return null;

    return {
        slug,
        title: titleOf(markdown, slug),
        markdown,
        translated: localised !== undefined,
    };
}

export function hasDoc(slug: string, language: string): boolean {
    return docs.has(`${language}/${slug}`) || docs.has(`${site.defaultLanguage}/${slug}`);
}

/**
 * Wiki links are bare page names (`Installation`, `Version-Support#anchor`). Rewrite them
 * to hash routes, and leave external links, anchors and images alone.
 */
export function rewriteLinks(markdown: string): string {
    return markdown.replace(/(?<!!)\]\(([^)\s]+)\)/g, (whole, href: string) => {
        if (/^(?:[a-z]+:|\/|#)/i.test(href)) return whole;

        const [page, anchor] = href.split("#");
        const slug = page.replace(/\.md$/i, "");
        if (!slug) return whole;

        return `](#/docs/${encodeURIComponent(slug)}${anchor ? `#${anchor}` : ""})`;
    });
}
