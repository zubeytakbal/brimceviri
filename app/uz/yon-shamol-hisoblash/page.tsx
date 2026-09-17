import type { Metadata } from "next";
import Link from "next/link";
import CrosswindCalculatorUz from "../../components/calculators/CrosswindCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/yon-shamol-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Yon shamol komponenti qanday hisoblanadi?",
    answer:
      "Yon Shamol Komponenti = Shamol Tezligi × sin(Shamol Yo'nalishi − Piste Yo'nalishi) formulasi bilan hisoblanadi. Xuddi shu burchak farqining kosinusi olinib bosh/quyruq shamol komponenti ham topiladi: Bosh/Quyruq Shamoli = Shamol Tezligi × cos(Shamol Yo'nalishi − Piste Yo'nalishi).",
  },
  {
    question: "Piste yo'nalishini qanday topaman?",
    answer:
      "Piste raqami, piste yo'nalishining (magnit daraja) 10 ga bo'linib yaxlitlanishi bilan olinadi — masalan Piste 24, taxminan 240° magnit yo'nalishga mos keladi. Teskari yo'nalishda uchishda (Piste 06) bu 60° bo'ladi.",
  },
  {
    question: "Yon shamol chegarasini qayerdan bilaman?",
    answer:
      "Har bir samolyot turining ishlab chiqaruvchi tomonidan belgilangan, odatda namoyish etilgan maksimal yon shamol komponenti qiymati (demonstrated crosswind component) bor. Bu qiymat samolyotning samaradorlik qo'llanmasida (POH/AFM) joylashgan; hisoblangan yon shamol bu chegaradan oshsa, qo'nish/ko'tarilish qarori shunga qarab baholanishi kerak.",
  },
];

export const metadata: Metadata = {
  title: "Yon Shamol Komponenti Hisoblash (Crosswind Component)",
  description:
    "Shamol yo'nalishi, shamol tezligi va piste yo'nalishidan, standart navigatsiya formulasi bilan yon shamol va bosh/quyruq shamol komponentini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/yan-ruzgar-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/yan-ruzgar-hesaplama",
    },
  },
  openGraph: {
    title: "Yon Shamol Komponenti Hisoblash (Crosswind Component)",
    description:
      "Shamol yo'nalishi, tezligi va piste yo'nalishidan yon shamol komponentini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekCrosswindCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Yon Shamol Komponenti Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Yon Shamol Komponenti Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Yon Shamol Komponenti Hisoblash</h1>
          <p>
            Shamol yo&apos;nalishini, tezligini va piste
            yo&apos;nalishini (uchish boshi) kiriting: standart
            trigonometrik navigatsiya formulasi bilan yon shamol va
            bosh/quyruq shamol komponentini darhol hisoblang.
          </p>
        </header>

        <CrosswindCalculatorUz />

        <section className="category-article-content">
          <h2>Yon shamol komponenti qanday hisoblanadi?</h2>
          <p>
            Shamol yo&apos;nalishi bilan piste yo&apos;nalishi
            orasidagi burchak farqi topiladi, bu burchakning sinusi
            shamol tezligiga ko&apos;paytirilib yon shamol komponenti
            olinadi:{" "}
            <strong>
              Yon Shamol = Shamol Tezligi × sin(Shamol Yo&apos;nalishi
              − Piste Yo&apos;nalishi)
            </strong>
            . Xuddi shu burchakning kosinusi olinib bosh/quyruq
            shamol komponenti topiladi:{" "}
            <strong>
              Bosh/Quyruq Shamoli = Shamol Tezligi × cos(Shamol
              Yo&apos;nalishi − Piste Yo&apos;nalishi)
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
            <Link href="/uz/pasayish-tezligi-hisoblash">Pasayish Tezligi Hisoblash</Link>,{" "}
            <Link href="/uz/ogirlik-muvozanat-hisoblash">Og&apos;irlik va Muvozanat Hisoblash</Link>,{" "}
            <Link href="/uz/zichlik-balandligi-hisoblash">Zichlik Balandligi Hisoblash</Link>{" "}
            sahifalariga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Yon shamol komponenti formulasi uchish ta&apos;limida
            standart ishlatiladigan asosiy trigonometrik navigatsiya
            hisobiga asoslangan. Bu vosita umumiy ma&apos;lumot va
            dastlabki tayyorgarlik maqsadida; haqiqiy uchish qarori
            uchun samolyotning samaradorlik qo&apos;llanmasi va rasmiy
            ob-havo/METAR ma&apos;lumotlari asos qilib olinishi kerak.
          </p>
        </section>
      </div>
    </main>
  );
}
