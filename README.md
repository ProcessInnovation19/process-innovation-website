# Process & Innovation Website

Sito istituzionale di **Process & Innovation** (FL Solving System S.r.l.), centrato sul servizio **Assistenza & Prevenzione (A&P)**.

Il repository non parte dal codice: contiene prima di tutto la **fonte di verità** su brand, servizio, contenuti, direzione visiva e interazioni. L'implementazione segue i documenti in `docs/` nell'ordine indicato in `CLAUDE.md`.

## Obiettivo

Comunicare un modello di gestione IT **proattivo e continuativo**: il cliente paga per avere infrastruttura, dispositivi e servizi sotto controllo, non per generare fatturato ogni volta che qualcosa si rompe.

## Direzione dell'esperienza

Non è un sito parallax cinematografico e non è un sito 3D. L'interfaccia ricorda un **menu/HUD di un videogioco futuristico**, mantenendo leggibilità e credibilità B2B: pannelli con angoli tagliati, nodi, linee di connessione calcolate sugli elementi reali, micro-animazioni coordinate allo scroll.

**La navigazione non è una barra di link**: si parte dalla mappa di sistema e le sezioni si aprono in finestra. Vedi *La mappa è la home* più sotto.

---

## Stack

| Ambito | Scelta |
|--------|--------|
| Framework | [Next.js 16](https://nextjs.org) — App Router, React 19 |
| Linguaggio | TypeScript (strict, `noUncheckedIndexedAccess`) |
| Stile | Tailwind CSS v4 (token in `@theme`) + design system HUD in `src/app/globals.css` |
| Motion | CSS transitions + `IntersectionObserver` (hook `useInView`) — nessuna libreria di animazione |
| Connessioni | Layer SVG proprietario con anchor registrati e `ResizeObserver` |
| Font | `next/font/google` — Inter (testo) + JetBrains Mono (microtesti tecnici) |
| Lint | ESLint 9 flat config + `eslint-config-next` |

Non è usato WebGL/Three.js: non serve a questa direzione (`docs/07`).

## Requisiti

- Node.js ≥ 20 (sviluppato su 22.16)
- npm ≥ 10 (o pnpm)

## Installazione

```bash
npm install
```

## Sviluppo

```bash
npm run dev
```

L'applicazione risponde su **`http://localhost:3141`**.

La porta è impostata negli script `dev` e `start` (`next … -p 3141`): è volutamente fuori dalle porte di default, che su una macchina di sviluppo sono spesso già occupate da altri progetti. Per cambiarla basta modificare quei due script e la `port` in `.claude/launch.json`.

## Build di produzione

```bash
npm run build
```

Avvio del server di produzione:

```bash
npm run start
```

## Controlli

```bash
npm run check
```

Esegue in sequenza `typecheck` → `lint` → `build`. Gli step sono anche disponibili singolarmente:

```bash
npm run typecheck
```

```bash
npm run lint
```

> **Nota Windows.** Il percorso di questo repository contiene il carattere `&`. Gli shim `.cmd` generati da npm non lo gestiscono (`SET dp0=%~dp0` non è quotato) e ogni script fallirebbe con *«"Innovation" non è riconosciuto come comando»*. Per questo `.npmrc` imposta `script-shell=powershell.exe`, che usa gli shim `.ps1`. Di conseguenza `npm run check` è uno script Node (`scripts/check.mjs`) invece di una catena `&&`.

## Struttura

```text
src/
  app/
    layout.tsx                # shell, font, barra, footer, slot finestre
    page.tsx                  # Home = mappa di sistema
    default.tsx               # fallback di `children`: la mappa sotto le finestre
    @modal/                   # slot delle finestre di sezione
      default.tsx             # vuoto quando nessuna route è intercettata
      (.)assistenza-e-prevenzione/
      (.)cosa-gestiamo/
      (.)soluzioni-e-partner/
      (.)process-innovation/
      (.)contatti/
    assistenza-e-prevenzione/ # stessa sezione come pagina intera
    cosa-gestiamo/
    soluzioni-e-partner/
    process-innovation/
    contatti/
    api/contact/route.ts      # ricezione del modulo di contatto
    globals.css               # token, geometria HUD, motion language
    icon.png                  # favicon (mark ufficiale)
  components/
    connections/              # layer SVG di connessione
      ConnectionField.tsx     # provider + misurazione + rendering
      geometry.ts             # path ortogonali con angoli raccordati
      patterns.ts             # hub/ventaglio e catene, con degrado su mobile
    hud/                      # linguaggio UI (pannelli, nodi, label, CTA…)
    nav/
      SystemNav.tsx           # stato della barra e scorciatoia da tastiera
      SystemBar.tsx           # barra di sistema (marchio, posizione, ritorno alla mappa)
      BriefingMap.tsx         # la mappa: voci al centro, finestre ai lati
      SectionWindow.tsx       # telaio della finestra di sezione
    views/                    # contenuto delle sezioni, uguale in pagina e in finestra
    layout/                   # footer, sfondo, fondo vivo della mappa, hero di sezione
    sections/                 # blocchi di contenuto riutilizzabili fra viste
  content/                    # copy, tipizzata, separata dai componenti
    site.ts  aep.ts  capabilities.ts  partners.ts  company.ts  contact.ts
  lib/                        # hook e utility (useInView, useReducedMotion, cn)
public/
  brand/                      # logo copiati da brand/logo/
  images/                     # slot per gli asset definitivi
brand/                        # asset ufficiali e token colore
docs/                         # fonte di verità di prodotto e contenuto
```

### Contenuti

Tutta la copy pubblica vive in `src/content/`. Ogni file cita in testa i documenti di origine e i vincoli da rispettare (per esempio: Hardware Integrativo A&P non va qualificato come noleggio/leasing/comodato). Modificare prima il documento in `docs/`, poi il contenuto.

### La mappa è la home

Il sito **non è una landing a scorrimento**. Si parte dalla mappa di sistema (`/`) e le sezioni si aprono in finestra.

[BriefingMap.tsx](src/components/nav/BriefingMap.tsx) — terminale di briefing:

- le **voci stanno al centro** e **selezionano soltanto**: aprono il riquadro visivo a sinistra e il pannello di dettaglio a destra, collegati da linee tracciate dallo stesso layer SVG del resto del sito;
- l'unico comando che apre una sezione è **«Scopri di più»** nel pannello di dettaglio;
- le voci sono pannelli HUD con riempimento pieno, così lo sfondo animato non traspare dietro il testo; hover e selezione cambiano bordo, riempimento, barra di stato e cursore;
- semantica di `tablist` verticale: `↑ ↓` scorrono con ricircolo, `Home`/`Fine` saltano agli estremi, il focus segue la selezione;
- sotto i 900 px di larghezza il briefing si impila (voci, dettaglio, immagine) e le connessioni diventano verticali corte.

**Le voci non si muovono mai.** È un vincolo di layout, non un effetto collaterale: la colonna centrale ha larghezza fissa (le colonne `fr` accanto la facevano oscillare di qualche pixel), l'allineamento è `items-start` (con `items-center` la colonna veniva ricentrata ogni volta che il pannello di dettaglio cambiava altezza) e la riga del briefing ha un'altezza riservata (i cinque pannelli misurano fra 363 e 431 px, quindi senza riserva saltavano riga comandi e footer). Allungando i contenuti oltre la riserva la riga cresce: va rimisurata per tornare stabile.

### Finestre di sezione

Ogni sezione ha una route propria e si apre in due modi:

| Come ci arrivi | Cosa vedi |
|---|---|
| «Scopri di più» dalla mappa, o un link interno | **Finestra** sopra la mappa (route intercettata in `src/app/@modal/`) |
| URL diretto, refresh, link esterno, motore di ricerca | **Pagina intera** |

Il contenuto è lo stesso: le viste in `src/components/views/` sono usate da entrambi i percorsi, con `inWindow` a regolare solo la spaziatura iniziale.

[SectionWindow.tsx](src/components/nav/SectionWindow.tsx) apre con una sequenza: velo → fascio orizzontale → apertura a diaframma del telaio (`clip-path`) → ingresso del contenuto, più una scansione che attraversa la finestra. La chiusura rigioca il diaframma al contrario prima di tornare indietro nella cronologia, quindi **il tasto «indietro» del browser chiude la finestra** esattamente come `Esc` o il comando di chiusura. Dentro, il corpo scorre in autonomia (`overscroll-behavior: contain`) mentre la pagina sotto è bloccata; il focus è confinato nel telaio.

`src/app/default.tsx` è necessario: quando una route è intercettata lo slot `children` non ha corrispondenza propria e senza fallback resterebbe vuoto — lì sotto deve restare la mappa.

### Barra di sistema e footer

**Barra di sistema** — unica superficie di navigazione persistente: marchio, posizione corrente (codice + nome) e ritorno alla mappa (`M` da tastiera, disattivata mentre si scrive in un campo). Nessuna lista di link.

**Footer** — solo marchio, payoff e dati societari, senza navigazione. Il payoff è il descrittore di servizio già documentato in `docs/01` §"Formulazioni utili": il payoff *istituzionale* è ancora un punto aperto (`docs/08` §Brand) e quando verrà deciso basta sostituire `site.tagline`.

Da qui la mappa dei percorsi: la mappa porta alle sezioni, la barra riporta alla mappa. Su una pagina di sezione raggiunta da link diretto le uniche uscite sono il marchio e il comando «Mappa» — è voluto, il sito si percorre dalla mappa.

Il movimento del briefing usa `@keyframes` e non transizioni, perché deve **ripartire da capo a ogni cambio di selezione**: pannelli e righe di testo vengono rimontati con una `key`, le linee ridisegnate tramite `redrawKey` su `ConnectionField`. Con `prefers-reduced-motion: reduce` le animazioni sono azzerate (`animation: none`), non solo accorciate.

### Sistema di connessione

`ConnectionField` misura gli anchor realmente presenti nel DOM (`getBoundingClientRect`), calcola i path nello spazio locale del layer e li ridisegna su `ResizeObserver`, resize, `orientationchange`, caricamento font, fine delle transizioni di ingresso e cambio di visibilità della tab. Non esistono coordinate hardcoded.

`redrawKey` forza il rimontaggio dei path per rigiocare l'animazione di disegno quando gli anchor si spostano per una scelta dell'utente.

`patterns.ts` fornisce due topologie:

- `hubEdges` — ventaglio da un nodo sorgente verso più moduli; sotto una certa larghezza del contenitore degrada a catena fra moduli consecutivi, così su mobile le linee restano corte;
- `chainEdges` — sequenze e progressioni.

### Tema e token

Il sito usa un **tema chiaro** (decisione del 16 agosto 2026; `docs/06` e `brand/README.md` sono aggiornati di conseguenza). L'identità HUD non dipendeva dal fondo scuro: geometria dei pannelli, nodi, connessioni e motion language sono invariati.

I componenti usano **solo token semantici** — `--color-hud-accent`, `--color-hud-text-strong`, `--color-hud-on-accent`, … — mai i colori brand diretti. Cambiare tema significa riscrivere il blocco `@theme` in [globals.css](src/app/globals.css) e nient'altro.

Due conseguenze del passaggio a chiaro, entrambe imposte dal contrasto e non da gusto:

- **l'accento è il blu profondo `#30549C`, non il ciano `#3CA8E4`**: su fondo chiaro il ciano si ferma a 2,4:1, sotto la soglia sia per il testo sia per i tratti che portano significato;
- **il caso peggiore si è ribaltato**: in tema scuro era il punto più *chiaro* dello sfondo, ora è il più *scuro* (tinta ai bordi + linee di reticolo + grana sovrapposte). Ogni colore di testo è tarato lì.

### Sfondo di sistema

L'interfaccia galleggia davanti a uno spazio profondo. La profondità **non è dipinta**: i piani stanno a distanze diverse su un asse Z reale dentro una `perspective`, quindi puntatore e scroll producono parallasse vera. È la "profondità 2.5D leggera tramite transform e prospettiva CSS" ammessa da `docs/06`, senza scena 3D e senza WebGL.

[HudBackdrop.tsx](src/components/layout/HudBackdrop.tsx) monta tre indizi di profondità che lavorano insieme:

| Indizio | Come |
|---|---|
| **Parallasse** | tre piani a `translateZ` −1600 / −800 / −220 px; a parità di scroll si spostano di 103 / 188 / 278 px |
| **Prospettiva** | tunnel di sei telai a Z 0 → −2700 px, con opacità 0,50 → 0,15 |
| **Atmosfera** | più un piano è lontano, più è sfocato (1,5 / 0,4 / 0 px) e sbiadito |

Sopra: tacche strumentali ai bordi, scansione lenta (19 s), grana anti-banding in `multiply` e telaio d'angolo. 

[MapAmbience.tsx](src/components/layout/MapAmbience.tsx) aggiunge sulla mappa una piattaforma prospettica che fugge verso il punto di fuga, punti sospesi che danno scala, l'alone che respira, la linea d'orizzonte e l'interferenza.

**Movimento autonomo.** La scena resta viva anche a puntatore fermo:

| Strato | Movimento |
|---|---|
| Reticolo lontano / vicino | derivano in direzioni opposte (26 s / 71 s) |
| Collegamenti della costellazione | impulsi che li percorrono, durate 7–15 s primi fra loro |
| Piattaforma della mappa | le linee scorrono verso di noi (9 s) |
| Punti sospesi | deriva lenta (64 s) |
| Righe di scansione | risalgono (1,6 s) |
| Banda di disturbo | attraversa la mappa ogni 17 s, con due sfarfallii |

Due regole strutturali dietro a tutto questo:

- **ogni deriva trasla di esattamente una cella** del proprio motivo: a fine ciclo il disegno coincide con quello iniziale e il ritorno è invisibile;
- **il movimento sta su un figlio dedicato**, mai sullo stesso elemento che porta la trasformazione di profondità: due animazioni sullo stesso `transform` si sovrascriverebbero, e così la deriva resta composita invece di ridipingere uno strato intero a ogni fotogramma.

Gli impulsi lungo i collegamenti sono un tratteggio corto su una copia del percorso, con `pathLength="1"`: la lunghezza del tratto è una **frazione** del collegamento, non un valore assoluto, quindi resta proporzionata su link di lunghezze diverse.

**L'interferenza è luminosa, non scura.** Sta dietro al testo libero della mappa: un disturbo scuro ne abbasserebbe il contrasto, che qui ha pochissimo margine, mentre uno luminoso lo alza. Per questo può coprire tutta la mappa senza maschere difensive. Se venisse reso scuro, va rifatta la verifica di contrasto.

[PointerDepth.tsx](src/components/layout/PointerDepth.tsx) è l'unico listener: scrive `--pointer-x`, `--pointer-y` e `--scroll-depth` su `:root`, e tutto il resto legge quelle variabili. Si spegne con motion ridotta e ignora il puntatore su schermi touch.

Le coordinate della costellazione sono fisse, non casuali: il markup del server e quello del client devono coincidere. Il viewBox è ritagliato con `slice`, quindi la composizione regge da mobile a 1920.

**La densità degli strati è vincolata dal contrasto.** Sopra passa microtesto tecnico: sommando tinta ai bordi, linee dei due reticoli, piattaforma della mappa e grana si ottiene il punto più scuro del fondo, ed è lì che i colori di testo sono tarati. Alzando una qualsiasi di quelle opacità va rifatta la verifica.

### Motion e accessibilità

- Le animazioni di ingresso sono CSS (`[data-reveal]`) e vengono neutralizzate da `prefers-reduced-motion: reduce`, insieme alla scansione e al respiro dei nodi di sfondo.
- Lo stato iniziale nascosto è vincolato alla classe `.js`: senza JavaScript il contenuto resta visibile.
- Skip link, `:focus-visible` con colore brand, moduli espandibili con `aria-expanded`/`aria-controls`, menu mobile chiudibile con `Esc`, nessuna interazione dipendente solo dall'hover.

### Asset

I riquadri `TechImageFrame` senza `src` mostrano un placeholder HUD marcato con `data-asset-placeholder`. Per sostituirlo basta passare `src` (e `alt`): il layout non cambia.

Il briefing ha un riquadro visivo per ciascuna delle sei sezioni: si valorizzano da `navigation[].visual.src` in [src/content/site.ts](src/content/site.ts), senza toccare i componenti.

## Configurazione

| Variabile | Effetto |
|-----------|---------|
| `CONTACT_WEBHOOK_URL` | Endpoint a cui `/api/contact` inoltra il modulo. Se non impostata la route risponde `503 NOT_CONFIGURED` e l'interfaccia lo comunica esplicitamente, senza simulare un invio riuscito. |

## Documentazione

Ordine di lettura:

0. `GOAL.md`, `PROGRESS.md`
1. `docs/00_VISION.md` … `docs/09_CURRENT_AP_REFERENCE.md`
2. `docs/99_SOURCES.md`
3. `brand/README.md`

`CLAUDE.md` contiene l'handoff per gli agenti; `AGENTS.md` e `.cursor/` mantengono le stesse priorità in Cursor.

## Regola importante

`docs/09_CURRENT_AP_REFERENCE.md` descrive il servizio/listino oggi in uso. È una **baseline**, non il nuovo sito definitivo: i prezzi non vengono pubblicati e i punti aperti di `docs/08_OPEN_QUESTIONS.md` non vengono trasformati in affermazioni definitive.
