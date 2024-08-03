import * as path from "node:path";
import * as fs from "node:fs";

import copyDirectory from "./copyDirectory";
import { askOverwrite } from "./actions";

async function create(projectName: string, projectType: string) {
  const cwd = process.cwd();

  const targetDirectory = path.join(cwd, projectName);
  const templateDirectory = path.join(cwd, `src/template/${projectType}`);

  try {
    // Check if the directory exists
    if (fs.existsSync(targetDirectory)) {
      const overwrite = await askOverwrite();
      if (!overwrite) return;

      await fs.promises.rm(targetDirectory, { recursive: true, force: true });
      await copyDirectory(templateDirectory, targetDirectory);
    } else {
      await copyDirectory(templateDirectory, targetDirectory);
    }
  } catch (error) {
    throw new Error(`🔴 Error creating project: ${error}`);
  }
}

export default create;
