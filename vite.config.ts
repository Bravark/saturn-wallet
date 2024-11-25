import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import inject from "@rollup/plugin-inject";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      buffer: "buffer",
    },
  },
  plugins: [
    react(),
    inject({
      Buffer: ["buffer", "Buffer"],
    }),
  ],
});
