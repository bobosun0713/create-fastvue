import * as fs from "node:fs";
import * as path from "node:path";

import { askOverwrite } from "./actions";
import copyDirectory from "./copyDirectory";

async function create(projectName: string, projectType: string): Promise<void> {
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
    throw new Error(`🔴 Error creating project: ${error as string}`);
  }
}

export default create;
