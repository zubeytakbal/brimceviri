import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import AnnualOutdatedNotice from "../components/de/AnnualOutdatedNotice";
import TazminatHesaplama from "../components/TazminatHesaplama";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { KIDEM_TAVANLARI } from "../converter/turkishTazminat";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

export const revalidate = 86400;

const path = "/kidem-tazminati-hesaplama";
const title = "Kıdem ve İhbar Tazminatı Hesaplama 2026";
const description =
  "Kıdem ve ihbar tazminatı hesaplama 2026: güncel kıdem tavanı 73.729,87 TL, çalışma süresi, giydirilmiş brüt ücret, ayrılış nedenine göre hak durumu, damga ve gelir vergisi kesintisiyle net tutar.";

export const metadata: Metadata = {
  title: seoTitle(`${title}: Net Tutar ve Tavan`, title),
  description,
  alternates: { canonical: path },
  openGraph: {
    title,
    description,
    url: buildSiteUrl(path),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

const tl = (n: number) =>
  `${n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL`;
const donem = (baslangic: string) => {
  const [y, m] = baslangic.split("-");
  return m === "01" ? `1 Ocak – 30 Haziran ${y}` : `1 Temmuz – 31 Aralık ${y}`;
};
const guncel = KIDEM_TAVANLARI[KIDEM_TAVANLARI.length - 1];

const faqItems: FaqItem[] = [
  {
    question: "Kıdem tazminatı nasıl hesaplanır?",
    answer: `Her tam çalışma yılı için 30 günlük giydirilmiş brüt ücret ödenir; artan ay ve günler oranlanır. Giydirilmiş ücrete yemek, yol, düzenli ikramiye ve prim gibi süreklilik gösteren ödemeler dahildir. Yıllık tutar, çıkış tarihindeki kıdem tavanını (${donem(guncel.baslangic)} için ${tl(guncel.tutar)}) aşamaz. Kıdem tazminatından yalnız binde 7,59 damga vergisi kesilir.`,
  },
  {
    question: "Kıdem tazminatı almak için ne kadar çalışmak gerekir?",
    answer:
      "Aynı işverene bağlı olarak en az 1 yıl. Ayrıca ayrılış nedeni önemlidir: istifa eden veya işverenin ahlak ve iyi niyet kurallarına aykırılık (md. 25/II) nedeniyle çıkardığı çalışan kıdem tazminatı alamaz.",
  },
  {
    question: "İstifa eden kıdem tazminatı alabilir mi?",
    answer:
      "Normal istifada hayır. Ancak maaşın ödenmemesi, fazla mesai ücretinin verilmemesi veya mobbing gibi haklı nedenlerle (İş Kanunu md. 24) ayrılan çalışan kıdem tazminatı alır. Emeklilik, askerlik, kadın çalışanın evlendikten sonra 1 yıl içinde ayrılması ile 15 yıl ve 3600 gün şartını doldurup ayrılmak da kıdem tazminatı hakkı doğurur.",
  },
  {
    question: "İhbar süreleri ne kadar?",
    answer:
      "Çalışma süresi 6 aydan az ise 2 hafta, 6 ay – 1,5 yıl arası 4 hafta, 1,5 – 3 yıl arası 6 hafta, 3 yıldan fazla ise 8 hafta (İş Kanunu md. 17). İşveren bu süreye uymadan çıkarırsa bu sürenin ücretini ihbar tazminatı olarak öder. İşçi önelsiz istifa ederse işverene ihbar tazminatı borçlanabilir.",
  },
  {
    question: "İhbar tazminatından hangi kesintiler yapılır?",
    answer:
      "Gelir vergisi ve damga vergisi. SGK primi kesilmez. Gelir vergisi, yıl içindeki kümülatif vergi matrahınıza göre %15 ile %40 arasındaki dilimden hesaplanır; bu yüzden bordronuzdaki kümülatif matrahı girerseniz sonuç daha kesin olur.",
  },
];

export default function KidemTazminatiPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana sayfa" },
        { href: "/muhasebeci-araclari", label: "Muhasebeci Araçları" },
        { href: path, label: "Kıdem Tazminatı Hesaplama" },
      ]}
      crumbLabel="Sayfa yolu"
      title={title}
      intro="Çalışma süreniz, brüt maaşınız ve ayrılış nedeninize göre kıdem ve ihbar tazminatınızı hesaplayın. Güncel kıdem tavanı, damga vergisi ve ihbar tazminatındaki gelir vergisi otomatik uygulanır."
      tool={
        <>
          <AnnualOutdatedNotice id="tr-kidem" lang="tr" />
          <TazminatHesaplama />
        </>
      }
      related={{
        title: "İlginizi çekebilir",
        links: [
          {
            href: "/iki-tarih-arasi-gun-hesaplama",
            label: "İki Tarih Arası Gün Hesaplama",
          },
          { href: "/is-gunu-hesaplama", label: "İş Günü Hesaplama" },
          { href: "/kdv-hesaplama", label: "KDV Hesaplama" },
          { href: "/muhasebeci-araclari", label: "Muhasebeci Araçları" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "tavan", label: "Kıdem tazminatı tavanı" },
        { id: "haklar", label: "Hangi durumda hangi tazminat?" },
        { id: "ornek", label: "Örnek hesaplama" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="tavan">Kıdem tazminatı tavanı</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Dönem</th>
              <th scope="col">Yıllık tavan</th>
            </tr>
          </thead>
          <tbody>
            {[...KIDEM_TAVANLARI].reverse().map((t) => (
              <tr key={t.baslangic}>
                <td>{donem(t.baslangic)}</td>
                <td>{tl(t.tutar)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Tavan, memur maaş katsayısına bağlı olarak her yıl Ocak ve Temmuz
        aylarında güncellenir. Hesaplamada işten çıkış tarihindeki tavan esas
        alınır.
      </p>

      <h2 id="haklar">Hangi durumda hangi tazminat?</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Ayrılış nedeni</th>
              <th scope="col">Kıdem</th>
              <th scope="col">İhbar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>İşveren haklı neden olmadan çıkardı</td>
              <td>Var</td>
              <td>Var (önel verilmediyse)</td>
            </tr>
            <tr>
              <td>İşçi haklı nedenle ayrıldı (md. 24)</td>
              <td>Var</td>
              <td>Yok</td>
            </tr>
            <tr>
              <td>Emeklilik, askerlik, evlilik (kadın, 1 yıl içinde)</td>
              <td>Var</td>
              <td>Yok</td>
            </tr>
            <tr>
              <td>İstifa</td>
              <td>Yok</td>
              <td>Yok (önelsiz istifada işçi öder)</td>
            </tr>
            <tr>
              <td>İşveren md. 25/II ile çıkardı</td>
              <td>Yok</td>
              <td>Yok</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="ornek">Örnek hesaplama</h2>
      <p>
        1 Mart 2020&apos;de işe başlayan, 31 Ağustos 2026&apos;da işveren
        tarafından çıkarılan ve 50.000 TL brüt maaş alan bir çalışanın hizmet
        süresi 6 yıl 6 aydır. Kıdem tazminatı brüt 6 × 50.000 + 6/12 × 50.000 =
        325.000 TL, damga vergisinden sonra net 322.533,25 TL olur. İhbar süresi
        8 hafta (56 gün) olduğundan brüt ihbar tazminatı 56 × 50.000 / 30 =
        93.333,33 TL&apos;dir; bundan gelir ve damga vergisi kesilir. Çalışma
        sürenizi gün olarak{" "}
        <Link href="/iki-tarih-arasi-gun-hesaplama">
          iki tarih arası gün hesaplama
        </Link>{" "}
        ile de bulabilirsiniz.
      </p>
      <p>
        <small>
          Dayanak: 1475 sayılı İş Kanunu md. 14, 4857 sayılı İş Kanunu md. 17,
          24, 25; Gelir Vergisi Kanunu md. 25/7 ve 103; ÇSGB kıdem tazminatı
          tavan tablosu. Hesaplama bilgilendirme amaçlıdır; kesin tutar için
          bordronuza veya bir uzmana başvurun.
        </small>
      </p>
    </TimeToolPage>
  );
}
