import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const pagePath = "/uz/birlik-aylantirish-fojialari/fenobarbital-doz-hatasi";

const faqItems: FaqItem[] = [
  {
    question: "Grain bilan gramm orasidagi farq nima?",
    answer:
      "Grain (gr) — tarixda don donasining og'irligidan kelib chiqqan juda qadimiy massa birligi bo'lib, 0,06479891 grammga teng. Gramm esa metrik tizimning asosiy massa birligi. Ya'ni 1 gramm 1 grain'dan taxminan 15,43 baravar og'irroq.",
  },
  {
    question: "1999-yilgi fenobarbital voqeasida nima bo'ldi?",
    answer:
      "Bemorga kuniga 0,5 grain fenobarbital (tinchlantiruvchi dori) berilishi retsept qilingan edi. Retsept noto'g'ri o'qilgani uchun bemorga kuniga 0,5 gramm berildi — grain o'rniga gramm qo'llanilganida doza taxminan 15,43 baravar oshdi. Dori kuniga uchta alohida venaga in'eksiya bilan qo'llanildi.",
  },
  {
    question: "Bemorga qanday ta'sir qildi?",
    answer:
      "AQSHdagi Dori Xavfsizligi Amaliyotlari Instituti (ISMP) hisobotiga ko'ra, bemor bir necha kun davomida normaldan ancha yuqori doza olgandan so'ng nafas olish muammolarini boshdan kechira boshladi. Dori to'xtatilganida bemor to'liq tuzaldi.",
  },
  {
    question: "Bunday xatolar tibbiyotda nega hozir ham yuz berishi mumkin?",
    answer:
      "Grain kabi eski, metrik bo'lmagan birliklar zamonaviy tibbiyotda deyarli ishlatilmasa ham, eski retsept formatlarida yoki turli mamlakatlarning odatlarida hali ham uchrashi mumkin. ISMP kabi tashkilotlar bunday xatolarning oldini olish uchun dori retseptlarida faqat metrik birliklarni (mg, g kabi) ishlatishni tavsiya qiladi.",
  },
];

export const metadata: Metadata = {
  title: "Fenobarbital Doza Xatosi: Gramm Bilan Grain Chalkashtirilganda",
  description:
    "1999-yilda bemorga, retseptdagi 'grain' birligi 'gramm' bilan chalkashtirilgani uchun kerakligidan taxminan 15 baravar ko'p fenobarbital dozasi berildi. Haqiqiy voqea, tasdiqlangan manbalar bilan.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/birim-cevirme-felaketleri/fenobarbital-doz-hatasi",
      "uz-UZ": pagePath,
      "x-default": "/birim-cevirme-felaketleri/fenobarbital-doz-hatasi",
    },
  },
  openGraph: {
    title: "Fenobarbital Doza Xatosi: Gramm Bilan Grain Chalkashtirilganda",
    description: "Grain o'rniga gramm ishlatilganda, doza kerakligidan taxminan 15 baravar ko'p bo'ldi.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekPhenobarbitalDosingErrorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Birlik Aylantirishdagi Xatolar", item: buildSiteUrl("/uz/birlik-aylantirish-fojialari") },
      { "@type": "ListItem", position: 3, name: "Fenobarbital Doza Xatosi", item: buildSiteUrl(pagePath) },
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
          <span>Fenobarbital Doza Xatosi</span>
        </nav>

        <header className="all-conversions-header">
          <div className="disaster-hero-meta">
            <span className="disaster-category-badge">Tibbiyot</span>
            <span className="disaster-year-badge">1999</span>
          </div>
          <h1>Fenobarbital Doza Xatosi: Gramm Bilan Grain Chalkashtirilganda</h1>
          <p>
            Bemorga, retseptdagi &quot;grain&quot; birligi
            &quot;gramm&quot; bilan chalkashtirilgani uchun
            kerakligidan taxminan 15 baravar ko&apos;p fenobarbital
            dozasi berildi.
          </p>
        </header>

        <section className="category-article-content">
          <div className="disaster-fact-grid">
            <div>
              <span>Dori</span>
              <strong>Fenobarbital (tinchlantiruvchi)</strong>
            </div>
            <div>
              <span>Xato</span>
              <strong>grain o&apos;rniga gramm</strong>
            </div>
            <div>
              <span>Doza Farqi</span>
              <strong>~15,43 baravar</strong>
            </div>
            <div>
              <span>Natija</span>
              <strong>To&apos;liq tuzalish</strong>
            </div>
          </div>

          <h2>Nima bo&apos;ldi?</h2>
          <p>
            1999-yilda bemorga, kuchli tinchlantiruvchi dori
            fenobarbitalning kuniga <strong>0,5 grain</strong>{" "}
            berilishi retsept qilindi. Ammo retsept noto&apos;g&apos;ri
            o&apos;qildi va bemorga kuniga <strong>0,5 gramm</strong>{" "}
            qo&apos;llanildi — dori kuniga uchta alohida venaga
            in&apos;eksiya bilan berildi. Voqea Dori Xavfsizligi
            Amaliyotlari Instituti (ISMP) tomonidan xabar qilindi.
          </p>

          <h2>Xato qanday bunchalik kattalashdi?</h2>
          <p>
            Grain tarixda don donasining og&apos;irligidan kelib
            chiqqan juda qadimiy birlik bo&apos;lib,{" "}
            <strong>1 grain ≈ 0,065 gramm</strong> ga teng. &quot;0,5&quot;
            soni retseptda o&apos;zgarmagan bo&apos;lsa ham, birlik
            graindan grammga o&apos;zgarganida doza kerakligidan
            taxminan <strong>15,43 baravariga</strong> chiqdi. Son
            bir xil edi, lekin birlik boshqacha edi — va natija hayotga
            xavf tug&apos;diruvchi doza oshirib yuborilishi edi.
          </p>

          <div className="disaster-pullquote">
            &quot;0,5 soni o&apos;zgarmadi. Faqat qaysi birlikda
            ekanligi unutildi — va bu, dozaning 15 baravariga
            chiqishiga yetarli bo&apos;ldi.&quot;
          </div>

          <h2>Bemorga nima bo&apos;ldi?</h2>
          <p>
            ISMP hisobotiga ko&apos;ra, bemor bir necha kun davomida
            odatdagidan ancha yuqori doza fenobarbital olgandan so&apos;ng
            nafas olish muammolarini boshdan kechira boshladi.
            Shifokorlar holatni payqab dorini to&apos;xtatganida bemor
            to&apos;liq tuzaldi — ammo voqea doza hisob-kitoblarida
            birlik xatolari qanchalik tez hayotiy ahamiyat kasb
            etishini ko&apos;rsatdi.
          </p>

          <h2>Bu bizga nimani o&apos;rgatadi?</h2>
          <p>
            ISMP bu voqeadan so&apos;ng, dori retseptlarida faqat
            metrik birliklarni (milligramm, gramm kabi) ishlatishni,
            grain kabi eski va chalkashtirilishga moyil birliklardan
            saqlanishni tavsiya qildi. Tibbiyotda birlik xatosi,
            muhandislikdagi xatodan farqli o&apos;laroq, darhol va
            to&apos;g&apos;ridan-to&apos;g&apos;ri bir inson hayotiga
            ta&apos;sir qilishi mumkin — bu esa to&apos;g&apos;ri
            birlikni ishlatishni nafaqat texnik, balki hayotiy
            masalaga aylantiradi.
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
            Bu sahifadagi ma&apos;lumotlar Dori Xavfsizligi Amaliyotlari
            Instituti (ISMP) tomonidan e&apos;lon qilingan voqea
            hisobotiga asoslangan.
          </p>
        </section>
      </div>
    </main>
  );
}
