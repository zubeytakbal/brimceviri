import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BengaliWeightConverter from "../../../components/BengaliWeightConverter";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import { bengaliWeightPairs, findBengaliWeightPair } from "../../../converter/bengaliWeightPairs";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function generateStaticParams() {
  return bengaliWeightPairs.map((pair) => ({ slug: pair.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pair = findBengaliWeightPair(slug);

  if (!pair) {
    return { title: "পাওয়া যায়নি", robots: { index: false, follow: false } };
  }

  return {
    title: pair.title,
    description: pair.description,
    alternates: {
      canonical: `/bn/traditional-weight/${slug}`,
      languages: {
        bn: `/bn/traditional-weight/${slug}`,
        "x-default": `/bn/traditional-weight/${slug}`,
      },
    },
    openGraph: {
      title: pair.title,
      description: pair.description,
      url: buildSiteUrl(`/bn/traditional-weight/${slug}`),
      siteName: "BirimCeviri.app",
      locale: "bn_BD",
      type: "article",
    },
  };
}

export default async function BengaliWeightPairPage({ params }: PageProps) {
  const { slug } = await params;
  const pair = findBengaliWeightPair(slug);

  if (!pair) {
    notFound();
  }

  const pageUrl = buildSiteUrl(`/bn/traditional-weight/${slug}`);
  const faqItems: FaqItem[] = pair.faq.map((item) => ({
    question: item.question,
    answer: item.answer,
  }));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "হোম", item: buildSiteUrl("/bn") },
      {
        "@type": "ListItem",
        position: 2,
        name: "ঐতিহ্যবাহী ওজন একক",
        item: buildSiteUrl("/bn/traditional-weight"),
      },
      { "@type": "ListItem", position: 3, name: pair.title, item: pageUrl },
    ],
  };

  const otherPairs = bengaliWeightPairs.filter((item) => item.slug !== slug);

  return (
    <main className="all-conversions-page" lang="bn">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="ব্রেডক্রাম্ব">
          <Link href="/bn">হোম</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/bn/traditional-weight">ঐতিহ্যবাহী ওজন একক</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>
            {pair.fromLabel} → {pair.toLabel}
          </span>
        </nav>

        <header className="all-conversions-header">
          <h1>{pair.title}</h1>
          <p>{pair.description}</p>
        </header>

        <BengaliWeightConverter fromUnit={pair.fromUnit} toUnit={pair.toUnit} />

        <section className="category-article-content">
          <h2>বিস্তারিত তথ্য</h2>
          <p>{pair.intro}</p>

          <h2>সাধারণ জিজ্ঞাসা</h2>
          {pair.faq.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>অন্যান্য রূপান্তর</h2>
          <ul className="related-conversion-list">
            {otherPairs.map((item) => (
              <li key={item.slug}>
                <Link href={`/bn/traditional-weight/${item.slug}`}>
                  {item.fromLabel} → {item.toLabel}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
