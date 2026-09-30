import type { Metadata } from "next";
import { seoTitle } from "../../seoTitle";
import { buildSiteUrl } from "../../siteConfig";

export function takvimMetadata(
  path: string,
  m: { title: string; short: string; description: string },
  locale = "tr_TR",
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
      locale,
      type: "website",
    },
  };
}

export const deKalenderMetadata = (
  path: string,
  m: { title: string; short: string; description: string },
) => takvimMetadata(path, m, "de_DE");

export const saMetadata = (path: string, m: { title: string; short: string; description: string }) => takvimMetadata(path, m, "ar_SA");
