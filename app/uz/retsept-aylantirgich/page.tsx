import type { Metadata } from "next";
import Link from "next/link";
import RecipeScalerConverter from "../../components/RecipeScalerConverter";
import { buildFullLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/retsept-aylantirgich";

export const metadata: Metadata = {
  title: "Retsept Aylantirgich: Retseptni Miqyoslang, Stakanni Grammga O'girang",
  description:
    "Retseptingizni joylashtiring, koeffitsientni tanlang: barcha mahsulot miqdorlari darhol miqyoslanadi. Tanilgan mahsulotlarda stakan/qoshiq o'lchovlari avtomatik gramga o'giriladi.",
  alternates: {
    canonical: pagePath,
    ...buildFullLanguageAlternates(pagePath),
  },
  openGraph: {
    title: "Retsept Aylantirgich: Retseptni Miqyoslang, Stakanni Grammga O'girang",
    description:
      "Retseptingizni joylashtiring, porsiyani 2 baravar oshiring yoki yarmiga tushiring; mahsulot miqdorlari va mumkin bo'lganda gramm ekvivalenti avtomatik hisoblanadi.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

export default function UzbekRecipeScalerPage() {
  return (
    <main className="all-conversions-page" lang="uz">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sahifa yo'li">
          <Link href="/uz">Bosh sahifa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Retsept Aylantirgich</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Retsept Aylantirgich</h1>

          <p>
            Retseptingizni quyiga, har bir mahsulot alohida qatorda
            bo&apos;ladigan qilib joylashtiring (masalan, &quot;2 stakan
            un&quot;). Bir koeffitsient tanlang, barcha miqdorlar darhol
            miqyoslanadi; stakan, osh qoshiq yoki choy qoshiq bilan yozilgan
            va{" "}
            <Link href="/uz/oshxona-olchovlari">
              oshxona o&apos;lchovlari jadvalida
            </Link>{" "}
            mavjud mahsulotlarda gramm ekvivalenti ham avtomatik
            ko&apos;rsatiladi.
          </p>
        </header>

        <RecipeScalerConverter locale="uz" />

        <section className="category-article-content">
          <h2>Retsept qanday 2 baravar oshiriladi?</h2>
          <p>
            Har bir qatorning boshidagi miqdorni koeffitsientga
            ko&apos;paytirish kifoya: 2 kishilik retseptni 4 kishilik
            qilish uchun barcha miqdorlarni 2 ga ko&apos;paytirasiz. Bu
            vosita buni siz uchun avtomatik bajaradi — retseptni
            joylashtiring, koeffitsientni (0,5x, 1,5x, 2x, 3x yoki
            o&apos;z sonini) tanlang, natijani darhol ko&apos;ring.
          </p>
          <p>
            Raqam bilan boshlanadigan deyarli har qanday qator (butun son,
            vergulli qiymat, &quot;1/2&quot; kabi kasr, yoki
            &quot;yarim&quot; va &quot;chorak&quot; kabi so&apos;zlar)
            tanib olinadi va mahsulot nomi qanday bo&apos;lishidan
            qat&apos;i nazar to&apos;g&apos;ri miqyoslanadi.
          </p>

          <h2>Nega ba&apos;zi qatorlarda gramm ekvivalenti ko&apos;rinmaydi?</h2>
          <p>
            Gramm ekvivalenti faqat ham birlik (stakan, osh qoshiq, choy
            qoshiq, gramm, ml, litr), ham mahsulot nomi tanilganda
            hisoblanadi. &quot;2 dona tuxum&quot; kabi dona asosidagi yoki
            ro&apos;yxatda bo&apos;lmagan mahsulotni o&apos;z ichiga olgan
            qatorlar baribir to&apos;g&apos;ri miqyoslanadi, faqat qo&apos;shimcha
            gramm ma&apos;lumoti ko&apos;rsatilmaydi. Barcha mahsulot
            ro&apos;yxatini{" "}
            <Link href="/uz/oshxona-olchovlari">
              oshxona o&apos;lchovlari aylantirgich sahifasida
            </Link>{" "}
            ko&apos;rishingiz mumkin.
          </p>
        </section>
      </div>
    </main>
  );
}
