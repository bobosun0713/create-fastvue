import * as fs from "node:fs";
import * as path from "node:path";
import process from "node:process";

import { LOGO, VERSION } from "../constants";

function pkgFromUserAgent(userAgent: string | undefined):
  | {
      name: string;
      version: string;
    }
  | undefined {
  if (!userAgent) return undefined;

  const pkgSpec = userAgent.split(" ")[0];
  const pkgSpecArr = pkgSpec.split("/");

  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1]
  };
}

export function doneMessage(projectName: string): string {
  const { name } = pkgFromUserAgent(process.env.npm_config_user_agent) ?? { name: "npm" };

  return `\n${VERSION}
  ${LOGO}
    
Successfully. Now run:\n
  step 1 : cd ${projectName}
  step 2 : git init (required for Husky to work properly)
  step 3 : ${name} install
  step 4 : ${name} run dev
  `;
}

export function createHuskyCommand(targetDirectory: string): void {
  const { name: pkgName } = pkgFromUserAgent(process.env.npm_config_user_agent) ?? { name: "npx" };
  const huskyDir = path.join(targetDirectory, ".husky");

  const hooks: Record<string, string>[] = [
    { name: "commit-msg", script: `${pkgName} commitlint --edit` },
    { name: "pre-commit", script: `${pkgName} lint-staged` },
    { name: "prepare-commit-msg", script: `exec < /dev/tty && ${pkgName} git-cz --hook || true` }
  ];

  hooks.forEach(({ name, script }) => {
    const hookPath = path.join(huskyDir, name);
    if (fs.existsSync(hookPath)) {
      fs.writeFileSync(hookPath, script, { encoding: "utf-8" });
      fs.chmodSync(hookPath, 0o755);
    }
  });
}

export function copyDirectory(src: string, dest: string): void {
  fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);

    // Rename '_gitignore' to '.gitignore' during copy to avoid npm publish ignoring it
    // https://github.com/npm/npm-packlist/blob/ff3ad1574a0b941e9b61598c8f8d920040eec6c4/lib/index.js#L14
    const realDestName = entry.name === "_gitignore" ? ".gitignore" : entry.name;
    const destPath = path.join(dest, realDestName);

    if (entry.isDirectory()) copyDirectory(srcPath, destPath);
    else fs.copyFileSync(srcPath, destPath);
  }
}

export function create(targetDirectory: string, templateDirectory: string, overwrite?: boolean): void {
  if (overwrite) fs.rmSync(targetDirectory, { recursive: true, force: true });
  copyDirectory(templateDirectory, targetDirectory);
}
