---
name: e2e-smoke
description: Run or author a minimal end-to-end smoke path for critical user flows. Use after UI/API changes that affect primary journeys.
origin: ECC-inspired (e2e patterns), adapted for Foundry foundation
---

# E2E Smoke

## Checklist

1. Identify the **one** critical path touched by the change
2. Prefer existing Playwright/Cypress/project e2e runner
3. Keep the smoke minimal (happy path + one auth/permission edge if relevant)
4. Record how to run it in the task end state
5. If no e2e harness exists, document a manual smoke checklist in `docs/ai` — do not invent a full framework unless requested
