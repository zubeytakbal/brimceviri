import type { Metadata } from "next";
import Link from "next/link";
import LicenseRenewalCalculatorUz from "../../components/calculators/LicenseRenewalCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/haydovchilik-guvohnomasi-yangilash-muddati-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Haydovchilik guvohnomasi necha yilda bir yangilanadi?",
    answer:
      "O'zbekistonda barcha toifadagi (A1, A, B, BE, C, CE, D, DE) haydovchilik guvohnomalari 10 yilda bir yangilanadi — Turkiyadagi kabi tijorat/og'ir transport uchun qisqartirilgan alohida muddat yo'q.",
  },
  {
    question: "Muddati tugagan guvohnoma bilan transport vositasini haydash mumkinmi?",
    answer:
      "Yo'q. Muddati tugagan haydovchilik guvohnomasi bilan yo'lga chiqish qonuniy emas; guvohnoma amal qilmaydi deb hisoblanadi. Yangi guvohnoma olinmaguncha transport vositasi haydalmasligi kerak.",
  },
  {
    question: "Guvohnomani yangilash uchun qanday hujjatlar kerak?",
    answer:
      "Dolzarb tibbiy ma'lumotnoma (083/h shakli) va davlat boji to'lovi talab qilinadi; yangilash my.gov.uz portali yoki Yo'l harakati xavfsizligi boshqarmasi orqali amalga oshiriladi. Aniq hujjatlar ro'yxati uchun rasmiy manba tekshirilishi kerak.",
  },
];

export const metadata: Metadata = {
  title: "Haydovchilik Guvohnomasini Yangilash Muddatini Hisoblash",
  description:
    "Guvohnomangizning berilgan sanasiga qarab, O'zbekistonda haydovchilik guvohnomangizni qachon yangilash kerakligini hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/ehliyet-yenileme-suresi-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/ehliyet-yenileme-suresi-hesaplama",
    },
  },
  openGraph: {
    title: "Haydovchilik Guvohnomasini Yangilash Muddatini Hisoblash",
    description: "Guvohnomangizni qachon yangilash kerakligini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekLicenseRenewalPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Haydovchilik Guvohnomasini Yangilash Muddatini Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Haydovchilik Guvohnomasini Yangilash Muddatini Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Haydovchilik Guvohnomasini Yangilash Muddatini Hisoblash</h1>
          <p>
            Guvohnomangizning berilgan yoki so&apos;nggi yangilangan
            sanasini kiriting: qachon yangilash kerakligini darhol
            hisoblang.
          </p>
        </header>

        <LicenseRenewalCalculatorUz />

        <section className="category-article-content">
          <h2>Yangilash Muddati Qanday Belgilanadi?</h2>
          <p>
            O&apos;zbekistonda haydovchilik guvohnomalari toifasidan
            qat&apos;i nazar (A1, A, B, BE, C, CE, D, DE) 10 yilda bir
            yangilanadi.
          </p>

          <h2>Yangilash Uchun Nima Kerak?</h2>
          <p>
            Yangilash paytida dolzarb tibbiy ma&apos;lumotnoma
            olinishi va davlat boji to&apos;lanishi kerak. Jarayon va
            zarur hujjatlar vaqt o&apos;tishi bilan o&apos;zgarishi
            mumkinligi uchun, aniq va dolzarb ma&apos;lumot uchun
            rasmiy manbani yoki Yo&apos;l harakati xavfsizligi
            boshqarmasini tekshirish tavsiya etiladi.
          </p>

          <h2>Muddati Tugasa Nima Bo&apos;ladi?</h2>
          <p>
            Muddati tugagan haydovchilik guvohnomasi bilan yo&apos;lga
            chiqish qonuniy emas — haydovchi transport vositasini
            haydashdan mahrum qilinadi va guvohnoma amal qilmaydi deb
            hisoblanishi mumkin. Yangi guvohnoma olinmaguncha
            transport vositasi haydalmasligi kerak.
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
            Transport vositangizga qarab qaysi guvohnoma toifasiga
            muhtoj ekaningizni ko&apos;rish uchun{" "}
            <Link href="/uz/haydovchilik-toifasi-topish">
              Qaysi Haydovchilik Guvohnomasi Toifasi Kerak?
            </Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Ushbu sahifadagi muddatlarga oid ma&apos;lumotlar bir
            nechta mustaqil manbadan (osonprava.uz, kun.uz) o&apos;zaro
            tekshirilgan. Yoshga bog&apos;liq qisqartirilgan muddat
            (masalan, Turkiyadagi 65/80 yosh chegarasi kabi) uchun
            O&apos;zbekistonda aniq, sobit bir qonun moddasi
            topilmadi, shuning uchun bu sahifada bunday taxmin
            qilinmagan. <em>(So&apos;nggi tekshiruv: sentyabr 2026)</em>
          </p>
        </section>
      </div>
    </main>
  );
}
