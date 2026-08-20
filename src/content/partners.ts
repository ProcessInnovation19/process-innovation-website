/**
 * Soluzioni, sicurezza e partner.
 * Fonte: docs/03_CAPABILITIES.md §4–5, docs/04_PARTNERS_AND_SECURITY.md,
 *        docs/05_SITE_ARCHITECTURE_AND_COPY.md, docs/99_SOURCES.md.
 *
 * Vincoli rispettati:
 * - AI: "supervisione assistita da AI", nessun rilevamento infallibile o autonomo (docs/03 §4);
 * - supervisione email marcata "in evoluzione" (docs/03 §5, docs/05);
 * - Bitdefender: nessuna promessa di invulnerabilità, nessun EDR/MDR/XDR (docs/04, docs/99);
 * - Voxloud: soluzione partner, non tecnologia proprietaria (docs/04);
 * - IP pubblico statico/fisso NON citato: non confermato dalle fonti (docs/04, docs/08, docs/99).
 */

export const aiSupervision = {
  code: "AI",
  title: "Più segnali. Meno sorprese.",
  intro:
    "La supervisione assistita da AI aggiunge capacità di analisi ai dati tecnici raccolti dalla gestione dell'infrastruttura.",
  areas: [
    {
      id: "ai-rete",
      code: "AI.01",
      title: "Rete",
      status: "monitored" as const,
      body: "Analisi di eventi, variazioni e anomalie per aiutare il team tecnico a individuare condizioni che meritano verifica e a contestualizzare più rapidamente i problemi.",
    },
    {
      id: "ai-email",
      code: "AI.02",
      title: "Email",
      status: "evolving" as const,
      body: "Evoluzione del servizio verso controlli assistiti da AI su messaggi sospetti e anomalie, con elaborazione in ambiente controllato e supervisione tecnica.",
    },
  ],
  note: "Parliamo di AI supervisionata e analisi assistita da AI: i segnali aiutano il team tecnico, non sostituiscono la verifica umana. La supervisione delle email resta una funzionalità in evoluzione fino all'approvazione definitiva dell'architettura operativa.",
} as const;

export const endpointSecurity = {
  code: "SEC",
  title: "La protezione non è un software lasciato sul PC. È parte della gestione.",
  intro:
    "Sui dispositivi previsti possiamo includere una protezione endpoint basata su tecnologia Bitdefender, installata, configurata e controllata all'interno della gestione IT.",
  message:
    "La protezione endpoint fa parte dell'ambiente che gestiamo. Possiamo controllarne lo stato, applicare criteri coerenti e intervenire quando viene rilevata un'anomalia.",
  /** Funzioni verificabili — docs/04. Dipendono da sistema operativo e licenza attivata. */
  features: [
    "Protezione antimalware in tempo reale.",
    "Protezione contro ransomware, phishing e altre minacce.",
    "Scansioni pianificabili e on‑demand.",
    "Analisi comportamentale ed euristica sulle piattaforme supportate.",
    "Sicurezza e scansione del traffico web.",
    "Controllo e scansione di dispositivi esterni sulle piattaforme supportate.",
    "Firewall e funzioni anti‑exploit sulle piattaforme supportate.",
    "Stato di protezione, eventi e avvisi gestibili centralmente.",
  ],
  note: "Le funzioni effettivamente disponibili dipendono dal sistema operativo e dalla licenza attivata. Non promettiamo invulnerabilità né rischio zero.",
} as const;

export const connectivity = {
  code: "NET",
  title: "Voce, rete e lavoro da qualsiasi luogo.",
  intro:
    "Quando è adatto al progetto, Process & Innovation consiglia e integra Voxloud: centralino in cloud, app desktop e mobile, gestione multi‑sede, integrazioni con strumenti aziendali e API.",
  message:
    "Non stiamo mostrando un catalogo Voxloud: stiamo mostrando come telefonia e connettività possono diventare parte di un'infrastruttura progettata e gestita in modo coerente.",
  groups: [
    {
      id: "centralino",
      code: "NET.01",
      title: "Centralino cloud",
      items: [
        "Centralino aziendale in cloud, utilizzabile da telefoni VoIP, applicazioni desktop e app mobile.",
        "Possibilità di lavorare e rispondere con il numero aziendale anche fuori sede.",
        "Utenti e numeri scalabili, adatti a organizzazioni distribuite e multi‑sede.",
        "IVR, gruppi, regole di risposta, inoltri e trasferimenti.",
        "Integrazioni con numerosi CRM e strumenti aziendali, API pubbliche e webhook per eventi di chiamata.",
        "Funzionalità AI offerte da Voxloud in specifici moduli, ad esempio analisi e riassunto delle conversazioni.",
      ],
    },
    {
      id: "connettivita",
      code: "NET.02",
      title: "Connettività",
      items: [
        "FTTH dove disponibile, FTTC dove la fibra completa non è disponibile.",
        "Velocità fino a 1 Gb/s in alcune configurazioni e aree coperte.",
        "Modem/router incluso nelle offerte previste.",
        "Possibilità di Internet Key 4G di backup per ridurre l'impatto di indisponibilità della linea fissa.",
      ],
    },
  ],
  positioning:
    "Il valore non è rivendere un centralino o una fibra: Process & Innovation li inserisce in un disegno più ampio di rete, QoS, continuità, utenti, sedi e integrazioni.",
  note: "Voxloud è una soluzione partner, non una tecnologia proprietaria Process & Innovation. Disponibilità, velocità e condizioni dipendono dalla copertura e dall'offerta effettivamente attivabile.",
} as const;
