import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


export default defineConfig({
  server: {
    proxy: {
      "/api": "https://todo-list-r6ks.onrender.com",
    },
  },
  plugins: [react()],
}); 