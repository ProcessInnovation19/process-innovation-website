---
name: build-fix
description: Diagnose and fix failing builds/typecheck/tests with minimal diffs. Use when CI or local verify fails.
origin: ECC-inspired (build-fix), adapted for Foundry foundation
---

# Build Fix

## Checklist

1. Capture the **exact** error (command + first failing message)
2. Reproduce with the same command the project uses (typecheck/test/build)
3. Identify the smallest failing unit (file/package)
4. Fix with **minimal diff** — no drive-by refactors
5. Re-run the failing command; then broader verify if needed
6. Note root cause in `docs/ai/CHANGELOG_AI.md` if non-obvious

## Prefer

- Fixing types/imports/config over deleting tests
- Matching existing patterns in the repo
