import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
  preview: {
    port: 3000,
    host: true,
    strictPort: false,
    allowedHosts: [
      'localhost',
      '178.208.187.213',
      'onus.com.tr',
      'www.onus.com.tr',
    ],
  },
})
