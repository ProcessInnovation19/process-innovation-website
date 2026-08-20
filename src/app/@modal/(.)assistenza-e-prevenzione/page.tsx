import { SectionWindow } from "@/components/nav/SectionWindow";
import { AepView } from "@/components/views/AepView";

/** Apertura in finestra dalla mappa. Il link diretto rende la pagina intera. */
export default function AepWindow() {
  return (
    <SectionWindow code="01" label="Assistenza & Prevenzione">
      <AepView inWindow />
    </SectionWindow>
  );
}
