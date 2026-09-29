import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BrueckentagePage from "../../../components/de/BrueckentagePage";
import {
  BRUECKENTAGE_JAHRE,
  brueckentagePfad,
} from "../../../i18n/germanBrueckentage";
import { seoTitle } from "../../../seoTitle";
import { buildSiteUrl } from "../../../siteConfig";

export const dynamicParams = false;

type PageProps = { params: Promise<{ jahr: string }> };

export function generateStaticParams() {
  return BRUECKENTAGE_JAHRE.map((j) => ({ jahr: String(j) }));
}

const jahrAus = async (params: PageProps["params"]) => {
  const j = Number((await params).jahr);
  return (BRUECKENTAGE_JAHRE as readonly number[]).includes(j) ? j : null;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const year = await jahrAus(params);
  if (!year) return {};
  const path = brueckentagePfad(year);
  const title = `Brückentage ${year}: Urlaub optimal planen (alle Bundesländer)`;
  const description = `Brückentage ${year} in allen 16 Bundesländern: Mit wie vielen Urlaubstagen Sie wie viele freie Tage bekommen, plus Urlaubsplaner ${year} mit Kalender-Export.`;
  return {
    title: seoTitle(title, `Brückentage ${year}: Urlaub optimal planen`),
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(path),
      siteName: "BirimCeviri.app",
      locale: "de_DE",
      type: "website",
    },
  };
}

export default async function BrueckentageJahrPage({ params }: PageProps) {
  const year = await jahrAus(params);
  if (!year) notFound();
  return <BrueckentagePage year={year} />;
}
