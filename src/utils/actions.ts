import prompts from "prompts";
import chalk from "chalk";

export async function askOverwrite(): Promise<boolean> {
  const { overwrite } = await prompts({
    type: "confirm",
    name: "overwrite",
    message: chalk.redBright(
      `Project already exists. Do you want to overwrite it?`
    ),
  });

  return overwrite;
}

export async function askProjectName(): Promise<string> {
  const { projectName } = await prompts({
    type: "text",
    name: "projectName",
    message: chalk.greenBright("Project name :"),
    validate: (val) => {
      if (!val) return "Project name cannot be empty";
      return true;
    },
  });

  return projectName;
}

export async function askTemplate(): Promise<string> {
  const { template } = await prompts({
    type: "select",
    name: "template",
    message: chalk.greenBright("Choose a template :"),
    choices: [
      { title: "basic", value: "basic" },
      { title: "basic-airbnb", value: "basic-airbnb" },
      { title: "typescript-airbnb", value: "typescript-airbnb" },
    ],
  });

  return template;
}

export default {
  askOverwrite,
  askProjectName,
  askTemplate,
};
