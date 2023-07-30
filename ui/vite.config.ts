import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    base: "./",
    root: "./",
    define: {
        "process.env": {
            NODE_ENV: "production"
        }
    },
    esbuild: {
        format: "cjs",
        target: "es6"
    },
    build: {
        outDir: "./dist",

        rollupOptions: {

            input: {
                main: path.resolve(__dirname, "main.tsx"),
                sidebar: path.resolve(__dirname, "sidebar.tsx")
            },
            output: {
                entryFileNames: "[name].js",
                chunkFileNames: "lib.js"
            },

        }
    }
})
