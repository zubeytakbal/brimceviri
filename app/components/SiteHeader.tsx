"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { categoryPages } from "../converter/categoryPages";
import { englishCategoryPages } from "../converter/localizedCategoryPages";
import { germanCategoryPages } from "../converter/localizedGermanCategoryPages";
import { germanStaticPaths } from "../i18n/germanRoutes";
import LanguageSwitcher from "./LanguageSwitcher";

type HeaderLink = {
  href: string;
  label: string;
};

type Locale = "tr" | "en" | "de";

const navCategoryOrder = [
  "uzunluk",
  "alan",
  "hacim",
  "kutle",
  "sicaklik",
  "zaman",
  "hiz",
  "basinc",
  "enerji",
  "veri",
  "elektrik",
  "yogunluk",
  "kuvvet",
  "debi",
  "tork",
  "momentum",
  "viskozite_dinamik",
  "elektrik_direnc",
  "kapasitans",
  "enduktans",
  "elektrik_yuk",
  "altin_ayar",
] as const;

const categoryLabels = {
  tr: {
    uzunluk: "Uzunluk",
    alan: "Alan",
    hacim: "Hacim",
    kutle: "K\u00FCtle",
    sicaklik: "S\u0131cakl\u0131k",
    zaman: "Zaman",
    hiz: "H\u0131z",
    basinc: "Bas\u0131n\u00E7",
    enerji: "Enerji ve G\u00FC\u00E7",
    veri: "Veri Depolama",
    elektrik: "Elektrik",
    yogunluk: "Yo\u011Funluk",
    kuvvet: "Kuvvet",
    debi: "Debi",
    tork: "Tork",
    momentum: "Momentum",
    viskozite_dinamik: "Viskozite",
    elektrik_direnc: "Diren\u00E7",
    kapasitans: "Kapasitans",
    enduktans: "End\u00FCktans",
    elektrik_yuk: "Elektrik Y\u00FCk\u00FC",
    altin_ayar: "Alt\u0131n Ayar",
  },
  en: {
    uzunluk: "Length",
    alan: "Area",
    hacim: "Volume",
    kutle: "Mass",
    sicaklik: "Temperature",
    zaman: "Time",
    hiz: "Speed",
    basinc: "Pressure",
    enerji: "Energy and Power",
    veri: "Data Storage",
    elektrik: "Electricity",
    yogunluk: "Density",
    kuvvet: "Force",
    debi: "Flow Rate",
    tork: "Torque",
    momentum: "Momentum",
    viskozite_dinamik: "Viscosity",
    elektrik_direnc: "Resistance",
    kapasitans: "Capacitance",
    enduktans: "Inductance",
    elektrik_yuk: "Electric Charge",
    altin_ayar: "Gold Purity",
  },
  de: {
    uzunluk: "L\u00E4nge",
    alan: "Fl\u00E4che",
    hacim: "Volumen",
    kutle: "Masse",
    sicaklik: "Temperatur",
    zaman: "Zeit",
    hiz: "Geschwindigkeit",
    basinc: "Druck",
    enerji: "Energie und Leistung",
    veri: "Datenspeicher",
    elektrik: "Elektrik",
    yogunluk: "Dichte",
    kuvvet: "Kraft",
    debi: "Volumenstrom",
    tork: "Drehmoment",
    momentum: "Impuls",
    viskozite_dinamik: "Viskosität",
    elektrik_direnc: "Widerstand",
    kapasitans: "Kapazität",
    enduktans: "Induktivität",
    elektrik_yuk: "Elektrische Ladung",
    altin_ayar: "Goldkarat",
  },
} as const;

function getLocaleFromPathname(pathname: string): Locale {
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return "en";
  }

  if (pathname === "/de" || pathname.startsWith("/de/")) {
    return "de";
  }

  return "tr";
}

export default function SiteHeader() {
  const pathname = usePathname();
  return <SiteHeaderNavigation key={pathname} pathname={pathname} />;
}

function SiteHeaderNavigation({
  pathname,
}: {
  pathname: string;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConversionsOpen, setIsConversionsOpen] = useState(false);
  const menuId = useId();
  const conversionsMenuId = useId();

  const locale = getLocaleFromPathname(pathname);
  const homeHref = locale === "en" ? "/en" : locale === "de" ? "/de" : "/";
  const navAriaLabel =
    locale === "en"
      ? "Main navigation"
      : locale === "de"
        ? "Hauptnavigation"
        : "Ana men\u00FC";
  const menuLabel =
    locale === "en"
      ? "Menu"
      : locale === "de"
        ? "Men\u00FC"
        : "Men\u00FC";
  const conversionsLabel =
    locale === "en"
      ? "Conversions"
      : locale === "de"
        ? "Kategorien"
        : "D\u00F6n\u00FC\u015F\u00FCmler";

  const topLevelLinks: HeaderLink[] =
    locale === "en"
      ? [
          { href: "/en", label: "Home" },
          {
            href: "/en/engineering-calculators",
            label: "Calculators",
          },
          { href: "/en/units", label: "Unit Guide" },
          {
            href: "/en/all-conversions",
            label: "All Conversions",
          },
        ]
      : locale === "de"
        ? [
            { href: "/de", label: "Startseite" },
            {
              href: germanStaticPaths.engineeringHub,
              label: "Rechner",
            },
            { href: germanStaticPaths.units, label: "Einheitenleitfaden" },
            {
              href: germanStaticPaths.allConversions,
              label: "Alle Umrechnungen",
            },
          ]
        : [
            { href: "/", label: "Ana Sayfa" },
            {
              href: "/muhendislik-hesaplayicilari",
              label: "Hesaplay\u0131c\u0131lar",
            },
            { href: "/birimler", label: "Birim Rehberi" },
            {
              href: "/tum-birimler",
              label: "T\u00FCm D\u00F6n\u00FC\u015F\u00FCmler",
            },
          ];

  const categorySource =
    locale === "en"
      ? englishCategoryPages
      : locale === "de"
        ? germanCategoryPages
        : categoryPages;

  const categoryLinks: HeaderLink[] = navCategoryOrder.flatMap((category) => {
    const page = categorySource.find(
      (item) => item.category === category
    );

    if (!page) {
      return [];
    }

    return [
      {
        href:
          locale === "en"
            ? `/en/categories/${page.slug}`
            : locale === "de"
              ? `/de/kategorien/${page.slug}`
              : `/kategoriler/${page.slug}`,
        label: categoryLabels[locale][category],
      },
    ];
  });

  if (locale === "tr") {
    categoryLinks.push({
      href: "/ayakkabi-numarasi-cevirme",
      label: "Ayakkabı Numarası",
    });
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setIsConversionsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href={homeHref} className="site-logo">
          birimceviri<span>.app</span>
        </Link>

        <button
          type="button"
          className="site-menu-toggle"
          aria-expanded={isMenuOpen}
          aria-controls={menuId}
          aria-label={menuLabel}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="site-menu-toggle-text">{menuLabel}</span>
          <span aria-hidden="true" className="site-menu-toggle-bars" />
        </button>

        <nav
          className="site-navigation site-navigation-desktop"
          aria-label={navAriaLabel}
        >
          <Link href={topLevelLinks[0].href}>{topLevelLinks[0].label}</Link>

          <div className="site-nav-group">
            <button
              type="button"
              className="site-nav-toggle"
              aria-expanded={isConversionsOpen}
              aria-controls={conversionsMenuId}
              onClick={() => setIsConversionsOpen((open) => !open)}
            >
              {conversionsLabel}
            </button>

            <div
              id={conversionsMenuId}
              className={`site-nav-dropdown${isConversionsOpen ? " is-open" : ""}`}
            >
              {categoryLinks.map((link) => (
                <Link
                  href={link.href}
                  key={link.href}
                  onClick={() => setIsConversionsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {topLevelLinks.slice(1).map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}

          <LanguageSwitcher />
        </nav>
      </div>

      <div id={menuId} className="site-mobile-menu" hidden={!isMenuOpen}>
        <nav
          className="site-navigation site-navigation-mobile"
          aria-label={navAriaLabel}
        >
          <Link
            href={topLevelLinks[0].href}
            onClick={() => setIsMenuOpen(false)}
          >
            {topLevelLinks[0].label}
          </Link>

          <div className="site-mobile-accordion">
            <button
              type="button"
              className="site-mobile-accordion-toggle"
              aria-expanded={isConversionsOpen}
              aria-controls={`${conversionsMenuId}-mobile`}
              onClick={() => setIsConversionsOpen((open) => !open)}
            >
              <span>{conversionsLabel}</span>
              <span aria-hidden="true">
                {isConversionsOpen ? "\u2212" : "+"}
              </span>
            </button>

            <div
              id={`${conversionsMenuId}-mobile`}
              className={`site-mobile-accordion-panel${
                isConversionsOpen ? " is-open" : ""
              }`}
              hidden={!isConversionsOpen}
            >
              {categoryLinks.map((link) => (
                <Link
                  href={link.href}
                  key={`mobile-category-${link.href}`}
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsConversionsOpen(false);
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {topLevelLinks.slice(1).map((link) => (
            <Link
              href={link.href}
              key={`mobile-${link.href}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="site-mobile-language">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}
