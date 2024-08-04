// eslint-disable-next-line import/no-extraneous-dependencies
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["./src/index"],
  clean: true,
  outDir: "lib",
  rollup: {
    esbuild: {
      minify: true
    }
  }
});
