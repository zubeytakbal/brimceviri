import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NumberFactsCalculator from "../../../../components/NumberFactsCalculator";
import {
  getNumberFacts,
  getAllNumberFactsRange,
  MIN_NUMBER,
  MAX_LINKABLE_NUMBER,
} from "../../../../converter/numberFacts";
import { buildFaqSchema, type FaqItem } from "../../../../converter/faqSchema";
import { buildSiteUrl } from "../../../../siteConfig";

type PageProps = {
  params: Promise<{ sayi: string }>;
};

function formatNumber(value: number, maxFractionDigits = 4): string {
  return value.toLocaleString("tr-TR", { maximumFractionDigits: maxFractionDigits });
}

export function generateStaticParams() {
  return getAllNumberFactsRange().map((n) => ({ sayi: String(n) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { sayi } = await params;
  const n = Number(sayi);
  const facts = getNumberFacts(n);

  if (!facts) {
    return { title: "Sayı bulunamadı", robots: { index: false, follow: false } };
  }

  const title = `${n} Sayısının Karesi, Çarpanları (Bölenleri) ve Asal mı?`;
  const description = `${n} sayısının karesi (${formatNumber(facts.square)}), çarpanları/bölenleri, karekökü (${formatNumber(facts.squareRoot)}) ve asal olup olmadığı. ${n} ile ilgili tüm sayı özelliklerini gör.`;

  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: { canonical: `/bilim-hesaplayicilari/matematik/sayilar/${n}` },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/bilim-hesaplayicilari/matematik/sayilar/${n}`),
      siteName: "BirimCeviri.app",
      locale: "tr_TR",
      type: "article",
    },
  };
}

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default async function SayiSayfasi({ params }: PageProps) {
  const { sayi } = await params;
  const n = Number(sayi);
  const facts = getNumberFacts(n);

  if (!facts) {
    notFound();
  }

  const pageUrl = buildSiteUrl(`/bilim-hesaplayicilari/matematik/sayilar/${n}`);

  const faqItems: FaqItem[] = [
    {
      question: `${n} sayısının karesi kaçtır?`,
      answer: `${n}² = ${n} × ${n} = ${formatNumber(facts.square)}.`,
    },
    {
      question: `${n} sayısının karekökü kaçtır?`,
      answer: facts.isPerfectSquare
        ? `√${n} = ${formatNumber(facts.squareRoot)} — ${n}, tam kare bir sayıdır (${formatNumber(facts.squareRoot)}²'ye eşittir).`
        : `√${n} ≈ ${formatNumber(facts.squareRoot)} — ${n} tam kare bir sayı olmadığı için karekökü irrasyonel bir sayıdır (ondalık kısmı sonsuza kadar tekrarsız devam eder).`,
    },
    {
      question: `${n} asal sayı mıdır?`,
      answer: `${facts.primeReason}`,
    },
    {
      question: `${n} sayısının bölenleri (çarpanları) nelerdir?`,
      answer: `${n}'in bölenleri: ${facts.divisors.join(", ")} (toplam ${facts.divisorCount} tane, toplamları ${formatNumber(facts.sumOfDivisors)}).`,
    },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Bilim Hesaplayıcıları", item: buildSiteUrl("/bilim-hesaplayicilari") },
      { "@type": "ListItem", position: 3, name: "Matematik", item: buildSiteUrl("/bilim-hesaplayicilari/matematik") },
      { "@type": "ListItem", position: 4, name: "Sayılar", item: buildSiteUrl("/bilim-hesaplayicilari/matematik/sayilar") },
      { "@type": "ListItem", position: 5, name: String(n), item: pageUrl },
    ],
  };

  const prevNumber = n > MIN_NUMBER ? n - 1 : null;
  const nextNumber = n < MAX_LINKABLE_NUMBER ? n + 1 : null;

  return (
    <main className="all-conversions-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/bilim-hesaplayicilari">Bilim Hesaplayıcıları</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/bilim-hesaplayicilari/matematik">Matematik</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/bilim-hesaplayicilari/matematik/sayilar">Sayılar</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{n}</span>
        </nav>

        <header className="all-conversions-header">
          <h1>{n} Sayısının Karesi, Çarpanları (Bölenleri) ve Asal mı?</h1>
          <p>
            {n} sayısının karesi, küpü, karekökü, asal olup olmadığı,
            tüm çarpanları (bölenleri){facts.factorial && ", faktöriyeli"} ve
            Romen rakamı karşılığı — hepsi tek sayfada.
          </p>
        </header>

        <section className="category-article-content">
          <h2>{n} Sayısının Temel Özellikleri</h2>
          <dl className="unit-facts">
            <div>
              <dt>{n}&apos;in Karesi ({n}²)</dt>
              <dd>{formatNumber(facts.square)}</dd>
            </div>
            <div>
              <dt>{n}&apos;in Küpü ({n}³)</dt>
              <dd>{formatNumber(facts.cube)}</dd>
            </div>
            <div>
              <dt>{n}&apos;in Karekökü (√{n})</dt>
              <dd>
                {facts.isPerfectSquare
                  ? `${formatNumber(facts.squareRoot)} (tam kare)`
                  : `≈ ${formatNumber(facts.squareRoot)}`}
              </dd>
            </div>
            <div>
              <dt>{n}&apos;in Küpkökü (∛{n})</dt>
              <dd>
                {facts.isPerfectCube
                  ? `${formatNumber(facts.cubeRoot)} (tam küp)`
                  : `≈ ${formatNumber(facts.cubeRoot)}`}
              </dd>
            </div>
            <div>
              <dt>Asal Sayı mı?</dt>
              <dd>{facts.isPrime ? "Evet, asal sayıdır" : "Hayır, asal sayı değildir"}</dd>
            </div>
            <div>
              <dt>Çarpanları (Bölenleri)</dt>
              <dd>
                {facts.divisors.map((divisor, index) => (
                  <span key={divisor}>
                    {index > 0 && ", "}
                    <Link href={`/bilim-hesaplayicilari/matematik/sayilar/${divisor}`}>
                      {divisor}
                    </Link>
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt>Bölen Sayısı</dt>
              <dd>{facts.divisorCount}</dd>
            </div>
            {facts.factorial && (
              <div>
                <dt>{n}! (Faktöriyel)</dt>
                <dd>{facts.factorial}</dd>
              </div>
            )}
            <div>
              <dt>Romen Rakamı</dt>
              <dd>{facts.romanNumeral}</dd>
            </div>
          </dl>

          {facts.isPerfectNumber && (
            <p className="calculator-usage-hint">
              <strong>İlginç not:</strong> {n}, kendisi hariç tüm
              bölenlerinin toplamı kendisine eşit olan nadir sayılardan
              biridir — bu tür sayılara &quot;mükemmel sayı&quot; (perfect
              number) denir.
            </p>
          )}
        </section>

        <NumberFactsCalculator initialNumber={n} />

        <section className="category-article-content">
          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>Sayı Gezinme</h2>
          <p>
            {prevNumber && (
              <>
                <Link href={`/bilim-hesaplayicilari/matematik/sayilar/${prevNumber}`}>
                  ← {prevNumber} sayısı
                </Link>
                {" "}·{" "}
              </>
            )}
            <Link href="/bilim-hesaplayicilari/matematik/sayilar">Tüm sayılar</Link>
            {nextNumber && (
              <>
                {" "}·{" "}
                <Link href={`/bilim-hesaplayicilari/matematik/sayilar/${nextNumber}`}>
                  {nextNumber} sayısı →
                </Link>
              </>
            )}
          </p>

          <h2>İlginizi Çekebilir</h2>
          <p>
            Herhangi bir sayının karekökünü hesaplamak için{" "}
            <Link href="/bilim-hesaplayicilari/matematik/karekok-hesaplama">Karekök Hesaplama</Link>,{" "}
            küpkök için{" "}
            <Link href="/bilim-hesaplayicilari/matematik/kupkok-hesaplama">Küpkök Hesaplama</Link>,{" "}
            faktöriyel hesaplamak için{" "}
            <Link href="/bilim-hesaplayicilari/matematik/faktoriyel-hesaplama">Faktöriyel Hesaplama</Link>,{" "}
            bölen sayısı hesaplamak için{" "}
            <Link href="/bilim-hesaplayicilari/matematik/bolen-sayisi-hesaplama">Bölen Sayısı Hesaplama</Link>,{" "}
            EBOB-EKOK hesaplamak için{" "}
            <Link href="/bilim-hesaplayicilari/matematik/ebob-ekok-hesaplama">EBOB-EKOK Hesaplama</Link>,{" "}
            aritmetik/geometrik diziler için{" "}
            <Link href="/bilim-hesaplayicilari/matematik/aritmetik-dizi-hesaplama">Aritmetik Dizi Hesaplama</Link>
            {" "}sayfasına, tüm matematik araçlarını görmek için{" "}
            <Link href="/bilim-hesaplayicilari/matematik">Matematik Hesaplayıcıları</Link>
            {" "}ana sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            Sayı özellikleri (kare, küp, karekök, asallık, bölenler)
            standart matematik tanımlarına dayanan doğrudan aritmetik
            hesaplamalardır.
          </p>
        </section>
      </div>
    </main>
  );
}
