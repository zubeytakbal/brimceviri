import type { Metadata } from "next";
import { buildSiteUrl } from "../siteConfig";
import { CYCLE_CONTENT, CYCLE_PATHS, CYCLE_TABLE, cycleAlternates } from "../i18n/cycleCalculatorContent";
import CycleCalculator, { type CycleLang } from "./CycleCalculator";
import TimeToolPage from "./time/TimeToolPage";

export function cycleMetadata(lang: CycleLang): Metadata {
  const c = CYCLE_CONTENT[lang];
  const path = CYCLE_PATHS[lang];
  return {
    title: c.seoTitle,
    description: c.description,
    alternates: { canonical: path, languages: cycleAlternates() },
    openGraph: { title: c.seoTitle, description: c.description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: c.locale, type: "website" },
  };
}

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

export default function CyclePage({ lang }: { lang: CycleLang }) {
  const c = CYCLE_CONTENT[lang];
  const n = (x: number) => (lang === "bn" ? String(x).replace(/\d/g, (d) => BN_DIGITS[Number(d)]) : String(x));
  const today = new Date();
  const initialDate = `${today.getUTCFullYear()}-${String(today.getUTCMonth() + 1).padStart(2, "0")}-${String(today.getUTCDate()).padStart(2, "0")}`;
  return (
    <TimeToolPage
      crumbs={[c.home, { href: CYCLE_PATHS[lang], label: c.crumb }]}
      crumbLabel={c.home.label}
      title={c.title}
      intro={c.intro}
      tool={<CycleCalculator lang={lang} initialDate={initialDate} />}
      related={{ title: c.relatedTitle, links: c.related }}
      tocTitle={c.tocTitle}
      tocItems={[
        { id: "how", label: c.howTitle },
        { id: "table", label: c.tableTitle },
        { id: "faq", label: c.faqTitle },
      ]}
      faqTitle={c.faqTitle}
      faqItems={c.faq}
    >
      <h2 id="how">{c.howTitle}</h2>
      {c.how.map((p) => (
        <p key={p}>{p}</p>
      ))}
      <h2 id="table">{c.tableTitle}</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              {c.tableHead.map((h) => (
                <th key={h} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CYCLE_TABLE.map((len) => {
              const ov = len - 14;
              return (
                <tr key={len}>
                  <th scope="row">{n(len)}</th>
                  <td>{c.dayWord(n(ov))}</td>
                  <td>
                    {c.dayWord(n(ov - 5))} – {c.dayWord(n(ov + 1))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </TimeToolPage>
  );
}
