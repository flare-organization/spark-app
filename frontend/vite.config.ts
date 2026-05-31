import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "path"


export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@openapi": path.resolve(__dirname, "./target/generated-sources/openapi"),
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
  test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: 'src/test/setup.ts',
      include: ['src/**/*.test.{ts,tsx}'],
  },
})
