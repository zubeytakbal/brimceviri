import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import Converter from "../converter/Converter";
import { categoryPages } from "../converter/categoryPages";
import { conversionPages } from "../converter/conversionPages";

// Kategoriler konuya göre gruplanır; listede olmayan yeni kategori "Diğer" grubuna düşer.
const GROUPS: Array<{ id: string; title: string; slugs: string[] }> = [
  { id: "temel", title: "Temel ölçüler", slugs: ["uzunluk", "alan", "hacim", "kutle", "sicaklik", "zaman", "hiz", "aci", "veri"] },
  { id: "mekanik", title: "Mekanik", slugs: ["basinc", "kuvvet", "tork", "enerji", "guc", "ivme", "acisal-hiz", "momentum", "yogunluk", "frekans"] },
  { id: "akiskan-isi", title: "Akışkanlar ve ısı", slugs: ["debi", "hacimsel-debi", "kutlesel-debi", "viskozite", "kinematik-viskozite", "isil-iletkenlik", "isi-akisi", "ozgul-isi"] },
  { id: "elektrik", title: "Elektrik ve manyetizma", slugs: ["elektrik", "direnc", "kapasitans", "enduktans", "elektrik-yuku", "manyetik-alan", "manyetik-aki"] },
  { id: "kuyumculuk", title: "Kuyumculuk", slugs: ["altin-ayar", "gumus-ayar"] },
  { id: "isik-radyasyon", title: "Işık, radyasyon ve kimya", slugs: ["radyasyon-dozu", "doz-hizi", "sogurulan-doz", "radyoaktivite", "isinlama", "aydinlatma-siddeti", "konsantrasyon"] },
  { id: "saglik", title: "Laboratuvar değerleri", slugs: ["kan-sekeri", "vitamin-d"] },
];

function groupedCategories() {
  const known = new Set(GROUPS.flatMap((g) => g.slugs));
  const rest = categoryPages.filter((c) => !known.has(c.slug)).map((c) => c.slug);
  const groups = rest.length ? [...GROUPS, { id: "diger", title: "Diğer", slugs: rest }] : GROUPS;
  return groups.map((g) => ({ ...g, items: g.slugs.map((slug) => categoryPages.find((c) => c.slug === slug)).filter((c) => c !== undefined) }));
}

// Search Console, son 28 gün (14 Ekim 2026): kategorisinde en çok tıklanan ve gösterilen çift sayfaları.
const POPULAR: Record<string, string[]> = {
  "uzunluk": ["metre-santimetre", "kilometre-metre", "santimetre-milimetre", "fit-metre"],
  "kutle": ["kilogram-gram", "ton-kilogram", "gram-miligram", "pound-kilogram"],
  "hacim": ["metrekup-litre", "mililitre-litre", "galon-litre", "varil-litre"],
  "basinc": ["bar-psi", "atmosfer-bar", "milibar-pascal"],
  "alan": ["metrekare-donum", "hektar-donum", "dekar-donum", "dekar-metrekare"],
  "zaman": ["saat-saniye", "milisaniye-saniye"],
  "hiz": ["knot-kilometre-saat", "kilometre-saat-metre-saniye", "isik-hizi-metre-saniye", "kilometre-dakika-metre-saniye"],
  "debi_hacimsel": ["galon-dakika-metrekup-saniye", "litre-dakika-hacimsel-metrekup-saniye", "metrekup-saniye-metrekup-saat-hacimsel", "metrekup-saniye-litre-saniye"],
  "guc": ["watt-kilowatt"],
  "debi": ["metrekup-saat-litre-dakika"],
  "elektrik": ["amper-miliamper"],
  "yogunluk": ["kilogram-litre-kilogram-metrekup"],
  "kuvvet": ["newton-kilogram-kuvvet", "kilonewton-newton"],
  "tork": ["newton-metre-kilogram-kuvvet-metre"],
  "veri": ["megabayt-gigabayt"],
  "elektrik_direnc": ["kiloohm-ohm", "ohm-megaohm"],
  "kapasitans": ["farad-mikrofarad"],
  "vitamin_d": ["nanogram-mililitre-nanomol-litre"],
  "sicaklik": ["santigrat-fahrenhayt"],
};

/** Kategoride öne çıkan dönüşüm çiftleri: önce arama verisindeki popüler çiftler, sonra kayıt sırası. */
function topPairs(category: string, limit = 4) {
  const inCategory = conversionPages.filter((c) => c.category === category);
  const bySlug = new Map(inCategory.map((c) => [c.slug, c]));
  const ordered = [...(POPULAR[category] ?? []).map((slug) => bySlug.get(slug)).filter((c) => c !== undefined), ...inCategory];
  const seen = new Set<string>();
  const out: Array<{ slug: string; label: string }> = [];
  for (const c of ordered) {
    if (seen.has(c.slug)) continue;
    seen.add(c.slug);
    seen.add(c.reverseSlug);
    out.push({ slug: c.slug, label: `${c.fromName} → ${c.toName}` });
    if (out.length === limit) break;
  }
  return out;
}

export const metadata: Metadata = {
  title: "Tüm Birim Dönüşümleri",
  description:
    "Uzunluk, kütle, alan, hacim, basınç, sıcaklık, enerji ve mühendislik birimlerini tek sayfada çevirin.",
  alternates: {
    canonical: "/tum-birimler",
    languages: {
      tr: "/tum-birimler",
      en: "/en/all-conversions",
      "x-default": "/tum-birimler",
    },
  },
};

export default function AllConversionsPage() {
  return (
    <main className="all-conversions-page">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">›</span>
          <span>Tüm Birimler</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Tüm Birim Dönüşümleri</h1>

          <p>
            Kategoriyi seçin, değeri girin ve kullanmak istediğiniz
            birimler arasında anında çeviri yapın.
          </p>
        </header>

        <Converter />

        <div className="section-layout">
          <nav className="section-nav" aria-label="Dönüşüm kategorileri">
            <p className="section-nav-title">Kategoriler</p>
            <ul>
              {groupedCategories().map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`}>
                    {g.title} <span>{g.items.length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="section-main">
            {groupedCategories().map((g) => (
              <section className="tool-list-section" id={g.id} key={g.id}>
                <h2>{g.title}</h2>
                <ul className="tool-list">
                  {g.items.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/kategoriler/${c.slug}`} className="tool-list-title">
                        {c.title}
                      </Link>
                      <p>{c.description}</p>
                      {topPairs(c.category).length > 0 && (
                      <p className="tool-list-pairs">
                        {topPairs(c.category).map((pair) => (
                          <Link key={pair.slug} href={`/${pair.slug}`}>
                            {pair.label}
                          </Link>
                        ))}
                      </p>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>

        <section className="category-article-content">
          <h2>Bu çevirici nasıl çalışır?</h2>
          <p>
            Her kategoride birimler önce o kategorinin temel SI birimine (uzunlukta metre, kütlede kilogram, basınçta pascal)
            çevrilir, sonra hedef birime dönüştürülür. Bu yüzden listedeki iki birim arasında doğrudan bir tablo olmasa da
            sonuç her zaman tutarlıdır. Örneğin 5 inç → santimetre çevirisi 5 × 0,0254 = 0,127 m ve 0,127 m = 12,7 cm adımlarıyla
            yapılır. Dönüşüm katsayıları uluslararası tanımlara (SI ve NIST) dayanır; inç, ayak ve libre gibi birimler 1959
            uluslararası anlaşmasıyla metrik birimlere tam olarak bağlanmıştır.
          </p>
          <p>
            Sıcaklık bu kuralın istisnasıdır: Celsius, Fahrenheit ve Kelvin arasında yalnızca çarpım değil toplama da vardır
            (°F = °C × 1,8 + 32). Bu yüzden &quot;sıcaklık farkı&quot; çevirirken toplama kısmı kullanılmaz; 10 °C&apos;lik bir artış
            18 °F&apos;lik artışa karşılık gelir, 50 °F&apos;ye değil.
          </p>

        </section>
      </div>
    </main>
  );
}
