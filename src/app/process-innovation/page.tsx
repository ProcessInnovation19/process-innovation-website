import type { Metadata } from "next";

import { CompanyView } from "@/components/views/CompanyView";

export const metadata: Metadata = {
  // `absolute` evita il titolo duplicato prodotto dal template del layout.
  title: { absolute: "Process & Innovation — Chi siamo" },
  description:
    "Process & Innovation unisce gestione IT, infrastruttura e innovazione con un approccio orientato ai processi di lavoro dell'azienda.",
};

export default function CompanyPage() {
  return <CompanyView />;
}
