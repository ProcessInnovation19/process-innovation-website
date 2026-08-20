# Claude / Opus — Project Instructions

`GOAL.md` definisce l'obiettivo corrente del progetto e la **Definition of Done**.  
`PROGRESS.md` è la checklist persistente: aggiornala mentre lavori.  
**Non dichiarare il task completato** finché i criteri in `GOAL.md` non sono stati verificati (o resta solo un blocco reale documentato che richiede input umano).

Questo repository contiene la fonte di verità per il nuovo sito di **Process & Innovation**.  
È allineato a **PI Foundry** (`.cursor/`, `docs/ai/`).

## Prima di scrivere codice — ordine di lettura (ancora valido)

Leggi integralmente, in questo ordine:

0. `GOAL.md` e `PROGRESS.md` (dove arrivare + stato)
1. `docs/00_VISION.md`
2. `docs/01_BRAND_POSITIONING.md`
3. `docs/02_AEP_SERVICE_MODEL.md`
4. `docs/03_CAPABILITIES.md`
5. `docs/04_PARTNERS_AND_SECURITY.md`
6. `docs/05_SITE_ARCHITECTURE_AND_COPY.md`
7. `docs/06_VISUAL_AND_INTERACTION_DIRECTION.md`
8. `docs/07_IMPLEMENTATION_PLAN.md`
9. `docs/08_OPEN_QUESTIONS.md`
10. `docs/09_CURRENT_AP_REFERENCE.md`
11. `docs/99_SOURCES.md`
12. `brand/README.md` (logo + token colore)

`09_CURRENT_AP_REFERENCE.md` fotografa il servizio/listino oggi in uso: serve per capire la base di partenza, ma non va trasformato automaticamente nel nuovo sito né pubblicato come listino.

## Obiettivo operativo

Vedi `GOAL.md`. In sintesi: prima versione production-ready, navigabile, HUD futuristica, DoD verificata.

## Metodo

- Work loop: analizzare → implementare → eseguire → verificare → correggere → rieseguire (dettaglio in `GOAL.md`).
- Tratta i documenti in `docs/` come specifica di prodotto e contenuto.
- Se un'informazione è aperta o da verificare, non trasformarla in affermazione pubblica definitiva.
- I nomi di tecnologie e partner solo dove previsto dai documenti / `99_SOURCES`.
- Mantieni testi e componenti modulari.
- Prima: struttura, design system (colori da `brand/`), componenti e motion; poi tutte le sezioni.
- Usa placeholder sostituibili quando manca un asset; **usa i logo in `brand/logo/`** per header/marchio.
- Non bloccarti sui punti non bloccanti di `08_OPEN_QUESTIONS.md`: build coerente + segnala ciò che resta.
- Aggiorna `PROGRESS.md` a ogni avanzamento rilevante.

## Output atteso

Allineato alla Definition of Done in `GOAL.md` (sitemap, navigazione, HUD, motion, responsive, reduced-motion, build, lint/TS, contenuti fedeli, QA finale, README aggiornato).

## Ripresa sessione

Se la sessione si interrompe, alla ripresa:

> Leggi `CLAUDE.md`, `GOAL.md` e `PROGRESS.md`. Continua fino alla Definition of Done.
