import { PageHero } from "@/components/layout/PageHero";
import { TechImageFrame } from "@/components/hud";
import { AiSupervisionSection } from "@/components/sections/AiSupervisionSection";
import { ContactCtaSection } from "@/components/sections/ContactCtaSection";
import { EndpointSecuritySection } from "@/components/sections/EndpointSecuritySection";
import { WhatWeManageSection } from "@/components/sections/WhatWeManageSection";

/** Contenuto della sezione «Cosa gestiamo». */
export function ManageView({ inWindow = false }: { inWindow?: boolean }) {
  return (
    <>
      <PageHero
        code="02"
        eyebrow="Cosa gestiamo"
        title="Un ambiente unico, composto da moduli connessi."
        intro="Rete, dispositivi, dati, assistenza, continuità e servizi digitali non sono voci separate di un listino: sono parti dello stesso sistema che prendiamo in gestione."
        dense={inWindow}
        aside={
          <TechImageFrame
            code="IMG.04"
            label="Ambiente gestito"
            caption="Macro tecnologica di apparati e postazioni sotto gestione."
            src="/visuals/page-gestito-ambiente.png"
            ratio="wide"
          />
        }
      />

      <WhatWeManageSection withCta={false} />
      <AiSupervisionSection />
      <EndpointSecuritySection />
      <ContactCtaSection />
    </>
  );
}
