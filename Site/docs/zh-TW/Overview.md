> ℹ **這些頁面記錄的是 Cats Blender Plugin 的功能集。** 它們是為本分支所延續的上游發行版所撰寫；本版本支援 Blender 4.2 LTS 到 5.4。
>

# Cats Blender Plugin - Wiki

歡迎來到 **Cats Blender Plugin** 的文件，它是以非官方社群延續版本的形式維護。

Cats 是一套用來縮短匯入與最佳化 VRChat 及其他平台模型所需步驟的工具。它支援多種格式，包括 MMD、XNALara、Mixamo、Source Engine、VRM、glTF/GLB、FBX、DAE 等。

## 版本支援

| | |
|---|---|
| **支援的 Blender** | **4.2 LTS** 到 **5.4** |
| **建議版本** | **Blender 5.2 LTS** |


## 快速連結

### 開始使用
- [安裝](Installation) - 如何安裝 Cats 及其選用外掛
- [版本支援](Version-Support) - 支援與已終止支援的版本

### 介面指南
- [快速存取](Quick-Access) - 匯入／匯出、**Fix MMD Model**、快速動作與姿態模式
- [最佳化](Optimization) - 材質、網格清理、形態鍵、骨骼與權重，以及內建的圖集產生器（alpha）
- [轉換器](Converters) - Rigify、Source／Valve、VRM 與 MMD 清理（舊稱「MMD 選項」）
- [合併與附加](Merge-and-Attach) - 合併骨架與附加網格（舊稱「自訂模型建立」）
- [翻譯](Translation) - 全新的多服務翻譯系統
- [骨骼工具](Bone-Tools) - 趾行腿與扭轉骨骼
- [UV 工具](UV-Tools) - 對齊 UV 邊並找出最短路徑的接縫
- [視素](Visemes) - 嘴型對嘴設定
- [眼動追蹤](Eye-Tracking) - 眼球運動與眨眼設定
- [骨骼父子關係](Bone-Parenting) - 根骨骼管理
- [縮放](Scaling) - 內建的虛擬角色重新縮放、手指張開與比例比對
- [設定](Settings) - 外掛設定與更新

### 說明與支援
- [疑難排解](Troubleshooting) - 常見問題與解決方式
- [常見問題](FAQ) - 常見問答

## 5.3.1.0 的新功能

- **Blender 4.2 LTS 及更新版本** - 支援 4.2 LTS 到 5.4。請見[版本支援](Version-Support)。
- **移除 Material Combiner** - *Atlas Generator (Legacy)* 面板已移除。內建工具現在就叫做**[圖集產生器](Optimization#atlas-generator)**；若安裝了 Material Combiner，**Import Material Combiner Settings** 仍會把你舊的設定複製過來。
- **圖集修正** - 每次建置都有自己的名稱，因此為第二個虛擬角色做圖集不會再覆蓋第一個的圖集（而且儲存到資料夾永遠不會覆蓋既有的 PNG）。純色與著色材質現在會以正確的顏色輸出，而不是太暗。連結複製的網格不會再被重新對應兩次，物件間共用的烘焙材質會保留每個物件的面，烘焙一律以影像貼圖為目標（永遠不會動到你的頂點色），而儲存到資料夾失敗時會改為把圖集封裝進 .blend，而不是遺失它。大型建置使用的記憶體少得多，縮小後的貼圖也較不易產生鋸齒。
- **API 金鑰不會留在你的 .blend 檔案中** - DeepL／LibreTranslate 金鑰、LibreTranslate URL 與 MyMemory 電子郵件只會保存在 Cats 自己的設定檔中，而存進較舊檔案的金鑰會在檔案開啟時被移除。請見[翻譯](Translation)。
- **語言變更只會重新載入 Cats**，而不是每個外掛，而且損壞或下載一半的翻譯檔不再會使 Cats 無法載入；它會退回使用內附或英文檔案。
- **Cats 載入時不再變更你的 Blender 偏好設定**，而且你每次開啟 .blend 時，Cats 設定都會重新套用。
- **跨 Blender 版本的更新** - 更新器現在會列出每個發行版，而不只是針對你的 Blender 版本製作的版本；Blender 本身會阻擋你的版本無法執行的任何內容。
- **修正** - Blender 5.x 上的 VMD 動作匯入、縮放工具在 F9 重做時當機、Remove Doubles 在同一個工作階段中執行多次時損壞形態鍵，以及重新載入後部分面板與操作員遺失的問題。
- **Support Us** 按鈕已從 Credits 面板移除。

## 5.2.4.0 的新功能

- **內建圖集工具（alpha）** - 全新的 **[Atlas Generator (New)](Optimization#atlas-generator)** 子面板，不需要 Material Combiner 或 Pillow 即可製作圖集。它會從單一版面產生 albedo，並可選擇產生 normal、emission、roughness、metallic、AO 與 height 貼圖，以邊緣延伸的方式為儲存格加上間距，使 mip 層級不會互相滲漏，並且可以用 Cycles 烘焙程序化材質。目前 **Material Combiner 仍是預設**，並會在 Blender 5.3 版本中移除。
- **MMD 作者的英文名稱** - 模型作者儲存在 PMX 檔案中的英文名稱現在會在翻譯時使用。形態鍵的流程是 字典 → 作者名稱 → 線上服務，由[翻譯](Translation#author-names-mmd)中新的 **Author Names** 設定控制（**Fill Gaps**／**Prefer Author Names**／**Off**），Fix MMD Model 會沿用該設定；材質預設使用這些名稱，可切換。骨骼與物件則不變。Fix MMD Model 會在刪除 MMD 根之前保留名稱，而翻譯 CSV 匯出則新增了 *source* 欄位。經過輕度測試，歡迎提供意見。
- 內附 **MMD Tools 4.5.14**。
- 授權文字全面更正為 MIT。

## 5.2.3.0 的新功能

- **重新組織介面** - 面板重新調整結構，讓工具位於你預期的位置。**Fix MMD Model** 現在位於[快速存取](Quick-Access)的頂端；所有格式轉換都移到單一的[轉換器](Converters)面板中。
- **全新的翻譯系統** - 可外掛的[翻譯](Translation)後端讓你可以在內部字典、Google、DeepL、LibreTranslate 或 MyMemory 之間選擇。舊的內附 Google 模組已移除。
- **[UV 工具](UV-Tools)** - 全新的面板，含有 *Align UV Edges to Target* 與 *Find Shortest Seam Path*。
- **[骨骼工具](Bone-Tools)** - 趾行腿與扭轉骨骼產生現在有了自己的家。
- **glTF / GLB 匯入** 與統一的 Rigify 偵測。
- 支援 **Blender 5.1 與 5.2**（建議使用 5.2 LTS）。

## 主要功能

- **模型匯入／匯出** - MMD、XNALara、Source、VRM、glTF/GLB、FBX、DAE 等
- **Fix MMD Model** - 一鍵將全新的 MMD／VRM 匯入模型轉換為可供 Unity／VRChat 使用
- **最佳化** - 材質合併、貼圖圖集製作（內建，不需額外外掛）、骨骼合併、移除重複頂點
- **轉換器** - Rigify → Cats、Source／Valve、VRM 修正、MMD 清理
- **合併與附加** - 結合骨架並附加網格
- **翻譯** - 優先使用內部字典，並可選擇線上服務來補足缺漏
- **眼動追蹤與視素** - 為 VRChat 虛擬角色自動設定
- **UV 與骨骼工具** - 針對性的網格／骨架輔助工具

## 社群與支援

- **原始碼與發行版：** [GitHub](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial)

> 我們已經不再經營 Discord 伺服器或網站。所有支援、錯誤回報與討論都在上述 Git 儲存庫進行。

## 貢獻

我們歡迎貢獻！如果你想協助改善 Cats，歡迎在上述[儲存庫](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial)開一個 pull request。

---

