/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />

// IntelliSense for TypeScript: https://vitejs.dev/guide/env-and-mode#intellisense-for-typescript
interface ImportMetaEnv {
  readonly VITE_CLI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}