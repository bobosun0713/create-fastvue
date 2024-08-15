import * as fs from "node:fs";
import * as path from "node:path";

import { LOGO, VERSION } from "../constants";
import { askOverwrite } from "./actions";
import copyDirectory from "./copyDirectory";

interface PkgInfo {
  name: string;
  version: string;
}

function pkgFromUserAgent(userAgent: string | undefined): PkgInfo | undefined {
  if (!userAgent) return undefined;
  const pkgSpec = userAgent.split(" ")[0];
  const pkgSpecArr = pkgSpec.split("/");
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1]
  };
}

function doneMessage(projectName: string, pkgInfo: PkgInfo | undefined): void {
  const { name } = pkgInfo ?? {};

  console.log(`\n ${VERSION}
    ${LOGO}
  `);

  console.log(`Successfully. Now run:\n`);

  console.log(`  step 1 : cd ${projectName}`);
  console.log(`  step 2 : ${name ?? "npm"} install`);
  console.log(`  step 3 : ${name ?? "npm"} run dev`);

  console.log();
}

async function create(projectName: string, projectType: string): Promise<void> {
  const cwd = process.cwd();

  const targetDirectory = path.join(cwd, projectName);
  const templateDirectory = path.join(cwd, `src/template/${projectType}`);
  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);

  try {
    // Check if the directory exists
    if (fs.existsSync(targetDirectory)) {
      const overwrite = await askOverwrite();
      if (!overwrite) return;

      await fs.promises.rm(targetDirectory, { recursive: true, force: true });
      await copyDirectory(templateDirectory, targetDirectory);
    } else {
      await copyDirectory(templateDirectory, targetDirectory);
    }

    doneMessage(projectName, pkgInfo);
  } catch (error) {
    throw new Error(`🔴 Error creating project: ${error as string}`);
  }
}

export default create;
