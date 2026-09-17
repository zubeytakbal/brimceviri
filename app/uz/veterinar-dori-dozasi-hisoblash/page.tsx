import type { Metadata } from "next";
import Link from "next/link";
import VetDoseCalculatorUz from "../../components/calculators/VetDoseCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/veterinar-dori-dozasi-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Bu vosita menga to'g'ri dori dozasini aytadimi?",
    answer:
      "Yo'q. Bu vosita faqat allaqachon belgilangan mg/kg doza qiymatini, hayvonning og'irligi va dori konsentratsiyasi bilan birga qo'llaniladigan mL hajmga aylantiradi. Qaysi mg/kg dozaning mos ekanligini belgilamaydi yoki tavsiya qilmaydi — bu qiymat doriga, turga va hayvonning klinik holatiga qarab o'zgaradi va har doim veterinar shifokordan yoki rasmiy dori annotatsiyasidan olinishi kerak.",
  },
  {
    question: "Jami doza va qo'llaniladigan hajm qanday hisoblanadi?",
    answer:
      "Jami Doza (mg) = Retsept Qilingan Doza (mg/kg) × Hayvon Og'irligi (kg). Qo'llaniladigan Hajm (mL) = Jami Doza (mg) ÷ Dori Konsentratsiyasi (mg/mL).",
  },
  {
    question: "Nima uchun it/mushuk kabi turga xos namuna doza qiymatlari berilmaydi?",
    answer:
      "Bir xil dori bir turda xavfsiz, boshqa turda toksik bo'lishi mumkin (masalan ba'zi inson og'riq qoldiruvchilari mushuklarda o'lim xavfli bo'lishi mumkin). Xavfsiz doza oralig'i doriga, turga, hayvonning yoshiga va klinik holatiga xosdir va bitta umumiy jadval bilan mas'uliyatli tarzda berilmaydi. Shuning uchun bu sahifada namuna doza qiymati keltirilmagan.",
  },
];

export const metadata: Metadata = {
  title: "Veterinar Dori Dozasi va Hajmi Hisoblash (mg/kg - mL)",
  description:
    "Veterinar shifokor tomonidan retsept qilingan mg/kg dozani, hayvon og'irligi va dori konsentratsiyasi bilan birga qo'llaniladigan mL hajmga aylantiring. Doza qiymatini belgilamaydi, faqat birlik aylantirishini amalga oshiradi.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/veteriner-ilac-dozu-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/veteriner-ilac-dozu-hesaplama",
    },
  },
  openGraph: {
    title: "Veterinar Dori Dozasi va Hajmi Hisoblash (mg/kg - mL)",
    description:
      "Retsept qilingan mg/kg dozani og'irlik va konsentratsiya bilan birga mL hajmga aylantiring.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekVetDoseCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Veterinar Dori Dozasi va Hajmi Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Veterinar Dori Dozasi va Hajmi Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Veterinar Dori Dozasi va Hajmi Hisoblash</h1>
          <p>
            Allaqachon belgilangan mg/kg doza qiymatini, hayvon
            og&apos;irligi va dori konsentratsiyasi bilan birga
            qo&apos;llaniladigan mL hajmga aylantiring. Bu vosita
            doza qiymatini belgilamaydi — faqat birlik aylantirishini
            amalga oshiradi.
          </p>
        </header>

        <VetDoseCalculatorUz />

        <section className="category-article-content">
          <h2>Jami doza va hajm qanday hisoblanadi?</h2>
          <p>
            <strong>Jami Doza (mg) = Retsept Qilingan Doza (mg/kg) ×
            Hayvon Og&apos;irligi (kg)</strong>. In&apos;eksiya yoki
            og&apos;iz orqali eritma qo&apos;llashda, bu jami
            dozaning necha mL&apos;ga to&apos;g&apos;ri kelishini
            topish uchun{" "}
            <strong>Qo&apos;llaniladigan Hajm (mL) = Jami Doza (mg) ÷
            Dori Konsentratsiyasi (mg/mL)</strong> formulasi
            ishlatiladi.
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
            Formula asosiy doza-konsentratsiya arifmetikasiga
            asoslangan. Bu vosita va uning natijalari tibbiy/veterinar
            maslahat o&apos;rnini bosmaydi; qo&apos;llaniladigan
            dozani belgilamaydi.
          </p>
        </section>
      </div>
    </main>
  );
}
