import type { Metadata } from "next";

import { AepView } from "@/components/views/AepView";

export const metadata: Metadata = {
  title: "Assistenza & Prevenzione",
  description:
    "A&P è gestione IT continuativa: analisi, presa in gestione, prevenzione, monitoraggio, manutenzione e intervento su un ambiente già conosciuto.",
};

export default function AepPage() {
  return <AepView />;
}
