import type { Metadata } from "next";
import OtherCategoriesPage from "../components/OtherCategoriesPage";
import { getCategoryIconName } from "../components/siteIcons";
import { categoryPages } from "../converter/categoryPages";
import { conversionPages } from "../converter/conversionPages";
import { homeCategoryOrder } from "../converter/homeCategoryOrder";
import { buildSiteUrl } from "../siteConfig";

export const metadata: Metadata = {
  title: "Di\u011fer D\u00f6n\u00fc\u015f\u00fcmler",
  description:
    "Yo\u011funluk, kuvvet, tork, momentum ve viskozite gibi ana sayfada yer almayan birim \u00e7evirme kategorilerini ke\u015ffedin.",
  alternates: {
    canonical: "/diger-donusumler",
    languages: {
      tr: "/diger-donusumler",
      en: "/en/other-conversions",
      "x-default": "/diger-donusumler",
    },
  },
  openGraph: {
    title: "Di\u011fer D\u00f6n\u00fc\u015f\u00fcmler",
    description:
      "Yo\u011funluk, kuvvet, tork, momentum ve viskozite gibi birim \u00e7evirme kategorilerini ke\u015ffedin.",
    url: buildSiteUrl("/diger-donusumler"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

function normalizeSearchTextServer(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u0131/g, "i")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export default function DigerDonusumlerPage() {
  const secondaryCategoryPages = categoryPages.filter(
    (page) =>
      !(homeCategoryOrder as readonly string[]).includes(page.category)
  );

  const secondaryCategorySet = new Set(
    secondaryCategoryPages.map((page) => page.category)
  );

  const conversions = conversionPages
    .filter((page) => secondaryCategorySet.has(page.category))
    .map((page) => ({
      id: page.slug,
      href: `/${page.slug}`,
      label: `${page.fromName} -> ${page.toName}`,
      description: `${page.fromUnit} -> ${page.toUnit}`,
      searchText: normalizeSearchTextServer(
        [
          page.fromName,
          page.toName,
          page.fromUnit,
          page.toUnit,
          page.slug,
        ].join(" ")
      ),
    }));

  const categories = secondaryCategoryPages.map((page) => ({
    id: page.category,
    href: `/kategoriler/${page.slug}`,
    title: page.title,
    description: page.description,
    iconName: getCategoryIconName(page.category),
  }));

  const tools = [
    {
      id: "yuzuk",
      href: "/yuzuk-olcusu-cevirici",
      title: "Yüzük Ölçüsü Çevirici",
      description:
        "Yüzük ölçüsünü TR, Avrupa, ABD ve İngiltere sistemleri arasında çevirin.",
      iconName: "ringSize" as const,
    },
    {
      id: "boya",
      href: "/boya-hesaplama",
      title: "Boya Hesaplama",
      description:
        "Oda ölçülerinden net duvar alanını ve gereken boya litresini hesaplayın.",
      iconName: "paintCalculator" as const,
    },
    {
      id: "fayans",
      href: "/fayans-hesaplama",
      title: "Fayans Hesaplama",
      description:
        "Kaplanacak alan ve fayans ebadından, fire payı dahil gereken fayans adedini hesaplayın.",
      iconName: "tileCalculator" as const,
    },
    {
      id: "tugla",
      href: "/tugla-hesaplama",
      title: "Tuğla Hesaplama",
      description:
        "Duvar alanı ve tuğla ölçüsünden, derz ve fire payı dahil gereken tuğla adedini hesaplayın.",
      iconName: "brickCalculator" as const,
    },
    {
      id: "yas",
      href: "/yas-hesaplama",
      title: "Yaş Hesaplama",
      description:
        "Doğum tarihinden yaşını yıl-ay-gün olarak, ya da iki tarih arasındaki farkı hesaplayın.",
      iconName: "dateCalculator" as const,
    },
    {
      id: "kdv",
      href: "/kdv-hesaplama",
      title: "KDV Hesaplama",
      description:
        "KDV dahil veya KDV hariç tutarı, KDV miktarını oran bazında hesaplayın.",
      iconName: "vatCalculator" as const,
    },
    {
      id: "bmi",
      href: "/bmi-hesaplama",
      title: "BMI Hesaplama",
      description:
        "Vücut kitle indeksini (BMI) ve günlük kalori ihtiyacını hesaplayın.",
      iconName: "bmiCalculator" as const,
    },
    {
      id: "gebelik",
      href: "/gebelik-haftasi-hesaplama",
      title: "Gebelik Haftası Hesaplama",
      description:
        "Son adet tarihinden gebelik haftasını ve tahmini doğum tarihini hesaplayın.",
      iconName: "pregnancyCalculator" as const,
    },
    {
      id: "uzunluk-karsilastirma",
      href: "/uzunluk-karsilastirma",
      title: "Uzunluk Karşılaştırma",
      description:
        "Bir uzunluk değerini zürafa boyu, otobüs, futbol sahası gibi tanıdık nesnelerle karşılaştırın.",
      iconName: "length" as const,
    },
    {
      id: "agirlik-karsilastirma",
      href: "/agirlik-karsilastirma",
      title: "Ağırlık Karşılaştırma",
      description:
        "Bir ağırlık değerini kedi, insan, at, fil gibi tanıdık nesnelerle karşılaştırın.",
      iconName: "mass" as const,
    },
    {
      id: "kosu-pace",
      href: "/kosu-pace-hesaplama",
      title: "Koşu Pace Hesaplama",
      description:
        "Mesafe, süre ve tempo arasında hesaplama yapın; yarış mesafeleri için tahmini bitiş süresi görün.",
      iconName: "paceCalculator" as const,
    },
    {
      id: "yakit-tuketimi",
      href: "/yakit-tuketimi-hesaplama",
      title: "Yakıt Tüketimi Hesaplama",
      description:
        "km/lt, lt/100km ve mpg arasında çevirin; yolculuk mesafesi ve yakıt fiyatına göre maliyeti hesaplayın.",
      iconName: "fuelConsumptionCalculator" as const,
    },
    {
      id: "parke",
      href: "/parke-hesaplama",
      title: "Parke Hesaplama",
      description:
        "Kaplanacak alandan, fire payı dahil gereken laminat parke paketi sayısını hesaplayın.",
      iconName: "laminateCalculator" as const,
    },
    {
      id: "duvar-kagidi",
      href: "/duvar-kagidi-hesaplama",
      title: "Duvar Kağıdı Hesaplama",
      description:
        "Oda ölçülerinden ve rulo boyutlarından gereken duvar kağıdı rulosu sayısını hesaplayın.",
      iconName: "wallpaperCalculator" as const,
    },
    {
      id: "tasinma-kutusu",
      href: "/tasinma-kutusu-hesaplama",
      title: "Taşınma Kutusu Hesaplama",
      description:
        "Ev tipine göre tahmini taşınma kolisi sayısını ve kamyon hacmini görün.",
      iconName: "movingBoxCalculator" as const,
    },
    {
      id: "dogalgaz-tuketimi",
      href: "/dogalgaz-tuketimi-hesaplama",
      title: "Doğalgaz Tüketimi Hesaplama",
      description:
        "m³ cinsinden doğalgaz tüketiminden toplam maliyeti ve yaklaşık kWh karşılığını hesaplayın.",
      iconName: "naturalGasCalculator" as const,
    },
    {
      id: "elektrikli-arac-sarj",
      href: "/elektrikli-arac-sarj-hesaplama",
      title: "Elektrikli Araç Şarj Hesaplama",
      description:
        "Batarya kapasitesi ve şarj gücünden tahmini şarj süresini, tüketimden tahmini menzili hesaplayın.",
      iconName: "evChargingCalculator" as const,
    },
    {
      id: "klima-btu",
      href: "/klima-btu-hesaplama",
      title: "Klima BTU Hesaplama",
      description:
        "Oda alanı, kişi sayısı ve güneş/kat durumundan uygun klima soğutma kapasitesini hesaplayın.",
      iconName: "acCapacityCalculator" as const,
    },
    {
      id: "elektrik-tuketimi",
      href: "/elektrik-tuketimi-hesaplama",
      title: "Elektrik Tüketimi Hesaplama",
      description:
        "Cihaz gücünden günlük, aylık ve yıllık elektrik tüketimini (kWh) ve maliyetini hesaplayın.",
      iconName: "electricityConsumptionCalculator" as const,
    },
    {
      id: "uyku",
      href: "/uyku-hesaplama",
      title: "Uyku Hesaplama",
      description:
        "90 dakikalık uyku döngülerine göre ideal yatış ve kalkış saatlerini hesaplayın.",
      iconName: "sleepCalculator" as const,
    },
  ];

  return (
    <OtherCategoriesPage
      conversions={conversions}
      categories={categories}
      tools={tools}
      locale="tr"
      alternateLink={{
        href: "/en/other-conversions",
        hrefLang: "en",
        label: "View the English version",
      }}
    />
  );
}
