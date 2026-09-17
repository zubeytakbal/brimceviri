import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const pagePath = "/uz/birlik-aylantirish-fojialari/british-airways-5390";

const faqItems: FaqItem[] = [
  {
    question: "British Airways 5390'da nima bo'ldi?",
    answer:
      "1990-yil 10-iyunda texnik xizmat ko'rsatuvchi mutaxassis samolyotning kabina oynasini almashtirayotganda 90 vintdan 84 tasini to'g'ri o'lchamdan 0,66 mm ingichkaroq tanladi. Samolyot 17 300 fut balandlikda bo'lganida kabina bosimi oynani joyidan sug'urib chiqardi va kapitan o'rindig'idan yarim beligacha tashqariga uchib chiqdi.",
  },
  {
    question: "Vint xatosi qanday yuzaga keldi?",
    answer:
      "Texnik xodim, omboridan to'g'ri vintni ko'z bilan tanlashga harakat qildi — o'lchamni hujjatlardan tekshirish o'rniga vizual solishtirdi. Tanlagan vintlari to'g'ri ko'rinardi, lekin diametrlari 0,66 mm ingichkaroq edi; bu kichik farq kabina bosimiga qarshi yetarli ushlab turish kuchini ta'minlamadi.",
  },
  {
    question: "Kapitan omon qoldimi?",
    answer:
      "Ha. Bort proводniklari kapitanni oyoqlaridan ushlab, samolyot xavfsiz favqulodda qo'nishga o'tguncha uni tashqariga tushib ketishdan saqlab qolishdi. Kapitan sovuqdan va zarbadan jarohat oldi, lekin to'liq tuzaldi va bir necha oy o'tib yana uchishni boshladi.",
  },
  {
    question: "Bu voqea aviatsiya texnik xizmat qoidalarini qanday o'zgartirdi?",
    answer:
      "Voqeadan keyingi tekshiruv, qism almashtirishda vizual solishtirish o'rniga hujjatlashtirilgan o'lchov tekshiruvini majburiy qilish kerakligini ta'kidladi. Bugun aviatsiya texnik xizmatida muhim qismlarning o'lchami ko'z bilan emas, rasmiy qism raqami bilan tekshiriladi.",
  },
];

export const metadata: Metadata = {
  title: "British Airways 5390: 0,66 Millimetrlik Vint Xatosi",
  description:
    "Texnik xizmat ko'rsatuvchi mutaxassis kabina oynasining vintlarini to'g'ri o'lchamdan 0,66 mm ingichkaroq tanlaganida, oyna parvoz paytida portlab ketdi. Haqiqiy voqea, tasdiqlangan manbalar bilan.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/birim-cevirme-felaketleri/british-airways-5390",
      "uz-UZ": pagePath,
      "x-default": "/birim-cevirme-felaketleri/british-airways-5390",
    },
  },
  openGraph: {
    title: "British Airways 5390: 0,66 Millimetrlik Vint Xatosi",
    description: "0,66 millimetrlik o'lcham farqi, kabina oynasining parvoz paytida portlab ketishiga olib keldi.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekBritishAirways5390Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Birlik Aylantirishdagi Xatolar", item: buildSiteUrl("/uz/birlik-aylantirish-fojialari") },
      { "@type": "ListItem", position: 3, name: "British Airways 5390", item: buildSiteUrl(pagePath) },
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
          <span>British Airways 5390</span>
        </nav>

        <header className="all-conversions-header">
          <div className="disaster-hero-meta">
            <span className="disaster-category-badge">Aviatsiya</span>
            <span className="disaster-year-badge">10-iyun 1990</span>
          </div>
          <h1>British Airways 5390: 0,66 Millimetrlik Vint Xatosi</h1>
          <p>
            Texnik xizmat ko&apos;rsatuvchi mutaxassis kabina
            oynasining vintlarini to&apos;g&apos;ri o&apos;lchamdan
            0,66 mm ingichkaroq tanlaganida, oyna parvoz paytida
            portlab ketdi va kapitan yarim beligacha tashqariga
            uchib chiqdi.
          </p>
        </header>

        <section className="category-article-content">
          <div className="disaster-fact-grid">
            <div>
              <span>Reys</span>
              <strong>BA5390, BAC One-Eleven</strong>
            </div>
            <div>
              <span>Balandlik</span>
              <strong>17 300 fut</strong>
            </div>
            <div>
              <span>Xato</span>
              <strong>0,66 mm ingichka vint</strong>
            </div>
            <div>
              <span>Natija</span>
              <strong>Kapitan omon qoldi, qurbon yo&apos;q</strong>
            </div>
          </div>

          <h2>Nima bo&apos;ldi?</h2>
          <p>
            1990-yil 10-iyunda British Airways&apos;ning BAC
            One-Eleven samolyoti, Birmingemdan Ispaniyaga tomon 17 300
            fut balandlikda bo&apos;lganida kabinaning old oynasi
            kutilmaganda joyidan uchib chiqdi. Kabina bosimi farqi,
            Kapitan Tim Lancaster&apos;ni o&apos;rindig&apos;idan
            sug&apos;urib deyarli to&apos;liq kabina tashqarisiga
            uloqtirdi. Bort provodnik(lar)i uni oyoqlaridan ushlab
            qoldi.
          </p>

          <h2>Xato qanday yuzaga keldi?</h2>
          <p>
            Voqeadan biroz oldin kabina oynasi texnik xizmat uchun
            almashtirilgan edi. Oynani mahkamlovchi 90 vintdan{" "}
            <strong>84 tasi to&apos;g&apos;ri diametrdan 0,66 mm
            ingichkaroq edi</strong> (xato standart: A211-8C o&apos;rniga
            A211-8D); qolgan 6 ta vint esa to&apos;g&apos;ri
            diametrda edi, lekin 2,5 mm qisqaroq edi. Texnik xodim
            to&apos;g&apos;ri vintni hujjatlar yoki qism raqamidan
            tekshirish o&apos;rniga{" "}
            <strong>ko&apos;z bilan solishtirib</strong> tanlagan edi —
            vintlar deyarli bir xil ko&apos;rinardi, lekin kichik
            o&apos;lcham farqi oynaning kabina bosimiga qarshi ushlab
            turish kuchini jiddiy zaiflashtirdi.
          </p>

          <div className="disaster-pullquote">
            &quot;0,66 millimetr — qalam uchining qalinligidan ham
            ingichka farq — kabina oynasining minglab metr balandlikda
            joyidan uchib chiqishiga yetarli bo&apos;ldi.&quot;
          </div>

          <h2>Kapitan qanday omon qoldi?</h2>
          <p>
            Bort provodnigi Nigel Ogden kapitanni oyoqlaridan mahkam
            ushladi va samolyot favqulodda qo&apos;nish uchun pasayib
            borayotganda uni qo&apos;yib yubormadi — sovuq shamol va
            past haroratda taxminan 20 daqiqa chidadi. Ikkinchi
            uchuvchi samolyotni xavfsiz Sauthempton aeroportiga
            qo&apos;ndirdi. Kapitan Lancaster singan suyaklar va
            sovuqdan shikastlanish oldi, lekin to&apos;liq tuzaldi va
            bir necha oy ichida yana uchishni boshladi.
          </p>

          <h2>Bu bizga nimani o&apos;rgatadi?</h2>
          <p>
            Bu voqea, o&apos;lchov xatosi albatta turli birlik
            tizimlaridan (metrik/imperial) kelib chiqishi shart
            emasligini, bir xil birlik ichida ham &quot;taxminan
            to&apos;g&apos;ri&quot; o&apos;lcham yetarli
            bo&apos;lmasligi mumkinligini ko&apos;rsatadi. Muhim
            qismning o&apos;lchamini ko&apos;z bilan emas, rasmiy
            hujjat (qism raqami, texnik chizma) bilan tekshirish,
            aviatsiyada bu voqeadan keyin ancha qattiq qoidaga
            aylandi.
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
            Britaniya havo baxtsiz hodisalarini tekshirish kengashi
            (AAIB) hisobotiga asoslangan keng tarqalgan, tasdiqlangan
            aviatsiya tarixi hikoyalariga asoslangan.
          </p>
        </section>
      </div>
    </main>
  );
}
