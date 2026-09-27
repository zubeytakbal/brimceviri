import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { notFound } from "next/navigation";
import CgpaCalculator from "../../../components/CgpaCalculator";
import CgpaSourceCheckButton from "../../../components/CgpaSourceCheckButton";
import YouMayAlsoLike from "../../../components/YouMayAlsoLike";
import { getCgpaSourceAlerts } from "../../../converter/cgpaSourceMonitor";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import {
  cgpaToPercentage,
  cgpaUniversities,
  findCgpaUniversity,
  formulaText,
  percentageToCgpa,
} from "../../../converter/india/cgpaUniversities";
import { getEnglishYouMayAlsoLike } from "../../../i18n/englishRelatedPages";
import { buildSiteUrl } from "../../../siteConfig";
import {
  formulaOptions,
  formatVerifiedDate,
  percentLabel,
  serializeJsonLd,
  SourceChangeNotice,
  TABLE_CGPAS,
  UniversityTable,
} from "../cgpaShared";

export const revalidate = 43200;
export const dynamicParams = false;

type PageProps = { params: Promise<{ university: string }> };

export function generateStaticParams() {
  return cgpaUniversities.map((university) => ({ university: university.slug }));
}

function pageTitle(shortName: string) {
  const full = `${shortName} CGPA to Percentage Calculator`;
  return full.length <= 47 ? full : `${shortName} CGPA to Percentage`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { university: slug } = await params;
  const university = findCgpaUniversity(slug);
  if (!university) return { title: "University not found", robots: { index: false, follow: false } };

  const title = pageTitle(university.shortName);
  const description = `${formulaText(university)}. Official ${university.shortName} formula with a calculator, a CGPA-to-percentage table, the source document and SGPA to CGPA.`;
  const path = `/en/cgpa-to-percentage/${university.slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
  };
}

export default async function UniversityCgpaPage({ params }: PageProps) {
  const { university: slug } = await params;
  const university = findCgpaUniversity(slug);
  if (!university) notFound();

  const path = `/en/cgpa-to-percentage/${university.slug}`;
  const alert = (await getCgpaSourceAlerts()).find((entry) => entry.university.slug === university.slug);
  const at8 = percentLabel(cgpaToPercentage(8, university));
  const at75 = percentLabel(cgpaToPercentage(7.5, university));
  const cgpaFor60 = percentageToCgpa(60, university);

  const faqItems: FaqItem[] = [
    {
      question: `How do I convert ${university.shortName} CGPA to percentage?`,
      answer: `${formulaText(university)}. For example, a CGPA of 8.0 is ${at8} and a CGPA of 7.5 is ${at75}.`,
    },
    {
      question: `What CGPA is 60% at ${university.shortName}?`,
      answer:
        cgpaFor60 === null
          ? "60% is outside the range of this formula."
          : `About ${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(cgpaFor60)} CGPA, using the reverse of the same formula.`,
    },
    {
      question: `Where does the ${university.shortName} formula come from?`,
      answer: `From ${university.sourceTitle}. It applies to: ${university.scope}. Last verified on ${formatVerifiedDate(university.verifiedOn)}.`,
    },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: buildSiteUrl("/en") },
      { "@type": "ListItem", position: 2, name: "CGPA to Percentage", item: buildSiteUrl("/en/cgpa-to-percentage") },
      { "@type": "ListItem", position: 3, name: university.shortName, item: buildSiteUrl(path) },
    ],
  };

  return (
    <main className="all-conversions-page" lang="en">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/en">Home</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/en/cgpa-to-percentage">CGPA to Percentage</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{university.shortName}</span>
        </nav>

        <header className="all-conversions-header">
          <h1>{university.shortName} CGPA to Percentage Calculator</h1>
          <p>
            {university.name} ({university.location}) converts CGPA to percentage with: <strong>{formulaText(university)}</strong>. Enter
            your CGPA below, or add your semester SGPAs to get the CGPA first.
          </p>
        </header>

        {alert && <SourceChangeNotice university={university} changedAt={alert.changedAt} />}

        <CgpaCalculator options={formulaOptions()} initialSlug={university.slug} />

        <section className="category-article-content">
          <h2>Official formula and source</h2>
          <div className="conversion-formula">
            <strong>{formulaText(university)}</strong>
            <p>Applies to: {university.scope}.</p>
          </div>
          <p>
            Source:{" "}
            <a href={university.sourceUrl} rel="noopener noreferrer" target="_blank">
              {university.sourceTitle}
            </a>
            . Last verified on {formatVerifiedDate(university.verifiedOn)}. We check this source every night; if it changes, this page
            shows a notice until the formula is confirmed again.
          </p>
          {university.notes?.map((note) => <p key={note}>{note}</p>)}
          <CgpaSourceCheckButton slug={university.slug} sourceUrl={university.sourceUrl} sourceTitle={university.sourceTitle} />

          <h2>{university.shortName} CGPA to percentage table</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>CGPA</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {TABLE_CGPAS.map((value) => (
                  <tr key={value}>
                    <td>{value.toFixed(1)}</td>
                    <td>{percentLabel(cgpaToPercentage(value, university))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Other universities</h2>
          <p>The same CGPA gives a different percentage at each university:</p>
          <UniversityTable activeSlug={university.slug} />

          <h2>Frequently asked questions</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}
          <p>
            An official conversion certificate or a conversion printed on your marksheet always takes precedence over a calculator.
          </p>
        </section>

        <YouMayAlsoLike title="You may also like" cards={getEnglishYouMayAlsoLike(path)} />
      </div>
    </main>
  );
}
