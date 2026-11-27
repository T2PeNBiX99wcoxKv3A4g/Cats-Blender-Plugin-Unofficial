# 縮放 {#scaling}

縮放面板會為 VRChat 等 VR 平台重新縮放虛擬角色的比例與身高。它內建於 Cats，因此不需要額外安裝任何東西。

> 📝 **取代 Immersive Scaler。** 較早版本的 Cats 需要另外安裝 Immersive Scaler 外掛。外部的 Immersive Scaler 已不再維護，因此 Cats 現在內建以它為基礎的縮放工具。工具、設定與結果都與 Immersive Scaler 相同。如果你仍安裝著 Immersive Scaler，可以將它移除：Cats 已不再使用它。

## 概觀 {#overview}

正確的虛擬角色縮放對 VR 體驗至關重要：
- 確保在 VR 中觀看舒適
- 維持相對於世界的正確比例
- 符合平台的身高建議
- 在 VR 中提供更好的社交互動

有別於單純調整模型大小，此縮放工具調整的是**比例**：它把需要的變化量分攤到手臂與腿之間、控制肢體粗細、把虛擬角色移到地板上，然後縮放到你的目標身高。骨架與網格會一起改變，包含形態鍵。

## 需求 {#requirements}

- 在 Cats 的骨架下拉選單中選取的人形骨架（或設為作用中的物件）
- 可辨識的肩膀、手臂、手肘、手腕、腿、膝蓋、腳踝與眼睛骨骼。常見的命名方式（VRChat／Unity、**Fix Model** 後的 MMD、`Left arm`、`UpperArm.L`、`Thigh_R` 等）會自動偵測。若找不到某根骨骼，請用[骨骼覆寫](#bone-overrides)手動設定。

若找不到骨架，按鈕會呈現灰色，將滑鼠停留在上面會說明原因。

---

## 虛擬角色重新縮放 {#avatar-rescale}

主要區塊。設定數值後，點擊 **Rescale Armature**。

| 設定 | 預設值 | 作用 |
|---|---|---|
| **Target Height** | 1.61 m | 縮放後最高頂點的高度。開啟 **Scale to Eyes** 時，這會改為眼睛高度。 |
| **Leg/Arm Scaling** | 55% | 比例變化中有多少由腿承擔。其餘由手臂承擔。 |
| **Custom Arm Ratio** | 0.4537 | 要縮放到的臂高比例，等同於 VRChat 的 `--custom-arm-ratio` 啟動選項。數值越高表示手臂越長。0.4537 是 VRChat 的預設值。 |
| **Center Model** | Off | 將模型移到 X／Y = 0。 |

數值旁的小箭頭按鈕會**從目前的虛擬角色讀取該值**：
- **Target Height** 旁：將目標設為虛擬角色的目前身高
- **Custom Arm Ratio** 旁：從虛擬角色的目前比例設定該比例
- **Upper Body Percentage**／**Upper Leg Percent** 旁：讀取目前的百分比

這在你想保持某個數值不變、只改變其他數值時很方便。

### 自訂 {#customization}

展開 **Customization** 以進行更細部的控制：

| 設定 | 預設值 | 作用 |
|---|---|---|
| **Arm Thickness** | 50% | 手臂被拉長或縮短時，保留或增加多少手臂粗細。 |
| **Leg Thickness** | 50% | 腿部同上。 |
| **Upper Leg Percent** | 53% | 從髖部到腳跟的距離中有多少屬於大腿。 |
| **Extra Leg Length** | 0 m | 腿應該伸到真實地板下方多遠，也就是 VRChat 的地板應該位在你真實地板下方多遠。 |
| **Scale to Eyes** | Off | 讓 **Target Height** 變成眼睛高度，而非頭頂高度。 |
| **Show bone mapping** | Off | 顯示[骨骼覆寫](#bone-overrides)區塊。 |

### 核心功能切換 {#core-functionality-toggle}

展開 **Core functionality toggle** 可關閉個別步驟。主要用於疑難排解：

- **Skip Main Rescale**：略過比例調整
- **Skip move to floor**：不要將虛擬角色移到地板上
- **Skip Height Scaling**：不要執行最後縮放到目標身高的步驟
- **Scale by Relative Proportions**：以 **Upper Body Percentage** 縮放軀幹，而不是使用 **Leg/Arm Scaling**。對 VRChat 鎖定上半身的模式效果更好。
- **Keep Head Size**：改為縮放軀幹，盡量讓頭部保持相同大小

---

## 手指張開 {#finger-spreading}

旋轉手指骨骼使它們從手腕向外張開，搭配 VRChat 的手指追蹤與手勢時能讓手看起來更好。

展開 **Customization** 可設定：
- **Ignore thumb** *（預設開啟）*：不動作拇指
- **Spread Factor** *（預設 1）*：旋轉的幅度。1 會讓每根手指筆直背離手腕。

點擊 **Spread Fingers** 以套用。

---

## 髖部修正（beta） {#hip-fix-beta}

**Shrink Hip bone** 會把髖部骨骼移得離脊椎近得多。有些模型的髖部骨骼非常長，在全身追蹤時會嚴重彎折。這是 beta 功能，匯出前請檢查結果。

---

## 骨骼覆寫 {#bone-overrides}

當在自訂中勾選 **Show bone mapping** 時顯示。每一列是縮放工具會使用的一根骨骼：雙側的肩膀、手臂、手肘、手腕、腿、膝蓋、腳踝、腳趾與眼睛，以及頸部、頭部、髖部、脊椎、胸部與上胸部，再加上每根手指骨骼（供[手指張開](#finger-spreading)使用）。點擊某一列上的按鈕，即可從可搜尋的清單中挑選對應的骨骼。

只有在骨骼未被自動偵測到、或挑到錯誤的骨骼時才使用覆寫。其餘請保持預設。

---

## 比例比對 {#scale-matching}

僅在場景中有**超過一個骨架**時顯示。它會將一個骨架的比例縮放成與另一個相符，例如讓服裝骨架與身體相符：

1. 選擇**參考骨架**（要比對的對象）
2. 選擇**縮放骨架**（要改變的對象）
3. 點擊 **Match Scale**

---

## 基本工作流程 {#basic-workflow}

1. 使用[快速存取](./Quick-Access.md)**匯入你的模型**
2. 若為 MMD／VRM 模型則**修復模型**
3. 開啟**縮放**面板
4. 設定 **Target Height**（或點擊箭頭以保持目前身高）
5. 點擊 **Rescale Armature**
6. 視需要**張開手指**
7. 檢查結果，然後匯出

每個縮放按鈕都可以用 **Ctrl+Z** 復原。

---

## 最佳實務 {#best-practices}

### 建議的虛擬角色身高 {#recommended-avatar-heights}

**適用於 VRChat：**

| 身高範圍 | 說明 | 使用情境 |
|-------------|-------------|----------|
| 165cm (5'5") | 理想平均值 | 最通用，對所有人都舒適 |
| 160-170cm | 舒適範圍 | 適合大多數虛擬角色 |
| 150-160cm | 較矮的虛擬角色 | 可愛角色、孩童 |
| 170-180cm | 較高的虛擬角色 | 高挑角色、戰士 |
| 140-150cm | 非常矮 | 迷你角色、小型生物 |
| 180-200cm | 非常高 | 巨人、怪物（請斟酌使用） |

**一般原則：**
- 太矮：難以與世界中的物件互動
- 太高：可能穿過天花板，看起來有壓迫感
- 平均：社交互動最舒適
- 請考量你的虛擬角色類型與使用情境

### 何時該縮放 {#when-to-scale}

**在下列事項之前縮放：**
- 設定眼動追蹤
- 設定視素
- 建立形態鍵
- 最終最佳化
- 匯出

**在下列事項之後縮放：**
- 匯入模型
- 修復 MMD 模型
- 基本網格清理

### 測試縮放 {#testing-scale}

**在 VRChat 中：**
- 在定案前先於遊戲中測試
- 詢問其他人你看起來如何
- 檢查鏡中影像
- 測試與世界物件的互動

---

## 常見縮放問題 {#common-scale-issues}

### 按鈕呈現灰色 {#buttons-are-greyed-out}

找不到骨架。請在 Cats 的骨架下拉選單中選取虛擬角色的骨架，或在視埠中點擊它使其成為作用中的物件。

### 回報某根骨骼遺失，或結果看起來扭曲 {#a-bone-is-reported-missing-or-the-result-looks-twisted}

縮放工具找不到某根骨骼，或挑到了錯誤的骨骼。請在自訂中勾選 **Show bone mapping**，並在[骨骼覆寫](#bone-overrides)中設定該骨骼。

### 虛擬角色在 VRChat 中大小不對 {#avatar-appears-wrong-size-in-vrchat}

**可能原因：**
- 在 Blender 中縮放錯誤
- 匯出設定錯誤
- Unity 匯入縮放問題

**解決方式：**
- 點擊 **Target Height** 旁的箭頭讀取虛擬角色的目前身高並檢查
- 在 Cats 中使用正確的匯出設定
- 檢查 Unity 的匯入縮放（FBX 應為 1.0）

### 縮放後比例看起來不對 {#proportions-look-wrong-after-scaling}

**可能原因：**
- 在使用縮放工具前已手動調整過模型大小
- 偵測到錯誤的骨骼
- 設定過於極端

**解決方式：**
- 復原，然後將 **Leg/Arm Scaling** 與粗細數值調回接近預設值再試一次
- 檢查[骨骼覆寫](#bone-overrides)
- 使用**核心功能切換**一次執行一個步驟，找出是哪一個造成問題

---

## 整合注意事項 {#integration-notes}

### 與最佳化的搭配 {#with-optimization}

在最佳化之前或之後縮放皆可：
- 不會顯著影響[最佳化](./Optimization.md)工具
- 骨骼合併在任何縮放下都能運作
- 圖集建立在任何縮放下都能運作

### 與匯出的搭配 {#with-export}

使用[快速存取](./Quick-Access.md)匯出：
- Cats 會正確處理縮放
- FBX 匯出會維持縮放
- 不需要額外設定

---

**相關頁面：**
- [快速存取](./Quick-Access.md) - 匯入／匯出
- [合併與附加](./Merge-and-Attach.md) - 合併模型
- [疑難排解](./Troubleshooting.md) - 縮放問題

**外部資源：**
- [VRChat Avatar Scaling Guidelines](https://docs.vrchat.com/docs/avatar-scaling)
- [Immersive Scaler](https://github.com/triazo/immersive_scaler) - Cats 縮放工具所依據的原始外掛

---

