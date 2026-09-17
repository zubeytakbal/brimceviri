import type { Metadata } from "next";
import Link from "next/link";
import AttendanceCalculatorUz from "../../components/calculators/AttendanceCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/davomat-hisoblash";

const faqItems: FaqItem[] = [
  {
    question: "Davomatsizlik uchun sobit, yagona bir qoida bormi?",
    answer:
      "Yo'q. Barcha maktab va universitetlar uchun amal qiladigan yagona sobit davomatsizlik soni yo'q — har bir maktab, har bir universitet, hatto ba'zan har bir fan o'z nizomiga qarab boshqa chegara qo'llaydi. Quyidagi 10 kun, %30 kabi raqamlar tez-tez uchraydigan misollar, rasmiy/universal qoida emas. O'z chegarangizni maktabingiz, universitetingiz nizomi yoki fan o'qituvchisidan bilib, bu vositaga kiritishingiz kerak.",
  },
  {
    question: "Maktabda davomatsizlik chegarasi necha kun?",
    answer:
      "Davomatsizlik chegarasi maktab turiga va muassasaga qarab o'zgaradi; ko'plab boshlang'ich/o'rta maktablarda uzrsiz davomatsizlik chegarasi 10 kun, uzrli+uzrsiz jami chegara esa odatda 30 kungacha yetishi mumkin. Aniq son uchun maktabingiz bildirgan yoki nizomida ko'rsatilgan raqamdan foydalaning — bu vosita sizga ma'lum bo'lgan kunlarni kiritib qolgan huquqingizni hisoblashga yordam beradi.",
  },
  {
    question: "Universitetda davomatsizlik %30 qoidasi nima?",
    answer:
      "Ko'pchilik universitetlarda nazariy darslarda davomatsizlik chegarasi jami dars soatining %30'i, amaliy/laboratoriya darslarida esa odatda %20'sidir; lekin bu nisbatlar universitetdan universitetga va fan nizomiga qarab o'zgarishi mumkin. Bu vosita darsning jami soatini va sinfingiz qo'llaydigan foizni kiritib, necha soat davomatsizlik huquqingiz qolganini ko'rsatadi.",
  },
  {
    question: "Davomatsizlik chegarasidan oshib ketsam nima bo'ladi?",
    answer:
      "Davomatsizlik chegarasidan oshgan talabalar odatda o'sha fandan/semestrdan muvaffaqiyatsiz hisoblanadi (universitetda 'davomatsiz' bahosi, maktabda esa sinfni takrorlash yoki yil oxiri baholashga kiritilmaslik kabi natijalar bo'lishi mumkin). Aniq natija muassasangiz nizomiga qarab o'zgaradi; chegaradan oshishdan oldin talabalar bo'limi yoki maslahat xizmatiga murojaat qilishingiz tavsiya etiladi.",
  },
  {
    question: "Tibbiy ma'lumotnoma bilan davomatsizlik, davomatsizlik chegarasiga kiradimi?",
    answer:
      "Bu odatda muassasaga qarab o'zgaradi: ba'zi maktab va universitetlarda tibbiy ma'lumotnoma bilan tasdiqlangan davomatsizlik alohida kvotaga kiritiladi, ba'zilarida esa jami davomatsizlik chegarasiga qo'shiladi. Bu vositada 'ishlatilgan davomatsizlik' maydoniga, muassasangiz qoidalariga ko'ra hisoblanadigan kun/soatni kiritishingiz kerak.",
  },
];

export const metadata: Metadata = {
  title: "Davomatni Hisoblash: Qolgan Davomatsizlik Huquqingizni Biling",
  description:
    "Maktab (kun asosida) yoki universitet (foiz/soat asosida) davomatsizlik chegarasiga qarab qolgan davomatsizlik huquqingizni va foydalanish nisbatingizni darhol hisoblang.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/devamsizlik-hesaplama",
      "uz-UZ": pagePath,
      "x-default": "/devamsizlik-hesaplama",
    },
  },
  openGraph: {
    title: "Davomatni Hisoblash",
    description: "Qolgan davomatsizlik huquqingizni va foydalanish nisbatingizni hisoblang.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function UzbekAttendanceCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Davomatni Hisoblash", item: buildSiteUrl(pagePath) },
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
          <span>Davomatni Hisoblash</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Davomatni Hisoblash</h1>
          <p>
            Maktab (kun asosida) yoki universitet (foiz/soat asosida)
            davomatsizlik chegarasiga qarab qolgan davomatsizlik
            huquqingizni va foydalanish nisbatingizni darhol
            hisoblang.
          </p>
        </header>

        <AttendanceCalculatorUz />

        <section className="category-article-content">
          <h2>Kun asosidami, foiz asosidami?</h2>
          <p>
            Boshlang&apos;ich, o&apos;rta maktab va litseyda
            davomatsizlik odatda <strong>kun</strong> bo&apos;yicha
            hisoblanadi — o&apos;quv yili davomida ruxsat etilgan jami
            uzrsiz/uzrli kunlar soni maktab tomonidan bildiriladi.
            Universitetda esa davomatsizlik odatda fanning jami{" "}
            <strong>dars soatining bir foizi</strong> sifatida
            hisoblanadi (masalan nazariy darsda %30, amaliy darsda
            %20 kabi). Bu vosita ikkala hisoblash shaklini ham
            qo&apos;llab-quvvatlaydi.
          </p>

          <h2>Qolgan huquq qanday hisoblanadi?</h2>
          <p>
            Kun asosidagi rejimda: qolgan huquq = ruxsat etilgan
            davomatsizlik kuni − ishlatilgan davomatsizlik kuni. Foiz
            asosidagi rejimda: avval ruxsat etilgan jami soat, jami
            dars soati × ruxsat etilgan foiz / 100 formulasi bilan
            topiladi; keyin qolgan huquq, bu jamidan ishlatilgan
            davomatsizlik soati ayirilib hisoblanadi. Natija manfiy
            bo&apos;lsa, davomatsizlik chegarasi oshib ketgan degani.
          </p>

          <h2>Davomatsizlik qoidalari nega muassasaga qarab o&apos;zgaradi?</h2>
          <p>
            Davomatsizlik chegaralari; boshlang&apos;ich-o&apos;rta
            maktab-litsey uchun tegishli ta&apos;lim nizomlariga,
            universitetlarda esa har bir universitet va hatto ba&apos;zan
            har bir fanning o&apos;z o&apos;quv va imtihon nizomiga
            qarab belgilanadi. Shu sababli bu vosita sobit bir qoida
            taxmin qilish o&apos;rniga sizga ma&apos;lum bo&apos;lgan
            chegaralarni kiritishingizni so&apos;raydi — shunday qilib
            natija muassasangizning haqiqiy qoidasiga mos chiqadi.
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
            Baho/harf bahosi hisoblash uchun{" "}
            <Link href="/uz/harf-bahosi-hisoblash">Harf Bahosini Hisoblash</Link>{" "}
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Davomatsizlik chegaralariga oid umumiy nisbatlar (uzrsiz
            10 kun, nazariy darsda %30 kabi), maktab va universitetlar
            keng qo&apos;llaydigan namunaviy nizom qiymatlariga
            asoslangan; aniq va dolzarb qoida uchun muassasangizning
            o&apos;z nizomini asos qilishingiz kerak.
          </p>
        </section>
      </div>
    </main>
  );
}
