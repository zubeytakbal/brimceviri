import type { CategoryArticle } from "../../categoryArticles";

export const zamanCategoryArticle: CategoryArticle = {
  slug: "zaman",

  introduction: [
    "Zaman, olayların sıralanışını ve aralarındaki süreyi ifade eden temel bir fiziksel büyüklüktür. Uluslararası Birimler Sistemi'nde zamanın temel birimi saniyedir ve günlük hayatta dakika, saat ve gün gibi türetilmiş birimlerle birlikte kullanılır.",

    "Zaman, uzunluk veya kütle gibi büyüklüklerden farklı olarak insanlık tarihinin en eski ölçüm kavramlarından biridir; saat, dakika ve saniyenin 60 tabanlı yapısı binlerce yıl öncesine, antik Babil uygarlığına kadar uzanır.",
  ],

  facts: [
    {
      label: "Fiziksel büyüklük",
      value: "Zaman",
    },
    {
      label: "Boyut sembolü",
      value: "[T]",
    },
    {
      label: "SI temel birimi",
      value: "Saniye",
    },
    {
      label: "SI birim sembolü",
      value: "s",
    },
    {
      label: "Güncel saniye tanımı",
      value: "Sezyum-133 atomunun 9.192.631.770 periyotluk salınımı",
    },
  ],

  sections: [
    {
      title: "Zaman nedir?",
      paragraphs: [
        "Zaman, olayların gerçekleştiği sırayı ve iki olay arasında geçen süreyi ifade eden temel bir büyüklüktür. Fizikte T boyut sembolüyle gösterilir ve hız, ivme, frekans gibi birçok türetilmiş büyüklüğün tanımında yer alır.",
        "Zaman, klasik fizikte tüm gözlemciler için aynı akan mutlak bir büyüklük olarak kabul edilirken, Einstein'ın görelilik kuramıyla birlikte zamanın gözlemcinin hızına ve kütle çekim alanına göre farklı akabileceği (zaman genleşmesi) anlaşılmıştır.",
      ],
    },
    {
      title: "Zamanın SI birimi: saniye",
      paragraphs: [
        "Saniye, zamanın SI temel birimidir ve s sembolüyle gösterilir. Tarihsel olarak saniye, bir günün 1/86.400'ü (24 saat × 60 dakika × 60 saniye) olarak tanımlanıyordu.",
        "Dünya'nın dönüş hızındaki küçük düzensizlikler nedeniyle bu tanım yeterince kararlı bulunmamış; 1967'de saniye, sezyum-133 atomunun temel enerji seviyeleri arasındaki geçişe karşılık gelen ışımanın tam olarak 9.192.631.770 periyodu olarak yeniden tanımlanmıştır. Bu tanım, atomik saatlerin dünyanın her yerinde aynı hassasiyetle çalışmasını sağlar.",
      ],
    },
    {
      title: "Saat, dakika ve saniyenin 60 tabanlı kökeni",
      paragraphs: [
        "Bir saatin 60 dakikaya, bir dakikanın 60 saniyeye bölünmesi, antik Babil uygarlığının kullandığı 60 tabanlı (seksagesimal) sayı sistemine dayanır. Babilliler hem açıyı (360 derece) hem de zamanı bu sistemle bölmüştür.",
        "60 sayısının tercih edilmesinin nedeni, 2, 3, 4, 5, 6, 10, 12, 15, 20 ve 30 gibi birçok sayıya tam bölünebilmesidir -- bu da günlük hesaplamalarda (örneğin bir saati üçe veya dörde bölmek) kesirli sayılara ihtiyaç duymadan pratik bölüşüm yapılmasını kolaylaştırmıştır.",
      ],
    },
    {
      title: "Günün 24 saate bölünmesi",
      paragraphs: [
        "Günün 24 saate bölünmesi, Antik Mısır'a kadar uzanır; Mısırlılar gündüzü 12, geceyi de 12 eşit parçaya bölerek güneş saatleri ve yıldız gözlemleriyle zamanı takip ediyordu.",
        "Bu 12'li bölünme, muhtemelen bir elin parmak boğumlarının (başparmak hariç dört parmakta üçer boğum, toplam 12) sayılmasından ya da Ay'ın yıl içindeki döngü sayısından (yaklaşık 12 dolunay) esinlenmiştir.",
      ],
    },
    {
      title: "Metrik zaman birimleri arasındaki ilişki",
      paragraphs: [
        "Saniyenin alt katları olan milisaniye (0,001 saniye), mikrosaniye ve nanosaniye; bilgisayar işlemcileri, spor zamanlaması ve bilimsel deneyler gibi çok kısa süreli olayların ölçümünde kullanılır.",
        "Üst katları olan dakika (60 saniye), saat (3600 saniye) ve gün (86.400 saniye) ise günlük hayatta zamanı takip etmek için kullanılan temel birimlerdir. Bu birimler arası dönüşüm, sıcaklığın aksine yalnızca çarpma/bölme ile yapılır çünkü hepsi ortak bir sıfır noktasını (başlangıcı) paylaşır.",
      ],
    },
    {
      title: "Artık saniye (leap second) nedir?",
      paragraphs: [
        "Dünya'nın kendi ekseni etrafındaki dönüş hızı, gelgit etkileri ve iç yapısındaki değişimler nedeniyle zamanla küçük düzensizlikler gösterir; bu da atomik saatlerle ölçülen 'kesin' zaman ile Dünya'nın gerçek dönüşüne dayalı gün uzunluğu arasında küçük bir sapmaya yol açar.",
        "Bu sapmayı telafi etmek için 1972'den beri Koordinatlı Evrensel Zaman'a (UTC) gerektiğinde bir 'artık saniye' eklenir. Bu, artık yıldaki fazladan güne (29 Şubat) benzer bir düzeltme mekanizmasıdır, ancak Dünya'nın dönüş hızındaki düzensizlik öngörülemez olduğu için artık saniyeler takvim gibi sabit bir döngüyle değil, ihtiyaç oldukça eklenir.",
      ],
    },
    {
      title: "Zaman dilimleri ve UTC",
      paragraphs: [
        "Dünya, güneşin farklı boylamlarda farklı saatlerde tepe noktasına ulaşması nedeniyle yaklaşık 24 saat diliminde bölünmüştür. Tüm zaman dilimleri, referans noktası olarak Koordinatlı Evrensel Zaman'ı (UTC) kullanır ve kendi bölgesine göre bu referanstan saat farkıyla ifade edilir (örneğin Türkiye UTC+3'tür).",
        "UTC, eski Greenwich Ortalama Zamanı'nın (GMT) yerini almış modern bir zaman standardıdır ve atomik saatlerle sürdürülür; GMT ise artık daha çok Birleşik Krallık'ın kış saatini ifade eden bir zaman dilimi adı olarak kullanılır.",
      ],
    },
    {
      title: "Zaman nasıl ölçülür?",
      paragraphs: [
        "Günlük hayatta mekanik ve dijital saatler kullanılırken, bilimsel ve teknolojik uygulamalarda (GPS uyduları, telekomünikasyon ağları gibi) atomik saatler kullanılır. Atomik saatler, sezyum veya rubidyum atomlarının kararlı salınım frekansına dayanarak son derece yüksek hassasiyetle çalışır.",
        "GPS sisteminin doğru konum belirleyebilmesi için uydulardaki atomik saatlerin nanosaniye düzeyinde senkronize olması gerekir; bu saatlerdeki küçük bir sapma bile yer üzerindeki konum hesabında büyük hatalara yol açabilir.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Milisaniye",
      symbol: "ms",
      referenceValue: "0,001 s",
      system: "SI/metrik",
      commonUse: "Bilgisayar işlemleri ve spor zamanlaması",
    },
    {
      name: "Saniye",
      symbol: "s",
      referenceValue: "1 s",
      system: "SI",
      commonUse: "Temel zaman ölçümü",
    },
    {
      name: "Dakika",
      symbol: "min",
      referenceValue: "60 s",
      system: "SI ile kullanımı kabul edilen",
      commonUse: "Günlük zaman takibi",
    },
    {
      name: "Saat",
      symbol: "h",
      referenceValue: "3600 s",
      system: "SI ile kullanımı kabul edilen",
      commonUse: "Çalışma süresi, seyahat süresi",
    },
    {
      name: "Gün",
      symbol: "day",
      referenceValue: "86.400 s",
      system: "SI ile kullanımı kabul edilen",
      commonUse: "Takvim ve süre hesapları",
    },
  ],
};
