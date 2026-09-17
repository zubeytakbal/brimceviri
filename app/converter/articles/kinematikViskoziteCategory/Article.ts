import type { CategoryArticle } from "../../categoryArticles";

export const kinematikViskoziteCategoryArticle: CategoryArticle = {
  slug: "kinematik-viskozite",

  introduction: [
    "Kinematik viskozite, bir akışkanın dinamik viskozitesinin yoğunluğuna oranını ifade eden fiziksel büyüklüktür. Motor yağı sınıflandırmasından akışkanlar mekaniği hesaplarına kadar birçok mühendislik uygulamasında dinamik viskoziteye alternatif olarak kullanılır.",

    "Uluslararası Birimler Sistemi'nde kinematik viskozitenin türetilmiş birimi metrekare/saniyedir (m²/s); ancak petrol ve otomotiv endüstrisinde CGS sisteminden gelen santistok (cSt) çok daha yaygın kullanılır.",
  ],

  facts: [
    {
      label: "Fiziksel büyüklük",
      value: "Kinematik viskozite",
    },
    {
      label: "Boyut sembolü",
      value: "[L²T⁻¹]",
    },
    {
      label: "SI türetilmiş birimi",
      value: "Metrekare/Saniye",
    },
    {
      label: "SI birim sembolü",
      value: "m²/s",
    },
    {
      label: "Temel formül",
      value: "ν = μ / ρ (Dinamik Viskozite / Yoğunluk)",
    },
  ],

  sections: [
    {
      title: "Kinematik viskozite nedir?",
      paragraphs: [
        "Kinematik viskozite (ν, nü), bir akışkanın dinamik viskozitesinin (μ) o akışkanın yoğunluğuna (ρ) bölünmesiyle elde edilir: ν = μ / ρ. Bu, akışkanın 'kendi ağırlığına göre' ne kadar dirençli aktığını ifade eder.",
        "Dinamik viskozite akışkanın iç sürtünmesini doğrudan ölçerken, kinematik viskozite bu direnci akışkanın yoğunluğuyla ilişkilendirir -- bu yüzden akışkanlar mekaniğinde (özellikle Reynolds sayısı hesaplarında) daha doğrudan kullanışlıdır.",
      ],
    },
    {
      title: "Kinematik viskozitenin SI birimi",
      paragraphs: [
        "Metrekare/saniye (m²/s), kinematik viskozitenin SI türetilmiş birimidir; ancak günlük akışkanlar için son derece büyük bir birimdir. Bu yüzden pratikte milimetrekare/saniye (mm²/s) veya santistok (cSt) tercih edilir -- ikisi sayısal olarak birbirine eşittir.",
        "Su gibi düşük viskoziteli bir akışkanın kinematik viskozitesi 20°C'de yaklaşık 1 cSt (0,000001 m²/s) civarındadır; bu, suyun yoğunluğunun yaklaşık 1 g/cm³ olması nedeniyle dinamik viskozitesiyle (yaklaşık 1 cP) aynı sayısal değere denk gelir.",
      ],
    },
    {
      title: "Santistok: petrol ve otomotiv endüstrisinin birimi",
      paragraphs: [
        "Santistok (cSt), CGS sisteminden gelen ve İngiliz fizikçi George Gabriel Stokes'un onuruna adlandırılan 'stok' biriminin yüzde biridir. Motor yağı, hidrolik yağ ve diğer endüstriyel akışkanların viskozite sınıflandırmasında dünya genelinde standart birimdir.",
        "Motor yağı etiketlerinde görülen viskozite değerleri (örneğin 100°C'de kinematik viskozite) genellikle santistok cinsinden verilir ve yağın ilgili SAE viskozite sınıfına (5W-30 gibi) uygun olup olmadığını doğrulamak için kullanılır.",
      ],
    },
    {
      title: "Neden yoğunluğa bölünerek hesaplanır?",
      paragraphs: [
        "İki farklı akışkan aynı dinamik viskoziteye sahip olsa bile, yoğunlukları farklıysa akış davranışları (özellikle yerçekimi etkisindeki akış hızı) farklı olabilir. Kinematik viskozite, bu yoğunluk etkisini hesaba katarak akışkanların 'akışkanlık davranışını' daha adil karşılaştırmayı sağlar.",
        "Bu özellik, özellikle yerçekimiyle akan sistemlerde (örneğin bir viskozimetre içinde akışkanın kendi ağırlığıyla akması) kinematik viskozitenin doğal olarak ölçülen büyüklük olmasının nedenidir.",
      ],
    },
    {
      title: "SAE motor yağı sınıflandırması",
      paragraphs: [
        "SAE (Society of Automotive Engineers) motor yağı sınıflandırma sistemi, yağın hem düşük sıcaklıktaki (soğuk çalıştırma) hem de yüksek sıcaklıktaki (çalışma sıcaklığı, genellikle 100°C) kinematik viskozitesini esas alır.",
        "Örneğin '5W-30' ifadesindeki '5W' yağın soğuk havadaki akışkanlığını (W: Winter/kış), '30' ise 100°C'deki viskozite sınıfını gösterir -- bu sayede bir yağın hem soğuk kalkışta motoru koruyacak kadar akışkan, hem de çalışma sıcaklığında yeterli yağlama filmini koruyacak kadar 'kalın' olması hedeflenir.",
      ],
    },
    {
      title: "Kinematik viskozite nasıl ölçülür?",
      paragraphs: [
        "Kinematik viskozite en yaygın olarak kapiler (Ostwald veya Cannon-Fenske tipi) viskozimetrelerle ölçülür; akışkanın belirli bir dar tüpten yerçekimi etkisiyle akış süresi ölçülerek doğrudan kinematik viskozite hesaplanır.",
        "Dinamik viskozite ayrıca ölçülüp akışkanın yoğunluğuna bölünerek de kinematik viskozite dolaylı olarak elde edilebilir; bu, dönel viskozimetre kullanan laboratuvarlarda tercih edilen bir yöntemdir.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Santistok",
      symbol: "cSt",
      referenceValue: "0,000001 m²/s",
      system: "CGS",
      commonUse: "Motor yağı ve endüstriyel akışkan sınıflandırması",
    },
    {
      name: "Milimetrekare/Saniye",
      symbol: "mm²/s",
      referenceValue: "0,000001 m²/s",
      system: "SI/metrik",
      commonUse: "Bilimsel viskozite ölçümü (cSt ile eşdeğer)",
    },
    {
      name: "Metrekare/Saniye",
      symbol: "m²/s",
      referenceValue: "1 m²/s",
      system: "SI",
      commonUse: "Mühendislik ve akışkanlar mekaniği hesapları",
    },
  ],
};
