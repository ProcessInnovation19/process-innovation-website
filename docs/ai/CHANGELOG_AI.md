# AI changelog

| Date | Change |
|------|--------|
| 2026-08-21 | Mappa: lo svelamento alto→basso resta anche su mobile; il bilancio GPU toglie solo 3D e derive. |
| 2026-08-21 | Mappa: lo svelamento parte a bitmap pronta, così al cambio voce l'immagine non compare tutta insieme dopo un ritardo. |
| 2026-08-21 | Collegati i PNG ad alta risoluzione (`assets/process-innovation-visuals`, `da7c934`) ai `TechImageFrame`; rimossi i JPEG miniatura. |
| 2026-08-20 | Scroll della mappa: rimosse `transition` CSS sulle variabili di profondità, interpolazione puntatore in JS, pause delle derive su `html.is-scrolling`, niente `filter:blur` sui piani in movimento. |
| 2026-08-15 | Bootstrap **PI Foundry** (`.cursor/` core/skills/agents, `docs/ai/`, githooks, `FOUNDATION_VERSION`). Mapped architecture/rules from existing `docs/` + `AGENTS.md`. Kept legacy `.cursor/rules/project.mdc`. |
| 2026-08-15 | `GOAL.md` + `PROGRESS.md` + brand assets/colors for Claude Code / Cursor autonomy loop. |
| 2026-08-17 | Sfondo con movimento autonomo (derive dei reticoli, impulsi lungo i collegamenti, piattaforma che scorre) e interferenza reintrodotta dopo il passaggio al tema chiaro, in versione **luminosa** per non intaccare il contrasto. Stabilizzato il layout della mappa: le voci non si spostano più al cambio di selezione. |
| 2026-08-16 | Rimosso `NavRail` e relativi offset; footer riscritto compatto (marchio, payoff, dati societari). Aggiornati `README.md`, `PROGRESS.md`, `docs/ai/ARCHITECTURE.md`, `docs/ai/PAGE_DOCS.md`. |
| 2026-08-16 | Passaggio a **tema chiaro** con livello di token semantici (86 occorrenze migrate in 31 file) e **profondità reale** dello sfondo (`perspective` + `translateZ`, tunnel prospettico, parallasse via `PointerDepth`). Aggiornati `docs/06`, `brand/README.md`, `README.md`, `PROGRESS.md`. |
| 2026-08-15 | Riarchitettura dell'esperienza: la mappa è la home (`/`), le sezioni si aprono in finestra tramite route intercettate (`@modal/(.)…`) dal comando «Scopri di più». Estratte le viste in `src/components/views/`, aggiunti `SectionWindow`, `BriefingMap`, `MapAmbience`, `src/app/default.tsx`. Rimossi `SystemMap` overlay e `HeroSection`. |
| 2026-08-15 | Sfondo di sistema a strati (`HudBackdrop`): aloni, griglia doppia, costellazione di nodi collegati, tacche strumentali, scansione lenta, grana, telaio d'angolo. Intensità dell'alone vincolata alla verifica di contrasto. |
| 2026-08-15 | Mappa di sistema rifatta come terminale di briefing: voci al centro, riquadro visivo e pannello di dettaglio che si aprono ai lati, connessioni ridisegnate a ogni selezione (`redrawKey`), immagini per sezione in `navigation[].visual`. |
| 2026-08-15 | Navigazione rifatta come sinottico (`src/components/nav/`): rimosso il menu d'intestazione, aggiunti rail di nodi e mappa di sistema. Aggiornati `README.md`, `PROGRESS.md`, `docs/ai/ARCHITECTURE.md`, `docs/ai/PAGE_DOCS.md`. |
| 2026-08-15 | Prima build production-ready del sito: Next.js 16 + React 19 + TS + Tailwind v4, design system HUD, layer SVG di connessione, 6 route della sitemap, form + `/api/contact`, QA su 5 viewport. Aggiornati `README.md`, `PROGRESS.md`, `docs/ai/ARCHITECTURE.md`, `docs/ai/PAGE_DOCS.md`, `docs/ai/SESSION.md`. |
