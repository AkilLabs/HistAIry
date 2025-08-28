import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'popup.html'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    },
    // Configure for extension
    target: 'es2015',
    minify: mode === 'extension' ? 'esbuild' : false,
  },
  base: './', // This ensures relative paths in the built files
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
}))
