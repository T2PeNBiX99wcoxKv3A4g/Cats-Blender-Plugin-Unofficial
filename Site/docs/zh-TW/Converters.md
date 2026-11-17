# 轉換器

**轉換器**（Converters）面板（舊稱「MMD 選項」）是各種工具的所在，可用來把模型從一種骨架／格式轉換成另一種，以及進行 MMD 專屬的清理。你就是在這裡把剛匯入的模型準備好以供 Unity／VRChat 使用。

它包含三個區域：

1. **Rigify 轉換** - 將 Rigify／Metarig 骨架轉換為 Cats 相容的骨架
2. **平台轉換** - Source／Valve 骨骼名稱與 Koikatsu 形態鍵修正
3. **MMD 清理** - 修復 MMD 模型，以及移除剛體／關節

---

## Rigify → Cats

**Convert Rigify to Cats** 按鈕隨時可見，但**在啟用 Rigify 或 Metarig 骨架之前會呈現灰色**。當 Cats 偵測到這類骨架時，會出現一個資訊方塊，按鈕也隨之可用。

Fix MMD Model 無法直接處理 Rigify 骨架，所以請先轉換，再繼續你平常的工作流程。

**選項：**
- **Merge Twist Bones** - 在轉換時將 Rigify 的扭轉骨骼併入其父骨骼。

**使用方式：**
1. 選取你的 Rigify／Metarig 骨架。
2. 當按鈕亮起時，點擊 **Convert Rigify to Cats**。
3. 繼續你其餘的工作流程。

---

## 平台轉換

### 轉換骨骼為 Valve

將骨架的主要骨骼重新命名為 Source 引擎（Source Filmmaker、GMod 等）所使用的 **ValveBiped** 慣例，例如 `hips` 會變成 `ValveBiped.Bip01_Pelvis`。手指骨骼也會一併重新命名，因為 GMod 轉換腳本需要它們。

這只會重新命名骨骼，不會改變階層或靜止姿態。

**需求：** 你的模型必須先具備 CATS 標準骨骼名稱，因此請在此步驟之前執行 **Fix MMD Model**。

**使用時機：** 匯出到 Source Engine／Valve 系列遊戲時。

> ⚠ **如果你是用較舊的 Cats 進行轉換，請檢查右側骨骼。**
>
> 較舊的版本會把七個短格式的右側名稱對應到**左**側，因此名為 `R_Shoulder`、`R_Arm`、`R_Elbow`、`R_Wrist`、`R_Leg`、`R_Knee` 或 `R_Ankle` 的骨骼會變成 `ValveBiped.Bip01_L_*`。使用完整拼寫 CATS 名稱（`Right shoulder`、`Right arm`……）的模型從未受到影響。
>
> 請在模型的**全新副本**上重新執行轉換器來修正。它無法修復你已經匯出的 FBX，而在一個已經命名錯誤的骨架上重新執行也沒有幫助，因為 ValveBiped 名稱已經對不上它要找的任何東西了。

### 修正 Koikatsu 形態鍵

清理 **Koikatsu／Illusion** 匯出所產生的拆分形態鍵。Koikatsu 會把一個表情分散到數個鍵上（`eye_face.fXX` 加上 `eye_siroL`／`eye_line_u`，以及 `kuti_face.fXX` 加上 `kuti_ha`／`kuti_sita`），使得它們單獨使用時毫無用處。

此工具會把每個相符的群組合併成單一的 `eyes_XX` 或 `mouth_XX` 形態鍵，將滑桿上限設在合理的最大值，並移除它所消耗的原始項。

**使用時機：** 在剛匯入的 Koikatsu 模型上，設定[視素](Visemes)之前。

---

## MMD 清理

### 修復 MMD 模型

這是把全新的 MMD／VRM 模型轉換成可供 Unity／VRChat 使用的骨架的主要工具。

> ⚠ **警告：Fix MMD Model 僅適用於尚未針對 Unity 設定過的全新 MMD／VRM 匯入模型。**
>
> **下列情況請勿使用：**
> - 你的模型購自 Booth、Gumroad 或類似的商店
> - 你的模型已經針對 Unity／VRChat 設定完成
> - 你正在從零開始建立自己的自訂模型
>
> Fix Model 從來就不是一個「修復任何東西」的按鈕，它是針對特定匯入格式的轉換器。在[快速存取](Quick-Access)（該按鈕的另一個所在處）也會顯示相同的警告。

> 🚫 **忽略這些警告請自行承擔風險。** 如果你在全新 MMD／VRM 匯入模型以外的任何東西上執行 Fix MMD Model，在 Cats 與本 wiki 已經給你這麼多警告之後，那完全是你自己的責任。**不要為此開 issue**，你會被直接帶回這些警告，而且它會立刻被關閉。

> 💡 按鈕旁的 **⚙ 設定齒輪** 會開啟 **模型設定**（保留末端骨骼、保留扭轉骨骼、合併網格、連接骨骼、移除零權重、受保護骨骼等）。詳情請見[設定](Settings)。

#### 它會做什麼

1. **重新設定骨骼父系** - 為 Unity 重新組織階層
2. **移除不必要的骨骼** - 剝除 MMD 專屬／未使用的骨骼
3. **重新命名與翻譯** - 日文 → 英文、標準化名稱（[翻譯](Translation)）。自 `5.2.4.0` 起，形態鍵與材質可以使用 PMX 檔案中**作者的英文名稱**；形態鍵的設定位於 ⚙ 模型設定
4. **合併權重繪製** - 重新分配頂點權重
5. **旋轉髖部** - 為 Unity 修正髖部旋轉
6. **移除約束** - 清除 MMD 專屬的約束／IK
7. **刪除未使用的頂點組** - 清理空的權重群組
8. **將變形轉換為形態鍵**

#### 使用方式

1. 透過[快速存取](Quick-Access)匯入全新的 MMD 或 VRM 模型。
2. 選取骨架。
3. 點擊 **Fix MMD Model**（位於轉換器或快速存取中）。
4. 等待它完成（複雜的模型可能需要一分鐘）。
5. 檢視結果。

### 移除剛體與關節

移除 MMD 物理元件（剛體 + 關節約束）。VRChat 使用的是 Unity 的物理系統，因此 MMD 物理並不相容，應該移除。

**使用方式：** 選取你的模型並點擊 **Remove Rigid Bodies and Joints**。

**它會比對什麼：** 模型底下任何名稱包含 `rigidbodies` 或 `joints` 的物件，不論大小寫——`Rigidbodies`、`RIGIDBODIES` 與 `rigidbodies` 都會被捕捉到。比對範圍涵蓋模型最上層父系底下的一到兩層，而刪除一個相符項會連同整個子樹一起刪除，所以巢狀的物理群組可以一次處理完。

> 💡 **這與全域設定不同，而且你仍然需要它。**[設定](Settings)中的 **Remove Rigidbodies + Joints** 預設為開啟，並在你按下任何 Cats 按鈕時執行，但它刪除的是整個名為 `rigidbody` 的*集合*——它不會看關節，也不會看散落的物件。此按鈕作用於父系在模型底下的*物件*，而且確實會捕捉到關節。在 MMD 匯入模型上請繼續使用它。

---

## 典型的 MMD → VRChat 工作流程

1. 透過[快速存取](Quick-Access)**匯入**你的 `.pmx`／`.pmd`／`.vrm`。
2. **修復 MMD 模型**（轉換器或快速存取）。
3. **移除剛體與關節**。
4. **合併材質**與其他清理（[最佳化](Optimization)）。
5. **最佳化** - 圖集、骨骼合併、移除重複頂點。
6. 設定[眼動追蹤](Eye-Tracking)與[視素](Visemes)。
7. 透過[快速存取](Quick-Access)**匯出**給 Unity 使用的 FBX，並在 Unity 中設定材質。

---

## 常見問題

**修復 MMD 模型後模型看起來壞掉了** 它可能本來就已經是 Unity 可用的狀態了。復原（Ctrl+Z）、重新匯入原始檔案，並且不要再對它執行 Fix MMD Model。

**骨骼名稱很奇怪／是英文的** 這是預期中的行為；名稱會被翻譯並標準化以供 VRChat 使用。

**有些材質是黑色的** 通常沒問題；請在 Unity 中設定材質。你也可以試試[最佳化](Optimization)中的 **Convert All to PNG**。

**模型在 Blender 中看起來被旋轉了** Blender 與 Unity 使用不同的座標系統；匯出時會處理這件事，在 Unity 中會是正確的。

---

## VRM 注意事項

VRM 模型通常需要與 MMD 模型相同的處理：
- 對全新的 VRM 檔案（VRoid 匯出等）執行 **Fix MMD Model**
- 不要對已經處理過的 VRM 模型執行 Fix MMD Model

沒有 VRM 專屬的形態鍵工具。**Fix Koikatsu Shapekeys** 僅適用於 Koikatsu 匯出，請參見上方的說明。

Cats 可與 **VRM Add-on for Blender** 搭配使用——用它匯入 `.vrm`，然後用 Cats 來處理與最佳化。

---

**相關頁面：**
- [快速存取](Quick-Access) - 匯入／匯出，以及另一個 Fix MMD Model 按鈕
- [最佳化](Optimization) - 轉換後的最佳化
- [翻譯](Translation) - 名稱翻譯
- [視素](Visemes) ／ [眼動追蹤](Eye-Tracking) - 虛擬角色功能設定

---

