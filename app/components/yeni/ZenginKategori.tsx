// Elle yazilmis icerigi olan kategori sayfasi (docs/icerik-rehberi.md iskeleti).
// Masaustu: solda baslik, hazirlayan, icindekiler ve yazi; sagda yaziyla birlikte ilerleyen arac sutunu.
// Telefon: baslik, arac, yazi.
import Link from "@/app/components/SiteLink";
import type { ConversionPage } from "../../converter/conversionPages";
import { convert } from "../../converter/convert";
import { buildFaqSchema } from "../../converter/faqSchema";
import { turkceCiftYolu } from "../../converter/turkceYollar";
import { buildSiteUrl } from "../../siteConfig";
import CokluCevirici, { type CokluBirim } from "./CokluCevirici";
import { EDITOR } from "./editor";
import type { KategoriIcerigi } from "./icerik/tipler";
import { formatSayi } from "./sayi";

type Props = {
  slug: string;
  ad: string;
  category: string;
  grupAdi?: string;
  birimler: CokluBirim[];
  temel: string;
  ciftler: ConversionPage[];
  icerik: KategoriIcerigi;
};

function jsonLd(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

function tarih(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

export default function ZenginKategori({ slug, ad, category, grupAdi, birimler, temel, ciftler, icerik }: Props) {
  const bul = (v: string) => birimler.find((b) => b.value === v);
  const temelAd = bul(temel)?.label ?? temel;
  const adKucuk = ad.toLocaleLowerCase("tr-TR");
  const sira = new Map((icerik.populer ?? []).map((s, i) => [s, i]));
  const populer = [...ciftler].sort((a, b) => (sira.get(a.slug) ?? 1e9) - (sira.get(b.slug) ?? 1e9)).slice(0, 24);
  const tabloBirimleri = icerik.tablo.birimler.filter((b) => bul(b));
  const icindekiler = [
    { id: "tablo", baslik: icerik.tablo.baslik },
    ...icerik.bolumler.map((b) => ({ id: b.id, baslik: b.baslik })),
    { id: "populer", baslik: "Popüler dönüşümler" },
    { id: "tum-birimler", baslik: `Tüm ${adKucuk} birimleri` },
    { id: "sss", baslik: "Sık sorulan sorular" },
  ];

  const yolSemasi = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: `${ad} Çevirici`, item: buildSiteUrl(`/${slug}`) },
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
            {grupAdi && <li>{grupAdi}</li>}
            <li aria-current="page">{ad}</li>
          </ol>
          <h1>{ad} Çevirici</h1>
          <p className="yy-imza">
            Hazırlayan <strong>{EDITOR.ad}</strong>
            <span aria-hidden="true"> · </span>
            Son güncelleme <time dateTime={icerik.guncelleme}>{tarih(icerik.guncelleme)}</time>
          </p>
        </header>

        <aside className="yy-yan">
          <CokluCevirici
            category={category}
            birimler={birimler}
            gruplar={icerik.cevirici.gruplar}
            baslangic={icerik.cevirici.baslangic}
          />
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

          <section id="tablo">
            <h2>{icerik.tablo.baslik}</h2>
            <p>Satırdaki birimin 1 tanesi, sütundaki birimden kaç tane eder.</p>
            <div className="yy-tablo-kutu">
              <table className="yy-matris">
                <thead>
                  <tr>
                    <td />
                    {tabloBirimleri.map((b) => (
                      <th key={b} scope="col">
                        {b}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tabloBirimleri.map((satir) => (
                    <tr key={satir}>
                      <th scope="row">1 {bul(satir)!.label.toLocaleLowerCase("tr-TR")}</th>
                      {tabloBirimleri.map((sutun) => (
                        <td key={sutun} className={satir === sutun ? "yy-kosegen" : undefined}>
                          {formatSayi(convert(category, 1, satir, sutun))}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {icerik.bolumler.map((b) => (
            <section key={b.id} id={b.id}>
              <h2>{b.baslik}</h2>
              {b.govde}
            </section>
          ))}

          <section id="populer">
            <h2>Popüler dönüşümler</h2>
            <ul className="yy-ciftler">
              {populer.map((c) => (
                <li key={c.slug}>
                  <Link href={turkceCiftYolu(c.slug)}>
                    {c.fromName} → {c.toName}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section id="tum-birimler">
            <h2>Tüm {adKucuk} birimleri</h2>
            <p>
              Her birimin {temelAd.toLocaleLowerCase("tr-TR")} cinsinden karşılığı. Ayrı sayfası olan dönüşümler linklidir.
            </p>
            <ul className="yy-birim-listesi">
              {birimler
                .filter((b) => b.value !== temel)
                .map((b) => {
                  const sayfalar = ciftler.filter((c) => c.fromUnit === b.value || c.toUnit === b.value).slice(0, 4);
                  return (
                    <li key={b.value}>
                      <span>
                        1 {b.label} = <strong>{formatSayi(convert(category, 1, b.value, temel))}</strong> {temel}
                      </span>
                      {sayfalar.length > 0 && (
                        <span className="yy-birim-linkleri">
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
