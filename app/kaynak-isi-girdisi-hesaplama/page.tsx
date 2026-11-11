import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import WeldingCurrentCalculator from "../components/WeldingCurrentCalculator";
import HeatInputCalculator from "../components/HeatInputCalculator";
import type { FaqItem } from "../converter/faqSchema";
import { buildSiteUrl } from "../siteConfig";
import EngineeringNextSteps from "../components/engineering/EngineeringNextSteps";
import { ENGINEERING_FLOWS } from "../converter/engineeringFlows";
import AracSayfasi from "@/app/components/yeni/AracSayfasi";

const faqItems: FaqItem[] = [
  {
    question: "Kaynak ısı girdisi (heat input) nasıl hesaplanır?",
    answer:
      "Isı Girdisi (kJ/mm) = (Voltaj × Akım × 60) / (Kaynak Hızı (mm/dakika) × 1000). Bu, EN 1011 standardına dayanan genel bir hesaptır; işlem verimi katsayısı dahil değildir.",
  },
  {
    question: "Isı girdisi neden önemlidir?",
    answer:
      "Isı girdisi, kaynak dikişinin soğuma hızını ve dolayısıyla mikroyapısını, sertliğini ve çatlak riskini etkiler. Çok yüksek veya çok düşük ısı girdisi, malzemeye göre istenmeyen mekanik özelliklere yol açabilir.",
  },
];

// EN 1011-1 isil verim katsayilari (k) ve ornek MAG parametreleri icin ark enerjisi tablosu.
const VERIM: Array<[string, string, number]> = [
  ["Tozaltı kaynağı (SAW)", "121", 1.0],
  ["Örtülü elektrot (MMA)", "111", 0.8],
  ["MIG/MAG", "131 / 135", 0.8],
  ["Özlü tel (FCAW)", "114 / 136", 0.8],
  ["TIG", "141", 0.6],
  ["Plazma", "15", 0.6],
];
const HIZLAR = [150, 200, 250, 300, 400, 500];
const arkEnerjisi = (u: number, i: number, v: number) => (u * i * 60) / (v * 1000);
const kj = (n: number) => n.toLocaleString("tr-TR", { maximumFractionDigits: 2 });

export const metadata: Metadata = {
  title: "Kaynak Isı Girdisi Hesaplama (kJ/mm)",
  description:
    "Voltaj, akım ve kaynak hızından, EN 1011 standardına dayanan kaynak ısı girdisini (kJ/mm) hesapla.",
  alternates: {
    canonical: "/kaynak-isi-girdisi-hesaplama",
  },
  openGraph: {
    title: "Kaynak Isı Girdisi Hesaplama (kJ/mm)",
    description: "Voltaj, akım ve hızdan ısı girdisini hesapla.",
    url: buildSiteUrl("/kaynak-isi-girdisi-hesaplama"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};


export default function HeatInputCalculatorPage() {

  return (
    <AracSayfasi
      yol="/kaynak-isi-girdisi-hesaplama"
      baslik="Kaynak Isı Girdisi Hesaplama"
      hesap={<HeatInputCalculator />}
      sss={faqItems}
      serbestIcindekiler={[{"id":"elektrot-capina-gore-kaynak-akimi","baslik":"Elektrot çapına göre kaynak akımı"},{"id":"ark-enerjisi-ve-isi-girdisi-farki","baslik":"Ark enerjisi ve ısı girdisi farkı"},{"id":"ornek-hesap-mag-kaynagi","baslik":"Örnek hesap: MAG kaynağı"},{"id":"kaynak-hizinin-etkisi-24-v-220","baslik":"Kaynak hızının etkisi (24 V, 220 A)"},{"id":"sik-yapilan-hatalar","baslik":"Sık yapılan hatalar"},{"id":"kaynaklar","baslik":"Kaynaklar"}]}
      serbestIcerik={
        <>
          <h2 id="elektrot-capina-gore-kaynak-akimi">Elektrot çapına göre kaynak akımı</h2>
          <p>Isı girdisini hesaplamadan önce akımı seçmek için: elektrot örtüsü ve çekirdek çapına göre önerilen amper aralığı.</p>
          <WeldingCurrentCalculator />
          <h2 id="ark-enerjisi-ve-isi-girdisi-farki">Ark enerjisi ve ısı girdisi farkı</h2>
          <p>
            Formülün verdiği değer aslında <strong>ark enerjisidir</strong>: arktan çıkan toplam enerjinin dikiş boyuna bölümü. Bu
            enerjinin tamamı parçaya geçmez. EN 1011-1 standardı, ısı girdisini bulmak için ark enerjisini kaynak yöntemine özgü ısıl
            verim katsayısı (k) ile çarpar: Q = k × U × I × 60 / (v × 1000).
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Kaynak yöntemi</th>
                  <th>ISO 4063 no</th>
                  <th>Isıl verim (k)</th>
                </tr>
              </thead>
              <tbody>
                {VERIM.map(([ad, no, k]) => (
                  <tr key={ad}>
                    <td>{ad}</td>
                    <td>{no}</td>
                    <td>{kj(k)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h2 id="ornek-hesap-mag-kaynagi">Örnek hesap: MAG kaynağı</h2>
          <p>
            24 V gerilim, 220 A akım ve 300 mm/dk kaynak hızıyla yapılan bir MAG dikişinde ark enerjisi 24 × 220 × 60 / (300 × 1000) ≈{" "}
            <strong>{kj(arkEnerjisi(24, 220, 300))} kJ/mm</strong> olur. MAG için k = 0,8 olduğundan ısı girdisi{" "}
            {kj(arkEnerjisi(24, 220, 300))} × 0,8 ≈ <strong>{kj(arkEnerjisi(24, 220, 300) * 0.8)} kJ/mm</strong>&apos;dir. Kaynak prosedür
            şartnamesinde (WPS) hangi değerin (ark enerjisi mi, ısı girdisi mi) istendiğine dikkat edin.
          </p>
          <h2 id="kaynak-hizinin-etkisi-24-v-220">Kaynak hızının etkisi (24 V, 220 A)</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Kaynak hızı (mm/dk)</th>
                  <th>Ark enerjisi (kJ/mm)</th>
                  <th>Isı girdisi, k = 0,8 (kJ/mm)</th>
                </tr>
              </thead>
              <tbody>
                {HIZLAR.map((v) => (
                  <tr key={v}>
                    <td>{v}</td>
                    <td>{kj(arkEnerjisi(24, 220, v))}</td>
                    <td>{kj(arkEnerjisi(24, 220, v) * 0.8)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Hız yarıya inince ısı girdisi iki katına çıkar. Salınımlı (zikzak) kaynakta hız, dikiş boyunca ilerleme hızıdır; salınım
            yaparken torcun kat ettiği yol değildir. Bu yüzden salınımlı pasolarda ısı girdisi genellikle düz pasolardan yüksektir.
          </p>
          <h2 id="sik-yapilan-hatalar">Sık yapılan hatalar</h2>
          <ul>
            <li>
              <strong>Makinedeki ayar değerini kullanmak:</strong> Gerilim ve akım, kaynak sırasında ölçülen gerçek değerler olmalıdır;
              ayar ile ark gerilimi kablo kayıpları nedeniyle farklı olabilir.
            </li>
            <li>
              <strong>Hızı cm/dk girmek:</strong> Formül mm/dk içindir; 30 cm/dk = 300 mm/dk&apos;dır.
            </li>
            <li>
              <strong>Darbeli (pulse) kaynakta ortalama değerler:</strong> Darbeli akımda gerilim × akım çarpımı yerine makinenin gösterdiği
              anlık güç ya da enerji değeri kullanılmalıdır.
            </li>
          </ul>
          <EngineeringNextSteps links={ENGINEERING_FLOWS["/kaynak-isi-girdisi-hesaplama"]} />
          <h2 id="ilgili-araclar">İlgili araçlar</h2>
          <p>
            Diğer kaynakçı araçları için{" "}
            <Link href="/hesaplayicilar#teknik">Teknik ve Mühendislik</Link>
            {" "}sayfasına, elektrot çapına göre amperaj hesaplama için{" "}
            Kaynak Amperajı Hesaplama
            {" "}sayfasına bakabilirsin.
          </p>
          <h2 id="kaynaklar">Kaynaklar</h2>
          <p>
            Formül, EN 1011-1 standardında tanımlanan ısı girdisi
            hesabına dayanır. Bu araç bir prosedür şartnamesinin (WPS)
            yerini almaz.
          </p>
        </>
      }
    />
  );
}
