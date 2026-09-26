import type { NextConfig } from "next";

// Eski Ingilizce bolum adreslerinden dile ozel adreslere kalici yonlendirme.
// Ornek: /sv/unit-guides/meter -> /sv/enhetsguider/meter
const localizedSectionRenames: Record<string, Record<string, string>> = {
  sv: {
    "categories": "kategorier",
    "unit-guides": "enhetsguider",
    "historical-units": "historiska-enheter",
    "kitchen-measurement-converter": "koksmatt-omvandlare",
    "recipe-converter": "receptomvandlare",
    "shoe-size-converter": "skostorlekar",
  },
  no: {
    "categories": "kategorier",
    "unit-guides": "enhetsguider",
    "historical-units": "historiske-enheter",
    "kitchen-measurement-converter": "kjokkenmal-omregner",
    "recipe-converter": "oppskriftomregner",
    "shoe-size-converter": "skostorrelser",
  },
  da: {
    "categories": "kategorier",
    "unit-guides": "enhedsguider",
    "historical-units": "historiske-enheder",
    "kitchen-measurement-converter": "kokkenmal-omregner",
    "recipe-converter": "opskriftomregner",
    "shoe-size-converter": "skostorrelser",
  },
  pt: {
    "categories": "categorias",
    "unit-guides": "guias-de-unidades",
    "historical-units": "unidades-historicas",
    "kitchen-measurement-converter": "conversor-de-medidas-de-cozinha",
    "recipe-converter": "conversor-de-receitas",
    "shoe-size-converter": "conversor-de-calcados",
  },
  fr: {
    "unit-guides": "guides-des-unites",
    "historical-units": "unites-historiques",
    "kitchen-measurement-converter": "convertisseur-mesures-cuisine",
    "recipe-converter": "convertisseur-de-recettes",
    "shoe-size-converter": "convertisseur-de-pointures",
  },
  es: {
    "categories": "categorias",
    "unit-guides": "guias-de-unidades",
    "historical-units": "unidades-historicas",
    "kitchen-measurement-converter": "conversor-medidas-de-cocina",
    "recipe-converter": "conversor-de-recetas",
    "shoe-size-converter": "conversor-tallas-de-calzado",
  },
  uz: {
    "about": "biz-haqimizda",
    "contact": "aloqa",
    "privacy": "maxfiylik-siyosati",
    "terms": "foydalanish-shartlari",
  },
  "es-419": {
    "categories": "categorias",
    "unit-guides": "guias-de-unidades",
    "historical-units": "unidades-historicas",
    "kitchen-measurement-converter": "conversor-medidas-de-cocina",
    "recipe-converter": "conversor-de-recetas",
    "shoe-size-converter": "conversor-tallas-de-calzado",
  },
  it: {
    "categories": "categorie",
    "unit-guides": "guide-alle-unita",
    "historical-units": "unita-storiche",
    "kitchen-measurement-converter": "convertitore-misure-cucina",
    "recipe-converter": "convertitore-ricette",
    "shoe-size-converter": "convertitore-taglie-scarpe",
  },
  nl: {
    "categories": "categorieen",
    "unit-guides": "eenheidsgidsen",
    "historical-units": "historische-eenheden",
    "kitchen-measurement-converter": "keukenmaten-omrekenen",
    "recipe-converter": "recepten-omrekenen",
    "shoe-size-converter": "schoenmaten-omrekenen",
  },
};

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/matematik",
        destination: "/bilim-hesaplayicilari/matematik",
        permanent: true,
      },
      ...Object.entries(localizedSectionRenames).flatMap(([locale, sections]) =>
        Object.entries(sections).map(([oldSection, newSection]) => ({
          source: `/${locale}/${oldSection}/:path*`,
          destination: `/${locale}/${newSection}/:path*`,
          permanent: true,
        }))
      ),
    ];
  },
};

export default nextConfig;