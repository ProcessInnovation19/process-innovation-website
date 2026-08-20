import { SectionWindow } from "@/components/nav/SectionWindow";
import { CompanyView } from "@/components/views/CompanyView";

/** Apertura in finestra dalla mappa. Il link diretto rende la pagina intera. */
export default function CompanyWindow() {
  return (
    <SectionWindow code="04" label="Process & Innovation">
      <CompanyView inWindow />
    </SectionWindow>
  );
}
