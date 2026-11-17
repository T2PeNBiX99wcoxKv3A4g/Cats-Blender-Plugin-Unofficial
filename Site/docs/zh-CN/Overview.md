> ℹ **这些页面记录的是 Cats Blender Plugin 的功能集。** 它们是为本分支所延续的上游发行版编写的；本构建支持 Blender 4.2 LTS 至 5.4。
>

# Cats Blender Plugin - Wiki

欢迎查阅 **Cats Blender Plugin** 的文档，它作为一个非官方的社区延续版本进行维护。

Cats 是一个旨在缩短为 VRChat 及其他平台导入和优化模型所需步骤的工具。它支持多种格式，包括 MMD、XNALara、Mixamo、Source Engine、VRM、glTF/GLB、FBX、DAE 等。

## 版本支持

| | |
|---|---|
| **支持的 Blender** | **4.2 LTS** 至 **5.4** |
| **推荐** | **Blender 5.2 LTS** |


## 快速链接

### 入门
- [安装](Installation) - 如何安装 Cats 及其可选插件
- [版本支持](Version-Support) - 受支持与已停止维护的版本

### 界面指南
- [快速访问](Quick-Access) - 导入/导出、**修复 MMD 模型**、快捷操作和姿态模式
- [优化](Optimization) - 材质、网格清理、形态键、骨骼与权重，以及内置的图集生成器（alpha）
- [转换器](Converters) - Rigify、Source/Valve、VRM 和 MMD 清理（原「MMD 选项」）
- [合并与附加](Merge-and-Attach) - 合并骨架和附加网格（原「自定义模型创建」）
- [翻译](Translation) - 全新的多服务翻译系统
- [骨骼工具](Bone-Tools) - 趾行腿和扭转骨骼
- [UV 工具](UV-Tools) - 对齐 UV 边并查找最短缝合线路径
- [口型同步](Visemes) - 唇形同步设置
- [眼动追踪](Eye-Tracking) - 眼球运动与眨眼设置
- [骨骼父级](Bone-Parenting) - 根骨骼管理
- [缩放](Scaling) - 内置的虚拟形象重缩放、手指张开和缩放匹配
- [设置](Settings) - 插件配置与更新

### 帮助与支持
- [疑难解答](Troubleshooting) - 常见问题与解决方案
- [常见问题](FAQ) - 常见问题解答

## 5.3.1.0 的新内容

- **Blender 4.2 LTS 及更新版本** - 支持 4.2 LTS 至 5.4。见[版本支持](Version-Support)。
- **移除 Material Combiner** - *图集生成器（传统版）* 面板已删除。内置工具现在直接叫**[图集生成器](Optimization#atlas-generator)**；如果安装了 Material Combiner，**导入 Material Combiner 设置**仍可把你的旧设置复制过来。
- **图集修复** - 每次构建都获得自己的名称，因此为第二个虚拟形象做图集不再覆盖第一个的图集（保存到文件夹也永远不会覆盖已有的 PNG）。纯色和带色调的材质现在能输出正确的颜色，而不是过暗。关联副本网格不再被重映射两次，多个对象共享的烘焙材质会保留每个对象的面，烘焙始终针对图像贴图（绝不针对你的顶点色），保存到文件夹失败时会把图集打包进 .blend 而不是丢失它。大型构建占用内存大幅减少，缩小后的贴图锯齿也更少。
- **API 密钥不再进入你的 .blend 文件** - DeepL / LibreTranslate 密钥、LibreTranslate URL 和 MyMemory 邮箱只保存在 Cats 自己的设置文件中，保存到旧文件中的密钥会在文件打开时被移除。见[翻译](Translation)。
- **语言更改只重载 Cats**，而不是每个插件；损坏或下载了一半的翻译文件不再阻止 Cats 加载；它会回退到随附的文件或英文文件。
- **Cats 加载时不再更改你的 Blender 偏好设置**，并且每次你打开 .blend 时都会重新应用你的 Cats 设置。
- **跨 Blender 版本的更新** - 更新器现在会列出每个发行版，而不只是为你的 Blender 版本制作的发行版；Blender 自身会阻止任何你的版本无法运行的内容。
- **修复** - Blender 5.x 上的 VMD 动作导入、缩放器工具在 F9 重做时崩溃、在一次会话中多次运行移除重合顶点会破坏形态键，以及重新加载后部分面板和操作符缺失的问题。
- **支持我们**按钮已从致谢面板中移除。

## 5.2.4.0 的新内容

- **内置图集工具（alpha）** - 新的**[图集生成器（新）](Optimization#atlas-generator)**子面板，无需 Material Combiner 或 Pillow 即可进行图集化。从同一布局生成反照率以及可选的法向、自发光、粗糙度、金属度、AO 和高度贴图，通过边缘外扩为格子添加边距，使 mip 层级不会渗色，并且可以用 Cycles 烘焙程序化材质。**Material Combiner 目前仍是默认选项**，并将在 Blender 5.3 发行版中移除。
- **MMD 作者英文名** - 翻译时现在会使用模型作者存储在 PMX 文件中的英文名称。形态键的顺序为 词典 → 作者名 → 在线服务，由[翻译](Translation#author-names-mmd)中新增的**作者名称**设置控制（**填补空缺** / **优先作者名称** / **关闭**），修复 MMD 模型与之对应；材质默认使用它们，可切换。骨骼和对象不变。修复 MMD 模型会在删除 MMD 根对象之前保留这些名称，翻译 CSV 导出新增了*来源*列。经过少量测试，欢迎反馈。
- **捆绑 MMD Tools 4.5.14**。
- 许可证文本通篇更正为 MIT。

## 5.2.3.0 的新内容

- **重新组织的界面** - 面板经过重构，让工具位于你预期的位置。**修复 MMD 模型**现在位于[快速访问](Quick-Access)顶部；所有格式转换移到一个统一的[转换器](Converters)面板中。
- **新的翻译系统** - 可插拔的[翻译](Translation)后端让你可以在内置词典、Google、DeepL、LibreTranslate 或 MyMemory 之间选择。旧的捆绑 Google 模块已移除。
- **[UV 工具](UV-Tools)** - 全新的面板，包含*将 UV 边对齐到目标*和*查找最短缝合线路径*。
- **[骨骼工具](Bone-Tools)** - 趾行腿和扭转骨骼生成现在有了自己的位置。
- **glTF / GLB 导入**以及统一的 Rigify 检测。
- **支持 Blender 5.1 与 5.2**（推荐 5.2 LTS）。

## 主要功能

- **模型导入/导出** - MMD、XNALara、Source、VRM、glTF/GLB、FBX、DAE 等
- **修复 MMD 模型** - 一键把全新的 MMD/VRM 导入转换为 Unity/VRChat 可用的模型
- **优化** - 材质合并、贴图图集化（内置，无需额外插件）、骨骼合并、移除重合顶点
- **转换器** - Rigify → Cats、Source/Valve、VRM 修复、MMD 清理
- **合并与附加** - 合并骨架和附加网格
- **翻译** - 优先使用内置词典，并提供可选的在线服务来填补空缺
- **眼动追踪与口型同步** - 为 VRChat 虚拟形象自动设置
- **UV 与骨骼工具** - 针对性的网格/绑定辅助工具

## 社区与支持

- **源码与发行版：** [GitHub](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial)

> 我们不再运营 Discord 服务器或网站。所有支持、缺陷报告和讨论都在上面的 Git 仓库中进行。

## 贡献

我们欢迎贡献！如果你想帮助改进 Cats，欢迎在上面的[仓库](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial)提交拉取请求。

---
