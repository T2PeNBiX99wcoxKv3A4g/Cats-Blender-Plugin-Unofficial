import {isValidElement, useEffect, useState} from "react";
import type {ReactNode} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {site} from "./generated/site";
import {readme} from "./generated/readme";
import {docDates} from "./generated/doc-dates";
import {hasDoc, loadDoc, rewriteLinks} from "./docs";
import {detectLanguage, languages, translate} from "./i18n";

type Route =
    | {name: "home"}
    | {name: "docs"}
    | {name: "doc"; slug: string; anchor?: string};

function parseRoute(hash: string): Route {
    const path = hash.replace(/^#/, "");
    if (!path || path === "/") return {name: "home"};

    const doc = path.match(/^\/docs\/([^#]+)(?:#(.+))?$/);
    if (doc) return {name: "doc", slug: decodeURIComponent(doc[1]), anchor: doc[2]};

    if (path === "/docs" || path === "/docs/") return {name: "docs"};
    return {name: "home"};
}

/** `?lang=ja` wins over the stored preference, so a language can be linked directly. */
function initialLanguage(): string {
    const requested = new URLSearchParams(window.location.search).get("lang")?.toLowerCase();
    if (requested) {
        const match = languages.find((language) => language.id.toLowerCase() === requested);
        if (match) return match.id;
    }
    return detectLanguage(localStorage.getItem("cats-site-language"), navigator.language);
}

function toText(node: ReactNode): string {
    if (node === null || node === undefined || typeof node === "boolean") return "";
    if (typeof node === "string" || typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(toText).join("");
    if (isValidElement<{children?: ReactNode}>(node)) return toText(node.props.children);
    return "";
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\p{L}\p{N}\s-]/gu, "")
        .replace(/\s+/g, "-");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function heading(level: 1 | 2 | 3 | 4) {
    return function Heading({children}: {children?: ReactNode}) {
        const text = toText(children);
        const id = slugify(text);
        const Tag = `h${level}` as const;
        return <Tag id={id}>{children}</Tag>;
    };
}

function Markdown({source}: {source: string}) {
    return (
        <div className="markdown">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: heading(1),
                    h2: heading(2),
                    h3: heading(3),
                    h4: heading(4),
                    a({href, children}) {
                        const external = Boolean(href && /^https?:/i.test(href));
                        return (
                            <a
                                href={href}
                                {...(external ? {target: "_blank", rel: "noreferrer noopener"} : {})}
                            >
                                {children}
                            </a>
                        );
                    },
                }}
            >
                {rewriteLinks(source)}
            </ReactMarkdown>
        </div>
    );
}

export default function App() {
    const [route, setRoute] = useState<Route>(() => parseRoute(window.location.hash));
    const [language, setLanguage] = useState(initialLanguage);
    const [navOpen, setNavOpen] = useState(false);

    useEffect(() => {
        const onHashChange = () => setRoute(parseRoute(window.location.hash));
        window.addEventListener("hashchange", onHashChange);
        return () => window.removeEventListener("hashchange", onHashChange);
    }, []);

    useEffect(() => {
        localStorage.setItem("cats-site-language", language);
        document.documentElement.lang = language;
    }, [language]);

    useEffect(() => {
        setNavOpen(false);
        if (route.name === "doc" && route.anchor) {
            const target = document.getElementById(decodeURIComponent(route.anchor));
            if (target) {
                target.scrollIntoView();
                return;
            }
        }
        window.scrollTo(0, 0);
    }, [route]);

    const t = (key: string, vars?: Record<string, string>) => translate(language, key, vars);

    const groups = site.groups
        .map((group) => ({
            id: group.id,
            docs: group.docs.filter((slug) => hasDoc(slug, language)),
        }))
        .filter((group) => group.docs.length > 0);

    return (
        <div className="app">
            <header className="topbar">
                <a className="brand" href="#/">
                    <span className="brand-name">{site.name}</span>
                    <span className="brand-suffix">{site.suffix}</span>
                </a>

                <nav className="topnav">
                    <a href="#/">{t("nav.home")}</a>
                    <a href="#/docs">{t("nav.docs")}</a>
                    <a href={site.releases} target="_blank" rel="noreferrer noopener">
                        {t("nav.releases")}
                    </a>
                    <a href={site.repository} target="_blank" rel="noreferrer noopener">
                        {t("nav.github")}
                    </a>
                </nav>

                <div className="controls">
                    <label className="language">
                        <span className="visually-hidden">{t("language.label")}</span>
                        <select
                            value={language}
                            onChange={(event) => setLanguage(event.target.value)}
                        >
                            {languages.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.label}
                                </option>
                            ))}
                        </select>
                    </label>

                    <button
                        type="button"
                        className="nav-toggle"
                        onClick={() => setNavOpen((open) => !open)}
                        aria-expanded={navOpen}
                    >
                        {t("nav.menu")}
                    </button>
                </div>
            </header>

            <div className="layout">
                <aside className={navOpen ? "sidebar open" : "sidebar"}>
                    {groups.map((group) => (
                        <section key={group.id} className="nav-group">
                            <h2>{t(`group.${group.id}`)}</h2>
                            <ul>
                                {group.docs.map((slug) => {
                                    const entry = loadDoc(slug, language);
                                    const active =
                                        route.name === "doc" && route.slug === slug;
                                    return (
                                        <li key={slug}>
                                            <a
                                                href={`#/docs/${encodeURIComponent(slug)}`}
                                                className={active ? "active" : undefined}
                                            >
                                                {entry?.title ?? slug}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                    ))}
                </aside>

                <main className="content">{renderRoute()}</main>
            </div>

            <footer className="footer">
                <span>
                    {site.name} {site.suffix} — {t("footer.unofficial")}
                </span>
                <nav>
                    <a href={site.repository} target="_blank" rel="noreferrer noopener">
                        {t("footer.source")}
                    </a>
                    <a href={site.wikiSource} target="_blank" rel="noreferrer noopener">
                        {t("footer.wiki")}
                    </a>
                    <span>{t("footer.license")}</span>
                </nav>
            </footer>
        </div>
    );

    function renderRoute() {
        if (route.name === "docs") {
            return (
                <>
                    <h1>{t("docs.title")}</h1>
                    <p className="notice">{t("docs.importedNotice")}</p>

                    {groups.map((group) => (
                        <section key={group.id} className="doc-index">
                            <h2>{t(`group.${group.id}`)}</h2>
                            <ul>
                                {group.docs.map((slug) => {
                                    const entry = loadDoc(slug, language);
                                    return (
                                        <li key={slug}>
                                            <a href={`#/docs/${encodeURIComponent(slug)}`}>
                                                {entry?.title ?? slug}
                                            </a>
                                            {!entry?.translated && language !== site.defaultLanguage ? (
                                                <span className="badge">{site.defaultLanguage}</span>
                                            ) : null}
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                    ))}
                </>
            );
        }

        if (route.name === "doc") {
            const entry = loadDoc(route.slug, language);
            if (!entry) {
                return (
                    <>
                        <h1>{t("docs.notFound")}</h1>
                        <p>
                            <a href="#/docs">{t("docs.backHome")}</a>
                        </p>
                    </>
                );
            }

            const updated =
                docDates[`${language}/${entry.slug}`] ??
                docDates[`${site.defaultLanguage}/${entry.slug}`];

            return (
                <>
                    {!entry.translated && language !== site.defaultLanguage ? (
                        <p className="notice">{t("docs.untranslated")}</p>
                    ) : null}
                    <p className="notice subtle">{t("docs.importedNotice")}</p>
                    <Markdown source={entry.markdown} />
                    {updated ? (
                        <p className="doc-meta">{t("docs.lastUpdated", {date: updated})}</p>
                    ) : null}
                </>
            );
        }

        return (
            <>
                <section className="hero">
                    <h1>
                        {site.name} <span className="hero-suffix">{site.suffix}</span>
                    </h1>
                    <p className="tagline">{site.tagline}</p>
                    <div className="hero-actions">
                        <a className="button primary" href="#/docs">
                            {t("nav.docs")}
                        </a>
                        <a
                            className="button"
                            href={site.releases}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            {t("nav.releases")}
                        </a>
                    </div>
                </section>

                <p className="notice subtle">{t("home.readmeNote")}</p>
                <Markdown source={readme} />
            </>
        );
    }
}
