import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import ProvinceMapExplorer from "../components/geo/ProvinceMapExplorer";
import TurkeyMap, { REGION_COLORS, scaleColor } from "../components/geo/TurkeyMap";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { geoRelated } from "../converter/geo/geoTools";
import { turkeyProvinces, TURKEY_REGIONS } from "../converter/geo/turkeyProvinces";
import { buildSiteUrl } from "../siteConfig";

const path = "/turkiye-il-haritasi";
const title = "Türkiye İl Haritası: 81 İl, Plaka Kodları ve Bölgeler";
const description =
  "Tıklanabilir Türkiye il haritası: 81 ilin plaka kodu, coğrafi bölgesi, rakımı ve il merkezi koordinatları. İl plaka kodları listesi ve 7 bölgenin illeri.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const byElevation = [...turkeyProvinces].sort((a, b) => b.elevationM - a.elevationM);
const regionCounts = TURKEY_REGIONS.map((r) => ({ region: r, provinces: turkeyProvinces.filter((p) => p.region === r) }));
const largestRegion = [...regionCounts].sort((a, b) => b.provinces.length - a.provinces.length)[0];

const faqItems: FaqItem[] = [
  {
    question: "Türkiye'de kaç il var?",
    answer: "Türkiye'de 81 il vardır. En son kurulan il 1999'da il yapılan ve 81 plaka kodunu alan Düzce'dir.",
  },
  {
    question: "Plaka kodları nasıl belirlenmiştir?",
    answer:
      "01'den 67'ye kadar olan plaka kodları illerin alfabetik sırasına göre verilmiştir (Adana 01, Zonguldak 67). Sonradan il olanlar kuruluş sırasına göre 68 (Aksaray) ile 81 (Düzce) arasındaki kodları almıştır.",
  },
  {
    question: "Hangi bölgede en çok il var?",
    answer: `${largestRegion.region} Bölgesi ${largestRegion.provinces.length} ille en çok ile sahip bölgedir. Güneydoğu Anadolu ise 9 ille en az ile sahip bölgedir.`,
  },
  {
    question: "Rakımı en yüksek il hangisi?",
    answer: `İl merkezi rakımına göre en yüksek il ${byElevation[0].name} (${byElevation[0].elevationM.toLocaleString("tr-TR")} m), ardından ${byElevation[1].name} (${byElevation[1].elevationM.toLocaleString("tr-TR")} m) ve ${byElevation[2].name} (${byElevation[2].elevationM.toLocaleString("tr-TR")} m) gelir.`,
  },
];

export default function TurkeyProvinceMapPage() {
  const maxElev = byElevation[0].elevationM;
  const layers = {
    bolge: Object.fromEntries(turkeyProvinces.map((p) => [p.plate, REGION_COLORS[p.region]])),
    rakim: Object.fromEntries(turkeyProvinces.map((p) => [p.plate, scaleColor(p.elevationM, 0, maxElev)])),
  };
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/cografya-hesaplamalari", label: "Coğrafya Hesaplamaları" },
        { href: path, label: "Türkiye İl Haritası" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Türkiye İl Haritası"
      intro="81 ilin plaka kodları, coğrafi bölgeleri ve rakımları tek haritada. Bir ile tıklayarak il merkezi bilgilerini, diğer illere mesafeleri ve rakımını görün."
      tool={
        <ProvinceMapExplorer
          map={<TurkeyMap ariaLabel="Türkiye il haritası" layers={layers} labels="plate" selectable titleFor={(p) => `${p.plate} ${p.name} (${p.region})`} />}
          legend={{
            bolge: (
              <>
                {TURKEY_REGIONS.map((r) => (
                  <span key={r}>
                    <span className="tr-map-legend-swatch" style={{ background: REGION_COLORS[r] }} /> {r}
                  </span>
                ))}
              </>
            ),
            rakim: (
              <>
                <span className="tr-map-legend-bar" /> 0 m → {maxElev.toLocaleString("tr-TR")} m (il merkezi rakımı)
              </>
            ),
          }}
        />
      }
      related={{
        title: "İlginizi çekebilir",
        links: geoRelated(path, 8),
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "plaka", label: "İl plaka kodları listesi" },
        { id: "bolgeler", label: "Coğrafi bölgeler ve illeri" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="plaka">İl plaka kodları listesi</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Plaka</th>
              <th scope="col">İl</th>
              <th scope="col">Bölge</th>
              <th scope="col">Rakım</th>
            </tr>
          </thead>
          <tbody>
            {turkeyProvinces.map((p) => (
              <tr key={p.plate}>
                <td>{String(p.plate).padStart(2, "0")}</td>
                <td>
                  <Link href={`/iller-arasi-mesafe/${p.id}`} prefetch={false}>
                    {p.name}
                  </Link>
                  {p.center ? <small> (merkez: {p.center})</small> : null}
                </td>
                <td>{p.region}</td>
                <td>{p.elevationM.toLocaleString("tr-TR")} m</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="bolgeler">Coğrafi bölgeler ve illeri</h2>
      <p>
        Türkiye, 1941&apos;deki Birinci Coğrafya Kongresi&apos;nde iklim, bitki örtüsü ve yer şekillerine göre yedi coğrafi bölgeye ayrılmıştır. Bölge
        sınırları il sınırlarıyla tam örtüşmez; aşağıdaki liste illerin yaygın kabul gören bölgelerine göredir.
      </p>
      {regionCounts.map(({ region, provinces }) => (
        <p key={region}>
          <strong>
            {region} ({provinces.length} il):
          </strong>{" "}
          {provinces
            .map((p) => p.name)
            .sort((a, b) => a.localeCompare(b, "tr"))
            .join(", ")}
        </p>
      ))}
    </TimeToolPage>
  );
}
