/**
 * Everything about this project that is not text: where it lives and which pages the
 * documentation holds. Plain JavaScript, because the generators read it with node.
 */
export const site = {
    name: "Cats Blender Plugin",
    suffix: "Unofficial",
    tagline: "Shorten the steps to import and optimize models for VRChat.",
    description:
        "An unofficial continuation of the Cats Blender Plugin, supporting Blender 4.2 LTS and newer.",
    url: "https://t2penbix99wcoxkv3a4g.github.io/Cats-Blender-Plugin-Unofficial/",
    repository: "https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial",
    releases: "https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/releases",
    upstream: "https://github.com/teamneoneko/Cats-Blender-Plugin",
    wikiSource: "https://git.neoneko.org/NeoNeko/Cats-Blender-Plugin/wiki",
    icon: "https://raw.githubusercontent.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/main/resources/icons/cats.png",
    languages: ["en", "ja", "ko", "zh-CN", "zh-TW"],
    defaultLanguage: "en",
    // Sidebar order and grouping for the wiki pages under docs/<language>/.
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
