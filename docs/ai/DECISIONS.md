# Decisions (AI index)

Le decisioni di prodotto/design vivono nei documenti numerati in `docs/`, in particolare:

- `docs/07_IMPLEMENTATION_PLAN.md`
- `docs/08_OPEN_QUESTIONS.md`
- `docs/09_CURRENT_AP_REFERENCE.md`

Non duplicare qui l’intera storia. Aggiungi sotto solo note di sessione operative.

## Session notes

| Date | Note |
|------|------|
| 2026-08-15 | Bootstrap **PI Foundry**. Conservata rule legacy `.cursor/rules/project.mdc`. Spec prodotto resta in `docs/00`–`99`. |
| 2026-08-15 | Aggiunti `GOAL.md`, `PROGRESS.md`, `brand/` (logo .ai/png + token `#30549C` / `#3CA8E4`). Aggiornati CLAUDE/AGENTS/rules. |
| 2026-08-15 | Stack: **Next.js 16 App Router + React 19 + TypeScript strict + Tailwind v4**. Motion con CSS + `IntersectionObserver` invece di GSAP: `docs/07` ammette "libreria motion equivalente", il linguaggio richiesto è fatto di reveal e disegno di path, e questa scelta evita una dipendenza e rende `prefers-reduced-motion` gestibile interamente in CSS. |
| 2026-08-15 | Connessioni: layer SVG proprietario con anchor registrati via context e misure da `getBoundingClientRect`. Requisito di `docs/07` Fase 3: nessuna coordinata hardcoded, ricalcolo al resize. Aggiunto degrado ventaglio→catena sotto una certa larghezza del contenitore per `docs/06` §Responsive. |
| 2026-08-15 | Route multiple (una per voce di sitemap) invece di single-page: `docs/05` le consente entrambe, ma le sezioni sono già componenti riusabili e il routing separato evita una pagina da ~9.400 px. |
| 2026-08-15 | `.npmrc` con `script-shell=powershell.exe`: il path del repo contiene `&` e gli shim `.cmd` di npm non lo gestiscono. Conseguenza: `npm run check` è `scripts/check.mjs` invece di una catena `&&`. |
| 2026-08-17 | **Interferenza luminosa invece che scura.** Reintrodotta su richiesta dopo il passaggio al tema chiaro. Righe di scansione e banda di disturbo stanno dietro al testo libero della mappa: in versione scura ne abbasserebbero il contrasto, che ha meno di 0,02 di margine in luminanza, e la prima prova falliva. In versione luminosa alzano il fondo, quindi possono coprire tutta la mappa senza maschere difensive. Se venissero riportate a scuro, va rifatta la verifica. |
| 2026-08-16 | **Rimossa la barra laterale di navigazione** e **footer ridotto** a marchio, payoff e dati societari. Restano due sole superfici: la mappa (`/`) e il comando «Mappa» in barra. Su una pagina di sezione raggiunta da link diretto le uniche uscite sono il marchio e quel comando: è voluto, il sito si percorre dalla mappa. Il payoff usato è il descrittore di `docs/01` §"Formulazioni utili" — il payoff istituzionale resta aperto in `docs/08` §Brand. |
| 2026-08-16 | **Tema chiaro** su richiesta del committente. `docs/06` §Palette e `brand/README.md` prescrivevano fondo nero: entrambi aggiornati, la decisione è registrata lì. L'identità HUD non dipendeva dal fondo scuro (geometria, nodi, connessioni e motion restano invariati). Introdotto un livello di **token semantici**: i componenti non usano più i colori brand diretti, quindi un cambio di tema è confinato a un solo blocco `@theme`. Conseguenza non negoziabile: in tema chiaro l'accento è `#30549C`, perché `#3CA8E4` su fondo chiaro si ferma a 2,4:1. |
| 2026-08-22 | **Bilancio GPU senza rimuovere la scena.** `PointerDepth` scrive le variabili solo sui layer che le consumano, accorcia l'inseguimento e mette in pausa le derive autonome mentre puntatore o scroll muovono la profondità. I layer di fondo usano containment; i pannelli, le reti, l'interferenza e la parallasse restano presenti. |
| 2026-08-21 | **Bilancio GPU mobile.** Su compact/touch spegne prospettiva e derive decorative; lo svelamento clip-path della foto resta. I visual usano `next/image` (variante WebP ridimensionata invece dei PNG sorgente da ~2 MB). Il flash/lag veniva soprattutto dal compositor, non dal peso trasferito delle immagini. |
| 2026-08-16 | **Profondità dello sfondo** con `perspective` + `translateZ`: piani a distanze diverse, tunnel di telai verso il punto di fuga, sbiadimento atmosferico, parallasse da puntatore e scroll. Un solo listener (`PointerDepth`) alimenta i due layer interessati; tutto il resto è CSS. Coerente con docs/06 («profondità 2.5D leggera tramite transform e prospettiva CSS», niente scena 3D). |
| 2026-08-15 | **La mappa diventa la home; niente landing a scorrimento.** Le sezioni si aprono in **finestra** dal solo comando «Scopri di più» (le voci della mappa selezionano e basta). Implementato con route intercettate (`src/app/@modal/(.)…`): dalla mappa si apre la finestra, da URL diretto la stessa vista è una pagina intera — deep link, SEO e tasto «indietro» restano corretti. Serve `src/app/default.tsx`, altrimenti lo slot `children` resta vuoto sotto la finestra. |
| 2026-08-15 | Fondo vivo della mappa (`MapAmbience`) e riquadri pieni sulle voci: lo sfondo animato non deve trasparire dietro il testo. Intensità degli aloni e colore del microtesto tarati sulla verifica di contrasto, non a occhio. |
| 2026-08-15 | **Mappa di sistema come terminale di briefing** (riferimento indicato dal committente: briefing Metal Gear Solid, terminali Death Stranding). Voci al centro, finestre che si aprono ai lati alla selezione, immagine per sezione, linee ridisegnate a ogni cambio. Motion con `@keyframes` rimontati via `key` invece di transizioni, perché deve rigiocare a ogni selezione. |
| 2026-08-15 | **Navigazione sinottica** al posto del menu d'intestazione, su richiesta esplicita: la sitemap si legge come schema di sistema (rail verticale di nodi sempre visibile da `lg` + mappa a tutto schermo con connessioni SVG). L'header conserva solo marchio, sezione corrente e comando di apertura. Coerente con `docs/06` («sistema connesso», niente template SaaS). Accessibilità garantita da dialog modale con trap del focus, frecce, `Esc` e scorciatoia `M`. |
| 2026-08-15 | Form di contatto: route `/api/contact` che inoltra a `CONTACT_WEBHOOK_URL`. Senza variabile risponde `503 NOT_CONFIGURED` con messaggio esplicito invece di simulare un invio riuscito — `docs/08` §Conversione è ancora aperto. |
