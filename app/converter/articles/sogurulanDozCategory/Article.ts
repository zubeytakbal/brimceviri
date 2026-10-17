import type { CategoryArticle } from "../../categoryArticles";

// 1 Gy = 1 J/kg; 1 rad = 0,01 Gy; 1 erg/g = 10⁻⁴ Gy (NIST SP 811 Ek B). Işınım ağırlık faktörleri: ICRP Yayın 103.
export const sogurulanDozCategoryArticle: CategoryArticle = {
  slug: "sogurulan-doz",
  introduction: [
    "Soğurulan doz, iyonlaştırıcı radyasyonun bir maddenin kilogramına bıraktığı enerjidir. SI birimi gray'dir (Gy): 1 Gy, kilogram başına 1 joule enerji demektir.",
    "Eski birim rad tam olarak 0,01 Gy'ye eşittir; bu yüzden 1 cGy = 1 rad olur. Radyoterapi planlarında hâlâ santigray (cGy) ve rad birlikte görülebilir.",
  ],
  facts: [
    { label: "SI birimi", value: "Gray (Gy = J/kg)" },
    { label: "1 Gy", value: "100 rad = 1.000 mGy" },
    { label: "1 rad", value: "0,01 Gy = 1 cGy" },
    { label: "1 erg/g", value: "0,0001 Gy" },
    { label: "Eşdeğer doz ile ilişki", value: "Sv = Gy × ışınım ağırlık faktörü" },
  ],
  sections: [
    {
      title: "Gray ile sievert neden farklı?",
      paragraphs: [
        "Gray yalnızca bırakılan enerjiyi ölçer. Aynı enerji, radyasyonun türüne göre dokuda farklı etki yaratır; bu etkiyi hesaba katmak için gray, ışınım ağırlık faktörüyle çarpılarak sievert'e geçilir. ICRP'ye göre bu faktör X ve gama ışınları için 1, alfa parçacıkları için 20'dir.",
        "Bu yüzden 1 Gy'lik X ışını 1 Sv'ye karşılık gelirken, 1 Gy'lik alfa ışınımı 20 Sv'dir. Radyasyon türü belli olmadan gray ile sievert arasında çevrim yapılmaz; bu sayfa yalnızca soğurulan doz birimleri arasındadır.",
      ],
    },
    {
      title: "Gray ve rad nasıl çevrilir?",
      paragraphs: [
        "Gray'den rad'a geçmek için 100 ile çarpılır: 2 Gy = 200 rad. Rad'dan gray'e geçmek için 100'e bölünür: 50 rad = 0,5 Gy. Santigray ile rad birebir aynıdır: 180 cGy = 180 rad.",
        "Gıda ışınlama ve tıbbi malzeme sterilizasyonunda dozlar çok büyük olduğu için kilogray (kGy) kullanılır; 1 kGy = 1.000 Gy = 100 krad.",
      ],
    },
  ],
  unitTable: [
    { name: "Gray", symbol: "Gy", referenceValue: "1 J/kg", system: "SI", commonUse: "Radyoterapi, dozimetri" },
    { name: "Santigray", symbol: "cGy", referenceValue: "0,01 Gy = 1 rad", system: "SI", commonUse: "Radyoterapi planları" },
    { name: "Miligray", symbol: "mGy", referenceValue: "0,001 Gy", system: "SI", commonUse: "Tıbbi görüntüleme dozları" },
    { name: "Kilogray", symbol: "kGy", referenceValue: "1.000 Gy", system: "SI", commonUse: "Gıda ışınlama, sterilizasyon" },
    { name: "Rad", symbol: "rad", referenceValue: "0,01 Gy", system: "Eski birim", commonUse: "Eski kaynaklar, ABD" },
    { name: "Erg/gram", symbol: "erg/g", referenceValue: "0,0001 Gy", system: "CGS", commonUse: "Eski bilimsel yayınlar" },
  ],
};
