// İsveççe, Norveççe ve Danca hazır süre zamanlayıcı sayfaları ("Timer 20 minuter").
// Zamanlayıcıdaki hızlı seçim düğmeleriyle aynı 14 süre; her birinin o dilde kendi
// kullanım örnekleri var, böylece sayfalar birbirinin kopyası olmaz.
import type { NordicLocale } from "../converter/time/nordicWeek";

export const NORDIC_TIMER_SECONDS = [30, 60, 120, 180, 300, 600, 900, 1200, 1500, 1800, 2700, 3600, 5400, 7200] as const;

const UNITS: Record<NordicLocale, { sec: string; min1: string; min: string; hour: string }> = {
  sv: { sec: "sekunder", min1: "minut", min: "minuter", hour: "timmar" },
  no: { sec: "sekunder", min1: "minutt", min: "minutter", hour: "timer" },
  da: { sec: "sekunder", min1: "minut", min: "minutter", hour: "timer" },
};

/** "30 sekunder", "1 minut", "20 minuter", "2 timmar" */
export function nordicTimerLabel(locale: NordicLocale, seconds: number) {
  const u = UNITS[locale];
  if (seconds < 60) return `${seconds} ${u.sec}`;
  if (seconds < 7200) {
    const m = seconds / 60;
    return `${m} ${m === 1 ? u.min1 : u.min}`;
  }
  return `${seconds / 3600} ${u.hour}`;
}

export const nordicTimerSlug = (locale: NordicLocale, seconds: number) => nordicTimerLabel(locale, seconds).replace(" ", "-");

export const nordicTimerPath = (locale: NordicLocale, seconds: number) => `/${locale}/timer/${nordicTimerSlug(locale, seconds)}`;

export function findNordicTimerSeconds(locale: NordicLocale, slug: string) {
  return NORDIC_TIMER_SECONDS.find((s) => nordicTimerSlug(locale, s) === slug) ?? null;
}

/** Zamanlayıcı düğmeleri için: saniye -> hazır sayfa yolu. */
export function nordicTimerPresetLinks(locale: NordicLocale) {
  return Object.fromEntries(NORDIC_TIMER_SECONDS.map((s) => [s, nordicTimerPath(locale, s)]));
}

type Uses = Record<NordicLocale, string[]>;

export const NORDIC_TIMER_USES: Record<(typeof NORDIC_TIMER_SECONDS)[number], Uses> = {
  30: {
    sv: ["Plankan eller väggsittning", "Kort stretchövning", "Snabb frågestund i klassrummet"],
    no: ["Planke eller veggsitting", "Kort tøyeøvelse", "Rask quiz i klasserommet"],
    da: ["Planke eller vægsid", "Kort strækøvelse", "Hurtig quiz i klasselokalet"],
  },
  60: {
    sv: ["Snabb stretch eller planka", "Muntlig övning på en minut", "Halva tandborstningen"],
    no: ["Rask tøying eller planke", "Muntlig øvelse på ett minutt", "Halve tannpussen"],
    da: ["Hurtig udstrækning eller planke", "Mundtlig øvelse på ét minut", "Halvdelen af tandbørstningen"],
  },
  120: {
    sv: ["Borsta tänderna (rekommenderad tid)", "Snabbnudlar", "Kort andningsövning"],
    no: ["Pusse tennene (anbefalt tid)", "Nudler", "Kort pusteøvelse"],
    da: ["Børste tænder (anbefalet tid)", "Instant nudler", "Kort vejrtrækningsøvelse"],
  },
  180: {
    sv: ["Löskokt ägg", "Dra en tepåse", "Kort presentation"],
    no: ["Bløtkokt egg", "Trekke en tepose", "Kort presentasjon"],
    da: ["Blødkogt æg", "Trække et tebrev", "Kort præsentation"],
  },
  300: {
    sv: ["Kort paus (Pomodoro)", "Snabb uppvärmning", "Svart te"],
    no: ["Kort pause (Pomodoro)", "Rask oppvarming", "Svart te"],
    da: ["Kort pause (Pomodoro)", "Hurtig opvarmning", "Sort te"],
  },
  600: {
    sv: ["Hårdkokt ägg", "Kort meditation", "Snabbstädning"],
    no: ["Hardkokt egg", "Kort meditasjon", "Rask rydding"],
    da: ["Hårdkogt æg", "Kort meditation", "Hurtig oprydning"],
  },
  900: {
    sv: ["Powernap", "Kort läspaus", "Ett avsnitt på ett prov"],
    no: ["Powernap", "Kort lesepause", "En del av en prøve"],
    da: ["Powernap", "Kort læsepause", "En del af en prøve"],
  },
  1200: {
    sv: ["Kort tupplur", "Ugnsrostade grönsaker", "Lässtund"],
    no: ["Kort høneblund", "Ovnsbakte grønnsaker", "Leseøkt"],
    da: ["Kort lur", "Ovnbagte grøntsager", "Læsetid"],
  },
  1500: {
    sv: ["Ett Pomodoro-arbetspass", "Muffins i ugnen", "Fokuserat arbete"],
    no: ["En Pomodoro-arbeidsøkt", "Muffins i ovnen", "Fokusert arbeid"],
    da: ["En Pomodoro-arbejdsblok", "Muffins i ovnen", "Fokuseret arbejde"],
  },
  1800: {
    sv: ["Pluggpass", "Promenad", "Lång Pomodoro-paus"],
    no: ["Leseøkt", "Gåtur", "Lang Pomodoro-pause"],
    da: ["Lektielæsning", "Gåtur", "Lang Pomodoro-pause"],
  },
  2700: {
    sv: ["En lektion", "Träningspass", "Kycklingklubbor i ugnen"],
    no: ["En skoletime", "Treningsøkt", "Kyllinglår i ovnen"],
    da: ["En lektion", "Træningspas", "Kyllingelår i ovnen"],
  },
  3600: {
    sv: ["Ett prov", "Långt arbetspass", "Gryta i ugnen"],
    no: ["En eksamen", "Lang arbeidsøkt", "Gryte i ovnen"],
    da: ["En eksamen", "Lang arbejdsblok", "Gryderet i ovnen"],
  },
  5400: {
    sv: ["En hel sömncykel", "En fotbollsmatch", "Ett långt prov"],
    no: ["En hel søvnsyklus", "En fotballkamp", "En lang eksamen"],
    da: ["En hel søvncyklus", "En fodboldkamp", "En lang eksamen"],
  },
  7200: {
    sv: ["En film", "Ett långt prov", "Långkok"],
    no: ["En film", "En lang eksamen", "Langkok"],
    da: ["En film", "En lang eksamen", "Langtidsretter"],
  },
};
