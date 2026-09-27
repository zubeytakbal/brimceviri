import Link from "@/app/components/SiteLink";
import type { Locale } from "../i18n/config";
import { buildFaqSchema, type FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";
import SleepCalculator from "./SleepCalculator";
import TableOfContents from "./TableOfContents";

// Uyku hesaplayici rehberi: tum dillerde ayni yapi (icindekiler, yatis /
// kalkis tablolari, yasa gore uyku, ipuclari, SSS). Icerik dile gore verilir.

export type SleepGuideContent = {
  locale: Locale;
  path: string;
  homeHref: string;
  homeLabel: string;
  breadcrumbLabel: string;
  breadcrumbAria: string;
  h1: string;
  intro: string;
  tocTitle: string;
  toc: { cycle: string; wakeTable: string; bedTable: string; age: string; method: string; fallAsleep: string; tips: string; faq: string };
  cycleParagraphs: string[];
  wakeTableNote: string;
  bedTableNote: string;
  wakeHeader: string;
  bedHeader: string;
  cyclesHeader: (cycles: number, hours: string) => string;
  ageIntro: string;
  ageHeader: [string, string];
  ageGroups: string[];
  hoursUnit: string;
  methodParagraph: string;
  fallAsleepParagraph: string;
  tips: string[];
  faq: FaqItem[];
  sourcesTitle: string;
  sourcesText: string;
  relatedTitle: string;
  related: Array<{ href: string; label: string }>;
  numberLocale: string;
};

const FALL_ASLEEP_MINUTES = 15;
const CYCLE_MINUTES = 90;
const wakeTimes = [330, 360, 390, 420, 450, 480, 510, 540];
const bedTimes = [1290, 1320, 1350, 1380, 1410, 1440, 1470, 1500];
const cycleColumns = [6, 5, 4];
const ageRanges: Array<[number, number]> = [
  [14, 17],
  [12, 15],
  [11, 14],
  [10, 13],
  [9, 11],
  [8, 10],
  [7, 9],
  [7, 8],
];

function clock(totalMinutes: number) {
  const minutes = ((totalMinutes % 1440) + 1440) % 1440;
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function TimeTable({
  content,
  times,
  header,
  direction,
}: {
  content: SleepGuideContent;
  times: number[];
  header: string;
  direction: 1 | -1;
}) {
  const hours = (cycles: number) => (cycles * 1.5).toLocaleString(content.numberLocale);
  return (
    <div className="conversion-table-wrap">
      <table className="conversion-table">
        <thead>
          <tr>
            <th>{header}</th>
            {cycleColumns.map((cycles) => (
              <th key={cycles}>{content.cyclesHeader(cycles, hours(cycles))}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time) => (
            <tr key={time}>
              <td>
                <strong>{clock(time)}</strong>
              </td>
              {cycleColumns.map((cycles) => (
                <td key={cycles}>{clock(time + direction * (FALL_ASLEEP_MINUTES + cycles * CYCLE_MINUTES))}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SleepGuide({ content }: { content: SleepGuideContent }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: content.homeLabel, item: buildSiteUrl(content.homeHref) },
      { "@type": "ListItem", position: 2, name: content.breadcrumbLabel, item: buildSiteUrl(content.path) },
    ],
  };
  const tocItems = [
    { id: "cycle", label: content.toc.cycle },
    { id: "wake-table", label: content.toc.wakeTable },
    { id: "bed-table", label: content.toc.bedTable },
    { id: "age", label: content.toc.age },
    { id: "method", label: content.toc.method },
    { id: "fall-asleep", label: content.toc.fallAsleep },
    { id: "tips", label: content.toc.tips },
    { id: "faq", label: content.toc.faq },
  ];

  return (
    <main className="all-conversions-page" lang={content.locale} dir={content.locale === "ar" ? "rtl" : undefined}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(content.faq)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label={content.breadcrumbAria}>
          <Link href={content.homeHref}>{content.homeLabel}</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{content.breadcrumbLabel}</span>
        </nav>

        <header className="all-conversions-header">
          <h1>{content.h1}</h1>
          <p>{content.intro}</p>
        </header>

        <SleepCalculator locale={content.locale} />

        <TableOfContents title={content.tocTitle} items={tocItems} />

        <section className="category-article-content">
          <h2 id="cycle">{content.toc.cycle}</h2>
          {content.cycleParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <h2 id="wake-table">{content.toc.wakeTable}</h2>
          <p>{content.wakeTableNote}</p>
          <TimeTable content={content} times={wakeTimes} header={content.wakeHeader} direction={-1} />

          <h2 id="bed-table">{content.toc.bedTable}</h2>
          <p>{content.bedTableNote}</p>
          <TimeTable content={content} times={bedTimes} header={content.bedHeader} direction={1} />

          <h2 id="age">{content.toc.age}</h2>
          <p>{content.ageIntro}</p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>{content.ageHeader[0]}</th>
                  <th>{content.ageHeader[1]}</th>
                </tr>
              </thead>
              <tbody>
                {content.ageGroups.map((group, index) => (
                  <tr key={group}>
                    <td>{group}</td>
                    <td>
                      {ageRanges[index][0]}–{ageRanges[index][1]} {content.hoursUnit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 id="method">{content.toc.method}</h2>
          <p>{content.methodParagraph}</p>

          <h2 id="fall-asleep">{content.toc.fallAsleep}</h2>
          <p>{content.fallAsleepParagraph}</p>

          <h2 id="tips">{content.toc.tips}</h2>
          <ul>
            {content.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>

          <h2 id="faq">{content.toc.faq}</h2>
          {content.faq.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>{content.sourcesTitle}</h2>
          <p>{content.sourcesText}</p>

          <h2>{content.relatedTitle}</h2>
          <ul className="related-conversion-list">
            {content.related.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
