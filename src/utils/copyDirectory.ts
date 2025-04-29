/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

import * as fs from "node:fs";
import * as path from "node:path";
import * as util from "node:util";

const mkdir = util.promisify(fs.mkdir);
const copyFile = util.promisify(fs.copyFile);

async function copyDirectory(src: string, dest: string): Promise<void> {
  await mkdir(dest, { recursive: true });

  const entries = await fs.promises.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);

    // Rename '_gitignore' to '.gitignore' during copy to avoid npm publish ignoring it
    // https://github.com/npm/npm-packlist/blob/ff3ad1574a0b941e9b61598c8f8d920040eec6c4/lib/index.js#L14
    const realDestName = entry.name === "_gitignore" ? ".gitignore" : entry.name;
    const destPath = path.join(dest, realDestName);

    if (entry.isDirectory()) await copyDirectory(srcPath, destPath);
    else await copyFile(srcPath, destPath);
  }
}

export default copyDirectory;
