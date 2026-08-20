import type { Metadata } from "next";

import { PartnersView } from "@/components/views/PartnersView";

export const metadata: Metadata = {
  title: "Soluzioni & Partner",
  description:
    "Protezione endpoint con tecnologia Bitdefender, supervisione assistita da AI e comunicazioni e connettività con Voxloud, integrate nell'infrastruttura gestita.",
};

export default function PartnersPage() {
  return <PartnersView />;
}
