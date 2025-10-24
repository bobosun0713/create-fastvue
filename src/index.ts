import * as fs from "node:fs";
import * as path from "node:path";
import process from "node:process";
import { fileURLToPath, URL } from "node:url";

import { cancel, confirm, intro, isCancel, log, outro, select, text } from "@clack/prompts";
import spawn from "cross-spawn";
import color from "picocolors";

import { create, createHuskyCommand, detectPackageManager, doneMessage } from "./utils";

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

function askInstallAndStarNow(): Promise<boolean | symbol> {
  return confirm({ message: "Install and start now?" });
}

function handleExit(cb: () => boolean): void {
  if (cb()) {
    cancel("Operation cancelled");
    process.exit(0);
  }
}

function installDependencies(projectDir: string): void {
  const agent = detectPackageManager();

  log.info(`Using ${agent} to install dependencies...`);

  const result = spawn.sync(agent, ["install"], {
    cwd: projectDir,
    stdio: "inherit"
  });

  if (result.error) {
    log.error(`Failed to run ${agent}: ${result.error}`);
    process.exit(0);
  }

  if (result.status !== 0) {
    log.error(`${agent} install exited with code ${String(result.status ?? "unknown")}`);
    process.exit(0);
  }

  log.success("Starting dev server...");
}

function runDev(projectDir: string): void {
  const agent = detectPackageManager();

  const args = {
    npm: ["run", "dev", "--open"],
    pnpm: ["dev", "--open"],
    yarn: ["dev", "--open"],
    bun: ["dev", "--open"]
  }[agent];

  spawn.sync(agent, args, {
    cwd: projectDir,
    stdio: "inherit"
  });
}

async function init(): Promise<void> {
  const cwd = process.cwd();
  intro(color.bgBlackBright(" create-fastvue "));

  const projectName = (await askProjectName()) as string;
  handleExit(() => isCancel(projectName));

  const targetDirectory = path.join(cwd, projectName);
  const isOverwrite = await askOverwrite(targetDirectory);
  handleExit(() => isCancel(isOverwrite) || isOverwrite === false);

  const templateType = (await askTemplate()) as string;
  handleExit(() => isCancel(templateType));

  const isInstallStart = await askInstallAndStarNow();

  const templateDirectory = fileURLToPath(new URL(`../src/template/${templateType}`, import.meta.url));

  create(targetDirectory, templateDirectory, !!isOverwrite);
  createHuskyCommand(targetDirectory);

  if (isInstallStart) {
    installDependencies(targetDirectory);
    runDev(targetDirectory);
    return;
  }

  outro(doneMessage(projectName));
}

void init().catch(err => {
  cancel(err as string);
});
