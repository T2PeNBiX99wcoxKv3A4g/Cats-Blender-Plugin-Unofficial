# 转换器 {#converters}

**转换器**（Converters）面板（原「MMD 选项」）收录了把模型从一种绑定/格式转换为另一种的工具，以及 MMD 专用的清理功能。你在这里为刚导入的模型做好 Unity/VRChat 的准备工作。

它包含三个区域：

1. **Rigify 转换** - 把 Rigify/Metarig 骨架转换为 Cats 兼容的骨架
2. **平台转换** - Source/Valve 骨骼名称与 Koikatsu 形态键修复
3. **MMD 清理** - 修复 MMD 模型以及移除刚体/关节

---

## Rigify → Cats {#rigify-→-cats}

**将 Rigify 转换为 Cats** 按钮始终可见，但在**激活的骨架是 Rigify 或 Metarig 之前会保持灰色不可用**。当 Cats 检测到这类骨架时，会出现一个信息框，按钮也随之可用。

修复 MMD 模型无法直接处理 Rigify 绑定，所以请先转换它，然后继续你正常的工作流程。

**选项：**
- **合并扭转骨骼** - 在转换过程中把 Rigify 的扭转骨骼并入其父级骨骼。

**如何使用：**
1. 选中你的 Rigify/Metarig 骨架。
2. 按钮亮起后，点击 **将 Rigify 转换为 Cats**。
3. 继续你工作流程的其余部分。

---

## 平台转换 {#platform-conversion}

### 将骨骼转换为 Valve {#convert-bones-to-valve}

把骨架的主要骨骼重命名为 Source 引擎（Source Filmmaker、GMod 等）使用的 **ValveBiped** 命名规范，例如 `hips` 会变成 `ValveBiped.Bip01_Pelvis`。手指骨骼也会被重命名，因为 GMod 转换脚本需要它们。

这个操作只重命名骨骼，不会改变层级或静置姿态。

**要求：** 你的模型需要先使用 CATS 标准骨骼名称，所以请在此之前运行**修复 MMD 模型**。

**何时使用：** 导出到 Source Engine / Valve 游戏时。

> ⚠ **如果你用较旧的 Cats 做过转换，请检查右侧骨骼。**
>
> 旧版本把七个简写形式的右侧名称映射到了**左侧**，因此名为 `R_Shoulder`、`R_Arm`、`R_Elbow`、`R_Wrist`、`R_Leg`、`R_Knee` 或 `R_Ankle` 的骨骼会输出成 `ValveBiped.Bip01_L_*`。使用完整拼写的 CATS 名称（`Right shoulder`、`Right arm` 等）的模型从未受影响。
>
> 请对模型的**全新副本**重新运行转换器来修复它。它无法修复你已经导出的 FBX，对已经命名错误的骨架重新运行也没有用，因为 ValveBiped 名称已不再匹配它查找的任何内容。

### 修复 Koikatsu 形态键 {#fix-koikatsu-shapekeys}

清理 **Koikatsu / Illusion** 导出时产生的拆分形态键。Koikatsu 会把一个表情分散到多个形态键上（`eye_face.fXX` 加上 `eye_siroL`/`eye_line_u`，以及 `kuti_face.fXX` 加上 `kuti_ha`/`kuti_sita`），这使它们单独使用时无法使用。

该工具会把每个匹配的组并成一个 `eyes_XX` 或 `mouth_XX` 形态键，把滑块上限限制在合理的最大值，并删除被合并的原始形态键。

**何时使用：** 在刚导入的 Koikatsu 模型上，设置[口型同步](./Visemes.md)之前。

---

## MMD 清理 {#mmd-cleanup}

### 修复 MMD 模型 {#fix-mmd-model}

这是把全新的 MMD/VRM 模型转换为 Unity/VRChat 可用绑定的主要工具。

> ⚠ **警告：修复 MMD 模型仅适用于尚未为 Unity 做过设置的、刚导入的 MMD / VRM 模型。**
>
> **在以下情况下不要使用它：**
> - 你的模型购自 Booth、Gumroad 或类似商店
> - 你的模型已经为 Unity/VRChat 设置好
> - 你正在从零开始制作自己的自定义模型
>
> 修复模型从来都不是「修复一切」按钮，它是针对特定导入格式的转换器。[快速访问](./Quick-Access.md)中也会显示相同的警告，该按钮也位于那里。

> 🚫 **无视这些警告，后果自负。** 如果在 Cats 和本 wiki 给出所有这些警告之后，你仍然对非刚导入的 MMD/VRM 模型运行修复 MMD 模型，那完全是你自己的责任。**不要为此提交 issue**，你只会被直接指回这些警告，并且 issue 会被立即关闭。

> 💡 按钮旁的 **⚙ 设置齿轮**会打开**模型设置**（保留末端骨骼、保留扭转骨骼、合并网格、连接骨骼、移除零权重、保护骨骼等）。详情见[设置](./Settings.md)。

#### 它会做什么 {#what-it-does}

1. **重新设置骨骼父级** - 为 Unity 重新组织层级
2. **移除不必要的骨骼** - 剔除 MMD 专用/未使用的骨骼
3. **重命名与翻译** - 日语 → 英语，名称标准化（[翻译](./Translation.md)）。自 `5.2.4.0` 起，形态键和材质可以使用 PMX 文件中**作者提供的英文名称**；形态键的相关设置位于 ⚙ 模型设置
4. **合并权重绘制** - 重新分配顶点权重
5. **旋转髋部** - 为 Unity 修正髋部旋转
6. **移除约束** - 清除 MMD 专用的约束/IK
7. **删除未使用的顶点组** - 清理空的权重组
8. **将变形转换为形态键**

#### 如何使用 {#how-to-use}

1. 通过[快速访问](./Quick-Access.md)导入全新的 MMD 或 VRM 模型。
2. 选中骨架。
3. 点击 **修复 MMD 模型**（在转换器或快速访问中）。
4. 等待完成（复杂模型可能需要一分钟）。
5. 检查结果。

### 移除刚体与关节 {#remove-rigid-bodies-and-joints}

移除 MMD 物理组件（刚体 + 关节约束）。VRChat 使用 Unity 的物理系统，因此 MMD 物理不兼容，应当移除。

**如何使用：** 选中你的模型，点击 **移除刚体与关节**。

**它匹配什么：** 模型下任何名称包含 `rigidbodies` 或 `joints` 的对象，不区分大小写 —— `Rigidbodies`、`RIGIDBODIES` 和 `rigidbodies` 都会被捕获。匹配范围是模型顶层父级往下的一级和两级，删除一个匹配项会连同其整个子树一起删除，因此嵌套的物理组可以一次清除。

> 💡 **这与全局设置不同，你仍然需要它。**[设置](./Settings.md)中的**移除刚体 + 关节**默认开启，每次按下 Cats 按钮时都会运行，但它删除的是名为 `rigidbody` 的整个*集合* —— 它既不看关节，也不看游离对象。这个按钮作用于父级在你的模型下的*对象*，并且确实会捕获关节。导入 MMD 时请继续使用它。

---

## 典型的 MMD → VRChat 工作流程 {#typical-mmd-→-vrchat-workflow}

1. 通过[快速访问](./Quick-Access.md)**导入**你的 `.pmx`/`.pmd`/`.vrm`。
2. **修复 MMD 模型**（转换器或快速访问）。
3. **移除刚体与关节**。
4. **合并材质**以及其他清理（[优化](./Optimization.md)）。
5. **优化** - 图集、骨骼合并、移除重合顶点。
6. 设置[眼动追踪](./Eye-Tracking.md)和[口型同步](./Visemes.md)。
7. 通过[快速访问](./Quick-Access.md)**导出**供 Unity 使用的 FBX，并在 Unity 中设置材质。

---

## 常见问题 {#common-issues}

**修复 MMD 模型后模型看起来坏了** 它很可能本来就是 Unity 可用的。撤销（Ctrl+Z），重新导入原始文件，不要对它运行修复 MMD 模型。

**骨骼名称奇怪/是英文** 这是正常的；名称会为 VRChat 做翻译和标准化。

**部分材质是黑色的** 通常没问题；在 Unity 中设置材质。你也可以试试[优化](./Optimization.md)中的**全部转换为 PNG**。

**模型在 Blender 中看起来被旋转了** Blender 和 Unity 使用不同的坐标系；导出时会处理这一点，在 Unity 中会是正确的。

---

## VRM 说明 {#vrm-notes}

VRM 模型通常需要与 MMD 模型相同的处理：
- 对全新的 VRM 文件（VRoid 导出等）运行**修复 MMD 模型**
- 不要对已处理过的 VRM 模型运行修复 MMD 模型

没有 VRM 专用的形态键工具。**修复 Koikatsu 形态键**仅适用于 Koikatsu 导出，见上面的说明。

Cats 可与 **VRM Add-on for Blender** 配合使用 —— 用它导入 `.vrm`，然后用 Cats 进行处理和优化。

---

**相关页面：**
- [快速访问](./Quick-Access.md) - 导入/导出，以及另一个修复 MMD 模型按钮
- [优化](./Optimization.md) - 转换后的优化
- [翻译](./Translation.md) - 名称翻译
- [口型同步](./Visemes.md) / [眼动追踪](./Eye-Tracking.md) - 虚拟形象功能设置

---
