import type { UnitArticle } from "../unitArticles";

export const pascalSaniyeArticle: UnitArticle = {
  slug: "pascal-saniye",

  introduction: [
    "Pascal-saniye (Pa·s), dinamik viskozitenin Uluslararası Birim Sistemi'ndeki türetilmiş birimidir. Bir akışkanın akmaya karşı gösterdiği iç direnci, yani 'kıvamını' bilimsel olarak ifade eder.",

    "Dinamik viskozite, akışkanlar mekaniğinin temel büyüklüklerinden biridir ve Reynolds sayısı hesaplarından boru hattı tasarımına, motor yağı seçiminden gıda üretimine kadar geniş bir uygulama alanına sahiptir.",
  ],

  keyFacts: [
    {
      label: "Sembolü",
      value: "Pa·s",
    },
    {
      label: "Ölçtüğü büyüklük",
      value: "Dinamik viskozite",
    },
    {
      label: "Birim sistemi",
      value: "Uluslararası Birim Sistemi (SI, türetilmiş birim)",
    },
    {
      label: "1 Pa·s",
      value: "1000 santipoise (cP)",
    },
    {
      label: "Suyun viskozitesi (20°C)",
      value: "≈ 0,001 Pa·s (1 cP)",
    },
  ],

  sections: [
    {
      title: "Dinamik viskozite nedir?",
      paragraphs: [
        "Viskozite, bir akışkanın katmanları arasındaki iç sürtünmeyi, yani akışa karşı gösterdiği direnci ifade eder. Yüksek viskoziteli akışkanlar (bal, motor yağı gibi) yavaş akar; düşük viskoziteli akışkanlar (su, benzin gibi) daha kolay akar.",

        "Dinamik viskozite (μ sembolüyle gösterilir), bir akışkan tabakasını hareket ettirmek için gereken kayma gerilmesi ile o hareketin oluşturduğu hız gradyanı arasındaki orandır. Pascal-saniye, bu oranı doğrudan SI birimleriyle ifade eder.",

        "Pascal-saniye, N·s/m² birleşimine eşittir; bu da onu doğrudan basınç (pascal) ve zaman (saniye) birimlerinden türetilmiş bir büyüklük yapar.",
      ],
    },
    {
      title: "Dinamik viskozite neden önemlidir?",
      paragraphs: [
        "Reynolds sayısı (Re = ρ × v × D / μ) formülünde dinamik viskozite doğrudan yer alır ve bir akışın laminer mi yoksa türbülanslı mı olacağını belirleyen kritik parametrelerden biridir. Bu hesap, boru tasarımından uçak kanadı analizine kadar birçok mühendislik probleminde kullanılır.",

        "Motor yağı seçiminde viskozite sınıflandırması (SAE 5W-30 gibi) doğrudan dinamik viskoziteye dayanır; doğru viskozite, motor parçaları arasında yeterli yağlama filmini sağlarken gereksiz sürtünme kaybını önler.",

        "Gıda, kozmetik ve boya endüstrilerinde ürün kıvamının kontrolü, kalite standardizasyonu ve üretim hattı tasarımı için viskozite ölçümü rutin bir kalite kontrol adımıdır.",
      ],
    },
    {
      title: "Pascal-saniye ve santipoise arasındaki ilişki",
      paragraphs: [
        "1 pascal-saniye tam olarak 1000 santipoise'e (cP) eşittir. Santipoise, CGS (santimetre-gram-saniye) sisteminden gelen poise biriminin binde biridir ve endüstride Pa·s'den çok daha sık kullanılır çünkü çoğu günlük sıvının viskozitesi cP cinsinden daha okunabilir sayılarla ifade edilir.",

        "Örneğin suyun 20°C'deki viskozitesi yaklaşık 1 cP'dir (0,001 Pa·s); zeytinyağı yaklaşık 80 cP, bal ise 2000-10000 cP arasında değişebilir. Bu değerler Pa·s cinsinden yazıldığında çok daha küçük ve okunması zor ondalık sayılara dönüşür.",

        "Bu yüzden bilimsel yayınlarda ve SI standardında Pa·s tercih edilirken, endüstriyel veri sayfalarında ve ürün etiketlerinde cP kullanımı yaygındır.",
      ],
    },
    {
      title: "Dinamik viskozite ile kinematik viskozite arasındaki fark",
      paragraphs: [
        "Dinamik viskozite (μ) ile kinematik viskozite (ν) sıkça karıştırılır ancak farklı büyüklüklerdir. Kinematik viskozite, dinamik viskozitenin akışkanın yoğunluğuna bölünmesiyle elde edilir: ν = μ / ρ.",

        "Kinematik viskozitenin SI birimi metrekare/saniyedir (m²/s); santistoke (cSt) ise endüstride yaygın kullanılan pratik birimidir. İki büyüklük arasındaki fark, yoğunluğun hesaba katılıp katılmadığıdır.",

        "Reynolds sayısının klasik formu (Re = ρvD/μ) dinamik viskoziteyi kullanırken, bazı mühendislik hesaplarında kinematik viskozite üzerinden yazılan alternatif form (Re = vD/ν) da kullanılır; ikisi matematiksel olarak eşdeğerdir.",
      ],
    },
  ],

  timeline: [
    {
      year: "1687",
      title: "Newton'ın viskozite yasası",
      description:
        "Isaac Newton, akışkan katmanları arasındaki kayma gerilmesinin hız gradyanıyla orantılı olduğunu öne sürerek Newtonyen akışkanlar kavramının temelini attı.",
    },
    {
      year: "1948",
      title: "Pascal biriminin SI'ye girişi",
      description:
        "Pascal biriminin SI sisteminde kabul edilmesinin ardından, pascal-saniye dinamik viskozitenin resmî türetilmiş SI birimi olarak benimsendi.",
    },
  ],

  questions: [
    {
      question: "1 Pa·s kaç santipoise eder?",
      answer:
        "1 pascal-saniye tam olarak 1000 santipoise'e (cP) eşittir. Pa·s'yi cP'ye çevirmek için değer 1000 ile çarpılır.",
    },
    {
      question: "1 santipoise kaç Pa·s eder?",
      answer:
        "1 santipoise tam olarak 0,001 Pa·s'ye eşittir. cP'yi Pa·s'ye çevirmek için değer 1000'e bölünür.",
    },
    {
      question: "Suyun viskozitesi kaç Pa·s'dir?",
      answer:
        "20°C'deki suyun dinamik viskozitesi yaklaşık 0,001 Pa·s'dir, yani 1 santipoise'e eşittir. Sıcaklık arttıkça bu değer düşer.",
    },
    {
      question: "Dinamik viskozite ile kinematik viskozite arasındaki fark nedir?",
      answer:
        "Dinamik viskozite (Pa·s), akışkanın iç sürtünmesini doğrudan ölçer. Kinematik viskozite (m²/s) ise dinamik viskozitenin akışkan yoğunluğuna bölünmesiyle elde edilir: ν = μ/ρ.",
    },
  ],
};
