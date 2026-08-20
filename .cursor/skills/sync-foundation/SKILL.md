---
name: sync-foundation
description: Sync Foundry foundation (Atlas OS layer + selective ECC skills) into a project. Use when syncing core foundation files from this monorepo.
---

# Sync Foundation

Sync the operational foundation from **this monorepo** (`foundation/`) into an existing project. You do **not** need `C:\Progetti\Atlas OS` anymore.

## Preferred command (from Foundry repo)

```bash
pnpm foundation:sync -- "<project-path>"
pnpm foundation:doctor -- "<project-path>"
```

Windows PowerShell equivalent (same result):

```powershell
.\scripts\sync-foundation.ps1 -TargetPath "<project-path>"
```

## Source path

Default source: `<foundry-repo>/foundation`  
Example: `C:\Users\Fabrizio Naimoli\Projects\agentic-project-foundry\foundation`

## Checklist (if applying manually)

1. Update `.cursor/rules/core/*` from foundation (include `04-autonomous-execution`, `06-minimal-change-ponytail`, `07-structured-delivery-superpowers`)
2. Import missing `.cursor/agents/*`
3. Import/update `.cursor/skills/*` including ECC-adapted skills from `foundation/skills/_imported/`
4. Update `.githooks/*` if project has no local customization
5. **Never overwrite** `.cursor/rules/project/*` or substantive `docs/ai/*` without confirmation
6. Write/refresh `FOUNDATION_VERSION` stamp
7. Run `git config core.hooksPath .githooks` yourself

## Alias

`sync-apf-foundation` means the same workflow — use this skill / `scripts/sync-foundation.ps1`.

## After sync

Commit in the **project** repo when appropriate: `chore: sync Foundry foundation`.
