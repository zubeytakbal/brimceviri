import type { Metadata } from "next";
import Link from "next/link";
import TransitTimeCalculatorUz from "../../components/calculators/TransitTimeCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/seyr-vaqti-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Uzel bilan dengiz mili orasidagi bog'liqlik nima?",
    answer:
      "Uzel, ta'rifiga ko'ra soatiga bosib o'tilgan dengiz mili sonidir (1 uzel = 1 dengiz mili/soat). Shuning uchun masofa dengiz milida, tezlik uzelda kiritilganda vaqt hisobi to'g'ridan-to'g'ri va aniq bo'ladi: Vaqt (soat) = Masofa (nm) / Tezlik (uzel).",
  },
  {
    question: "1 dengiz mili necha km?",
    answer:
      "1 dengiz mili aniq 1852 metr, ya'ni 1,852 km ga teng. Bu qiymat, Yerning kenglik doirasi bo'yicha 1 daqiqalik yoy uzunligiga asoslangan va xalqaro miqyosda standartlashtirilgan.",
  },
];

export const metadata: Metadata = {
  title: "Seyr Vaqti Hisoblash: Masofa va Tezlikdan Vaqt Topish",
  description:
    "Masofa (dengiz mili, km yoki mil) va tezlikni (uzel, km/soat yoki mph) kiriting; klassik navigatsiya formulasi bilan seyr vaqtini soat va daqiqa hisobida hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/seyir-suresi-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/seyir-suresi-hesaplama",
    },
  },
  openGraph: {
    title: "Seyr Vaqti Hisoblash: Masofa va Tezlikdan Vaqt Topish",
    description:
      "Masofa va tezlikdan, klassik navigatsiya formulasi bilan seyr vaqtini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekTransitTimeCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Seyr Vaqti Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Seyr Vaqti Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Seyr Vaqti Hisoblash</h1>
          <p>
            Masofani (dengiz mili, km yoki mil) va tezlikni (uzel,
            km/soat yoki mph) kiriting: klassik navigatsiya formulasi
            bilan seyr vaqtini soat va daqiqa hisobida darhol
            hisoblang.
          </p>
        </header>

        <TransitTimeCalculatorUz />

        <section className="category-article-content">
          <h2>Seyr vaqti qanday hisoblanadi?</h2>
          <p>
            Asosiy navigatsiya formulasi oddiy: <strong>Vaqt =
            Masofa / Tezlik</strong>. Dengiz mili va uzel bir-biriga
            to&apos;g&apos;ridan-to&apos;g&apos;ri mos keladi, chunki{" "}
            <strong>1 uzel = 1 dengiz mili/soat</strong> deb
            ta&apos;riflangan — shuning uchun uchuvchilar va kema
            kapitanlari odatda masofani dengiz milida, tezlikni
            uzelda ishlatib vaqtni to&apos;g&apos;ridan-to&apos;g&apos;ri
            hisoblaydi.
          </p>

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
            Uchish rejalashtirish uchun{" "}
            <Link href="/uz/pasayish-tezligi-hisoblash">Pasayish Tezligi Hisoblash</Link>,{" "}
            <Link href="/uz/yon-shamol-hisoblash">Yon Shamol Hisoblash</Link>{" "}
            sahifalariga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Dengiz mili ta&apos;rifi va uzel bog&apos;liqligi, xalqaro
            dengizchilik va aviatsiya standartlariga asoslangan
            barqaror, o&apos;zgarmas fizik ta&apos;riflardir.
          </p>
        </section>
      </div>
    </main>
  );
}
