// Labels the theme needs, one block per language. The page text itself lives in the markdown.
//
// `theme` holds the strings of the default theme (outline, footer, search, buttons); VitePress does not translate
// them by itself, so every language carries its own copy here.
const groups = {
    en: {"getting-started": "Getting started", workflow: "Workflow", help: "Help"},
    ja: {"getting-started": "はじめに", workflow: "ワークフロー", help: "ヘルプ"},
    ko: {"getting-started": "시작하기", workflow: "워크플로", help: "도움말"},
    "zh-CN": {"getting-started": "开始使用", workflow: "操作流程", help: "疑难解答"},
    "zh-TW": {"getting-started": "開始使用", workflow: "操作流程", help: "疑難排解"},
};

export const labels = {
    en: {
        language: "English",
        nav: {docs: "Documentation", releases: "Releases", github: "GitHub"},
        group: groups.en,
        homeNote: "This page is generated from the repository README.",
        footer: {
            message: "Unofficial continuation, not affiliated with the original Cats developers.",
            copyright: "Released under the MIT License.",
        },
        theme: {
            search: {
                button: {buttonText: "Search", buttonAriaLabel: "Search"},
                modal: {
                    noResultsText: "No results found",
                    resetButtonTitle: "Clear",
                    footer: {selectText: "select", navigateText: "to navigate", closeText: "to close"},
                },
            },
        },
    },
    ja: {
        language: "日本語",
        nav: {docs: "ドキュメント", releases: "リリース", github: "GitHub"},
        group: groups.ja,
        homeNote: "このページはリポジトリの README から生成されています。",
        footer: {
            message: "非公式の継続版です。元の Cats 開発者とは関係ありません。",
            copyright: "MIT ライセンスで公開されています。",
        },
        theme: {
            outline: {label: "目次"},
            docFooter: {prev: "前へ", next: "次へ"},
            lastUpdated: {text: "最終更新"},
            darkModeSwitchLabel: "外観",
            sidebarMenuLabel: "メニュー",
            returnToTopLabel: "トップへ戻る",
            langMenuLabel: "言語を変更",
            search: {
                button: {buttonText: "検索", buttonAriaLabel: "検索"},
                modal: {
                    noResultsText: "一致する結果がありません",
                    resetButtonTitle: "クリア",
                    footer: {selectText: "選択", navigateText: "移動", closeText: "閉じる"},
                },
            },
        },
    },
    ko: {
        language: "한국어",
        nav: {docs: "문서", releases: "릴리스", github: "GitHub"},
        group: groups.ko,
        homeNote: "이 페이지는 저장소의 README에서 생성됩니다.",
        footer: {
            message: "비공식 후속 버전이며 원래 Cats 개발자와 관련이 없습니다.",
            copyright: "MIT 라이선스로 배포됩니다.",
        },
        theme: {
            outline: {label: "목차"},
            docFooter: {prev: "이전", next: "다음"},
            lastUpdated: {text: "마지막 업데이트"},
            darkModeSwitchLabel: "테마",
            sidebarMenuLabel: "메뉴",
            returnToTopLabel: "맨 위로",
            langMenuLabel: "언어 변경",
            search: {
                button: {buttonText: "검색", buttonAriaLabel: "검색"},
                modal: {
                    noResultsText: "결과가 없습니다",
                    resetButtonTitle: "지우기",
                    footer: {selectText: "선택", navigateText: "이동", closeText: "닫기"},
                },
            },
        },
    },
    "zh-CN": {
        language: "简体中文",
        nav: {docs: "文档", releases: "版本发布", github: "GitHub"},
        group: groups["zh-CN"],
        homeNote: "此页面由项目 README 自动生成。",
        footer: {
            message: "非官方延续版本，与原始 Cats 开发者无关。",
            copyright: "以 MIT 授权发布。",
        },
        theme: {
            outline: {label: "本页目录"},
            docFooter: {prev: "上一页", next: "下一页"},
            lastUpdated: {text: "最后更新"},
            darkModeSwitchLabel: "主题",
            sidebarMenuLabel: "菜单",
            returnToTopLabel: "回到顶部",
            langMenuLabel: "切换语言",
            search: {
                button: {buttonText: "搜索", buttonAriaLabel: "搜索"},
                modal: {
                    noResultsText: "没有找到结果",
                    resetButtonTitle: "清除",
                    footer: {selectText: "选择", navigateText: "切换", closeText: "关闭"},
                },
            },
        },
    },
    "zh-TW": {
        language: "繁體中文",
        nav: {docs: "文件", releases: "版本發佈", github: "GitHub"},
        group: groups["zh-TW"],
        homeNote: "此頁由專案 README 自動產生。",
        footer: {
            message: "非官方延續版本，與原始 Cats 開發者無隸屬關係。",
            copyright: "以 MIT 授權發佈。",
        },
        theme: {
            outline: {label: "本頁目錄"},
            docFooter: {prev: "上一頁", next: "下一頁"},
            lastUpdated: {text: "最後更新"},
            darkModeSwitchLabel: "主題",
            sidebarMenuLabel: "選單",
            returnToTopLabel: "回到頂部",
            langMenuLabel: "切換語言",
            search: {
                button: {buttonText: "搜尋", buttonAriaLabel: "搜尋"},
                modal: {
                    noResultsText: "沒有找到結果",
                    resetButtonTitle: "清除",
                    footer: {selectText: "選擇", navigateText: "切換", closeText: "關閉"},
                },
            },
        },
    },
};
