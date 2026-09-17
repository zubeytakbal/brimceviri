import type { Metadata } from "next";
import Link from "next/link";
import ThermalExpansionCalculatorUz from "../../components/calculators/ThermalExpansionCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/issiqlik-kengayishi-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Issiqlik kengayishi (termal kengayish) qanday hisoblanadi?",
    answer:
      "ΔL = L₀ × α × ΔT formulasi bilan hisoblanadi. L₀ boshlang'ich uzunlik, α materialning issiqlik kengayish koeffitsienti (×10⁻⁶/K), ΔT esa harorat farqi (°C).",
  },
  {
    question: "Qaysi material eng ko'p issiqlik kengayishi ko'rsatadi?",
    answer:
      "Bu jadvaldagi materiallar orasida qo'rg'oshin (29×10⁻⁶/K) eng yuqori kengayish koeffitsientiga, shisha (8,5×10⁻⁶/K) esa eng past koeffitsientga ega.",
  },
  {
    question: "Quvur va relslarda nima uchun kengayish joyi qoldiriladi?",
    answer:
      "Uzun metall quvur yoki relslar mavsumiy harorat farqida bir necha millimetrdan bir necha santimetrgacha uzayib qisqarishi mumkin. Bu harakatni qoplash uchun liniyalarga kengayish tirqishi yoki egiluvchan ulanish elementlari qo'shiladi.",
  },
];

export const metadata: Metadata = {
  title: "Issiqlik Kengayishi Hisoblash (ΔL = L₀ × α × ΔT)",
  description:
    "Material tanlang, boshlang'ich uzunlik va harorat farqini kiriting: issiqlik kengayishi (uzayish/qisqarish) miqdorini hisoblang. Material kengayish koeffitsientlari jadvali kiritilgan.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/isil-genlesme-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/isil-genlesme-hesaplama",
    },
  },
  openGraph: {
    title: "Issiqlik Kengayishi Hisoblash (ΔL = L₀ × α × ΔT)",
    description: "Material va harorat farqidan issiqlik kengayishi miqdorini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekThermalExpansionCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Issiqlik Kengayishi Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Issiqlik Kengayishi Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Issiqlik Kengayishi Hisoblash</h1>
          <p>
            Material tanlang, boshlang&apos;ich uzunligingizni va
            harorat farqini kiriting: issiqlik kengayishi miqdorini
            (uzayish yoki qisqarish) hisoblang. Pastda keng
            tarqalgan materiallarning kengayish koeffitsienti
            jadvalini ham topishingiz mumkin.
          </p>
        </header>

        <ThermalExpansionCalculatorUz />

        <section className="category-article-content">
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
            Yuk ostida cho&apos;zilish miqdori uchun{" "}
            <Link href="/uz/elastik-chozilish-hisoblash">
              Elastik Cho&apos;zilish Hisoblash
            </Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Formula va koeffitsientlar materialshunoslikda standart
            hisoblangan chiziqli issiqlik kengayishi ta&apos;rifiga
            asoslangan; qotishma va harorat oralig&apos;iga qarab
            haqiqiy qiymatlar kichik farqlar ko&apos;rsatishi mumkin.
          </p>
        </section>
      </div>
    </main>
  );
}
