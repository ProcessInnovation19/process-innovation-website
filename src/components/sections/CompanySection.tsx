import { ConnectionField, ConnectionNode } from "@/components/connections/ConnectionField";
import { hubEdges } from "@/components/connections/patterns";
import { Reveal, Section, SectionHeader, SystemLabel } from "@/components/hud";
import { company, promises } from "@/content/company";

const EDGES = hubEdges(
  "company-source",
  promises.map((promise) => `promise-${promise.id}`),
);

export function CompanySection() {
  return (
    <Section id="process-innovation" divider>
      <SectionHeader
        code="SEC.10"
        eyebrow="Process & Innovation"
        title={company.title}
        intro={company.body}
      />

      <ConnectionField edges={EDGES} className="mt-12 flex flex-col gap-10">
        <Reveal className="flex items-center gap-3">
          <ConnectionNode id="company-source" />
          <SystemLabel tone="active">Approccio orientato ai processi</SystemLabel>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {promises.map((promise, index) => (
            <Reveal key={promise.id} delay={index * 90} className="h-full">
              <article className="hud-panel hud-panel--quiet flex h-full flex-col gap-3 p-5">
                <div className="flex items-center gap-2.5">
                  <ConnectionNode id={`promise-${promise.id}`} tone="muted" />
                  <SystemLabel tone="active" className="tabular-nums">
                    {promise.code}
                  </SystemLabel>
                </div>
                <h3 className="text-base font-semibold tracking-tight text-hud-text-strong">
                  {promise.title}
                </h3>
                <p className="text-sm leading-relaxed text-hud-text-dim">{promise.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </ConnectionField>
    </Section>
  );
}
