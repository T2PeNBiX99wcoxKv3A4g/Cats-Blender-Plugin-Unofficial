# 安裝指南

本指南說明如何為 **Blender 4.2 LTS 到 5.4**（建議使用 5.2 LTS）安裝 Cats Blender Plugin。

> #### 如果有人請你依照這些指示操作，而你明顯沒有照做，你的問題將會被直接關閉，沒有例外，沒有但是。

## 需求

### 必要軟體
- **Blender 4.2 LTS 或更新版本**（到 5.4；我們建議 **Blender 5.2 LTS**）
  - 從 [blender.org](https://www.blender.org/download/) 下載
  - 請使用 blender.org 的官方版本或 Steam 版本。其他版本不支援。

> ⚠ **不支援 Blender 4.1 及更舊版本。** 此外掛以 Blender 擴充功能的形式提供，而擴充功能系統從 4.2 起才存在。


### Python 相依套件
- 如果 Blender 使用自訂的 Python 安裝，請確保 **NumPy** 可用。

> ⚠ **Windows Store 使用者：** Cats 或許可以在 Windows Store 版本的 Blender 上運作，但並未獲得官方支援。請使用 [blender.org](https://www.blender.org/) 的官方版本。

> ⚠ **Linux 使用者：** 我們**不**支援各發行版或套件管理員版本的 Blender，包括 Snap 與 Flatpak 版本。這些版本通常不會使用 Blender 內附的 Python 環境，因而導致與 wheel 及其他相依套件產生相容性問題。
>
> 我們不會為了那些因為某些毫無意義的 Linux 文化論戰——「我的發行版什麼都做得更好」——而拒絕使用官方版本的使用者費盡心力。請使用 [blender.org](https://www.blender.org/) 的官方 Blender 版本。**就這麼簡單。**
>
> 我們自己就是 Linux 使用者，而且我們討厭連這種事都需要說明。請直接用 Blender 網站的官方版本。
>
> 任何因使用不受支援的發行版、Snap、Flatpak 或其他重新打包版本所造成的問題，都會被立即關閉。我們對此的立場很明確。

## 安裝步驟

### 步驟 1：下載 Cats

從儲存庫取得最新發行版：
- **發行版：** [GitHub](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/releases)

> 📝 下載 ZIP 檔並**不要解壓縮它**，Blender 的擴充功能系統需要原始的 ZIP 檔。

> 📝 請確認你**沒有**已經安裝原始／官方版本的 Cats；兩者會衝突。如果你曾安裝其他版本，請重新啟動 Blender。

### 步驟 2：透過 Blender 的擴充功能系統安裝

1. 開啟 **Blender 5.2 或 5.3**。
2. 前往 **Edit > Preferences**。
3. 選擇 **Extensions** 分頁。
4. 點擊 **Install from Disk**（右上角的下箭頭圖示）。
5. 選擇 Cats 的 ZIP 檔並點擊 **Install from Disk**。

### 步驟 3：啟用擴充功能

Cats 通常會自動啟用。若沒有，請在擴充功能清單中搜尋「cats」並勾選它旁邊的方塊。

### 步驟 4：確認安裝

1. 開啟 **3D 視埠**。
2. 按 **N** 開啟側邊欄。
3. 點擊 **Cats** 分頁。

## 選用相依項目

有些功能以前需要額外的外掛。現在都不再需要了：

### Material Combiner（貼圖圖集製作）
已不再需要或支援。自 `5.3.1.0` 起，Cats 只保留內建的[圖集產生器](Optimization#atlas-generator)，而驅動 Material Combiner 的舊 *Atlas Generator (Legacy)* 面板已經移除。若仍安裝 Material Combiner，你可以使用一次 **Import Material Combiner Settings** 把設定帶過來，然後將它移除。

### 縮放工具
已不再需要。[縮放](Scaling)面板以前需要另外安裝 Immersive Scaler 外掛。Cats 現在內建自己的縮放工具。如果你仍安裝著 Immersive Scaler，可以將它移除。

## 安裝疑難排解

**擴充功能沒有出現** - 檢查它是否已在擴充功能偏好設定中啟用，確認你的 Blender 版本受支援（4.2 LTS 到 5.4），並且**完全重新啟動 Blender**。

**安裝期間發生錯誤** - 確認你的 Blender 版本受支援（4.2 LTS 到 5.4），重新下載以防 ZIP 檔損毀，並檢查你對擴充功能資料夾有寫入權限。

**Cats 分頁不見了** - 按 **N**，確認擴充功能已啟用，並檢查主控台（Window > Toggle System Console）是否有錯誤。

**不要另行安裝 MMD Tools** - Cats 內附自己的 MMD Tools；另行安裝會產生衝突。請移除任何獨立安裝的 MMD Tools，我們會盡量保持它為最新版，但你也可以自行更新。

**先前安裝過舊版本** - 請將它移除，**重新啟動 Blender**，然後再安裝新版本。

## 後續步驟

- 閱讀[快速存取](Quick-Access)指南以了解基礎知識。
- 瀏覽[介面指南](Home#interface-guides)。
- 若遇到問題，請查看[常見問題](FAQ)與[疑難排解](Troubleshooting)。

---

**需要協助嗎？** 請見[疑難排解](Troubleshooting)頁面，或在[儲存庫](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial)開一個 issue。

---

