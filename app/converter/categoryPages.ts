export type CategoryPage = {
  slug: string;
  category: string;
  title: string;
  description: string;
};

export const categoryPages: CategoryPage[] = [
  {
    slug: "alan",
    category: "alan",
    title: "Alan Dönüşümleri",
    description:
      "Metrekare, dönüm, dekar, hektar ve fitkare arasında çalışan alan dönüşümlerini kullanın; temel formülleri ve örnek karşılıkları inceleyin.",
  },
  {
    slug: "hacim",
    category: "hacim",
    title: "Hacim Dönüşümleri",
    description:
      "Litre, mililitre ve metreküp birimleri arasında hızlı hacim dönüşümü yapın; tablo, formül ve birim rehberlerine ulaşın.",
  },
  {
    slug: "uzunluk",
    category: "uzunluk",
    title: "Uzunluk Dönüşümleri",
    description:
      "Metre, kilometre, santimetre, milimetre, mil, fit, inç, yarda birimlerinin yanı sıra Osmanlı (arşın, endaze), Bizans (Bizans ayağı, Bizans kulacı) ve eski Türk (çığ) dönemi uzunluk birimleri arasında hızlı ve ücretsiz dönüşüm yapın.",
  },
  {
    slug: "kutle",
    category: "kutle",
    title: "Kütle Dönüşümleri",
    description:
      "Kilogram, gram, miligram, ton, pound, ons birimlerinin yanı sıra Osmanlı (okka, dirhem) ve Bizans (Bizans litrası, Bizans onsu) dönemi kütle birimleri arasında hızlı ve ücretsiz dönüşüm yapın.",
  },
  {
    slug: "sicaklik",
    category: "sicaklik",
    title: "Sıcaklık Dönüşümleri",
    description:
      "Santigrat, Fahrenheit ve Kelvin arasında sıcaklık dönüşümleri yapın; doğrusal olmayan formülleri ve örnek değerleri görün.",
  },
  {
    slug: "zaman",
    category: "zaman",
    title: "Zaman Dönüşümleri",
    description:
      "Saniye, dakika ve saat birimleri arasında çalışan temel zaman dönüşümlerini tek sayfada kullanın.",
  },
  {
    slug: "hiz",
    category: "hiz",
    title: "Hız Dönüşümleri",
    description:
      "km/saat, m/s ve mph birimleri arasında hız dönüşümü yapın; mühendislik ve günlük kullanım için örnek araçları açın.",
  },
  {
    slug: "basinc",
    category: "basinc",
    title: "Basınç Dönüşümleri ve Hesaplamaları",
    description:
      "Pascal, kilopascal, bar, PSI, mmHg, atmosfer ve kgf/cm² başta olmak üzere basınç birimlerini dönüştürün; basınç türlerini, formüllerini ve mühendislik uygulamalarını inceleyin.",
  },
  {
    slug: "enerji",
    category: "enerji",
    title: "Enerji Dönüşümleri",
    description:
      "Joule, kilovat-saat, kalori ve BTU tabanlı enerji dönüşümlerini aynı kategoride karşılaştırın.",
  },
  {
    slug: "debi",
    category: "debi",
    title: "Debi Dönüşümleri",
    description:
      "Metreküp/saat ve litre/dakika arasında çalışan debi dönüşümlerini kullanın; akış miktarı karşılıklarını hızlıca görün.",
  },
  {
    slug: "elektrik",
    category: "elektrik",
    title: "Elektrik Birimi Dönüşümleri",
    description:
      "Volt, kilovolt, amper ve miliamper birimleri arasında temel elektrik dönüşümlerini açın ve örnek değerleri inceleyin.",
  },
  {
    slug: "yogunluk",
    category: "yogunluk",
    title: "Yoğunluk Dönüşümleri",
    description:
      "Kilogram/metreküp ve gram/santimetreküp birimleri arasında yoğunluk dönüşümü yapın; su ve yaygın malzemelerin yoğunluk referanslarını inceleyin.",
  },
  {
    slug: "kuvvet",
    category: "kuvvet",
    title: "Kuvvet Dönüşümleri",
    description:
      "Newton ve kilogram-kuvvet birimleri arasında dönüşüm yapın; kuvvet formülünü, basınç ile ilişkisini ve mühendislik kullanım örneklerini inceleyin.",
  },
  {
    slug: "tork",
    category: "tork",
    title: "Tork Dönüşümleri",
    description:
      "Newton-metre ve pound-fit birimleri arasında tork dönüşümü yapın; motor torku, tork anahtarı ve cıvata sıkma değerleri için örnekleri inceleyin.",
  },
  {
    slug: "guc",
    category: "guc",
    title: "Güç Dönüşümleri",
    description:
      "Watt, kilowatt, megawatt ve beygirgücü birimleri arasında dönüşüm yapın; motor gücü, jeneratör kapasitesi ve elektrik cihazları için örnekleri inceleyin.",
  },
  {
    slug: "momentum",
    category: "momentum",
    title: "Momentum Dönüşümleri",
    description:
      "Kilogram-metre/saniye ve newton-saniye birimleri arasında momentum ve impuls dönüşümü yapın; çarpışma ve itki hesapları için örnekleri inceleyin.",
  },
  {
    slug: "viskozite",
    category: "viskozite_dinamik",
    title: "Viskozite Dönüşümleri",
    description:
      "Pascal-saniye ve santipoise birimleri arasında dinamik viskozite dönüşümü yapın; Reynolds sayısı ve akışkanlar mekaniği hesapları için örnekleri inceleyin.",
  },
  {
    slug: "veri",
    category: "veri",
    title: "Veri Depolama Dönüşümleri",
    description:
      "Bayt, kilobayt, megabayt, gigabayt ve terabayt birimleri arasında dönüşüm yapın; 1000 ile 1024 tabanlı hesaplama farkını ve depolama alanı karışıklığını inceleyin.",
  },
  {
    slug: "direnc",
    category: "elektrik_direnc",
    title: "Direnç Dönüşümleri",
    description:
      "Ohm, kiloohm ve megaohm birimleri arasında dönüşüm yapın; devre tasarımı ve Ohm Yasası hesaplamaları için örnekleri inceleyin.",
  },
  {
    slug: "kapasitans",
    category: "kapasitans",
    title: "Kapasitans Dönüşümleri",
    description:
      "Farad, milifarad, mikrofarad, nanofarad ve pikofarad birimleri arasında dönüşüm yapın; kondansatör değerlerini ve devre tasarımı örneklerini inceleyin.",
  },
  {
    slug: "enduktans",
    category: "enduktans",
    title: "Endüktans Dönüşümleri",
    description:
      "Henry, milihenry ve mikrohenry birimleri arasında dönüşüm yapın; bobin ve transformatör tasarımı için örnekleri inceleyin.",
  },
  {
    slug: "elektrik-yuku",
    category: "elektrik_yuk",
    title: "Elektrik Yükü Dönüşümleri",
    description:
      "Coulomb, milicoulomb, mikrocoulomb ve nanocoulomb birimleri arasında dönüşüm yapın; batarya kapasitesi ve elektrostatik hesap örneklerini inceleyin.",
  },
  {
    slug: "altin-ayar",
    category: "altin_ayar",
    title: "Altın Ayar Dönüşümleri",
    description:
      "24, 22, 18 ve 14 ayar altın arasında saf altın içeriğine göre gram dönüşümü yapın; ayarların saflık oranlarını ve kuyumculukta kullanım alanlarını inceleyin.",
  },
];

export function findCategoryPageByCategory(category: string) {
  return categoryPages.find((page) => page.category === category);
}

export function getCategoryPathByCategory(category: string) {
  const categoryPage = findCategoryPageByCategory(category);

  return categoryPage
    ? `/kategoriler/${categoryPage.slug}`
    : "/tum-birimler";
}
