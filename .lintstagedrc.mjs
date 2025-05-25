function mapFiles(filenames, { lint = true, ts = false } = {}) {
  const commands = [];

  // Filter out template files
  const files = filenames.filter(filename => !filename.includes("src/template"));

  if (files.length) {
    commands.unshift(`prettier --write ${files.join(" ")}`);
    if (lint) commands.unshift(`pnpm lint ${files.join(" ")}`);
    if (ts) commands.unshift("pnpm type-check");
  }

  return commands;
}

export default {
  "*.{js,mjs,cjs}": filenames => mapFiles(filenames),
  "*.{ts,mts}": filenames => mapFiles(filenames, { ts: true }),
  "*.{json,md}": filenames => mapFiles(filenames, { lint: false, ts: false })
};
