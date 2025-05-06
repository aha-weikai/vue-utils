import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "main",
      formats: ["es"],
      fileName: () => `index.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        dir: "lib",
      },
    },
  },
  plugins: [dts({ outDir: "lib" })],
});
