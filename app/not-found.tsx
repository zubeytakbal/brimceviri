import Link from "next/link";
import { headers } from "next/headers";

type Locale = "tr" | "en" | "de";

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
} as const;

function getLocaleFromPathname(pathname: string): Locale {
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return "en";
  }

  if (pathname === "/de" || pathname.startsWith("/de/")) {
    return "de";
  }

  return "tr";
}

export default async function NotFound() {
  const headerStore = await headers();
  const pathname = headerStore.get("x-pathname") ?? "/";
  const locale = getLocaleFromPathname(pathname);
  const localeCopy = copy[locale];

  return (
    <main className="unit-information-page" lang={localeCopy.lang}>
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
