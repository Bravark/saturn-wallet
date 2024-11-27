import inject from "@rollup/plugin-inject";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    inject({
      Buffer: ["buffer", "Buffer"],
    }),
  ],
});
