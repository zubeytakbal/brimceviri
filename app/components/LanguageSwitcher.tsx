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

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const normalizedPathname = normalizePathname(pathname);
  const currentLocale = getLocaleFromPathname(normalizedPathname);
  const currentLocaleDefinition =
    getLocaleDefinition(currentLocale);
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
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

  const localeLinks = SUPPORTED_LOCALES.map((locale) => ({
    locale,
    label: getLocaleDefinition(locale).switcherLabel,
    href: resolveLanguagePath(normalizedPathname, locale),
  }));

  return (
    <div className="language-switcher" ref={wrapperRef}>
      <button
        type="button"
        className="language-switcher-button"
        aria-label={currentLocaleDefinition.switcherAriaLabel}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setIsOpen((open) => !open)}
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
        }`}
        role="menu"
        aria-label={currentLocaleDefinition.switcherOptionsLabel}
      >
        {localeLinks.map((localeLink) => (
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
            onClick={() => setIsOpen(false)}
          >
            {localeLink.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
