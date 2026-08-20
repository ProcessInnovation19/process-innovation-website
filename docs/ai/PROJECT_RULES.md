# Project rules — Process & Innovation Website

> Fonte: `AGENTS.md`, `.cursor/rules/project.mdc`, `docs/00`–`09`.

## Product / messaging

- Comunicare A&P come **gestione IT proattiva e continua**, non break/fix.
- Accuratezza fattuale su servizi e partner: solo claim presenti in docs (+ `99_SOURCES` quando rilevante).
- `09_CURRENT_AP_REFERENCE` = baseline operativa odierna, non contenuto obbligatorio da pubblicare tale e quale.
- Non inferire garanzie commerciali, legali o di security non documentate.
- Non trasformare open questions (`08`) in claim pubblici.

## UX / visual

- Preservare il linguaggio **game-HUD futuristico** (`docs/06`).
- Niente template SaaS generico; niente 3D/WebGL come requisito di questa direzione.
- Preferire componenti, content e motion **modulari**.

## Implementation

- Priorità: frontend maintainable, responsive, accessibile.
- Stack consigliato in `07_IMPLEMENTATION_PLAN` (Next/React/TS + motion + SVG).
- Leggere i docs in ordine numerico prima di implementazioni/review maggiori.

## Docs map (canonical)

Product truth stays under `docs/*.md` (numbered).  
`docs/ai/` is the agent-facing index — update product facts in the numbered docs first.
