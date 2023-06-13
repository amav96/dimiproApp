import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const env = loadEnv(
  'mock', 
  process.cwd(),
  '' 
)
// https://vitejs.dev/config/
export default defineConfig({
  
  plugins: [react()],
  server: {

    port: Number(env.VUE_APP_PORT),
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
  },
  preview: {
    port: Number(env.VUE_APP_PORT),
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
  },
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@package', replacement: '/src/components/package' },
      { find: '@services', replacement: '/src/services' },
      { find: '@repositories', replacement: '/src/repositories' },
      { find: '@packageTypes', replacement: '/src/packageTypes' },
    ],
   },
   css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/css/_variables.scss";`
      }
    }
  }
})
