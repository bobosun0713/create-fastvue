import process from "node:process";

import { execSync } from "child_process";

export function commandExistsSync(command: string): boolean {
  try {
    return !!execSync(`command -v ${command}`, { stdio: "ignore" });
  } catch {
    return false;
  }
}

export function detectPackageManager(): string {
  const agent = process.env.npm_config_user_agent ?? "";
  if (agent.startsWith("pnpm")) return "pnpm";
  if (agent.startsWith("yarn")) return "yarn";
  if (agent.startsWith("bun")) return "bun";
  return "npm";
}
