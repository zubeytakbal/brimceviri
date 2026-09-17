import type { CategoryArticle } from "../../categoryArticles";

export const enduktansCategoryArticle: CategoryArticle = {
  slug: "enduktans",

  introduction: [
    "Endüktans, bir devre elemanının (genellikle bir bobinin) içinden geçen akım değiştiğinde kendi içinde bir gerilim indükleme kapasitesini ifade eden fiziksel büyüklüktür. Transformatörlerden motorlara kadar birçok elektrik makinesinin çalışma prensibinin temelinde yer alır.",

    "Uluslararası Birimler Sistemi'nde endüktansın türetilmiş birimi henrydir (H); pratik elektronik bileşenlerde ise genellikle milihenry (mH) ve mikrohenry (µH) gibi çok daha küçük değerler kullanılır.",
  ],

  facts: [
    {
      label: "Fiziksel büyüklük",
      value: "Endüktans",
    },
    {
      label: "Boyut sembolü",
      value: "[ML²T⁻²I⁻²]",
    },
    {
      label: "SI türetilmiş birimi",
      value: "Henry",
    },
    {
      label: "SI birim sembolü",
      value: "H",
    },
    {
      label: "Temel formül",
      value: "V = L × (dI/dt) (İndüklenen gerilim = Endüktans × Akım değişim hızı)",
    },
  ],

  sections: [
    {
      title: "Endüktans nedir?",
      paragraphs: [
        "Endüktans, bir iletkenin (özellikle bir bobinin) içinden geçen akım değiştiğinde, bu değişime karşı koyan bir gerilim indükleme özelliğidir. Bu olgu, Faraday'ın elektromanyetik indüksiyon yasasına dayanır.",
        "Bir bobinden geçen akım hızla değiştiğinde, bobin bu değişime karşı koyacak yönde bir gerilim üretir -- bu özellik, endüktansın devre içindeki 'ani değişime direnme' davranışını açıklar ve L sembolüyle gösterilir.",
      ],
    },
    {
      title: "Endüktansın SI birimi: Henry",
      paragraphs: [
        "Henry, endüktansın SI türetilmiş birimidir ve H sembolüyle gösterilir; elektromanyetik indüksiyonu Faraday'dan bağımsız olarak keşfeden Amerikalı bilim insanı Joseph Henry'nin onuruna adlandırılmıştır.",
        "Bir bobinin endüktansı 1 henry ise, içinden geçen akım saniyede 1 amper değiştiğinde bobinde 1 voltluk bir gerilim indüklenir. Pratikte 1 henry oldukça büyük bir değerdir; günlük elektronik bileşenlerde genellikle milihenry veya mikrohenry seviyesinde bobinler kullanılır.",
      ],
    },
    {
      title: "Bobinler ve transformatörlerde endüktans",
      paragraphs: [
        "Bir bobinin endüktansı, sarım sayısına, bobinin geometrisine (uzunluk, kesit alanı) ve içindeki çekirdek malzemesine (hava, demir, ferrit gibi) bağlıdır. Daha fazla sarım ve demir/ferrit çekirdek kullanımı, endüktansı önemli ölçüde artırır.",
        "Transformatörler, iki veya daha fazla bobinin ortak bir manyetik çekirdek üzerinden endüktif olarak birbirine bağlanmasıyla çalışır; bu sayede bir devredeki gerilim, fiziksel bir bağlantı olmadan diğerine aktarılıp dönüştürülebilir.",
      ],
    },
    {
      title: "Endüktans neden 'akım değişimine direnç' olarak anılır?",
      paragraphs: [
        "Bir bobinden geçen akımı aniden kesmeye çalışmak, bobinde büyük bir gerilim sıçramasına (bazen kıvılcıma) yol açabilir -- çünkü bobin, ani akım değişimine karşı koyacak yönde güçlü bir gerilim indükler.",
        "Bu özellik, elektrik motorlarının veya rölelerin kapatılması sırasında oluşabilecek zararlı gerilim darbelerini önlemek için devre tasarımında (örneğin serbest geçiş diyotları kullanılarak) özel önlem alınmasını gerektirir.",
      ],
    },
    {
      title: "Endüktif reaktans ve alternatif akım",
      paragraphs: [
        "Alternatif akım (AC) devrelerinde bir bobin, frekansa bağlı bir direnç benzeri etki (endüktif reaktans) gösterir; bu etki X_L = 2πfL formülüyle hesaplanır (f: frekans, L: endüktans).",
        "Frekans arttıkça endüktif reaktans da artar -- bu yüzden bobinler, düşük frekansları geçirip yüksek frekansları engelleyen filtre devrelerinde (alçak geçiren filtre) sıkça kullanılır.",
      ],
    },
    {
      title: "Endüktans nasıl ölçülür?",
      paragraphs: [
        "Endüktans, LCR metre adı verilen özel ölçüm cihazlarıyla doğrudan ölçülebilir; bu cihazlar bir test sinyali uygulayıp devre elemanının tepkisinden endüktans (ve genellikle direnç, kapasitans) değerlerini hesaplar.",
        "Bazı multimetreler de temel endüktans ölçüm fonksiyonuna sahiptir, ancak hassas ölçüm gerektiren uygulamalarda (bobin tasarımı, transformatör test gibi) özel LCR metreler tercih edilir.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Mikrohenry",
      symbol: "µH",
      referenceValue: "10⁻⁶ H",
      system: "SI/metrik",
      commonUse: "Yüksek frekans RF bobinleri",
    },
    {
      name: "Milihenry",
      symbol: "mH",
      referenceValue: "10⁻³ H",
      system: "SI/metrik",
      commonUse: "Filtre devreleri ve güç kaynakları",
    },
    {
      name: "Henry",
      symbol: "H",
      referenceValue: "1 H",
      system: "SI",
      commonUse: "Transformatör ve büyük bobinler",
    },
  ],
};
