/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

function mapFiles(filenames, { lint = true, ts = false } = {}) {
  const commands = [];
  const lintCheck = "pnpm lint";
  const typeCheck = "pnpm type-check";

  if (filenames.length) {
    commands.push("pnpm format");
    if (lint) commands.unshift(lintCheck);
    if (ts) commands.unshift(typeCheck);
  }

  return commands.map(cmd => (cmd.endsWith("type-check") ? cmd : `${cmd} ${filenames.join(" ")}`));
}

export default {
  "*.{js,mjs,cjs}": filenames => mapFiles(filenames),
  "*.{ts,mts,vue}": filenames => mapFiles(filenames, { ts: true }),
  "*.{json,md}": filenames => mapFiles(filenames, { lint: false })
};
