import type { Metadata } from "next";
import Link from "next/link";
import WeightBalanceCalculatorUz from "../../components/calculators/WeightBalanceCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/ogirlik-muvozanat-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Og'irlik markazi (CG) qanday hisoblanadi?",
    answer:
      "Har bir bandning momenti (og'irlik × yelka) topiladi, barcha momentlar qo'shiladi va jami og'irlikka bo'linadi: CG = Jami Moment / Jami Og'irlik. Yelka (arm), vositaning bosh nuqtasiga (datum) bo'lgan masofadir.",
  },
  {
    question: "Bu vosita samolyotimning CG chegaralarini biladimi?",
    answer:
      "Yo'q. Har bir vositaning bo'sh og'irligi va yelka qiymatlari, ro'yxatga olish raqamiga (tail number) xos jihozlanishga qarab o'zgaradi — shuning uchun bu vosita hech qaysi samolyotga xos ma'lumotni taxmin qilmaydi, faqat siz kiritgan sonlar bilan matematikani bajaradi. Hisoblangan CG'ning xavfsiz oraliqda ekanligini har doim o'z vositangizning POH/AFM hujjatidagi CG zarfi bilan solishtirishingiz kerak.",
  },
];

export const metadata: Metadata = {
  title: "Og'irlik va Muvozanat Hisoblash (Weight and Balance)",
  description:
    "Yuk bandlarining og'irligini va yelkasini (arm) kiriting; jami og'irlikni, jami momentni va og'irlik markazini (CG) hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/agirlik-denge-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/agirlik-denge-hesaplama",
    },
  },
  openGraph: {
    title: "Og'irlik va Muvozanat Hisoblash (Weight and Balance)",
    description:
      "Yuk bandlaridan jami og'irlikni va og'irlik markazini (CG) hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekWeightBalanceCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Og'irlik va Muvozanat Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Og&apos;irlik va Muvozanat Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Og&apos;irlik va Muvozanat Hisoblash</h1>
          <p>
            Har bir yuk bandining (bo&apos;sh vosita, yo&apos;lovchi,
            yuk, yoqilg&apos;i) og&apos;irligini va yelkasini (bosh
            nuqtasiga masofasi) kiriting: jami og&apos;irlikni, jami
            momentni va og&apos;irlik markazini (CG) darhol hisoblang.
          </p>
        </header>

        <WeightBalanceCalculatorUz />

        <section className="category-article-content">
          <h2>Og&apos;irlik markazi (CG) qanday hisoblanadi?</h2>
          <p>
            Har bir bandning momenti topiladi:{" "}
            <strong>Moment = Og&apos;irlik × Yelka (Arm)</strong>.
            Barcha bandlarning og&apos;irliklari va momentlari alohida
            qo&apos;shiladi, so&apos;ng og&apos;irlik markazi
            topiladi: <strong>CG = Jami Moment / Jami
            Og&apos;irlik</strong>. Yelka (arm), vositaning ishlab
            chiqaruvchisi belgilagan bosh nuqtasiga (datum) bo&apos;lgan
            masofadir va POH/AFM hujjatida band boshiga beriladi.
          </p>
          <p>
            <strong>Yoqilg&apos;i zichligi ma&apos;lumotnomasi:</strong>{" "}
            Avgas (100LL) taxminan 0,72 kg/L (6 lb/US gallon), reaktiv
            yoqilg&apos;i (Jet A-1) taxminan 0,80-0,82 kg/L (6,7-6,8
            lb/US gallon) zichlikka ega — yoqilg&apos;i og&apos;irligini
            hajmdan hisoblashda bu qiymatlardan foydalanishingiz
            mumkin. Aniq qiymat haroratga qarab biroz o&apos;zgaradi.
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
            Uchish rejalashtirish uchun{" "}
            <Link href="/uz/pasayish-tezligi-hisoblash">Pasayish Tezligi Hisoblash</Link>,{" "}
            <Link href="/uz/yon-shamol-hisoblash">Yon Shamol Hisoblash</Link>,{" "}
            <Link href="/uz/zichlik-balandligi-hisoblash">Zichlik Balandligi Hisoblash</Link>{" "}
            sahifalariga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Moment/CG formulasi uchish ta&apos;limida standart
            ishlatiladigan asosiy og&apos;irlik va muvozanat hisobiga
            asoslangan. Bu vosita umumiy ma&apos;lumot va dastlabki
            tayyorgarlik maqsadida; haqiqiy uchish qarori uchun
            vositangizning o&apos;z POH/AFM hujjati asos qilib
            olinishi kerak.
          </p>
        </section>
      </div>
    </main>
  );
}
