import type { UnitArticle } from "../unitArticles";

export const newtonArticle: UnitArticle = {
  slug: "newton",

  introduction: [
    "Newton (N), Uluslararası Birim Sistemi'nde kuvvetin türetilmiş birimidir. 1 kilogram kütleye 1 metre/saniyekare ivme kazandıran kuvvet olarak tanımlanır ve İngiliz fizikçi Isaac Newton'ın adını taşır.",

    "Newton, mekanikten yapı mühendisliğine, malzeme testlerinden günlük fizik hesaplamalarına kadar kuvvetin ifade edildiği hemen her bilimsel ve teknik alanda kullanılan standart birimdir.",
  ],

  keyFacts: [
    {
      label: "Sembolü",
      value: "N",
    },
    {
      label: "Ölçtüğü büyüklük",
      value: "Kuvvet",
    },
    {
      label: "Birim sistemi",
      value: "Uluslararası Birim Sistemi (SI, türetilmiş birim)",
    },
    {
      label: "1 newton",
      value: "1 kg·m/s²",
    },
    {
      label: "1 newton",
      value: "≈ 0,101972 kgf",
    },
  ],

  sections: [
    {
      title: "Newton nedir?",
      paragraphs: [
        "Newton, Newton'ın ikinci hareket yasasından (F = m × a) doğrudan türetilir: 1 kilogram kütleye 1 metre/saniyekare ivme kazandırmak için gereken kuvvet, tanım gereği 1 newtondur.",

        "Newton, SI'nin temel birimlerinden (kilogram, metre, saniye) türetildiği için ayrı bir fiziksel standarda ihtiyaç duymaz; tanımı doğrudan kütle, uzunluk ve zaman birimlerine dayanır.",

        "Günlük hayatta 1 newton oldukça küçük bir kuvvettir — yaklaşık 102 gramlık bir elmanın yeryüzünde uyguladığı ağırlığa yakındır. Bu yüzden mühendislik uygulamalarında sıklıkla kilonewton (kN) tercih edilir.",
      ],
    },
    {
      title: "Newton neden önemlidir?",
      paragraphs: [
        "Kuvvet, fizikteki en temel büyüklüklerden biridir ve hareketin, dengenin ve gerilmenin analizinde merkezi rol oynar. Bir yapının taşıyacağı yük, bir cismin ivmesi veya bir malzemenin kopma dayanımı hep newton cinsinden ifade edilir.",

        "Basınç, tork ve enerji gibi birçok türetilmiş büyüklük doğrudan newton üzerinden tanımlanır: basınç kuvvetin alana bölünmesiyle (N/m² = Pa), enerji ise kuvvetin mesafeyle çarpımıyla (N·m = J) elde edilir.",

        "Yapı mühendisliğinde rüzgâr yükü, deprem kuvveti ve statik yükler kilonewton cinsinden hesaplanır; otomotiv ve malzeme testlerinde ise çekme ve basma kuvvetleri genellikle newton veya kilonewton ile raporlanır.",
      ],
    },
    {
      title: "Newton ve diğer kuvvet birimleri",
      paragraphs: [
        "1 newton yaklaşık 0,101972 kilogram-kuvvete (kgf) eşittir; kgf, SI öncesi mühendislik pratiğinde yaygın kullanılan ve yerçekimi ivmesine dayanan geleneksel bir birimdir. Ters yönde, 1 kgf tam olarak 9,80665 newtona eşittir.",

        "CGS sisteminde kuvvet birimi dyn'dir ve 1 newton tam olarak 100.000 dyne eşittir. İngiliz ölçü sisteminde ise pound-force (lbf) kullanılır; 1 newton yaklaşık 0,224809 lbf'ye karşılık gelir.",

        "Bu farklı birimler arasında dönüşüm yaparken, hangisinin kütleye (kg, lb) hangisinin kuvvete (N, kgf, lbf) karşılık geldiğine dikkat edilmesi önemlidir — bu ikisi günlük dilde sıkça karıştırılır.",
      ],
    },
    {
      title: "Newton ile kütle-kuvvet karışıklığı",
      paragraphs: [
        "Günlük dilde 'kilogram' hem kütle hem de ağırlık (kuvvet) anlamında kullanılabilir; bu bilimsel olarak hatalıdır. Kütle, bir cismin madde miktarını ifade eder ve kilogram (kg) ile ölçülür; ağırlık ise yerçekiminin o kütleye uyguladığı kuvvettir ve newton (N) ile ifade edilir.",

        "Bir cismin ağırlığı, kütlesi ile yerçekimi ivmesinin (yaklaşık 9,80665 m/s²) çarpımına eşittir. Örneğin 1 kilogramlık bir cismin Dünya'daki ağırlığı yaklaşık 9,80665 newtondur.",

        "Bu ayrım özellikle uzay mühendisliği ve fizik hesaplamalarında kritik önem taşır; çünkü bir cismin kütlesi her yerde aynı kalırken ağırlığı (kuvveti) bulunduğu yerin yerçekimine göre değişir.",
      ],
    },
  ],

  timeline: [
    {
      year: "1687",
      title: "Newton'ın hareket yasaları",
      description:
        "Isaac Newton, Philosophiæ Naturalis Principia Mathematica adlı eserinde kuvvet, kütle ve ivme arasındaki ilişkiyi tanımlayan hareket yasalarını yayımladı.",
    },
    {
      year: "1946",
      title: "Newton biriminin önerilmesi",
      description:
        "Uluslararası Ağırlıklar ve Ölçüler Komitesi (CIPM), MKS (metre-kilogram-saniye) sistemi için kuvvet birimine 'newton' adının verilmesini önerdi.",
    },
    {
      year: "1948",
      title: "Resmî SI birimi olarak kabul",
      description:
        "9. Uluslararası Ağırlıklar ve Ölçüler Genel Konferansı (CGPM), newtonu kuvvetin resmî türetilmiş SI birimi olarak kabul etti.",
    },
  ],

  questions: [
    {
      question: "1 newton kaç kilogram-kuvvet eder?",
      answer:
        "1 newton yaklaşık 0,101972 kilogram-kuvvete (kgf) eşittir. Newtonu kgf'ye çevirmek için değer 9,80665'e bölünür.",
    },
    {
      question: "1 kilogram-kuvvet kaç newton eder?",
      answer:
        "1 kilogram-kuvvet tam olarak 9,80665 newtona eşittir. Bu değer, standart yerçekimi ivmesinden (9,80665 m/s²) doğrudan türetilir.",
    },
    {
      question: "Newton ile kilogram aynı şey midir?",
      answer:
        "Hayır. Kilogram kütle birimidir, newton ise kuvvet (ağırlık) birimidir. Bir cismin ağırlığı, kütlesinin yerçekimi ivmesiyle çarpımına eşittir ve newton cinsinden ifade edilir.",
    },
    {
      question: "Newton hangi formülle tanımlanır?",
      answer:
        "Newton, F = m × a formülüyle tanımlanır. 1 newton, 1 kilogram kütleye 1 metre/saniyekare ivme kazandıran kuvvete eşittir (1 N = 1 kg·m/s²).",
    },
  ],
};
