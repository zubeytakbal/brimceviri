// İsveççe, Norveççe ve Danca zaman aracı sayfası (timer, stoppur, alarm, saat).
// Araç bileşenleri TR/EN/DE sayfalarıyla aynı; metinler nordicTimeCopy.ts içinde.
import type { Metadata } from "next";
import type { NordicLocale } from "../../converter/time/nordicWeek";
import { NORDIC_WEEK_PATHS } from "../../converter/time/nordicWeek";
import { nordicTimerPresetLinks } from "../../i18n/nordicTimerPresets";
import { timeToolAlternates, type TimeToolId } from "../../i18n/timeToolPaths";
import { buildSiteUrl } from "../../siteConfig";
import AlarmClock from "./AlarmClock";
import CountdownTimer from "./CountdownTimer";
import LiveClock from "./LiveClock";
import { NORDIC_TIME_COPY, NORDIC_TIME_LABELS, NORDIC_TIME_PATHS, NORDIC_TIME_UI, type NordicTimeTool } from "./nordicTimeCopy";
import Stopwatch from "./Stopwatch";
import TimeToolPage from "./TimeToolPage";

const TOOL_IDS: Record<NordicTimeTool, TimeToolId> = { timer: "timer", stopwatch: "stopwatch", alarm: "alarm", clock: "clock" };

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
      return <CountdownTimer locale={locale} presetLinks={nordicTimerPresetLinks(locale)} />;
    case "stopwatch":
      return <Stopwatch locale={locale} />;
    case "alarm":
      return <AlarmClock locale={locale} />;
    case "clock":
      return <LiveClock locale={locale} />;
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
      </TimeToolPage>
    </div>
  );
}
