# 版本支持 {#version-support}

本 Cats 构建支持哪些 Blender 版本。

## 受支持的版本 {#supported-versions}

| Blender | 状态 |
|---|---|
| **4.2 LTS** | ✅ 受支持（最低要求） |
| **4.5 LTS** | ✅ 受支持 |
| **5.0** | ✅ 受支持 |
| **5.1** | ✅ 受支持 |
| **5.2 LTS** | ✅ 受支持（推荐） |
| **5.3** | ✅ 受支持 |
| **5.4** | ✅ 受支持（仅 alpha 构建） |

一个构建即可覆盖它们全部。同一个 ZIP 可以安装在表格中的每个版本上，因此你不必
把 Cats 发行版与 Blender 发行版一一对应。

## 不受支持的版本 {#unsupported-versions}

> ⚠ **不支持 Blender 4.1 及更旧版本。**

Cats 以 Blender **扩展**的形式发布，而扩展系统仅从 Blender 4.2 起
存在。旧版本完全无法安装它，无论是否有警告。

## 为什么 4.2 是底线 {#why-42-is-the-floor}

Blender 4.2 引入了扩展：清单文件、安装对话框，以及自动安装
随附的 Python wheel。本插件三者都用到了，因此除了把它重写为传统插件，
没有办法在更旧的 Blender 上加载它。

如果你需要在 4.2 之前的版本上运行 Cats，最后一个仍能在那里工作的发行版
是原项目，而它已不再维护。

## 支持策略 {#support-policy}

Cats 是非官方的社区延续版本。支持为尽力而为：

- 问题与疑问请提交到 [GitHub 仓库](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/issues)。
- 上表中的每个 Blender 版本都会在发行前经过测试。
- 没有停止维护时间表。当某个 Blender 发行版不再受支持时，
  发行说明会予以说明。
- 发行版会从 `main` 自动构建，因此最新的构建始终就是
  [发行版页面](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/releases)上的那个。

## 升级 {#upgrading}

1. 从[发行版页面](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/releases)**下载**最新的发行版。
2. **安装 Cats** - 按照[安装](./Installation.md)指南操作。Blender 会就地替换
   之前的版本。
3. **重启 Blender**，以便加载新代码。
4. **迁移项目** - 打开你的 `.blend` 文件，检查结果，并保留备份。

> 📝 Blender 可以打开旧版本的文件，但在较新 Blender 中保存的文件可能无法
> 在较旧版本中正确打开。

## 检查你的版本 {#checking-your-versions}

- **Cats 版本：** 编辑 > 偏好设置 > 获取扩展，然后查看 *Cats Blender Plugin
  (Unofficial)*。
- **Blender 版本：** 帮助 > 关于 Blender。

**更新 Cats：**[设置](./Settings.md)面板中的内置更新器会列出每个
发行版；Blender 会拒绝安装你的 Blender 无法运行的版本。

## 获取帮助 {#getting-help}

- 在[仓库](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/issues)上提交 issue。
- 先查看[疑难解答](./Troubleshooting.md)和[常见问题](./FAQ.md)。

---

**相关页面：**
- [安装](./Installation.md) - 安装 Cats
- [设置](./Settings.md) - 更新管理
- [常见问题](./FAQ.md) - 常见问题
- [疑难解答](./Troubleshooting.md) - 解决问题
