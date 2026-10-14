// Ana sayfa icin WebSite yapisal verisi (JSON-LD). Arama motorlarina site adini ve dilini bildirir.
import { SITE_NAME, SITE_URL } from "../siteConfig";

export function buildWebsiteSchema(language: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    inLanguage: language,
  };
}

export function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
