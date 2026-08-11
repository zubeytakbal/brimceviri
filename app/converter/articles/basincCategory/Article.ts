import type { CategoryArticle } from "../../categoryArticles";

export const basincCategoryArticle: CategoryArticle = {
  slug: "basinc",

  introduction: [
    "Basınç, bir yüzeye dik doğrultuda etkiyen kuvvetin birim alana düşen miktarını ifade eden fiziksel büyüklüktür. Katılar arasındaki temas gerilmelerinden boru içindeki akışkana, atmosferden vakum sistemlerine kadar çok geniş bir uygulama alanı vardır. Mühendislikte basınç yalnızca sayısal bir değer değil; güvenlik, sızdırmazlık, yapısal dayanım, enerji dönüşümü ve proses kontrolü açısından temel bir tasarım değişkenidir.",

    "Uluslararası Birim Sistemi'nde basıncın türetilmiş birimi pascaldır ve Pa sembolüyle gösterilir. Bir pascal, bir newtonluk kuvvetin bir metrekarelik alana düzgün biçimde dağılması durumunda oluşan basınca eşittir. Bu nedenle basınç birimi doğrudan kuvvet ve alan kavramlarıyla bağlantılıdır; aynı boyut yapısı malzeme gerilmesiyle de paylaşılır, ancak fiziksel bağlam her zaman aynı değildir.",

    "Günlük yaşamda ve endüstride basınç çoğu zaman pascaldan daha pratik birimlerle ifade edilir. Lastik basınçlarında kilopascal ve PSI, proses sistemlerinde bar, atmosfer koşullarında atm ve meteorolojide milibar yaygın olarak kullanılır. Farklı sektörlerin tarihsel olarak farklı birimler benimsemiş olması, basınç dönüşümlerinin doğru anlaşılmasını ve mutlak, gösterge ya da diferansiyel basınç türlerinin birbirine karıştırılmamasını özellikle önemli hâle getirir.",
  ],

  facts: [
    {
      label: "Fiziksel büyüklük",
      value: "Basınç",
    },
    {
      label: "SI türetilmiş birimi",
      value: "Pascal",
    },
    {
      label: "SI sembolü",
      value: "Pa",
    },
    {
      label: "Temel bağıntı",
      value: "P = F / A",
    },
    {
      label: "SI eşdeğeri",
      value: "1 Pa = 1 N/m²",
    },
    {
      label: "Boyut formülü",
      value: "M L⁻¹ T⁻²",
    },
    {
      label: "Standart atmosfer",
      value: "101 325 Pa",
    },
    {
      label: "Mutlak sıfır referansı",
      value: "Tam vakum",
    },
  ],

  sections: [
    {
      title: "Basınç nedir?",
      paragraphs: [
        "Basınç, bir yüzeye uygulanan kuvvetin yalnızca büyüklüğüyle değil, bu kuvvetin hangi alana yayıldığıyla da ilgilidir. Aynı kuvvet daha küçük bir alana uygulanırsa basınç artar; daha geniş bir alana yayılırsa azalır. Bu nedenle keskin bir bıçak az kuvvetle kesebilirken, aynı kuvvet geniş bir tabanda çok daha düşük yüzey etkisi oluşturur.",

        "Akışkanlar mekaniğinde basınç, durgun veya hareketli bir akışkanın çevresine uyguladığı normal gerilme bileşeni olarak düşünülür. Durgun bir akışkanda basınç her yönde iletilir ve kapalı kaplarda Pascal prensibiyle ilişkilendirilir. Bu özellik hidrolik presler, fren sistemleri ve çok sayıda endüstriyel aktüatör için temel oluşturur.",

        "Basınç kavramı yalnızca sıvı ve gazlarla sınırlı değildir. Temas yüzeylerindeki ortalama normal kuvvet etkisi de basınç benzeri bir dağılım oluşturur. Ancak mühendislikte basınç denildiğinde çoğu zaman boru, tank, kompresör, hava kanalı, vakum odası ve atmosferik ortam gibi akışkan sistemleri ön plandadır.",
      ],
    },
    {
      title: "Basınç formülü: P = F / A",
      paragraphs: [
        "Basıncın temel tanımı P = F / A bağıntısıyla verilir. Burada P basıncı, F yüzeye dik kuvvet bileşenini ve A bu kuvvetin yayıldığı alanı ifade eder. Birim analizi yapıldığında newton bölü metrekare elde edilir; bu da pascal birimine eşittir.",

        "Bu bağıntı, üniform kuvvet dağılımı varsayıldığında ortalama basıncı verir. Gerçek temas problemlerinde veya akışkan içindeki karmaşık alanlarda basınç yüzey boyunca değişebilir. Bu durumda tek bir ortalama değer yerine yerel basınç dağılımı, diferansiyel denklemler ve sınır koşulları dikkate alınır.",

        "Uygulamada sık yapılan hata, kuvvetin yönünü ve etkin alanı yanlış seçmektir. Örneğin bir piston kuvveti hesaplanırken yalnızca basınca maruz kalan etkin kesit alanı kullanılmalıdır. Conta, saplama veya destek yüzeyi gibi geometrik ayrıntılar ihmal edildiğinde tasarım hataları oluşabilir.",
      ],
    },
    {
      title: "Pascal neden SI basınç birimidir?",
      paragraphs: [
        "Pascal, kuvvetin SI birimi olan newton ve alanın SI birimi olan metrekarenin doğal birleşiminden türetilir. 1 Pa = 1 N/m² eşitliği bu nedenle yalnızca bir tanım değil, aynı zamanda basıncın mekanik kökenini gösteren boyutsal bir ifadedir. Basınç için ayrıca ayrı bir temel birim tanımlamaya gerek kalmaz.",

        "SI sistemi türetilmiş büyüklükleri tutarlı biçimde temel birimlere bağlamayı amaçlar. Basıncın pascal cinsinden ifade edilmesi, enerji yoğunluğu, gerilme, elastisite modülü ve akışkanlar mekaniği denklemleriyle uyumlu bir çerçeve sağlar. Aynı birimin farklı alanlarda kullanılabilmesi, hesaplamalarda dönüşüm hatalarını azaltır.",

        "Pascal günlük ölçekte çoğu zaman küçük bir birimdir. Bu nedenle mühendislikte kilopascal, megapascal veya bar gibi daha kullanışlı ölçekler tercih edilir. Yine de bunların tümü nihayetinde pascala ve dolayısıyla SI tabanına bağlanır.",
      ],
    },
    {
      title: "Mutlak, gösterge ve diferansiyel basınç",
      paragraphs: [
        "Mutlak basınç tam vakuma göre ölçülür. Bu referans, teorik olarak basıncın sıfır olduğu durumdur ve mutlak basınç negatif olamaz. Özellikle gaz yasaları, termodinamik hesaplar ve yoğunlukla ilişkili bazı bağıntılar mutlak basınçla çalışır.",

        "Gösterge basıncı ise atmosfer basıncına göre ölçülür. Pek çok saha manometresi çevre atmosferini sıfır referansı kabul eder; bu nedenle ekranda okunan değer çoğu zaman gösterge basıncıdır. Mutlak ve gösterge basıncı arasındaki ilişki P_abs = P_gauge + P_atm biçimindedir.",

        "Diferansiyel basınç iki nokta arasındaki basınç farkıdır. Filtre tıkanması, orifis plakası üzerinden debi ölçümü, oda basınçlandırması ve ısı değiştirici performansı gibi uygulamalarda doğrudan iki farklı hattın veya hacmin basınç farkı izlenir. Bu büyüklük ne tam vakuma ne de tek başına atmosfere göre tanımlanır; doğrudan iki noktanın farkıdır.",
      ],
    },
    {
      title: "Atmosfer basıncı",
      paragraphs: [
        "Atmosfer basıncı, Dünya atmosferindeki hava sütununun ağırlığı nedeniyle yüzeylere uyguladığı basınçtır. Deniz seviyesine yakın standart koşullarda yaklaşık 101 325 Pa, yani 1 atm kabul edilir. Ancak bu değer sabit değildir; yükseklik, hava durumu ve sıcaklık değişimleriyle farklılık gösterir.",

        "Barometreler atmosfer basıncını ölçmek için kullanılır. Cıvalı barometreler tarihsel olarak referans araçlar olmuş, modern uygulamalarda ise elektronik basınç sensörleri yaygınlaşmıştır. Atmosfer basıncı yalnızca meteoroloji için değil, vakum teknolojisi, yanma sistemleri ve gösterge-mutlak dönüşümleri için de önemlidir.",

        "Gösterge basıncıyla çalışan sistemlerde atmosfer basıncındaki değişimler ölçüm yorumunu etkileyebilir. Örneğin deniz seviyesinde 2 bar gösterge basıncı ile yüksek rakımda 2 bar gösterge basıncı aynı mutlak değeri vermez. Bu ayrım özellikle kompresyon, gaz yoğunluğu ve kaynama noktası hesaplarında kritik olabilir.",
      ],
    },
    {
      title: "Hidrostatik basınç ve P = ρgh bağıntısı",
      paragraphs: [
        "Durgun bir akışkan içinde derinlik arttıkça basınç artar. Sabit yoğunluk varsayımı altında hidrostatik gösterge basıncı yaklaşık olarak P = ρgh bağıntısıyla ifade edilir. Burada ρ yoğunluğu, g yerçekimi ivmesini ve h akışkan sütununun yüksekliğini temsil eder.",

        "Bu ilişki özellikle su depoları, açık tanklar, barajlar, seviye ölçümü ve sıvı kolonlu manometreler için son derece yararlıdır. Aynı yükseklikte ve aynı akışkan içinde basınç eşit kabul edilir; kabın şekli sonucu değiştirmez. Belirleyici olan akışkan yoğunluğu ve serbest yüzeye göre düşey derinliktir.",

        "Mutlak hidrostatik basınç, yalnızca ρgh artışını değil serbest yüzeydeki başlangıç basıncını da içerir. Açık bir kapta bu başlangıç değeri genellikle atmosfer basıncıdır. Dolayısıyla mutlak basınç hesabında yalnızca sıvı sütunundan doğan artış değil, yüzeydeki dış basınç da eklenmelidir.",
      ],
    },
    {
      title: "Statik, dinamik ve toplam basınç",
      paragraphs: [
        "Statik basınç, akışkanla birlikte hareket eden bir gözlemci açısından akışın lokal termodinamik durumunu temsil eden basınç bileşenidir. Boru hatları, tanklar ve kanallar içindeki çok sayıda ölçüm noktası esas olarak statik basıncı izler. Basınç transmitterlerinin büyük bölümü bu büyüklüğü ölçmek üzere tasarlanır.",

        "Dinamik basınç akış hızından kaynaklanan kinetik etkiyi ifade eder ve sık kullanılan yaklaşık bağıntısı q = 1/2 ρv² şeklindedir. Bu terim Bernoulli yaklaşımında önemli rol oynar ve pitot tüpü gibi hız ölçüm yöntemlerinde kullanılır. Hız arttıkça dinamik basınç da artar.",

        "Toplam basınç, ideal akış yaklaşımında statik ve dinamik basıncın toplamı olarak yorumlanır. Gerçek sistemlerde sürtünme, türbülans, sıkıştırılabilirlik ve yerel kayıplar nedeniyle bu ayrım dikkatli kullanılmalıdır. Yine de havalandırma, aerodinamik ve proses ölçümlerinde statik-toplam-dinamik ayrımı temel bir mühendislik dilidir.",
      ],
    },
    {
      title: "Basınç yüksekliği ve pompa basma yüksekliği",
      paragraphs: [
        "Basınç yüksekliği, belirli bir basıncın eşdeğer akışkan sütunu yüksekliği olarak ifade edilmesidir. Temel ilişki h = P / (ρg) biçimindedir. Böylece aynı basınç farklı yoğunluktaki akışkanlar için farklı yükseklik karşılığına sahip olur.",

        "Pompa sistemlerinde basınç çoğu zaman doğrudan pascal veya bar yerine metre akışkan sütunu cinsinden yorumlanır. Çünkü pompanın görevi akışkana yalnızca basınç kazandırmak değil, aynı zamanda belirli bir yükseklik, sürtünme kaybı ve hız bileşenini karşılayacak enerji sağlamaktır. Bu nedenle basma yüksekliği kavramı saha mühendisliği açısından çok pratiktir.",

        "Basınç yüksekliği ile geometrik yükseklik aynı kavram değildir. Boru kayıpları, hız yükü ve yerel dirençler hesaba katılmadan yalnızca manometre okumasına bakmak, pompa seçimi ve sistem dengelemesinde hatalı sonuçlar doğurabilir. Özellikle su, yağ ve proses akışkanlarında yoğunluk farkları dönüşümün dikkatle yapılmasını gerektirir.",
      ],
    },
    {
      title: "Basınç birimleri neden farklıdır?",
      paragraphs: [
        "Basınç birimlerinin çeşitlenmesi büyük ölçüde tarihsel ve sektörel nedenlere dayanır. SI sistemi pascalı esas alırken, endüstride bar, tıpta mmHg, meteorolojide milibar, otomotivde PSI ve bazı eski teknik dokümanlarda at gibi birimler kullanılmaya devam eder. Bu durum farklı alanların kendi kullanım alışkanlıklarını korumasından kaynaklanır.",

        "Bazı birimler kullanıcıya daha sezgisel gelir. Örneğin lastik basıncı 240 kPa yerine yaklaşık 35 psi olarak, proses basıncı ise 350 000 Pa yerine 3,5 bar olarak daha okunabilir olabilir. Birimin seçimi yalnızca doğrulukla değil, raporlama kültürü, cihaz ölçeklemesi ve saha alışkanlığıyla da ilgilidir.",

        "Ancak farklı birimler aynı fiziksel büyüklüğü ifade ettiği için ortak hesaplarda dikkatli dönüşüm zorunludur. Özellikle yaklaşık ve kesin tanımlı katsayıların karıştırılması, gösterge-mutlak ayrımının gözden kaçırılması ve simgelerin yanlış okunması önemli hata kaynaklarıdır.",
      ],
    },
    {
      title: "Basınç nasıl ölçülür?",
      paragraphs: [
        "Basınç ölçümü yapılırken önce hangi basınç türünün gerektiği belirlenmelidir: mutlak, gösterge ya da diferansiyel. Ardından ölçüm aralığı, akışkan türü, sıcaklık, kimyasal uyumluluk, titreşim ve gerekli doğruluk seviyesi değerlendirilir. Aynı sensör her uygulama için uygun olmayabilir.",

        "Düşük basınç ve fark ölçümlerinde diyaframlı diferansiyel transmitterler, yüksek proses basınçlarında strain-gage veya piezorezistif elemanlar, vakum uygulamalarında ise özel mutlak sensörler kullanılabilir. Sıvı kolonlu manometreler temel prensibi öğretmek için çok yararlıdır; ancak modern endüstride elektronik cihazlar daha yaygındır.",

        "Doğru ölçüm için impuls hatlarının yerleşimi, sensör montaj konumu, sıfır ayarı ve sıcaklık etkileri dikkate alınmalıdır. Gaz ve sıvı hatlarında yoğunluk farkı veya yoğuşma oluşumu sensör üzerinde ek hidrostatik yük yaratabilir. Bu nedenle cihaz seçimi kadar kurulum ayrıntıları da sonucu belirler.",
      ],
    },
    {
      title: "Basınç sensörleri ve manometreler",
      paragraphs: [
        "Mekanik manometreler, örneğin Bourdon tüplü göstergeler, basıncı elastik eleman deformasyonu üzerinden okunabilir ibre hareketine dönüştürür. Dayanıklı, basit ve enerji gerektirmeyen yapıları nedeniyle endüstride uzun süredir kullanılmaktadır. Ancak hassasiyet ve veri kaydı gerektiren uygulamalarda elektronik sensörler daha esnektir.",

        "Elektronik basınç sensörleri piezorezistif, kapasitif, strain-gage veya rezonans temelli olabilir. Bu sensörler basınç değişimini elektrik sinyaline dönüştürerek PLC, SCADA veya veri toplama sistemlerine aktarır. Böylece yalnızca anlık gösterge değil, alarm, kontrol ve trend analizi de mümkün olur.",

        "Diferansiyel manometreler iki nokta arasındaki basınç farkını, mutlak sensörler tam vakuma göre basıncı, gösterge cihazları ise atmosfere göre basıncı verir. Bir cihazın teknik veri sayfasında referans tipini doğrulamadan yalnızca sayı değerine bakmak ciddi yorum hatalarına yol açabilir.",
      ],
    },
    {
      title: "Mühendislikte basınç kullanım alanları",
      paragraphs: [
        "Basınç; borulama, HVAC, hidrolik, pnömatik, kimyasal proses, enerji santralleri, su dağıtım sistemleri, otomotiv ve havacılık gibi çok sayıda mühendislik alanında temel tasarım değişkenidir. Tank cidarı kalınlığından vana seçimlerine, kompresör çıkış şartlarından filtre performansına kadar pek çok karar basınç bilgisine dayanır.",

        "Proses mühendisliğinde reaktör, kazan, eşanjör ve ayırıcı kapların güvenli işletilmesi için basınç sınırları izlenir. Basınç emniyet vanaları, patlama diskleri ve kontrol döngüleri bu nedenle kritik ekipmanlardır. Basınç aynı zamanda debi ve seviye gibi başka proses değişkenlerinin dolaylı ölçümünde de kullanılır.",

        "Makine ve yapı mühendisliğinde basınç, temas yüzeyleri ve akışkan kuvvetleri üzerinden gerilme analizleriyle birleşir. Tıp ve biyomedikal cihazlarda kan basıncı, ventilasyon basınçları ve vakum uygulamaları; çevre ve meteorolojide ise atmosferik ve diferansiyel basınç ölçümleri ön plana çıkar.",
      ],
    },
    {
      title: "Basınç ölçümünde sıcaklık, yükseklik ve belirsizlik",
      paragraphs: [
        "Sıcaklık, hem ölçülen akışkanın özelliklerini hem de sensör elemanının davranışını etkileyebilir. Özellikle gazlarda sıcaklık değişimi yoğunluğu değiştirdiği için basınç-hacim-sıcaklık ilişkisi yeniden değerlendirilmelidir. Sensör veri sayfalarında sıcaklığa bağlı sıfır kayması ve span kayması gibi parametreler bu yüzden yer alır.",

        "Yükseklik arttıkça atmosfer basıncı genellikle azalır. Bu durum gösterge ve mutlak basınç arasındaki ilişkiyi değiştirir; ayrıca bazı saha cihazlarının referans davranışını etkileyebilir. Aynı proses koşulu farklı rakımlarda farklı mutlak basınç sonuçları doğurabilir.",

        "Her ölçüm bir belirsizlik taşır. Kalibrasyon standardı, çözünürlük, histerezis, sıcaklık etkisi, montaj yönü, titreşim ve uzun dönemli sürüklenme toplam belirsizliğe katkıda bulunur. Kritik uygulamalarda yalnızca nominal basınç değeri değil, cihaz sınıfı ve ölçüm güvenilirliği de tasarım kararına dahil edilmelidir.",
      ],
    },
    {
      title: "Basınç ile gerilme arasındaki ilişki ve fark",
      paragraphs: [
        "Basınç ile gerilme aynı boyut yapısına sahiptir ve ikisi de pascal cinsinden ifade edilebilir. Bu benzerlik, her ikisinin de birim alan başına kuvvet etkisini temsil etmesinden kaynaklanır. Ancak bu durum onların fiziksel olarak tamamen aynı büyüklük olduğu anlamına gelmez.",

        "Basınç çoğunlukla akışkanların uyguladığı izotropik normal gerilme biçiminde düşünülür; yani durgun bir akışkanda aynı noktadaki basınç her yönde aynıdır. Katı mekaniğindeki gerilme ise normal ve kayma bileşenleri içerebilir, yön bağımlıdır ve tensörel yapıdadır.",

        "Bu ayrımı gözden kaçırmak özellikle kap cidarı, conta yüzeyi veya malzeme dayanımı hesaplarında hatalı yorumlara neden olabilir. Bir akışkanın iç basıncı kap üzerinde çevresel ve eksenel gerilmeler oluşturur; fakat kap malzemesindeki gerilme alanı, akışkan basıncının kendisiyle bire bir aynı şey değildir.",
      ],
    },
    {
      title: "Yaygın basınç hesaplama hataları",
      paragraphs: [
        "En sık görülen hata, gösterge basıncı ile mutlak basıncı birbirine karıştırmaktır. Özellikle gaz yasaları, yoğunluk hesapları ve vakum uygulamalarında mutlak basınç gerekirken manometre üzerindeki gösterge değeri doğrudan kullanılabilmektedir. Bu da sonuçta sistematik hata oluşturur.",

        "Bir diğer hata, dönüşüm katsayılarını yuvarlayarak veya yanlış birim referansını kullanarak işlem yapmaktır. PSI, bar, atm, mmHg ve kPa arasında dönüşüm yapılırken yaklaşık değerlerin hangi hassasiyet düzeyinde yeterli olduğuna karar verilmelidir. Cihaz kalibrasyonu yüksek hassasiyet gerektiriyorsa eksik basamak kullanımı sorun yaratabilir.",

        "Hidrostatik etkilerin ihmal edilmesi, sensör montaj yüksekliğinin göz ardı edilmesi ve sıcaklık etkisinin hesaba katılmaması da yaygındır. Özellikle sıvı dolu impuls hatları, kapalı tanklar ve diferansiyel basınç uygulamalarında küçük görünen kurulum ayrıntıları ölçüm sonucunu anlamlı ölçüde değiştirebilir.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Pascal",
      symbol: "Pa",
      referenceValue: "1 Pa",
      system: "SI",
      commonUse: "Bilimsel ve mühendislik hesaplamaları",
    },
    {
      name: "Kilopascal",
      symbol: "kPa",
      referenceValue: "1 000 Pa",
      system: "SI",
      commonUse: "Tesisat, lastik ve proses basınçları",
    },
    {
      name: "Megapascal",
      symbol: "MPa",
      referenceValue: "1 000 000 Pa",
      system: "SI",
      commonUse: "Hidrolik sistemler ve malzeme gerilmesi",
    },
    {
      name: "Bar",
      symbol: "bar",
      referenceValue: "100 000 Pa",
      system: "Metrik, SI dışı",
      commonUse: "Endüstri, kompresör ve proses sistemleri",
    },
    {
      name: "Milibar",
      symbol: "mbar",
      referenceValue: "100 Pa",
      system: "Metrik, SI dışı",
      commonUse: "Meteoroloji ve atmosfer ölçümleri",
    },
    {
      name: "Standart atmosfer",
      symbol: "atm",
      referenceValue: "101 325 Pa",
      system: "SI dışı",
      commonUse: "Atmosfer ve referans koşulları",
    },
    {
      name: "PSI",
      symbol: "psi",
      referenceValue: "≈ 6 894,757293 Pa",
      system: "İngiliz/ABD",
      commonUse: "Lastikler, hidrolik ve pnömatik sistemler",
    },
    {
      name: "Teknik atmosfer",
      symbol: "at",
      referenceValue: "98 066,5 Pa",
      system: "SI dışı",
      commonUse: "Eski teknik ve mühendislik uygulamaları",
    },
    {
      name: "Milimetre cıva",
      symbol: "mmHg",
      referenceValue: "≈ 133,322 Pa",
      system: "SI dışı",
      commonUse: "Tıp, vakum ve basınç ölçümleri",
    },
    {
      name: "Milimetre su sütunu",
      symbol: "mmH₂O",
      referenceValue: "≈ 9,80665 Pa",
      system: "SI dışı",
      commonUse: "Düşük basınç ve havalandırma ölçümleri",
    },
  ],
};
