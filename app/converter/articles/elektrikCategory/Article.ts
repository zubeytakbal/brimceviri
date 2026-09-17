import type { CategoryArticle } from "../../categoryArticles";

export const elektrikCategoryArticle: CategoryArticle = {
  slug: "elektrik",

  introduction: [
    "Elektrik, gerilim (potansiyel fark) ve akım (yük akışı) gibi birbiriyle ilişkili ama farklı fiziksel büyüklüklerden oluşan geniş bir alandır. Bu kategori, günlük elektrik işlerinde en sık karşılaşılan iki temel büyüklüğü -- volt (gerilim) ve amper (akım) -- bir arada toplar.",

    "Gerilim ve akım aynı fiziksel büyüklük değildir ve doğrudan birbirine çevrilemez; aralarındaki ilişki Ohm Yasası (V = I × R) ile, devredeki dirence bağlı olarak kurulur. Bu sayfadaki dönüşümler her büyüklüğü kendi içinde (volt-kilovolt, amper-miliamper gibi) ele alır.",
  ],

  facts: [
    {
      label: "Gerilim biriminin adı",
      value: "Volt (Alessandro Volta'nın onuruna)",
    },
    {
      label: "Akım biriminin adı",
      value: "Amper (André-Marie Ampère'in onuruna)",
    },
    {
      label: "SI temel birimi (akım)",
      value: "Amper (A) -- SI'nin 7 temel biriminden biri",
    },
    {
      label: "Gerilim-akım-direnç ilişkisi",
      value: "Ohm Yasası: V = I × R",
    },
    {
      label: "Türkiye şebeke gerilimi",
      value: "230 V (tek faz), 400 V (üç faz)",
    },
  ],

  sections: [
    {
      title: "Gerilim (volt) nedir?",
      paragraphs: [
        "Gerilim (voltaj), bir elektrik devresindeki iki nokta arasındaki elektriksel potansiyel farkını ifade eder ve elektronların bir noktadan diğerine akmasını sağlayan 'itici güç' olarak düşünülebilir. SI birimi volttur (V).",
        "Volt birimi, elektrik pilini icat eden İtalyan fizikçi Alessandro Volta'nın onuruna adlandırılmıştır. Bir pilin üzerinde yazan '1,5 V' veya '9 V' gibi değerler, o pilin sağlayabileceği potansiyel farkı ifade eder.",
      ],
    },
    {
      title: "Akım (amper) nedir?",
      paragraphs: [
        "Elektrik akımı, bir iletkenden birim zamanda geçen elektrik yükü miktarını ifade eder ve SI birimi amperdir (A). Bir amper, saniyede yaklaşık 6,242 × 10¹⁸ elektronun bir noktadan geçmesine karşılık gelir.",
        "Amper birimi, elektromanyetizmanın kurucularından Fransız fizikçi André-Marie Ampère'in onuruna adlandırılmıştır. Amper, 2019 SI revizyonundan önce SI'nin temel birimlerinden biriydi; bugün de temel büyüklük olarak kabul edilmeye devam eder, ancak artık temel yük sabitine (e) dayanarak tanımlanır.",
      ],
    },
    {
      title: "Gerilim ve akım neden birbirine çevrilemez?",
      paragraphs: [
        "Gerilim (V) ve akım (A) farklı fiziksel büyüklüklerdir -- biri potansiyel farkı, diğeri yük akış hızını ifade eder. Bu yüzden 'X volt kaç amper eder' sorusunun tek başına, devredeki direnç (veya güç) bilinmeden bir cevabı yoktur.",
        "İkisi arasındaki ilişki Ohm Yasası ile kurulur: V = I × R (Gerilim = Akım × Direnç). Örneğin 12 voltluk bir gerilim, 4 ohm'luk bir dirençten geçtiğinde 3 amperlik bir akım oluşturur; ama aynı 12 volt farklı bir dirençte tamamen farklı bir akım değeri üretir.",
      ],
    },
    {
      title: "Güç, gerilim ve akım ilişkisi",
      paragraphs: [
        "Elektriksel güç (watt), gerilim ile akımın çarpımına eşittir: P = V × I. Bu formül, aynı güçteki bir cihazın yüksek gerilimde daha düşük akım, düşük gerilimde ise daha yüksek akım çekeceğini gösterir.",
        "Bu ilişki, elektrik dağıtım şebekelerinin neden yüksek gerilimle çalıştığını açıklar: aynı gücü daha düşük akımla taşımak, iletim hatlarındaki direnç kaynaklı enerji kaybını (Joule ısınması) önemli ölçüde azaltır.",
      ],
    },
    {
      title: "Türkiye ve dünyada şebeke gerilimi",
      paragraphs: [
        "Türkiye'de konut tesisatında standart şebeke gerilimi tek faz için 230 volt, sanayi ve ticari tesislerde kullanılan üç faz sistemler için ise 400 volttur (50 Hz frekansla).",
        "Dünya genelinde şebeke gerilimi ülkeden ülkeye değişir; ABD ve Kanada gibi ülkeler 120 volt kullanırken, Avrupa'nın çoğu, Türkiye dahil, 230 volt tercih eder. Bu fark, yurt dışından getirilen elektrikli cihazların bir dönüştürücü olmadan doğrudan kullanılamamasının başlıca nedenidir.",
      ],
    },
    {
      title: "Doğru akım (DC) ve alternatif akım (AC)",
      paragraphs: [
        "Doğru akımda (DC) elektronlar tek yönde sabit olarak akar -- piller ve güneş panelleri DC üretir. Alternatif akımda (AC) ise akımın yönü saniyede belirli bir frekansla (Türkiye'de 50 Hz, yani saniyede 50 kez) tersine döner -- şebeke elektriği AC'dir.",
        "AC'nin şebeke dağıtımında tercih edilmesinin başlıca nedeni, transformatörler aracılığıyla gerilimin kolayca yükseltilip düşürülebilmesidir; bu da elektriğin uzun mesafelere düşük kayıpla taşınmasını mümkün kılar.",
      ],
    },
    {
      title: "Elektrik akımının insan vücuduna etkisi",
      paragraphs: [
        "İnsan vücudundan geçen akımın büyüklüğü, hissedilen etkiyi belirler: yaklaşık 1 miliamper akım hafifçe hissedilirken, 10-20 miliamper kas kasılmasına (elini bırakamama), 100 miliamper üzeri ise kalp ritim bozukluğuna (fibrilasyon) ve ölüme yol açabilir.",
        "Bu yüzden elektrik güvenliğinde sadece gerilim değil, devrede oluşabilecek akımın büyüklüğü de belirleyicidir -- düşük gerilimli ama düşük dirençli (örneğin nemli) bir ortamda bile tehlikeli düzeyde akım oluşabilir.",
      ],
    },
  ],

  unitTable: [
    {
      name: "Milivolt",
      symbol: "mV",
      referenceValue: "0,001 V",
      system: "SI/metrik",
      commonUse: "Sensör ve biyoelektrik sinyaller",
    },
    {
      name: "Volt",
      symbol: "V",
      referenceValue: "1 V",
      system: "SI",
      commonUse: "Pil, şebeke ve devre gerilimi",
    },
    {
      name: "Kilovolt",
      symbol: "kV",
      referenceValue: "1000 V",
      system: "SI/metrik",
      commonUse: "Yüksek gerilim iletim hatları",
    },
    {
      name: "Miliamper",
      symbol: "mA",
      referenceValue: "0,001 A",
      system: "SI/metrik",
      commonUse: "Elektronik devre akımları",
    },
    {
      name: "Amper",
      symbol: "A",
      referenceValue: "1 A",
      system: "SI",
      commonUse: "Ev tesisatı ve cihaz akımı",
    },
    {
      name: "Kiloamper",
      symbol: "kA",
      referenceValue: "1000 A",
      system: "SI/metrik",
      commonUse: "Kısa devre ve endüstriyel akımlar",
    },
  ],
};
