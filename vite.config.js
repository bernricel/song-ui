import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    allowedHosts: ["song-ui-mqll.onrender.com"], // for dev (optional)
    proxy: {
      "/api": {
        target: "https://song-api-fohg.onrender.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    port: 5173,
  },

  preview: {
    allowedHosts: ["song-ui-mqll.onrender.com"], // 🔥 REQUIRED for Render
  },
});
