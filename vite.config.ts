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

    port: Number(env.VITE_REACT_APP_PORT),
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
  },
  preview: {
    port: Number(env.VITE_REACT_APP_PORT),
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
  },
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@components', replacement: '/src/components' },
      { find: '@services', replacement: '/src/services' },
      { find: '@localTypes', replacement: '/src/localTypes' },
      { find: '@utils', replacement: '/src/utils' },
      { find: '@store', replacement: '/src/store' },
      { find: '@hooks', replacement: '/src/hooks' },
      { find: '@views', replacement: '/src/views' },
      { find: '@repositories', replacement: '/src/repositories' },
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
