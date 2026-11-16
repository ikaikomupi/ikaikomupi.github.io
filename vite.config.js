import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        // Ikon lucide digabung jadi satu file kecil, bukan belasan file 1 KB yang diunduh berantai.
        manualChunks(id) {
          if (id.includes('node_modules/lucide-react')) return 'ikon'
        },
      },
    },
  },
})
