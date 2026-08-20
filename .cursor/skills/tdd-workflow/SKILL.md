---
name: tdd-workflow
description: Test-driven workflow — failing test first, minimal implementation, refactor, verify. Use for features and bug fixes when tests are appropriate.
origin: ECC-inspired (affaan-m/everything-claude-code), adapted for Foundry foundation
---

# TDD Workflow

Adapted from ECC `tdd-workflow` for this monorepo. Lazy about extra code (Ponytail), strict about verification.

## When to use

- New behavior or bug fix where automated tests are feasible
- Before claiming a task is done when DoD requires tests

## Ladder

1. **Understand** the expected behavior from project docs / failing reproduction
2. **Write a failing test** (RED) that expresses the requirement
3. **Implement the minimum** to pass (GREEN) — reuse stdlib/existing helpers first
4. **Refactor** only with tests green (IMPROVE)
5. **Verify** full relevant suite (unit/integration/e2e as appropriate)

## Do not

- Skip the failing test when the change is logic-bearing
- Add abstractions “for later”
- Claim done without running the tests you added/touched

## End state

- Tests pass locally
- Scope limited to the requested behavior
- Docs/`CHANGELOG_AI` updated if behavior changed
