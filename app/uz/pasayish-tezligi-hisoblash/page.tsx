import type { Metadata } from "next";
import Link from "next/link";
import DescentRateCalculatorUz from "../../components/calculators/DescentRateCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/pasayish-tezligi-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Pasayish tezligi (rate of descent) qanday hisoblanadi?",
    answer:
      "Avval pasayish gradienti topiladi: Gradient (ft/nm) = tan(Pasayish Burchagi) × 6076,12 (1 dengiz mili = 6076,12 ft). Keyin yer tezligiga ko'paytirilib 60 ga bo'linadi va daqiqadagi pasayish tezligi topiladi: Pasayish Tezligi (ft/daq) = Yer Tezligi (uzel) × Gradient (ft/nm) / 60.",
  },
  {
    question: "'Yer tezligi ko'paytirilgan 5' qoidasi nima?",
    answer:
      "Standart 3° yaqinlashish burchagi uchun keng qo'llaniladigan qisqa yo'l: Pasayish Tezligi (ft/daq) ≈ Yer Tezligi (uzel) × 5. Bu, to'liq trigonometrik hisobning 3° uchun taxminiy mosligidir; bu vosita istalgan burchak uchun to'liq natijani beradi.",
  },
];

export const metadata: Metadata = {
  title: "Pasayish Tezligi Hisoblash (Rate of Descent)",
  description:
    "Yer tezligi va pasayish burchagidan, daqiqadagi fut hisobida kerakli pasayish tezligini (rate of descent) hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/inis-orani-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/inis-orani-hesaplama",
    },
  },
  openGraph: {
    title: "Pasayish Tezligi Hisoblash (Rate of Descent)",
    description: "Yer tezligi va pasayish burchagidan pasayish tezligini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekDescentRateCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Pasayish Tezligi Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Pasayish Tezligi Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Pasayish Tezligi Hisoblash</h1>
          <p>
            Yer tezligini va pasayish burchagini kiriting: daqiqadagi
            fut hisobida kerakli pasayish tezligini (rate of descent)
            darhol hisoblang.
          </p>
        </header>

        <DescentRateCalculatorUz />

        <section className="category-article-content">
          <h2>Pasayish tezligi qanday hisoblanadi?</h2>
          <p>
            Avval pasayish gradienti topiladi:{" "}
            <strong>
              Gradient (ft/nm) = tan(Pasayish Burchagi) × 6076,12
            </strong>{" "}
            (1 dengiz mili = 6076,12 ft). Keyin yer tezligiga
            ko&apos;paytirilib 60 ga bo&apos;linadi va daqiqadagi
            pasayish tezligi topiladi:{" "}
            <strong>
              Pasayish Tezligi (ft/daq) = Yer Tezligi (uzel) ×
              Gradient (ft/nm) / 60
            </strong>
            .
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
            <Link href="/uz/yon-shamol-hisoblash">Yon Shamol Hisoblash</Link>,{" "}
            <Link href="/uz/ogirlik-muvozanat-hisoblash">Og&apos;irlik va Muvozanat Hisoblash</Link>,{" "}
            <Link href="/uz/zichlik-balandligi-hisoblash">Zichlik Balandligi Hisoblash</Link>{" "}
            sahifalariga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Formula uchish ta&apos;limida standart ishlatiladigan
            asosiy trigonometrik yaqinlashish/pasayish hisobiga
            asoslangan. Bu vosita umumiy ma&apos;lumot va dastlabki
            tayyorgarlik maqsadida; haqiqiy yaqinlashish protsedurasi
            uchun rasmiy nashrlar (yaqinlashish plastinkalari) asos
            qilib olinishi kerak.
          </p>
        </section>
      </div>
    </main>
  );
}
