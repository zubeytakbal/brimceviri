// Gokcismi karsilastirma sayfalari icin elle secilmis, gercek merak/arama
// konusu ~25 cift. materialComparisons.ts ile ayni disiplin: tum 18
// gokcisminin ikili kombinasyonu (~153 sayfa) yerine, "Jupiter Dunya'dan
// kac kat buyuk", "Pluton Ay'dan kucuk mu" gibi gercekten sorulan cocuklari
// kapsayan dar bir set. Veri zaten var olan celestialBodiesDatabase'den
// geliyor, sifir yeni arastirma riski.

import { findCelestialBodyById } from "./celestialBodiesHub";
import type { CelestialBodyEntry } from "./celestialBodiesDatabase";

export type CelestialBodyComparisonDefinition = {
  slug: string;
  firstId: string;
  secondId: string;
  context: string;
};

export const celestialBodyComparisonDefinitions: CelestialBodyComparisonDefinition[] =
  [
    {
      slug: "dunya-ay-karsilastirma",
      firstId: "dunya",
      secondId: "ay",
      context:
        "İnsanlığın ayak bastığı tek gök cismi olan Ay, Dünya'nın doğal uydusu ve en yakın gök komşumuzdur.",
    },
    {
      slug: "dunya-mars-karsilastirma",
      firstId: "dunya",
      secondId: "mars",
      context:
        "Mars, boyut ve yapı olarak Dünya'ya en çok benzeyen gezegenlerden biri olduğu için kolonileşme tartışmalarının merkezindedir.",
    },
    {
      slug: "dunya-jupiter-karsilastirma",
      firstId: "dunya",
      secondId: "jupiter",
      context:
        "Güneş Sistemi'nin en büyük gezegeni Jüpiter ile Dünya arasındaki devasa boyut farkını gösterir.",
    },
    {
      slug: "dunya-venus-karsilastirma",
      firstId: "dunya",
      secondId: "venus",
      context:
        "Venüs, boyut ve kütle olarak Dünya'ya en yakın gezegen olduğu için 'kız kardeş gezegen' olarak anılır; ancak yüzey sıcaklığı çok farklıdır.",
    },
    {
      slug: "dunya-saturn-karsilastirma",
      firstId: "dunya",
      secondId: "saturn",
      context:
        "Halkalarıyla tanınan gaz devi Satürn ile Dünya arasındaki boyut farkını gösterir.",
    },
    {
      slug: "dunya-neptun-karsilastirma",
      firstId: "dunya",
      secondId: "neptun",
      context:
        "Güneş Sistemi'nin Güneş'e en uzak gezegeni Neptün ile Dünya arasındaki karşılaştırmadır.",
    },
    {
      slug: "dunya-uranus-karsilastirma",
      firstId: "dunya",
      secondId: "uranus",
      context:
        "Ekseni yan yatık olmasıyla bilinen buz devi Uranüs ile Dünya arasındaki boyut farkını gösterir.",
    },
    {
      slug: "dunya-pluton-karsilastirma",
      firstId: "dunya",
      secondId: "pluton",
      context:
        "2006'da gezegen statüsünü kaybedip cüce gezegen ilan edilen Plüton'un Dünya'ya kıyasla ne kadar küçük olduğunu gösterir.",
    },
    {
      slug: "dunya-merkur-karsilastirma",
      firstId: "dunya",
      secondId: "merkur",
      context:
        "Güneş Sistemi'nin en küçük ve Güneş'e en yakın gezegeni Merkür ile Dünya arasındaki karşılaştırmadır.",
    },
    {
      slug: "jupiter-saturn-karsilastirma",
      firstId: "jupiter",
      secondId: "saturn",
      context:
        "Güneş Sistemi'nin iki gaz devi arasındaki boyut ve kütle farkını gösterir.",
    },
    {
      slug: "uranus-neptun-karsilastirma",
      firstId: "uranus",
      secondId: "neptun",
      context:
        "Birbirine çok benzeyen iki 'buz devi' gezegen arasındaki ince farkları gösterir.",
    },
    {
      slug: "merkur-ay-karsilastirma",
      firstId: "merkur",
      secondId: "ay",
      context:
        "İkisi de atmosfersiz, kraterli yüzeye sahip küçük gök cisimleri olduğu için sık karşılaştırılır.",
    },
    {
      slug: "mars-ay-karsilastirma",
      firstId: "mars",
      secondId: "ay",
      context:
        "Uzay kolonileşme tartışmalarında sıkça karşılaştırılan iki potansiyel insanlı görev hedefidir.",
    },
    {
      slug: "pluton-ay-karsilastirma",
      firstId: "pluton",
      secondId: "ay",
      context:
        "Plüton'un gezegenlikten çıkarılmasının ardından en çok sorulan sorulardan biri 'Plüton Ay'dan küçük mü?' sorusudur — cevap evettir.",
    },
    {
      slug: "pluton-ceres-karsilastirma",
      firstId: "pluton",
      secondId: "ceres",
      context:
        "Güneş Sistemi'nin iki cüce gezegeni arasındaki boyut farkını gösterir; Ceres aynı zamanda Mars-Jüpiter arasındaki asteroit kuşağının en büyük üyesidir.",
    },
    {
      slug: "pluton-eris-karsilastirma",
      firstId: "pluton",
      secondId: "eris",
      context:
        "Eris'in 2005'te keşfedilmesi ve Plüton'a yakın büyüklükte olduğunun anlaşılması, 2006'da Plüton'un gezegen statüsünü kaybetmesinin doğrudan nedenidir.",
    },
    {
      slug: "ganymede-merkur-karsilastirma",
      firstId: "ganymede",
      secondId: "merkur",
      context:
        "Jüpiter'in uydusu Ganymede, Güneş Sistemi'nin en büyük uydusudur ve çapı bakımından Merkür gezegeninden bile büyüktür.",
    },
    {
      slug: "ganymede-ay-karsilastirma",
      firstId: "ganymede",
      secondId: "ay",
      context:
        "Güneş Sistemi'nin en büyük uydusu Ganymede ile Dünya'nın uydusu Ay arasındaki boyut farkını gösterir.",
    },
    {
      slug: "titan-merkur-karsilastirma",
      firstId: "titan",
      secondId: "merkur",
      context:
        "Satürn'ün en büyük uydusu Titan, Ganymede gibi, çapı bakımından Merkür gezegeninden daha büyüktür ve Güneş Sistemi'ndeki tek yoğun atmosfere sahip uydudur.",
    },
    {
      slug: "titan-ay-karsilastirma",
      firstId: "titan",
      secondId: "ay",
      context:
        "Güneş Sistemi'ndeki tek yoğun atmosfere sahip uydu olan Titan ile Ay arasındaki karşılaştırmadır.",
    },
    {
      slug: "io-ay-karsilastirma",
      firstId: "io",
      secondId: "ay",
      context:
        "Güneş Sistemi'nin en volkanik gök cismi olan Io ile Ay arasında boyutça yakın ama yapıca çok farklı iki uydunun karşılaştırmasıdır.",
    },
    {
      slug: "europa-ay-karsilastirma",
      firstId: "europa",
      secondId: "ay",
      context:
        "Buzlu yüzeyinin altında sıvı okyanus barındırdığı düşünülen Europa, yaşam arayışında en çok merak edilen uydulardan biridir.",
    },
    {
      slug: "callisto-ay-karsilastirma",
      firstId: "callisto",
      secondId: "ay",
      context:
        "Güneş Sistemi'nin en çok kraterlenmiş yüzeylerinden birine sahip Callisto ile Ay arasındaki karşılaştırmadır.",
    },
    {
      slug: "triton-ay-karsilastirma",
      firstId: "triton",
      secondId: "ay",
      context:
        "Neptün'ün etrafında gezegeninin dönüş yönüne ters yönde dolanan nadir uydulardan Triton ile Ay arasındaki karşılaştırmadır.",
    },
    {
      slug: "merkur-mars-karsilastirma",
      firstId: "merkur",
      secondId: "mars",
      context:
        "Güneş Sistemi'nin en küçük iki gezegeni arasındaki boyut ve kütle farkını gösterir.",
    },
  ];

export type CelestialBodyComparisonResult = {
  slug: string;
  context: string;
  first: CelestialBodyEntry;
  second: CelestialBodyEntry;
  diameterRatio: number;
  massRatio: number;
  largerId: string;
};

export function getCelestialBodyComparison(
  slug: string
): CelestialBodyComparisonResult | undefined {
  const definition = celestialBodyComparisonDefinitions.find(
    (item) => item.slug === slug
  );

  if (!definition) {
    return undefined;
  }

  const first = findCelestialBodyById(definition.firstId);
  const second = findCelestialBodyById(definition.secondId);

  if (!first || !second) {
    return undefined;
  }

  const diameterRatio =
    first.diameterKm >= second.diameterKm
      ? first.diameterKm / second.diameterKm
      : second.diameterKm / first.diameterKm;

  const massRatio =
    first.massKg >= second.massKg
      ? first.massKg / second.massKg
      : second.massKg / first.massKg;

  const largerId =
    first.diameterKm >= second.diameterKm ? first.id : second.id;

  return {
    slug: definition.slug,
    context: definition.context,
    first,
    second,
    diameterRatio,
    massRatio,
    largerId,
  };
}

export function getAllCelestialBodyComparisons(): CelestialBodyComparisonResult[] {
  return celestialBodyComparisonDefinitions
    .map((definition) => getCelestialBodyComparison(definition.slug))
    .filter(
      (item): item is CelestialBodyComparisonResult => item !== undefined
    );
}
