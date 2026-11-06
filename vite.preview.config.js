import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// Builds ONE self-contained index.html (JS, CSS, fonts inlined) for hosting a phone preview.
// Profiles are kept in the browser's localStorage instead of JSON Server.
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  build: { outDir: "dist-preview", emptyOutDir: true },
});
