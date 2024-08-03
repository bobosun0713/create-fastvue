#! /usr/bin/env node

import { program } from "commander";
import chalk from "chalk";

import { VERSION, LOGO } from "./constants";
import { askProjectName, askTemplate } from "./utils/actions";
import create from "./utils/create";

// 當前版本號
program.version(`
${chalk.green.bold(VERSION)}
${chalk.greenBright(LOGO)}
`);

program
  .command("create")
  .description(chalk.green("Create a new project"))
  .action(async () => {
    const projectName = await askProjectName();
    const template = await askTemplate();

    create(projectName, template);
  });

program.parse(process.argv);
