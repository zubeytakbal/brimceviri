import type { Metadata } from "next";
import Link from "next/link";
import ShoeSizeConverter from "../../components/ShoeSizeConverter";
import { buildFullLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/oyoq-kiyim-olchami";

export const metadata: Metadata = {
  title: "Oyoq Kiyim O'lchami Aylantirgich: Yevropa, AQSH, Angliya Jadvali",
  description:
    "Oyoq kiyim o'lchamini Yevropa (EU), AQSH va Angliya tizimlari o'rtasida aylantiring. Nike, Adidas, Puma, New Balance va Converse uchun brend asosidagi o'lcham jadvallari.",
  alternates: {
    canonical: pagePath,
    ...buildFullLanguageAlternates(pagePath),
  },
  openGraph: {
    title: "Oyoq Kiyim O'lchami Aylantirgich: Yevropa, AQSH, Angliya Jadvali",
    description:
      "Oyoq kiyim o'lchamini Yevropa (EU), AQSH va Angliya tizimlari o'rtasida aylantiring; Nike, Adidas, Puma, New Balance va Converse jadvallarini ko'ring.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

export default function UzbekShoeSizePage() {
  return (
    <main className="all-conversions-page" lang="uz">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sahifa yo'li">
          <Link href="/uz">Bosh sahifa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Oyoq Kiyim O&apos;lchami Aylantirgich</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Oyoq Kiyim O&apos;lchami Aylantirgich</h1>

          <p>
            Bilgan o&apos;lchamingizni kiriting, Yevropa (EU), AQSH va
            Angliya mos kelishini darhol ko&apos;ring. Erkaklar, ayollar,
            chaqaloq va katta bolalar uchun alohida jadvallar; Nike,
            Adidas, Puma, New Balance va Converse uchun brend asosidagi
            o&apos;lchamlash mavjud.
          </p>
        </header>

        <ShoeSizeConverter locale="uz" />

        <section className="category-article-content">
          <h2>Oyoq kiyim o&apos;lchami nega brendga qarab o&apos;zgaradi?</h2>
          <p>
            O&apos;zbekistonda ishlatiladigan o&apos;lcham Yevropa (EU)
            tizimi bilan bir xil. Lekin AQSH va Angliya o&apos;lchamlari
            boshqa mezonga asoslangan, bundan tashqari brendlar o&apos;z
            qoliplariga qarab kichik farqlar qo&apos;llaydi; shuning uchun
            bir xil oyoq uzunligi bir brendda 42, boshqasida 42,5 deb
            belgilanishi mumkin. Bu yerdagi jadvallar brendlarning rasmiy
            o&apos;lchov qo&apos;llanmalaridan tuzilgan; eng aniq natija
            uchun oyog&apos;ingizni sm da o&apos;lchab &quot;Oyoq
            Uzunligi&quot; maydonidan tanlashni tavsiya qilamiz.
          </p>
          <p>
            Bolalar oyoq kiyimida AQSH o&apos;lchami 13,5 dan keyin
            1 dan qayta boshlanadi (chaqaloq/kichik boladan katta bolaga
            o&apos;tish); shuning uchun chaqaloq va katta bola uchun
            alohida ikkita jadval ishlatiladi.
          </p>
        </section>
      </div>
    </main>
  );
}
