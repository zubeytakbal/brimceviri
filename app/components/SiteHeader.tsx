"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { categoryPages } from "../converter/categoryPages";
import { englishCategoryPages } from "../converter/localizedCategoryPages";
import LanguageSwitcher from "./LanguageSwitcher";

type HeaderLink = {
  href: string;
  label: string;
};

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
  "debi",
  "elektrik",
] as const;

const categoryLabels = {
  tr: {
    uzunluk: "Uzunluk",
    alan: "Alan",
    hacim: "Hacim",
    kutle: "Kütle",
    sicaklik: "Sıcaklık",
    zaman: "Zaman",
    hiz: "Hız",
    basinc: "Basınç",
    enerji: "Enerji ve Güç",
    debi: "Debi",
    elektrik: "Elektrik",
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
    debi: "Flow Rate",
    elektrik: "Electricity",
  },
} as const;

export default function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConversionsOpen, setIsConversionsOpen] = useState(false);
  const menuId = useId();
  const conversionsMenuId = useId();

  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");
  const homeHref = isEnglish ? "/en" : "/";
  const navAriaLabel = isEnglish ? "Main navigation" : "Ana menü";
  const menuLabel = isEnglish ? "Menu" : "Menü";
  const conversionsLabel = isEnglish ? "Conversions" : "Dönüşümler";

  const topLevelLinks: HeaderLink[] = isEnglish
    ? [
        { href: "/en", label: "Home" },
        { href: "/en/engineering-calculators", label: "Calculators" },
        { href: "/en/units", label: "Unit Guide" },
        { href: "/en/all-conversions", label: "All Conversions" },
      ]
    : [
        { href: "/", label: "Ana Sayfa" },
        { href: "/muhendislik-hesaplayicilari", label: "Hesaplayıcılar" },
        { href: "/birimler", label: "Birim Rehberi" },
        { href: "/tum-birimler", label: "Tüm Dönüşümler" },
      ];

  const categoryLinks = navCategoryOrder.flatMap((category) => {
    const page = isEnglish
      ? englishCategoryPages.find((item) => item.category === category)
      : categoryPages.find((item) => item.category === category);

    if (!page) {
      return [];
    }

    return [
      {
        href: isEnglish
          ? `/en/categories/${page.slug}`
          : `/kategoriler/${page.slug}`,
        label: categoryLabels[isEnglish ? "en" : "tr"][category],
      },
    ];
  });

  useEffect(() => {
    setIsMenuOpen(false);
    setIsConversionsOpen(false);
  }, [pathname]);

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
          <Link href={topLevelLinks[0].href} onClick={() => setIsMenuOpen(false)}>
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
              <span aria-hidden="true">{isConversionsOpen ? "−" : "+"}</span>
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
