import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { scaleColor } from "../components/geo/TurkeyMap";
import WorldMap from "../components/geo/WorldMap";
import WorldMapExplorer, { type ExplorerCountry } from "../components/geo/WorldMapExplorer";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { geoRelated } from "../converter/geo/geoTools";
import { worldRegionPages } from "../converter/geo/worldRegions";
import { distanceFromAnkara, timeDiffText, timeDiffWithTurkey, WORLD_REGION_COLORS } from "../converter/geo/worldGeo";
import { worldCountries } from "../converter/geo/worldCountries";
import { buildLanguageAlternates } from "../i18n/routing";
import { buildSiteUrl } from "../siteConfig";

// Yaz saati gecisleri icin gunluk yenilenir.
export const revalidate = 86400;

const path = "/dunya-haritasi";
const title = "Dünya Haritası: Ülkeler, Başkentler ve Kıtalar (Tıklanabilir)";
const description =
  "Tıklanabilir siyasi dünya haritası: 196 ülkenin başkenti, yüzölçümü, Türkiye ile saat farkı ve Ankara'ya uzaklığı. Kıta, yüzölçümü ve saat farkı katmanları.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, ...buildLanguageAlternates({ tr: path, en: "/en/world-map" }, "tr") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

function diffColor(minutes: number) {
  // Turkiye'den geri: mavi, ileri: turuncu
  const t = Math.max(-1, Math.min(1, minutes / 600));
  if (t === 0) return "#e4efe9";
  const a = Math.abs(t);
  const base = t < 0 ? [60, 120, 190] : [220, 110, 60];
  const mix = [236, 242, 240].map((v, i) => Math.round(v + (base[i] - v) * a));
  return `rgb(${mix.join(",")})`;
}

const faqItems: FaqItem[] = [
  {
    question: "Dünyada kaç ülke var?",
    answer:
      "Birleşmiş Milletler'in 193 üye ülkesi ve 2 gözlemci devleti (Vatikan ve Filistin) vardır. Bu haritada BM üyelerine ek olarak Kosova, Filistin, Vatikan ve Kuzey Kıbrıs Türk Cumhuriyeti de yer alır.",
  },
  {
    question: "Yüzölçümü en büyük ülke hangisi?",
    answer: "Rusya yaklaşık 17,1 milyon km² ile dünyanın en büyük ülkesidir; ardından Kanada, Çin, ABD ve Brezilya gelir. Türkiye yaklaşık 783.562 km² ile ilk 40 ülke arasındadır.",
  },
  {
    question: "Haritadaki şekiller neden gerçek boyutlarla orantılı görünmüyor?",
    answer:
      "Küre biçimindeki Dünya düz bir kâğıda aktarılırken bozulma kaçınılmazdır. Bu harita alan ve şekil bozulmasını dengeleyen Natural Earth projeksiyonunu kullanır; Mercator gibi projeksiyonlarda kutuplara yakın ülkeler (Grönland, Rusya) olduğundan çok daha büyük görünür.",
  },
];

export default function WorldMapPage() {
  const now = new Date();
  const maxLogArea = Math.log10(Math.max(...worldCountries.map((c) => c.area)));
  const layers = {
    kita: Object.fromEntries(worldCountries.map((c) => [c.iso3, WORLD_REGION_COLORS[c.region] ?? "#cfe3e8"])),
    alan: Object.fromEntries(worldCountries.map((c) => [c.iso3, scaleColor(Math.log10(Math.max(c.area, 1)), 2, maxLogArea)])),
    saat: Object.fromEntries(worldCountries.map((c) => [c.iso3, diffColor(timeDiffWithTurkey(c, now))])),
  };
  const explorer: Record<string, ExplorerCountry> = Object.fromEntries(
    worldCountries.map((c) => [
      c.iso3,
      {
        iso3: c.iso3,
        id: c.id,
        nameTr: c.nameTr,
        flag: c.flag,
        capital: c.capital,
        area: c.area,
        region: c.subregion ? `${c.region} · ${c.subregion}` : c.region,
        timeDiff: timeDiffText(timeDiffWithTurkey(c, now)),
        distance: Math.round(distanceFromAnkara(c)),
      },
    ])
  );
  const biggest = [...worldCountries].sort((a, b) => b.area - a.area).slice(0, 10);

  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/cografya-hesaplamalari", label: "Coğrafya Hesaplamaları" },
        { href: path, label: "Dünya Haritası" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Dünya Haritası"
      intro="Bir ülkeye tıklayın: başkenti, yüzölçümü, Türkiye ile saat farkı ve Ankara'ya uzaklığı görünsün. Kıtalar, yüzölçümü ve saat farkı katmanları arasında geçiş yapabilirsiniz."
      tool={
        <WorldMapExplorer
          countries={explorer}
          map={<WorldMap ariaLabel="Siyasi dünya haritası" layers={layers} selectable titleFor={(c) => `${c.nameTr} (${c.capital})`} />}
          legend={{
            kita: (
              <>
                {Object.entries(WORLD_REGION_COLORS).map(([r, color]) => (
                  <span key={r}>
                    <span className="tr-map-legend-swatch" style={{ background: color }} /> {r}
                  </span>
                ))}
              </>
            ),
            alan: (
              <>
                <span className="tr-map-legend-bar" /> Küçük → büyük yüzölçümü (logaritmik ölçek)
              </>
            ),
            saat: (
              <>
                <span className="tr-map-legend-swatch" style={{ background: "rgb(60,120,190)" }} /> Türkiye&apos;den geri{" "}
                <span className="tr-map-legend-swatch" style={{ background: "#e4efe9" }} /> aynı{" "}
                <span className="tr-map-legend-swatch" style={{ background: "rgb(220,110,60)" }} /> ileri (başkent saatine göre)
              </>
            ),
          }}
        />
      }
      related={{
        title: "İlginizi çekebilir",
        links: [{ href: "/ulkeler", label: "Ülkeler ve Başkentleri" }, ...worldRegionPages.map((r) => ({ href: `/bolge-haritalari/${r.id}`, label: r.title })), ...geoRelated(path, 4)],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "bolgeler", label: "Bölge haritaları" },
        { id: "en-buyuk", label: "Yüzölçümü en büyük 10 ülke" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="bolgeler">Bölge haritaları</h2>
      <ul>
        {worldRegionPages.map((r) => (
          <li key={r.id}>
            <Link href={`/bolge-haritalari/${r.id}`}>{r.title}</Link> — {r.summary}
          </li>
        ))}
      </ul>

      <h2 id="en-buyuk">Yüzölçümü en büyük 10 ülke</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Ülke</th>
              <th scope="col">Yüzölçümü</th>
              <th scope="col">Türkiye&apos;nin kaç katı</th>
            </tr>
          </thead>
          <tbody>
            {biggest.map((c, i) => (
              <tr key={c.iso3}>
                <td>{i + 1}</td>
                <td>
                  <Link href={`/ulkeler/${c.id}`} prefetch={false}>
                    {c.flag} {c.nameTr}
                  </Link>
                </td>
                <td>{c.area.toLocaleString("tr-TR")} km²</td>
                <td>{(c.area / 783562).toLocaleString("tr-TR", { maximumFractionDigits: 1 })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Tüm ülkelerin listesi, başkentleri ve Türkiye ile saat farkları için <Link href="/ulkeler">ülkeler ve başkentleri</Link> sayfasına bakın.
        Yüzölçümü değerlerini mil² ya da hektara çevirmek için <Link href="/kategoriler/alan">alan dönüşümlerini</Link> kullanabilirsiniz.
      </p>
      <p>
        <small>
          Kaynaklar: ülke sınırları Natural Earth (1:110 milyon), ülke verileri mledoze/countries (ODbL), başkent koordinatları GeoNames. Türkiye&apos;nin
          tanıdığı Kuzey Kıbrıs Türk Cumhuriyeti ayrı ülke olarak gösterilir.
        </small>
      </p>
    </TimeToolPage>
  );
}
