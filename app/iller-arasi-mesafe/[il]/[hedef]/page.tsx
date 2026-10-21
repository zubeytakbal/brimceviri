import type { Metadata } from "next";
import { seoTitle } from "../../../seoTitle";
import { notFound } from "next/navigation";
import Link from "@/app/components/SiteLink";
import ProvinceDistanceCalculator from "../../../components/geo/ProvinceDistanceCalculator";
import TurkeyMap, { provinceMapCenters } from "../../../components/geo/TurkeyMap";
import RotaHaritasi from "../../../components/yol/RotaHaritasi";
import YolculukPlani from "../../../components/yol/YolculukPlani";
import NavigasyonEkrani from "../../../components/yol/NavigasyonEkrani";
import { ilGorseli } from "../../../components/yol/ilGorselleri";
import YolSayfasi from "../../../components/yol/YolSayfasi";
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

  const sure = durationText(driveMinutes(road, DEFAULT_AVG_KMH));
  const crumbs = [
    { href: "/", label: "Ana Sayfa" },
    { href: "/iller-arasi-mesafe", label: "İller Arası Mesafe" },
    { href: `/iller-arasi-mesafe/${from.id}`, label: from.name },
    { href: path, label: to.name },
  ];

  return (
    <YolSayfasi
      crumbs={crumbs}
      baslik={`${from.name} ${to.name} Arası Kaç Km?`}
      faqItems={faqItems}
      ust={
        <NavigasyonEkrani
          baslik={`${from.name} ${to.name} Arası Kaç Km?`}
          nereden={from.name}
          nereye={to.name}
          km={road}
          kusUcusu={Math.round(air)}
          hiz={DEFAULT_AVG_KMH}
          gorsel={ilGorseli(to.id)}
          profil={[
            { ad: from.name, km: 0, rakim: from.elevationM },
            ...stops.map((x) => ({ ad: x.province.name, km: x.fromStart, rakim: x.province.elevationM })),
            { ad: to.name, km: road, rakim: to.elevationM },
          ]}
        />
      }
    >
      <p className="yol-ozet">
        {from.name} ile {to.name} arası karayoluyla {fmt(road)} km, kuş uçuşu {fmt(air)} km. {DEFAULT_AVG_KMH} km/sa ortalamayla yaklaşık {sure} sürer. Mesafe:
        Karayolları Genel Müdürlüğü cetveli ({dateText}).
      </p>

      <section className="yol-bolum yol-plan-bolum" id="plan">
        <h2 className="yol-bolum-baslik">Yolculuk planı</h2>
        <div className="yol-plan-izgara">
          <figure className="yol-harita">
            <RotaHaritasi from={from} to={to} duraklar={stops.map((x) => x.province)} />
            <figcaption>
              {stops.length ? `${stops.length} il merkezinden geçer` : "Başka bir il merkezinden geçilmez"} · {fmt(road)} km
            </figcaption>
          </figure>
          <YolculukPlani nereden={from.name} nereye={to.name} km={road} duraklar={stops.map((x) => ({ ad: x.province.name, km: x.fromStart }))} yakitFiyati={price} />
        </div>
      </section>

      <section className="yol-bolum" id="guzergah">
        <h2 className="yol-bolum-baslik">
          {from.name} – {to.name} yolu üzerindeki iller
        </h2>
        <ol className="yol-taslar">
          <li className="is-uc">
            <span className="yol-tas">0</span>
            <b>{from.name}</b>
            <small>çıkış · {fmt(from.elevationM)} m</small>
          </li>
          {stops.map((x) => (
            <li key={x.province.id}>
              <span className="yol-tas">{fmt(x.fromStart)}</span>
              <b>
                <Link href={`/il-rakimlari/${x.province.id}`} prefetch={false}>
                  {x.province.name}
                </Link>
              </b>
              <small>
                {durationText(driveMinutes(x.fromStart, DEFAULT_AVG_KMH))} · {trDative(to.name)} {fmt(Math.max(road - x.fromStart, 0))} km · {fmt(x.province.elevationM)} m
              </small>
            </li>
          ))}
          <li className="is-uc">
            <span className="yol-tas">{fmt(road)}</span>
            <b>{to.name}</b>
            <small>
              varış · {sure} · {fmt(to.elevationM)} m
            </small>
          </li>
        </ol>
        <p className="yol-not">
          {yari ? <>Yolun yarısı {yari.province.name} civarında ({fmt(yari.fromStart)}. km). </> : null}
          {molalar.length ? <>Yaklaşık 2,5 saatte bir mola için uygun duraklar: {molalar.map((x) => `${x.province.name} (${fmt(x.fromStart)}. km)`).join(", ")}. </> : null}
          Yol boyunca il merkezlerinin rakımı {fmt(Math.min(...rakimlar))} m ile {fmt(Math.max(...rakimlar))} m arasında değişir.
        </p>
      </section>

      <div className="yol-ikili">
        <section className="yol-bolum" id="sure">
          <h2 className="yol-bolum-baslik">Farklı hızlarda süre</h2>
          <table className="yol-tablo">
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
          <p className="yol-not">Süreler molasızdır{breaks > 0 ? `; ${fmt(road)} km için ${breaks} mola eklemeyi planlayın` : ""}.</p>
        </section>

        <section className="yol-bolum" id="yakit">
          <h2 className="yol-bolum-baslik">Yakıt ve maliyet</h2>
          <table className="yol-tablo">
            <thead>
              <tr>
                <th scope="col">Tüketim</th>
                <th scope="col">Tek yön</th>
                <th scope="col">Gidiş-dönüş</th>
                {price ? <th scope="col">Maliyet</th> : null}
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
          <p className="yol-not">
            {price ? `Tek yön maliyet ${fmt(price, 2)} TL/L benzin fiyatıyla. ` : ""}
            Kendi aracınız için: <Link href="/yakit-tuketimi-hesaplama">yakıt tüketimi hesaplama</Link>.
          </p>
        </section>
      </div>

      <section className="yol-bolum" id="iller">
        <h2 className="yol-bolum-baslik">
          {from.name} ve {to.name} karşılaştırması
        </h2>
        <div className="yol-iller">
          {[from, to].map((p) => (
            <div key={p.id} className="yol-il">
              <span className="yol-plaka">TR {String(p.plate).padStart(2, "0")}</span>
              <b>{p.name}</b>
              <dl>
                <dt>Bölge</dt>
                <dd>{p.region}</dd>
                <dt>Rakım</dt>
                <dd>
                  <Link href={`/il-rakimlari/${p.id}`} prefetch={false}>
                    {fmt(p.elevationM)} m
                  </Link>
                </dd>
                <dt>Koordinat</dt>
                <dd>
                  {fmt(p.lat, 2)}° K, {fmt(p.lon, 2)}° D
                </dd>
              </dl>
            </div>
          ))}
        </div>
        <p className="yol-not">
          {Math.abs(elevDiff) < 20
            ? `İki il neredeyse aynı yükseklikte. `
            : `${to.name}, ${trAblative(from.name)} ${fmt(Math.abs(elevDiff))} m daha ${elevDiff > 0 ? "yüksekte" : "alçakta"}. `}
          {Math.abs(solarDiff) < 2
            ? `İki il neredeyse aynı boylamda olduğu için Güneş hemen hemen aynı anda doğar.`
            : `${to.name}, ${trGenitive(from.name)} ${solarDiff > 0 ? "doğusunda" : "batısında"} olduğu için ${trLocative(to.name)} Güneş yaklaşık ${Math.abs(solarDiff)} dakika ${
                solarDiff > 0 ? "önce" : "sonra"
              } doğar ve batar (her boylam derecesi 4 dakika).`}
        </p>
      </section>

      <section className="yol-bolum" id="baska">
        <h2 className="yol-bolum-baslik">Başka iki il arası</h2>
        <ProvinceDistanceCalculator
          centers={provinceMapCenters()}
          fuelPrice={price}
          initialA={from.plate}
          initialB={to.plate}
          map={<TurkeyMap ariaLabel={`${from.name} – ${to.name} haritası`} selectable titleFor={(p) => `${p.plate} ${p.name}`} />}
        />
      </section>

      <section className="yol-bolum" id="diger">
        <h2 className="yol-bolum-baslik">İlgili güzergâhlar</h2>
        <p className="yol-linkler">
          <Link href={`/iller-arasi-mesafe/${from.id}`}>{trAblative(from.name)} tüm illere</Link>
          <Link href={`/iller-arasi-mesafe/${to.id}`}>{trAblative(to.name)} tüm illere</Link>
          {nearby.map((n) => (
            <Link key={n.p.id} href={n.href} prefetch={false}>
              {from.name} – {n.p.name} <small>{fmt(roadKm(from, n.p))} km</small>
            </Link>
          ))}
          <Link href="/turkiye-il-haritasi">Türkiye il haritası</Link>
        </p>
      </section>
    </YolSayfasi>
  );
}
