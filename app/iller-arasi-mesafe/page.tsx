import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import ProvinceDistanceCalculator from "../components/geo/ProvinceDistanceCalculator";
import TurkeyMap, { provinceMapCenters } from "../components/geo/TurkeyMap";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { geoRelated } from "../converter/geo/geoTools";
import { KGM_DISTANCE_DATE } from "../converter/geo/kgmDistances";
import { airKm, DEFAULT_AVG_KMH, driveMinutes, durationText, roadKm } from "../converter/geo/provinceDistances";
import { routePairPath } from "../converter/geo/routePairs";
import { findProvince, turkeyProvinces, TURKEY_REGIONS } from "../converter/geo/turkeyProvinces";
import { getNationalGasolinePrice } from "../converter/liveFuelPrice";
import { buildSiteUrl } from "../siteConfig";

// Yakit fiyati saatlik yenilenir.
export const revalidate = 3600;

const path = "/iller-arasi-mesafe";
const title = "İller Arası Mesafe Hesaplama: Karayolu ve Kuş Uçuşu (km)";
const description =
  "81 il arasındaki karayolu mesafesi (Karayolları Genel Müdürlüğü 2026 cetveli), kuş uçuşu mesafe, tahmini yol süresi ve yakıt maliyeti. Harita üzerinde il seçerek hesaplayın.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const POPULAR: Array<[string, string]> = [
  ["istanbul", "ankara"],
  ["istanbul", "izmir"],
  ["ankara", "izmir"],
  ["istanbul", "antalya"],
  ["ankara", "antalya"],
  ["istanbul", "bursa"],
  ["izmir", "antalya"],
  ["ankara", "konya"],
  ["istanbul", "trabzon"],
  ["ankara", "samsun"],
  ["istanbul", "diyarbakir"],
  ["ankara", "erzurum"],
  ["istanbul", "van"],
  ["adana", "gaziantep"],
  ["istanbul", "edirne"],
  ["izmir", "denizli"],
];

const dateText = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(KGM_DISTANCE_DATE));

const faqItems: FaqItem[] = [
  {
    question: "İller arası mesafeler hangi kaynaktan alınıyor?",
    answer: `Karayolu mesafeleri Karayolları Genel Müdürlüğü'nün yayımladığı İller Arası Mesafe Cetveli'nden (${dateText} güncellemesi) alınmıştır ve il merkezleri arasındaki mesafeyi gösterir. Kuş uçuşu mesafe, il merkezlerinin koordinatlarıyla büyük daire formülüyle hesaplanır.`,
  },
  {
    question: "İstanbul Ankara arası kaç km?",
    answer: `Karayolları cetveline göre İstanbul ile Ankara arası karayoluyla ${roadKm(findProvince("istanbul")!, findProvince("ankara")!)} km, kuş uçuşu yaklaşık ${Math.round(airKm(findProvince("istanbul")!, findProvince("ankara")!))} km'dir.`,
  },
  {
    question: "Yol süresi nasıl hesaplanıyor?",
    answer: `Süre, karayolu mesafesinin seçtiğiniz ortalama hıza bölünmesiyle bulunur (varsayılan ${DEFAULT_AVG_KMH} km/sa). Mola, trafik, şehir içi geçişler ve yol çalışmaları dahil değildir; gerçek süre genellikle daha uzundur.`,
  },
  {
    question: "Yakıt maliyeti nasıl hesaplanıyor?",
    answer:
      "Yakıt miktarı = mesafe × tüketim (L/100 km) ÷ 100; maliyet = yakıt miktarı × litre fiyatı. Otoyol ve köprü geçiş ücretleri dahil değildir.",
  },
  {
    question: "Kuş uçuşu mesafe neden karayolundan kısa?",
    answer:
      "Kuş uçuşu iki nokta arasındaki en kısa doğru çizgidir. Karayolu ise dağları, gölleri ve körfezleri dolaşır; bu yüzden Türkiye'de karayolu mesafesi çoğunlukla kuş uçuşunun 1,2 ile 1,5 katıdır. İstanbul–Yalova gibi körfezle ayrılmış illerde fark çok daha büyüktür.",
  },
];

export default async function ProvinceDistancePage() {
  const fuel = await getNationalGasolinePrice();
  const centers = provinceMapCenters();
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/cografya-hesaplamalari", label: "Coğrafya Hesaplamaları" },
        { href: path, label: "İller Arası Mesafe" },
      ]}
      crumbLabel="Sayfa yolu"
      title="İller Arası Mesafe Hesaplama"
      intro="İki il seçin: Karayolları'nın resmî cetvelinden karayolu mesafesi, kuş uçuşu mesafe, tahmini yol süresi ve yakıt maliyeti anında hesaplansın."
      tool={
        <ProvinceDistanceCalculator
          centers={centers}
          fuelPrice={fuel?.priceTl ?? null}
          map={<TurkeyMap ariaLabel="Türkiye il haritası" selectable titleFor={(p) => `${p.plate} ${p.name}`} />}
        />
      }
      related={{ title: "İlginizi çekebilir", links: [{ href: "/yakit-tuketimi-hesaplama", label: "Yakıt Tüketimi Hesaplama" }, ...geoRelated(path, 7)].filter((l, i, all) => all.findIndex((x) => x.href === l.href) === i) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "populer", label: "En çok aranan güzergâhlar" },
        { id: "iller", label: "İllere göre mesafe tabloları" },
        { id: "kaynak", label: "Kaynak ve hesaplama yöntemi" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faqItems}
    >
      <h2 id="populer">En çok aranan güzergâhlar</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Güzergâh</th>
              <th scope="col">Karayolu</th>
              <th scope="col">Kuş uçuşu</th>
              <th scope="col">Tahmini süre</th>
            </tr>
          </thead>
          <tbody>
            {POPULAR.map(([x, y]) => {
              const a = findProvince(x)!;
              const b = findProvince(y)!;
              const road = roadKm(a, b);
              return (
                <tr key={`${x}-${y}`}>
                  <td>
                    <Link href={routePairPath(a, b) ?? `${path}?a=${a.id}&b=${b.id}`} prefetch={false}>
                      {a.name} – {b.name}
                    </Link>
                  </td>
                  <td>{road.toLocaleString("tr-TR")} km</td>
                  <td>{Math.round(airKm(a, b)).toLocaleString("tr-TR")} km</td>
                  <td>{durationText(driveMinutes(road, DEFAULT_AVG_KMH))}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2 id="iller">İllere göre mesafe tabloları</h2>
      <p>Bir ilden diğer 80 ile olan karayolu ve kuş uçuşu mesafelerinin tamamını görmek için ili seçin:</p>
      {TURKEY_REGIONS.map((region) => (
        <div key={region}>
          <h3>{region}</h3>
          <p className="province-link-list">
            {turkeyProvinces
              .filter((p) => p.region === region)
              .sort((x, y) => x.name.localeCompare(y.name, "tr"))
              .map((p) => (
                <Link key={p.id} href={`${path}/${p.id}`} prefetch={false}>
                  {p.name}
                </Link>
              ))}
          </p>
        </div>
      ))}

      <h2 id="kaynak">Kaynak ve hesaplama yöntemi</h2>
      <p>
        Karayolu mesafeleri, Karayolları Genel Müdürlüğü&apos;nün il merkezleri arasındaki en uygun karayolu güzergâhına göre hazırladığı İller Arası
        Mesafe Cetveli&apos;nden (son güncelleme: {dateText}) alınmıştır. Yeni yollar açıldıkça cetvel güncellenir. Kuş uçuşu mesafe, il merkezi
        koordinatları (GeoNames) kullanılarak Dünya&apos;nın eğriliğini hesaba katan büyük daire formülüyle hesaplanır; iki kaynak farklı merkez noktaları
        kullandığı için komşu illerde birkaç kilometrelik fark görülebilir.
      </p>
      <p>
        Kendi koordinatlarınız arasındaki mesafe için <Link href="/buyuk-daire-mesafesi-hesaplama">kuş uçuşu mesafe hesaplayıcısını</Link>, aracınızın
        tüketimini bulmak için <Link href="/yakit-tuketimi-hesaplama">yakıt tüketimi hesaplamayı</Link> kullanabilirsiniz.
      </p>
    </TimeToolPage>
  );
}
