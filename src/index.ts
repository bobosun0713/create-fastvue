import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath, URL } from "node:url";

import chalk from "chalk";

import { askOverwrite, askProjectName, askTemplate } from "./utils/actions";
import { create, doneMessage } from "./utils/create";

async function checkIfOverwrite(targetDirectory: string): Promise<boolean | undefined> {
  if (fs.existsSync(targetDirectory)) return askOverwrite();
  return undefined;
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

    // Check if the target directory already exists
    const isOverwrite = await checkIfOverwrite(targetDirectory);
    // If the user chooses not to overwrite, exit the program
    if (isOverwrite === false) return;

    const templateDirectory = await getTemplateDirectory();

    await create(targetDirectory, templateDirectory, isOverwrite);

    doneMessage(projectName);
  } catch (error) {
    if (error instanceof Error && error.name === "ExitPromptError")
      console.error(`${chalk.red("✖")} Operation cancelled`);
    else console.error("An unknown error occurred.");
  }
}

void init();
