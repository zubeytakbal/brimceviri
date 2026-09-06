import type { Metadata } from "next";
import { buildSiteUrl } from "../siteConfig";

export function buildArabicMetadata({
  title,
  description,
  path,
  turkishPath,
  englishPath,
  germanPath,
}: {
  title: string;
  description: string;
  path: string;
  turkishPath: string;
  englishPath?: string;
  germanPath?: string;
}): Metadata {
  const canonicalUrl = buildSiteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        tr: buildSiteUrl(turkishPath),
        ...(englishPath ? { en: buildSiteUrl(englishPath) } : {}),
        ...(germanPath ? { de: buildSiteUrl(germanPath) } : {}),
        ar: canonicalUrl,
        "x-default": buildSiteUrl(turkishPath),
      },
    },
    openGraph: {
      title: `${title} | BirimCeviri.app`,
      description,
      url: canonicalUrl,
      siteName: "BirimCeviri.app",
      locale: "ar_AR",
      type: "website",
    },
  };
}
