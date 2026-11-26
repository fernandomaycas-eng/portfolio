import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages serves this repository from /portfolio/.
// Every asset path in the app goes through `asset()` (src/lib/media.ts),
// which prefixes this base, so changing it here is enough.
export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
})
