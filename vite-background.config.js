import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: false, // So that popup and content build files don't get deleted
    target: "esnext",
    rollupOptions: {
      input: {
        background: "./background/background.js", // Entry Point
      },
      output: {
        entryFileNames: "assets/[name].js",
        format: "es",
      },
    },
  },
});
