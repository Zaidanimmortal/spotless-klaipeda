import { FormEvent, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  Building2,
  Check,
  ChevronDown,
  Clock3,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Waves,
  X,
} from "lucide-react";

type Language = "lt" | "en";

const heroImage = "/manus-storage/hero-cleaning_d3facf23.jpg";
const linenImage = "/manus-storage/linen-service_384d8cb0.jpg";

const copy = {
  lt: {
    navServices: "Paslaugos",
    navCare: "Būsto priežiūra",
    navContact: "Kontaktai",
    call: "Skambinti",
    eyebrow: "VALYMAS · KLAIPĖDA",
    heroTitle: "Švara, kuri leidžia jaustis namuose.",
    heroText:
      "Profesionalios valymo ir būsto priežiūros paslaugos namams, verslui ir svečių apgyvendinimui Klaipėdoje.",
    book: "Užsisakyti valymą",
    discover: "Atrasti paslaugas",
    quick: "Greitas atsakymas",
    area: "Klaipėda ir apylinkės",
    promise: "Kruopštus rezultatas",
    introLabel: "MŪSŲ PAŽADAS",
    introTitle: "Mažiau rūpesčių. Daugiau lengvumo.",
    introText:
      "Atvykstame pasiruošę, dirbame atidžiai ir paliekame erdvę, į kurią malonu grįžti. Vienkartinis valymas ar nuolatinė priežiūra — pasirūpinsime detalėmis.",
    approach: "Kaip dirbame",
    approachText: "Aiškus susitarimas, dėmesys kiekvienam paviršiui ir patikimas laikas — be kompromisų švarai.",
    servicesLabel: "PASLAUGOS",
    servicesTitle: "Sprendimai kiekvienai erdvei.",
    servicesText: "Pasirinkite tik tai, ko reikia — nuo reguliarios švaros iki paruošimo kitam svečiui.",
    serviceMore: "Sužinoti daugiau",
    home: "Namų valymas",
    homeText: "Butams ir namams: reguliarus, generalinis bei kruopštus vienkartinis valymas.",
    move: "Po persikraustymo",
    moveText: "Švari pradžia naujame būste ar nepriekaištingas perdavimas po išsikraustymo.",
    business: "Biurams ir verslui",
    businessText: "Švari, jauki ir reprezentatyvi aplinka komandai, klientams bei darbuotojams.",
    windows: "Langai ir baldai",
    windowsText: "Langų, minkštų baldų ir tekstilės valymas, kad šviesa ir komfortas sugrįžtų.",
    careLabel: "BŪSTO PRIEŽIŪRA",
    careTitle: "Jūsų būstas — puikios būklės, net kai esate toli.",
    careText:
      "Airbnb ir nuomojamam būstui suteikiame ramią, patikimą priežiūrą: paruošimą svečiams, patalynės koordinavimą ir reguliarius patikrinimus.",
    carePoints: ["Paruošimas atvykstantiems svečiams", "Patalynė ir skalbinių priežiūra", "Būsto patikrinimai ir ataskaitos"],
    careCta: "Aptarti priežiūrą",
    processLabel: "PAPRASTA NUO PRADŽIOS",
    processTitle: "Švarus procesas. Ramus rezultatas.",
    steps: [
      ["01", "Susisiekiate", "Paskambinkite arba palikite užklausą — atsakysime greitai."],
      ["02", "Suderiname", "Aptariame jūsų erdvę, poreikius ir patogų laiką."],
      ["03", "Pasirūpiname", "Atvykstame pasiruošę ir paliekame šviežią, tvarkingą rezultatą."],
    ],
    quote: "Kiekvienas švarus kampas — tai daugiau ramybės jūsų dienai.",
    quoteBy: "Švarus Krantas · Klaipėda",
    contactLabel: "SUSISIEKIME",
    contactTitle: "Paruoškime jūsų erdvę lengvumui.",
    contactText: "Papasakokite apie savo erdvę — parinksime tinkamiausią paslaugą ir laiką.",
    name: "Vardas",
    namePlaceholder: "Jūsų vardas",
    phone: "Telefono numeris",
    phonePlaceholder: "+370 ...",
    service: "Kokia paslauga domina?",
    servicePlaceholder: "Pasirinkite paslaugą",
    message: "Trumpai apie erdvę",
    messagePlaceholder: "Pvz., 2 kambarių butas, Klaipėda...",
    send: "Siųsti užklausą",
    formSuccess: "Ačiū! Jūsų užklausa paruošta — netrukus su jumis susisieksime.",
    opening: "Atidarymo data · Netrukus",
    footerText: "Profesionalios valymo ir būsto priežiūros paslaugos Klaipėdoje.",
    rights: "Visos teisės saugomos.",
  },
  en: {
    navServices: "Services",
    navCare: "Property care",
    navContact: "Contact",
    call: "Call us",
    eyebrow: "CLEANING · KLAIPĖDA",
    heroTitle: "Clean spaces, easier days.",
    heroText:
      "Professional cleaning and property care for homes, businesses and guest stays in Klaipėda.",
    book: "Book a clean",
    discover: "Explore services",
    quick: "Quick response",
    area: "Klaipėda & nearby",
    promise: "Detailed finish",
    introLabel: "OUR PROMISE",
    introTitle: "Less to manage. More room to breathe.",
    introText:
      "We arrive prepared, clean with care and leave behind a space you will love returning to. From a one-time reset to ongoing care, every detail is covered.",
    approach: "Our approach",
    approachText: "Clear communication, care for every surface and reliable timing — without compromise on clean.",
    servicesLabel: "SERVICES",
    servicesTitle: "Care for every kind of space.",
    servicesText: "Choose exactly what you need — from recurring freshness to guest-ready property preparation.",
    serviceMore: "Explore service",
    home: "Home cleaning",
    homeText: "For apartments and houses: recurring, deep and carefully tailored one-off cleaning.",
    move: "Move-in / move-out",
    moveText: "A fresh start in your next place, or a spotless handover when you are leaving.",
    business: "Office & commercial",
    businessText: "A clean, welcoming and professional setting for teams, customers and guests.",
    windows: "Windows & upholstery",
    windowsText: "Window, soft furniture and textile cleaning that brings back light and comfort.",
    careLabel: "PROPERTY CARE",
    careTitle: "A cared-for property, even when you are away.",
    careText:
      "For Airbnb and rental homes, we provide calm, dependable support: guest preparation, linen coordination and regular property checks.",
    carePoints: ["Guest-ready preparation", "Linen and laundry support", "Property checks and updates"],
    careCta: "Discuss property care",
    processLabel: "SIMPLE FROM THE START",
    processTitle: "A clear process. A calm result.",
    steps: [
      ["01", "Get in touch", "Call or send a request — we will reply quickly."],
      ["02", "We arrange", "We discuss your space, needs and a time that works for you."],
      ["03", "We take care", "We arrive prepared and leave a fresh, considered result."],
    ],
    quote: "Every clean corner gives you a little more calm in your day.",
    quoteBy: "Švarus Krantas · Klaipėda",
    contactLabel: "LET’S CONNECT",
    contactTitle: "Make room for ease.",
    contactText: "Tell us about your space and we will recommend the right service and time.",
    name: "Name",
    namePlaceholder: "Your name",
    phone: "Phone number",
    phonePlaceholder: "+370 ...",
    service: "What do you need?",
    servicePlaceholder: "Choose a service",
    message: "A little about the space",
    messagePlaceholder: "For example, a 2-room flat in Klaipėda...",
    send: "Send enquiry",
    formSuccess: "Thank you! Your enquiry is ready — we will be in touch soon.",
    opening: "Opening date · Coming soon",
    footerText: "Professional cleaning and property care services in Klaipėda.",
    rights: "All rights reserved.",
  },
};

const services = [
  { icon: Sparkles, key: "home" as const, tone: "bg-[#dbe8ea]" },
  { icon: BedDouble, key: "move" as const, tone: "bg-[#e9e4d8]" },
  { icon: Building2, key: "business" as const, tone: "bg-[#dfebe5]" },
  { icon: SprayCan, key: "windows" as const, tone: "bg-[#e8e2df]" },
];

export default function Home() {
  const [language, setLanguage] = useState<Language>("lt");
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const t = copy[language];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#faf9f5] text-[#193a3f] selection:bg-[#b9d8d7] selection:text-[#143237]">
      <header className="sticky top-0 z-50 border-b border-[#193a3f]/10 bg-[#faf9f5]/94 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 lg:px-10">
          <button onClick={() => scrollTo("top")} aria-label="Home" className="group flex items-center gap-3 text-left">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#193a3f] text-[#f7f5ef] shadow-[0_8px_20px_rgba(25,58,63,.18)] transition-transform duration-200 group-hover:-rotate-6">
              <Waves size={21} strokeWidth={1.8} />
            </span>
            <span className="leading-none">
              <span className="block font-display text-[20px] tracking-[-0.04em]">Švarus Krantas</span>
              <span className="mt-1 block text-[9px] font-bold tracking-[0.22em] text-[#49676a]">KLAIPĖDA</span>
            </span>
          </button>

          <nav className="hidden items-center gap-8 text-[12px] font-bold tracking-[0.07em] text-[#284a4f] md:flex">
            <button onClick={() => scrollTo("services")} className="nav-link">{t.navServices}</button>
            <button onClick={() => scrollTo("care")} className="nav-link">{t.navCare}</button>
            <button onClick={() => scrollTo("contact")} className="nav-link">{t.navContact}</button>
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <div className="flex rounded-full border border-[#193a3f]/15 bg-white p-1 text-[10px] font-extrabold tracking-[0.1em]">
              <button onClick={() => setLanguage("lt")} className={`rounded-full px-2.5 py-1.5 transition ${language === "lt" ? "bg-[#193a3f] text-white" : "text-[#4d696c]"}`}>LT</button>
              <button onClick={() => setLanguage("en")} className={`rounded-full px-2.5 py-1.5 transition ${language === "en" ? "bg-[#193a3f] text-white" : "text-[#4d696c]"}`}>EN</button>
            </div>
            <a href="tel:+37062423500" className="btn-dark px-4 py-2.5 text-[11px]">
              <Phone size={14} /> {t.call}
            </a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#193a3f]/15 text-[#193a3f] md:hidden" aria-label="Toggle menu">
            {menuOpen ? <X size={19} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-[#193a3f]/10 bg-[#faf9f5] px-5 py-5 md:hidden">
            <div className="flex flex-col gap-4 text-sm font-bold text-[#284a4f]">
              <button onClick={() => scrollTo("services")} className="text-left">{t.navServices}</button>
              <button onClick={() => scrollTo("care")} className="text-left">{t.navCare}</button>
              <button onClick={() => scrollTo("contact")} className="text-left">{t.navContact}</button>
              <div className="flex items-center justify-between border-t border-[#193a3f]/10 pt-4">
                <div className="flex rounded-full border border-[#193a3f]/15 bg-white p-1 text-[10px] font-extrabold tracking-[0.1em]">
                  <button onClick={() => setLanguage("lt")} className={`rounded-full px-2.5 py-1.5 ${language === "lt" ? "bg-[#193a3f] text-white" : "text-[#4d696c]"}`}>LT</button>
                  <button onClick={() => setLanguage("en")} className={`rounded-full px-2.5 py-1.5 ${language === "en" ? "bg-[#193a3f] text-white" : "text-[#4d696c]"}`}>EN</button>
                </div>
                <a href="tel:+37062423500" className="btn-dark px-4 py-2.5 text-[11px]"><Phone size={14} /> {t.call}</a>
              </div>
            </div>
          </div>
        )}
      </header>

      <main id="top">
        <section className="relative mx-auto max-w-[1440px] px-3 pt-3 lg:px-5 lg:pt-5">
          <div className="hero-card relative isolate min-h-[660px] overflow-hidden rounded-[2rem] lg:min-h-[720px] lg:rounded-[2.5rem]">
            <img src={heroImage} alt="Bright clean apartment interior in Klaipėda" className="absolute inset-0 -z-20 h-full w-full object-cover object-[67%_center]" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#f3f0e7]/98 via-[#f6f3eb]/86 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 -z-10 h-2/5 bg-gradient-to-t from-[#17393e]/25 to-transparent" />
            <div className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-[#e6efe9]/70 blur-3xl" />

            <div className="relative flex min-h-[660px] max-w-xl flex-col justify-between px-7 py-8 sm:px-12 sm:py-12 lg:min-h-[720px] lg:px-20 lg:py-16">
              <div className="animate-rise">
                <p className="eyebrow mb-7 text-[#38636a]">{t.eyebrow}</p>
                <h1 className="max-w-[600px] font-display text-[clamp(3.4rem,6.1vw,6.5rem)] leading-[0.9] tracking-[-0.06em] text-[#193a3f]">
                  {t.heroTitle}
                </h1>
                <p className="mt-7 max-w-md text-[15px] leading-7 text-[#36565a] sm:text-[17px]">{t.heroText}</p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <button onClick={() => scrollTo("contact")} className="btn-dark px-5 py-3.5 text-[12px]">
                    {t.book} <ArrowRight size={16} />
                  </button>
                  <button onClick={() => scrollTo("services")} className="btn-light px-5 py-3.5 text-[12px]">
                    {t.discover} <ChevronDown size={15} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 border-t border-[#193a3f]/15 pt-5 text-[#23454a] sm:gap-5 sm:pt-7">
                {[
                  [Clock3, t.quick],
                  [MapPinIcon, t.area],
                  [ShieldCheck, t.promise],
                ].map(([Icon, label]) => {
                  const ItemIcon = Icon as typeof Clock3;
                  return (
                    <div key={label as string} className="flex flex-col gap-2 text-[10px] font-extrabold uppercase tracking-[0.08em] leading-4 sm:flex-row sm:items-center sm:text-[11px]">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#193a3f]/15 bg-white/60"><ItemIcon size={14} strokeWidth={1.7} /></span>
                      <span>{label as string}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1240px] gap-12 px-6 py-24 md:grid-cols-[1.15fr_.85fr] md:items-end md:px-10 lg:py-32">
          <div>
            <p className="eyebrow">{t.introLabel}</p>
            <h2 className="mt-6 max-w-2xl font-display text-[clamp(2.7rem,4.3vw,4.6rem)] leading-[0.96] tracking-[-0.055em] text-[#193a3f]">{t.introTitle}</h2>
          </div>
          <div className="border-l border-[#193a3f]/18 pl-6 md:pb-2">
            <p className="text-[16px] leading-7 text-[#536f71]">{t.introText}</p>
            <div className="mt-7 flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-[#88aeb0]" />
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#23454a]">{t.approach}</p>
                <p className="mt-2 text-sm leading-6 text-[#657e80]">{t.approachText}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="bg-[#e8f0ed] px-6 py-24 md:px-10 lg:py-32">
          <div className="mx-auto max-w-[1240px]">
            <div className="grid gap-8 md:grid-cols-[1fr_.8fr] md:items-end">
              <div>
                <p className="eyebrow">{t.servicesLabel}</p>
                <h2 className="mt-6 max-w-xl font-display text-[clamp(2.7rem,4.4vw,4.7rem)] leading-[0.96] tracking-[-0.055em] text-[#193a3f]">{t.servicesTitle}</h2>
              </div>
              <p className="max-w-md text-[16px] leading-7 text-[#506d6e] md:justify-self-end">{t.servicesText}</p>
            </div>

            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
              {services.map(({ icon: Icon, key, tone }, index) => (
                <article key={key} className="group service-card min-h-[290px] p-6 lg:min-h-[330px] lg:p-7">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tone} text-[#193a3f]`}><Icon size={23} strokeWidth={1.5} /></div>
                  <div className="mt-14">
                    <p className="text-[11px] font-extrabold tracking-[0.13em] text-[#789294]">0{index + 1}</p>
                    <h3 className="mt-3 font-display text-3xl leading-[1.02] tracking-[-0.045em] text-[#193a3f]">{t[key]}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#587476]">{t[`${key}Text` as keyof typeof t] as string}</p>
                  </div>
                  <button onClick={() => scrollTo("contact")} className="mt-7 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.13em] text-[#23484d] transition-transform duration-200 group-hover:translate-x-1">
                    {t.serviceMore} <ArrowUpRight size={14} />
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="care" className="mx-auto grid max-w-[1240px] gap-10 px-6 py-24 md:grid-cols-2 md:px-10 lg:gap-20 lg:py-32">
          <div className="relative min-h-[480px] overflow-hidden rounded-[1.8rem] bg-[#e5e1d7] sm:min-h-[560px]">
            <img src={linenImage} alt="Freshly folded linen for property care" className="h-full w-full object-cover object-center" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#193a3f]/65 via-[#193a3f]/10 to-transparent p-7 pt-24 text-white sm:p-10">
              <p className="max-w-[250px] font-display text-[34px] leading-[0.98] tracking-[-0.05em]">Airbnb, made effortless.</p>
              <p className="mt-3 text-xs font-bold tracking-[0.12em] text-white/75">KLAIPĖDA · PROPERTY CARE</p>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="eyebrow">{t.careLabel}</p>
            <h2 className="mt-6 max-w-xl font-display text-[clamp(2.7rem,4vw,4.3rem)] leading-[0.96] tracking-[-0.055em] text-[#193a3f]">{t.careTitle}</h2>
            <p className="mt-7 max-w-lg text-[16px] leading-7 text-[#567173]">{t.careText}</p>
            <ul className="mt-8 space-y-4">
              {t.carePoints.map((point) => (
                <li key={point} className="flex items-center gap-3 text-sm font-semibold text-[#36595d]">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d8e7e2] text-[#315e60]"><Check size={14} strokeWidth={2.5} /></span>
                  {point}
                </li>
              ))}
            </ul>
            <button onClick={() => scrollTo("contact")} className="btn-dark mt-10 w-fit px-5 py-3.5 text-[12px]">{t.careCta} <ArrowRight size={16} /></button>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#193a3f] px-6 py-24 text-[#f7f5ef] md:px-10 lg:py-28">
          <div className="absolute -right-16 -top-16 h-80 w-80 rounded-full border border-white/10" />
          <div className="absolute -right-6 top-4 h-48 w-48 rounded-full border border-white/10" />
          <div className="relative mx-auto max-w-[1240px]">
            <p className="eyebrow text-[#b9d9d6]">{t.processLabel}</p>
            <div className="mt-6 grid gap-10 md:grid-cols-[.8fr_1.2fr] md:items-end">
              <h2 className="max-w-md font-display text-[clamp(2.7rem,4vw,4.4rem)] leading-[0.95] tracking-[-0.055em]">{t.processTitle}</h2>
              <div className="grid gap-7 sm:grid-cols-3 sm:gap-4">
                {t.steps.map(([number, title, description]) => (
                  <div key={number} className="border-t border-white/20 pt-5">
                    <span className="text-[11px] font-extrabold tracking-[0.15em] text-[#9bc6c2]">{number}</span>
                    <h3 className="mt-5 font-display text-2xl tracking-[-0.04em]">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/65">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f0eee7] px-6 py-24 md:px-10 lg:py-28">
          <div className="mx-auto max-w-[980px] text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#d9e4e0] text-[#315e60]"><Sparkles size={19} strokeWidth={1.6} /></span>
            <blockquote className="mt-7 font-display text-[clamp(2.45rem,4.5vw,4.8rem)] leading-[0.98] tracking-[-0.055em] text-[#193a3f]">“{t.quote}”</blockquote>
            <p className="mt-7 text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#6d898a]">{t.quoteBy}</p>
          </div>
        </section>

        <section id="contact" className="px-5 py-20 sm:px-6 lg:py-28">
          <div className="mx-auto grid max-w-[1240px] overflow-hidden rounded-[1.9rem] bg-[#d9e7e1] md:grid-cols-[.86fr_1.14fr] lg:rounded-[2.2rem]">
            <div className="relative min-h-[450px] overflow-hidden bg-[#2b585d] p-8 text-[#f7f5ef] sm:p-12">
              <div className="absolute bottom-0 right-0 h-80 w-80 translate-x-1/3 translate-y-1/3 rounded-full border border-white/15" />
              <div className="absolute bottom-10 right-12 h-32 w-32 rounded-full border border-white/10" />
              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <p className="eyebrow text-[#b8dad6]">{t.contactLabel}</p>
                  <h2 className="mt-7 max-w-sm font-display text-[clamp(3rem,4.6vw,4.8rem)] leading-[0.93] tracking-[-0.055em]">{t.contactTitle}</h2>
                  <p className="mt-6 max-w-sm text-[15px] leading-7 text-white/70">{t.contactText}</p>
                </div>
                <div className="relative mt-12 border-t border-white/20 pt-6">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#b8dad6]">Telefonas / Phone</p>
                  <a href="tel:+37062423500" className="mt-2 inline-flex items-center gap-3 font-display text-3xl tracking-[-0.04em] transition-opacity hover:opacity-70"><Phone size={20} /> 0 624 23500</a>
                  <p className="mt-5 text-xs font-semibold text-white/65">{t.opening}</p>
                </div>
              </div>
            </div>

            <form onSubmit={onSubmit} className="bg-[#eaf0ed] p-7 sm:p-12">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="form-label">
                  <span>{t.name}</span>
                  <input required name="name" placeholder={t.namePlaceholder} className="form-input" />
                </label>
                <label className="form-label">
                  <span>{t.phone}</span>
                  <input required type="tel" name="phone" placeholder={t.phonePlaceholder} className="form-input" />
                </label>
              </div>
              <label className="form-label mt-5">
                <span>{t.service}</span>
                <select required defaultValue="" name="service" className="form-input">
                  <option value="" disabled>{t.servicePlaceholder}</option>
                  <option>{t.home}</option>
                  <option>{t.move}</option>
                  <option>{t.business}</option>
                  <option>{t.windows}</option>
                  <option>{t.careLabel}</option>
                </select>
              </label>
              <label className="form-label mt-5">
                <span>{t.message}</span>
                <textarea required name="message" rows={4} placeholder={t.messagePlaceholder} className="form-input resize-none" />
              </label>
              <button type="submit" className="btn-dark mt-7 w-full justify-center px-5 py-4 text-[12px]">{t.send} <ArrowRight size={16} /></button>
              {submitted && <p role="status" className="mt-5 rounded-xl border border-[#6d9a92]/25 bg-[#d5e7df] px-4 py-3 text-sm font-semibold leading-6 text-[#315e60]">{t.formSuccess}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#193a3f]/10 px-6 py-10 md:px-10">
        <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-7 sm:flex-row sm:items-end">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#193a3f] text-[#f7f5ef]"><Waves size={18} /></span>
            <div>
              <p className="font-display text-xl tracking-[-0.04em]">Švarus Krantas</p>
              <p className="mt-1 max-w-sm text-xs leading-5 text-[#617d7e]">{t.footerText}</p>
            </div>
          </div>
          <div className="text-left text-[10px] font-bold uppercase tracking-[0.12em] text-[#718d8e] sm:text-right">
            <p>Klaipėda, Lietuva</p>
            <p className="mt-1">© {new Date().getFullYear()} · {t.rights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function MapPinIcon(props: { size?: number; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M20 10.5C20 16.5 12 22 12 22S4 16.5 4 10.5a8 8 0 1 1 16 0Z" stroke="currentColor" strokeWidth={props.strokeWidth ?? 1.7} />
      <circle cx="12" cy="10.5" r="2.5" stroke="currentColor" strokeWidth={props.strokeWidth ?? 1.7} />
    </svg>
  );
}
