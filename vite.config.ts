import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {

    port: 3001,
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
  },
  preview: {
    port: 3001,
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
   },
})
