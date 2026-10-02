"use client";

import Link from "@/app/components/SiteLink";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { getLocaleFromPathname } from "../i18n/config";
import {
  getMenuGroups,
  getSiteHeaderCopy,
  getTopLevelLinks,
  type MenuGroup,
} from "../i18n/siteNavigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { useNotificationSlot } from "./NotificationSlotProvider";

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
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const { setSlotElement } = useNotificationSlot();
  const menuId = useId();
  const groupIdPrefix = useId();

  const locale = getLocaleFromPathname(pathname);
  const topLevelLinks: HeaderLink[] = getTopLevelLinks(locale);
  const menuGroups: MenuGroup[] = getMenuGroups(locale);
  const headerCopy = getSiteHeaderCopy(locale);
  const homeHref = topLevelLinks[0]?.href ?? "/";

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setOpenGroup(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleGroup = (id: string) =>
    setOpenGroup((current) => (current === id ? null : id));

  return (
    <header className={`site-header site-header--${locale}`}>
      <div className="site-header-inner">
        <Link href={homeHref} className="site-logo" dir="ltr">
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

          {menuGroups.map((group) => {
            const isOpen = openGroup === group.id;
            const panelId = `${groupIdPrefix}-${group.id}`;

            return (
              <div className="site-nav-group" key={group.id}>
                <button
                  type="button"
                  className="site-nav-toggle"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleGroup(group.id)}
                >
                  {group.label}
                </button>

                <div
                  id={panelId}
                  className={`site-nav-dropdown${
                    group.links.length > 9 ? " site-nav-dropdown--columns" : ""
                  }${isOpen ? " is-open" : ""}`}
                >
                  {group.links.map((link) => (
                    <Link
                      href={link.href}
                      key={`${link.label}-${link.href}`}
                      onClick={() => setOpenGroup(null)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  {group.footer && (
                    <div className="site-nav-dropdown-footer">
                      {group.footer.map((link) => (
                        <Link
                          href={link.href}
                          key={`footer-${link.href}`}
                          onClick={() => setOpenGroup(null)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {topLevelLinks.slice(1).map((link) => (
            <Link href={link.href} key={`${link.label}-${link.href}`}>
              {link.label}
            </Link>
          ))}

          <LanguageSwitcher />
          <div ref={setSlotElement} className="notification-bell-slot" />
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

          {menuGroups.map((group) => {
            const isOpen = openGroup === group.id;
            const panelId = `${groupIdPrefix}-${group.id}-mobile`;
            const closeAll = () => {
              setIsMenuOpen(false);
              setOpenGroup(null);
            };

            return (
              <div className="site-mobile-accordion" key={group.id}>
                <button
                  type="button"
                  className="site-mobile-accordion-toggle"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleGroup(group.id)}
                >
                  <span>{group.label}</span>
                  <span aria-hidden="true">{isOpen ? "\u2212" : "+"}</span>
                </button>

                <div
                  id={panelId}
                  className={`site-mobile-accordion-panel${isOpen ? " is-open" : ""}`}
                  hidden={!isOpen}
                >
                  {group.links.map((link) => (
                    <Link
                      href={link.href}
                      key={`mobile-${group.id}-${link.label}-${link.href}`}
                      onClick={closeAll}
                    >
                      {link.label}
                    </Link>
                  ))}
                  {group.footer?.map((link) => (
                    <Link
                      href={link.href}
                      key={`mobile-footer-${link.href}`}
                      className="site-mobile-accordion-more"
                      onClick={closeAll}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          {topLevelLinks.slice(1).map((link) => (
            <Link
              href={link.href}
              key={`mobile-${link.label}-${link.href}`}
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
