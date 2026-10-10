"use client";

import Link from "@/app/components/SiteLink";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import {
  getLocaleDefinition,
  getLocaleFromPathname,
  normalizePathname,
  PUBLISHED_LOCALES,
  type Locale,
} from "../i18n/config";

// Dil menusu, sayfanin diger dillerdeki karsiliklarini <head> icindeki hreflang
// etiketlerinden okur. Butun dillerin sayfa listesini tutan yonlendirme modulu (birkac MB)
// her sayfaya yuklenmesin diye yalnizca menu acildiginda ve bir dil hreflang'de yoksa
// ayri bir parca olarak indirilir.
const SITE_ORIGIN = "https://www.birimceviri.app";


function headAlternates(): Partial<Record<Locale, string>> {
  const out: Partial<Record<Locale, string>> = {};
  document.querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]').forEach((link) => {
    const lang = (link.getAttribute("hreflang") || "").toLowerCase();
    // hreflang kodlari dil kodudur; Ozbekce icin "uz-UZ".
    const locale = PUBLISHED_LOCALES.find((l) => lang.split("-")[0] === l);
    if (!locale || out[locale]) return;
    const href = link.getAttribute("href") || "";
    out[locale] = href.startsWith(SITE_ORIGIN) ? href.slice(SITE_ORIGIN.length) || "/" : href;
  });
  return out;
}

function normalizeSearchQuery(value: string) {
  return value.toLocaleLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
}

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const normalizedPathname = normalizePathname(pathname);
  const currentLocale = getLocaleFromPathname(normalizedPathname);
  const currentLocaleDefinition =
    getLocaleDefinition(currentLocale);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [resolved, setResolved] = useState<{ path: string; hrefs: Partial<Record<Locale, string>> }>({ path: "", hrefs: {} });
  const closeMenu = () => {
    setIsOpen(false);
    setQuery("");
  };
  const menuId = useId();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setQuery("");
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        setQuery("");
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "mousedown",
        handlePointerDown
      );
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      searchInputRef.current?.focus();
    }
  }, [isOpen]);

  // Sayfa degisince karsiliklari head'den oku.
  useEffect(() => {
    const frame = requestAnimationFrame(() =>
      setResolved({ path: normalizedPathname, hrefs: { ...headAlternates(), [currentLocale]: normalizedPathname } }),
    );
    return () => cancelAnimationFrame(frame);
  }, [normalizedPathname, currentLocale]);

  // Menu acilinca, head'de karsiligi olmayan diller icin tam yonlendirme modulunu yukle.
  useEffect(() => {
    if (!isOpen || resolved.path !== normalizedPathname) return;
    if (PUBLISHED_LOCALES.every((l) => resolved.hrefs[l])) return;
    let cancelled = false;
    import("../i18n/routing").then(({ resolveLanguagePath }) => {
      if (cancelled) return;
      const hrefs = { ...resolved.hrefs };
      PUBLISHED_LOCALES.forEach((l) => {
        if (!hrefs[l]) hrefs[l] = resolveLanguagePath(normalizedPathname, l);
      });
      setResolved({ path: normalizedPathname, hrefs });
    });
    return () => {
      cancelled = true;
    };
  }, [isOpen, normalizedPathname, resolved]);

  const hrefs = resolved.path === normalizedPathname ? resolved.hrefs : {};
  const localeLinks = PUBLISHED_LOCALES.map((locale) => ({
    locale,
    label: getLocaleDefinition(locale).switcherLabel,
    href: locale === currentLocale ? normalizedPathname : hrefs[locale] ?? getLocaleDefinition(locale).homePath,
  }));

  const normalizedQuery = normalizeSearchQuery(query);
  const filteredLocaleLinks = normalizedQuery
    ? localeLinks.filter((localeLink) =>
        normalizeSearchQuery(localeLink.label).includes(normalizedQuery)
      )
    : localeLinks;

  // 6'dan fazla dil oldugunda arama kutusu gosterilir -- az sayida dilde
  // gereksiz bir ekstra adim eklememek icin.
  const showSearch = PUBLISHED_LOCALES.length > 6;

  return (
    <div className="language-switcher" ref={wrapperRef}>
      <button
        type="button"
        className="language-switcher-button"
        aria-label={currentLocaleDefinition.switcherAriaLabel}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => (isOpen ? closeMenu() : setIsOpen(true))}
      >
        <span className="language-switcher-current">
          {currentLocaleDefinition.switcherCurrentLabel}
        </span>

        <span
          aria-hidden="true"
          className="language-switcher-caret"
        >
          {"\u25BE"}
        </span>
      </button>

      <div
        id={menuId}
        className={`language-switcher-menu${
          isOpen ? " is-open" : ""
        }${showSearch ? " has-search" : ""}`}
        role="menu"
        aria-label={currentLocaleDefinition.switcherOptionsLabel}
      >
        {showSearch ? (
          <input
            ref={searchInputRef}
            type="search"
            className="language-switcher-search"
            value={query}
            placeholder={currentLocaleDefinition.switcherSearchPlaceholder}
            autoComplete="off"
            spellCheck={false}
            onChange={(event) => setQuery(event.target.value)}
            onClick={(event) => event.stopPropagation()}
          />
        ) : null}

        <div className="language-switcher-options">
          {filteredLocaleLinks.length > 0 ? (
            filteredLocaleLinks.map((localeLink) => (
              <Link
                href={localeLink.href}
                key={localeLink.locale}
                role="menuitem"
                aria-current={
                  localeLink.locale === currentLocale
                    ? "page"
                    : undefined
                }
                className={`language-switcher-option${
                  localeLink.locale === currentLocale
                    ? " is-active"
                    : ""
                }`}
                onClick={closeMenu}
              >
                {localeLink.label}
              </Link>
            ))
          ) : (
            <p className="language-switcher-empty">
              {currentLocaleDefinition.switcherEmptyLabel}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
