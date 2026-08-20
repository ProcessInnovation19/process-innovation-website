---
name: harness-security-audit
description: Audit agent harness config — rules, skills, hooks, MCP, secrets exposure. Use when reviewing .cursor/ or agent setup.
origin: ECC-inspired (AgentShield checklist), adapted for Foundry foundation — checklist only, no ECC runtime dependency
---

# Harness Security Audit

Lightweight checklist inspired by ECC AgentShield. Does **not** require installing ECC.

## Scope

- `.cursor/rules`, `.cursor/skills`, `.cursor/agents`, `.cursor/hooks` (if any)
- `.githooks`, MCP configs, `.env*` presence in git
- AGENTS.md / CLAUDE.md instruction injection risks

## Checklist

1. **Secrets** — no tokens/keys in rules, skills, hooks, docs committed to git
2. **Permissions** — skills/agents should not instruct destructive git (`push --force`, hard reset) without explicit user request
3. **Hooks** — hook scripts only run expected local commands; no curl|sh from the internet
4. **MCP** — review enabled servers; least privilege; no untrusted third-party MCP in production repos
5. **Prompt injection** — untrusted file content should not be treated as instructions overriding project rules
6. **Overwrite policy** — sync/bootstrap must not clobber project rules or filled docs/ai without confirmation

## Output

List findings as: Critical / High / Medium / Info with file paths. Fix Critical/High before merge when in scope.
