# 07 — Piano di implementazione

## Obiettivo della prima build

Creare una versione completa, navigabile e responsive che dimostri chiaramente:

- identità visuale;
- struttura dei contenuti;
- componenti HUD;
- sistema di linee/connessioni;
- motion language;
- gerarchia dei servizi.

Gli asset finali potranno essere sostituiti in una seconda fase senza rifare l'architettura.

## Stack suggerito

La scelta definitiva può essere fatta dall'agente in base allo stato attuale degli strumenti, ma la soluzione deve restare semplice da mantenere in Cursor.

Base consigliata:

- React / Next.js;
- TypeScript;
- CSS moderno o Tailwind, purché il design system resti leggibile;
- GSAP oppure una libreria motion equivalente per sequenze e scroll trigger;
- SVG per linee e connessioni dinamiche.

Non serve WebGL/Three.js per questa direzione.

## Fase 1 — Fondamenta

1. inizializzare il frontend;
2. creare token di design: colori, spacing, radius/geometrie, typography, layer, motion timing;
3. creare layout generale e navigazione;
4. implementare dark theme principale;
5. predisporre responsive breakpoints e reduced motion.

## Fase 2 — Componenti di linguaggio

Creare componenti riutilizzabili per:

- `HudPanel`
- `SystemLabel`
- `StatusIndicator`
- `TechImageFrame`
- `ConnectionNode`
- `ConnectionLine`
- `SectionHeader`
- `MetricOrBenefit`
- `ExpandableModule`
- CTA coerenti con il design.

I nomi sono indicativi: conta la modularità, non la nomenclatura.

## Fase 3 — Sistema di connessione

Costruire un layer SVG capace di collegare componenti tramite anchor point.

Requisiti:

- coordinate aggiornate al resize;
- supporto a layout desktop e mobile;
- animazione di ingresso della linea;
- possibilità di disattivare o semplificare le linee su mobile;
- nessuna dipendenza da coordinate hardcoded specifiche della viewport.

## Fase 4 — Homepage

Implementare nell'ordine:

1. Hero
2. Modello a guasto vs A&P
3. Quattro risultati: continuità, controllo, sicurezza, prevedibilità
4. Come funziona A&P
5. Due modalità hardware
6. Cosa gestiamo
7. AI supervision
8. Sicurezza endpoint
9. Voxloud / comunicazioni e connettività
10. Process & Innovation
11. CTA contatti

## Fase 5 — Pagine / approfondimenti

Separare o predisporre routing per:

- A&P
- Cosa gestiamo
- Soluzioni & Partner
- Chi siamo / Process & Innovation
- Contatti

La prima build può riutilizzare sezioni della homepage senza duplicare contenuto.

## Fase 6 — Asset

Durante la prima build usare placeholder coerenti o immagini royalty-free chiaramente sostituibili.

In seguito gli asset saranno prodotti/adattati appositamente e dovranno poter essere sostituiti senza cambiare il layout.

Prevedere directory chiare, per esempio:

```text
public/
  brand/
  images/
    infrastructure/
    endpoints/
    backup/
    ai/
    connectivity/
  partners/
```

## Fase 7 — QA

Verificare almeno:

- Chrome / Edge / Safari moderni;
- desktop 1440px e 1920px;
- laptop 1280px;
- tablet;
- mobile 390px circa;
- keyboard navigation;
- contrasto;
- reduced motion;
- performance immagini;
- assenza di overflow causati dalle linee SVG;
- stabilità del layout durante caricamento font/immagini.

## Criterio di successo

La prima impressione non deve essere “bel sito IT”. Deve essere:

> **Questa azienda sembra gestire un sistema tecnologico complesso in modo ordinato, controllato e avanzato.**

Solo dopo questa percezione devono emergere i singoli servizi.
