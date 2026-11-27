# よくある質問（FAQ） {#frequently-asked-questions-faq}

Blender 4.2 LTS から 5.4 向けの Cats Blender Plugin に関するよくある質問です。

## 一般的な質問 {#general-questions}

### Cats Blender Plugin とは何ですか? {#what-is-cats-blender-plugin}

Cats は、VRChat 向けにモデルをインポートして最適化するために必要な手順を短縮するために設計されたツールです。MMD、XNALara、Source Engine、VRM など、さまざまなモデル形式をサポートしています。

### これは公式の Cats プラグインですか? {#is-this-the-official-cats-plugin}

これはコミュニティによって維持されている**非公式の Cats プラグイン**です。元の公式 Cats プラグインは 2022 年以降放棄されています。このバージョンは、最新の Blender バージョンのサポートとともに活発な開発を続けています。

詳細は [公式 Cats の状況はどうなっていますか?](#what-is-the-status-of-official-cats) を参照してください

### 必要な Blender のバージョンは? {#what-blender-version-do-i-need}

Cats には **Blender 4.2 LTS 以降**が必要です。4.2 LTS から 5.4 をサポートします。Blender 4.1 以前は拡張機能を読み込めません。詳細は [Version Support](./Version-Support.md) を参照してください。

また、サポートするのは Steam 版と blender.org 版のみです。Windows Store 版、Linux のパッケージマネージャー版、snap ストア版、flatpak 版の Blender はサポートされません。

### Cats は無料ですか? {#is-cats-free}

はい、Cats は完全に無料で、MIT ライセンスのオープンソースです。

### Cats はどこからダウンロードできますか? {#where-can-i-download-cats}

- **リポジトリとリリース:** [GitHub](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/releases)

---

## インストールに関する質問 {#installation-questions}

### Cats のインストール方法は? {#how-do-i-install-cats}

完全な [Installation](./Installation.md) ガイドを参照してください。簡単な手順:
1. ZIP ファイルをダウンロードします（展開しないでください）
2. Blender 5.2 以降を開きます
3. Edit > Preferences > Extensions
4. Install from Disk
5. ZIP ファイルを選択します
6. 拡張機能を有効にします

### インストール後に Blender を再起動する必要がありますか? {#do-i-need-to-restart-blender-after-installation}

はい、最良の結果を得るため、Cats のインストールまたは更新後に Blender を再起動することを推奨します。

### Cats を複数のバージョン同時にインストールできますか? {#can-i-have-multiple-versions-of-cats-installed}

いいえ、Cats は 1 つのバージョンだけインストールしてください。新しいバージョンをインストールする前に古いバージョンを削除してください。

### 設定はどこに保存されますか? {#where-are-my-settings-saved}

設定は `.blend` ファイル内ではなく Cats 独自のユーザーデータフォルダーに保存されるため、Cats のアップデート後も存続します。正確な場所は [Settings](./Settings.md#settings-file-location) を参照してください。

---

## 互換性に関する質問 {#compatibility-questions}

### Cats は Blender 4.x で動作しますか? {#does-cats-work-on-blender-4x}

Cats は Blender 4.2 LTS から 5.4 で動作します。Blender 4.1 以前は拡張機能を読み込めず、それら向けの代替ビルドもありません。

### Blender 5.2 / 5.3 のファイルを古い Blender バージョンで開けますか? {#can-i-open-blender-52-53-files-in-older-blender-versions}

推奨しません。Blender 5.2 / 5.3 で保存したファイルは古いバージョンで正しく開けない可能性があり、データの損失やクラッシュを引き起こすことがあります。

### Cats はどのモデル形式をサポートしていますか? {#what-model-formats-does-cats-support}

**インポート形式:**
- MMD: `.pmx`、`.pmd`
- XNALara: `.xps`、`.mesh`、`.ascii`
- Source Engine: `.smd`、`.qc`、`.vta`、`.dmx`
- VRM: `.vrm`
- FBX: `.fbx`
- Collada: `.dae`
- モデルを含む ZIP アーカイブ

**エクスポート形式:**
- FBX（Unity/VRChat 向け）
- GLTF（Resonite 向け）

---

## 機能に関する質問 {#feature-questions}

### ポーズモードが表示されません {#can-i-see-pose-mode}

ポーズモードは、次の場合にのみ [Quick Access](./Quick-Access.md) パネルに表示されます。
- モデルがインポートされている
- モデルに有効なアーマチュアがある

まずモデルをインポートすると、ポーズモードのオプションが表示されます。

### アトラス機能を使えないのはなぜですか? {#why-cant-i-use-the-atlas-feature}

[Atlas Generator](./Optimization.md#atlas-generator) は Cats に内蔵されており、何もインストールする必要はありません。まだ**アルファ**版とされています。動作しますが、エクスポート前に結果を確認してください。

Shotariya Material Combiner アドオンを必要とした旧 **Atlas Generator (Legacy)** パネルは **`5.3.1.0` で削除**されました。それを探している場合は、代わりに Atlas Generator を使用してください。Material Combiner がインストールされている場合、その **Import Material Combiner Settings** ボタンが古い設定をコピーします。

### スケーリング機能を使えないのはなぜですか? {#why-cant-i-use-the-scaling-feature}

スケーリングは Cats に内蔵されており、Immersive Scaler やその他のアドオンはもう必要ありません。ボタンがグレー表示される場合、Cats がアーマチュアを見つけられていません。Cats のアーマチュアドロップダウンでアバターのアーマチュアを選択するか、アクティブオブジェクトにしてください。[Scaling](./Scaling.md#common-scale-issues) を参照してください。

### Booth のアバターに Fix MMD Model を使うべきですか? {#should-i-use-fix-mmd-model-on-my-booth-avatar}

**いいえ!** Fix MMD Model は、新しく未処理の MMD/VRM ファイルにのみ使用してください。次のものには使用しないでください。
- ストアで購入したモデル（Booth、Gumroad など）
- すでに Unity 向けに設定済みのモデル
- 作成中のカスタムモデル

詳細は [Converters](./Converters.md) を参照してください。

---

## ワークフローに関する質問 {#workflow-questions}

### どの順序で作業すればよいですか? {#what-order-should-i-do-things-in}

推奨するワークフロー:

1. モデルを**インポート**します
2. **Fix MMD Model** を実行します（新規の MMD/VRM のみ）
3. 名前を英語に**翻訳**します
4. 必要に応じて**トランスフォームを適用**します
5. 正しい身長に**スケーリング**します
6. **マテリアルを結合 / アトラスを作成**します
7. **アイトラッキングを設定**します
8. **visemes を設定**します
9. **最適化**します（ボーンの結合、クリーンアップ）
10. **エクスポート**します

**重要:** アイトラッキングと visemes の**前に**マテリアルを結合/アトラスを作成してください!

### なぜアイトラッキングと visemes の前にアトラス化するのですか? {#why-should-i-atlas-before-eye-tracking-and-visemes}

次の設定の**前に**マテリアルの結合とアトラス化を行ってください。
- アイトラッキング
- visemes
- その他のシェイプキーの設定

旧 Material Combiner アドオンは、これらの後に実行するとシェイプキーがずれる可能性がありました。内蔵の Atlas Generator はマテリアルと UV のみを変更しますが、マテリアル作業を最初に行うことでワークフローが予測可能になります。常にマテリアルを最初に扱ってください!

### VRChat 用にモデルを準備するには? {#how-do-i-prepare-a-model-for-vrchat}

1. Cats を使用してインポートします
2. Fix MMD Model を実行します（該当する場合のみ、VRM または MMD モデルの場合）
3. 英語に翻訳します
4. 160-180cm にスケーリングします
5. マテリアルとボーンを最適化します
6. アイトラッキングを設定します（任意）
7. visemes を設定します（任意）
8. Unity 用の FBX をエクスポートします
9. Unity にインポートし、そこでマテリアルを設定します

---

## トラブルシューティングの質問 {#troubleshooting-questions}

### インストール後に Cats が表示されないのはなぜですか? {#why-doesnt-cats-show-up-after-installation}

よくある原因:
- 拡張機能が有効になっていません（Preferences > Extensions を確認）
- Blender が再起動されていません
- Blender に対して間違った Cats のバージョン
- サイドバーが非表示です（3D ビューポートで N を押してください）

詳細な解決策は [Troubleshooting](./Troubleshooting.md#extension-doesnt-appear-after-installation) を参照してください。

### モデルが黒い、またはテクスチャがないのはなぜですか? {#why-is-my-model-blackhas-no-textures}

よくある原因:
- ビューポートのシェーディングモードが間違っています（Z を押して Material Preview を選択してください）
- テクスチャが適切にリンクされていません
- アトラス化後: アトラスのマテリアルは単純な Principled BSDF です（代わりに Unity でマテリアルを設定してください）

解決策は [Troubleshooting](./Troubleshooting.md#model-appears-black-or-no-textures) を参照してください。

### VRChat でアバターが大きすぎる/小さすぎるのはなぜですか? {#why-does-my-avatar-look-too-bigsmall-in-vrchat}

- [Scaling](./Scaling.md) パネルを使用して Blender でスケールを確認します
- 推奨する身長: 160-180cm
- エクスポートの前にトランスフォームを適用します
- Unity のインポートスケールが 1.0 であることを確認します

### このポリシー違反の警告は何ですか? {#what-are-these-policy-violation-warnings}

これらの警告は、Cats が MMD Tools などのサードパーティのアドオンを読み込むためにレガシーな方法を使用しているため、Blender 5.2 / 5.3 で表示されます。**これらの警告は想定されたもので、無視しても安全です**。すべて正しく動作します。

---

## 最適化に関する質問 {#optimization-questions}

### アバターのポリゴン数を減らすには? {#how-do-i-reduce-my-avatars-polygon-count}

1. [Optimization](./Optimization.md) パネルの Remove Doubles を使用します
2. デシメーションには Tuxedo Blender Plugin を使用します
3. メッシュを結合します
4. 不要なメッシュのディテールを手動で削除します

### ドローコールを減らすには? {#how-do-i-reduce-draw-calls}

1. [Optimization](./Optimization.md) で**マテリアルを結合**します
2. 内蔵の [Atlas Generator](./Optimization.md#atlas-generator) で**テクスチャアトラスを作成**します
3. **メッシュを結合**します
4. 個別のマテリアルの数を減らします

### ボーン数を減らすには? {#how-do-i-reduce-bone-count}

Optimization パネルの [Bones & Weights](./Optimization.md#bones-weights) を使用します。
- 結合比率 0.5 から始めます
- 安全のため "Keep Merged Bones" を有効にします
- クリーンアップ操作を実行する前にテストします
- 結合後にゼロウェイトのボーンを削除します

### マテリアルの結合とアトラスの作成の違いは? {#whats-the-difference-between-combining-materials-and-creating-an-atlas}

- **Combine Materials:** 同じプロパティのマテリアルを 1 つに結合します
- **Create Atlas:** 複数のテクスチャを 1 つの大きなテクスチャに結合します
- 通常、アトラスの方がパフォーマンスの向上が大きくなります
- どちらもドローコールを削減します

---

## 技術的な質問 {#technical-questions}

### Cats は Steam/Microsoft Store 版の Blender で動作しますか? {#does-cats-work-with-steammicrosoft-store-blender}

Cats は動作する可能性がありますが、代わりに **blender.org から Blender をダウンロードすることを推奨します**。
- Steam 版: 一部のユーザーが問題を報告しています
- Microsoft Store 版: 権限の問題が知られています
- 公式ダウンロード: 最も信頼できます

### Cats はオフラインで使用できますか? {#can-i-use-cats-offline}

はい、以下を除きます。
- オンライン翻訳サービス（Google、DeepL、LibreTranslate、MyMemory）。内部辞書はオフラインで動作します。
- 最新の翻訳のダウンロード
- アップデートチェッカー（アップデートの確認にはインターネットが必要です）
- それ以外はすべてオフラインで動作します

Cats は Blender の **Edit > Preferences > System > Network > Allow Online Access** 設定に従います。オフの場合、Cats はネットワーク接続を一切行いません。アップデート確認はスキップされ、翻訳のダウンロードは拒否され、翻訳は内部辞書にフォールバックします。

### Cats はデータを収集しますか? {#does-cats-collect-any-data}

いいえ。Cats はユーザーデータを収集、送信、保存しません。ネットワーク接続は次のものだけです。
- 選択したオンライン翻訳サービス（翻訳機能を使用した場合のみ）- [Translation](./Translation.md) を参照
- アップデートサーバー（アップデートを確認するとき）
- このリポジトリの翻訳ファイル（最新の翻訳のダウンロードをクリックしたときのみ）

これらはいずれも Blender の **Allow Online Access** がオフの間は発生しません。

### 翻訳の API キーは .blend ファイルに保存されますか? {#are-my-translation-api-keys-saved-in-my-blend-files}

いいえ。`5.3.1.0` 以降、DeepL / LibreTranslate の API キー、LibreTranslate の URL、MyMemory のメールは Cats 独自の設定ファイルにのみ保存され、`.blend` には決して保存されないため、ファイルを共有してもキーが共有されることはありません。古いバージョンがファイルに保存したキーは、ファイルを開いたときに削除されます。確実にするにはファイルを再度保存してください。古いバージョンで作成したファイルをすでに共有している場合は、API キーの変更を検討してください。

### Cats はまだメンテナンスされていますか? {#is-cats-still-maintained}

はい。Cats はコミュニティによって維持され、**Blender 4.2 LTS から 5.4**（5.2 LTS 推奨）をサポートしています。開発は[リポジトリ](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial)で行われています。

---

## アップデートに関する質問 {#update-questions}

### Cats を更新するには? {#how-do-i-update-cats}

1. [リポジトリのリリース](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/releases)から新しいバージョンをダウンロードします
2. Blender を閉じます
3. 古い Cats のバージョンを削除します（Preferences > Extensions）
4. Blender を再起動します
5. 新しいバージョンをインストールします
6. 拡張機能を有効にします

詳細は [Settings](./Settings.md#installing-updates) を参照してください。

### どのくらいの頻度で更新すべきですか? {#how-often-should-i-update}

次の場合に更新してください。
- 望む新機能がリリースされた
- 経験している問題のバグ修正が行われた
- Blender の大きなアップデートがあった
- セキュリティアップデートが発表された（リポジトリで告知されます）

### 更新すると既存のプロジェクトが壊れますか? {#will-updating-break-my-existing-projects}

通常は壊れませんが:
- 更新の前に必ずプロジェクトをバックアップしてください
- 重要でないファイルで先にテストしてください
- 破壊的変更についてはリリースノートを読んでください
- 必要に応じて古いバージョンに戻せます

---

## 元の Cats に関する質問 {#original-cats-questions}

### 公式 Cats の状況はどうなっていますか? {#what-is-the-status-of-official-cats}

**公式 Cats Blender Plugin は放棄されています。** 経緯:

- **最終リリース:** 2021 年 6 月 27 日
- **最後のメインアップデート:** 2022 年 1 月 25 日
- **現在の状況:** 2024 年時点で 100% 放棄

**何が起こったか:**
- 元の開発者（Absolute Quantum/Hotox）がインターネットから姿を消しました
- 複数回の試みにもかかわらず連絡が取れません
- Patreon は Neoneko が Patreon の安全チームと協力して削除するまで支払いを続けていました（6 か月以上かかりました）
- 3 年以上アップデートがありません
- サポートやコミュニケーションがありません

**非公式 Cats:**
- コミュニティによって維持されています
- 最新の Blender バージョンをサポートしています
- 定期的なアップデートとバグ修正
- 活発なコミュニティサポート

### 古いチュートリアル動画を使うべきですか? {#should-i-use-old-tutorial-videos}

古いチュートリアルには注意してください。
- 多くが古い公式 Cats を使用しています
- UI が大幅に変わっています
- 一部の助言は古い、または誤っています
- 非公式 Cats と Blender 5.2 以降を使用しているチュートリアルを探してください

**古いチュートリアルによくある悪い助言:**
- コードを手動で編集する（決して必要ありません）
- コードから "Testing" を削除する（動作を壊します）
- 互換性のない Cats のバージョンを使用する
- 古いワークフロー

### 認知度を広めるにはどう協力できますか? {#how-can-i-help-spread-awareness}

1. **YouTube の動画にコメントする:**
   - その動画が古い Cats を使用している場合は指摘します
   - 非公式 Cats へのリンクを共有します
   - Blender 5.2 / 5.3 のサポートに言及します

2. **フォーラムの投稿を更新する:**
   - 古い情報を訂正します
   - 現在のドキュメントにリンクします
   - 成功事例を共有します

3. **コンテンツを作成する:**
   - 更新されたチュートリアルを作成します
   - ガイドを書きます
   - ソーシャルメディアで共有します

---

## プラットフォーム固有の質問 {#platform-specific-questions}

### Cats は VRChat 以外のプラットフォームでも動作しますか? {#does-cats-work-for-platforms-other-than-vrchat}

はい! Cats は次のもので動作します。
- **VRChat** - 主な対象
- **ChilloutVR** - 互換性のあるワークフロー
- **Resonite** - 専用のエクスポートオプションがあります
- **その他の VR プラットフォーム** - 概ね互換性があります
- **一般的な 3D 用途** - 最適化ツールはどこでも役立ちます

### Cats は Quest アバターで動作しますか? {#does-cats-work-with-quest-avatars}

はい、最適化ツールは特に Quest に役立ちます。
- マテリアルの結合とアトラス化
- ボーンの結合
- ポリゴンの削減（他のツールと併用）
- いずれも Quest の制限を満たすのに役立ちます

### Cats を VR 以外のモデルに使用できますか? {#can-i-use-cats-for-non-vr-models}

はい! 多くの機能はあらゆる 3D ワークフローに役立ちます。
- モデルのインポート
- アーマチュアの結合
- マテリアルの最適化
- 翻訳ツール
- 一般的なメッシュ操作

---

## 高度な質問 {#advanced-questions}

### Cats を改造できますか? {#can-i-modify-cats}

はい! Cats はオープンソースです（MIT ライセンス）。
- GitHub でソースを閲覧できます
- 個人利用のために改造できます
- 改善を提供できます
- カスタムバージョンのためにフォークできます

### バグを報告するには? {#how-do-i-report-bugs}

1. まず [Troubleshooting](./Troubleshooting.md) を確認します
2. GitHub の issue で同様の報告を検索します
3. 新しいバグの場合は、次の情報を含めて GitHub の issue を開きます。
   - Cats のバージョン
   - Blender のバージョン
   - 再現手順
   - 期待される動作と実際の動作
   - エラーメッセージ/スクリーンショット

### コントリビュートするには? {#how-can-i-contribute}

いくつかの方法があります。
- バグを報告する
- 機能を提案する（まず議論してください）
- プルリクエストを送る
- 翻訳を手伝う
- ドキュメントを書く

すべては[リポジトリ](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial)で行われます。

### 機能のリクエストはどこでできますか? {#where-can-i-request-features}

1. [リポジトリ](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/issues)で issue を開きます
2. その機能がすでに計画されているか確認します
3. 用途を具体的に説明します
4. 実装されない可能性があることを理解してください

---

## サポートを受ける {#getting-help}

### どこで質問できますか? {#where-can-i-ask-questions}

- **この Wiki** - 機能ガイドとトラブルシューティング
- **[リポジトリの issue](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/issues)** - バグ報告と質問

> 私たちは Discord サーバーやウェブサイトを運営していません。すべてのサポートはリポジトリで行われます。

### 助けを求めるときにはどの情報を含めるべきですか? {#what-information-should-i-include-when-asking-for-help}

- Blender のバージョン（正確に）
- Cats のバージョン（正確に）
- 何をしようとしているか
- 代わりに何が起こるか
- エラーメッセージ（全文）
- 関連する場合はスクリーンショット
- 再現手順

### ここに答えがない質問があります {#my-question-isnt-answered-here}

次を確認してください。
1. この wiki の関連する機能ページ
2. [Troubleshooting](./Troubleshooting.md) ページ
3. [リポジトリ](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial/issues)の既存の issue を検索
4. まだ文書化されていない場合は新しい issue を開く

---

**関連ページ:**
- [Installation](./Installation.md) - セットアップガイド
- [Troubleshooting](./Troubleshooting.md) - 問題の解決
- [Version Support](./Version-Support.md) - 互換性の情報
- 特定のツールの各機能ページ

---

