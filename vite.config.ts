import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const landing = process.env.VITE_LANDING || 'main'
const lang = process.env.VITE_LANG || 'en'

export default defineConfig({
    plugins: [react()],
    base: '/',
    build: {
        outDir: `dist/${landing}-${lang}`,
    },
    define: {
        'import.meta.env.VITE_LANDING': JSON.stringify(landing),
        'import.meta.env.VITE_LANG': JSON.stringify(lang),
    },
})
