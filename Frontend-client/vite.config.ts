import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    build: {
        outDir: "dist",
        sourcemap: false,
    },
    server: {
        https: false,
        host: true,
    },
    define: {
        // Enable PWA features
        __PWA_ENABLED__: true,
    },
});
