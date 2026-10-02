import type { Metadata } from "next";
import { KibleHesaplama } from "../components/dini/DiniAraclar2";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { kabeMesafesi, kibleAcisi, manyetikSapma, pusulaKibleAcisi } from "../converter/diniHesaplar";
import { findProvince, turkeyProvinces } from "../converter/geo/turkeyProvinces";
import { diniRelated } from "../i18n/diniAraclar";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

const path = "/kible-yonu-hesaplama";
const title = "Kıble Yönü Bulma: Canlı Pusula ve 81 İl Kıble Açısı";
const description = "Telefonunuzda canlı pusulayla kıbleyi bulun ya da ilinizin kıble açısını öğrenin. Gerçek kuzeye ve pusulaya göre açı, 81 il tablosu.";

export const metadata: Metadata = {
  title: seoTitle(title, "Kıble Yönü Bulma: Canlı Pusula"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const fmt1 = (n: number) => n.toLocaleString("tr-TR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const ist = findProvince("istanbul")!;
const satirlar = [...turkeyProvinces]
  .sort((a, b) => a.name.localeCompare(b.name, "tr"))
  .map((p) => ({ p, gercek: kibleAcisi(p.lat, p.lon), pusula: pusulaKibleAcisi(p.lat, p.lon), km: kabeMesafesi(p.lat, p.lon) }));

const faqItems: FaqItem[] = [
  {
    question: "İstanbul'da kıble kaç derece?",
    answer: `İstanbul il merkezinden kıble, gerçek kuzeyden saat yönünde ${fmt1(kibleAcisi(ist.lat, ist.lon))}°'dir. Pusulada ise manyetik sapma (${fmt1(manyetikSapma(ist.lat, ist.lon))}°) düşülerek ${fmt1(pusulaKibleAcisi(ist.lat, ist.lon))}° okunur.`,
  },
  {
    question: "Pusula açısı ile kıble açısı neden farklı?",
    answer: "Pusula manyetik kuzeyi gösterir, kıble açısı ise coğrafi (gerçek) kuzeye göre hesaplanır. Türkiye'de manyetik kuzey gerçek kuzeyin birkaç derece doğusundadır; bu fark Dünya Manyetik Modeli (WMM2025) ile hesaplanır.",
  },
  {
    question: "Canlı pusula ne kadar doğru?",
    answer: "Telefon pusulaları birkaç derece hata yapabilir. Doğru sonuç için telefonu yere paralel tutun, metal eşyalardan ve mıknatıslı kılıflardan uzak durun ve gerekirse telefonu havada 8 çizerek kalibre edin.",
  },
];

export default function KiblePage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/dini-araclar", label: "Dini Araçlar" },
        { href: path, label: "Kıble Yönü" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Kıble Yönü Bulma"
      intro="İlinizi seçin ya da konumunuzu kullanın: kıble açısını görün. Telefonda “Canlı pusulayı başlat” ile ok doğrudan kıbleyi gösterir; manyetik sapma otomatik düzeltilir."
      tool={<KibleHesaplama />}
      related={{ title: "Diğer dini araçlar", links: diniRelated(path) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "nasil", label: "Kıble açısı nasıl hesaplanır?" },
        { id: "iller", label: "81 il kıble açısı" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="nasil">Kıble açısı nasıl hesaplanır?</h2>
      <p>
        Kıble, bulunduğunuz yerden Kâbe'ye giden en kısa yolun (büyük daire) başladığı yöndür. Açı coğrafi kuzeyden saat yönünde ölçülür. Pusula
        ile bakarken manyetik sapmayı hesaba katmak gerekir: bu sayfa sapmayı Dünya Manyetik Modeli WMM2025 ile bulunduğunuz yer ve bugünün
        tarihi için hesaplar. Model 2029 sonuna kadar geçerlidir.
      </p>

      <h2 id="iller">81 il kıble açısı</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">İl</th>
              <th scope="col">Kıble (gerçek kuzey)</th>
              <th scope="col">Pusulada</th>
              <th scope="col">Kâbe'ye uzaklık</th>
            </tr>
          </thead>
          <tbody>
            {satirlar.map(({ p, gercek, pusula, km }) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{fmt1(gercek)}°</td>
                <td>{fmt1(pusula)}°</td>
                <td>{Math.round(km).toLocaleString("tr-TR")} km</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>Açılar il merkezine göredir. Pusula sütunu bu sayfanın oluşturulduğu tarihteki manyetik sapmaya göre hesaplanmıştır.</p>
    </TimeToolPage>
  );
}
