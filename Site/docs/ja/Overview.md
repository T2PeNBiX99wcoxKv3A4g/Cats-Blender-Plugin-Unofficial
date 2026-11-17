> ℹ **これらのページは Cats Blender Plugin の機能セットを説明しています。** このフォークが引き継いでいる上流のリリース向けに書かれたものです。このビルドは Blender 4.2 LTS から 5.4 をサポートします。
>

# Cats Blender Plugin - Wiki

非公式のコミュニティによる継続プロジェクトとして維持されている **Cats Blender Plugin** のドキュメントへようこそ。

Cats は、VRChat やその他のプラットフォーム向けにモデルをインポートして最適化するために必要な手順を短縮するために設計されたツールです。MMD、XNALara、Mixamo、Source Engine、VRM、glTF/GLB、FBX、DAE など、幅広い形式をサポートしています。

## バージョンサポート

| | |
|---|---|
| **サポートされる Blender** | **4.2 LTS** から **5.4** |
| **推奨** | **Blender 5.2 LTS** |


## クイックリンク

### はじめに
- [Installation](Installation) - Cats と任意のアドオンのインストール方法
- [Version Support](Version-Support) - サポートされるバージョンとサポート終了バージョン

### インターフェースガイド
- [Quick Access](Quick-Access) - インポート/エクスポート、**Fix MMD Model**、クイックアクション、ポーズモード
- [Optimization](Optimization) - マテリアル、メッシュのクリーンアップ、シェイプキー、ボーンとウェイト、内蔵のアトラスジェネレーター（アルファ）
- [Converters](Converters) - Rigify、Source/Valve、VRM、MMD のクリーンアップ（旧 "MMD Options"）
- [Merge & Attach](Merge-and-Attach) - アーマチュアの結合とメッシュのアタッチ（旧 "Custom Model Creation"）
- [Translation](Translation) - 新しいマルチサービスの翻訳システム
- [Bone Tools](Bone-Tools) - デジティグレード脚とツイストボーン
- [UV Tools](UV-Tools) - UV エッジの整列と最短シーム経路の探索
- [Visemes](Visemes) - リップシンクの設定
- [Eye Tracking](Eye-Tracking) - 目の動きとまばたきの設定
- [Bone Parenting](Bone-Parenting) - ルートボーンの管理
- [Scaling](Scaling) - 内蔵のアバター再スケーリング、指の開き、スケールのマッチング
- [Settings](Settings) - プラグインの構成とアップデート

### ヘルプとサポート
- [Troubleshooting](Troubleshooting) - よくある問題と解決策
- [FAQ](FAQ) - よくある質問

## 5.3.1.0 の新機能

- **Blender 4.2 LTS 以降** - 4.2 LTS から 5.4 をサポートします。[Version Support](Version-Support) を参照してください。
- **Material Combiner の削除** - *Atlas Generator (Legacy)* パネルは削除されました。内蔵ツールは単に **[Atlas Generator](Optimization#atlas-generator)** になりました。**Import Material Combiner Settings** は、Material Combiner がインストールされている場合に古い設定を引き続きコピーします。
- **アトラスの修正** - 各ビルドが独自の名前を持つようになったため、2 つ目のアバターをアトラス化しても 1 つ目のアトラスが上書きされなくなりました（フォルダーへの保存でも既存の PNG を上書きしません）。フラットカラーやティントされたマテリアルが暗すぎず正しい色で出力されるようになりました。リンクされた重複メッシュが二重にリマップされなくなり、オブジェクト間で共有されるベイク済みマテリアルがすべてのオブジェクトの面を保持し、ベイクは常に画像テクスチャを対象とし（頂点カラーではありません）、フォルダーへの保存に失敗した場合はアトラスを失う代わりに .blend にパックします。大規模なビルドではメモリ使用量が大幅に減り、縮小されたテクスチャのエイリアシングも少なくなりました。
- **API キーは .blend ファイルに残りません** - DeepL / LibreTranslate のキー、LibreTranslate の URL、MyMemory のメールは Cats 独自の設定ファイルにのみ保存され、古いファイルに保存されていたキーはファイルを開いたときに削除されます。[Translation](Translation) を参照してください。
- **言語の変更は Cats のみを再読み込み**し、すべてのアドオンを再読み込みしません。また、破損した、またはダウンロードが途中の翻訳ファイルで Cats の読み込みが止まることはなくなり、同梱ファイルまたは英語にフォールバックします。
- **Cats は読み込み時に Blender の設定を変更しなくなり**、Cats の設定は .blend を開くたびに再適用されます。
- **Blender バージョンをまたぐアップデート** - アップデーターは、お使いの Blender バージョン向けのものだけでなく、すべてのリリースを一覧表示します。お使いのバージョンで実行できないものは Blender 自体がブロックします。
- **修正** - Blender 5.x での VMD モーションムーポート、F9 でのやり直し時にスケーラーツールがクラッシュする問題、セッション中に複数回実行すると Remove Doubles がシェイプキーを破損する問題、再読み込み後に一部のパネルやオペレーターが欠落する問題です。
- **Support Us** ボタンが Credits パネルから削除されました。

## 5.2.4.0 の新機能

- **内蔵のアトラスツール（アルファ）** - Material Combiner や Pillow なしでアトラス化する新しい **[Atlas Generator (New)](Optimization#atlas-generator)** サブパネル。1 つのレイアウトからアルベドと、任意でノーマル、エミッション、ラフネス、メタリック、AO、ハイトマップを生成し、セルをエッジ拡張でパディングしてミップレベルのにじみを防ぎ、Cycles でプロシージャルマテリアルをベイクできます。**当面は Material Combiner がデフォルトのまま**で、Blender 5.3 のリリースで削除されます。
- **MMD 作者の英語名** - モデルの作者が PMX ファイルに保存した英語名が翻訳時に使用されるようになりました。シェイプキーは辞書 → 作者名 → オンラインサービスの順で処理され、[Translation](Translation#author-names-mmd) の新しい **Author Names** 設定（**Fill Gaps** / **Prefer Author Names** / **Off**）で制御され、Fix MMD Model にも反映されます。マテリアルはデフォルトでこれらを使用し、切り替え可能です。ボーンとオブジェクトは変更されません。Fix MMD Model は MMD ルートを削除する前に名前を保持し、翻訳 CSV のエクスポートには *source* 列が追加されます。テストは限定的で、フィードバックを求めています。
- **MMD Tools 4.5.14** を同梱。
- ライセンス表記を全体にわたり MIT に修正。

## 5.2.3.0 の新機能

- **インターフェースの再編成** - ツールが期待される場所に配置されるようパネルが再構成されました。**Fix MMD Model** は [Quick Access](Quick-Access) の最上部にあり、すべての形式変換は単一の [Converters](Converters) パネルに移動しました。
- **新しい翻訳システム** - プラグイン可能な [Translation](Translation) バックエンドにより、内部辞書、Google、DeepL、LibreTranslate、MyMemory から選択できます。旧来の同梱 Google モジュールは削除されました。
- **[UV Tools](UV-Tools)** - *Align UV Edges to Target* と *Find Shortest Seam Path* を備えた新しいパネル。
- **[Bone Tools](Bone-Tools)** - デジティグレード脚とツイストボーンの生成に専用の場所ができました。
- **glTF / GLB のインポート**と統合された Rigify 検出。
- **Blender 5.1 & 5.2** をサポート（5.2 LTS を推奨）。

## 主な機能

- **モデルのインポート/エクスポート** - MMD、XNALara、Source、VRM、glTF/GLB、FBX、DAE など
- **Fix MMD Model** - 新しくインポートした MMD/VRM を Unity/VRChat 向けにワンクリックで変換
- **最適化** - マテリアルの結合、テクスチャのアトラス化（内蔵、追加アドオン不要）、ボーンの結合、重複頂点の削除
- **コンバーター** - Rigify → Cats、Source/Valve、VRM の修正、MMD のクリーンアップ
- **マージとアタッチ** - アーマチュアの結合とメッシュのアタッチ
- **翻訳** - まず内部辞書を使用し、不足分は任意のオンラインサービスで補完
- **アイトラッキングと Visemes** - VRChat アバター向けの自動セットアップ
- **UV & ボーンツール** - 目的別のメッシュ/リグ補助ツール

## コミュニティとサポート

- **ソースとリリース:** [GitHub](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial)

> 私たちは Discord サーバーやウェブサイトを運営していません。サポート、バグ報告、議論はすべて上記の Git リポジトリで行われます。

## コントリビューション

コントリビューションを歓迎します! Cats の改善に協力いただける場合は、[リポジトリ](https://github.com/T2PeNBiX99wcoxKv3A4g/Cats-Blender-Plugin-Unofficial)でプルリクエストを開いてください。

---

