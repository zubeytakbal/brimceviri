import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const pagePath = "/uz/birlik-aylantirish-fojialari/mars-climate-orbiter";

const faqItems: FaqItem[] = [
  {
    question: "Mars Climate Orbiter nega yo'qoldi?",
    answer:
      "Sun'iy yo'ldoshni ishlab chiqargan Lockheed Martin, tortish ma'lumotlarini pound-force-soniya (imperial birlik) da yubordi; NASA'ning Jet Propulsion Laboratory'sidagi yo'nalish topish dasturi esa bu ma'lumotni nyuton-soniya (metrik birlik) deb hisoblab ishlatdi. Ikki birlik orasida taxminan 4,45 baravar farq bo'lgani uchun sun'iy yo'ldoshning orbita hisob-kitoblari to'qqiz oylik sayohat davomida asta-sekin og'ib ketdi.",
  },
  {
    question: "Bu xato qanchaga tushdi?",
    answer:
      "Mars Climate Orbiter va u bilan birga Mars Surveyor '98 dasturining jami qiymati taxminan 327 million dollar edi. Sun'iy yo'ldosh Marsga yetib borganida rejalashtirilganidan ancha yaqinroq trayektoriyaga kirib, ehtimol parchalanib yo'q bo'lgan.",
  },
  {
    question: "Xato nega darhol aniqlanmadi?",
    answer:
      "To'qqiz oylik sayohat davomida yo'nalish topish guruhi sun'iy yo'ldoshning trayektoriyasida kichik og'ishlar borligini payqadi va bir necha marta tuzatish kiritdi. Ammo og'ishlarning haqiqiy sababi birlik nomuvofiqligi ekanligi, sun'iy yo'ldosh Marsga juda yaqinlashguncha aniqlanmadi — tuzatishlar muammoni yashirgan, hal qilmagan edi.",
  },
  {
    question: "Bunday xatolar hozir ham yuz beradimi?",
    answer:
      "Ha. Turli birlik tizimlari (metrik/imperial) bir vaqtda ishlatiladigan har qanday joyda bu xavf mavjud — muhandislik, aviatsiya, tibbiyot va logistika kabi sohalarda o'xshash chalkashliklar bugun ham yuz berishi mumkin. Shuning uchun hisob-kitob qilishda ishlatilayotgan birlikni aniq ko'rsatish va tekshirish hayotiy ahamiyatga ega.",
  },
];

export const metadata: Metadata = {
  title: "Mars Climate Orbiter: 327 Million Dollarlik Birlik Xatosi",
  description:
    "NASA'ning Mars Climate Orbiter missiyasi, bir guruh pound-force, ikkinchisi nyuton ishlatgani uchun qanday qilib 327 million dollarlik yo'qotishga aylandi? Tasdiqlangan manbalar bilan hikoya.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/birim-cevirme-felaketleri/mars-climate-orbiter",
      "uz-UZ": pagePath,
      "x-default": "/birim-cevirme-felaketleri/mars-climate-orbiter",
    },
  },
  openGraph: {
    title: "Mars Climate Orbiter: 327 Million Dollarlik Birlik Xatosi",
    description: "Bir guruh pound-force, ikkinchisi nyuton ishlatdi — natijada 327 million dollarlik sun'iy yo'ldosh yo'qoldi.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekMarsClimateOrbiterPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Birlik Aylantirishdagi Xatolar", item: buildSiteUrl("/uz/birlik-aylantirish-fojialari") },
      { "@type": "ListItem", position: 3, name: "Mars Climate Orbiter", item: buildSiteUrl(pagePath) },
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
          <span>Mars Climate Orbiter</span>
        </nav>

        <header className="all-conversions-header">
          <div className="disaster-hero-meta">
            <span className="disaster-category-badge">Kosmos</span>
            <span className="disaster-year-badge">23-sentyabr 1999</span>
          </div>
          <h1>Mars Climate Orbiter: 327 Million Dollarlik Birlik Xatosi</h1>
          <p>
            NASA&apos;ning Marsga yuborgan sun&apos;iy yo&apos;ldoshi,
            bitta guruhning pound-force, ikkinchisining nyuton
            ishlatishi tufayli orbitadan chiqib, sayyora atmosferasida
            parchalanib ketdi.
          </p>
        </header>

        <section className="category-article-content">
          <div className="disaster-fact-grid">
            <div>
              <span>Uchirish</span>
              <strong>11-dekabr 1998</strong>
            </div>
            <div>
              <span>Yo&apos;qotish</span>
              <strong>23-sentyabr 1999</strong>
            </div>
            <div>
              <span>Jami Qiymat</span>
              <strong>~327 million $</strong>
            </div>
            <div>
              <span>Sabab</span>
              <strong>lbf·s / N·s chalkashligi</strong>
            </div>
          </div>

          <h2>Nima bo&apos;ldi?</h2>
          <p>
            Mars Climate Orbiter, Marsning iqlimi va atmosferasini
            o&apos;rganish uchun NASA&apos;ning Mars Surveyor &apos;98
            dasturi doirasida 1998-yil 11-dekabrda uchirildi. To&apos;qqiz
            oylik sayohatdan so&apos;ng, 1999-yil 23-sentyabrda Mars
            orbitasiga kirish manevrini boshladi — va bir daqiqa ham
            undan xabar kelmadi. Tekshiruvlar sun&apos;iy yo&apos;ldosh
            rejalashtirilganidan ancha past trayektoriyaga kirganini,
            ehtimol atmosferada parchalangan yoki qaytib kosmosga
            uchib ketganini ko&apos;rsatdi.
          </p>

          <h2>Xato qanday yuzaga keldi?</h2>
          <p>
            Sun&apos;iy yo&apos;ldoshni ishlab chiqargan Lockheed
            Martin&apos;dagi tortish guruhi, kichik orbita tuzatish
            manevrlari uchun kerakli tortish kuchini{" "}
            <strong>pound-force-soniya (lbf·s)</strong> — ya&apos;ni
            imperial birlik tizimida — hisoblab dasturga kiritdi.
            Ammo NASA&apos;ning Jet Propulsion Laboratory&apos;sidagi
            (JPL) yo&apos;nalish topish dasturi bu ma&apos;lumotni{" "}
            <strong>nyuton-soniya (N·s)</strong> — ya&apos;ni metrik
            birlik tizimida — deb hisoblab ishlatdi. 1 pound-force
            taxminan 4,45 nyutonga teng bo&apos;lgani uchun, har bir
            kichik tuzatish aslida kerakligidan taxminan 4,45 baravar
            kuchliroq qo&apos;llanilgan edi.
          </p>

          <div className="disaster-pullquote">
            &quot;Ikkala guruh ham o&apos;z hisob-kitobida haq edi —
            muammo shundaki, ular orasidagi interfeys qaysi birlik
            ishlatilayotganini hech qachon tekshirmagan edi.&quot;
          </div>

          <h2>Xato nega darhol aniqlanmadi?</h2>
          <p>
            To&apos;qqiz oylik sayohat davomida yo&apos;nalish topish
            guruhi sun&apos;iy yo&apos;ldoshning kutilganidan boshqacha
            trayektoriyada harakatlanayotganini payqadi va bir necha
            marta kichik tuzatishlar kiritdi. Ammo bu tuzatishlar
            muammoning manbasini hal qilish o&apos;rniga belgilarini
            bostirdi — asosiy sabab, sun&apos;iy yo&apos;ldosh Marsga
            xavfli darajada yaqinlashguncha aniqlanmadi. Natijada
            sun&apos;iy yo&apos;ldosh rejalashtirilgan ~150-226 km
            o&apos;rniga ancha pastroq balandlikdan o&apos;tib,
            atmosfera qarshiligiga duch keldi.
          </p>

          <h2>Bu bizga nimani o&apos;rgatadi?</h2>
          <p>
            Bu voqea birlik aylantirish nafaqat maktab matematikasi
            mavzusi, balki haqiqiy muhandislik loyihalarida hayotiy
            ahamiyatga ega nazorat nuqtasi ekanligini ko&apos;rsatadi.
            Ikki tizim yoki guruh o&apos;rtasida ma&apos;lumot
            almashiladigan har bir nuqtada ishlatilayotgan birlik
            aniq ko&apos;rsatilishi va tekshirilishi kerak — aks holda
            har ikki tomon ham o&apos;z hisobida haq bo&apos;lsa ham,
            natija butunlay noto&apos;g&apos;ri chiqishi mumkin. NASA
            bu voqeadan so&apos;ng dastur interfeyslarida birlikni
            tekshirishni majburiy qiladigan jarayonlar ishlab chiqdi.
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
            Bu sahifadagi ma&apos;lumotlar NASA Jet Propulsion
            Laboratory&apos;sining rasmiy Mars Climate Orbiter arxivi
            va voqea haqida e&apos;lon qilingan muhandislik
            tekshiruvlariga asoslangan.
          </p>
        </section>
      </div>
    </main>
  );
}
