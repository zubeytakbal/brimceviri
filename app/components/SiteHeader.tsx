"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

type HeaderLink = {
  href: string;
  label: string;
};

export default function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = useId();

  const isEnglish =
    pathname === "/en" || pathname.startsWith("/en/");
  const homeHref = isEnglish ? "/en" : "/";
  const navAriaLabel = isEnglish
    ? "Main navigation"
    : "Ana menü";
  const menuLabel = isEnglish ? "Menu" : "Menü";
  const links: HeaderLink[] = isEnglish
    ? [
        { href: "/en", label: "Home" },
        {
          href: "/en/categories/length",
          label: "Length",
        },
        {
          href: "/en/categories/mass",
          label: "Mass",
        },
        {
          href: "/en/categories/pressure",
          label: "Pressure",
        },
        {
          href: "/en/units",
          label: "Unit Guide",
        },
        {
          href: "/en/all-conversions",
          label: "All Conversions",
        },
      ]
    : [
        { href: "/", label: "Ana Sayfa" },
        {
          href: "/kategoriler/uzunluk",
          label: "Uzunluk",
        },
        { href: "/kategoriler/kutle", label: "Kütle" },
        {
          href: "/kategoriler/basinc",
          label: "Basınç",
        },
        {
          href: "/birimler",
          label: "Birim Rehberi",
        },
        {
          href: "/tum-birimler",
          label: "Tüm Dönüşümler",
        },
      ];

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
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
          <span className="site-menu-toggle-text">
            {menuLabel}
          </span>

          <span
            aria-hidden="true"
            className="site-menu-toggle-bars"
          />
        </button>

        <nav
          className="site-navigation site-navigation-desktop"
          aria-label={navAriaLabel}
        >
          {links.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}

          <LanguageSwitcher />
        </nav>
      </div>

      <div
        id={menuId}
        className="site-mobile-menu"
        hidden={!isMenuOpen}
      >
        <nav
          className="site-navigation site-navigation-mobile"
          aria-label={navAriaLabel}
        >
          {links.map((link) => (
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
