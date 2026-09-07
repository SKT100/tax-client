// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    target: "es2020",
    cssMinify: true,
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          // Check specific libraries first before general matching
          if (id.includes("lucide-react")) {
            return "vendor-icons";
          }
          if (id.includes("framer-motion")) {
            return "vendor-motion";
          }
          if (id.includes("lenis")) {
            return "vendor-smooth";
          }
          if (
            id.includes("/react/") ||
            id.includes("/react-dom/") ||
            id.includes("react-router-dom")
          ) {
            return "vendor-react";
          }

          return "vendor";
        },
      },
    },
  },
  esbuild: {
    drop: ["console", "debugger"],
  },
});