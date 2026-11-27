// Labels the theme needs, one block per language. The page text itself lives in the markdown.
//
// `home.features` becomes the cards on the landing page: the card title is taken from the page
// itself, so only the slug and the one-line description are written here.
// `theme` holds the strings of the default theme (outline, footer, search, buttons); VitePress
// does not translate them by itself, so every language carries its own copy.
const groups = {
    "en-US": {"getting-started": "Getting started", workflow: "Workflow", help: "Help"},
    "ja-JP": {"getting-started": "はじめに", workflow: "ワークフロー", help: "ヘルプ"},
    "ko-KR": {"getting-started": "시작하기", workflow: "워크플로", help: "도움말"},
    "zh-Hans": {"getting-started": "开始使用", workflow: "操作流程", help: "疑难解答"},
    "zh-Hant": {"getting-started": "開始使用", workflow: "操作流程", help: "疑難排解"},
};

export const labels = {
    "en-US": {
        language: "English",
        nav: {docs: "Documentation", releases: "Releases", github: "GitHub"},
        group: groups["en-US"],
        home: {
            tagline: "Shorten the steps to import and optimize models for VRChat.",
            features: [
                {slug: "Installation", details: "Install through Blender's extension system, or from the release zip."},
                {slug: "Version-Support", details: "Blender 4.2 LTS through 5.4, and which builds are actually tested."},
                {slug: "Quick-Access", details: "Import, fix and export from one panel, with the tools you use on every model."},
                {slug: "Optimization", details: "Merge materials, repair shape keys, combine bones, bake a texture atlas."},
                {slug: "Bone-Tools", details: "Rename, merge and connect bones, with helpers for pose mode."},
                {slug: "Translation", details: "The interface in English, Japanese, Korean and both Chinese scripts."},
            ],
        },
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
    "ja-JP": {
        language: "日本語",
        nav: {docs: "ドキュメント", releases: "リリース", github: "GitHub"},
        group: groups["ja-JP"],
        home: {
            tagline: "VRChat 向けモデルのインポートと最適化の手順を短くします。",
            features: [
                {slug: "Installation", details: "Blender の拡張機能システム、またはリリースの zip から導入できます。"},
                {slug: "Version-Support", details: "Blender 4.2 LTS から 5.4 まで。実際に検証したビルドも記載しています。"},
                {slug: "Quick-Access", details: "インポート・修正・エクスポートを 1 つのパネルにまとめています。"},
                {slug: "Optimization", details: "マテリアルの統合、シェイプキーの修復、ボーンの結合、テクスチャアトラスの作成。"},
                {slug: "Bone-Tools", details: "ボーンの名前変更・結合・接続と、ポーズモード向けの補助機能。"},
                {slug: "Translation", details: "UI は英語・日本語・韓国語・中国語（簡体字／繁体字）に対応しています。"},
            ],
        },
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
    "ko-KR": {
        language: "한국어",
        nav: {docs: "문서", releases: "릴리스", github: "GitHub"},
        group: groups["ko-KR"],
        home: {
            tagline: "VRChat용 모델의 가져오기와 최적화 단계를 줄여 줍니다.",
            features: [
                {slug: "Installation", details: "Blender 확장 시스템이나 릴리스 zip으로 설치합니다."},
                {slug: "Version-Support", details: "Blender 4.2 LTS부터 5.4까지, 실제로 검증한 빌드도 정리해 두었습니다."},
                {slug: "Quick-Access", details: "가져오기, 수정, 내보내기를 한 패널에서 처리합니다."},
                {slug: "Optimization", details: "머티리얼 병합, 셰이프 키 복구, 본 결합, 텍스처 아틀라스 생성."},
                {slug: "Bone-Tools", details: "본 이름 변경·병합·연결과 포즈 모드 보조 기능."},
                {slug: "Translation", details: "UI는 영어, 일본어, 한국어, 중국어(간체·번체)를 지원합니다."},
            ],
        },
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
    "zh-Hans": {
        language: "简体中文",
        nav: {docs: "文档", releases: "版本发布", github: "GitHub"},
        group: groups["zh-Hans"],
        home: {
            tagline: "缩短为 VRChat 导入和优化模型的步骤。",
            features: [
                {slug: "Installation", details: "通过 Blender 扩展系统安装，或直接使用发布页的 zip。"},
                {slug: "Version-Support", details: "支持 Blender 4.2 LTS 至 5.4，并列出实际验证过的版本。"},
                {slug: "Quick-Access", details: "导入、修复、导出集中在一个面板。"},
                {slug: "Optimization", details: "合并材质、修复形态键、合并骨骼、生成贴图图集。"},
                {slug: "Bone-Tools", details: "重命名、合并与连接骨骼，并提供姿态模式辅助。"},
                {slug: "Translation", details: "界面支持英语、日语、韩语和简体／繁体中文。"},
            ],
        },
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
    "zh-Hant": {
        language: "繁體中文",
        nav: {docs: "文件", releases: "版本發佈", github: "GitHub"},
        group: groups["zh-Hant"],
        home: {
            tagline: "縮短為 VRChat 匯入與最佳化模型的步驟。",
            features: [
                {slug: "Installation", details: "透過 Blender 擴充功能系統安裝，或直接使用發佈頁的 zip。"},
                {slug: "Version-Support", details: "支援 Blender 4.2 LTS 至 5.4，並列出實際驗證過的版本。"},
                {slug: "Quick-Access", details: "匯入、修復、匯出集中在同一個面板。"},
                {slug: "Optimization", details: "合併材質、修復形態鍵、合併骨骼、產生貼圖圖集。"},
                {slug: "Bone-Tools", details: "重新命名、合併與連接骨骼，並提供姿態模式輔助。"},
                {slug: "Translation", details: "介面支援英語、日語、韓語與簡體／繁體中文。"},
            ],
        },
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
