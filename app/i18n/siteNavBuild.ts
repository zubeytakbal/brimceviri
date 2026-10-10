// Menu ve alt bilgi verisinin tamami (yalnizca derleme zamaninda ve testlerde kullanilir).
import { SUPPORTED_LOCALES, type Locale } from "./config";
import {
  getCategoryFooterLinks,
  getFooterLanguageLinks,
  getFooterLinks,
  getMenuGroups,
  getSiteFooterCopy,
  getSiteHeaderCopy,
  getTopLevelLinks,
} from "./siteNavigation";

export type SiteNavLocaleData = {
  topLevelLinks: ReturnType<typeof getTopLevelLinks>;
  menuGroups: ReturnType<typeof getMenuGroups>;
  headerCopy: ReturnType<typeof getSiteHeaderCopy>;
  categoryFooterLinks: ReturnType<typeof getCategoryFooterLinks>;
  footerLinks: ReturnType<typeof getFooterLinks>;
  footerCopy: ReturnType<typeof getSiteFooterCopy>;
};

export type SiteNavData = {
  locales: Record<Locale, SiteNavLocaleData>;
  footerLanguageLinks: ReturnType<typeof getFooterLanguageLinks>;
};

export function buildSiteNavData(): SiteNavData {
  const locales = {} as Record<Locale, SiteNavLocaleData>;
  for (const locale of SUPPORTED_LOCALES) {
    locales[locale] = {
      topLevelLinks: getTopLevelLinks(locale),
      menuGroups: getMenuGroups(locale),
      headerCopy: getSiteHeaderCopy(locale),
      categoryFooterLinks: getCategoryFooterLinks(locale),
      footerLinks: getFooterLinks(locale),
      footerCopy: getSiteFooterCopy(locale),
    };
  }
  return { locales, footerLanguageLinks: getFooterLanguageLinks() };
}
