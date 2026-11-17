# コンバーター

**Converters** パネル（旧 "MMD Options"）は、モデルをあるリグや形式から別のものへ変換するツールと、MMD 固有のクリーンアップのための場所です。インポートしたばかりのモデルを Unity や VRChat 向けに準備する場所でもあります。

これには 3 つの領域があります。

1. **Rigify 変換** - Rigify/Metarig アーマチュアを Cats 互換のものに変換します
2. **プラットフォーム変換** - Source/Valve のボーン名と Koikatsu のシェイプキー修正
3. **MMD クリーンアップ** - Fix MMD Model と剛体/ジョイントの削除

---

## Rigify → Cats

**Convert Rigify to Cats** ボタンは常に表示されますが、**Rigify または Metarig のアーマチュアがアクティブになるまでグレー表示**になります。Cats がそれを検出すると情報ボックスが表示され、ボタンが使用可能になります。

Fix MMD Model は Rigify リグを直接処理できないため、まず変換してから通常のワークフローを続けてください。

**オプション:**
- **Merge Twist Bones** - 変換時に Rigify のツイストボーンを親に統合します。

**使用方法:**
1. Rigify/Metarig のアーマチュアを選択します。
2. ボタンが点灯したら **Convert Rigify to Cats** をクリックします。
3. ワークフローの残りを続けます。

---

## プラットフォーム変換

### Convert Bones To Valve

アーマチュアの主要なボーンを、Source エンジン（Source Filmmaker、GMod など）で使われる **ValveBiped** の命名規則にリネームします。たとえば `hips` は `ValveBiped.Bip01_Pelvis` になります。GMod の変換スクリプトが必要とするため、指のボーンもリネームされます。

これはボン名を変更するだけで、階層やレストポーズは変更しません。

**必要条件:** モデルにまず CATS 標準のボーン名が必要なので、その前に **Fix MMD Model** を実行してください。

**使用するタイミング:** Source Engine / Valve のゲームへエクスポートする場合。

> ⚠ **古い Cats で変換した場合、右側のボーンを確認してください。**
>
> 古いバージョンでは 7 つの短縮形の右側名が**左**側にマッピングされていたため、`R_Shoulder`、`R_Arm`、`R_Elbow`、`R_Wrist`、`R_Leg`、`R_Knee`、`R_Ankle` という名前のボーンが `ValveBiped.Bip01_L_*` として出力されていました。綴りを省略しない CATS 名（`Right shoulder`、`Right arm` など）を使っているモデルは影響を受けていません。
>
> 修正するには、モデルの**新しいコピー**に対してコンバーターを再実行してください。すでにエクスポートした FBX は修復できませんし、すでに誤った名前になっているアーマチュアに再実行しても効果はありません。ValveBiped の名前が、ツールが探すどの名前とも一致しなくなるためです。

### Fix Koikatsu Shapekeys

**Koikatsu / Illusion** のエクスポートが生成する分割されたシェイプキーを整理します。Koikatsu は 1 つの表情を複数のキーに分散させるため（`eye_face.fXX` と `eye_siroL`/`eye_line_u`、`kuti_face.fXX` と `kuti_ha`/`kuti_sita`）、そのままでは使用できません。

このツールは一致する各グループを単一の `eyes_XX` または `mouth_XX` シェイプキーに結合し、スライダーを妥当な最大値に制限し、消費した元のキーを削除します。

**使用するタイミング:** インポートしたばかりの Koikatsu モデルで、[visemes](Visemes) を設定する前。

---

## MMD クリーンアップ

### Fix MMD Model

これは、インポートしたばかりの MMD/VRM モデルを Unity/VRChat 対応のリグに変換するための主要なツールです。

> ⚠ **警告: Fix MMD Model は、Unity 向けの設定がまだされていない、新しくインポートした MMD / VRM 専用です。**
>
> **次の場合は使用しないでください:**
> - Booth、Gumroad などのストアで購入したモデルの場合
> - すでに Unity/VRChat 向けに設定済みのモデルの場合
> - ゼロから独自のカスタムモデルを制作している場合
>
> Fix Model は決して「何でも直す」ボタンではありません。特定のインポート形式のためのコンバーターです。同じ警告は、このボタンがある [Quick Access](Quick-Access) でも表示されます。

> 🚫 **これらの警告を無視する場合は自己責任です。** 新しくインポートした MMD/VRM 以外のものに対して Fix MMD Model を実行し、Cats とこの wiki が示すすべての警告を無視した場合、それは完全にあなたの責任です。**それについて issue を開かないでください**。これらの警告へ案内され、即座にクローズされます。

> 💡 ボタンの隣にある **⚙ 設定ギア**をクリックすると **Model Settings**（エンドボーンを保持、ツイストボーンを保持、メッシュを結合、ボーンを接続、ゼロウェイトを削除、保護ボーンなど）が開きます。詳細は [Settings](Settings) を参照してください。

#### 動作内容

1. **ボーンの親子関係を再設定** - Unity 向けに階層を再構成します
2. **不要なボーンを削除** - MMD 固有のボーンや未使用のボーンを取り除きます
3. **リネームと翻訳** - 日本語 → 英語、標準化された名前（[Translation](Translation)）。`5.2.4.0` 以降、シェイプキーとマテリアルは PMX ファイル内の**作者の英語名**を使用できます。シェイプキーの設定は ⚙ Model Settings にあります
4. **ウェイトペイントを結合** - 頂点のウェイトを再分配します
5. **腰を回転** - Unity 向けに腰の回転を補正します
6. **コンストレイントを削除** - MMD 固有のコンストレイント/IK をクリアします
7. **未使用の頂点グループを削除** - 空のウェイトグループを整理します
8. **モーフをシェイプキーに変換**

#### 使用方法

1. [Quick Access](Quick-Access) から新しい MMD または VRM モデルをインポートします。
2. アーマチュアを選択します。
3. **Fix MMD Model** をクリックします（Converters または Quick Access 内）。
4. 完了するまで待ちます（複雑なモデルでは 1 分ほどかかることがあります）。
5. 結果を確認します。

### Remove Rigid Bodies and Joints

MMD の物理コンポーネント（剛体 + ジョイントコンストレイント）を削除します。VRChat は Unity の物理を使用するため、MMD の物理は互換性がなく、削除する必要があります。

**使用方法:** モデルを選択し、**Remove Rigid Bodies and Joints** をクリックします。

**一致対象:** モデル下にあるオブジェクトで、名前に `rigidbodies` または `joints` を含むもの（大文字小文字は問いません）。`Rigidbodies`、`RIGIDBODIES`、`rigidbodies` はすべて対象になります。一致判定はモデルの最上位の親から 1 階層および 2 階層下まで実行され、一致したものを削除するとそのサブツリー全体が削除されるため、ネストした物理グループも 1 回で処理されます。

> 💡 **これはグローバル設定とは異なるもので、引き続き必要です。** [Settings](Settings) の **Remove Rigidbodies + Joints** はデフォルトで有効で、Cats のボタンを押すたびに実行されますが、`rigidbody` という名前の*コレクション*全体を削除するだけで、ジョイントは見ませんし、単独のオブジェクトも見ません。このボタンはモデル下にペアレントされた*オブジェクト*に対して動作し、ジョイントも捕捉します。MMD のインポートでは引き続きこれを使用してください。

---

## 典型的な MMD → VRChat ワークフロー

1. [Quick Access](Quick-Access) から `.pmx`/`.pmd`/`.vrm` を**インポート**します。
2. **Fix MMD Model** を実行します（Converters または Quick Access）。
3. **Remove Rigid Bodies and Joints** を実行します。
4. **マテリアルを結合**し、その他のクリーンアップを行います（[Optimization](Optimization)）。
5. **最適化** - アトラス化、ボーン結合、重複頂点の削除。
6. [Eye Tracking](Eye-Tracking) と [Visemes](Visemes) を設定します。
7. [Quick Access](Quick-Access) から Unity 用の FBX を**エクスポート**し、Unity でマテリアルを設定します。

---

## よくある問題

**Fix MMD Model の後にモデルが壊れて見える** おそらくすでに Unity 対応のモデルです。元に戻し（Ctrl+Z）、元のモデルを再インポートして、Fix MMD Model を実行しないでください。

**ボーンが奇妙な名前/英語名になっている** これは想定どおりです。VRChat 向けに名前が翻訳され標準化されています。

**一部のマテリアルが黒い** 通常は問題ありません。Unity でマテリアルを設定してください。[Optimization](Optimization) の **Convert All to PNG** を試すこともできます。

**Blender でモデルが回転して見える** Blender と Unity は異なる座標系を使用しています。エクスポート時に処理されるため、Unity では正しくなります。

---

## VRM に関する注意

VRM モデルは一般的に MMD モデルと同じ扱いが必要です。
- 新しい VRM ファイル（VRoid のエクスポートなど）には **Fix MMD Model** を実行します
- すでに処理済みの VRM モデルには Fix MMD Model を実行しないでください

VRM 専用のシェイプキーツールはありません。**Fix Koikatsu Shapekeys** は Koikatsu のエクスポート専用です。上記の注意を参照してください。

Cats は **VRM Add-on for Blender** と併用できます。`.vrm` のインポートにそれを使い、その後 Cats で処理と最適化を行ってください。

---

**関連ページ:**
- [Quick Access](Quick-Access) - インポート/エクスポート、およびもう 1 つの Fix MMD Model ボタン
- [Optimization](Optimization) - 変換後の最適化
- [Translation](Translation) - 名前の翻訳
- [Visemes](Visemes) / [Eye Tracking](Eye-Tracking) - アバター機能の設定

---

