function mapFiles(filenames, lint = true) {
  const commands = [];
  const lintCheck = "pnpm lint";

  if (filenames.length) {
    commands.push("pnpm format");
    if (lint) commands.unshift(lintCheck);
  }

  return commands.map(cmd => `${cmd} ${filenames.join(" ")}`);
}

export default {
  "*.{js,mjs,vue}": filenames => mapFiles(filenames),
  "*.{json,md}": filenames => mapFiles(filenames, false)
};
