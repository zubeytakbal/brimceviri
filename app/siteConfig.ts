export const SITE_NAME = "BirimCeviri.app";
export const SITE_URL = "https://www.birimceviri.app";
export const SITE_CONTACT_EMAIL = "iletisim@birimceviri.app";
export function buildSiteUrl(path = "") {
  return `${SITE_URL}${path}`;
}
