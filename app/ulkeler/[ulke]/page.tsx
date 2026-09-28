import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/app/components/SiteLink";
import WorldMap from "../../components/geo/WorldMap";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import {
  areaRank,
  cropViewBox,
  currencyNameTr,
  distanceFromAnkara,
  fxPairFor,
  neighborsOf,
  powerFor,
  TURKEY,
  timeDiffText,
  timeDiffWithTurkey,
} from "../../converter/geo/worldGeo";
import { findCountry, worldCountries } from "../../converter/geo/worldCountries";
import { worldCities } from "../../converter/time/worldCities";
import { trGenitive, trLocative } from "../../converter/turkishSuffix";
import { countryPathEn } from "../../converter/geo/worldGeoEn";
import { buildLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";

export const dynamicParams = false;
// Yaz saati gecisleri nedeniyle saat farki gunluk yenilenir.
export const revalidate = 86400;

export function generateStaticParams() {
  return worldCountries.map((c) => ({ ulke: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ ulke: string }> }): Promise<Metadata> {
  const c = findCountry((await params).ulke);
  if (!c) return {};
  const title = `${c.nameTr}: Başkenti, Yüzölçümü, Saat Farkı ve Haritası`;
  const description = `${trGenitive(c.nameTr)} başkenti ${c.capital}, yüzölçümü ${c.area.toLocaleString("tr-TR")} km². Türkiye ile saat farkı, Ankara'ya uzaklık, para birimi, telefon kodu, komşuları ve konum haritası.`;
  const path = `/ulkeler/${c.id}`;
  return {
    title,
    description,
    alternates: { canonical: path, ...buildLanguageAlternates({ tr: path, en: countryPathEn(c) }, "tr") },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
  };
}

const km = (n: number) => Math.round(n).toLocaleString("tr-TR");

/** Turkiye'de 12.00 iken hedefte saat kac (gun kaymasi notuyla). */
function noonThere(diffMinutes: number) {
  const total = 12 * 60 + diffMinutes;
  const norm = ((total % 1440) + 1440) % 1440;
  const text = `${String(Math.floor(norm / 60)).padStart(2, "0")}.${String(norm % 60).padStart(2, "0")}`;
  return total >= 1440 ? `${text} (ertesi gün)` : total < 0 ? `${text} (önceki gün)` : text;
}

export default async function CountryPage({ params }: { params: Promise<{ ulke: string }> }) {
  const c = findCountry((await params).ulke);
  if (!c) notFound();
  const now = new Date();
  const neighbors = neighborsOf(c);
  const diff = timeDiffWithTurkey(c, now);
  const dist = distanceFromAnkara(c);
  const isTurkey = c.iso3 === TURKEY.iso3;
  const areaRatio = c.area / TURKEY.area;
  const rank = areaRank(c);
  const power = powerFor(c);
  const city = worldCities.find((w) => w.timeZone === c.tz && w.countryTr === c.nameTr) ?? worldCities.find((w) => w.timeZone === c.tz);
  const fills: Record<string, string> = { [c.iso3]: "var(--tr-map-selected)" };
  for (const n of neighbors) fills[n.iso3] = "#9fcfcf";
  const viewBox = cropViewBox([c, ...neighbors.filter((n) => n.area < c.area * 6 || neighbors.length <= 2)]);
  const localTime = new Intl.DateTimeFormat("tr-TR", { timeZone: c.tz, hour: "2-digit", minute: "2-digit" });
  const path = `/ulkeler/${c.id}`;
  const areaCompare = isTurkey
    ? ""
    : areaRatio >= 1
      ? `Türkiye'nin yaklaşık ${areaRatio.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} katı`
      : `Türkiye'nin yaklaşık %${(areaRatio * 100).toLocaleString("tr-TR", { maximumFractionDigits: areaRatio < 0.01 ? 3 : 1 })} kadarı`;

  const faqItems: FaqItem[] = [
    {
      question: `${trGenitive(c.nameTr)} başkenti neresidir?`,
      answer: `${trGenitive(c.nameTr)} başkenti: ${c.capital}.${c.capitalNote ? ` ${c.nameTr}, ${c.capitalNote}` : ""}`,
    },
    {
      question: `${c.nameTr} kaç km²?`,
      answer: `${trGenitive(c.nameTr)} yüzölçümü yaklaşık ${c.area.toLocaleString("tr-TR")} km²'dir (${km(c.area * 0.386102)} mil²). Yüzölçümüne göre dünyada ${rank}. sıradadır${areaCompare ? `; ${areaCompare}` : ""}.`,
    },
    ...(isTurkey
      ? []
      : [
          {
            question: `${c.nameTr} ile Türkiye arasında kaç saat fark var?`,
            answer: `${c.capital} saatiyle ${c.nameTr} şu anda ${timeDiffText(diff)}${diff === 0 ? "" : " (Türkiye'ye göre)"}. Yaz saati uygulayan ülkelerde fark yıl içinde değişebilir; sayfa her gün güncellenir.`,
          },
          {
            question: `${c.nameTr} Türkiye'ye kaç km?`,
            answer: `Ankara ile ${c.capital} arasındaki kuş uçuşu mesafe yaklaşık ${km(dist)} km'dir. Uçakla, ortalama 800 km/sa seyir hızıyla yaklaşık ${Math.max(1, Math.round((dist / 800) * 10) / 10).toLocaleString("tr-TR")} saatlik uçuşa karşılık gelir (kalkış-iniş hariç).`,
          },
        ]),
    {
      question: `${trGenitive(c.nameTr)} para birimi nedir?`,
      answer: `${c.nameTr}, ${c.currencies.map((code) => `${currencyNameTr(code)} (${code})`).join(" ve ")} kullanır.`,
    },
  ];

  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/ulkeler", label: "Ülkeler" },
        { href: path, label: c.nameTr },
      ]}
      crumbLabel="Sayfa yolu"
      title={`${c.flag} ${c.nameTr}`}
      intro={`${c.region}${c.subregion ? ` · ${c.subregion}` : ""}. Başkent, yüzölçümü, Türkiye ile saat farkı ve uzaklık, para birimi, telefon kodu ve komşu ülkeler.`}
      tool={
        <div className="province-distance-tool">
          <div className="holiday-stats">
            <div>
              <strong>{c.capital}</strong>
              <span>başkent</span>
            </div>
            <div>
              <strong>{c.area.toLocaleString("tr-TR")} km²</strong>
              <span>yüzölçümü (dünyada {rank}.)</span>
            </div>
            {!isTurkey && (
              <div>
                <strong>{diff === 0 ? "Aynı saat" : `${diff > 0 ? "+" : "−"}${Math.abs(diff) / 60} sa`}</strong>
                <span>Türkiye ile saat farkı</span>
              </div>
            )}
            {!isTurkey && (
              <div>
                <strong>{km(dist)} km</strong>
                <span>Ankara&apos;ya kuş uçuşu</span>
              </div>
            )}
          </div>
          <div className="tr-map-frame world-map-frame">
            <WorldMap
              ariaLabel={`${trGenitive(c.nameTr)} konumu`}
              viewBox={viewBox}
              fills={fills}
              capitalDots={[c.iso3]}
              labels={[c.iso3, ...neighbors.map((n) => n.iso3)]}
              hrefFor={(x) => (x.iso3 === c.iso3 ? null : `/ulkeler/${x.id}`)}
            />
          </div>
          <p className="tr-map-legend">
            <span className="tr-map-legend-swatch" style={{ background: "var(--tr-map-selected)" }} /> {c.nameTr}
            {neighbors.length > 0 && (
              <>
                <span className="tr-map-legend-swatch" style={{ background: "#9fcfcf" }} /> Komşu ülkeler
              </>
            )}
            · Başka bir ülkeye tıklayarak o ülkenin sayfasına geçin.
          </p>
        </div>
      }
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/dunya-haritasi", label: "Dünya Haritası" },
          { href: "/ulkeler", label: "Ülkeler ve Başkentleri" },
          ...(city ? [{ href: `/dunya-saatleri/${city.tr}`, label: `${city.nameTr} saati` }] : [{ href: "/dunya-saatleri", label: "Dünya Saatleri" }]),
          ...c.currencies
            .map((code) => fxPairFor(code))
            .filter((p): p is NonNullable<typeof p> => Boolean(p))
            .map((p) => ({ href: `/doviz-cevirici/${p.slug}`, label: `${currencyNameTr(p.from)} kaç TL?` })),
          { href: "/seyahat-priz-voltaj-hesaplama", label: "Priz ve Voltaj Uyumu" },
          { href: "/saat-dilimi-cevirici", label: "Saat Dilimi Çevirici" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "bilgiler", label: `${c.nameTr} genel bilgiler` },
        ...(isTurkey ? [] : [{ id: "turkiye", label: "Türkiye ile karşılaştırma" }]),
        ...(neighbors.length ? [{ id: "komsular", label: "Komşu ülkeler" }] : []),
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="bilgiler">{c.nameTr} genel bilgiler</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <tbody>
            <tr>
              <th scope="row">Başkent</th>
              <td>
                {c.capital}
                {c.capitalNote ? <small> — {c.capitalNote}</small> : null}
              </td>
            </tr>
            <tr>
              <th scope="row">Kıta / bölge</th>
              <td>
                {c.region}
                {c.subregion ? `, ${c.subregion}` : ""}
                {c.landlocked ? " (denize kıyısı yok)" : ""}
              </td>
            </tr>
            <tr>
              <th scope="row">Yüzölçümü</th>
              <td>
                {c.area.toLocaleString("tr-TR")} km² · {km(c.area * 0.386102)} mil² · {km(c.area * 100)} hektar
              </td>
            </tr>
            <tr>
              <th scope="row">Para birimi</th>
              <td>
                {c.currencies.map((code, i) => {
                  const pair = fxPairFor(code);
                  return (
                    <span key={code}>
                      {i > 0 ? ", " : ""}
                      {currencyNameTr(code)} ({code})
                      {pair ? (
                        <>
                          {" "}
                          — <Link href={`/doviz-cevirici/${pair.slug}`}>güncel kur</Link>
                        </>
                      ) : null}
                    </span>
                  );
                })}
              </td>
            </tr>
            <tr>
              <th scope="row">Saat dilimi</th>
              <td>
                {c.tz.replace(/_/g, " ")} · şu an {localTime.format(now)}
                {!isTurkey ? ` (${timeDiffText(diff)})` : ""}
              </td>
            </tr>
            {c.phone && (
              <tr>
                <th scope="row">Telefon kodu</th>
                <td>{c.phone}</td>
              </tr>
            )}
            {c.tld && (
              <tr>
                <th scope="row">İnternet uzantısı</th>
                <td>{c.tld}</td>
              </tr>
            )}
            {power && (
              <tr>
                <th scope="row">Elektrik</th>
                <td>
                  {power.voltageLabel}, {power.frequencyLabel} · priz tipleri {power.plugTypes.join(", ")} (
                  <Link href="/seyahat-priz-voltaj-hesaplama">adaptör gerekir mi?</Link>)
                </td>
              </tr>
            )}
            <tr>
              <th scope="row">Başkent koordinatı</th>
              <td>
                <Link href={`/koordinat-donusturucu?q=${c.capLat},${c.capLon}`}>
                  {c.capLat.toLocaleString("tr-TR")}, {c.capLon.toLocaleString("tr-TR")}
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {!isTurkey && (
        <>
          <h2 id="turkiye">Türkiye ile karşılaştırma</h2>
          <ul>
            <li>
              Yüzölçümü: {c.nameTr} {c.area.toLocaleString("tr-TR")} km², Türkiye {TURKEY.area.toLocaleString("tr-TR")} km² — {areaCompare}.
            </li>
            <li>
              Saat: {c.capital} saati Türkiye&apos;den {timeDiffText(diff).replace("Türkiye ile aynı saat", "farksız")}. Türkiye&apos;de saat 12.00 iken{" "}
              {trLocative(c.capital)} saat {noonThere(diff)}.
            </li>
            <li>
              Uzaklık: Ankara–{c.capital} arası kuş uçuşu yaklaşık {km(dist)} km. Kuş uçuşu mesafeyi başka noktalar için{" "}
              <Link href="/buyuk-daire-mesafesi-hesaplama">büyük daire mesafesi hesaplayıcısıyla</Link> bulabilirsiniz.
            </li>
          </ul>
        </>
      )}

      {neighbors.length > 0 && (
        <>
          <h2 id="komsular">Komşu ülkeler</h2>
          <p>
            {trGenitive(c.nameTr)} kara sınırı bulunan {neighbors.length} komşusu:{" "}
            {neighbors.map((n, i) => (
              <span key={n.iso3}>
                {i > 0 ? ", " : ""}
                <Link href={`/ulkeler/${n.id}`} prefetch={false}>
                  {n.nameTr}
                </Link>
              </span>
            ))}
            .
          </p>
        </>
      )}
      <p>
        <small>
          Kaynaklar: ülke verileri mledoze/countries (ODbL), başkent koordinatları GeoNames (CC BY 4.0), sınırlar Natural Earth. Yüzölçümü değerleri iç
          suları içerebilir; kaynaklar arasında küçük farklar olabilir.
        </small>
      </p>
    </TimeToolPage>
  );
}
