import type { Metadata } from "next";
import Link from "next/link";
import RingSizeConverter from "../../components/RingSizeConverter";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/uzuk-olcami-aylantirgich";

export const metadata: Metadata = {
  title: "Uzuk O'lchami Aylantirgich: mm, US va UK O'lcham Jadvali",
  description:
    "Uzuk o'lchamlarini diametr (mm), Yevropa aylanasi (mm), AQSH (US) va Angliya (UK) tizimlari orasida aylantiring. Standart xalqaro zargarlik o'lcham jadvalini ko'ring.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/yuzuk-olcusu-cevirici",
      "uz-UZ": pagePath,
      "x-default": "/yuzuk-olcusu-cevirici",
    },
  },
  openGraph: {
    title: "Uzuk O'lchami Aylantirgich: mm, US va UK O'lcham Jadvali",
    description: "Uzuk o'lchamlarini diametr, aylana, US va UK tizimlari orasida aylantiring.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

export default function UzbekRingSizePage() {
  return (
    <main className="all-conversions-page" lang="uz">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sahifa yo'li">
          <Link href="/uz">Bosh sahifa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Uzuk O&apos;lchami Aylantirgich</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Uzuk O&apos;lchami Aylantirgich</h1>

          <p>
            Bilgan uzuk o&apos;lchamingizni kiriting va diametr (mm),
            Yevropa aylanasi (mm), AQSH (US) va Angliya (UK)
            ekvivalentlarini darhol ko&apos;ring. Poyabzal
            o&apos;lchamlaridan farqli o&apos;laroq, uzuk o&apos;lchami
            brendga qarab farq qilmaydi — zargarlik sohasi butun
            dunyoda bitta standart jadvaldan foydalanadi.
          </p>
        </header>

        <RingSizeConverter locale="uz" />

        <section className="category-article-content">
          <h2>Uzuk o&apos;lchami qanday aniqlanadi?</h2>
          <p>
            Uzuk o&apos;lchami eng ishonchli tarzda uzukning ichki
            diametri (millimetrda) sifatida ifodalanadi. Yevropa
            tizimi to&apos;g&apos;ridan-to&apos;g&apos;ri ichki
            aylanadan foydalanadi — diametr va aylana oddiy
            geometriya bilan bog&apos;langan (aylana = diametr × π),
            shuning uchun ular orasidagi aylantirish har doim aniq.
            AQSH va Angliya tizimlari o&apos;zining raqamli va
            harfli shkalasidan foydalanadi; bu jadval standart
            xalqaro zargarlik o&apos;lcham manbasidan tuzilgan.
          </p>
          <p>
            Eng aniq natija uchun sizga mos keladigan uzukning ichki
            diametrini lineyka bilan o&apos;lchang va &quot;Diametr
            (mm)&quot; ostidan eng yaqin qiymatni tanlang.
          </p>
        </section>
      </div>
    </main>
  );
}
