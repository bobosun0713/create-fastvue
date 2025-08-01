import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath, URL } from "node:url";

import { cancel, confirm, intro, isCancel, outro, select, text } from "@clack/prompts";
import color from "picocolors";

import { create, doneMessage } from "./utils/create";

function askProjectName(): Promise<string | symbol> {
  return text({
    message: "Project name:",
    validate: val => {
      if (!val) return "Project name cannot be empty";
      return undefined;
    }
  });
}

function askTemplate(): Promise<string | symbol> {
  return select({
    message: "Choose a template:",
    options: [
      { label: "vanilla", value: "vanilla" },
      { label: "vanilla-airbnb", value: "vanilla-airbnb" },
      { label: "typescript-airbnb-tailwindcss", value: "typescript-airbnb-tailwindcss" },
      {
        label: "typescript-airbnb-unplugin-with-import-router",
        value: "typescript-airbnb-unplugin-with-import-router"
      },
      { label: "vue-typescript (ESLint v9)", value: "vue-typescript" }
    ]
  });
}

function askOverwrite(targetDirectory: string): Promise<boolean | symbol> | undefined {
  if (fs.existsSync(targetDirectory))
    return confirm({ message: "Project already exists. Do you want to overwrite it?" });
  return undefined;
}

function handleExit(cb: () => boolean): void {
  if (cb()) {
    cancel("✖ Operation cancelled");
    process.exit(0);
  }
}

async function init(): Promise<void> {
  const cwd = process.cwd();
  intro(color.bgGreenBright(" create-fastvue "));

  const projectName = (await askProjectName()) as string;
  handleExit(() => isCancel(projectName));

  const targetDirectory = path.join(cwd, projectName);
  const isOverwrite = await askOverwrite(targetDirectory);
  handleExit(() => isCancel(isOverwrite) || isOverwrite === false);

  const templateType = (await askTemplate()) as string;
  handleExit(() => isCancel(templateType));

  const templateDirectory = fileURLToPath(new URL(`../src/template/${templateType}`, import.meta.url));

  try {
    await create(targetDirectory, templateDirectory, isOverwrite as boolean);
    outro(doneMessage(projectName));
  } catch {
    cancel("An unknown error occurred.");
  }
}

void init();
