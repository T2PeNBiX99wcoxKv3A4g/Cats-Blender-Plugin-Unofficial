# 设置 {#settings}

设置与更新面板提供了 Cats Blender Plugin 的配置选项和更新管理。

## 常规设置 {#general-settings}

### 导出选项 {#export-options}

#### 嵌入贴图 {#embed-textures}
- 把贴图直接包含在导出的文件中
- 增大文件体积
- 自包含的导出文件
- 适合分享模型

**何时启用：**
- 带贴图分享 FBX 文件
- 单文件分发
- 无需单独管理贴图

> **如果你是在为 Unity/VRChat 制作内容，就不要嵌入贴图 —— 材质应在 Unity 中设置**

**何时禁用：**
- 保持文件体积小
- 在 Unity 中单独管理贴图
- 更好地组织资产

#### 移除刚体/关节 {#remove-rigidbodiesjoints}
- 在导出时清理物理
- 移除 MMD 物理数据
- 降低文件复杂度
- 推荐用于 VRChat 导出

**何时启用：**
- 导出 MMD 模型
- 不需要物理数据
- 更干净的导出

**何时禁用：**
- 需要保留物理
- 在目标应用中使用物理

#### 导出翻译 CSV {#export-translation-csv}
- 在导出时生成翻译文件
- 创建包含名称映射的 CSV
- 自 `5.2.4.0` 起包含**来源**列：词典、MMD 作者名称或在线服务
- 适合编写文档
- 翻译的参考

**何时启用：**
- 需要翻译文档
- 想检查翻译
- 制作模型文档

**何时禁用：**
- 不需要翻译记录
- 缩短导出时间

#### 自定义导出目录 {#custom-export-directory}
- 设置首选的导出保存位置
- 记住你的选择
- 更快的工作流程
- 有条理的文件管理

**如何设置：**
1. 点击文件夹图标
2. 导航到所需位置
3. 选择文件夹
4. 以后的导出默认保存在这里

---

## 语言设置 {#language-settings}

### 界面语言 {#interface-language}

Cats 的界面支持多种语言。

#### 可用语言 {#available-languages}

- **英语（en_US）** - 默认
- **日语（ja_JP）**
- **韩语（ko_KR）**
- 社区提供翻译的其他语言

#### 更改语言 {#changing-language}

1. 从下拉框中选择语言
2. 大约两秒后 Cats 会重新加载自身（只重载 Cats，不是你的其他插件）
3. 界面元素更新为所选语言

无需重启 Blender。如果标签没有变化，请重启 Blender。

#### 自定义语言文件 {#custom-language-files}

Cats 支持自定义翻译文件：
- 随附的文件位于扩展内的 `resources/translations/`；**下载最新翻译**会把较新的副本保存到 Cats 的[用户数据文件夹](#settings-file-location)中的 `translations` 文件夹，这些文件会被优先使用
- 损坏或下载了一半的语言文件会被跳过：Cats 会回退到随附的副本，然后再回退到英文，而不是加载失败
- JSON 格式
- 社区可以贡献翻译
- 轻松添加新语言

### 翻译管理 {#translation-management}

**翻译文件结构：**
- 每种语言有一个 JSON 文件
- 包含界面字符串的映射
- 易于编辑和扩展
- 为新语言提供模板

---

## 调试选项 {#debug-options}

### 维护工具 {#maintenance-tools}

#### 重置 Google 词典 {#reset-google-dictionary}
- 清除缓存的 Google 翻译数据
- 翻译不正确时有用
- 强制获取全新的翻译
- 可安全使用

**何时使用：**
- 翻译看起来不对
- 想要全新的翻译数据
- 重大更新之后
- 排查翻译问题

**如何使用：**
1. 点击 **重置 Google 词典**
2. 确认操作
3. 词典缓存已清除

#### 翻译调试（开发分支） {#translation-debugging-dev-branch}
- 在开发分支中可用
- 显示翻译过程的详细信息
- 帮助定位翻译问题
- 面向高级用户/开发者

#### 系统缓存清理 {#system-cache-cleanup}
- 清除各种缓存数据
- 重置临时文件
- 有助于解决奇怪的问题
- 可定期安全使用

**何时使用：**
- 插件行为异常
- 更新之后
- 排查无法解释的问题

#### 配置重置选项 {#configuration-reset-options}
- 恢复默认设置
- 清除自定义配置
- 回到全新安装的状态
- 在设置损坏时使用

> ⚠ **警告：** 配置重置无法撤销。你的自定义设置将会丢失。

---

## 更新管理 {#update-management}

### 版本控制 {#version-control}

#### 更新通知 {#update-notifications}
- 自动检查新版本
- 在有更新时显示
- 在插件界面中展示
- 不打扰的通知

**配置：**
- 启用/禁用更新检查
- 设置检查频率
- 选择通知样式

#### 自动更新检查 {#automatic-update-checks}
- Cats 加载时在后台运行一次
- 检查 [GitHub](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/releases) 上的发行版
- 与已安装版本比较
- 有可用更新时显示更新按钮

自 `5.3.1.0` 起，更新器会列出每个 Cats 发行版，而不只是为你的 Blender 版本制作的那些，因为一个发行版可以支持多个 Blender 版本。Blender 自身会检查每个发行版支持的 Blender 范围，并拒绝安装你的 Blender 无法运行的版本。

**它如何工作：**
1. Cats 检查 GitHub 上的发行版列表
2. 比较版本号
3. 如果存在更新版本则通知
4. 提供下载链接

> **需要 Blender 的在线访问。** Cats 仅在 **编辑 > 偏好设置 > 系统 > 网络 > 允许在线访问** 打开时检查更新。关闭它时，自动检查会被静默跳过，**检查更新** 会显示一条消息，告诉你在线访问已禁用。

#### 版本兼容性信息 {#version-compatibility-info}
- 显示 Blender 版本是否受支持
- 对不兼容的版本发出警告
- 推荐正确的版本
- 避免安装问题

#### 发行说明访问 {#release-notes-access}
- 查看更新的变更日志
- 了解新内容
- 理解缺陷修复
- 从更新通知访问

### 管理更新 {#managing-updates}

#### 手动检查更新 {#checking-for-updates-manually}

1. 打开设置面板
2. 点击 **检查更新**
3. 等待检查完成
4. 如有可用更新，按提示操作

#### 安装更新 {#installing-updates}

1. 从提供的链接下载新版本
2. 关闭 Blender
3. 移除旧版本：
   - 前往 编辑 > 偏好设置 > 扩展
   - 找到 Cats
   - 移除扩展
4. 重启 Blender
5. 安装新版本
6. 启用扩展

> 📝 **注意：** 在移除旧版本和安装新版本之间始终重启 Blender，以获得最干净的安装。

#### 理解版本号 {#understanding-version-numbers}

Cats 使用由三部分组成的语义化版本：

- **主版本.次版本.补丁**（例如 `5.5.0`）
- **主版本.次版本** 跟踪本延续版本所起始的 Blender 系列；同一个构建仍可安装在所有受支持的 Blender 版本上
- **补丁** 共同计算发行版、功能和修复

示例：

- `5.3.9` - 一个补丁发行版
- `5.4.0` - 添加文档站点的发行版
- `5.5.0` - 为站点添加所有界面语言的发行版

关于每个发行版支持哪些 Blender 版本，见[版本支持](./Version-Support.md)。

---

## 设置最佳实践 {#settings-best-practices}

### 导出设置 {#export-settings}

**推荐的 VRChat 设置：**
- ❌ 嵌入贴图：关闭（在 Unity 中处理）
- ✅ 移除刚体/关节：开启
- ❌ 导出翻译 CSV：关闭（除非需要）
- ✅ 自定义导出目录：设为你的项目文件夹

**推荐的模型分享设置：**
- ✅ 嵌入贴图：开启（对接收者更方便）
- ✅ 移除刚体/关节：开启
- ✅ 导出翻译 CSV：开启（文档）
- ✅ 自定义导出目录：设为导出文件夹

### 更新设置 {#update-settings}

**推荐：**
- ✅ 启用自动更新检查
- ✅ 每天或每周检查一次
- ✅ 更新前阅读发行说明
- ✅ 重大更新前保留备份

### 语言设置 {#language-settings-1}

**为获得最佳体验：**
- 如果习惯，可以使用英语（大多数文档是英文）
- 使用母语以便更好理解
- 报告缺失的翻译，帮助社区
- 检查你的语言是否可用

---

## 设置疑难解答 {#troubleshooting-settings}

### 设置没有保存 {#settings-not-saving}

**可能原因：**
- 权限问题
- 偏好设置损坏
- Blender 未正常关闭

**解决方案：**
- 检查文件夹权限
- 重置配置
- 手动保存 Blender 偏好设置
- 如有需要重新安装

### 更新没有显示 {#updates-not-showing}

**可能原因：**
- Blender 的**允许在线访问**已关闭
- 更新检查已禁用
- 没有网络连接
- 防火墙阻止了 github.com
- VPN 干扰
- 代理或安全软件替换了 HTTPS 证书（Cats 会验证更新服务器的证书）

**解决方案：**
- 打开 **编辑 > 偏好设置 > 系统 > 网络 > 允许在线访问**
- 启用更新检查
- 检查网络连接
- 在防火墙中允许 github.com
- 暂时禁用 VPN
- 检查系统控制台：`URL ERROR` 表示 Cats 无法访问更新服务器，或其证书不受信任

### 语言没有更改 {#language-not-changing}

**可能原因：**
- Cats 的自动重载失败（在系统控制台中查看 `Cats reload failed`）
- 翻译文件缺失
- 语言文件损坏（此时 Cats 会回退到随附的文件或英文）

**解决方案：**
- 完全重启 Blender
- 确认翻译文件存在
- 再次点击 **下载最新翻译**，或如有需要重新安装

---
## 设置文件位置 {#settings-file-location}

Cats 把设置保存在自己的用户数据文件夹中，该文件夹在 Cats 更新后仍会保留。它是 Blender 的 `extensions/.user` 目录下的扩展文件夹（从磁盘安装时，仓库部分通常是 `user_default`）：
- Windows：`%APPDATA%\Blender Foundation\Blender\5.x\extensions\.user\user_default\cats_blender_plugin\`
- macOS：`~/Library/Application Support/Blender/5.x/extensions/.user/user_default/cats_blender_plugin/`
- Linux：`~/.config/blender/5.x/extensions/.user/user_default/cats_blender_plugin/`

其中包含：
- `settings.json` - 你的 Cats 设置，包括翻译服务的 API 密钥
- `dictionary_google.json` - 在线翻译的缓存
- `dictionary.json` 和 `translations/` - 下载的词典和语言文件

你的设置是全局的：每次你打开 `.blend` 时都会重新应用，因此用其他值保存的文件不会覆盖它们。自 `5.3.1.0` 起，翻译 API 密钥、LibreTranslate URL 和 MyMemory 邮箱**绝不会写入 `.blend` 文件**，旧版本保存进文件的任何此类信息都会在文件打开时被移除。

> ⚠ **警告：** 手动编辑这些文件可能导致问题。尽可能使用设置面板。

---

## 与 Blender 偏好设置的集成 {#integration-with-blender-preferences}

Cats 尊重 Blender 的偏好设置：
- 文件路径
- 语言设置（在可能的情况下）
- 界面缩放
- 主题设置

Cats 加载时**不会**更改你的 Blender 偏好设置。较早的版本会开启文件压缩并更改插件支持过滤器；自 `5.3.1.0` 起，你的偏好设置会完全保持你设定的样子。

---

## 需要重启的更改 {#changes-requiring-restart}

部分设置需要重启 Blender：
- ❌ 语言更改（Cats 会重载自身）
- ✅ 重大配置重置
- ❌ 导出选项（立即生效）
- ❌ 更新检查（立即生效）

---

**相关页面：**
- [安装](./Installation.md) - 安装 Cats
- [快速访问](./Quick-Access.md) - 使用导出功能
- [疑难解答](./Troubleshooting.md) - 常见问题
- [常见问题](./FAQ.md) - 常见问题解答

---
