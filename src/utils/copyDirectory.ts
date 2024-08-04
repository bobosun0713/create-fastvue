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
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) await copyDirectory(srcPath, destPath);
    else await copyFile(srcPath, destPath);
  }
}

export default copyDirectory;
