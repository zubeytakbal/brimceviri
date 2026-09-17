import type { Metadata } from "next";
import Link from "next/link";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { buildSiteUrl } from "../../../siteConfig";

const pagePath = "/uz/birlik-aylantirish-fojialari/vasa-gemisi";

const faqItems: FaqItem[] = [
  {
    question: "Vasa kemasi nega cho'kib ketdi?",
    answer:
      "Vasaning asosiy cho'kish sababi, yuqori palubalarga qo'yilgan ko'plab og'ir to'plar va haykallar kemani tepadan og'ir va beqaror qilib qo'ygani edi. O'lchov birligi chalkashligi bu beqarorlikka hissa qo'shgan omillardan biri edi, lekin yagona sabab emas edi.",
  },
  {
    question: "O'lchov birligi chalkashligi qanday ta'sir qildi?",
    answer:
      "Kema korpusini qurgan duradgorlarning ba'zilari Shvetsiya futidan (12 dyuym), ba'zilari esa Amsterdam futidan (11 dyuym) foydalandi. Bu kemaning ikki tomoni assimetrik bo'lishiga, og'irlikning bir tomonga (chap tomonga) og'ishiga sabab bo'ldi.",
  },
  {
    question: "Kema qancha vaqtda cho'kdi?",
    answer:
      "Vasa 1628-yil 10-avgustda birinchi safariga chiqdi va portdan atigi 1300 metrcha uzoqlashganida yengil shamol esintisi bilan yonboshga ag'darildi. Ochiq to'p teshiklaridan suv kira boshladi va kema taxminan 20 daqiqa ichida cho'kdi.",
  },
  {
    question: "Vasa hozir qayerda?",
    answer:
      "Kema 1961-yilda Stokgolm portidan chiqarildi va katta qismi asl holida saqlanib qolgan. Bugun Stokgolmdagi Vasa muzeyida namoyish etiladi va dunyoning eng ko'p tashrif buyuriladigan dengiz muzeylaridan biri.",
  },
];

export const metadata: Metadata = {
  title: "Vasa Kemasi: Ikki Xil 'Fut' O'lchovi Bilan Qurilgan Jang Kemasi",
  description:
    "Shvetsiyaning faxri Vasa jang kemasi, duradgorlar bir tomonda Shvetsiya futini, ikkinchi tomonda Amsterdam futini ishlatgani uchun assimetrik chiqdi va birinchi safarida cho'kib ketdi.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/birim-cevirme-felaketleri/vasa-gemisi",
      "uz-UZ": pagePath,
      "x-default": "/birim-cevirme-felaketleri/vasa-gemisi",
    },
  },
  openGraph: {
    title: "Vasa Kemasi: Ikki Xil 'Fut' O'lchovi Bilan Qurilgan Jang Kemasi",
    description: "Duradgorlarning ikki xil 'fut' o'lchovidan foydalanishi kemaning assimetrik chiqishiga hissa qo'shdi.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekVasaShipPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Birlik Aylantirishdagi Xatolar", item: buildSiteUrl("/uz/birlik-aylantirish-fojialari") },
      { "@type": "ListItem", position: 3, name: "Vasa Kemasi", item: buildSiteUrl(pagePath) },
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
          <span>Vasa Kemasi</span>
        </nav>

        <header className="all-conversions-header">
          <div className="disaster-hero-meta">
            <span className="disaster-category-badge">Dengizchilik</span>
            <span className="disaster-year-badge">10-avgust 1628</span>
          </div>
          <h1>Vasa Kemasi: Ikki Xil &apos;Fut&apos; O&apos;lchovi Bilan Qurilgan Jang Kemasi</h1>
          <p>
            Shvetsiyaning faxri Vasa jang kemasi, korpusning bir
            tomoni Shvetsiya futi, ikkinchi tomoni Amsterdam futi
            bilan qurilgani uchun assimetrik chiqdi va birinchi
            safarida portda cho&apos;kib ketdi.
          </p>
        </header>

        <section className="category-article-content">
          <div className="disaster-fact-grid">
            <div>
              <span>Joylashuvi</span>
              <strong>Stokgolm Porti</strong>
            </div>
            <div>
              <span>Cho&apos;kish Vaqti</span>
              <strong>~20 daqiqa</strong>
            </div>
            <div>
              <span>Hissa Qo&apos;shgan Sabab</span>
              <strong>Shvetsiya/Amsterdam futi chalkashligi</strong>
            </div>
            <div>
              <span>Bugun</span>
              <strong>Vasa Muzeyi, Stokgolm</strong>
            </div>
          </div>

          <h2>Nima bo&apos;ldi?</h2>
          <p>
            Vasa, o&apos;z davrining eng kuchli va ko&apos;rkam jang
            kemalaridan biri bo&apos;lish uchun qurilgan 64 to&apos;pli
            Shvetsiya jang kemasi edi. 1628-yil 10-avgustda, Stokgolm
            portida katta olomon oldida birinchi safariga chiqdi.
            Ammo portdan atigi 1300 metrcha uzoqlashganida yengil
            shamol esintisi bilan yonboshga ag&apos;darildi, ochiq
            to&apos;p teshiklaridan ichkariga suv kirdi va kema
            taxminan 20 daqiqa ichida cho&apos;kdi.
          </p>

          <h2>O&apos;lchov birligi chalkashligining roli nima edi?</h2>
          <p>
            Arxeologlar kema qoldiqlarini o&apos;rganayotganda
            korpusni qurgan duradgorlarning to&apos;rt xil chizg&apos;ich
            ishlatganini aniqladilar: ikkitasi{" "}
            <strong>Shvetsiya futi</strong> (12 dyuym) birligida,
            qolgan ikkitasi esa <strong>Amsterdam futi</strong> (11
            dyuym) birligida edi. Har bir duradgor o&apos;z
            chizg&apos;ichi bilan ishlagani uchun, kemaning korpusi
            ikki tomonda turli o&apos;lchamlarda shakllandi — bu esa
            og&apos;irlikning bir tomonga (chap tomonga) og&apos;ishiga
            va korpusning assimetrik bo&apos;lishiga hissa qo&apos;shdi.
          </p>

          <div className="disaster-pullquote">
            &quot;O&apos;lchov birligi chalkashligi cho&apos;kishning
            yagona sababi emas edi — lekin allaqachon beqaror
            bo&apos;lgan kemani yanada zaifroq qilgan sokin
            omil edi.&quot;
          </div>

          <h2>Asosiy sabab nima edi?</h2>
          <p>
            Kemaning asosiy muammosi loyihasi edi: podshohning
            iltimosiga ko&apos;ra yuqori palubalarga ko&apos;plab
            og&apos;ir to&apos;plar va bezak maqsadidagi og&apos;ir
            haykallar qo&apos;shildi, bu esa kemaning og&apos;irlik
            markazini xavfli darajada ko&apos;tardi. Yetarli ballast
            (muvozanat og&apos;irligi) bo&apos;lmasdan bunchalik
            yuqori-og&apos;ir kema, yengil shamolda ham osongina
            ag&apos;darilishga moyil edi. O&apos;lchov birligi
            chalkashligidan kelib chiqqan assimetriya, bu allaqachon
            beqaror muvozanatni yanada yomonlashtirgan qo&apos;shimcha
            omil edi — asosiy sabab emas, lekin e&apos;tiborsiz
            qoldirib bo&apos;lmaydigan hissa.
          </p>

          <h2>Bu bizga nimani o&apos;rgatadi?</h2>
          <p>
            Vasa namunasi, bitta loyihada turli o&apos;lchov
            standartlarining bir vaqtda ishlatilishi, yagona
            o&apos;zi fojiaga olib kelmasa ham, mavjud xavflarni
            qanday kattalashtirishi mumkinligini ko&apos;rsatadi.
            17-asrda Yevropada hali standart o&apos;lchov birligi
            tizimi yo&apos;q edi — bu metrik tizimning butun dunyoda
            qabul qilinishi nega bunchalik muhim ekanligini eslatuvchi
            tarixiy namuna.
          </p>

          <p className="category-inline-link">
            Tegishli sahifa:{" "}
            <Link href="/uz/tarixiy-olchov-birliklari">
              Tarixiy O&apos;lchov Birliklari
            </Link>{" "}
            — standartgacha bo&apos;lgan davrda ishlatilgan turli
            o&apos;lchov tizimlarini kashf eting.
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
            Bu sahifadagi ma&apos;lumotlar Vasa Muzeyining arxeologik
            topilmalari va kemaning qurilishi bo&apos;yicha o&apos;tkazilgan
            tarixiy muhandislik tekshiruvlariga asoslangan.
          </p>
        </section>
      </div>
    </main>
  );
}
