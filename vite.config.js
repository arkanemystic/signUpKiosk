import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Make the server accessible from other devices on the network
    port: 5173
  },
  // Define environment variables if needed
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  },
  // Configure asset handling
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // Optimize build for local usage
    rollupOptions: {
      output: {
        manualChunks: undefined,
        compact: true
      }
    }
  }
})