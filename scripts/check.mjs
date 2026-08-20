#!/usr/bin/env node
/**
 * Esegue in sequenza typecheck → lint → build.
 * Scritto in Node (e non come catena "&&") perché su Windows gli script npm
 * di questo repository girano in PowerShell: vedi `.npmrc`.
 */
import { spawnSync } from "node:child_process";

const steps = ["typecheck", "lint", "build"];

for (const step of steps) {
  process.stdout.write(`\n▸ npm run ${step}\n`);

  const result = spawnSync("npm", ["run", step], {
    stdio: "inherit",
    shell: true,
  });

  if (result.status !== 0) {
    process.stderr.write(`\n✕ Step fallito: ${step}\n`);
    process.exit(result.status ?? 1);
  }
}

process.stdout.write("\n✓ typecheck, lint e build completati\n");
