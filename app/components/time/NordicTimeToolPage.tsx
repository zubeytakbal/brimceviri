// İsveççe, Norveççe ve Danca zaman aracı sayfası (timer, stoppur, alarm, saat).
// Araç bileşenleri TR/EN/DE sayfalarıyla aynı; metinler nordicTimeCopy.ts içinde.
import type { Metadata } from "next";
import type { NordicLocale } from "../../converter/time/nordicWeek";
import { NORDIC_WEEK_PATHS } from "../../converter/time/nordicWeek";
import { NORDIC_TIMER_SECONDS, NORDIC_TIMER_USES, nordicTimerLabel } from "../../i18n/nordicTimerPresets";
import TimerPresetTable from "./TimerPresetTable";
import { timeToolAlternates, type TimeToolId } from "../../i18n/timeToolPaths";
import { buildSiteUrl } from "../../siteConfig";
import AlarmClock from "./AlarmClock";
import CountdownTimer from "./CountdownTimer";
import IntervalTimer from "./IntervalTimer";
import LiveClock from "./LiveClock";
import PomodoroTimer from "./PomodoroTimer";
import { NORDIC_TIME_COPY, NORDIC_TIME_LABELS, NORDIC_TIME_PATHS, NORDIC_TIME_UI, type NordicTimeTool } from "./nordicTimeCopy";
import Stopwatch from "./Stopwatch";
import TimeToolPage from "./TimeToolPage";

const TOOL_IDS: Record<NordicTimeTool, TimeToolId> = { timer: "timer", stopwatch: "stopwatch", alarm: "alarm", clock: "clock", pomodoro: "pomodoro", interval: "interval" };

const PRESET_COPY: Record<NordicLocale, { heading: string; intro: string; duration: string; uses: string }> = {
  sv: { heading: "Färdiga tider och vad de passar till", intro: "Klicka på en tid så ställs timern in på den; adressen kan sparas som bokmärke eller delas.", duration: "Tid", uses: "Passar till" },
  no: { heading: "Ferdige tider og hva de passer til", intro: "Klikk på en tid, så stilles timeren inn på den; adressen kan lagres som bokmerke eller deles.", duration: "Tid", uses: "Passer til" },
  da: { heading: "Færdige tider og hvad de passer til", intro: "Klik på en tid, så indstilles timeren til den; adressen kan gemmes som bogmærke eller deles.", duration: "Tid", uses: "Passer til" },
};

const WEEK_LABEL: Record<NordicLocale, string> = { sv: "Veckonummer", no: "Ukenummer", da: "Ugenummer" };

export function nordicTimeMetadata(tool: NordicTimeTool, locale: NordicLocale): Metadata {
  const c = NORDIC_TIME_COPY[tool][locale];
  return {
    title: c.metaTitle,
    description: c.description,
    alternates: { canonical: c.path, ...timeToolAlternates(TOOL_IDS[tool]) },
    openGraph: { title: c.metaTitle, description: c.description, url: buildSiteUrl(c.path), siteName: "BirimCeviri.app", locale: NORDIC_TIME_UI[locale].ogLocale, type: "website" },
  };
}

function toolFor(tool: NordicTimeTool, locale: NordicLocale) {
  switch (tool) {
    case "timer":
      return <CountdownTimer locale={locale} />;
    case "stopwatch":
      return <Stopwatch locale={locale} />;
    case "alarm":
      return <AlarmClock locale={locale} />;
    case "clock":
      return <LiveClock locale={locale} />;
    case "pomodoro":
      return <PomodoroTimer lang={locale} />;
    case "interval":
      return <IntervalTimer lang={locale} />;
  }
}

export default function NordicTimeToolPage({ tool, locale }: { tool: NordicTimeTool; locale: NordicLocale }) {
  const c = NORDIC_TIME_COPY[tool][locale];
  const ui = NORDIC_TIME_UI[locale];
  const related = [
    ...(Object.keys(NORDIC_TIME_PATHS) as NordicTimeTool[])
      .filter((other) => other !== tool)
      .map((other) => ({ href: NORDIC_TIME_PATHS[other][locale], label: NORDIC_TIME_LABELS[other][locale] })),
    { href: NORDIC_WEEK_PATHS[locale], label: WEEK_LABEL[locale] },
  ];

  return (
    <div lang={locale === "no" ? "nb" : locale}>
      <TimeToolPage
        crumbs={[
          { href: ui.homeHref, label: ui.home },
          { href: c.path, label: c.crumb },
        ]}
        crumbLabel={ui.crumbLabel}
        title={c.h1}
        intro={c.intro}
        tool={toolFor(tool, locale)}
        related={{ title: ui.relatedTitle, links: related }}
        tocTitle={ui.tocTitle}
        tocItems={[...c.sections.map((s) => ({ id: s.id, label: s.title })), { id: "faq", label: ui.faqTitle }]}
        faqTitle={ui.faqTitle}
        faqItems={c.faq}
      >
        {c.sections.map((section) => (
          <section key={section.id}>
            <h2 id={section.id}>{section.title}</h2>
            {section.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
        ))}
        {tool === "timer" ? (
          <TimerPresetTable
            id="tider"
            heading={PRESET_COPY[locale].heading}
            intro={PRESET_COPY[locale].intro}
            durationLabel={PRESET_COPY[locale].duration}
            usesLabel={PRESET_COPY[locale].uses}
            rows={NORDIC_TIMER_SECONDS.map((s) => ({ seconds: s, label: nordicTimerLabel(locale, s), uses: NORDIC_TIMER_USES[s][locale] }))}
          />
        ) : null}
      </TimeToolPage>
    </div>
  );
}
