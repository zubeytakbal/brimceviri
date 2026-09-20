"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname } from "../i18n/config";
import {
  getCategoryFooterLinks,
  getFooterLanguageLinks,
  getFooterLinks,
  getSiteFooterCopy,
} from "../i18n/siteNavigation";
import {
  SITE_CONTACT_EMAIL,
  SITE_NAME,
} from "../siteConfig";

export default function SiteFooter() {
  const pathname = usePathname();
  if (pathname.startsWith("/embed/")) {
    return null;
  }
  const locale = getLocaleFromPathname(pathname);
  const categoryFooterLinks = getCategoryFooterLinks(locale);
  const footerLinks = getFooterLinks(locale);
  const footerLanguageLinks = getFooterLanguageLinks();
  const footerCopy = getSiteFooterCopy(locale);

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-copy">
          <strong>{SITE_NAME}</strong>
          <p>{footerCopy.description}</p>
          <p>{footerCopy.disclaimer}</p>
        </div>

        <nav
          className="site-footer-nav"
          aria-label={footerCopy.navAriaLabel}
        >
          <strong className="site-footer-nav-heading">
            {footerCopy.pagesHeading}
          </strong>
          {footerLinks.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <nav
          className="site-footer-nav site-footer-nav-languages"
          aria-label={footerCopy.languagesHeading}
        >
          <strong className="site-footer-nav-heading">
            {footerCopy.languagesHeading}
          </strong>
          {footerLanguageLinks.map((languageLink) => (
            <Link
              href={languageLink.href}
              key={languageLink.locale}
              className="site-footer-language-link"
              aria-current={
                languageLink.locale === locale ? "page" : undefined
              }
            >
              {languageLink.label}
            </Link>
          ))}
        </nav>

        <nav
          className="site-footer-nav site-footer-nav-categories"
          aria-label={footerCopy.categoriesHeading}
        >
          <strong className="site-footer-nav-heading">
            {footerCopy.categoriesHeading}
          </strong>
          {categoryFooterLinks.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="site-footer-meta">
          <a href={`mailto:${SITE_CONTACT_EMAIL}`}>
            {SITE_CONTACT_EMAIL}
          </a>
          <small>{footerCopy.browserProcessingNote}</small>
        </div>
      </div>
    </footer>
  );
}
