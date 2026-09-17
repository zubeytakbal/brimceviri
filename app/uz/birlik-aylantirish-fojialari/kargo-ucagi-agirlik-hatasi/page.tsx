import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const pagePath = "/uz/birlik-aylantirish-fojialari/kargo-ucagi-agirlik-hatasi";

const faqItems: FaqItem[] = [
  {
    question: "Yuk samolyoti nega 15 tonna ortiqcha yuk bilan qo'ndi?",
    answer:
      "1994-yilda American International Airways'ga (hozirgi Kalitta Air) tegishli yuk samolyotining yuklash hisob-kitoblarida kilogram-funt aylantirilishi to'g'ri amalga oshirilmadi. Yuk kilogramda tortilib funt sifatida qayd etilgan bo'lishi kerak yoki aksincha — natijada samolyotga rejalashtirilganidan taxminan 15 tonna og'irroq yuk yuklandi.",
  },
  {
    question: "Bu xato qanday oshkor bo'ldi?",
    answer:
      "Voqea Amerika Federal Aviatsiya Ma'muriyatiga (FAA) yuborilgan noma'lum shaxsning xabari orqali fosh bo'ldi. FAA tekshiruvi muammoning kilogram-funt aylantirilishida yuz bergan hisob-kitob xatosidan kelib chiqqanini aniqladi.",
  },
  {
    question: "15 tonna ortiqcha yuk nega xavfli?",
    answer:
      "Samolyotning maksimal ko'tarilish va qo'nish og'irligi tuzilma mustahkamligi, tormozlash masofasi va samaradorlik hisob-kitoblariga qarab belgilanadi. Bu chegaradan oshib ketish, ayniqsa qo'nish paytida tormoz tizimi va shassi imkoniyatlarini zo'riqtirishi, piste yetarli bo'lmay qolishi va tuzilmaviy shikastlanishga olib kelishi mumkin.",
  },
  {
    question: "Kilogram va funt chalkashligi aviatsiyada qanchalik tez-tez uchraydi?",
    answer:
      "Aviatsiya butun dunyoda ham metrik (ko'pchilik mamlakat), ham imperial (AQSH va ba'zi sobiq Britaniya mustamlakalari) birliklar aralash ishlatiladigan bir necha sohalardan biri. Yoqilg'i, yuk va balandlik kabi qiymatlar mamlakatdan mamlakatga turli birliklarda hisobot berilishi mumkinligi uchun, bunday chalkashliklar hali ham xavf tug'diruvchi soha hisoblanadi.",
  },
];

export const metadata: Metadata = {
  title: "Yuk Samolyoti: Kilogram-Funt Chalkashligi Bilan 15 Tonna Ortiqcha Yuk",
  description:
    "1994-yilda yuk samolyoti, yuklash hisob-kitoblarida kilogram-funt aylantirilishi chalkashtirilgani uchun kerakligidan 15 tonna og'irroq yuk bilan qo'ndi. Haqiqiy voqea, tasdiqlangan manbalar bilan.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/birim-cevirme-felaketleri/kargo-ucagi-agirlik-hatasi",
      "uz-UZ": pagePath,
      "x-default": "/birim-cevirme-felaketleri/kargo-ucagi-agirlik-hatasi",
    },
  },
  openGraph: {
    title: "Yuk Samolyoti: Kilogram-Funt Chalkashligi Bilan 15 Tonna Ortiqcha Yuk",
    description: "Kilogram-funt aylantirish xatosi, yuk samolyotining 15 tonna ortiqcha yuk bilan qo'nishiga olib keldi.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekCargoWeightErrorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Birlik Aylantirishdagi Xatolar", item: buildSiteUrl("/uz/birlik-aylantirish-fojialari") },
      { "@type": "ListItem", position: 3, name: "Yuk Samolyoti Og'irlik Xatosi", item: buildSiteUrl(pagePath) },
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
          <span>Yuk Samolyoti Og&apos;irlik Xatosi</span>
        </nav>

        <header className="all-conversions-header">
          <div className="disaster-hero-meta">
            <span className="disaster-category-badge">Yuk tashish</span>
            <span className="disaster-year-badge">1994</span>
          </div>
          <h1>Yuk Samolyoti: Kilogram-Funt Chalkashligi Bilan 15 Tonna Ortiqcha Yuk</h1>
          <p>
            American International Airways&apos;ga tegishli yuk
            samolyoti, yuklash hisob-kitoblarida kilogram-funt
            aylantirilishi chalkashtirilgani uchun kerakligidan 15
            tonna og&apos;irroq yuk bilan qo&apos;ndi.
          </p>
        </header>

        <section className="category-article-content">
          <div className="disaster-fact-grid">
            <div>
              <span>Kompaniya</span>
              <strong>American International Airways</strong>
            </div>
            <div>
              <span>Yil</span>
              <strong>1994</strong>
            </div>
            <div>
              <span>Ortiqcha Yuk</span>
              <strong>~15 tonna</strong>
            </div>
            <div>
              <span>Qanday Fosh Bo&apos;ldi</span>
              <strong>FAA&apos;ga noma&apos;lum xabar</strong>
            </div>
          </div>

          <h2>Nima bo&apos;ldi?</h2>
          <p>
            1994-yilda, yuk tashish bilan shug&apos;ullanuvchi
            American International Airways&apos;ga (hozirgi nomi
            Kalitta Air) tegishli samolyot, rejalashtirilganidan
            ancha og&apos;irroq yuk bilan uchdi va qo&apos;ndi. Voqea
            baxtsiz hodisaga olib kelmadi — lekin Amerika Federal
            Aviatsiya Ma&apos;muriyatiga (FAA) yuborilgan noma&apos;lum
            shaxsning xabari tufayli fosh bo&apos;ldi va rasmiy
            tekshiruvga sabab bo&apos;ldi.
          </p>

          <h2>Xato qanday yuzaga keldi?</h2>
          <p>
            FAA tekshiruvi muammoning yuklash hisob-kitoblarida yuz
            bergan <strong>kilogram-funt aylantirish xatosidan</strong>{" "}
            kelib chiqqanini aniqladi. Yukning og&apos;irligi bir
            birlikda o&apos;lchanib, xato ravishda boshqa birlik deb
            qabul qilinganida, samolyotga haqiqatda ko&apos;tara
            oladiganidan taxminan{" "}
            <strong>15 tonna og&apos;irroq</strong> yuk yuklangan edi.
          </p>

          <div className="disaster-pullquote">
            &quot;Bir son to&apos;g&apos;ri ko&apos;rinishi mumkin —
            lekin qaysi birlikda ekanligini tekshirmasdan ishonish,
            15 tonnalik farqni ko&apos;zdan qochirish demakdir.&quot;
          </div>

          <h2>Nega xavfli edi?</h2>
          <p>
            Samolyotning maksimal ko&apos;tarilish va qo&apos;nish
            og&apos;irligi; qanot tuzilmasining mustahkamligi, tormoz
            tizimining sig&apos;imi, shassi kuchi va piste uzunligi
            kabi ko&apos;plab muhandislik hisob-kitoblariga qarab
            belgilanadi. Bu chegaradan 15 tonna kabi katta farq bilan
            oshib ketish, ayniqsa qo&apos;nish paytida jiddiy
            tuzilmaviy va operatsion xavf tug&apos;diradi — bu voqeada
            baxtsiz hodisa yuz bermagani, natija har doim shunday
            omadli bo&apos;lishini anglatmaydi.
          </p>

          <h2>Bu bizga nimani o&apos;rgatadi?</h2>
          <p>
            Bu voqea birlik xatolari har doim dramatik baxtsiz hodisa
            bilan tugamasligi mumkinligini, lekin baribir jiddiy
            xavfsizlik xavflarini olib kelishini ko&apos;rsatadi. Yuk
            tashish va logistika sohasida, turli mamlakatlar va
            kompaniyalar o&apos;rtasida kilogram va funt birliklarining
            bir vaqtda ishlatilishi, bunday xatolar hali ham mumkin
            ekanligini bildiradi.
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
            Bu sahifadagi ma&apos;lumotlar voqea haqida e&apos;lon
            qilingan aviatsiya tarixi to&apos;plamlariga va FAA
            tekshiruviga ishora qiluvchi manbalarga asoslangan.
          </p>
        </section>
      </div>
    </main>
  );
}
