# バージョンサポート {#version-support}

このビルドの Cats がサポートする Blender のバージョンです。

## サポートされるバージョン {#supported-versions}

| Blender | ステータス |
|---|---|
| **4.2 LTS** | ✅ サポート（最小） |
| **4.5 LTS** | ✅ サポート |
| **5.0** | ✅ サポート |
| **5.1** | ✅ サポート |
| **5.2 LTS** | ✅ サポート（推奨） |
| **5.3** | ✅ サポート |
| **5.4** | ✅ サポート（アルファビルドのみ） |

1 つのビルドですべてに対応します。同じ ZIP が表のすべてのバージョンにインストールできるため、
Cats のリリースを Blender のリリースに合わせる必要はありません。

## サポートされないバージョン {#unsupported-versions}

> ⚠ **Blender 4.1 以前はサポートされません。**

Cats は Blender の**拡張機能**として配布され、拡張機能システムは Blender 4.2
以降にのみ存在します。古いバージョンでは、警告の有無にかかわらず、まったくインストールできません。

## 4.2 が下限である理由 {#why-42-is-the-floor}

Blender 4.2 で拡張機能が導入されました。マニフェスト、インストールダイアログ、同梱された
Python wheel の自動インストールです。このアドオンはその 3 つすべてを使用するため、
レガシーアドオンとして書き直さない限り、古い Blender で読み込む方法はありません。

4.2 より古いバージョンで Cats を実行する必要がある場合、そこで動作していた最後のリリースは
元のプロジェクトであり、現在はメンテナンスされていません。

## サポートポリシー {#support-policy}

Cats は非公式のコミュニティによる継続プロジェクトです。サポートはベストエフォートです。

- issue や質問は [GitHub リポジトリ](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/issues)へお寄せください。
- 上記の表にあるすべての Blender バージョンは、リリース前にテストされます。
- サポート終了のスケジュールはありません。Blender のリリースがサポート対象外になると、
  リリースノートにその旨が記載されます。
- リリースは `main` から自動的に作成されるため、最新のビルドは常に
  [リリースページ](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/releases)にあるものです。

## アップグレード {#upgrading}

1. [リリースページ](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/releases)から最新リリースを**ダウンロード**します。
2. [Installation](./Installation.md) ガイドに従って **Cats をインストール**します。Blender は
   以前のバージョンをその場で置き換えます。
3. 新しいコードが読み込まれるように **Blender を再起動**します。
4. **プロジェクトを移行**します。`.blend` ファイルを開き、結果を確認し、バックアップを保持してください。

> 📝 Blender は古いバージョンのファイルを開けますが、新しい Blender で保存したファイルは
> 古いバージョンで正しく開けない場合があります。

## バージョンの確認 {#checking-your-versions}

- **Cats のバージョン:** Edit > Preferences > Get Extensions を開き、*Cats Blender Plugin
  (Unofficial)* を確認します。
- **Blender のバージョン:** Help > About Blender を開きます。

**Cats の更新:** [Settings](./Settings.md) パネルの内蔵アップデーターはすべての
リリースを一覧表示します。お使いの Blender で実行できないものは Blender がインストールを拒否します。

## サポートを受ける {#getting-help}

- [リポジトリ](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/issues)で issue を開いてください。
- まず [Troubleshooting](./Troubleshooting.md) と [FAQ](./FAQ.md) を確認してください。

---

**関連ページ:**
- [Installation](./Installation.md) - Cats のインストール
- [Settings](./Settings.md) - アップデートの管理
- [FAQ](./FAQ.md) - よくある質問
- [Troubleshooting](./Troubleshooting.md) - 問題の解決