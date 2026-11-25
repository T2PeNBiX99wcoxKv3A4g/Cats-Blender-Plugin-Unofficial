import { css, keyframes, styled } from "styled-components";

import closeIcon from "./icons/close.svg";
import docsIcon from "./icons/docs.svg";
import githubIcon from "./icons/github.svg";
import homeIcon from "./icons/home.svg";
import languageIcon from "./icons/language.svg";
import menuIcon from "./icons/menu.svg";
import releasesIcon from "./icons/releases.svg";
import searchIcon from "./icons/search.svg";
import { mobile } from "./styles/media";

/** Every icon file, keyed by the name used at the call site. */
const glyphs = {
    close: closeIcon,
    docs: docsIcon,
    github: githubIcon,
    home: homeIcon,
    language: languageIcon,
    menu: menuIcon,
    releases: releasesIcon,
    search: searchIcon,
};

/* --- motion -------------------------------------------------------------- */

const fadeUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(12px);
    }
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
`;

const dropIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-100%);
    }
`;

const slideIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-8px);
    }
`;

const popIn = keyframes`
    from {
        opacity: 0;
        transform: scale(0.8);
    }
`;

/** A short highlight on the heading an anchor link points at. */
const flashTarget = keyframes`
    from {
        background: rgba(245, 158, 11, 0.18);
        box-shadow: 0 0 0 8px rgba(245, 158, 11, 0.18);
    }

    to {
        background: transparent;
        box-shadow: 0 0 0 8px transparent;
    }
`;

/** Small delays for a column of items, so they do not all appear at once. */
const stagger = (count: number, step = 0.03) =>
    Array.from(
        { length: count },
        (_, index) => css`
            &:nth-child(${index + 1}) {
                animation-delay: ${(index * step).toFixed(2)}s;
            }
        `
    );

const underlineOnHover = css`
    background-image: linear-gradient(currentColor, currentColor);
    background-repeat: no-repeat;
    background-position: 0 100%;
    background-size: 0% 1px;
    transition: background-size var(--duration) var(--ease-out);

    &:hover {
        text-decoration: none;
        background-size: 100% 1px;
    }
`;

/**
 * Inline icon. The file stays a real .svg asset and is used as a mask, so the icon takes
 * the colour of the text around it instead of its own fill.
 */
export const Icon = styled.span<{ $glyph: keyof typeof glyphs }>`
    display: inline-block;
    width: 1.05em;
    height: 1.05em;
    flex: none;
    vertical-align: -0.15em;
    background-color: currentColor;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-position: center;
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-image: url(${props => glyphs[props.$glyph]});
    mask-image: url(${props => glyphs[props.$glyph]});
    transition: transform var(--duration-fast) var(--ease-out);
`;

/** Text for screen readers only (the language selector has no visible label). */
export const VisuallyHidden = styled.span`
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
`;

export const AppShell = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

/* --- top bar ------------------------------------------------------------- */

export const TopBar = styled.header`
    position: sticky;
    top: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 0.75rem 1.5rem;
    background: var(--topbar);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    animation: ${dropIn} var(--duration-slow) var(--ease-out) both;

    @media ${mobile} {
        flex-wrap: wrap;
        padding: 0.6rem 0.9rem;
        gap: 0.5rem 0.6rem;
    }
`;

/** Reading progress, drawn along the bottom edge of the top bar. */
export const ScrollProgress = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
    transform: scaleX(0);
    transform-origin: left center;
    background: linear-gradient(90deg, var(--accent), var(--accent-strong));
    pointer-events: none;
`;

export const BrandSuffix = styled.span`
    padding: 0.1rem 0.45rem;
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-pill);
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--accent-strong);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    transition: box-shadow var(--duration) var(--ease-out),
        border-color var(--duration) var(--ease-out);

    @media ${mobile} {
        display: none;
    }
`;

export const Brand = styled.a`
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    color: var(--text-strong);
    font-weight: 700;
    font-size: 1.05rem;

    &:hover {
        text-decoration: none;
    }

    &:hover ${BrandSuffix} {
        border-color: var(--accent);
        box-shadow: 0 0 14px rgba(245, 158, 11, 0.35);
    }

    @media ${mobile} {
        font-size: 0.98rem;
        white-space: nowrap;
    }
`;

export const TopNav = styled.nav`
    display: flex;
    gap: 1.1rem;
    font-size: 0.92rem;

    @media ${mobile} {
        display: none;
    }
`;

export const TopNavLink = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--text);
    transition: color var(--duration-fast) var(--ease-out);

    &:hover {
        color: var(--accent-strong);
    }

    &:hover ${Icon} {
        transform: translateY(-2px) scale(1.08);
    }
`;

export const Controls = styled.div`
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 0.6rem;
`;

/* --- search -------------------------------------------------------------- */

export const SearchBox = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.45rem;
    flex: 0 1 18rem;
    min-width: 0;
    padding: 0.38rem 0.55rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text-muted);
    transition: border-color var(--duration-fast) var(--ease-out),
        background var(--duration-fast) var(--ease-out),
        box-shadow var(--duration-fast) var(--ease-out),
        color var(--duration-fast) var(--ease-out);

    &:focus-within {
        border-color: var(--accent);
        background: rgba(15, 23, 42, 0.92);
        box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.16);
        color: var(--accent-strong);
    }

    @media ${mobile} {
        order: 3;
        flex: 1 1 100%;
    }
`;

export const SearchInput = styled.input`
    flex: 1;
    min-width: 0;
    padding: 0;
    border: none;
    background: none;
    color: var(--text);
    font-family: inherit;
    font-size: 0.88rem;
    outline: none;

    &::placeholder {
        color: var(--text-muted);
    }
`;

export const SearchClear = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.1rem;
    border: none;
    border-radius: var(--radius-xs);
    background: none;
    color: var(--text-muted);
    cursor: pointer;
    transition: color var(--duration-fast) var(--ease-out),
        transform var(--duration) var(--ease-bounce);

    &:hover {
        color: var(--accent-strong);
        transform: rotate(90deg);
    }
`;

export const SearchResults = styled.div`
    position: absolute;
    top: calc(100% + 0.4rem);
    left: 0;
    width: max(100%, 22rem);
    max-width: calc(100vw - 2rem);
    z-index: 30;
    padding: 0.3rem;
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-md);
    background: rgba(11, 15, 25, 0.98);
    box-shadow: 0 18px 40px -18px rgba(0, 0, 0, 0.9);
    animation: ${slideIn} var(--duration-fast) var(--ease-out) both;
    overflow: hidden;
`;

export const SearchResult = styled.button<{ $active?: boolean }>`
    display: block;
    width: 100%;
    padding: 0.45rem 0.5rem;
    border: none;
    border-left: 2px solid transparent;
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--text);
    font-family: inherit;
    text-align: left;
    cursor: pointer;
    transition: background var(--duration-fast) var(--ease-out),
        border-color var(--duration-fast) var(--ease-out);

    &:hover {
        background: var(--surface);
    }

    ${props =>
        props.$active &&
        css`
            background: var(--surface);
            border-left-color: var(--accent);
        `}
`;

export const SearchResultTitle = styled.span`
    display: block;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-strong);
`;

export const SearchResultSnippet = styled.span`
    display: block;
    margin-top: 0.15rem;
    font-size: 0.78rem;
    line-height: 1.45;
    color: var(--text-muted);

    mark {
        padding: 0 0.1rem;
        border-radius: 2px;
        background: rgba(245, 158, 11, 0.25);
        color: var(--text-strong);
    }
`;

export const SearchEmpty = styled.p`
    margin: 0;
    padding: 0.6rem 0.5rem;
    font-size: 0.82rem;
    color: var(--text-muted);
`;

export const LanguageLabel = styled.label`
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--text-muted);
    transition: color var(--duration-fast) var(--ease-out);

    &:focus-within {
        color: var(--accent-strong);
    }
`;

export const LanguageSelect = styled.select`
    padding: 0.35rem 0.5rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    font-size: 0.85rem;
    cursor: pointer;
    transition: border-color var(--duration-fast) var(--ease-out),
        background var(--duration-fast) var(--ease-out),
        box-shadow var(--duration-fast) var(--ease-out);

    &:hover {
        border-color: var(--border-strong);
        background: rgba(30, 41, 59, 0.8);
    }

    &:focus-visible {
        outline: none;
        border-color: var(--accent);
        box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.2);
    }

    @media ${mobile} {
        max-width: 7.5rem;
    }
`;

/** The word "Menu" is dropped on narrow screens, where only the icon fits. */
export const NavToggleLabel = styled.span`
    @media ${mobile} {
        display: none;
    }
`;

export const NavToggle = styled.button`
    display: none;
    align-items: center;
    gap: 0.35rem;
    padding: 0.35rem 0.7rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    font-size: 0.85rem;
    cursor: pointer;
    transition: transform var(--duration-fast) var(--ease-bounce),
        border-color var(--duration-fast) var(--ease-out),
        background var(--duration-fast) var(--ease-out);

    &:hover {
        transform: translateY(-1px);
        border-color: var(--border-strong);
        background: rgba(30, 41, 59, 0.8);
    }

    &:active {
        transform: scale(0.96);
    }

    &[aria-expanded="true"] ${Icon} {
        transform: rotate(90deg);
    }

    @media ${mobile} {
        display: inline-block;
        padding: 0.35rem 0.45rem;
    }
`;

/* --- layout -------------------------------------------------------------- */

export const Layout = styled.div`
    flex: 1;
    display: grid;
    grid-template-columns: 16rem minmax(0, 1fr);
    gap: 2rem;
    width: 100%;
    max-width: 96rem;
    margin: 0 auto;
    padding: 2rem 1.5rem 3rem;

    @media ${mobile} {
        grid-template-columns: minmax(0, 1fr);
        padding: 1.25rem 1rem 2rem;
    }
`;

export const Sidebar = styled.aside<{ $open?: boolean }>`
    position: sticky;
    top: 4.5rem;
    align-self: start;
    max-height: calc(100vh - 6rem);
    // The hovered link slides 2px to the right; the padding keeps that inside the scroll
    // area, and the clipped axis stops the browser from drawing a scrollbar for it.
    overflow-x: hidden;
    overflow-y: auto;
    padding-right: 2px;
    font-size: 0.9rem;
    animation: ${fadeIn} var(--duration-slow) var(--ease-out) both;

    @media ${mobile} {
        display: none;
        position: static;
        max-height: none;

        ${props =>
            props.$open &&
            css`
                display: block;
                animation: ${slideIn} var(--duration) var(--ease-out) both;
            `}
    }
`;

export const NavHome = styled.a<{ $active?: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.45rem;
    margin-bottom: 1.4rem;
    padding: 0.35rem 0.55rem;
    border-radius: var(--radius-sm);
    border-left: 2px solid transparent;
    color: var(--text);
    font-weight: 600;
    transition: background var(--duration-fast) var(--ease-out),
        border-color var(--duration-fast) var(--ease-out),
        color var(--duration-fast) var(--ease-out),
        transform var(--duration-fast) var(--ease-out);

    &:hover {
        background: var(--surface);
        text-decoration: none;
        transform: translateX(2px);
    }

    ${props =>
        props.$active &&
        css`
            border-left-color: var(--accent);
            background: var(--surface);
            color: var(--accent-strong);
        `}
`;

export const NavGroup = styled.section<{ $index?: number }>`
    animation: ${fadeUp} var(--duration-slow) var(--ease-out) both;
    animation-delay: ${props => ((props.$index ?? 0) * 0.05).toFixed(2)}s;

    & + & {
        margin-top: 1.6rem;
    }

    h2 {
        margin: 0 0 0.5rem;
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--text-muted);
    }

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    li {
        margin: 0.15rem 0;
    }
`;

export const NavLink = styled.a<{ $active?: boolean }>`
    display: block;
    padding: 0.3rem 0.55rem;
    border-radius: var(--radius-sm);
    border-left: 2px solid transparent;
    color: var(--text);
    transition: background var(--duration-fast) var(--ease-out),
        border-color var(--duration-fast) var(--ease-out),
        color var(--duration-fast) var(--ease-out),
        transform var(--duration-fast) var(--ease-out);

    &:hover {
        background: var(--surface);
        text-decoration: none;
        transform: translateX(2px);
    }

    ${props =>
        props.$active &&
        css`
            border-left-color: var(--accent);
            background: var(--surface);
            color: var(--accent-strong);
            font-weight: 600;
        `}
`;

export const Content = styled.main`
    min-width: 0;
    line-height: 1.7;
    animation: ${fadeUp} var(--duration) var(--ease-out) both;
`;

/* --- hero ---------------------------------------------------------------- */

export const Hero = styled.section`
    padding: 2rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    background: var(--surface);
    margin-bottom: 1.5rem;

    h1 {
        margin: 0 0 0.4rem;
        font-size: 2rem;
        border: none;
        padding: 0;
        animation: ${fadeUp} var(--duration-slow) var(--ease-out) both;
    }
`;

export const HeroSuffix = styled.span`
    font-size: 0.9rem;
    vertical-align: middle;
    padding: 0.15rem 0.5rem;
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-pill);
    color: var(--accent-strong);
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

export const Tagline = styled.p`
    margin: 0 0 1.2rem;
    color: var(--text-muted);
    font-size: 1.05rem;
    animation: ${fadeUp} var(--duration-slow) var(--ease-out) both;
    animation-delay: 0.06s;
`;

export const HeroActions = styled.div`
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    animation: ${fadeUp} var(--duration-slow) var(--ease-out) both;
    animation-delay: 0.12s;
`;

/* --- notices ------------------------------------------------------------- */

export const Notice = styled.p<{ $subtle?: boolean }>`
    margin: 0 0 1.25rem;
    padding: 0.7rem 0.9rem;
    border-left: 3px solid ${props => (props.$subtle ? "var(--border-strong)" : "var(--accent)")};
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
    background: var(--surface);
    color: var(--text-muted);
    font-size: 0.88rem;
    transition: border-color var(--duration) var(--ease-out),
        background var(--duration) var(--ease-out);

    &:hover {
        border-left-color: var(--accent);
        background: rgba(30, 41, 59, 0.6);
    }
`;

export const Badge = styled.span`
    margin-left: 0.4rem;
    padding: 0.05rem 0.4rem;
    border-radius: var(--radius-xs);
    background: var(--surface);
    border: 1px solid var(--border);
    font-size: 0.7rem;
    color: var(--text-muted);
    text-transform: uppercase;
    animation: ${popIn} var(--duration) var(--ease-bounce) both;
`;

/** Generated from the git history, appended under every documentation page. */
export const DocMeta = styled.p`
    margin-top: 2.5rem;
    padding-top: 0.9rem;
    border-top: 1px solid var(--border);
    color: var(--text-muted);
    font-size: 0.82rem;
    animation: ${fadeIn} var(--duration-slow) var(--ease-out) both;
    animation-delay: 0.1s;
`;

/* --- documentation index ------------------------------------------------- */

export const DocIndex = styled.section`
    ul {
        padding-left: 1.1rem;
    }

    li {
        margin: 0.3rem 0;
        animation: ${fadeUp} var(--duration) var(--ease-out) both;
        ${stagger(10, 0.02)}
    }
`;

/* --- markdown ------------------------------------------------------------ */

/** Wide tables scroll on their own instead of stretching the page. */
export const TableScroll = styled.div`
    margin: 1rem 0;
    overflow-x: auto;
    border-radius: var(--radius-sm);
`;

export const MarkdownBody = styled.div`
    h1,
    h2,
    h3,
    h4 {
        color: var(--text-strong);
        line-height: 1.3;
        margin: 1.8rem 0 0.7rem;
        scroll-margin-top: 5rem;
        transition: border-color var(--duration) var(--ease-out);
    }

    h1 {
        font-size: 1.85rem;
        padding-bottom: 0.4rem;
        border-bottom: 1px solid var(--border);
    }

    h2 {
        font-size: 1.4rem;
        padding-bottom: 0.3rem;
        border-bottom: 1px solid var(--border);
    }

    h3 {
        font-size: 1.15rem;
    }

    // Jumping to an anchor briefly marks the heading it landed on.
    h1:target,
    h2:target,
    h3:target,
    h4:target {
        animation: ${flashTarget} 1.2s var(--ease-out);
    }

    p,
    li {
        color: var(--text);
    }

    ul,
    ol {
        padding-left: 1.4rem;
    }

    li + li {
        margin-top: 0.25rem;
    }

    // Inline links grow an underline instead of changing layout.
    a {
        ${underlineOnHover}
    }

    blockquote {
        margin: 1rem 0;
        padding: 0.6rem 1rem;
        border-left: 3px solid var(--border-strong);
        background: var(--surface);
        border-radius: 0 var(--radius-md) var(--radius-md) 0;
        color: var(--text-muted);
        transition: border-color var(--duration) var(--ease-out);

        &:hover {
            border-left-color: var(--accent);
        }
    }

    code {
        padding: 0.12rem 0.35rem;
        border-radius: var(--radius-xs);
        background: var(--code-bg);
        border: 1px solid var(--border);
        font-family: var(--font-mono);
        font-size: 0.85em;
        transition: border-color var(--duration-fast) var(--ease-out);
    }

    pre {
        overflow-x: auto;
        padding: 1rem;
        border-radius: var(--radius-lg);
        background: var(--code-bg);
        border: 1px solid var(--border);
        transition: border-color var(--duration) var(--ease-out);

        &:hover {
            border-color: var(--border-strong);
        }

        code {
            padding: 0;
            border: none;
            background: none;
        }
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin: 0;
        font-size: 0.92rem;
    }

    th,
    td {
        padding: 0.5rem 0.7rem;
        border: 1px solid var(--border);
        text-align: left;
    }

    th {
        background: var(--surface);
        color: var(--text-strong);
    }

    tbody tr {
        transition: background var(--duration-fast) var(--ease-out);

        &:hover {
            background: rgba(245, 158, 11, 0.06);
        }
    }

    img {
        max-width: 100%;
    }

    hr {
        border: none;
        border-top: 1px solid var(--border);
        margin: 2rem 0;
    }
`;

/* --- footer -------------------------------------------------------------- */

export const Footer = styled.footer`
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1.5rem;
    justify-content: space-between;
    padding: 1.2rem 1.5rem;
    border-top: 1px solid var(--border);
    color: var(--text-muted);
    font-size: 0.82rem;

    nav {
        display: flex;
        gap: 1rem;
    }

    a {
        ${underlineOnHover}
    }
`;
