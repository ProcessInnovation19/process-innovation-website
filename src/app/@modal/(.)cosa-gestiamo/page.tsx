import { SectionWindow } from "@/components/nav/SectionWindow";
import { ManageView } from "@/components/views/ManageView";

/** Apertura in finestra dalla mappa. Il link diretto rende la pagina intera. */
export default function ManageWindow() {
  return (
    <SectionWindow code="02" label="Cosa gestiamo">
      <ManageView inWindow />
    </SectionWindow>
  );
}
