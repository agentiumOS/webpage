import { defineConfig } from 'vite'
import * as path from 'path'
import react from '@vitejs/plugin-react-swc'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
    preprocessorOptions: {
      scss: {
        charset: false,
      },
    },
  },
  resolve: {
    alias: {
      'src': path.resolve(__dirname, 'src'),
      'components': path.resolve(__dirname, 'src/components'),
      'assets': path.resolve(__dirname, 'src/assets'),
      '@': path.resolve(__dirname, 'src'),
    }
  }
})
