import type { Metadata } from "next";

import { ContactView } from "@/components/views/ContactView";

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Partiamo da una breve analisi di sedi, dispositivi, rete, servizi e criticità per costruire un piano A&P coerente.",
};

export default function ContactPage() {
  return <ContactView />;
}
