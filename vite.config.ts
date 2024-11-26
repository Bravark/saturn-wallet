import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import inject from "@rollup/plugin-inject";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
// import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      buffer: "buffer",
    },
  },
  optimizeDeps: {
    include: ["bigint-buffer", "borsh", "bn.js", "bs58", "text-encoding-utf-8"],
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      plugins: [
        // NodeGlobalsPolyfillPlugin({
        //   buffer: true,
        // }),
      ],
    },
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
      plugins: [
        resolve({
          browser: true, // Ensures browser-compatible builds
          // preferBuiltins: true, // Prefer Node.js built-ins where available
        }),
        commonjs(), // Convert CommonJS modules to ESM
      ],
    },
  },
});
