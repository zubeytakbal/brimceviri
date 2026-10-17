import type { CategoryArticle } from "../../categoryArticles";

// 1 rem = 0,01 Sv (NIST SP 811 Ek B). Işınım ağırlık faktörü X ve gama ışınları için 1 (ICRP Yayın 103, 2007).
// Doğal arka plan için dünya ortalaması ≈ 2,4 mSv/yıl (UNSCEAR 2008 Raporu, Ek B).
export const radyasyonDozuCategoryArticle: CategoryArticle = {
  slug: "radyasyon-dozu",

  introduction: [
    "Radyasyon dozu, iyonlaştırıcı radyasyonun insan vücudunda yarattığı etkinin ölçüsüdür. Eşdeğer ve etkin doz SI'da sievert (Sv) ile ölçülür; 1 Sv, dokunun kilogramı başına 1 joule enerjinin radyasyon türüne göre ağırlıklandırılmış karşılığıdır.",
    "Sievert büyük bir birim olduğu için günlük hayatta milisievert (mSv) ve mikrosievert (µSv) kullanılır. ABD'de hâlâ görülen eski birim rem ise tam olarak 0,01 Sv'ye eşittir: 1 rem = 10 mSv.",
  ],

  facts: [
    { label: "SI birimi", value: "Sievert (Sv = J/kg)" },
    { label: "1 Sv", value: "1.000 mSv = 1.000.000 µSv" },
    { label: "1 rem", value: "0,01 Sv = 10 mSv" },
    { label: "Doğal arka plan (dünya ortalaması)", value: "≈ 2,4 mSv/yıl (UNSCEAR)" },
    { label: "Soğurulan doz birimi", value: "Gray (Gy); X ve gama ışınında 1 Gy → 1 Sv" },
  ],

  sections: [
    {
      title: "Sievert ile gray arasındaki fark",
      paragraphs: [
        "Gray (Gy) soğurulan dozdur: dokuya aktarılan enerji, J/kg. Sievert ise bu enerjinin radyasyon türüne göre ağırlıklandırılmış halidir. ICRP'nin 103 sayılı yayınına göre X ve gama ışınları ile elektronlar için ağırlık faktörü 1'dir, bu yüzden 1 Gy'lik X ışını dozu 1 Sv'lik eşdeğer doza karşılık gelir.",
        "Alfa parçacıklarında bu faktör 20'dir; aynı 1 Gy, 20 Sv eşdeğer doz demektir. Bu nedenle Gy ile Sv arasında radyasyon türünü bilmeden çevrim yapılmaz; bu sayfadaki dönüşümler yalnızca Sv ve rem gibi aynı büyüklüğün birimleri arasındadır.",
      ],
    },
    {
      title: "µSv/saat ölçümü yıllık doza nasıl çevrilir?",
      paragraphs: [
        "Dozimetreler çoğunlukla doz hızı gösterir: mikrosievert/saat (µSv/h). Bu bir hızdır; toplam doza geçmek için süreyle çarpılır. Bir yılda 8.760 saat olduğu için sürekli 0,1 µSv/h'lik bir ortamda bir yılda 0,1 × 8.760 = 876 µSv, yani yaklaşık 0,88 mSv doz alınır.",
        "UNSCEAR'ın raporuna göre insanların doğal kaynaklardan (kozmik ışınlar, toprak, radon ve vücuttaki doğal izotoplar) aldığı yıllık etkin doz dünya ortalamasında yaklaşık 2,4 mSv'dir; bu değer bölgeye göre birkaç kat değişebilir.",
      ],
    },
    {
      title: "Hangi birim nerede kullanılır?",
      paragraphs: [
        "Türkiye dahil SI kullanan ülkelerde tıbbi görüntüleme, iş sağlığı ve çevre ölçüm raporlarında mSv ve µSv kullanılır. ABD'deki eski kaynaklarda ve bazı cihazlarda rem ve mrem görülür: 100 mrem = 1 mSv.",
        "Bu sayfa birim dönüşümü içindir; bir dozun sağlık açısından değerlendirmesi için ilgili hekim ya da radyasyon güvenliği uzmanına başvurulmalıdır.",
      ],
    },
  ],

  unitTable: [
    { name: "Sievert", symbol: "Sv", referenceValue: "1 J/kg (ağırlıklı)", system: "SI", commonUse: "Yüksek doz, bilimsel yayınlar" },
    { name: "Milisievert", symbol: "mSv", referenceValue: "0,001 Sv", system: "SI", commonUse: "Tıbbi görüntüleme, yıllık doz" },
    { name: "Mikrosievert", symbol: "µSv", referenceValue: "0,001 mSv", system: "SI", commonUse: "Dozimetre, çevre ölçümü" },
    { name: "Nanosievert", symbol: "nSv", referenceValue: "0,001 µSv", system: "SI", commonUse: "Çok düşük doz hızları" },
    { name: "Rem", symbol: "rem", referenceValue: "0,01 Sv", system: "Eski birim (ABD)", commonUse: "Eski kaynaklar, ABD mevzuatı" },
    { name: "Milirem", symbol: "mrem", referenceValue: "0,01 mSv", system: "Eski birim (ABD)", commonUse: "Eski dozimetre ölçümleri" },
  ],
};
