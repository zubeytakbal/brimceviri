import type { CategoryArticle } from "../../categoryArticles";

export const viskoziteCategoryArticle: CategoryArticle = {
  slug: "viskozite",

  introduction: [
    "Viskozite (dinamik viskozite), bir akışkanın akmaya karşı gösterdiği direnci ifade eden fiziksel büyüklüktür. Bal gibi 'kalın' akışkanların su gibi 'ince' akışkanlardan neden daha yavaş aktığını bu büyüklük açıklar.",

    "Uluslararası Birimler Sistemi'nde dinamik viskozitenin türetilmiş birimi Pascal-saniyedir (Pa·s); ancak endüstride ve motor yağı sınıflandırmasında CGS sisteminden gelen poise (P) ve özellikle santipoise (cP) çok daha yaygın kullanılır.",
  ],

  facts: [
    {
      label: "Fiziksel büyüklük",
      value: "Dinamik viskozite",
    },
    {
      label: "Boyut sembolü",
      value: "[ML⁻¹T⁻¹]",
    },
    {
      label: "SI türetilmiş birimi",
      value: "Pascal-saniye",
    },
    {
      label: "SI birim sembolü",
      value: "Pa·s",
    },
    {
      label: "Suyun viskozitesi (20°C)",
      value: "≈1 santipoise (cP) = 0,001 Pa·s",
    },
  ],

  sections: [
    {
      title: "Viskozite nedir?",
      paragraphs: [
        "Viskozite, bir akışkanın (sıvı veya gaz) iç sürtünmesini, yani akışa karşı gösterdiği direnci ifade eder. Yüksek viskoziteli bir akışkan (bal gibi) yavaş akarken, düşük viskoziteli bir akışkan (su gibi) daha kolay akar.",
        "Dinamik viskozite genellikle μ (mü) sembolüyle gösterilir ve akışkanlar mekaniğinde, boru hattı tasarımından motor yağı seçimine kadar birçok mühendislik hesabının temelini oluşturur.",
      ],
    },
    {
      title: "Viskozitenin SI birimi: Pascal-saniye",
      paragraphs: [
        "Pascal-saniye (Pa·s), dinamik viskozitenin SI türetilmiş birimidir. Bir akışkanın viskozitesinin 1 Pa·s olması, belirli standart koşullarda akışkan katmanları arasında oluşan kayma gerilimi ile kayma hızı oranının 1 olduğu anlamına gelir.",
        "Pa·s günlük hayatta karşılaşılan çoğu akışkan için (su, hava gibi) oldukça büyük bir birimdir; bu yüzden pratikte milipaskal-saniye (mPa·s) tercih edilir. Faydalı bir eşitlik: 1 mPa·s tam olarak 1 santipoise'e (cP) eşittir.",
      ],
    },
    {
      title: "Poise ve santipoise: endüstrinin tercih ettiği birimler",
      paragraphs: [
        "Poise (P), CGS (santimetre-gram-saniye) birim sisteminden gelen bir viskozite birimidir ve Fransız fizyolog Jean Léonard Marie Poiseuille'nin onuruna adlandırılmıştır. 1 poise, 0,1 Pa·s'ye eşittir.",
        "Santipoise (cP), bir poise'ün yüzde biridir ve pratikte en yaygın kullanılan viskozite birimidir çünkü suyun 20°C'deki viskozitesi yaklaşık olarak tam 1 santipoise'dir -- bu da onu sezgisel bir referans noktası hâline getirir.",
      ],
    },
    {
      title: "Günlük hayattan viskozite örnekleri",
      paragraphs: [
        "Su, 20°C'de yaklaşık 1 cP viskoziteye sahipken, zeytinyağı yaklaşık 80 cP, bal ise sıcaklığa bağlı olarak 2000-10.000 cP arasında değişen çok daha yüksek bir viskoziteye sahiptir.",
        "Motor yağları ise tipik olarak 50-300 cP arasında değişir; ancak motor yağının viskozitesi sıcaklıkla önemli ölçüde değiştiği için (soğukken daha yoğun, sıcakken daha akışkan) tek bir sabit değer yerine SAE sınıflandırma sistemi (5W-30, 10W-40 gibi) kullanılır.",
      ],
    },
    {
      title: "Viskozite sıcaklıkla nasıl değişir?",
      paragraphs: [
        "Sıvılarda viskozite, sıcaklık arttıkça genellikle azalır -- moleküller arası bağlar zayıflar ve akışkan daha kolay akar. Bu yüzden soğuk bal kaşıktan zor akarken, ısıtılmış bal çok daha kolay akar.",
        "Gazlarda ise durum tam tersidir: sıcaklık arttıkça viskozite artar, çünkü gaz moleküllerinin daha hızlı hareketi moleküller arası çarpışmaları ve dolayısıyla iç sürtünmeyi artırır.",
      ],
    },
    {
      title: "Viskozite ve Reynolds sayısı ilişkisi",
      paragraphs: [
        "Dinamik viskozite, bir akışın laminer (düzenli, katmanlı) mi yoksa türbülanslı (düzensiz, karışık) mı olacağını belirleyen Reynolds sayısı formülünün doğrudan bir bileşenidir (Re = ρvD/μ).",
        "Yüksek viskoziteli akışkanlar (bal gibi) düşük Reynolds sayısına ve dolayısıyla daha kolay laminer akışa sahipken, düşük viskoziteli akışkanlar (hava gibi) aynı koşullarda daha kolay türbülansa geçebilir.",
      ],
    },
    {
      title: "Viskozite nasıl ölçülür?",
      paragraphs: [
        "Viskozimetreler (viskometre), bir akışkanın viskozitesini ölçmek için kullanılan cihazlardır. Yaygın türleri arasında kapiler (dar tüp içinden akış süresini ölçen), dönel (bir mili akışkan içinde döndürerek direnci ölçen) ve düşen bilye tipi viskozimetreler bulunur.",
        "Endüstride motor yağı ve gıda ürünlerinin kalite kontrolünde viskozite ölçümü, ürünün beklenen performans veya doku özelliklerini karşıladığını doğrulamak için rutin olarak yapılır.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Santipoise",
      symbol: "cP",
      referenceValue: "0,001 Pa·s",
      system: "CGS",
      commonUse: "Su, yağ ve gıda viskozitesi",
    },
    {
      name: "Milipaskal-saniye",
      symbol: "mPa·s",
      referenceValue: "0,001 Pa·s",
      system: "SI/metrik",
      commonUse: "Bilimsel viskozite ölçümü (cP ile eşdeğer)",
    },
    {
      name: "Poise",
      symbol: "P",
      referenceValue: "0,1 Pa·s",
      system: "CGS",
      commonUse: "Endüstriyel akışkan sınıflandırması",
    },
    {
      name: "Pascal-saniye",
      symbol: "Pa·s",
      referenceValue: "1 Pa·s",
      system: "SI",
      commonUse: "Mühendislik ve bilimsel hesaplamalar",
    },
  ],
};
