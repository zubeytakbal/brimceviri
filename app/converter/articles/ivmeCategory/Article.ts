import type { CategoryArticle } from "../../categoryArticles";

export const ivmeCategoryArticle: CategoryArticle = {
  slug: "ivme",

  introduction: [
    "İvme, bir cismin hızının birim zamandaki değişim oranını ifade eden türetilmiş fiziksel büyüklüktür. Araç performansından roket fiziğine, deprem ölçümünden yerçekimi araştırmalarına kadar birçok alanda temel bir kavramdır.",

    "Uluslararası Birimler Sistemi'nde ivmenin türetilmiş birimi metre/saniyekaredir (m/s²); günlük hayatta ve mühendislikte yerçekimi ivmesinin katları (g) da yaygın bir referans olarak kullanılır.",
  ],

  facts: [
    {
      label: "Fiziksel büyüklük",
      value: "İvme",
    },
    {
      label: "Boyut sembolü",
      value: "[LT⁻²]",
    },
    {
      label: "SI türetilmiş birimi",
      value: "Metre/Saniyekare",
    },
    {
      label: "SI birim sembolü",
      value: "m/s²",
    },
    {
      label: "Standart yerçekimi ivmesi",
      value: "g = 9,80665 m/s²",
    },
  ],

  sections: [
    {
      title: "İvme nedir?",
      paragraphs: [
        "İvme, bir cismin hızındaki değişimin zamana oranıdır (a = Δv/Δt) ve Newton'un ikinci hareket yasasının (F = m × a) temel bileşenlerinden biridir. Vektörel bir büyüklüktür; hızlanma, yavaşlama veya yön değiştirme durumlarının hepsi ivme olarak tanımlanır.",
        "İvme türetilmiş bir büyüklüktür; hız biriminin (m/s) zamana bölünmesinden elde edilir ve SI boyutu LT⁻² olarak gösterilir.",
      ],
    },
    {
      title: "İvmenin SI birimi",
      paragraphs: [
        "Metre/saniyekare (m/s²), ivmenin SI türetilmiş birimidir ve bir cismin hızının her saniyede kaç metre/saniye değiştiğini ifade eder. Örneğin 5 m/s²'lik bir ivme, cismin hızının her saniyede 5 m/s artması anlamına gelir.",
        "Bu birim, otomotiv performans testlerinden (0-100 km/h hızlanma süresi) roket fırlatma hesaplarına kadar geniş bir yelpazede kullanılır.",
      ],
    },
    {
      title: "Yerçekimi ivmesi (g) ve standart referans",
      paragraphs: [
        "Yerçekimi ivmesi (g), Dünya'nın yüzeyinde serbest düşen bir cismin kazandığı ivmeyi ifade eder ve standart değeri tam olarak 9,80665 m/s² olarak kabul edilir (gerçek değer coğrafi konuma ve rakıma göre çok küçük farklılıklar gösterebilir).",
        "'g' birimi, özellikle havacılık ve uzay mühendisliğinde, pilotların veya astronotların maruz kaldığı ivmeyi ifade etmek için kullanılır -- örneğin '3g'lik bir dönüş', standart yerçekiminin üç katı kadar bir ivmeye maruz kalındığı anlamına gelir.",
      ],
    },
    {
      title: "Gal: yerçekimi ölçümünün birimi",
      paragraphs: [
        "Gal, CGS sisteminden gelen ve İtalyan bilim insanı Galileo Galilei'nin onuruna adlandırılan bir ivme birimidir; 1 gal tam olarak 1 santimetre/saniyekareye (0,01 m/s²) eşittir.",
        "Gal birimi (ve onun binde biri olan miligal), jeofizik ve gravimetride yerel yerçekimi ivmesindeki çok küçük değişiklikleri ölçmek için kullanılır -- bu ölçümler, petrol/mineral arama ve jeolojik yapı analizinde önemli bilgiler sağlar.",
      ],
    },
    {
      title: "Araç performansında ivme",
      paragraphs: [
        "Otomotiv sektöründe araç performansı genellikle '0'dan 100 km/h'ye kaç saniyede ulaşıldığı' şeklinde ifade edilir; bu değer, dolaylı olarak aracın ortalama ivmesini yansıtır (ortalama ivme = hız değişimi / geçen süre).",
        "Yüksek performanslı spor araçlar genellikle 0,3-0,5 g civarında ortalama ivmeye ulaşabilirken, uçaklardaki kalkış ivmesi tipik olarak çok daha düşüktür (yaklaşık 0,3 g); roket fırlatmalarında ise ivme birkaç g'ye kadar çıkabilir.",
      ],
    },
    {
      title: "İvme nasıl ölçülür?",
      paragraphs: [
        "İvme, ivmeölçer (akselerometre) adı verilen sensörlerle ölçülür; bu sensörler günümüzde akıllı telefonlardan araç güvenlik sistemlerine (hava yastığı tetikleme), deprem izleme istasyonlarından uzay araçlarına kadar birçok cihazda kullanılır.",
        "Modern MEMS (mikro-elektro-mekanik sistem) tabanlı ivmeölçerler, çok küçük boyutlarda üretilebilir ve son derece hassas ölçüm yapabilir; bu teknoloji, akıllı telefonların ekran döndürme ve adım sayma özelliklerinin de temelini oluşturur.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Milimetre/Saniyekare",
      symbol: "mm/s²",
      referenceValue: "0,001 m/s²",
      system: "SI/metrik",
      commonUse: "Hassas titreşim ve sismik ölçüm",
    },
    {
      name: "Gal",
      symbol: "gal",
      referenceValue: "0,01 m/s²",
      system: "CGS",
      commonUse: "Jeofizik ve gravimetri",
    },
    {
      name: "Santimetre/Saniyekare",
      symbol: "cm/s²",
      referenceValue: "0,01 m/s²",
      system: "SI/metrik",
      commonUse: "Bilimsel ölçümler",
    },
    {
      name: "Metre/Saniyekare",
      symbol: "m/s²",
      referenceValue: "1 m/s²",
      system: "SI",
      commonUse: "Genel fizik ve mühendislik hesapları",
    },
    {
      name: "Yerçekimi İvmesi",
      symbol: "g0",
      referenceValue: "9,80665 m/s²",
      system: "Standart referans",
      commonUse: "Havacılık, uzay ve araç performansı",
    },
  ],
};
