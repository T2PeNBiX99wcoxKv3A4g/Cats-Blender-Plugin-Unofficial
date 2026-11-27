/**
 * Everything about this site that is not prose: where it lives, which languages it offers
 * and which pages the documentation holds. Plain JavaScript, so `docs/.vitepress/config.mts`
 * can import it and build the navigation from it.
 *
 * To add a page: create `docs/<language>/<slug>.md` for every language and list the slug in
 * the group it belongs to; the sidebar text comes from the page's own H1.
 */
export const site = {
    name: "Cats Blender Plugin",
    suffix: "Unofficial",
    tagline: "Shorten the steps to import and optimize models for VRChat.",
    description:
        "An unofficial continuation of the Cats Blender Plugin, supporting Blender 4.2 LTS and newer.",
    url: "https://t2penbix99wcoxkv3a4g.github.io/Cats-Blender-Plugin-Unofficial/",
    base: "/Cats-Blender-Plugin-Unofficial/",
    repository: "https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial",
    releases: "https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/releases",
    upstream: "https://github.com/teamneoneko/Cats-Blender-Plugin",
    wikiSource: "https://git.neoneko.org/NeoNeko/Cats-Blender-Plugin/wiki",
    // BCP 47 codes, the same set the documentation is translated into.
    languages: ["en-US", "ja-JP", "ko-KR", "zh-Hans", "zh-Hant"],
    defaultLanguage: "en-US",
    // Sidebar order and grouping for the pages under docs/<language>/.
    groups: [
        {
            id: "getting-started",
            docs: ["Overview", "Installation", "Version-Support", "Settings"],
        },
        {
            id: "workflow",
            docs: [
                "Quick-Access",
                "Optimization",
                "Converters",
                "Merge-and-Attach",
                "Bone-Tools",
                "Bone-Parenting",
                "Mesh-Tools",
                "UV-Tools",
                "Scaling",
                "Visemes",
                "Eye-Tracking",
                "Translation",
            ],
        },
        {
            id: "help",
            docs: ["Troubleshooting", "FAQ"],
        },
    ],
};
