function mapFiles(filenames, { lint = true, ts = false } = {}) {
  const commands = ["prettier --write"];
  const lintCheck = "pnpm lint";
  const typeCheck = "pnpm tsc";

  if (filenames.length) {
    if (lint) commands.unshift(`${lintCheck} ${filenames.join(" ")}`);
    if (ts) commands.unshift(typeCheck);
  }

  return commands.map(cmd => ([lintCheck, typeCheck].includes(cmd) ? cmd : `${cmd} ${filenames.join(" ")}`));
}

export default {
  "*.{js,mjs,cjs}": filenames => mapFiles(filenames),
  "*.{ts,mts}": filenames => mapFiles(filenames, { ts: true }),
  "*.{json,md}": filenames => mapFiles(filenames, { lint: false, ts: false })
};
