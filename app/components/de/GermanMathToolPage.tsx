import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import TimeToolPage from "../time/TimeToolPage";
import { findGermanMathPage, germanMathAlternates, germanMathLinks, type GermanMathKey } from "../../i18n/germanMathPages";
import { seoTitle } from "../../seoTitle";
import { buildSiteUrl } from "../../siteConfig";

export function germanMathMetadata(key: GermanMathKey): Metadata {
  const page = findGermanMathPage(key);
  const alternates = germanMathAlternates(page);
  return {
    title: seoTitle(page.metaTitle, page.title),
    description: page.description,
    alternates: { canonical: page.path, ...(alternates ?? {}) },
    openGraph: { title: page.metaTitle, description: page.description, url: buildSiteUrl(page.path), siteName: "BirimCeviri.app", locale: "de_DE", type: "website" },
  };
}

export default function GermanMathToolPage({ pageKey, tool }: { pageKey: GermanMathKey; tool: React.ReactNode }) {
  const page = findGermanMathPage(pageKey);
  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: "/de/mathe-rechner", label: "Mathe-Rechner" },
          { href: page.path, label: page.shortTitle },
        ]}
        crumbLabel="Brotkrumen"
        title={page.title}
        intro={page.intro}
        tool={tool}
        related={{ title: "Weitere Mathe-Rechner", links: germanMathLinks.filter((l) => l.href !== page.path) }}
        tocTitle="Inhalt"
        tocItems={[...page.sections.map((s) => ({ id: s.id, label: s.title })), { id: "faq", label: "Häufige Fragen" }]}
        faqTitle="Häufige Fragen"
        faqItems={page.faq}
      >
        {page.sections.map((s) => (
          <section key={s.id}>
            <h2 id={s.id}>{s.title}</h2>
            {s.paragraphs?.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {s.list && (
              <ul>
                {s.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {s.table && (
              <div className="conversion-table-wrap">
                <table className="conversion-table">
                  <thead>
                    <tr>
                      {s.table.head.map((h) => (
                        <th key={h} scope="col">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {s.table.rows.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}
        <p>
          Alle Rechner im Überblick finden Sie unter <Link href="/de/mathe-rechner">Mathe-Rechner</Link>.
        </p>
      </TimeToolPage>
    </div>
  );
}
