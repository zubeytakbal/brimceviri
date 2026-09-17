import type { Metadata } from "next";
import Link from "next/link";
import { getAllNumberFactsRange } from "../../converter/numberFacts";
import { buildFullLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/sonlar";

export const metadata: Metadata = {
  title: "Son Xossalari: Kvadrat, Bo'luvchilar, Tub Sonmi (1-100)",
  description:
    "1 dan 100 gacha har bir sonning kvadratini, bo'luvchilarini, kvadrat ildizini, tub son ekanligini va boshqa ko'p narsani ko'ring — istagan sonni yozib darhol hisoblang.",
  alternates: {
    canonical: pagePath,
    ...buildFullLanguageAlternates(pagePath),
  },
  openGraph: {
    title: "Son Xossalari: Kvadrat, Bo'luvchilar, Tub Sonmi (1-100)",
    description: "Har bir sonning kvadrat, kvadrat ildiz, tub son va bo'luvchi ma'lumotlarini ko'ring.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

export default function UzbekSonlarHubPage() {
  const numbers = getAllNumberFactsRange();

  return (
    <main className="all-conversions-page" lang="uz">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sahifa yo'li">
          <Link href="/uz">Bosh sahifa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Sonlar</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Son Xossalari (1-100)</h1>
          <p>
            1 dan 100 gacha har bir sonning kvadratini, kubini, kvadrat
            ildizini, tub son ekanligini, bo&apos;luvchilarini,
            faktorialini va Rim raqami ko&apos;rinishini ko&apos;ring.
            Har bir sahifada, istalgan boshqa sonni ham darhol
            hisoblashingiz mumkin bo&apos;lgan jonli hisoblagich mavjud.
          </p>
        </header>

        <section className="category-article-content">
          <ul className="tool-list number-grid-list">
            {numbers.map((n) => (
              <li className="tool-list-item" key={n}>
                <Link className="tool-list-link" href={`/uz/sonlar/${n}`}>
                  <span className="tool-list-title">{n}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
