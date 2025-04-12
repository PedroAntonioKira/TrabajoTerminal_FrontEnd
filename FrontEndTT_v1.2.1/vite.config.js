import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",  // 👈 Fuerza rutas relativas correctamente para S3
  build: {
    outDir: "dist",
    assetsDir: "assets",  // 👈 Asegura que CSS y JS estén dentro de "assets"
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
      },
    },
  },
})
