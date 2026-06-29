/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RECAPTCHA_SITE_KEY: string
  readonly VITE_PUBLIC_PHONE: string
  readonly VITE_AI_API_KEY: string
  readonly VITE_AI_API_URL: string
  readonly VITE_AI_MODEL: string
  readonly VITE_AI_CHAT_ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
