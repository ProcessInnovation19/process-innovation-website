# Agent guidance

This repo uses **PI Foundry** (`.cursor/` + `docs/ai/`).

**Completion contract:** `GOAL.md` (Definition of Done) + `PROGRESS.md` (persistent checklist).  
Do **not** claim the website task is done until DoD criteria are verified, or only a documented human blocker remains.

## Read order (still authoritative)

Before major implementation or review:

0. `GOAL.md`, `PROGRESS.md`
1. `docs/00_VISION.md` → `docs/09_CURRENT_AP_REFERENCE.md` (numeric order)
2. `docs/99_SOURCES.md`
3. `brand/README.md`
4. Skim `docs/ai/ARCHITECTURE.md` and `docs/ai/PROJECT_RULES.md`

## Priorities

1. communicate A&P as proactive, continuous IT management;
2. preserve factual accuracy of service and partner claims;
3. preserve the futuristic game-HUD interaction language;
4. use official brand colors/assets from `brand/`;
5. favor maintainable, responsive, accessible frontend code;
6. treat `docs/08_OPEN_QUESTIONS.md` as unresolved until explicitly updated;
7. treat `docs/09_CURRENT_AP_REFERENCE.md` as baseline, not publish-as-is copy;
8. work loop: analyze → implement → run → verify → fix → re-run; update `PROGRESS.md`.

Do not infer commercial, legal or security guarantees absent from project documentation.

Useful skills: `/analyze-task`, `/implement-feature`, `/research-before-code`, `/sync-foundation`.
