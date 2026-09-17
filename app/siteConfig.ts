export const SITE_NAME = "BirimCeviri.app";
export const SITE_URL = "https://www.birimceviri.app";
export const SITE_CONTACT_EMAIL = "iletisim@birimceviri.app";
// Sitemap entries use this value as the most recent site-wide content update.
// Update it after publishing a meaningful batch of new or revised pages.
export const SITE_LAST_MODIFIED = new Date("2026-09-14T00:00:00+03:00");

export function buildSiteUrl(path = "") {
  return `${SITE_URL}${path}`;
}
