import type { Metadata } from "next";
import Link from "next/link";
import KitchenMeasuresConverter from "../../components/KitchenMeasuresConverter";
import { kitchenIngredientLabels } from "../../converter/kitchenIngredientLabels";
import { kitchenIngredientRows } from "../../converter/kitchenMeasures";
import { buildFullLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/oshxona-olchovlari";

export const metadata: Metadata = {
  title: "Oshxona O'lchovlari Aylantirgich: Stakan, Qoshiq, Gramm Hisoblash",
  description:
    "1 stakan, osh qoshiq va choy qoshiqning gramm ekvivalentini mahsulotga qarab hisoblang. Un, shakar, guruch, asal va 40+ mahsulot uchun o'lchov jadvali.",
  alternates: {
    canonical: pagePath,
    ...buildFullLanguageAlternates(pagePath),
  },
  openGraph: {
    title: "Oshxona O'lchovlari Aylantirgich: Stakan, Qoshiq, Gramm Hisoblash",
    description:
      "Mahsulotga qarab stakan, osh qoshiq, choy qoshiq, gramm va millilitr o'rtasida aylantiring.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

const uzLabels = kitchenIngredientLabels.uz;

export default function UzbekKitchenMeasuresPage() {
  return (
    <main className="all-conversions-page" lang="uz">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sahifa yo'li">
          <Link href="/uz">Bosh sahifa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Oshxona O&apos;lchovlari Aylantirgich</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Oshxona O&apos;lchovlari Aylantirgich</h1>

          <p>
            Mahsulotni va bilgan o&apos;lchovingizni tanlang, stakan, osh
            qoshiq, choy qoshiq, gramm, millilitr va litr ekvivalentlarini
            darhol ko&apos;ring. Un, shakar, guruch, asal, sariyog&apos; va
            boshqa ko&apos;plab mahsulot uchun alohida hisoblangan o&apos;lchov
            qiymatlari ishlatiladi.
          </p>
        </header>

        <KitchenMeasuresConverter locale="uz" />

        <section className="category-article-content">
          <h2>
            1 stakan un necha gramm, 1 osh qoshiq shakar necha gramm keladi?
          </h2>
          <p>
            Javob mahsulotga qarab o&apos;zgaradi: 1 stakan (200 ml) un
            taxminan 130 gramm kelsa, xuddi shu stakan shakar 200 gramm,
            asal esa 285 gramm atrofida bo&apos;ladi. Buning sababi har bir
            mahsulotning zichligi (bir xil hajmdagi og&apos;irligi) har xil
            bo&apos;lishidir — un havodor va yengil, asal esa zich va
            og&apos;ir. Shuning uchun yagona &quot;1 stakan = X gramm&quot;
            qoidasi o&apos;rniga, mahsulotga xos jadval ishlatish kerak.
          </p>
          <p>
            O&apos;zbek va Rossiya mutfoq an&apos;anasida &quot;1 stakan&quot;
            odatda 200 ml (grafinli stakanning ichki chizig&apos;iga qadar)
            deb qabul qilinadi — stakanning to&apos;liq jismoniy hajmi
            (250 ml) emas, aynan shu 200 ml qiymati retseptlarda
            qo&apos;llaniladi. Bu yerdagi qiymatlar shu 200 ml standartiga
            asoslangan va amaliy foydalanish uchun yetarlicha aniq; baribir
            elash, siqish yoki brendga qarab bir necha gramm farq bo&apos;lishi
            mumkinligini unutmang. Aniq retseptlar (ayniqsa qandolatchilik)
            uchun imkon bo&apos;lsa oshxona tarozisidan foydalanish eng to&apos;g&apos;ri
            natijani beradi.
          </p>

          <h2>Mahsulot O&apos;lchov Jadvali (1 Stakan = 200 ml)</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>
                Mahsulotlarning stakan, osh qoshiq va choy qoshiq gramm
                ekvivalentlari
              </caption>
              <thead>
                <tr>
                  <th scope="col">Mahsulot</th>
                  <th scope="col">1 Stakan</th>
                  <th scope="col">1 Osh Qoshiq</th>
                  <th scope="col">1 Choy Qoshiq</th>
                </tr>
              </thead>
              <tbody>
                {kitchenIngredientRows.map((row) => (
                  <tr key={row.key}>
                    <td>{uzLabels[row.key]}</td>
                    <td>{Math.round(row.gramsPerBardak)} g</td>
                    <td>{Math.round((row.gramsPerBardak * 15) / 200)} g</td>
                    <td>{Math.round((row.gramsPerBardak * 5) / 200)} g</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Tez-tez So&apos;raladigan Savollar</h2>
          <p>
            <strong>1 osh qoshiq necha ml, necha choy qoshiq keladi?</strong>
            <br />
            1 osh qoshiq 15 ml bo&apos;lib, 3 choy qoshiqqa teng (1 choy qoshiq
            5 ml). 1 stakan esa 200 ml, ya&apos;ni taxminan 13,3 osh qoshiqqa
            to&apos;g&apos;ri keladi.
          </p>
          <p>
            <strong>
              Nega bir xil stakan turli mahsulotlarda turli gramm tutadi?
            </strong>
            <br />
            Stakan va qoshiqlar hajmni (millilitrni) o&apos;lchaydi, gramm esa
            og&apos;irlikdir. Ikki o&apos;lchov orasidagi bog&apos;liqlik
            mahsulotning zichligiga bog&apos;liq; un kabi havodor mahsulotlar
            asal kabi zich mahsulotlardan ancha yengildir.
          </p>
          <p>
            Qo&apos;lingizdagi butun retseptni bir martada
            ko&apos;paytirmoqchi yoki kamaytirmoqchi bo&apos;lsangiz,{" "}
            <Link href="/uz/retsept-aylantirgich">
              retsept aylantirgich sahifasidan
            </Link>{" "}
            foydalanishingiz mumkin — retseptni joylashtiring, koeffitsientni
            tanlang, qator-qator natijani ko&apos;ring.
          </p>

          <h2>Manbalar</h2>
          <p>
            Jadvaldagi qiymatlar Rossiya va O&apos;rta Osiyo mutfoq
            an&apos;anasida keng qo&apos;llaniladigan граненый стакан
            (200 ml ichki chizig&apos;i) standartiga asoslangan va yumaloqlangan
            o&apos;rtacha qiymatlardir.
          </p>
        </section>
      </div>
    </main>
  );
}
