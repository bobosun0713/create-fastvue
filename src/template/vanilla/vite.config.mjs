import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

// Define the base directory
const baseDir = path => fileURLToPath(new URL(path, import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": baseDir("./src"),
      "@tests": baseDir("./tests")
    }
  },
  test: {
    globals: true,
    root: baseDir("./"),
    environment: "jsdom",
    coverage: {
      enabled: true,
      include: ["src/**/*"],
      reportsDirectory: "./.cache/coverage"
    }
  }
});
