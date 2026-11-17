import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// Served from a project page: https://<user>.github.io/Cats-Blender-Plugin-Unofficial/
// Keep this in sync with `url` in site.config.mjs.
export default defineConfig({
    base: "/Cats-Blender-Plugin-Unofficial/",
    plugins: [react()],
    build: {
        outDir: "dist",
        emptyOutDir: true,
    },
});
