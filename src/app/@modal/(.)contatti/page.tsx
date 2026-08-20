import { SectionWindow } from "@/components/nav/SectionWindow";
import { ContactView } from "@/components/views/ContactView";

/** Apertura in finestra dalla mappa. Il link diretto rende la pagina intera. */
export default function ContactWindow() {
  return (
    <SectionWindow code="05" label="Contatti">
      <ContactView inWindow />
    </SectionWindow>
  );
}
