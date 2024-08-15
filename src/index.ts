#! /usr/bin/env node

import { askProjectName, askTemplate } from "./utils/actions";
import create from "./utils/create";

async function init(): Promise<void> {
  const projectName = await askProjectName();
  const template = await askTemplate();

  void create(projectName, template);
}

void init().catch((error: unknown) => {
  if (error instanceof Error) console.error(error.message);
});
