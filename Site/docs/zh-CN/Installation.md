# 安装指南 {#installation-guide}

本指南介绍如何为 **Blender 4.2 LTS 至 5.4**（推荐 5.2 LTS）安装 Cats Blender Plugin。

> #### 如果有人让你按照这些说明操作，而你明显没有照做，你的 issue 会被关闭，没有「如果」，没有「但是」。

## 要求 {#requirements}

### 必需的软件 {#required-software}
- **Blender 4.2 LTS 或更新版本**（至 5.4；我们推荐 **Blender 5.2 LTS**）
  - 从 [blender.org](https://www.blender.org/download/) 下载
  - 使用 blender.org 的官方构建或 Steam 版本。其他构建不受支持。

> ⚠ **不支持 Blender 4.1 及更低版本。** 该插件以 Blender 扩展的形式发布，而扩展系统仅从 4.2 起存在。


### Python 依赖 {#python-dependencies}
- 如果 Blender 使用自定义的 Python 安装，请确保 **NumPy** 可用。

> ⚠ **Windows 商店版用户：** Cats 或许能在微软商店版的 Blender 上工作，但它不受官方支持。请使用来自 [blender.org](https://www.blender.org/) 的官方构建。

> ⚠ **Linux 用户：** 我们**不**支持发行版或包管理器构建的 Blender，包括 Snap 和 Flatpak 版本。这些构建通常不使用 Blender 自带的 Python 环境，会导致与 wheel 及其他依赖的兼容性问题。
>
> 我们不会为了那些因为「我的发行版什么都做得更好」这种毫无意义的 Linux 文化之争而拒绝使用官方构建的用户去委曲求全。请使用来自 [blender.org](https://www.blender.org/) 的官方 Blender 构建。**就这么简单。**
>
> 我们自己就是 Linux 用户，我们也讨厌这还需要特意说明。直接用 Blender 官网的官方版本就好。
>
> 任何因使用不受支持的发行版、Snap、Flatpak 或其他重新打包的构建而导致的问题都会被立即关闭。我们对此的立场很明确。

## 安装步骤 {#installation-steps}

### 第 1 步：下载 Cats {#step-1-download-cats}

从仓库获取最新的发行版：
- **发行版：** [GitHub](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/releases)

> 📝 下载 ZIP 并**不要解压它** —— Blender 的扩展系统需要原始的 ZIP。

> 📝 确保你**没有**已经安装原版/官方 Cats；两者会冲突。如果你曾安装过其他版本，请重启 Blender。

### 第 2 步：通过 Blender 的扩展系统安装 {#step-2-install-via-blenders-extension-system}

1. 打开 **Blender 5.2 或 5.3**。
2. 前往 **编辑 > 偏好设置**。
3. 选择 **扩展** 选项卡。
4. 点击 **从磁盘安装**（右上角的向下箭头图标）。
5. 选择 Cats 的 ZIP，然后点击 **从磁盘安装**。

### 第 3 步：启用扩展 {#step-3-enable-the-extension}

Cats 通常会自动启用。如果没有，请在扩展列表中搜索 "cats"，并勾选它旁边的复选框。

### 第 4 步：验证安装 {#step-4-verify-installation}

1. 打开 **3D 视口**。
2. 按 **N** 打开侧栏。
3. 点击 **Cats** 选项卡。

## 可选依赖 {#optional-dependencies}

过去有些功能需要额外的插件。现在都不再需要：

### Material Combiner（贴图图集化） {#material-combiner-texture-atlasing}
不再需要，也不再支持。自 `5.3.1.0` 起，Cats 只保留内置的[图集生成器](./Optimization.md#atlas-generator)，而驱动 Material Combiner 的旧 *图集生成器（传统版）* 面板已被移除。如果仍安装了 Material Combiner，你可以使用一次**导入 Material Combiner 设置**来迁移你的设置，然后将其移除。

### 缩放工具 {#scaling-tools}
不再需要。[缩放](./Scaling.md)面板过去需要单独的 Immersive Scaler 插件。Cats 现在内置了自己的缩放器。如果你仍安装了 Immersive Scaler，可以将其移除。

## 安装疑难解答 {#troubleshooting-installation}

**扩展不出现** - 检查它在扩展偏好设置中是否已启用，确认你的 Blender 版本受支持（4.2 LTS 至 5.4），并**完全重启 Blender**。

**安装过程中出现错误** - 确认你的 Blender 版本受支持（4.2 LTS 至 5.4），重新下载以防 ZIP 损坏，并检查你对扩展文件夹是否有写入权限。

**Cats 选项卡缺失** - 按 **N**，确认扩展已启用，并在控制台（窗口 > 切换系统控制台）中检查错误。

**不要单独安装 MMD Tools** - Cats 自带 MMD Tools；单独安装会产生冲突。移除任何独立安装的 MMD Tools —— 我们会持续更新内置版本，但你也可以自行更新。

**之前安装过旧版本** - 将其移除，**重启 Blender**，然后安装新版本。

## 下一步 {#next-steps}

- 阅读[快速访问](./Quick-Access.md)指南了解基础知识。
- 浏览[界面指南](./Overview.md#interface-guides)。
- 如果遇到问题，查看[常见问题](./FAQ.md)和[疑难解答](./Troubleshooting.md)。

---

**需要帮助？** 参阅[疑难解答](./Troubleshooting.md)页面，或在[仓库](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial)上提交 issue。

---
