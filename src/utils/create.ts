import * as fs from "node:fs";

import { LOGO, VERSION } from "../constants";
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

export function doneMessage(projectName: string): string {
  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);
  const { name } = pkgInfo ?? {};

  return `\n${VERSION}
  ${LOGO}
    
Successfully. Now run:\n
  step 1 : cd ${projectName}
  step 2 : git init (required for Husky to work properly)
  step 3 : ${name ?? "npm"} install
  step 4 : ${name ?? "npm"} run dev
  `;
}

export async function create(targetDirectory: string, templateDirectory: string, overwrite?: boolean): Promise<void> {
  try {
    if (overwrite) await fs.promises.rm(targetDirectory, { recursive: true, force: true });
    await copyDirectory(templateDirectory, targetDirectory);
  } catch (error) {
    throw new Error(`🔴 Error creating project: ${error as string}`);
  }
}
