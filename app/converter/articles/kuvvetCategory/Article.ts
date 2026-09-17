import type { CategoryArticle } from "../../categoryArticles";

export const kuvvetCategoryArticle: CategoryArticle = {
  slug: "kuvvet",

  introduction: [
    "Kuvvet, bir cismin hızını (büyüklük veya yön olarak) değiştirebilen, onu hızlandırabilen, yavaşlatabilen veya şeklini değiştirebilen fiziksel etkidir. Newton'un ikinci hareket yasasına göre kuvvet, kütle ile ivmenin çarpımına eşittir.",

    "Uluslararası Birimler Sistemi'nde kuvvetin türetilmiş birimi newtondur (N); mühendislikte kilogram-kuvvet (kgf) ve pound-kuvvet (lbf), fizik ve kimyada ise küçük kuvvetler için dyn kullanılır.",
  ],

  facts: [
    {
      label: "Fiziksel büyüklük",
      value: "Kuvvet",
    },
    {
      label: "Boyut sembolü",
      value: "[MLT⁻²]",
    },
    {
      label: "SI türetilmiş birimi",
      value: "Newton",
    },
    {
      label: "SI birim sembolü",
      value: "N",
    },
    {
      label: "Temel formül",
      value: "F = m × a (Newton'un ikinci yasası)",
    },
  ],

  sections: [
    {
      title: "Kuvvet nedir?",
      paragraphs: [
        "Kuvvet, bir cismin hareket durumunu değiştirebilen (hızlandırma, yavaşlatma, yön değiştirme) veya şeklini deforme edebilen fiziksel bir etkidir. Vektörel bir büyüklüktür; hem büyüklüğü hem de yönü vardır.",
        "Newton'un ikinci hareket yasasına göre bir cisme uygulanan net kuvvet, o cismin kütlesi ile kazandığı ivmenin çarpımına eşittir: F = m × a. Bu, klasik mekaniğin en temel denklemlerinden biridir.",
      ],
    },
    {
      title: "Kuvvetin SI birimi: Newton",
      paragraphs: [
        "Newton, kuvvetin SI türetilmiş birimidir ve N sembolüyle gösterilir; İngiliz fizikçi Isaac Newton'un onuruna adlandırılmıştır. Bir newton, 1 kilogram kütleli bir cismi 1 m/s² ivmelendirmek için gereken kuvvete eşittir (1 N = 1 kg·m/s²).",
        "Günlük ölçekte 1 newton oldukça küçük bir kuvvettir -- yaklaşık 100 gramlık bir elmanın yeryüzünde hissettirdiği ağırlık kuvvetine yakındır.",
      ],
    },
    {
      title: "Ağırlık bir kuvvettir",
      paragraphs: [
        "Ağırlık, bir cismin kütle çekim alanında maruz kaldığı kuvvettir ve W = m × g formülüyle hesaplanır; burada g yerel kütle çekim ivmesidir (Dünya'da ortalama 9,80665 m/s²).",
        "Bu yüzden 'ağırlık' teknik olarak kilogramla değil newtonla ölçülmesi gereken bir büyüklüktür; günlük dilde kilogram cinsinden ifade edilen 'ağırlık' aslında kütledir. Bir cismin kütlesi Dünya'da ve Ay'da aynı kalırken, ağırlığı (kuvvet olarak) farklı yerçekimi ivmeleri nedeniyle değişir.",
      ],
    },
    {
      title: "Kilogram-kuvvet ve pound-kuvvet",
      paragraphs: [
        "Kilogram-kuvvet (kgf), 1 kilogram kütleli bir cismin standart yerçekimi ivmesinde (9,80665 m/s²) hissettiği ağırlık kuvvetini ifade eden 'gravitasyonel' bir birimdir; 1 kgf tam olarak 9,80665 newtona eşittir.",
        "Benzer şekilde pound-kuvvet (lbf), 1 pound kütleli bir cismin standart yerçekiminde hissettiği kuvvettir ve yaklaşık 4,4482216 newtona eşittir. Bu birimler, kütle birimi (kg, lb) ile kuvvet birimini karıştırma riski taşıdığı için bilimsel çalışmalarda genellikle newton tercih edilir.",
      ],
    },
    {
      title: "Dyn: CGS sisteminde kuvvet",
      paragraphs: [
        "Dyn, artık büyük ölçüde terk edilmiş olan CGS (santimetre-gram-saniye) birim sisteminde kuvvet birimidir; 1 dyn, 1 gram kütleyi 1 cm/s² ivmelendiren kuvvet olarak tanımlanır ve 0,00001 (10⁻⁵) newtona eşittir.",
        "Dyn birimi günümüzde nadiren kullanılsa da, bazı eski bilimsel literatürde ve yüzey gerilimi gibi çok küçük kuvvetlerin ifade edildiği bazı kimya/fizik kaynaklarında hâlâ karşılaşılabilir.",
      ],
    },
    {
      title: "Kuvvet ve basınç ilişkisi",
      paragraphs: [
        "Basınç, birim alana uygulanan kuvvet olarak tanımlanır (P = F/A); bu yüzden kuvvet ve basınç yakından ilişkili büyüklüklerdir ancak aynı şey değildir. Aynı kuvvet, daha küçük bir alana uygulandığında çok daha yüksek bir basınç oluşturur.",
        "Bu ilişki, örneğin bir iğnenin ucunun neden bu kadar kolay batabildiğini açıklar: iğne ucuna uygulanan kuvvet küçük olsa da, temas alanı son derece küçük olduğu için ortaya çıkan basınç çok yüksektir.",
      ],
    },
    {
      title: "Kuvvet nasıl ölçülür?",
      paragraphs: [
        "Kuvvet ölçümünde yay tipi dinamometreler, yük hücreleri (load cell) ve piezoelektrik sensörler kullanılır. Yay tipi dinamometreler, bir yayın kuvvet altında ne kadar uzadığını ölçerek (Hooke Yasası'na göre) kuvveti hesaplar.",
        "Endüstriyel tartı sistemleri ve tork anahtarları gibi hassas ekipmanlarda genellikle yük hücreleri kullanılır; bunlar uygulanan kuvveti elektriksel bir sinyale dönüştürerek dijital olarak ölçüm yapar.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Dyn",
      symbol: "dyn",
      referenceValue: "0,00001 N",
      system: "CGS",
      commonUse: "Yüzey gerilimi ve mikro kuvvetler",
    },
    {
      name: "Newton",
      symbol: "N",
      referenceValue: "1 N",
      system: "SI",
      commonUse: "Genel kuvvet hesaplamaları",
    },
    {
      name: "Kilonewton",
      symbol: "kN",
      referenceValue: "1000 N",
      system: "SI/metrik",
      commonUse: "İnşaat ve yapısal mühendislik",
    },
    {
      name: "Kilogram-kuvvet",
      symbol: "kgf",
      referenceValue: "9,80665 N",
      system: "Gravitasyonel (metrik)",
      commonUse: "Günlük ağırlık/kuvvet ifadesi",
    },
    {
      name: "Pound-kuvvet",
      symbol: "lbf",
      referenceValue: "≈4,4482216 N",
      system: "İngiliz/ABD",
      commonUse: "ABD mühendislik hesapları",
    },
  ],
};
