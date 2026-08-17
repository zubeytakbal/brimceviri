export type PressureGuideSection = {
  title: string;
  paragraphs: string[];
};

export type PressureGuideTimelineItem = {
  year: string;
  title: string;
  description: string;
};

export type PressureMeasurementMethod = {
  title: string;
  description: string;
  typicalUse: string;
};

export type PressureUnitsGuide = {
  introduction: string[];
  sections: PressureGuideSection[];
  timeline: PressureGuideTimelineItem[];
  measurementMethods: PressureMeasurementMethod[];
};

export const pressureUnitsGuide: PressureUnitsGuide = {
  introduction: [
    "Basınç, bir yüzeye dik doğrultuda etkiyen kuvvetin bu yüzeyin alanına bölünmesiyle tanımlanan fiziksel bir büyüklüktür. Aynı fiziksel olguyu ifade etmesine rağmen tarih boyunca pascal, bar, atmosfer, PSI ve milimetre cıva gibi pek çok farklı birim ortaya çıkmıştır.",

    "Bu sayfa, basınç birimlerinin ortak tarihsel kökenini, temel ölçüm ilkelerini ve genel kavramlarını tek bir yerde toplar. Atmosfer, PSI, bar, mmHg ve teknik atmosfer gibi birimlerin kendi sayfalarında yalnızca o birime özgü tanım, dönüşüm ve kullanım farkları yer alır; ortak arka plan için bu rehbere başvurabilirsiniz.",
  ],

  sections: [
    {
      title: "Basınç nedir ve neden bu kadar çok birimi var?",
      paragraphs: [
        "Basınç, P = F / A bağıntısıyla tanımlanır; burada F yüzeye dik etkiyen kuvveti, A ise bu kuvvetin yayıldığı alanı ifade eder. Aynı kuvvet daha küçük bir alana uygulandığında basınç artar.",

        "Basınç birimlerinin çeşitliliği; farklı ülkelerin farklı kuvvet ve uzunluk birimlerini (newton-metrekare, pound-inç gibi) temel almasından, farklı ölçüm aletlerinin (cıvalı barometre, yay tipi manometre gibi) kendi doğal birimlerini oluşturmasından ve farklı sektörlerin (meteoroloji, otomotiv, kimya) kendi geleneksel birimlerini korumasından kaynaklanır.",

        "SI sisteminde basıncın resmî birimi pascaldır (Pa). Bar, atmosfer, PSI ve mmHg gibi diğer birimler SI'nın parçası olmasa da pascal cinsinden kesin veya yaklaşık değerlerle tanımlanabildiği için birbirine dönüştürülebilir.",
      ],
    },
    {
      title: "Torricelli ve cıvalı barometrenin icadı",
      paragraphs: [
        "1643 yılında İtalyan bilim insanı Evangelista Torricelli, bir ucu kapalı cam bir tüpü cıvayla doldurup açık ucunu bir cıva kabına daldırarak ilk cıvalı barometreyi oluşturdu. Tüpteki cıva sütunu belirli bir yükseklikte durarak üstünde bir boşluk (Torricelli boşluğu) bıraktı.",

        "Torricelli, cıva sütununun yüksekliğinin dışarıdaki havanın ağırlığı tarafından dengelendiğini öne sürdü. Bu fikir, havanın ölçülebilir bir ağırlığı ve dolayısıyla bir basıncı olduğu görüşünün deneysel temelini oluşturdu.",

        "1648 yılında Florin Périer, Blaise Pascal'ın önerisiyle Puy-de-Dôme dağında bir barometreyi farklı yüksekliklerde ölçerek atmosfer basıncının yükseklikle azaldığını gösterdi. Bu iki deney, modern basınç ölçümünün temel taşları kabul edilir.",
      ],
    },
    {
      title: "Basınç birimlerinin tarihsel gelişimi",
      paragraphs: [
        "18. ve 19. yüzyıllarda buhar makinelerinin yaygınlaşmasıyla mühendisler, kazan ve sistem basıncını güvenli biçimde ifade etme ihtiyacı duydu. Farklı ülkeler, zaten yerleşik olan kendi kuvvet ve uzunluk birimlerini (newton-metrekare, pound-inç, kilogram-kuvvet gibi) basınca doğal biçimde genişletti.",

        "1875 yılında imzalanan Metre Konvansiyonu, ölçü birimlerinin uluslararası koordinasyonu için CGPM (Genel Ağırlıklar ve Ölçüler Konferansı) ve BIPM (Uluslararası Ağırlıklar ve Ölçüler Bürosu) gibi kurumların temelini attı. Bu kurumlar daha sonra basınç birimlerinin kesin tanımlarını da üstlendi.",

        "1971 yılında 14. CGPM, newton bölü metrekare biçimindeki SI birimine 'pascal' özel adını vererek basınç için ortak bir SI referansı oluşturdu. Bar, atmosfer, PSI ve mmHg gibi SI dışı birimler bu tarihten sonra da kullanılmaya devam etti; ancak artık hepsi pascal cinsinden kesin veya yaklaşık biçimde birbirine bağlanabiliyordu.",
      ],
    },
    {
      title: "Uluslararası Standart Atmosfer ve yükseklikle basınç değişimi",
      paragraphs: [
        "Atmosfer basıncı, ölçüm noktasının üstünde kalan hava sütununun ağırlığından kaynaklanır. Yükseklik arttıkça üstteki hava miktarı azaldığı için basınç da azalır; bu ilişki sabit bir oranla değil, yaklaşık üstel bir azalma biçiminde gerçekleşir.",

        "1952 yılında Uluslararası Sivil Havacılık Örgütü (ICAO), deniz seviyesinde referans basınç ve sıcaklık kabul eden Uluslararası Standart Atmosfer (ISA) modelini yayımladı. Bu model, yükseklikle basınç ve sıcaklığın nasıl değiştiğini standart bir tablo hâlinde tanımlar.",

        "Basınç altimetreleri ve hava aracı performans hesaplamaları, ölçülen basıncı ISA modelindeki beklenen değerlerle karşılaştırarak yaklaşık irtifayı belirler. Bu nedenle standart atmosfer kavramı, yalnızca laboratuvar ölçümlerinde değil, günlük hava taşımacılığında da doğrudan kullanılan bir referanstır.",
      ],
    },
    {
      title: "Mutlak basınç ve gösterge basıncı kavramı",
      paragraphs: [
        "Basınç ölçümlerinde iki farklı referans noktası kullanılır. Gösterge basıncı, ölçüm yapılan andaki yerel atmosfer basıncını sıfır kabul eder; çoğu manometre ve basınç göstergesi bu şekilde çalışır.",

        "Mutlak basınç ise mutlak boşluğu (hiçbir gaz molekülünün bulunmadığı sıfır basınç durumu) referans alır. Mutlak basınç, gösterge basıncına o anki atmosfer basıncının eklenmesiyle hesaplanır.",

        "Bu ayrım, termodinamik hesaplamalarda, vakum sistemlerinde ve yüksek irtifa uygulamalarında kritik önem taşır; çünkü ideal gaz yasası gibi pek çok fiziksel bağıntı, gösterge basıncı değil mutlak basınç gerektirir. Hangi basınç biriminin gösterge mi yoksa mutlak mı olduğu genellikle birim sembolüne eklenen bir ek harfle belirtilir (örneğin PSI için psig/psia).",
      ],
    },
  ],

  timeline: [
    {
      year: "1643",
      title: "Cıvalı barometrenin icadı",
      description:
        "Evangelista Torricelli, cıva sütunu yüksekliğiyle hava basıncını gösteren ilk barometreyi oluşturdu.",
    },
    {
      year: "1648",
      title: "Puy-de-Dôme deneyi",
      description:
        "Florin Périer, Pascal'ın önerisiyle gerçekleştirdiği dağ deneyinde atmosfer basıncının yükseklikle azaldığını gösterdi.",
    },
    {
      year: "1875",
      title: "Metre Konvansiyonu",
      description:
        "Ölçü birimlerinin uluslararası koordinasyonu için CGPM ve BIPM'in kurumsal temelini oluşturan anlaşma imzalandı.",
    },
    {
      year: "1952",
      title: "Uluslararası Standart Atmosfer (ISA)",
      description:
        "ICAO, deniz seviyesinde referans basınç ve sıcaklık kabul eden Uluslararası Standart Atmosfer modelini yayımladı.",
    },
    {
      year: "1954",
      title: "Standart atmosferin kesin tanımı",
      description:
        "10. CGPM, standart atmosferi tam olarak 101 325 Pa olarak tanımlayarak basınç metrolojisinde önemli bir referans oluşturdu.",
    },
    {
      year: "1971",
      title: "Pascal biriminin SI'ya kabulü",
      description:
        "14. CGPM, basınç için pascal birimini SI'ya kabul etti; diğer basınç birimleri artık pascal cinsinden kesin veya yaklaşık biçimde tanımlanabiliyordu.",
    },
  ],

  measurementMethods: [
    {
      title: "Cıvalı barometre (Torricelli tipi)",
      description:
        "Kapalı bir tüpteki cıva sütununun yüksekliğini, dışarıdaki hava basıncının dengesiyle ölçer.",
      typicalUse: "Tarihsel ve laboratuvar referans ölçümleri",
    },
    {
      title: "Aneroid barometre",
      description:
        "İçi kısmen boşaltılmış esnek bir metal kapsülün basınç değişimiyle büzülüp genişlemesini mekanik olarak gösterir.",
      typicalUse: "Taşınabilir hava durumu istasyonları ve ev tipi barometreler",
    },
    {
      title: "Bourdon tüpü manometresi",
      description:
        "Basınç altında şekli değişen kıvrık bir metal tüpün hareketini ibreye aktararak basıncı mekanik olarak gösterir.",
      typicalUse: "Endüstriyel manometreler ve saha göstergeleri",
    },
    {
      title: "Piezorezistif / kapasitif basınç sensörü",
      description:
        "Basınç altında elastik bir elemanın elektriksel direncindeki veya kapasitesindeki değişimi ölçerek basıncı elektrik sinyaline çevirir.",
      typicalUse: "Meteoroloji istasyonları, otomotiv sensörleri ve endüstriyel otomasyon",
    },
    {
      title: "Basınç altimetresi",
      description:
        "Dışarıdaki hava basıncını Uluslararası Standart Atmosfer modelindeki beklenen değerlerle karşılaştırarak yaklaşık irtifa hesaplar.",
      typicalUse: "Havacılıkta irtifa göstergeleri",
    },
    {
      title: "Sıvı kolonlu manometre",
      description:
        "Bir sıvı sütununun yüksekliğindeki değişimi basınca dönüştüren, gösterge veya mutlak değer verebilen temel ölçüm yöntemi.",
      typicalUse: "Eğitim, laboratuvar referansı ve düşük basınç ölçümü",
    },
  ],
};
