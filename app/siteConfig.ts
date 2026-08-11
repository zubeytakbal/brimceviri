export const SITE_NAME = "BirimCeviri.app";
export const SITE_URL = "https://www.birimceviri.app";
export const SITE_CONTACT_EMAIL = "iletisim@birimceviri.app";
export const SITE_LAST_MODIFIED = new Date("2026-08-11T00:00:00+03:00");

export function buildSiteUrl(path = "") {
  return `${SITE_URL}${path}`;
}
