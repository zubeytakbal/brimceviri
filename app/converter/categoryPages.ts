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
      "1 dönüm = 1.000 m², 1 hektar = 10 dönüm, 1 dekar = 1.000 m²; metrekare, fitkare, akre ve bigha gibi yerel arazi birimleri.",
  },
  {
    slug: "hacim",
    category: "hacim",
    title: "Hacim Dönüşümleri",
    description:
      "1 m³ = 1.000 litre, 1 ABD galonu = 3,78541 L, 1 varil = 158,987 L; mililitre, desilitre, kile ve şinik.",
  },
  {
    slug: "uzunluk",
    category: "uzunluk",
    title: "Uzunluk Dönüşümleri",
    description:
      "1 inç = 2,54 cm, 1 fit = 0,3048 m, 1 mil = 1,60934 km; arşın (68 cm) ve endaze gibi Osmanlı ölçüleri.",
  },
  {
    slug: "kutle",
    category: "kutle",
    title: "Kütle Dönüşümleri",
    description:
      "1 pound = 0,453592 kg, 1 ons = 28,3495 g, 1 troy ons = 31,1035 g; okka (1,28295 kg), dirhem ve karat.",
  },
  {
    slug: "sicaklik",
    category: "sicaklik",
    title: "Sıcaklık Dönüşümleri",
    description:
      "0 °C = 32 °F, 100 °C = 212 °F, 0 K = -273,15 °C; Celsius, Fahrenheit, Kelvin, Rankine ve Réaumur arası formüller.",
  },
  {
    slug: "zaman",
    category: "zaman",
    title: "Zaman Dönüşümleri",
    description:
      "1 saat = 3.600 saniye, 1 gün = 1.440 dakika; milisaniye, saniye, dakika, saat ve gün arası dönüşüm.",
  },
  {
    slug: "hiz",
    category: "hiz",
    title: "Hız Dönüşümleri",
    description:
      "100 km/saat = 27,7778 m/s, 1 knot = 1,852 km/saat, 1 mph = 1,60934 km/saat; ışık hızı dahil.",
  },
  {
    slug: "basinc",
    category: "basinc",
    title: "Basınç Dönüşümleri ve Hesaplamaları",
    description:
      "1 bar = 14,5038 psi, 1 atm = 1,01325 bar, 1 kgf/cm² = 0,980665 bar; pascal, mmHg ve mmSS.",
  },
  {
    slug: "enerji",
    category: "enerji",
    title: "Enerji Dönüşümleri",
    description:
      "1 kWh = 3,6 MJ, 1 kcal = 4,184 kJ, 1 BTU = 1.055,06 J; joule, kalori, termi ve elektronvolt.",
  },
  {
    slug: "debi",
    category: "debi",
    title: "Debi Dönüşümleri",
    description:
      "1 m³/saat = 16,6667 L/dakika; pompa, tesisat ve sulama debilerinin metreküp/saat ile litre/dakika karşılığı.",
  },
  {
    slug: "elektrik",
    category: "elektrik",
    title: "Elektrik Birimi Dönüşümleri",
    description:
      "1 kV = 1.000 V, 1 A = 1.000 mA; gerilim (volt, kilovolt, milivolt) ve akım (amper, miliamper) birimleri.",
  },
  {
    slug: "yogunluk",
    category: "yogunluk",
    title: "Yoğunluk Dönüşümleri",
    description:
      "1 g/cm³ = 1.000 kg/m³, 1 lb/ft³ = 16,0185 kg/m³; kg/L, g/L ve slug/ft³.",
  },
  {
    slug: "kuvvet",
    category: "kuvvet",
    title: "Kuvvet Dönüşümleri",
    description:
      "1 kgf = 9,80665 N, 1 lbf = 4,44822 N, 1 kN = 101,972 kgf; newton, dyn ve kilogram-kuvvet.",
  },
  {
    slug: "tork",
    category: "tork",
    title: "Tork Dönüşümleri",
    description:
      "1 kgf·m = 9,80665 N·m, 1 lb·ft = 1,35582 N·m; tork anahtarı ve cıvata sıkma değerleri için.",
  },
  {
    slug: "aci",
    category: "aci",
    title: "Açı Dönüşümleri",
    description:
      "1 radyan = 57,2958°, 1 tur = 360°, 100 gradyan = 90°; derece, radyan, gradyan ve tur.",
  },
  {
    slug: "frekans",
    category: "frekans",
    title: "Frekans Dönüşümleri",
    description:
      "1 MHz = 1.000 kHz, 2,4 GHz = 2.400 MHz; hertz, kilohertz, megahertz ve gigahertz.",
  },
  {
    slug: "hacimsel-debi",
    category: "debi_hacimsel",
    title: "Hacimsel Debi Dönüşümleri",
    description:
      "1 m³/s = 3.600 m³/saat, 1 cfm = 1,69901 m³/saat, 1 gpm = 3,78541 L/dakika; havalandırma ve pompa debileri.",
  },
  {
    slug: "kutlesel-debi",
    category: "debi_kutlesel",
    title: "Kütlesel Debi Dönüşümleri",
    description:
      "1 kg/s = 3.600 kg/saat, 1 g/s = 3,6 kg/saat; proses ve yakıt akışı hesapları.",
  },
  {
    slug: "manyetik-alan",
    category: "manyetik_alan",
    title: "Manyetik Alan Dönüşümleri",
    description:
      "1 Oe = 79,5775 A/m, 1 kA/m = 12,5664 Oe; manyetik alan şiddeti birimleri.",
  },
  {
    slug: "manyetik-aki",
    category: "manyetik_aki",
    title: "Manyetik Akı Dönüşümleri",
    description:
      "1 Wb = 1.000 mWb = 1.000.000 µWb; weber, miliweber, mikroweber ve nanoweber.",
  },
  {
    slug: "kinematik-viskozite",
    category: "viskozite_kinematik",
    title: "Kinematik Viskozite Dönüşümleri",
    description:
      "1 cSt = 1 mm²/s, 1 m²/s = 1.000.000 cSt; motor yağı ve akışkan viskozite sınıfları.",
  },
  {
    slug: "isil-iletkenlik",
    category: "isil_iletkenlik",
    title: "Isıl İletkenlik Dönüşümleri",
    description:
      "1 Btu/h·ft·°F = 1,73074 W/m·K; yalıtım malzemesi ve ısı iletimi hesaplarında W/m·K karşılıkları.",
  },
  {
    slug: "isi-akisi",
    category: "isi_akisi",
    title: "Isı Akısı Dönüşümleri",
    description:
      "1 kW/m² = 1.000 W/m², 1 cal/cm²·s = 41,84 kW/m²; yüzey ısı akısı birimleri.",
  },
  {
    slug: "ozgul-isi",
    category: "ozgul_isi",
    title: "Özgül Isı Dönüşümleri",
    description:
      "1 cal/g·K = 4.184 J/kg·K, 1 Btu/lb·°F = 4,1868 kJ/kg·K; malzemelerin ısınma kapasitesi.",
  },
  {
    slug: "ivme",
    category: "ivme",
    title: "İvme Dönüşümleri",
    description:
      "1 g = 9,80665 m/s², 1 ft/s² = 0,3048 m/s²; araç hızlanması ve yerçekimi ivmesi karşılaştırmaları.",
  },
  {
    slug: "acisal-hiz",
    category: "acisal_hiz",
    title: "Açısal Hız Dönüşümleri",
    description:
      "1000 rpm = 104,72 rad/s, 1 rad/s = 57,2958 °/s; motor devri ve dönme hızı.",
  },
  {
    slug: "guc",
    category: "guc",
    title: "Güç Dönüşümleri",
    description:
      "1 hp = 0,735499 kW, 1 kW = 3.412,14 BTU/saat, 1 ton soğutma = 3,51685 kW; watt, megawatt ve beygirgücü.",
  },
  {
    slug: "momentum",
    category: "momentum",
    title: "Momentum Dönüşümleri",
    description:
      "1 N·s = 1 kg·m/s, 1 lb·ft/s = 0,138255 kg·m/s; momentum ve impuls birimleri.",
  },
  {
    slug: "viskozite",
    category: "viskozite_dinamik",
    title: "Viskozite Dönüşümleri",
    description:
      "1 cP = 1 mPa·s, 1 P = 0,1 Pa·s; suyun 20 °C'deki viskozitesi yaklaşık 1 cP'dir.",
  },
  {
    slug: "veri",
    category: "veri",
    title: "Veri Depolama Dönüşümleri",
    description:
      "1 GB = 1.000 MB, 1 GiB = 1.024 MiB, 1 TB = 931,323 GiB; disklerde 1000, bellekte 1024 tabanı.",
  },
  {
    slug: "direnc",
    category: "elektrik_direnc",
    title: "Direnç Dönüşümleri",
    description:
      "1 kΩ = 1.000 Ω, 4,7 MΩ = 4.700 kΩ; ohm, kiloohm ve megaohm.",
  },
  {
    slug: "kapasitans",
    category: "kapasitans",
    title: "Kapasitans Dönüşümleri",
    description:
      "1 µF = 1.000 nF, 100 nF = 0,1 µF, 1 nF = 1.000 pF; kondansatör üzerindeki değerleri okumak için.",
  },
  {
    slug: "enduktans",
    category: "enduktans",
    title: "Endüktans Dönüşümleri",
    description:
      "1 mH = 1.000 µH, 1 H = 1.000 mH; bobin ve filtre devresi değerleri.",
  },
  {
    slug: "elektrik-yuku",
    category: "elektrik_yuk",
    title: "Elektrik Yükü Dönüşümleri",
    description:
      "1 C = 1.000 mC = 1.000.000 µC; coulomb, milicoulomb, mikrocoulomb ve nanocoulomb.",
  },
  {
    slug: "altin-ayar",
    category: "altin_ayar",
    title: "Altın Ayar Dönüşümleri",
    description:
      "1 g 22 ayar altında 0,916667 g, 18 ayarda 0,75 g, 14 ayarda 0,583333 g saf altın bulunur; ayarlar arası gram karşılığı.",
  },
  {
    slug: "gumus-ayar",
    category: "gumus_ayar",
    title: "Gümüş Ayar Dönüşümleri",
    description:
      "1 g 925 ayar (sterlin) gümüş 0,925926 g 999 ayara karşılık gelir; 999, 925, 900 ve 800 ayar arası gram dönüşümü.",
  },
  {
    slug: "kan-sekeri",
    category: "kan_sekeri",
    title: "Kan Şekeri (Glukoz) Birim Dönüşümleri",
    description:
      "100 mg/dL kan şekeri = 5,55062 mmol/L; glukoz için mg/dL ile mmol/L arası dönüşüm (1 mmol/L ≈ 18 mg/dL).",
  },
  {
    slug: "vitamin-d",
    category: "vitamin_d",
    title: "Vitamin D Birim Dönüşümleri",
    description:
      "30 ng/mL vitamin D (25-OH) = 74,88 nmol/L; laboratuvar sonuçlarında ng/mL ile nmol/L arası dönüşüm.",
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

/**
 * Başka dildeki kategori sayfasının Türkçe karşılığının adresi. Kaynak alanı
 * bazen sayfa slug'ı ("uzunluk"), bazen kategori anahtarı ("viskozite_dinamik")
 * taşır; Türkçe sayfa yoksa null döner ki 404'e link verilmesin.
 */
export function turkishCategoryHref(sourceSlug: string) {
  const page =
    categoryPages.find((item) => item.slug === sourceSlug) ??
    findCategoryPageByCategory(sourceSlug);

  return page ? `/kategoriler/${page.slug}` : null;
}
