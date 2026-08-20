/**
 * Cosa gestiamo — moduli del sistema.
 * Fonte: docs/03_CAPABILITIES.md, docs/05_SITE_ARCHITECTURE_AND_COPY.md §"COSA GESTIAMO".
 *
 * Vincoli rispettati:
 * - nessun prodotto specifico legato al backup (docs/03 §1);
 * - nessuna promessa di tempi di ripristino universali (docs/03 §2);
 * - contenuti espressi "in funzione del piano/incarico".
 */

export type CapabilityModule = {
  id: string;
  code: string;
  title: string;
  summary: string;
  details: string[];
  note?: string;
  status: "managed" | "monitored" | "evolving" | "optional";
};

export const capabilityModules: CapabilityModule[] = [
  {
    id: "rete",
    code: "MOD.01",
    title: "Rete",
    summary:
      "Router, firewall, switch, Wi‑Fi, segmentazione, QoS, documentazione e ridondanza in funzione del piano.",
    details: [
      "Router e firewall configurati e mantenuti nel tempo.",
      "Switch e access point Wi‑Fi gestiti come parte dell'infrastruttura.",
      "Segmentazione della rete, reti interne e ospiti, VLAN dove necessarie.",
      "QoS per i servizi critici.",
      "Monitoraggio, verifiche e documentazione di rete.",
      "Backup e ridondanza coerenti con il livello scelto.",
    ],
    status: "managed",
  },
  {
    id: "pc-server",
    code: "MOD.02",
    title: "PC & Server",
    summary:
      "Censimento, manutenzione, aggiornamenti, controlli, sicurezza endpoint e assistenza sui dispositivi gestiti.",
    details: [
      "Onboarding e censimento dei dispositivi.",
      "Manutenzione periodica, aggiornamenti di sistema e patch.",
      "Verifiche di sicurezza endpoint.",
      "Controlli di base su spazio disco, RAM ed errori.",
      "Assistenza remota e coordinamento degli interventi in presenza.",
      "Gestione più semplice di sostituzioni e standard quando l'hardware è integrato nel servizio.",
    ],
    status: "managed",
  },
  {
    id: "dati-backup",
    code: "MOD.03",
    title: "Dati & Backup",
    summary:
      "Protezione dei file e, dove previsto, backup completo del sistema per ridurre il tempo necessario a ripristinare l'operatività.",
    details: [
      "Sincronizzazione, versioning e backup scelti in base al contesto del cliente.",
      "Documenti e dati importanti non dipendono da un solo PC o da un solo disco.",
      "Dove previsto, backup dell'intero sistema o di immagini utili al ripristino di una macchina.",
      "Obiettivo: ridurre il tempo necessario a tornare operativi dopo un guasto grave.",
    ],
    note: "La tecnologia adottata dipende da requisiti, budget, infrastruttura e policy del cliente. I tempi di ripristino dipendono da dimensione dei dati, hardware, rete e soluzione adottata.",
    status: "optional",
  },
  {
    id: "assistenza-remota",
    code: "MOD.04",
    title: "Assistenza remota",
    summary:
      "Accesso remoto predisposto sui dispositivi gestiti per diagnosi e interventi più rapidi quando la presenza fisica non è necessaria.",
    details: [
      "Dispositivi gestiti predisposti con strumenti di accesso remoto sicuro.",
      "Intervento del supporto tecnico senza attendere un sopralluogo, quando il problema è risolvibile a distanza.",
      "Diagnosi su un ambiente già censito e configurato.",
    ],
    status: "managed",
  },
  {
    id: "continuita-internet",
    code: "MOD.05",
    title: "Continuità Internet",
    summary:
      "Possibilità di progettare una connettività secondaria di backup, inclusa rete mobile dove appropriato.",
    details: [
      "Seconda connettività — ad esempio rete mobile 4G/5G — pronta a subentrare o a supportare la linea principale secondo l'architettura adottata.",
      "Riduzione dell'impatto di un'interruzione della linea principale.",
      "Servizi mantenuti operativi compatibilmente con la banda disponibile.",
    ],
    status: "optional",
  },
  {
    id: "servizi-digitali",
    code: "MOD.06",
    title: "Servizi digitali",
    summary:
      "Supporto tecnico su posta, calendari, condivisione file, cloud, meeting, CRM/gestionali lato utente e telefonia VoIP.",
    details: [
      "Posta e calendari, file e condivisione, piattaforme cloud.",
      "Collaborazione e meeting online.",
      "CRM e gestionali cloud per problemi lato utente.",
      "Telefonia VoIP lato utente e lato rete.",
    ],
    note: "L'obiettivo non è sostituire la consulenza specialistica del produttore di ogni gestionale, ma essere il primo punto tecnico di riferimento e coordinarsi con gli altri fornitori quando necessario.",
    status: "managed",
  },
];

/** Nota di ambito (docs/01 §"Ambito periferiche", docs/05 §"Note di ambito"). */
export const scopeNote =
  "Le stampanti professionali e i relativi sistemi specialistici sono normalmente seguiti da fornitori dedicati. Process & Innovation può coordinarsi con il fornitore quando il problema coinvolge rete o postazioni.";
