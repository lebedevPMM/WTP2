/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BITRIX_WEBHOOK_URL?: string;
  readonly VITE_CALCOM_LINK?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
