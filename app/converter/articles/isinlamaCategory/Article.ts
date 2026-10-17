import type { CategoryArticle } from "../../categoryArticles";

// 1 R = 2,58·10⁻⁴ C/kg (tanım, NIST SP 811 Ek B).
export const isinlamaCategoryArticle: CategoryArticle = {
  slug: "isinlama",
  introduction: [
    "Işınlama (maruz kalma), X ve gama ışınlarının havada oluşturduğu iyonlaşmanın ölçüsüdür: havanın kilogramında oluşan elektrik yükü. SI birimi coulomb/kilogram'dır (C/kg).",
    "Eski ve hâlâ yaygın birim röntgen (R) tam olarak 2,58 × 10⁻⁴ C/kg'dır. Bazı dozimetre ve Geiger sayaçları sonucu mR/h ya da µR/h olarak gösterir.",
  ],
  facts: [
    { label: "SI birimi", value: "Coulomb/kilogram (C/kg)" },
    { label: "1 R", value: "2,58 × 10⁻⁴ C/kg = 0,258 mC/kg" },
    { label: "1 mR", value: "0,258 µC/kg" },
    { label: "Geçerli olduğu ışınlar", value: "X ve gama ışınları, havada" },
    { label: "Doz ile ilişkisi", value: "Yaklaşık 1 R ≈ 8,7 mGy (havada)" },
  ],
  sections: [
    {
      title: "Röntgen ile sievert aynı şey mi?",
      paragraphs: [
        "Hayır. Röntgen havadaki iyonlaşmayı, sievert ise vücuttaki biyolojik etkiyi ölçer. X ve gama ışınları için pratikte 1 R yaklaşık 10 mSv (1 rem) kabul edilir; bu bir yaklaşım olduğu için bu sayfada röntgen ile sievert arasında doğrudan dönüşüm verilmez.",
        "Röntgen'den C/kg'a geçmek kesindir: değer 2,58 × 10⁻⁴ ile çarpılır. 50 mR = 50 × 2,58 × 10⁻⁷ = 1,29 × 10⁻⁵ C/kg.",
      ],
    },
  ],
  unitTable: [
    { name: "Coulomb/kilogram", symbol: "C/kg", referenceValue: "1 C/kg", system: "SI", commonUse: "Bilimsel kaynaklar" },
    { name: "Röntgen", symbol: "R", referenceValue: "2,58 × 10⁻⁴ C/kg", system: "Eski birim", commonUse: "Dozimetreler, eski kaynaklar" },
    { name: "Miliröntgen", symbol: "mR", referenceValue: "0,001 R", system: "Eski birim", commonUse: "Cihaz ekranları (mR/h)" },
    { name: "Mikroröntgen", symbol: "µR", referenceValue: "10⁻⁶ R", system: "Eski birim", commonUse: "Çevre ölçümleri (µR/h)" },
  ],
};
