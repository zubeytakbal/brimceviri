import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { CHRISTIAN_TOOLS_PATH, englishChristianTools } from "../../i18n/englishChristianTools";
import { buildSiteUrl } from "../../siteConfig";

const title = "Christian Tools: Easter Date, Lent, Bible Reading Plan, Rosary";
const description = "Free Christian calculators: Easter dates for any year, Lent day counter, Bible reading plans with catch-up, novena start dates, Rosary mysteries of the day and a tithe calculator.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: CHRISTIAN_TOOLS_PATH },
  openGraph: { title, description, url: buildSiteUrl(CHRISTIAN_TOOLS_PATH), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
};

export default function ChristianToolsPage() {
  return (
    <main className="other-categories-page">
      <div className="directory-shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/en">Home</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Christian Tools</span>
        </nav>
        <header className="other-categories-header">
          <h1>Christian Tools</h1>
          <p>
            Calculators for the church year, prayer, Bible reading and giving. Every result comes from a fixed rule: the Easter computus used
            by Western and Orthodox churches, the traditional count of the 40 days of Lent, the General Roman Calendar, and the chapter and verse
            numbering of the King James Version.
          </p>
        </header>
        <ul className="tool-hub-list dini-hub-list">
          {englishChristianTools.map((tool) => (
            <li key={tool.href}>
              <Link href={tool.href}>
                <span>{tool.title}</span>
                <small>{tool.description}</small>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
