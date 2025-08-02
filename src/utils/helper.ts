import { execSync } from "child_process";

export function commandExistsSync(command: string): boolean {
  try {
    return !!execSync(`command -v ${command}`, { stdio: "ignore" });
  } catch {
    return false;
  }
}

export function detectPackageManager(): string {
  if (commandExistsSync("pnpm")) return "pnpm";
  if (commandExistsSync("yarn")) return "yarn";
  return "npx";
}
