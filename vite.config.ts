import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import inject from "@rollup/plugin-inject";
import { nodePolyfills } from "vite-plugin-node-polyfills";
// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      buffer: "buffer",
      borsh: "borsh",
    },
  },
  optimizeDeps: {
    include: ["bigint-buffer"],
  },
  plugins: [
    react(),
    inject({
      Buffer: ["buffer", "Buffer"],
    }),
    nodePolyfills({
      protocolImports: true, // Enables polyfills for "fs", "path", etc.
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        background: "./src/background.ts", // Include background script
      },
      output: {
        format: "es",
        entryFileNames: (chunk) => {
          if (chunk.name === "background") {
            return "background.js"; // Ensure `background.js` name
          }
          return "[name]-[hash].js"; // Default for others
        },
      },
    },
  },
});
