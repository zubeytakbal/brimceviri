import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import CgpaCalculator from "../../components/CgpaCalculator";
import YouMayAlsoLike from "../../components/YouMayAlsoLike";
import { getCgpaSourceAlerts } from "../../converter/cgpaSourceMonitor";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { cgpaUniversities } from "../../converter/india/cgpaUniversities";
import { getEnglishYouMayAlsoLike } from "../../i18n/englishRelatedPages";
import { buildSiteUrl } from "../../siteConfig";
import { formulaOptions, formatVerifiedDate, serializeJsonLd, SourceChangeNotice, UniversityTable } from "./cgpaShared";

export const revalidate = 43200;

const pagePath = "/en/cgpa-to-percentage";
const title = "CGPA to Percentage Calculator (VTU, Anna, DU)";
const description =
  "Convert CGPA to percentage with each university's official formula — VTU, Anna University, JNTUH, GTU, SPPU, Delhi University, CBSE and more — plus SGPA to CGPA.";

const faqItems: FaqItem[] = [
  {
    question: "How do I convert CGPA to percentage?",
    answer:
      "Use your university's own formula. Many use CGPA × 10 (Anna University, RGPV), some CGPA × 9.5 (Delhi University CBCS, CBSE), and some subtract an offset first: VTU and MAKAUT use (CGPA − 0.75) × 10, JNTUH and GTU use (CGPA − 0.5) × 10.",
  },
  {
    question: "Is CGPA × 9.5 correct for every university?",
    answer:
      "No. The 9.5 multiplier comes from CBSE and is also used by Delhi University for CBCS, but a VTU CGPA of 8.0 is 72.5% (not 76%), and an Anna University CGPA of 8.0 is 80%. Always check your own university's rule.",
  },
  {
    question: "How is CGPA calculated from SGPA?",
    answer:
      "CGPA is the credit-weighted average of your semester SGPAs: multiply each SGPA by that semester's credits, add them up and divide by the total credits.",
  },
  {
    question: "Which percentage should I put on a job or admission form?",
    answer:
      "If your university issues a CGPA-to-percentage conversion certificate or prints a conversion on the marksheet, use that. Otherwise use the formula from your university's regulations, as on this page.",
  },
];

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pagePath },
  openGraph: { title, description, url: buildSiteUrl(pagePath), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
};

export default async function CgpaToPercentageHubPage() {
  const alerts = await getCgpaSourceAlerts();
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: buildSiteUrl("/en") },
      { "@type": "ListItem", position: 2, name: "CGPA to Percentage Calculator", item: buildSiteUrl(pagePath) },
    ],
  };
  const latestVerification = cgpaUniversities.map((university) => university.verifiedOn).sort().at(-1)!;

  return (
    <main className="all-conversions-page" lang="en">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/en">Home</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>CGPA to Percentage Calculator</span>
        </nav>

        <header className="all-conversions-header">
          <h1>CGPA to Percentage Calculator</h1>
          <p>
            Pick your university or board and enter your CGPA. The calculator uses that university&apos;s official conversion formula,
            works in reverse (percentage to CGPA) and turns semester SGPAs into a CGPA.
          </p>
        </header>

        {alerts.map((alert) => (
          <SourceChangeNotice key={alert.university.slug} university={alert.university} changedAt={alert.changedAt} />
        ))}

        <CgpaCalculator options={formulaOptions()} />

        <section className="category-article-content">
          <h2>Official formulas by university</h2>
          <p>
            Every formula below is taken from the university&apos;s or board&apos;s own regulations or circulars, linked on each
            university page. Formulas last verified on {formatVerifiedDate(latestVerification)}; we check the official sources every
            night and mark a page when a source changes.
          </p>
          <UniversityTable />

          <h2>Why the formulas differ</h2>
          <p>
            A 10-point CGPA is not a percentage. Each university sets its own relationship between grade points and marks, so the same
            CGPA can mean different percentages: a CGPA of 8.0 is 72.5% at VTU, 75% at JNTUH and GTU, 76% at Delhi University, 71.2% at
            SPPU and 80% at Anna University.
          </p>

          <h2>University not listed?</h2>
          <p>
            Look for &ldquo;conversion of CGPA to percentage&rdquo; in your university&apos;s academic regulations or on the back of your
            marksheet. We only list universities whose formula we could confirm in an official document; the two &ldquo;Other&rdquo;
            options in the calculator are common rules, not official formulas.
          </p>

          <h2>Frequently asked questions</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}
        </section>

        <YouMayAlsoLike title="You may also like" cards={getEnglishYouMayAlsoLike(pagePath)} />
      </div>
    </main>
  );
}
