import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const pagePath = "/uz/birlik-aylantirish-fojialari/gimli-glider";

const faqItems: FaqItem[] = [
  {
    question: "Gimli Glider samolyoti nega yoqilg'isiz qoldi?",
    answer:
      "Samolyotning yoqilg'i ko'rsatkichi buzuq edi, shuning uchun yer xizmati yoqilg'i miqdorini qo'lda hisobladi. Hisob-kitobda yoqilg'i zichligini litr uchun 0,803 kg o'rniga litr uchun 1,77 funt bilan ko'paytirishdi — ikkala son ham to'g'ri ko'rinardi, lekin turli birlik tizimlaridan edi. Natijada samolyotga kerakligining taxminan yarmicha yoqilg'i yuklandi.",
  },
  {
    question: "Bu xato nega yuz berdi?",
    answer:
      "Bu samolyot Air Canada'ning metrik tizimga (litr, kilogram) o'tgan birinchi Boeing 767'si edi. Ammo yer xizmati hali ham imperial tizimga (funt) o'rgangan edi va ishlatilgan zichlik koeffitsiyenti xato ravishda funtda edi. Qisqasi, samolyot metrik edi, lekin odamlarning ongi hali ham imperialda edi.",
  },
  {
    question: "Samolyot qanday qilib xavfsiz qo'ndi?",
    answer:
      "Kapitan Robert Pearson tajribali planyor uchuvchisi edi va dvigatelsiz samolyotni sirg'anib tushirish texnikalarini bilardi. Ikkinchi uchuvchi Maurice Quintal esa yaqinda endi ishlatilmaydigan eski harbiy aerodrom (Gimli) borligini esladi. Samolyot dvigatellari to'liq to'xtagan holda 17 km dan ko'proq sirg'anib shu piste ustiga qo'ndi.",
  },
  {
    question: "Baxtsiz hodisa natijasida odam yo'qotildimi?",
    answer:
      "Yo'q. Samolyotdagi 61 yo'lovchi va 8 ekipaj a'zosining (jami 69 kishi) barchasi omon qoldi, faqat bir nechta yengil jarohat oldi. Bu ehtiyotkor uchuvchilik tufayli fojianing qanday oldini olinganining eng mashhur namunalaridan biriga aylandi.",
  },
];

export const metadata: Metadata = {
  title: "Gimli Glider: Yoqilg'isiz Qolgan Boeing 767",
  description:
    "Air Canada 143-reysi, yoqilg'i hisobida kilogram o'rniga funt ishlatilgani uchun ehtiyojining yarmicha yoqilg'i bilan uchdi va 41 000 futda ikkala dvigateli birdan to'xtadi. Haqiqiy voqea, tasdiqlangan manbalar bilan.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/birim-cevirme-felaketleri/gimli-glider",
      "uz-UZ": pagePath,
      "x-default": "/birim-cevirme-felaketleri/gimli-glider",
    },
  },
  openGraph: {
    title: "Gimli Glider: Yoqilg'isiz Qolgan Boeing 767",
    description: "Kilogram o'rniga funt ishlatilganda, samolyot ehtiyojining yarmicha yoqilg'i bilan uchdi.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekGimliGliderPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Birlik Aylantirishdagi Xatolar", item: buildSiteUrl("/uz/birlik-aylantirish-fojialari") },
      { "@type": "ListItem", position: 3, name: "Gimli Glider", item: buildSiteUrl(pagePath) },
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
          <Link href="/uz/birlik-aylantirish-fojialari">Birlik Aylantirishdagi Xatolar</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Gimli Glider</span>
        </nav>

        <header className="all-conversions-header">
          <div className="disaster-hero-meta">
            <span className="disaster-category-badge">Aviatsiya</span>
            <span className="disaster-year-badge">23-iyul 1983</span>
          </div>
          <h1>Gimli Glider: Yoqilg&apos;isiz Qolgan Boeing 767</h1>
          <p>
            Air Canada 143-reysi, yer xizmatining yoqilg&apos;i
            hisobida kilogram o&apos;rniga funt ishlatishi tufayli
            ehtiyojining taxminan yarmicha yoqilg&apos;i bilan uchdi
            va 41 000 futda ikkala dvigateli birdan to&apos;xtadi.
          </p>
        </header>

        <section className="category-article-content">
          <div className="disaster-fact-grid">
            <div>
              <span>Samolyot</span>
              <strong>Air Canada 767, 143-reys</strong>
            </div>
            <div>
              <span>Marshrut</span>
              <strong>Monreal → Edmonton</strong>
            </div>
            <div>
              <span>Sabab</span>
              <strong>kg/lb zichlik chalkashligi</strong>
            </div>
            <div>
              <span>Natija</span>
              <strong>69 kishi omon qoldi</strong>
            </div>
          </div>

          <h2>Nima bo&apos;ldi?</h2>
          <p>
            1983-yil 23-iyulda Air Canada&apos;ning Monrealdan
            Edmontonga uchayotgan Boeing 767&apos;si, Manitoba
            ustida 41 000 fut balandlikda avval bitta, keyin
            ikkinchi dvigatelini yo&apos;qotdi. Samolyot to&apos;liq
            dvigatelsiz qoldi — yo&apos;lovchi samolyotining havoda
            shu tarzda sirg&apos;anib uchishi juda kam uchraydigan
            holat edi.
          </p>

          <h2>Xato qanday yuzaga keldi?</h2>
          <p>
            Bu samolyot Air Canada&apos;ning metrik tizimga (litr,
            kilogram) o&apos;tgan birinchi Boeing 767&apos;si edi.
            Samolyotning avtomatik yoqilg&apos;i ko&apos;rsatkichi
            buzuq edi, shuning uchun yer xizmati bakdagi
            yoqilg&apos;ini qo&apos;lda (tayoqcha bilan) o&apos;lchab,
            hajmni massaga aylantirish uchun zichlik koeffitsiyentidan
            foydalandi. To&apos;g&apos;ri koeffitsiyent litr uchun{" "}
            <strong>0,803 kilogram</strong> bo&apos;lishi kerak edi;
            lekin guruh xato ravishda litr uchun{" "}
            <strong>1,77 funt</strong> ishlatdi — raqamli jihatdan
            mos ko&apos;ringan, lekin butunlay boshqa birlik
            tizimidan kelgan qiymat. Natijada samolyotga kerakli
            22 300 kg o&apos;rniga taxminan yarmicha yoqilg&apos;i
            yuklandi.
          </p>

          <div className="disaster-pullquote">
            &quot;Samolyot metrik tizimga o&apos;tgan edi, lekin
            odamlarning ongi hali ham imperial tizimda edi.&quot;
          </div>

          <h2>Samolyot qanday xavfsiz qo&apos;ndi?</h2>
          <p>
            Kapitan Robert Pearson tasodifan tajribali planyor
            uchuvchisi edi va dvigatelsiz samolyotni sirg&apos;anib
            boshqarish texnikalarini bilardi. Ikkinchi uchuvchi
            Maurice Quintal esa yaqin atrofda endi harbiy
            foydalanishdan chiqarilgan eski aerodrom — Gimlini
            esladi. Samolyot ikkala dvigateli ham to&apos;liq
            to&apos;xtagan holda 17 kilometrdan ko&apos;proq
            sirg&apos;anib shu piste ustiga qo&apos;ndi — pistning bir
            qismi o&apos;sha kuni avtomobil poygalari uchun
            to&apos;siqlar bilan yopilgan bo&apos;lsa-da, samolyot
            xavfsiz to&apos;xtadi. 61 yo&apos;lovchi va 8 ekipaj
            a&apos;zosining barchasi omon qoldi.
          </p>

          <h2>Bu bizga nimani o&apos;rgatadi?</h2>
          <p>
            Bu voqea bir tizimning (samolyotning o&apos;zi) metrik
            birliklarga o&apos;tishi yetarli emasligini, o&apos;sha
            tizimdan foydalanadigan barcha odamlar va jarayonlar ham
            bir xil birliklarga o&apos;tishi kerakligini ko&apos;rsatadi.
            Bitta noto&apos;g&apos;ri koeffitsiyent — 0,803 o&apos;rniga
            1,77 — deyarli katta fojiaga olib kelayotgan edi.
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
            Bu sahifadagi ma&apos;lumotlar voqea haqidagi rasmiy
            Kanada transport xavfsizligi tekshiruvlari va aviatsiya
            tarixi manbalariga asoslangan keng tarqalgan, tasdiqlangan
            hikoyalarga asoslangan.
          </p>
        </section>
      </div>
    </main>
  );
}
