import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PairConverter from "../../converter/PairConverter";
import { conversionPages } from "../../converter/conversionPages";
import { buildSiteUrl } from "../../siteConfig";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const conversionPage = conversionPages.find((page) => page.slug === slug);

  return {
    title: conversionPage
      ? `${conversionPage.fromName} – ${conversionPage.toName} Çevirici`
      : "Dönüşüm bulunamadı",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ConversionEmbedPage({ params }: PageProps) {
  const { slug } = await params;
  const conversionPage = conversionPages.find((page) => page.slug === slug);

  if (!conversionPage) {
    notFound();
  }

  return (
    <main className="embed-widget-page">
      <div className="embed-widget-shell">
        <PairConverter
          category={conversionPage.category}
          fromUnit={conversionPage.fromUnit}
          toUnit={conversionPage.toUnit}
          fromName={conversionPage.fromName}
          toName={conversionPage.toName}
        />

        <Link
          className="embed-widget-attribution"
          href={buildSiteUrl(`/${conversionPage.slug}`)}
          target="_blank"
          rel="noopener"
        >
          Bu araç birimceviri.app tarafından sağlanıyor →
        </Link>
      </div>
    </main>
  );
}
