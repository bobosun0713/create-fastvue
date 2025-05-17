import { confirm, input, select, Separator } from "@inquirer/prompts";
import chalk from "chalk";

export async function askOverwrite(): Promise<boolean> {
  return await confirm({
    message: chalk.redBright(`Project already exists. Do you want to overwrite it?`)
  });
}

export async function askProjectName(): Promise<string> {
  return await input({
    message: chalk.greenBright("Project name :"),
    validate: val => {
      if (!val) return "Project name cannot be empty";
      return true;
    }
  });
}

export async function askTemplate(): Promise<string> {
  return await select({
    message: chalk.greenBright("Choose a template :"),
    choices: [
      { name: "vanilla", value: "vanilla" },
      { name: "vanilla-airbnb", value: "vanilla-airbnb" },
      { name: "typescript-airbnb", value: "typescript-airbnb" },
      { name: "typescript-airbnb-tailwindcss", value: "typescript-airbnb-tailwindcss" },
      { name: "typescript-airbnb-unplugin-with-import-router", value: "typescript-airbnb-unplugin-with-import-router" },
      new Separator("────── Beta (ESLint v9) ──────"),
      { name: "vue-typescript", value: "vue-typescript" }
    ]
  });
}

export default {
  askOverwrite,
  askProjectName,
  askTemplate
};
