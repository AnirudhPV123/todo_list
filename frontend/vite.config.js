import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


export default defineConfig({
  // this code only run on locally used for development 
  // for deploy vercel.json check
  server: {
    proxy: {
      "/api": "https://todo-list-r6ks.onrender.com",
    },
  },
  plugins: [react()],
}); 