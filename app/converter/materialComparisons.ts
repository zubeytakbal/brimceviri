// Malzeme karsilastirma sayfalari icin elle secilmis, gercek arama talebi
// olan ~32 cift. Tum 105 malzemenin ikili kombinasyonu (~5460 sayfa)
// yerine bilincli olarak dar tutuldu -- amac gercekten "X mi Y mi daha
// agir/yogun" diye aranan pratik/merak konusu ciftleri kapsamak, rastgele
// kombinasyon uretmek degil. Veri kaynagi zaten var olan materialsDatabase
// (siFactor gibi sifir yeni arastirma riski), sadece iki kaydi karsilastiriyoruz.

import {
  findMaterialProfileById,
  type MaterialProfile,
} from "./materialsHub";

export type MaterialComparisonDefinition = {
  slug: string;
  firstId: string;
  secondId: string;
  // Kullanicinin gercekten merak ettigi pratik baglam -- neden bu ikisi
  // karsilastiriliyor (malzeme secimi, gunluk merak, mutfak bilimi vb.)
  context: string;
};

export const materialComparisonDefinitions: MaterialComparisonDefinition[] = [
  {
    slug: "aluminyum-celik-karsilastirma",
    firstId: "aluminyum",
    secondId: "celik",
    context:
      "Otomotiv ve havacılık sektöründe hafiflik (yakıt tasarrufu) ile dayanım arasındaki mühendislik tercihinin temelini oluşturur.",
  },
  {
    slug: "bakir-aluminyum-karsilastirma",
    firstId: "bakir",
    secondId: "aluminyum",
    context:
      "Elektrik kablolamasında iletkenlik, ağırlık ve maliyet dengesi nedeniyle sürekli karşılaştırılan iki iletken metaldir.",
  },
  {
    slug: "altin-gumus-karsilastirma",
    firstId: "altin",
    secondId: "gumus",
    context:
      "Kuyumculuk ve yatırım amaçlı değerli metal tercihinde en sık karşılaştırılan ikilidir.",
  },
  {
    slug: "celik-demir-karsilastirma",
    firstId: "celik",
    secondId: "demir",
    context:
      "Çelik, demire karbon eklenerek üretilen bir alaşımdır; ikisi arasındaki yoğunluk farkı çok küçük olsa da metalurjide temel bir karşılaştırmadır.",
  },
  {
    slug: "paslanmaz-celik-celik-karsilastirma",
    firstId: "paslanmaz-celik",
    secondId: "celik",
    context:
      "Mutfak eşyası ve inşaat malzemesi seçiminde paslanmazlık ile maliyet arasındaki tercihi yansıtır.",
  },
  {
    slug: "cam-akrilik-karsilastirma",
    firstId: "cam",
    secondId: "akrilik",
    context:
      "Pencere, vitrin ve akvaryum imalatında kırılganlık, ağırlık ve şeffaflık dengesi nedeniyle karşılaştırılır.",
  },
  {
    slug: "cam-agaci-mese-agaci-karsilastirma",
    firstId: "cam-agaci",
    secondId: "mese-agaci",
    context:
      "Mobilya ve yapı marangozluğunda yumuşak ahşap (çam) ile sert ahşap (meşe) arasındaki klasik dayanıklılık/maliyet tercihidir.",
  },
  {
    slug: "beton-tugla-karsilastirma",
    firstId: "beton",
    secondId: "tugla",
    context:
      "İnşaat sektöründe duvar ve taşıyıcı sistem malzemesi seçiminde sıkça karşılaştırılan iki temel yapı malzemesidir.",
  },
  {
    slug: "su-zeytinyagi-karsilastirma",
    firstId: "su",
    secondId: "zeytinyagi",
    context:
      "Zeytinyağının su üzerinde neden yüzdüğünü açıklayan, mutfakta gözlemlenebilen klasik bir yoğunluk farkı örneğidir.",
  },
  {
    slug: "su-deniz-suyu-karsilastirma",
    firstId: "su",
    secondId: "deniz-suyu",
    context:
      "Yüzme ve gemi taşımacılığında kaldırma kuvvetini etkileyen, tuz oranından kaynaklanan yoğunluk farkını gösterir.",
  },
  {
    slug: "altin-platin-karsilastirma",
    firstId: "altin",
    secondId: "platin",
    context:
      "Kuyumculukta ve yatırımda karşılaştırılan iki değerli metal arasındaki belirgin yoğunluk farkını gösterir.",
  },
  {
    slug: "titanyum-aluminyum-karsilastirma",
    firstId: "titanyum",
    secondId: "aluminyum",
    context:
      "Havacılık, uzay ve spor ekipmanı üretiminde hafiflik ile dayanım arasındaki mühendislik tercihini yansıtır.",
  },
  {
    slug: "balsa-mese-agaci-karsilastirma",
    firstId: "balsa",
    secondId: "mese-agaci",
    context:
      "Maket yapımında (balsa) ile mobilyacılıkta (meşe) kullanılan en hafif ve en yoğun yaygın ahşaplar arasındaki farkı gösterir.",
  },
  {
    slug: "kursun-demir-karsilastirma",
    firstId: "kursun",
    secondId: "demir",
    context:
      "Radyasyon kalkanlama ve ağırlık (dalgıç kemeri, balans ağırlığı) uygulamalarında tercih edilen yoğun metaller arasındaki farkı gösterir.",
  },
  {
    slug: "civa-su-karsilastirma",
    firstId: "civa",
    secondId: "su",
    context:
      "Barometre ve termometre biliminin temelini oluşturan, cıvanın sudan çok daha yoğun olmasına dayanan klasik bir fizik örneğidir.",
  },
  {
    slug: "granit-mermer-karsilastirma",
    firstId: "granit",
    secondId: "mermer",
    context:
      "Mutfak tezgahı ve zemin kaplama seçiminde en sık karşılaştırılan iki doğal taştır.",
  },
  {
    slug: "pirinc-alasim-bakir-karsilastirma",
    firstId: "pirinc-alasim",
    secondId: "bakir",
    context:
      "Müzik aleti (pirinç üflemeli çalgılar) ve dekoratif eşya üretiminde saf bakır ile alaşımı arasındaki farkı gösterir.",
  },
  {
    slug: "bronz-pirinc-alasim-karsilastirma",
    firstId: "bronz",
    secondId: "pirinc-alasim",
    context:
      "Heykel dökümü ve dekoratif metal işçiliğinde en sık karşılaştırılan iki bakır alaşımıdır.",
  },
  {
    slug: "pvc-pet-plastik-karsilastirma",
    firstId: "pvc",
    secondId: "pet",
    context:
      "Ambalaj ve boru üretiminde kullanılan iki yaygın plastik türü arasındaki yoğunluk farkını gösterir.",
  },
  {
    slug: "hdpe-ldpe-karsilastirma",
    firstId: "hdpe",
    secondId: "ldpe",
    context:
      "Plastik ambalaj ve boru seçiminde yüksek ve alçak yoğunluklu polietilen arasındaki farkı belirler.",
  },
  {
    slug: "tungsten-altin-karsilastirma",
    firstId: "tungsten",
    secondId: "altin",
    context:
      "Tungsten ve altının neredeyse aynı yoğunlukta olması, tarihte sahte altın külçesi dolandırıcılıklarında tungsten kullanılmasının nedenidir.",
  },
  {
    slug: "beton-granit-karsilastirma",
    firstId: "beton",
    secondId: "granit",
    context:
      "Ağır inşaat ve peyzaj uygulamalarında dökme yapı malzemesi ile doğal taş arasındaki yoğunluk farkını gösterir.",
  },
  {
    slug: "nikel-bakir-karsilastirma",
    firstId: "nikel",
    secondId: "bakir",
    context:
      "Madeni para alaşımlarında (nikel-bakır) ve kaplama sektöründe sıkça karşılaştırılan iki metaldir.",
  },
  {
    slug: "motor-yagi-su-karsilastirma",
    firstId: "motor-yagi",
    secondId: "su",
    context:
      "Motorlarda yağ ve suyun karışmamasının ve motor yağının suya göre daha hafif olmasının nedenini gösterir.",
  },
  {
    slug: "bal-su-karsilastirma",
    firstId: "bal",
    secondId: "su",
    context:
      "Mutfakta katmanlı sıvı gösterilerinde (yoğunluk kulesi) ve bal saflığı testlerinde referans alınan klasik bir karşılaştırmadır.",
  },
  {
    slug: "kavak-mese-agaci-karsilastirma",
    firstId: "kavak",
    secondId: "mese-agaci",
    context:
      "Hafif mobilya ve kontrplak üretiminde (kavak) ile dayanıklı mobilyada (meşe) kullanılan ahşaplar arasındaki farkı gösterir.",
  },
  {
    slug: "kirectasi-mermer-karsilastirma",
    firstId: "kirectasi",
    secondId: "mermer",
    context:
      "Jeolojik olarak birbirine dönüşebilen bu iki taş, inşaat ve heykelcilikte farklı yoğunluk ve dayanım özellikleriyle tercih edilir.",
  },
  {
    slug: "antifriz-su-karsilastirma",
    firstId: "antifriz",
    secondId: "su",
    context:
      "Araç soğutma sisteminde kullanılan antifriz-su karışım oranının neden önemli olduğunu, yoğunluk farkı üzerinden açıklar.",
  },
  {
    slug: "uranyum-kursun-karsilastirma",
    firstId: "uranyum",
    secondId: "kursun",
    context:
      "Radyasyon kalkanlama malzemesi seçiminde, doğada bilinen en yoğun elementlerden biriyle geleneksel kalkanlama metali arasındaki farkı gösterir.",
  },
  {
    slug: "altin-kursun-karsilastirma",
    firstId: "altin",
    secondId: "kursun",
    context:
      "'Hangisi daha ağır' merakının en sık sorulduğu klasik yoğunluk karşılaştırmalarından biridir.",
  },
  {
    slug: "zeytinyagi-bitkisel-yag-karsilastirma",
    firstId: "zeytinyagi",
    secondId: "bitkisel-yag",
    context:
      "Mutfakta kullanılan iki yaygın yağ türü arasındaki hafif yoğunluk farkını gösterir.",
  },
  {
    slug: "asfalt-beton-karsilastirma",
    firstId: "asfalt",
    secondId: "beton",
    context:
      "Yol yapımında zemin kaplama malzemesi seçiminde karşılaştırılan iki temel yapı malzemesidir.",
  },
];

export type MaterialComparisonResult = {
  slug: string;
  context: string;
  first: MaterialProfile;
  second: MaterialProfile;
  densityRatio: number;
  denserId: string;
};

export function getMaterialComparison(
  slug: string
): MaterialComparisonResult | undefined {
  const definition = materialComparisonDefinitions.find(
    (item) => item.slug === slug
  );

  if (!definition) {
    return undefined;
  }

  const first = findMaterialProfileById(definition.firstId);
  const second = findMaterialProfileById(definition.secondId);

  if (!first || !second) {
    return undefined;
  }

  const densityRatio =
    first.densityKgM3 >= second.densityKgM3
      ? first.densityKgM3 / second.densityKgM3
      : second.densityKgM3 / first.densityKgM3;

  const denserId =
    first.densityKgM3 >= second.densityKgM3
      ? first.densityKgM3 === second.densityKgM3
        ? "esit"
        : first.id
      : second.id;

  return {
    slug: definition.slug,
    context: definition.context,
    first,
    second,
    densityRatio,
    denserId,
  };
}

export function getAllMaterialComparisons(): MaterialComparisonResult[] {
  return materialComparisonDefinitions
    .map((definition) => getMaterialComparison(definition.slug))
    .filter(
      (item): item is MaterialComparisonResult => item !== undefined
    );
}
