import type { CategoryArticle } from "../../categoryArticles";

export const frekansCategoryArticle: CategoryArticle = {
  slug: "frekans",

  introduction: [
    "Frekans, bir olayın veya salınımın birim zamanda kaç kez tekrarlandığını ifade eden türetilmiş bir fiziksel büyüklüktür. Ses dalgalarından radyo iletişimine, elektrik şebekesinden bilgisayar işlemcilerine kadar birçok alanda temel bir kavramdır.",

    "Uluslararası Birimler Sistemi'nde frekansın türetilmiş birimi hertzdir (Hz). Günlük hayatta kilohertz (kHz) ses ve radyo frekanslarında, megahertz (MHz) radyo yayınlarında, gigahertz (GHz) ise Wi-Fi ve bilgisayar işlemci hızlarında sıkça karşımıza çıkar.",
  ],

  facts: [
    {
      label: "Fiziksel büyüklük",
      value: "Frekans",
    },
    {
      label: "Boyut sembolü",
      value: "[T⁻¹]",
    },
    {
      label: "SI türetilmiş birimi",
      value: "Hertz",
    },
    {
      label: "SI birim sembolü",
      value: "Hz",
    },
    {
      label: "İnsan işitme aralığı",
      value: "≈20 Hz - 20.000 Hz (20 kHz)",
    },
  ],

  sections: [
    {
      title: "Frekans nedir?",
      paragraphs: [
        "Frekans, bir periyodik olayın (salınım, dalga, dönme gibi) birim zamanda kaç kez tekrarlandığını ifade eder ve f sembolüyle gösterilir. Frekans, periyodun (bir tekrarın tamamlanma süresi) tersine eşittir: f = 1/T.",
        "Frekans türetilmiş bir büyüklüktür; SI boyutu T⁻¹ (zamanın tersi) olarak gösterilir. Bu, frekansın 'saniyede kaç kez' sorusuna verdiği doğrudan cevaptan kaynaklanır.",
      ],
    },
    {
      title: "Frekansın SI birimi: hertz",
      paragraphs: [
        "Hertz, frekansın SI türetilmiş birimidir ve Hz sembolüyle gösterilir; Alman fizikçi Heinrich Hertz'in elektromanyetik dalgaları deneysel olarak kanıtlaması onuruna adlandırılmıştır. Bir hertz, saniyede bir tam döngü/salınım anlamına gelir.",
        "Örneğin 50 Hz'lik bir alternatif akım, saniyede 50 kez yön değiştirir; 440 Hz'lik bir ses dalgası (müzikte standart 'La' notası) saniyede 440 kez titreşir.",
      ],
    },
    {
      title: "Ses ve işitme frekansları",
      paragraphs: [
        "İnsan kulağı tipik olarak 20 Hz ile 20.000 Hz (20 kHz) arasındaki ses frekanslarını algılayabilir; bu aralığın altındaki sesler infrases, üstündeki sesler ise ultrases olarak adlandırılır ve insan kulağı tarafından duyulamaz.",
        "Müzikte standart akort referansı olan 'La' (A4) notası 440 Hz'dir. Farklı müzik enstrümanları ve insan sesi, bu temel frekansın çeşitli katları ve kombinasyonlarıyla farklı tınılar üretir.",
      ],
    },
    {
      title: "Elektrik şebekesi frekansı",
      paragraphs: [
        "Türkiye ve Avrupa'nın çoğunda elektrik şebekesi 50 Hz frekansla çalışırken, ABD ve bazı diğer ülkelerde 60 Hz standarttır. Bu frekans, alternatif akımın saniyede kaç kez yön değiştirdiğini ifade eder.",
        "Şebeke frekansındaki bu fark, bazı elektrikli cihazların (özellikle motor içeren, saat mekanizması gibi frekansa duyarlı cihazlar) bir ülkeden diğerine taşınırken düzgün çalışmama riskini beraberinde getirir.",
      ],
    },
    {
      title: "Radyo dalgaları ve kablosuz iletişim",
      paragraphs: [
        "Radyo ve televizyon yayınları megahertz (MHz) düzeyinde frekanslar kullanır (örneğin FM radyo 88-108 MHz aralığında yayın yapar). Wi-Fi ağları ise genellikle 2,4 GHz ve 5 GHz bantlarında çalışır.",
        "Daha yüksek frekans, genellikle daha fazla veri taşıma kapasitesi (bant genişliği) sağlar ama menzil ve duvar/engel geçirgenliği açısından dezavantajlıdır -- bu yüzden 5 GHz Wi-Fi daha hızlı ama daha kısa menzillidir, 2,4 GHz ise daha yavaş ama daha uzağa ve engellerin arkasına ulaşabilir.",
      ],
    },
    {
      title: "İşlemci hızı ve gigahertz",
      paragraphs: [
        "Bilgisayar işlemcilerinin (CPU) hızı genellikle gigahertz (GHz) cinsinden ifade edilir; bu, işlemcinin saniyede kaç milyar 'saat darbesi' (clock cycle) üretebildiğini gösterir.",
        "Ancak işlemci performansı yalnızca saat hızına bağlı değildir -- çekirdek sayısı, mimari verimliliği ve önbellek boyutu gibi faktörler de son performansı belirler; bu yüzden daha yüksek GHz değeri her zaman daha hızlı bir işlemci anlamına gelmez.",
      ],
    },
    {
      title: "Frekans ve dalga boyu ilişkisi",
      paragraphs: [
        "Frekans, dalga boyuyla ters orantılıdır: bir dalganın hızı sabitse (örneğin ışık veya ses için belirli bir ortamda), frekans arttıkça dalga boyu kısalır. İlişki f × λ = v formülüyle ifade edilir (f: frekans, λ: dalga boyu, v: dalga hızı).",
        "Bu ilişki, elektromanyetik spektrumun neden yüksek frekanslı (kısa dalga boylu) X-ışınlarından düşük frekanslı (uzun dalga boylu) radyo dalgalarına kadar geniş bir aralığı kapsadığını açıklar.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Hertz",
      symbol: "Hz",
      referenceValue: "1 Hz",
      system: "SI",
      commonUse: "Temel frekans ölçümü, şebeke frekansı",
    },
    {
      name: "Kilohertz",
      symbol: "kHz",
      referenceValue: "1000 Hz",
      system: "SI/metrik",
      commonUse: "Ses frekansları ve AM radyo",
    },
    {
      name: "Megahertz",
      symbol: "MHz",
      referenceValue: "1.000.000 Hz",
      system: "SI/metrik",
      commonUse: "FM radyo ve televizyon yayınları",
    },
    {
      name: "Gigahertz",
      symbol: "GHz",
      referenceValue: "1.000.000.000 Hz",
      system: "SI/metrik",
      commonUse: "Wi-Fi, bilgisayar işlemcileri, 4G/5G",
    },
  ],
};
