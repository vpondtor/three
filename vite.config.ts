import { defineConfig } from 'vite';
import path from 'path'

export default defineConfig({
    base: "/three/",
    server: {
        port: 3000,
        open: true,
        strictPort: true
    },
    build: {
        outDir: path.resolve(__dirname, 'build'),
        emptyOutDir: true
    },
})
