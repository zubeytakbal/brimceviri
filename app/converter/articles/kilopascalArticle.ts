import type { UnitArticle } from "../unitArticles";

export const kilopascalArticle: UnitArticle = {
  slug: "kilopascal",

  introduction: [
    "Kilopascal (kPa), pascalın 1000 katına eşit, resmî bir SI ön ekli birimdir. Pascal günlük mühendislik basınçları için çoğu zaman aşırı küçük kaldığından, kilopascal pratikte pascaldan daha sık tercih edilir.",

    "Kilopascal, jeoteknik mühendislikten HVAC sistemlerine, yapısal yük hesaplarından tıbbi ölçümlere kadar geniş bir alanda, okunabilir ve saha ölçeğine uygun bir basınç birimi olarak kullanılır.",
  ],

  keyFacts: [
    {
      label: "Sembolü",
      value: "kPa",
    },
    {
      label: "1 kilopascal",
      value: "1000 Pa (kesin, SI ön eki)",
    },
    {
      label: "1 kilopascal",
      value: "≈ 0,00987 atm",
    },
    {
      label: "1 kilopascal",
      value: "≈ 0,145038 psi",
    },
    {
      label: "Birim sistemi",
      value: "Uluslararası Birim Sistemi (SI, kat birim)",
    },
  ],

  sections: [
    {
      title: "Kilopascal nedir ve neden tercih edilir?",
      paragraphs: [
        "Kilopascal, 'kilo' SI ön ekinin pascala uygulanmasıyla oluşur ve tam olarak 1000 pascala eşittir. SI ön ek sistemi sayesinde kilopascal ile pascal arasındaki dönüşüm, virgülü üç basamak kaydırmak kadar basittir.",

        "Pascal, günlük mühendislik basınçlarını ifade etmek için genellikle çok küçük bir birimdir; örneğin standart atmosfer basıncı 101 325 Pa gibi kalabalık bir sayıyla ifade edilir. Aynı değer kilopascal cinsinden yaklaşık 101,325 kPa olarak çok daha okunabilir hâle gelir.",

        "Bu okunabilirlik avantajı, kilopascalın mühendislik raporlarında, teknik veri sayfalarında ve saha ölçümlerinde pascaldan çok daha sık görülmesinin temel nedenidir.",
      ],
    },
    {
      title: "Kilopascal hangi mühendislik alanlarında standarttır?",
      paragraphs: [
        "Jeoteknik mühendislikte zemin taşıma kapasitesi, konsolidasyon basıncı ve gerilme değerleri neredeyse her zaman kilopascal cinsinden raporlanır; tipik zemin taşıma kapasiteleri birkaç yüz kilopascal mertebesindedir.",

        "Yapı mühendisliğinde rüzgâr yükü ve kar yükü gibi dağıtılmış yükler kilopascal cinsinden ifade edilir. HVAC sistemlerinde ise kanal statik basıncı ve fan performans eğrileri genellikle pascal ile kilopascal arasında, uygulamanın ölçeğine göre seçilen birimlerle gösterilir.",

        "SI birimlerinin standart olduğu ülkelerde tıbbi ölçümlerde de kilopascal kullanılır; örneğin kan gazı analizlerinde parsiyel basınçlar (oksijen ve karbondioksit basıncı gibi) kilopascal cinsinden raporlanabilir.",
      ],
    },
    {
      title: "Pascal ön ek ailesi: hPa, kPa, MPa ne zaman kullanılır?",
      paragraphs: [
        "Pascal ailesindeki ön ekli birimler, ölçülen basıncın büyüklüğüne göre seçilir. Hektopascal (hPa, 100 Pa) meteorolojide atmosfer basıncını ifade etmek için tercih edilir; bu değer sayısal olarak eski milibar birimiyle birebir aynıdır.",

        "Kilopascal (kPa, 1000 Pa) günlük mühendislik basınçları, zemin mekaniği ve HVAC için uygun bir ölçektedir. Megapascal (MPa, 1 000 000 Pa) ise malzeme gerilmesi, elastisite modülü ve yüksek basınçlı hidrolik sistemler gibi çok daha büyük değerler için kullanılır.",

        "Doğru ön ekin seçilmesi, sayının okunabilirliğini artırır ve gereksiz sayıda sıfırdan kaçınılmasını sağlar. Aynı fiziksel basınç değeri, bağlama göre hPa, kPa veya MPa cinsinden ifade edilebilir; hangisinin kullanıldığı yalnızca pratiklik meselesidir.",
      ],
    },
    {
      title: "Kilopascal ve diğer basınç birimleri",
      paragraphs: [
        "1 kilopascal tam olarak 0,01 bar'a eşittir; bu da kilopascal ile bar arasındaki dönüşümü son derece basit kılar. 1 kilopascal ayrıca yaklaşık 0,00987 standart atmosfere eşittir.",

        "PSI cinsinden 1 kilopascal yaklaşık 0,145038 psi'ye, milimetre cıva cinsinden ise yaklaşık 7,50062 mmHg'ye eşittir. Bu değerler, kilopascalın pascal cinsinden kesin tanımından türetilir.",

        "Kilopascal ile diğer birimler arasında dönüşüm yaparken, kilopascalın zaten pascalın kesin bir katı olduğu unutulmamalıdır; bu nedenle dönüşüm hassasiyeti doğrudan pascal cinsinden yapılan hesaplamalarla aynıdır.",
      ],
    },
    {
      title: "Kilopascal ile ilgili yaygın karışıklıklar",
      paragraphs: [
        "Kilopascal (kPa) ile kilogram-kuvvet/santimetrekare (kgf/cm²) bazen karıştırılır; oysa bu iki birim farklı büyüklüklere sahiptir. 1 kgf/cm² yaklaşık 98,0665 kPa'ya eşittir, yani sayısal olarak yaklaşık 100 kat farklıdır.",

        "Lastik basıncı etiketlerinde kPa, bar ve psi değerleri bazen aynı anda gösterilir; yanlış birimin okunması ciddi basınç hatalarına yol açabilir. Örneğin 200 kPa ile 200 psi arasında yaklaşık 14 kat fark vardır.",

        "Gösterge ve mutlak basınç ayrımı kilopascal için de geçerlidir; bir cihazın 'kPa' cinsinden verdiği değerin gösterge mi yoksa mutlak basınç mı olduğu teknik dokümanlarda ayrıca belirtilmelidir.",
      ],
    },
  ],

  timeline: [
    {
      year: "1960",
      title: "SI ön ek sisteminin resmîleşmesi",
      description:
        "11. CGPM, kilo dahil standart SI ön eklerini içeren Uluslararası Birim Sistemi'ni (SI) resmî olarak kabul etti; bu sistem daha sonra 1971'de pascal birimine de uygulandı.",
    },
  ],

  questions: [
    {
      question: "1 kilopascal kaç Pascal'dır?",
      answer:
        "1 kilopascal tam olarak 1000 Pa'a eşittir. Bu, SI ön ek sisteminin tanımı gereği kesin bir değerdir.",
    },
    {
      question: "1 kilopascal kaç bar eder?",
      answer:
        "1 kilopascal tam olarak 0,01 bar'a eşittir. Kilopascalı bara çevirmek için değer 100'e bölünür.",
    },
    {
      question: "1 kilopascal kaç PSI eder?",
      answer:
        "1 kilopascal yaklaşık 0,145038 psi'ye eşittir. Kilopascalı psi'ye çevirmek için değer yaklaşık 0,145038 ile çarpılır.",
    },
    {
      question:
        "Neden bazı basınç değerleri Pascal yerine kilopascal ile gösterilir?",
      answer:
        "Pascal, günlük mühendislik basınçları için genellikle çok küçük bir birimdir ve kalabalık sayılara yol açar. Kilopascal, aynı değerleri daha az basamaklı ve daha okunabilir sayılarla ifade etmeyi sağlar.",
    },
  ],
};
