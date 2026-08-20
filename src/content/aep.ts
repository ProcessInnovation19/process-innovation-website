/**
 * Modello di servizio Assistenza & Prevenzione.
 * Fonte: docs/02_AEP_SERVICE_MODEL.md, docs/05_SITE_ARCHITECTURE_AND_COPY.md.
 *
 * Vincoli rispettati:
 * - nessun prezzo pubblicato (docs/02 §"Livelli di gestione rete", docs/08);
 * - Hardware Integrativo A&P non qualificato come noleggio/leasing/comodato (docs/02, docs/99).
 */

export const hero = {
  headline: "Gestiamo il tuo IT perché continui a funzionare.",
  subheadline:
    "Rete, PC, server, backup, sicurezza e servizi digitali sotto una gestione continuativa. Preveniamo ciò che possiamo, controlliamo l'infrastruttura nel tempo e, quando serve, interveniamo su un ambiente che conosciamo già.",
  primaryCta: { label: "Scopri Assistenza & Prevenzione", href: "/assistenza-e-prevenzione" },
  secondaryCta: { label: "Parliamo della tua infrastruttura", href: "/contatti" },
} as const;

/** Blocco concettuale: modello a guasto vs A&P. */
export const modelComparison = {
  title: "L'assistenza non dovrebbe guadagnare dai tuoi problemi.",
  body: "Nel modello tradizionale l'IT entra in gioco quando qualcosa si rompe: fermo lavoro, urgenza, diagnosi e costo imprevisto. Con Assistenza & Prevenzione il rapporto cambia: ci occupiamo della gestione continuativa dell'ambiente e il valore sta nel mantenerlo stabile, non nel numero di emergenze.",
  breakFix: {
    code: "FLOW.A",
    label: "Modello a guasto",
    steps: ["Problema", "Chiamata", "Diagnosi", "Intervento", "Costo"],
    note: "Il costo dipende dal verificarsi del problema ed è difficile da prevedere.",
  },
  aep: {
    code: "FLOW.B",
    label: "Modello Assistenza & Prevenzione",
    steps: [
      "Analisi",
      "Presa in gestione",
      "Prevenzione",
      "Monitoraggio",
      "Manutenzione",
      "Intervento quando necessario",
    ],
    note: "Il valore economico sta nel mantenere l'ambiente operativo, non nel numero di guasti.",
  },
} as const;

/** Quattro risultati collegati (docs/05 — "Blocco risultati"). */
export const outcomes = [
  {
    id: "continuita",
    code: "R.01",
    title: "Continuità",
    description: "Ridurre fermi e imprevisti.",
  },
  {
    id: "controllo",
    code: "R.02",
    title: "Controllo",
    description: "Sapere cosa c'è, come è configurato e in che stato si trova.",
  },
  {
    id: "sicurezza",
    code: "R.03",
    title: "Sicurezza",
    description: "Endpoint, rete, accessi e backup gestiti con criteri coerenti.",
  },
  {
    id: "prevedibilita",
    code: "R.04",
    title: "Prevedibilità",
    description: "Trasformare una parte della gestione IT in un costo pianificabile.",
  },
] as const;

export const aepIntro = {
  title: "Non un pacchetto di ore. Una gestione continuativa.",
  body: "A&P viene costruito sul contesto reale dell'azienda: sedi, rete, dispositivi, utenti, servizi cloud e livello di continuità richiesto.",
} as const;

/** Come funziona — cinque fasi (docs/05). */
export const howItWorks = [
  {
    id: "analizziamo",
    code: "FASE.01",
    title: "Analizziamo",
    description: "Mappiamo infrastruttura, dispositivi, servizi e criticità.",
  },
  {
    id: "gestione",
    code: "FASE.02",
    title: "Mettiamo sotto gestione",
    description: "Standardizziamo strumenti, accessi e procedure dove necessario.",
  },
  {
    id: "monitoriamo",
    code: "FASE.03",
    title: "Monitoriamo e manteniamo",
    description: "Eseguiamo attività continuative e controlli coerenti con il piano.",
  },
  {
    id: "interveniamo",
    code: "FASE.04",
    title: "Interveniamo",
    description:
      "Quando emerge un problema, lavoriamo su un ambiente già conosciuto e predisposto per l'assistenza.",
  },
  {
    id: "evolviamo",
    code: "FASE.05",
    title: "Evolviamo",
    description: "Adeguiamo il servizio a nuove sedi, nuovi utenti, nuovi dispositivi e nuove esigenze.",
  },
] as const;

/**
 * Livelli di gestione rete.
 * Nomi attuali (docs/02). I prezzi NON sono pubblicati: la scelta è aperta (docs/08).
 * Le descrizioni riflettono la progressione di profondità del controllo, senza
 * trasformare il listino rev.3 in una matrice pubblica di funzionalità.
 */
export const networkLevels = [
  {
    id: "start",
    code: "LV.01",
    name: "Start",
    depth: 1,
    description: "Gestione essenziale per ambienti semplici, con pochi dispositivi e una rete interna.",
  },
  {
    id: "business-basic",
    code: "LV.02",
    name: "Business Basic",
    depth: 2,
    description:
      "Primo livello di controllo e monitoraggio, con separazione fra rete interna e rete ospiti.",
  },
  {
    id: "secure-business-plus",
    code: "LV.03",
    name: "Secure Business+",
    depth: 3,
    description:
      "Maggiore sicurezza, controllo e continuità: firewall configurato, più reti logiche dove previste e backup più strutturato.",
  },
  {
    id: "network-control",
    code: "LV.04",
    name: "Network Control",
    depth: 4,
    description:
      "Per ambienti in cui la rete è critica: gestione più avanzata di firewall, QoS, segmentazione, monitoraggio e ridondanza.",
  },
] as const;

export const levelsNote =
  "I livelli si scelgono in funzione di sedi, dispositivi, utenti e continuità richiesta. La matrice di dettaglio e le condizioni economiche vengono definite in fase di proposta.";

/** Due modalità hardware (docs/02 §"Due modalità per l'hardware", docs/05). */
export const hardwareModes = {
  title: "La tecnologia può essere tua. Oppure può far parte del servizio.",
  modes: [
    {
      id: "cliente",
      code: "HW.A",
      name: "Hardware del cliente",
      lead: "Hai già PC, rete e dispositivi? Possiamo prenderli in gestione, verificarli e inserirli nel piano A&P.",
      points: [
        "Mantieni la proprietà dei beni.",
        "Sfrutti ciò che hai già.",
        "Acquisti e sostituzioni restano investimenti del cliente.",
        "Eventuali guasti o nuove necessità possono richiedere spese non pianificate.",
      ],
    },
    {
      id: "integrativo",
      code: "HW.B",
      name: "Hardware Integrativo A&P",
      lead: "Possiamo fornire e gestire direttamente l'hardware necessario all'infrastruttura, mantenendolo integrato nel servizio.",
      points: [
        "Meno investimento iniziale.",
        "Costi più distribuiti e prevedibili.",
        "Dispositivi scelti per lavorare insieme.",
        "Configurazione e integrazione curate da noi.",
        "Standardizzazione del parco tecnologico.",
        "Gestione e sostituzione più semplici secondo le condizioni concordate.",
      ],
    },
  ],
  /**
   * Nota terminologica obbligatoria: docs/02 §"Terminologia", docs/99 §"Nota terminologica hardware".
   * Non usare "noleggio operativo", "leasing" o "comodato".
   */
  note: "Il bene resta di proprietà di Process & Innovation e viene fornito, configurato, integrato e gestito nell'ambito del servizio A&P, secondo le condizioni contrattuali. Sul sito descriviamo il modello operativo: infrastruttura fornita e gestita nell'ambito del servizio.",
} as const;
