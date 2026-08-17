import type { UnitArticle } from "../unitArticles";

export const pascalArticle: UnitArticle = {
  slug: "pascal",

  introduction: [
    "Pascal, Uluslararası Birim Sistemi'nde basıncın ve mekanik gerilmenin türetilmiş birimidir ve Pa sembolüyle gösterilir. Meteorolojiden makine mühendisliğine, tıbbi cihazlardan malzeme bilimine kadar çok geniş bir kullanım alanına sahiptir.",

    "Pascal, bir newtonluk kuvvetin bir metrekarelik alana düzgün biçimde dağılmasıyla oluşan basınca eşittir: 1 Pa = 1 N/m². Günlük ölçekte pascal genellikle küçük kaldığı için mühendislikte kilopascal, megapascal ve gigapascal gibi katları; meteorolojide ise hektopascal tercih edilir.",
  ],

  keyFacts: [
    {
      label: "Birim adı",
      value: "Pascal",
    },
    {
      label: "Sembolü",
      value: "Pa",
    },
    {
      label: "Ölçtüğü büyüklük",
      value: "Basınç ve mekanik gerilme",
    },
    {
      label: "Birim sistemi",
      value: "Uluslararası Birim Sistemi (SI, türetilmiş birim)",
    },
    {
      label: "1 pascal",
      value: "1 N/m²",
    },
    {
      label: "1 bar",
      value: "100 000 Pa",
    },
    {
      label: "1 standart atmosfer",
      value: "101 325 Pa",
    },
  ],

  sections: [
    {
      title: "Pascal nedir?",
      paragraphs: [
        "Pascal, bir yüzeye dik doğrultuda etkiyen kuvvetin bu yüzeyin alanına bölünmesiyle elde edilen basıncı ifade eden SI birimidir. Bir nesnenin üzerine uygulanan kuvvet ne kadar küçük bir alana yayılırsa, aynı kuvvet altında pascal cinsinden basınç o kadar büyük olur.",

        "Pascal yalnızca akışkan basıncını değil, katı malzemeler içindeki mekanik gerilmeyi de ifade etmek için kullanılır. Bu nedenle malzeme dayanımı, elastisite modülü ve akışkanlar mekaniği gibi birbirinden farklı görünen alanlar aynı birim üzerinden ortak bir dile kavuşur.",

        "Pascal küçük bir birim olduğu için günlük mühendislik değerleri çoğu zaman kilopascal (kPa), megapascal (MPa) veya gigapascal (GPa) cinsinden ifade edilir. Örneğin standart atmosfer basıncı yaklaşık 101,325 kPa, çeliğin elastisite modülü ise yaklaşık 200 GPa mertebesindedir.",
      ],
    },
    {
      title: "Pascal neden ortaya çıktı?",
      paragraphs: [
        "1971'den önce basınç için SI içinde özel bir birim adı bulunmuyordu; büyüklük newton bölü metrekare (N/m²) biçiminde, birleşik bir ifadeyle gösteriliyordu. Bununla birlikte pratikte pek çok farklı, tarihsel kökenli birim bir arada kullanılıyordu: atmosfer, bar, milimetre cıva, PSI ve teknik atmosfer gibi.",

        "Bu birimlerin bir kısmı belirli bir ölçüm aletine (cıvalı barometre gibi), bir kısmı ise belirli bir mühendislik geleneğine (kuvvet birimi lbf ve alan birimi inçkareye dayanan PSI gibi) bağlıydı. Aynı fiziksel büyüklüğün bu kadar çok farklı birimle ifade edilmesi, bilimsel ve teknik iletişimde dönüşüm hatası riskini artırıyordu.",

        "SI sisteminin türetilmiş birimlere kısa, tanınabilir özel adlar verme yaklaşımı basınç için de uygulandı ve newton bölü metrekare ifadesine pascal adı verildi. Bu adımla basınç, diğer SI birimleriyle tutarlı, tek bir ortak referansa bağlandı.",
      ],
    },
    {
      title: "Blaise Pascal kimdir?",
      paragraphs: [
        "Blaise Pascal, 19 Haziran 1623'te Clermont-Ferrand'da doğmuş, 19 Ağustos 1662'de Paris'te ölmüş Fransız matematikçi, fizikçi, mucit ve filozoftur. Genç yaşta matematik ve geometri alanında önemli katkılar yapmış, olasılık kuramının temellerinin atılmasına katkıda bulunmuştur.",

        "Pascal'ın fizik alanındaki en kalıcı katkılarından biri akışkanlar statiği üzerine yaptığı çalışmalardır. Basıncın bir akışkan içinde nasıl iletildiğini ve atmosferin ağırlığının nasıl ölçülebileceğini sistematik biçimde incelemiştir.",

        "Pascal'ın basınç ve hidrostatikle ilgili çalışmaları, üç asır sonra SI sisteminde basınç biriminin kendi adıyla anılmasına yol açmıştır. 14. Genel Ağırlıklar ve Ölçüler Konferansı (CGPM) 1971 yılında bu birime resmî olarak pascal adını vermiştir.",
      ],
    },
    {
      title: "Puy-de-Dôme deneyi ve atmosfer basıncı",
      paragraphs: [
        "1647 yılında Blaise Pascal, havanın bir ağırlığa sahip olduğu ve bu ağırlığın barometredeki cıva sütununu dengelediği fikrini test etmek için bir deney önerdi: Torricelli tipi bir cıvalı barometre farklı yüksekliklere taşınırsa, cıva sütununun boyu değişmeliydi.",

        "Bu deney 19 Eylül 1648'de Pascal'ın eniştesi Florin Périer tarafından Fransa'daki Puy-de-Dôme dağında gerçekleştirildi. Périer, dağın eteğinde ölçtüğü cıva sütunu yüksekliğini zirveye çıktığında tekrar ölçtü ve sütunun belirgin biçimde kısaldığını gözlemledi.",

        "Sonuç, atmosfer basıncının sabit olmadığını ve yükseklikle azaldığını açıkça gösterdi. Bu deney, atmosfer basıncının hava sütununun ağırlığından kaynaklandığı görüşünü güçlü biçimde destekleyen erken dönem kanıtlarından biri kabul edilir.",
      ],
    },
    {
      title: "Pascal ilkesi ve hidrolik sistemler",
      paragraphs: [
        "Pascal, kapalı bir kap içindeki durgun bir akışkana uygulanan basıncın, akışkanın her noktasına ve kabın iç yüzeyine eşit şiddette iletildiğini ortaya koydu. Bu ilke günümüzde Pascal ilkesi veya Pascal yasası olarak anılır.",

        "Pascal'ın hidrostatikle ilgili bulguları, 'Traité de l'équilibre des liqueurs' (Sıvıların Dengesi Üzerine İnceleme) adlı eserinde toplanmıştır. Eser 1653 yılı civarında yazılmış, ancak Pascal'ın ölümünden sonra 1663 yılında yayımlanmıştır.",

        "Pascal ilkesi, küçük bir kuvvetle geniş bir alanda büyük bir kuvvet oluşturmayı mümkün kılan hidrolik preslerin, fren sistemlerinin ve pek çok endüstriyel aktüatörün çalışma mantığının temelini oluşturur.",
      ],
    },
    {
      title: "Pascal biriminin SI'ya girişi",
      paragraphs: [
        "14. Genel Ağırlıklar ve Ölçüler Konferansı (CGPM), 1971 yılında newton bölü metrekare (N/m²) biçimindeki SI birimine 'pascal' özel adını vermiştir. Bu karar, Uluslararası Ağırlıklar ve Ölçüler Bürosu'nun (BIPM) resmî kayıtlarında yer alır.",

        "Özel ad verilmesi, basıncın matematiksel tanımını değiştirmez; yalnızca N/m² ifadesine kısa, tanınabilir bir isim kazandırır. Bu sayede basınç, diğer türetilmiş SI birimleri (joule, watt, newton gibi) ile aynı adlandırma mantığına kavuşmuştur.",

        "Pascal biriminin kabulünden sonra da bar, atmosfer, PSI ve mmHg gibi SI dışı birimler pek çok sektörde kullanılmaya devam etmiştir; ancak bunların tümü artık ortak ve kesin biçimde tanımlanmış pascal üzerinden birbirine bağlanabilmektedir.",
      ],
    },
    {
      title: "Pascal biriminin sembolü nasıl yazılır?",
      paragraphs: [
        "Pascal biriminin sembolü büyük P harfiyle yazılır: Pa. SI kuralına göre bir kişinin adından türetilen birimlerin sembolü büyük harfle başlar, ancak birimin tam adı yazıldığında küçük harfle başlar: 'beş pascal' ifadesinde birim adı küçük harfle, sembol kullanıldığında ise '5 Pa' biçiminde büyük P ile yazılır.",

        "Sayısal değer ile birim sembolü arasında boşluk bırakılması önerilir: 100 Pa doğru kullanıma örnektir. Sembole çoğul eki getirilmez; yüz pascal için 100 Pa yazılır, 100 Pa'lar biçiminde bir kullanım söz konusu değildir.",

        "Katları oluşturulurken standart SI ön ekleri kullanılır: kilopascal kPa, megapascal MPa, gigapascal GPa biçiminde yazılır. Meteorolojide sık kullanılan hektopascal ise hPa sembolüyle gösterilir ve 1 hPa tam olarak 100 Pa'a eşittir.",
      ],
    },
    {
      title: "Pascal nerelerde kullanılır?",
      paragraphs: [
        "Meteorolojide atmosfer basıncı geleneksel olarak hektopascal (hPa) cinsinden raporlanır; bu değer sayısal olarak eski milibar biriminle aynıdır. Hava durumu haritalarındaki basınç merkezleri ve cephe sistemleri genellikle hPa cinsinden gösterilir.",

        "Mühendislikte pascal ve katları; hidrolik sistem basınçları, boru hattı tasarımı, kompresör ve vakum ekipmanı, malzeme gerilmesi ve elastisite modülü gibi çok çeşitli hesaplarda kullanılır. Malzeme dayanımı genellikle megapascal veya gigapascal mertebesinde ifade edilir.",

        "Tıpta ve biyomedikal mühendislikte kan basıncı geleneksel olarak mmHg ile ifade edilse de solunum gazları basıncı, ventilatör ayarları ve bazı laboratuvar ölçümlerinde kilopascal cinsinden değerler de kullanılır. Endüstriyel proses kontrolünde ise basınç sensörlerinin çoğu doğrudan pascal tabanlı çıkış üretir.",
      ],
    },
    {
      title: "Pascal ve diğer basınç birimleri",
      paragraphs: [
        "1 bar tam olarak 100 000 Pa'a, 1 standart atmosfer tam olarak 101 325 Pa'a eşittir. Bu iki birim de tanım gereği kesin değerlerle pascala bağlanır; ölçüme dayalı yaklaşık değerler değildir.",

        "1 PSI (pound-force per square inch) yaklaşık 6894,757293168 Pa'a, 1 mmHg (milimetre cıva) yaklaşık 133,322387415 Pa'a eşittir. Bu değerler, kuvvet ve uzunluk birimlerinin kendi kesin tanımlarından türetildiği için yüksek hassasiyetle bilinir.",

        "Dönüşüm yapılırken hangi birimin mutlak, hangisinin gösterge basıncını ifade ettiğine dikkat edilmelidir. Örneğin bir manometre üzerindeki '2 bar' okuması çoğu zaman atmosfere göre gösterge basıncını belirtir; pascal cinsinden mutlak basınca çevrilirken atmosfer basıncının ayrıca eklenmesi gerekebilir.",
      ],
    },
  ],

  timeline: [
    {
      year: "1623",
      title: "Blaise Pascal'ın doğumu",
      description:
        "Blaise Pascal, 19 Haziran 1623'te Clermont-Ferrand'da doğdu.",
    },
    {
      year: "1647",
      title: "Atmosfer basıncı hipotezi",
      description:
        "Pascal, havanın ağırlığının barometre üzerindeki etkisini test etmek için bir dağ deneyi önerdi.",
    },
    {
      year: "1648",
      title: "Puy-de-Dôme deneyi",
      description:
        "Florin Périer, Pascal'ın önerisiyle Puy-de-Dôme dağında barometre deneyini gerçekleştirerek atmosfer basıncının yükseklikle azaldığını gösterdi.",
    },
    {
      year: "1653",
      title: "Sıvıların dengesi üzerine inceleme",
      description:
        "Pascal, hidrostatik ilkelerini ve basıncın akışkan içinde iletilmesini ele aldığı eserini kaleme aldı; eser 1663'te ölümünden sonra yayımlandı.",
    },
    {
      year: "1662",
      title: "Blaise Pascal'ın ölümü",
      description: "Blaise Pascal, 19 Ağustos 1662'de Paris'te öldü.",
    },
    {
      year: "1954",
      title: "Standart atmosferin tanımlanması",
      description:
        "10. CGPM, standart atmosferi tam olarak 101 325 Pa olarak tanımladı.",
    },
    {
      year: "1971",
      title: "Pascal biriminin SI'ya kabulü",
      description:
        "14. CGPM, newton bölü metrekare birimine 'pascal' özel adını verdi.",
    },
  ],

  questions: [
    {
      question: "1 Pascal kaç bar eder?",
      answer:
        "1 pascal 0,00001 bar'a (10 mikrobar) eşittir. Pascalı bara çevirmek için değer 100 000'e bölünür.",
    },
    {
      question: "1 bar kaç Pascal eder?",
      answer:
        "1 bar tam olarak 100 000 Pa'a eşittir. Barı pascala çevirmek için değer 100 000 ile çarpılır.",
    },
    {
      question: "Pascal birimi kimin adını taşır?",
      answer:
        "Pascal birimi, akışkanlar statiği ve basınç üzerine çalışmalar yapan Fransız matematikçi ve fizikçi Blaise Pascal'ın (1623-1662) adını taşır.",
    },
    {
      question: "1 atmosfer kaç Pascal'dır?",
      answer:
        "1 standart atmosfer tam olarak 101 325 Pa'a eşittir. Bu değer ölçüme dayalı değil, uluslararası olarak tanımlanmış kesin bir değerdir.",
    },
    {
      question: "Pascal ne zaman SI birimi oldu?",
      answer:
        "Pascal, 1971 yılında 14. Genel Ağırlıklar ve Ölçüler Konferansı (CGPM) tarafından newton bölü metrekare biriminin özel adı olarak kabul edildi.",
    },
    {
      question: "Pascal sembolü neden büyük P ile yazılır?",
      answer:
        "SI kuralına göre bir bilim insanının adından türetilen birimlerin sembolü büyük harfle yazılır. Birimin tam adı ise cümle içinde küçük harfle yazılır: pascal, sembolü Pa.",
    },
  ],
};
