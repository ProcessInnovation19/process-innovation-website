---
name: bootstrap-atlas-project
description: Bootstrap a new project using Foundry foundation (Atlas OS layer in this monorepo). Use when creating a new project from the foundation.
---

# Bootstrap Project (Foundry foundation)

Bootstrap a new project from **this monorepo’s** `foundation/` folder. You do **not** need a separate Atlas OS clone.

## Preferred command

From the Foundry repo root:

```bash
pnpm foundation:bootstrap -- "<project-path>"
pnpm foundation:doctor -- "<project-path>"
```

Equivalent legacy script (source = foundation path):

```powershell
.\scripts\bootstrap-foundation.ps1 -TargetPath "<project-path>"
```

## Invocation in chat

- "Bootstrap at `<project-path>` using this monorepo foundation"
- Source path default: `<foundry>/foundation`

## After bootstrap

1. `git init` in target if needed
2. `git config core.hooksPath .githooks` (scripts usually set this)
3. Fill `docs/ai/` and `.cursor/rules/project/` placeholders
4. Open the **target project** workspace for daily work
