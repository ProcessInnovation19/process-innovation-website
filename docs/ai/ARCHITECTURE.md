# Architecture — Process & Innovation Website

> Fonte di verità: `docs/00_VISION.md` … `docs/09_*`, `docs/99_SOURCES.md`, `README.md`. Non inventare claim commerciali/legali/security assenti lì.

## Purpose

Sito istituzionale di **Process & Innovation** (FL Solving System S.r.l.) centrato sul servizio **Assistenza & Prevenzione (A&P)**: gestione IT proattiva e continua, non assistenza a guasto.

## Scope

- In scope: sito marketing/istituzionale, contenuti A&P, direzione HUD futuristica, frontend maintainable.
- Out of scope (per il prodotto sito): apparire come riparazioni a chiamata, negozio PC, software house generica, cybersecurity “rischio zero”.
- `docs/09_CURRENT_AP_REFERENCE.md` = baseline servizio attuale, **non** copy da pubblicare invariato.

## Stack (implementato)

- Next.js 16 (App Router) + React 19 + TypeScript strict
- Tailwind CSS v4 (`@theme`) + design system HUD in `src/app/globals.css`
- Motion: CSS transitions guidate da `IntersectionObserver` (`src/lib/useInView.ts`) — nessuna libreria esterna
- SVG proprietario per linee/connessioni (`src/components/connections/`)
- `next/font/google`: Inter (testo) + JetBrains Mono (microtesti tecnici)
- **No** WebGL/Three.js

Dettagli operativi (install, dev, build, nota Windows su `&` nel path) in `README.md`.

## Struttura

| Path | Ruolo |
|------|--------|
| `src/app/` | Route App Router, una per voce di sitemap, + `api/contact` |
| `src/components/connections/` | Layer SVG: `ConnectionField`, `geometry.ts`, `patterns.ts` |
| `src/components/nav/` | Navigazione: `SystemNav`, `SystemBar`, `BriefingMap`, `SectionWindow` |
| `src/components/hud/` | Linguaggio UI: pannelli, nodi, label, status, CTA, reveal |
| `src/components/layout/` | Header, footer, sfondo, hero di pagina |
| `src/components/sections/` | Sezioni di contenuto riutilizzabili fra route |
| `src/content/` | Copy tipizzata, con riferimento ai docs di origine e ai vincoli |
| `src/lib/` | Hook e utility |
| `docs/00`–`09`, `99` | Spec prodotto/brand/UX/implementazione |
| `docs/ai/` | Indice memoria per agenti PI Foundry |
| `.cursor/` | Rules, skill, agenti (PI Foundry + rule legacy `rules/project.mdc`) |
| `AGENTS.md` / `CLAUDE.md` | Handoff agenti |

## Sistema di connessione

Elemento caratterizzante (`docs/06`). Regole architetturali:

- gli anchor sono elementi reali registrati nel `ConnectionField` tramite context;
- i path sono calcolati da `getBoundingClientRect()` nello spazio locale del layer — **mai** coordinate hardcoded;
- il ricalcolo avviene su `ResizeObserver` (contenitore e anchor), `resize`, `orientationchange`, `document.fonts.ready`, `transitionend` delle animazioni di ingresso e `visibilitychange`;
- l'animazione di ingresso usa `pathLength="1"` + `stroke-dashoffset`, neutralizzata da `prefers-reduced-motion`;
- `patterns.ts` degrada il ventaglio hub→moduli a catena quando il contenitore è stretto, così su mobile le linee restano corte.

## Navigazione e struttura dell'esperienza

Vincoli di prodotto:

1. **la navigazione non è un menu di link nell'intestazione**, è uno schema sinottico;
2. **il sito non è una landing a scorrimento**: la home è la mappa e le sezioni si aprono in finestra;
3. **una sezione si apre solo dal comando «Scopri di più»**, non cliccando la voce nella mappa.

- `BriefingMap` (`/`) — voci **al centro** che selezionano soltanto; riquadro visivo a sinistra e pannello di dettaglio a destra, collegati dallo stesso layer SVG del sito. Semantica `tablist` verticale con `↑↓`, `Home`/`Fine`. Le voci sono pannelli HUD a riempimento pieno: il fondo animato non deve trasparire dietro il testo.
- **Le voci del menu devono restare immobili** al cambio di selezione: colonna centrale a larghezza fissa, `items-start`, altezza di riga riservata. Sono tre vincoli espliciti, commentati nel componente — cambiando griglia o allineamento la lista ricomincia a saltare.
- `SectionWindow` + route intercettate in `src/app/@modal/(.)…` — la sezione si apre sopra la mappa; l'URL diretto rende la stessa vista come pagina intera. La chiusura usa `router.back()`, quindi il tasto «indietro» del browser equivale a `Esc`.
- `src/app/default.tsx` — **necessario**: con una route intercettata lo slot `children` non ha corrispondenza e resterebbe vuoto; lì sotto deve restare la mappa.
- `src/components/views/` — il contenuto di ogni sezione, condiviso fra pagina intera e finestra (`inWindow` regola solo la spaziatura iniziale).
- `SystemBar` — marchio, posizione corrente, ritorno alla mappa (`M`). Nessuna lista di link.
- Il footer non contiene navigazione: solo marchio, payoff e dati societari.

Regole di motion del briefing:

- si usano `@keyframes` e non transizioni, perché il movimento deve **ripartire a ogni cambio di selezione**: i pannelli sono rimontati con una `key`, le linee ridisegnate con `redrawKey` su `ConnectionField`;
- `ConnectionField` ricalcola anche su `animationend`, altrimenti misurerebbe gli anchor mentre i pannelli sono ancora traslati;
- con `prefers-reduced-motion: reduce` le animazioni del briefing sono azzerate con `animation: none`, non accorciate: una durata quasi nulla lascerebbe gli elementi al primo fotogramma se la timeline non avanza.

Aggiungere una sezione richiede: una voce in `sections` (`src/content/site.ts`), una vista in `src/components/views/`, la pagina intera in `src/app/<slug>/` e la route intercettata in `src/app/@modal/(.)<slug>/`. Mappa e sitemap si aggiornano da sole.

## Experience constraints

- Non parallax cinematografico / non sito 3D.
- Linguaggio UI: **menu/HUD videogioco futuristico**, leggibile e credibile B2B (pannelli, linee/nodi, micro-motion).
- Niente navigazione da sito istituzionale classico: nessun menu orizzontale nell'header, nessun hamburger che apre una lista di link.
- Dettaglio: `docs/06_VISUAL_AND_INTERACTION_DIRECTION.md`.
- Profondità: `PointerDepth` scrive `--pointer-x/y` e `--scroll-depth` direttamente su `.hud-backdrop` / `.map-ambience`, evitando di invalidare gli stili dell'intera pagina. Su desktop l'inseguimento del puntatore mette temporaneamente in pausa le derive autonome; su compact/touch il CSS spegne prospettiva e derive (`@media (max-width: 63.99rem), (hover: none) and (pointer: coarse)`). Lo svelamento dell'immagine sulla mappa resta.

## Content boundary

La copy pubblica vive solo in `src/content/`. Ogni file dichiara in testa i documenti di origine e i vincoli. Per cambiare un messaggio: prima il documento numerato in `docs/`, poi il contenuto.

## Open items

Tutto ciò che è in `docs/08_OPEN_QUESTIONS.md` resta irrisolto finché non aggiornato esplicitamente. La mappa di come ogni punto aperto è gestito nel codice (senza diventare claim pubblico) è in `PROGRESS.md` § "Blocchi aperti".
