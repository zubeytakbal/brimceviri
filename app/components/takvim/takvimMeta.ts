import type { Metadata } from "next";
import { seoTitle } from "../../seoTitle";
import { buildSiteUrl } from "../../siteConfig";

export function takvimMetadata(
  path: string,
  m: { title: string; short: string; description: string },
): Metadata {
  return {
    title: seoTitle(m.title, m.short),
    description: m.description,
    alternates: { canonical: path },
    openGraph: {
      title: m.title,
      description: m.description,
      url: buildSiteUrl(path),
      siteName: "BirimCeviri.app",
      locale: "tr_TR",
      type: "website",
    },
  };
}
