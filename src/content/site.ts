/**
 * Dati di sito trasversali.
 * Fonte: docs/01_BRAND_POSITIONING.md, docs/05_SITE_ARCHITECTURE_AND_COPY.md.
 */

export const site = {
  name: "Process & Innovation",
  legalEntity: "FL Solving System S.r.l.",
  /**
   * L'uso pubblico della dicitura "Process & Innovation by FL Solving System S.r.l."
   * è un punto aperto (docs/08 — Brand). Qui la ragione sociale compare solo come
   * riferimento societario nel footer, non come payoff.
   */
  /**
   * Payoff pubblico: mappa (hero) e footer.
   * Il payoff istituzionale definitivo resta aperto in docs/08 §Brand.
   */
  tagline: "Gestione IT continuativa e proattiva",
  description:
    "Process & Innovation gestisce rete, PC, server, backup, sicurezza e servizi digitali con Assistenza & Prevenzione: una gestione IT continuativa, non assistenza a guasto.",
  url: "https://www.process-innovation.it",
} as const;

/** Nodo di navigazione minimo: quanto basta al rail e all'indice del footer. */
export type NavNode = {
  href: string;
  label: string;
  /** identificatore di sistema mostrato nell'HUD */
  code: string;
  /** sigla breve per il rail sinottico */
  short: string;
};

/** Nodo di sezione: quanto serve alla mappa e alla finestra di dettaglio. */
export type SectionNode = NavNode & {
  /** una riga di descrizione, mostrata nel briefing */
  descriptor: string;
  /** tre punti chiave, mostrati nel pannello di dettaglio */
  highlights: string[];
  /**
   * Riquadro visivo del briefing. `src` punta agli asset in `public/visuals/`.
   */
  visual: { label: string; caption: string; src?: string };
};

/**
 * La home è la mappa di sistema: non è una sezione di contenuto, quindi resta
 * fuori dall'elenco delle sezioni e compare solo come nodo di ritorno.
 */
export const mapNode: NavNode = {
  href: "/",
  label: "Mappa di sistema",
  code: "00",
  short: "MAPPA",
};

/**
 * Sezioni di docs/05. Ogni voce ha una route propria: dalla mappa si apre in
 * finestra (route intercettata), da link diretto si apre come pagina intera.
 */
export const sections: SectionNode[] = [
  {
    href: "/assistenza-e-prevenzione",
    label: "Assistenza & Prevenzione",
    code: "01",
    short: "A&P",
    descriptor:
      "Analisi, presa in gestione, monitoraggio, manutenzione e intervento. Livelli di gestione rete.",
    highlights: [
      "Cinque fasi: analisi, presa in gestione, monitoraggio, intervento, evoluzione.",
      "Quattro livelli di gestione rete, come profondità di controllo.",
      "Hardware del cliente oppure Hardware Integrativo A&P.",
    ],
    visual: {
      label: "Servizio",
      caption: "Rack e apparati di rete sotto gestione continuativa.",
      src: "/visuals/map-01-servizio.png",
    },
  },
  {
    href: "/cosa-gestiamo",
    label: "Cosa gestiamo",
    code: "02",
    short: "GEST",
    descriptor:
      "Rete, PC & server, dati e backup, assistenza remota, continuità internet, servizi digitali.",
    highlights: [
      "Rete, PC & server, dati e backup come moduli di un unico ambiente.",
      "Assistenza remota predisposta e continuità internet dove prevista.",
      "Servizi digitali: posta, cloud, meeting, gestionali, VoIP.",
    ],
    visual: {
      label: "Ambiente",
      caption: "Macro tecnologica di apparati e postazioni censite.",
      src: "/visuals/map-02-ambiente.png",
    },
  },
  {
    href: "/soluzioni-e-partner",
    label: "Soluzioni & Partner",
    code: "03",
    short: "PART",
    descriptor: "Protezione endpoint, supervisione assistita da AI, comunicazioni e connettività.",
    highlights: [
      "Protezione endpoint basata su tecnologia Bitdefender, gestita da noi.",
      "Supervisione assistita da AI sulla rete; sulle email è in evoluzione.",
      "Comunicazioni e connettività con la soluzione partner Voxloud.",
    ],
    visual: {
      label: "Soluzioni",
      caption: "Access point, router e linea di backup in sede.",
      src: "/visuals/map-03-soluzioni.png",
    },
  },
  {
    href: "/process-innovation",
    label: "Process & Innovation",
    code: "04",
    short: "P&I",
    descriptor: "Approccio orientato ai processi: prima come lavora l'azienda, poi la tecnologia.",
    highlights: [
      "Prima comprendiamo come lavora l'azienda, poi scegliamo la tecnologia.",
      "Referente unico della gestione tecnologica quotidiana.",
      "Affidabilità, sicurezza, prevedibilità, semplicità.",
    ],
    visual: {
      label: "Identità",
      caption: "Postazioni di lavoro moderne in un ambiente standardizzato.",
      src: "/visuals/map-04-identita.png",
    },
  },
  {
    href: "/contatti",
    label: "Contatti",
    code: "05",
    short: "CONT",
    descriptor: "Richiesta di una prima analisi di sedi, rete, dispositivi, servizi e criticità.",
    highlights: [
      "Breve analisi di sedi, rete, dispositivi, servizi e criticità.",
      "Piano A&P costruito sul contesto reale dell'azienda.",
      "Modulo con i soli dati necessari alla prima analisi.",
    ],
    visual: {
      label: "Contatto",
      caption: "Avvio della presa in carico: mappatura dell'ambiente.",
      src: "/visuals/map-05-contatto.png",
    },
  },
];

/** Indice completo per rail e footer: mappa più sezioni. */
export const navigation: NavNode[] = [mapNode, ...sections];
