import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    // Vite uses connect-history-api-fallback internally
    // No need to explicitly configure historyApiFallback
  },
  preview: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
  },
})
