import type { Metadata } from "next";

import { ManageView } from "@/components/views/ManageView";

export const metadata: Metadata = {
  title: "Cosa gestiamo",
  description:
    "Rete, PC e server, dati e backup, assistenza remota, continuità internet e servizi digitali: i moduli dell'ambiente gestito da Process & Innovation.",
};

export default function WhatWeManagePage() {
  return <ManageView />;
}
