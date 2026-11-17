import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// BASE_PATH lets the same build run at a domain root (Vercel) or a sub-path (GitHub Pages).
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/',
  test: { environment: 'node', include: ['tests/**/*.test.js'] },
})
