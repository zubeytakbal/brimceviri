"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { englishCategoryPages } from "../converter/localizedCategoryPages";
import { englishConversionPages } from "../converter/localizedConversionPages";
import { englishCalculatorPages } from "../converter/localizedCalculatorPages";
import { germanCalculatorPages } from "../converter/localizedGermanCalculatorPages";
import { germanCategoryPages } from "../converter/localizedGermanCategoryPages";
import { germanConversionPages } from "../converter/localizedGermanConversionPages";
import { germanUnitPages } from "../converter/localizedGermanUnitPages";
import { englishUnitPages } from "../converter/localizedUnitPages";
import { germanStaticPaths } from "../i18n/germanRoutes";

type Locale = "tr" | "en" | "de";

type StaticRouteSet = {
  tr: string;
  en: string;
  de?: string;
};

type LocalePair = {
  sourceSlug: string;
  slug: string;
};

type DynamicRouteConfig = {
  trPrefix: string;
  enPrefix: string;
  dePrefix: string;
  enPairs: LocalePair[];
  dePairs: LocalePair[];
};

const staticRouteSets: StaticRouteSet[] = [
  {
    tr: "/",
    en: "/en",
    de: "/de",
  },
  {
    tr: "/birimler",
    en: "/en/units",
    de: germanStaticPaths.units,
  },
  {
    tr: "/tum-birimler",
    en: "/en/all-conversions",
    de: germanStaticPaths.allConversions,
  },
  {
    tr: "/diger-donusumler",
    en: "/en/other-conversions",
  },
  {
    tr: "/ayakkabi-numarasi-cevirme",
    en: "/en/shoe-size-converter",
  },
  {
    tr: "/mutfak-olculeri-cevirici",
    en: "/en/kitchen-measurement-converter",
  },
  {
    tr: "/tarif-cevirici",
    en: "/en/recipe-converter",
  },
  {
    tr: "/yuzuk-olcusu-cevirici",
    en: "/en/ring-size-converter",
  },
  {
    tr: "/muhendislik-hesaplayicilari",
    en: "/en/engineering-calculators",
    de: germanStaticPaths.engineeringHub,
  },
  {
    tr: "/muhendislik-hesaplayicilari/elektrik-hesaplari",
    en: "/en/engineering-calculators/electrical-calculators",
    de: germanStaticPaths.electricalEngineeringHub,
  },
  {
    tr: "/muhendislik-hesaplayicilari/elektrik-hesaplari/kablo-kesiti-hesaplama",
    en: "/en/engineering-calculators/electrical-calculators/cable-size-calculator",
    de: "/de/ingenieurrechner/elektrorechner/kabelquerschnitt-rechner",
  },
  {
    tr: "/muhendislik-hesaplayicilari/elektrik-hesaplari/gerilim-dusumu-hesaplama",
    en: "/en/engineering-calculators/electrical-calculators/voltage-drop-calculator",
    de: "/de/ingenieurrechner/elektrorechner/spannungsfall-rechner",
  },
  {
    tr: "/muhendislik-hesaplayicilari/elektrik-hesaplari/kw-to-amper-hesaplama",
    en: "/en/engineering-calculators/electrical-calculators/kw-to-ampere-calculator",
    de: "/de/ingenieurrechner/elektrorechner/kw-zu-ampere-rechner",
  },
  {
    tr: "/muhendislik-hesaplayicilari/elektrik-hesaplari/amper-to-kw-hesaplama",
    en: "/en/engineering-calculators/electrical-calculators/ampere-to-kw-calculator",
    de: "/de/ingenieurrechner/elektrorechner/ampere-zu-kw-rechner",
  },
  {
    tr: "/muhendislik-hesaplayicilari/elektrik-hesaplari/motor-akimi-hesaplama",
    en: "/en/engineering-calculators/electrical-calculators/motor-current-calculator",
    de: "/de/ingenieurrechner/elektrorechner/motorstrom-rechner",
  },
  {
    tr: "/hakkimizda",
    en: "/en/about",
    de: germanStaticPaths.about,
  },
  {
    tr: "/iletisim",
    en: "/en/contact",
    de: germanStaticPaths.contact,
  },
  {
    tr: "/gizlilik",
    en: "/en/privacy",
    de: germanStaticPaths.privacy,
  },
  {
    tr: "/kullanim-kosullari",
    en: "/en/terms",
    de: germanStaticPaths.terms,
  },
];

const dynamicRouteConfigs: DynamicRouteConfig[] = [
  {
    trPrefix: "/birimler/",
    enPrefix: "/en/units/",
    dePrefix: "/de/einheiten/",
    enPairs: englishUnitPages,
    dePairs: germanUnitPages,
  },
  {
    trPrefix: "/kategoriler/",
    enPrefix: "/en/categories/",
    dePrefix: "/de/kategorien/",
    enPairs: englishCategoryPages,
    dePairs: germanCategoryPages,
  },
  {
    trPrefix: "/hesaplayicilar/",
    enPrefix: "/en/calculators/",
    dePrefix: "/de/rechner/",
    enPairs: englishCalculatorPages,
    dePairs: germanCalculatorPages,
  },
  {
    trPrefix: "/",
    enPrefix: "/en/",
    dePrefix: "/de/",
    enPairs: englishConversionPages,
    dePairs: germanConversionPages,
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

function detectLocale(pathname: string): Locale {
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return "en";
  }

  if (pathname === "/de" || pathname.startsWith("/de/")) {
    return "de";
  }

  return "tr";
}

function fallbackPath(targetLocale: Locale) {
  return targetLocale === "en"
    ? "/en"
    : targetLocale === "de"
      ? "/de"
      : "/";
}

function resolveSourceSlug(
  normalizedPath: string,
  routeConfig: DynamicRouteConfig
) {
  if (normalizedPath.startsWith(routeConfig.trPrefix)) {
    const slug = normalizedPath.slice(routeConfig.trPrefix.length);
    return slug || null;
  }

  if (normalizedPath.startsWith(routeConfig.enPrefix)) {
    const slug = normalizedPath.slice(routeConfig.enPrefix.length);
    const pair = routeConfig.enPairs.find(
      (item) => item.slug === slug
    );
    return pair?.sourceSlug ?? null;
  }

  if (normalizedPath.startsWith(routeConfig.dePrefix)) {
    const slug = normalizedPath.slice(routeConfig.dePrefix.length);
    const pair = routeConfig.dePairs.find(
      (item) => item.slug === slug
    );
    return pair?.sourceSlug ?? null;
  }

  return null;
}

function resolveLanguagePath(
  pathname: string,
  targetLocale: Locale
) {
  const normalizedPath = normalizePathname(pathname);
  const staticRoute = staticRouteSets.find(
    (routeSet) =>
      routeSet.tr === normalizedPath ||
      routeSet.en === normalizedPath ||
      routeSet.de === normalizedPath
  );

  if (staticRoute) {
    if (targetLocale === "tr") {
      return staticRoute.tr;
    }

    if (targetLocale === "en") {
      return staticRoute.en;
    }

    return staticRoute.de ?? "/de";
  }

  for (const routeConfig of dynamicRouteConfigs) {
    const sourceSlug = resolveSourceSlug(
      normalizedPath,
      routeConfig
    );

    if (!sourceSlug) {
      continue;
    }

    if (targetLocale === "tr") {
      return `${routeConfig.trPrefix}${sourceSlug}`;
    }

    if (targetLocale === "en") {
      const pair = routeConfig.enPairs.find(
        (item) => item.sourceSlug === sourceSlug
      );
      return pair
        ? `${routeConfig.enPrefix}${pair.slug}`
        : "/en";
    }

    const pair = routeConfig.dePairs.find(
      (item) => item.sourceSlug === sourceSlug
    );

    return pair
      ? `${routeConfig.dePrefix}${pair.slug}`
      : "/de";
  }

  return fallbackPath(targetLocale);
}

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const normalizedPathname = normalizePathname(pathname);
  const currentLocale = detectLocale(normalizedPathname);
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
      label: "T\u00FCrk\u00E7e",
      href: resolveLanguagePath(normalizedPathname, "tr"),
    },
    {
      locale: "en" as const,
      label: "English",
      href: resolveLanguagePath(normalizedPathname, "en"),
    },
    {
      locale: "de" as const,
      label: "Deutsch",
      href: resolveLanguagePath(normalizedPathname, "de"),
    },
  ];

  const ariaLabel =
    currentLocale === "en"
      ? "Select language"
      : currentLocale === "de"
        ? "Sprache ausw\u00E4hlen"
        : "Dil se\u00E7in";
  const optionsLabel =
    currentLocale === "en"
      ? "Language options"
      : currentLocale === "de"
        ? "Sprachoptionen"
        : "Dil se\u00E7enekleri";
  const currentLabel =
    currentLocale === "en"
      ? "EN \u00B7 English"
      : currentLocale === "de"
        ? "DE \u00B7 Deutsch"
        : "TR \u00B7 T\u00FCrk\u00E7e";

  return (
    <div className="language-switcher" ref={wrapperRef}>
      <button
        type="button"
        className="language-switcher-button"
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="language-switcher-current">
          {currentLabel}
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
        aria-label={optionsLabel}
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
