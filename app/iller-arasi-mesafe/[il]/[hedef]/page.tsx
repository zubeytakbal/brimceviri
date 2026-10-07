import type { Metadata } from "next";
import { seoTitle } from "../../../seoTitle";
import { notFound } from "next/navigation";
import Link from "@/app/components/SiteLink";
import ProvinceDistanceCalculator from "../../../components/geo/ProvinceDistanceCalculator";
import TurkeyMap, { provinceMapCenters } from "../../../components/geo/TurkeyMap";
import TimeToolPage from "../../../components/time/TimeToolPage";
import type { FaqItem } from "../../../converter/faqSchema";
import { KGM_DISTANCE_DATE } from "../../../converter/geo/kgmDistances";
import { airKm, DEFAULT_AVG_KMH, distancesFrom, driveMinutes, durationText, roadKm, routeStops } from "../../../converter/geo/provinceDistances";
import { findRoutePair, routePairPath, routePairs } from "../../../converter/geo/routePairs";
import { getNationalGasolinePrice } from "../../../converter/liveFuelPrice";
import { trAblative, trDative, trGenitive, trLocative } from "../../../converter/turkishSuffix";
import { buildSiteUrl } from "../../../siteConfig";

export const dynamicParams = false;
// Yakit fiyati icin saatlik yenilenir.
export const revalidate = 3600;

export function generateStaticParams() {
  return routePairs().map((p) => ({ il: p.from.id, hedef: p.to.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ il: string; hedef: string }> }): Promise<Metadata> {
  const { il, hedef } = await params;
  const pair = findRoutePair(il, hedef);
  if (!pair) return {};
  const { from, to } = pair;
  const road = roadKm(from, to);
  const title = `${from.name} ${to.name} Arası Kaç Km? (${road.toLocaleString("tr-TR")} km, Süre ve Yakıt)`;
  const description = `${from.name} ile ${to.name} arası karayoluyla ${road.toLocaleString("tr-TR")} km (Karayolları), kuş uçuşu ${Math.round(airKm(from, to))} km. Arabayla yaklaşık ${durationText(
    driveMinutes(road, DEFAULT_AVG_KMH)
  )}; yakıt tüketimi ve maliyet hesabı, harita.`;
  const path = `/iller-arasi-mesafe/${from.id}/${to.id}`;
  return {
    title: seoTitle(title, `${from.name} ${to.name} Arası Kaç Km? (${road.toLocaleString("tr-TR")} km)`, `${from.name} ${to.name} Arası Kaç Km?`),
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
  };
}

const fmt = (n: number, d = 0) => n.toLocaleString("tr-TR", { maximumFractionDigits: d });

export default async function RoutePairPage({ params }: { params: Promise<{ il: string; hedef: string }> }) {
  const { il, hedef } = await params;
  const pair = findRoutePair(il, hedef);
  if (!pair) notFound();
  const { from, to } = pair;
  const road = roadKm(from, to);
  const air = airKm(from, to);
  const fuel = await getNationalGasolinePrice();
  const price = fuel?.priceTl ?? null;
  const breaks = Math.floor(driveMinutes(road, DEFAULT_AVG_KMH) / 150);
  const elevDiff = to.elevationM - from.elevationM;
  const solarDiff = Math.round((to.lon - from.lon) * 4);
  const dateText = new Intl.DateTimeFormat("tr-TR", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(KGM_DISTANCE_DATE));
  const path = `/iller-arasi-mesafe/${from.id}/${to.id}`;
  const stops = routeStops(from, to);
  const yari = stops.length ? stops.reduce((b, x) => (Math.abs(x.fromStart - road / 2) < Math.abs(b.fromStart - road / 2) ? x : b)) : null;
  // Yaklaşık her 2,5 saatte (≈210 km) bir mola: o noktaya en yakın yol üstü il
  const molalar =
    stops.length && road > 300
      ? Array.from({ length: Math.floor(road / 210) }, (_, i) => (i + 1) * 210)
          .filter((km) => km < road - 60)
          .map((km) => stops.reduce((b, x) => (Math.abs(x.fromStart - km) < Math.abs(b.fromStart - km) ? x : b)))
          .filter((x, i, arr) => arr.findIndex((y) => y.province.id === x.province.id) === i)
      : [];
  const rakimlar = stops.map((x) => x.province.elevationM).concat(from.elevationM, to.elevationM);
  // Ayni cikistan en yakin diger guzergahlar
  const nearby = distancesFrom(from)
    .filter((r) => r.province.id !== to.id)
    .sort((x, y) => Math.abs(x.road - road) - Math.abs(y.road - road))
    .slice(0, 8)
    .map((r) => ({ p: r.province, href: routePairPath(from, r.province) }))
    .filter((x): x is { p: typeof x.p; href: string } => Boolean(x.href));

  const faqItems: FaqItem[] = [
    {
      question: `${from.name} ${to.name} arası kaç km?`,
      answer: `Karayolları Genel Müdürlüğü verilerine göre ${from.name} ile ${to.name} il merkezleri arası karayoluyla ${fmt(road)} km'dir. İki şehir arasındaki kuş uçuşu mesafe yaklaşık ${fmt(air)} km'dir.`,
    },
    {
      question: `${trAblative(from.name)} ${trDative(to.name)} arabayla kaç saat?`,
      answer: `Ortalama ${DEFAULT_AVG_KMH} km/sa hızla molasız yaklaşık ${durationText(driveMinutes(road, DEFAULT_AVG_KMH))} sürer. ${
        breaks > 0 ? `Her 2–2,5 saatte bir mola verildiğinde ${breaks} mola eklenir; trafik ve şehir içi geçişlerle süre uzayabilir.` : "Kısa bir yolculuk olduğu için mola genellikle gerekmez."
      }`,
    },
    {
      question: `${from.name} ${to.name} arası kaç litre benzin yakar?`,
      answer: `100 km'de 7 litre yakan bir otomobil ${fmt(road)} km'lik yolda yaklaşık ${fmt((road * 7) / 100, 1)} litre yakıt tüketir${
        price ? `; güncel ortalama benzin fiyatıyla bu yaklaşık ${fmt(((road * 7) / 100) * price)} TL eder` : ""
      }.`,
    },
    {
      question: `${from.name} ${to.name} yolu hangi illerden geçer?`,
      answer: stops.length
        ? `Karayolları mesafe cetveline göre ${trAblative(from.name)} ${trDative(to.name)} giden yol ${stops.map((x) => `${x.province.name} (${fmt(x.fromStart)}. km)`).join(", ")} il merkezlerinin içinden ya da yakınından geçer.${yari ? ` Yolun yarısı ${yari.province.name} civarındadır.` : ""}`
        : `${from.name} ile ${to.name} arasında başka bir il merkezinden geçilmez; iki il doğrudan bağlanır.`,
    },
    {
      question: `${from.name} ile ${to.name} arasında rakım farkı ne kadar?`,
      answer: `${trGenitive(from.name)} il merkezi yaklaşık ${fmt(from.elevationM)} m, ${trGenitive(to.name)} yaklaşık ${fmt(to.elevationM)} m yüksekliktedir; ${to.name} ${Math.abs(elevDiff) < 20 ? "neredeyse aynı yükseklikte" : `${fmt(Math.abs(elevDiff))} m daha ${elevDiff > 0 ? "yüksekte" : "alçakta"}`}.`,
    },
  ];

  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/iller-arasi-mesafe", label: "İller Arası Mesafe" },
        { href: `/iller-arasi-mesafe/${from.id}`, label: from.name },
        { href: path, label: to.name },
      ]}
      crumbLabel="Sayfa yolu"
      title={`${from.name} ${to.name} Arası Kaç Km?`}
      intro={`${from.name} ile ${to.name} arası karayoluyla ${fmt(road)} km, kuş uçuşu ${fmt(air)} km. 85 km/sa ortalamayla yaklaşık ${durationText(driveMinutes(road, DEFAULT_AVG_KMH))} sürer.`}
      tool={
        <ProvinceDistanceCalculator
          centers={provinceMapCenters()}
          fuelPrice={price}
          initialA={from.plate}
          initialB={to.plate}
          map={<TurkeyMap ariaLabel={`${from.name} – ${to.name} haritası`} selectable titleFor={(p) => `${p.plate} ${p.name}`} />}
        />
      }
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: `/iller-arasi-mesafe/${from.id}`, label: `${trAblative(from.name)} tüm illere mesafe` },
          { href: `/iller-arasi-mesafe/${to.id}`, label: `${trAblative(to.name)} tüm illere mesafe` },
          { href: `/il-rakimlari/${to.id}`, label: `${trGenitive(to.name)} rakımı` },
          { href: "/yakit-tuketimi-hesaplama", label: "Yakıt Tüketimi Hesaplama" },
          { href: "/turkiye-il-haritasi", label: "Türkiye İl Haritası" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "guzergah", label: "Yol üzerindeki iller" },
        { id: "sure", label: "Farklı hızlarda yolculuk süresi" },
        { id: "yakit", label: "Yakıt tüketimi ve maliyet" },
        { id: "iller", label: `${from.name} ve ${to.name} karşılaştırması` },
        ...(nearby.length ? [{ id: "diger", label: `${trAblative(from.name)} diğer güzergâhlar` }] : []),
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="guzergah">
        {from.name} – {to.name} yolu üzerindeki iller
      </h2>
      {stops.length ? (
        <>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <thead>
                <tr>
                  <th scope="col">İl merkezi</th>
                  <th scope="col">{trAblative(from.name)}</th>
                  <th scope="col">{trDative(to.name)} kalan</th>
                  <th scope="col">Süre ({DEFAULT_AVG_KMH} km/sa)</th>
                  <th scope="col">Rakım</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">{from.name} (çıkış)</th>
                  <td>0 km</td>
                  <td>{fmt(road)} km</td>
                  <td>—</td>
                  <td>{fmt(from.elevationM)} m</td>
                </tr>
                {stops.map((x) => (
                  <tr key={x.province.id}>
                    <th scope="row">
                      <Link href={`/il-rakimlari/${x.province.id}`} prefetch={false}>
                        {x.province.name}
                      </Link>
                    </th>
                    <td>{fmt(x.fromStart)} km</td>
                    <td>{fmt(Math.max(road - x.fromStart, 0))} km</td>
                    <td>{durationText(driveMinutes(x.fromStart, DEFAULT_AVG_KMH))}</td>
                    <td>{fmt(x.province.elevationM)} m</td>
                  </tr>
                ))}
                <tr>
                  <th scope="row">{to.name} (varış)</th>
                  <td>{fmt(road)} km</td>
                  <td>0 km</td>
                  <td>{durationText(driveMinutes(road, DEFAULT_AVG_KMH))}</td>
                  <td>{fmt(to.elevationM)} m</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            {yari ? <>Yolun yarısı {yari.province.name} civarında ({fmt(yari.fromStart)}. km). </> : null}
            {molalar.length ? (
              <>
                Yaklaşık 2,5 saatte bir mola için uygun duraklar: {molalar.map((x) => `${x.province.name} (${fmt(x.fromStart)}. km)`).join(", ")}.{" "}
              </>
            ) : null}
            Yol boyunca il merkezlerinin rakımı {fmt(Math.min(...rakimlar))} m ile {fmt(Math.max(...rakimlar))} m arasında değişir.
          </p>
        </>
      ) : (
        <p>
          {from.name} ile {to.name} arasında başka bir il merkezinden geçilmez; iki il doğrudan bağlanır ({fmt(road)} km).
        </p>
      )}

      <h2 id="sure">Farklı hızlarda yolculuk süresi</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Ortalama hız</th>
              <th scope="col">Tek yön</th>
              <th scope="col">Gidiş-dönüş</th>
            </tr>
          </thead>
          <tbody>
            {[70, 85, 100, 110].map((v) => (
              <tr key={v}>
                <td>{v} km/sa</td>
                <td>{durationText(driveMinutes(road, v))}</td>
                <td>{durationText(driveMinutes(road * 2, v))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Süreler molasızdır{breaks > 0 ? `; ${fmt(road)} km için ${breaks} mola eklemeyi planlayın` : ""}.
      </p>

      <h2 id="yakit">Yakıt tüketimi ve maliyet</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Tüketim</th>
              <th scope="col">Tek yön</th>
              <th scope="col">Gidiş-dönüş</th>
              {price ? <th scope="col">Tek yön maliyet</th> : null}
            </tr>
          </thead>
          <tbody>
            {[5, 6.5, 8, 10].map((c) => {
              const liters = (road * c) / 100;
              return (
                <tr key={c}>
                  <td>{fmt(c, 1)} L/100 km</td>
                  <td>{fmt(liters, 1)} L</td>
                  <td>{fmt(liters * 2, 1)} L</td>
                  {price ? <td>≈ {fmt(liters * price)} TL</td> : null}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p>
        {price ? `Maliyet ${fmt(price, 2)} TL/L benzin fiyatıyla. ` : ""}
        Kendi aracınız için: <Link href="/yakit-tuketimi-hesaplama">yakıt tüketimi hesaplama</Link>.
      </p>

      <h2 id="iller">
        {from.name} ve {to.name} karşılaştırması
      </h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col" />
              <th scope="col">{from.name}</th>
              <th scope="col">{to.name}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Bölge</th>
              <td>{from.region}</td>
              <td>{to.region}</td>
            </tr>
            <tr>
              <th scope="row">Plaka</th>
              <td>{String(from.plate).padStart(2, "0")}</td>
              <td>{String(to.plate).padStart(2, "0")}</td>
            </tr>
            <tr>
              <th scope="row">Rakım</th>
              <td>{fmt(from.elevationM)} m</td>
              <td>{fmt(to.elevationM)} m</td>
            </tr>
            <tr>
              <th scope="row">Koordinat</th>
              <td>
                {fmt(from.lat, 2)}° K, {fmt(from.lon, 2)}° D
              </td>
              <td>
                {fmt(to.lat, 2)}° K, {fmt(to.lon, 2)}° D
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        {Math.abs(solarDiff) < 2
          ? `İki il neredeyse aynı boylamda olduğu için Güneş hemen hemen aynı anda doğar.`
          : `${to.name}, ${trGenitive(from.name)} ${solarDiff > 0 ? "doğusunda" : "batısında"} olduğu için ${trLocative(to.name)} Güneş yaklaşık ${Math.abs(solarDiff)} dakika ${
              solarDiff > 0 ? "önce" : "sonra"
            } doğar ve batar (her boylam derecesi 4 dakika).`}{" "}
        Mesafe: Karayolları Genel Müdürlüğü cetveli ({dateText}).
      </p>

      {nearby.length > 0 && (
        <>
          <h2 id="diger">{trAblative(from.name)} diğer güzergâhlar</h2>
          <p className="province-link-list">
            {nearby.map((n) => (
              <Link key={n.p.id} href={n.href} prefetch={false}>
                {from.name} – {n.p.name} ({fmt(roadKm(from, n.p))} km)
              </Link>
            ))}
          </p>
        </>
      )}
    </TimeToolPage>
  );
}
