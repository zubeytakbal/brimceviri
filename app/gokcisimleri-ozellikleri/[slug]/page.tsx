import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CelestialBodyWeightCalculator from "../../components/CelestialBodyWeightCalculator";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import {
  findCelestialBodyById,
  findSimilarGravityBodies,
  getAllCelestialBodies,
} from "../../converter/celestialBodiesHub";
import { buildSiteUrl } from "../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatNumber(value: number, maxFractionDigits = 2): string {
  return value.toLocaleString("tr-TR", { maximumFractionDigits: maxFractionDigits });
}

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function generateStaticParams() {
  return getAllCelestialBodies().map((body) => ({ slug: body.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const body = findCelestialBodyById(slug);

  if (!body) {
    return { title: "Gökcismi bulunamadı", robots: { index: false, follow: false } };
  }

  const title = `${body.nameTr} Özellikleri: Kütle, Yerçekimi ve Ağırlık Hesaplama`;
  const description = `${body.nameTr}'in kütlesi, çapı, yerçekimi ve diğer özellikleri. Kendi kilonun ${body.nameTr}'de kaç kilo geleceğini hesapla.`;

  return {
    title,
    description,
    alternates: { canonical: `/gokcisimleri-ozellikleri/${slug}` },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/gokcisimleri-ozellikleri/${slug}`),
      siteName: "BirimCeviri.app",
      locale: "tr_TR",
      type: "article",
    },
  };
}

export default async function CelestialBodyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const body = findCelestialBodyById(slug);

  if (!body) {
    notFound();
  }

  const pageUrl = buildSiteUrl(`/gokcisimleri-ozellikleri/${slug}`);
  const similarBodies = findSimilarGravityBodies(slug, 3);
  const parentBody = body.orbitsAroundId ? findCelestialBodyById(body.orbitsAroundId) : undefined;

  const faqItems: FaqItem[] = [
    {
      question: `${body.nameTr}'in yerçekimi ne kadar?`,
      answer: `${body.nameTr}'in yüzey yerçekimi ivmesi yaklaşık ${formatNumber(body.gravityMs2, 1)} m/s² — Dünya'nınkinin (9,8 m/s²) yaklaşık ${formatNumber(body.gravityMs2 / 9.8, 2)} katı.`,
    },
    {
      question: `${body.nameTr}'de bir yıl kaç gün sürer?`,
      answer: `${body.nameTr}'in Güneş etrafındaki yörünge periyodu yaklaşık ${formatNumber(body.orbitalPeriodDays, 0)} Dünya günüdür.`,
    },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: buildSiteUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Gökcisimleri Özellikleri",
        item: buildSiteUrl("/gokcisimleri-ozellikleri"),
      },
      { "@type": "ListItem", position: 3, name: body.nameTr, item: pageUrl },
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
          <Link href="/gokcisimleri-ozellikleri">Gökcisimleri Özellikleri</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{body.nameTr}</span>
        </nav>

        <header className="all-conversions-header">
          <h1>{body.nameTr} Özellikleri</h1>
          <p>
            {body.nameTr}&apos;in kütlesi, çapı, yoğunluğu ve
            yerçekimi
            {parentBody && (
              <>
                {" "}({parentBody.nameTr}&apos;in uydusu)
              </>
            )}
            ; kendi ağırlığının {body.nameTr}&apos;de kaç kilo
            geleceğini hesapla.
          </p>
        </header>

        <section className="category-article-content">
          <h2>{body.nameTr} Temel Özellikleri</h2>
          <dl className="unit-facts">
            <div>
              <dt>Kütle</dt>
              <dd>{formatNumber(body.massKg / 1e24, 3)} × 10²⁴ kg</dd>
            </div>
            <div>
              <dt>Çap</dt>
              <dd>{formatNumber(body.diameterKm, 0)} km</dd>
            </div>
            <div>
              <dt>Yoğunluk</dt>
              <dd>{formatNumber(body.densityKgM3, 0)} kg/m³</dd>
            </div>
            <div>
              <dt>Yüzey Yerçekimi</dt>
              <dd>{formatNumber(body.gravityMs2, 1)} m/s²</dd>
            </div>
            <div>
              <dt>Kaçış Hızı</dt>
              <dd>{formatNumber(body.escapeVelocityKms, 1)} km/s</dd>
            </div>
            {body.distanceFromSunMillionKm !== undefined && (
              <div>
                <dt>Güneşe Ortalama Uzaklık</dt>
                <dd>{formatNumber(body.distanceFromSunMillionKm, 1)} milyon km</dd>
              </div>
            )}
            {body.orbitsAroundId && body.distanceFromParentKm !== undefined && (
              <div>
                <dt>{parentBody?.nameTr ?? "Merkez Gökcismi"}&apos;e Ortalama Uzaklık</dt>
                <dd>{formatNumber(body.distanceFromParentKm, 0)} km</dd>
              </div>
            )}
            <div>
              <dt>Yörünge Periyodu (1 Yıl)</dt>
              <dd>{formatNumber(body.orbitalPeriodDays, 0)} Dünya günü</dd>
            </div>
            <div>
              <dt>Kendi Ekseni Etrafında Dönüş (1 Gün)</dt>
              <dd>
                {formatNumber(Math.abs(body.rotationPeriodHours), 1)} saat
                {body.rotationPeriodHours < 0 && " (ters yönde dönüş)"}
              </dd>
            </div>
            <div>
              <dt>Ortalama Sıcaklık</dt>
              <dd>{formatNumber(body.meanTemperatureC, 0)} °C</dd>
            </div>
            <div>
              <dt>Bilinen Uydu Sayısı</dt>
              <dd>{body.moonCount}</dd>
            </div>
          </dl>
          <p className="calculator-usage-hint">
            <strong>Not:</strong> Uydu sayısı, yeni teleskop
            taramalarıyla küçük uyduların keşfedilmesiyle zamanla
            artabilir; buradaki değer güncel ama kesin bir üst sınır
            değildir.
          </p>
        </section>

        <CelestialBodyWeightCalculator celestialBodyId={body.id} bodyName={body.nameTr} />

        {similarBodies.length > 0 && (
          <section className="category-article-content">
            <h2>{body.nameTr} ile Benzer Yerçekimine Sahip Gökcisimleri</h2>
            <ul className="related-conversion-list">
              {similarBodies.map((similar) => (
                <li key={similar.id}>
                  <Link href={`/gokcisimleri-ozellikleri/${similar.id}`}>
                    {similar.nameTr}
                  </Link>{" "}
                  — {formatNumber(similar.gravityMs2, 1)} m/s²
                </li>
              ))}
            </ul>
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
            {parentBody && (
              <>
                {body.nameTr}&apos;in etrafında döndüğü{" "}
                <Link href={`/gokcisimleri-ozellikleri/${parentBody.id}`}>
                  {parentBody.nameTr}
                </Link>
                {" "}sayfasına, diğer gökcisimleri için{" "}
              </>
            )}
            {!parentBody && "Diğer gökcisimleri için "}
            <Link href="/gokcisimleri-ozellikleri">Gökcisimleri Özellikleri</Link>
            {" "}sayfasına bakabilirsin.
          </p>

          <h2>Kaynaklar</h2>
          <p>
            {body.category === "gezegen"
              ? "Bu sayfadaki fiziksel değerler NASA'nın resmi Planetary Fact Sheet verisine dayanır."
              : "Bu sayfadaki fiziksel değerler, ilgili gökcisminin bilimsel kaynaklarda (NASA/gözlemsel çalışmalar) yayımlanan, çapraz doğrulanmış değerlerine dayanır."}
            {" "}Uydu sayısı gibi sık değişen değerler ayrıca güncel
            kaynaklarla doğrulanmıştır.
          </p>
        </section>
      </div>
    </main>
  );
}
