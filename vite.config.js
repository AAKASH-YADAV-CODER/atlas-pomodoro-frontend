import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    strictPort: true,
    port: 5174,
    proxy: {
      "/api": {
        target: "https://atlas-pomodoro-backend.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
