import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/app/components/SiteLink";
import WorldMap from "../../components/geo/WorldMap";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { findWorldRegion, worldRegionPages } from "../../converter/geo/worldRegions";
import { cropViewBox, distanceFromAnkara, timeDiffText, timeDiffWithTurkey } from "../../converter/geo/worldGeo";
import { countryByIso3, type WorldCountry } from "../../converter/geo/worldCountries";
import { buildSiteUrl } from "../../siteConfig";

export const dynamicParams = false;
export const revalidate = 86400;

export function generateStaticParams() {
  return worldRegionPages.map((r) => ({ bolge: r.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ bolge: string }> }): Promise<Metadata> {
  const r = findWorldRegion((await params).bolge);
  if (!r) return {};
  const names = r.members.map((m) => countryByIso3(m)?.nameTr).filter(Boolean);
  const title = `${r.title}: Ülkeler, Başkentler ve Saat Farkları`;
  const description = `${r.title.replace(" Haritası", "")} ülkeleri haritada: ${names.slice(0, 6).join(", ")}${names.length > 6 ? " ve diğerleri" : ""}. Başkentler, yüzölçümleri, Türkiye ile saat farkı ve Ankara'ya uzaklık.`;
  const path = `/bolge-haritalari/${r.id}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
  };
}

const km = (n: number) => Math.round(n).toLocaleString("tr-TR");

export default async function RegionMapPage({ params }: { params: Promise<{ bolge: string }> }) {
  const r = findWorldRegion((await params).bolge);
  if (!r) notFound();
  const now = new Date();
  const pick = (list?: string[]) => (list ?? []).map((m) => countryByIso3(m)).filter((c): c is WorldCountry => Boolean(c));
  const members = pick(r.members);
  const partial = pick(r.partial);
  const observers = pick(r.observers);
  const fills: Record<string, string> = {};
  for (const c of members) fills[c.iso3] = "#2c7f99";
  for (const c of partial) fills[c.iso3] = "#9fcfcf";
  for (const c of observers) fills[c.iso3] = "#f0b429";
  // Kismi ulkeler (Rusya gibi buyukler) cerceveyi buyutmesin
  const viewBox = cropViewBox([...members, ...observers.filter((o) => o.area < 400000)]);
  const rows = [...members, ...observers].sort((a, b) => b.area - a.area);
  const totalArea = members.reduce((s, c) => s + c.area, 0);
  const regionName = r.title.replace(" Haritası", "");

  const faqItems: FaqItem[] = [
    {
      question: `${regionName} bölgesinde hangi ülkeler var?`,
      answer: `${members.map((c) => c.nameTr).join(", ")}${partial.length ? `. Kısmen bölgede sayılanlar: ${partial.map((c) => c.nameTr).join(", ")}` : ""}${observers.length ? `. Gözlemciler: ${observers.map((c) => c.nameTr).join(", ")}` : ""}.`,
    },
    {
      question: `${regionName} bölgesinin en büyük ülkesi hangisi?`,
      answer: `${[...members].sort((a, b) => b.area - a.area)[0].nameTr} (${[...members].sort((a, b) => b.area - a.area)[0].area.toLocaleString("tr-TR")} km²). Bu haritadaki ülkelerin toplam yüzölçümü yaklaşık ${km(totalArea)} km²'dir.`,
    },
  ];

  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/dunya-haritasi", label: "Dünya Haritası" },
        { href: `/bolge-haritalari/${r.id}`, label: r.title },
      ]}
      crumbLabel="Sayfa yolu"
      title={r.title}
      intro={r.intro}
      tool={
        <div className="province-distance-tool">
          <div className="tr-map-frame world-map-frame">
            <WorldMap
              ariaLabel={r.title}
              viewBox={viewBox}
              fills={fills}
              capitalDots={[...members, ...observers].map((c) => c.iso3)}
              labels={[...members, ...observers].map((c) => c.iso3)}
              hrefFor={(c) => `/ulkeler/${c.id}`}
              titleFor={(c) => `${c.nameTr} (${c.capital})`}
            />
          </div>
          <p className="tr-map-legend">
            <span className="tr-map-legend-swatch" style={{ background: "#2c7f99" }} /> {r.observers ? "Üye ülkeler" : "Bölge ülkeleri"}
            {partial.length > 0 && (
              <>
                <span className="tr-map-legend-swatch" style={{ background: "#9fcfcf" }} /> Kısmen bölgede
              </>
            )}
            {observers.length > 0 && (
              <>
                <span className="tr-map-legend-swatch" style={{ background: "#f0b429" }} /> Gözlemci
              </>
            )}
            · Ülke sayfası için haritada bir ülkeye tıklayın.
          </p>
        </div>
      }
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/dunya-haritasi", label: "Dünya Haritası" },
          { href: "/ulkeler", label: "Ülkeler ve Başkentleri" },
          ...worldRegionPages.filter((x) => x.id !== r.id).map((x) => ({ href: `/bolge-haritalari/${x.id}`, label: x.title })),
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "ulkeler", label: `${regionName} ülkeleri ve başkentleri` },
        { id: "bilgi", label: "Bölge hakkında" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="ulkeler">{regionName} ülkeleri ve başkentleri</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Ülke</th>
              <th scope="col">Başkent</th>
              <th scope="col">Yüzölçümü</th>
              <th scope="col">Türkiye ile saat</th>
              <th scope="col">Ankara&apos;ya uzaklık</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.iso3}>
                <td>
                  <Link href={`/ulkeler/${c.id}`} prefetch={false}>
                    {c.flag} {c.nameTr}
                  </Link>
                  {observers.includes(c) ? <small> (gözlemci)</small> : null}
                </td>
                <td>{c.capital}</td>
                <td>{c.area.toLocaleString("tr-TR")} km²</td>
                <td>{c.iso3 === "TUR" ? "—" : timeDiffText(timeDiffWithTurkey(c, now)).replace("Türkiye ile aynı saat", "aynı")}</td>
                <td>{c.iso3 === "TUR" ? "—" : `${km(distanceFromAnkara(c))} km`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="bilgi">Bölge hakkında</h2>
      {r.paragraphs.map((p) => (
        <p key={p.slice(0, 30)}>{p}</p>
      ))}
      <p>
        Tüm ülkeleri tek haritada görmek için <Link href="/dunya-haritasi">dünya haritasına</Link>, şehirlerin güncel saatleri için{" "}
        <Link href="/dunya-saatleri">dünya saatlerine</Link> bakabilirsiniz.
      </p>
    </TimeToolPage>
  );
}
