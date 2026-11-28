/* NB Digital Labs, Work page: Serbian language layer.
 * English stays the source of truth. In Serbian mode the page text is translated on screen only,
 * while everything the builder sends to the server keeps its English names (prices are matched by name).
 * Language: ?lang=sr or ?lang=en in the address, otherwise the last choice (saved in this browser).
 */
(function () {
  'use strict';
  var KEY = 'nb_lang', lang = 'en';
  try {
    var q = new URLSearchParams(location.search).get('lang');
    if (q === 'sr' || q === 'en') {
      lang = q;
      try { localStorage.setItem(KEY, q); } catch (e) {}
    } else {
      var saved = null;
      try { saved = localStorage.getItem(KEY); } catch (e) {}
      if (saved === 'sr') lang = 'sr';
    }
  } catch (e) {}
  window.NB_LANG = lang;
  window.NB_SR_ADD = function () {};

  // ---------- EN | SR switch (home menu and top bar)
  (function addToggle() {
    var target = lang === 'sr' ? 'en' : 'sr', label = target.toUpperCase();
    function go(e) {
      e.preventDefault();
      try { localStorage.setItem(KEY, target); } catch (x) {}
      location.href = location.pathname + '?lang=' + target;
    }
    function make(text) {
      var a = document.createElement('a');
      a.href = '?lang=' + target; a.className = 'nb-lang'; a.textContent = text;
      a.title = target === 'sr' ? 'Srpski' : 'English';
      a.addEventListener('click', go);
      return a;
    }
    var hn = document.querySelector('.hnav'); if (hn) hn.appendChild(make(label));
    var nv = document.querySelector('.nav'); if (nv) nv.appendChild(make('[ ' + label + ' ]'));
  })();

  if (lang !== 'sr') return;

  document.documentElement.lang = 'sr';

  // ---------- dictionary (English, Serbian). Lookup ignores case and extra spaces.
  var P = [
    // home
    ['Work with me', 'Radite sa mnom'],
    ['[ WORK WITH ME ]', '[ RADITE SA MNOM ]'],
    ['Work with me — NB Digital Labs · Nemanja Bačević', 'Radite sa mnom — NB Digital Labs · Nemanja Bačević'],
    ['Have an idea?', 'Imate ideju?'],
    ['Let’s build it.', 'Napravimo je zajedno.'],
    ['Websites, applications and automation — let’s turn your idea into', 'Sajtovi, aplikacije i automatizacija — pretvorimo vašu ideju u'],
    ['something real.', 'nešto stvarno.'],
    ['From idea', 'Od ideje'], ['to launch', 'do lansiranja'],
    ['Tailored', 'Rešenja'], ['solutions', 'po meri'],
    ['Reliable', 'Pouzdano'], ['& scalable', 'i skalabilno'],
    ['Got an idea? — Build me ↗', 'Imate ideju? — Napravimo je ↗'],
    ['Or send me an email ✉', 'Ili mi pošaljite mejl ✉'],
    ['Start small, grow later — add features or revisions after launch.', 'Počnite malo, rastite kasnije — funkcije i izmene možete dodati i posle lansiranja.'],
    ['ALL SYSTEMS ONLINE', 'SVI SISTEMI RADE'],
    ['Web and Design: websites and digital experiences', 'Web i dizajn: sajtovi i digitalna iskustva'],
    ['App and Development: applications, dashboards and tools', 'Aplikacije i razvoj: aplikacije, dashboard-i i alati'],
    ['Automation and Bots: bots, workflows and integrations', 'Automatizacija i botovi: botovi, tokovi rada i integracije'],
    ['NB Digital Labs — home', 'NB Digital Labs — početna'],
    // category names
    ['Web & Design', 'Web i dizajn'],
    ['App & Development', 'Aplikacije i razvoj'],
    ['Automation & Bots', 'Automatizacija i botovi'],
    // category descriptions and sections
    ['Digital experiences shaped around your brand, audience and business goals. Choose a project concept, explore the possibilities, then build a focused brief.', 'Digitalna iskustva oblikovana prema vašem brendu, publici i poslovnim ciljevima. Izaberite koncept projekta, istražite mogućnosti, pa sastavite jasan brief.'],
    ['Purpose-built digital products, dashboards and practical tools. Choose the kind of application you need and shape only the functions that belong to it.', 'Digitalni proizvodi, dashboard-i i praktični alati napravljeni za konkretnu svrhu. Izaberite vrstu aplikacije koja vam treba i oblikujte samo funkcije koje joj pripadaju.'],
    ['Connect tools, remove repetitive steps and keep information moving. Choose the automation concept that fits your workflow and tailor the integrations.', 'Povežite alate, uklonite ponavljajuće korake i održite protok informacija. Izaberite koncept automatizacije koji odgovara vašem toku rada i prilagodite integracije.'],
    ['BUILD THIS ↗', 'NAPRAVIMO OVO ↗'],
    ['CHOOSE A PROJECT CONCEPT', 'IZABERITE KONCEPT PROJEKTA'],
    ['Start with the kind of solution you need. We’ll narrow the options to what matters for this project.', 'Počnite od vrste rešenja koje vam treba. Suzićemo opcije na ono što je važno za ovaj projekat.'],
    ['EXPLORE DEMOS', 'ISTRAŽITE DEMO PRIMERE'],
    ['Concept previews showing the kind of experience we can build. Demo concepts are illustrative, not client work.', 'Pregledi koncepata koji pokazuju kakvo iskustvo možemo da napravimo. Demo koncepti su ilustrativni i nisu rad za klijente.'],
    ['PROJECTS & CASE STUDIES', 'PROJEKTI I STUDIJE SLUČAJA'],
    ['A space for selected work, build notes and real project stories as the portfolio grows.', 'Prostor za izabrane radove, beleške o izradi i prave priče o projektima kako portfolio raste.'],
    ['HOW IT WORKS', 'KAKO FUNKCIONIŠE'],
    ['A simple, transparent path from first idea to launch — and support afterwards.', 'Jednostavan i transparentan put od prve ideje do lansiranja — i podrška posle toga.'],
    ['From the first idea to a working product, in clear steps, with you involved all the way.', 'Od prve ideje do proizvoda koji radi, kroz jasne korake, uz vaše učešće do kraja.'],
    ['BRIEF', 'BRIEF'],
    ['We talk, or you use the builder. You tell me what you need; I ask the right questions.', 'Razgovaramo ili koristite builder. Vi mi kažete šta vam treba, a ja postavljam prava pitanja.'],
    ['CONCEPT', 'KONCEPT'],
    ['You see the direction — structure, look and feel — before anything is built.', 'Vidite pravac — strukturu, izgled i osećaj — pre nego što se bilo šta izgradi.'],
    ['BUILD', 'IZRADA'],
    ['I build it step by step, with your feedback along the way.', 'Gradim korak po korak, uz vaše povratne informacije usput.'],
    ['LAUNCH & SUPPORT', 'LANSIRANJE I PODRŠKA'],
    ['Go live, then grow: add features or revisions whenever you need them.', 'Idemo uživo, pa rastemo: funkcije i izmene dodajete kad god vam zatrebaju.'],
    ['You describe the problem or workflow; I ask who will use it and what it must do.', 'Vi opisujete problem ili tok rada, a ja pitam ko će ga koristiti i šta mora da radi.'],
    ['PROTOTYPE', 'PROTOTIP'],
    ['You see the screens and the flow with sample data before the real build starts.', 'Vidite ekrane i tok sa probnim podacima pre nego što počne prava izrada.'],
    ['I build it in small steps, with working versions you can try and comment on.', 'Gradim u malim koracima, uz radne verzije koje možete da isprobate i komentarišete.'],
    ['Go live, then grow: new features, changes and ongoing maintenance whenever you need them.', 'Idemo uživo, pa rastemo: nove funkcije, izmene i stalno održavanje kad god vam zatrebaju.'],
    ['SELECTED WORK', 'IZABRANI RADOVI'],
    ['Real client projects will be presented here with scope, solution and outcomes.', 'Pravi projekti za klijente biće predstavljeni ovde, sa obimom, rešenjem i rezultatima.'],
    ['PROJECT STORY', 'PRIČA O PROJEKTU'],
    ['A space for the challenge, approach, build details and lessons learned.', 'Prostor za izazov, pristup, detalje izrade i naučene lekcije.'],
    ['COMING NEXT', 'USKORO'],
    ['New work and case studies will be added as the portfolio develops.', 'Novi radovi i studije slučaja biće dodati kako se portfolio razvija.'],
    ['PORTFOLIO SLOT', 'MESTO U PORTFOLIJU'],
    // concepts (project paths)
    ['HOSPITALITY & TOURISM', 'UGOSTITELJSTVO I TURIZAM'],
    ['HOSPITALITY', 'UGOSTITELJSTVO'],
    ['Hotels, resorts, restaurants, cafés, apartments and tourism experiences — built by someone who knows the guest’s side from the inside.', 'Hoteli, resorti, restorani, kafei, apartmani i turistička iskustva — gradi ih neko ko gostovu stranu poznaje iznutra.'],
    ['BUSINESS', 'BIZNIS'],
    ['Corporate websites, company profiles, portfolios and service businesses.', 'Korporativni sajtovi, profili kompanija, portfoliji i uslužne delatnosti.'],
    ['DIGITAL', 'DIGITALNO'],
    ['E-commerce, landing pages, online platforms and content-led websites.', 'E-commerce, landing stranice, online platforme i sajtovi zasnovani na sadržaju.'],
    ['BUSINESS APPS', 'POSLOVNE APLIKACIJE'],
    ['Internal tools, client portals and operational applications.', 'Interni alati, klijentski portali i operativne aplikacije.'],
    ['DASHBOARDS', 'DASHBOARD-I'],
    ['Analytics, reporting, monitoring and data visualisation.', 'Analitika, izveštavanje, praćenje i vizualizacija podataka.'],
    ['DIGITAL TOOLS', 'DIGITALNI ALATI'],
    ['Calculators, converters, configurators and custom utilities.', 'Kalkulatori, konvertori, konfiguratori i alati po meri.'],
    ['MESSAGING BOTS', 'BOTOVI ZA PORUKE'],
    ['Telegram, WhatsApp and conversational assistants.', 'Telegram, WhatsApp i konverzacioni asistenti.'],
    ['BUSINESS WORKFLOWS', 'POSLOVNI TOKOVI RADA'],
    ['Lead routing, approvals, task flows and repetitive processes.', 'Usmeravanje upita, odobravanja, tokovi zadataka i ponavljajući procesi.'],
    ['SYSTEM INTEGRATIONS', 'INTEGRACIJE SISTEMA'],
    ['Connect websites, APIs, databases and notification channels.', 'Povezivanje sajtova, API-ja, baza podataka i kanala za obaveštenja.'],
    ['EXPLORE THIS PATH ↗', 'ISTRAŽITE OVAJ PRAVAC ↗'],
    // demos
    ['Aurevia · Family Resort', 'Aurevia · Porodični resort'],
    ['Kalmora · Freight & Logistics', 'Kalmora · Špedicija i logistika'],
    ['Aurevia Pantry · Online Shop', 'Aurevia Pantry · Online prodavnica'],
    ['Orders & Inventory', 'Porudžbine i zalihe'],
    ['Aurevia Operations', 'Aurevia operacije'],
    ['Smart Notifications', 'Pametna obaveštenja'],
    ['Connected', 'Povezano'],
    ['A small family-run resort in Tuscany: rooms, experiences and a full five-step booking flow. Fictional concept, fully interactive.', 'Mali porodični resort u Toskani: sobe, iskustva i potpun tok rezervacije u pet koraka. Izmišljen koncept, potpuno interaktivan.'],
    ['A freight and logistics company: services, shipment tracking, a five-step quote wizard and a staff dashboard with role-based access. Fictional, fully interactive.', 'Kompanija za špediciju i logistiku: usluge, praćenje pošiljki, čarobnjak za ponudu u pet koraka i dashboard za zaposlene sa pristupom po ulogama. Izmišljeno, potpuno interaktivno.'],
    ['A small online shop: catalogue, cart, checkout, order tracking and a shop admin with stock. Fictional, fully interactive, no real payment.', 'Mala online prodavnica: katalog, korpa, plaćanje, praćenje porudžbina i admin prodavnice sa zalihama. Izmišljeno, potpuno interaktivno, bez stvarnog plaćanja.'],
    ['A building-materials supplier: order wizard with delivery or pickup, live stock levels, order statuses and an internal system with roles. Fictional, sample data.', 'Dobavljač građevinskog materijala: čarobnjak za porudžbine sa dostavom ili preuzimanjem, stanje zaliha uživo, statusi porudžbina i interni sistem sa ulogama. Izmišljeno, probni podaci.'],
    ['The back office of Aurevia Family Resort: rooms, occupancy, bookings and revenue at a glance. Fictional, sample data.', 'Back office resorta Aurevia: sobe, popunjenost, rezervacije i prihod na jednom mestu. Izmišljeno, probni podaci.'],
    ['A multi-tab calculator with fitness tools, installable as an app. A real, working tool, not a mock-up.', 'Kalkulator sa više kartica i fitnes alatima, koji se može instalirati kao aplikacija. Pravi alat koji radi, ne maketa.'],
    ['A booking concierge for a resort, on Telegram, WhatsApp and website chat, connected to the back office. Fictional, sample data.', 'Concierge za rezervacije resorta, na Telegramu, WhatsApp-u i chatu na sajtu, povezan sa back officeom. Izmišljeno, probni podaci.'],
    ['Orders, bookings and quote requests trigger the right messages by themselves: Telegram, email and scheduled reminders. Fictional, sample data.', 'Porudžbine, rezervacije i zahtevi za ponudu sami pokreću prave poruke: Telegram, mejl i zakazane opomene. Izmišljeno, probni podaci.'],
    ['A website, a chat bot, a back office, a shop and a freight partner exchanging events, with the message behind every connection. Fictional, sample data.', 'Sajt, chat bot, back office, prodavnica i partner za špediciju razmenjuju događaje, sa porukom iza svake veze. Izmišljeno, probni podaci.'],
    ['INTERACTIVE DEMO', 'INTERAKTIVNI DEMO'],
    ['CONCEPT DEMO', 'KONCEPT DEMO'],
    ['BUSINESS APP', 'POSLOVNA APLIKACIJA'],
    ['DASHBOARD', 'DASHBOARD'],
    ['DIGITAL TOOL', 'DIGITALNI ALAT'],
    ['LIVE TOOL', 'ALAT UŽIVO'],
    ['VIEW LIVE DEMO ↗', 'POGLEDAJTE DEMO UŽIVO ↗'],
    ['OPEN LIVE TOOL ↗', 'OTVORITE ALAT UŽIVO ↗'],
    ['VIEW DEMO ↗', 'POGLEDAJTE DEMO ↗'],
    // custom band and footers
    ['[ YOUR SCOPE / YOUR COMBINATION ]', '[ VAŠ OBIM / VAŠA KOMBINACIJA ]'],
    ['CUSTOM', ''],
    ['PROJECT', 'PROJEKAT PO MERI'],
    ['PROJECT.', 'PROJEKAT PO MERI.'],
    ['Prefer not to choose every feature one by one? Combine the options from this chapter in one tailored brief.', 'Ne želite da birate svaku funkciju pojedinačno? Kombinujte opcije iz ovog poglavlja u jedan brief po vašoj meri.'],
    ['Need more than one area? Use “Got an idea? — Build me” on the main page to combine all three.', 'Treba vam više oblasti? Na glavnoj strani koristite „Imate ideju? — Napravimo je“ da kombinujete sve tri.'],
    ['BUILD A CUSTOM PROJECT ↗', 'NAPRAVITE PROJEKAT PO MERI ↗'],
    ['DESIGNED AROUND YOUR PROJECT', 'PRAVLJENO PREMA VAŠEM PROJEKTU'],
    ['SECURE PROJECT BRIEF', 'SIGURAN BRIEF PROJEKTA'],
    // builder: headings and steps
    ['[ NB DIGITAL LABS / PROJECT BUILDER ]', '[ NB DIGITAL LABS / BUILDER PROJEKTA ]'],
    ['LET’S BUILD', 'HAJDE DA GRADIMO'], ['YOUR IDEA.', 'VAŠU IDEJU.'], ['YOUR PROJECT.', 'VAŠ PROJEKAT.'], ['SOMETHING.', 'NEŠTO.'],
    ['A focused brief, tailored to what you want to create.', 'Jasan brief, prilagođen onome što želite da napravite.'],
    ['Combine any of the three service areas into one project.', 'Kombinujte bilo koje od tri oblasti usluga u jedan projekat.'],
    ['01 Services', '01 Usluge'], ['02 Features', '02 Funkcije'], ['03 Materials', '03 Materijali'], ['04 Scope', '04 Obim'], ['05 Finish', '05 Završetak'],
    ['▤ LIVE PROJECT SUMMARY', '▤ PREGLED PROJEKTA UŽIVO'],
    ['ESTIMATED SCOPE', 'PROCENJENI OBIM'],
    ['Not defined yet', 'Još nije definisano'],
    ['This is your live selection summary. The final review and quotation request are a separate step.', 'Ovo je pregled vašeg izbora uživo. Završni pregled i zahtev za ponudu su poseban korak.'],
    ['Start small, grow later: features and revisions can be added after launch.', 'Počnite malo, rastite kasnije: funkcije i izmene mogu da se dodaju i posle lansiranja.'],
    ['SELECTED SERVICES', 'IZABRANE USLUGE'],
    ['None selected', 'Ništa nije izabrano'],
    ['PROJECT PATH', 'PUT PROJEKTA'],
    ['Universal / cross-service', 'Univerzalno / više oblasti'],
    ['Choose project type', 'Izaberite vrstu projekta'],
    ['Project type not selected', 'Vrsta projekta nije izabrana'],
    ['Not selected yet', 'Još nije izabrano'],
    ['← PREVIOUS', '← NAZAD'], ['CONTINUE →', 'NASTAVI →'], ['SEND BRIEF ↗', 'POŠALJI BRIEF ↗'], ['SENDING…', 'SLANJE…'], ['← GO BACK', '← NAZAD'],
    // builder: step 1
    ['WHICH AREAS SHOULD WE COMBINE?', 'KOJE OBLASTI DA KOMBINUJEMO?'],
    ['Select one or more service areas. You can combine them in one brief.', 'Izaberite jednu ili više oblasti usluga. Možete ih kombinovati u jednom briefu.'],
    ['Websites and digital experiences.', 'Sajtovi i digitalna iskustva.'],
    ['Applications, dashboards and tools.', 'Aplikacije, dashboard-i i alati.'],
    ['Bots, workflows and integrations.', 'Botovi, tokovi rada i integracije.'],
    ['Choose one, two or all three. The next step will show only the relevant options.', 'Izaberite jednu, dve ili sve tri. Sledeći korak prikazuje samo relevantne opcije.'],
    ['All available features from this service area are listed below. Select any combination you need.', 'Ispod su sve dostupne funkcije iz ove oblasti. Izaberite koju god kombinaciju vam treba.'],
    ['Show options and features relevant to this project.', 'Prikaži opcije i funkcije za ovaj projekat.'],
    ['Only options related to this project type will appear in the next step.', 'U sledećem koraku pojaviće se samo opcije vezane za ovu vrstu projekta.'],
    ['Custom project', 'Projekat po meri'],
    // builder: step 2 (features)
    ['WHAT SHOULD IT INCLUDE?', 'ŠTA TREBA DA SADRŽI?'],
    ['Choose features across the service areas you selected.', 'Izaberite funkcije iz oblasti usluga koje ste izabrali.'],
    // builder: step 3 (materials)
    ['MATERIALS & REFERENCES', 'MATERIJALI I REFERENCE'],
    ['Share what you already have. If you have files, you can send them by email after we reply.', 'Podelite ono što već imate. Ako imate fajlove, možete ih poslati mejlom nakon što vam odgovorim.'],
    ['PROJECT / BUSINESS NAME', 'NAZIV PROJEKTA / FIRME'],
    ['WEBSITE OR REFERENCE LINKS', 'SAJT ILI LINKOVI KA REFERENCAMA'],
    ['WHAT MATERIALS ARE READY?', 'KOJI MATERIJALI SU SPREMNI?'],
    ['Logo, images and content ready', 'Logo, slike i sadržaj su spremni'],
    ['Some materials available', 'Deo materijala je dostupan'],
    ['Starting from scratch', 'Počinjem od nule'],
    ['Not sure yet', 'Još ne znam'],
    ['PROJECT NOTES', 'BELEŠKE O PROJEKTU'],
    ['ATTACHMENTS (PREVIEW ONLY)', 'PRILOZI (SAMO PREGLED)'],
    ['Your brand or project name', 'Naziv vašeg brenda ili projekta'],
    ['Tell us what you have in mind...', 'Recite nam šta imate na umu...'],
    // builder: step 4 (scope)
    ['SCOPE & EXPECTATIONS', 'OBIM I OČEKIVANJA'],
    ['These details help us understand the scale and timing of your project.', 'Ovi detalji nam pomažu da razumemo veličinu i rokove vašeg projekta.'],
    ['PROJECT PRIORITY', 'PRIORITET PROJEKTA'],
    ['Flexible timeline', 'Fleksibilan rok'],
    ['Standard timeline', 'Standardan rok'],
    ['Urgent / ASAP', 'Hitno / što pre'],
    ['BUDGET RANGE', 'OPSEG BUDŽETA'],
    ['ANY SPECIAL REQUIREMENTS?', 'IMATE LI POSEBNE ZAHTEVE?'],
    ['Integrations, deadlines, special features...', 'Integracije, rokovi, posebne funkcije...'],
    // builder: step 5 (finish)
    ['FINAL REVIEW & QUOTATION REQUEST', 'ZAVRŠNI PREGLED I ZAHTEV ZA PONUDU'],
    ['Review your project details and leave your contact information. We’ll review the brief and prepare an official quotation.', 'Pregledajte detalje projekta i ostavite kontakt podatke. Pregledaćemo brief i pripremiti zvaničnu ponudu.'],
    ['SELECTED FEATURES', 'IZABRANE FUNKCIJE'],
    ['PRICING', 'CENA'],
    ['To be discussed', 'Dogovara se naknadno'],
    ['Final pricing will be confirmed after reviewing requirements and project complexity.', 'Konačna cena biće potvrđena nakon pregleda zahteva i složenosti projekta.'],
    ['YOUR NAME', 'VAŠE IME'],
    ['EMAIL ADDRESS', 'MEJL ADRESA'],
    ['COMPANY (OPTIONAL)', 'FIRMA (NEOBAVEZNO)'],
    ['Full name', 'Ime i prezime'],
    ['Company / brand', 'Firma / brend'],
    ['QUOTATION NOTICE', 'NAPOMENA O PONUDI'],
    ['The displayed scope is an initial project brief, not a final price. An official quotation will be prepared after reviewing the selected services, complexity, integrations and timeline. Urgent delivery may affect pricing.', 'Prikazani obim je početni brief projekta, a ne konačna cena. Zvanična ponuda biće pripremljena nakon pregleda izabranih usluga, složenosti, integracija i roka. Hitna isporuka može uticati na cenu.'],
    // modal and navigation
    ['[ CONCEPT PREVIEW ]', '[ PREGLED KONCEPTA ]'],
    ['CLOSE ✕', 'ZATVORI ✕'],
    ['This preview represents a possible project direction. It is not presented as a completed client project.', 'Ovaj pregled predstavlja mogući pravac projekta. Ne predstavlja se kao završen projekat za klijenta.'],
    ['[ BRIEF SENT ]', '[ BRIEF POSLAT ]'],
    ['BRIEF RECEIVED', 'BRIEF PRIMLJEN'],
    ['PROJECT BUILDER', 'BUILDER PROJEKTA'],
    ['SERVICES', 'USLUGE'], ['FEATURES', 'FUNKCIJE'], ['SCOPE', 'OBIM'], ['FINAL REVIEW', 'ZAVRŠNI PREGLED'],
    // alerts
    ['Please select at least one service area.', 'Izaberite bar jednu oblast usluga.'],
    ['Please select a project type first.', 'Prvo izaberite vrstu projekta.'],
    ['Please add your name and a valid email address so I can reply.', 'Upišite ime i ispravnu mejl adresu da bih mogao da odgovorim.'],
    ['Too many requests right now. Please try again a little later.', 'Trenutno ima previše zahteva. Pokušajte ponovo malo kasnije.'],
    ['The form could not reach the server, so your email app will open with the brief instead.', 'Formular nije mogao da stigne do servera, pa će se umesto toga otvoriti vaša mejl aplikacija sa briefom.'],
    // project types (also used as labels in the combined feature list)
    ['Hotel Website', 'Sajt hotela'], ['Resort Website', 'Sajt resorta'], ['Restaurant Website', 'Sajt restorana'],
    ['Café / Bar Website', 'Sajt kafea / bara'], ['Apartments / Villas Website', 'Sajt apartmana / vila'], ['Tours & Experiences Website', 'Sajt za ture i iskustva'],
    ['Corporate Website', 'Korporativni sajt'], ['Company Profile', 'Profil kompanije'], ['Portfolio Website', 'Portfolio sajt'], ['Service Business Website', 'Sajt uslužne delatnosti'],
    ['E-commerce Store', 'E-commerce prodavnica'], ['Landing Page', 'Landing stranica'], ['Online Platform', 'Online platforma'], ['Digital Experience', 'Digitalno iskustvo'],
    ['Internal Business App', 'Interna poslovna aplikacija'], ['Client Portal', 'Klijentski portal'], ['Operations App', 'Operativna aplikacija'],
    ['Analytics Dashboard', 'Analitički dashboard'], ['Operations Dashboard', 'Operativni dashboard'], ['Reporting Workspace', 'Radni prostor za izveštaje'],
    ['Calculator / Converter', 'Kalkulator / konvertor'], ['Configurator', 'Konfigurator'], ['Custom Web Application', 'Web aplikacija po meri'],
    ['Telegram Bot', 'Telegram bot'], ['WhatsApp Bot', 'WhatsApp bot'], ['Website Chatbot', 'Chatbot za sajt'],
    ['Lead Routing', 'Usmeravanje upita'], ['Booking / Enquiry Workflow', 'Tok rezervacija / upita'], ['Approval & Task Automation', 'Automatizacija odobravanja i zadataka'],
    ['API Integration', 'API integracija'], ['Database Synchronisation', 'Sinhronizacija baza podataka'], ['Notifications System', 'Sistem obaveštenja']
  ];

  var D = Object.create(null);
  function norm(s) {
    return String(s).replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"').replace(/\s+/g, ' ').trim().toLowerCase();
  }
  function add(list) { for (var i = 0; i < list.length; i++) D[norm(list[i][0])] = list[i][1]; }
  add(P);
  window.NB_SR_ADD = function (obj) {
    var list = [];
    for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) list.push([k, obj[k]]);
    add(list);
    if (document.body) walk(document.body);
  };

  window.NB_SR_HAS = function (s) { return tr(s) !== null; };

  // Match the casing of the source text (ALL CAPS stays ALL CAPS, a lowercase start stays lowercase).
  function fit(src, out) {
    var t = src.trim();
    if (t && t === t.toUpperCase() && t !== t.toLowerCase()) return out.toLocaleUpperCase('sr');
    if (t && t.charAt(0) !== t.charAt(0).toUpperCase() && out) return out.charAt(0).toLowerCase() + out.slice(1);
    return out;
  }
  function trI(x) { var r = tr(x); return r === null ? x : r; }

  // Sentences with a changing part (names, counts).
  var R = [
    [/^\[ (\d\d) \/ (.+) \]$/, function (m) { return '[ ' + m[1] + ' / ' + trI(m[2]) + ' ]'; }],
    [/^01 \/ CUSTOM (.+) PROJECT$/, function (m) { return '01 / PROJEKAT PO MERI: ' + trI(m[1]); }],
    [/^01 \/ (.+) — CHOOSE YOUR PROJECT TYPE$/, function (m) { return '01 / ' + trI(m[1]) + ' — IZABERITE VRSTU PROJEKTA'; }],
    [/^Choose directly from every feature in (.+)\. No extra category selection is needed\.$/, function (m) { return 'Birajte direktno iz svih funkcija u oblasti: ' + trI(m[1]) + '. Nije potreban dodatni izbor kategorije.'; }],
    [/^A focused path with choices and features tailored to (.+)\.$/, function (m) { return 'Fokusiran put sa opcijama i funkcijama prilagođenim za: ' + trI(m[1]).toLowerCase() + '.'; }],
    [/^This path is narrowed to (.+)\. Choose the specific project you want to build\.$/, function (m) { return 'Ovaj put je sužen na: ' + trI(m[1]) + '. Izaberite konkretan projekat koji želite da napravite.'; }],
    [/^Choose from all features in your selected (.+) project groups\.$/, function (m) { return 'Izaberite iz svih funkcija u izabranoj oblasti: ' + trI(m[1]) + '.'; }],
    [/^Choose only the dedicated feature set for (.+)\.$/, function (m) { return 'Izaberite samo funkcije posvećene za: ' + trI(m[1]) + '.'; }],
    [/^Custom \/ all (.+) features$/, function (m) { return 'Po meri / sve funkcije: ' + trI(m[1]); }],
    [/^(\d+) service area\(s\) \/ (\d+) feature\(s\)$/, function (m) { return 'Oblasti: ' + m[1] + ' · Funkcije: ' + m[2]; }],
    [/^FEATURES \((\d+)\)$/, function (m) { return 'FUNKCIJE (' + m[1] + ')'; }],
    [/^STEP (\d+)$/, function (m) { return 'KORAK ' + m[1]; }],
    [/^Copied: (.+)$/, function (m) { return 'Kopirano: ' + m[1]; }],
    [/^Thank you, (.+)\. Your brief (\S+) has arrived\. I will reply to (.+) soon\.$/, function (m) { return 'Hvala, ' + m[1] + '. Vaš brief ' + m[2] + ' je stigao. Odgovoriću na ' + m[3] + ' uskoro.'; }],
    [/^(\d\d) \/ (.+)$/, function (m) { return m[1] + ' / ' + trI(m[2]); }]
  ];

  function tr(s) {
    var n = norm(s);
    if (!n) return null;
    var hit = D[n];
    if (hit !== undefined) return fit(s, hit);
    var t = String(s).trim(), i, m;
    for (i = 0; i < R.length; i++) {
      m = t.match(R[i][0]);
      if (m) { var out = R[i][1](m); return out === t ? null : out; }
    }
    // "Area / Project type — Feature": split at the first separator, the rest is tried as a whole first.
    var seps = [' — ', ' / '];
    for (i = 0; i < seps.length; i++) {
      var at = t.indexOf(seps[i]);
      if (at > -1) {
        var head = t.slice(0, at), tail = t.slice(at + seps[i].length);
        var h = tr(head), tl = tr(tail);
        if (h !== null || tl !== null) return (h === null ? head : h) + seps[i] + (tl === null ? tail : tl);
      }
    }
    return null;
  }

  function setText(node) {
    var v = node.nodeValue;
    if (!v || !/\S/.test(v)) return;
    var m = v.match(/^(\s*)([\s\S]*?)(\s*)$/);
    var out = tr(m[2]);
    if (out === null || out === m[2]) return;
    var p = node.parentNode;
    // Keep the English value of <option>s so the builder always sends English.
    if (p && p.nodeName === 'OPTION' && !p.hasAttribute('value')) p.setAttribute('value', m[2]);
    node.nodeValue = m[1] + out + m[3];
  }
  var ATTRS = ['placeholder', 'aria-label', 'alt'];
  function attrOne(el, a) {
    var v = el.getAttribute(a);
    if (!v) return;
    var out = tr(v);
    if (out !== null && out !== v) el.setAttribute(a, out);
  }
  function walk(node) {
    if (node.nodeType === 3) { setText(node); return; }
    if (node.nodeType !== 1) return;
    var tag = node.nodeName;
    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEXTAREA' || tag === 'NOSCRIPT') return;
    for (var i = 0; i < ATTRS.length; i++) if (node.hasAttribute(ATTRS[i])) attrOne(node, ATTRS[i]);
    for (var c = node.firstChild; c; c = c.nextSibling) walk(c);
  }

  // alert() messages
  var nativeAlert = window.alert;
  window.alert = function (msg) {
    var t = tr(String(msg));
    nativeAlert.call(window, t === null ? msg : t);
  };

  // The page re-draws parts of itself (category, builder, summary); translate whatever appears.
  var mo = new MutationObserver(function (list) {
    mo.disconnect();
    for (var i = 0; i < list.length; i++) {
      var m = list[i];
      if (m.type === 'childList') { for (var j = 0; j < m.addedNodes.length; j++) walk(m.addedNodes[j]); }
      else if (m.type === 'characterData') setText(m.target);
      else if (m.type === 'attributes') attrOne(m.target, m.attributeName);
    }
    observe();
  });
  function observe() {
    mo.observe(document.body, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ATTRS });
  }

  var t0 = tr(document.title);
  if (t0 !== null) document.title = t0;
  walk(document.body);
  observe();
})();
