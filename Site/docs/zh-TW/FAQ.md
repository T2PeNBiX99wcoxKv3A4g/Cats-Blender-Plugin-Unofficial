# 常見問題（FAQ）

關於 Cats Blender Plugin 在 Blender 4.2 LTS 到 5.4 上的常見問題。

## 一般問題

### 什麼是 Cats Blender Plugin？

Cats 是一套用來縮短匯入與最佳化 VRChat 模型所需步驟的工具。它支援多種模型格式，包括 MMD、XNALara、Source Engine、VRM 等。

### 這是官方的 Cats 外掛嗎？

這是**非官方 Cats 外掛**，由社群維護。原本的官方 Cats 外掛自 2022 年起已被棄置。本版本持續積極開發，並支援現代版本的 Blender。

更多資訊請見[官方 Cats 的狀態如何？](#what-is-the-status-of-official-cats)

### 我需要哪個版本的 Blender？

Cats 需要 **Blender 4.2 LTS 或更新版本**；支援 4.2 LTS 到 5.4。Blender 4.1 及更舊的版本無法載入此擴充功能。詳情請見[版本支援](Version-Support)。

我們也只支援 Steam 版本與 blender.org 版本。Windows Store、Linux 套件管理員版本、snap store 與 flatpak 版本的 Blender 都不支援。

### Cats 是免費的嗎？

是的，Cats 完全免費，並以 MIT 授權條款開源。

### 我可以在哪裡下載 Cats？

- **儲存庫與發行版：** [GitHub](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/releases)

---

## 安裝問題

### 我要如何安裝 Cats？

請參閱完整的[安裝](Installation)指南。快速版：
1. 下載 ZIP 檔案（不要解壓縮）
2. 開啟 Blender 5.2+
3. Edit > Preferences > Extensions
4. Install from Disk
5. 選擇該 ZIP 檔案
6. 啟用擴充功能

### 安裝後需要重新啟動 Blender 嗎？

是的，建議在安裝或更新 Cats 之後重新啟動 Blender，以獲得最佳結果。

### 我可以同時安裝多個版本的 Cats 嗎？

不行，只能安裝一個版本的 Cats。請在安裝新版本前移除舊版本。

### 我的設定會儲存在哪裡？

設定儲存在 Cats 自己的使用者資料資料夾中，而不是你的 `.blend` 檔案裡，因此它們在 Cats 更新後仍會保留。確切位置請見[設定](Settings#settings-file-location)。

---

## 相容性問題

### Cats 可以在 Blender 4.x 上運作嗎？

Cats 可在 Blender 4.2 LTS 到 5.4 上運作。Blender 4.1 及更舊的版本無法載入此擴充功能，而且沒有為它們提供的替代版本。

### 我可以在較舊的 Blender 版本中開啟 Blender 5.2 / 5.3 的檔案嗎？

不建議。以 Blender 5.2 / 5.3 儲存的檔案可能無法在較舊版本中正確開啟，可能導致資料遺失或當機。

### Cats 支援哪些模型格式？

**匯入格式：**
- MMD：`.pmx`、`.pmd`
- XNALara：`.xps`、`.mesh`、`.ascii`
- Source Engine：`.smd`、`.qc`、`.vta`、`.dmx`
- VRM：`.vrm`
- FBX：`.fbx`
- Collada：`.dae`
- 內含模型的 ZIP 壓縮檔

**匯出格式：**
- FBX（供 Unity／VRChat 使用）
- GLTF（供 Resonite 使用）

---

## 功能問題

### 我看得到姿態模式嗎？

姿態模式只會在下列情況出現在[快速存取](Quick-Access)面板中：
- 你已匯入模型
- 模型有有效的骨架

請先匯入模型，之後姿態模式的選項就會出現。

### 為什麼我不能使用圖集功能？

[圖集產生器](Optimization#atlas-generator)內建於 Cats，不需要安裝任何東西。它仍標示為 **alpha**：它可以運作，但匯出前請檢查結果。

舊的 **Atlas Generator (Legacy)** 面板需要 Shotariya Material Combiner 外掛，已於 **`5.3.1.0` 中移除**。如果你在找它，請改用圖集產生器；若仍安裝 Material Combiner，它的 **Import Material Combiner Settings** 按鈕會把你先前的設定複製過來。

### 為什麼我不能使用縮放功能？

縮放功能內建於 Cats，不再需要 Immersive Scaler 或任何其他外掛。如果按鈕呈現灰色，表示 Cats 找不到骨架：請在 Cats 的骨架下拉選單中選取虛擬角色的骨架，或將其設為作用中的物件。請見[縮放](Scaling#common-scale-issues)。

### 我應該對 Booth 買來的虛擬角色使用 Fix MMD Model 嗎？

**不要！** Fix MMD Model **只**該用於全新、未處理過的 MMD／VRM 檔案。請勿在下列情況使用：
- 商店購買的模型（Booth、Gumroad 等）
- 已經針對 Unity 設定完成的模型
- 你正在製作的自訂模型

詳情請見[轉換器](Converters)。

---

## 工作流程問題

### 我應該按照什麼順序操作？

建議的工作流程：

1. **匯入**模型
2. **修復 MMD 模型**（僅限全新的 MMD／VRM）
3. 將名稱**翻譯**為英文
4. 視需要**套用變換**
5. **縮放**到正確身高
6. **合併材質／建立圖集**
7. **設定眼動追蹤**
8. **設定視素**
9. **最佳化**（骨骼合併、清理）
10. **匯出**

**重點：** 合併材質／建立圖集必須在眼動追蹤與視素**之前**完成！

### 為什麼要在眼動追蹤與視素之前製作圖集？

請在設定下列項目**之前**完成材質合併與圖集製作：
- 眼動追蹤
- 視素
- 其他形態鍵設定

舊的 Material Combiner 外掛若在這些設定之後執行，可能會使形態鍵錯位。內建的圖集產生器只會改變材質與 UV，但把材質相關工作放在前面能讓流程保持可預期。永遠先處理材質！

### 我要如何為 VRChat 準備模型？

1. 使用 Cats 匯入
2. Fix MMD Model（如適用，僅限 VRM 或 MMD 模型）
3. 翻譯為英文
4. 縮放到 160-180cm
5. 最佳化材質與骨骼
6. 設定眼動追蹤（選用）
7. 設定視素（選用）
8. 匯出給 Unity 使用的 FBX
9. 匯入 Unity 並在該處設定材質

---

## 疑難排解問題

### 為什麼安裝後 Cats 沒有出現？

常見原因：
- 擴充功能未啟用（請檢查 Preferences > Extensions）
- Blender 未重新啟動
- Cats 版本與你的 Blender 不相符
- 側邊欄被隱藏（在 3D 視埠按 N）

詳細的解決方式請見[疑難排解](Troubleshooting#extension-doesnt-appear-after-installation)。

### 為什麼我的模型是黑的／沒有貼圖？

常見原因：
- 視埠著色模式錯誤（按 Z，選擇 Material Preview）
- 貼圖未正確連結
- 圖集製作後：圖集材質是單純的 Principled BSDF（請改在 Unity 中設定材質）

解決方式請見[疑難排解](Troubleshooting#model-appears-black-or-no-textures)。

### 為什麼我的虛擬角色在 VRChat 中看起來太大／太小？

- 使用[縮放](Scaling)面板檢查 Blender 中的比例
- 建議身高：160-180cm
- 匯出前套用變換
- 確認 Unity 的匯入縮放為 1.0

### 這些政策違規警告是什麼？

這些警告會在 Blender 5.2 / 5.3 中出現，原因是 Cats 使用舊式方法載入 MMD Tools 等第三方外掛。**這些警告是預期中的，可以安全忽略** - 一切仍會正常運作。

---

## 最佳化問題

### 我要如何減少虛擬角色的多邊形數量？

1. 使用[最佳化](Optimization)面板中的移除重複頂點
2. 使用 Tuxedo Blender Plugin 進行減面
3. 合併網格
4. 手動移除不必要的網格細節

### 我要如何減少繪製呼叫（draw call）？

1. 在[最佳化](Optimization)中**合併材質**
2. 使用內建的[圖集產生器](Optimization#atlas-generator)**建立貼圖圖集**
3. **合併網格**
4. 減少獨立材質的數量

### 我要如何減少骨骼數量？

使用最佳化面板中的[骨骼與權重](Optimization#bones-weights)：
- 從合併比例 0.5 開始
- 為安全起見啟用「Keep Merged Bones」
- 在執行清理操作前先測試
- 合併後移除零權重骨骼

### 合併材質與建立圖集有什麼不同？

- **合併材質：** 將屬性相同的材質合併為一個
- **建立圖集：** 將多張貼圖合併成一張大貼圖
- 圖集通常能提供更好的效能改善
- 兩者都能減少繪製呼叫

---

## 技術問題

### Cats 可以搭配 Steam／Microsoft Store 版 Blender 使用嗎？

雖然 Cats 可能可以運作，但**我們建議改從 blender.org 下載 Blender**：
- Steam 版本：有些使用者回報問題
- Microsoft Store 版本：已知的權限問題
- 官方下載：最可靠

### 我可以離線使用 Cats 嗎？

可以，除了下列項目：
- 線上翻譯服務（Google、DeepL、LibreTranslate、MyMemory）。內部字典可離線運作。
- 下載最新的翻譯檔
- 更新檢查器（需要網際網路才能檢查更新）
- 其他所有功能都可離線運作

Cats 會遵循 Blender 的 **Edit > Preferences > System > Network > Allow Online Access** 設定。關閉此設定後，Cats 完全不會建立網路連線：更新檢查會被略過、翻譯下載會被拒絕，而翻譯會退回使用內部字典。

### Cats 會收集任何資料嗎？

不會。Cats 不會收集、傳送或儲存任何使用者資料。唯一的網路連線是：
- 你選擇的線上翻譯服務（僅在你使用翻譯功能時）- 請見[翻譯](Translation)
- 更新伺服器（檢查更新時）
- 本儲存庫中的翻譯檔（僅在你點擊下載最新翻譯時）

當 Blender 的 **Allow Online Access** 關閉時，以上都不會發生。

### 我的翻譯 API 金鑰會被儲存在 .blend 檔案中嗎？

不會。自 `5.3.1.0` 起，你的 DeepL／LibreTranslate API 金鑰、LibreTranslate URL 與 MyMemory 電子郵件只會儲存在 Cats 自己的設定檔中，永遠不會存進 `.blend`，因此分享檔案永遠不會分享你的金鑰。舊版本存進檔案中的金鑰會在你開啟該檔案時被移除；請重新儲存該檔案以讓此變更生效。如果你已經分享過以舊版本製作的檔案，建議更換你的 API 金鑰。

### Cats 還有在維護嗎？

有。Cats 由社群維護，支援 **Blender 4.2 LTS 到 5.4**（建議使用 5.2 LTS）。開發工作於[儲存庫](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial)進行。

---

## 更新問題

### 我要如何更新 Cats？

1. 從[儲存庫發行版](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/releases)下載新版本
2. 關閉 Blender
3. 移除舊的 Cats 版本（Preferences > Extensions）
4. 重新啟動 Blender
5. 安裝新版本
6. 啟用擴充功能

詳情請見[設定](Settings#installing-updates)。

### 我應該多久更新一次？

在下列情況更新：
- 你想要的新功能發佈時
- 針對你遇到問題的錯誤修正發佈時
- Blender 重大更新時
- 安全性更新時（在儲存庫公告）

### 更新會破壞我現有的專案嗎？

通常不會，但是：
- 更新前務必備份專案
- 先在非關鍵檔案上測試
- 閱讀發行說明以了解破壞性變更
- 視需要可回復到舊版本

---

## 原始 Cats 相關問題

### 官方 Cats 的狀態如何？

**官方 Cats Blender Plugin 已被棄置。** 時間軸：

- **最後發行：** 2021 年 6 月 27 日
- **最後主要更新：** 2022 年 1 月 25 日
- **目前狀態：** 截至 2024 年已 100% 棄置

**發生了什麼事：**
- 原始開發者（Absolute Quantum／Hotox）從網際網路上消失
- 儘管多次嘗試仍無法聯絡
- Patreon 持續收費，直到 Neoneko 與 Patreon 安全團隊合作將其移除（花了 6 個月以上）
- 超過 3 年沒有更新
- 沒有支援或溝通

**非官方 Cats：**
- 由社群維護
- 支援最新的 Blender 版本
- 定期更新與錯誤修正
- 活躍的社群支援

### 我應該使用舊的教學影片嗎？

對舊教學要保持謹慎：
- 許多使用過時的官方 Cats
- UI 已有大幅變動
- 有些建議已過時或不正確
- 請尋找使用非官方 Cats 與 Blender 5.2+ 的教學

**舊教學中常見的錯誤建議：**
- 手動編輯程式碼（從來沒有必要）
- 從程式碼中移除「Testing」（會造成損壞）
- 使用不相容的 Cats 版本
- 過時的工作流程

### 我要如何協助讓更多人知道？

1. **在 YouTube 影片下留言：**
   - 指出影片是否使用過時的 Cats
   - 分享非官方 Cats 的連結
   - 提及對 Blender 5.2 / 5.3 的支援

2. **更新論壇貼文：**
   - 更正過時的資訊
   - 連結到目前的文件
   - 分享成功案例

3. **製作內容：**
   - 製作更新的教學
   - 撰寫指南
   - 在社群媒體上分享

---

## 平台特定問題

### Cats 可以用於 VRChat 以外的平台嗎？

可以！Cats 可用於：
- **VRChat** - 主要目標
- **ChilloutVR** - 相容的工作流程
- **Resonite** - 有專屬的匯出選項
- **其他 VR 平台** - 通常相容
- **一般 3D 用途** - 最佳化工具在任何地方都有用

### Cats 可以搭配 Quest 虛擬角色使用嗎？

可以，最佳化工具對 Quest 特別有用：
- 材質合併與圖集製作
- 骨骼合併
- 多邊形縮減（搭配其他工具）
- 全都有助於符合 Quest 的限制

### 我可以將 Cats 用於非 VR 模型嗎？

可以！許多功能對任何 3D 工作流程都很有用：
- 模型匯入
- 骨架合併
- 材質最佳化
- 翻譯工具
- 一般網格操作

---

## 進階問題

### 我可以修改 Cats 嗎？

可以！Cats 是開源的（MIT 授權條款）：
- 在 GitHub 上檢視原始碼
- 為個人用途進行修改
- 貢獻改進
- 分支出自訂版本

### 我要如何回報錯誤？

1. 先查看[疑難排解](Troubleshooting)
2. 在 GitHub issues 中搜尋類似的回報
3. 若是新的錯誤，請開 GitHub issue 並附上：
   - Cats 版本
   - Blender 版本
   - 重現步驟
   - 預期行為與實際行為
   - 錯誤訊息／截圖

### 我要如何貢獻？

有幾種貢獻方式：
- 回報錯誤
- 建議功能（請先討論）
- 提交 pull request
- 協助翻譯
- 撰寫文件

所有事情都在[儲存庫](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial)上進行。

### 我可以在哪裡請求功能？

1. 在[儲存庫](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/issues)開一個 issue
2. 檢查該功能是否已在規劃中
3. 具體說明你的使用情境
4. 理解它可能不會被實作

---

## 尋求協助

### 我可以在哪裡提問？

- **本 Wiki** - 功能指南與疑難排解
- **[儲存庫 issues](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/issues)** - 錯誤回報與問題

> 我們已經不再經營 Discord 伺服器或網站。所有支援都在儲存庫上進行。

### 尋求協助時我應該提供哪些資訊？

- Blender 版本（確切版本）
- Cats 版本（確切版本）
- 你試著要做什麼
- 實際上發生了什麼
- 錯誤訊息（完整文字）
- 相關的截圖
- 重現步驟

### 這裡沒有回答我的問題

請查看：
1. 本 wiki 中相關的功能頁面
2. [疑難排解](Troubleshooting)頁面
3. 在[儲存庫](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/issues)搜尋既有的 issue
4. 若尚未有文件說明，請開一個新的 issue

---

**相關頁面：**
- [安裝](Installation) - 設定指南
- [疑難排解](Troubleshooting) - 問題解決
- [版本支援](Version-Support) - 相容性資訊
- 各項工具的專屬功能頁面

---

