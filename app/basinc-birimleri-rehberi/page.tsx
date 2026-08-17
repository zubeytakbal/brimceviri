import type { Metadata } from "next";
import Link from "next/link";
import StaticPageLayout from "../components/StaticPageLayout";
import { pressureUnitsGuide } from "../converter/pressureUnitsGuide";
import { SITE_NAME, SITE_URL } from "../siteConfig";

const PAGE_TITLE = "Basınç Birimleri Rehberi";
const PAGE_DESCRIPTION =
  "Basınç biriminin ortak tarihçesi, Torricelli barometresi, Uluslararası Standart Atmosfer modeli ve genel ölçüm yöntemleri. Atmosfer, PSI, bar, mmHg gibi birimlere özgü ayrıntılar için ilgili birim sayfalarına bakın.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/basinc-birimleri-rehberi",
  },
  openGraph: {
    title: `${PAGE_TITLE} | ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/basinc-birimleri-rehberi`,
    siteName: SITE_NAME,
    locale: "tr_TR",
    type: "article",
  },
};

const pressureUnitLinks = [
  { slug: "pascal", name: "Pascal" },
  { slug: "kilopascal", name: "Kilopascal" },
  { slug: "bar", name: "Bar" },
  { slug: "atmosfer", name: "Atmosfer" },
  { slug: "psi", name: "PSI" },
  { slug: "milimetre-civa", name: "Milimetre Cıva" },
  {
    slug: "kilogram-kuvvet-santimetrekare",
    name: "Kilogram-kuvvet/Santimetrekare",
  },
];

export default function PressureUnitsGuidePage() {
  return (
    <StaticPageLayout
      locale="tr"
      breadcrumbAriaLabel="Sayfa yolu"
      breadcrumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/birimler", label: "Birim Rehberi" },
        { label: "Basınç Birimleri Rehberi" },
      ]}
      title={PAGE_TITLE}
      description={pressureUnitsGuide.introduction[0]}
      sections={[
        {
          heading: "Basınç birimleri hakkında",
          content: (
            <>
              {pressureUnitsGuide.introduction
                .slice(1)
                .map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
            </>
          ),
        },
        ...pressureUnitsGuide.sections.map((section) => ({
          heading: section.title,
          content: (
            <>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </>
          ),
        })),
        {
          heading: "Basınç metrolojisinde tarih çizelgesi",
          content: (
            <ol className="unit-timeline">
              {pressureUnitsGuide.timeline.map((item) => (
                <li key={`${item.year}-${item.title}`}>
                  <time>{item.year}</time>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          ),
        },
        {
          heading: "Basınç ölçüm yöntemleri",
          content: (
            <dl className="scientific-property-list">
              {pressureUnitsGuide.measurementMethods.map((method) => (
                <div key={method.title}>
                  <dt>{method.title}</dt>
                  <dd>
                    <strong>{method.description}</strong>
                    <small>Yaygın kullanım: {method.typicalUse}</small>
                  </dd>
                </div>
              ))}
            </dl>
          ),
        },
        {
          heading: "Basınç birimi sayfaları",
          content: (
            <>
              <p>
                Her birimin kendine özgü tanımı, dönüşüm değerleri ve
                kullanım alanları için ilgili sayfayı inceleyebilirsiniz.
              </p>

              <ul className="related-conversion-list">
                {pressureUnitLinks.map((unit) => (
                  <li key={unit.slug}>
                    <Link href={`/birimler/${unit.slug}`}>
                      {unit.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="category-inline-link">
                Bütün basınç birimlerinin karşılaştırması ve dönüşüm
                tablosu için{" "}
                <Link href="/kategoriler/basinc">
                  basınç birimleri kategori sayfasını
                </Link>{" "}
                inceleyebilirsiniz.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
