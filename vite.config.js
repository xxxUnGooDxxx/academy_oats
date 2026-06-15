import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' — относительные пути к ассетам, чтобы сайт работал
// на любом подпути GitHub Pages (xxx.github.io/<repo>/) без правок.
export default defineConfig({
  plugins: [react()],
  base: './',
})
