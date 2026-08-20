---
name: upgrade-existing-project-to-atlas-os
description: Upgrade an existing project to Atlas OS without losing valid docs, architecture knowledge, or project rules. Use when migrating an existing repo to Atlas OS or when the user wants to adopt Atlas OS in a current project.
---

# Upgrade Existing Project to Atlas OS

> **Prefer** `/upgrade-existing-project-to-foundry` from the **PI Foundry** repo (single toolkit path). This skill remains for legacy prompts that still mention a separate Atlas OS folder.

Upgrade an existing software project to use Atlas OS while preserving valid documentation, architecture knowledge, and project-specific rules. Imports shared foundation, creates AI-facing memory in `docs/ai/`, and maps existing content without inventing facts.

## Invocation

**From the project to upgrade (recommended):**

1. Open the existing project in Cursor.
2. Ensure this skill is available (in `.cursor/skills/` or `~/.cursor/skills/`).
3. Invoke `/upgrade-existing-project-to-atlas-os`.
4. Provide the Atlas OS foundation path, e.g.:
   - "Atlas OS at `C:\Progetti\Atlas OS`"
   - "Foundation: `~/repos/Atlas_OS_foundation`"

**Target** = current workspace. **Source** = path you provide.

**From Atlas OS workspace:**
1. Open Atlas OS in Cursor.
2. Invoke `/upgrade-existing-project-to-atlas-os`.
3. Provide the existing project path to upgrade, e.g.:
   - "Upgrade project at `C:\Projects\MySaaS`"

**Target** = path you provide. **Source** = current workspace (Atlas OS).

---

## Steps

### 1. Resolve source and target

- **Target:** The project to upgrade (existing repo).
- **Source:** Atlas OS foundation (rules, agents, skills, docs/ai templates).

Extract paths from the user message. If ambiguous, ask.

### 2. Inspect the existing project

Explore the target repository:

- `.cursor/` — rules, agents, skills (if any)
- `docs/` — any existing docs, architecture, API docs
- Root — `README.md`, `ARCHITECTURE.md`, `CONTRIBUTING.md`, etc.
- Config files — `package.json`, `pyproject.toml`, etc. (for stack inference only; do not invent)

Record what exists. Do not infer or invent; only list discovered files and their purpose if obvious from location/name.

### 3. Create structure (if missing)

Create these under the target if they do not exist:

```
target/
├── .cursor/
│   ├── rules/
│   │   ├── core/
│   │   └── project/
│   ├── agents/
│   └── skills/
└── docs/
    └── ai/
```

### 4. Import Atlas OS foundation files

**Core rules** — import if target file is missing or empty:
- `00-global-operating-principles.mdc`
- `01-documentation-system.mdc`
- `02-branching-and-commit-policy.mdc`
- `03-platform-agnostic-standards.mdc`
- `04-security-baseline.mdc`
- `05-testing-and-definition-of-done.mdc`
- `04-autonomous-execution.mdc`

**Project rules** — import as templates only if missing. If target has custom content, skip.

**Agents** — import all from source if `.cursor/agents/` is empty or missing.

**Skills** — import all skill folders if `.cursor/skills/` is empty or missing. Include full folders (`SKILL.md`, `scripts/`, etc.). Include `bootstrap-atlas-project` and `upgrade-existing-project-to-atlas-os`.

**Version hooks** — import if missing:
- `VERSION` (only if the project has no `package.json` / app-version JSON), `scripts/bump-version.sh`
- `.githooks/pre-commit`, `.githooks/prepare-commit-msg`

Run `git config core.hooksPath .githooks` **yourself** in the target project after import. Only ask the user if blocked.

For Node projects with `package.json` version and no `app-version.json`, the hook bumps `package.json` directly — do not invent a parallel version file unless the project already uses one.

**Safety:** If a target file exists and has substantive content (beyond placeholders), do not overwrite. Record as conflict/skipped.

### 5. Map existing docs into docs/ai/

For each `docs/ai/` file, use existing project docs as the source of truth. Never invent content.

| docs/ai file      | Map from (examples)                            | Action if source exists                    |
|-------------------|------------------------------------------------|--------------------------------------------|
| `ARCHITECTURE.md` | README, docs/*, architecture*.md, tech docs    | Create with links to originals + extracted facts only |
| `PROJECT_RULES.md`| CONTRIBUTING, coding standards, conventions    | Same as above                              |
| `PAGE_DOCS.md`    | Route docs, page specs, UI docs                | Same as above                              |
| `DECISIONS.md`    | ADR/, DECISIONS*, changelog, design docs       | Same as above                              |
| `CHANGELOG_AI.md` | CHANGELOG*, release notes                      | Same as above                              |
| `AGENT_IMPROVEMENTS.md` | (usually none)                             | Use Atlas OS placeholder if missing        |

**Mapping rules:**
- Prefer linking: "See [docs/architecture.md](docs/architecture.md) for details."
- Extract only explicit facts (tech stack, file structure, conventions) when clearly stated.
- Keep originals untouched. Do not move or delete them.
- If no relevant source exists, use the Atlas OS placeholder and leave TODOs.
- Never guess, infer, or fabricate project-specific facts.

### 6. Project rules mapping

If the project has `.cursor/rules/` or similar with custom rules:
- Do not overwrite.
- Optionally add a note in project rules: "See [original path] for legacy rules" if consolidating later.
- If project rules are missing, use Atlas OS project-rule templates.

### 7. Conflict handling

A conflict occurs when:
- Target file exists with custom content
- Source (Atlas OS) has a newer/different foundation version
- User intent is unclear

For each conflict: list it, do not overwrite, suggest manual merge if needed.

### 8. Report summary

Produce a final summary in this format:

```markdown
## Upgrade Summary

**Target project:** <path>
**Atlas OS source:** <path>

### 1. Imported
- path/to/file (from Atlas OS)
- ...

### 2. Mapped
- docs/ai/ARCHITECTURE.md ← derived from README.md, docs/tech.md
- docs/ai/PROJECT_RULES.md ← derived from CONTRIBUTING.md
- ...

### 3. Skipped (existed, preserved)
- path/to/file — reason
- ...

### 4. Conflicts (require manual review)
- path — description of conflict
- ...

### 5. Recommended next steps
1. Review mapped docs/ai/* for accuracy; fix any errors.
2. Resolve conflicts listed above.
3. Populate remaining placeholders from repo evidence when ready.
4. Run `/run-qa-checklist` or similar to validate setup.
5. Commit in a coherent scope (e.g. "chore: upgrade to Atlas OS foundation").
```

---

## Rules

- Never invent project-specific facts. Only use repository evidence or explicit user input.
- Never overwrite valid project-specific files without explicit user confirmation.
- Preserve original documentation; map into docs/ai/ via links and extracted facts.
- Keep the skill generic; avoid references to E-Docs or any single product.
- If a path or step fails, report it and continue with the rest.
- Prefer minimal, safe changes over completeness.
