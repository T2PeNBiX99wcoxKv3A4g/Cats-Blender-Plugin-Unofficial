# クイックアクセス

**Quick Access** パネルは最上部のパネルで、作業の出発点です。最もよく使う操作をまとめています。簡単なメッシュ操作、インポート/エクスポート、**Fix MMD Model**、ポーズモードです。

## パネルのレイアウト（上から下へ）

1. **アップデート / バージョンの通知**（該当する場合のみ表示）
2. **Quick Actions**  Combine Materials、Join All Meshes
3. **Import / Export**
4. **アーマチュアセレクター**（アーマチュアが複数ある場合に表示）
5. **Fix MMD Model**（+ 設定ギア）
6. **Pose Mode**

---

## クイックアクション

上部にまとめられた、すばやいワンクリック操作です。

- **Combine Materials** - プロパティが一致するマテリアルを結合し、ドローコールを削減します。
- **Join All Meshes** - すべてのメッシュを 1 つのオブジェクトに結合します（マテリアル、頂点グループ、ウェイトは保持されます）。

> ⚠ Join All Meshes は元に戻せません。先に保存してください。

---

## モデルのインポート

VRChat のワークフローに適した設定でモデルをインポートします。

### 対応形式

- **MMD:** `.pmx`、`.pmd`
- **XNALara:** `.xps`、`.mesh`、`.ascii`
- **Source Engine:** `.smd`、`.qc`、`.vta`、`.dmx`
- **VRM:** `.vrm`
- **glTF / GLB:** `.gltf`、`.glb`
- **FBX:** `.fbx`
- **DAE:** `.dae`（Collada）
- **ZIP:** `.zip`（圧縮されたモデルパッケージ）

> 他の形式も動作する場合がありますが、上記が完全にサポートしている形式です。

**インポート方法:** **Import Model** をクリックし、ファイルを選択してインポートします。Cats が最適な設定を自動的に適用します。

---

## モデルのエクスポート

- **FBX for Unity** - Unity/VRChat に適したスケール、回転、アーマチュア設定でエクスポートします。
- **Resonite (glTF)** - Resonite 用に glTF 2.0 でエクスポートします。

**エクスポート方法:** 該当するエクスポートボタンをクリックし、保存先を選んで保存します。

---

## Fix MMD Model

**Fix MMD Model** ボタン（横に **⚙ 設定ギア**があります）は、見つけやすいようここ最上部にあります。**新しくインポートした** MMD/VRM を Unity/VRChat 対応のリグに変換します。

> ⚠ **新しくインポートした MMD / VRM モデル専用です。** すでに Unity/VRChat 向けに設定済みのモデル、ストアで購入したモデル、独自のカスタムビルドには**実行しないでください**。同じ警告がパネルのボタンのすぐ上にも表示されます。

> 🚫 **これらの警告を無視する場合は自己責任です。** 新しくインポートした MMD/VRM 以外のものに対して Fix MMD Model を実行し、Cats とこの wiki が示すすべての警告を無視した場合、それは完全にあなたの責任です。**それについて issue を開かないでください**。これらの警告へ案内され、即座にクローズされます。

ボタンが行うことすべてとギアの背後の設定を含む詳細は、[Converters](Converters) ページにあります（Fix MMD Model は MMD Cleanup セクションにも表示されます）。

---

## ポーズモード

アーマチュアを操作するにはポーズモードに入ります。

- **Start Pose Mode** - ポーズモードに入ります（小さいボタンは現在のポーズをリセットせずに開始します）。
- ポーズモード中:
  - **Stop Pose Mode** - （小さいボタンはリセットせずに停止します）
  - **Pose to Shape Key** - 現在のポーズを新しいシェイプキーとしてベイクします（カスタム表情に最適）
  - **Apply as Rest Pose** - 現在のポーズをアーマチュアのレストポーズに設定します

> ⚠ Apply as Rest Pose はレストポーズを永続的に変更します。先に保存してください。

---

## 典型的なワークフロー

1. モデルを**インポート**します。
2. 新しくインポートした MMD/VRM の場合は **Fix MMD Model** を実行します。
3. 名前を**翻訳**します（[Translation](Translation)）。
4. 最適化し（[Optimization](Optimization)）、[Eye Tracking](Eye-Tracking) と [Visemes](Visemes) を設定します。
5. 対象プラットフォーム向けに**エクスポート**します。

---

**関連ページ:**
- [Converters](Converters) - Fix MMD Model の詳細、Rigify/Valve/VRM の変換
- [Optimization](Optimization) - マテリアル、ボーン、頂点の削減
- [Merge & Attach](Merge-and-Attach) - モデルの結合
- [Settings](Settings) - エクスポートとモデル修正の挙動

---

