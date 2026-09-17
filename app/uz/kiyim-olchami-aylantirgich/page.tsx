import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/kiyim-olchami-aylantirgich";

const faqItems: FaqItem[] = [
  {
    question: "Yevropa (EU) kiyim o'lchami O'zbekistonda ishlatiladigan tizimga mos keladimi?",
    answer:
      "O'zbekistonda yagona rasmiy milliy kiyim o'lchami raqamlash tizimi yo'q; bozorda ko'pincha Yevropa (EU) o'lchamlari va S/M/L kabi umumiy harfli o'lchamlar ishlatiladi. Shu sababli quyidagi jadval EU o'lchamiga asoslangan — o'zingiz sotib olayotgan mahsulotning tegidagi aniq o'lchamni tekshirishingiz tavsiya etiladi.",
  },
  {
    question: "Nega brendga qarab o'lcham farq qilishi mumkin?",
    answer:
      "Kiyim o'lchamlari, poyabzal o'lchamidan farqli o'laroq (oyoq uzunligiga asoslangan jismoniy o'lchov) rasmiy/xalqaro to'liq standartlashtirilmagan. Har bir brend o'z qolipiga qarab o'lchamlaydi; shuning uchun quyidagi jadval umumiy mos yozuv, aniq o'lcham uchun har doim brendning o'z o'lcham jadvaliga qarash kerak.",
  },
  {
    question: "Ko'ylak yoqa o'lchami qanday olinadi?",
    answer:
      "Lentani bo'yinning eng tashqi qismidan, ko'rsatkich barmog'ingizni tomoq bilan lenta orasiga qo'yib (tor bo'lmasligi uchun) o'rab o'lchashingiz kerak. Chiqqan sm qiymati, quyidagi jadvaldagi yoqa o'lchami ustuni bilan solishtirilib o'lcham topiladi.",
  },
];

export const metadata: Metadata = {
  title: "Kiyim O'lchami Aylantirgich: EU, US, UK O'lchami",
  description:
    "Ayollar kiyim o'lchamini EU, US va UK orasida, erkaklar ko'ylak o'lchamini yoqa va ko'krak o'lchamiga qarab S-XXL orasida aylantiring.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/beden-olcusu-cevirici",
      "uz-UZ": pagePath,
      "x-default": "/beden-olcusu-cevirici",
    },
  },
  openGraph: {
    title: "Kiyim O'lchami Aylantirgich: EU, US, UK O'lchami",
    description: "Ayollar va erkaklar kiyim o'lchamini EU, US, UK tizimlari orasida aylantiring.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const womenSizeTable = [
  ["32", "2", "4"],
  ["34", "4", "6"],
  ["36", "6", "8"],
  ["38", "8", "10"],
  ["40", "10", "12"],
  ["42", "12", "14"],
  ["44", "14", "16"],
  ["46", "16", "18"],
];

const menShirtSizeTable = [
  ["S", "46-48", "38", "90-95"],
  ["M", "48-50", "40", "96-101"],
  ["L", "50-52", "42", "102-107"],
  ["XL", "52-54", "44", "108-113"],
  ["XXL", "54-56", "46", "114-119"],
];

export default function UzbekClothingSizeConverterPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Kiyim O'lchami Aylantirgich", item: buildSiteUrl(pagePath) },
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
          <span>Kiyim O&apos;lchami Aylantirgich</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Kiyim O&apos;lchami Aylantirgich</h1>
          <p>
            Ayollar kiyim o&apos;lchamini EU, US va UK orasida,
            erkaklar ko&apos;ylak o&apos;lchamini yoqa va ko&apos;krak
            o&apos;lchamiga qarab S-XXL orasida aylantiring. Bu
            qiymatlar umumiy mos yozuv jadvallari — brendga qarab
            bir necha raqam farq bo&apos;lishi mumkin.
          </p>
        </header>

        <section className="category-article-content">
          <h2>Ayollar Kiyim O&apos;lchami Jadvali (EU - US - UK)</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Ayollar kiyim o&apos;lchami EU, US va UK ekvivalentlari</caption>
              <thead>
                <tr>
                  <th scope="col">EU</th>
                  <th scope="col">US</th>
                  <th scope="col">UK</th>
                </tr>
              </thead>
              <tbody>
                {womenSizeTable.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${index}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            O&apos;zbekistonda alohida milliy kiyim o&apos;lchami
            raqamlash tizimi yo&apos;q; bozorda ko&apos;pincha Yevropa
            (EU) o&apos;lchamlaridan foydalaniladi. Bu jadval ust
            kiyim (ko&apos;ylak, kurtka, jaket) uchun umumiy; shim
            bel o&apos;lchami alohida raqamlashdan foydalanishi
            mumkin.
          </p>

          <h2>Erkaklar Ko&apos;ylak O&apos;lchami Jadvali (S - XXL)</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>Erkaklar ko&apos;ylak o&apos;lchami, EU raqami, yoqa va ko&apos;krak o&apos;lchami</caption>
              <thead>
                <tr>
                  <th scope="col">O&apos;lcham</th>
                  <th scope="col">EU Raqami</th>
                  <th scope="col">Yoqa (sm)</th>
                  <th scope="col">Ko&apos;krak (sm)</th>
                </tr>
              </thead>
              <tbody>
                {menShirtSizeTable.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${index}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
            Uzuk o&apos;lchamingiz uchun{" "}
            <Link href="/uz/uzuk-olcami-aylantirgich">Uzuk O&apos;lchami Aylantirgich</Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            O&apos;lcham ekvivalentlari, keng tarqalgan xalqaro kiyim
            brendlarining umumiy o&apos;lcham jadvallaridan jamlangan
            o&apos;rtacha mos yozuv qiymatlaridir. Aniq o&apos;lcham
            har doim sotib olayotgan mahsulotingizning o&apos;z
            o&apos;lcham jadvaliga qarab tekshirilishi kerak.
          </p>
        </section>
      </div>
    </main>
  );
}
