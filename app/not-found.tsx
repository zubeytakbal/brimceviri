"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getLocaleFromPathname,
  type Locale,
} from "./i18n/config";

const copy = {
  tr: {
    lang: "tr",
    title: "Sayfa bulunamadi",
    description:
      "Aradiginiz sayfa tasinmis olabilir veya gecerli bir adres olmayabilir.",
    continueHeading: "Devam etmek icin",
    primaryHref: "/",
    primaryLabel: "Ana sayfaya don",
    secondaryHref: "/en",
    secondaryLabel: "Ingilizce ana sayfaya git",
  },
  en: {
    lang: "en",
    title: "Page not found",
    description:
      "The page you are looking for may have moved or may not be a valid address.",
    continueHeading: "Continue with",
    primaryHref: "/en",
    primaryLabel: "Go to the English homepage",
    secondaryHref: "/",
    secondaryLabel: "Open the Turkish homepage",
  },
  de: {
    lang: "de",
    title: "Seite nicht gefunden",
    description:
      "Die gesuchte Seite wurde moglicherweise verschoben oder ist keine gueltige Adresse.",
    continueHeading: "Weiter mit",
    primaryHref: "/de",
    primaryLabel: "Zur deutschen Startseite",
    secondaryHref: "/",
    secondaryLabel: "Turkische Startseite offnen",
  },
  ar: {
    lang: "ar",
    title: "الصفحة غير موجودة",
    description:
      "قد تكون الصفحة التي تبحث عنها قد نُقلت أو أن الرابط غير صالح.",
    continueHeading: "يمكنك المتابعة من هنا",
    primaryHref: "/ar",
    primaryLabel: "العودة إلى الصفحة العربية",
    secondaryHref: "/",
    secondaryLabel: "فتح الصفحة التركية",
  },
uz: {
    lang: "en",
    title: "Page not found",
    description:
      "The page you are looking for may have moved or may not be a valid address.",
    continueHeading: "Continue with",
    primaryHref: "/en",
    primaryLabel: "Go to the English homepage",
    secondaryHref: "/",
    secondaryLabel: "Open the Turkish homepage",
  },
bn: {
    lang: "en",
    title: "Page not found",
    description:
      "The page you are looking for may have moved or may not be a valid address.",
    continueHeading: "Continue with",
    primaryHref: "/en",
    primaryLabel: "Go to the English homepage",
    secondaryHref: "/",
    secondaryLabel: "Open the Turkish homepage",
  },
} satisfies Record<
  Locale,
  {
    lang: string;
    title: string;
    description: string;
    continueHeading: string;
    primaryHref: string;
    primaryLabel: string;
    secondaryHref: string;
    secondaryLabel: string;
  }
>;

export default function NotFound() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname ?? "/");
  const localeCopy = copy[locale];

  return (
    <main
      className="unit-information-page"
      lang={localeCopy.lang}
      dir={locale === "ar" ? "rtl" : undefined}
    >
      <article className="unit-page-shell">
        <header className="unit-page-header">
          <h1>{localeCopy.title}</h1>
          <p>{localeCopy.description}</p>
        </header>

        <div className="unit-page-content">
          <section className="conversion-section">
            <h2>{localeCopy.continueHeading}</h2>
            <p>
              <Link
                className="text-link"
                href={localeCopy.primaryHref}
              >
                {localeCopy.primaryLabel}
              </Link>
            </p>
            <p>
              <Link
                className="text-link"
                href={localeCopy.secondaryHref}
              >
                {localeCopy.secondaryLabel}
              </Link>
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
