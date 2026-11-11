"use client";

import Link from "@/app/components/SiteLink";
import { usePathname } from "next/navigation";
import {
  getLocaleFromPathname,
  type Locale,
} from "./i18n/config";

const copy = {
  tr: {
    lang: "tr",
    title: "Sayfa bulunamadı",
    description:
      "Aradığınız sayfa taşınmış olabilir veya geçerli bir adres olmayabilir.",
    continueHeading: "Devam etmek için",
    primaryHref: "/",
    primaryLabel: "Ana sayfaya dön",
    secondaryHref: "/en",
    secondaryLabel: "İngilizce ana sayfaya git",
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
      "Die gesuchte Seite wurde möglicherweise verschoben oder ist keine gültige Adresse.",
    continueHeading: "Weiter mit",
    primaryHref: "/de",
    primaryLabel: "Zur deutschen Startseite",
    secondaryHref: "/",
    secondaryLabel: "Türkische Startseite öffnen",
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
      dir={undefined}
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
