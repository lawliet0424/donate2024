import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default {
  plugins: [react()],
  server: {
    "/api": {
      target: "http://localhost:8081", // 백엔드 서버 주소
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ""), // '/api'를 삭제하고 백엔드로 요청
    },
  },
};
