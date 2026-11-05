// Yeni yapidaki kategori sayfasi: /<kategori> (ör. /uzunluk).
// Referans duzeni: cevirici (acik birim listeleri), populer donusumler, birimlerin tam listesi
// (her birimin temel birim karsiligi ve cift sayfalarina linkler).
import type { Metadata } from "next";
import "./yeni.css";
import Link from "@/app/components/SiteLink";
import { getCategoryUnitOptions } from "../categoryUnitOptions";
import { categoryPages } from "../../converter/categoryPages";
import { conversionPages } from "../../converter/conversionPages";
import { convert } from "../../converter/convert";
import { isMergedAway } from "../../converter/mergedPairs";
import { kategorininGrubu } from "../../converter/siteYapisi";
import { turkceCiftYolu } from "../../converter/turkceYollar";
import { unitRegistry } from "../../converter/unitRegistry";
import { buildFullLanguageAlternates } from "../../i18n/routing";
import { buildSiteUrl } from "../../siteConfig";
import KategoriCevirici from "./KategoriCevirici";
import YanPanel from "./YanPanel";
import { formatSayi } from "./sayi";

function veri(slug: string) {
  const kategori = categoryPages.find((c) => c.slug === slug)!;
  const ad = kategori.title.replace(/ Dönüşümleri$/, "");
  const birimler = getCategoryUnitOptions(kategori.category, "tr");
  const temel =
    unitRegistry.find((u) => u.category === kategori.category && u.siFactor === 1 && !u.inverse)?.symbol ??
    birimler[0]?.value;
  const ciftler = conversionPages.filter((c) => c.category === kategori.category && !isMergedAway(c.slug));
  return { kategori, ad, birimler, temel, ciftler };
}

export function kategoriMetadata(slug: string): Metadata {
  const { kategori, ad } = veri(slug);
  const yol = `/${slug}`;
  const baslik = `${ad} Çevirici: Tüm ${ad} Birimleri`;
  return {
    title: baslik,
    description: kategori.description,
    alternates: { canonical: yol, ...buildFullLanguageAlternates(yol) },
    openGraph: { title: baslik, description: kategori.description, url: buildSiteUrl(yol), locale: "tr_TR", type: "website" },
  };
}

export default function KategoriSayfasi({ slug }: { slug: string }) {
  const { kategori, ad, birimler, temel, ciftler } = veri(slug);
  const grup = kategorininGrubu(slug);
  const temelAd = birimler.find((b) => b.value === temel)?.label ?? temel;

  const ciftSayfalari: Record<string, { href: string; ad: string }> = {};
  for (const c of ciftler) ciftSayfalari[`${c.fromUnit}|${c.toUnit}`] = { href: turkceCiftYolu(c.slug), ad: `${c.fromName} – ${c.toName}` };
  // Ilk acilista populer ilk cift secili gelir (ör. metre -> kilometre).
  const ilk = ciftler[0];

  const yolSemasi = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: `${ad} Çevirici`, item: buildSiteUrl(`/${slug}`) },
    ],
  };

  return (
    <div className="yy yy-govdeler">
      <main className="yy-ana">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(yolSemasi).replace(/</g, "\\u003c") }}
        />
        <div>
          <ol className="yy-yol" aria-label="Sayfa yolu">
            <li>
              <Link href="/">Ana sayfa</Link>
            </li>
            {grup && <li>{grup.ad}</li>}
            <li aria-current="page">{ad}</li>
          </ol>
          <h1>{ad} Çevirici</h1>
        </div>

        <KategoriCevirici
          category={kategori.category}
          birimler={birimler}
          varsayilanKaynak={ilk?.fromUnit ?? birimler[0]?.value}
          varsayilanHedef={ilk?.toUnit ?? birimler[1]?.value ?? birimler[0]?.value}
          ciftSayfalari={ciftSayfalari}
        />

        {kategori.description && (
          <section className="yy-kart">
            <p>{kategori.description}</p>
          </section>
        )}

        {ciftler.length > 0 && (
          <section className="yy-kart">
            <h2>Popüler {ad.toLocaleLowerCase("tr-TR")} dönüşümleri</h2>
            <ul className="yy-linkler">
              {ciftler.slice(0, 24).map((c) => (
                <li key={c.slug}>
                  <Link href={turkceCiftYolu(c.slug)}>
                    {c.fromName} → {c.toName}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="yy-kart">
          <h2>{ad} birimlerinin tam listesi</h2>
          <p className="yy-soluk" style={{ marginBottom: 10 }}>
            Temel birim: <strong>{temelAd}</strong> [{temel}]
          </p>
          <ul className="yy-birimler">
            {birimler
              .filter((b) => b.value !== temel)
              .map((b) => {
                const sayfalar = ciftler.filter((c) => c.fromUnit === b.value || c.toUnit === b.value).slice(0, 4);
                return (
                  <li key={b.value}>
                    <span className="yy-deger">
                      1 {b.label} [{b.symbol}] = <strong>{formatSayi(convert(kategori.category, 1, b.value, temel))}</strong> {temel}
                    </span>
                    {sayfalar.length > 0 && (
                      <span className="yy-yonler">
                        {sayfalar.map((c) => (
                          <Link key={c.slug} href={turkceCiftYolu(c.slug)}>
                            {c.fromName} → {c.toName}
                          </Link>
                        ))}
                      </span>
                    )}
                  </li>
                );
              })}
          </ul>
        </section>
      </main>
      <YanPanel aktifKategori={slug} />
    </div>
  );
}
