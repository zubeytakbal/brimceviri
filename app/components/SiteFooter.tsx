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

function FlagIcon({ locale }: { locale: string }) {
  if (locale === "tr") {
    return (
      <svg
        className="site-footer-flag"
        viewBox="0 0 20 14"
        aria-hidden="true"
      >
        <rect width="20" height="14" fill="#E30A17" />
        <circle cx="8" cy="7" r="3.6" fill="#ffffff" />
        <circle cx="9.15" cy="7" r="2.9" fill="#E30A17" />
        <polygon
          fill="#ffffff"
          points="13.2,7 12.05,7.62 12.25,6.34 11.3,5.48 12.6,5.32 13.2,4.1 13.8,5.32 15.1,5.48 14.15,6.34 14.35,7.62"
        />
      </svg>
    );
  }

  if (locale === "de") {
    return (
      <svg
        className="site-footer-flag"
        viewBox="0 0 20 14"
        aria-hidden="true"
      >
        <rect width="20" height="4.67" fill="#000000" />
        <rect y="4.67" width="20" height="4.67" fill="#DD0000" />
        <rect y="9.33" width="20" height="4.67" fill="#FFCE00" />
      </svg>
    );
  }

  if (locale === "ar") {
    return (
      <svg
        className="site-footer-flag"
        viewBox="0 0 20 14"
        aria-hidden="true"
      >
        <rect width="20" height="14" fill="#ffffff" />
        <rect width="6" height="14" fill="#EF3340" />
        <rect y="0" width="20" height="4.67" fill="#00732F" />
        <rect y="9.33" width="20" height="4.67" fill="#000000" />
      </svg>
    );
  }

  if (locale === "uz") {
    return (
      <svg
        className="site-footer-flag"
        viewBox="0 0 20 14"
        aria-hidden="true"
      >
        <rect width="20" height="14" fill="#1EB53A" />
        <rect width="20" height="4.2" fill="#0099B5" />
        <rect y="9.8" width="20" height="4.2" fill="#1EB53A" />
        <rect y="4.2" width="20" height="0.6" fill="#CE1126" />
        <rect y="9.2" width="20" height="0.6" fill="#CE1126" />
        <rect y="4.8" width="20" height="5" fill="#ffffff" />
        <circle cx="4.6" cy="2.1" r="1.3" fill="#ffffff" />
        <circle cx="5.15" cy="2.1" r="1.05" fill="#0099B5" />
      </svg>
    );
  }

  if (locale === "bn") {
    return (
      <svg
        className="site-footer-flag"
        viewBox="0 0 20 14"
        aria-hidden="true"
      >
        <rect width="20" height="14" fill="#006A4E" />
        <circle cx="9" cy="7" r="4.2" fill="#F42A41" />
      </svg>
    );
  }

  return (
    <svg
      className="site-footer-flag"
      viewBox="0 0 20 14"
      aria-hidden="true"
    >
      <rect width="20" height="14" fill="#012169" />
      <path d="M0,0 L20,14 M20,0 L0,14" stroke="#ffffff" strokeWidth="2.6" />
      <path d="M0,0 L20,14 M20,0 L0,14" stroke="#C8102E" strokeWidth="1.1" />
      <path d="M10,0 V14 M0,7 H20" stroke="#ffffff" strokeWidth="4.2" />
      <path d="M10,0 V14 M0,7 H20" stroke="#C8102E" strokeWidth="2.2" />
    </svg>
  );
}

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
              <FlagIcon locale={languageLink.locale} />
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
