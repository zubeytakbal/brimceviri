import type { Metadata } from "next";
import Link from "next/link";
import UnixTimestampCalculatorUz from "../../components/calculators/UnixTimestampCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/unix-vaqt-tamgasi-aylantirgich";

const faqItems: FaqItem[] = [
  {
    question: "Unix vaqt tamg'asi (timestamp) nima?",
    answer:
      "Unix vaqt tamg'asi, 1-yanvar 1970 00:00:00 UTC (Unix epoch) mos yozuv nuqtasidan boshlab o'tgan soniya (yoki millisoniya) sonidir. Kompyuterlar sanalarni odatda shu yagona son bilan saqlaydi.",
  },
  {
    question: "Soniya va millisoniya asosidagi vaqt tamg'asi orasidagi farq nima?",
    answer:
      "Soniya asosidagi vaqt tamg'asi (Unix time) 10 xonali sondir; JavaScript kabi ba'zi tillar esa millisoniya asosidagi (13 xonali) vaqt tamg'asidan foydalanadi. Bu vosita ikkala birlikni ham qo'llab-quvvatlaydi.",
  },
  {
    question: "Sanadan vaqt tamg'asiga aylantirishda qaysi vaqt zonasi ishlatiladi?",
    answer:
      "Sana/vaqt kiritilishi Toshkent vaqti (UTC+5) sifatida qabul qilinadi; O'zbekiston yoz vaqtiga o'tmaganligi uchun bu ofset doimiydir.",
  },
];

export const metadata: Metadata = {
  title: "Unix Vaqt Tamg'asi Aylantirgich (Epoch Converter)",
  description:
    "Unix vaqt tamg'asini (epoch) sanaga, sanani ham Toshkent vaqtiga qarab vaqt tamg'asiga aylantiring; soniya va millisoniya birliklarini qo'llab-quvvatlaydi.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/unix-zaman-damgasi-cevirici",
      "uz-UZ": pagePath,
      "x-default": "/unix-zaman-damgasi-cevirici",
    },
  },
  openGraph: {
    title: "Unix Vaqt Tamg'asi Aylantirgich (Epoch Converter)",
    description: "Unix vaqt tamg'asini sanaga, sanani vaqt tamg'asiga darhol aylantiring.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekUnixTimestampCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Unix Vaqt Tamg'asi Aylantirgich", item: buildSiteUrl(pagePath) },
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
          <span>Unix Vaqt Tamg&apos;asi Aylantirgich</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Unix Vaqt Tamg&apos;asi Aylantirgich</h1>
          <p>
            Unix vaqt tamg&apos;asini (epoch) sanaga, sana va vaqtni
            ham vaqt tamg&apos;asiga aylantiring. &quot;Hozirgi Vaqt
            Tamg&apos;asi&quot; tugmasi bilan joriy lahzani bir
            bosishda olishingiz mumkin.
          </p>
        </header>

        <UnixTimestampCalculatorUz />

        <section className="category-article-content">
          <h2>Unix vaqt tamg&apos;asi nima?</h2>
          <p>
            Unix vaqt tamg&apos;asi (epoch time), 1-yanvar 1970
            00:00:00 UTC mos yozuv nuqtasidan boshlab o&apos;tgan
            soniyalar sonidir. Serverlar, ma&apos;lumotlar bazalari
            va API&apos;lar sana/vaqt ma&apos;lumotini odatda shu
            yagona son bilan tashiydi, chunki u vaqt zonasi va
            formatga bog&apos;liq bo&apos;lmaydi.
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
            Ikkilik/o&apos;n oltilik son tizimlari uchun{" "}
            <Link href="/uz/son-tizimi-cevirgich">Son Tizimi Aylantirgich</Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>
        </section>
      </div>
    </main>
  );
}
