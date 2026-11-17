# 常见问题（FAQ）

关于 Cats Blender Plugin 在 Blender 4.2 LTS 至 5.4 上的常见问题。

## 常规问题

### Cats Blender Plugin 是什么？

Cats 是一个旨在缩短为 VRChat 导入和优化模型所需步骤的工具。它支持多种模型格式，包括 MMD、XNALara、Source Engine、VRM 等。

### 这是官方 Cats 插件吗？

这是**非官方 Cats 插件**，由社区维护。原官方 Cats 插件自 2022 年起已被弃用。本版本继续积极开发，并支持现代的 Blender 版本。

更多信息见[官方 Cats 的状态如何？](#what-is-the-status-of-official-cats)

### 我需要哪个 Blender 版本？

Cats 需要 **Blender 4.2 LTS 或更新版本**；支持 4.2 LTS 至 5.4。Blender 4.1 及更旧版本无法加载该扩展。详情见[版本支持](Version-Support)。

我们也只支持 Steam 版本和 blender.org 版本。Windows 商店版、Linux 包管理器版本的 Blender、snap 商店版和 flatpak 版本都不受支持。

### Cats 免费吗？

是的，Cats 完全免费，并以 MIT 许可证开源。

### 我在哪里可以下载 Cats？

- **仓库与发行版：** [GitHub](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/releases)

---

## 安装问题

### 如何安装 Cats？

请参阅完整的[安装](Installation)指南。简要版本：
1. 下载 ZIP 文件（不要解压）
2. 打开 Blender 5.2+
3. 编辑 > 偏好设置 > 扩展
4. 从磁盘安装
5. 选择该 ZIP 文件
6. 启用扩展

### 安装后需要重启 Blender 吗？

需要，建议在安装或更新 Cats 后重启 Blender，以获得最佳效果。

### 我可以安装多个版本的 Cats 吗？

不可以，只能安装一个版本的 Cats。安装新版本前请移除旧版本。

### 我的设置保存在哪里？

设置存储于 Cats 自己的用户数据文件夹中，而不是你的 `.blend` 文件中，因此它们能在 Cats 更新后保留。具体位置见[设置](Settings#settings-file-location)。

---

## 兼容性问题

### Cats 可以在 Blender 4.x 上工作吗？

Cats 可在 Blender 4.2 LTS 至 5.4 上工作。Blender 4.1 及更旧版本无法加载该扩展，也没有为它们提供的替代构建。

### 我可以在旧版 Blender 中打开 Blender 5.2 / 5.3 的文件吗？

不建议这样做。在 Blender 5.2 / 5.3 中保存的文件可能无法在旧版本中正确打开，可能导致数据丢失或崩溃。

### Cats 支持哪些模型格式？

**导入格式：**
- MMD：`.pmx`、`.pmd`
- XNALara：`.xps`、`.mesh`、`.ascii`
- Source Engine：`.smd`、`.qc`、`.vta`、`.dmx`
- VRM：`.vrm`
- FBX：`.fbx`
- Collada：`.dae`
- 包含模型的 ZIP 压缩包

**导出格式：**
- FBX（用于 Unity/VRChat）
- GLTF（用于 Resonite）

---

## 功能问题

### 我能看到姿态模式吗？

姿态模式仅在以下情况出现在[快速访问](Quick-Access)面板中：
- 你已导入模型
- 模型有有效的骨架

先导入模型，然后才会出现姿态模式选项。

### 为什么我不能使用图集功能？

[图集生成器](Optimization#atlas-generator)内置于 Cats，无需安装任何东西。它仍被标记为**alpha**：可以工作，但导出前请检查结果。

旧的 **图集生成器（传统版）** 面板需要 Shotariya Material Combiner 插件，已在 `5.3.1.0` 中**移除**。如果你在找它，请改用图集生成器；若仍安装了 Material Combiner，它的**导入 Material Combiner 设置**按钮可以把你的旧设置复制过来。

### 为什么我不能使用缩放功能？

缩放内置于 Cats，不再需要 Immersive Scaler 或任何其他插件。如果按钮是灰色的，说明 Cats 找不到骨架：在 Cats 的骨架下拉框中选择你的虚拟形象骨架，或将其设为活动对象。见[缩放](Scaling#common-scale-issues)。

### 我应该对 Booth 上的虚拟形象使用修复 MMD 模型吗？

**不要！** 修复 MMD 模型**只**应用于全新的、未处理过的 MMD/VRM 文件。不要对它使用于：
- 商店购买的模型（Booth、Gumroad 等）
- 已经为 Unity 设置好的模型
- 你正在制作的自定义模型

详情见[转换器](Converters)。

---

## 工作流程问题

### 我应该按什么顺序操作？

推荐的工作流程：

1. **导入**模型
2. **修复 MMD 模型**（仅限全新的 MMD/VRM）
3. **翻译**名称为英文
4. 如有需要**应用变换**
5. **缩放**到正确身高
6. **合并材质 / 创建图集**
7. **设置眼动追踪**
8. **设置口型同步**
9. **优化**（骨骼合并、清理）
10. **导出**

**要点：** 在眼动追踪和口型同步**之前**合并材质 / 创建图集！

### 为什么要在眼动追踪和口型同步之前做图集？

在设置以下内容**之前**完成材质合并和图集化：
- 眼动追踪
- 口型同步
- 其他形态键配置

旧的 Material Combiner 插件如果在这些之后运行，可能会导致形态键错位。内置的图集生成器只改变材质和 UV，但把材质工作放在前面能让流程更可预测。始终先做材质！

### 我如何为 VRChat 准备模型？

1. 使用 Cats 导入
2. 修复 MMD 模型（如适用 —— 仅当它是 VRM 或 MMD 模型时）
3. 翻译为英文
4. 缩放到 160-180cm
5. 优化材质和骨骼
6. 设置眼动追踪（可选）
7. 设置口型同步（可选）
8. 为 Unity 导出 FBX
9. 导入 Unity 并在那里设置材质

---

## 疑难解答问题

### 为什么安装后 Cats 没有出现？

常见原因：
- 扩展未启用（检查 偏好设置 > 扩展）
- Blender 未重启
- Cats 版本与你的 Blender 不匹配
- 侧栏被隐藏（在 3D 视口按 N）

详细解决方案见[疑难解答](Troubleshooting#extension-doesnt-appear-after-installation)。

### 为什么我的模型是黑的/没有贴图？

常见原因：
- 视口着色模式错误（按 Z，选择「材质预览」）
- 贴图未正确链接
- 图集化之后：图集材质是普通的原理化 BSDF（请改为在 Unity 中设置材质）

解决方案见[疑难解答](Troubleshooting#model-appears-black-or-no-textures)。

### 为什么我的虚拟形象在 VRChat 中看起来太大/太小？

- 使用[缩放](Scaling)面板检查 Blender 中的缩放
- 推荐身高：160-180cm
- 导出前应用变换
- 确认 Unity 导入缩放为 1.0

### 这些策略违规警告是什么？

这些警告出现在 Blender 5.2 / 5.3 中，是因为 Cats 使用传统方法加载 MMD Tools 等第三方插件。**这些警告是预期的，可以安全忽略** —— 一切仍然正常工作。

---

## 优化问题

### 如何减少虚拟形象的面数？

1. 使用[优化](Optimization)面板中的移除重合顶点
2. 使用 Tuxedo Blender Plugin 进行减面
3. 合并网格
4. 手动移除不必要的网格细节

### 如何减少绘制调用？

1. 在[优化](Optimization)中**合并材质**
2. 使用内置的[图集生成器](Optimization#atlas-generator)**创建贴图图集**
3. **合并网格**
4. 减少独立材质的数量

### 如何减少骨骼数量？

使用优化面板中的[骨骼与权重](Optimization#bones-weights)：
- 从合并比例 0.5 开始
- 为安全起见启用「保留合并的骨骼」
- 在运行清理操作之前先测试
- 合并后移除零权重骨骼

### 合并材质与创建图集有什么区别？

- **合并材质：** 把属性相同的材质并为一个
- **创建图集：** 把多张贴图合并为一张大贴图
- 图集通常能带来更好的性能提升
- 两者都能减少绘制调用

---

## 技术问题

### Cats 可以在 Steam/微软商店版 Blender 上工作吗？

虽然 Cats 或许能工作，但**我们建议从 blender.org 下载 Blender**：
- Steam 版本：部分用户报告有问题
- 微软商店版本：已知的权限问题
- 官方下载：最可靠

### 我可以离线使用 Cats 吗？

可以，除了以下内容：
- 在线翻译服务（Google、DeepL、LibreTranslate、MyMemory）。内置词典可离线工作。
- 下载最新翻译
- 更新检查（需要联网检查更新）
- 其他一切都可以离线工作

Cats 遵循 Blender 的**编辑 > 偏好设置 > 系统 > 网络 > 允许在线访问**设置。关闭它时，Cats 完全不进行网络连接：跳过更新检查、拒绝下载翻译，翻译回退到内置词典。

### Cats 会收集任何数据吗？

不会。Cats 不会收集、传输或存储任何用户数据。唯一的网络连接是：
- 你选择的在线翻译服务（仅在你使用翻译功能时）- 见[翻译](Translation)
- 更新服务器（检查更新时）
- 本仓库中的翻译文件（仅在你点击下载最新翻译时）

当 Blender 的**允许在线访问**关闭时，这些都不会发生。

### 我的翻译 API 密钥会保存在 .blend 文件中吗？

不会。自 `5.3.1.0` 起，你的 DeepL / LibreTranslate API 密钥、LibreTranslate URL 和 MyMemory 邮箱只存储在 Cats 自己的设置文件中，绝不会写入 `.blend`，因此分享文件永远不会泄露你的密钥。旧版本保存到文件中的密钥会在你打开文件时被移除；再次保存文件才能让此更改生效。如果你已经分享过用旧版本创建的文件，请考虑更换你的 API 密钥。

### Cats 还在维护吗？

是的。Cats 由社区维护，支持 **Blender 4.2 LTS 至 5.4**（推荐 5.2 LTS）。开发工作在[仓库](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial)上进行。

---

## 更新问题

### 如何更新 Cats？

1. 从[仓库发行版](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/releases)下载新版本
2. 关闭 Blender
3. 移除旧的 Cats 版本（偏好设置 > 扩展）
4. 重启 Blender
5. 安装新版本
6. 启用扩展

详情见[设置](Settings#installing-updates)。

### 我应该多久更新一次？

在以下情况更新：
- 发布了你想要的新功能
- 针对你遇到问题的缺陷修复
- Blender 重大更新
- 安全更新（在仓库上公布）

### 更新会破坏我现有的项目吗？

通常不会，但是：
- 更新前始终备份项目
- 先在非关键文件上测试
- 阅读发行说明以了解破坏性更改
- 如有需要可以回退到旧版本

---

## 原版 Cats 相关问题

### 官方 Cats 的状态如何？

**官方 Cats Blender Plugin 已被弃用。** 时间线：

- **最后发行版：** 2021 年 6 月 27 日
- **最后一次主要更新：** 2022 年 1 月 25 日
- **当前状态：** 截至 2024 年已 100% 弃用

**发生了什么：**
- 原始开发者（Absolute Quantum/Hotox）从互联网上消失
- 尽管多次尝试，仍无法取得联系
- Patreon 一直在收款，直到 Neoneko 与 Patreon 安全团队合作将其移除（耗时 6 个多月）
- 3 年多没有更新
- 没有支持或沟通

**非官方 Cats：**
- 由社区维护
- 支持最新的 Blender 版本
- 定期更新和缺陷修复
- 活跃的社区支持

### 我应该使用旧的教程视频吗？

对旧教程要谨慎：
- 许多使用过时的官方 Cats
- 界面已发生显著变化
- 部分建议已过时或不正确
- 寻找使用非官方 Cats 和 Blender 5.2+ 的教程

**旧教程中常见的错误建议：**
- 手动修改代码（从无必要）
- 从代码中移除「Testing」（会破坏功能）
- 使用不兼容的 Cats 版本
- 过时的工作流程

### 我如何帮助传播？

1. **在 YouTube 视频下评论：**
   - 指出视频是否使用了过时的 Cats
   - 分享非官方 Cats 的链接
   - 提及 Blender 5.2 / 5.3 支持

2. **更新论坛帖子：**
   - 纠正过时的信息
   - 链接到当前文档
   - 分享成功案例

3. **创作内容：**
   - 制作更新过的教程
   - 撰写指南
   - 在社交媒体上分享

---

## 平台相关问题

### Cats 可以用于 VRChat 以外的平台吗？

可以！Cats 适用于：
- **VRChat** - 主要目标
- **ChilloutVR** - 工作流程兼容
- **Resonite** - 有专门的导出选项
- **其他 VR 平台** - 通常兼容
- **通用 3D 用途** - 优化工具在任何地方都有用

### Cats 可以用于 Quest 虚拟形象吗？

可以，优化工具对 Quest 尤其有用：
- 材质合并和图集化
- 骨骼合并
- 面数减少（配合其他工具）
- 都有助于满足 Quest 的限制

### 我可以把 Cats 用于非 VR 模型吗？

可以！许多功能对任何 3D 工作流程都有用：
- 模型导入
- 骨架合并
- 材质优化
- 翻译工具
- 通用网格操作

---

## 高级问题

### 我可以修改 Cats 吗？

可以！Cats 是开源的（MIT 许可证）：
- 在 GitHub 上查看源代码
- 为个人用途修改
- 贡献改进
- 派生自定义版本

### 我如何报告缺陷？

1. 先查看[疑难解答](Troubleshooting)
2. 在 GitHub issues 中搜索类似报告
3. 如果是新缺陷，提交 GitHub issue 并包含：
   - Cats 版本
   - Blender 版本
   - 复现步骤
   - 预期行为与实际行为
   - 错误信息/截图

### 我如何贡献？

有几种贡献方式：
- 报告缺陷
- 建议功能（先讨论）
- 提交拉取请求
- 帮助翻译
- 撰写文档

一切都发生在[仓库](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial)上。

### 我在哪里可以请求功能？

1. 在[仓库](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/issues)上提交 issue
2. 检查该功能是否已在计划中
3. 具体说明你的使用场景
4. 理解它可能不会被实现

---

## 获取帮助

### 我在哪里可以提问？

- **本 Wiki** - 功能指南和疑难解答
- **[仓库 issues](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/issues)** - 缺陷报告和问题

> 我们不再运营 Discord 服务器或网站。所有支持都在仓库上进行。

### 寻求帮助时我应该提供哪些信息？

- Blender 版本（精确）
- Cats 版本（精确）
- 你想做什么
- 实际发生了什么
- 错误信息（完整文本）
- 如相关的截图
- 复现步骤

### 我的问题在这里没有得到解答

请查看：
1. 本 wiki 中相关的功能页面
2. [疑难解答](Troubleshooting)页面
3. 在[仓库](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/issues)中搜索已有的 issue
4. 如果没有记录，提交新的 issue

---

**相关页面：**
- [安装](Installation) - 安装指南
- [疑难解答](Troubleshooting) - 问题排查
- [版本支持](Version-Support) - 兼容性信息
- 各功能页面，了解具体工具

---
