import type { CategoryArticle } from "../../categoryArticles";

export const manyetikAkiCategoryArticle: CategoryArticle = {
  slug: "manyetik-aki",

  introduction: [
    "Manyetik akı, bir yüzeyden geçen toplam manyetik alan miktarını ifade eden fiziksel büyüklüktür. Elektromanyetik indüksiyonun (transformatör, jeneratör ve elektrik motorlarının çalışma prensibi) temelinde yer alır.",

    "Uluslararası Birimler Sistemi'nde manyetik akının türetilmiş birimi weberdir (Wb); daha küçük değerler için miliweber (mWb), mikroweber (µWb) ve nanoweber (nWb) kullanılır.",
  ],

  facts: [
    {
      label: "Fiziksel büyüklük",
      value: "Manyetik akı",
    },
    {
      label: "Boyut sembolü",
      value: "[ML²T⁻²I⁻¹]",
    },
    {
      label: "SI türetilmiş birimi",
      value: "Weber",
    },
    {
      label: "SI birim sembolü",
      value: "Wb",
    },
    {
      label: "Temel formül",
      value: "Φ = B × A (Manyetik Akı Yoğunluğu × Alan)",
    },
  ],

  sections: [
    {
      title: "Manyetik akı nedir?",
      paragraphs: [
        "Manyetik akı (Φ), bir yüzeyden geçen toplam manyetik alan çizgisi miktarını ifade eder ve manyetik akı yoğunluğu (B, Tesla cinsinden) ile o yüzeyin alanının (A) çarpımından elde edilir: Φ = B × A.",
        "Manyetik akı, bir manyetik alanın 'ne kadarının' belirli bir alandan geçtiğini ölçer -- aynı manyetik alan yoğunluğunda, daha büyük bir yüzeyden daha fazla manyetik akı geçer.",
      ],
    },
    {
      title: "Manyetik akının SI birimi: weber",
      paragraphs: [
        "Weber, manyetik akının SI türetilmiş birimidir ve Wb sembolüyle gösterilir; Alman fizikçi Wilhelm Eduard Weber'in onuruna adlandırılmıştır. 1 weber, 1 metrekarelik bir alandan geçen 1 Tesla'lık düzgün bir manyetik alan yoğunluğuna karşılık gelir.",
        "Weber birimi, aynı zamanda manyetik akı yoğunluğu biriminin (Tesla) de tanımında yer alır: 1 Tesla = 1 Wb/m² -- bu, iki birimin birbiriyle doğrudan matematiksel ilişkisini gösterir.",
      ],
    },
    {
      title: "Faraday'ın indüksiyon yasası ve manyetik akı",
      paragraphs: [
        "Faraday'ın elektromanyetik indüksiyon yasasına göre, bir devredeki manyetik akı zamanla değiştiğinde, bu devrede bir elektromotor kuvveti (gerilim) indüklenir: EMK = -dΦ/dt (akının zamana göre değişim hızının negatifi).",
        "Bu ilke, jeneratörlerin (mekanik enerjiyi elektrik enerjisine çeviren), transformatörlerin ve elektrik motorlarının çalışma prensibinin temelini oluşturur -- hepsinde bir bobinden geçen manyetik akının kasıtlı olarak değiştirilmesiyle gerilim veya hareket üretilir.",
      ],
    },
    {
      title: "Transformatörlerde manyetik akı",
      paragraphs: [
        "Bir transformatörde, birincil sargıdan geçen değişken akım, ortak demir çekirdek üzerinden değişken bir manyetik akı oluşturur; bu değişken akı, ikincil sargıda bir gerilim indükler.",
        "Transformatörün gerilim dönüştürme oranı, doğrudan birincil ve ikincil sargılardaki sarım sayısına bağlıdır, çünkü her iki sargı da aynı manyetik akıyı paylaşır -- bu, manyetik akının transformatör tasarımındaki merkezi rolünü gösterir.",
      ],
    },
    {
      title: "Manyetik akı ve Lenz Yasası",
      paragraphs: [
        "Lenz Yasası, indüklenen akımın yönünün her zaman kendisini oluşturan manyetik akı değişimine karşı koyacak yönde olacağını belirtir; bu, enerjinin korunumu ilkesinin elektromanyetik indüksiyondaki doğal bir sonucudur.",
        "Bu ilke, indüksiyon ocaklarından manyetik frenleme sistemlerine (bazı trenlerde ve hızlı asansörlerde kullanılan) kadar birçok pratik uygulamada kullanılır -- değişen manyetik akı, karşı koyucu akımlar aracılığıyla kontrollü bir direnç veya ısınma etkisi oluşturur.",
      ],
    },
    {
      title: "Manyetik akı nasıl ölçülür?",
      paragraphs: [
        "Manyetik akı, genellikle doğrudan değil, manyetik akı yoğunluğunun (bir Gauss metre veya Tesla metre ile) ölçülüp bilinen bir alanla çarpılmasıyla dolaylı olarak hesaplanır.",
        "Fluxmetre adı verilen özel cihazlar, bir bobinden geçen manyetik akıdaki değişimi doğrudan entegre ederek ölçebilir; bu, özellikle mıknatıs kalitesi testi ve manyetik devre tasarımı doğrulamasında kullanılır.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Nanoweber",
      symbol: "nWb",
      referenceValue: "10⁻⁹ Wb",
      system: "SI/metrik",
      commonUse: "Hassas manyetik ölçümler",
    },
    {
      name: "Mikroweber",
      symbol: "µWb",
      referenceValue: "10⁻⁶ Wb",
      system: "SI/metrik",
      commonUse: "Küçük bobin ve sensör hesapları",
    },
    {
      name: "Miliweber",
      symbol: "mWb",
      referenceValue: "10⁻³ Wb",
      system: "SI/metrik",
      commonUse: "Elektrik motoru ve transformatör hesapları",
    },
    {
      name: "Weber",
      symbol: "Wb",
      referenceValue: "1 Wb",
      system: "SI",
      commonUse: "Büyük elektromanyetik sistemler",
    },
  ],
};
