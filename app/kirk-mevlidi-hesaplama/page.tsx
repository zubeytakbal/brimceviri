import type { Metadata } from "next";
import { AnmaGunleriHesaplama } from "../components/dini/DiniAraclar4";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { anmaGunleri } from "../converter/diniHesaplar";
import { diniRelated } from "../i18n/diniAraclar";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

const path = "/kirk-mevlidi-hesaplama";
const title = "40 Mevlidi Hesaplama: Ölünün Kırkı ve 52. Gecesi Ne Zaman?";
const description =
  "Vefat ya da defin tarihini girin: ölünün 3., 7., 40. ve 52. günü hangi tarihe denk geliyor, gecesi hangi akşam? Ölüm günü sayılır mı sorusuna iki sayımla cevap.";

export const metadata: Metadata = {
  title: seoTitle(title, "40 Mevlidi Hesaplama"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
const kisa = (d: { day: number; month: number }) => `${d.day} ${AYLAR[d.month - 1]}`;
const ornek = { year: 2026, month: 1, day: 10 };
const [, , kirk, elliIki] = anmaGunleri(ornek);
const [, , kirkErtesi] = anmaGunleri(ornek, false);

const faqItems: FaqItem[] = [
  {
    question: "40 mevlidi nasıl hesaplanır?",
    answer: `Yaygın sayımda vefat günü 1. gün sayılır ve 40. gün bulunur: ${kisa(ornek)} tarihinde vefat eden birinin kırkı ${kisa(kirk.gun)}, kırkıncı gecesi ${kisa(kirk.gecesi)} akşamıdır.`,
  },
  {
    question: "Ölüm günü sayılır mı?",
    answer: `Yörelere göre değişir. Çoğu yerde vefat günü 1. gün sayılır; bazı yerlerde sayım ertesi günden ya da defin gününden başlar. Ertesi günden sayılırsa aynı örnekte kırk ${kisa(kirkErtesi.gun)} olur. Hesaplayıcıda iki sayımı da seçebilirsiniz.`,
  },
  {
    question: "52. gece ne zaman?",
    answer: `52. gün vefat gününden 51 gün sonradır; gecesi bir önceki akşamdır. ${kisa(ornek)} tarihindeki bir vefat için 52. gün ${kisa(elliIki.gun)}, 52. gecesi ${kisa(elliIki.gecesi)} akşamıdır.`,
  },
  {
    question: "Neden gece bir önceki akşam?",
    answer: "Hicri takvimde gün güneşin batışıyla başlar; bu yüzden bir günün gecesi, o günden önceki akşamdır. Kandil gecelerinde de aynı kural geçerlidir.",
  },
  {
    question: "7, 40 ve 52. gün uygulamalarının dinî dayanağı var mı?",
    answer:
      "Diyanet İşleri Başkanlığı Din İşleri Yüksek Kurulu'na göre zamana ve şekle bağlanmış böyle bir görev yoktur ve bu uygulamaların dinî dayanağı bulunmamaktadır. Ölüye dua, Kur'an ve mevlit her zaman okunabilir.",
  },
];

export default function KirkMevlidiPage() {
  const now = new Date();
  const initialDate = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}-${String(now.getUTCDate()).padStart(2, "0")}`;
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/dini-araclar", label: "Dini Araçlar" },
        { href: path, label: "40 Mevlidi Hesaplama" },
      ]}
      crumbLabel="Sayfa yolu"
      title="40 Mevlidi ve 52. Gece Hesaplama"
      intro="Vefat tarihini girin; ölünün üçü, yedisi, kırkı ve elli ikisi hangi güne denk geliyor, gecesi hangi akşam, Hicri tarihi ne? Sayımın vefat gününden mi defin gününden mi başlayacağını siz seçin."
      tool={<AnmaGunleriHesaplama initialDate={initialDate} />}
      related={{ title: "Diğer dini araçlar", links: diniRelated(path) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "sayim", label: "Kırk nasıl sayılır?" },
        { id: "diyanet", label: "Diyanet ne diyor?" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="sayim">Kırk nasıl sayılır?</h2>
      <p>
        En yaygın sayımda vefat günü birinci gün sayılır. Böylece kırkıncı gün, vefat gününden 39 gün sonraya; elli ikinci gün 51 gün sonraya denk gelir. Bazı aileler
        sayıma ertesi günden ya da defin gününden başlar; bu durumda tarihler bir gün kayar. Mevlit çoğu yerde o günün <strong>gecesinde</strong>, yani bir önceki
        akşam okunur; bazı aileler günün kendisinde okutur.
      </p>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <caption>Örnek: {kisa(ornek)} 2026 vefat</caption>
          <thead>
            <tr>
              <th scope="col">Gün</th>
              <th scope="col">Vefat günü 1. gün</th>
              <th scope="col">Ertesi günden sayım</th>
            </tr>
          </thead>
          <tbody>
            {anmaGunleri(ornek).map((x, i) => (
              <tr key={x.n}>
                <th scope="row">{x.n}. gün</th>
                <td>{kisa(x.gun)}</td>
                <td>{kisa(anmaGunleri(ornek, false)[i].gun)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 id="diyanet">Diyanet ne diyor?</h2>
      <p>
        Diyanet İşleri Başkanlığı Din İşleri Yüksek Kurulu&apos;na göre ölünün yıkanması, kefenlenmesi, cenaze namazının kılınması ve defnedilmesi farzdır; bunların dışında
        yedinci, kırkıncı ve elli ikinci gün gibi zamana ve şekle bağlanmış bir görev yoktur ve bu uygulamaların dinî dayanağı bulunmamaktadır. Ölüye dua etmek, Kur&apos;an
        okumak ve hayır yapmak ise her zaman sevaptır. Bu araç yalnızca gelenekteki günlerin tarihini hesaplar.
      </p>
    </TimeToolPage>
  );
}
