// Yeni yapidaki cift sayfasi: /<kategori>/<cift> (ör. /uzunluk/santimetre-inc).
// Bolum sirasi referans duzenini izler: cevirici, iki birimin tanimi, tablo, nasil cevrilir,
// cifte ozgu icerik, SSS, populer donusumler, diger birimlere cevir, kaynaklar.
import type { Metadata } from "next";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import "../../components/yeni/yeni.css";
import Link from "@/app/components/SiteLink";
import CiftCevirici from "../../components/yeni/CiftCevirici";
import YanPanel from "../../components/yeni/YanPanel";
import { formatSayi } from "../../components/yeni/sayi";
import { categoryPages } from "../../converter/categoryPages";
import { conversionPages, type ConversionPage } from "../../converter/conversionPages";
import { convert } from "../../converter/convert";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { getFlagshipPairInsight } from "../../converter/flagshipPairInsights";
import { isMergedAway } from "../../converter/mergedPairs";
import { yeniYapiKategorileri } from "../../converter/siteYapisi";
import { turkishConversionSeo } from "../../converter/turkishConversionSeo";
import { turkceCiftYolu } from "../../converter/turkceYollar";
import { getUnitSources } from "../../converter/unitSources";
import { findUnitPage } from "../../converter/unitPages";
import { buildFullLanguageAlternates } from "../../i18n/routing";
import { plainTitle, seoTitle } from "../../seoTitle";
import { buildSiteUrl } from "../../siteConfig";

type PageProps = { params: Promise<{ slug: string; cift: string }> };

// Referanstaki gibi genis aralikli tablo: kucuk kesirlerden binlere.
const TABLO_DEGERLERI = [0.01, 0.1, 1, 2, 3, 5, 10, 20, 50, 100, 1000];

const kategoriSlugu = new Map(categoryPages.map((c) => [c.category, c.slug]));

function sayfayiBul(kategori: string, cift: string): ConversionPage | undefined {
  if (!yeniYapiKategorileri.has(kategori) || isMergedAway(cift)) return undefined;
  const p = conversionPages.find((c) => c.slug === cift);
  return p && kategoriSlugu.get(p.category) === kategori ? p : undefined;
}

export function generateStaticParams() {
  return conversionPages
    .filter((p) => !isMergedAway(p.slug) && yeniYapiKategorileri.has(kategoriSlugu.get(p.category) ?? ""))
    .map((p) => ({ slug: kategoriSlugu.get(p.category)!, cift: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, cift } = await params;
  const p = sayfayiBul(slug, cift);
  if (!p) return { title: "Dönüşüm bulunamadı" };
  const seo = turkishConversionSeo(p, isMergedAway(p.reverseSlug));
  const yol = turkceCiftYolu(p.slug);
  return {
    title: seoTitle(...seo.titles),
    description: seo.description,
    alternates: { canonical: yol, ...buildFullLanguageAlternates(yol) },
    openGraph: {
      title: plainTitle(seoTitle(...seo.titles)),
      description: seo.description,
      url: buildSiteUrl(yol),
      siteName: "BirimCeviri.app",
      locale: "tr_TR",
      type: "website",
    },
  };
}

function jsonLd(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

export default async function CiftSayfasi({ params }: PageProps) {
  const { slug, cift } = await params;
  const p = sayfayiBul(slug, cift);
  if (!p) notFound();

  const kategori = categoryPages.find((c) => c.category === p.category)!;
  const kategoriAdi = kategori.title.replace(/ Dönüşümleri$/, "");
  const yol = turkceCiftYolu(p.slug);
  const ters = conversionPages.find((c) => c.slug === p.reverseSlug);
  const tersAyriSayfa = ters && !isMergedAway(ters.slug) ? ters : undefined;
  const tersBirlesik = ters && isMergedAway(ters.slug) ? ters : undefined;
  const seo = turkishConversionSeo(p, Boolean(tersBirlesik));
  const cevir = (v: number, from = p.fromUnit, to = p.toUnit) => convert(p.category, v, from, to);
  const yuvarla = (v: number) =>
    seo.decimals === undefined ? formatSayi(v) : v.toLocaleString("tr-TR", { maximumFractionDigits: seo.decimals });

  const kaynakBirim = findUnitPage(p.category, p.fromUnit);
  const hedefBirim = findUnitPage(p.category, p.toUnit);
  const kaynaklar = getUnitSources(p.category);
  const ozel = getFlagshipPairInsight(p.category, p.fromUnit, p.toUnit);

  const tabloDegerleri = seo.exampleValues ?? TABLO_DEGERLERI;
  const satirlar = tabloDegerleri.map((v) => ({ v, s: cevir(v) }));
  const tersSatirlar = tersBirlesik
    ? tabloDegerleri.map((v) => ({ v, s: cevir(v, p.toUnit, p.fromUnit) }))
    : [];
  // Iki sutunlu tablo uzun listelerde yan yana iki blok olur.
  const yari = Math.ceil(satirlar.length / 2);

  const bir = formatSayi(cevir(1));
  const tersBir = formatSayi(cevir(1, p.toUnit, p.fromUnit));
  const ornek = satirlar.find((r) => r.v >= 10) ?? satirlar[satirlar.length - 1];

  // SSS yalnizca sayfaya ozel, gercek sorular: "1 X kac Y" zaten ceviricide ve tabloda.
  const sss: FaqItem[] = [...seo.extraFaq, ...(tersBirlesik ? turkishConversionSeo(tersBirlesik).extraFaq : [])].filter(
    (s, i, l) => l.findIndex((o) => o.question === s.question) === i
  );

  const ayniKategori = conversionPages.filter(
    (c) => c.category === p.category && !isMergedAway(c.slug) && c.slug !== p.slug
  );
  const populer = ayniKategori.slice(0, 18);
  const digerleri = ayniKategori.filter((c) => c.fromUnit === p.fromUnit && c.slug !== p.reverseSlug);

  const ozelSatirlar = ozel?.realWorldValues?.map((r) => {
    const kaynaktan = r.anchorUnit === p.fromUnit;
    return {
      etiket: r.label,
      a: kaynaktan ? r.value : cevir(r.value, p.toUnit, p.fromUnit),
      b: kaynaktan ? cevir(r.value) : r.value,
    };
  });

  const yolSemasi = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: kategoriAdi, item: buildSiteUrl(`/${slug}`) },
      { "@type": "ListItem", position: 3, name: `${p.fromName} – ${p.toName}`, item: buildSiteUrl(yol) },
    ],
  };

  return (
    <div className="yy yy-govdeler">
      <main className="yy-ana">
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(yolSemasi)} />
        {sss.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(buildFaqSchema(sss))} />}

        <div>
          <ol className="yy-yol" aria-label="Sayfa yolu">
            <li>
              <Link href="/">Ana sayfa</Link>
            </li>
            <li>
              <Link href={`/${slug}`}>{kategoriAdi}</Link>
            </li>
            <li aria-current="page">
              {p.fromName} – {p.toName}
            </li>
          </ol>
          <h1>
            {p.fromName} – {p.toName} Çevirici
          </h1>
        </div>

        <CiftCevirici
          category={p.category}
          fromUnit={p.fromUnit}
          toUnit={p.toUnit}
          fromName={p.fromName}
          toName={p.toName}
          tersHref={tersAyriSayfa ? turkceCiftYolu(tersAyriSayfa.slug) : undefined}
          tersAd={`${p.toName} – ${p.fromName}`}
          birDeger={bir}
          tersBirDeger={tersBir}
        />

        {(kaynakBirim || hedefBirim) && (
          <section className="yy-kart yy-iki">
            {[kaynakBirim, hedefBirim].map(
              (b) =>
                b && (
                  <div key={b.slug}>
                    <h2>
                      {b.name} ({b.symbol})
                    </h2>
                    <p>
                      <strong>Tanım:</strong> {b.shortDescription}
                    </p>
                    {b.commonUses && <p className="yy-soluk">{b.commonUses}</p>}
                  </div>
                )
            )}
          </section>
        )}

        <section className="yy-kart">
          <h2>
            {p.fromName} – {p.toName} tablosu
          </h2>
          <div className="yy-tablo-kutu">
            <table className="yy-tablo">
              <thead>
                <tr>
                  <th>{p.fromName}</th>
                  <th>{p.toName}</th>
                  {satirlar.length > 6 && (
                    <>
                      <th>{p.fromName}</th>
                      <th>{p.toName}</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {(satirlar.length > 6 ? satirlar.slice(0, yari) : satirlar).map((r, i) => {
                  const sag = satirlar.length > 6 ? satirlar[i + yari] : undefined;
                  return (
                    <tr key={r.v}>
                      <td>
                        {formatSayi(r.v)} {p.fromUnit}
                      </td>
                      <td>
                        {yuvarla(r.s)} {p.toUnit}
                      </td>
                      {satirlar.length > 6 && (
                        <>
                          <td>{sag ? `${formatSayi(sag.v)} ${p.fromUnit}` : ""}</td>
                          <td>{sag ? `${yuvarla(sag.s)} ${p.toUnit}` : ""}</td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {tersSatirlar.length > 0 && (
            <>
              <h2>
                {p.toName} – {p.fromName} tablosu
              </h2>
              <div className="yy-tablo-kutu">
                <table className="yy-tablo">
                  <thead>
                    <tr>
                      <th>{p.toName}</th>
                      <th>{p.fromName}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tersSatirlar.map((r) => (
                      <tr key={r.v}>
                        <td>
                          {formatSayi(r.v)} {p.toUnit}
                        </td>
                        <td>
                          {formatSayi(r.s)} {p.fromUnit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </section>

        <section className="yy-kart">
          <h2>
            {p.fromName} {p.toName.toLocaleLowerCase("tr-TR")} birimine nasıl çevrilir?
          </h2>
          <p>{p.explanation}</p>
          <div className="yy-formul">
            <span>{p.formula}</span>
            {ornek && (
              <span>
                {formatSayi(ornek.v)} {p.fromUnit} = <strong>{yuvarla(ornek.s)} {p.toUnit}</strong>
              </span>
            )}
          </div>
        </section>

        {ozel && (ozelSatirlar?.length || ozel.screenTable || ozel.heightTable || ozel.where || ozel.mistakes?.length) ? (
          <section className="yy-kart">
            {ozelSatirlar && ozelSatirlar.length > 0 && (
              <>
                <h2>Gerçek hayattan örnekler</h2>
                <ul className="yy-birimler">
                  {ozelSatirlar.map((r) => (
                    <li key={r.etiket}>
                      <span className="yy-deger">
                        <strong>{r.etiket}:</strong> {formatSayi(r.a)} {p.fromUnit} ≈ {formatSayi(r.b)} {p.toUnit}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {ozel.sectorNote && <p className="yy-soluk">{ozel.sectorNote}</p>}
            {ozel.screenTable && (
              <>
                <h2>Ekran boyutu: köşegen, genişlik ve yükseklik</h2>
                <div className="yy-tablo-kutu">
                  <table className="yy-tablo">
                    <thead>
                      <tr>
                        <th>Ekran</th>
                        <th>Köşegen</th>
                        <th>Genişlik (16:9)</th>
                        <th>Yükseklik (16:9)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[24, 27, 32, 43, 50, 55, 65, 75, 85].map((d) => (
                        <tr key={d}>
                          <td>{d} inç</td>
                          <td>{formatSayi(Math.round(d * 25.4) / 10)} cm</td>
                          <td>{formatSayi(Math.round(((d * 16) / Math.sqrt(337)) * 25.4) / 10)} cm</td>
                          <td>{formatSayi(Math.round(((d * 9) / Math.sqrt(337)) * 25.4) / 10)} cm</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="yy-soluk" style={{ marginTop: 10 }}>
                  Genişlik ve yükseklik yalnızca görüntü alanıdır; çerçeve ve ayak için birkaç santimetre ekleyin. 16:9
                  ekranda genişlik köşegenin yaklaşık 0,87 katı, yükseklik 0,49 katıdır.
                </p>
              </>
            )}
            {ozel.heightTable && (
              <>
                <h2>Boy tablosu: feet ve inç → santimetre</h2>
                <div className="yy-tablo-kutu">
                  <table className="yy-tablo">
                    <thead>
                      <tr>
                        <th>Boy</th>
                        <th>Santimetre</th>
                        <th>Boy</th>
                        <th>Santimetre</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 10 }, (_, i) => 58 + i).map((inc) => (
                        <tr key={inc}>
                          {[inc, inc + 10].map((n) => (
                            <Fragment key={n}>
                              <td>
                                {Math.floor(n / 12)}&apos;{n % 12}&quot;
                              </td>
                              <td>{formatSayi(Math.round(n * 25.4) / 10)} cm</td>
                            </Fragment>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
            {ozel.where && (
              <>
                <h2>Nerede karşına çıkar?</h2>
                <p>{ozel.where}</p>
              </>
            )}
            {ozel.mistakes && ozel.mistakes.length > 0 && (
              <>
                <h2>Sık yapılan hatalar</h2>
                <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.65 }}>
                  {ozel.mistakes.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </>
            )}
          </section>
        ) : null}

        {sss.length > 0 && (
          <section className="yy-kart">
            <h2>Sık sorulan sorular</h2>
            <div className="yy-sss">
              {sss.map((s) => (
                <div key={s.question}>
                  <h3>{s.question}</h3>
                  <p>{s.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="yy-kart">
          <h2>Popüler {kategoriAdi.toLocaleLowerCase("tr-TR")} dönüşümleri</h2>
          <ul className="yy-linkler">
            {populer.map((c) => (
              <li key={c.slug}>
                <Link href={turkceCiftYolu(c.slug)}>
                  {c.fromName} → {c.toName}
                </Link>
              </li>
            ))}
          </ul>
          {digerleri.length > 0 && (
            <>
              <h2>{p.fromName} birimini diğer birimlere çevir</h2>
              <ul className="yy-linkler">
                {digerleri.map((c) => (
                  <li key={c.slug}>
                    <Link href={turkceCiftYolu(c.slug)}>
                      {c.fromName} → {c.toName}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          <p style={{ marginTop: 16 }}>
            <Link href={`/${slug}`}>
              <strong>{kategoriAdi} çeviricisi: tüm birimler →</strong>
            </Link>
          </p>
        </section>

        {kaynaklar.length > 0 && (
          <section className="yy-kaynak">
            <strong>Kaynaklar</strong>
            <ul>
              {kaynaklar.map((k) => (
                <li key={k.url}>
                  <a href={k.url} rel="noopener" target="_blank">
                    {k.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <YanPanel aktifKategori={slug} aktifHref={`/${slug}`} />
    </div>
  );
}
