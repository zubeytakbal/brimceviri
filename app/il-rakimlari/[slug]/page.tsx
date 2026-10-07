import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { notFound } from "next/navigation";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { calculateAltitudeEffect } from "../../converter/mountainAltitudeEffect";
import {
  findNearestMountain,
  findProvinceById,
  getAllProvinces,
  getProvinceRankContext,
} from "../../converter/provinceElevationHub";
import { bolgeSirasi, ilceler, ilceOzeti, mutfakNotu, yakinIllerRakim } from "../../converter/geo/ilceRakimHub";
import { popularProvinceComparisons } from "../../converter/popularProvinceComparisons";
import { buildSiteUrl } from "../../siteConfig";
import { trAblative, trGenitive, trLocative } from "../../converter/turkishSuffix";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatNumber(value: number): string {
  return value.toLocaleString("tr-TR", { maximumFractionDigits: 1 });
}

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function generateStaticParams() {
  return getAllProvinces().map((province) => ({ slug: province.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const province = findProvinceById(slug);

  if (!province) {
    return { title: "İl bulunamadı", robots: { index: false, follow: false } };
  }

  const ozet = ilceOzeti(slug);
  const title = `${province.nameTr} Rakımı: ${province.elevationM.toLocaleString("tr-TR")} Metre${ozet ? ", İlçe Rakımları" : ""}`;
  const description = ozet
    ? ozet.kesin
      ? `${province.nameTr} il merkezi ${province.elevationM.toLocaleString("tr-TR")} m. En yüksek ilçe ${ozet.enYuksek.ad} (≈${ozet.enYuksek.rakim.toLocaleString("tr-TR")} m), en alçak ${ozet.enAlcak.ad}. ${ozet.sayi} ilçenin rakımı, kaynama noktası ve basınç.`
      : `${province.nameTr} il merkezi ${province.elevationM.toLocaleString("tr-TR")} m. ${ozet.sayi} ilçenin yaklaşık rakımı, suyun kaynama noktası, hava basıncı ve çevre illerle karşılaştırma.`
    : `${trGenitive(province.nameTr)} denizden yüksekliği, bu rakımdaki hava basıncı ve suyun kaç derecede kaynadığı.`;

  return {
    title,
    description,
    alternates: { canonical: `/il-rakimlari/${slug}` },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/il-rakimlari/${slug}`),
      siteName: "BirimCeviri.app",
      locale: "tr_TR",
      type: "article",
    },
  };
}

export default async function ProvinceElevationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const province = findProvinceById(slug);

  if (!province) {
    notFound();
  }
  const comparisons = popularProvinceComparisons.filter((x) => x.provinceIdA === province.id || x.provinceIdB === province.id);

  const pageUrl = buildSiteUrl(`/il-rakimlari/${slug}`);
  const altitudeEffect = calculateAltitudeEffect(province.elevationM);
  const nearestMountain = findNearestMountain(province.elevationM);
  const rankContext = getProvinceRankContext(slug);
  const ilceListesi = ilceler(slug);
  const ozet = ilceOzeti(slug);
  const bolge = bolgeSirasi(slug);
  const yakinlar = yakinIllerRakim(slug, 5);
  const mutfak = mutfakNotu(province.elevationM);
  const m = (x: number) => x.toLocaleString("tr-TR");
  const elevationDiff = nearestMountain
    ? nearestMountain.elevationM - province.elevationM
    : null;

  const faqItems: FaqItem[] = [
    {
      question: `${trGenitive(province.nameTr)} rakımı kaç metre?`,
      answer: `${province.nameTr}, deniz seviyesinden ${province.elevationM.toLocaleString("tr-TR")} metre yüksekliktedir.`,
    },
    {
      question: `${trLocative(province.nameTr)} su kaç derecede kaynar?`,
      answer: altitudeEffect
        ? `${trLocative(province.nameTr)} (${province.elevationM.toLocaleString("tr-TR")} m) su yaklaşık ${formatNumber(altitudeEffect.waterBoilingPointC)}°C'de kaynar. ${province.elevationM < 300 ? "Bu rakımda fark çok küçüktür." : `Bu, deniz seviyesinden ${formatNumber(100 - altitudeEffect.waterBoilingPointC)} derece düşüktür; haşlama ve pişirme biraz uzar.`} İrtifa arttıkça hava basıncı düşer, su daha düşük sıcaklıkta kaynar.`
        : "",
    },
    ...(ozet
      ? [
          {
            question: `${trGenitive(province.nameTr)} en yüksek ilçesi hangisi?`,
            answer: `${ozet.kesin ? `${ozet.sayi} ilçe arasında` : `Rakımı listelenen ${ozet.sayi} ilçe arasında`} en yüksekte ${ozet.enYuksek.ad} (yaklaşık ${m(ozet.enYuksek.rakim)} m), en alçakta ${ozet.enAlcak.ad} (${ozet.enAlcak.rakim < 10 ? "deniz kıyısında" : `yaklaşık ${m(ozet.enAlcak.rakim)} m`}) bulunur; aradaki fark ${m(ozet.fark)} metredir.${ozet.eksik.egimli.length ? ` Merkezi dağ yamacında olduğu için listeye alınmayan ${ozet.eksik.egimli.join(", ")} daha yüksekte olabilir.` : ""}`,
          },
        ]
      : []),
    ...(bolge
      ? [
          {
            question: `${province.nameTr}, ${bolge.bolge} Bölgesi'nde rakımca kaçıncı?`,
            answer: `${bolge.bolge} Bölgesi'ndeki ${bolge.liste.length} il arasında ${bolge.sira}. sıradadır. Bölgenin en yüksek il merkezi ${bolge.liste[0].name} (${m(bolge.liste[0].elevationM)} m), en alçağı ${bolge.liste[bolge.liste.length - 1].name} (${m(bolge.liste[bolge.liste.length - 1].elevationM)} m).`,
          },
        ]
      : []),
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: "İllerin Rakımı", item: buildSiteUrl("/il-rakimlari") },
      { "@type": "ListItem", position: 3, name: province.nameTr, item: pageUrl },
    ],
  };

  return (
    <main className="all-conversions-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sayfa yolu">
          <Link href="/">Ana Sayfa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/il-rakimlari">İllerin Rakımı</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{province.nameTr}</span>
        </nav>

        <header className="all-conversions-header">
          <h1>{province.nameTr} Rakımı ve İrtifa Etkisi</h1>
          <p>
            {province.nameTr} il merkezi denizden {m(province.elevationM)} metre yüksekte.
            {ozet ? (
              <>
                {" "}{ozet.kesin ? "İlçeleri" : "Rakımı listelenen ilçeler"} arasında en yüksek {ozet.enYuksek.ad} (≈{m(ozet.enYuksek.rakim)} m), en alçak {ozet.enAlcak.ad}
                {ozet.enAlcak.rakim < 10 ? " (deniz kıyısında)" : ` (≈${m(ozet.enAlcak.rakim)} m)`}.
              </>
            ) : null}{" "}
            Aşağıda ilçe rakımları, bu yükseklikte hava basıncı, suyun kaynama noktası ve mutfakta neyin değiştiği var.
          </p>
        </header>

        <section className="category-article-content">
          <h2>{province.nameTr} Temel Özellikleri</h2>
          <dl className="unit-facts">
            <div>
              <dt>Rakım</dt>
              <dd>{province.elevationM.toLocaleString("tr-TR")} m</dd>
            </div>
            {altitudeEffect && (
              <>
                <div>
                  <dt>Hava Basıncı</dt>
                  <dd>{formatNumber(altitudeEffect.pressureHpa)} hPa</dd>
                </div>
                <div>
                  <dt>Deniz Seviyesine Göre Basınç Oranı</dt>
                  <dd>%{formatNumber(altitudeEffect.percentOfSeaLevel)}</dd>
                </div>
                <div>
                  <dt>Su Kaç Derecede Kaynar?</dt>
                  <dd>{formatNumber(altitudeEffect.waterBoilingPointC)} °C</dd>
                </div>
              </>
            )}
          </dl>
          <p>
            <small>
              <strong>Not:</strong> Hava basıncı standart ICAO/NOAA barometrik
              formülüyle, kaynama noktası ise Clausius-Clapeyron denklemiyle
              hesaplanmıştır.
            </small>
          </p>
        </section>


        {ozet ? (
          <section className="category-article-content">
            <h2>{province.nameTr} İlçelerinin Rakımı</h2>
            <p>
              {ozet.kesin ? `${trGenitive(province.nameTr)} ${ilceListesi.length} ilçesi` : `Rakımı belirlenebilen ${ilceListesi.length} ilçe`} yüksekten alçağa sıralı. Listede en
              yüksek <strong>{ozet.enYuksek.ad}</strong> ile en alçak <strong>{ozet.enAlcak.ad}</strong> arasında yaklaşık <strong>{m(ozet.fark)} metre</strong> fark var.
              {ozet.eksik.egimli.length ? (
                <> Merkezi dağ yamacında olduğu için tek bir rakım değeri verilemeyen ilçeler: {ozet.eksik.egimli.join(", ")}.</>
              ) : null}
              {ozet.eksik.bulunamayan.length ? <> Merkez noktası bulunamadığı için listede olmayanlar: {ozet.eksik.bulunamayan.join(", ")}.</> : null}
            </p>
            <div className="holiday-table-wrap">
              <table className="holiday-table">
                <thead>
                  <tr>
                    <th scope="col">İlçe</th>
                    <th scope="col">Rakım</th>
                    <th scope="col">İl merkezine göre</th>
                    <th scope="col">Su kaynar</th>
                  </tr>
                </thead>
                <tbody>
                  {ilceListesi.map((x) => {
                    const fark = x.rakim - province.elevationM;
                    const e = calculateAltitudeEffect(x.rakim);
                    return (
                      <tr key={x.ad}>
                        <th scope="row">{x.merkez ? `${x.ad} (il merkezi)` : x.ad}</th>
                        <td>{x.merkez ? `${m(x.rakim)}\u00a0m` : x.rakim < 10 ? "<10\u00a0m (kıyı)" : `≈${m(x.rakim)}\u00a0m`}</td>
                        <td>{x.merkez ? "—" : Math.abs(fark) < 10 ? "≈ aynı" : `${fark > 0 ? "+" : "−"}${m(Math.abs(fark))}\u00a0m`}</td>
                        <td>{e ? `${formatNumber(e.waterBoilingPointC)}\u00a0°C` : "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p>
              <small>İlçe rakımları ilçe merkezinin koordinatında uydu yükseklik verisinden okunmuştur ve yaklaşıktır (çoğunda ±50 m); yanlış değer vermemek için emin
              olamadığımız ilçeleri listeye almadık.</small>
            </p>
          </section>
        ) : null}

        <section className="category-article-content">
          <h2>{mutfak.baslik}</h2>
          <p>
            {province.nameTr} ({m(province.elevationM)} m): {mutfak.metin}
          </p>
        </section>

        {bolge || yakinlar.length ? (
          <section className="category-article-content">
            <h2>Çevre İllerle Karşılaştırma</h2>
            {bolge ? (
              <p>
                {province.nameTr}, {bolge.bolge} Bölgesi&apos;ndeki {bolge.liste.length} il arasında rakımca <strong>{bolge.sira}.</strong> sırada. Bölgenin en yüksek il merkezleri:{" "}
                {bolge.liste.slice(0, 3).map((p, i) => (
                  <span key={p.id}>
                    {i ? ", " : ""}
                    <Link href={`/il-rakimlari/${p.id}`}>{p.name}</Link> ({m(p.elevationM)} m)
                  </span>
                ))}
                .
              </p>
            ) : null}
            {yakinlar.length ? (
              <div className="holiday-table-wrap">
                <table className="holiday-table">
                  <caption>{trAblative(province.nameTr)} karayoluyla en yakın iller</caption>
                  <thead>
                    <tr>
                      <th scope="col">İl</th>
                      <th scope="col">Yol</th>
                      <th scope="col">Rakım</th>
                      <th scope="col">Fark</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yakinlar.map((y) => (
                      <tr key={y.il.id}>
                        <th scope="row">
                          <Link href={`/il-rakimlari/${y.il.id}`}>{y.il.name}</Link>
                        </th>
                        <td>{m(y.km)} km</td>
                        <td>{m(y.il.elevationM)} m</td>
                        <td>{y.fark === 0 ? "aynı" : `${y.fark > 0 ? "+" : "−"}${m(Math.abs(y.fark))} m`}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </section>
        ) : null}

        {rankContext && (
          <section className="category-article-content">
            <h2>Türkiye Rakım Sıralamasında {province.nameTr}</h2>
            <p>
              {province.nameTr}, Türkiye&apos;nin {rankContext.totalCount} ili
              arasında rakım sıralamasında <strong>{rankContext.rank}.</strong>{" "}
              sırada yer alır.
              {rankContext.nextHigher && (
                <>
                  {" "}Bir üst sırada{" "}
                  <Link href={`/il-rakimlari/${rankContext.nextHigher.id}`}>
                    {rankContext.nextHigher.nameTr}
                  </Link>{" "}
                  ({rankContext.nextHigher.elevationM.toLocaleString("tr-TR")} m)
                  bulunur.
                </>
              )}
              {rankContext.nextLower && (
                <>
                  {" "}Bir alt sırada ise{" "}
                  <Link href={`/il-rakimlari/${rankContext.nextLower.id}`}>
                    {rankContext.nextLower.nameTr}
                  </Link>{" "}
                  ({rankContext.nextLower.elevationM.toLocaleString("tr-TR")} m)
                  yer alır.
                </>
              )}
            </p>
          </section>
        )}

        {nearestMountain && elevationDiff !== null && (
          <section className="category-article-content">
            <h2>İlginizi Çekebilir: Dünyanın Zirveleriyle Karşılaştır</h2>
            <p>
              {province.nameTr} {province.elevationM.toLocaleString("tr-TR")}{" "}
              metre rakımdayken, dünyanın en yüksek zirvelerinden{" "}
              <Link href={`/dunyanin-en-yuksek-daglari/${nearestMountain.id}`}>
                {nearestMountain.nameTr}
              </Link>{" "}
              {nearestMountain.elevationM.toLocaleString("tr-TR")} metre — yani{" "}
              {province.nameTr}&apos;den yaklaşık{" "}
              {elevationDiff.toLocaleString("tr-TR")} metre daha yüksek.
            </p>
          </section>
        )}

        <section className="category-article-content">
          <h2>Sık Sorulan Sorular</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>İlgili araçlar</h2>
          <p>
            Diğer iller için{" "}
            <Link href="/il-rakimlari">İllerin Rakımı</Link>
            {" "}sayfasına bakabilirsin. {province.nameTr} ile diğer iller arasındaki karayolu ve kuş uçuşu mesafeler için{" "}
            <Link href={`/iller-arasi-mesafe/${province.id}`}>{trAblative(province.nameTr)} illere mesafe</Link>, tüm illeri haritada görmek için{" "}
            <Link href="/turkiye-il-haritasi">Türkiye il haritası</Link> sayfasını kullanabilirsin.
          </p>
          {comparisons.length > 0 && (
            <p>
              Hazır karşılaştırmalar:{" "}
              {comparisons.map((x, i) => (
                <span key={x.slug}>
                  {i > 0 ? ", " : ""}
                  <Link href={`/il-rakimi-karsilastirma/${x.slug}`}>
                    {findProvinceById(x.provinceIdA)?.nameTr} – {findProvinceById(x.provinceIdB)?.nameTr} rakım farkı
                  </Link>
                </span>
              ))}
              .
            </p>
          )}

          <h2>Kaynaklar</h2>
          <p>
            İl rakımı, il merkezi karayolu ölçümüne dayanan, birden fazla
            coğrafya kaynağıyla çapraz kontrol edilmiş değerdir. İlçe rakımları
            GeoNames ilçe merkezi koordinatlarında açık sayısal yükseklik modelinden
            (SRTM tabanlı) okunmuştur. Basınç ve kaynama noktası standart atmosfer
            formülleriyle bu sayfada hesaplanmıştır; karayolu mesafeleri KGM verisidir.
          </p>
        </section>
      </div>
    </main>
  );
}
