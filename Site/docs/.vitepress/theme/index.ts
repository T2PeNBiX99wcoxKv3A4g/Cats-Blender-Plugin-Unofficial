import DefaultTheme from "vitepress/theme";

import {site} from "../../../site.config.mjs";
import "./custom.css";

/**
 * The site root is a redirect. It also maps the addresses the previous site used
 * (`#/docs/FAQ`, `#/docs/FAQ#anchor`, `?lang=ja`) onto the per-language folders, so old
 * links keep working. It lives here rather than in the root page because VitePress compiles
 * `<script>` tags inside markdown as part of the page, which then runs during the build.
 */
function redirectFromRoot() {
    const {pathname, search, hash} = window.location;
    const root = site.base;

    if (pathname !== root && pathname !== `${root}index.html`) return;

    const asked = new URLSearchParams(search).get("lang")?.toLowerCase();
    const language = site.languages.find((id) => id.toLowerCase() === asked) ?? site.defaultLanguage;
    const prefix = `${root}${language}`;

    const old = hash.match(/^#\/docs\/([^#]+)(?:#(.+))?$/);
    const anchor = old?.[2] ? `#${old[2]}` : "";

    if (old) {
        window.location.replace(`${prefix}/${old[1]}.html${anchor}`);
    } else if (hash === "#/docs" || hash === "#/docs/") {
        window.location.replace(`${prefix}/Overview.html`);
    } else {
        window.location.replace(`${prefix}/`);
    }
}

export default {
    extends: DefaultTheme,
    enhanceApp() {
        // The build renders every page too, where there is no window.
        if (typeof window !== "undefined") redirectFromRoot();
    },
};
