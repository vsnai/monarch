import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/elements/monarch-app.js',
      formats: ['es']
    },
    rollupOptions: {
      external: /^lit/
    }
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      all: true,
      include: ['src/**'],
      exclude: ['src/mocks/**', 'src/**/*.test.js']
    },
    setupFiles: ['./setupTests.js'],
  }
})
