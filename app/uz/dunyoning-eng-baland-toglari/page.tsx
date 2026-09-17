import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { getAllMountainsUz } from "../../converter/mountainsDatabaseUz";
import { buildFullLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/dunyoning-eng-baland-toglari";

const faqItems: FaqItem[] = [
  {
    question: "Dunyoning eng baland tog'lari haqidagi ma'lumot qayerdan olingan?",
    answer:
      "Balandlik, nisbiy balandlik (prominence) va birinchi chiqish sanalari Wikipedia/Wikidata manbali, o'zaro tekshirilgan qiymatlardir.",
  },
  {
    question: "Nega faqat 8 000 metrdan baland cho'qqilar bor?",
    answer:
      "Dunyodagi barcha 8 000 metrdan baland cho'qqilar ('eight-thousanders') tabiiy, keng tan olingan bir to'plamni tashkil qiladi — hammasi Himolay va Qorako'rum tog' tizimlarida joylashgan.",
  },
];

export const metadata: Metadata = {
  title: "Dunyoning Eng Baland Tog'lari: 8 000 Metrdan Baland Cho'qqilar",
  description:
    "Everest, K2 va dunyodagi barcha 8 000 metrdan baland 14 cho'qqining balandligini, nisbiy balandligini, birinchi chiqish sanasini va cho'qqidagi havo bosimining dengiz sathiga nisbatan foizini solishtiring.",
  alternates: {
    canonical: pagePath,
    ...buildFullLanguageAlternates(pagePath),
  },
  openGraph: {
    title: "Dunyoning Eng Baland Tog'lari",
    description: "8 000 metrdan baland 14 cho'qqining balandligini va birinchi chiqish sanasini solishtiring.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekMountainsHubPage() {
  const mountains = getAllMountainsUz().slice().sort((a, b) => b.elevationM - a.elevationM);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Dunyoning Eng Baland Tog'lari", item: buildSiteUrl(pagePath) },
    ],
  };

  return (
    <main className="all-conversions-page" lang="uz">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sahifa yo'li">
          <Link href="/uz">Bosh sahifa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Dunyoning Eng Baland Tog&apos;lari</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Dunyoning Eng Baland Tog&apos;lari va Balandlik Ta&apos;siri</h1>
          <p>
            Dunyodagi {mountains.length} ta 8 000 metrdan baland
            cho&apos;qqining dengiz sathidan balandligini, o&apos;sha
            balandlikdagi havo bosimini va suvning necha darajada
            qaynashini ko&apos;ring.
          </p>
        </header>

        <section className="category-article-content">
          <h2>Cho&apos;qqilar (balandlik bo&apos;yicha tartiblangan)</h2>
          <ul className="related-conversion-list">
            {mountains.map((mountain) => (
              <li key={mountain.id}>
                <Link href={`/uz/dunyoning-eng-baland-toglari/${mountain.id}`}>
                  {mountain.nameUz}
                </Link>{" "}
                — {mountain.elevationM.toLocaleString("uz-UZ")} m
              </li>
            ))}
          </ul>

          <h2>Tez-tez So&apos;raladigan Savollar</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>Tegishli vositalar</h2>
          <p>
            O&apos;zbekiston viloyatlarining balandligi bilan
            solishtirish uchun{" "}
            <Link href="/uz/viloyatlar-balandligi">Viloyatlar Balandligi</Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>
        </section>
      </div>
    </main>
  );
}
