# 06 — Direzione visuale e interazioni

## Concetto

Il sito deve sembrare l'interfaccia di un **sistema operativo/HUD futuristico da videogioco**, applicata però a un brand B2B reale.

Non deve sembrare:

- una dashboard amministrativa;
- un template SaaS con card standard;
- cyberpunk rumoroso;
- un sito 3D;
- una pagina piena di neon e glitch;
- una presentazione PowerPoint animata.

La parola chiave è **sistema connesso**.

## Palette

Partire dai colori esistenti del brand Process & Innovation — blu e azzurro/ciano — e trasformarli in una palette digitale più sofisticata.

Indicazioni:

- fondo principale scuro o molto scuro per far emergere l'interfaccia;
- blu del brand come colore strutturale;
- ciano/azzurro come segnale attivo e collegamento;
- superfici secondarie semi-trasparenti o leggermente illuminate;
- bianco/grigio chiaro per il testo;
- evitare arcobaleni di colori senza funzione.

I valori esatti verranno definiti dopo aver recuperato logo e asset ufficiali.

## Geometria

I componenti devono avere una grammatica visiva comune:

- pannelli rettangolari con uno o due angoli tagliati;
- bordi sottili;
- piccoli marker, tacche, coordinate o indicatori tecnici usati con moderazione;
- header dei pannelli simili a moduli di interfaccia;
- immagini mascherate dentro forme geometriche coerenti;
- numeri/sezioni che sembrano identificatori di sistema, non decorazione casuale.

## Pannelli fluttuanti

Le informazioni principali possono entrare come finestre che:

1. compaiono da una posizione leggermente sfalsata;
2. completano il bordo o una linea di scansione;
3. ricevono una connessione grafica da un nodo già presente;
4. stabilizzano la propria posizione;
5. possono reagire in modo leggero a hover o movimento del puntatore.

Usare profondità 2D/2.5D molto leggera tramite transform e prospettiva CSS, senza costruire una vera scena 3D.

## Linee di connessione

Elemento caratterizzante del sito.

Quando un nuovo modulo entra in scena, una linea deve poter **allungarsi da un nodo esistente e raggiungere il nuovo elemento**.

Implementazione consigliata:

- overlay SVG sopra o dietro le sezioni;
- path calcolati fra anchor point dei componenti;
- animazione con `stroke-dasharray` / `stroke-dashoffset` o equivalente;
- linee ortogonali, spezzate o con curve molto controllate;
- piccoli nodi/terminali agli estremi;
- aggiornamento delle coordinate al resize;
- le linee non devono attraversare testi importanti.

Le connessioni devono avere un significato visivo: rete → sicurezza → backup → continuità, oppure piano → componente → beneficio. Evitare linee decorative casuali.

## Motion language

Le animazioni devono condividere lo stesso linguaggio:

- **connect** — una linea raggiunge un elemento;
- **boot** — il contenuto appare come un modulo che si inizializza;
- **scan** — una linea o una luce attraversa brevemente un pannello;
- **expand** — il pannello passa da stato sintetico a dettagliato;
- **focus** — elementi secondari si attenuano quando un modulo diventa protagonista;
- **status** — piccoli indicatori cambiano stato senza lampeggiare continuamente.

Durate e easing devono essere coerenti in tutto il sito.

## Scroll

Lo scroll attiva la composizione, ma non deve essere un parallax cinematografico.

Esempio:

- entra la sezione rete;
- compare il nodo principale;
- la linea cresce;
- si apre il pannello “Backup”;
- una seconda linea collega “Continuità”;
- i testi entrano mentre il sistema si completa.

Il visitatore deve poter continuare a scorrere normalmente senza essere intrappolato in sequenze troppo lunghe.

## Immagini

Le immagini devono raccontare tecnologia reale e infrastruttura, non generici “uomini d'affari che guardano un laptop”.

Direzioni possibili:

- dettagli di rack/rete e cablaggio ordinato;
- access point, router, switch e dispositivi;
- postazioni di lavoro moderne;
- visual astratti di flussi dati e nodi;
- macro tecnologiche;
- composizioni generate ad hoc da inserire nei pannelli.

Le immagini possono essere generate in seguito, ma il layout deve prevedere asset facilmente sostituibili.

## Iconografia

Preferire icone lineari custom o un set coerente, con adattamenti grafici al linguaggio HUD.

Evitare emoji e icone multicolore consumer.

## Tipografia

Usare una coppia leggibile:

- font principale moderno e neutro per testi lunghi;
- eventuale font più tecnico/display per label, numeri e microtesti.

Il font futuristico non deve compromettere la leggibilità.

## Responsive

Su mobile il sistema deve semplificarsi:

- meno linee contemporanee;
- connessioni più corte;
- pannelli principalmente verticali;
- niente interazioni dipendenti solo dall'hover;
- motion ridotta ma non eliminata;
- priorità alla leggibilità.

## Accessibilità e prestazioni

- rispettare `prefers-reduced-motion`;
- evitare animazioni che causano layout shift;
- usare transform/opacity quando possibile;
- immagini responsive e ottimizzate;
- SVG delle connessioni leggero;
- niente video pesanti in autoplay come elemento necessario alla comprensione;
- contrasto sufficiente anche con pannelli trasparenti.
