#! /usr/bin/env node

import chalk from "chalk";
import { program } from "commander";

import { LOGO, VERSION } from "./constants";
import { askProjectName, askTemplate } from "./utils/actions";
import create from "./utils/create";

program.version(`
${chalk.green.bold(VERSION)}
${chalk.greenBright(LOGO)}
`);

program
  .command("create")
  .description(chalk.green("Create a new project"))
  .description("Create a new project")
  .action(async () => {
    const projectName = await askProjectName();
    const template = await askTemplate();

    void create(projectName, template);
  });

program.parse(process.argv);
