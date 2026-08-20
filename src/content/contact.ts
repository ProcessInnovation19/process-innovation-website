/**
 * Contatti.
 * Fonte: docs/05_SITE_ARCHITECTURE_AND_COPY.md §"CONTATTI".
 *
 * PUNTO APERTO (docs/08 §"Conversione"): i recapiti pubblici definitivi e la
 * destinazione del form non sono ancora stati decisi. Nessun recapito viene
 * inventato: `publicContacts` resta vuoto e la UI mostra uno slot placeholder
 * esplicito. Per pubblicare, aggiungere qui le voci definitive.
 */

export const contact = {
  code: "CTA",
  title: "Raccontaci come lavori oggi.",
  body: "Partiamo da una breve analisi di sedi, dispositivi, rete, servizi e criticità. Da lì costruiamo un piano A&P coerente con ciò che serve davvero.",
} as const;

export type PublicContact = {
  label: string;
  value: string;
  href?: string;
};

/** Vuoto finché i recapiti pubblici non sono confermati (docs/08). */
export const publicContacts: PublicContact[] = [];

export const contactPlaceholderNote =
  "Recapiti pubblici in fase di definizione. Nel frattempo il modulo raccoglie le informazioni necessarie alla prima analisi.";

export type ContactField = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "number" | "textarea";
  required: boolean;
  autoComplete?: string;
  placeholder?: string;
};

/** Campi minimi suggeriti da docs/05. */
export const contactFields: ContactField[] = [
  { name: "nome", label: "Nome e cognome", type: "text", required: true, autoComplete: "name" },
  { name: "azienda", label: "Azienda", type: "text", required: true, autoComplete: "organization" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "telefono", label: "Telefono (opzionale)", type: "tel", required: false, autoComplete: "tel" },
  { name: "sedi", label: "Numero indicativo di sedi", type: "number", required: false },
  { name: "postazioni", label: "Numero indicativo di postazioni", type: "number", required: false },
  {
    name: "messaggio",
    label: "Come lavorate oggi?",
    type: "textarea",
    required: true,
    placeholder: "Rete, dispositivi, servizi cloud, criticità ricorrenti…",
  },
];
