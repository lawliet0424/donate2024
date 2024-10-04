import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8081", // 백엔드 서버 주소 (Spring Boot)
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // '/api'를 삭제하고 백엔드로 요청
        secure: false, // HTTPS가 아니므로 false 설정
      },
    },
  },
});