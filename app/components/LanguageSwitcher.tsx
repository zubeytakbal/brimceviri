"use client";

import Link from "next/link";
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
  SUPPORTED_LOCALES,
} from "../i18n/config";
import { resolveLanguagePath } from "../i18n/routing";

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

  const localeLinks = SUPPORTED_LOCALES.map((locale) => ({
    locale,
    label: getLocaleDefinition(locale).switcherLabel,
    href: resolveLanguagePath(normalizedPathname, locale),
  }));

  const normalizedQuery = normalizeSearchQuery(query);
  const filteredLocaleLinks = normalizedQuery
    ? localeLinks.filter((localeLink) =>
        normalizeSearchQuery(localeLink.label).includes(normalizedQuery)
      )
    : localeLinks;

  // 6'dan fazla dil oldugunda arama kutusu gosterilir -- az sayida dilde
  // gereksiz bir ekstra adim eklememek icin.
  const showSearch = SUPPORTED_LOCALES.length > 6;

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
