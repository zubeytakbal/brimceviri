import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MaterialDensityConverterUz from "../../../components/calculators/MaterialDensityConverterUz";
import MaterialMassVolumeCalculatorUz from "../../../components/calculators/MaterialMassVolumeCalculatorUz";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import {
  findMaterialProfileById,
  findSimilarDensityMaterials,
  getAllMaterialProfiles,
} from "../../../converter/materialsHub";
import { getAllMaterialComparisons } from "../../../converter/materialComparisons";
import { materialCategoryLabelsUz, materialNamesUz, materialVariabilityNotesUz } from "../../../converter/materialsDatabaseUz";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatDensity(value: number) {
  return value.toLocaleString("uz-UZ", { maximumFractionDigits: 4 });
}

function nameUz(id: string, fallback: string) {
  return materialNamesUz[id] ?? fallback;
}

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function generateStaticParams() {
  return getAllMaterialProfiles().map((material) => ({ slug: material.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const material = findMaterialProfileById(slug);

  if (!material) {
    return { title: "Material topilmadi", robots: { index: false, follow: false } };
  }

  const name = nameUz(material.id, material.nameTr);
  const title = `${name} Zichligi, Xususiyatlari va Birlik Aylantirgich`;
  const description = `${name} zichligi ${formatDensity(material.densityKgM3)} kg/m³. Zichlikni g/cm³, kg/L va boshqa birliklarga aylantiring, ma'lum barcha muhandislik xususiyatlarini ko'ring.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/uz/material-xossalari/${slug}`,
      languages: {
        tr: `/malzeme-ozellikleri/${slug}`,
        "uz-UZ": `/uz/material-xossalari/${slug}`,
        "x-default": `/malzeme-ozellikleri/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/uz/material-xossalari/${slug}`),
      siteName: "BirimCeviri.app",
      locale: "uz_UZ",
      type: "article",
    },
  };
}

export default async function UzbekMaterialPropertyPage({ params }: PageProps) {
  const { slug } = await params;
  const material = findMaterialProfileById(slug);

  if (!material) {
    notFound();
  }

  const name = nameUz(material.id, material.nameTr);
  const pageUrl = buildSiteUrl(`/uz/material-xossalari/${slug}`);
  const similarMaterials = findSimilarDensityMaterials(slug, 5);
  const relatedComparisons = getAllMaterialComparisons().filter(
    (comparison) => comparison.first.id === slug || comparison.second.id === slug
  );
  const variabilityNoteUz = materialVariabilityNotesUz[material.id];

  const faqItems: FaqItem[] = [
    {
      question: `${name} zichligi necha kg/m³?`,
      answer: `${name} zichligi taxminan ${formatDensity(material.densityKgM3)} kg/m³ (${formatDensity(material.densityKgM3 / 1000)} g/sm³) qiymatidadir.`,
    },
  ];

  if (material.thermalConductivityWmK !== null) {
    faqItems.push({
      question: `${name} issiqlik o'tkazuvchanligi qancha?`,
      answer: `${name} uchun odatiy issiqlik o'tkazuvchanlik qiymati taxminan ${material.thermalConductivityWmK} W/(m·K).`,
    });
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Bosh sahifa", item: buildSiteUrl("/uz") },
      { "@type": "ListItem", position: 2, name: "Material Xususiyatlari", item: buildSiteUrl("/uz/material-xossalari") },
      { "@type": "ListItem", position: 3, name, item: pageUrl },
    ],
  };

  return (
    <main className="all-conversions-page" lang="uz">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Sahifa yo'li">
          <Link href="/uz">Bosh sahifa</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/uz/material-xossalari">Material Xususiyatlari</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{name}</span>
        </nav>

        <header className="all-conversions-header">
          <h1>{name} Zichligi, Xususiyatlari va Birlik Aylantirgich</h1>
          <p>
            {name} ({materialCategoryLabelsUz[material.category]}
            {" "}kategoriyasi) zichligi, ma&apos;lum muhandislik
            xususiyatlari va jonli birlik aylantirgich.
          </p>
        </header>

        <section className="category-article-content">
          <h2>{name} Asosiy Xususiyatlari</h2>
          <dl className="unit-facts">
            <div>
              <dt>Zichlik</dt>
              <dd>
                {formatDensity(material.densityKgM3)} kg/m³ (
                {formatDensity(material.densityKgM3 / 1000)} g/sm³)
              </dd>
            </div>
            {material.thermalConductivityWmK !== null && (
              <div>
                <dt>Issiqlik O&apos;tkazuvchanligi</dt>
                <dd>
                  {material.variabilityNote && "~"}
                  {material.thermalConductivityWmK} W/(m·K)
                </dd>
              </div>
            )}
            {material.elasticModulusGPa !== null && (
              <div>
                <dt>Elastisiya Moduli (Yung Moduli)</dt>
                <dd>{material.elasticModulusGPa} GPa</dd>
              </div>
            )}
            {material.thermalExpansionPerMillionK !== null && (
              <div>
                <dt>Issiqlik Kengayish Koeffitsienti</dt>
                <dd>{material.thermalExpansionPerMillionK} × 10⁻⁶/K</dd>
              </div>
            )}
            {material.viscosityMPaS !== null && (
              <div>
                <dt>Dinamik Qovushqoqlik</dt>
                <dd>
                  {material.variabilityNote && "~"}
                  {material.viscosityMPaS} mPa·s
                </dd>
              </div>
            )}
          </dl>
          {variabilityNoteUz && (
            <p className="calculator-usage-hint">
              <strong>O&apos;zgaruvchanlik ogohlantirishi:</strong> {variabilityNoteUz}
            </p>
          )}
        </section>

        <MaterialMassVolumeCalculatorUz
          densityKgM3={material.densityKgM3}
          materialName={name}
        />

        <MaterialDensityConverterUz
          densityKgM3={material.densityKgM3}
          materialName={name}
        />

        {similarMaterials.length > 0 && (
          <section className="category-article-content">
            <h2>{name} bilan O&apos;xshash Zichlikdagi Materiallar</h2>
            <ul className="related-conversion-list">
              {similarMaterials.map((similar) => (
                <li key={similar.id}>
                  <Link href={`/uz/material-xossalari/${similar.id}`}>
                    {nameUz(similar.id, similar.nameTr)}
                  </Link>{" "}
                  — {formatDensity(similar.densityKgM3)} kg/m³
                </li>
              ))}
            </ul>
          </section>
        )}

        {relatedComparisons.length > 0 && (
          <section className="category-article-content">
            <h2>{name} Solishtirishlari</h2>
            <ul className="related-conversion-list">
              {relatedComparisons.map((comparison) => (
                <li key={comparison.slug}>
                  <Link href={`/uz/material-solishtirish/${comparison.slug}`}>
                    {nameUz(comparison.first.id, comparison.first.nameTr)} –{" "}
                    {nameUz(comparison.second.id, comparison.second.nameTr)}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="category-article-content">
          <h2>Tez-tez So&apos;raladigan Savollar</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>Tegishli vositalar</h2>
          <p>
            Ushbu materialning zichligidan bo&apos;lak og&apos;irligini
            hisoblash uchun{" "}
            <Link href="/uz/material-ogirligi-hisoblash">Material Og&apos;irligi Hisoblash</Link>
            {" "}sahifasiga,{" "}
            {material.thermalConductivityWmK !== null && (
              <>
                issiqlik o&apos;tkazish hisoblari uchun{" "}
                <Link href="/uz/issiqlik-otkazuvchanligi-hisoblash">Issiqlik O&apos;tkazuvchanligi Hisoblagichi</Link>
                {" "}sahifasiga,{" "}
              </>
            )}
            {material.viscosityMPaS !== null && (
              <>
                suyuqlik hisoblari uchun{" "}
                <Link href="/uz/reynolds-soni-hisoblash">Reynolds Soni Hisoblagichi</Link>
                {" "}sahifasiga,{" "}
              </>
            )}
            barcha materiallar uchun{" "}
            <Link href="/uz/material-xossalari">Material Xususiyatlari</Link> bosh
            sahifasiga qarashingiz mumkin.
          </p>

          <h2>Manbalar</h2>
          <p>
            Zichlik va boshqa xususiyat qiymatlari, keng qabul
            qilingan muhandislik ma&apos;lumotnoma jadvallaridan
            to&apos;plangan, xona haroratiga yaqin umumiy qiymatlardir;
            haqiqiy qiymatlar materialning turiga, tozaligiga va
            haroratga qarab kichik farqlar ko&apos;rsatishi mumkin.
          </p>
        </section>
      </div>
    </main>
  );
}
