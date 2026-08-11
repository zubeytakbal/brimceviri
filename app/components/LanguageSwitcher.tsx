"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { englishCalculatorPages } from "../converter/localizedCalculatorPages";
import { englishCategoryPages } from "../converter/localizedCategoryPages";
import { englishConversionPages } from "../converter/localizedConversionPages";
import { englishUnitPages } from "../converter/localizedUnitPages";

type Locale = "tr" | "en";

type StaticRoutePair = {
  tr: string;
  en: string;
};

type DynamicRouteConfig = {
  trPrefix: string;
  enPrefix: string;
  pairs: Array<{
    sourceSlug: string;
    slug: string;
  }>;
};

const staticRoutePairs: StaticRoutePair[] = [
  {
    tr: "/",
    en: "/en",
  },
  {
    tr: "/birimler",
    en: "/en/units",
  },
  {
    tr: "/tum-birimler",
    en: "/en/all-conversions",
  },
  {
    tr: "/hakkimizda",
    en: "/en/about",
  },
  {
    tr: "/iletisim",
    en: "/en/contact",
  },
  {
    tr: "/gizlilik",
    en: "/en/privacy",
  },
  {
    tr: "/kullanim-kosullari",
    en: "/en/terms",
  },
];

const dynamicRouteConfigs: DynamicRouteConfig[] = [
  {
    trPrefix: "/hesaplayicilar/",
    enPrefix: "/en/calculators/",
    pairs: englishCalculatorPages,
  },
  {
    trPrefix: "/birimler/",
    enPrefix: "/en/units/",
    pairs: englishUnitPages,
  },
  {
    trPrefix: "/kategoriler/",
    enPrefix: "/en/categories/",
    pairs: englishCategoryPages,
  },
  {
    trPrefix: "/",
    enPrefix: "/en/",
    pairs: englishConversionPages,
  },
];

function normalizePathname(pathname: string) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
}

function resolveLanguagePath(
  pathname: string,
  targetLocale: Locale
) {
  const normalizedPath = normalizePathname(pathname);
  const staticRoute = staticRoutePairs.find(
    (routePair) =>
      routePair.tr === normalizedPath ||
      routePair.en === normalizedPath
  );

  if (staticRoute) {
    return targetLocale === "en"
      ? staticRoute.en
      : staticRoute.tr;
  }

  for (const routeConfig of dynamicRouteConfigs) {
    const sourcePrefix =
      targetLocale === "en"
        ? routeConfig.trPrefix
        : routeConfig.enPrefix;
    const targetPrefix =
      targetLocale === "en"
        ? routeConfig.enPrefix
        : routeConfig.trPrefix;

    if (!normalizedPath.startsWith(sourcePrefix)) {
      continue;
    }

    const slug = normalizedPath.slice(sourcePrefix.length);

    if (!slug) {
      continue;
    }

    const routePair = routeConfig.pairs.find((pair) =>
      targetLocale === "en"
        ? pair.sourceSlug === slug
        : pair.slug === slug
    );

    if (routePair) {
      return (
        targetPrefix +
        (targetLocale === "en"
          ? routePair.slug
          : routePair.sourceSlug)
      );
    }
  }

  return targetLocale === "en" ? "/en" : "/";
}

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const normalizedPathname = normalizePathname(pathname);
  const isEnglish =
    normalizedPathname === "/en" ||
    normalizedPathname.startsWith("/en/");
  const currentLocale: Locale = isEnglish ? "en" : "tr";
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

  const localeLinks = [
    {
      locale: "tr" as const,
      label: "Türkçe",
      href: resolveLanguagePath(normalizedPathname, "tr"),
    },
    {
      locale: "en" as const,
      label: "English",
      href: resolveLanguagePath(normalizedPathname, "en"),
    },
  ];

  return (
    <div className="language-switcher" ref={wrapperRef}>
      <button
        type="button"
        className="language-switcher-button"
        aria-label={
          isEnglish ? "Select language" : "Dil seçin"
        }
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="language-switcher-current">
          {isEnglish ? "EN · English" : "TR · Türkçe"}
        </span>

        <span
          aria-hidden="true"
          className="language-switcher-caret"
        >
          ▾
        </span>
      </button>

      <div
        id={menuId}
        className={`language-switcher-menu${
          isOpen ? " is-open" : ""
        }`}
        role="menu"
        aria-label={
          isEnglish ? "Language options" : "Dil seçenekleri"
        }
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
