function mapFiles(filenames, lint = true) {
  const commands = ["prettier --write"];
  const lintCheck = "pnpm lint";

  if (lint) commands.unshift(`${lintCheck} ${filenames.join(" ")}`);

  return commands.map(cmd => (cmd.startsWith("eslint") ? cmd : `${cmd} ${filenames.join(" ")}`));
}

export default {
  "*.{js,mjs,vue}": filenames => mapFiles(filenames),
  "*.{json,md}": filenames => mapFiles(filenames, false)
};
