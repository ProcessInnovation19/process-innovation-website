---
name: research-before-code
description: Research-first — check docs, existing code, and official sources before implementing. Use before integrating APIs or unfamiliar libraries.
origin: ECC-inspired (search-first), adapted for Foundry foundation
---

# Research Before Code

Adapted from ECC `search-first`. Prevents invented APIs and outdated patterns.

## When to use

- External APIs, SDKs, framework features you have not used in this repo
- Ambiguous requirements that hinge on how a library actually works

## Checklist

1. Search **this codebase** for existing helpers/patterns
2. Prefer **official docs** for the pinned version in the project
3. Use Context7 / verified docs when available
4. Record assumptions vs facts in the task notes or Project Brain / DECISIONS
5. Only then implement the minimal change

## Do not

- Invent method names or config keys from memory
- Add a new dependency without checking if one is already installed
