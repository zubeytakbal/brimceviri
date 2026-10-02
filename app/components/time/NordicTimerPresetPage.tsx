// İsveççe, Norveççe ve Danca hazır süre zamanlayıcı sayfası ("Timer 20 minuter").
// Almanca GermanTimerPresetPage ile aynı yapı: kullanım, dönüşüm, bitiş saatleri.
import type { Metadata } from "next";
import type { NordicLocale } from "../../converter/time/nordicWeek";
import {
  NORDIC_TIMER_SECONDS,
  NORDIC_TIMER_USES,
  nordicTimerLabel,
  nordicTimerPath,
  nordicTimerPresetLinks,
} from "../../i18n/nordicTimerPresets";
import { timerPresetAlternates, timerPresets } from "../../i18n/timerPresets";
import { buildSiteUrl } from "../../siteConfig";
import CountdownTimer from "./CountdownTimer";
import { NORDIC_TIME_LABELS, NORDIC_TIME_PATHS, NORDIC_TIME_UI } from "./nordicTimeCopy";
import TimeToolPage from "./TimeToolPage";

type Seconds = (typeof NORDIC_TIMER_SECONDS)[number];

const NUMBER_LOCALE: Record<NordicLocale, string> = { sv: "sv-SE", no: "nb-NO", da: "da-DK" };

const COPY: Record<
  NordicLocale,
  {
    metaTitle: (label: string) => string;
    description: (label: string) => string;
    intro: (label: string, seconds: string) => string;
    usesTitle: (label: string) => string;
    convertedTitle: (label: string) => string;
    endTitle: string;
    endIntro: (label: string) => string;
    start: string;
    end: string;
    nextDay: string;
    factsTitle: string;
    factsNote: string;
    units: [string, string, string, string];
    facts: [string, string, string, string, string];
    approx: string;
    otherTimes: string;
    allTimers: string;
    faq: (label: string, s: string, m: string, h: string) => Array<{ question: string; answer: string }>;
  }
> = {
  sv: {
    metaTitle: (l) => `Timer ${l} – nedräkning med alarm`,
    description: (l) => `Timer på ${l} är redan inställd: tryck på start så ljuder ett alarm när tiden är ute. Med sluttid, eget ljud, helskärm och +1 minut – gratis i webbläsaren.`,
    intro: (l, s) => `Nedräkningen på ${l} (${s} sekunder) är inställd. Tryck på ”Starta” – när tiden är ute ljuder en signal och sluttiden visas på skärmen.`,
    usesTitle: (l) => `Vad räcker ${l} till?`,
    convertedTitle: (l) => `${l} omräknat`,
    endTitle: "När är tiden ute?",
    endIntro: (l) => `Efter start visar timern sluttiden. Exempel på när ${l} tar slut:`,
    start: "Start",
    end: "Slut",
    nextDay: "nästa dag",
    factsTitle: "Vad hinner hända på den tiden?",
    factsNote: "Beräknat med typiska genomsnittsvärden; kan variera.",
    units: ["Sekunder", "Minuter", "Timmar", "Millisekunder"],
    facts: ["Promenad (5 km/h)", "Jogging (10 km/h)", "Cykling (18 km/h)", "Hjärtslag (70 per minut)", "Andel av ett dygn"],
    approx: "cirka",
    otherTimes: "Andra tider",
    allTimers: "Timer med egen tid",
    faq: (l, s, m, h) => [
      { question: `Hur många sekunder är ${l}?`, answer: `${l} = ${s} sekunder = ${m} minuter = ${h} timmar.` },
      { question: "Fortsätter timern om jag byter flik?", answer: "Ja. Tiden mäts mot den verkliga klockan, så timern blir klar i tid även om du byter flik. Stäng bara inte fliken; på mobilen, slå på ”Håll skärmen tänd”." },
      { question: "Kan jag använda egen musik som signal?", answer: "Ja. Välj ”Eget ljud” och en ljudfil från din enhet. Den stannar bara i den här webbläsaren och laddas inte upp." },
    ],
  },
  no: {
    metaTitle: (l) => `Timer ${l} – nedtelling med alarm`,
    description: (l) => `Timer på ${l} er allerede stilt inn: trykk start, så lyder en alarm når tiden er ute. Med sluttid, egen lyd, fullskjerm og +1 minutt – gratis i nettleseren.`,
    intro: (l, s) => `Nedtellingen på ${l} (${s} sekunder) er stilt inn. Trykk «Start» – når tiden er ute, lyder et signal og sluttiden vises på skjermen.`,
    usesTitle: (l) => `Hva rekker du på ${l}?`,
    convertedTitle: (l) => `${l} omregnet`,
    endTitle: "Når er tiden ute?",
    endIntro: (l) => `Etter start viser timeren sluttiden. Eksempler på når ${l} er over:`,
    start: "Start",
    end: "Slutt",
    nextDay: "neste dag",
    factsTitle: "Hva rekker å skje på den tiden?",
    factsNote: "Beregnet med typiske gjennomsnittsverdier; kan variere.",
    units: ["Sekunder", "Minutter", "Timer", "Millisekunder"],
    facts: ["Gåtur (5 km/t)", "Jogging (10 km/t)", "Sykling (18 km/t)", "Hjerteslag (70 per minutt)", "Andel av et døgn"],
    approx: "omtrent",
    otherTimes: "Andre tider",
    allTimers: "Timer med egen tid",
    faq: (l, s, m, h) => [
      { question: `Hvor mange sekunder er ${l}?`, answer: `${l} = ${s} sekunder = ${m} minutter = ${h} timer.` },
      { question: "Går timeren videre hvis jeg bytter fane?", answer: "Ja. Tiden måles mot den virkelige klokka, så timeren blir ferdig i tide selv om du bytter fane. Bare ikke lukk fanen; på mobilen, slå på «Hold skjermen på»." },
      { question: "Kan jeg bruke egen musikk som signal?", answer: "Ja. Velg «Egen lyd» og en lydfil fra enheten din. Den blir bare i denne nettleseren og lastes ikke opp." },
    ],
  },
  da: {
    metaTitle: (l) => `Timer ${l} – nedtælling med alarm`,
    description: (l) => `Timer på ${l} er allerede indstillet: tryk start, så lyder en alarm, når tiden er gået. Med sluttid, egen lyd, fuld skærm og +1 minut – gratis i browseren.`,
    intro: (l, s) => `Nedtællingen på ${l} (${s} sekunder) er indstillet. Tryk på »Start« – når tiden er gået, lyder et signal, og sluttiden vises på skærmen.`,
    usesTitle: (l) => `Hvad kan man nå på ${l}?`,
    convertedTitle: (l) => `${l} omregnet`,
    endTitle: "Hvornår er tiden gået?",
    endIntro: (l) => `Efter start viser timeren sluttiden. Eksempler på, hvornår ${l} er gået:`,
    start: "Start",
    end: "Slut",
    nextDay: "næste dag",
    factsTitle: "Hvad når der at ske på den tid?",
    factsNote: "Beregnet med typiske gennemsnitsværdier; kan variere.",
    units: ["Sekunder", "Minutter", "Timer", "Millisekunder"],
    facts: ["Gang (5 km/t)", "Løb (10 km/t)", "Cykling (18 km/t)", "Hjerteslag (70 pr. minut)", "Andel af et døgn"],
    approx: "cirka",
    otherTimes: "Andre tider",
    allTimers: "Timer med egen tid",
    faq: (l, s, m, h) => [
      { question: `Hvor mange sekunder er ${l}?`, answer: `${l} = ${s} sekunder = ${m} minutter = ${h} timer.` },
      { question: "Kører timeren videre, hvis jeg skifter fane?", answer: "Ja. Tiden måles mod det rigtige ur, så timeren bliver færdig til tiden, selv om du skifter fane. Luk bare ikke fanen; på mobilen skal du slå »Hold skærmen tændt« til." },
      { question: "Kan jeg bruge min egen musik som signal?", answer: "Ja. Vælg »Egen lyd« og en lydfil fra din enhed. Den bliver kun i denne browser og uploades ikke." },
    ],
  },
};

const cap = (text: string) => text.charAt(0).toLocaleUpperCase() + text.slice(1);

export function nordicTimerPresetMetadata(locale: NordicLocale, seconds: Seconds): Metadata {
  const c = COPY[locale];
  const label = nordicTimerLabel(locale, seconds);
  const path = nordicTimerPath(locale, seconds);
  const preset = timerPresets.find((p) => p.seconds === seconds);
  return {
    title: c.metaTitle(label),
    description: c.description(label),
    alternates: { canonical: path, ...(preset ? timerPresetAlternates(preset) : {}) },
    openGraph: { title: c.metaTitle(label), description: c.description(label), url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: NORDIC_TIME_UI[locale].ogLocale, type: "website" },
  };
}

export default function NordicTimerPresetPage({ locale, seconds }: { locale: NordicLocale; seconds: Seconds }) {
  const c = COPY[locale];
  const ui = NORDIC_TIME_UI[locale];
  const n = (value: number, digits = 3) => value.toLocaleString(NUMBER_LOCALE[locale], { maximumFractionDigits: digits });
  const s = seconds;
  const label = nordicTimerLabel(locale, s);
  const title = `Timer ${label}`;
  const path = nordicTimerPath(locale, s);
  const index = NORDIC_TIMER_SECONDS.indexOf(s);
  const neighbors = NORDIC_TIMER_SECONDS.filter((_, i) => i !== index && Math.abs(i - index) <= 3);

  const conversions: Array<[string, string]> = [
    [c.units[0], n(s)],
    [c.units[1], n(s / 60)],
    [c.units[2], n(s / 3600, 4)],
    [c.units[3], n(s * 1000)],
  ];

  const clock = (sec: number) => {
    const hh = Math.floor(sec / 3600);
    const mm = Math.floor((sec % 3600) / 60);
    const ss = sec % 60;
    return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}${ss ? `:${String(ss).padStart(2, "0")}` : ""}`;
  };
  const endTimes = [
    [7, 0],
    [12, 30],
    [18, 0],
    [22, 45],
  ].map(([h, m]) => {
    const endSec = (h * 60 + m) * 60 + s;
    const day = Math.floor(endSec / 86400);
    return { start: clock((h * 60 + m) * 60), end: `${clock(endSec % 86400)}${day ? ` (${c.nextDay})` : ""}` };
  });

  const facts: Array<[string, string]> = [
    [c.facts[0], `${n((5 * s) / 3600, 2)} km`],
    [c.facts[1], `${n((10 * s) / 3600, 2)} km`],
    [c.facts[2], `${n((18 * s) / 3600, 2)} km`],
    [c.facts[3], `${c.approx} ${n(Math.round((70 * s) / 60), 0)}`],
    [c.facts[4], `${n((s / 86400) * 100, 2)} %`],
  ];

  return (
    <div lang={locale === "no" ? "nb" : locale}>
      <TimeToolPage
        crumbs={[
          { href: ui.homeHref, label: ui.home },
          { href: NORDIC_TIME_PATHS.timer[locale], label: "Timer" },
          { href: path, label: title },
        ]}
        crumbLabel={ui.crumbLabel}
        title={title}
        intro={c.intro(label, n(s))}
        tool={<CountdownTimer locale={locale} initialSeconds={s} presetLinks={nordicTimerPresetLinks(locale)} />}
        related={{
          title: c.otherTimes,
          links: [
            ...neighbors.map((other) => ({ href: nordicTimerPath(locale, other), label: `Timer ${nordicTimerLabel(locale, other)}` })),
            { href: NORDIC_TIME_PATHS.timer[locale], label: c.allTimers },
            { href: NORDIC_TIME_PATHS.stopwatch[locale], label: NORDIC_TIME_LABELS.stopwatch[locale] },
            { href: NORDIC_TIME_PATHS.alarm[locale], label: NORDIC_TIME_LABELS.alarm[locale] },
          ],
        }}
        tocTitle={ui.tocTitle}
        tocItems={[
          { id: "anvandning", label: c.usesTitle(label) },
          { id: "omrakning", label: c.convertedTitle(cap(label)) },
          { id: "slut", label: c.endTitle },
          { id: "under-tiden", label: c.factsTitle },
          { id: "faq", label: ui.faqTitle },
        ]}
        faqTitle={ui.faqTitle}
        faqItems={c.faq(cap(label), n(s), n(s / 60), n(s / 3600, 4))}
      >
        <h2 id="anvandning">{c.usesTitle(label)}</h2>
        <ul>
          {NORDIC_TIMER_USES[s][locale].map((use) => (
            <li key={use}>{use}</li>
          ))}
        </ul>

        <h2 id="omrakning">{c.convertedTitle(cap(label))}</h2>
        <div className="conversion-table-wrap">
          <table className="conversion-table">
            <tbody>
              {conversions.map(([unit, value]) => (
                <tr key={unit}>
                  <th scope="row">{unit}</th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="slut">{c.endTitle}</h2>
        <p>{c.endIntro(label)}</p>
        <div className="conversion-table-wrap">
          <table className="conversion-table">
            <thead>
              <tr>
                <th scope="col">{c.start}</th>
                <th scope="col">{c.end}</th>
              </tr>
            </thead>
            <tbody>
              {endTimes.map((row) => (
                <tr key={row.start}>
                  <td>{row.start}</td>
                  <td>{row.end}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="under-tiden">{c.factsTitle}</h2>
        <div className="conversion-table-wrap">
          <table className="conversion-table">
            <tbody>
              {facts.map(([what, value]) => (
                <tr key={what}>
                  <th scope="row">{what}</th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          <small>{c.factsNote}</small>
        </p>
      </TimeToolPage>
    </div>
  );
}
