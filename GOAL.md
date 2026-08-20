# GOAL — Process & Innovation Website

**Obiettivo corrente:** realizzare una prima versione **production-ready** del nuovo sito Process & Innovation, seguendo integralmente la documentazione del repository.

Questo file è la **Definition of Done** del lavoro agentico. Non dichiarare il task completato finché i criteri non sono stati verificati (o finché non resta solo un blocco reale che richiede input umano).

---

## Obiettivo finale

Sito istituzionale navigabile, coerente con brand/A&P/HUD, implementato in codice, con build di produzione ok, contenuti allineati ai docs e QA finale eseguita.

## Definition of Done

Il goal è raggiunto **solo** quando:

1. Tutte le sezioni previste dalla sitemap in `docs/05_SITE_ARCHITECTURE_AND_COPY.md` sono implementate (Home, Assistenza & Prevenzione, Cosa gestiamo, Soluzioni & Partner, Process & Innovation, Contatti — anche in single-page strutturata se il design lo consente).
2. Il sito è completamente navigabile (link/ancore/menu funzionanti).
3. L’identità **HUD futuristica** è chiaramente percepibile (non template SaaS generico).
4. Il sistema di **pannelli, nodi e linee di connessione** funziona come linguaggio UI (`docs/06`).
5. Le animazioni sono coerenti col motion language e non decorative/casuali.
6. Desktop, tablet e mobile sono verificati.
7. Nessun overflow o layout rotto sui breakpoint principali.
8. `prefers-reduced-motion` è gestito.
9. Build di produzione completata senza errori.
10. TypeScript / lint senza errori bloccanti.
11. I contenuti corrispondono ai documenti del repository (significato invariato; copy rifinibile).
12. Nessun punto “da verificare” / open question viene trasformato in claim definitivo.
13. Asset mancanti usano **placeholder sostituibili** (logo brand in `brand/logo/` va usato dove previsto).
14. `README.md` contiene istruzioni di installazione, sviluppo e build aggiornate allo stack reale.
15. È stato fatto un **passaggio finale di QA** dopo l’implementazione (documentato in `PROGRESS.md`).

## Work loop (obbligatorio)

Continua autonomamente:

```text
analizzare → implementare → eseguire → verificare → correggere → rieseguire
```

- Non considerare il lavoro concluso solo perché la prima implementazione “parte”.
- Aggiorna `PROGRESS.md` man mano.
- Fermati **solo** quando:
  - **A.** tutti i criteri DoD sono soddisfatti; oppure
  - **B.** esiste un blocco reale che richiede una decisione umana (`docs/08_OPEN_QUESTIONS.md` o decisione di prodotto/legal/security).

Nel caso **B**: documenta il blocco in `PROGRESS.md` / `docs/ai/SESSION.md` e continua su tutto ciò che non dipende da quella decisione.

## Cosa puoi decidere autonomamente

- Stack frontend concreto entro la direzione di `docs/07` (Next/React/TS, CSS/Tailwind, GSAP o equivalente, SVG — no WebGL obbligatorio).
- Struttura cartelle, componenti, token di design derivati dal logo (`brand/`).
- Dettaglio motion/timing coerente con `docs/06`.
- Placeholder per foto/illustrazioni mancanti.
- Single-page vs multi-route, purché la sitemap resti coperta e separabile dopo.

## Cosa non inventare / lasciare aperto

- Claim commerciali, legali, security o partner non presenti nei docs / `99_SOURCES`.
- Contenuto di `docs/08_OPEN_QUESTIONS.md` come fatto pubblicato.
- Listino/`09_CURRENT_AP_REFERENCE` pubblicato “tale e quale” senza adattarlo al nuovo modello comunicativo.
- Promesse tipo “rischio zero”, negozio PC, riparazioni a chiamata, ecc. (vietate in `docs/00`–`01`).

## Brand / logo (vincolo visivo)

Usa gli asset in `brand/logo/` e i token colore documentati in `brand/README.md` (estratti dal logo ufficiale). Sfondo dark/black, blu profondi + cyan, outline bianchi: allineati all’HUD.

## Verifiche obbligatorie (prima di dire “fatto”)

- `pnpm`/`npm` install + dev server avviabile
- typecheck / lint
- production build
- smoke navigazione sezioni
- check reduced-motion
- checklist DoD spuntata in `PROGRESS.md`
