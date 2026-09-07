// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2020",
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Keep all core React runtime dependencies together
            if (
              id.includes("/react/") ||
              id.includes("/react-dom/") ||
              id.includes("/react-router/") ||
              id.includes("/react-router-dom/") ||
              id.includes("/scheduler/") ||
              id.includes("/@calcom/embed-react/")
            ) {
              return "vendor-react";
            }

            // UI animation engine
            if (id.includes("/framer-motion/")) {
              return "vendor-motion";
            }

            // Icons
            if (id.includes("/lucide-react/")) {
              return "vendor-icons";
            }
          }
        },
      },
    },
  },
});