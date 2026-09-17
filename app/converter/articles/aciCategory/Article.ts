import type { CategoryArticle } from "../../categoryArticles";

export const aciCategoryArticle: CategoryArticle = {
  slug: "aci",

  introduction: [
    "Açı, iki doğrunun veya düzlemin bir noktada kesişerek oluşturduğu dönme miktarını ifade eden geometrik bir büyüklüktür. Trigonometriden mühendislik çizimine, navigasyondan bilgisayar grafiklerine kadar sayısız alanda temel bir ölçüm birimidir.",

    "Günlük hayatta ve geometri derslerinde derece en yaygın kullanılan açı birimidir; matematik ve fizikte ise radyan tercih edilir çünkü trigonometrik fonksiyonların türev ve integral formüllerini önemli ölçüde sadeleştirir. Gradyan ise özellikle arazi ölçümü (jeodezi) alanında kullanılan ondalık dostu bir birimdir.",
  ],

  facts: [
    {
      label: "Fiziksel büyüklük",
      value: "Düzlem açısı",
    },
    {
      label: "Boyut sembolü",
      value: "Boyutsuz (yay uzunluğu / yarıçap oranı)",
    },
    {
      label: "SI türetilmiş birimi",
      value: "Radyan",
    },
    {
      label: "SI birim sembolü",
      value: "rad",
    },
    {
      label: "Tam çember",
      value: "360° = 2π rad = 400 gon = 1 tam tur",
    },
  ],

  sections: [
    {
      title: "Açı nedir?",
      paragraphs: [
        "Açı, bir noktadan çıkan iki ışının (veya iki doğrunun kesişiminin) arasındaki dönme miktarını ifade eder. Geometri, trigonometri, navigasyon ve mühendislik çiziminde temel bir ölçüm birimidir.",
        "Açı, teknik olarak boyutsuz bir büyüklüktür -- bir dairenin yay uzunluğunun yarıçapına oranı olarak tanımlanır (radyan cinsinden). Bu, açının uzunluk, kütle veya zaman gibi 'temel' bir fiziksel boyutu olmadığı, saf bir oran olduğu anlamına gelir.",
      ],
    },
    {
      title: "Radyan: matematiğin doğal açı birimi",
      paragraphs: [
        "Radyan, bir dairenin yarıçapına eşit uzunluktaki bir yayın merkezde oluşturduğu açı olarak tanımlanır. Bir tam çember, yarıçapının yaklaşık 6,2832 (yani 2π) katı çevre uzunluğuna sahip olduğu için, tam çember 2π radyana eşittir.",
        "Radyanın matematiksel avantajı, trigonometrik fonksiyonların (sinüs, kosinüs) türev ve integral alma işlemlerinde ekstra bir dönüşüm sabitine ihtiyaç duymadan doğrudan kullanılabilmesidir -- bu yüzden ileri matematik, fizik ve mühendislik hesaplarında radyan tercih edilir.",
      ],
    },
    {
      title: "Derece: günlük hayatın açı birimi",
      paragraphs: [
        "Derece, bir tam çemberi 360 eşit parçaya bölen, günlük hayatta ve temel geometri eğitiminde en yaygın kullanılan açı birimidir. Bir derece, 60 dakikaya (açısal dakika), bir açısal dakika ise 60 saniyeye (açısal saniye) bölünebilir.",
        "360 sayısının seçilmesinin kökeni antik Babil'in 60 tabanlı sayı sistemine dayanır; 360'ın 2, 3, 4, 5, 6, 8, 9, 10, 12 gibi birçok sayıya tam bölünebilmesi, açıları pratik kesirlere (yarım, üçte bir, çeyrek gibi) bölmeyi kolaylaştırmıştır. Ayrıca 360'ın, bir güneş yılındaki gün sayısına (yaklaşık 365) yakınlığının da tarihsel bir etkisi olduğu düşünülür.",
      ],
    },
    {
      title: "Gradyan: ondalık dostu açı birimi",
      paragraphs: [
        "Gradyan (gon), Fransız Devrimi sonrası metrik sistemle birlikte önerilen ve bir dik açıyı tam olarak 100 parçaya bölen bir açı birimidir; bir tam çember 400 gradyana eşittir.",
        "Gradyanın temel avantajı ondalık sayı sistemiyle uyumlu olmasıdır -- bir dik açı 100 gon, yarım açı 200 gon gibi yuvarlak sayılarla ifade edilir. Bu özelliği nedeniyle özellikle Avrupa'da bazı arazi ölçümü (jeodezi) ve haritacılık uygulamalarında hâlâ kullanılır.",
      ],
    },
    {
      title: "Tam tur ve dönme sayısı",
      paragraphs: [
        "Tam tur (devir), bir cismin başlangıç konumuna geri döndüğü tam bir dönüşü ifade eder ve 360°'ye (2π radyana) eşittir. Bu birim, özellikle dönen makine parçalarının veya bir cismin kaç kez döndüğünü ifade etmek için kullanışlıdır.",
        "Mühendislikte devir sayısı genellikle zamana bağlı olarak da ifade edilir (dakikadaki devir sayısı, RPM); bu, açının açısal hız kategorisiyle olan doğrudan ilişkisini gösterir.",
      ],
    },
    {
      title: "Açı birimleri arasında dönüşüm",
      paragraphs: [
        "Derece ile radyan arasında dönüşüm için π/180 çarpım faktörü kullanılır: Radyan = Derece × (π/180), Derece = Radyan × (180/π). Bu ilişki, π sayısının (yaklaşık 3,14159) bir tam çemberin yarısına (180°) karşılık gelmesinden kaynaklanır.",
        "Gradyan ile derece arasındaki ilişki ise daha basittir: 100 gon = 90°, yani 1 gon = 0,9°'ye eşittir. Bu basit oran, gradyanın ondalık sistemle uyumlu tasarlanmış olmasının doğrudan bir sonucudur.",
      ],
    },
    {
      title: "Açı nerelerde kullanılır?",
      paragraphs: [
        "Navigasyon ve denizcilikte rota ve pusula yönleri derece cinsinden ifade edilir (0-360°). Mühendislik çiziminde parça açıları, inşaatta çatı eğimleri ve rampa açıları da genellikle derece cinsinden belirtilir.",
        "Bilgisayar grafikleri ve oyun motorlarında ise iç hesaplamalar genellikle radyan cinsinden yapılır (çünkü programlama dillerinin trigonometrik fonksiyonları radyan bekler), ancak kullanıcıya gösterilen değerler çoğunlukla dereceye çevrilir.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Radyan",
      symbol: "rad",
      referenceValue: "1 rad",
      system: "SI",
      commonUse: "Matematik, fizik ve programlama",
    },
    {
      name: "Derece",
      symbol: "°",
      referenceValue: "≈0,01745 rad (π/180)",
      system: "Geleneksel (dünya genelinde)",
      commonUse: "Geometri, navigasyon, günlük kullanım",
    },
    {
      name: "Gradyan",
      symbol: "gon",
      referenceValue: "≈0,01571 rad (π/200)",
      system: "Metrik (jeodezi)",
      commonUse: "Arazi ölçümü ve haritacılık",
    },
    {
      name: "Tam Tur",
      symbol: "tur",
      referenceValue: "2π rad (≈6,2832 rad)",
      system: "Genel",
      commonUse: "Dönme sayısı ve makine mühendisliği",
    },
  ],
};
