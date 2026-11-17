# 快速存取

**快速存取**（Quick Access）面板是最上方的面板，也是你的起點。它彙整了最常用的動作：快速網格操作、匯入／匯出、**Fix MMD Model** 與姿態模式。

## 面板版面（由上到下）

1. **更新／版本通知**（僅在相關時顯示）
2. **快速動作**  合併材質、合併所有網格
3. **匯入／匯出**
4. **骨架選擇器**（當你有一個以上的骨架時顯示）
5. **Fix MMD Model**（+ 設定齒輪）
6. **姿態模式**

---

## 快速動作

快速的單鍵操作，保持在頂端：

- **Combine Materials** - 合併屬性相符的材質以減少繪製呼叫。
- **Join All Meshes** - 將所有網格結合成單一物件（保留材質、頂點組與權重）。

> ⚠ Join All Meshes 是永久性的，請先儲存。

---

## 匯入模型

以適合 VRChat 工作流程的合理設定匯入模型。

### 支援的格式

- **MMD：** `.pmx`、`.pmd`
- **XNALara：** `.xps`、`.mesh`、`.ascii`
- **Source Engine：** `.smd`、`.qc`、`.vta`、`.dmx`
- **VRM：** `.vrm`
- **glTF / GLB：** `.gltf`、`.glb`
- **FBX：** `.fbx`
- **DAE：** `.dae`（Collada）
- **ZIP：** `.zip`（壓縮的模型包）

> 其他格式或許也能用，但以上是我們完整支援的格式。

**匯入方式：** 點擊 **Import Model**、選擇你的檔案，然後匯入。Cats 會自動套用最佳設定。

---

## 匯出模型

- **FBX for Unity** - 以適合 Unity／VRChat 的縮放、旋轉與骨架設定匯出。
- **Resonite (glTF)** - 為 Resonite 匯出 glTF 2.0。

**匯出方式：** 點擊對應的匯出按鈕、選擇位置，然後儲存。

---

## Fix MMD Model

**Fix MMD Model** 按鈕（旁邊有 **⚙ 設定齒輪**）位於這裡的頂端以便於尋找。它會將**全新的** MMD／VRM 匯入模型轉換為可供 Unity／VRChat 使用的骨架。

> ⚠ **僅適用於剛匯入的 MMD／VRM 模型。** 請**不要**對已針對 Unity／VRChat 設定完成的模型、商店購買的模型，或你自製的模型執行它。面板中按鈕正上方也會顯示相同的警告。

> 🚫 **忽略這些警告請自行承擔風險。** 如果你在全新 MMD／VRM 匯入模型以外的任何東西上執行 Fix MMD Model，在 Cats 與本 wiki 已經給你這麼多警告之後，那完全是你自己的責任。**不要為此開 issue**，你會被直接帶回這些警告，而且它會立刻被關閉。

完整細節，包括該按鈕所做的一切以及齒輪背後的設定，都在[轉換器](Converters)頁面（Fix MMD Model 也出現在該頁的 MMD 清理一節）。

---

## 姿態模式

進入姿態模式以操作你的骨架。

- **Start Pose Mode** - 進入姿態模式（小按鈕會啟動而*不會*重設目前的姿態）。
- 在姿態模式中時：
  - **Stop Pose Mode** - （小按鈕會停止而不重設）
  - **Pose to Shape Key** - 將目前的姿態烘焙成新的形態鍵（非常適合自訂表情）
  - **Apply as Rest Pose** - 將目前的姿態設為骨架的靜止姿態

> ⚠ Apply as Rest Pose 會永久變更靜止姿態，請先儲存。

---

## 典型工作流程

1. **匯入**你的模型。
2. 若它是全新的 MMD／VRM 匯入模型，執行 **Fix MMD Model**。
3. **翻譯**名稱（[翻譯](Translation)）。
4. 最佳化（[最佳化](Optimization)）、設定[眼動追蹤](Eye-Tracking)與[視素](Visemes)。
5. 為你的目標平台**匯出**。

---

**相關頁面：**
- [轉換器](Converters) - Fix MMD Model 詳細說明、Rigify／Valve／VRM 轉換
- [最佳化](Optimization) - 減少材質、骨骼與頂點
- [合併與附加](Merge-and-Attach) - 合併模型
- [設定](Settings) - 匯出與模型修復行為

---

