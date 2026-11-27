# インストールガイド {#installation-guide}

このガイドでは、**Blender 4.2 LTS から 5.4**（5.2 LTS 推奨）向けの Cats Blender Plugin のインストールについて説明します。

> #### これらの手順に従うよう言われて明らかに従っていない場合、あなたの issue は例外なくクローズされます。

## 必要条件 {#requirements}

### 必要なソフトウェア {#required-software}
- **Blender 4.2 LTS 以降**（5.4 まで。**Blender 5.2 LTS** を推奨します）
  - [blender.org](https://www.blender.org/download/) からダウンロードしてください
  - blender.org の公式ビルド、または Steam 版を使用してください。その他のビルドはサポートされません。

> ⚠ **Blender 4.1 以前はサポートされません。** このアドオンは Blender の拡張機能として配布され、拡張機能システムは 4.2 以降にのみ存在します。


### Python の依存関係 {#python-dependencies}
- Blender がカスタムの Python インストールを使用する場合は、**NumPy** が利用可能であることを確認してください。

> ⚠ **Windows Store ユーザー:** Cats は Blender の Windows Store ビルドでも動作する可能性がありますが、公式にはサポートされません。[blender.org](https://www.blender.org/) の公式ビルドを使用してください。

> ⚠ **Linux ユーザー:** ディストリビューションやパッケージマネージャーの Blender ビルドは、Snap 版や Flatpak 版を含め、**サポートしていません**。これらのビルドは Blender に同梱された Python 環境を使用しないことが多く、wheel やその他の依存関係との互換性問題を引き起こします。
>
> 「自分のディストリビューションの方が何でも優れている」という無意味な Linux の文化論争を理由に公式ビルドを使うことを拒むユーザーに、無理に合わせるつもりはありません。[blender.org](https://www.blender.org/) の公式 Blender ビルドを使用してください。**まったく簡単な話です。**
>
> 私たち自身も Linux ユーザーであり、こんなことを言わなければならないこと自体が嫌です。Blender の公式サイトから公式版を使用してください。
>
> サポートされていないディストリビューション、Snap、Flatpak、その他の再パッケージ版の使用によって生じた issue は即座にクローズされます。この点に関する私たちの立場は明確です。

## インストール手順 {#installation-steps}

### ステップ 1: Cats をダウンロードする {#step-1-download-cats}

リポジトリから最新リリースを入手します。
- **リリース:** [GitHub](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/releases)

> 📝 ZIP をダウンロードし、**展開しないでください**。Blender の拡張機能システムには元の ZIP が必要です。

> 📝 元の/公式の Cats がすでにインストールされて**いない**ことを確認してください。2 つは競合します。別のバージョンがインストールされていた場合は Blender を再起動してください。

### ステップ 2: Blender の拡張機能システムでインストールする {#step-2-install-via-blenders-extension-system}

1. **Blender 5.2 または 5.3** を開きます。
2. **Edit > Preferences** に移動します。
3. **Extensions** タブを選択します。
4. **Install from Disk**（右上の下向き矢印アイコン）をクリックします。
5. Cats の ZIP を選択し、**Install from Disk** をクリックします。

### ステップ 3: 拡張機能を有効にする {#step-3-enable-the-extension}

通常、Cats は自動的に有効になります。そうならない場合は、Extensions リストで "cats" を検索し、横のチェックボックスをオンにしてください。

### ステップ 4: インストールを確認する {#step-4-verify-installation}

1. **3D ビューポート**を開きます。
2. **N** を押してサイドバーを開きます。
3. **Cats** タブをクリックします。

## 任意の依存関係 {#optional-dependencies}

一部の機能は以前、追加のアドオンを必要としていました。現在はどれも必須ではありません。

### Material Combiner（テクスチャのアトラス化） {#material-combiner-texture-atlasing}
不要になり、サポートも終了しました。`5.3.1.0` 以降、Cats には内蔵の [Atlas Generator](./Optimization.md#atlas-generator) のみがあり、Material Combiner を操作していた旧 *Atlas Generator (Legacy)* パネルは削除されました。Material Combiner がまだインストールされている場合は、**Import Material Combiner Settings** を一度使用して設定を引き継ぎ、その後削除できます。

### スケーリングツール {#scaling-tools}
不要になりました。[Scaling](./Scaling.md) パネルは以前、別の Immersive Scaler アドオンを必要としていました。現在は Cats に独自のスケーラーが内蔵されています。Immersive Scaler がまだインストールされている場合は削除できます。

## インストールのトラブルシューティング {#troubleshooting-installation}

**拡張機能が表示されない** - Extensions の設定で有効になっているか確認し、Blender のバージョンがサポート対象（4.2 LTS から 5.4）であることを確認し、**Blender を完全に再起動**してください。

**インストール中にエラーが発生する** - Blender のバージョンがサポート対象（4.2 LTS から 5.4）であることを確認し、ZIP が破損している可能性があるため再ダウンロードし、extensions フォルダーへの書き込み権限があるか確認してください。

**Cats タブがない** - **N** を押し、拡張機能が有効であることを確認し、コンソール（Window > Toggle System Console）でエラーを確認してください。

**MMD Tools を別途インストールしないでください** - Cats は独自の MMD Tools を同梱しています。別途インストールすると競合します。単体の MMD Tools がインストールされている場合は削除してください。私たちはこれを常に最新に保つよう努めていますが、自分で更新することもできます。

**以前に古いバージョンをインストールした** - それを削除し、**Blender を再起動**してから新しいバージョンをインストールしてください。

## 次のステップ {#next-steps}

- 基本については [Quick Access](./Quick-Access.md) ガイドを読んでください。
- [Interface Guides](./Overview.md#interface-guides) を参照してください。
- 問題が発生した場合は [FAQ](./FAQ.md) と [Troubleshooting](./Troubleshooting.md) を確認してください。

---

**サポートが必要ですか?** [Troubleshooting](./Troubleshooting.md) ページを参照するか、[リポジトリ](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial)で issue を開いてください。

---

