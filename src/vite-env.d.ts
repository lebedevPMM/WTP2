/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_LANG: 'en' | 'ru' | undefined
    readonly VITE_LANDING: 'main' | 'banking' | 'realestate' | 'partners' | undefined
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
