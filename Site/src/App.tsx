import {isValidElement, useEffect, useState} from "react";
import type {ReactNode} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {site} from "./generated/site";
import {readme} from "./generated/readme";
import {docDates} from "./generated/doc-dates";
import {hasDoc, loadDoc, rewriteLinks, slugifyHeading} from "./docs";
import {detectLanguage, languages, translate} from "./i18n";
import {
    AppShell,
    Badge,
    Brand,
    BrandSuffix,
    Content,
    Controls,
    DocIndex,
    DocMeta,
    Footer,
    Hero,
    HeroActions,
    HeroSuffix,
    Icon,
    LanguageLabel,
    LanguageSelect,
    Layout,
    MarkdownBody,
    NavGroup,
    NavHome,
    NavLink,
    NavToggle,
    Notice,
    Sidebar,
    Tagline,
    TopBar,
    TopNav,
    TopNavLink,
    VisuallyHidden,
} from "./App.styles";
import {ButtonLink} from "./styles/buttons";

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
    return slugifyHeading(text);
}

/**
 * Heading ids come from the English source (`anchorIds`), not from the rendered text, so
 * `#some-heading` links keep working when the heading is translated.
 */
function Markdown({source, anchorIds = []}: {source: string; anchorIds?: string[]}) {
    let headingIndex = 0;

    function heading(level: 1 | 2 | 3 | 4) {
        return function Heading({children}: {children?: ReactNode}) {
            const id = anchorIds[headingIndex++] ?? slugify(toText(children));
            const Tag = `h${level}` as const;
            return <Tag id={id}>{children}</Tag>;
        };
    }

    return (
        <MarkdownBody>
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
        </MarkdownBody>
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
        <AppShell>
            <TopBar>
                <Brand href="#/">
                    <span>{site.name}</span>
                    <BrandSuffix>{site.suffix}</BrandSuffix>
                </Brand>

                <TopNav>
                    <TopNavLink href={site.releases} target="_blank" rel="noreferrer noopener">
                        <Icon $glyph="releases" aria-hidden="true"/>
                        {t("nav.releases")}
                    </TopNavLink>
                    <TopNavLink href={site.repository} target="_blank" rel="noreferrer noopener">
                        <Icon $glyph="github" aria-hidden="true"/>
                        {t("nav.github")}
                    </TopNavLink>
                </TopNav>

                <Controls>
                    <LanguageLabel>
                        <Icon $glyph="language" aria-hidden="true"/>
                        <VisuallyHidden>{t("language.label")}</VisuallyHidden>
                        <LanguageSelect
                            value={language}
                            onChange={(event) => setLanguage(event.target.value)}
                        >
                            {languages.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.label}
                                </option>
                            ))}
                        </LanguageSelect>
                    </LanguageLabel>

                    <NavToggle
                        type="button"
                        onClick={() => setNavOpen((open) => !open)}
                        aria-expanded={navOpen}
                    >
                        <Icon $glyph="menu" aria-hidden="true"/>
                        {t("nav.menu")}
                    </NavToggle>
                </Controls>
            </TopBar>

            <Layout>
                <Sidebar $open={navOpen}>
                    <NavHome href="#/" $active={route.name === "home"}>
                        <Icon $glyph="home" aria-hidden="true"/>
                        {t("nav.home")}
                    </NavHome>

                    {groups.map((group) => (
                        <NavGroup key={group.id}>
                            <h2>{t(`group.${group.id}`)}</h2>
                            <ul>
                                {group.docs.map((slug) => {
                                    const entry = loadDoc(slug, language);
                                    const active =
                                        route.name === "doc" && route.slug === slug;
                                    return (
                                        <li key={slug}>
                                            <NavLink
                                                href={`#/docs/${encodeURIComponent(slug)}`}
                                                $active={active}
                                            >
                                                {entry?.title ?? slug}
                                            </NavLink>
                                        </li>
                                    );
                                })}
                            </ul>
                        </NavGroup>
                    ))}
                </Sidebar>

                <Content>{renderRoute()}</Content>
            </Layout>

            <Footer>
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
            </Footer>
        </AppShell>
    );

    function renderRoute() {
        if (route.name === "docs") {
            return (
                <>
                    <h1>{t("docs.title")}</h1>
                    <Notice>{t("docs.importedNotice")}</Notice>

                    {groups.map((group) => (
                        <DocIndex key={group.id}>
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
                                                <Badge>{site.defaultLanguage}</Badge>
                                            ) : null}
                                        </li>
                                    );
                                })}
                            </ul>
                        </DocIndex>
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
                        <Notice>{t("docs.untranslated")}</Notice>
                    ) : null}
                    <Notice $subtle>{t("docs.importedNotice")}</Notice>
                    <Markdown source={entry.markdown} anchorIds={entry.anchorIds} />
                    {updated ? (
                        <DocMeta>{t("docs.lastUpdated", {date: updated})}</DocMeta>
                    ) : null}
                </>
            );
        }

        return (
            <>
                <Hero>
                    <h1>
                        {site.name} <HeroSuffix>{site.suffix}</HeroSuffix>
                    </h1>
                    <Tagline>{site.tagline}</Tagline>
                    <HeroActions>
                        <ButtonLink $primary href="#/docs">
                            <Icon $glyph="docs" aria-hidden="true"/>
                            {t("nav.docs")}
                        </ButtonLink>
                        <ButtonLink href={site.releases} target="_blank" rel="noreferrer noopener">
                            <Icon $glyph="releases" aria-hidden="true"/>
                            {t("nav.releases")}
                        </ButtonLink>
                    </HeroActions>
                </Hero>

                <Notice $subtle>{t("home.readmeNote")}</Notice>
                <Markdown source={readme} />
            </>
        );
    }
}
