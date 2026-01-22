import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["./src/index"],
  clean: true,
  outDir: "lib",
  declaration: false,
  rollup: {
    inlineDependencies: true,
    esbuild: {
      minify: false
    }
  }
});
