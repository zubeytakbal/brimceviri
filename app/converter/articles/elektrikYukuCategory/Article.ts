import type { CategoryArticle } from "../../categoryArticles";

export const elektrikYukuCategoryArticle: CategoryArticle = {
  slug: "elektrik-yuku",

  introduction: [
    "Elektrik yükü, parçacıkların veya cisimlerin elektromanyetik etkileşime girmesini sağlayan temel bir fiziksel özelliktir. Bataryalardan statik elektriğe, elektroliz işlemlerinden parçacık fiziğine kadar birçok alanda temel bir büyüklüktür.",

    "Uluslararası Birimler Sistemi'nde elektrik yükünün türetilmiş birimi coulomb'dur (C). Günlük elektronik uygulamalarda genellikle milicoulomb (mC), mikrocoulomb (µC) ve nanocoulomb (nC) gibi çok daha küçük değerler kullanılır.",
  ],

  facts: [
    {
      label: "Fiziksel büyüklük",
      value: "Elektrik yükü",
    },
    {
      label: "Boyut sembolü",
      value: "[TI]",
    },
    {
      label: "SI türetilmiş birimi",
      value: "Coulomb",
    },
    {
      label: "SI birim sembolü",
      value: "C",
    },
    {
      label: "Temel yük (elektron/proton)",
      value: "e ≈ 1,602176634 × 10⁻¹⁹ C",
    },
  ],

  sections: [
    {
      title: "Elektrik yükü nedir?",
      paragraphs: [
        "Elektrik yükü, parçacıkların elektromanyetik kuvvet aracılığıyla birbirini itmesine veya çekmesine neden olan temel bir özelliktir. Yük iki türde bulunur: pozitif (protonlarda) ve negatif (elektronlarda); aynı işaretli yükler birbirini iter, zıt işaretli yükler birbirini çeker.",
        "Elektrik yükü, 2019 SI revizyonundan bu yana temel yükün (e) tam olarak sabitlenmiş sayısal değerine dayanarak tanımlanır; bu da coulomb biriminin artık dolaylı bir ölçüme değil, evrensel bir sabite bağlı olmasını sağlar.",
      ],
    },
    {
      title: "Elektrik yükünün SI birimi: Coulomb",
      paragraphs: [
        "Coulomb, elektrik yükünün SI türetilmiş birimidir ve C sembolüyle gösterilir; Fransız fizikçi Charles-Augustin de Coulomb'un onuruna adlandırılmıştır. Bir coulomb, yaklaşık 6,242 × 10¹⁸ elektronun taşıdığı toplam yüke eşittir.",
        "Coulomb, akım (amper) ile zamanın (saniye) çarpımından da elde edilebilir: Q = I × t. Bu ilişki, elektrik yükü ile elektrik akımı arasındaki doğrudan bağlantıyı gösterir -- 1 amperlik bir akım 1 saniye boyunca aktığında, tam olarak 1 coulomb'luk yük taşınmış olur.",
      ],
    },
    {
      title: "Temel yük: evrenin en küçük yük birimi",
      paragraphs: [
        "Bir elektronun veya protonun taşıdığı yük büyüklüğü (işaret farkı dışında), evrende gözlemlenen en küçük yük birimidir ve 'temel yük' (e) olarak adlandırılır; değeri yaklaşık 1,602176634 × 10⁻¹⁹ coulomb'dur.",
        "Doğada gözlemlenen tüm serbest yükler, bu temel yükün tam sayı katları şeklindedir (kuarklar gibi bazı temel parçacıklar kesirli yük taşısa da, serbest hâlde gözlemlenmezler) -- bu özelliğe yükün 'kuantumlanması' denir.",
      ],
    },
    {
      title: "Batarya kapasitesi ve amper-saat",
      paragraphs: [
        "Piller ve akülerin kapasitesi genellikle coulomb yerine amper-saat (Ah) veya miliamper-saat (mAh) cinsinden ifade edilir; bu, günlük kullanım için daha sezgisel bir birimdir. 1 amper-saat tam olarak 3600 coulomb'a eşittir.",
        "Bir telefon pilinin '4000 mAh' kapasiteye sahip olması, pilin 1 amperlik bir akımı teorik olarak 4 saat boyunca sağlayabileceği (ya da 4000 miliamperi 1 saat boyunca) anlamına gelir -- gerçek kullanım süresi cihazın çektiği akıma bağlı olarak değişir.",
      ],
    },
    {
      title: "Statik elektrik ve yük birikimi",
      paragraphs: [
        "Statik elektrik, iki farklı malzemenin birbirine sürtünmesi sonucu elektronların bir yüzeyden diğerine geçmesiyle oluşan yük dengesizliğidir; bu, kışın kapı koluna dokunulduğunda hissedilen küçük elektrik çarpmasının nedenidir.",
        "Statik elektrik yükleri genellikle mikrocoulomb veya nanocoulomb seviyesinde küçük olsa da, çok yüksek gerilimlere (bazen binlerce volt) karşılık gelebilir çünkü kapasitans çok düşüktür (V = Q/C ilişkisi gereği).",
      ],
    },
    {
      title: "Elektrik yükünün korunumu",
      paragraphs: [
        "Elektrik yükünün korunumu, fizikte en temel korunum yasalarından biridir: kapalı bir sistemdeki toplam elektrik yükü sabit kalır, yaratılamaz veya yok edilemez, yalnızca bir yerden diğerine transfer edilebilir.",
        "Bu ilke, elektrokimyasal reaksiyonlardan (piller, elektroliz) parçacık fiziğindeki çarpışma deneylerine kadar birçok alanda hesaplamaların temelini oluşturur.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Nanocoulomb",
      symbol: "nC",
      referenceValue: "10⁻⁹ C",
      system: "SI/metrik",
      commonUse: "Statik elektrik ölçümü",
    },
    {
      name: "Mikrocoulomb",
      symbol: "µC",
      referenceValue: "10⁻⁶ C",
      system: "SI/metrik",
      commonUse: "Kondansatör yük hesapları",
    },
    {
      name: "Milicoulomb",
      symbol: "mC",
      referenceValue: "10⁻³ C",
      system: "SI/metrik",
      commonUse: "Elektronik devre yük hesapları",
    },
    {
      name: "Coulomb",
      symbol: "C",
      referenceValue: "1 C",
      system: "SI",
      commonUse: "Genel elektrik yükü hesaplamaları",
    },
  ],
};
