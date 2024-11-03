import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
// eslint-disable-next-line import/no-extraneous-dependencies
import AutoImport from "unplugin-auto-import/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";
import VueRouter from "unplugin-vue-router/vite";
import { defineConfig } from "vite";

// Define the base directory
const baseDir = (path: string): string => fileURLToPath(new URL(path, import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    port: 5050
  },
  preview: {
    port: 5050
  },
  plugins: [
    VueRouter({
      dts: "./types/typed-router.d.ts"
    }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/ // .vue
      ],
      imports: ["vue", VueRouterAutoImports],
      dts: "./types/auto-imports.d.ts",
      viteOptimizeDeps: true
    }),
    vue()
  ],
  resolve: {
    alias: {
      "@": baseDir("./src"),
      "@tests": baseDir("./tests")
    }
  },
  esbuild: {
    drop: mode === "prod" ? ["console", "debugger"] : ["debugger"]
  },
  test: {
    root: baseDir("./"),
    globals: true,
    environment: "jsdom",
    coverage: {
      enabled: true,
      include: ["src/**/*"],
      reportsDirectory: "./.cache/coverage"
    }
  }
}));
