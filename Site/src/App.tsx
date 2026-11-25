import {isValidElement, useEffect, useMemo, useRef, useState} from "react";
import type {KeyboardEvent as ReactKeyboardEvent, ReactNode} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {site} from "./generated/site";
import {readme} from "./generated/readme";
import {docDates} from "./generated/doc-dates";
import {hasDoc, loadDoc, rewriteLinks, slugifyHeading} from "./docs";
import {detectLanguage, languages, translate} from "./i18n";
import {highlightParts, searchDocs} from "./search";
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
    NavToggleLabel,
    Notice,
    ScrollProgress,
    SearchBox,
    SearchClear,
    SearchEmpty,
    SearchInput,
    SearchResult,
    SearchResults,
    SearchResultSnippet,
    SearchResultTitle,
    Sidebar,
    TableScroll,
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
                    table({children}) {
                        return (
                            <TableScroll>
                                <table>{children}</table>
                            </TableScroll>
                        );
                    },
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
    const progressRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const results = useMemo(() => searchDocs(query, language), [query, language]);

    useEffect(() => {
        const onHashChange = () => setRoute(parseRoute(window.location.hash));
        window.addEventListener("hashchange", onHashChange);
        return () => window.removeEventListener("hashchange", onHashChange);
    }, []);

    // Ctrl/Cmd+K focuses the search field from anywhere on the page.
    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
                event.preventDefault();
                searchRef.current?.focus();
                setSearchOpen(true);
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    useEffect(() => {
        localStorage.setItem("cats-site-language", language);
        document.documentElement.lang = language;
    }, [language]);

    // Written straight to the node: a scroll handler that re-renders the whole page would
    // run on every frame.
    useEffect(() => {
        const update = () => {
            const bar = progressRef.current;
            if (!bar) return;
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            const value = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
            bar.style.transform = `scaleX(${value})`;
        };

        update();
        window.addEventListener("scroll", update, {passive: true});
        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, [route]);

    useEffect(() => {
        setNavOpen(false);
        if (route.name === "doc" && route.anchor) {
            const target = document.getElementById(decodeURIComponent(route.anchor));
            if (target) {
                target.scrollIntoView({behavior: "smooth", block: "start"});
                return;
            }
        }
        window.scrollTo({top: 0, left: 0, behavior: "instant"});
    }, [route]);

    const t = (key: string, vars?: Record<string, string>) => translate(language, key, vars);

    const groups = site.groups
        .map((group) => ({
            id: group.id,
            docs: group.docs.filter((slug) => hasDoc(slug, language)),
        }))
        .filter((group) => group.docs.length > 0);

    const openDoc = (slug: string) => {
        window.location.hash = `#/docs/${encodeURIComponent(slug)}`;
        setSearchOpen(false);
        setQuery("");
        searchRef.current?.blur();
    };

    const clearSearch = () => {
        setQuery("");
        setActiveIndex(0);
        searchRef.current?.focus();
    };

    const onSearchKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            setActiveIndex((index) => Math.min(index + 1, Math.max(0, results.length - 1)));
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setActiveIndex((index) => Math.max(index - 1, 0));
        } else if (event.key === "Enter") {
            const hit = results[activeIndex];
            if (hit) openDoc(hit.slug);
        } else if (event.key === "Escape") {
            event.preventDefault();
            setSearchOpen(false);
            searchRef.current?.blur();
        }
    };

    return (
        <AppShell>
            <TopBar>
                <ScrollProgress ref={progressRef} aria-hidden="true"/>
                <Brand href="#/">
                    <span>{site.name}</span>
                    <BrandSuffix>{site.suffix}</BrandSuffix>
                </Brand>

                <SearchBox
                    onBlur={(event) => {
                        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                            setSearchOpen(false);
                        }
                    }}
                >
                    <Icon $glyph="search" aria-hidden="true"/>
                    <SearchInput
                        ref={searchRef}
                        type="text"
                        value={query}
                        placeholder={t("search.placeholder")}
                        aria-label={t("search.placeholder")}
                        autoComplete="off"
                        spellCheck={false}
                        role="combobox"
                        aria-expanded={searchOpen && query.length > 0}
                        aria-controls="cats-search-results"
                        aria-autocomplete="list"
                        onFocus={() => setSearchOpen(true)}
                        onChange={(event) => {
                            setQuery(event.target.value);
                            setActiveIndex(0);
                            setSearchOpen(true);
                        }}
                        onKeyDown={onSearchKeyDown}
                    />
                    {query ? (
                        <SearchClear
                            type="button"
                            onClick={clearSearch}
                            aria-label={t("search.clear")}
                        >
                            <Icon $glyph="close" aria-hidden="true"/>
                        </SearchClear>
                    ) : null}

                    {searchOpen && query ? (
                        <SearchResults id="cats-search-results" role="listbox">
                            {results.length ? (
                                results.map((hit, index) => (
                                    <SearchResult
                                        key={hit.slug}
                                        type="button"
                                        role="option"
                                        aria-selected={index === activeIndex}
                                        $active={index === activeIndex}
                                        onMouseDown={(event) => event.preventDefault()}
                                        onMouseEnter={() => setActiveIndex(index)}
                                        onClick={() => openDoc(hit.slug)}
                                    >
                                        <SearchResultTitle>{hit.title}</SearchResultTitle>
                                        <SearchResultSnippet>
                                            {highlightParts(hit.snippet, query).map((part, partIndex) =>
                                                part.match ? (
                                                    <mark key={partIndex}>{part.text}</mark>
                                                ) : (
                                                    <span key={partIndex}>{part.text}</span>
                                                )
                                            )}
                                        </SearchResultSnippet>
                                    </SearchResult>
                                ))
                            ) : (
                                <SearchEmpty>{t("search.noResults")}</SearchEmpty>
                            )}
                        </SearchResults>
                    ) : null}
                </SearchBox>

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
                        aria-label={t("nav.menu")}
                    >
                        <Icon $glyph="menu" aria-hidden="true"/>
                        <NavToggleLabel>{t("nav.menu")}</NavToggleLabel>
                    </NavToggle>
                </Controls>
            </TopBar>

            <Layout>
                <Sidebar $open={navOpen}>
                    <NavHome href="#/" $active={route.name === "home"}>
                        <Icon $glyph="home" aria-hidden="true"/>
                        {t("nav.home")}
                    </NavHome>

                    {groups.map((group, index) => (
                        <NavGroup key={group.id} $index={index}>
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

                <Content key={route.name === "doc" ? `doc:${route.slug}` : route.name}>
                    {renderRoute()}
                </Content>
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
