import { SectionWindow } from "@/components/nav/SectionWindow";
import { PartnersView } from "@/components/views/PartnersView";

/** Apertura in finestra dalla mappa. Il link diretto rende la pagina intera. */
export default function PartnersWindow() {
  return (
    <SectionWindow code="03" label="Soluzioni & Partner">
      <PartnersView inWindow />
    </SectionWindow>
  );
}
