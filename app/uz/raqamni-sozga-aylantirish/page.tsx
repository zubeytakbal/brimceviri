import type { Metadata } from "next";
import Link from "next/link";
import NumberToWordsCalculatorUz from "../../components/calculators/NumberToWordsCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildFullLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/raqamni-sozga-aylantirish";

const faqItems: FaqItem[] = [
  {
    question: "Raqamlarni so'z bilan yozish qachon kerak bo'ladi?",
    answer:
      "Shartnoma, chek, faktura, ish haqi varaqasi kabi rasmiy hujjatlarda summani raqam bilan yozgandan so'ng, xatolik yoki soxtalashtirishning oldini olish uchun uni yana so'z bilan takrorlash odatiy amaliyot. Masalan, \"5 000 000 (besh million) so'm\" tarzida.",
  },
  {
    question: "\"Yuz\" va \"ming\" oldidan nega \"bir\" yozilmaydi?",
    answer:
      "O'zbek tilida 100 va 1000 sonlari oddiygina \"yuz\" va \"ming\" deb aytiladi, \"bir yuz\"/\"bir ming\" shart emas. Ammo xalqaro qarz so'zlar bo'lgan \"million\", \"milliard\" va \"trillion\" uchun bitta birlik holatida \"bir\" old qo'shimchasi ishlatiladi — masalan, 1 000 000 \"bir million\" deb yoziladi, shunchaki \"million\" emas.",
  },
  {
    question: "Bu vosita o'nlik kasrlarni (tiyin) qo'llab-quvvatlaydimi?",
    answer:
      "Yo'q, hozircha bu vosita faqat butun sonlarni so'zga aylantiradi. O'nlik qismi bo'lgan summalar uchun butun son qismini alohida hisoblashingiz kerak.",
  },
];

export const metadata: Metadata = {
  title: "Raqamni So'zga Aylantirish: Sonlarni Yozuv Bilan Ifodalash",
  description:
    "Butun sonni o'zbekcha so'z bilan yozilishiga aylantiring — shartnoma, chek va faktura uchun summani yozuv bilan ifodalashda foydalaning.",
  alternates: {
    canonical: pagePath,
    ...buildFullLanguageAlternates(pagePath),
  },
  openGraph: {
    title: "Raqamni So'zga Aylantirish",
    description: "Butun sonni o'zbekcha so'z bilan yozilishiga aylantiring.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekNumberToWordsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Raqamni So'zga Aylantirish", item: buildSiteUrl(pagePath) },
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
          <span>Raqamni So&apos;zga Aylantirish</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Raqamni So&apos;zga Aylantirish</h1>
          <p>
            Butun sonni kiriting: uning o&apos;zbekcha so&apos;z bilan
            yozilishini darhol ko&apos;ring — shartnoma, chek yoki
            faktura uchun summani yozuv bilan ifodalashda
            foydalanishingiz mumkin.
          </p>
        </header>

        <NumberToWordsCalculatorUz />

        <section className="category-article-content">
          <h2>Raqam so&apos;zga qanday aylantiriladi?</h2>
          <p>
            Har bir uch xonali guruh (birlar-o&apos;nlar-yuzlar,
            minglar, millionlar va h.k.) alohida so&apos;z birikmasiga
            aylantiriladi, so&apos;ng bu birikmalar kattadan kichikka
            qarab birlashtiriladi. Masalan, <strong>125 430</strong>{" "}
            soni <strong>&quot;yuz yigirma besh ming to&apos;rt yuz
            o&apos;ttiz&quot;</strong> deb o&apos;qiladi: 125 — &quot;yuz
            yigirma besh&quot; + &quot;ming&quot;, 430 — &quot;to&apos;rt
            yuz o&apos;ttiz&quot;.
          </p>

          <h2>Tez-tez So&apos;raladigan Savollar</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>Manbalar</h2>
          <p>
            Raqam-so&apos;z mos kelishi o&apos;zbek tilining standart
            son yasash qoidalariga asoslangan; &quot;million&quot; va
            &quot;milliard&quot; kabi xalqaro qarz so&apos;zlar uchun
            bitta birlikda &quot;bir&quot; old qo&apos;shimchasi
            ishlatilishi keng tarqalgan foydalanish namunalari bilan
            tasdiqlangan.
          </p>
        </section>
      </div>
    </main>
  );
}
