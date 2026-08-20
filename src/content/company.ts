/**
 * Process & Innovation — identità e approccio.
 * Fonte: docs/00_VISION.md, docs/01_BRAND_POSITIONING.md,
 *        docs/05_SITE_ARCHITECTURE_AND_COPY.md §"PROCESS & INNOVATION".
 */

export const company = {
  code: "P&I",
  title: "Tecnologia progettata intorno al modo in cui lavori.",
  body: "Process & Innovation unisce gestione IT, infrastruttura e innovazione con un approccio orientato ai processi. Prima comprendiamo come lavora l'azienda; poi scegliamo, integriamo e gestiamo la tecnologia necessaria a renderla più semplice, stabile e controllabile.",
  identity:
    "Process & Innovation è il brand con cui FL Solving System S.r.l. presenta servizi di gestione IT, tecnologie aziendali, innovazione e supporto ai processi. Nel servizio A&P siamo il referente unico della gestione tecnologica quotidiana dell'azienda.",
} as const;

/** Le quattro promesse (docs/01 §"Promessa"). */
export const promises = [
  {
    id: "affidabilita",
    code: "P.01",
    title: "Affidabilità",
    description: "Meno fermi, meno imprevisti, maggiore continuità.",
  },
  {
    id: "sicurezza",
    code: "P.02",
    title: "Sicurezza",
    description: "Endpoint, rete, accessi, backup e controlli gestiti con criteri coerenti.",
  },
  {
    id: "prevedibilita",
    code: "P.03",
    title: "Prevedibilità",
    description:
      "Costi mensili pianificabili e riduzione delle spese improvvise legate alla gestione ordinaria.",
  },
  {
    id: "semplicita",
    code: "P.04",
    title: "Semplicità",
    description: "Un interlocutore che conosce infrastruttura, dispositivi e servizi del cliente.",
  },
] as const;

/** Come il cliente dovrebbe percepire il servizio (docs/00 §"Risultato percepito"). */
export const perceivedOutcomes = [
  "Non devo più ricordarmi io di controllare tutto.",
  "Qualcuno conosce la mia infrastruttura prima che io apra un ticket.",
  "Se succede qualcosa, possono intervenire subito.",
  "Posso scegliere se usare hardware mio o avere anche l'infrastruttura fornita e gestita da loro.",
  "So quanto mi costa la gestione IT senza dipendere dal numero di emergenze.",
] as const;
