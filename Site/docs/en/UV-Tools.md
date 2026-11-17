# UV Tools

**UV Tools** is a new panel in `5.2.3.0` with helpers for UV editing. It contains two tools: **Align UV Edges to Target** and **Find Shortest Seam Path**.

## Where to find it

- The full panel lives in the **UV / Image Editor** side panel (N-panel), under the **CATS** tab. Open a UV Editor to see it.
- **Find Shortest Seam Path** is also mirrored in the **3D View** CATS tab (under "UV Tools"), because that's where you actually select the vertices.

*Align UV Edges* is UV-editor only, it needs the UV editor's 2D cursor and selection.

---

## Align UV Edges to Target

Reshapes a selected line of UV points on each selected mesh so it follows the line of selected UV points on the **active** mesh. This is great for **kitbashing**, matching one model's UV layout to another so their textures line up.

The **2D cursor** marks which end of each line is the "start", so all lines are walked in the same direction before the points are interpolated along the target.

### How to use

1. In the UV editor, turn **UV Sync Selection OFF**.
2. Select all the meshes involved the **active** one is the *target*.
3. Enter **Edit Mode** and select a matching **UV edge line** on each mesh.
4. Place the **2D cursor** near the start end of the lines.
5. Press **Align UV Edges to Target**.

> Each selected mesh needs exactly one clean line of selected UV points. If a selection branches or isn't a single line, Cats will warn you.

---

## Find Shortest Seam Path

Selects the shortest run of **seam** edges connecting two selected vertices. Handy for quickly selecting a seam loop to work with.

It walks only along edges marked as seams (a breadth-first search), so the result is always the fewest-edges path between your two points.

### How to use

1. Enter **Edit Mode** on your mesh.
2. Select **exactly two vertices**, each lying on a seam.
3. Press **Find Shortest Seam Path** (available in both the UV editor and 3D View CATS tabs).

The path edges are selected and the mode switches to edge select. If the two vertices aren't connected through seams, Cats tells you no path was found.

---

**Related Pages:**
- [Optimization](Optimization) - Atlas generation and material tools
- [Mesh Cleanup](Optimization#mesh-cleanup) - General mesh preparation
- [Troubleshooting](Troubleshooting) - Common issues

---

**Last Updated:** July 28, 2026 |  **Plugin Version:** 5.3.1.0 | **Blender:** 5.2 and 5.3 (5.2 LTS recommended)
