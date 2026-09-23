import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NumberFactsCalculator from "../../../components/NumberFactsCalculator";
import {
  getNumberFacts,
  getAllNumberFactsRange,
  isGeneratedNumberPage,
  MIN_NUMBER,
  MAX_LINKABLE_NUMBER,
} from "../../../converter/numberFacts";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildFullLanguageAlternates } from "../../../i18n/routing";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{ son: string }>;
};

function formatNumber(value: number, maxFractionDigits = 4): string {
  return value.toLocaleString("uz-UZ", { maximumFractionDigits: maxFractionDigits });
}

export function generateStaticParams() {
  return getAllNumberFactsRange().map((n) => ({ son: String(n) }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { son } = await params;
  const n = Number(son);
  const facts = getNumberFacts(n, "uz");

  if (!facts) {
    return { title: "Son topilmadi", robots: { index: false, follow: false } };
  }

  const pagePath = `/uz/sonlar/${n}`;
  const title = `${n} Sonining Kvadrati, Bo'luvchilari va Tub Sonmi?`;
  const description = `${n} sonining kvadrati (${formatNumber(facts.square)}), bo'luvchilari, kvadrat ildizi (${formatNumber(facts.squareRoot)}) va tub son ekanligi. ${n} bilan bog'liq barcha son xossalarini ko'ring.`;

  return {
    title,
    description,
    alternates: {
      canonical: pagePath,
      ...buildFullLanguageAlternates(pagePath),
    },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(pagePath),
      siteName: "BirimCeviri.app",
      locale: "uz_UZ",
      type: "article",
    },
  };
}

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default async function UzbekSonSayfasi({ params }: PageProps) {
  const { son } = await params;
  const n = Number(son);
  const facts = getNumberFacts(n, "uz");

  if (!facts) {
    notFound();
  }

  const pageUrl = buildSiteUrl(`/uz/sonlar/${n}`);

  const faqItems: FaqItem[] = [
    {
      question: `${n} sonining kvadrati nechaga teng?`,
      answer: `${n}² = ${n} × ${n} = ${formatNumber(facts.square)}.`,
    },
    {
      question: `${n} sonining kvadrat ildizi nechaga teng?`,
      answer: facts.isPerfectSquare
        ? `√${n} = ${formatNumber(facts.squareRoot)} — ${n} to'liq kvadrat sondir (${formatNumber(facts.squareRoot)} ning kvadratiga teng).`
        : `√${n} ≈ ${formatNumber(facts.squareRoot)} — ${n} to'liq kvadrat son bo'lmagani uchun kvadrat ildizi irratsional sondir (o'nlik qismi cheksiz va takrorlanmasdan davom etadi).`,
    },
    {
      question: `${n} tub sonmi?`,
      answer: `${facts.primeReason}`,
    },
    {
      question: `${n} sonining bo'luvchilari nimalar?`,
      answer: `${n} ning bo'luvchilari: ${facts.divisors.join(", ")} (jami ${facts.divisorCount} ta, yig'indisi ${formatNumber(facts.sumOfDivisors)}).`,
    },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Sonlar", item: buildSiteUrl("/uz/sonlar") },
      { "@type": "ListItem", position: 3, name: String(n), item: pageUrl },
    ],
  };

  const prevNumber = n > MIN_NUMBER && n <= MAX_LINKABLE_NUMBER ? n - 1 : null;
  const nextNumber = n >= MIN_NUMBER && n < MAX_LINKABLE_NUMBER ? n + 1 : null;

  return (
    <main className="all-conversions-page" lang="uz">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sahifa yo'li">
          <Link href="/uz">Bosh sahifa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/uz/sonlar">Sonlar</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{n}</span>
        </nav>

        <header className="all-conversions-header">
          <h1>{n} Sonining Kvadrati, Bo&apos;luvchilari va Tub Sonmi?</h1>
          <p>
            {n} sonining kvadrati, kubi, kvadrat ildizi, tub son
            ekanligi, barcha bo&apos;luvchilari{facts.factorial && ", faktoriali"} va
            Rim raqami ko&apos;rinishi — barchasi bitta sahifada.
          </p>
        </header>

        <section className="category-article-content">
          <h2>{n} Sonining Asosiy Xossalari</h2>
          <dl className="unit-facts">
            <div>
              <dt>{n} ning Kvadrati ({n}²)</dt>
              <dd>{formatNumber(facts.square)}</dd>
            </div>
            <div>
              <dt>{n} ning Kubi ({n}³)</dt>
              <dd>{formatNumber(facts.cube)}</dd>
            </div>
            <div>
              <dt>{n} ning Kvadrat Ildizi (√{n})</dt>
              <dd>
                {facts.isPerfectSquare
                  ? `${formatNumber(facts.squareRoot)} (to'liq kvadrat)`
                  : `≈ ${formatNumber(facts.squareRoot)}`}
              </dd>
            </div>
            <div>
              <dt>{n} ning Kub Ildizi (∛{n})</dt>
              <dd>
                {facts.isPerfectCube
                  ? `${formatNumber(facts.cubeRoot)} (to'liq kub)`
                  : `≈ ${formatNumber(facts.cubeRoot)}`}
              </dd>
            </div>
            <div>
              <dt>Tub Sonmi?</dt>
              <dd>{facts.isPrime ? "Ha, tub sondir" : "Yo'q, tub son emas"}</dd>
            </div>
            <div>
              <dt>Bo&apos;luvchilari</dt>
              <dd>
                {facts.divisors.map((divisor, index) => (
                  <span key={divisor}>
                    {index > 0 && ", "}
                    {isGeneratedNumberPage(divisor) ? (
                      <Link href={`/uz/sonlar/${divisor}`}>{divisor}</Link>
                    ) : (
                      divisor
                    )}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt>Bo&apos;luvchilar Soni</dt>
              <dd>{facts.divisorCount}</dd>
            </div>
            {facts.factorial && (
              <div>
                <dt>{n}! (Faktorial)</dt>
                <dd>{facts.factorial}</dd>
              </div>
            )}
            <div>
              <dt>Rim Raqami</dt>
              <dd>{facts.romanNumeral}</dd>
            </div>
          </dl>

          {facts.isPerfectNumber && (
            <p className="calculator-usage-hint">
              <strong>Qiziqarli fakt:</strong> {n} — o&apos;zidan
              boshqa barcha bo&apos;luvchilarining yig&apos;indisi
              o&apos;ziga teng bo&apos;lgan kam uchraydigan sonlardan
              biri; bunday sonlar &quot;mukammal son&quot; (perfect
              number) deb ataladi.
            </p>
          )}
        </section>

        <NumberFactsCalculator initialNumber={n} locale="uz" />

        <section className="category-article-content">
          <h2>Tez-tez So&apos;raladigan Savollar</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>Son Bo&apos;ylab Yurish</h2>
          <p>
            {prevNumber && (
              <>
                <Link href={`/uz/sonlar/${prevNumber}`}>← {prevNumber} soni</Link>
                {" "}·{" "}
              </>
            )}
            <Link href="/uz/sonlar">Barcha sonlar</Link>
            {nextNumber && (
              <>
                {" "}·{" "}
                <Link href={`/uz/sonlar/${nextNumber}`}>{nextNumber} soni →</Link>
              </>
            )}
          </p>

          <h2>Manbalar</h2>
          <p>
            Son xossalari (kvadrat, kub, kvadrat ildiz, tub sonlik,
            bo&apos;luvchilar) standart matematik ta&apos;riflarga
            asoslangan bevosita arifmetik hisoblardir.
          </p>
        </section>
      </div>
    </main>
  );
}
