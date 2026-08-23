"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SITE_CONTACT_EMAIL,
  SITE_NAME,
} from "../siteConfig";
import { germanStaticPaths } from "../i18n/germanRoutes";
import { categoryPages } from "../converter/categoryPages";
import { englishCategoryPages } from "../converter/localizedCategoryPages";
import { germanCategoryPages } from "../converter/localizedGermanCategoryPages";

type FooterLink = {
  href: string;
  label: string;
};

type Locale = "tr" | "en" | "de";

const footerLinks: Record<Locale, FooterLink[]> = {
  tr: [
    { href: "/", label: "Ana Sayfa" },
    { href: "/birimler", label: "Birim Rehberi" },
    { href: "/tum-birimler", label: "T\u00FCm D\u00F6n\u00FC\u015F\u00FCmler" },
    { href: "/hakkimizda", label: "Hakk\u0131m\u0131zda" },
    { href: "/iletisim", label: "\u0130leti\u015Fim" },
    { href: "/gizlilik", label: "Gizlilik" },
    {
      href: "/kullanim-kosullari",
      label: "Kullan\u0131m Ko\u015Fullar\u0131",
    },
  ],
  en: [
    { href: "/en", label: "Home" },
    { href: "/en/units", label: "Unit Guide" },
    {
      href: "/en/all-conversions",
      label: "All Conversions",
    },
    { href: "/en/about", label: "About" },
    { href: "/en/contact", label: "Contact" },
    { href: "/en/privacy", label: "Privacy" },
    { href: "/en/terms", label: "Terms" },
  ],
  de: [
    { href: "/de", label: "Startseite" },
    { href: germanStaticPaths.units, label: "Einheitenleitfaden" },
    { href: germanStaticPaths.allConversions, label: "Alle Umrechnungen" },
    { href: germanStaticPaths.engineeringHub, label: "Ingenieurrechner" },
    { href: germanStaticPaths.about, label: "\u00DCber uns" },
    { href: germanStaticPaths.contact, label: "Kontakt" },
    { href: germanStaticPaths.privacy, label: "Datenschutz" },
    { href: germanStaticPaths.terms, label: "Nutzungsbedingungen" },
  ],
};

function getCategoryFooterLinks(locale: Locale): FooterLink[] {
  if (locale === "en") {
    return englishCategoryPages.map((page) => ({
      href: `/en/categories/${page.slug}`,
      label: page.title,
    }));
  }

  if (locale === "de") {
    return germanCategoryPages.map((page) => ({
      href: `/de/kategorien/${page.slug}`,
      label: page.title,
    }));
  }

  return categoryPages.map((page) => ({
    href: `/kategoriler/${page.slug}`,
    label: page.title,
  }));
}

function getLocaleFromPathname(pathname: string): Locale {
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return "en";
  }

  if (pathname === "/de" || pathname.startsWith("/de/")) {
    return "de";
  }

  return "tr";
}

export default function SiteFooter() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const isEnglish = locale === "en";
  const isGerman = locale === "de";
  const categoryFooterLinks = getCategoryFooterLinks(locale);
  const categoriesHeading = isEnglish
    ? "Categories"
    : isGerman
      ? "Kategorien"
      : "Kategoriler";

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-copy">
          <strong>{SITE_NAME}</strong>
          <p>
            {isEnglish
              ? "Technical conversion tools, engineering calculators and unit guides prepared for practical reference."
              : isGerman
                ? "Technische Umrechnungstools und Einheitenleitf\u00E4den f\u00FCr den schnellen praktischen Einsatz."
                : "Teknik d\u00F6n\u00FC\u015F\u00FCm ara\u00E7lar\u0131, m\u00FChendislik hesaplay\u0131c\u0131lar\u0131 ve birim rehberleri pratik ba\u015Fvuru amac\u0131yla haz\u0131rlanm\u0131\u015Ft\u0131r."}
          </p>
          <p>
            {isEnglish
              ? "For engineering, health or safety decisions, verify critical values with professional sources."
              : isGerman
                ? "Pr\u00FCfen Sie kritische Werte bei technischen, gesundheitlichen oder sicherheitsrelevanten Entscheidungen immer mit fachlichen Quellen."
                : "Kritik m\u00FChendislik, sa\u011Fl\u0131k veya g\u00FCvenlik kararlar\u0131nda sonu\u00E7lar\u0131 profesyonel kaynaklarla do\u011Frulay\u0131n."}
          </p>
        </div>

        <nav
          className="site-footer-nav"
          aria-label={
            isEnglish
              ? "Footer navigation"
              : isGerman
                ? "Fu\u00DFnavigation"
                : "Alt men\u00FC"
          }
        >
          {footerLinks[locale].map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <nav
          className="site-footer-nav site-footer-nav-categories"
          aria-label={categoriesHeading}
        >
          <strong className="site-footer-nav-heading">
            {categoriesHeading}
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
          <small>
            {isEnglish
              ? "Calculator inputs are processed in the browser for calculation flows on this site."
              : isGerman
                ? "Eingegebene Werte werden f\u00FCr die Rechenabl\u00E4ufe direkt im Browser verarbeitet."
                : "Hesaplay\u0131c\u0131 giri\u015Fleri bu sitedeki hesaplama ak\u0131\u015Flar\u0131 i\u00E7in taray\u0131c\u0131 i\u00E7inde i\u015Flenir."}
          </small>
        </div>
      </div>
    </footer>
  );
}
