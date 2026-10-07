import type { Metadata } from "next";
import { seoTitle } from "../../../seoTitle";
import Link from "@/app/components/SiteLink";
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
import { type MaterialCategory } from "../../../converter/materialsDatabase";
import { materialCategoryLabelsUz, materialNamesUz, materialVariabilityNotesUz } from "../../../converter/materialsDatabaseUz";
import { buoyancy, densityRank, litresPerKg, practicalRows } from "../../../converter/materialPractical";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const uz = (value: number, digits: number) => value.toLocaleString("uz-UZ", { maximumFractionDigits: digits });

function formatMass(kg: number) {
  if (kg >= 1000) return `${uz(kg / 1000, 2)} t`;
  if (kg >= 1) return `${uz(kg, 2)} kg`;
  if (kg >= 0.001) return `${uz(kg * 1000, 1)} g`;
  return `${uz(kg * 1e6, 1)} mg`;
}

function formatDensity(value: number) {
  return value.toLocaleString("uz-UZ", { maximumFractionDigits: 4 });
}

function nameUz(id: string, fallback: string) {
  return materialNamesUz[id] ?? fallback;
}

function getDensityUseNote(category: MaterialCategory) {
  const notes: Record<MaterialCategory, string> = {
    metal: "Metall zichligi qotishma tarkibi, issiqlik bilan ishlov berish va haroratga qarab o'zgaradi. Bu qiymat material sinfi ko'rsatilmagan dastlabki massa va hajm hisoblari uchun nominal ma'lumotdir.",
    sivi: "Suyuqlik zichligi ayniqsa harorat va aralashma nisbatiga bog'liq. Aniq to'ldirish, tijoriy mahsulot yoki xavfsizlik hisobi uchun mahsulotning texnik varag'idagi haroratga bog'liq qiymatdan foydalaning.",
    gaz: "Gaz zichligi harorat va bosimga juda bog'liq. Bu qiymat dastlabki taqqoslash va taxminiy massa hisobi uchun; jarayon hisobida ayni harorat va bosim sharoitidagi o'lchangan qiymatdan foydalaning.",
    plastik: "Polimer zichligi smola turi, to'ldirgich va ishlab chiqarish usuliga qarab o'zgarishi mumkin. Mahsulot loyihalashda ishlab chiqaruvchining texnik varag'idagi sinfga xos qiymatni tekshiring.",
    "yapi-malzemesi": "Qurilish materiallarida namlik, g'ovaklik va siqilish darajasi zichlikni o'zgartiradi. Hisob quruq va odatiy material uchun dastlabki bahodir.",
    ahsap: "Yog'och zichligi turdan tashqari namlik va tolalar yo'nalishiga qarab o'zgaradi. Aniq og'irlik hisobida o'lchangan namlik hamda haqiqiy qism hajmidan foydalaning.",
    gida: "Oziq-ovqat va oshxona materiallarida suv, yog' va havo miqdori markaga hamda tayyorlash usuliga bog'liq. Natija taxminiy oshxona va hajm hisobi uchundir.",
  };

  return notes[category];
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
    title: seoTitle(title, `${name} Zichligi va Xususiyatlari`, `${name.match(/\(([^)]+)\)\s*$/)?.[1] ?? name} Zichligi va Xususiyatlari`),
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
  const oneLitreMassKg = material.densityKgM3 / 1000;
  const practical = practicalRows(material, "uz");
  const perKg = litresPerKg(material);
  const float = buoyancy(material);
  const rank = densityRank(material);

  const faqItems: FaqItem[] = [
    {
      question: `${name} zichligi necha kg/m³?`,
      answer: `${name} zichligi taxminan ${formatDensity(material.densityKgM3)} kg/m³ (${formatDensity(material.densityKgM3 / 1000)} g/sm³) qiymatidadir.`,
    },
    {
      question: `1 litr ${name} taxminan necha kg?`,
      answer: `Bu ma'lumotnoma zichligi bilan 1 litr ${name} taxminan ${formatDensity(oneLitreMassKg)} kg keladi. Haqiqiy natija harorat, material sinfi va tarkibiga qarab o'zgarishi mumkin.`,
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

        <section className="category-article-content">
          <h2>{name} qancha og&apos;ir keladi?</h2>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <thead>
                <tr>
                  <th scope="col">O&apos;lcham</th>
                  <th scope="col">Taxminiy og&apos;irlik</th>
                </tr>
              </thead>
              <tbody>
                {practical.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{formatMass(row.massKg)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            1 kg {name} taxminan{" "}
            {perKg >= 1000 ? `${uz(perKg / 1000, 2)} m³` : perKg >= 1 ? `${uz(perKg, 2)} litr` : `${uz(perKg * 1000, 1)} sm³`} joy
            egallaydi.{" "}
            {float.kind === "gas"
              ? float.lighterThanAir
                ? `Havodan taxminan ${uz(1 / float.ratio, 1)} marta yengil, shuning uchun yuqoriga ko'tariladi.`
                : `Havodan taxminan ${uz(float.ratio, 1)} marta og'ir, sizib chiqqanda pastda, yerto'la va chuqurlarda to'planadi.`
              : float.floats
                ? `Zichligi suvnikining ${uz(float.ratio, 2)} qismiga teng, shuning uchun suvda suzadi.`
                : float.ratio < 1.01
                  ? "Zichligi suvnikiga juda yaqin."
                  : `Suvdan ${uz(float.ratio, 2)} marta zich, shuning uchun suvga cho'kadi.`}
          </p>
          <p>
            Saytdagi {rank.total} material ichida zichlik bo&apos;yicha (eng zichidan boshlab) {rank.overall}-o&apos;rinda,{" "}
            {materialCategoryLabelsUz[material.category]} guruhida {rank.categoryTotal} tadan {rank.inCategory}-o&apos;rinda.{" "}
            {getDensityUseNote(material.category)}
          </p>
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

          <p>
            Manba:{" "}
            <a href="https://densitycalculator.net/density-table" target="_blank" rel="noreferrer">
              zichlik jadvali
            </a>
            ; xona haroratidagi ma&apos;lumotnoma qiymatlari. Bo&apos;lak og&apos;irligi uchun{" "}
            <Link href="/uz/material-ogirligi-hisoblash">Material Og&apos;irligi Hisoblash</Link>.
          </p>
        </section>
      </div>
    </main>
  );
}
