import type { Metadata } from "next";
import { DogumHesaplama } from "../components/HayvancilikAraclari";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { HAYVANLAR, type HayvanTuru } from "../converter/hayvancilik";
import { tarimRelated } from "../i18n/tarimAraclari";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

const path = "/inek-dogum-hesaplama";
const title = "İnek Doğum Hesaplama: Tohumlamadan Doğum Tarihi (Düve, Koyun, Keçi)";
const description =
  "Tohumlama tarihini girin: inek, düve, manda, koyun, keçi ve kısrak için tahmini doğum tarihi, tutmazsa kızgınlık günleri, gebelik kontrolü ve kuruya ayırma tarihi.";

export const metadata: Metadata = {
  title: seoTitle(title, "İnek Doğum Hesaplama"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "İnek kaç günde doğurur?",
    answer: `İneklerde gebelik ortalama ${HAYVANLAR.inek.gebelik} gündür (yaklaşık 9 ay 10 gün); ${HAYVANLAR.inek.min}–${HAYVANLAR.inek.max} gün arası normal kabul edilir. Düvelerde birkaç gün daha kısa olabilir.`,
  },
  {
    question: "İnekler kaç günde bir kızgınlığa gelir, kaç günde bir tohumlanır?",
    answer: "Kızgınlık döngüsü ortalama 21 gündür (18–24 gün). Tohumlama tutmazsa inek yaklaşık 21 gün sonra yeniden kızgınlık gösterir; 21. ve 42. günlerde kızgınlık görülmezse gebelik ihtimali yüksektir.",
  },
  {
    question: "Kızgınlık gösteren inek ne zaman tohumlanır?",
    answer: "Sabah-akşam kuralına göre: kızgınlık sabah fark edildiyse aynı gün akşam, akşam fark edildiyse ertesi sabah tohumlatılır. Kızgınlık 12–18 saat sürer, yumurtlama kızgınlık bittikten sonra olur.",
  },
  {
    question: "Düve ne zaman tohumlanır?",
    answer: "Düveler genellikle 15–18 aylıkken ve ergin canlı ağırlığının yaklaşık %60–65'ine ulaştığında (Holstein'da 350–400 kg) tohumlanır. Yaştan çok ağırlık ölçü alınır.",
  },
  {
    question: "Kuruya ayırma ne zaman yapılır?",
    answer: "Süt ineklerinde doğumdan yaklaşık 60 gün önce sağım kesilir. Bu kuru dönem memenin yenilenmesi ve bir sonraki laktasyonda verimin düşmemesi için gereklidir.",
  },
  {
    question: "Koyun ve keçi kaç ayda doğurur?",
    answer: `Koyunda gebelik ortalama ${HAYVANLAR.koyun.gebelik} gün (${HAYVANLAR.koyun.min}–${HAYVANLAR.koyun.max}), keçide ${HAYVANLAR.keci.gebelik} gündür; yani yaklaşık 5 ay. Koyunlarda kızgınlık döngüsü 17 gündür.`,
  },
];

export default function InekDogumPage() {
  const now = new Date();
  const initialDate = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}-${String(now.getUTCDate()).padStart(2, "0")}`;
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/ciftci-araclari", label: "Tarım ve Hayvancılık" },
        { href: path, label: "İnek Doğum Hesaplama" },
      ]}
      crumbLabel="Sayfa yolu"
      title="İnek Doğum Hesaplama"
      intro="Tohumlama ya da aşım tarihini girin; tahmini doğum tarihini, tutmazsa kızgınlığın tekrar beklendiği günleri, gebelik kontrolünü, kuruya ayırma ve doğum bölmesine alma tarihlerini görün. Düve, manda, koyun, keçi ve kısrak için de çalışır."
      tool={<DogumHesaplama initialDate={initialDate} />}
      related={{ title: "Diğer tarım ve hayvancılık araçları", links: tarimRelated(path) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "sureler", label: "Hayvanlarda gebelik süreleri" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="sureler">Hayvanlarda gebelik süreleri</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Hayvan</th>
              <th scope="col">Gebelik</th>
              <th scope="col">Normal aralık</th>
              <th scope="col">Kızgınlık döngüsü</th>
            </tr>
          </thead>
          <tbody>
            {(Object.keys(HAYVANLAR) as HayvanTuru[]).map((k) => {
              const h = HAYVANLAR[k];
              return (
                <tr key={k}>
                  <th scope="row">{h.ad}</th>
                  <td>{h.gebelik} gün</td>
                  <td>
                    {h.min}–{h.max} gün
                  </td>
                  <td>{h.kizginlik} gün</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p>Süreler ortalamadır; ırk, yaş, besleme ve ikiz gebelik süreyi birkaç gün kısaltıp uzatabilir. Doğumdan önceki son haftalarda hayvanı yakından izleyin.</p>
    </TimeToolPage>
  );
}
