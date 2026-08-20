---
name: upgrade-existing-project-to-foundry
description: Inspect a project and install or sync PI Foundry foundation. Use when adopting Foundry on an existing repo or when the user pastes an upgrade/sync prompt.
---

# Upgrade / sync existing project to PI Foundry

Natural-language entry point (preferred over asking humans to run scripts).

## When to use

- User asks to initialize/inspect a zip or folder and apply Foundry
- Missing foundation markers, or foundation present but possibly stale
- Replaces the old dual flow (APF upgrade + Atlas upgrade from a separate path)

## Procedure (agent executes)

1. Resolve target path (`<path-progetto>`). Unzip / `git init` if the user asked.
2. Inspect markers:
   - Has usable foundation if `.cursor/rules/core/` has operating principles / autonomous-execution **and** `.cursor/skills/sync-foundation` (or agents roster) exists.
3. Locate Foundry source:
   - Prefer this monorepo’s `foundation/` (workspace root of PI Foundry).
   - Do **not** require a separate Atlas OS path.
4. Apply:
   - **Missing foundation** → `pnpm foundation:bootstrap -- <path>` from PI Foundry root (or equivalent apply-foundation bootstrap).
   - **Already present** → `pnpm foundation:sync -- <path>` only.
5. Never overwrite without confirmation: filled `docs/ai/*`, `.cursor/rules/project/*`, app source, `.project-brain/`.
6. Run `pnpm foundation:doctor -- <path>` and report `FOUNDATION_VERSION` + created/updated files.
7. Tell the human what placeholders remain to fill (product facts only).

## Alias legacy names

If the user says `upgrade-existing-project`, `upgrade-existing-project-to-atlas-os`, `sync-apf-foundation`, or `sync-foundation` in the old dual-repo sense → run **this** unified flow against PI Foundry `foundation/`.
