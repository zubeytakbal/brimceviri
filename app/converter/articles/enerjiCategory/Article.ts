import type { CategoryArticle } from "../../categoryArticles";

export const enerjiCategoryArticle: CategoryArticle = {
  slug: "enerji",

  introduction: [
    "Enerji, bir sistemin iş yapabilme kapasitesini ifade eden temel fiziksel büyüklüktür. Uluslararası Birimler Sistemi'nde enerjinin türetilmiş birimi Joule'dür ve kuvvet ile yer değiştirmenin çarpımından elde edilir.",

    "Günlük hayatta elektrik faturalarında kilovat-saat (kWh), beslenmede kalori/kilokalori, ısıtma sistemlerinde BTU, doğalgaz faturalandırmasında therm ve atom altı parçacık fiziğinde elektronvolt gibi çok farklı enerji birimleri kullanılır.",
  ],

  facts: [
    {
      label: "Fiziksel büyüklük",
      value: "Enerji (iş)",
    },
    {
      label: "Boyut sembolü",
      value: "[ML²T⁻²]",
    },
    {
      label: "SI türetilmiş birimi",
      value: "Joule",
    },
    {
      label: "SI birim sembolü",
      value: "J",
    },
    {
      label: "Joule'ün tanımı",
      value: "1 J = 1 newton kuvvetle 1 metre yer değiştirme (1 N·m)",
    },
  ],

  sections: [
    {
      title: "Enerji nedir?",
      paragraphs: [
        "Enerji, bir cismin veya sistemin iş yapabilme kapasitesidir. Kinetik enerji (hareket), potansiyel enerji (konum), ısı enerjisi, kimyasal enerji ve elektrik enerjisi gibi birçok farklı biçimde bulunabilir; enerjinin korunumu yasasına göre bir biçimden diğerine dönüşebilir ama toplam miktarı yoktan var olmaz veya yok olmaz.",
        "Enerji türetilmiş bir büyüklüktür; kuvvet ile yer değiştirmenin (iş) çarpımından elde edilir ve SI boyutu ML²T⁻² (kütle × uzunluk kare / zaman kare) olarak gösterilir.",
      ],
    },
    {
      title: "Enerjinin SI birimi: Joule",
      paragraphs: [
        "Joule, enerjinin SI türetilmiş birimidir ve J sembolüyle gösterilir; 19. yüzyıl İngiliz fizikçi James Prescott Joule'ün onuruna adlandırılmıştır. Bir Joule, 1 newton'luk bir kuvvetin bir cismi 1 metre hareket ettirmesi için gereken enerjiye eşittir.",
        "Joule, günlük hayattaki birçok enerji miktarını ifade etmek için oldukça küçük kaldığından; mühendislik ve günlük kullanımda kilojoule (bin Joule) ve megajoule (bir milyon Joule) gibi katları daha sık tercih edilir.",
      ],
    },
    {
      title: "Kilovat-saat: elektrik faturalarının birimi",
      paragraphs: [
        "Kilovat-saat (kWh), 1 kilovatlık bir gücün 1 saat boyunca harcanmasıyla tüketilen enerji miktarıdır ve elektrik faturalandırmasında dünya genelinde standart birimdir. 1 kWh tam olarak 3.600.000 Joule'e (3,6 megajoule) eşittir.",
        "Bir elektrikli cihazın enerji tüketimini hesaplamak için gücü (watt) çalışma süresiyle (saat) çarpmak yeterlidir; örneğin 2000 watt'lık bir cihaz 3 saat çalıştığında 6 kWh enerji tüketir.",
      ],
    },
    {
      title: "Kalori ve kilokalori: beslenmede enerji",
      paragraphs: [
        "Kalori, orijinal olarak 1 gram suyun sıcaklığını 1°C artırmak için gereken enerji miktarı olarak tanımlanmıştır ve 1 kalori tam olarak 4,184 Joule'e eşittir.",
        "Besin etiketlerinde görülen 'kalori' değeri aslında bilimsel anlamda kilokaloridir (1000 kalori) -- beslenme bilimindeki bu adlandırma geleneği (büyük harfle 'Kalori' yazılması) sıkça kafa karıştırır; bir yiyeceğin '200 kalori' içerdiği söylendiğinde gerçekte 200 kilokaloriden (200.000 kalori) bahsedilir.",
      ],
    },
    {
      title: "BTU ve therm: ısıtma ve doğalgaz enerjisi",
      paragraphs: [
        "BTU (British Thermal Unit), 1 pound suyun sıcaklığını 1°F artırmak için gereken enerji miktarıdır ve özellikle ısıtma/soğutma sistemlerinin (klima, kombi) kapasitesini ifade etmek için ABD kökenli ama dünya genelinde yaygın kullanılan bir birimdir. 1 BTU yaklaşık 1055,06 Joule'e eşittir.",
        "Therm ise doğalgaz faturalandırmasında kullanılan büyük bir enerji birimidir ve tam olarak 100.000 BTU'ya eşittir. Bazı ülkelerde doğalgaz tüketimi metreküp yerine doğrudan therm cinsinden faturalandırılır.",
      ],
    },
    {
      title: "Elektronvolt: atom altı dünyanın birimi",
      paragraphs: [
        "Elektronvolt (eV), bir elektronun 1 volt'luk bir potansiyel farkı boyunca hareket ederken kazandığı kinetik enerjiyi ifade eder ve son derece küçük bir enerji birimidir (1 eV ≈ 1,602176634 × 10⁻¹⁹ Joule).",
        "Parçacık fiziği ve atom fiziğinde enerjiler genellikle Joule yerine elektronvolt (ve onun katları olan keV, MeV, GeV) cinsinden ifade edilir, çünkü bu ölçekte Joule aşırı küçük ve pratik olmayan sayılara yol açar.",
      ],
    },
    {
      title: "Enerjinin korunumu ilkesi",
      paragraphs: [
        "Termodinamiğin birinci yasası olarak da bilinen enerjinin korunumu ilkesine göre, kapalı bir sistemdeki toplam enerji sabit kalır; enerji yaratılamaz veya yok edilemez, yalnızca bir biçimden diğerine dönüştürülebilir.",
        "Örneğin bir arabanın motorunda kimyasal enerji (yakıt) önce ısı enerjisine, sonra mekanik enerjiye (hareket) dönüşür; bu süreçte enerjinin bir kısmı sürtünme ve egzoz yoluyla kullanılamayan ısıya dönüşse de toplam enerji miktarı değişmez.",
      ],
    },
    {
      title: "Enerji birimleri arasında dönüşüm neden önemlidir?",
      paragraphs: [
        "Farklı sektörler geleneksel olarak farklı enerji birimlerini tercih eder: elektrik mühendisliği kilovat-saati, beslenme bilimi kilokaloriyi, HVAC sektörü BTU'yu, doğalgaz sektörü ise thermi kullanır. Bu farklı birimler arasında doğru dönüşüm yapabilmek, enerji verimliliği karşılaştırmaları ve maliyet hesaplamaları için kritik önem taşır.",
        "Örneğin bir ısı pompasının verimliliğini bir doğalgaz kombisiyle karşılaştırmak için her ikisinin de enerji tüketimini ortak bir birime (genellikle kWh veya Joule) çevirmek gerekir.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Joule",
      symbol: "J",
      referenceValue: "1 J",
      system: "SI",
      commonUse: "Bilimsel ve fiziksel enerji hesapları",
    },
    {
      name: "Kilojoule",
      symbol: "kJ",
      referenceValue: "1000 J",
      system: "SI/metrik",
      commonUse: "Besin enerjisi (bazı ülkelerde)",
    },
    {
      name: "Megajoule",
      symbol: "MJ",
      referenceValue: "1.000.000 J",
      system: "SI/metrik",
      commonUse: "Yakıt ve büyük enerji miktarları",
    },
    {
      name: "Kalori",
      symbol: "cal",
      referenceValue: "4,184 J",
      system: "Metrik (geleneksel)",
      commonUse: "Beslenme ve kimya",
    },
    {
      name: "Kilokalori",
      symbol: "kcal",
      referenceValue: "4184 J",
      system: "Metrik (geleneksel)",
      commonUse: "Besin etiketleri ('kalori')",
    },
    {
      name: "Watt-saat",
      symbol: "Wh",
      referenceValue: "3600 J",
      system: "Metrik (elektrik)",
      commonUse: "Küçük cihaz enerji tüketimi",
    },
    {
      name: "Kilovat-saat",
      symbol: "kWh",
      referenceValue: "3.600.000 J",
      system: "Metrik (elektrik)",
      commonUse: "Elektrik faturalandırması",
    },
    {
      name: "BTU",
      symbol: "Btu",
      referenceValue: "≈1055,06 J",
      system: "İngiliz/ABD",
      commonUse: "Klima ve ısıtma kapasitesi",
    },
    {
      name: "Therm",
      symbol: "th",
      referenceValue: "≈105.506.000 J",
      system: "İngiliz/ABD",
      commonUse: "Doğalgaz faturalandırması",
    },
    {
      name: "Elektronvolt",
      symbol: "eV",
      referenceValue: "≈1,602 × 10⁻¹⁹ J",
      system: "Atom/parçacık fiziği",
      commonUse: "Atomik ve nükleer enerji ölçümü",
    },
  ],
};
