import chalk from "chalk";
import prompts from "prompts";

export async function askOverwrite(): Promise<boolean> {
  const answer: { overwrite: boolean } = await prompts({
    type: "confirm",
    name: "overwrite",
    message: chalk.redBright(`Project already exists. Do you want to overwrite it?`)
  });

  return answer.overwrite;
}

export async function askProjectName(): Promise<string> {
  const answer: { projectName: string } = await prompts({
    type: "text",
    name: "projectName",
    message: chalk.greenBright("Project name :"),
    validate: val => {
      if (!val) return "Project name cannot be empty";
      return true;
    }
  });

  return answer.projectName;
}

export async function askTemplate(): Promise<string> {
  const answer: { template: string } = await prompts({
    type: "select",
    name: "template",
    message: chalk.greenBright("Choose a template :"),
    choices: [
      { title: "basic", value: "basic" },
      { title: "basic-airbnb", value: "basic-airbnb" },
      { title: "typescript-airbnb", value: "typescript-airbnb" }
    ]
  });

  return answer.template;
}

export default {
  askOverwrite,
  askProjectName,
  askTemplate
};
