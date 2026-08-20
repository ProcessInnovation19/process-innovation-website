---
name: implement-feature
description: Implement features with scope confirmation, minimal changes, compatibility checks, and commit-ready state. Use when implementing new features or user stories.
---

# Implement Feature

**Checklist:**

1. Confirm scope (from `analyze-task` if non-trivial)
2. Inspect current implementation
3. Prefer `tdd-workflow` when logic-bearing tests are feasible
4. Change only relevant files (Ponytail / minimal diff)
5. Preserve compatibility
6. Verify behavior (typecheck/tests/build as appropriate); use `build-fix` if verify fails
7. Optional: fresh-context review pass on the diff before claiming done
8. Update docs if needed (`update-project-docs` / CHANGELOG_AI)
9. Prepare commit-ready state
10. Report task end state: CHECKPOINT ONLY | COMMIT READY | COMMIT + PUSH READY
