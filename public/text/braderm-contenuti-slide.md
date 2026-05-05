# Braderm — Presentazione About Us (6 Slide)

---

## Istruzioni per Antigravity

La presentazione deve funzionare come uno slider a schermo intero con **scroll snapping** (effetto magnete): ogni slide occupa il 100% del viewport e basta un piccolo scroll per passare automaticamente alla slide successiva, che si "aggancia" perfettamente.

**CSS necessario per l'effetto snap:**
```css
/* Container padre */
.slider-container {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}

/* Ogni slide */
.slide {
  height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
```

`scroll-snap-type: y mandatory` è il cuore dell'effetto: forza il browser ad agganciare la slide più vicina anche con uno scroll minimo. `scroll-snap-stop: always` impedisce di saltare slide con uno swipe troppo veloce.

---

## Slide 1 — Title

**Titolo:** Braderm

**Sottotitolo:** Innovazione Dermocosmetica dal 2007

**Dettagli a piè di slide:**
- LCB S.r.l. — Laboratori Chimici Braccili
- Roseto degli Abruzzi (TE) — Italia

---

## Slide 2 — La nostra storia

**Titolo sezione:** La nostra storia

**Timeline:**

**2007 — Nasce Braderm**
Con sede a Roseto degli Abruzzi, l'azienda si affaccia sul mercato dermocosmetico con un portfolio rivolto a Dermatologia, Ginecologia, Otorinolaringoiatria e Pediatria. Uno staff di professionisti permette una crescita costante e l'affermazione sul territorio nazionale.

**2013 — Nascono i laboratori L.C.B.**
Laboratori Chimici Braccili: ricerca e produzione in-house per prodotti a marchio Braderm e conto terzi. Un passo decisivo verso l'innovazione e il pieno controllo della filiera produttiva.

**Oggi — Leader nel dermocosmetico**
Circa 50 prodotti in portfolio, una rete capillare di informatori scientifici sul territorio nazionale e una presenza internazionale in oltre 13 paesi.

**Dato in evidenza:** ~50 prodotti in portfolio
**Aree terapeutiche:** Dermatologia · Ginecologia · Otorinolaringoiatria · Pediatria

---

## Slide 3 — I nostri Medical Device

**Titolo sezione:** I nostri Medical Device

**Sottotitolo:** Dispositivi medici innovativi per esigenze cliniche reali

**Prodotto 1 — Zoylak**
Benzoil perossido al 4%
Trattamento dell'acne del viso

**Prodotto 2 — Dorsak**
Benzoil perossido al 6% in spray
Trattamento dell'acne del dorso

**Prodotto 3 — Micobat Lavanda**
Acido Borico
Benessere e igiene intima femminile

---

## Slide 4 — Laboratori Chimici Braccili

**Titolo sezione:** Laboratori Chimici Braccili

**Sottotitolo:** Ricerca, sviluppo e produzione dal 2013

**Paragrafo principale:**
I laboratori L.C.B. realizzano sia prodotti a marchio Braderm che prodotti conto terzi, garantendo il massimo controllo su qualità e innovazione in ogni fase del processo produttivo.

**Punto 1 — Ricerca avanzata**
Formulazioni all'avanguardia per il settore dermocosmetico

**Punto 2 — Ingredienti selezionati**
Materie prime di altissima qualità e sicurezza

**Punto 3 — Conto terzi**
Servizio completo di sviluppo e produzione per brand terzi

---

## Slide 5 — Presenza internazionale

**Titolo sezione:** Presenza internazionale

**Sottotitolo:** Una rete di distribuzione in continua espansione

**Modello distributivo:**
- Grossisti e cooperative farmaceutiche
- Vendita diretta in farmacia
- Informatori scientifici sul territorio nazionale
- Rete di distributori internazionali

**Dato in evidenza:** 13+ paesi nel mondo

**Paesi:**
Austria · Germania · Romania · Albania · Moldavia · Irlanda · Grecia · Cipro · Georgia · Libano · Libia · Azerbaijan · Colombia

---

## Slide 6 — Chiusura

**Titolo:** Innovazione al servizio della salute

**Corpo:**
Soluzioni dermocosmetiche sicure, efficaci e all'avanguardia per la classe medica e i professionisti del settore.

**Contatti:**
- Email: info@lcb-srl.it
- Sito: www.lcb-srl.it
- Telefono: +39 085 123 4567

**Footer:** LCB S.r.l. — Laboratori Chimici Braccili — Roseto degli Abruzzi (TE)
