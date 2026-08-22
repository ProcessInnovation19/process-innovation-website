# PROGRESS — Process & Innovation Website

Checklist persistente per sessioni agentiche. Aggiorna questo file mentre lavori.  
Alla ripresa: leggi `CLAUDE.md`, `GOAL.md`, questo file, poi continua fino alla DoD.

Legenda: `[ ]` todo · `[~]` in corso · `[x]` fatto · `[!]` bloccato (serve umano)

## Foundation / repo

- [x] PI Foundry bootstrap (`.cursor/`, `docs/ai/`, githooks)
- [x] `GOAL.md` + `PROGRESS.md` + brand assets
- [x] Frontend progetto inizializzato (Next.js 16 + React 19 + TS + Tailwind v4)
- [x] README con install / dev / build reali
- [x] `.npmrc` con `script-shell=powershell.exe` (il path del repo contiene `&`, gli shim `.cmd` npm si spezzano)

## Design system

- [x] Colori brand da `brand/` (`#000000`, `#30549C`, `#3CA8E4`, `#FFFFFF`) in `@theme`
- [x] **Tema chiaro** su livello di token semantici: i componenti non usano mai i colori brand diretti (86 occorrenze migrate in 31 file)
- [x] `docs/06` e `brand/README.md` aggiornati: prescrivevano fondo nero
- [x] Typography (Inter + JetBrains Mono), spacing, layer HUD
- [x] Dark theme base (`#000308`) + superfici pannello
- [x] Breakpoints (xs→3xl, allineati alla QA di `docs/07`) + `prefers-reduced-motion`

## Linguaggio UI

- [x] Componenti pannello / finestra HUD (`HudPanel`, angoli tagliati, header a modulo)
- [x] Nodi + linee di connessione (SVG, `ConnectionField` + `geometry.ts` + `patterns.ts`)
- [x] Micro-motion coordinate (`Reveal` boot/slide, scan line su header, status indicator)
- [x] Logo brand integrato in header e footer (`public/brand/wordmark.png`, favicon dal mark)
- [x] `TechImageFrame` con placeholder sostituibili senza modificare il layout
- [x] **Navigazione** — nessun menu nell'header e nessuna barra laterale: solo la barra di sistema, che riporta alla mappa (`src/components/nav/`)
- [x] **Footer minimo** — marchio, payoff e dati societari; nessuna navigazione
- [x] **Terminale di briefing** — voci al centro, riquadro visivo a sinistra e pannello di dettaglio a destra che si aprono alla selezione, collegati da linee SVG ridisegnate a ogni cambio
- [x] Riquadro immagine per ciascuna sezione, valorizzabile da `navigation[].visual.src`
- [x] **Sfondo con profondità reale** — piani su asse Z dentro una `perspective`, tunnel prospettico di telai, sbiadimento atmosferico, parallasse da puntatore e scroll (`HudBackdrop` + `PointerDepth`)
- [x] **Scroll della mappa senza scatti** — puntatore interpolato in JS, scroll 1:1, derive in pausa durante lo scroll, niente blur sui piani in movimento
- [x] **Bilancio GPU mobile** — niente parallasse 3D / derive su compact e touch; `next/image` sui visual; svelamento mappa invariato
- [x] **Fluidità desktop** — variabili di profondità locali ai layer, inseguimento puntatore più breve, derive in pausa durante l'input, containment dei fondi; nessun elemento della scena rimosso

## Sitemap / sezioni (`docs/05`)

Il sito **non è una landing a scorrimento**: la home è la mappa e le sezioni si aprono in finestra.

- [x] Home `/` = **mappa di sistema** (hero + briefing con le cinque sezioni)
- [x] Assistenza & Prevenzione `/assistenza-e-prevenzione` — include modello a guasto vs A&P, come funziona, livelli, risultati, modalità hardware
- [x] Cosa gestiamo `/cosa-gestiamo`
- [x] Soluzioni & Partner `/soluzioni-e-partner`
- [x] Process & Innovation `/process-innovation`
- [x] Contatti `/contatti` (form + route `/api/contact`)
- [x] Ogni sezione apribile **in finestra** (route intercettate `@modal/(.)…`) e **come pagina intera** (URL diretto)
- [x] `not-found`, `sitemap.xml`, `robots.txt`

## Qualità

- [x] Desktop verificato (1920×1080, 1440×900)
- [x] Laptop verificato (1280×800)
- [x] Tablet verificato (768×1024)
- [x] Mobile verificato (390×844)
- [x] Nessun overflow orizzontale su nessuna viewport testata (`scrollWidth - clientWidth = 0`)
- [x] Tutti i path SVG entro i limiti del proprio layer (0 fuori bounds)
- [x] TypeScript / lint clean
- [x] Production build OK (12 route)
- [x] Contrasto AA verificato programmaticamente (0 fallimenti su Home e Contatti)
- [x] Contenuti allineati ai docs (audit termini vietati: nessuna occorrenza nei testi pubblici)
- [x] QA finale documentata qui sotto

## QA finale — 15 agosto 2026

Metodo: server di sviluppo + misurazioni programmatiche nel browser (DOM, `getBoundingClientRect`, `getBBox`, contrasto WCAG calcolato sui colori compositi effettivi).

| Verifica | Esito |
|----------|-------|
| `npm run typecheck` | nessun errore |
| `npm run lint` | nessun errore/warning |
| `npm run build` | successo — 12 route (10 statiche, `/api/contact` dinamica) |
| Overflow orizzontale @ 1920 / 1440 / 1280 / 768 / 390 | 0 px su tutte |
| Elementi oltre la viewport | nessuno (esclusi i decorativi dentro `.hud-backdrop`, che è `fixed` + `overflow:hidden`) |
| Connessioni SVG — Home | 10 field, 39 path, 0 fuori bounds |
| Connessioni SVG — altre route | A&P 22 path, Cosa gestiamo 10, Soluzioni 6, P&I 4 — 0 fuori bounds |
| Lunghezza massima linea su mobile | ridotta da 1309 px a 496 px introducendo il degrado a catena |
| Struttura heading | 1 `h1` per pagina, nessun salto di livello |
| Immagini senza `alt` | 0 |
| Link/bottoni senza nome accessibile | 0 |
| Campi form con `<label for>` | 7/7 |
| Contrasto testo (AA) | 0 fallimenti; range misurato 6,6:1 – 20,9:1 |
| Modulo espandibile da tastiera | `aria-expanded` e `hidden` commutano correttamente |
| Menu mobile @390 | apre, 6 voci, chiude con `Esc`, nessun overflow |
| `/api/contact` senza `CONTACT_WEBHOOK_URL` | `503 NOT_CONFIGURED` con messaggio esplicito |
| `prefers-reduced-motion` | blocco CSS presente e verificato nel foglio di stile servito |
| Aree di tocco @390 | tutte ≥ 32 px (footer portato a 44 px); unica eccezione lo skip link, che si dimensiona al focus |
| Server di produzione (`next start`) | 6 route `200`, `sitemap.xml` e `robots.txt` `200`, URL sconosciuto `404`, `/api/contact` `503` |
| Render senza JavaScript (HTML SSR) | h1, copy e struttura presenti; nessuna classe `.js` prima dello script, quindi nessun contenuto nascosto |
| Errori console (tab pulita, 6 route visitate) | nessuno |

### QA della navigazione sinottica

| Verifica | Esito |
|----------|-------|
| Rail visibile da `lg` (1280 / 1440 / 1920) | sì, 64 px, 6 nodi, nodo attivo corretto |
| Rail nascosto sotto `lg` (768 / 390) | sì; la mappa resta l'unica navigazione |
| Intestazione | un solo link (il marchio): nessun menu |
| Apertura mappa con `M` | sì; ignorata mentre si scrive in `input`/`textarea` |
| Mappa | `role="dialog"`, `aria-modal="true"`, 6 nodi, 6 connessioni SVG, 0 fuori bounds |
| Focus all'apertura | va al nodo della sezione corrente |
| Frecce ↑↓ | spostano il focus fra i nodi, con ricircolo |
| `Esc` | chiude, sblocca lo scroll, riporta il focus al comando della barra |
| Overflow con mappa aperta @390 | 0 px |
| Contrasto ricalcolato con risolutore su canvas | 235 nodi di testo, minimo **6,21:1**, 0 fallimenti |
| Briefing @1440 — colonne | visivo `x 112`, voci `x 533`, dettaglio `x 922`; 2 connessioni, 0 fuori bounds |
| Briefing @390 — impilamento | voci `y 170`, dettaglio `y 496`, visivo `y 928`; linea più lunga 426 px; 0 overflow |
| Cambio selezione (↓, ↑, Home, Fine) | dettaglio, immagine, readout `SEL`, cursore e connessioni si aggiornano insieme |
| Tre ↓ nello stesso tick | avanza di 3 posizioni (02 → 05) |
| Contrasto dentro il briefing | 31 nodi di testo, minimo **6,21:1**, 0 fallimenti; nessuna area di tocco sotto 32 px |

### QA della mappa-home e delle finestre di sezione

| Verifica | Esito |
|----------|-------|
| `/` in produzione | rende la mappa (`role="tablist"` + «Scopri di più»), h1 = headline di `docs/05` |
| Voci della mappa | sono `button`, **non** link: il click seleziona e basta, l'URL non cambia |
| «Scopri di più» | apre la finestra della sezione selezionata (verificato su tutte e cinque) |
| Finestra | `role="dialog"`, `aria-modal`, contenuto identico alla pagina, corpo scorrevole |
| Mappa sotto la finestra | resta montata (grazie a `src/app/default.tsx`) |
| Scroll di pagina con finestra aperta | bloccato; ripristinato alla chiusura |
| Chiusura con `Esc` | anima e torna a `/` |
| Tasto «indietro» del browser | chiude la finestra e torna a `/` |
| URL diretto `/cosa-gestiamo` | pagina intera, nessuna finestra, scroll libero |
| Sitemap in produzione | 6 URL, uno per voce di `docs/05` |
| Route in build | 17, incluse le 5 intercettate |
| Finestra @390 | telaio 366 px, corpo scorrevole, 0 overflow orizzontale dentro e fuori |
| Mappa @390 | voci → dettaglio → immagine; 0 overflow; nessuna area di tocco sotto 32 px |

### QA del movimento autonomo dello sfondo — 17 agosto 2026

Lo sfondo era vivo solo al movimento del puntatore; ora si muove da solo, ed è tornata l'interferenza persa nel passaggio al tema chiaro.

| Verifica | Esito |
|----------|-------|
| Strati in movimento continuo | 7, tutti `running`: deriva lontana 26 s, vicina 71 s, piattaforma 9 s, punti 64 s, scansione 1,6 s, disturbo 17 s, alone 16 s |
| Impulsi sui collegamenti | 14, durate 7 → 15 s e ritardi sfalsati: il ciclo non torna in fase |
| Tratto degli impulsi | `pathLength="1"` → 0,04 del percorso; su un link di 250 px il tratto misura 8,75 px |
| Continuità delle derive | ogni ciclo trasla di esattamente una cella (22 / 132 / 76 / 156 px): nessun salto al riavvolgimento |
| Movimento e profondità separati | la trasformazione di profondità sta sul genitore, l'animazione sul figlio: nessuna sovrascrittura, deriva composita |
| **Contrasto dopo l'aggiunta** | invariato, minimo **4,69:1**, 0 fallimenti — l'interferenza è luminosa, quindi alza il fondo invece di abbassarlo |
| `prefers-reduced-motion` | impulsi e disturbo nascosti, tutte le derive azzerate |
| Overflow | 0 px |

### QA della stabilità della mappa — 17 agosto 2026

Le voci della mappa si spostavano al cambio di selezione. Misure sulle cinque sezioni, prima e dopo:

| Grandezza | Prima | Dopo |
|-----------|-------|------|
| Posizione verticale della lista | 409 → 431 px (**22 px di salto**) | **375 px, costante** |
| Larghezza della colonna centrale | 356 → 360 px | **368 px, costante** |
| Posizione orizzontale della lista | 476 → 477 px | **472 px, costante** |
| Altezza delle voci | 56 px (già costante) | 56 px, nessun ritorno a capo |
| Altezza della riga del briefing | 384 → 431 px | **440 px, costante** |
| Riga comandi / footer / altezza pagina | 791 → 838 / 864 → 911 / 937 → 984 | **847 / 920 / 993, costanti** |
| Connessioni fuori dai limiti | — | 0 |
| Mobile @390 | — | lista a 398 px, costante; 0 overflow |

### QA di navigazione e footer — 16 agosto 2026

| Verifica | Esito |
|----------|-------|
| Barra laterale | **rimossa**; nessun offset residuo nel layout, il contenuto torna centrato (sezione a `x 40`, larghezza piena 1344 px) |
| Superfici di navigazione | mappa (`/`) + comando «Mappa» in barra + CTA di sezione; il footer non ne contiene |
| Footer @1440 | altezza **73 px**, 2 righe di testo, 0 link |
| Footer @390 | altezza 133 px (impilato), stesso contenuto |
| Logo del footer | 62×32 px, rapporto **1,95 — identico al naturale**, nessuna deformazione |
| Contrasto sulla mappa dopo le modifiche | minimo **4,69:1**, 0 fallimenti |
| Overflow @1440 e @390 | 0 px |

### QA del tema chiaro e della profondità — 16 agosto 2026

| Verifica | Esito |
|----------|-------|
| `typecheck` · `lint` · `build` | puliti, 17 route |
| Tema applicato | fondo `#edf1f7`, testo `#17293f`, `color-scheme: light` |
| Migrazione ai token semantici | 86 occorrenze in 31 file; 0 colori brand diretti residui nei componenti |
| **Parallasse fra i piani** | a parità di scroll: lontano 103 px, medio 188 px, vicino 278 px |
| **Tunnel prospettico** | 6 telai a Z 0 / −380 / −820 / −1340 / −1960 / −2700 px, opacità 0,50 → 0,15 |
| **Sbiadimento atmosferico** | sfocatura 1,5 / 0,4 / 0 px e opacità 0,35 / 0,75 / 0,50 dal più lontano al più vicino |
| Inclinazione da puntatore | lo spazio ruota in 3D (`matrix3d`), piattaforma e punti della mappa seguono |
| Contrasto sulla mappa, **punto più scuro** del fondo `rgb(195,207,223)` | 62 nodi di testo, minimo **4,64:1**, 0 fallimenti |
| Contrasto su pagina di sezione | 105 nodi, minimo **5,56:1**, 0 fallimenti |
| Contrasto dentro la finestra | 116 nodi, minimo **6,89:1**, 0 fallimenti |
| Overflow @1440 e @390 | 0 px |
| Aree di tocco @390 | tutte ≥ 32 px |

### QA dello sfondo di sistema (versione a tema scuro, storico)

| Verifica | Esito |
|----------|-------|
| Strati montati @1440 | 11, tutti dentro un contenitore `fixed` con `overflow: hidden` |
| Costellazione | 14 nodi, 14 collegamenti, coordinate fisse (nessun `Math.random`: server e client coincidono) |
| Telaio e tacche | rientrano da `lg` (`--frame-left: 5.25rem`) per lasciare fuori il rail |
| Overflow @1440 e @390 | 0 px |
| Fondo vivo della mappa | 5 strati: tre reticoli in deriva, alone che respira, linea d'orizzonte; parallasse da puntatore solo con `transform` |
| **Contrasto sul punto più chiaro dello sfondo** | ricostruito analiticamente `rgb(25,40,63)` — alone globale 18% + alone mappa 10% + incrocio di griglia + grana al massimo: minimo **5,54:1**, 0 fallimenti |
| `prefers-reduced-motion` | scansione nascosta, respiro dei nodi disattivato |
| Errori console | nessuno |

> **Nota sullo strumento di misura del contrasto.** La prima versione dello script leggeva i colori con un'espressione regolare: Tailwind v4 emette i colori con alpha in notazione `oklab()`, quindi i valori venivano interpretati male. La misura definitiva risolve ogni colore dipingendolo su un `<canvas>` e attribuisce ai pannelli il riempimento reale del loro pseudo-elemento `::before`. I numeri riportati sopra vengono da questa seconda versione.

### Difetti trovati e corretti durante la QA

1. **Connessioni misurate durante l'animazione di ingresso** — i pannelli sono ancora traslati da `transform`, che `ResizeObserver` non intercetta: le linee restavano fuori posizione. Aggiunto ricalcolo su `transitionend` più checkpoint temporizzati.
2. **`requestAnimationFrame` non eseguito in tab nascosta** — le linee non venivano mai calcolate. Aggiunto fallback a `setTimeout` e ricalcolo su `visibilitychange`.
3. **Contenuto invisibile senza JavaScript** — lo stato iniziale `opacity: 0` era incondizionato. Ora è vincolato alla classe `.js`, aggiunta da uno script inline prima del primo paint.
4. **Linee lunghe fino a 1309 px su mobile** — contrario a `docs/06` ("connessioni più corte"). Introdotto `hubEdges`, che sotto una certa larghezza degrada da ventaglio a catena.
5. **`.hud-brackets::before` in conflitto con `.hud-panel::before`** — i marker d'angolo rompevano la superficie interna dei pannelli. Sostituiti da un componente `CornerMarks` con elementi reali.
6. **Colore dei marker d'angolo** — la shorthand `border-top` azzerava il colore ereditato. Passato alle longhand.
7. **Contrasto dei placeholder del form** — ~3,6:1 con opacità 70%. Portato al colore pieno (~6,6:1).
8. **Titolo duplicato** su `/process-innovation` ("Process & Innovation — Process & Innovation"). Risolto con `title: { absolute }`.
9. **Aree di tocco del footer a 28 px** su mobile. Portate a `min-h-11` (44 px).
10. **Aree di tocco dei comandi «Dettaglio» a 21 px**, sotto il minimo WCAG 2.2. Portate a 44 px.
11. **Scorciatoia `M` inefficace** quando l'evento non proveniva da un elemento HTML: il controllo `target.closest(...)` sollevava un'eccezione. Sostituito con un controllo `instanceof HTMLElement`.
12. **Focus non riportato al comando** dopo la chiusura della mappa quando l'apertura avveniva da tastiera. Aggiunto un riferimento esplicito al comando della barra come destinazione di ripiego.
13. **Sigle del rail con colore ad alpha ridotto**: contrasto insufficiente a 9 px. Portate a 10 px con colore pieno.
14. **Connessioni del briefing misurate durante l'animazione dei pannelli** — il ricalcolo era agganciato solo a `transitionend`, ma il briefing usa `@keyframes` per poter rigiocare il movimento: le linee restavano sfalsate di 22 px. Aggiunto `animationend` fra i trigger.
15. **Pressioni ravvicinate delle frecce perse** — il gestore leggeva `selected` dal render precedente, quindi tre ↓ nello stesso tick avanzavano di una sola posizione. Introdotto uno specchio della selezione leggibile in modo sincrono.
16. **Motion ridotta fragile nel briefing** — con `animation-duration` quasi nulla i pannelli restano al primo fotogramma se la timeline non avanza (per esempio in una tab non visibile). Sostituita con `animation: none`, che porta gli elementi direttamente allo stato naturale.
17. **Misura del contrasto ferma allo sfondo del `body`** — il backdrop è un figlio del `body` e dipinge *sopra* il suo colore, quindi la verifica non stava considerando gli strati che schiariscono il fondo. Corretta la ricostruzione del fondo effettivo; l'alone principale è stato riportato dal 24% al 18% per mantenere il margine sul testo secondario.
18. **Mappa non conservata sotto la finestra** — con la route intercettata lo slot `children` non ha corrispondenza propria e restava vuoto: la finestra si apriva sul nulla. Aggiunto `src/app/default.tsx` che vi mantiene la mappa.
19. **Contrasto del microtesto sceso a 4,62:1** dopo l'aggiunta del fondo vivo. Ridotto l'alone della mappa dal 14% al 10%, portato il rail a fondo quasi pieno e schiarito `--color-hud-text-mute` da `#7d93ae` a `#8ba0ba`: minimo risalito a **5,54:1**.
20. **Ciano illeggibile come accento in tema chiaro** — `#3CA8E4` su fondo chiaro dà 2,4:1, sotto soglia sia per il testo sia per i tratti che portano significato. L'accento è passato al blu profondo `#30549C`; il ciano resta un colore di segnale sulle superfici scure.
21. **Undici elementi sotto soglia al primo passaggio al chiaro** — in tema chiaro il caso peggiore si ribalta: non è più il punto più chiaro dello sfondo ma il più scuro. Alleggeriti tinta ai bordi (8% → 4%), reticoli (`line-strong` → `line`) e piattaforma della mappa, e scurito `--color-hud-text-mute` a `#3b5470`: minimo risalito da 3,61:1 a 4,64:1.
22. **Verifica su CSS obsoleto** — Turbopack continuava a servire il foglio di stile precedente nonostante `.next/cache` svuotata, quindi una misura di contrasto è stata fatta su token vecchi. Risolto rimuovendo `.next` e ricostruendo; la misura è stata rifatta e i valori riportati sopra vengono da lì.
23. **Logo del footer deformato su mobile** — in colonna il contenitore flex allungava l'immagine a tutta larghezza (350×32 invece di 62×32), perché l'altezza è fissa e la larghezza è `auto`. Risolto con `items-start`.
24. **Le voci della mappa si spostavano al cambio di selezione** — due cause distinte: `items-center` faceva ricentrare la colonna centrale quando il pannello di dettaglio cambiava altezza (salto di 22 px), e la colonna centrale a larghezza `auto` dipendeva dal contenuto delle colonne `fr` accanto (4 px). Risolto con `items-start`, colonna centrale a larghezza fissa e altezza di riga riservata.
25. **Errore di idratazione React su ogni pagina** — lo script inline aggiunge la classe `js` a `<html>` prima dell'idratazione, quindi il markup client differisce da quello server. Aggiunto `suppressHydrationWarning` sull'elemento `<html>`: la differenza è voluta e circoscritta a quell'attributo.

## Blocchi aperti

Nessuno bloccante. I punti sotto restano aperti in `docs/08_OPEN_QUESTIONS.md` e sono gestiti nel codice senza diventare affermazioni pubbliche.

| ID | Descrizione | Dipende da | Gestione attuale |
|----|-------------|------------|------------------|
| OQ-1 | Recapiti pubblici definitivi | decisione commerciale | `publicContacts` vuoto in `src/content/contact.ts`; la pagina mostra uno slot placeholder marcato `data-placeholder` |
| OQ-2 | Destinazione del lead del form | decisione commerciale | `/api/contact` inoltra a `CONTACT_WEBHOOK_URL`; senza variabile risponde `503` con messaggio esplicito, non simula l'invio |
| OQ-3 | Pubblicazione dei prezzi | decisione commerciale | nessun prezzo nel codice; i livelli mostrano solo la profondità di controllo |
| OQ-4 | Qualificazione giuridica dell'Hardware Integrativo | consulente legale/fiscale | descritto solo come modello operativo; nessun uso di noleggio/leasing/comodato |
| OQ-5 | SKU/licenza Bitdefender effettiva | verifica commerciale | elencate solo le funzioni verificate in `docs/04`, con nota sui limiti; nessun EDR/MDR/XDR |
| OQ-6 | Supervisione email AI | architettura + privacy | marcata `in evoluzione` tramite `StatusIndicator` |
| OQ-7 | IP pubblico fisso/statico Voxloud | verifica commerciale | non citato da nessuna parte |
| OQ-8 | Logo ufficiale in SVG | asset brand | usato il PNG ufficiale (`public/brand/wordmark.png`); sostituibile senza modifiche di layout |
| OQ-9 | Formula ufficiale della partnership Voxloud e uso del logo | verifica commerciale | Voxloud citato come soluzione partner, nessun logo o badge |

## Limitazioni note

- Le immagini di infrastruttura sono PNG in `public/visuals/` (set ad alta risoluzione: mappa 1254×1254, pagine 1664×936 / 1120×1400). I JPEG miniatura del commit `2b837ec` vanno rimossi.
- La verifica visiva è stata fatta con misurazioni programmatiche sul DOM reale: nella sessione il pannello browser non era visualizzabile, quindi non ci sono screenshot. Consigliata una passata visiva su `npm run dev` prima della pubblicazione.

## Log sessioni

| Data | Note |
|------|------|
| 2026-08-22 | Reveal immagine a 440 ms con uscita del fascio nel bordo basso; diagonali HUD rinforzate. Profilo Lighthouse: immagini WebP 29 KB @640 / 69 KB @1080, quindi il lag persistente era soprattutto compositing. Variabili di profondità confinate ai layer, derive sospese durante input e finestre, cache immagini 7 giorni. Follow-up verificato: reveal dopo decode, misure SVG deduplicate, varianti immagine 384/480 e logo corretto a 128 px; @390×844 0 animazioni continue e 0 overflow. |
| 2026-08-21 | Bilancio GPU mobile: niente 3D/derive su compact e touch; svelamento mantenuto, visual via `next/image`. |
| 2026-08-21 | Asset `public/visuals/` (commit ChatGPT `2b837ec`) collegati ai riquadri HUD. |
| 2026-08-20 | Allineato lo scroll della mappa al compositor: niente transizione CSS sulle variabili di profondità, pause delle derive, rimosso blur sui piani in movimento. |
| 2026-08-15 | Creati GOAL/PROGRESS; logo copiati in `brand/logo/`; ordine lettura docs confermato 00→09+99. Frontend non ancora scaffoldato. |
| 2026-08-15 | Prima build production-ready: scaffold Next.js 16 + TS + Tailwind v4, design system HUD, layer di connessione SVG, 6 route della sitemap, form + route API, QA completa (tabella sopra) e 8 difetti corretti. |
