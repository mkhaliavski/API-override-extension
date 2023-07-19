import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    root: "./src/extension/panels",
    build: {
        outDir: "../../../dist",
        rollupOptions: {
            input: {
                main: "./src/extension/panels/main.html",
                sidebar: "./src/extension/panels/sidebar.html"
            },
        }
    }
})
