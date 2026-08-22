import Link from "next/link";
import { DecorativeIcon, getCalculatorIconName } from "./siteIcons";

type Locale = "tr" | "en" | "de";

type EngineeringTool = {
  slug: string;
  href: string;
  title: string;
  formula: string;
  description: string;
};

type EngineeringGuideLink = {
  href: string;
  label: string;
};

type EngineeringGroup = {
  title: string;
  description: string;
  tools: EngineeringTool[];
};

type EngineeringHubContent = {
  breadcrumbAriaLabel: string;
  breadcrumbs: Array<{
    label: string;
    href?: string;
  }>;
  title: string;
  description: string;
  introTitle: string;
  introBody: string;
  groups: EngineeringGroup[];
  howToTitle: string;
  howToSteps: string[];
  guidesTitle: string;
  guidesDescription: string;
  guideLinks: EngineeringGuideLink[];
  alternateTitle: string;
  alternateLink: {
    href: string;
    hrefLang: string;
    label: string;
  };
};

const contentByLocale: Record<Locale, EngineeringHubContent> = {
  tr: {
    breadcrumbAriaLabel: "Sayfa yolu",
    breadcrumbs: [
      { label: "Ana Sayfa", href: "/" },
      { label: "Mühendislik Hesaplayıcıları" },
    ],
    title: "Mühendislik Hesaplayıcıları",
    description:
      "Teknik birim dönüşümleri, ısı transferi, akışkanlar ve basınç hesapları için kullanılan mühendislik araçlarını tek merkezde inceleyin.",
    introTitle: "Teknik hesaplamalar için düzenli bir merkez",
    introBody:
      "Bu sayfa, mevcut mühendislik hesaplayıcılarını konu başlıklarına göre toplar. Basınç ve akışkanlar mekaniği araçlarıyla ısı transferi hesaplarını aynı yapıda karşılaştırabilir, ilgili formülü görebilir ve doğrudan hesaplayıcıya geçebilirsiniz.",
    groups: [
      {
        title: "Basınç ve Akışkanlar",
        description:
          "Basınç, hidrostatik yük ve boru içi akış davranışı için kullanılan temel hesaplayıcılar.",
        tools: [
          {
            slug: "basinc-kuvvet-alan",
            href: "/hesaplayicilar/basinc-kuvvet-alan",
            title: "Basınç, Kuvvet ve Alan",
            formula: "P = F / A",
            description:
              "Basıncı, kuvveti veya alanı gerçek birim dönüşümleriyle hesaplayın.",
          },
          {
            slug: "hidrostatik-basinc",
            href: "/hesaplayicilar/hidrostatik-basinc",
            title: "Hidrostatik Basınç",
            formula: "ΔP = ρgh",
            description:
              "Yoğunluk, derinlik ve yerçekimi ivmesine göre hidrostatik basınç farkını bulun.",
          },
          {
            slug: "reynolds-sayisi",
            href: "/hesaplayicilar/reynolds-sayisi",
            title: "Reynolds Sayısı",
            formula: "Re = ρ × v × D / μ",
            description:
              "Akış hızı ve karakteristik boyut ile yaklaşık akış rejimini değerlendirin.",
          },
        ],
      },
      {
        title: "Isı Transferi",
        description:
          "Enerji miktarı, malzeme iletkenliği ve sıcaklık farkı üzerinden çalışan ısıl hesap araçları.",
        tools: [
          {
            slug: "isi-enerjisi",
            href: "/hesaplayicilar/isi-enerjisi",
            title: "Isı Enerjisi",
            formula: "Q = m × c × ΔT",
            description:
              "Isı enerjisini, kütleyi, özgül ısıyı veya sıcaklık farkını SI tabanında hesaplayın.",
          },
          {
            slug: "isi-iletimi",
            href: "/hesaplayicilar/isi-iletimi",
            title: "Isı İletimi",
            formula: "Q̇ = k × A × ΔT / L",
            description:
              "Malzeme iletkenliği, alan ve kalınlık üzerinden ısı geçiş hızını karşılaştırın.",
          },
        ],
      },
      {
        title: "Elektrik",
        description:
          "Gerilim, akım ve direnç arasındaki temel ilişkiyi kullanan devre hesaplayıcıları.",
        tools: [
          {
            slug: "ohm-yasasi",
            href: "/hesaplayicilar/ohm-yasasi",
            title: "Ohm Yasası",
            formula: "V = I × R",
            description:
              "Gerilimi, akımı veya direnci Ohm Yasası ile hesaplayın.",
          },
        ],
      },
    ],
    howToTitle: "Bu hesaplayıcılar nasıl kullanılır?",
    howToSteps: [
      "Önce hangi büyüklüğü çözeceğinizi seçin ve yalnızca bilinen değerleri girin.",
      "Her girişte uygun birimi belirleyin; araçlar tüm değerleri önce SI tabanına çevirerek hesaplar.",
      "Ana sonucu, formülde yerine koyulmuş ifadeyi ve SI eşdeğerini birlikte kontrol ederek doğrulama yapın.",
    ],
    guidesTitle: "İlgili birim rehberleri",
    guidesDescription:
      "Temel mühendislik birimlerinin tanımını, sembollerini ve kullanım alanlarını görmek için rehber sayfalarını açabilirsiniz.",
    guideLinks: [
      { href: "/birimler/pascal", label: "Pascal (Pa) rehberi" },
      { href: "/birimler/metre", label: "Metre (m) rehberi" },
      { href: "/birimler/kilogram", label: "Kilogram (kg) rehberi" },
    ],
    alternateTitle: "Diğer diller",
    alternateLink: {
      href: "/en/engineering-calculators",
      hrefLang: "en",
      label: "English version",
    },
  },
  en: {
    breadcrumbAriaLabel: "Breadcrumb",
    breadcrumbs: [
      { label: "Home", href: "/en" },
      { label: "Engineering Calculators" },
    ],
    title: "Engineering Calculators",
    description:
      "Browse engineering tools for technical unit conversions, heat transfer, fluid flow and pressure calculations in one focused hub.",
    introTitle: "A focused hub for practical engineering tools",
    introBody:
      "This page groups the current engineering calculators by topic so people and search engines can discover them from one place. You can compare formulas, review a short description and open the exact calculator without leaving the technical flow of the site.",
    groups: [
      {
        title: "Pressure and Fluids",
        description:
          "Core tools for pressure relationships, hydrostatic loading and internal flow screening.",
        tools: [
          {
            slug: "pressure-force-area",
            href: "/en/calculators/pressure-force-area",
            title: "Pressure, Force and Area",
            formula: "P = F / A",
            description:
              "Calculate pressure, force or area with proper engineering unit conversions.",
          },
          {
            slug: "hydrostatic-pressure",
            href: "/en/calculators/hydrostatic-pressure",
            title: "Hydrostatic Pressure",
            formula: "ΔP = ρgh",
            description:
              "Find hydrostatic pressure difference from density, depth and gravitational acceleration.",
          },
          {
            slug: "reynolds-number",
            href: "/en/calculators/reynolds-number",
            title: "Reynolds Number",
            formula: "Re = ρ × v × D / μ",
            description:
              "Estimate the flow regime from density, velocity, characteristic size and viscosity.",
          },
        ],
      },
      {
        title: "Heat Transfer",
        description:
          "Thermal tools for stored energy, conduction rate and material comparison.",
        tools: [
          {
            slug: "heat-energy",
            href: "/en/calculators/heat-energy",
            title: "Heat Energy",
            formula: "Q = m × c × ΔT",
            description:
              "Solve for heat energy, mass, specific heat or temperature difference on an SI basis.",
          },
          {
            slug: "heat-conduction",
            href: "/en/calculators/heat-conduction",
            title: "Heat Conduction",
            formula: "Q̇ = k × A × ΔT / L",
            description:
              "Compare conduction rate from conductivity, area, temperature difference and thickness.",
          },
        ],
      },
    ],
    howToTitle: "How to use these calculators",
    howToSteps: [
      "Choose the variable you want to solve for and enter the known values only.",
      "Set the units for each input; every tool converts to SI first before running the calculation.",
      "Check the main result, substituted formula and SI equivalent together for a quick engineering sanity check.",
    ],
    guidesTitle: "Related unit guides",
    guidesDescription:
      "Open the unit guides if you want definitions, symbols and context for the base quantities used in these tools.",
    guideLinks: [
      { href: "/en/units/pascal", label: "Pascal (Pa) guide" },
      { href: "/en/units/meter", label: "Meter (m) guide" },
      { href: "/en/units/kilogram", label: "Kilogram (kg) guide" },
    ],
    alternateTitle: "Other languages",
    alternateLink: {
      href: "/muhendislik-hesaplayicilari",
      hrefLang: "tr",
      label: "Turkish version",
    },
  },
  de: {
    breadcrumbAriaLabel: "Breadcrumb",
    breadcrumbs: [
      { label: "Startseite", href: "/de" },
      { label: "Ingenieurrechner" },
    ],
    title: "Ingenieurrechner",
    description:
      "Bündeln Sie technische Rechner für Druck, Strömung, Wärmeübertragung und Einheitenumrechnungen auf einer fokussierten Übersichtsseite.",
    introTitle: "Ein kompakter Einstieg in technische Rechenwerkzeuge",
    introBody:
      "Diese Seite fasst die aktuellen Ingenieurrechner nach Themenfeldern zusammen. So lassen sich Formeln vergleichen, Einsatzfälle schneller einordnen und die passenden Werkzeuge direkt öffnen.",
    groups: [
      {
        title: "Druck und Strömung",
        description:
          "Werkzeuge für Druckbeziehungen, hydrostatische Lasten und erste Strömungsbewertungen in Leitungen.",
        tools: [
          {
            slug: "druck-kraft-flaeche",
            href: "/de/rechner/druck-kraft-flaeche",
            title: "Druck, Kraft und Fläche",
            formula: "P = F / A",
            description:
              "Berechnen Sie Druck, Kraft oder Fläche mit technischen Einheiten und SI-Bezug.",
          },
          {
            slug: "hydrostatischer-druck",
            href: "/de/rechner/hydrostatischer-druck",
            title: "Hydrostatischer Druck",
            formula: "ΔP = ρgh",
            description:
              "Berechnen Sie hydrostatische Druckdifferenz, Dichte, Tiefe oder Erdbeschleunigung.",
          },
          {
            slug: "reynolds-zahl",
            href: "/de/rechner/reynolds-zahl",
            title: "Reynolds-Zahl",
            formula: "Re = ρ × v × D / μ",
            description:
              "Bewerten Sie das Strömungsregime über Dichte, Geschwindigkeit, Durchmesser und Viskosität.",
          },
        ],
      },
      {
        title: "Wärmeübertragung",
        description:
          "Werkzeuge für gespeicherte Wärmeenergie, Wärmeleitung und thermische Materialvergleiche.",
        tools: [
          {
            slug: "waermeenergie",
            href: "/de/rechner/waermeenergie",
            title: "Wärmeenergie",
            formula: "Q = m × c × ΔT",
            description:
              "Berechnen Sie Wärmeenergie, Masse, spezifische Wärmekapazität oder Temperaturdifferenz.",
          },
          {
            slug: "waermeleitung",
            href: "/de/rechner/waermeleitung",
            title: "Wärmeleitung",
            formula: "Q̇ = k × A × ΔT / L",
            description:
              "Vergleichen Sie Wärmestrom aus Leitfähigkeit, Fläche, Temperaturdifferenz und Schichtdicke.",
          },
        ],
      },
    ],
    howToTitle: "Wie verwendet man diese Rechner?",
    howToSteps: [
      "Wählen Sie zuerst die gesuchte Zielgröße und tragen Sie nur die bekannten Werte ein.",
      "Legen Sie für jeden Eingabewert die richtige Einheit fest; alle Werkzeuge rechnen intern zuerst auf SI um.",
      "Prüfen Sie Hauptresultat, eingesetzte Formel und SI-Äquivalent gemeinsam, um Plausibilitätsfehler schnell zu erkennen.",
    ],
    guidesTitle: "Passende Einheitenleitfäden",
    guidesDescription:
      "Wenn Sie Definitionen, Symbole oder Hintergrundwissen zu den verwendeten Basisgrößen brauchen, öffnen Sie die passenden Einheitenleitfäden.",
    guideLinks: [
      { href: "/de/einheiten/pascal", label: "Pascal (Pa) Leitfaden" },
      { href: "/de/einheiten/meter", label: "Meter (m) Leitfaden" },
      { href: "/de/einheiten/kilogramm", label: "Kilogramm (kg) Leitfaden" },
    ],
    alternateTitle: "Weitere Sprachen",
    alternateLink: {
      href: "/en/engineering-calculators",
      hrefLang: "en",
      label: "English version",
    },
  },
};

export function getEngineeringHubContent(locale: Locale) {
  return contentByLocale[locale];
}

export function getEngineeringHubCollectionItems(locale: Locale) {
  return contentByLocale[locale].groups.flatMap((group) => group.tools);
}

export default function EngineeringHubPage({
  locale,
}: {
  locale: Locale;
}) {
  const content = getEngineeringHubContent(locale);

  return (
    <main className="unit-information-page" lang={locale}>
      <article className="unit-page-shell">
        <nav className="breadcrumbs" aria-label={content.breadcrumbAriaLabel}>
          {content.breadcrumbs.map((item, index) => (
            <span key={`${item.label}-${index}`}>
              {index > 0 ? <span aria-hidden="true"> › </span> : null}
              {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
            </span>
          ))}
        </nav>

        <header className="unit-page-header">
          <h1>{content.title}</h1>
          <p>{content.description}</p>
        </header>

        <div className="unit-page-content">
          <section className="conversion-section">
            <h2>{content.introTitle}</h2>
            <p>{content.introBody}</p>
          </section>

          {content.groups.map((group) => (
            <section className="conversion-section" key={group.title}>
              <h2>{group.title}</h2>
              <p>{group.description}</p>

              <ul className="category-calculator-list engineering-hub-list">
                {group.tools.map((tool) => (
                  <li key={tool.href}>
                    <Link className="category-calculator-card" href={tool.href}>
                      <span className="engineering-hub-card-header">
                        <DecorativeIcon
                          name={getCalculatorIconName(tool.slug)}
                          size={28}
                        />
                        <span className="category-tool-title">
                          <strong>{tool.title}</strong>
                        </span>
                      </span>
                      <span className="category-tool-formula">{tool.formula}</span>
                      <span>{tool.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section className="conversion-section">
            <h2>{content.howToTitle}</h2>
            <ol className="engineering-hub-steps">
              {content.howToSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <section className="conversion-section">
            <h2>{content.guidesTitle}</h2>
            <p>{content.guidesDescription}</p>
            <ul className="related-conversion-list engineering-hub-guides">
              {content.guideLinks.map((guide) => (
                <li key={guide.href}>
                  <Link href={guide.href}>{guide.label}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="conversion-section language-alternatives">
            <h2>{content.alternateTitle}</h2>
            <Link
              className="text-link"
              href={content.alternateLink.href}
              hrefLang={content.alternateLink.hrefLang}
            >
              {content.alternateLink.label}
            </Link>
          </section>
        </div>
      </article>
    </main>
  );
}
