import type { Metadata } from "next";
import HasHesaplamaCalculatorUz from "../../components/calculators/HasHesaplamaCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";
import Link from "next/link";

const pagePath = "/uz/sof-oltin-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Sof oltin/kumush degani nima?",
    answer:
      "Sof (has) qotishma ichidagi toza metall miqdorini bildiradi. Masalan, 10 gramm 22 karat (916 milyem) oltinning sof qiymati 10 × 0,916 = 9,16 gramm; qolgan qismi kumush yoki mis kabi qo'shimcha metalldir.",
  },
  {
    question: "Turli ayardagi qoldiq oltin/kumushni aralashtirsam natija ayari qanday topiladi?",
    answer:
      "Har bir tarkibning grammini milyemiga ko'paytirib qo'shasiz (jami sof), keyin jami og'irlikka bo'lib 1000 ga ko'paytirasiz. Vosita buni avtomatik qiladi: bir nechta tarkib qo'shganingizda og'irlikli o'rtacha bilan natija ayari hisoblanadi.",
  },
  {
    question: "Karat bilan milyem orasidagi farq nima?",
    answer:
      "Karat oltinning 24 birim bo'yicha tozaligini bildiradi (24 karat = to'liq sof). Milyem esa mingdan (‰) hisobida ifodalangan tozalik bo'lib, ham oltin, ham kumushda ishlatiladi; 22 karat = 916 milyem, 18 karat = 750 milyem kabi.",
  },
  {
    question: "Eski/qoldiq oltinimni yangi taqinchoqqa almashtirishda ayar farqi qanday hisoblanadi?",
    answer:
      "Qo'lingizdagi qoldiq bo'lakning grammini va ayarini (milyemini), olmoqchi bo'lgan yangi bo'lakning ayari bilan birga Sof Hisoblash vositasiga kiriting; ikkalasini 'tarkib' sifatida qo'shib sof miqdorlarini solishtirishingiz, yoki qoldig'ingizni yangi ayarga eritish uchun kerakli aralashmani hisoblashingiz mumkin. Bu vosita faqat ayar/milyem matematikasini qiladi, joriy gramm oltin narxini o'z ichiga olmaydi.",
  },
];

export const metadata: Metadata = {
  title: "Sof Oltin va Kumush Hisoblash: Qotishma Aralashtirish, Sof Metall Miqdori",
  description:
    "Gramm og'irlik va ayar (milyem) kiriting; sof oltin yoki kumush miqdorini hisoblang. Turli ayardagi qoldiq/bo'lakni aralashtirib natija ayarini toping, yoki teskarisiga kerakli brutto og'irlikni bilib oling.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/has-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/has-hesaplama",
    },
  },
  openGraph: {
    title: "Sof Oltin va Kumush Hisoblash",
    description: "Gramm va ayar (milyem) kiritib sof oltin/kumush miqdorini hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekHasHesaplamaPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Sof Oltin va Kumush Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Sof Oltin va Kumush Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Sof Oltin va Kumush Hisoblash</h1>
          <p>
            Metal turini tanlang, og&apos;irligini (gramm) va ayarini
            (milyem) kiriting: sof metall miqdorini darhol
            ko&apos;ring. Turli ayardagi bir nechta bo&apos;lak/qoldiq
            qo&apos;shib qotishma aralashtirish natijasidagi ayarni ham
            hisoblashingiz mumkin.
          </p>
        </header>

        <HasHesaplamaCalculatorUz />

        <section className="category-article-content">
          <h2>Sof qiymat qanday hisoblanadi?</h2>
          <p>
            Sof hisoblash, qotishmaning brutto og&apos;irligining
            qanchasi sof metall ekanligini topadi:{" "}
            <strong>Sof Gramm = Brutto Gramm × (Milyem / 1000)</strong>.
            Masalan, 10 gramm 18 karat (750 milyem) oltinning sof
            qiymati 10 × 0,750 = 7,5 gramm; qolgan 2,5 gramm kumush,
            mis kabi qo&apos;shimcha metalldir.
          </p>

          <h2>Qotishma aralashtirish (bir nechta tarkib)</h2>
          <p>
            Turli ayardagi bir necha bo&apos;lakni eritib bitta
            qotishma hosil qilmoqchi bo&apos;lsangiz, natija ayari
            oddiy o&apos;rtacha emas,{" "}
            <strong>og&apos;irlikli o&apos;rtachadir</strong>: har bir
            tarkibning sof grammi qo&apos;shiladi, jami og&apos;irlikka
            bo&apos;linib 1000 ga ko&apos;paytiriladi —{" "}
            <strong>Natija Milyem = (Σ Sof Gramm / Σ Brutto Gramm) × 1000</strong>.
            Bu zargarlar qoldiq oltin/kumushni qayta ayarlashda
            ishlatadigan standart usuldir.
          </p>

          <h2>Karat va milyem jadvali</h2>
          <p>
            Oltinda keng tarqalgan karatlar: 24 karat (999 milyem, sof
            oltin), 22 karat (916 milyem), 18 karat (750 milyem), 14
            karat (585 milyem), 8 karat (333 milyem). Kumushda esa
            to&apos;g&apos;ridan-to&apos;g&apos;ri milyem qiymati
            ishlatiladi: 999 (sof kumush), 925 (sterling kumush), 900
            va 800 ayar eng keng tarqalgan standartlardir. Bu
            qiymatlarni &quot;Tez tanlash&quot; menyusidan
            to&apos;g&apos;ridan-to&apos;g&apos;ri tanlashingiz mumkin.
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
            Karat/milyem mos kelishlari zargarlikda keng
            qo&apos;llaniladigan xalqaro sof (fineness) standartlariga
            asoslangan. Rasmiy tamg&apos;a/ayar tekshiruvi uchun har
            doim vakolatli ayar tekshirish markaziga murojaat qilish
            kerak — bu vosita faqat matematik hisob taqdim etadi.
          </p>
        </section>
      </div>
    </main>
  );
}
