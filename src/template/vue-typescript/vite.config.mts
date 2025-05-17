import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
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
  plugins: [vue()],
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
