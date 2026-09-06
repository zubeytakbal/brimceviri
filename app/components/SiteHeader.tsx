"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { getLocaleFromPathname } from "../i18n/config";
import {
  getCategoryMenuLinks,
  getSiteHeaderCopy,
  getTopLevelLinks,
} from "../i18n/siteNavigation";
import LanguageSwitcher from "./LanguageSwitcher";

type HeaderLink = {
  href: string;
  label: string;
};

export default function SiteHeader() {
  const pathname = usePathname();
  if (pathname.startsWith("/embed/")) {
    return null;
  }
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
  const topLevelLinks: HeaderLink[] = getTopLevelLinks(locale);
  const categoryLinks: HeaderLink[] = getCategoryMenuLinks(locale);
  const headerCopy = getSiteHeaderCopy(locale);
  const homeHref = topLevelLinks[0]?.href ?? "/";

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
          aria-label={headerCopy.menuLabel}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="site-menu-toggle-text">
            {headerCopy.menuLabel}
          </span>
          <span aria-hidden="true" className="site-menu-toggle-bars" />
        </button>

        <nav
          className="site-navigation site-navigation-desktop"
          aria-label={headerCopy.navAriaLabel}
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
              {headerCopy.conversionsLabel}
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
          aria-label={headerCopy.navAriaLabel}
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
              <span>{headerCopy.conversionsLabel}</span>
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
