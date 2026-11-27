# 版本支援 {#version-support}

本建置的 Cats 支援哪些 Blender 版本。

## 支援的版本 {#supported-versions}

| Blender | 狀態 |
|---|---|
| **4.2 LTS** | ✅ 支援（最低版本） |
| **4.5 LTS** | ✅ 支援 |
| **5.0** | ✅ 支援 |
| **5.1** | ✅ 支援 |
| **5.2 LTS** | ✅ 支援（建議） |
| **5.3** | ✅ 支援 |
| **5.4** | ✅ 支援（僅限 alpha 建置） |

一個建置就涵蓋上述全部版本。同一個 ZIP 可安裝在表格中的每個版本上，因此你不需要把 Cats 的發行版與 Blender 的發行版互相對應。

## 不支援的版本 {#unsupported-versions}

> ⚠ **不支援 Blender 4.1 及更舊版本。**

Cats 以 Blender **擴充功能**的形式提供，而擴充功能系統從 Blender 4.2 起才存在。較舊的版本完全無法安裝它，不論有沒有警告都一樣。

## 為什麼 4.2 是門檻 {#why-42-is-the-floor}

Blender 4.2 引入了擴充功能：清單檔、安裝對話框，以及內附 Python wheel 的自動安裝。此外掛三種都用到了，因此在較舊的 Blender 上若不將它改寫成舊式外掛，就沒有辦法載入它。

如果你需要在比 4.2 更舊的版本上執行 Cats，最後一個仍可在該版本運作的發行版是原始專案，而它已不再維護。

## 支援政策 {#support-policy}

Cats 是非官方的社群延續版本。支援採盡力而為的方式：

- 問題與提問請到 [GitHub 儲存庫](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/issues)。
- 上表每個 Blender 版本在發行前都會經過測試。
- 沒有終止支援時程。當某個 Blender 發行版退出支援時，發行說明會註明。
- 發行版會自動從 `main` 切出，因此最新的建置永遠是[發行版頁面](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/releases)上的那一個。

## 升級 {#upgrading}

1. 從[發行版頁面](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/releases)**下載**最新的發行版。
2. **安裝 Cats** - 依照[安裝](./Installation.md)指南操作。Blender 會就地取代先前的版本。
3. **重新啟動 Blender**，讓新程式碼被載入。
4. **移轉專案** - 開啟你的 `.blend` 檔案、檢查結果，並保留備份。

> 📝 Blender 可以開啟較舊版本的檔案，但以較新 Blender 儲存的檔案可能無法
> 在較舊版本中正確開啟。

## 檢查你的版本 {#checking-your-versions}

- **Cats 版本：** Edit > Preferences > Get Extensions，然後查看 *Cats Blender Plugin (Unofficial)*。
- **Blender 版本：** Help > About Blender。

**更新 Cats：**[設定](./Settings.md)面板中的內建更新器會列出每個發行版；Blender 會拒絕安裝你的 Blender 無法執行的版本。

## 取得協助 {#getting-help}

- 在[儲存庫](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/issues)開一個 issue。
- 請先查看[疑難排解](./Troubleshooting.md)與[常見問題](./FAQ.md)。

---

**相關頁面：**
- [安裝](./Installation.md) - 安裝 Cats
- [設定](./Settings.md) - 更新管理
- [常見問題](./FAQ.md) - 常見提問
- [疑難排解](./Troubleshooting.md) - 解決問題
