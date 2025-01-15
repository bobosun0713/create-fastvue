import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath, URL } from "node:url";

import { askOverwrite, askProjectName, askTemplate } from "./utils/actions";
import { create, doneMessage } from "./utils/create";

async function checkIfOverwrite(targetDirectory: string): Promise<boolean> {
  if (fs.existsSync(targetDirectory)) return askOverwrite();
  return false;
}

async function getTemplateDirectory(): Promise<string> {
  const templateType = await askTemplate();
  return fileURLToPath(new URL(`../src/template/${templateType}`, import.meta.url));
}

async function init(): Promise<void> {
  try {
    const cwd = process.cwd();
    const projectName = await askProjectName();
    const targetDirectory = path.join(cwd, projectName);

    const isOverwrite = await checkIfOverwrite(targetDirectory);
    if (!isOverwrite) return;

    const templateDirectory = await getTemplateDirectory();

    await create(targetDirectory, templateDirectory, isOverwrite);

    doneMessage(projectName);
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    else console.error("An unknown error occurred.");
  }
}

void init();
