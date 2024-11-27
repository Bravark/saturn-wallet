// import inject from "@rollup/plugin-inject";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    react(),
    // inject({
    //   Buffer: ["buffer", "Buffer"],
    // }),
  ],
  resolve: {
    alias: {
      // Polyfill Node.js modules with browser equivalents
      crypto: "crypto-browserify",
      stream: "stream-browserify",
      buffer: "buffer",
      util: "util",
    },
  },
  define: {
    // Define global variables for browser compatibility
    global: "window",
    process: {
      env: {},
    },
  },
});
