"use client";

import dynamic from "next/dynamic";
import { isSaatAraci, isSaatBolumu } from "./saat/saatBolumu";
import { isHesapAraci } from "./hesap/hesapBolumu";
import Link from "@/app/components/SiteLink";
import { usePathname, useRouter } from "next/navigation";
import { getLocaleFromPathname } from "../i18n/config";
// Alt bilgi verisi derleme oncesi uretilen kucuk modulden gelir (scripts/generateSiteNav.ts).
import { SITE_NAV_DATA } from "../i18n/siteNavData.generated";
import {
  SITE_CONTACT_EMAIL,
  SITE_NAME,
} from "../siteConfig";

// Saat bölümünün alt bilgisi yalnızca o bölümün sayfalarında yüklenir.
const SaatAltBilgi = dynamic(() => import("./saat/SaatAltBilgi"));
const HesapAltBilgi = dynamic(() => import("./hesap/HesapAltBilgi"));

const ARAC_SAYISI = 5;
// Bilgi sayfaları alt satırda; Ana Sayfa ve araç dizinleri üstteki sütunlarda zaten var.
const ALT_SATIR = new Set(["/hakkimizda", "/iletisim", "/gizlilik", "/kullanim-kosullari"]);

/** Türkçe alt bilgi: üst menünün altı başlığı sütun olarak, dil seçimi açılır listede, yasal bağlantılar tek satırda. */
function TurkceFooter({ nav }: { nav: (typeof SITE_NAV_DATA.locales)["tr"] }) {
  const router = useRouter();
  return (
    <footer className="site-footer site-footer--tr">
      <div className="site-footer-tr">
        <div className="site-footer-tr-ust">
          <div>
            <strong>{SITE_NAME}</strong>
            <p>{nav.footerCopy.description}</p>
          </div>
          <label className="site-footer-dil">
            <span>{nav.footerCopy.languagesHeading}</span>
            <select value="tr" onChange={(e) => router.push(SITE_NAV_DATA.footerLanguageLinks.find((l) => l.locale === e.target.value)!.href)}>
              {SITE_NAV_DATA.footerLanguageLinks.map((l) => (
                <option key={l.locale} value={l.locale}>
                  {l.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <nav className="site-footer-tr-sutunlar" aria-label={nav.footerCopy.navAriaLabel}>
          {nav.menuGroups.map((g) => {
            const tumu = g.footer?.[0];
            return (
              <div key={g.id}>
                <strong>{g.label}</strong>
                <ul>
                  {g.links.slice(0, ARAC_SAYISI).map((l) => (
                    <li key={l.href}>
                      <Link href={l.href}>{l.label}</Link>
                    </li>
                  ))}
                  {tumu ? (
                    <li>
                      <Link className="site-footer-tumu" href={tumu.href}>
                        {tumu.label}
                      </Link>
                    </li>
                  ) : null}
                </ul>
              </div>
            );
          })}
        </nav>

        <div className="site-footer-tr-alt">
          <p>
            <span>© {new Date().getFullYear()} {SITE_NAME}</span>
            {nav.footerLinks
              .filter((l) => ALT_SATIR.has(l.href))
              .map((l) => (
                <Link href={l.href} key={l.href}>
                  {l.label}
                </Link>
              ))}
            <a href={`mailto:${SITE_CONTACT_EMAIL}`}>{SITE_CONTACT_EMAIL}</a>
          </p>
          <small>
            {nav.footerCopy.disclaimer} {nav.footerCopy.browserProcessingNote}
          </small>
        </div>
      </div>
    </footer>
  );
}

export default function SiteFooter() {
  const pathname = usePathname();
  // Saat bölümü kendi menüsünü ve alt bilgisini çizer.
  if (pathname.startsWith("/embed/") || isSaatBolumu(pathname)) {
    return null;
  }
  if (isSaatAraci(pathname)) return <SaatAltBilgi />;
  if (isHesapAraci(pathname)) return <HesapAltBilgi />;
  const locale = getLocaleFromPathname(pathname);
  const nav = SITE_NAV_DATA.locales[locale];
  if (locale === "tr") {
    return <TurkceFooter nav={nav} />;
  }
  const categoryFooterLinks = nav.categoryFooterLinks;
  const footerLinks = nav.footerLinks;
  const footerLanguageLinks = SITE_NAV_DATA.footerLanguageLinks;
  const footerCopy = nav.footerCopy;

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
