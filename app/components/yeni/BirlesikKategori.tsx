// Birlesik kategori sayfasi (/radyasyon): ayni konudaki, birbirine cevrilemeyen kucuk kategoriler
// tek sayfada. Duzen ZenginKategori ile ayni; sag sutunda sekmeli cevirici, yazida her kategorinin
// kendi bolumu (aciklama, karsilastirma tablosu, birim listesi).
import type { Metadata } from "next";
import "./yeni.css";
import Link from "@/app/components/SiteLink";
import { getCategoryUnitOptions } from "../categoryUnitOptions";
import { categoryPages } from "../../converter/categoryPages";
import { conversionPages } from "../../converter/conversionPages";
import { convert } from "../../converter/convert";
import { ciftYayinda } from "../../converter/mergedPairs";
import { turkceCiftYolu } from "../../converter/turkceYollar";
import { buildFaqSchema } from "../../converter/faqSchema";
import { BIRLESIK_KATEGORILER, kategorininGrubu } from "../../converter/siteYapisi";
import { unitRegistry } from "../../converter/unitRegistry";
import { buildSiteUrl } from "../../siteConfig";
import BirlesikCevirici, { type CeviriciParca } from "./BirlesikCevirici";
import { EDITOR } from "./editor";
import { birlesikIcerikleri } from "./icerik";
import Matris, { DegerTablosu } from "./Matris";
import { formatOkunur as formatSayi } from "./sayi";

function jsonLd(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

function tarih(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

// "Gram/metrekare (GSM)" -> "gram/metrekare (GSM)": parantez icindeki kisaltmalar oldugu gibi kalsin.
const kucukBaslangic = (ad: string) => {
  const i = ad.indexOf(" (");
  return i < 0 ? ad.toLocaleLowerCase("tr-TR") : ad.slice(0, i).toLocaleLowerCase("tr-TR") + ad.slice(i);
};

export function birlesikMetadata(slug: string): Metadata {
  const icerik = birlesikIcerikleri[slug];
  const yol = `/${slug}`;
  return {
    title: icerik.baslik,
    description: icerik.aciklama,
    alternates: { canonical: yol },
    openGraph: { title: icerik.baslik, description: icerik.aciklama, url: buildSiteUrl(yol), locale: "tr_TR", type: "website" },
  };
}

export default function BirlesikKategori({ slug }: { slug: string }) {
  const icerik = birlesikIcerikleri[slug];
  const ad = BIRLESIK_KATEGORILER[slug].ad;
  const grup = kategorininGrubu(slug);
  const parcalar = icerik.parcalar.map((p) => {
    const sayfaKategorisi = categoryPages.find((c) => c.slug === p.kategori)!.category;
    const category = p.altKategori ?? sayfaKategorisi;
    const birimler = getCategoryUnitOptions(sayfaKategorisi, "tr").filter(
      (b) => !p.altKategori || unitRegistry.some((u) => u.category === p.altKategori && u.symbol === b.value),
    );
    const temel =
      unitRegistry.find((u) => u.category === category && u.siFactor === 1 && !u.inverse)?.symbol ?? birimler[0].value;
    const sembolSet = new Set(birimler.map((b) => b.value));
    const ciftler = conversionPages.filter(
      (c) => c.category === sayfaKategorisi && ciftYayinda(c.slug) && sembolSet.has(c.fromUnit) && sembolSet.has(c.toUnit),
    );
    return { ...p, category, birimler, temel, ciftler };
  });
  const cevirici: CeviriciParca[] = parcalar.map((p) => ({
    id: p.id,
    sekme: p.sekme,
    category: p.category,
    birimler: p.birimler,
    gruplar: p.cevirici.gruplar,
    baslangic: p.cevirici.baslangic,
  }));
  const icindekiler = [
    ...icerik.giris.map((b) => ({ id: b.id, baslik: b.baslik })),
    ...parcalar.map((p) => ({ id: p.id, baslik: p.baslik })),
    ...icerik.bolumler.map((b) => ({ id: b.id, baslik: b.baslik })),
    { id: "sss", baslik: "Sık sorulan sorular" },
  ];

  const yolSemasi = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: icerik.h1, item: buildSiteUrl(`/${slug}`) },
    ],
  };

  return (
    <div className="yy yy-sayfa">
      <main className="yy-duzen">
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(yolSemasi)} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(buildFaqSchema(icerik.sss))} />

        <header className="yy-bas">
          <ol className="yy-yol" aria-label="Sayfa yolu">
            <li>
              <Link href="/">Ana sayfa</Link>
            </li>
            {grup && grup.ad.toLocaleLowerCase("tr-TR") !== ad.toLocaleLowerCase("tr-TR") && <li>{grup.ad}</li>}
            <li aria-current="page">{ad}</li>
          </ol>
          <h1>{icerik.h1}</h1>
          <p className="yy-imza">
            Hazırlayan <Link href="/yazar"><strong>{EDITOR.ad}</strong></Link>
            <span aria-hidden="true"> · </span>
            Son güncelleme <time dateTime={icerik.guncelleme}>{tarih(icerik.guncelleme)}</time>
          </p>
        </header>

        <aside className="yy-yan">
          <BirlesikCevirici parcalar={cevirici} />
          <nav className="yy-benzer" aria-label="Benzer araçlar">
            <h2>Benzer araçlar</h2>
            <ul>
              {icerik.ilgili.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.ad}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <article className="yy-yazi">
          <nav className="yy-icindekiler" aria-labelledby="yy-icindekiler-baslik">
            <h2 id="yy-icindekiler-baslik">İçindekiler</h2>
            <ul>
              {icindekiler.map((b) => (
                <li key={b.id}>
                  <a href={`#${b.id}`}>{b.baslik}</a>
                </li>
              ))}
            </ul>
          </nav>

          <p className="yy-giris-yazi">{icerik.ozet}</p>

          {icerik.giris.map((b) => (
            <section key={b.id} id={b.id}>
              <h2>{b.baslik}</h2>
              {b.govde}
            </section>
          ))}

          {parcalar.map((p) => {
            const temelAd = p.birimler.find((b) => b.value === p.temel)?.label ?? p.temel;
            return (
              <section key={p.id} id={p.id}>
                <h2>{p.baslik}</h2>
                {p.govde}
                {p.ciftler.length > 0 && (
                  <p>
                    Ayrı sayfası olan dönüşümler:{" "}
                    {p.ciftler.map((c, i) => (
                      <span key={c.slug}>
                        {i > 0 && ", "}
                        <Link href={turkceCiftYolu(c.slug)}>
                          {c.fromName} → {c.toName}
                        </Link>
                      </span>
                    ))}
                  </p>
                )}
                <h3>{p.tablo.baslik}</h3>
                {p.tablo.degerler ? (
                  <DegerTablosu
                    category={p.category}
                    birimler={p.birimler}
                    semboller={p.tablo.birimler}
                    degerler={p.tablo.degerler}
                  />
                ) : (
                  <Matris category={p.category} birimler={p.birimler} semboller={p.tablo.birimler} />
                )}
                {/* Iki birimli kategoride tek satirlik liste tabloyu tekrarlar. */}
                {p.birimler.length > 2 && (
                  <>
                    <h3>Bütün birimlerin {kucukBaslangic(temelAd)} karşılığı</h3>
                    <ul className="yy-birim-listesi">
                      {p.birimler
                        .filter((b) => b.value !== p.temel)
                        .map((b) => (
                          <li key={b.value}>
                            1 {b.label} = <strong>{formatSayi(convert(p.category, 1, b.value, p.temel))}</strong>{" "}
                            {p.temel}
                          </li>
                        ))}
                    </ul>
                  </>
                )}
              </section>
            );
          })}

          {icerik.bolumler.map((b) => (
            <section key={b.id} id={b.id}>
              <h2>{b.baslik}</h2>
              {b.govde}
            </section>
          ))}

          <section id="sss">
            <h2>Sık sorulan sorular</h2>
            {icerik.sss.map((s) => (
              <div key={s.question}>
                <h3>{s.question}</h3>
                <p>{s.answer}</p>
              </div>
            ))}
          </section>

          <section className="yy-kaynaklar" aria-labelledby="yy-kaynaklar-baslik">
            <h2 id="yy-kaynaklar-baslik">Kaynaklar</h2>
            <ul>
              {icerik.kaynaklar.map((k) => (
                <li key={k.ad}>
                  {k.href ? (
                    <a href={k.href} rel="noopener" target="_blank">
                      {k.ad}
                    </a>
                  ) : (
                    k.ad
                  )}
                </li>
              ))}
            </ul>
          </section>
        </article>
      </main>
    </div>
  );
}
