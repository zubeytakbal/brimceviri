import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/app/components/SiteLink";
import TurkeyMap, { scaleColor } from "../../components/geo/TurkeyMap";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { KGM_DISTANCE_DATE } from "../../converter/geo/kgmDistances";
import { DEFAULT_AVG_KMH, distancesFrom, driveMinutes, durationText } from "../../converter/geo/provinceDistances";
import { routePairPath } from "../../converter/geo/routePairs";
import { findProvince, turkeyProvinces } from "../../converter/geo/turkeyProvinces";
import { trAblative, trDative, trGenitive, trLocative } from "../../converter/turkishSuffix";
import { buildSiteUrl } from "../../siteConfig";

export const dynamicParams = false;

export function generateStaticParams() {
  return turkeyProvinces.map((p) => ({ il: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ il: string }> }): Promise<Metadata> {
  const p = findProvince((await params).il);
  if (!p) return {};
  const rows = distancesFrom(p);
  const title = `${trAblative(p.name)} İllere Mesafe: 80 İl Karayolu ve Kuş Uçuşu (km)`;
  const description = `${trAblative(p.name)} Türkiye'nin 80 iline karayolu ve kuş uçuşu mesafe, tahmini yol süresi ve mesafe haritası. En yakın il ${rows[0].province.name} (${rows[0].road.toLocaleString("tr-TR")} km), en uzak il ${rows[rows.length - 1].province.name} (${rows[rows.length - 1].road.toLocaleString("tr-TR")} km).`;
  const path = `/iller-arasi-mesafe/${p.id}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
  };
}

const fmt = (n: number) => Math.round(n).toLocaleString("tr-TR");

export default async function ProvinceDistancesPage({ params }: { params: Promise<{ il: string }> }) {
  const p = findProvince((await params).il);
  if (!p) notFound();
  const rows = distancesFrom(p);
  const nearest = rows.slice(0, 5);
  const farthest = rows.slice(-5).reverse();
  const max = rows[rows.length - 1].road;
  const within300 = rows.filter((r) => r.road <= 300).length;
  const avg = rows.reduce((s, r) => s + r.road, 0) / rows.length;
  const fills: Record<number, string> = { [p.plate]: "var(--tr-map-selected)" };
  for (const r of rows) fills[r.province.plate] = scaleColor(r.road, 0, max);
  const solarDiff = Math.round((45 - p.lon) * 4);
  const dateText = new Intl.DateTimeFormat("tr-TR", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(KGM_DISTANCE_DATE));
  const path = `/iller-arasi-mesafe/${p.id}`;

  const faqItems: FaqItem[] = [
    {
      question: `${trDative(p.name)} en yakın il hangisi?`,
      answer: `Karayolu mesafesine göre ${trDative(p.name)} en yakın il ${nearest[0].province.name} (${nearest[0].road} km); ardından ${nearest
        .slice(1, 3)
        .map((r) => `${r.province.name} (${r.road} km)`)
        .join(" ve ")} gelir.`,
    },
    {
      question: `${trDative(p.name)} en uzak il hangisi?`,
      answer: `${trDative(p.name)} karayoluyla en uzak il ${farthest[0].province.name}: ${farthest[0].road.toLocaleString("tr-TR")} km, tahmini ${durationText(
        driveMinutes(farthest[0].road, DEFAULT_AVG_KMH)
      )} sürüş.`,
    },
    ...rows.slice(0, 3).map((r) => ({
      question: `${trAblative(p.name)} ${trDative(r.province.name)} kaç km?`,
      answer: `${p.name} ile ${r.province.name} arası karayoluyla ${r.road.toLocaleString("tr-TR")} km, kuş uçuşu yaklaşık ${fmt(r.air)} km'dir. ${DEFAULT_AVG_KMH} km/sa ortalamayla yolculuk yaklaşık ${durationText(
        driveMinutes(r.road, DEFAULT_AVG_KMH)
      )} sürer.`,
    })),
    {
      question: `${p.name} hangi bölgede?`,
      answer: `${p.name}, ${p.region} Bölgesi'nde yer alır. Plaka kodu ${String(p.plate).padStart(2, "0")}, il merkezinin rakımı yaklaşık ${p.elevationM.toLocaleString("tr-TR")} metredir.`,
    },
  ];

  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/iller-arasi-mesafe", label: "İller Arası Mesafe" },
        { href: path, label: p.name },
      ]}
      crumbLabel="Sayfa yolu"
      title={`${trAblative(p.name)} İllere Mesafe`}
      intro={`${trAblative(p.name)} Türkiye'nin diğer 80 iline karayolu ve kuş uçuşu mesafeler, tahmini yol süreleri. Karayolu mesafeleri Karayolları Genel Müdürlüğü cetvelinden (${dateText}).`}
      tool={
        <div className="province-distance-tool">
          <div className="holiday-stats">
            <div>
              <strong>{nearest[0].road} km</strong>
              <span>En yakın: {nearest[0].province.name}</span>
            </div>
            <div>
              <strong>{farthest[0].road.toLocaleString("tr-TR")} km</strong>
              <span>En uzak: {farthest[0].province.name}</span>
            </div>
            <div>
              <strong>{within300}</strong>
              <span>il 300 km içinde</span>
            </div>
            <div>
              <strong>{fmt(avg)} km</strong>
              <span>ortalama uzaklık</span>
            </div>
          </div>
          <div className="tr-map-frame">
            <TurkeyMap
              ariaLabel={`${trAblative(p.name)} illere mesafe haritası`}
              fills={fills}
              hrefFor={(q) => (q.plate === p.plate ? null : `/iller-arasi-mesafe/${q.id}`)}
              titleFor={(q) => (q.plate === p.plate ? q.name : `${q.name}: ${rows.find((r) => r.province.plate === q.plate)!.road.toLocaleString("tr-TR")} km`)}
            />
          </div>
          <p className="tr-map-legend">
            <span className="tr-map-legend-bar" /> Yakın → uzak (karayolu km). Bir ile tıklayarak o ilin mesafe sayfasına geçin.
          </p>
          <p className="date-calc-links">
            <Link href={`/iller-arasi-mesafe?a=${p.id}&b=${rows[0].province.id}`} prefetch={false}>
              Yol süresi ve yakıt maliyetini hesapla →
            </Link>
          </p>
        </div>
      }
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: `/il-rakimlari/${p.id}`, label: `${trGenitive(p.name)} rakımı` },
          { href: `/koordinat-donusturucu?q=${p.lat},${p.lon}`, label: `${trGenitive(p.name)} koordinatları` },
          { href: "/iller-arasi-mesafe", label: "İller Arası Mesafe Hesaplama" },
          { href: "/turkiye-il-haritasi", label: "Türkiye İl Haritası" },
          { href: "/yerel-saat-hesaplama", label: "Yerel Saat Farkı Hesaplama" },
          { href: "/yakit-tuketimi-hesaplama", label: "Yakıt Tüketimi Hesaplama" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "tablo", label: `${trAblative(p.name)} tüm illere mesafe tablosu` },
        { id: "yakin-uzak", label: "En yakın ve en uzak iller" },
        { id: "il-bilgisi", label: `${p.name} hakkında` },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="tablo">{trAblative(p.name)} tüm illere mesafe tablosu</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">İl</th>
              <th scope="col">Karayolu</th>
              <th scope="col">Kuş uçuşu</th>
              <th scope="col">Tahmini süre</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.province.id}>
                <td>
                  <Link href={routePairPath(p, r.province) ?? `/iller-arasi-mesafe?a=${p.id}&b=${r.province.id}`} prefetch={false}>
                    {r.province.name}
                  </Link>
                </td>
                <td>{r.road.toLocaleString("tr-TR")} km</td>
                <td>{fmt(r.air)} km</td>
                <td>{durationText(driveMinutes(r.road, DEFAULT_AVG_KMH))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        <small>
          Süreler molasız ve {DEFAULT_AVG_KMH} km/sa ortalama hızla hesaplanmıştır; trafik, mola ve şehir içi geçişler dahil değildir.
        </small>
      </p>

      <h2 id="yakin-uzak">En yakın ve en uzak iller</h2>
      <p>
        {trDative(p.name)} karayoluyla en yakın beş il: {nearest.map((r) => `${r.province.name} (${r.road} km)`).join(", ")}. En uzak beş il:{" "}
        {farthest.map((r) => `${r.province.name} (${r.road.toLocaleString("tr-TR")} km)`).join(", ")}.
      </p>

      <h2 id="il-bilgisi">{p.name} hakkında</h2>
      <p>
        {p.name}, {p.region} Bölgesi&apos;nde yer alır; plaka kodu {String(p.plate).padStart(2, "0")}
        {p.center ? `, il merkezi ${p.center}` : ""}. İl merkezinin koordinatları yaklaşık {p.lat.toLocaleString("tr-TR")}° K,{" "}
        {p.lon.toLocaleString("tr-TR")}° D, rakımı yaklaşık {p.elevationM.toLocaleString("tr-TR")} metredir (
        <Link href={`/il-rakimlari/${p.id}`}>{trGenitive(p.name)} rakımı ve kaynama noktası</Link>).
      </p>
      <p>
        {trLocative(p.name)} Güneş&apos;e göre yerel saat, Türkiye&apos;nin resmî saatinden (UTC+3, 45° D meridyeni) yaklaşık {solarDiff} dakika geridedir.
        Nedenini <Link href="/yerel-saat-hesaplama">yerel saat farkı hesaplama</Link> sayfasında görebilirsiniz.
      </p>
    </TimeToolPage>
  );
}
