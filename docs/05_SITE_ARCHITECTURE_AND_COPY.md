# 05 — Architettura del sito e copy di riferimento

Questo documento definisce la prima architettura informativa. I testi sono **copy di riferimento**: possono essere rifiniti durante il design, ma il significato non deve cambiare senza aggiornare prima la documentazione.

## Sitemap iniziale

Per la prima versione è sufficiente una struttura compatta:

- **Home**
- **Assistenza & Prevenzione**
- **Cosa gestiamo**
- **Soluzioni & Partner**
- **Process & Innovation**
- **Contatti**

Le sezioni possono vivere inizialmente anche in una single-page molto strutturata, purché il routing/component design consenta di separarle in seguito.

---

# HOME

## Hero

### Headline consigliata

**Gestiamo il tuo IT perché continui a funzionare.**

### Subheadline

Rete, PC, server, backup, sicurezza e servizi digitali sotto una gestione continuativa. Preveniamo ciò che possiamo, controlliamo l'infrastruttura nel tempo e, quando serve, interveniamo su un ambiente che conosciamo già.

### CTA

- **Scopri Assistenza & Prevenzione**
- **Parliamo della tua infrastruttura**

## Blocco concettuale — il problema del modello a guasto

Titolo:

**L'assistenza non dovrebbe guadagnare dai tuoi problemi.**

Testo:

Nel modello tradizionale l'IT entra in gioco quando qualcosa si rompe: fermo lavoro, urgenza, diagnosi e costo imprevisto. Con Assistenza & Prevenzione il rapporto cambia: ci occupiamo della gestione continuativa dell'ambiente e il valore sta nel mantenerlo stabile, non nel numero di emergenze.

Visual consigliato: due flussi contrapposti, “A GUASTO” e “A&P”, rappresentati come due circuiti/HUD.

## Blocco risultati

Quattro nodi collegati:

- **Continuità** — ridurre fermi e imprevisti.
- **Controllo** — sapere cosa c'è, come è configurato e in che stato si trova.
- **Sicurezza** — endpoint, rete, accessi e backup gestiti con criteri coerenti.
- **Prevedibilità** — trasformare una parte della gestione IT in un costo pianificabile.

---

# ASSISTENZA & PREVENZIONE

## Apertura

**Non un pacchetto di ore. Una gestione continuativa.**

A&P viene costruito sul contesto reale dell'azienda: sedi, rete, dispositivi, utenti, servizi cloud e livello di continuità richiesto.

## Come funziona

1. **Analizziamo** — mappiamo infrastruttura, dispositivi, servizi e criticità.
2. **Mettiamo sotto gestione** — standardizziamo strumenti, accessi e procedure dove necessario.
3. **Monitoriamo e manteniamo** — eseguiamo attività continuative e controlli coerenti con il piano.
4. **Interveniamo** — quando emerge un problema, lavoriamo su un ambiente già conosciuto e predisposto per l'assistenza.
5. **Evolviamo** — adeguiamo il servizio a nuove sedi, nuovi utenti, nuovi dispositivi e nuove esigenze.

## Livelli

Mostrare i quattro livelli attuali come progressione di profondità del controllo:

- Start
- Business Basic
- Secure Business+
- Network Control

Non mostrare automaticamente i prezzi nella prima versione. La UX deve consentire in futuro di aggiungerli o sostituire i livelli con una configurazione guidata.

---

# DUE MODI DI AVERE L'INFRASTRUTTURA

Titolo:

**La tecnologia può essere tua. Oppure può far parte del servizio.**

## Hardware del cliente

Hai già PC, rete e dispositivi? Possiamo prenderli in gestione, verificarli e inserirli nel piano A&P.

Punti chiave:

- mantieni la proprietà dei beni;
- sfrutti ciò che hai già;
- acquisti e sostituzioni restano investimenti del cliente;
- eventuali guasti o nuove necessità possono richiedere spese non pianificate.

## Hardware Integrativo A&P

Possiamo fornire e gestire direttamente l'hardware necessario all'infrastruttura, mantenendolo integrato nel servizio.

Punti chiave:

- meno investimento iniziale;
- costi più distribuiti e prevedibili;
- dispositivi scelti per lavorare insieme;
- configurazione e integrazione curate da noi;
- standardizzazione del parco tecnologico;
- gestione e sostituzione più semplici secondo le condizioni concordate.

Nota terminologica pubblica: usare “Hardware Integrativo A&P”, “hardware integrato nel servizio” o “infrastruttura fornita e gestita”. Non presentarlo come leasing, noleggio operativo o comodato.

---

# COSA GESTIAMO

Questa sezione deve essere visivamente simile a un **pannello di sistema** composto da moduli connessi.

## Rete

Router, firewall, switch, Wi‑Fi, segmentazione, QoS, documentazione e ridondanza in funzione del piano.

## PC & Server

Censimento, manutenzione, aggiornamenti, controlli, sicurezza endpoint e assistenza su dispositivi gestiti.

## Dati & Backup

Protezione dei file e, dove previsto, backup completo del sistema per ridurre il tempo necessario a ripristinare l'operatività.

## Assistenza remota

Accesso remoto predisposto sui dispositivi gestiti per diagnosi e interventi più rapidi quando la presenza fisica non è necessaria.

## Continuità Internet

Possibilità di progettare una connettività secondaria di backup, inclusa rete mobile dove appropriato.

## Servizi digitali

Supporto tecnico su posta, calendari, condivisione file, cloud, meeting, CRM/gestionali lato utente e telefonia VoIP.

---

# AI SUPERVISION

Titolo:

**Più segnali. Meno sorprese.**

La supervisione assistita da AI aggiunge capacità di analisi ai dati tecnici raccolti dalla gestione dell'infrastruttura.

## Rete

Analisi di eventi, variazioni e anomalie per aiutare il team tecnico a individuare condizioni che meritano verifica e a contestualizzare più rapidamente i problemi.

## Email

Evoluzione del servizio verso controlli assistiti da AI su messaggi sospetti e anomalie, con elaborazione in ambiente controllato e supervisione tecnica.

La sezione email deve essere marcata come **in evoluzione** fino all'approvazione definitiva dell'architettura operativa.

---

# SICUREZZA ENDPOINT

Titolo:

**La protezione non è un software lasciato sul PC. È parte della gestione.**

Sui dispositivi previsti possiamo includere protezione endpoint basata su tecnologia Bitdefender, con antimalware in tempo reale, controllo avanzato delle minacce, sicurezza del traffico web e monitoraggio centralizzato dello stato di protezione.

Il sito deve enfatizzare la gestione centralizzata e continuativa, non il semplice concetto di “antivirus incluso”.

---

# COMUNICAZIONI & CONNETTIVITÀ

Titolo:

**Voce, rete e lavoro da qualsiasi luogo.**

Quando è adatto al progetto, Process & Innovation consiglia e integra Voxloud: centralino in cloud, app desktop/mobile, gestione multi-sede, integrazioni con strumenti aziendali e API.

La connettività Voxloud può includere FTTH o FTTC in base alla copertura e una soluzione 4G di backup nelle configurazioni previste.

Messaggio chiave: non stiamo mostrando un catalogo Voxloud; stiamo mostrando come telefonia e connettività possono diventare parte di un'infrastruttura progettata e gestita in modo coerente.

---

# PROCESS & INNOVATION

Titolo suggerito:

**Tecnologia progettata intorno al modo in cui lavori.**

Testo:

Process & Innovation unisce gestione IT, infrastruttura e innovazione con un approccio orientato ai processi. Prima comprendiamo come lavora l'azienda; poi scegliamo, integriamo e gestiamo la tecnologia necessaria a renderla più semplice, stabile e controllabile.

---

# CONTATTI

CTA principale:

**Raccontaci come lavori oggi.**

Testo:

Partiamo da una breve analisi di sedi, dispositivi, rete, servizi e criticità. Da lì costruiamo un piano A&P coerente con ciò che serve davvero.

Campi minimi suggeriti:

- nome e cognome;
- azienda;
- email;
- telefono opzionale;
- numero indicativo di sedi;
- numero indicativo di postazioni;
- messaggio libero.

---

# Note di ambito

Le stampanti professionali e i relativi sistemi specialistici sono normalmente seguiti da fornitori dedicati. Se necessario, inserire questa informazione in una nota secondaria nelle FAQ/condizioni e specificare che Process & Innovation può coordinarsi con il fornitore per problemi che coinvolgono rete o postazioni.
