# Page / section docs

Mappa sezioni del sito. La copy/architettura canonica resta nei docs numerati (`docs/05` in particolare); qui c'è la corrispondenza con il codice.

## Route

| Route | Vista | Blocchi | Source docs |
|-------|-------|---------|-------------|
| `/` — **home = mappa** | `BriefingMap` | payoff (`site.tagline`) + briefing delle cinque sezioni; all'apertura velo di boot in `layout.tsx` | `docs/05`, `docs/06` |
| `/assistenza-e-prevenzione` | `AepView` | ModelComparison, HowItWorks, **Levels**, Outcomes, HardwareModes, ContactCta | `docs/02`, `docs/05` |
| `/cosa-gestiamo` | `ManageView` | WhatWeManage, AiSupervision, EndpointSecurity, ContactCta | `docs/03`, `docs/05` |
| `/soluzioni-e-partner` | `PartnersView` | quadro soluzioni, EndpointSecurity, AiSupervision, Connectivity, ContactCta | `docs/04`, `docs/99` |
| `/process-innovation` | `CompanyView` | identità, risultati percepiti, nota di ambito, Company, ContactCta | `docs/00`, `docs/01`, `docs/05` |
| `/contatti` | `ContactView` | ContactForm + riferimenti | `docs/05`, `docs/08` |

Ogni vista è renderizzata da due route: la pagina intera (`src/app/<slug>/page.tsx`) e la finestra (`src/app/@modal/(.)<slug>/page.tsx`). Il contenuto non è duplicato.

**Dove sono finiti i blocchi della vecchia home.** L'hero di `docs/05` è l'intestazione della mappa; il blocco «modello a guasto vs A&P» e i «quattro risultati» aprono la sezione Assistenza & Prevenzione, di cui sono contenuto proprio. Nessun blocco di `docs/05` è stato eliminato.

I blocchi vivono in `src/components/sections/` e sono riusabili fra viste.

## Navigazione

Non c'è un menu nell'intestazione. Le route si raggiungono da:

- la **mappa** (`/`), tramite il comando **«Scopri di più»** nel pannello di dettaglio — le voci al centro selezionano soltanto;
- le CTA in fondo a ogni sezione.

Per aggiungere una sezione servono quattro cose: una voce in `sections` (`src/content/site.ts`, con `code`, `short`, `descriptor`, `highlights`, `visual`), una vista in `src/components/views/`, la pagina intera in `src/app/<slug>/` e la route intercettata in `src/app/@modal/(.)<slug>/`.

## Identificatori di sistema

I codici `SEC.xx` sono **identificatori stabili di sezione**, non un indice progressivo: la stessa sezione porta lo stesso codice su ogni route. Per questo su una singola pagina la numerazione può presentare salti.

| Codice | Sezione |
|--------|---------|
| `SEC.01` | Modello a guasto vs A&P |
| `SEC.02` | Quattro risultati |
| `SEC.03` | Come funziona A&P |
| `SEC.04` | Livelli di gestione rete |
| `SEC.05` | Due modalità hardware |
| `SEC.06` | Cosa gestiamo |
| `SEC.07` | AI supervision |
| `SEC.08` | Sicurezza endpoint |
| `SEC.09` | Comunicazioni & connettività |
| `SEC.10` | Process & Innovation |
| `CTA` | Blocco contatti |

## Vincoli di contenuto per sezione

| Sezione | Vincolo | Fonte |
|---------|---------|-------|
| Due modalità hardware | Mai “noleggio operativo”, “leasing”, “comodato”. Solo modello operativo: infrastruttura fornita e gestita nell'ambito del servizio. | `docs/02`, `docs/99` |
| Livelli | Nessun prezzo. Solo progressione di profondità del controllo. | `docs/02`, `docs/08` |
| Dati & Backup | Nessun prodotto specifico, nessun tempo di ripristino universale. | `docs/03` §1–2 |
| AI supervision | “AI supervisionata” / “analisi assistita da AI”. Email marcata *in evoluzione*. | `docs/03` §4–5, `docs/05` |
| Sicurezza endpoint | Solo funzioni verificate; nessuna invulnerabilità; nessun EDR/MDR/XDR. | `docs/04`, `docs/99` |
| Comunicazioni & connettività | Voxloud come soluzione partner. Nessun riferimento a IP pubblico fisso/statico. | `docs/04`, `docs/08`, `docs/99` |
| Nota di ambito | Stampanti professionali seguite da fornitori dedicati: nota secondaria, non messaggio principale. | `docs/01`, `docs/05` |
| Contatti | Nessun recapito inventato finché `docs/08` §Conversione non è risolto. | `docs/08` |
