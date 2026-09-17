import type { CategoryArticle } from "../../categoryArticles";

export const kapasitansCategoryArticle: CategoryArticle = {
  slug: "kapasitans",

  introduction: [
    "Kapasitans, bir kondansatörün (kapasitör) belirli bir gerilimde ne kadar elektrik yükü depolayabildiğini ifade eden fiziksel büyüklüktür. Elektronik devrelerde enerji depolama, filtreleme ve zamanlamada temel bir rol oynar.",

    "Uluslararası Birimler Sistemi'nde kapasitansın türetilmiş birimi faraddır (F); ancak bir farad günlük elektronik bileşenler için son derece büyük olduğundan pratikte mikrofarad (µF), nanofarad (nF) ve pikofarad (pF) çok daha yaygın kullanılır.",
  ],

  facts: [
    {
      label: "Fiziksel büyüklük",
      value: "Kapasitans (sığa)",
    },
    {
      label: "Boyut sembolü",
      value: "[M⁻¹L⁻²T⁴I²]",
    },
    {
      label: "SI türetilmiş birimi",
      value: "Farad",
    },
    {
      label: "SI birim sembolü",
      value: "F",
    },
    {
      label: "Temel formül",
      value: "C = Q / V (Kapasitans = Yük / Gerilim)",
    },
  ],

  sections: [
    {
      title: "Kapasitans nedir?",
      paragraphs: [
        "Kapasitans, bir kondansatörün (iki iletken plaka arasına yalıtkan bir malzeme yerleştirilerek yapılan devre elemanı) belirli bir gerilim altında depolayabileceği elektrik yükü miktarını ifade eder. Formülü C = Q / V şeklindedir; burada Q depolanan yükü, V ise gerilimi ifade eder.",
        "Kapasitans yalnızca kondansatörün fiziksel özelliklerine (plaka alanı, plakalar arası mesafe, aradaki yalıtkan malzemenin türü) bağlıdır; devredeki gerilim veya yük miktarından bağımsız sabit bir değerdir.",
      ],
    },
    {
      title: "Kapasitansın SI birimi: Farad",
      paragraphs: [
        "Farad, kapasitansın SI türetilmiş birimidir ve F sembolüyle gösterilir; elektromanyetizma alanındaki öncü çalışmalarıyla tanınan İngiliz bilim insanı Michael Faraday'ın onuruna adlandırılmıştır.",
        "1 farad, 1 voltluk gerilim uygulandığında 1 coulomb'luk yük depolayabilen bir kapasitansı ifade eder. Bu, günlük elektronik bileşenler için son derece büyük bir değerdir -- bu yüzden pratik kondansatörler genellikle mikrofarad, nanofarad veya pikofarad seviyesindedir.",
      ],
    },
    {
      title: "Neden pikofarad ve mikrofarad kullanılır?",
      paragraphs: [
        "Standart elektronik devrelerde kullanılan kondansatörlerin çoğu pikofarad (trilyonda bir farad) ile mikrofarad (milyonda bir farad) arasında değerlere sahiptir; bu, farad biriminin pratikte ne kadar büyük olduğunu gösterir.",
        "Örneğin bir radyo devresindeki frekans ayarlama kondansatörü genellikle pikofarad düzeyindeyken, bir güç kaynağındaki filtreleme kondansatörü yüzlerce mikrofarad değerinde olabilir.",
      ],
    },
    {
      title: "Süperkapasitörler: farad seviyesinde depolama",
      paragraphs: [
        "Geleneksel kondansatörlerin aksine, süperkapasitörler (ultrakapasitörler) birkaç farad, hatta binlerce farad seviyesinde kapasitans değerlerine ulaşabilir. Bu, özel elektrot malzemeleri ve çok büyük etkin yüzey alanı kullanılarak sağlanır.",
        "Süperkapasitörler, pillere göre çok daha hızlı şarj/deşarj olabilir ve çok daha uzun ömürlüdür, ancak birim hacimde depolayabildikleri toplam enerji genellikle pillerden azdır -- bu yüzden aküler yerine değil, genellikle onlarla birlikte (ani güç ihtiyaçları için) kullanılırlar.",
      ],
    },
    {
      title: "Paralel plaka kondansatör formülü",
      paragraphs: [
        "En basit kondansatör türü olan paralel plaka kondansatörün kapasitansı C = ε × (A/d) formülüyle hesaplanır; burada ε yalıtkan malzemenin dielektrik geçirgenliği, A plaka alanı, d ise plakalar arası mesafedir.",
        "Bu formül, daha geniş plakaların ve daha ince aralıkların (veya daha yüksek dielektrik sabitli malzemelerin) daha yüksek kapasitans sağladığını gösterir -- bu ilke, kondansatör tasarımının temelini oluşturur.",
      ],
    },
    {
      title: "Kondansatörler devrelerde ne için kullanılır?",
      paragraphs: [
        "Kondansatörler, güç kaynaklarında gerilim dalgalanmalarını yumuşatmak (filtreleme), zamanlama devrelerinde belirli bir sürede şarj/deşarj olarak gecikme oluşturmak ve ses sistemlerinde belirli frekansları geçirip diğerlerini engellemek (filtre devreleri) gibi birçok amaçla kullanılır.",
        "Ayrıca dokunmatik ekranlar, parmağın dokunmasıyla oluşan kapasitans değişikliğini algılayarak çalışır -- bu, kapasitif dokunma teknolojisinin temel çalışma prensibidir.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Pikofarad",
      symbol: "pF",
      referenceValue: "10⁻¹² F",
      system: "SI/metrik",
      commonUse: "Yüksek frekans ve RF devreleri",
    },
    {
      name: "Nanofarad",
      symbol: "nF",
      referenceValue: "10⁻⁹ F",
      system: "SI/metrik",
      commonUse: "Filtre ve zamanlama devreleri",
    },
    {
      name: "Mikrofarad",
      symbol: "µF",
      referenceValue: "10⁻⁶ F",
      system: "SI/metrik",
      commonUse: "Güç kaynağı filtreleme",
    },
    {
      name: "Milifarad",
      symbol: "mF",
      referenceValue: "10⁻³ F",
      system: "SI/metrik",
      commonUse: "Büyük filtreleme kondansatörleri",
    },
    {
      name: "Farad",
      symbol: "F",
      referenceValue: "1 F",
      system: "SI",
      commonUse: "Süperkapasitörler",
    },
  ],
};
