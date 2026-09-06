// Oncelikli elementler icin zenginlestirilmis icerik. Periyodik tablonun
// temel verisinin (periodicTableData.ts) uzerine bindirilen bir "makale"
// katmanidir -- makale yoksa element sayfasi yalnizca temel sayisal
// verilerle (atom numarasi, kutle, kategori) render edilir.

export type ElementArticleSection = {
  title: string;
  paragraphs: string[];
};

export type ElementTimelineItem = {
  year: string;
  title: string;
  description: string;
};

export type ElementArticle = {
  slug: string;
  introduction: string[];
  discoverySummary: string;
  meltingPointC: string;
  boilingPointC: string;
  densityGCm3: string;
  electronConfiguration: string;
  uses: string[];
  /**
   * Opsiyonel, degisken sayida ve degisken basliklarda bolum -- her
   * element ayni "kesif + kullanim" kalibina zorlanmasin diye eklendi.
   * Doluysa detay sayfasi discoverySummary yerine bunu render eder.
   */
  sections?: ElementArticleSection[];
  /** Opsiyonel gorsel zaman cizelgesi -- doluysa unit-timeline stiliyle render edilir. */
  timeline?: ElementTimelineItem[];
  /** findElementArticle tarafindan elementRelations haritasindan doldurulur. */
  relatedElements?: string[];
};

export const elementArticles: ElementArticle[] = [
  {
    slug: "helyum",
    introduction: [
      "Helyum, hidrojenden sonra evrendeki en bol ikinci elementtir, ama Dünya atmosferinde çok az bulunur çünkü çok hafif olduğu için yerçekimini yenip uzaya kaçar.",
      "Kimyasal olarak tamamen inert (tepkimeye girmez) bir soy gazdır ve normal atmosfer basıncında hiçbir sıcaklıkta katılaşmaz -- katı hâle geçmesi için ekstra basınç uygulanması gerekir.",
    ],
    discoverySummary:
      "1868'de Fransız gökbilimci Pierre Janssen tarafından bir güneş tutulması sırasında Güneş'in spektrumunda keşfedildi; adı Yunanca güneş anlamına gelen 'helios'tan gelir.",
    meltingPointC: "-272,20 (yalnızca yüksek basınçta)",
    boilingPointC: "-268,93",
    densityGCm3: "0,0001785 (gaz)",
    electronConfiguration: "1s²",
    uses: [
      "Balon ve zeplin doldurmada (hidrojenden daha güvenli, yanmaz)",
      "MRI cihazlarında süper iletken mıknatısları soğutmada (sıvı helyum)",
      "Derin deniz dalışında nefes karışımlarında",
      "Kriyojenik (aşırı düşük sıcaklık) araştırmalarda",
    ],
  },
  {
    slug: "lityum",
    introduction: [
      "Lityum, en hafif metal ve en hafif katı elementtir -- suya atıldığında yüzebilir (tabii ki aynı zamanda şiddetle tepkimeye de girer).",
      "Modern taşınabilir teknolojinin temel taşlarından biridir: cep telefonundan elektrikli araca kadar birçok cihazın şarj edilebilir pilinde kullanılır.",
    ],
    discoverySummary:
      "1817'de İsveçli kimyager Johan August Arfwedson tarafından bir mineral örneğinde keşfedildi; adı Yunanca 'taş' anlamına gelen 'lithos'tan gelir çünkü mineral kaynaklı bulunan ilk alkali metaldi.",
    meltingPointC: "180,50",
    boilingPointC: "1342",
    densityGCm3: "0,534",
    electronConfiguration: "[He] 2s¹",
    uses: [
      "Lityum-iyon şarj edilebilir piller (telefon, dizüstü, elektrikli araç)",
      "Bipolar bozukluk tedavisinde lityum karbonat (psikiyatrik ilaç)",
      "Isıya dayanıklı cam ve seramik üretimi",
      "Endüstriyel yağlayıcı gresler",
    ],
  },
  {
    slug: "berilyum",
    introduction: [
      "Berilyum, hafif ama olağanüstü sert ve rijit bir metaldir; bu nadir kombinasyon onu havacılık ve uzay mühendisliğinde vazgeçilmez kılar.",
      "Zümrüt ve akuamarin gibi değerli taşların yeşil-mavi rengi, kristal yapılarındaki berilyum içeriğinden kaynaklanır.",
    ],
    discoverySummary:
      "1798'de Fransız kimyager Louis Nicolas Vauquelin tarafından berilden (bir mineralden) keşfedildi; saf metal hâlde ilk kez 1828'de elde edildi.",
    meltingPointC: "1287",
    boilingPointC: "2470",
    densityGCm3: "1,85",
    electronConfiguration: "[He] 2s²",
    uses: [
      "Havacılık ve uzay alaşımlarında (hafif + yüksek mukavemet)",
      "X-ışını tüplerinde pencere malzemesi (X-ışınlarını kolayca geçirir)",
      "Nükleer reaktörlerde nötron yansıtıcı ve moderatör",
      "Yüksek hassasiyetli aynalar ve optik ekipman",
    ],
  },
  {
    slug: "bor",
    introduction: [
      "Bor, ne tam metal ne de tam ametal sayılan bir yarı metaldir (metaloid) ve bileşiklerinde alışılmadık, üç boyutlu moleküler yapılar oluşturabilir.",
      "Türkiye, dünya bor rezervlerinin büyük bir kısmına sahiptir -- özellikle Kütahya, Eskişehir ve Balıkesir bölgelerindeki yataklarla küresel bor üretiminde önemli bir konumdadır.",
    ],
    discoverySummary:
      "1808'de Fransız kimyagerler Joseph Louis Gay-Lussac ve Louis Jacques Thénard tarafından birbirinden bağımsız olarak izole edildi.",
    meltingPointC: "2076",
    boilingPointC: "3927",
    densityGCm3: "2,34",
    electronConfiguration: "[He] 2s² 2p¹",
    uses: [
      "Borosilikat cam üretimi (Pyrex gibi ısıya dayanıklı cam)",
      "Deterjan ve temizlik ürünlerinde boraks bileşiği olarak",
      "Yarı iletken sanayisinde katkı (dopant) maddesi",
      "Hafif zırh malzemeleri ve balistik koruma",
    ],
  },
  {
    slug: "azot",
    introduction: [
      "Azot, Dünya atmosferinin yaklaşık %78'ini oluşturan, renksiz ve kokusuz bir gazdır; bu bolluğuna rağmen çoğu canlı onu doğrudan kullanamaz çünkü N₂ molekülündeki üçlü bağ son derece kararlıdır.",
      "Tüm proteinlerin ve DNA'nın yapısında bulunan azot, yaşam için vazgeçilmez bir elementtir -- bitkiler onu ancak topraktaki bakteriler veya gübreler aracılığıyla kullanılabilir hâle getirir.",
    ],
    discoverySummary:
      "1772'de İskoç hekim Daniel Rutherford tarafından 'zehirli hava' olarak tanımlanıp izole edildi -- havadan oksijen çıkarıldığında geriye kalan gazın azot olduğu fark edildi.",
    meltingPointC: "-210,00",
    boilingPointC: "-195,79",
    densityGCm3: "0,001251 (gaz)",
    electronConfiguration: "1s² 2s² 2p³",
    uses: [
      "Haber-Bosch prosesiyle amonyak ve gübre üretiminde hammadde",
      "Sıvı azot ile dondurarak saklama ve kriyojenik uygulamalar",
      "Gıda paketlemede oksidasyonu önleyen inert atmosfer",
      "Lastik doldurmada (uçak ve yarış araçları lastiklerinde)",
    ],
  },
  {
    slug: "flor",
    introduction: [
      "Flor, bilinen en reaktif ve en elektronegatif elementtir -- neredeyse tüm elementlerle, hatta bazı soy gazlarla bile tepkimeye girebilir.",
      "Aşırı reaktifliği nedeniyle doğada asla saf hâlde bulunmaz; her zaman başka elementlerle bileşik hâlindedir.",
    ],
    discoverySummary:
      "Uzun yıllar izole edilemeyen tehlikeli bir element olarak bilindi; 1886'da Fransız kimyager Henri Moissan tarafından ilk kez başarıyla izole edildi ve bu başarısı için 1906'da Nobel Kimya Ödülü'nü kazandı.",
    meltingPointC: "-219,67",
    boilingPointC: "-188,11",
    densityGCm3: "0,001696 (gaz)",
    electronConfiguration: "[He] 2s² 2p⁵",
    uses: [
      "Diş macununda çürük önleyici florür bileşikleri",
      "Teflon (PTFE) gibi yapışmaz kaplamaların üretimi",
      "Nükleer yakıt işlemede uranyum hekzaflorür (UF₆) olarak",
      "Bazı ilaçların moleküler yapısında kararlılık sağlayan katkı",
    ],
  },
  {
    slug: "neon",
    introduction: [
      "Neon, kimyasal olarak tamamen inert bir soy gazdır ve en tanıdık özelliği, içinden elektrik akımı geçirildiğinde parlak turuncu-kırmızı ışık yaymasıdır.",
      "Atmosferde çok az miktarda bulunur (hacimce yaklaşık binde 1,8) ve sıvı havanın damıtılmasıyla elde edilir.",
    ],
    discoverySummary:
      "1898'de İskoç kimyager William Ramsay ve İngiliz kimyager Morris Travers tarafından sıvı havanın buharlaştırılması sırasında keşfedildi; adı Yunanca 'yeni' anlamına gelen 'neos'tan gelir.",
    meltingPointC: "-248,59",
    boilingPointC: "-246,05",
    densityGCm3: "0,0009002 (gaz)",
    electronConfiguration: "[He] 2s² 2p⁶",
    uses: [
      "Neon tabelalarda ve reklam ışıklarında karakteristik kırmızı-turuncu ışık",
      "Kriyojenik soğutma sistemlerinde (helyumdan daha ucuz alternatif)",
      "Bazı gaz lazerlerinde (helyum-neon lazeri)",
      "Yüksek voltaj göstergeleri ve dalgıç lambaları",
    ],
  },
  {
    slug: "magnezyum",
    introduction: [
      "Magnezyum, hafif ve dayanıklı bir metaldir; havada yandığında son derece parlak, göz kamaştırıcı beyaz bir ışık çıkarır -- bu özelliği tarihsel fotoğraf flaşlarında ve havai fişeklerde kullanılmıştır.",
      "Bitkilerdeki klorofil molekülünün tam merkezinde yer alır ve bu sayede fotosentez sürecinde kilit bir rol oynar.",
    ],
    discoverySummary:
      "1755'te İskoç kimyager Joseph Black tarafından ayrı bir element olarak tanındı; saf metal hâlde ilk kez 1808'de İngiliz kimyager Humphry Davy tarafından elektroliz yoluyla izole edildi.",
    meltingPointC: "650",
    boilingPointC: "1090",
    densityGCm3: "1,738",
    electronConfiguration: "[Ne] 3s²",
    uses: [
      "Otomotiv ve havacılıkta hafif metal alaşımları",
      "Klorofil molekülünün merkezinde fotosentez için gerekli",
      "Magnezyum takviyeleri (kas ve sinir fonksiyonu için)",
      "Havai fişek ve maden ocağı aydınlatmasında parlak beyaz ışık kaynağı",
    ],
  },
  {
    slug: "aluminyum",
    introduction: [
      "Alüminyum, yer kabuğunda en bol bulunan metaldir; hafifliği, korozyona dayanıklılığı ve kolay şekillendirilebilirliği sayesinde günlük hayatın hemen her alanında karşımıza çıkar.",
      "Saf hâlde üretimi enerji yoğun bir işlem olduğu için, geri dönüştürülmüş alüminyum kullanmak orijinal üretime göre çok daha az enerji gerektirir.",
    ],
    discoverySummary:
      "1825'te Danimarkalı fizikçi Hans Christian Ørsted tarafından ilk kez saf hâlde elde edildi; endüstriyel ölçekte ucuz üretimi ise 1886'da geliştirilen Hall-Héroult elektroliz yöntemiyle mümkün oldu.",
    meltingPointC: "660,32",
    boilingPointC: "2470",
    densityGCm3: "2,70",
    electronConfiguration: "[Ne] 3s² 3p¹",
    uses: [
      "Gıda ambalajı (alüminyum folyo, içecek kutuları)",
      "Uçak gövdesi ve havacılık yapı elemanları",
      "İnşaatta doğrama, çatı ve cephe kaplaması",
      "Elektrik iletim hatlarında yüksek gerilim kabloları",
    ],
  },
  {
    slug: "silisyum",
    introduction: [
      "Silisyum, oksijenden sonra yer kabuğunda kütlece en bol bulunan ikinci elementtir ve modern dijital teknolojinin fiziksel temelini oluşturur -- 'Silikon Vadisi' adı da buradan gelir.",
      "Karbon gibi dört bağ yapabilen bir yarı metaldir, ancak organik kimyanın aksine silisyum bazlı uzun zincirler doğada yaygın değildir.",
    ],
    discoverySummary:
      "1824'te İsveçli kimyager Jöns Jacob Berzelius tarafından saf hâlde ilk kez izole edildi.",
    meltingPointC: "1414",
    boilingPointC: "3265",
    densityGCm3: "2,33",
    electronConfiguration: "[Ne] 3s² 3p²",
    uses: [
      "Bilgisayar çipleri ve tüm modern yarı iletken elektronik",
      "Güneş panellerinde fotovoltaik hücreler",
      "Cam üretiminin ana hammaddesi (silisyum dioksit, kum)",
      "Silikon kauçuk ve yapıştırıcılar (silisyum bazlı polimerler)",
    ],
  },
  {
    slug: "fosfor",
    introduction: [
      "Fosfor, DNA ve RNA'nın omurgasında, hücre zarlarında ve enerji taşıyıcı molekül ATP'de bulunan, yaşam için vazgeçilmez bir elementtir.",
      "Beyaz fosfor karanlıkta hafifçe parlar (fosforışıma/kemilüminesans) ve havada kendiliğinden tutuşabilecek kadar reaktiftir; bu yüzden su altında saklanır.",
    ],
    discoverySummary:
      "1669'da Alman simyacı Hennig Brand tarafından, idrarı buharlaştırarak deneyler yaparken tesadüfen keşfedildi -- bilinen ilk element keşfi olarak kabul edilir.",
    meltingPointC: "44,15 (beyaz fosfor)",
    boilingPointC: "280,5",
    densityGCm3: "1,82 (beyaz fosfor)",
    electronConfiguration: "[Ne] 3s² 3p³",
    uses: [
      "Tarımsal gübre üretiminde temel hammadde",
      "Kibrit üretimi (kırmızı fosfor)",
      "DNA, RNA ve ATP'nin yapısında biyolojik olarak zorunlu",
      "Deterjan ve alev geciktirici kimyasallarda",
    ],
  },
  {
    slug: "kukurt",
    introduction: [
      "Kükürt, doğada saf (element) hâlde bulunabilen nadir elementlerden biridir -- volkanik bölgelerde parlak sarı kristaller hâlinde görülür.",
      "Karakteristik 'çürük yumurta' kokusu aslında kükürdün kendisinden değil, hidrojen sülfür (H₂S) gibi kükürt bileşiklerinden kaynaklanır.",
    ],
    discoverySummary:
      "Tarih öncesi çağlardan beri bilinir ve kullanılır çünkü doğada saf, kolay tanınabilir sarı kristaller hâlinde bulunur; ayrı bir element olduğu 18. yüzyılda netleşti.",
    meltingPointC: "115,21",
    boilingPointC: "444,61",
    densityGCm3: "2,07",
    electronConfiguration: "[Ne] 3s² 3p⁴",
    uses: [
      "Sülfürik asit üretimi (dünyada en çok üretilen kimyasal)",
      "Lastik vulkanizasyonunda (kauçuğu sertleştirme)",
      "Gübre üretiminde kükürt içerikli bileşikler",
      "Barut ve bazı havai fişek karışımlarında",
    ],
  },
  {
    slug: "klor",
    introduction: [
      "Klor, açık sarı-yeşil renkli, keskin kokulu ve zehirli bir gazdır; ancak seyreltilmiş bileşikleri hâlinde su dezenfeksiyonunda hayat kurtarıcı bir rol oynar.",
      "20. yüzyılın başında klorlu içme suyu uygulaması, tifo ve kolera gibi su kaynaklı salgın hastalıkları büyük ölçüde ortadan kaldıran halk sağlığı gelişmelerinden biri oldu.",
    ],
    discoverySummary:
      "1774'te İsveçli kimyager Carl Wilhelm Scheele tarafından keşfedildi, ancak ayrı bir element olduğu ancak 1810'da İngiliz kimyager Humphry Davy tarafından kanıtlandı.",
    meltingPointC: "-101,5",
    boilingPointC: "-34,04",
    densityGCm3: "0,003214 (gaz)",
    electronConfiguration: "[Ne] 3s² 3p⁵",
    uses: [
      "İçme suyu ve havuz suyu dezenfeksiyonu",
      "PVC (polivinil klorür) plastik üretiminde hammadde",
      "Çamaşır suyu (sodyum hipoklorit) üretiminde",
      "Kağıt hamurunun ağartılmasında",
    ],
  },
  {
    slug: "argon",
    introduction: [
      "Argon, Dünya atmosferinde en bol bulunan üçüncü gazdır (yaklaşık %0,93) ve tamamen inert (tepkimesiz) bir soy gazdır.",
      "Adı Yunanca 'tembel' veya 'hareketsiz' anlamına gelen 'argos' kelimesinden gelir -- tam da hiçbir elementle tepkimeye girmeme özelliğine bir gönderme.",
    ],
    discoverySummary:
      "1894'te İngiliz fizikçi Lord Rayleigh ve kimyager William Ramsay tarafından, havadan çıkarılan azotun beklenenden az yoğunlukta olduğunu fark etmeleri sonucu keşfedildi.",
    meltingPointC: "-189,34",
    boilingPointC: "-185,85",
    densityGCm3: "0,001784 (gaz)",
    electronConfiguration: "[Ne] 3s² 3p⁶",
    uses: [
      "Kaynak işlemlerinde metali oksidasyondan koruyan inert atmosfer",
      "Akkor ve floresan ampullerde dolgu gazı",
      "Çift camlı pencerelerde ısı yalıtımı için boşluk gazı",
      "Şarap şişelerinde oksidasyonu önleyen koruyucu gaz",
    ],
  },
  {
    slug: "potasyum",
    introduction: [
      "Potasyum, suyla şiddetle tepkimeye giren, bıçakla kesilebilecek kadar yumuşak bir alkali metaldir; doğada asla saf element hâlde bulunmaz.",
      "İnsan vücudunda sinir sinyallerinin iletilmesi ve kas kasılması için gerekli temel elektrolitlerden biridir -- muz gibi besinlerle bilinen bağlantısı buradan gelir.",
    ],
    discoverySummary:
      "1807'de İngiliz kimyager Humphry Davy tarafından, erimiş potasyum hidroksitin elektrolizi yoluyla ilk kez saf hâlde izole edildi -- elektroliz yöntemiyle keşfedilen ilk metaldi.",
    meltingPointC: "63,38",
    boilingPointC: "759",
    densityGCm3: "0,862",
    electronConfiguration: "[Ar] 4s¹",
    uses: [
      "Tarımsal gübrelerde potasyum tuzları (bitki büyümesi için)",
      "Vücutta sinir iletimi ve kas fonksiyonunda elektrolit dengesi",
      "Sabun ve sıvı deterjan üretiminde",
      "Cam ve özel seramik üretiminde",
    ],
  },
  {
    slug: "kalsiyum",
    introduction: [
      "Kalsiyum, insan vücudunda kütlece en bol bulunan mineraldir -- kemiklerin ve dişlerin yapısının büyük kısmını kalsiyum fosfat oluşturur.",
      "Toprak alkali metaller grubundandır ve doğada mermer, kireçtaşı ve alçıtaşı gibi yaygın kayaçların temel bileşenidir.",
    ],
    discoverySummary:
      "1808'de İngiliz kimyager Humphry Davy tarafından, kireç (kalsiyum oksit) ve cıva oksit karışımının elektrolizi yoluyla ilk kez saf hâlde izole edildi.",
    meltingPointC: "842",
    boilingPointC: "1484",
    densityGCm3: "1,55",
    electronConfiguration: "[Ar] 4s²",
    uses: [
      "Kemik ve diş yapısında kalsiyum fosfat olarak",
      "Çimento ve inşaat malzemelerinde kalsiyum karbonat (kireçtaşı)",
      "Gıda takviyelerinde kemik sağlığı için",
      "Çelik üretiminde oksijen ve kükürt gidermede (deoksidan)",
    ],
  },
  {
    slug: "skandiyum",
    introduction: [
      "Skandiyum, hafif ve yumuşak bir geçiş metalidir; nadir toprak elementleriyle benzer kimyasal özellikler gösterse de aslında onlardan ayrı bir grupta yer alır.",
      "Dünya kabuğunda nispeten nadir bulunur ve genellikle diğer nadir toprak minerallerinin yan ürünü olarak elde edilir.",
    ],
    discoverySummary:
      "1879'da İsveçli kimyager Lars Fredrik Nilson tarafından keşfedildi; adı İskandinavya'nın Latince adı 'Scandia'dan gelir.",
    meltingPointC: "1541",
    boilingPointC: "2836",
    densityGCm3: "2,985",
    electronConfiguration: "[Ar] 3d¹ 4s²",
    uses: [
      "Alüminyum-skandiyum alaşımlarında (havacılık, bisiklet çerçevesi, beyzbol sopası)",
      "Yüksek yoğunluklu deşarj lambalarında (stadyum aydınlatması)",
      "Katı oksit yakıt hücrelerinde elektrolit katkısı",
      "Nadir radyoaktif izleyici uygulamalarında",
    ],
    sections: [
      {
        title: "Mendeleyev'in önceden tahmin ettiği element",
        paragraphs: [
          "Dmitri Mendeleyev, 1869'da periyodik tabloyu oluştururken bazı boşluklar bıraktı ve henüz keşfedilmemiş elementlerin özelliklerini önceden tahmin etti. Bor'un altındaki boşluğa geçici olarak 'eka-bor' adını verdi.",
          "1879'da skandiyum keşfedildiğinde, gözlemlenen özelliklerinin Mendeleyev'in tahminleriyle şaşırtıcı derecede örtüştüğü görüldü -- bu, periyodik tablonun sadece bir sınıflandırma değil, gerçek bir öngörü aracı olduğunun güçlü bir kanıtıydı.",
        ],
      },
      {
        title: "Az bulunur ama 'nadir toprak' değildir",
        paragraphs: [
          "Skandiyum, kimyasal davranışı nadir toprak elementlerine (lantanitlere) çok benzediği için genellikle onlarla birlikte anılır, ancak teknik olarak bir geçiş metalidir ve ayrı bir grupta sınıflandırılır.",
          "Yer kabuğunda aslında kurşun veya kalaydan daha bol bulunur, ama yoğun cevher yatakları oluşturmadığı için ekonomik olarak çıkarılması zordur.",
        ],
      },
    ],
    timeline: [
      {
        year: "1871",
        title: "Mendeleyev'in tahmini",
        description:
          "Mendeleyev, periyodik tablosunda henüz keşfedilmemiş bir elementin ('eka-bor') özelliklerini önceden tarif etti.",
      },
      {
        year: "1879",
        title: "Nilson'un keşfi",
        description:
          "Lars Fredrik Nilson, skandiyumu keşfetti ve özelliklerinin Mendeleyev'in tahminleriyle örtüştüğünü doğruladı.",
      },
    ],
  },
  {
    slug: "titanyum",
    introduction: [
      "Titanyum, çeliğe yakın dayanıklılıkta olmasına rağmen çok daha hafif olan, aynı zamanda son derece korozyona dayanıklı bir metaldir.",
      "Vücut dokularıyla uyumlu (biyouyumlu) olması sayesinde tıbbi implantlarda güvenle kullanılabilen az sayıdaki metalden biridir.",
    ],
    discoverySummary:
      "1791'de İngiliz din adamı ve amatör jeolog William Gregor tarafından bir mineral örneğinde keşfedildi; adını Yunan mitolojisindeki Titanlardan alır.",
    meltingPointC: "1668",
    boilingPointC: "3287",
    densityGCm3: "4,506",
    electronConfiguration: "[Ar] 3d² 4s²",
    uses: [
      "Uçak ve uzay aracı yapısal parçalarında (hafif + yüksek mukavemet)",
      "Diş ve kalça protezlerinde (vücutla biyouyumlu)",
      "Titanyum dioksit beyaz pigment (boya, güneş kremi, diş macunu)",
      "Yüksek performanslı spor ekipmanlarında (bisiklet, golf sopası)",
    ],
    sections: [
      {
        title: "Kemikle kaynaşma: osseointegrasyon",
        paragraphs: [
          "Titanyum implantların vücutta bu kadar başarılı olmasının nedeni sadece 'reddedilmemesi' değil -- kemik dokusunun titanyum yüzeyle gerçek anlamda kaynaşabilmesidir. Bu olguya osseointegrasyon denir ve 1950'lerde İsveçli araştırmacı Per-Ingvar Brånemark tarafından tesadüfen keşfedildi.",
          "Bu özellik sayesinde diş implantları, kalça ve diz protezleri onlarca yıl vücutta sorunsuz kalabilir.",
        ],
      },
      {
        title: "Havacılıkta neden vazgeçilmez?",
        paragraphs: [
          "Titanyum, çeliğe yakın mukavemette olup yaklaşık %45 daha hafiftir -- bu güç/ağırlık oranı, havacılık mühendisliğinde son derece değerlidir. Soğuk Savaş döneminde geliştirilen SR-71 Blackbird casus uçağının gövdesinin büyük kısmı, sürtünmeden kaynaklanan aşırı ısıya dayanabilmesi için titanyumdan yapılmıştı.",
          "Modern yolcu uçaklarında da motor parçaları ve iniş takımları gibi yüksek gerilim altındaki bileşenlerde titanyum alaşımları tercih edilir.",
        ],
      },
      {
        title: "Titanyum dioksit: görünmez ama her yerde",
        paragraphs: [
          "Metalik titanyumdan çok daha yaygın olarak karşılaşılan biçimi, beyaz pigment titanyum dioksittir (TiO₂). Bu bileşik, ışığı olağanüstü verimli biçimde yansıttığı için boyalardan kağıda, plastikten diş macununa kadar sayısız üründe 'parlak beyaz' rengin kaynağıdır.",
          "Güneş kremlerinde de UV ışınlarını fiziksel olarak yansıtan bir bariyer görevi görür.",
        ],
      },
    ],
    timeline: [
      {
        year: "1791",
        title: "William Gregor'un keşfi",
        description:
          "İngiliz din adamı ve amatör jeolog Gregor, bir mineral örneğinde yeni bir elementin izlerini buldu.",
      },
      {
        year: "1910",
        title: "İlk saf metal üretimi",
        description:
          "Matthew A. Hunter, %99,9 saflıkta ilk metalik titanyum örneğini üretti.",
      },
      {
        year: "1950'ler",
        title: "Osseointegrasyonun keşfi",
        description:
          "Per-Ingvar Brånemark, titanyumun kemikle kaynaşabildiğini tesadüfen keşfederek modern implant tıbbının önünü açtı.",
      },
    ],
  },
  {
    slug: "vanadyum",
    introduction: [
      "Vanadyum, çeliğe eklendiğinde sertliğini ve dayanıklılığını belirgin biçimde artıran, gri-beyaz renkli bir geçiş metalidir.",
      "Bileşiklerinde birden fazla renkte (mor, mavi, yeşil, sarı) görünebilir -- bu özelliği İskandinav güzellik tanrıçası Vanadis'e atfen isimlendirilmesine ilham vermiştir.",
    ],
    discoverySummary:
      "İlk olarak 1801'de Meksikalı mineralog Andrés Manuel del Río tarafından keşfedildi, ancak yanlışlıkla krom sanıldı; 1830'da İsveçli kimyager Nils Gabriel Sefström tarafından bağımsız olarak yeniden keşfedilip doğrulandı.",
    meltingPointC: "1910",
    boilingPointC: "3407",
    densityGCm3: "6,11",
    electronConfiguration: "[Ar] 3d³ 4s²",
    uses: [
      "Vanadyum çeliği alaşımlarında (takım tezgahları, yaylar, aletler)",
      "Vanadyum redoks akış bataryalarında büyük ölçekli enerji depolama",
      "Sülfürik asit üretiminde katalizör",
      "Havacılık titanyum alaşımlarında katkı maddesi",
    ],
    sections: [
      {
        title: "Model T Ford'u mümkün kılan alaşım",
        paragraphs: [
          "Henry Ford, 1900'lerin başında vanadyum çeliğinin hem hafif hem de olağanüstü dayanıklı olduğunu fark etti ve bu alaşımı Model T'nin şasi ve önemli parçalarında kullandı.",
          "Bu seçim, aracın daha hafif ve dayanıklı olmasını sağlayarak seri üretilen otomobillerin yaygınlaşmasına katkıda bulunan mühendislik kararlarından biri oldu.",
        ],
      },
      {
        title: "Bazı deniz canlılarının kanındaki gizemli rolü",
        paragraphs: [
          "Tunikat adı verilen bazı deniz canlıları, oksijen taşımak için çoğu hayvanın kullandığı demir bazlı hemoglobin yerine, kanlarında yüksek konsantrasyonda vanadyum bazlı bir protein biriktirir.",
          "Bilim insanları bu vanadyum birikiminin tam işlevini hâlâ tam olarak çözebilmiş değil -- bu, biyokimyanın hâlâ araştırılan ilginç gizemlerinden biridir.",
        ],
      },
    ],
    timeline: [
      {
        year: "1801",
        title: "İlk (yanlış) keşif",
        description:
          "Andrés Manuel del Río, yeni bir element bulduğunu düşündü ancak Fransız kimyagerler onun aslında krom olduğuna onu ikna etti.",
      },
      {
        year: "1830",
        title: "Sefström'ün yeniden keşfi",
        description:
          "Nils Gabriel Sefström, del Río'nun bulduğu elementi bağımsız olarak yeniden keşfetti ve vanadyum adını verdi.",
      },
      {
        year: "1908",
        title: "Model T'de kullanımı",
        description:
          "Henry Ford, vanadyum çeliğini Model T otomobilinin üretiminde kullanarak hafif ve dayanıklı bir şasi elde etti.",
      },
    ],
  },
  {
    slug: "krom",
    introduction: [
      "Krom, parlak, sert ve son derece korozyona dayanıklı bir metaldir; adı Yunanca 'renk' anlamına gelen 'chroma'dan gelir çünkü bileşikleri canlı, çeşitli renklerde bulunur.",
      "Paslanmaz çeliğin parlak, ayna gibi yüzeyi ve pas tutmama özelliği doğrudan içerdiği krom miktarından kaynaklanır.",
    ],
    discoverySummary:
      "1797'de Fransız kimyager Louis Nicolas Vauquelin tarafından bir Sibirya kızıl kurşun cevherinde keşfedildi.",
    meltingPointC: "1907",
    boilingPointC: "2671",
    densityGCm3: "7,15",
    electronConfiguration: "[Ar] 3d⁵ 4s¹",
    uses: [
      "Paslanmaz çelik üretiminde (korozyona dayanıklılık sağlayan ana element)",
      "Krom kaplama (musluk, jant gibi parlak dekoratif yüzeyler)",
      "Pigment üretiminde (krom sarısı, krom yeşili)",
      "Deri tabaklama işleminde",
    ],
    sections: [
      {
        title: "Paslanmaz çeliği koruyan görünmez tabaka",
        paragraphs: [
          "Paslanmaz çeliğin sırrı, içerdiği kromun havadaki oksijenle tepkimeye girip yüzeyde son derece ince, görünmez ve kendini yenileyen bir krom oksit tabakası oluşturmasıdır. Bu 'pasif film', altındaki demiri havadan ve nemden izole ederek paslanmayı önler.",
          "Çelik çizilse bile bu koruyucu tabaka saniyeler içinde kendini yeniden oluşturur -- bu yüzden paslanmaz çelik yıllarca parlak kalabilir.",
        ],
      },
      {
        title: "Yakut, zümrüt ve krom sarısı: renklerin sırrı",
        paragraphs: [
          "Krom bileşikleri olağanüstü canlı renkler üretir ve adı da (Yunanca 'chroma', renk) buradan gelir. İlginç bir gerçek: yakut taşının kırmızı rengi, kristal yapısındaki eser miktarda krom safsızlığından kaynaklanır -- krom olmasa yakut renksiz korindon olurdu.",
          "19. yüzyılda ressamlar tarafından çok tercih edilen parlak sarı 'krom sarısı' pigmenti de kurşun kromat bileşiğinden elde edilir; Van Gogh'un Ayçiçekleri tablolarındaki canlı sarı tonların kaynağı budur.",
        ],
      },
      {
        title: "Krom(III) ile krom(VI): aynı element, farklı tehlike",
        paragraphs: [
          "Kromun kimyasal davranışı, hangi yükseltgenme basamağında bulunduğuna göre çarpıcı biçimde değişir. Üç değerlikli krom (Cr³⁺) insan vücudunda eser miktarda gerekli, nispeten zararsız bir mineraldir.",
          "Altı değerlikli krom (Cr⁶⁺) bileşikleri ise oldukça toksik ve kanserojendir; bu bileşikler tarihsel olarak bazı endüstriyel kaplama işlemlerinde kullanılmış, günümüzde ise sıkı çevre düzenlemeleriyle sınırlandırılmıştır.",
        ],
      },
    ],
    timeline: [
      {
        year: "1797",
        title: "Vauquelin'in keşfi",
        description:
          "Louis Nicolas Vauquelin, Sibirya'dan gelen kızıl kurşun cevherinden krom elementini izole etti.",
      },
      {
        year: "1912",
        title: "Paslanmaz çeliğin icadı",
        description:
          "Harry Brearley'in kroma eklenen demirin paslanmaya karşı olağanüstü dirençli olduğunu keşfetmesiyle paslanmaz çelik üretime girdi.",
      },
    ],
  },
  {
    slug: "mangan",
    introduction: [
      "Mangan, kırılgan, gümüş-gri bir geçiş metalidir ve neredeyse tüm modern çelik türlerinde küçük miktarlarda bulunur -- sertlik ve aşınma direnci kazandırır.",
      "İnsan vücudunda küçük miktarlarda bulunan, kemik gelişimi ve enzim işlevleri için gerekli eser bir mineraldir.",
    ],
    discoverySummary:
      "1774'te İsveçli kimyager Johan Gottlieb Gahn tarafından pirolusit mineralinden ilk kez saf hâlde izole edildi.",
    meltingPointC: "1246",
    boilingPointC: "2061",
    densityGCm3: "7,21",
    electronConfiguration: "[Ar] 3d⁵ 4s²",
    uses: [
      "Çelik üretiminde sertlik ve aşınma direnci artırıcı (hemen her çelikte bulunur)",
      "Alkalin pillerin elektrotlarında (manganez dioksit)",
      "Vücutta kemik gelişimi ve enzim aktivitesinde eser element olarak",
      "Cam üretiminde renk giderici veya mor renklendirici",
    ],
    sections: [
      {
        title: "Küçük miktar, büyük fark",
        paragraphs: [
          "Neredeyse tüm modern çelikler ağırlıkça sadece %1 civarında mangan içerir, ama bu küçük miktar çeliğin sertliğini ve aşınma direncini çarpıcı biçimde artırır -- mangan, çelik üretiminde kükürdün zararlı etkilerini de nötralize eder.",
          "Bu nedenle mangan, dünya genelinde üretilen çeliğin neredeyse tamamında bulunan, ama nadiren fark edilen bir bileşendir.",
        ],
      },
      {
        title: "Okyanus tabanındaki gelecek kaynağı",
        paragraphs: [
          "Derin okyanus tabanlarında, milyonlarca yıl boyunca çok yavaş biriken 'manganez yumrukları' adı verilen patates büyüklüğünde madensel kütleler bulunur. Bu yumruklar mangan yanında nikel, bakır ve kobalt da içerir.",
          "Elektrikli araç bataryaları için metal talebi arttıkça, bu derin deniz kaynaklarının çıkarılması giderek daha çok tartışılan bir konu hâline geliyor -- hem ekonomik fırsat hem de deniz ekosistemleri için potansiyel risk olarak görülüyor.",
        ],
      },
    ],
    timeline: [
      {
        year: "1774",
        title: "Gahn'ın izolasyonu",
        description:
          "Johan Gottlieb Gahn, pirolusit mineralinden mangan elementini ilk kez saf hâlde izole etti.",
      },
    ],
  },
  {
    slug: "kobalt",
    introduction: [
      "Kobalt, mavi renkli camlarda ve seramiklerde binlerce yıldır kullanılan canlı bir mavi pigment kaynağıdır -- 'kobalt mavisi' rengi buradan gelir.",
      "Günümüzde asıl önemi, akıllı telefon ve elektrikli araç bataryalarının katot malzemesinde kilit bir bileşen olmasından gelir.",
    ],
    discoverySummary:
      "1735'te İsveçli kimyager Georg Brandt tarafından, o zamana kadar bizmut cevheri sanılan bir mineralden izole edildi; adı Alman madencilerin 'kötü ruh' anlamında kullandığı 'kobold' kelimesinden gelir.",
    meltingPointC: "1495",
    boilingPointC: "2927",
    densityGCm3: "8,90",
    electronConfiguration: "[Ar] 3d⁷ 4s²",
    uses: [
      "Lityum-iyon pil katotlarında (telefon, elektrikli araç bataryaları)",
      "Jet motoru türbin kanatlarında süper alaşımlar (yüksek sıcaklık dayanımı)",
      "Kobalt mavisi pigmenti (seramik ve cam boyama)",
      "Vitamin B12'nin moleküler yapısında (tek biyolojik işlevli metal)",
    ],
    sections: [
      {
        title: "Sanat tarihinde kobalt mavisi",
        paragraphs: [
          "Kobalt içeren mavi pigmentler, Ming Hanedanı döneminde Çin porselenlerinin karakteristik mavi-beyaz desenlerinde binlerce yıl önce kullanılmaya başlandı; pigment Orta Doğu ve Çin arasındaki ticaret yollarıyla yayıldı.",
          "Vincent van Gogh, 'Yıldızlı Gece' tablosundaki derin gece gökyüzü tonları için özellikle kobalt mavisini tercih etti -- ressamların bu pigmenti sevmesinin nedeni, hem canlılığı hem de zamanla solmamasıydı.",
        ],
      },
      {
        title: "Pil talebi ve madencilik tartışması",
        paragraphs: [
          "Elektrikli araç ve akıllı telefon bataryalarına olan talep arttıkça kobalt ihtiyacı da hızla yükseldi. Dünya kobalt rezervlerinin büyük kısmı Kongo Demokratik Cumhuriyeti'nde bulunuyor.",
          "Bu durum, madencilik koşulları ve tedarik zinciri şeffaflığıyla ilgili küresel tartışmaları da beraberinde getirdi; büyük teknoloji ve otomotiv şirketleri artık kobalt tedarikini daha sıkı izlemeye çalışıyor.",
        ],
      },
      {
        title: "Kanser tedavisinde radyoaktif kobalt-60",
        paragraphs: [
          "Kobaltın radyoaktif izotopu kobalt-60, güçlü gama ışınları yaydığı için 20. yüzyılın ortasından itibaren kanser tedavisinde radyoterapi cihazlarında (kobalt bombası) yaygın olarak kullanıldı.",
          "Günümüzde çoğu merkez daha hassas kontrol sağlayan lineer hızlandırıcılara geçmiş olsa da, kobalt-60 hâlâ bazı radyoterapi uygulamalarında ve tıbbi ekipmanların sterilizasyonunda kullanılmaya devam ediyor.",
        ],
      },
    ],
    timeline: [
      {
        year: "1735",
        title: "Brandt'ın keşfi",
        description:
          "Georg Brandt, bizmut cevheri sanılan bir mineralden kobaltı izole ederek modern anlamda keşfedilen ilk yeni metal oldu.",
      },
      {
        year: "1950'ler",
        title: "Kobalt-60 radyoterapisi",
        description:
          "Kobalt-60 kaynaklı radyoterapi cihazları, kanser tedavisinde dünya genelinde yaygın olarak kullanılmaya başlandı.",
      },
    ],
  },
  {
    slug: "nikel",
    introduction: [
      "Nikel, sert, gümüş-beyaz renkli, korozyona son derece dayanıklı bir geçiş metalidir ve manyetik özellik gösteren birkaç elementten biridir.",
      "Dünya'nın iç ve dış çekirdeğinin büyük kısmı demir-nikel alaşımından oluşur; bu yüzden nikel gezegenin derinliklerinde bol miktarda bulunur.",
    ],
    discoverySummary:
      "1751'de İsveçli mineralog Axel Fredrik Cronstedt tarafından, bakır cevheri sanılan bir mineralden izole edildi; adı Alman madencilerin kullandığı 'Kupfernickel' (şeytan bakırı) ifadesinden kısaltılmıştır.",
    meltingPointC: "1455",
    boilingPointC: "2913",
    densityGCm3: "8,908",
    electronConfiguration: "[Ar] 3d⁸ 4s²",
    uses: [
      "Paslanmaz çelik alaşımlarında (nikel-krom karışımı)",
      "Madeni para üretiminde (birçok ülkenin bozuk paralarında)",
      "Şarj edilebilir nikel-metal hidrit (NiMH) pillerde",
      "Elektrokaplamada parlak, korozyona dayanıklı yüzey kaplaması",
    ],
    sections: [
      {
        title: "'Nickel' adı bozuk paradan geldi, tam tersi değil",
        paragraphs: [
          "ABD'de 5 sentlik bozuk para, içerdiği nikel metali nedeniyle günlük dilde doğrudan 'nickel' olarak anılır hâle geldi -- element bu kadar tanıdık bir günlük eşyayla özdeşleşen nadir örneklerden biridir.",
          "Aslında pek çok ülkenin bozuk paraları nikel veya nikel alaşımları içerir, çünkü bu metal hem dayanıklı hem de ekonomiktir.",
        ],
      },
      {
        title: "Oda sıcaklığında mıknatıslanabilen üç elementten biri",
        paragraphs: [
          "Demir, kobalt ve nikel, oda sıcaklığında kalıcı olarak mıknatıslanabilen (ferromanyetik) yalnızca üç saf elementtir. Bu özellik, atomlarının elektron dizilimindeki eşleşmemiş elektronların kendiliğinden aynı yönde hizalanmasından kaynaklanır.",
          "Bu nadir özellik, nikel alaşımlarının elektromıknatıslardan sensörlere kadar birçok manyetik uygulamada tercih edilmesini sağlar.",
        ],
      },
      {
        title: "En yaygın metal kontakt alerjisi",
        paragraphs: [
          "Nikel, insanlarda en sık görülen metal alerjisinin kaynağıdır -- takı, kot düğmesi veya gözlük çerçevesi gibi cilde uzun süre temas eden nikelli eşyalar bazı kişilerde kaşıntı ve kızarıklık gibi tepkilere yol açabilir.",
          "Bu yaygınlık nedeniyle Avrupa Birliği gibi bazı bölgeler, doğrudan cilde temas eden ürünlerdeki nikel salınımını yasal düzenlemelerle sınırlandırmıştır.",
        ],
      },
    ],
    timeline: [
      {
        year: "1751",
        title: "Cronstedt'in keşfi",
        description:
          "Axel Fredrik Cronstedt, bakır cevheri sanılan bir mineralden nikeli izole etti.",
      },
      {
        year: "1866",
        title: "İlk nikel bozuk paralar",
        description:
          "ABD, 5 sentlik bozuk parayı büyük oranda nikelden basmaya başladı; bu, paranın günlük dilde 'nickel' olarak anılmasına yol açtı.",
      },
    ],
  },
  {
    slug: "bakir",
    introduction: [
      "Bakır, insanlığın en eski işlediği metallerden biridir -- Bakır Çağı adını ondan alır -- ve mükemmel elektrik iletkenliği sayesinde günümüzde de vazgeçilmezdir.",
      "Kırmızımsı-turuncu rengiyle diğer metallerden kolayca ayırt edilir ve zamanla oksitlenerek karakteristik yeşil bir patina (Özgürlük Anıtı'nın rengi) oluşturur.",
    ],
    discoverySummary:
      "MÖ 9000 civarında keşfedilip işlenmeye başlanan, insanlık tarihindeki bilinen en eski metallerden biridir.",
    meltingPointC: "1084,62",
    boilingPointC: "2562",
    densityGCm3: "8,96",
    electronConfiguration: "[Ar] 3d¹⁰ 4s¹",
    uses: [
      "Elektrik kablolarında (gümüşten sonra en iyi elektrik iletkeni)",
      "Su tesisatı borularında",
      "Pirinç (bakır+çinko) ve bronz (bakır+kalay) alaşımlarında",
      "Elektronik devre kartlarında iletken yollar",
    ],
    sections: [
      {
        title: "Bakteri öldüren bir yüzey",
        paragraphs: [
          "Bakır yüzeyler, üzerine konan birçok bakteri ve virüsü saatler içinde etkisiz hâle getirebilen doğal bir antimikrobiyal özelliğe sahiptir -- bu olguya 'oligodinamik etki' denir. Eski Mısırlılar bile bakırın yara temizliğinde işe yaradığını bilinçsizce fark etmişti.",
          "Bu özellik nedeniyle hastane kapı kolları, korkuluklar ve bazı tıbbi ekipmanlarda paslanmaz çelik yerine bilinçli olarak bakır alaşımları tercih edilmeye başlanmıştır.",
        ],
      },
      {
        title: "Elektrifikasyon çağının temel malzemesi",
        paragraphs: [
          "19. yüzyıl sonunda elektrik dağıtım şebekelerinin kurulmaya başlamasıyla bakır, mükemmel iletkenliği ve nispeten bulunabilirliği sayesinde vazgeçilmez bir malzeme hâline geldi. Thomas Edison'un ilk ticari elektrik şebekeleri büyük ölçüde bakır kablolara dayanıyordu.",
          "Günümüzde de elektrikli araçların motorlarından güneş panellerinin kablolamasına kadar, dünyanın enerji dönüşümünde bakır talebi hızla artmaya devam ediyor.",
        ],
      },
      {
        title: "Özgürlük Anıtı'nın yeşil rengi",
        paragraphs: [
          "Özgürlük Anıtı'nın dış yüzeyi yaklaşık 80 tonluk ince bakır levhalardan yapılmıştır. Başlangıçta parlak kahverengi-turuncu olan yüzey, zamanla havadaki nem ve kirleticilerle tepkimeye girerek 'patina' adı verilen koruyucu bir bakır karbonat tabakası oluşturdu.",
          "Bu yeşil patina yalnızca estetik değil, aynı zamanda altındaki bakırı daha fazla korozyondan koruyan doğal bir kalkan görevi de görür.",
        ],
      },
    ],
    timeline: [
      {
        year: "MÖ ~9000",
        title: "İlk işlenen metallerden",
        description:
          "Bakır, doğada saf hâlde bulunabilmesi sayesinde insanlığın işlediği en eski metallerden biri oldu.",
      },
      {
        year: "MÖ ~3300",
        title: "Bakır Çağı",
        description:
          "Bakırın yaygın kullanımı, taş aletlerden metal aletlere geçişi simgeleyen bir döneme adını verdi.",
      },
      {
        year: "1879",
        title: "Edison'un ampulü ve bakır kablolar",
        description:
          "Thomas Edison'un pratik akkor ampulü ve elektrik dağıtım sistemleri, bakır kabloların küresel talebini büyük ölçüde artırdı.",
      },
    ],
  },
  {
    slug: "cinko",
    introduction: [
      "Çinko, mavimsi-beyaz renkli, oda sıcaklığında kırılgan olan bir geçiş metalidir ve çeliği paslanmaya karşı korumak için yaygın olarak kullanılır.",
      "İnsan bağışıklık sisteminin düzgün çalışması ve yara iyileşmesi için gerekli, vücutta demirden sonra en bol bulunan ikinci eser mineraldir.",
    ],
    discoverySummary:
      "Antik çağlardan beri pirinç alaşımı içinde bilinmesine rağmen, Avrupa'da saf metal olarak ilk kez 1746'da Alman kimyager Andreas Sigismund Marggraf tarafından izole edildi.",
    meltingPointC: "419,53",
    boilingPointC: "907",
    densityGCm3: "7,14",
    electronConfiguration: "[Ar] 3d¹⁰ 4s²",
    uses: [
      "Galvanizleme -- çeliği paslanmaya karşı kaplama",
      "Pirinç alaşımı üretiminde (bakır ile karışım)",
      "Çinko-karbon ve alkalin pillerde elektrot malzemesi",
      "Bağışıklık sistemi desteği için gıda takviyelerinde",
    ],
    sections: [
      {
        title: "Galvanizleme neden gerçekten işe yarar?",
        paragraphs: [
          "Çelik çinkoyla kaplandığında, çizilme durumunda bile korunmaya devam eder -- çünkü çinko, demirden daha kolay oksitlenen bir metaldir. Çinko ve demir aynı anda neme maruz kaldığında, çinko 'kendini feda ederek' önce paslanır ve demiri korur. Bu ilkeye 'katodik koruma' denir.",
          "Bu sayede galvanizli bir çelik yüzeyde küçük bir çizik oluşsa bile, altındaki demir hemen paslanmaya başlamaz -- çevresindeki çinko onu korumaya devam eder.",
        ],
      },
      {
        title: "Vücutta yüzlerce enzimin ortağı",
        paragraphs: [
          "Çinko, insan vücudunda 300'den fazla enzimin çalışması için gerekli bir kofaktördür; bağışıklık sistemi işlevi, yara iyileşmesi, DNA sentezi ve tat/koku algısı gibi pek çok süreçte rol oynar.",
          "Çinko eksikliği, özellikle gelişmekte olan ülkelerde çocuklarda büyüme geriliği ve bağışıklık zayıflığıyla ilişkilendirilir; bu yüzden birçok gıda ürünü çinko ile zenginleştirilir.",
        ],
      },
      {
        title: "Pirinç: bakırla birlikte bin yıllık ortaklık",
        paragraphs: [
          "Bakır ve çinkonun karışımı olan pirinç, Roma İmparatorluğu döneminden beri madeni para, müzik aleti ve dekoratif eşya üretiminde kullanılır. Çinko oranı arttıkça alaşımın rengi ve sertliği değişir.",
          "Pirincin altına benzeyen parlak sarı rengi, tarih boyunca onu ucuz ama gösterişli bir alternatif malzeme olarak popüler kılmıştır.",
        ],
      },
    ],
    timeline: [
      {
        year: "Antik Roma",
        title: "Pirinç alaşımı olarak kullanım",
        description:
          "Romalılar, çinko içerdiğini bilmeden bakır cevheriyle çinko cevherini birlikte eriterek pirinç üretiyordu.",
      },
      {
        year: "1746",
        title: "Saf metalin izolasyonu",
        description:
          "Andreas Sigismund Marggraf, çinkoyu Avrupa'da ilk kez saf metal hâlinde izole etti.",
      },
    ],
  },
  {
    slug: "galyum",
    introduction: [
      "Galyum, oda sıcaklığında katı olmasına rağmen elin sıcaklığıyla (yaklaşık 30°C'de) avuçta erimeye başlayan, sıra dışı düşük erime noktasına sahip bir metaldir.",
      "Modern LED aydınlatmanın ve 5G telefon çiplerinin temel bileşenlerinden biri olan galyum bileşikleri, yarı iletken sanayisinde kritik öneme sahiptir.",
    ],
    discoverySummary:
      "1875'te Fransız kimyager Paul-Émile Lecoq de Boisbaudran tarafından keşfedildi; adını Fransa'nın Latince adı 'Gallia'dan alır.",
    meltingPointC: "29,76",
    boilingPointC: "2204",
    densityGCm3: "5,91",
    electronConfiguration: "[Ar] 3d¹⁰ 4s² 4p¹",
    uses: [
      "LED ve lazer diyot üretiminde (galyum nitrit, galyum arsenit)",
      "5G ve yüksek frekanslı telefon çiplerinde",
      "Cıva yerine kullanılan cam termometrelerde",
      "Güneş panellerinde çoklu eklem fotovoltaik hücreler",
    ],
    sections: [
      {
        title: "Elde eriyen metal şakası",
        paragraphs: [
          "Galyumun erime noktası (yaklaşık 30°C) insan vücut sıcaklığına çok yakın olduğu için, katı bir galyum parçası avuç içine konduğunda birkaç dakika içinde erimeye başlar -- bu, popüler bilim gösterilerinde sıkça kullanılan çarpıcı bir deneydir.",
          "Galyumdan yapılan kaşıklar da benzer bir şaka için kullanılır: sıcak çaya batırılan kaşık gözle görülür biçimde erimeye başlar, çünkü çayın sıcaklığı galyumun erime noktasının oldukça üzerindedir.",
        ],
      },
      {
        title: "Mendeleyev'in tahminini doğrulayan (ve düzelten) keşif",
        paragraphs: [
          "Mendeleyev, periyodik tabloda alüminyumun altındaki boşluğa 'eka-alüminyum' adını vererek bu elementin yoğunluğunu tahmin etmişti. 1875'te Paul-Émile Lecoq de Boisbaudran galyumu keşfettiğinde ilk ölçtüğü yoğunluk, Mendeleyev'in tahmininden farklı çıktı.",
          "Mendeleyev, örneğin saf olmadığını öne sürerek yeniden ölçülmesini önerdi -- ve haklı çıktı: daha saf bir örnekle yapılan ölçüm, tahmin edilen değerle neredeyse birebir örtüştü. Bu, periyodik tablonun öngörü gücünün en çarpıcı kanıtlarından biri olarak tarihe geçti.",
        ],
      },
    ],
    timeline: [
      {
        year: "1871",
        title: "Mendeleyev'in tahmini",
        description:
          "Mendeleyev, alüminyumun altındaki boşluk için 'eka-alüminyum' adıyla bir elementin varlığını ve özelliklerini önceden tarif etti.",
      },
      {
        year: "1875",
        title: "Boisbaudran'ın keşfi",
        description:
          "Paul-Émile Lecoq de Boisbaudran, galyumu keşfetti; ölçümler sonradan Mendeleyev'in tahminleriyle örtüştü.",
      },
    ],
  },
  {
    slug: "germanyum",
    introduction: [
      "Germanyum, ilk transistörlerin yapımında kullanılan, yarı iletken teknolojisinin öncü elementlerinden biridir.",
      "Kimyager Dmitri Mendeleyev, periyodik tabloyu oluştururken bu elementin varlığını ve özelliklerini önceden tahmin etmiş, ona geçici olarak 'eka-silisyum' adını vermişti.",
    ],
    discoverySummary:
      "1886'da Alman kimyager Clemens Winkler tarafından keşfedildi -- Mendeleyev'in yıllar önce tahmin ettiği 'eksik element' olduğu doğrulandı.",
    meltingPointC: "938,25",
    boilingPointC: "2833",
    densityGCm3: "5,323",
    electronConfiguration: "[Ar] 3d¹⁰ 4s² 4p²",
    uses: [
      "Fiber optik kabloların kırılma indisini ayarlamada",
      "Kızılötesi optik lensler (termal kameralar, askeri ekipman)",
      "Erken dönem transistör ve diyot üretiminde",
      "Yüksek verimli güneş panellerinde çoklu eklem hücreler",
    ],
    sections: [
      {
        title: "Dijital çağın ilk yarı iletkeni",
        paragraphs: [
          "1947'de Bell Laboratuvarları'nda John Bardeen, Walter Brattain ve William Shockley tarafından icat edilen ilk çalışan transistör, silikon değil germanyum kristali kullanılarak yapıldı -- bu buluş 1956 Nobel Fizik Ödülü'nü kazandı ve modern elektronik çağını başlattı.",
          "1950'lerin sonlarına doğru silikonun daha ucuz, ısıya daha dayanıklı ve bol bulunur olması nedeniyle germanyumun yerini büyük ölçüde aldığı görüldü; ama germanyum, transistör teknolojisinin temellerini attığı için tarihsel önemini korur.",
        ],
      },
      {
        title: "Kızılötesi dünyayı görünür kılan mercek",
        paragraphs: [
          "Germanyum, görünür ışığa karşı opak (mat) olsa da kızılötesi ışığı olağanüstü net biçimde geçirir -- bu özellik onu termal kamera merceklerinin vazgeçilmez malzemesi yapar.",
          "Askeri gece görüş sistemlerinden endüstriyel ısı kontrol kameralarına kadar, insan gözünün göremediği ısı radyasyonunu görüntüye çeviren neredeyse her cihazda germanyum mercekler kullanılır.",
        ],
      },
    ],
    timeline: [
      {
        year: "1886",
        title: "Winkler'in keşfi",
        description:
          "Clemens Winkler, Mendeleyev'in 'eka-silisyum' olarak önceden tarif ettiği elementi keşfetti ve germanyum adını verdi.",
      },
      {
        year: "1947",
        title: "İlk transistörün icadı",
        description:
          "Bell Laboratuvarları'nda germanyum kristali kullanılarak ilk çalışan transistör icat edildi; bu buluş 1956 Nobel Fizik Ödülü'nü kazandı.",
      },
    ],
  },
  {
    slug: "arsenik",
    introduction: [
      "Arsenik, tarih boyunca 'zehirlerin kralı' olarak ünlenmiş, oldukça toksik bir yarı metaldir; ancak küçük, kontrollü miktarlarda endüstriyel kullanım alanları da vardır.",
      "Isıtıldığında doğrudan katıdan gaza geçer (süblimleşir) ve karakteristik sarımsak kokusu yayar.",
    ],
    discoverySummary:
      "Bileşikleri antik çağlardan beri bilinse de, saf element olarak izolasyonu genellikle 13. yüzyıl simyacısı Albertus Magnus'a atfedilir.",
    meltingPointC: "817 (yüksek basınçta)",
    boilingPointC: "614 (süblimleşme)",
    densityGCm3: "5,727",
    electronConfiguration: "[Ar] 3d¹⁰ 4s² 4p³",
    uses: [
      "Galyum arsenit yarı iletkenlerinde (yüksek hızlı elektronik)",
      "Tarihsel olarak pestisit ve haşere ilacında (günümüzde çoğu ülkede yasaklı)",
      "Eskiden ahşap koruyucu bileşiklerde",
      "Bazı bronz alaşımlarında sertlik artırıcı katkı",
    ],
    sections: [
      {
        title: "'Zehirlerin kralı' unvanının kaynağı",
        paragraphs: [
          "Arsenik bileşikleri tatsız, kokusuz olması ve o dönemde tespit edilmesinin son derece zor olması nedeniyle yüzyıllarca tercih edilen bir zehir olarak ün kazandı -- özellikle Rönesans İtalyası'nda ve Viktorya dönemi İngilteresi'nde suikastlarla ilişkilendirildi.",
          "1836'da geliştirilen Marsh testi, vücutta çok küçük miktarlardaki arseniği bile tespit edebilen ilk güvenilir yöntem oldu ve bu da arsenik zehirlenmesi vakalarının adli tıpta ortaya çıkarılabilmesini sağladı.",
        ],
      },
      {
        title: "Viktorya dönemi duvar kağıtlarındaki gizli tehlike",
        paragraphs: [
          "19. yüzyılda son derece popüler olan parlak yeşil 'Paris yeşili' ve 'Scheele yeşili' pigmentleri arsenik bileşikleri içeriyordu; bu renkler duvar kağıtlarında, kumaşlarda ve hatta çocuk oyuncaklarında yaygın olarak kullanıldı.",
          "Nemli ortamlarda bu pigmentlerin zehirli gazlar salabildiği zamanla anlaşıldı -- bazı tarihçiler, Napolyon Bonapart'ın sürgündeki evindeki yeşil duvar kağıtlarının onun sağlık sorunlarına katkıda bulunmuş olabileceğini öne sürer.",
        ],
      },
    ],
    timeline: [
      {
        year: "13. yüzyıl",
        title: "Albertus Magnus'un izolasyonu",
        description:
          "Simyacı Albertus Magnus'un saf arseniği izole ettiği düşünülür.",
      },
      {
        year: "1836",
        title: "Marsh testinin geliştirilmesi",
        description:
          "James Marsh, vücut dokularında iz miktardaki arseniği tespit edebilen ilk güvenilir kimyasal testi geliştirdi.",
      },
    ],
  },
  {
    slug: "selenyum",
    introduction: [
      "Selenyum, ışığa maruz kaldığında elektrik iletkenliği değişen (fotoiletken) ilginç bir özelliğe sahip ametaldir -- bu özellik erken fotokopi makinelerinin çalışma prensibiydi.",
      "İnsan vücudunda küçük miktarlarda gerekli, antioksidan enzimlerin çalışması için önemli bir eser mineraldir.",
    ],
    discoverySummary:
      "1817'de İsveçli kimyager Jöns Jacob Berzelius tarafından keşfedildi; adını Yunan ay tanrıçası Selene'den alır (tellürle -- 'dünya' anlamına gelen -- benzer kimyasal özellikleri paylaştığı için).",
    meltingPointC: "221",
    boilingPointC: "685",
    densityGCm3: "4,81",
    electronConfiguration: "[Ar] 3d¹⁰ 4s² 4p⁴",
    uses: [
      "Fotokopi makinelerinde fotoiletken tabaka (tarihsel kullanım)",
      "Cam üretiminde renk giderici veya kırmızı renklendirici",
      "Kepek önleyici şampuanlarda (selenyum sülfür)",
      "Vücutta antioksidan enzimlerin kofaktörü olarak",
    ],
    sections: [
      {
        title: "Dünyanın en yüksek selenyumlu gıdası",
        paragraphs: [
          "Brezilya cevizi, bilinen gıdalar arasında doğal olarak en yüksek selenyum içeriğine sahip olanıdır -- bu, ağaçların kök sisteminin Amazon topraklarındaki selenyumu olağanüstü verimli biçimde toplamasından kaynaklanır.",
          "Sadece birkaç Brezilya cevizi yemek bile günlük önerilen selenyum miktarını karşılayabilir; aşırı tüketim ise selenyum toksisitesine yol açabileceğinden, bu besinin tüketiminde ölçülü olmak önerilir.",
        ],
      },
      {
        title: "Modern fotokopi makinesinin çalışma ilkesi",
        paragraphs: [
          "Selenyumun ışığa maruz kaldığında elektrik iletkenliğinin değişmesi (fotoiletkenlik), 20. yüzyıl ortasında Xerox'un geliştirdiği ilk kuru fotokopi teknolojisinin temelini oluşturdu.",
          "Bir selenyum kaplı silindir, ışıklandırılan alanlarda elektriksel yükünü kaybederken karanlık kalan alanlar (metnin ve görüntülerin olduğu yerler) yükünü korur; bu fark, toner tozunun doğru desende silindire yapışmasını sağlar.",
        ],
      },
    ],
    timeline: [
      {
        year: "1817",
        title: "Berzelius'un keşfi",
        description:
          "Jöns Jacob Berzelius, sülfürik asit üretim atığında yeni bir element keşfetti ve ona Ay tanrıçası Selene'nin adını verdi.",
      },
      {
        year: "1938",
        title: "Fotoiletkenlik özelliğinin kullanılması",
        description:
          "Chester Carlson, selenyumun fotoiletkenlik özelliğini kullanarak elektrofotografi (fotokopi) sürecini icat etti.",
      },
    ],
  },
  {
    slug: "brom",
    introduction: [
      "Brom, oda sıcaklığında sıvı hâlde bulunan tek ametaldir -- koyu kırmızı-kahverengi renginde, keskin kokulu ve son derece uçucudur.",
      "Adı Yunanca 'pis koku' anlamına gelen 'bromos' kelimesinden gelir -- keşfedildiği dönemde bile kokusu dikkat çekiciydi.",
    ],
    discoverySummary:
      "1826'da Fransız kimyager Antoine Jérôme Balard tarafından tuz bataklığı sularından izole edildi.",
    meltingPointC: "-7,2",
    boilingPointC: "58,8",
    densityGCm3: "3,10 (sıvı)",
    electronConfiguration: "[Ar] 3d¹⁰ 4s² 4p⁵",
    uses: [
      "Alev geciktirici kimyasallarda (elektronik, tekstil)",
      "Havuz ve spa suyu dezenfeksiyonunda (klor alternatifi)",
      "Geleneksel fotoğrafçılık filminde (gümüş bromür)",
      "İlaç sanayisinde çeşitli bileşiklerin üretiminde",
    ],
    sections: [
      {
        title: "'Sakin ol' deyiminin kimyasal kökeni",
        paragraphs: [
          "19. yüzyılın sonu ile 20. yüzyılın başında potasyum bromür gibi bromür tuzları, sinir bozukluğu ve uykusuzluk için yaygın olarak reçete edilen sakinleştirici ilaçlardı -- o kadar yaygındı ki İngilizce'de sakinleştirici/can sıkıcı bir şey için kullanılan 'bromide' kelimesi buradan türedi.",
          "Zamanla bromür tuzlarının birikerek zehirlenmeye (bromizm) yol açabildiği anlaşıldı ve daha güvenli ilaçların geliştirilmesiyle tıbbi kullanımı büyük ölçüde terk edildi.",
        ],
      },
      {
        title: "Ölü Deniz'in zengin brom kaynağı",
        paragraphs: [
          "Ölü Deniz, dünyadaki en yüksek doğal brom konsantrasyonlarından birine sahiptir -- deniz suyunun ortalama brom seviyesinin yaklaşık 80 katı kadar. Bu, denizin aşırı yüksek tuzluluğu ve binlerce yıllık buharlaşmasının bir sonucudur.",
          "İsrail ve Ürdün, bu doğal zenginlik sayesinde dünyanın önde gelen brom üreticileri arasında yer alır.",
        ],
      },
    ],
    timeline: [
      {
        year: "1826",
        title: "Balard'ın keşfi",
        description:
          "Antoine Jérôme Balard, tuz bataklığı sularından bromu izole etti ve bu yeni elementi bilim dünyasına duyurdu.",
      },
    ],
  },
  {
    slug: "kripton",
    introduction: [
      "Kripton, atmosferde eser miktarda bulunan, kimyasal olarak neredeyse tamamen inert bir soy gazdır -- adı Yunanca 'gizli' anlamına gelen 'kryptos'tan gelir.",
      "1960'tan 1983'e kadar, metre biriminin resmî tanımı kripton-86 atomunun yaydığı ışığın dalga boyuna dayanıyordu.",
    ],
    discoverySummary:
      "1898'de İskoç kimyager William Ramsay ve İngiliz kimyager Morris Travers tarafından sıvı havanın damıtılması sırasında keşfedildi.",
    meltingPointC: "-157,36",
    boilingPointC: "-153,22",
    densityGCm3: "0,003749 (gaz)",
    electronConfiguration: "[Ar] 3d¹⁰ 4s² 4p⁶",
    uses: [
      "Yüksek performanslı ampullerde dolgu gazı (kripton ampuller)",
      "Fotoğraf flaşlarında ve stroboskop lambalarında",
      "Kripton-flor eksimer lazerlerinde (endüstriyel/tıbbi kesim)",
      "1960-1983 arasında metre biriminin resmî referansı olarak (tarihsel)",
    ],
    sections: [
      {
        title: "Süpermen'in gezegeniyle bir ilgisi var mı?",
        paragraphs: [
          "1938'de yaratılan Süpermen çizgi romanlarındaki kurgusal 'Kripton' gezegeni, gerçek element kriptondan sadece ismini ödünç almıştır -- yazarlar, kulağa bilimsel ve egzotik gelen bir isim ararken periyodik tablodaki bu az bilinen soy gazı seçmiştir.",
          "Element ile kurgusal gezegen arasında bilimsel bir bağlantı yoktur, ama bu isim benzerliği kriptonu popüler kültürde en çok tanınan element isimlerinden biri hâline getirmiştir.",
        ],
      },
      {
        title: "Metrenin bir zamanlar kripton'a bağlı olması",
        paragraphs: [
          "1960'tan 1983'e kadar bir metre, kripton-86 atomunun turuncu-kırmızı ışığının belirli sayıda dalga boyu uzunluğuna eşit olarak tanımlanıyordu -- bu, fiziksel bir metal çubuğa dayanan eski tanımdan çok daha hassas ve her yerde yeniden üretilebilir bir referanstı.",
          "1983'te bu tanım, ışığın boşluktaki hızına dayanan günümüzdeki tanımla değiştirildi, ama kripton bir dönem uzunluğun evrensel referansı olma onurunu taşıdı.",
        ],
      },
    ],
    timeline: [
      {
        year: "1898",
        title: "Ramsay ve Travers'ın keşfi",
        description:
          "William Ramsay ve Morris Travers, sıvı havayı damıtarak kriptonu keşfetti.",
      },
      {
        year: "1960",
        title: "Metrenin kripton tanımı",
        description:
          "Metre birimi, kripton-86 atomunun yaydığı ışığın dalga boyuna dayanan hassas bir tanımla yeniden tanımlandı.",
      },
    ],
  },
  {
    slug: "gumus",
    introduction: [
      "Gümüş, parlaklığı ve güzelliğiyle binlerce yıldır değerli sayılan, aynı zamanda bilinen tüm metaller arasında en yüksek elektrik ve ısı iletkenliğine sahip olan bir geçiş metalidir.",
      "Altın gibi nispeten durağan olsa da havadaki kükürt bileşikleriyle tepkimeye girerek zamanla kararabilir -- bu yüzden gümüş takılar zaman zaman parlatılmayı gerektirir.",
    ],
    discoverySummary:
      "Tarih öncesi çağlardan beri bilinir; altın gibi doğada saf hâlde bulunabilmesi sayesinde insanlığın en eski işlediği metallerden biridir.",
    meltingPointC: "961,78",
    boilingPointC: "2162",
    densityGCm3: "10,49",
    electronConfiguration: "[Kr] 4d¹⁰ 5s¹",
    uses: [
      "Mücevherat ve gümüş sofra takımlarında",
      "Fotoğrafçılık filminde ışığa duyarlı gümüş halojenürler",
      "Elektronik devrelerde yüksek iletkenlik gereken bağlantılarda",
      "Antimikrobiyal yara bantları ve tıbbi ekipmanlarda",
    ],
    sections: [
      {
        title: "Bakırdan bile güçlü antimikrobiyal etki",
        paragraphs: [
          "Gümüş iyonları, bakteri hücrelerinin temel işlevlerini bozarak onları etkisiz hâle getirir -- bu etki bakırdan bile daha güçlüdür. Eski uygarlıklar bunun kimyasını bilmeden, suyu temiz tutmak için gümüş kaplar ve gümüş paralar kullanırdı.",
          "Günümüzde gümüş nanopartikülleri, yara bantlarından çorap kumaşlarına kadar birçok üründe koku ve enfeksiyon önleyici katkı olarak kullanılıyor.",
        ],
      },
      {
        title: "150 yıllık fotoğrafçılığın temeli",
        paragraphs: [
          "Gümüş bromür ve gümüş klorür gibi bileşikler ışığa maruz kaldığında kimyasal olarak değişir -- bu özellik, 19. yüzyıldan dijital kameraların yaygınlaşmasına kadar geleneksel fotoğraf filminin çalışma ilkesinin tam kalbindeydi.",
          "Dijital fotoğrafçılık bu süreci büyük ölçüde geride bıraksa da, gümüş halojenürler hâlâ bazı özel görüntüleme ve tıbbi radyografi film uygulamalarında kullanılmaya devam ediyor.",
        ],
      },
    ],
    timeline: [
      {
        year: "MÖ ~3000",
        title: "Antik kullanım",
        description:
          "Gümüş, doğada saf hâlde bulunabilmesi sayesinde erken uygarlıklar tarafından takı ve para basımında kullanılmaya başlandı.",
      },
      {
        year: "1839",
        title: "Fotoğrafçılıkta kullanımı",
        description:
          "Louis Daguerre'in geliştirdiği daguerreyotip yöntemi, gümüş kaplı plakalar üzerinde ışığa duyarlı kimyayı kullanarak ilk pratik fotoğrafçılık tekniğini oluşturdu.",
      },
    ],
  },
  {
    slug: "kalay",
    introduction: [
      "Kalay, düşük erime noktasına ve iyi korozyon direncine sahip, gümüşümsü-beyaz renkli bir metaldir; en bilinen tarihi rolü, bakırla birleşerek bronzu oluşturmasıdır.",
      "Doğada nispeten az bulunan bir element olduğu için, Bronz Çağı boyunca kalay ticareti Avrupa ve Asya arasında geniş ticaret ağlarının kurulmasına yol açtı.",
    ],
    discoverySummary:
      "Bronz alaşımı içinde en az MÖ 3000'den beri kullanılır; saf metal olarak insanlığın bildiği en eski metallerden biridir.",
    meltingPointC: "231,93",
    boilingPointC: "2602",
    densityGCm3: "7,265",
    electronConfiguration: "[Kr] 4d¹⁰ 5s² 5p²",
    uses: [
      "Bronz alaşımı üretiminde (bakır ile birlikte)",
      "Çelik konserve kutularının ince koruyucu kaplamasında",
      "Lehim alaşımlarında (elektronik devre bağlantıları)",
      "Cam üretiminde (erimiş kalay banyosu üzerinde düz cam üretimi -- float cam yöntemi)",
    ],
    sections: [
      {
        title: "Bronz Çağı'nın gerçek kahramanı",
        paragraphs: [
          "Bakır tek başına nispeten yumuşaktır; ama kalayla karıştırıldığında çok daha sert ve dayanıklı bronz alaşımı ortaya çıkar. Kalay yatakları bakıra göre çok daha nadir ve dağınık olduğu için, antik dönemde kalay ticareti Britanya'dan Afganistan'a kadar uzanan geniş ağlar gerektiriyordu.",
          "Bazı tarihçiler, bu uzun mesafeli kalay ticaret yollarının kesintiye uğramasının, MÖ 1200 civarında yaşanan 'Geç Tunç Çağı Çöküşü' adı verilen büyük uygarlık krizine katkıda bulunmuş olabileceğini öne sürer.",
        ],
      },
      {
        title: "'Kalay çığlığı': duyulabilen bir kristal sesi",
        paragraphs: [
          "Saf bir kalay çubuğu bükülürken, kristal yapısındaki mikroskobik tabakaların birbirine sürtünmesinden kaynaklanan tuhaf, tiz bir çıtırtı sesi duyulur -- buna 'kalay çığlığı' denir.",
          "Bu ilginç akustik özellik, kalayı diğer metallerden ayıran, dokunmadan bile fark edilebilecek nadir fiziksel imzalardan biridir.",
        ],
      },
    ],
    timeline: [
      {
        year: "MÖ ~3000",
        title: "Bronz alaşımının keşfi",
        description:
          "Bakır ve kalayın birleştirilmesiyle elde edilen bronz, Bronz Çağı'na adını veren devrimsel bir malzeme oldu.",
      },
      {
        year: "1959",
        title: "Float cam yönteminin icadı",
        description:
          "Alastair Pilkington, düz camın erimiş kalay banyosu üzerinde üretilmesini sağlayan yöntemi geliştirdi; bu teknik hâlâ dünya cam üretiminin standardıdır.",
      },
    ],
  },
  {
    slug: "iyot",
    introduction: [
      "İyot, oda sıcaklığında koyu mor-siyah renkli katı bir halojendir; ısıtıldığında doğrudan katıdan mor renkli buhara geçer (süblimleşir).",
      "İnsan vücudunda tiroid hormonlarının üretimi için zorunlu, eser miktarda gerekli bir elementtir.",
    ],
    discoverySummary:
      "1811'de Fransız kimyager Bernard Courtois tarafından, deniz yosunu küllerinden barut için güherçile üretirken tesadüfen keşfedildi.",
    meltingPointC: "113,7",
    boilingPointC: "184,3",
    densityGCm3: "4,933",
    electronConfiguration: "[Kr] 4d¹⁰ 5s² 5p⁵",
    uses: [
      "İyotlu sofra tuzunda (guatr hastalığını önlemek için)",
      "Tentürdiyot ve antiseptik yara temizleyicilerde",
      "Tıbbi görüntülemede kontrast madde olarak",
      "Fotoğrafçılık ve LCD ekran üretiminde",
    ],
    sections: [
      {
        title: "Napolyon'un barut ihtiyacından doğan keşif",
        paragraphs: [
          "Bernard Courtois, Napolyon savaşları sırasında barut üretimi için gerekli güherçileyi (potasyum nitrat) deniz yosunu küllerinden elde etmeye çalışırken, beklenmedik biçimde mor renkli bir buhar yükseldiğini fark etti.",
          "Bu tesadüfi gözlem, o zamana kadar bilinmeyen yeni bir elementin keşfine yol açtı; adı Yunanca 'mor' anlamına gelen 'iodes' kelimesinden gelir.",
        ],
      },
      {
        title: "Halk sağlığının en başarılı öykülerinden biri",
        paragraphs: [
          "Yeterli iyot alınamadığında tiroid bezi büyüyerek 'guatr' adı verilen şişkinliğe yol açar; 20. yüzyıl başında bazı bölgelerde bu durum yaygın bir sağlık sorunuydu.",
          "1920'lerden itibaren sofra tuzuna küçük miktarda iyot eklenmesi uygulaması, guatr vakalarını dramatik biçimde azalttı ve halk sağlığı tarihinin en ucuz, en etkili müdahalelerinden biri olarak kabul edilir.",
        ],
      },
    ],
    timeline: [
      {
        year: "1811",
        title: "Courtois'nın keşfi",
        description:
          "Bernard Courtois, barut üretimi sırasında deniz yosunu küllerinden yeni bir element izole etti.",
      },
      {
        year: "1924",
        title: "İyotlu tuzun yaygınlaşması",
        description:
          "ABD'de sofra tuzuna iyot eklenmesi uygulaması başladı ve kısa sürede guatr vakalarında büyük düşüş sağladı.",
      },
    ],
  },
  {
    slug: "ksenon",
    introduction: [
      "Ksenon, atmosferde son derece eser miktarda bulunan, ağır ve kimyasal olarak nispeten durağan bir soy gazdır.",
      "Diğer soy gazların aksine, belirli koşullar altında bazı bileşikler oluşturabildiği kanıtlanmış az sayıdaki soy gazdan biridir.",
    ],
    discoverySummary:
      "1898'de William Ramsay ve Morris Travers tarafından, sıvı havanın damıtılmasından arta kalan son gaz kalıntısında keşfedildi.",
    meltingPointC: "-111,75",
    boilingPointC: "-108,12",
    densityGCm3: "0,005894 (gaz)",
    electronConfiguration: "[Kr] 4d¹⁰ 5s² 5p⁶",
    uses: [
      "Genel anestezi uygulamalarında (soy gaz olmasına rağmen)",
      "Uzay araçlarında iyon itki motorlarının yakıtı olarak",
      "Otomobil farlarında ksenon/HID aydınlatma",
      "Fotoğraf flaşlarında ve projeksiyon lambalarında",
    ],
    sections: [
      {
        title: "Kimyasal olarak 'tembel' ama tıpta güvenilir bir anestetik",
        paragraphs: [
          "Ksenon gazı solunduğunda genel anestezi etkisi yapar; kimyasal olarak vücutla neredeyse hiç tepkimeye girmediği için oldukça güvenli kabul edilir ve hastanın hızlı uyanmasını sağlar.",
          "Yüksek maliyeti nedeniyle geleneksel anestezik gazlar kadar yaygın kullanılmasa da, özellikle kalp ameliyatları gibi hassas prosedürlerde tercih edilmeye başlanmıştır.",
        ],
      },
      {
        title: "Uzayda sessiz ama verimli itki",
        paragraphs: [
          "Ksenon, uzay araçlarında kullanılan iyon itki motorlarının favori yakıtıdır -- gaz iyonlaştırılıp elektrik alanlarla hızlandırılarak çok düşük ama son derece verimli, uzun süreli itki üretir.",
          "NASA'nın Dawn görevi ve Avrupa Uzay Ajansı'nın SMART-1 ay sondası gibi araçlar, ksenon iyon motorları sayesinde geleneksel kimyasal roketlerden çok daha az yakıtla uzun mesafeler kat edebildi.",
        ],
      },
    ],
    timeline: [
      {
        year: "1898",
        title: "Ramsay ve Travers'ın keşfi",
        description:
          "Sıvı havanın damıtılması sırasında geriye kalan son gaz kalıntısında ksenon keşfedildi.",
      },
      {
        year: "1962",
        title: "İlk soy gaz bileşiğinin sentezlenmesi",
        description:
          "Neil Bartlett, ksenon heksaflüoroplatinat bileşiğini sentezleyerek soy gazların da bazı koşullarda kimyasal bileşik oluşturabileceğini kanıtladı.",
      },
    ],
  },
  {
    slug: "rubidyum",
    introduction: [
      "Rubidyum, alkali metaller grubunda yer alan, sodyum ve potasyumdan bile daha reaktif, oda sıcaklığında suyla temas ettiğinde şiddetli patlamaya yol açan yumuşak, gümüşümsü bir metaldir.",
      "Doğada saf hâlde değil, her zaman diğer minerallerle bileşik olarak bulunur; havayla temas ettiğinde saniyeler içinde tutuşabilir.",
    ],
    discoverySummary:
      "1861'de Robert Bunsen ve Gustav Kirchhoff tarafından, alevde verdiği karakteristik koyu kırmızı spektral çizgiler sayesinde keşfedildi.",
    meltingPointC: "39,31",
    boilingPointC: "688",
    densityGCm3: "1,532",
    electronConfiguration: "[Kr] 5s¹",
    uses: [
      "Atomik saatlerde (rubidyum standardı, GPS uydularında kullanılır)",
      "Fotoelektrik hücrelerde ve gece görüş ekipmanlarında",
      "Bazı özel cam ve seramik üretiminde",
      "Biyomedikal araştırmalarda izleyici madde olarak",
    ],
    sections: [
      {
        title: "GPS'in arkasındaki ucuz ama hassas saat",
        paragraphs: [
          "Rubidyum atomlarının çok kararlı bir titreşim frekansı, sezyum atomik saatlerine göre çok daha ucuz ve küçük boyutlu atomik saatler yapılmasını mümkün kılar.",
          "Bu 'rubidyum standardı' saatler, GPS uydularında ve telekomünikasyon altyapısında zaman senkronizasyonu için yaygın biçimde kullanılır.",
        ],
      },
      {
        title: "Sodyumdan bile tehlikeli bir reaktivite",
        paragraphs: [
          "Rubidyum suyla temas ettiğinde, sodyumun aksine sadece köpürmekle kalmaz, neredeyse anında patlayıcı bir tepkime verir; bu yüzden laboratuvarlarda mineral yağı içinde saklanır.",
          "Adı, Latince 'koyu kırmızı' anlamına gelen 'rubidus' kelimesinden gelir -- bu isim, elementin alev testinde verdiği belirgin kırmızı spektral çizgilerden esinlenmiştir.",
        ],
      },
    ],
    timeline: [
      {
        year: "1861",
        title: "Bunsen ve Kirchhoff'un keşfi",
        description:
          "Spektroskopi yöntemiyle mineral örneklerinde daha önce bilinmeyen kırmızı spektral çizgiler tespit edilerek rubidyum keşfedildi.",
      },
    ],
  },
  {
    slug: "stronsiyum",
    introduction: [
      "Stronsiyum, toprak alkali metaller grubunda yer alan, havayla temas ettiğinde hızla oksitlenen, yumuşak, gümüşümsü bir metaldir.",
      "Kimyasal davranışı kalsiyuma çok benzer -- bu benzerlik hem yararlı uygulamalara hem de radyoaktif izotopunun vücutta kemiklere yerleşmesi gibi ciddi bir sağlık riskine yol açar.",
    ],
    discoverySummary:
      "1790'da İskoçya'nın Strontian köyünde bulunan bir mineralde tespit edildi ve adını bu köyden aldı; 1808'de Humphry Davy tarafından saf metal olarak izole edildi.",
    meltingPointC: "777",
    boilingPointC: "1382",
    densityGCm3: "2,64",
    electronConfiguration: "[Kr] 5s²",
    uses: [
      "Havai fişeklerde parlak kırmızı renk verici olarak",
      "Bazı diş macunlarında hassasiyet giderici (stronsiyum klorür)",
      "Eski katot ışınlı tüp televizyon camlarında radyasyon önleyici katkı",
      "Kemik yoğunluğu araştırmalarında (kalsiyuma benzer davranışı sayesinde)",
    ],
    sections: [
      {
        title: "Havai fişeklerin en canlı kırmızısı",
        paragraphs: [
          "Stronsiyum tuzları yakıldığında son derece canlı, parlak bir kırmızı alev rengi verir -- bu özellik onu havai fişek ve sinyal fişeği üretiminde vazgeçilmez bir katkı maddesi hâline getirir.",
          "Ticari havai fişeklerdeki en yaygın kırmızı renk kaynağı, stronsiyum karbonat veya stronsiyum nitrat bileşikleridir.",
        ],
      },
      {
        title: "Kalsiyum taklitçisi: yararlı ve tehlikeli iki yüz",
        paragraphs: [
          "Stronsiyum, periyodik tabloda kalsiyumla aynı grupta yer aldığı için vücut onu kalsiyumla karıştırabilir ve kemik dokusuna yerleştirebilir.",
          "Bu özellik bir yandan bazı osteoporoz tedavilerinde yararlı biçimde kullanılırken, diğer yandan radyoaktif izotopu stronsiyum-90'ın nükleer serpinti kaynaklı kirlilik durumlarında neden ciddi bir sağlık tehdidi oluşturduğunu da açıklar.",
        ],
      },
    ],
    timeline: [
      {
        year: "1790",
        title: "Strontian köyünde keşif",
        description:
          "Adair Crawford, İskoçya'nın Strontian köyündeki bir kurşun madeninde daha önce bilinmeyen bir mineral tespit etti.",
      },
      {
        year: "1808",
        title: "Saf metalin izolasyonu",
        description:
          "Humphry Davy, elektroliz yöntemiyle stronsiyumu saf metal hâlinde ilk kez izole etti.",
      },
    ],
  },
  {
    slug: "kadmiyum",
    introduction: [
      "Kadmiyum, yumuşak, gümüşümsü-mavi renkli, toksik özellikleri nedeniyle kullanımı giderek kısıtlanan bir geçiş metalidir.",
      "Çinko cevherlerinde eser miktarda bulunur ve genellikle çinko üretiminin bir yan ürünü olarak elde edilir.",
    ],
    discoverySummary:
      "1817'de Alman kimyager Friedrich Stromeyer tarafından, çinko karbonat örneklerindeki beklenmedik bir renk değişikliğinin araştırılması sırasında keşfedildi.",
    meltingPointC: "321,07",
    boilingPointC: "767",
    densityGCm3: "8,65",
    electronConfiguration: "[Kr] 4d¹⁰ 5s²",
    uses: [
      "Nikel-kadmiyum (NiCd) şarj edilebilir pillerde (kullanımı gittikçe azalıyor)",
      "Kadmiyum sarısı ve kırmızısı gibi sanat pigmentlerinde",
      "Güneş pillerinde (kadmiyum tellürür ince film hücreleri)",
      "Metal kaplamacılığında korozyon önleyici olarak (kısıtlı kullanım)",
    ],
    sections: [
      {
        title: "Ressamların sevdiği ama tehlikeli sarı",
        paragraphs: [
          "Kadmiyum sülfür bazlı 'kadmiyum sarısı' ve 'kadmiyum kırmızısı' pigmentleri, 19. yüzyıl sonundan itibaren canlı ve kalıcı renkleri sayesinde ressamlar arasında büyük rağbet gördü; Claude Monet ve Henri Matisse gibi sanatçılar bu pigmentleri sıkça kullandı.",
          "Toksisitesi nedeniyle günümüzde bazı ülkelerde kullanımı kısıtlansa da, dayanıklılığı ve renk canlılığı hâlâ bazı sanat malzemesi üreticilerini bu pigmentte ısrar ettiriyor.",
        ],
      },
      {
        title: "Itai-itai hastalığı: bir kirlilik faciası",
        paragraphs: [
          "1912'den itibaren Japonya'nın Toyama bölgesinde, madencilik atıklarıyla kirlenen sulama sularından pirinç tarlalarına geçen kadmiyum, yerel halkı zehirleyerek şiddetli kemik ağrılarıyla seyreden 'itai-itai' (acı acı) hastalığına yol açtı.",
          "Bu olay, ağır metal kirliliğinin gıda zinciri yoluyla insan sağlığını nasıl etkileyebileceğinin en çarpıcı tarihi örneklerinden biri olarak kabul edilir ve günümüzdeki çevresel kadmiyum düzenlemelerinin şekillenmesinde önemli rol oynadı.",
        ],
      },
    ],
    timeline: [
      {
        year: "1817",
        title: "Stromeyer'in keşfi",
        description:
          "Friedrich Stromeyer, çinko karbonat örneklerinde beklenmedik bir renk değişikliği fark ederek kadmiyumu keşfetti.",
      },
      {
        year: "1912",
        title: "İtai-itai hastalığının başlaması",
        description:
          "Japonya'da madencilik kaynaklı kadmiyum kirliliği, yerel halkta ciddi kemik hastalıklarına yol açtı.",
      },
    ],
  },
  {
    slug: "antimon",
    introduction: [
      "Antimon, hem metalik hem ametalik özellikler taşıyan (yarı metal), gümüşümsü, gevrek bir elementtir.",
      "İnsanlık tarihinde binlerce yıldır kozmetik ve alaşım amaçlı kullanılan, en eski bilinen elementlerden biridir.",
    ],
    discoverySummary:
      "Antik Mısır'dan beri kohl göz makyajında kullanılan bileşikleri sayesinde bilinir; saf element olarak 17. yüzyılda tanımlanmıştır.",
    meltingPointC: "630,63",
    boilingPointC: "1587",
    densityGCm3: "6,697",
    electronConfiguration: "[Kr] 4d¹⁰ 5s² 5p³",
    uses: [
      "Alev geciktirici katkı maddelerinde (antimon trioksit)",
      "Kurşun alaşımlarında akü plakalarının sertleştirilmesinde",
      "Eski matbaacılıkta harf kalıpları alaşımında",
      "Yarı iletken üretiminde katkı maddesi olarak",
    ],
    sections: [
      {
        title: "Firavunların göz makyajından modern kimyaya",
        paragraphs: [
          "Antik Mısır'da 'kohl' adı verilen koyu renkli göz makyajı, antimon sülfür (stibnit) mineralinden yapılırdı; bu uygulama sadece estetik değil, güneş kamaşmasını azaltma ve göze zararlı böceklerden koruma amacı da taşıyordu.",
          "Elementin Latince adı 'stibium', kimyasal sembolü Sb'nin kaynağıdır ve bu antik kullanım geleneğine kadar uzanır.",
        ],
      },
      {
        title: "Akülerden alev geciktiricilere",
        paragraphs: [
          "Kurşuna küçük oranda antimon eklenmesi, akü plakalarını belirgin biçimde sertleştirir ve dayanıklılığını artırır -- bu yüzden geleneksel kurşun-asit akülerde yaygın bir alaşım bileşenidir.",
          "Antimon trioksit ise tekstil, plastik ve elektronik ürünlerde alev geciktirici katkı maddesi olarak kullanılır; yanma sırasında zararlı gazların yayılmasını geciktirici kimyasal tepkimeleri tetikler.",
        ],
      },
    ],
  },
  {
    slug: "tellur",
    introduction: [
      "Tellür, gümüşümsü-beyaz renkli, gevrek yapıda bir yarı metaldir; doğada nadir bulunan elementlerden biri olarak kabul edilir.",
      "Vücuda çok az miktarda girse bile karakteristik sarımsak kokulu bir nefes ve ter kokusuna yol açması, kimyagerler arasında meşhur bir özelliğidir.",
    ],
    discoverySummary:
      "1782'de Macar mineralog Franz-Joseph Müller von Reichenstein tarafından altın cevheri örneklerinde keşfedildi; adını Latince 'toprak/dünya' anlamına gelen 'tellus' kelimesinden alır.",
    meltingPointC: "449,51",
    boilingPointC: "988",
    densityGCm3: "6,24",
    electronConfiguration: "[Kr] 4d¹⁰ 5s² 5p⁴",
    uses: [
      "Kadmiyum tellürür ince film güneş panellerinde",
      "Çelik ve bakır alaşımlarında işlenebilirliği artırmak için",
      "Termoelektrik soğutma cihazlarında (bizmut tellürür)",
      "Bazı optik disk ve hafıza teknolojilerinde faz değiştirici malzeme olarak",
    ],
    sections: [
      {
        title: "Dünyanın adını taşıyan nadir element",
        paragraphs: [
          "Tellür, Latince 'toprak, dünya' anlamına gelen 'tellus' kelimesinden adını alır -- gezegenimizin adını doğrudan taşıyan az sayıdaki elementten biridir.",
          "Yer kabuğunda altından bile daha nadir bulunur; bu yüzden büyük ölçekli endüstriyel kullanımı sınırlıdır ve genellikle bakır rafinasyonunun yan ürünü olarak elde edilir.",
        ],
      },
      {
        title: "Güneş enerjisinde yükselen bir rol",
        paragraphs: [
          "Kadmiyum tellürür bileşiği, ince film güneş panellerinde silikon tabanlı hücrelere düşük maliyetli bir alternatif olarak giderek daha fazla kullanılıyor.",
          "Bu teknoloji, geleneksel silikon panellere göre daha az malzeme ve daha düşük üretim maliyetiyle güneş enerjisi dönüşümü sağlayabiliyor.",
        ],
      },
    ],
    timeline: [
      {
        year: "1782",
        title: "Müller von Reichenstein'ın keşfi",
        description:
          "Altın cevheri örneklerini incelerken daha önce tanımlanmamış yeni bir element tespit edildi.",
      },
    ],
  },
  {
    slug: "molibden",
    introduction: [
      "Molibden, çok yüksek erime noktasına sahip, gümüşümsü-gri renkli, dayanıklı bir geçiş metalidir.",
      "Saf metal hâli endüstride yaygın kullanılsa da, biyolojik sistemlerde de eser miktarda gerekli bir element olarak önemli rol oynar.",
    ],
    discoverySummary:
      "1778'de İsveçli kimyager Carl Wilhelm Scheele tarafından tanımlandı; adı Yunanca 'kurşun' anlamına gelen 'molybdos' kelimesinden gelir çünkü cevheri uzun süre kurşun cevheriyle karıştırılmıştır.",
    meltingPointC: "2623",
    boilingPointC: "4639",
    densityGCm3: "10,28",
    electronConfiguration: "[Kr] 4d⁵ 5s¹",
    uses: [
      "Yüksek mukavemetli çelik alaşımlarında (molibden çeliği)",
      "Elektrik ark kaynağı elektrotlarında",
      "Yağlayıcı katkı maddelerinde (molibden disülfür)",
      "Bitkilerde ve bakterilerde enzim yapı taşı olarak",
    ],
    sections: [
      {
        title: "Çelik zırhın gizli gücü",
        paragraphs: [
          "Çeliğe küçük oranlarda molibden eklenmesi, sertliği ve yüksek sıcaklık dayanımını belirgin biçimde artırır; bu özellik I. Dünya Savaşı sırasında zırh plakaları ve top namlusu üretiminde kritik önem kazandı.",
          "Almanya'nın ünlü 'Büyük Bertha' topunun namlu çeliğinde molibden alaşımı kullanılması, bu elementin stratejik değerini savaş dönemi endüstrisine kanıtladı.",
        ],
      },
      {
        title: "Kurşunla karıştırılan element",
        paragraphs: [
          "Molibden cevheri (molibdenit), grafite çok benzer görünümü nedeniyle uzun süre kurşun cevheriyle karıştırıldı -- elementin adı da bu tarihi karışıklıktan, Yunanca 'kurşun' anlamına gelen kelimeden gelir.",
          "Gerçekte molibden, kurşundan tamamen farklı, çok daha yüksek erime noktasına sahip sert bir geçiş metalidir.",
        ],
      },
    ],
    timeline: [
      {
        year: "1778",
        title: "Scheele'nin tanımlaması",
        description:
          "Carl Wilhelm Scheele, molibdenit mineralinin kurşun cevherinden farklı bir element içerdiğini tespit etti.",
      },
      {
        year: "1781",
        title: "Saf metalin izolasyonu",
        description:
          "Peter Jacob Hjelm, Scheele'nin bulgularından yola çıkarak saf molibden metalini izole etti.",
      },
    ],
  },
  {
    slug: "itriyum",
    introduction: [
      "İtriyum, gümüşümsü-metalik görünümlü, nispeten yumuşak bir geçiş metalidir; kimyasal davranışı lantanit grubu elementlerine çok benzer.",
      "Adını, dünyada aynı köyden adını alan dört elementten biri olarak paylaştığı İsveç'in Ytterby köyünden alır -- diğer üçü iterbiyum, terbiyum ve erbiyumdur.",
    ],
    discoverySummary:
      "1794'te Fin kimyager Johan Gadolin tarafından, Ytterby köyünde bulunan bir mineral örneğinde tanımlandı.",
    meltingPointC: "1526",
    boilingPointC: "3336",
    densityGCm3: "4,472",
    electronConfiguration: "[Kr] 4d¹ 5s²",
    uses: [
      "YAG lazerlerinde (itriyum-alüminyum-granat, diş hekimliği ve cerrahide)",
      "Eski renkli televizyon tüplerinde kırmızı fosfor kaynağı olarak",
      "Bazı süper iletken seramiklerde bileşen olarak",
      "Yüksek sıcaklığa dayanıklı seramik ve cam üretiminde",
    ],
    sections: [
      {
        title: "Tek bir köyün adını taşıyan dört element",
        paragraphs: [
          "İsveç'in küçük Ytterby köyündeki bir taş ocağı, kimya tarihinin en verimli tek maden yataklarından biri oldu -- burada bulunan mineral örneklerinden dört ayrı element keşfedildi ve hepsi köyün adından türetilen isimler aldı: itriyum, iterbiyum, terbiyum ve erbiyum.",
          "Bu sıra dışı durum, tek bir küçük yerleşim yerinin periyodik tabloya bu kadar çok element adı vermesi bakımından benzersizdir ve 18-19. yüzyıl İskandinav mineraloji araştırmalarının zenginliğini gösterir.",
        ],
      },
      {
        title: "Eski televizyonların kırmızısının sırrı",
        paragraphs: [
          "İtriyum oksit bazlı fosfor bileşikleri, katot ışınlı tüp televizyonlarda parlak ve net kırmızı renk üretebilen ilk pratik malzemelerden biriydi; bu buluş, renkli televizyonun görüntü kalitesinde önemli bir sıçrama sağladı.",
          "Günümüzde LCD ve OLED ekranlar bu teknolojiyi geride bıraksa da, itriyum bileşikleri hâlâ özel aydınlatma ve lazer uygulamalarında kullanılmaya devam ediyor.",
        ],
      },
    ],
    timeline: [
      {
        year: "1794",
        title: "Gadolin'in keşfi",
        description:
          "Johan Gadolin, Ytterby köyünde bulunan siyah bir mineral örneğinde yeni bir element tespit etti.",
      },
    ],
  },
  {
    slug: "zirkonyum",
    introduction: [
      "Zirkonyum, gümüşümsü-gri renkli, son derece korozyona dayanıklı bir geçiş metalidir; bu dayanıklılığı sayesinde en zorlu kimyasal ortamlarda bile kullanılabilir.",
      "Doğal zirkon mineralinden elde edilir ve nükleer sanayiden mücevherata kadar geniş bir kullanım yelpazesine sahiptir.",
    ],
    discoverySummary:
      "1789'da Alman kimyager Martin Heinrich Klaproth tarafından zirkon mineralinde tanımlandı; saf metal 1914'te izole edilebildi.",
    meltingPointC: "1855",
    boilingPointC: "4409",
    densityGCm3: "6,52",
    electronConfiguration: "[Kr] 4d² 5s²",
    uses: [
      "Nükleer reaktör yakıt çubuklarının kaplamasında",
      "Kimyasal işleme ekipmanlarında korozyona dayanıklı parçalarda",
      "Zirkonya (kübik zirkonyum oksit) mücevherlerinde elmas benzeri taş olarak",
      "Diş implantları ve seramik protezlerde",
    ],
    sections: [
      {
        title: "Nükleer reaktörlerin görünmez kahramanı",
        paragraphs: [
          "Zirkonyum, nötronları çok az soğurma özelliği sayesinde nükleer reaktör yakıt çubuklarının kaplama malzemesi olarak neredeyse ideal bir seçimdir -- bu özellik, reaktördeki zincirleme tepkimeyi gereksiz yere engellemeden yakıtı korumasını sağlar.",
          "Ayrıca yüksek sıcaklıkta su ile temas ettiğinde bile korozyona karşı olağanüstü dirençli olması, onu bu kritik güvenlik uygulaması için vazgeçilmez kılar.",
        ],
      },
      {
        title: "Elmasın ucuz ama gerçek rakibi: zirkonya",
        paragraphs: [
          "Kübik zirkonya (zirkonyum dioksit kristalleri), optik olarak elmasa çarpıcı biçimde benzeyen, ancak çok daha uygun fiyatlı bir sentetik taştır -- kırılma indisi elmasa yakın olduğu için benzer parıltı verir.",
          "Doğal zirkon mineraliyle karıştırılmamalıdır: zirkon farklı bir kristal yapıya sahip doğal bir mineralken, kübik zirkonya laboratuvarda üretilen tamamen sentetik bir malzemedir.",
        ],
      },
    ],
    timeline: [
      {
        year: "1789",
        title: "Klaproth'un tanımlaması",
        description:
          "Martin Heinrich Klaproth, zirkon mineralinde yeni bir element olduğunu tespit etti.",
      },
      {
        year: "1914",
        title: "Saf metalin izolasyonu",
        description:
          "Anton Eduard van Arkel ve Jan Hendrik de Boer'in geliştirdiği yöntemle yüksek saflıkta zirkonyum metali üretilebildi.",
      },
    ],
  },
  {
    slug: "niyobyum",
    introduction: [
      "Niyobyum, parlak, gümüşümsü-gri renkli, yumuşak bir geçiş metalidir; kimyasal özellikleri bakımından tantala çarpıcı biçimde benzer.",
      "Bu benzerlik yüzünden uzun süre tantalyumla aynı element sanılmış, ayrı bir element olduğu ancak yıllar sonra kanıtlanabilmiştir.",
    ],
    discoverySummary:
      "1801'de İngiliz kimyager Charles Hatchett tarafından tanımlandı; adını, babası Tantalus'un cezasını paylaşan Yunan mitolojisindeki Niobe karakterinden alır.",
    meltingPointC: "2477",
    boilingPointC: "4744",
    densityGCm3: "8,57",
    electronConfiguration: "[Kr] 4d⁴ 5s¹",
    uses: [
      "Süper iletken mıknatıslarda (niyobyum-titanyum alaşımı, MRI cihazları)",
      "Yüksek mukavemetli düşük alaşımlı çeliklerde",
      "Vücut piercinglerinde hipoalerjenik, renklendirilebilir takı malzemesi olarak",
      "Uzay araçları için jet motoru parçalarında",
    ],
    sections: [
      {
        title: "Tantalus'un kızının adını taşıyan element",
        paragraphs: [
          "Niyobyum ile tantalyum kimyasal olarak o kadar benzerdir ki, yıllarca aynı element olduğu düşünüldü -- bu karışıklık ancak 1844'te Alman kimyager Heinrich Rose'un ikisinin farklı elementler olduğunu kanıtlamasıyla çözüldü.",
          "Rose, bu yakın 'akrabalık' ilişkisini vurgulamak için elementi, Yunan mitolojisinde Tantalus'un kızı olan Niobe'den esinlenerek adlandırdı.",
        ],
      },
      {
        title: "MRI cihazlarının soğuk kalbi",
        paragraphs: [
          "Niyobyum-titanyum alaşımı, aşırı düşük sıcaklıklara soğutulduğunda elektriği hiçbir dirençle karşılaşmadan iletebilen bir süper iletkene dönüşür.",
          "Bu özellik, MRI (manyetik rezonans görüntüleme) cihazlarındaki güçlü mıknatısların ve CERN'deki Büyük Hadron Çarpıştırıcısı gibi parçacık hızlandırıcılarının temelini oluşturur.",
        ],
      },
    ],
    timeline: [
      {
        year: "1801",
        title: "Hatchett'in tanımlaması",
        description:
          "Charles Hatchett, ABD'den gelen bir mineral örneğinde yeni bir element olduğunu tespit etti ve ona 'kolumbiyum' adını verdi.",
      },
      {
        year: "1844",
        title: "Tantalyumdan ayrıştırılması",
        description:
          "Heinrich Rose, niyobyumun tantalyumdan farklı, bağımsız bir element olduğunu kanıtladı.",
      },
    ],
  },
  {
    slug: "teknesyum",
    introduction: [
      "Teknesyum, doğada kararlı izotopu bulunmayan, tamamen radyoaktif ilk elementtir; Dünya'da doğal olarak yalnızca eser miktarlarda oluşur.",
      "Adı, Yunanca 'yapay' anlamına gelen 'technetos' kelimesinden gelir -- çünkü tarihte ilk kez doğada değil, laboratuvarda üretilerek keşfedilmiştir.",
    ],
    discoverySummary:
      "1937'de İtalyan bilim insanları Emilio Segrè ve Carlo Perrier tarafından, bir parçacık hızlandırıcısında bombardımana tutulmuş molibden örneğinde tespit edildi.",
    meltingPointC: "2157",
    boilingPointC: "4265",
    densityGCm3: "11,0",
    electronConfiguration: "[Kr] 4d⁵ 5s²",
    uses: [
      "Nükleer tıpta en yaygın kullanılan radyoizotop olarak (teknesyum-99m)",
      "Kemik taraması ve kalp görüntüleme tanı testlerinde",
      "Çelik korozyonu araştırmalarında (radyoaktif izleyici olarak)",
      "Temel nükleer fizik araştırmalarında",
    ],
    sections: [
      {
        title: "Laboratuvarda doğan ilk element",
        paragraphs: [
          "Mendeleyev'in periyodik tablosunda 43 numaralı elementin varlığı yıllarca tahmin edilmiş, ancak doğada bulunamamıştı -- çünkü tüm izotopları radyoaktif olup nispeten kısa sürede bozunuyor.",
          "1937'de Segrè ve Perrier, bir parçacık hızlandırıcısında molibden hedefini döteronlarla bombardımana tutarak bu boşluğu dolduran elementi yapay olarak ürettiler; bu, insanlık tarihinde laboratuvarda üretilerek keşfedilen ilk elementti.",
        ],
      },
      {
        title: "Dünyadaki en yaygın kullanılan tıbbi izotop",
        paragraphs: [
          "Teknesyum-99m izotopu, yaydığı gama ışınlarının vücut dışından kolayca tespit edilebilmesi ve nispeten kısa yarı ömrü sayesinde hastaya minimum radyasyon riskiyle net görüntüler sunar.",
          "Bu özellikler, teknesyum-99m'i dünya çapında yılda yaklaşık 20 milyon nükleer tıp tanı işleminde kullanılan, en yaygın radyoaktif izleyici hâline getirmiştir.",
        ],
      },
    ],
    timeline: [
      {
        year: "1937",
        title: "Segrè ve Perrier'nin üretimi",
        description:
          "Bombardımana tutulmuş molibden örneğinde, laboratuvarda yapay olarak üretilen ilk element teknesyum tespit edildi.",
      },
    ],
  },
  {
    slug: "rutenyum",
    introduction: [
      "Rutenyum, sert, kırılgan, gümüşümsü-beyaz renkli, platin grubuna ait nadir bir geçiş metalidir.",
      "Adını, keşfedildiği dönemde Rusya'nın Latince adı olan 'Ruthenia'dan alır.",
    ],
    discoverySummary:
      "1844'te Rus-Baltık kökenli kimyager Karl Ernst Claus tarafından, Ural Dağları'ndaki platin cevheri kalıntılarında keşfedildi.",
    meltingPointC: "2334",
    boilingPointC: "4150",
    densityGCm3: "12,45",
    electronConfiguration: "[Kr] 4d⁷ 5s¹",
    uses: [
      "Sabit disk sürücülerinde ince manyetik kayıt katmanlarında",
      "Platin ve paladyum alaşımlarını sertleştirmek için (dolma kalem uçları, mücevherat)",
      "Kimyasal tepkimelerde katalizör olarak",
      "Elektronik direnç malzemelerinde",
    ],
    sections: [
      {
        title: "Rusya'nın adını taşıyan platin akrabası",
        paragraphs: [
          "Karl Ernst Claus, Kazan Üniversitesi'nde çalışırken Ural Dağları'ndan gelen platin cevheri artıklarını analiz etti ve daha önce fark edilmemiş yeni bir element buldu.",
          "Elementi, memleketi Rusya'ya saygı olarak Latince 'Ruthenia' adından türeterek 'rutenyum' olarak adlandırdı.",
        ],
      },
      {
        title: "Sert disklerin görünmez tabakası",
        paragraphs: [
          "Bilgisayar sabit disklerinde, veri depolayan manyetik tabakalar arasına yerleştirilen son derece ince bir rutenyum katmanı, disk kapasitesini önemli ölçüde artırmayı mümkün kılan bir teknoloji sıçramasına imza attı.",
          "Bu 'antiferromanyetik kaplı ortam' teknolojisi, 2000'li yılların başında sabit disk depolama yoğunluğunu ikiye katlayan kritik gelişmelerden biri oldu.",
        ],
      },
    ],
    timeline: [
      {
        year: "1844",
        title: "Claus'un keşfi",
        description:
          "Karl Ernst Claus, platin cevheri kalıntılarında yeni bir element olduğunu kanıtladı.",
      },
    ],
  },
  {
    slug: "rodyum",
    introduction: [
      "Rodyum, gümüşümsü-beyaz parlaklığa sahip, son derece yansıtıcı, platin grubuna ait çok nadir bir metaldir.",
      "Fiyatı zaman zaman altın ve platinden bile kat kat yüksek seyreden, dünyanın en pahalı değerli metallerinden biridir.",
    ],
    discoverySummary:
      "1803'te İngiliz kimyager William Hyde Wollaston tarafından, ham platin cevherinin işlenmesi sırasında keşfedildi.",
    meltingPointC: "1964",
    boilingPointC: "3695",
    densityGCm3: "12,41",
    electronConfiguration: "[Kr] 4d⁸ 5s¹",
    uses: [
      "Otomobil katalitik konvertörlerinde (azot oksit emisyonlarını azaltmak için)",
      "Beyaz altın mücevheratın kaplamasında (parlak, beyaz, çizilmeye dayanıklı bitiş için)",
      "Optik ekipmanlarda yansıtıcı kaplama olarak",
      "Termokupl sıcaklık sensörlerinde",
    ],
    sections: [
      {
        title: "Altından bile daha değerli olabilen metal",
        paragraphs: [
          "Rodyum, doğada son derece nadir bulunması ve çıkarılmasının çok zahmetli olması nedeniyle, fiyatı zaman zaman altının birkaç katına kadar yükselebilir; bu da onu dünyanın en pahalı değerli metallerinden biri yapar.",
          "Arzının büyük kısmı platin ve paladyum madenciliğinin yan ürünü olarak elde edildiğinden, fiyatı otomotiv sektöründeki katalitik konvertör talebine son derece duyarlıdır.",
        ],
      },
      {
        title: "Beyaz altının parlaklığının sırrı",
        paragraphs: [
          "Beyaz altın mücevherat, aslında doğal olarak hafif sarımsı bir tonda olur; rodyum kaplama, ona mağazalarda gördüğümüz o keskin, parlak beyaz görünümü kazandırır.",
          "Bu ince rodyum katmanı zamanla aşınabilir, bu yüzden beyaz altın yüzükler ve kolyeler zaman zaman yeniden kaplanmayı gerektirir.",
        ],
      },
    ],
    timeline: [
      {
        year: "1803",
        title: "Wollaston'un keşfi",
        description:
          "William Hyde Wollaston, ham platin cevherini analiz ederken rodyumu keşfetti; aynı yıl paladyumu da buldu.",
      },
    ],
  },
  {
    slug: "paladyum",
    introduction: [
      "Paladyum, gümüşümsü-beyaz renkli, platin grubuna ait, hidrojen gazını olağanüstü miktarlarda emebilen sıra dışı bir metaldir.",
      "Adını, keşfedildiği dönemde yeni bulunan Pallas asteroidinden alır.",
    ],
    discoverySummary:
      "1803'te William Hyde Wollaston tarafından, ham platin cevherinin kimyasal işlenmesi sırasında keşfedildi.",
    meltingPointC: "1554,9",
    boilingPointC: "2963",
    densityGCm3: "12,023",
    electronConfiguration: "[Kr] 4d¹⁰",
    uses: [
      "Otomobil katalitik konvertörlerinde (en yaygın kullanılan platin grubu metali)",
      "Çok katmanlı seramik kondansatörlerde (elektronik devrelerde)",
      "Diş hekimliğinde alaşım malzemesi olarak",
      "Mücevheratta (beyaz altın alaşımlarının bir bileşeni)",
    ],
    sections: [
      {
        title: "Kendi hacminin 900 katı hidrojen emebilen metal",
        paragraphs: [
          "Paladyum, atom yapısındaki boşluklar sayesinde kendi hacminin yaklaşık 900 katına kadar hidrojen gazını emip depolayabilir -- bu, bilinen metaller arasında oldukça sıra dışı bir özelliktir.",
          "Bu yetenek, hidrojen depolama araştırmalarında ve bazı kimyasal tepkimelerde hidrojenin kontrollü biçimde salınmasını sağlayan uygulamalarda ilgi çekmeye devam ediyor.",
        ],
      },
      {
        title: "Katalitik konvertörlerin en çok kullanılan metali",
        paragraphs: [
          "Paladyum, egzoz gazlarındaki zararlı karbon monoksit ve hidrokarbonları daha az zararlı bileşiklere dönüştüren kimyasal tepkimeleri hızlandırma yeteneği sayesinde, modern otomobillerin katalitik konvertörlerinde platin grubu metaller arasında en yaygın kullanılanıdır.",
          "Bu geniş kullanım, paladyum fiyatının küresel otomotiv üretimi ve emisyon düzenlemelerindeki değişikliklere doğrudan bağlı olmasına yol açar.",
        ],
      },
    ],
    timeline: [
      {
        year: "1803",
        title: "Wollaston'un keşfi",
        description:
          "William Hyde Wollaston, ham platin cevherini işlerken paladyumu keşfetti ve adını yeni keşfedilen Pallas asteroidinden aldı.",
      },
    ],
  },
  {
    slug: "indiyum",
    introduction: [
      "İndiyum, çok yumuşak, düşük erime noktasına sahip, gümüşümsü-beyaz renkli nadir bir metaldir.",
      "Modern dokunmatik ekran teknolojisinin görünmez ama vazgeçilmez bir bileşenidir.",
    ],
    discoverySummary:
      "1863'te Alman kimyagerler Ferdinand Reich ve Hieronymous Theodor Richter tarafından, çinko cevheri örneklerinin spektroskopik analizinde keşfedildi.",
    meltingPointC: "156,60",
    boilingPointC: "2072",
    densityGCm3: "7,31",
    electronConfiguration: "[Kr] 4d¹⁰ 5s² 5p¹",
    uses: [
      "İndiyum kalay oksit (ITO) olarak dokunmatik ekran ve LCD kaplamalarında",
      "Güneş panellerinde şeffaf iletken elektrot olarak",
      "Düşük erime noktalı lehim alaşımlarında",
      "Yarı iletken üretiminde katkı maddesi olarak",
    ],
    sections: [
      {
        title: "İndigo rengi spektral çizgiyle keşfedilen element",
        paragraphs: [
          "Reich ve Richter, çinko cevheri örneklerini spektroskopla incelerken daha önce hiç görülmemiş, parlak indigo mavisi bir spektral çizgi fark ettiler; element adını da bu karakteristik renkten alır.",
          "Bu, rubidyum ve sezyum gibi 19. yüzyılın ikinci yarısında spektroskopi yöntemiyle keşfedilen birkaç elementten biridir.",
        ],
      },
      {
        title: "Her akıllı telefon ekranının içindeki metal",
        paragraphs: [
          "İndiyum kalay oksit (ITO), hem elektriği iletebilen hem de ışığı neredeyse tamamen geçiren nadir malzemelerden biridir -- bu ikili özellik onu dokunmatik ekranlar, LCD paneller ve güneş panelleri için vazgeçilmez kılar.",
          "Akıllı telefonundan tablete, bilgisayar monitöründen bazı güneş panellerine kadar günlük hayatta dokunduğumuz neredeyse her ekranın içinde ince bir indiyum tabakası bulunur.",
        ],
      },
    ],
    timeline: [
      {
        year: "1863",
        title: "Reich ve Richter'in keşfi",
        description:
          "Çinko cevheri örneklerinin spektroskopik analizinde daha önce bilinmeyen indigo mavisi bir spektral çizgi tespit edildi.",
      },
    ],
  },
  {
    slug: "sezyum",
    introduction: [
      "Sezyum, alkali metaller içinde en reaktif olanı, oda sıcaklığına yakın bir noktada eriyen, altın sarısı parıltılı, yumuşak bir metaldir.",
      "Dünyanın en hassas zaman ölçüm standardının temelini oluşturur -- saniyenin resmî tanımı doğrudan bu elementin atomik davranışına dayanır.",
    ],
    discoverySummary:
      "1860'ta Robert Bunsen ve Gustav Kirchhoff tarafından, maden suyu örneklerinin spektral analizinde keşfedildi; spektroskopi yöntemiyle bulunan ilk elementtir.",
    meltingPointC: "28,44",
    boilingPointC: "671",
    densityGCm3: "1,93",
    electronConfiguration: "[Xe] 6s¹",
    uses: [
      "Atomik saatlerde (saniyenin resmî SI tanımının temeli)",
      "Petrol arama sondajlarında yüksek yoğunluklu sıvı olarak",
      "Fotoelektrik hücrelerde ve gece görüş cihazlarında",
      "Uzay araçlarında iyon itki motorlarında (tarihsel kullanım)",
    ],
    sections: [
      {
        title: "Saniyenin kendisini tanımlayan element",
        paragraphs: [
          "1967'den beri, uluslararası saniye birimi resmi olarak sezyum-133 atomunun belirli iki enerji seviyesi arasındaki geçişte yaydığı ışının tam olarak 9.192.631.770 salınımına eşit süre olarak tanımlanır.",
          "Bu, sezyumu dünyanın hemen hemen tüm hassas zamanlama sistemlerinin -- GPS uydularından internet sunucularına kadar -- görünmez ama vazgeçilmez temeli hâline getirir.",
        ],
      },
      {
        title: "Spektroskopiyle keşfedilen ilk element",
        paragraphs: [
          "Bunsen ve Kirchhoff, geliştirdikleri yeni spektroskop cihazıyla bir maden suyu örneğini incelerken daha önce hiç görülmemiş, gök mavisi renginde spektral çizgiler fark ettiler.",
          "Element adını da bu gözlemden alır: Latince 'gök mavisi' anlamına gelen 'caesius' kelimesinden türetilmiştir; bu keşif, spektroskopinin yeni element bulmak için güçlü bir araç olduğunu kanıtlayan ilk örnektir.",
        ],
      },
    ],
    timeline: [
      {
        year: "1860",
        title: "Bunsen ve Kirchhoff'un keşfi",
        description:
          "Spektral analiz yöntemiyle daha önce bilinmeyen mavi spektral çizgiler tespit edilerek sezyum keşfedildi.",
      },
      {
        year: "1967",
        title: "Saniyenin yeniden tanımlanması",
        description:
          "Uluslararası Ağırlıklar ve Ölçüler Genel Konferansı, saniyeyi sezyum-133 atomunun rezonans frekansına dayanarak yeniden tanımladı.",
      },
    ],
  },
  {
    slug: "baryum",
    introduction: [
      "Baryum, gümüşümsü-beyaz renkli, havayla temas ettiğinde hızla oksitlenen, yumuşak bir toprak alkali metaldir.",
      "Bileşikleri, tıbbi görüntülemeden havai fişeklere kadar geniş bir uygulama alanına sahiptir.",
    ],
    discoverySummary:
      "1808'de Humphry Davy tarafından elektroliz yöntemiyle saf metal hâlinde izole edildi; bileşikleri çok daha önceden, 1774'te Carl Wilhelm Scheele tarafından tanımlanmıştı.",
    meltingPointC: "727",
    boilingPointC: "1897",
    densityGCm3: "3,51",
    electronConfiguration: "[Xe] 6s²",
    uses: [
      "Baryum sülfat kontrast maddesiyle sindirim sistemi röntgen görüntülemesinde",
      "Havai fişeklerde parlak yeşil renk verici olarak",
      "Petrol ve doğal gaz sondaj çamurlarında ağırlaştırıcı katkı olarak",
      "Cam ve seramik üretiminde parlaklık artırıcı olarak",
    ],
    sections: [
      {
        title: "Röntgende görünmeyi sağlayan içilebilir metal bileşiği",
        paragraphs: [
          "Baryum sülfat, suda neredeyse hiç çözünmediği için vücuda alındığında zehirli etkisi olmayan, ancak X-ışınlarını güçlü biçimde engelleyen özel bir bileşiktir.",
          "Hastalara sindirim sistemi röntgeni öncesinde içirilen 'baryumlu içecek', mide ve bağırsakların röntgen görüntüsünde net bir kontrastla görünmesini sağlayarak doktorların olası anormallikleri tespit etmesine yardımcı olur.",
        ],
      },
      {
        title: "Stronsiyumun tamamlayıcısı: havai fişeklerin yeşili",
        paragraphs: [
          "Baryum tuzları yakıldığında canlı bir yeşil alev rengi verir; bu özellik onu stronsiyumun verdiği kırmızıyla birlikte havai fişek gösterilerinin renk paletinin temel taşlarından biri yapar.",
          "Ayrıca baryum nitrat, havai fişeklerde oksitleyici madde olarak da görev yaparak parlak ve düzenli patlamalar sağlar.",
        ],
      },
    ],
    timeline: [
      {
        year: "1774",
        title: "Scheele'nin tanımlaması",
        description:
          "Carl Wilhelm Scheele, baryum oksit bileşiğinin kalsiyum oksitten farklı yeni bir element içerdiğini fark etti.",
      },
      {
        year: "1808",
        title: "Davy'nin izolasyonu",
        description:
          "Humphry Davy, elektroliz yöntemiyle saf baryum metalini ilk kez izole etti.",
      },
    ],
  },
  {
    slug: "volfram",
    introduction: [
      "Volfram (tungsten), bilinen tüm metaller arasında en yüksek erime noktasına sahip, çelik-gri renkli, son derece sert bir geçiş metalidir.",
      "Bu olağanüstü ısı dayanımı, onu bir asırdan uzun süredir ampul filamentinden uzay teknolojisine kadar birçok alanda vazgeçilmez kılar.",
    ],
    discoverySummary:
      "1783'te İspanyol kardeşler Juan José ve Fausto Elhuyar tarafından, volfram mineralinden saf metal olarak izole edildi.",
    meltingPointC: "3422",
    boilingPointC: "5930",
    densityGCm3: "19,25",
    electronConfiguration: "[Xe] 4f¹⁴ 5d⁴ 6s²",
    uses: [
      "Akkor ampul filamentlerinde (tarihsel olarak baskın kullanım)",
      "Zırh delici mermi ve karşı ağırlıklarda (çok yüksek yoğunluk)",
      "Kesici takım uçlarında (tungsten karbür)",
      "Kaynak elektrotlarında (TIG kaynağı)",
    ],
    sections: [
      {
        title: "Tüm metallerin en dayanıklı ısı şampiyonu",
        paragraphs: [
          "Volfram, 3422°C gibi olağanüstü yüksek bir sıcaklıkta erir -- bu, bilinen tüm metaller arasında en yüksek erime noktasıdır ve onu akkor ampul filamentleri için bir asırdan uzun süre neredeyse rakipsiz bir seçim yaptı.",
          "Bu özellik aynı zamanda roket motoru parçaları ve uzay araçlarının ısıya en çok maruz kalan bileşenlerinde de tercih edilmesini sağlar.",
        ],
      },
      {
        title: "İki farklı isim, tek element: volfram mı tungsten mi?",
        paragraphs: [
          "Elementin kimyasal sembolü W, Almanca adı 'Wolfram'dan gelirken, uluslararası İngilizce adı 'tungsten' İsveççe 'ağır taş' anlamına gelen kelimeden türemiştir -- bu ilginç isim ikiliği, elementin İspanya'da wolframit mineralinden, İsveç'te ise scheelit mineralinden neredeyse eşzamanlı araştırılmasından kaynaklanır.",
          "Türkçede de her iki isim -- volfram ve tungsten -- yaygın olarak kullanılır ve aynı elementi ifade eder.",
        ],
      },
    ],
    timeline: [
      {
        year: "1781",
        title: "Scheele'nin ön çalışması",
        description:
          "Carl Wilhelm Scheele, scheelit mineralinden yeni bir asit (tungstik asit) elde ederek elementin varlığına işaret etti.",
      },
      {
        year: "1783",
        title: "Elhuyar kardeşlerin izolasyonu",
        description:
          "Juan José ve Fausto Elhuyar, wolframit mineralinden saf volfram metalini ilk kez izole etti.",
      },
    ],
  },
  {
    slug: "platin",
    introduction: [
      "Platin, gümüşümsü-beyaz renkli, son derece kararlı, korozyona neredeyse tamamen dirençli değerli bir geçiş metalidir.",
      "Avrupalılar tarafından 'keşfedilmeden' çok önce, Güney Amerika'nın yerli halkları tarafından binlerce yıldır işlenip kullanılıyordu.",
    ],
    discoverySummary:
      "Güney Amerika yerli halkları tarafından Kolomb öncesi dönemden beri bilinir; Avrupa'ya 18. yüzyılda İspanyol kaşifler tarafından tanıtıldı.",
    meltingPointC: "1768,3",
    boilingPointC: "3825",
    densityGCm3: "21,45",
    electronConfiguration: "[Xe] 4f¹⁴ 5d⁹ 6s¹",
    uses: [
      "Otomobil katalitik konvertörlerinde",
      "Mücevheratta (yüksek saflık ve parlaklığı sayesinde)",
      "Laboratuvar ekipmanlarında (kroze, elektrot gibi kimyasal olarak inert malzemeler)",
      "Kanser tedavisinde kullanılan bazı kemoterapi ilaçlarında (cisplatin)",
    ],
    sections: [
      {
        title: "İspanyolların 'değersiz gümüş' diye küçümsediği metal",
        paragraphs: [
          "İspanyol kaşifler, Güney Amerika'da altın ararken karşılaştıkları bu ağır, beyaz metali başlangıçta değersiz bir 'yarı olgunlaşmış gümüş' olarak gördüler ve ona küçümseyici biçimde 'platina' (küçük gümüş) adını verdiler -- hatta bazen altını saflaştırırken atılması gereken bir sorun olarak bile görülüyordu.",
          "Oysa Ekvador ve Kolombiya'daki yerli halklar, platini binlerce yıldır işleyerek süs eşyaları üretiyordu; Avrupa bu metalin gerçek değerini ancak 18. yüzyılın ortalarında anlayabildi.",
        ],
      },
      {
        title: "Kimyasal olarak neredeyse dokunulmaz",
        paragraphs: [
          "Platin, güçlü asitlerin çoğuna, oksijene ve yüksek sıcaklıklara karşı olağanüstü dirençlidir -- yalnızca 'aqua regia' adı verilen özel bir asit karışımı onu çözebilir.",
          "Bu kimyasal kararlılık, onu hem laboratuvar ekipmanlarında hem de yüzyıllar boyunca solmadan kalması gereken mücevheratta ideal bir malzeme yapar.",
        ],
      },
    ],
    timeline: [
      {
        year: "1735",
        title: "Avrupa'ya tanıtılması",
        description:
          "İspanyol bilim insanı Antonio de Ulloa, Güney Amerika'daki gözlemlerini Avrupa bilim çevrelerine aktardı.",
      },
      {
        year: "1750",
        title: "Ayrı bir element olarak tanınması",
        description:
          "William Brownrigg'in çalışmalarıyla platin, Kraliyet Cemiyeti'nde resmî olarak yeni bir element olarak tanıtıldı.",
      },
    ],
  },
  {
    slug: "civa",
    introduction: [
      "Cıva, oda sıcaklığında sıvı hâlde bulunan tek metaldir -- gümüşümsü, parlak ve yüksek yoğunluklu bir geçiş metalidir.",
      "Tarih boyunca simyacıların ve bilim insanlarının büyük ilgisini çekmiş, ancak toksik özellikleri nedeniyle kullanımı günümüzde ciddi biçimde kısıtlanmıştır.",
    ],
    discoverySummary:
      "Antik çağlardan beri bilinir; Mısır mezarlarında MÖ 1500 civarına tarihlenen cıva örnekleri bulunmuştur.",
    meltingPointC: "-38,83",
    boilingPointC: "356,73",
    densityGCm3: "13,534",
    electronConfiguration: "[Xe] 4f¹⁴ 5d¹⁰ 6s²",
    uses: [
      "Eski cam termometre ve barometrelerde (kullanımı büyük ölçüde terk edildi)",
      "Bazı floresan lambalarda (küçük miktarlarda)",
      "Diş hekimliğinde amalgam dolgularda (tarihsel, azalan kullanım)",
      "Kimyasal üretim süreçlerinde katalizör olarak (kısıtlı kullanım)",
    ],
    sections: [
      {
        title: "Odada sıvı akan tek metal",
        paragraphs: [
          "Cıvanın erime noktası -38,83°C gibi son derece düşük bir değerdir; bu yüzden oda sıcaklığında katı değil sıvı hâlde bulunan bilinen tek metaldir ve yüzey gerilimi sayesinde küçük, parlak damlacıklar hâlinde yuvarlanır.",
          "Bu sıra dışı fiziksel özellik, elementi yüzyıllar boyunca simyacılar için 'yaşayan metal' olarak büyüleyici bir merak konusu yaptı -- 'quicksilver' (canlı gümüş) adı da buradan gelir.",
        ],
      },
      {
        title: "Şapkacıların çılgınlığından Minamata'ya",
        paragraphs: [
          "19. yüzyılda keçe şapka üretiminde cıva nitrat kullanılması, şapkacılar arasında yaygın sinir sistemi zehirlenmelerine yol açtı -- İngilizcedeki 'mad as a hatter' (şapkacı gibi çılgın) deyimi ve Alice Harikalar Diyarında'ndaki Çılgın Şapkacı karakteri buradan esinlenir.",
          "20. yüzyılda Japonya'nın Minamata körfezine sanayi atığı olarak boşaltılan metil cıva, balık avlayan yerel halkı zehirleyerek ciddi bir nörolojik hastalığa yol açtı; bu facia, ağır metal kirliliğinin çevre sağlığı üzerindeki etkilerine dair küresel farkındalığı kalıcı biçimde değiştirdi.",
        ],
      },
    ],
    timeline: [
      {
        year: "MÖ ~1500",
        title: "Antik Mısır'da kullanım",
        description:
          "Mısır mezarlarında bulunan cıva örnekleri, elementin binlerce yıl önce bilindiğini gösterir.",
      },
      {
        year: "1956",
        title: "Minamata hastalığının fark edilmesi",
        description:
          "Japonya'da endüstriyel cıva kirliliğinin yol açtığı nörolojik hastalık resmî olarak tanımlandı.",
      },
    ],
  },
  {
    slug: "kursun",
    introduction: [
      "Kurşun, yumuşak, kolay şekillendirilebilen, mavimsi-gri renkli, yüksek yoğunluklu bir post-geçiş metalidir.",
      "Binlerce yıldır işlenen en eski metallerden biri olmasına rağmen, toksik etkileri nedeniyle günümüzde kullanımı ciddi biçimde kısıtlanmıştır.",
    ],
    discoverySummary:
      "En az MÖ 7000'den beri bilinir; kolay eritilebilmesi ve şekillendirilebilmesi sayesinde antik uygarlıkların en erken işlediği metallerden biridir.",
    meltingPointC: "327,46",
    boilingPointC: "1749",
    densityGCm3: "11,34",
    electronConfiguration: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²",
    uses: [
      "Kurşun-asit akülerde (otomobil aküleri)",
      "Radyasyon kalkanlarında (röntgen önlükleri, nükleer tesisler)",
      "Ağırlık ve denge malzemelerinde (dalış kemerleri, balıkçılık ağırlıkları)",
      "Bazı özel cam türlerinde (kristal cam)",
    ],
    sections: [
      {
        title: "Roma İmparatorluğu'nun su borularındaki gölge",
        paragraphs: [
          "Roma İmparatorluğu, su şebekesinde ve bazı şarap tatlandırma yöntemlerinde yaygın biçimde kurşun kullandı; bazı tarihçiler, kronik kurşun zehirlenmesinin Roma'nın üst sınıfları arasında sağlık sorunlarına ve hatta imparatorluğun çöküşüne katkıda bulunmuş olabileceğini öne sürer -- ancak bu teori bilim insanları arasında hâlâ tartışmalıdır.",
          "Kesin olan şu ki, Romalılar kurşunun tatlandırıcı ve koruyucu özelliklerinden faydalanıyordu, oysa bugün bu kullanımın ciddi bir sağlık riski taşıdığını biliyoruz.",
        ],
      },
      {
        title: "Benzinden çıkarılan zehir",
        paragraphs: [
          "1920'lerden itibaren motor vuruntusunu azaltmak için benzine tetraetil kurşun eklenmesi, onlarca yıl boyunca dünya çapında hava kirliliğinin en büyük kaynaklarından biri oldu.",
          "Jeokimyager Clair Patterson'ın 1960'larda yürüttüğü öncü araştırmalar, atmosferdeki kurşun düzeyinin endüstri öncesi döneme göre binlerce kat arttığını kanıtlayarak kurşunlu benzinin dünya çapında aşamalı olarak yasaklanmasına giden sürecin bilimsel temelini oluşturdu.",
        ],
      },
    ],
    timeline: [
      {
        year: "MÖ ~600",
        title: "Roma su sistemlerinde kullanım",
        description:
          "Roma İmparatorluğu, kurşun borularla geniş çaplı su dağıtım sistemleri inşa etti.",
      },
      {
        year: "1986",
        title: "ABD'de kurşunlu benzinin aşamalı yasaklanması",
        description:
          "Clair Patterson'ın araştırmalarının da katkısıyla, ABD'de kurşunlu benzin kullanımı aşamalı olarak sona erdirildi.",
      },
    ],
  },
  {
    slug: "bizmut",
    introduction: [
      "Bizmut, pembemsi-beyaz renkli, gevrek yapıda, ağır metaller arasında en az toksik olanı kabul edilen bir post-geçiş metalidir.",
      "Yapay olarak büyütüldüğünde oluşturduğu basamaklı, gökkuşağı renklerinde kristal yapısıyla mineral koleksiyonculuğunda da popülerdir.",
    ],
    discoverySummary:
      "Ortaçağ'dan beri bilinir, ancak uzun süre kurşun veya kalayla karıştırılmıştır; 18. yüzyılda ayrı bir element olarak tanınmıştır.",
    meltingPointC: "271,4",
    boilingPointC: "1564",
    densityGCm3: "9,78",
    electronConfiguration: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³",
    uses: [
      "Mide rahatsızlıklarına yönelik ilaçlarda (bizmut subsalisilat)",
      "Kurşunsuz av mermisi ve balıkçılık ağırlıklarında (çevre dostu alternatif)",
      "Kozmetik ürünlerde inci parlaklığı veren pigment olarak",
      "Bazı düşük erime noktalı lehim alaşımlarında (kurşun yerine)",
    ],
    sections: [
      {
        title: "Ağır metallerin en 'zararsızı'",
        paragraphs: [
          "Bizmut, kurşuna komşu bir elementtir ve fiziksel olarak ona benzese de, vücutta neredeyse hiç birikmemesi sayesinde ağır metaller arasında belirgin biçimde daha az toksik kabul edilir.",
          "Bu güvenlik profili, onu kurşunun yasaklandığı birçok alanda -- av mermisi, balıkçılık ağırlıkları, bazı lehim alaşımları -- doğrudan bir ikame malzemesi hâline getirmiştir.",
        ],
      },
      {
        title: "Laboratuvarda yetiştirilen gökkuşağı kristalleri",
        paragraphs: [
          "Erimiş bizmut yavaşça soğutulduğunda, yüzeyinde oluşan ince oksit tabakası ışığı farklı açılarda kırarak basamaklı, göz alıcı gökkuşağı renklerinde geometrik kristaller oluşturur.",
          "Bu çarpıcı görünüm, bizmutu bilim meraklıları ve mineral koleksiyoncuları arasında hem eğitici hem de dekoratif bir obje olarak son derece popüler hâle getirmiştir.",
        ],
      },
    ],
  },
  {
    slug: "lantan",
    introduction: [
      "Lantan, yumuşak, gümüşümsü-beyaz renkli bir metaldir ve adını 15 elementten oluşan lantanit serisine veren, bu serinin ilk üyesidir.",
      "Havayla temas ettiğinde hızla oksitlenir ve nispeten kararlı, kimyasal olarak nadir toprak elementleri grubuna aittir.",
    ],
    discoverySummary:
      "1839'da İsveçli kimyager Carl Gustaf Mosander tarafından, seryum nitrat örneklerinin incelenmesi sırasında keşfedildi.",
    meltingPointC: "920",
    boilingPointC: "3464",
    densityGCm3: "6,145",
    electronConfiguration: "[Xe] 5d¹ 6s²",
    uses: [
      "Kamera ve teleskop merceklerinde (yüksek kırılma indisli lantan camı)",
      "Nikel-metal hidrit (NiMH) şarj edilebilir pillerde (hibrit araçlarda)",
      "Petrol rafinerilerinde katalitik kraking katalizörü olarak",
      "Karbon ark aydınlatma ve stüdyo projeksiyon lambalarında",
    ],
    sections: [
      {
        title: "'Gizli kalan' anlamına gelen isim",
        paragraphs: [
          "Lantan adı, Yunanca 'gizlenmek, saklanmak' anlamına gelen 'lanthanein' kelimesinden gelir -- çünkü uzun süre seryum bileşiklerinin içinde gizlenmiş hâlde kaldı ve ancak dikkatli kimyasal ayrıştırmayla ortaya çıkarılabildi.",
          "Bu isimlendirme, kendisinden sonra keşfedilen 14 elementten oluşan tüm 'lantanit' serisine de adını verdi -- periyodik tabloda kendine ait özel bir satırı olan bu grubun öncüsü oldu.",
        ],
      },
      {
        title: "Kameraların net görüntüsünün arkasındaki cam",
        paragraphs: [
          "Lantan oksit eklenerek üretilen özel cam, yüksek kırılma indisi ve düşük renk sapması (dispersiyon) sayesinde çok daha ince ve hafif, ama optik olarak keskin mercekler üretilmesini sağlar.",
          "Bu özellik, lantan camını yüksek kaliteli fotoğraf makinesi lenslerinde ve bilimsel optik cihazlarda vazgeçilmez bir malzeme yapar.",
        ],
      },
    ],
    timeline: [
      {
        year: "1839",
        title: "Mosander'in keşfi",
        description:
          "Carl Gustaf Mosander, seryum nitrat örneklerini incelerken gizlenmiş yeni bir element keşfetti.",
      },
    ],
  },
  {
    slug: "hafniyum",
    introduction: [
      "Hafniyum, parlak, gümüşümsü-gri renkli, korozyona dayanıklı bir geçiş metalidir; kimyasal davranışı zirkonyuma çarpıcı biçimde benzer.",
      "Bu yakın benzerlik nedeniyle doğal zirkonyum cevherlerinde her zaman eser miktarda hafniyum bulunur ve ikisinin ayrıştırılması özel işlemler gerektirir.",
    ],
    discoverySummary:
      "1923'te Dirk Coster ve George de Hevesy tarafından, Niels Bohr'un atom teorisinin öngörüleri rehberliğinde Kopenhag'da keşfedildi.",
    meltingPointC: "2233",
    boilingPointC: "4603",
    densityGCm3: "13,31",
    electronConfiguration: "[Xe] 4f¹⁴ 5d² 6s²",
    uses: [
      "Nükleer reaktör kontrol çubuklarında (güçlü nötron soğurucu olarak)",
      "Modern bilgisayar işlemcilerinde yalıtkan katman malzemesi olarak",
      "Plazma kesim torçlarının elektrotlarında",
      "Yüksek sıcaklığa dayanıklı süper alaşımlarda",
    ],
    sections: [
      {
        title: "Bohr'un teorisiyle önceden tahmin edilen keşif",
        paragraphs: [
          "Niels Bohr'un geliştirdiği atom modeli, 72 numaralı elementin zirkonyum cevherlerinde bulunması gerektiğini öngörüyordu; Coster ve Hevesy bu tahmine dayanarak Kopenhag'daki zirkonyum örneklerini inceleyip elementi gerçekten buldular.",
          "Element, keşfedildiği şehre saygı olarak Kopenhag'ın Latince adı 'Hafnia'dan adını aldı; bu, teorik fizik tahmininin doğrudan bir elementin keşfine yol açtığı nadir ve etkileyici örneklerden biridir.",
        ],
      },
      {
        title: "Zirkonyumun tam tersi: nötronları emen ikiz",
        paragraphs: [
          "Zirkonyum, nötronları neredeyse hiç soğurmadığı için nükleer yakıt çubuğu kaplamasında idealken, hafniyum tam tersine nötronları çok güçlü biçimde soğurur -- bu yüzden nükleer reaktörlerde zincirleme tepkimeyi durdurmak veya yavaşlatmak için kullanılan kontrol çubuklarında tercih edilir.",
          "Bu zıt davranış, denizaltı nükleer reaktörlerinde hafniyum bazlı kontrol çubuklarının özellikle değerli olmasını sağlar, çünkü uzun ömürlü ve güvenilir bir kontrol mekanizması sunar.",
        ],
      },
    ],
    timeline: [
      {
        year: "1923",
        title: "Coster ve Hevesy'nin keşfi",
        description:
          "Bohr'un atom teorisinin öngörüleri doğrultusunda, zirkonyum cevherlerinde hafniyum tespit edildi.",
      },
    ],
  },
  {
    slug: "tantal",
    introduction: [
      "Tantal, mavimsi-gri renkli, son derece korozyona dayanıklı, yoğun bir geçiş metalidir.",
      "Modern elektroniğin neredeyse görünmez ama kritik bir bileşeni olarak, akıllı telefonlardan dizüstü bilgisayarlara kadar milyarlarca cihazın içinde yer alır.",
    ],
    discoverySummary:
      "1802'de İsveçli kimyager Anders Gustaf Ekeberg tarafından keşfedildi; adını, oğlu Niobe gibi Yunan mitolojisindeki Tantalus'tan alır.",
    meltingPointC: "3017",
    boilingPointC: "5458",
    densityGCm3: "16,69",
    electronConfiguration: "[Xe] 4f¹⁴ 5d³ 6s²",
    uses: [
      "Tantal kondansatörlerde (neredeyse tüm akıllı telefon ve dizüstü bilgisayarlarda)",
      "Cerrahi implantlarda ve protezlerde (vücutla uyumluluğu sayesinde)",
      "Kimyasal işleme ekipmanlarında (aşırı korozyon direnci gerektiren ortamlarda)",
      "Jet motoru süper alaşımlarında",
    ],
    sections: [
      {
        title: "Cebindeki telefonun içindeki görünmez metal",
        paragraphs: [
          "Tantal kondansatörler, çok küçük bir hacimde yüksek miktarda elektrik yükü depolayabilme özellikleri sayesinde, akıllı telefonlar, dizüstü bilgisayarlar ve diğer taşınabilir elektronik cihazların küçük ve ince tasarlanabilmesini mümkün kılan kritik bileşenlerdir.",
          "Bu geniş kullanım alanı, tantalın küresel elektronik tedarik zincirinde stratejik öneme sahip bir hammadde hâline gelmesine yol açmıştır.",
        ],
      },
      {
        title: "Coltan madenciliğinin tartışmalı gölgesi",
        paragraphs: [
          "Tantalın ana cevheri olan koltan, büyük ölçüde Orta Afrika'da, özellikle Kongo Demokratik Cumhuriyeti'nde çıkarılır; bu bölgedeki madencilik faaliyetleri zaman zaman silahlı çatışmaların finansmanıyla ilişkilendirilmiştir.",
          "Bu durum, kobalt madenciliğindeki etik tartışmalara benzer biçimde, elektronik üreticilerinin 'çatışmasız mineral' tedarik zinciri sertifikasyonu uygulamalarını benimsemesine yol açmıştır.",
        ],
      },
    ],
    timeline: [
      {
        year: "1802",
        title: "Ekeberg'in keşfi",
        description:
          "Anders Gustaf Ekeberg, İsveç ve Finlandiya'dan gelen mineral örneklerinde yeni bir element tespit etti.",
      },
      {
        year: "1844",
        title: "Niyobyumdan ayrıştırılması",
        description:
          "Heinrich Rose, tantal ile niyobyumun farklı elementler olduğunu kanıtladı.",
      },
    ],
  },
  {
    slug: "renyum",
    introduction: [
      "Renyum, gümüşümsü-beyaz renkli, son derece yoğun ve yüksek sıcaklığa dayanıklı bir geçiş metalidir.",
      "Yer kabuğunda bulunan en nadir elementlerden biridir ve periyodik tabloda kararlı bir izotopu keşfedilen son elementlerden biri olma özelliğini taşır.",
    ],
    discoverySummary:
      "1925'te Alman kimyagerler Walter Noddack, Ida Tacke ve Otto Berg tarafından platin cevheri örneklerinde keşfedildi; adını Ren Nehri'nden alır.",
    meltingPointC: "3186",
    boilingPointC: "5869",
    densityGCm3: "21,02",
    electronConfiguration: "[Xe] 4f¹⁴ 5d⁵ 6s²",
    uses: [
      "Jet motoru türbin kanatlarının süper alaşımlarında",
      "Platin-renyum katalizörlerinde (kurşunsuz yüksek oktanlı benzin üretiminde)",
      "Termokupl sıcaklık sensörlerinde (çok yüksek sıcaklık ölçümü için)",
      "Elektrik kontaklarında ve filamentlerde",
    ],
    sections: [
      {
        title: "Yer kabuğunun en nadir elementlerinden biri",
        paragraphs: [
          "Renyum, Dünya'nın kabuğunda o kadar seyrek bulunur ki, ayrı bir maden olarak çıkarılmaz; neredeyse tamamı bakır ve molibden madenciliğinin yan ürünü olarak elde edilir.",
          "Bu doğal kıtlık, renyumu dünyanın en pahalı endüstriyel metallerinden biri yapar ve stratejik havacılık alaşımlarındaki kritik rolü nedeniyle tedarik güvenliği açısından önemli bir malzeme hâline getirir.",
        ],
      },
      {
        title: "Uçak motorlarının aşırı ısıya dayanma sırrı",
        paragraphs: [
          "Nikel bazlı süper alaşımlara küçük oranlarda renyum eklenmesi, malzemenin çok yüksek sıcaklıklarda bile şeklini koruma (sünme direnci) yeteneğini belirgin biçimde artırır.",
          "Bu özellik, jet motorlarının en sıcak bölgesi olan türbin kanatlarında renyumu kritik bir bileşen yapar -- modern uçak motorlarının verimliliği ve güvenilirliği büyük ölçüde bu küçük ama etkili katkıya dayanır.",
        ],
      },
    ],
    timeline: [
      {
        year: "1925",
        title: "Noddack, Tacke ve Berg'in keşfi",
        description:
          "Alman araştırmacılar, platin cevheri örneklerinde periyodik tablonun o zamana kadar boş kalan son köşelerinden birini dolduran renyumu tespit etti.",
      },
    ],
  },
  {
    slug: "osmiyum",
    introduction: [
      "Osmiyum, mavimsi-gri renkli, doğal olarak bulunan elementler arasında en yoğun olanıdır.",
      "Aşırı sertliği ve gevrekliği nedeniyle saf hâlde işlenmesi zor olduğundan, genellikle diğer platin grubu metalleriyle alaşım hâlinde kullanılır.",
    ],
    discoverySummary:
      "1803'te İngiliz kimyager Smithson Tennant tarafından, ham platin cevherinin işlenmesinden arta kalan çözünmeyen kalıntıda keşfedildi.",
    meltingPointC: "3033",
    boilingPointC: "5012",
    densityGCm3: "22,59",
    electronConfiguration: "[Xe] 4f¹⁴ 5d⁶ 6s²",
    uses: [
      "Dolma kalem uçlarında (osmiyum-iridyum alaşımı, aşınma direnci için)",
      "Elektrik kontaklarında ve fonograf iğnelerinde (tarihsel kullanım)",
      "Bazı cerrahi implant bileşenlerinde",
      "Kimyasal analizlerde osmiyum tetroksit olarak doku boyama maddesi",
    ],
    sections: [
      {
        title: "Bilinen en yoğun doğal element",
        paragraphs: [
          "Osmiyum, 22,59 g/cm³ yoğunluğuyla doğal olarak bulunan elementler arasında en yoğun olanıdır -- aynı boyuttaki bir osmiyum parçası, sudan yaklaşık 22,6 kat daha ağırdır.",
          "İridyumla neredeyse baş başa giden bu rekor yoğunluk, ölçüm yöntemine bağlı olarak hangisinin 'en yoğun' unvanını taşıdığı konusunda bilim insanları arasında hâlâ küçük bir tartışma konusudur.",
        ],
      },
      {
        title: "Adını kokusundan alan tehlikeli element",
        paragraphs: [
          "Osmiyum adı, Yunanca 'koku' anlamına gelen 'osme' kelimesinden gelir -- çünkü hava ile temas ettiğinde oluşan osmiyum tetroksit bileşiği, keskin ve son derece rahatsız edici bir koku yayar.",
          "Bu bileşik aynı zamanda oldukça toksiktir ve gözlere zarar verebilir; bu yüzden saf osmiyumla çalışmak özel laboratuvar önlemleri gerektirir.",
        ],
      },
    ],
    timeline: [
      {
        year: "1803",
        title: "Tennant'ın keşfi",
        description:
          "Smithson Tennant, ham platin cevherinin çözünmeyen siyah kalıntısında osmiyum ve iridyumu aynı anda keşfetti.",
      },
    ],
  },
  {
    slug: "iridyum",
    introduction: [
      "İridyum, gümüşümsü-beyaz renkli, bilinen en korozyona dayanıklı metallerden biridir; neredeyse hiçbir asit onu etkilemez.",
      "Yer kabuğunda son derece nadir bulunmasına rağmen, asteroitlerde çok daha yaygın olması, bilim tarihinin en ünlü keşiflerinden birine kapı araladı.",
    ],
    discoverySummary:
      "1803'te Smithson Tennant tarafından, ham platin cevherinin çözünmeyen kalıntısında osmiyumla birlikte keşfedildi.",
    meltingPointC: "2446",
    boilingPointC: "4428",
    densityGCm3: "22,56",
    electronConfiguration: "[Xe] 4f¹⁴ 5d⁷ 6s²",
    uses: [
      "Buji elektrotlarında (yüksek erime noktası ve aşınma direnci için)",
      "Tarihsel olarak uluslararası kilogram prototipinde (platin-iridyum alaşımı)",
      "Bazı kimyasal tepkimelerde katalizör olarak",
      "Yüksek sıcaklığa dayanıklı ergitme potalarında",
    ],
    sections: [
      {
        title: "Dinozorların yok oluşunu ortaya çıkaran metal",
        paragraphs: [
          "1980'de fizikçi Luis Alvarez ve jeolog oğlu Walter Alvarez, dünya çapında 66 milyon yıl önceye tarihlenen kaya katmanında beklenmedik derecede yüksek iridyum yoğunluğu tespit etti -- iridyum Dünya yüzeyinde son derece nadirken, asteroitlerde çok daha bol bulunur.",
          "Bu bulgu, dinozorların yok oluşuna yol açan büyük bir asteroit çarpmasının kanıtı olarak kabul edildi ve bilim tarihinin en etkileyici disiplinler arası keşiflerinden birine dönüştü.",
        ],
      },
      {
        title: "Osmiyumla birlikte doğan, ondan çok daha kullanışlı ikiz",
        paragraphs: [
          "İridyum, osmiyumla aynı anda ve aynı mineral kalıntısında keşfedilmesine rağmen, çok daha az toksik ve işlenmesi görece daha kolay olduğu için endüstride çok daha geniş kullanım alanı bulmuştur.",
          "Kimyasal olarak neredeyse tamamen inert olması, onu en zorlu kimyasal ortamlarda bile bozulmadan kalması gereken laboratuvar ve endüstriyel ekipmanlar için ideal bir malzeme yapar.",
        ],
      },
    ],
    timeline: [
      {
        year: "1803",
        title: "Tennant'ın keşfi",
        description:
          "Smithson Tennant, platin cevheri kalıntısında iridyum ve osmiyumu aynı anda keşfetti.",
      },
      {
        year: "1980",
        title: "Alvarez'lerin K-Pg sınırı bulgusu",
        description:
          "Luis ve Walter Alvarez, dünya çapındaki iridyum anomalisini dinozorların yok oluşuna yol açan asteroit çarpmasının kanıtı olarak yorumladı.",
      },
    ],
  },
  {
    slug: "talyum",
    introduction: [
      "Talyum, yumuşak, gri renkli, havayla temas ettiğinde hızla donuklaşan zehirli bir post-geçiş metalidir.",
      "Tadı, kokusu ve rengi olmaması nedeniyle tarih boyunca tespit edilmesi son derece zor bir zehir olarak kötü bir üne sahiptir.",
    ],
    discoverySummary:
      "1861'de İngiliz kimyager William Crookes tarafından, alev spektroskopisinde verdiği karakteristik yeşil çizgi sayesinde keşfedildi.",
    meltingPointC: "304",
    boilingPointC: "1473",
    densityGCm3: "11,85",
    electronConfiguration: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹",
    uses: [
      "Kızılötesi optik cihazlarda (talyum bromür-iyodür kristalleri)",
      "Bazı yarı iletken ve elektronik bileşenlerde",
      "Tarihsel olarak fare zehiri ve saç dökücü kremlerde (artık yasak)",
      "Kalp kası görüntülemesinde radyoaktif izleyici olarak (talyum-201)",
    ],
    sections: [
      {
        title: "'Mirasçı tozu' olarak anılan sessiz zehir",
        paragraphs: [
          "Talyum bileşikleri tatsız, kokusuz ve renksiz olduğu için yiyecek veya içeceğe fark edilmeden karıştırılabilir; belirtileri de başlangıçta grip veya başka hastalıklarla kolayca karıştırılabilecek kadar belirsizdir.",
          "Bu özellikler, 20. yüzyılın ortalarında talyumu cinayetlerde tercih edilen bir zehir hâline getirdi ve ona 'mirasçı tozu' veya 'zehirleyicilerin zehiri' gibi kötü şöhretli lakaplar kazandırdı; günümüzde daha gelişmiş adli toksikoloji yöntemleri sayesinde tespiti artık çok daha kolaydır.",
        ],
      },
      {
        title: "Yeşil bir alevle keşfedilen element",
        paragraphs: [
          "William Crookes, kükürtlü asit üretim atıklarını spektroskopla incelerken daha önce görülmemiş parlak bir yeşil spektral çizgi fark etti; element adını da bu gözlemden alır, Yunanca 'yeşil filiz' anlamına gelen 'thallos' kelimesinden türetilmiştir.",
          "İlginç biçimde, aynı yıl Fransız kimyager Claude-Auguste Lamy de bağımsız olarak elementi keşfetti ve onu saf metal hâlinde ilk izole eden kişi oldu.",
        ],
      },
    ],
    timeline: [
      {
        year: "1861",
        title: "Crookes'un keşfi",
        description:
          "William Crookes, spektroskopik analizde daha önce bilinmeyen yeşil bir çizgi tespit ederek talyumu keşfetti.",
      },
    ],
  },
  {
    slug: "polonyum",
    introduction: [
      "Polonyum, gümüşümsü-gri renkli, aşırı derecede radyoaktif ve toksik bir yarı metaldir.",
      "Doğada son derece az miktarda bulunur ve neredeyse tüm kullanılabilir miktarı nükleer reaktörlerde yapay olarak üretilir.",
    ],
    discoverySummary:
      "1898'de Marie ve Pierre Curie tarafından, uranyum cevheri pitchblende'in incelenmesi sırasında keşfedildi; Marie Curie tarafından memleketi Polonya'ya ithafen adlandırıldı.",
    meltingPointC: "254",
    boilingPointC: "962",
    densityGCm3: "9,32",
    electronConfiguration: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴",
    uses: [
      "Endüstriyel statik elektrik giderici fırçalarda (küçük, kontrollü miktarlarda)",
      "Uzay araçlarında ısı kaynağı olarak (tarihsel radyoizotop jeneratörleri)",
      "Nükleer silah tetikleyici bileşenlerinde (tarihsel, kısıtlı kullanım)",
      "Bilimsel araştırmalarda alfa parçacığı kaynağı olarak",
    ],
    sections: [
      {
        title: "Bir ülkenin bağımsızlık mücadelesine adanan element",
        paragraphs: [
          "Marie Curie, kocası Pierre'le birlikte bu yeni elementi keşfettiğinde, onu doğduğu ülke olan ve o dönemde Rusya, Almanya ve Avusturya arasında paylaşılmış, bağımsız bir devlet olarak var olmayan Polonya'ya ithafen adlandırdı.",
          "Bu isimlendirme, bilimsel bir keşfin aynı zamanda güçlü bir siyasi ve kişisel anlam taşıdığı, kimya tarihinin en duygusal örneklerinden biri olarak kabul edilir.",
        ],
      },
      {
        title: "Bir casusluk skandalının merkezinde",
        paragraphs: [
          "2006'da Londra'da eski Rus istihbarat görevlisi Alexander Litvinenko'nun polonyum-210 ile zehirlenerek öldürülmesi, bu elementi dünya çapında haberlerin ön sayfalarına taşıdı.",
          "Bu olay, polonyumun ne kadar öldürücü olduğunu -- son derece küçük miktarların bile ölümcül olabileceğini ve geleneksel yöntemlerle tespitinin zor olduğunu -- kamuoyuna çarpıcı biçimde gösterdi.",
        ],
      },
    ],
    timeline: [
      {
        year: "1898",
        title: "Curie çiftinin keşfi",
        description:
          "Marie ve Pierre Curie, pitchblende cevherini incelerken polonyumu keşfetti; bu, Marie Curie'nin keşfettiği ilk elementti.",
      },
      {
        year: "2006",
        title: "Litvinenko vakası",
        description:
          "Alexander Litvinenko'nun polonyum-210 ile zehirlenmesi, elementi dünya kamuoyunun gündemine taşıdı.",
      },
    ],
  },
  {
    slug: "astatin",
    introduction: [
      "Astatin, doğal olarak Dünya kabuğunda bulunan elementler arasında en nadir olanıdır -- herhangi bir anda gezegende toplamda bir gramdan bile daha az miktarda bulunduğu tahmin edilir.",
      "Aşırı radyoaktif olduğu için hızla bozunur; bu yüzden fiziksel özellikleri hakkında doğrudan gözleme dayalı çok az bilgi vardır.",
    ],
    discoverySummary:
      "1940'ta Dale R. Corson, Kenneth Ross MacKenzie ve Emilio Segrè tarafından, Kaliforniya Üniversitesi'nde bir parçacık hızlandırıcısında yapay olarak üretildi.",
    meltingPointC: "302 (tahmini)",
    boilingPointC: "337 (tahmini)",
    densityGCm3: "yaklaşık 6,2-6,5 (tahmini)",
    electronConfiguration: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵",
    uses: [
      "Kanser tedavisinde hedefe yönelik alfa parçacığı tedavisi araştırmalarında",
      "Temel nükleer kimya araştırmalarında",
      "Radyofarmasötik geliştirme çalışmalarında",
    ],
    sections: [
      {
        title: "Dünyanın en nadir doğal elementi",
        paragraphs: [
          "Astatinin tüm izotopları o kadar hızlı bozunur ki, Dünya kabuğunda doğal olarak oluşan miktarı sürekli olarak yenilenmesine rağmen herhangi bir anda toplamda bir gramın çok altında kalır -- bu da onu gezegendeki en nadir doğal elementi yapar.",
          "Element adı da bu kararsızlığı yansıtır: Yunanca 'kararsız' anlamına gelen 'astatos' kelimesinden türetilmiştir.",
        ],
      },
      {
        title: "Kanser tedavisinde umut vadeden yeni bir rol",
        paragraphs: [
          "Astatin-211 izotopu, yaydığı alfa parçacıklarının kısa menzili sayesinde sağlıklı dokuya minimum zarar vererek kanser hücrelerini hedef alabilme potansiyeli taşır.",
          "Bu özellik, astatini 'hedefe yönelik alfa parçacığı tedavisi' adı verilen deneysel bir kanser tedavisi yaklaşımında umut verici bir araştırma konusu hâline getirmiştir.",
        ],
      },
    ],
    timeline: [
      {
        year: "1940",
        title: "Corson, MacKenzie ve Segrè'nin üretimi",
        description:
          "Kaliforniya Üniversitesi'ndeki bir parçacık hızlandırıcısında bizmut hedefinin bombardımana tutulmasıyla astatin ilk kez yapay olarak üretildi.",
      },
    ],
  },
  {
    slug: "radon",
    introduction: [
      "Radon, renksiz, kokusuz, radyoaktif bir soy gazdır; toprak ve kayalardaki uranyum ve radyumun doğal bozunma sürecinden sürekli olarak oluşur.",
      "Görünmez ve algılanamaz olması, evlerde birikebilen bu gazı ciddi bir halk sağlığı sorunu hâline getirir.",
    ],
    discoverySummary:
      "1900'de Alman fizikçi Friedrich Ernst Dorn tarafından, radyumun bozunma ürünü olarak keşfedildi.",
    meltingPointC: "-71",
    boilingPointC: "-61,7",
    densityGCm3: "0,00973 (gaz)",
    electronConfiguration: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶",
    uses: [
      "Bazı radyoterapi uygulamalarında (tarihsel, artık büyük ölçüde terk edildi)",
      "Jeolojik araştırmalarda deprem ve fay hattı hareketlerinin izlenmesinde",
      "Toprak ve yeraltı suyu hareketlerinin incelenmesinde izleyici gaz olarak",
      "Ev radon test kitlerinde ölçülen hedef gaz olarak",
    ],
    sections: [
      {
        title: "Sigaradan sonra akciğer kanserinin ikinci nedeni",
        paragraphs: [
          "Radon, topraktan sızarak evlerin bodrum katlarında ve alt kısımlarında birikebilir; solunduğunda akciğer dokusuna yerleşen radyoaktif bozunma ürünleri, uzun vadede akciğer kanseri riskini önemli ölçüde artırabilir.",
          "Dünya Sağlık Örgütü, radonu sigara içmeden sonra akciğer kanserinin ikinci önde gelen nedeni olarak sınıflandırır -- bu yüzden birçok ülkede evlerde radon seviyesi ölçümü ve gerektiğinde havalandırma önlemleri önerilir.",
        ],
      },
      {
        title: "Radyumun görünmez soluğu",
        paragraphs: [
          "Friedrich Dorn, radyum örneklerini incelerken bu elementin sürekli olarak gaz hâlinde bir madde yaydığını fark etti -- bu gaz başlangıçta 'radyum emanasyonu' olarak adlandırıldı ve daha sonra bağımsız bir element olarak tanınarak radon adını aldı.",
          "Radon, periyodik tablodaki soy gazlar arasında en ağır olanıdır ve diğer soy gazların aksine kararlı izotopu bulunmayan tek üyesidir.",
        ],
      },
    ],
    timeline: [
      {
        year: "1900",
        title: "Dorn'un keşfi",
        description:
          "Friedrich Ernst Dorn, radyumun sürekli olarak radyoaktif bir gaz yaydığını gözlemleyerek radonu keşfetti.",
      },
    ],
  },
  {
    slug: "seryum",
    introduction: [
      "Seryum, lantanit serisinin en bol bulunan üyesidir -- yer kabuğunda bakırdan bile daha fazla miktarda bulunur.",
      "Gümüşümsü-gri renkli, nispeten yumuşak bir metaldir ve havayla temas ettiğinde kolayca oksitlenir.",
    ],
    discoverySummary:
      "1803'te İsveçli kimyagerler Jöns Jacob Berzelius ve Wilhelm Hisinger ile bağımsız olarak Alman kimyager Martin Heinrich Klaproth tarafından keşfedildi; adını yeni keşfedilen Ceres asteroidinden alır.",
    meltingPointC: "798",
    boilingPointC: "3443",
    densityGCm3: "6,77",
    electronConfiguration: "[Xe] 4f¹ 5d¹ 6s²",
    uses: [
      "Otomobil katalitik konvertörlerinde",
      "Kendini temizleyen fırın camlarında (katalitik oksidasyon)",
      "Çakmak taşlarında (demir-seryum alaşımı, sürtününce kıvılcım çıkarır)",
      "Cam parlatma tozlarında",
    ],
    sections: [
      {
        title: "'Nadir toprak' olmasına rağmen aslında bol bir element",
        paragraphs: [
          "'Nadir toprak elementleri' adı verilen grubun bir üyesi olmasına rağmen, seryum aslında yer kabuğunda bakır, kurşun ve kalaydan bile daha bol bulunur -- 'nadir' ismi, tarihsel olarak bu elementlerin saf hâlde ayrıştırılmasının zorluğundan gelir, doğal bolluklarından değil.",
          "Bu bolluk, seryumu diğer birçok lantanite göre çok daha uygun fiyatlı ve endüstriyel ölçekte kullanılabilir bir malzeme yapar.",
        ],
      },
      {
        title: "Her çakmağın içindeki kıvılcım",
        paragraphs: [
          "Demir ile seryum karışımından oluşan 'ferroseryum' alaşımı, sert bir yüzeye sürtüldüğünde kolayca kıvılcım çıkarır -- bu özellik onu çakmak taşlarının ve kamp ateşi başlatıcılarının standart malzemesi yapar.",
          "Bu basit ama etkili kıvılcım mekanizması, 20. yüzyıl başından beri neredeyse hiç değişmeden günümüze kadar kullanılmaya devam ediyor.",
        ],
      },
    ],
    timeline: [
      {
        year: "1803",
        title: "Berzelius, Hisinger ve Klaproth'un keşfi",
        description:
          "İsveç ve Almanya'da eşzamanlı olarak yürütülen çalışmalarla seryum keşfedildi ve yeni bulunan Ceres asteroidine ithafen adlandırıldı.",
      },
    ],
  },
  {
    slug: "praseodim",
    introduction: [
      "Praseodim, yumuşak, gümüşümsü-sarı renkli bir lantanit metalidir; havayla temas ettiğinde yeşilimsi bir oksit tabakasıyla kaplanır.",
      "Adını, ayrıştırıldığı karışık mineralin rengine ve bir 'ikiz' elementten ayrılma hikâyesine borçludur.",
    ],
    discoverySummary:
      "1885'te Avusturyalı kimyager Carl Auer von Welsbach tarafından, o zamana kadar tek element sanılan 'didim'in aslında iki ayrı element olduğunun kanıtlanmasıyla keşfedildi.",
    meltingPointC: "931",
    boilingPointC: "3520",
    densityGCm3: "6,77",
    electronConfiguration: "[Xe] 4f³ 6s²",
    uses: [
      "Uçak motoru alaşımlarında (magnezyumla birlikte, yüksek sıcaklık dayanımı için)",
      "Didim güvenlik gözlüklerinde (cam üfleyicileri ve kaynakçıları için)",
      "Bazı lazer kristallerinde",
      "Seramik pigmentlerinde sarı renk verici olarak",
    ],
    sections: [
      {
        title: "Yanlışlıkla tek sanılan 'ikiz' elementin gerçek yüzü",
        paragraphs: [
          "19. yüzyılda kimyagerler, 'didim' adını verdikleri bir elementin var olduğuna inanıyordu; ancak Carl Auer von Welsbach, 1885'te bu maddenin aslında birbirine çok benzeyen iki farklı elementin karışımı olduğunu kanıtladı.",
          "Bu iki elementten biri, yeşilimsi tuzları nedeniyle Yunanca 'pırasa yeşili ikiz' anlamına gelen 'praseodim' adını aldı; diğeri ise neodim oldu.",
        ],
      },
      {
        title: "Kaynakçıların gözünü koruyan yeşilimsi cam",
        paragraphs: [
          "Praseodim ve neodim içeren özel 'didim camı', sodyum buharının yaydığı parlak sarı ışığı süzerek cam üfleyicileri ve kaynakçıları göz yorgunluğu ve olası hasardan korur.",
          "Bu koruyucu gözlükler, günümüzde hâlâ endüstriyel cam işleme atölyelerinde standart güvenlik ekipmanı olarak kullanılmaya devam ediyor.",
        ],
      },
    ],
    timeline: [
      {
        year: "1885",
        title: "Von Welsbach'ın ayrıştırması",
        description:
          "Carl Auer von Welsbach, 'didim'in aslında praseodim ve neodim adlı iki ayrı element olduğunu kanıtladı.",
      },
    ],
  },
  {
    slug: "neodim",
    introduction: [
      "Neodim, parlak gümüşümsü renkli bir lantanit metalidir ve bilinen en güçlü kalıcı mıknatısların üretiminde kullanılan kritik bir hammaddedir.",
      "Havayla temas ettiğinde hızla oksitlenerek renk değiştirir; bu yüzden genellikle koruyucu kaplamalarla kullanılır.",
    ],
    discoverySummary:
      "1885'te Carl Auer von Welsbach tarafından, 'didim' adlı karışımın praseodimden ayrıştırılmasıyla keşfedildi.",
    meltingPointC: "1021",
    boilingPointC: "3074",
    densityGCm3: "7,01",
    electronConfiguration: "[Xe] 4f⁴ 6s²",
    uses: [
      "Neodim-demir-bor (NdFeB) kalıcı mıknatıslarında (kulaklık, sabit disk, elektrikli araç motoru)",
      "Rüzgar türbini jeneratörlerinde",
      "Nd:YAG lazerlerinde (cerrahi ve endüstriyel kesim)",
      "Cam ve seramik boyamada mor-pembe renk verici olarak",
    ],
    sections: [
      {
        title: "Cebindeki en güçlü mıknatısın gizli kahramanı",
        paragraphs: [
          "Neodim-demir-bor alaşımından yapılan mıknatıslar, aynı boyuttaki diğer mıknatıs türlerinden çok daha güçlü manyetik alan üretebilir -- bu, kulaklıklardan sabit disklere, elektrikli araç motorlarından rüzgar türbinlerine kadar sayısız modern teknolojinin küçük ve güçlü olmasını mümkün kılar.",
          "Elektrikli araçlara ve yenilenebilir enerjiye artan küresel geçiş, neodim talebini son yıllarda önemli ölçüde artırmıştır.",
        ],
      },
      {
        title: "Praseodimin ayrılmaz ikizi",
        paragraphs: [
          "Neodim, praseodimle birlikte 'didim' adı verilen karışımdan aynı araştırma sürecinde ayrıştırıldı; bu ortak köken, iki elementin adlarındaki 'didim' bağlantısında hâlâ görülebilir (praseodim = 'yeşil didim', neodim = 'yeni didim').",
          "Bu tarihsel bağ, günümüzde de sürüyor: iki element genellikle aynı cevherlerde birlikte bulunur ve madencilik/ayrıştırma süreçlerinde birlikte işlenir.",
        ],
      },
    ],
    timeline: [
      {
        year: "1885",
        title: "Von Welsbach'ın ayrıştırması",
        description:
          "Carl Auer von Welsbach, 'didim' karışımından neodim ve praseodimi ayrı elementler olarak ayrıştırdı.",
      },
      {
        year: "1982",
        title: "NdFeB mıknatısının icadı",
        description:
          "General Motors ve Sumitomo Special Metals bağımsız olarak, o zamana kadarki en güçlü kalıcı mıknatıs türünü geliştirdi.",
      },
    ],
  },
  {
    slug: "prometyum",
    introduction: [
      "Prometyum, lantanit serisinin kararlı izotopu bulunmayan tek üyesidir -- tüm izotopları radyoaktiftir ve doğada yalnızca eser miktarlarda bulunur.",
      "Bu nadirlik, onu lantanitler arasında en az bilinen ve en az kullanılan elementlerden biri yapar.",
    ],
    discoverySummary:
      "1945'te Jacob A. Marinsky, Lawrence E. Glendenin ve Charles D. Coryell tarafından, uranyum fisyon ürünlerinin incelenmesi sırasında keşfedildi.",
    meltingPointC: "1042",
    boilingPointC: "3000 (tahmini)",
    densityGCm3: "7,26",
    electronConfiguration: "[Xe] 4f⁵ 6s²",
    uses: [
      "Kendinden ışık kaynaklı boyalarda (radyolüminesans, tarihsel kullanım)",
      "Betavoltaik pillerde (uzun ömürlü, düşük güçlü nükleer piller)",
      "Bilimsel araştırmalarda beta parçacığı kaynağı olarak",
      "Kalınlık ölçüm cihazlarında (endüstriyel radyasyon ölçer)",
    ],
    sections: [
      {
        title: "Ateşi çalan Titan'ın adını taşıyan element",
        paragraphs: [
          "Mendeleyev'in periyodik tablosunda 61 numaralı elementin var olması gerektiği uzun süre biliniyordu, ancak doğal kararlı bir izotopu olmadığı için keşfi onlarca yıl gecikti.",
          "Element sonunda nükleer reaktör atıklarında tespit edildiğinde, Yunan mitolojisinde insanlığa ateşi -- hem güç hem tehlike kaynağı -- getiren Titan Prometheus'un adı verildi; bu isim, nükleer teknolojinin hem yararlı hem riskli doğasına sembolik bir gönderme olarak görülür.",
        ],
      },
      {
        title: "Doğada neredeyse hiç bulunmayan bir element",
        paragraphs: [
          "Prometyumun tüm izotopları nispeten kısa sürede bozunduğu için, Dünya kabuğunda herhangi bir anda doğal olarak bulunan toplam miktarı yalnızca birkaç yüz gramla sınırlıdır -- bu miktar, uranyum cevherlerindeki kendiliğinden fisyon süreçlerinden sürekli olarak yenilenir.",
          "Kullanılabilir prometyum, bu yüzden neredeyse tamamen nükleer reaktörlerde yapay olarak üretilir.",
        ],
      },
    ],
    timeline: [
      {
        year: "1945",
        title: "Marinsky, Glendenin ve Coryell'in keşfi",
        description:
          "Oak Ridge Ulusal Laboratuvarı'nda uranyum fisyon ürünleri arasında prometyum tespit edildi.",
      },
    ],
  },
  {
    slug: "samaryum",
    introduction: [
      "Samaryum, sert, gümüşümsü-beyaz renkli bir lantanit metalidir; yüksek sıcaklıklara ve manyetik alan kaybına karşı olağanüstü dirençli mıknatısların üretiminde kullanılır.",
      "Adını, kimya tarihinde bir mineral aracılığıyla gerçek bir kişiden adını alan ilk element olma özelliğiyle taşır.",
    ],
    discoverySummary:
      "1879'da Fransız kimyager Paul-Émile Lecoq de Boisbaudran tarafından, samarskit mineralinde keşfedildi.",
    meltingPointC: "1072",
    boilingPointC: "1900",
    densityGCm3: "7,52",
    electronConfiguration: "[Xe] 4f⁶ 6s²",
    uses: [
      "Samaryum-kobalt mıknatıslarında (aşırı sıcaklığa dayanıklı, havacılık ve savunma sanayinde)",
      "Nükleer reaktör kontrol çubuklarında (güçlü nötron soğurucu olarak)",
      "Bazı kanser tedavilerinde radyoaktif izotop olarak (samaryum-153)",
      "Kızılötesi soğurucu camlarda",
    ],
    sections: [
      {
        title: "Bir madencinin adını taşıyan ilk element",
        paragraphs: [
          "Samaryum, adını doğrudan bulunduğu samarskit mineralinden alır; bu mineral ise 19. yüzyılda Rus maden mühendisi Vasili Samarski-Bihovets'in onuruna adlandırılmıştı.",
          "Bu dolaylı bağlantı sayesinde samaryum, bir mineral aracılığıyla da olsa gerçek, yaşamış bir kişinin adını taşıyan ilk kimyasal element olma özelliğini kazanmıştır.",
        ],
      },
      {
        title: "Neodimin başaramadığı yerde çalışan mıknatıs",
        paragraphs: [
          "Neodim mıknatıslar çok güçlü olsa da yüksek sıcaklıklarda manyetik özelliklerini hızla kaybeder; samaryum-kobalt mıknatıslar ise 300°C'ye kadar olan sıcaklıklarda bile manyetik gücünü büyük ölçüde korur.",
          "Bu sıcaklık dayanıklılığı, onu jet motorları, füze güdüm sistemleri ve uzay araçları gibi aşırı koşullarda çalışması gereken uygulamalar için vazgeçilmez kılar.",
        ],
      },
    ],
    timeline: [
      {
        year: "1879",
        title: "De Boisbaudran'ın keşfi",
        description:
          "Paul-Émile Lecoq de Boisbaudran, samarskit mineralini spektroskopik olarak inceleyerek samaryumu keşfetti.",
      },
    ],
  },
  {
    slug: "evropiyum",
    introduction: [
      "Evropiyum, lantanit serisinin en reaktif üyesidir; yumuşak, gümüşümsü renkli bir metaldir ve havayla temas ettiğinde hızla oksitlenir.",
      "Adını, keşfedildiği kıtaya ithafen alan nadir elementlerden biridir.",
    ],
    discoverySummary:
      "1901'de Fransız kimyager Eugène-Anatole Demarçay tarafından, samaryum bileşiklerinin dikkatli spektroskopik analiziyle keşfedildi.",
    meltingPointC: "826",
    boilingPointC: "1529",
    densityGCm3: "5,264",
    electronConfiguration: "[Xe] 4f⁷ 6s²",
    uses: [
      "Eski renkli televizyon ve plazma ekranlarda kırmızı fosfor kaynağı olarak",
      "Euro banknotlarında sahtecilik önleyici mor ötesi ışıma katkısı olarak",
      "Nükleer reaktör kontrol çubuklarında (nötron soğurucu)",
      "Floresan lambalarda renk verici katkı olarak",
    ],
    sections: [
      {
        title: "Kıtasının adını taşıyan ve onu koruyan element",
        paragraphs: [
          "Evropiyum, adını doğrudan Avrupa kıtasından alır -- bu, dünyanın belirli bir kıtasına ithafen adlandırılan az sayıdaki elementten biridir.",
          "İlginç bir tesadüfle, evropiyum bileşikleri bugün Euro banknotlarına eklenerek, mor ötesi ışık altında parlayan, taklit edilmesi zor bir sahtecilik önleme katmanı oluşturuyor -- element adeta kendi adını taşıyan para biriminin güvenliğini sağlıyor.",
        ],
      },
      {
        title: "Lantanitlerin en huzursuz üyesi",
        paragraphs: [
          "Evropiyum, tüm lantanitler arasında havayla ve suyla en hızlı tepkimeye giren üyedir; bu yüzden saf hâlde genellikle argon gibi soy gazlarla dolu kaplarda saklanır.",
          "Bu yüksek reaktivite, onu saf metal olarak değil, çoğunlukla kararlı oksit bileşikleri hâlinde kullanılan bir element yapar.",
        ],
      },
    ],
    timeline: [
      {
        year: "1901",
        title: "Demarçay'ın keşfi",
        description:
          "Eugène-Anatole Demarçay, samaryum bileşiklerinin spektral çizgilerini dikkatle inceleyerek evropiyumu ayrıştırdı.",
      },
    ],
  },
  {
    slug: "gadolinyum",
    introduction: [
      "Gadolinyum, gümüşümsü-beyaz renkli bir lantanit metalidir ve bilinen elementler arasında en yüksek nötron yakalama kapasitesine sahiptir.",
      "Modern tıbbi görüntülemenin kritik bir bileşeni olarak, MRI cihazlarında milyonlarca hastada kullanılır.",
    ],
    discoverySummary:
      "1880'de İsviçreli kimyager Jean Charles Galissard de Marignac tarafından keşfedildi; adını, yitriyumu keşfeden Fin kimyager Johan Gadolin'den alır.",
    meltingPointC: "1312",
    boilingPointC: "3273",
    densityGCm3: "7,90",
    electronConfiguration: "[Xe] 4f⁷ 5d¹ 6s²",
    uses: [
      "MRI (manyetik rezonans görüntüleme) kontrast maddelerinde",
      "Nükleer reaktör kalkanlarında ve kontrol çubuklarında",
      "Bazı manyetik soğutma sistemlerinde",
      "Mikrodalga teknolojisinde ve veri depolama malzemelerinde",
    ],
    sections: [
      {
        title: "MRI görüntülerini netleştiren enjekte edilebilir metal",
        paragraphs: [
          "Gadolinyum bileşikleri, damar içine enjekte edildiğinde çevredeki dokuların manyetik rezonans sinyalini değiştirerek MRI görüntülerinde tümör, iltihap ve damar anormalliklerinin çok daha net görülmesini sağlar.",
          "Bu özellik, gadolinyum bazlı kontrast maddeleri dünya çapında MRI çekimlerinin önemli bir bölümünde standart bir tanı aracı hâline getirmiştir.",
        ],
      },
      {
        title: "Nötronları durduran doğal kalkan",
        paragraphs: [
          "Gadolinyum, bilinen tüm elementler arasında en yüksek nötron yakalama kesit alanına sahiptir -- bu da onu nükleer reaktörlerde radyasyon kalkanlaması ve tepkime kontrolü için son derece etkili bir malzeme yapar.",
          "Elementin adı da bu alandaki öncü çalışmalarıyla tanınan Johan Gadolin'e (yitriyumu keşfeden kimyager) bir saygı ifadesidir.",
        ],
      },
    ],
    timeline: [
      {
        year: "1880",
        title: "Marignac'ın keşfi",
        description:
          "Jean Charles Galissard de Marignac, samarskit ve gadolinit minerallerinde gadolinyumu tespit etti.",
      },
    ],
  },
  {
    slug: "terbiyum",
    introduction: [
      "Terbiyum, gümüşümsü-gri renkli, yumuşak ve şekil verilebilir bir lantanit metalidir.",
      "İsveç'in Ytterby köyünden adını alan dört elementten biri olarak, kimya tarihinin en verimli tek maden yataklarından birine olan bağını taşır.",
    ],
    discoverySummary:
      "1843'te İsveçli kimyager Carl Gustaf Mosander tarafından, yitriyum oksit örneklerinin ayrıştırılması sırasında keşfedildi.",
    meltingPointC: "1356",
    boilingPointC: "3230",
    densityGCm3: "8,23",
    electronConfiguration: "[Xe] 4f⁹ 6s²",
    uses: [
      "Floresan lambalarda yeşil fosfor kaynağı olarak",
      "Terfenol-D alaşımında (manyetostriktif malzeme, sonar ve aktüatörlerde)",
      "Bazı katı hâl lazer ve optik cihazlarda",
      "Nükleer reaktör yakıtı davranış araştırmalarında",
    ],
    sections: [
      {
        title: "Ytterby köyünün dört elementinden biri",
        paragraphs: [
          "Terbiyum, İsveç'in küçük Ytterby köyünde bulunan mineral örneklerinden ayrıştırılan dört elementten (itriyum, terbiyum, erbiyum, iterbiyum) biridir -- bu sıra dışı durum, tek bir yerleşim yerinin periyodik tabloya bu kadar çok isim vermesi bakımından benzersizdir.",
          "Mosander, yitriyum oksidini dikkatle inceleyerek içinde daha önce fark edilmemiş iki yeni element -- terbiyum ve erbiyum -- olduğunu ortaya çıkardı.",
        ],
      },
      {
        title: "Şekil değiştiren alaşımın gizli bileşeni",
        paragraphs: [
          "Terbiyum, demir ve disprozyumla birleştirildiğinde 'Terfenol-D' adı verilen, manyetik alana maruz kaldığında fiziksel olarak şekil değiştirebilen olağanüstü bir alaşım oluşturur.",
          "Bu 'manyetostriktif' özellik, sualtı sonar sistemlerinde ve hassas endüstriyel aktüatörlerde ses veya hareket üretmek için kullanılır.",
        ],
      },
    ],
    timeline: [
      {
        year: "1843",
        title: "Mosander'in keşfi",
        description:
          "Carl Gustaf Mosander, yitriyum oksidi örneklerini incelerken terbiyum ve erbiyumu aynı anda keşfetti.",
      },
    ],
  },
  {
    slug: "disprozyum",
    introduction: [
      "Disprozyum, parlak, gümüşümsü renkli bir lantanit metalidir ve bilinen elementler arasında düşük sıcaklıklarda en güçlü manyetik özelliklere sahip olanlardan biridir.",
      "Adı, ayrıştırılmasının ne kadar zorlu olduğuna dair doğrudan bir gönderme taşır.",
    ],
    discoverySummary:
      "1886'da Paul-Émile Lecoq de Boisbaudran tarafından keşfedildi; ancak saf hâlde izolasyonu ancak 1950'lerde iyon değişimi teknikleriyle mümkün olabildi.",
    meltingPointC: "1412",
    boilingPointC: "2567",
    densityGCm3: "8,54",
    electronConfiguration: "[Xe] 4f¹⁰ 6s²",
    uses: [
      "Neodim mıknatıslarına katkı maddesi olarak (yüksek sıcaklık performansını artırmak için)",
      "Nükleer reaktör kontrol çubuklarında",
      "Veri depolama teknolojilerinde",
      "Lazer malzemelerinde katkı maddesi olarak",
    ],
    sections: [
      {
        title: "'Ulaşılması zor' anlamına gelen isim",
        paragraphs: [
          "Disprozyum adı, Yunanca 'ulaşılması zor, elde edilmesi güç' anlamına gelen 'dysprositos' kelimesinden gelir -- bu isim, elementin diğer lantanitlerden ayrıştırılmasının ne kadar zahmetli olduğunu doğrudan yansıtır.",
          "De Boisbaudran, saf disprozyum örneğini elde edebilmek için otuzdan fazla kimyasal ayrıştırma işlemi gerçekleştirmek zorunda kalmıştı.",
        ],
      },
      {
        title: "Elektrikli araç motorlarının sıcağa dayanıklı yardımcısı",
        paragraphs: [
          "Saf neodim mıknatıslar yüksek sıcaklıklarda manyetik gücünü kaybetme eğilimindedir; küçük oranlarda disprozyum eklenmesi bu sorunu önemli ölçüde azaltır ve mıknatısın motor çalışırken oluşan ısıya dayanmasını sağlar.",
          "Bu nedenle disprozyum, elektrikli araç motorlarının performansı ve güvenilirliği için kritik ama nispeten az bilinen bir bileşendir.",
        ],
      },
    ],
    timeline: [
      {
        year: "1886",
        title: "De Boisbaudran'ın keşfi",
        description:
          "Paul-Émile Lecoq de Boisbaudran, holmiyum oksidinden disprozyumu ayrıştırmayı başardı.",
      },
    ],
  },
  {
    slug: "holmiyum",
    introduction: [
      "Holmiyum, gümüşümsü-beyaz renkli bir lantanit metalidir ve bilinen tüm elementler arasında en yüksek manyetik momente sahip olanıdır.",
      "Adını, keşfedildiği şehir olan Stockholm'ün Latince adından alır.",
    ],
    discoverySummary:
      "1878'de İsviçreli kimyagerler Jacques-Louis Soret ve Marc Delafontaine ile bağımsız olarak İsveçli kimyager Per Teodor Cleve tarafından keşfedildi.",
    meltingPointC: "1474",
    boilingPointC: "2700",
    densityGCm3: "8,79",
    electronConfiguration: "[Xe] 4f¹¹ 6s²",
    uses: [
      "Ho:YAG lazerlerinde (böbrek taşı kırma ve diğer cerrahi uygulamalarda)",
      "En güçlü yapay mıknatısların üretiminde (hibrit mıknatıs çekirdeklerinde)",
      "Cam ve seramik boyamada sarı-kırmızı renk verici olarak",
      "Optik cihazların kalibrasyonunda (dalga boyu standardı olarak)",
    ],
    sections: [
      {
        title: "Stockholm'ün adını taşıyan manyetik şampiyon",
        paragraphs: [
          "Holmiyum, Per Teodor Cleve tarafından Stockholm'ün Latince adı 'Holmia'ya ithafen adlandırıldı; keşif süreci, Cleve'in erbiyum oksidini dikkatle incelemesiyle gerçekleşti.",
          "Bilinen elementler arasında en yüksek manyetik momente sahip olması, onu bilim insanlarının en güçlü yapay manyetik alanları üretmeye çalıştığı hibrit mıknatıs sistemlerinde kritik bir bileşen yapar.",
        ],
      },
      {
        title: "Böbrek taşlarını parçalayan lazer ışığı",
        paragraphs: [
          "Holmiyum katkılı YAG lazerleri, dokuya minimum zarar vererek böbrek taşlarını hassas biçimde parçalayabilen bir dalga boyunda ışık yayar.",
          "Bu teknoloji, günümüzde ürolojide böbrek taşı tedavisinin altın standart yöntemlerinden biri hâline gelmiştir.",
        ],
      },
    ],
    timeline: [
      {
        year: "1878",
        title: "Soret ve Delafontaine'in gözlemi",
        description:
          "İsviçreli kimyagerler, erbiyum örneklerinde daha önce tanımlanmamış spektral çizgiler tespit etti.",
      },
      {
        year: "1879",
        title: "Cleve'in izolasyonu",
        description:
          "Per Teodor Cleve, elementi bağımsız olarak izole etti ve Stockholm'e ithafen adlandırdı.",
      },
    ],
  },
  {
    slug: "erbiyum",
    introduction: [
      "Erbiyum, gümüşümsü-beyaz renkli bir lantanit metalidir ve modern internet altyapısının görünmez bir bileşeni olarak fiber optik iletişimde kritik rol oynar.",
      "İsveç'in Ytterby köyünden adını alan dört elementten biridir.",
    ],
    discoverySummary:
      "1843'te Carl Gustaf Mosander tarafından, yitriyum oksit örneklerinin ayrıştırılması sırasında terbiyumla birlikte keşfedildi.",
    meltingPointC: "1529",
    boilingPointC: "2868",
    densityGCm3: "9,07",
    electronConfiguration: "[Xe] 4f¹² 6s²",
    uses: [
      "Fiber optik amplifikatörlerinde (erbiyum katkılı fiber amplifikatörler, EDFA)",
      "Pembe-kırmızı renkli cam ve porselen sırlarında",
      "Nükleer reaktör kontrol çubuklarında (nötron soğurucu)",
      "Cerrahi ve dermatolojik lazerlerde (Er:YAG lazerleri, cilt yenileme)",
    ],
    sections: [
      {
        title: "Küresel internetin görünmez güçlendiricisi",
        paragraphs: [
          "Uzun mesafeli fiber optik kablolarda ışık sinyali mesafe arttıkça zayıflar; erbiyum katkılı fiber amplifikatörler, bu zayıflayan sinyali elektronik dönüşüme gerek kalmadan doğrudan optik olarak güçlendirebilir.",
          "Bu teknoloji, kıtalar arası internet trafiğini taşıyan denizaltı fiber optik kabloların pratik olarak çalışabilmesini sağlayan kritik bir buluş olarak kabul edilir.",
        ],
      },
      {
        title: "Terbiyumun keşif ortağı",
        paragraphs: [
          "Erbiyum, terbiyumla birlikte aynı araştırma sürecinde, aynı yitriyum oksit örneğinden ayrıştırıldı -- bu iki element, Ytterby köyünün mineral zenginliğinin doğrudan bir kanıtı olarak kimya tarihine birlikte geçti.",
          "İlginç biçimde, erbiyum ve terbiyum isimleri de aynı köy adından türetilmiş olmasına rağmen, kimyasal keşif sürecinde başlangıçta birbirine karıştırılmıştı.",
        ],
      },
    ],
    timeline: [
      {
        year: "1843",
        title: "Mosander'in keşfi",
        description:
          "Carl Gustaf Mosander, yitriyum oksidi örneklerini incelerken erbiyum ve terbiyumu aynı anda keşfetti.",
      },
      {
        year: "1987",
        title: "Fiber amplifikatörün geliştirilmesi",
        description:
          "Southampton Üniversitesi'nde erbiyum katkılı fiber amplifikatör teknolojisi geliştirilerek küresel fiber optik iletişimde devrim yarattı.",
      },
    ],
  },
  {
    slug: "tulyum",
    introduction: [
      "Tulyum, açık gri renkli, yumuşak bir lantanit metalidir ve radyoaktif olmayan doğal lantanitler arasında en nadir bulunanıdır.",
      "Bu nadirliği nedeniyle en pahalı lantanitlerden biridir ve kullanımı oldukça özel uygulamalarla sınırlıdır.",
    ],
    discoverySummary:
      "1879'da İsveçli kimyager Per Teodor Cleve tarafından, erbiyum oksidinin dikkatli ayrıştırılması sırasında keşfedildi.",
    meltingPointC: "1545",
    boilingPointC: "1950",
    densityGCm3: "9,32",
    electronConfiguration: "[Xe] 4f¹³ 6s²",
    uses: [
      "Taşınabilir röntgen cihazlarında (tulyum-170 izotopu, harici güç kaynağı gerektirmez)",
      "Bazı katı hâl lazerlerde (cerrahi ve askeri lazer aralık bulucularda)",
      "Öklidyen olmayan optik araştırmalarda",
      "Yüksek verimli ışık kaynaklarında (bazı floresan lamba türlerinde)",
    ],
    sections: [
      {
        title: "Efsanevi bir topraktan adını alan nadir element",
        paragraphs: [
          "Tulyum, adını antik Yunan ve Roma kaynaklarında dünyanın en kuzeyindeki efsanevi toprak olarak tasvir edilen 'Thule'den alır -- bu isim, İskandinavya'nın gizemli, o dönem için ulaşılması zor bir bölge olarak algılanmasına bir gönderme yapar.",
          "Cleve, erbiyum oksidini son derece dikkatli biçimde ayrıştırarak hem tulyumu hem de holmiyumu aynı araştırma sürecinde ortaya çıkardı.",
        ],
      },
      {
        title: "Elektriksiz çalışan taşınabilir röntgen cihazı",
        paragraphs: [
          "Tulyum-170 izotopu, radyoaktif bozunma sırasında röntgen görüntülemesi için kullanılabilecek ışınlar yayar -- bu, harici bir elektrik kaynağına ihtiyaç duymayan, tamamen taşınabilir röntgen cihazları üretilmesini mümkün kılar.",
          "Bu özellik, sahada çalışan tıp ekipleri ve afet bölgelerindeki acil sağlık hizmetleri için özellikle değerlidir.",
        ],
      },
    ],
    timeline: [
      {
        year: "1879",
        title: "Cleve'in keşfi",
        description:
          "Per Teodor Cleve, erbiyum oksidini ayrıştırırken tulyum ve holmiyumu aynı anda keşfetti.",
      },
    ],
  },
  {
    slug: "iterbiyum",
    introduction: [
      "İterbiyum, gümüşümsü-parlak renkli, nispeten yumuşak bir lantanit metalidir.",
      "İsveç'in Ytterby köyünden adını alan dört elementten biridir ve dünyanın en hassas atomik saatlerinin geliştirilmesinde öncü rol oynamaktadır.",
    ],
    discoverySummary:
      "1878'de İsviçreli kimyager Jean Charles Galissard de Marignac tarafından, o zamana kadar saf sanılan 'erbiyum'un aslında iki element karışımı olduğunun fark edilmesiyle keşfedildi.",
    meltingPointC: "824",
    boilingPointC: "1196",
    densityGCm3: "6,90",
    electronConfiguration: "[Xe] 4f¹⁴ 6s²",
    uses: [
      "Deneysel iterbiyum optik kafes atomik saatlerinde",
      "Paslanmaz çeliğin tane yapısını iyileştirmede",
      "Bazı lazer sistemlerinde katkı maddesi olarak",
      "Jeolojik ve sismik gerilme ölçüm cihazlarında",
    ],
    sections: [
      {
        title: "Sezyumdan bile daha hassas bir zaman ölçer adayı",
        paragraphs: [
          "İterbiyum atomlarının optik geçiş frekansını kullanan deneysel 'iterbiyum optik kafes saatleri', mevcut sezyum atomik saatlerinden bile daha yüksek kararlılık gösterebiliyor -- bu tür saatler milyarlarca yılda ancak birkaç saniyelik sapma gösterecek kadar hassas.",
          "Bu araştırma, gelecekte uluslararası saniye biriminin tanımının sezyumdan iterbiyum veya benzer bir optik saate kayabileceği ihtimalini gündeme getiriyor.",
        ],
      },
      {
        title: "Yanlışlıkla 'saf' sanılan elementin gerçek yüzü",
        paragraphs: [
          "1878'de Marignac, o zamana kadar tek bir element olduğu düşünülen 'erbiyum'u incelerken, aslında bunun iki farklı elementin karışımı olduğunu fark etti -- bugün bildiğimiz erbiyum ve yeni keşfedilen iterbiyum.",
          "Bu tür 'karışık element' hikâyeleri, 19. yüzyıl lantanit kimyasının ne kadar karmaşık ve yanıltıcı olabileceğinin tipik bir örneğidir -- praseodim/neodim ayrımında da benzer bir süreç yaşanmıştı.",
        ],
      },
    ],
    timeline: [
      {
        year: "1878",
        title: "Marignac'ın keşfi",
        description:
          "Jean Charles Galissard de Marignac, 'erbiyum'un aslında iki element içerdiğini fark ederek iterbiyumu ayrıştırdı.",
      },
    ],
  },
  {
    slug: "lutesyum",
    introduction: [
      "Lutesyum, gümüşümsü-beyaz renkli, lantanit serisinin en sert ve en yoğun üyesidir.",
      "Bu seride, atom yapısındaki elektron dizilimi tamamlanmış olduğu için kimyasal olarak diğer lantanitlere göre biraz farklı davranan, seriyi tamamlayan son elementtir.",
    ],
    discoverySummary:
      "1907'de Fransız kimyager Georges Urbain tarafından, o zamana kadar saf sanılan iterbiyumun aslında iki element karışımı olduğunun fark edilmesiyle keşfedildi; adını Paris'in antik Roma dönemindeki adı 'Lutetia'dan alır.",
    meltingPointC: "1663",
    boilingPointC: "3402",
    densityGCm3: "9,84",
    electronConfiguration: "[Xe] 4f¹⁴ 5d¹ 6s²",
    uses: [
      "PET taramalarında kullanılan dedektör kristallerinde (lutesyum oksiortosilikat, LSO)",
      "Petrol rafinerilerinde katalizör olarak",
      "Bazı kanser tedavilerinde radyoaktif izotop taşıyıcı olarak (lutesyum-177)",
      "Yüksek hassasiyetli jeolojik tarihleme çalışmalarında",
    ],
    sections: [
      {
        title: "Lantanit dizisinin son ve en pahalı üyesi",
        paragraphs: [
          "Lutesyum, doğal lantanitler arasında en nadir bulunan ve en pahalı olanlardan biridir -- bu durum, hem doğal bolluğunun düşük olmasından hem de diğer lantanitlerden ayrıştırılmasının son derece zahmetli olmasından kaynaklanır.",
          "Elementin adı, keşfedildiği Paris şehrinin Roma döneminden kalma Latince adı 'Lutetia'ya bir gönderme yapar -- tıpkı germanyumun Almanya'ya, galyumun Fransa'ya (Gallia) gönderme yapması gibi, bilim insanlarının elementleri kendi ülkelerine ithaf etme geleneğinin bir örneğidir.",
        ],
      },
      {
        title: "Kanser görüntülemesinin hassas aracı",
        paragraphs: [
          "Lutesyum oksiortosilikat kristalleri, PET (pozitron emisyon tomografisi) taramalarında gama ışınlarını son derece hızlı ve hassas biçimde algılayarak vücuttaki tümörlerin ve metabolik anormalliklerin net görüntülenmesini sağlar.",
          "Ayrıca lutesyum-177 izotopu, bazı nöroendokrin tümör türlerinin tedavisinde hedefe yönelik radyoterapi ajanı olarak umut verici klinik sonuçlar göstermiştir.",
        ],
      },
    ],
    timeline: [
      {
        year: "1907",
        title: "Urbain'in keşfi",
        description:
          "Georges Urbain, 'iterbiyum'un aslında iki element içerdiğini fark ederek lutesyumu ayrıştırdı ve Paris'e ithafen adlandırdı.",
      },
    ],
  },
  {
    slug: "radyum",
    introduction: [
      "Radyum, parlak beyaz renkli, son derece radyoaktif bir toprak alkali metaldir; karanlıkta soluk mavimsi bir ışıltı yayar.",
      "Marie Curie'nin bilim tarihine geçen en önemli keşiflerinden biridir ve radyoaktivitenin insan sağlığı üzerindeki tehlikelerini dünyaya en acı biçimde öğreten elementlerden biri olmuştur.",
    ],
    discoverySummary:
      "1898'de Marie ve Pierre Curie tarafından, uranyum cevheri pitchblende üzerinde yapılan yorucu kimyasal ayrıştırma çalışmalarıyla keşfedildi.",
    meltingPointC: "700",
    boilingPointC: "1737",
    densityGCm3: "5,5",
    electronConfiguration: "[Rn] 7s²",
    uses: [
      "Tarihsel olarak radyolüminesan saat ve pusula kadranlarında (artık tamamen yasak)",
      "Bazı kanser radyoterapi uygulamalarında (büyük ölçüde daha güvenli izotoplarla değiştirildi)",
      "Bilimsel radyasyon araştırmalarında referans kaynağı olarak",
      "Tarihsel endüstriyel radyografi uygulamalarında",
    ],
    sections: [
      {
        title: "'Radyum Kızları' faciası: bir işçi hakları dönüm noktası",
        paragraphs: [
          "1910'lar ve 1920'lerde, ABD'de saat kadranlarını karanlıkta parlayan radyum boyasıyla boyayan genç kadın işçiler, fırçalarını sivri uçlu tutmak için dudaklarıyla ıslatmaları yönünde talimat aldı -- bu, radyoaktif boyayı doğrudan yutmalarına yol açtı.",
          "Yıllar içinde bu kadınların çoğunda ciddi çene kemiği hasarı, kansızlık ve kanser gelişti; açtıkları dava, ABD'de işçi sağlığı ve güvenliği standartlarının kurulmasında dönüm noktası oldu ve bugün 'Radyum Kızları' olarak anılan bu olay, radyoaktif malzemelerle çalışmanın tehlikelerine dair kalıcı bir uyarı niteliği taşır.",
        ],
      },
      {
        title: "Keşfedeni de etkileyen bir element",
        paragraphs: [
          "Marie Curie, radyum ve polonyum üzerindeki çalışmaları sırasında yıllarca korumasız biçimde radyoaktif maddelere maruz kaldı; bu maruziyetin, 1934'te öldüğü aplastik anemi hastalığına katkıda bulunduğu düşünülür.",
          "Curie'nin el yazmaları ve laboratuvar defterleri bugün hâlâ radyoaktif olduğu için, Fransa'daki Ulusal Kütüphane'de kurşunla kaplı özel kutularda saklanır ve incelenmek istendiğinde koruyucu ekipman giyilmesi gerekir.",
        ],
      },
    ],
    timeline: [
      {
        year: "1898",
        title: "Curie çiftinin keşfi",
        description:
          "Marie ve Pierre Curie, pitchblende cevherinden yorucu bir ayrıştırma süreciyle radyumu izole etti.",
      },
      {
        year: "1920'ler",
        title: "Radyum Kızları davası",
        description:
          "Radyum boyasıyla zehirlenen saat kadranı ressamı kadın işçilerin açtığı davalar, ABD'de iş güvenliği standartlarının kurulmasına yol açtı.",
      },
    ],
  },
  {
    slug: "toryum",
    introduction: [
      "Toryum, gümüşümsü-gri renkli, hafif radyoaktif bir aktinit metalidir; uranyumdan bile daha bol bulunur.",
      "Gelecekte daha güvenli nükleer enerji kaynağı olarak kullanılma potansiyeliyle, günümüzde aktif araştırma konusu olmaya devam ediyor.",
    ],
    discoverySummary:
      "1828'de İsveçli kimyager Jöns Jacob Berzelius tarafından keşfedildi; adını, İskandinav mitolojisindeki gök gürültüsü tanrısı Thor'dan alır.",
    meltingPointC: "1750",
    boilingPointC: "4788",
    densityGCm3: "11,7",
    electronConfiguration: "[Rn] 6d² 7s²",
    uses: [
      "Deneysel nükleer reaktör yakıtı araştırmalarında (uranyuma alternatif olarak)",
      "Tarihsel olarak gaz lambası örgülerinde (Welsbach filaman, toryum dioksit)",
      "Havacılık ve uzay alaşımlarında (yüksek sıcaklık dayanımı için)",
      "Bazı optik cam ve kamera lenslerinde (kırılma indisini artırmak için)",
    ],
    sections: [
      {
        title: "Uranyumun daha güvenli olabilecek rakibi",
        paragraphs: [
          "Toryum, yer kabuğunda uranyumdan yaklaşık üç kat daha bol bulunur ve bazı nükleer mühendislik uzmanlarına göre, geleneksel uranyum reaktörlerine kıyasla daha az uzun ömürlü radyoaktif atık üreten ve erimeye karşı doğal olarak daha dirençli reaktör tasarımlarında kullanılabilir.",
          "Hindistan gibi büyük toryum rezervlerine sahip ülkeler, bu potansiyeli değerlendirmek için onlarca yıldır 'sıvı florürlü toryum reaktörü' (LFTR) gibi deneysel teknolojiler üzerinde araştırma yürütüyor.",
        ],
      },
      {
        title: "Kamp lambalarının unutulan parlaklık sırrı",
        paragraphs: [
          "20. yüzyılın büyük bölümünde, gaz lambalarındaki 'Welsbach örgüsü' adı verilen ağ, toryum dioksitle kaplanarak alevin ışığını çok daha parlak ve beyaz hâle getiriyordu.",
          "Bu örgüler hafif radyoaktif olduğundan, radyasyon güvenliği standartları sıkılaştıkça zamanla kullanımdan kaldırıldı; ancak bazı eski kamp lambası koleksiyonlarında hâlâ bulunabilirler.",
        ],
      },
    ],
    timeline: [
      {
        year: "1828",
        title: "Berzelius'un keşfi",
        description:
          "Jöns Jacob Berzelius, Norveç'te bulunan bir mineral örneğinde toryumu keşfetti ve Thor'a ithafen adlandırdı.",
      },
    ],
  },
  {
    slug: "uranyum",
    introduction: [
      "Uranyum, gümüşümsü-beyaz renkli, ağır ve zayıf radyoaktif bir aktinit metalidir; modern nükleer çağın hem enerji hem silah teknolojisinin temelini oluşturur.",
      "Keşfi, radyoaktivite biliminin doğuşuna doğrudan yol açan tarihi bir dönüm noktası olmuştur.",
    ],
    discoverySummary:
      "1789'da Alman kimyager Martin Heinrich Klaproth tarafından pitchblende cevherinde keşfedildi; adını, sekiz yıl önce bulunan Uranüs gezegeninden alır.",
    meltingPointC: "1132,2",
    boilingPointC: "4131",
    densityGCm3: "19,1",
    electronConfiguration: "[Rn] 5f³ 6d¹ 7s²",
    uses: [
      "Nükleer santrallerde enerji üretimi için yakıt olarak",
      "Nükleer silahlarda (tarihsel ve stratejik kullanım)",
      "Tükenmiş uranyum olarak zırh delici mühimmat ve araç zırhında (yüksek yoğunluk)",
      "Jeolojik ve arkeolojik tarihleme çalışmalarında (uranyum-kurşun tarihleme yöntemi)",
    ],
    sections: [
      {
        title: "Radyoaktivite biliminin doğduğu element",
        paragraphs: [
          "1896'da Henri Becquerel, bir uranyum tuzu örneğinin karanlıkta bile fotoğraf plakasını etkilediğini fark etti -- bu tesadüfi gözlem, o zamana kadar bilinmeyen 'radyoaktivite' olgusunun keşfine doğrudan yol açtı ve Marie Curie'nin sonraki çalışmalarının da temelini oluşturdu.",
          "Bu keşif, uranyumu sadece ilginç bir metal olmaktan çıkarıp modern nükleer fiziğin başlangıç noktasına dönüştürdü.",
        ],
      },
      {
        title: "Gezegenlerin adını taşıyan elementler zinciri",
        paragraphs: [
          "Uranyum, adını Klaproth'un keşfinden sadece sekiz yıl önce William Herschel tarafından bulunan Uranüs gezegeninden alır -- bu, bilim insanlarının yeni keşiflere olan heyecanını element isimlendirmesine yansıttığı bir örnektir.",
          "Bu gelenek daha sonra da sürdü: uranyumdan sonra keşfedilen neptünyum ve plütonyum da sırasıyla Neptün ve Plüton gezegenlerinin adını taşıyarak periyodik tabloda küçük bir 'güneş sistemi' zinciri oluşturdu.",
        ],
      },
    ],
    timeline: [
      {
        year: "1789",
        title: "Klaproth'un keşfi",
        description:
          "Martin Heinrich Klaproth, pitchblende cevherinde uranyumu keşfetti ve yeni bulunan Uranüs gezegenine ithafen adlandırdı.",
      },
      {
        year: "1896",
        title: "Becquerel'in radyoaktivite keşfi",
        description:
          "Henri Becquerel, uranyum tuzlarının kendiliğinden ışınım yaydığını fark ederek radyoaktivite olgusunu keşfetti.",
      },
      {
        year: "1945",
        title: "Hiroşima'ya atılan bomba",
        description:
          "'Little Boy' adlı uranyum bazlı atom bombası, II. Dünya Savaşı'nı sona erdiren olaylardan birinde kullanıldı.",
      },
    ],
  },
  {
    slug: "plutonyum",
    introduction: [
      "Plütonyum, gümüşümsü-beyaz renkli, son derece radyoaktif ve toksik, yapay olarak üretilen bir aktinit metalidir.",
      "Hem yıkıcı nükleer silah teknolojisinin hem de uzayın derinliklerine giden uzay araçlarını onlarca yıl güç kaynağıyla besleyen barışçıl teknolojinin merkezinde yer alır.",
    ],
    discoverySummary:
      "1940'ta Glenn T. Seaborg liderliğindeki bir ekip tarafından, Kaliforniya Üniversitesi'nde uranyumun parçacık hızlandırıcısında bombardımana tutulmasıyla yapay olarak üretildi.",
    meltingPointC: "639,4",
    boilingPointC: "3228",
    densityGCm3: "19,86",
    electronConfiguration: "[Rn] 5f⁶ 7s²",
    uses: [
      "Nükleer silahlarda (tarihsel ve stratejik kullanım)",
      "Radyoizotop termoelektrik jeneratörlerinde (uzay araçları için güç kaynağı)",
      "Bazı ileri nükleer reaktör tasarımlarında yakıt olarak",
      "Derin uzay görevlerinde ısı ve elektrik kaynağı olarak (Voyager, Mars gezginleri)",
    ],
    sections: [
      {
        title: "Nagazaki'ye adını veren bomba",
        paragraphs: [
          "Hiroşima'ya atılan bombanın aksine, Nagazaki'ye atılan 'Fat Man' adlı bomba uranyum değil plütonyum temelliydi; bu iki farklı bomba tasarımı, II. Dünya Savaşı'nın sonunu getiren Manhattan Projesi'nin iki paralel teknik yaklaşımını temsil eder.",
          "Plütonyumun bu yıkıcı tarihi, elementin barış zamanı kullanımlarının gölgesinde kalmasına neden olsa da, bilim insanları onu çok farklı, yapıcı amaçlar için de kullanmaya devam etti.",
        ],
      },
      {
        title: "Yıldızlararası uzaya güç veren radyoaktif kalp",
        paragraphs: [
          "Plütonyum-238 izotopunun bozunurken yaydığı ısı, güneş ışığının ulaşamadığı derin uzay görevlerinde elektrik üretmek için kullanılan 'radyoizotop termoelektrik jeneratörlerinin' kalbini oluşturur.",
          "1977'de fırlatılan Voyager 1 ve Voyager 2 uzay araçları, 45 yılı aşkın süredir bu plütonyum güç kaynakları sayesinde Güneş Sistemi'nin ötesinde hâlâ Dünya'ya sinyal göndermeye devam ediyor.",
        ],
      },
    ],
    timeline: [
      {
        year: "1940",
        title: "Seaborg ekibinin üretimi",
        description:
          "Glenn T. Seaborg liderliğindeki ekip, uranyumu bombardımana tutarak plütonyumu ilk kez yapay olarak üretti.",
      },
      {
        year: "1945",
        title: "Nagazaki'ye atılan bomba",
        description:
          "Plütonyum bazlı 'Fat Man' bombası, II. Dünya Savaşı'nı sona erdiren olaylardan birinde kullanıldı.",
      },
      {
        year: "1977",
        title: "Voyager görevlerinin başlaması",
        description:
          "Plütonyum-238 güçlü radyoizotop jeneratörleriyle donatılan Voyager uzay araçları fırlatıldı.",
      },
    ],
  },
  {
    slug: "amerikyum",
    introduction: [
      "Amerikyum, gümüşümsü-beyaz renkli, yapay olarak üretilen radyoaktif bir aktinit metalidir.",
      "Diğer birçok aktinitin aksine, günlük hayatta -- neredeyse her evin tavanında -- doğrudan karşılaşabileceğimiz nadir sentetik elementlerden biridir.",
    ],
    discoverySummary:
      "1944'te Glenn T. Seaborg liderliğindeki ekip tarafından, II. Dünya Savaşı sırasındaki Manhattan Projesi kapsamında yapay olarak üretildi; keşfi savaş bitene kadar gizli tutuldu.",
    meltingPointC: "1176",
    boilingPointC: "2011",
    densityGCm3: "12,0",
    electronConfiguration: "[Rn] 5f⁷ 7s²",
    uses: [
      "Ev tipi duman dedektörlerinde (iyonizasyon sensörü olarak)",
      "Endüstriyel kalınlık ve yoğunluk ölçüm cihazlarında",
      "Bazı taşınabilir X-ışını spektrometrelerinde",
      "Nötron kaynağı gerektiren jeolojik kuyu ölçüm ekipmanlarında",
    ],
    sections: [
      {
        title: "Tavanınızdaki gizli aktinit",
        paragraphs: [
          "Dünyadaki hemen her iyonizasyon tipi duman dedektörü, içinde küçük, tamamen kapalı bir kapsül hâlinde birkaç mikrogram amerikyum-241 barındırır -- bu, yaydığı alfa parçacıklarıyla havayı sürekli olarak iyonize ederek dedektörün duman parçacıklarını algılamasını sağlar.",
          "Bu kullanım o kadar yaygındır ki, amerikyum muhtemelen sıradan bir insanın günlük hayatında en yakın mesafede bulunacağı sentetik radyoaktif elementtir -- üstelik miktarı ve kapsüllenme biçimi sayesinde tamamen güvenlidir.",
        ],
      },
      {
        title: "Savaşın gölgesinde doğan, kıtanın adını taşıyan element",
        paragraphs: [
          "Amerikyum, II. Dünya Savaşı'nın en gizli araştırma programlarından biri olan Manhattan Projesi kapsamında üretildi; keşfi, savaş bitip gizlilik kaldırılana kadar kamuoyuna açıklanmadı.",
          "Element, evropiyumun Avrupa'ya ithaf edilmesine benzer biçimde, kıtasal bir isimlendirme geleneğini sürdürerek Amerika kıtalarına ithafen adlandırıldı.",
        ],
      },
    ],
    timeline: [
      {
        year: "1944",
        title: "Seaborg ekibinin üretimi",
        description:
          "Glenn T. Seaborg liderliğindeki ekip, Manhattan Projesi'nin gizliliği altında amerikyumu ilk kez yapay olarak üretti.",
      },
      {
        year: "1945",
        title: "Kamuoyuna açıklanması",
        description:
          "Savaşın bitmesinin ardından amerikyumun keşfi kamuoyuna duyuruldu.",
      },
    ],
  },
  {
    slug: "fransiyum",
    introduction: [
      "Fransiyum, bilinen tüm elementler arasında en kararsız olanlarından biridir; doğal olarak bulunan elementler içinde en nadir görülenlerden biri olarak kabul edilir.",
      "Aşırı radyoaktivitesi nedeniyle Dünya kabuğunda herhangi bir anda toplamda yalnızca birkaç onlarca gram kadar bulunduğu tahmin edilir.",
    ],
    discoverySummary:
      "1939'da Fransız fizikçi Marguerite Perey tarafından, Curie Enstitüsü'nde aktinyumun radyoaktif bozunma ürünleri incelenirken keşfedildi; periyodik tabloda doğal olarak bulunan elementler arasındaki son boşluğu doldurdu.",
    meltingPointC: "27 (tahmini)",
    boilingPointC: "677 (tahmini)",
    densityGCm3: "1,87 (tahmini)",
    electronConfiguration: "[Rn] 7s¹",
    uses: [
      "Yalnızca temel atom fiziği araştırmalarında (pratik bir kullanımı yoktur)",
    ],
    sections: [
      {
        title: "Bir kadın bilim insanının doldurduğu son boşluk",
        paragraphs: [
          "Marguerite Perey, Marie Curie'nin laboratuvar asistanlarından biriydi ve aktinyumun bozunma ürünlerini titizlikle incelerken, periyodik tabloda o zamana kadar doğal olarak bulunan elementler arasında hâlâ boş kalan son konumu doldurdu.",
          "Elementi, doğduğu ve çalıştığı ülke olan Fransa'ya ithafen adlandırdı; bu keşif, bir kadın bilim insanının tek başına yaptığı ve adını tek başına verdiği nadir element keşiflerinden biri olarak bilim tarihine geçti.",
        ],
      },
    ],
    timeline: [
      {
        year: "1939",
        title: "Perey'nin keşfi",
        description:
          "Marguerite Perey, aktinyumun bozunma ürünlerini incelerken fransiyumu keşfetti.",
      },
    ],
  },
  {
    slug: "aktinyum",
    introduction: [
      "Aktinyum, gümüşümsü-beyaz renkli, radyoaktif bir metaldir ve karanlıkta soluk mavi bir ışıltı yayar.",
      "Adını, kendisinden sonra gelen 14 elementten oluşan 'aktinit' serisine veren bu serinin ilk üyesidir.",
    ],
    discoverySummary:
      "1899'da Fransız kimyager André-Louis Debierne tarafından, uranyum cevheri atıklarında keşfedildi.",
    meltingPointC: "1050",
    boilingPointC: "3200",
    densityGCm3: "10,07",
    electronConfiguration: "[Rn] 6d¹ 7s²",
    uses: [
      "Bazı hedefe yönelik kanser radyoterapi araştırmalarında (aktinyum-225 izotopu)",
      "Nötron kaynağı gerektiren bilimsel araştırmalarda",
    ],
    sections: [
      {
        title: "Bütün bir seriye adını veren element",
        paragraphs: [
          "Aktinyum, tıpkı lantanın lantanit serisine adını vermesi gibi, kendisinden sonra gelen toryum, uranyum, plütonyum gibi 14 elementten oluşan 'aktinit' serisinin tamamına adını verir.",
          "Doğada son derece az bulunmasına rağmen, radyoaktif bozunma sırasında yaydığı enerji sayesinde bazı deneysel kanser tedavilerinde hedefe yönelik alfa parçacığı kaynağı olarak araştırılmaya devam ediyor.",
        ],
      },
    ],
    timeline: [
      {
        year: "1899",
        title: "Debierne'nin keşfi",
        description:
          "André-Louis Debierne, uranyum cevheri atıklarında aktinyumu keşfetti.",
      },
    ],
  },
  {
    slug: "protaktinyum",
    introduction: [
      "Protaktinyum, gümüşümsü-parlak renkli, son derece nadir ve radyoaktif bir aktinit metalidir.",
      "Doğada bulunan en nadir ve en pahalı elementlerden biridir; toksik ve radyoaktif özellikleri nedeniyle pratik kullanımı yok denecek kadar azdır.",
    ],
    discoverySummary:
      "1913'te Kazimierz Fajans ve Oswald Helmuth Göhring tarafından ilk kez tespit edildi; 1917-1918'de Otto Hahn ve Lise Meitner tarafından bağımsız olarak daha kararlı bir izotopu bulunarak tam olarak tanımlandı.",
    meltingPointC: "1568",
    boilingPointC: "4027",
    densityGCm3: "15,37",
    electronConfiguration: "[Rn] 5f² 6d¹ 7s²",
    uses: [
      "Yalnızca temel nükleer fizik ve jeokronoloji araştırmalarında",
    ],
    sections: [
      {
        title: "Adını bozunma zincirindeki konumundan alan element",
        paragraphs: [
          "Protaktinyum adı, Yunanca 'önce' anlamına gelen 'protos' kelimesinden gelir -- çünkü radyoaktif bozunması sırasında doğrudan aktinyuma dönüşür, yani kimyasal olarak aktinyumun 'öncülü'dür.",
          "Dünyanın en nadir ve en pahalı doğal elementlerinden biri olması nedeniyle, saf hâlde yalnızca birkaç laboratuvarda, çok küçük miktarlarda bulunur ve neredeyse tamamen bilimsel araştırma amaçlı kullanılır.",
        ],
      },
    ],
    timeline: [
      {
        year: "1913",
        title: "Fajans ve Göhring'in tespiti",
        description:
          "Kazimierz Fajans ve Oswald Helmuth Göhring, elementin kısa ömürlü bir izotopunu tespit etti.",
      },
      {
        year: "1918",
        title: "Hahn ve Meitner'in tanımlaması",
        description:
          "Otto Hahn ve Lise Meitner, elementin daha uzun ömürlü izotopunu bularak protaktinyumu tam olarak tanımladı.",
      },
    ],
  },
  {
    slug: "neptunyum",
    introduction: [
      "Neptünyum, gümüşümsü metalik görünümlü, radyoaktif bir aktinit metalidir ve keşfedilen ilk transuranyum (uranyumdan ağır) elementtir.",
      "Adını, uranyumun gezegen Uranüs'ten adını alması geleneğini sürdürerek Neptün gezegeninden alır.",
    ],
    discoverySummary:
      "1940'ta Edwin McMillan ve Philip Abelson tarafından, Kaliforniya Üniversitesi Berkeley'de uranyumun nötron bombardımanına tutulmasıyla keşfedildi.",
    meltingPointC: "644",
    boilingPointC: "3902",
    densityGCm3: "20,45",
    electronConfiguration: "[Rn] 5f⁴ 6d¹ 7s²",
    uses: [
      "Nükleer reaktörlerde yan ürün olarak oluşur, gelecekteki üretken reaktör yakıtı araştırmalarında",
      "Nötron dedektörlerinde (neptünyum-237 bazlı deneysel dedektörler)",
    ],
    sections: [
      {
        title: "Uranyumun ötesindeki ilk adım",
        paragraphs: [
          "Neptünyum, uranyumdan daha ağır elementlerin var olabileceğini kanıtlayan ilk keşifti ve bu başarı, McMillan ile Abelson'a 1951 Nobel Kimya Ödülü'nü kazandırdı.",
          "Uranyum-Neptün, Neptünyum-... bu isimlendirme zinciri, gezegenlerin keşif sırasına paralel biçimde elementlerin de sırayla adlandırılmasıyla devam etti ve bir sonraki element plütonyum, Plüton gezegeninin adını aldı.",
        ],
      },
    ],
    timeline: [
      {
        year: "1940",
        title: "McMillan ve Abelson'un keşfi",
        description:
          "Berkeley'de uranyumun nötron bombardımanına tutulmasıyla ilk transuranyum element neptünyum üretildi.",
      },
    ],
  },
  {
    slug: "kuryum",
    introduction: [
      "Küriyum, gümüşümsü-beyaz renkli, radyoaktif bir aktinit metalidir ve nadir elementlerden biri olarak Dünya dışı görevlerde bilimsel enstrüman gücü sağlar.",
      "Adını, iki kişiye birlikte ithaf edilen az sayıdaki elementten biri olarak Marie ve Pierre Curie'den alır.",
    ],
    discoverySummary:
      "1944'te Glenn T. Seaborg liderliğindeki ekip tarafından, Kaliforniya Üniversitesi Berkeley'de plütonyumun parçacık hızlandırıcısında bombardımana tutulmasıyla üretildi.",
    meltingPointC: "1345",
    boilingPointC: "3110 (tahmini)",
    densityGCm3: "13,51",
    electronConfiguration: "[Rn] 5f⁷ 6d¹ 7s²",
    uses: [
      "Mars gezginlerinin (Curiosity, Perseverance) alfa parçacığı X-ışını spektrometrelerinde",
      "Bazı radyoizotop güç kaynaklarında",
    ],
    sections: [
      {
        title: "Mars'ın kayalarını analiz eden element",
        paragraphs: [
          "NASA'nın Curiosity ve Perseverance Mars gezginlerinde bulunan 'alfa parçacığı X-ışını spektrometresi' (APXS) aleti, Mars kayalarının kimyasal bileşimini analiz etmek için küçük bir küriyum-244 kaynağı kullanır.",
          "Bu, Curie çiftinin adını taşıyan bir elementin, keşiflerinden yaklaşık 130 yıl sonra başka bir gezegenin yüzeyinde bilim yapmaya devam etmesi bakımından anlamlı bir tesadüftür.",
        ],
      },
    ],
    timeline: [
      {
        year: "1944",
        title: "Seaborg ekibinin üretimi",
        description:
          "Glenn T. Seaborg liderliğindeki ekip, plütonyumu bombardımana tutarak küriyumu üretti ve Curie çiftine ithafen adlandırdı.",
      },
    ],
  },
  {
    slug: "berkelyum",
    introduction: [
      "Berkelyum, gümüşümsü renkli, yapay olarak üretilen radyoaktif bir aktinit metalidir.",
      "Adını, keşfedildiği Kaliforniya Üniversitesi Berkeley kampüsünden alır.",
    ],
    discoverySummary:
      "1949'da Stanley G. Thompson, Albert Ghiorso ve Glenn T. Seaborg tarafından, Berkeley'de amerikyumun parçacık hızlandırıcısında bombardımana tutulmasıyla üretildi.",
    meltingPointC: "986",
    boilingPointC: "bilinmiyor",
    densityGCm3: "14,78",
    electronConfiguration: "[Rn] 5f⁹ 7s²",
    uses: [
      "Daha ağır elementlerin sentezinde hedef malzeme olarak (örneğin tennessin üretiminde kullanıldı)",
      "Temel nükleer kimya araştırmalarında",
    ],
    sections: [
      {
        title: "Bir üniversite kampüsünün adını taşıyan element",
        paragraphs: [
          "Berkelyum, keşfedildiği Kaliforniya Üniversitesi Berkeley'in Lawrence Radyasyon Laboratuvarı'na ithafen adlandırıldı -- bu laboratuvar, 20. yüzyılın ortasında birçok yeni elementin keşfedildiği dünyanın önde gelen nükleer araştırma merkezlerinden biriydi.",
          "2010 yılında, Rusya ve ABD'li bilim insanlarının ortak çalışmasıyla tennessin elementini sentezlemek için hedef malzeme olarak kullanıldı -- yani berkelyum, kendisinden çok daha ağır bir elementin keşfine doğrudan katkıda bulundu.",
        ],
      },
    ],
    timeline: [
      {
        year: "1949",
        title: "Thompson, Ghiorso ve Seaborg'un üretimi",
        description:
          "Berkeley ekibi, amerikyumu bombardımana tutarak berkelyumu üretti.",
      },
    ],
  },
  {
    slug: "kaliforniyum",
    introduction: [
      "Kaliforniyum, gümüşümsü-beyaz renkli, güçlü bir nötron kaynağı olan radyoaktif bir aktinit metalidir.",
      "Dünyanın en pahalı malzemelerinden biri olarak kabul edilir; gram başına fiyatı altının milyonlarca katına ulaşabilir.",
    ],
    discoverySummary:
      "1950'de Stanley G. Thompson, Kenneth Street Jr., Albert Ghiorso ve Glenn T. Seaborg tarafından Berkeley'de üretildi.",
    meltingPointC: "900",
    boilingPointC: "1470",
    densityGCm3: "15,1",
    electronConfiguration: "[Rn] 5f¹⁰ 7s²",
    uses: [
      "Taşınabilir nötron kaynaklarında (metal kusuru tespiti, petrol kuyusu ölçümlerinde)",
      "Bazı beyin ve rahim ağzı kanseri tedavilerinde (brakiterapi)",
      "Nükleer reaktörlerin başlatılmasında nötron başlatıcı olarak",
    ],
    sections: [
      {
        title: "Dünyanın en pahalı malzemelerinden biri",
        paragraphs: [
          "Kaliforniyum üretimi son derece karmaşık ve zaman alıcı bir süreç gerektirdiği için, gram başına maliyeti dünyanın bilinen en pahalı malzemeleri arasında yer alır -- tahminen altının milyonlarca katı.",
          "Buna rağmen, yaydığı yoğun nötron akısı sayesinde petrol kuyusu ölçümlerinden metal parçalardaki gizli kusurların tespitine kadar pratik, gerçek dünya uygulamaları olan az sayıdaki sentetik ağır elementten biridir.",
        ],
      },
    ],
    timeline: [
      {
        year: "1950",
        title: "Berkeley ekibinin üretimi",
        description:
          "Kaliforniyum, Berkeley'deki araştırmacılar tarafından üretildi ve California eyaletine ithafen adlandırıldı.",
      },
    ],
  },
  {
    slug: "aynstaynyum",
    introduction: [
      "Aynştaynyum, gümüşümsü renkli, radyoaktif bir aktinit metalidir ve olağanüstü bir biçimde bir nükleer silah testinin kalıntılarında keşfedilmiştir.",
      "Adını, 20. yüzyılın en tanınmış bilim insanı Albert Einstein'dan alır.",
    ],
    discoverySummary:
      "1952'de, ABD'nin Pasifik'te gerçekleştirdiği ilk hidrojen bombası testi 'Ivy Mike'ın enkazında keşfedildi; Soğuk Savaş gizliliği nedeniyle keşif 1955'e kadar kamuoyuna açıklanmadı.",
    meltingPointC: "860",
    boilingPointC: "bilinmiyor",
    densityGCm3: "8,84",
    electronConfiguration: "[Rn] 5f¹¹ 7s²",
    uses: [
      "Yalnızca temel nükleer kimya araştırmalarında",
    ],
    sections: [
      {
        title: "Bir hidrojen bombasının küllerinden doğan element",
        paragraphs: [
          "1952'de gerçekleştirilen ilk hidrojen bombası testinin ardından toplanan radyoaktif enkaz örnekleri incelenirken, o zamana kadar bilinmeyen iki yeni element -- aynştaynyum ve fermiyum -- tespit edildi.",
          "Bu keşif, Soğuk Savaş döneminin gizlilik politikaları nedeniyle üç yıl boyunca kamuoyundan saklandı ve ancak 1955'te resmî olarak açıklanabildi; element, Albert Einstein'ın bilime yaptığı katkılara saygı ifadesi olarak adlandırıldı.",
        ],
      },
    ],
    timeline: [
      {
        year: "1952",
        title: "Ivy Mike testinde tespit",
        description:
          "İlk hidrojen bombası testinin radyoaktif kalıntılarında aynştaynyum tespit edildi.",
      },
      {
        year: "1955",
        title: "Kamuoyuna açıklanması",
        description:
          "Soğuk Savaş gizliliği kaldırılarak aynştaynyumun keşfi resmî olarak duyuruldu.",
      },
    ],
  },
  {
    slug: "fermiyum",
    introduction: [
      "Fermiyum, radyoaktif bir aktinit metalidir ve nötron bombardımanı yoluyla üretilebilen en ağır elementtir -- kendisinden daha ağır elementler ancak parçacık hızlandırıcılarıyla üretilebilir.",
      "Adını, nükleer reaktör teknolojisinin öncülerinden İtalyan fizikçi Enrico Fermi'den alır.",
    ],
    discoverySummary:
      "1952'de, aynştaynyumla birlikte 'Ivy Mike' hidrojen bombası testinin radyoaktif kalıntılarında keşfedildi.",
    meltingPointC: "1527 (tahmini)",
    boilingPointC: "bilinmiyor",
    densityGCm3: "9,7 (tahmini)",
    electronConfiguration: "[Rn] 5f¹² 7s²",
    uses: [
      "Yalnızca temel nükleer kimya araştırmalarında",
    ],
    sections: [
      {
        title: "Nötron bombardımanının sınırını çizen element",
        paragraphs: [
          "Fermiyum, bir hedef elementi nötronlarla bombardımana tutarak üretilebilen en ağır elementtir; ondan sonraki elementler bu yöntemle üretilemeyecek kadar kararsız ara ürünler oluşturduğu için, yalnızca parçacık hızlandırıcılarında iyon çarpıştırma yöntemiyle sentezlenebilir.",
          "Bu, fermiyumu ağır element sentezinde bir tür 'sınır çizgisi' yapar ve elementin adı da nükleer zincirleme tepkimenin ilk kontrollü örneğini gerçekleştiren Enrico Fermi'ye bir saygı ifadesidir.",
        ],
      },
    ],
    timeline: [
      {
        year: "1952",
        title: "Ivy Mike testinde tespit",
        description:
          "Aynştaynyumla birlikte hidrojen bombası testinin kalıntılarında fermiyum tespit edildi.",
      },
    ],
  },
  {
    slug: "mendelevyum",
    introduction: [
      "Mendelevyum, radyoaktif bir aktinit metalidir ve tarihte ilk kez atom atom sayılarak, yani tek seferde yalnızca birkaç atom üretilerek keşfedilen elementtir.",
      "Adını, periyodik tablonun mucidi Rus kimyager Dmitri Mendeleyev'den alır.",
    ],
    discoverySummary:
      "1955'te Albert Ghiorso, Glenn T. Seaborg ve ekibi tarafından Berkeley'de, einsteinyumun parçacık hızlandırıcısında bombardımana tutulmasıyla üretildi.",
    meltingPointC: "827 (tahmini)",
    boilingPointC: "bilinmiyor",
    densityGCm3: "bilinmiyor",
    electronConfiguration: "[Rn] 5f¹³ 7s²",
    uses: [
      "Yalnızca temel nükleer kimya araştırmalarında",
    ],
    sections: [
      {
        title: "Periyodik tablonun mucidine adanan bir tablo sakini",
        paragraphs: [
          "Mendelevyumun ilk sentezinde toplamda yalnızca 17 atom üretilebildi -- bu, kimya tarihinde bir elementin bu kadar az sayıda atomla keşfedildiği ilk örnekti ve modern ağır element araştırmalarının atom-atom çalışma yönteminin öncüsü oldu.",
          "Element, periyodik tabloyu tasarlayarak henüz keşfedilmemiş elementlerin özelliklerini bile önceden tahmin etmeyi başaran Dmitri Mendeleyev'e ithafen adlandırıldı -- bu bakımdan, tablonun mimarına tablonun kendisi tarafından verilen bir saygı duruşu niteliği taşır.",
        ],
      },
    ],
    timeline: [
      {
        year: "1955",
        title: "Ghiorso ve Seaborg ekibinin üretimi",
        description:
          "Berkeley ekibi, einsteinyumu bombardımana tutarak yalnızca 17 atomluk mendelevyum üretti.",
      },
    ],
  },
  {
    slug: "nobelyum",
    introduction: [
      "Nobelyum, radyoaktif bir aktinit metalidir; keşfi konusunda birden fazla ülkenin araştırma ekibi arasında tarihi bir öncelik anlaşmazlığı yaşanmıştır.",
      "Adını, Nobel Ödülleri'ni ve Nobel Enstitüsü'nü kuran İsveçli mucit ve iş insanı Alfred Nobel'den alır.",
    ],
    discoverySummary:
      "1958'de Albert Ghiorso liderliğindeki Berkeley ekibi tarafından güvenilir biçimde doğrulandı; ancak 1957'de İsveç'teki bir ekip ve daha sonra Sovyet Dubna ekibi de keşif iddiasında bulunmuştu.",
    meltingPointC: "827 (tahmini)",
    boilingPointC: "bilinmiyor",
    densityGCm3: "bilinmiyor",
    electronConfiguration: "[Rn] 5f¹⁴ 7s²",
    uses: [
      "Yalnızca temel nükleer kimya araştırmalarında",
    ],
    sections: [
      {
        title: "'Transfermiyum Savaşları'nın ortasında bir element",
        paragraphs: [
          "Nobelyumun keşfi, 1950-60'larda ABD (Berkeley), Sovyetler Birliği (Dubna) ve İsveç ekipleri arasında yaşanan ve tarihe 'Transfermiyum Savaşları' olarak geçen bir dizi öncelik ve isimlendirme anlaşmazlığının en tipik örneklerinden biridir.",
          "Uluslararası Temel ve Uygulamalı Kimya Birliği (IUPAC), yıllar süren incelemelerin ardından keşfi resmî olarak Berkeley ekibine atfetti, ancak element adı -- ilk öneren İsveç ekibinin seçtiği hâliyle -- Alfred Nobel'e ithafen değişmeden kaldı.",
        ],
      },
    ],
    timeline: [
      {
        year: "1958",
        title: "Berkeley ekibinin doğrulaması",
        description:
          "Albert Ghiorso liderliğindeki ekip, elementin varlığını güvenilir biçimde doğruladı.",
      },
    ],
  },
  {
    slug: "lavrensiyum",
    introduction: [
      "Lavrensiyum, radyoaktif bir aktinit metalidir ve aktinit serisinin son üyesidir.",
      "Adını, parçacık hızlandırıcısı 'siklotron'u icat eden ve Berkeley Radyasyon Laboratuvarı'nı kuran fizikçi Ernest Lawrence'dan alır.",
    ],
    discoverySummary:
      "1961'de Albert Ghiorso liderliğindeki Berkeley ekibi tarafından, kaliforniyumun bor iyonlarıyla bombardımana tutulmasıyla üretildi.",
    meltingPointC: "1627 (tahmini)",
    boilingPointC: "bilinmiyor",
    densityGCm3: "bilinmiyor",
    electronConfiguration: "[Rn] 5f¹⁴ 7s² 7p¹",
    uses: [
      "Yalnızca temel nükleer kimya araştırmalarında",
    ],
    sections: [
      {
        title: "Aktinit serisinin kapanış elementi",
        paragraphs: [
          "Lavrensiyum, aktinyumla başlayan 15 elementlik aktinit serisinin son üyesidir; tıpkı lutesyumun lantanit serisini tamamlaması gibi, periyodik tablodaki bu ikinci 'iç geçiş serisi'ni tamamlar.",
          "Element, parçacık hızlandırıcı teknolojisinin öncüsü olan ve bu sayede onlarca yeni elementin keşfedilmesine dolaylı olarak katkı sağlayan Ernest Lawrence'a ithafen adlandırıldı.",
        ],
      },
    ],
    timeline: [
      {
        year: "1961",
        title: "Berkeley ekibinin üretimi",
        description:
          "Albert Ghiorso liderliğindeki ekip, kaliforniyumu bor iyonlarıyla bombardımana tutarak lavrensiyumu üretti.",
      },
    ],
  },
  {
    slug: "rutherfordyum",
    introduction: [
      "Rutherfordyum, yapay olarak üretilen, son derece kısa ömürlü radyoaktif bir geçiş metalidir; aktinit serisinin ötesindeki ilk 'transaktinit' elementtir.",
      "Adını, atom çekirdeğini keşfeden ve modern nükleer fiziğin babası kabul edilen Ernest Rutherford'dan alır.",
    ],
    discoverySummary:
      "Keşfi, 1964'te Sovyet Dubna ekibi ile 1969'da Amerikan Berkeley ekibi arasında tarihi bir öncelik anlaşmazlığına konu oldu; IUPAC sonunda her iki ekibin katkısını da tanıdı.",
    meltingPointC: "bilinmiyor",
    boilingPointC: "bilinmiyor",
    densityGCm3: "23 (tahmini)",
    electronConfiguration: "[Rn] 5f¹⁴ 6d² 7s²",
    uses: [
      "Yalnızca temel nükleer fizik araştırmalarında (birkaç saniyeden kısa ömürlü)",
    ],
    sections: [
      {
        title: "Aktinitlerin ötesindeki ilk adım",
        paragraphs: [
          "Rutherfordyum, periyodik tabloda aktinit serisinin bittiği noktadan sonra gelen ilk 'transaktinit' elementtir ve keşfi, Soğuk Savaş döneminde ABD ile Sovyetler Birliği arasındaki bilimsel rekabetin en yoğun dönemine denk gelir.",
          "Bu rekabet o kadar şiddetliydi ki, iki ülke elemente farklı isimler önerdi (Sovyetler 'kurçatovyum', ABD 'rutherfordyum' istiyordu); anlaşmazlık ancak 1997'de IUPAC'ın nihai kararıyla çözülebildi.",
        ],
      },
    ],
    timeline: [
      {
        year: "1964",
        title: "Dubna ekibinin iddiası",
        description:
          "Sovyet Dubna ekibi, elementi ilk kez ürettiklerini duyurdu.",
      },
      {
        year: "1969",
        title: "Berkeley ekibinin bağımsız üretimi",
        description:
          "Amerikan Berkeley ekibi, elementi bağımsız olarak üretti ve daha ayrıntılı biçimde doğruladı.",
      },
    ],
  },
  {
    slug: "dubniyum",
    introduction: [
      "Dubniyum, yapay olarak üretilen, son derece kısa ömürlü radyoaktif bir geçiş metalidir.",
      "Adını, Rusya'daki Birleşik Nükleer Araştırmalar Enstitüsü'nün (JINR) bulunduğu Dubna şehrinden alır.",
    ],
    discoverySummary:
      "Keşfi, 1968'de Sovyet Dubna ekibi ile 1970'te Amerikan Berkeley ekibi arasında tartışmalı bir öncelik anlaşmazlığına konu oldu.",
    meltingPointC: "bilinmiyor",
    boilingPointC: "bilinmiyor",
    densityGCm3: "29 (tahmini)",
    electronConfiguration: "[Rn] 5f¹⁴ 6d³ 7s²",
    uses: [
      "Yalnızca temel nükleer fizik araştırmalarında",
    ],
    sections: [
      {
        title: "Bir araştırma şehrinin adını taşıyan element",
        paragraphs: [
          "Dubniyum, rutherfordyum gibi ABD ile Sovyetler Birliği arasındaki keşif önceliği anlaşmazlıklarından birine konu oldu; anlaşmazlık ancak 1997'de IUPAC'ın uzlaşmacı kararıyla çözülebildi ve element, Sovyet araştırma merkezinin bulunduğu Dubna şehrine ithafen adlandırıldı.",
          "Elementin izotopları o kadar kısa ömürlüdür ki, saniyenin çok küçük bir kesri içinde bozunur; bu yüzden kimyasal özellikleri hakkındaki bilgiler büyük ölçüde teorik hesaplamalara dayanır.",
        ],
      },
    ],
    timeline: [
      {
        year: "1968",
        title: "Dubna ekibinin iddiası",
        description:
          "Sovyet Dubna ekibi, elementi ilk kez ürettiklerini duyurdu.",
      },
    ],
  },
  {
    slug: "seaborgiyum",
    introduction: [
      "Seaborgiyum, yapay olarak üretilen, son derece kısa ömürlü radyoaktif bir geçiş metalidir.",
      "Adını, hâlâ hayattayken bir elemente adı verilen ender bilim insanlarından biri olan Glenn T. Seaborg'dan alır.",
    ],
    discoverySummary:
      "1974'te Albert Ghiorso liderliğindeki Berkeley-Livermore ortak ekibi tarafından üretildi.",
    meltingPointC: "bilinmiyor",
    boilingPointC: "bilinmiyor",
    densityGCm3: "35 (tahmini)",
    electronConfiguration: "[Rn] 5f¹⁴ 6d⁴ 7s²",
    uses: [
      "Yalnızca temel nükleer fizik araştırmalarında",
    ],
    sections: [
      {
        title: "Yaşarken adı elemente verilen nadir bilim insanı",
        paragraphs: [
          "Elementlerin genellikle onları onurlandırılan kişinin ölümünden sonra adlandırılması geleneksel bir uygulamadır; ancak Glenn Seaborg, plütonyum dahil birçok elementin keşfindeki öncü rolü nedeniyle, 1997'de IUPAC'ın kararıyla hâlâ hayattayken adı bir elemente verilen çok az sayıdaki bilim insanından biri oldu.",
          "Bu karar başlangıçta bazı bilim insanları arasında tartışma yaratsa da, Seaborg'un nükleer kimyaya yaptığı olağanüstü katkılar göz önüne alındığında sonunda geniş kabul gördü.",
        ],
      },
    ],
    timeline: [
      {
        year: "1974",
        title: "Ghiorso ekibinin üretimi",
        description:
          "Berkeley-Livermore ortak ekibi, seaborgiyumu üretti.",
      },
      {
        year: "1997",
        title: "Resmî adlandırma",
        description:
          "IUPAC, elementi henüz hayattayken Glenn Seaborg'a ithafen adlandırmayı onayladı.",
      },
    ],
  },
  {
    slug: "bohriyum",
    introduction: [
      "Bohriyum, yapay olarak üretilen, saniyenin çok küçük bir kesri kadar ömrü olan radyoaktif bir geçiş metalidir.",
      "Adını, atomun modern kuantum modelini geliştiren Danimarkalı fizikçi Niels Bohr'dan alır.",
    ],
    discoverySummary:
      "1981'de Almanya'nın Darmstadt kentindeki GSI Ağır İyon Araştırma Merkezi'nde Peter Armbruster ve Gottfried Münzenberg liderliğindeki ekip tarafından üretildi.",
    meltingPointC: "bilinmiyor",
    boilingPointC: "bilinmiyor",
    densityGCm3: "37 (tahmini)",
    electronConfiguration: "[Rn] 5f¹⁴ 6d⁵ 7s²",
    uses: [
      "Yalnızca temel nükleer fizik araştırmalarında",
    ],
    sections: [
      {
        title: "Almanya'nın ağır element keşif dönemi",
        paragraphs: [
          "Bohriyum, 1980'ler ve 1990'larda Darmstadt'taki GSI laboratuvarının art arda birçok yeni süper ağır element keşfettiği verimli bir dönemin ilk ürünlerinden biridir -- bu laboratuvar aynı dönemde hassiyum, meitneryum, darmstadtiyum, röntgenyum ve kopernikyumu da keşfetti.",
          "Element, atomun elektronlarının enerji seviyelerine göre dizildiği modern modeli geliştirerek kuantum fiziğinin temellerini atan Niels Bohr'a ithafen adlandırıldı.",
        ],
      },
    ],
    timeline: [
      {
        year: "1981",
        title: "GSI ekibinin üretimi",
        description:
          "Armbruster ve Münzenberg liderliğindeki GSI ekibi bohriyumu üretti.",
      },
    ],
  },
  {
    slug: "hassiyum",
    introduction: [
      "Hassiyum, yapay olarak üretilen, son derece kısa ömürlü radyoaktif bir geçiş metalidir.",
      "Adını, keşfedildiği GSI laboratuvarının bulunduğu Almanya'nın Hessen eyaletinin Latince adından alır.",
    ],
    discoverySummary:
      "1984'te Almanya'nın Darmstadt kentindeki GSI Ağır İyon Araştırma Merkezi'nde üretildi.",
    meltingPointC: "bilinmiyor",
    boilingPointC: "bilinmiyor",
    densityGCm3: "41 (tahmini)",
    electronConfiguration: "[Rn] 5f¹⁴ 6d⁶ 7s²",
    uses: [
      "Yalnızca temel nükleer fizik araştırmalarında",
    ],
    sections: [
      {
        title: "Teorik olarak osmiyuma benzeyen süper ağır akraba",
        paragraphs: [
          "Hassiyum, periyodik tabloda osmiyumla aynı grupta yer alır; kuramsal hesaplamalara göre, üretilebilecek kadar uzun süre kararlı kalsa, kimyasal davranışının osmiyuma oldukça benzer olması beklenir -- örneğin uçucu bir oksit oluşturabileceği tahmin edilir.",
          "Ancak izotoplarının ömrü saniyenin çok küçük bir kesriyle sınırlı olduğu için, bu tahminler yalnızca birkaç atomlu deneylerle sınırlı biçimde test edilebilmiştir.",
        ],
      },
    ],
    timeline: [
      {
        year: "1984",
        title: "GSI ekibinin üretimi",
        description:
          "Darmstadt'taki GSI laboratuvarı hassiyumu üretti.",
      },
    ],
  },
  {
    slug: "meitneryum",
    introduction: [
      "Meitneryum, yapay olarak üretilen, son derece kısa ömürlü radyoaktif bir geçiş metalidir.",
      "Adını, nükleer fisyonun keşfine kritik katkı sağlamasına rağmen uzun süre yeterince tanınmayan Avusturyalı-İsveçli fizikçi Lise Meitner'den alır.",
    ],
    discoverySummary:
      "1982'de Almanya'nın Darmstadt kentindeki GSI Ağır İyon Araştırma Merkezi'nde üretildi.",
    meltingPointC: "bilinmiyor",
    boilingPointC: "bilinmiyor",
    densityGCm3: "bilinmiyor",
    electronConfiguration: "[Rn] 5f¹⁴ 6d⁷ 7s² (tahmini)",
    uses: [
      "Yalnızca temel nükleer fizik araştırmalarında",
    ],
    sections: [
      {
        title: "Geç gelen ama kalıcı bir tanınma",
        paragraphs: [
          "Lise Meitner, nükleer fisyon olgusunu teorik olarak açıklayan bilim insanlarından biriydi, ancak 1944'te bu keşif için Nobel Kimya Ödülü yalnızca çalışma arkadaşı Otto Hahn'a verildi -- bu durum, bilim tarihinde sıkça tartışılan bir adaletsizlik örneği olarak anılır.",
          "Meitneryum elementinin 1997'de resmî olarak onun adıyla anılması, bu tarihi eksikliği kısmen telafi eden, sembolik ama kalıcı bir bilimsel tanınma biçimi olarak kabul edilir.",
        ],
      },
    ],
    timeline: [
      {
        year: "1982",
        title: "GSI ekibinin üretimi",
        description:
          "Darmstadt'taki GSI laboratuvarı meitneryumu üretti.",
      },
      {
        year: "1997",
        title: "Lise Meitner'e ithafen adlandırma",
        description:
          "IUPAC, elementi Lise Meitner'in onuruna resmî olarak adlandırdı.",
      },
    ],
  },
  {
    slug: "darmstadtiyum",
    introduction: [
      "Darmstadtiyum, yapay olarak üretilen, son derece kısa ömürlü radyoaktif bir geçiş metalidir.",
      "Adını, keşfedildiği laboratuvarın bulunduğu Almanya'nın Darmstadt şehrinden alır.",
    ],
    discoverySummary:
      "1994'te GSI Ağır İyon Araştırma Merkezi'nde Sigurd Hofmann liderliğindeki ekip tarafından üretildi.",
    meltingPointC: "bilinmiyor",
    boilingPointC: "bilinmiyor",
    densityGCm3: "bilinmiyor",
    electronConfiguration: "[Rn] 5f¹⁴ 6d⁸ 7s² (tahmini)",
    uses: [
      "Yalnızca temel nükleer fizik araştırmalarında",
    ],
    sections: [
      {
        title: "Kendi şehrinin laboratuvarında doğan element",
        paragraphs: [
          "Darmstadtiyum, adını doğrudan keşfedildiği şehirden alan az sayıdaki elementten biridir -- GSI Ağır İyon Araştırma Merkezi, 1980'lerden 2000'lere kadar art arda altı yeni elementin (bohriyum, hassiyum, meitneryum, darmstadtiyum, röntgenyum, kopernikyum) keşfedildiği, dünya çapında eşi benzeri az bir araştırma üssü hâline geldi.",
          "Bu yoğun keşif dönemi, Almanya'yı süper ağır element araştırmalarında ABD ve Rusya ile birlikte üç büyük merkezden biri konumuna taşıdı.",
        ],
      },
    ],
    timeline: [
      {
        year: "1994",
        title: "Hofmann ekibinin üretimi",
        description:
          "Sigurd Hofmann liderliğindeki GSI ekibi darmstadtiyumu üretti.",
      },
    ],
  },
  {
    slug: "rontgenyum",
    introduction: [
      "Röntgenyum, yapay olarak üretilen, son derece kısa ömürlü radyoaktif bir geçiş metalidir.",
      "Adını, X-ışınlarını keşfeden ve ilk Nobel Fizik Ödülü'nü kazanan Alman fizikçi Wilhelm Conrad Röntgen'den alır.",
    ],
    discoverySummary:
      "1994'te GSI Ağır İyon Araştırma Merkezi'nde Sigurd Hofmann liderliğindeki ekip tarafından üretildi.",
    meltingPointC: "bilinmiyor",
    boilingPointC: "bilinmiyor",
    densityGCm3: "bilinmiyor",
    electronConfiguration: "[Rn] 5f¹⁴ 6d⁹ 7s² (tahmini)",
    uses: [
      "Yalnızca temel nükleer fizik araştırmalarında",
    ],
    sections: [
      {
        title: "Tıbbi görüntülemenin babasına adanan element",
        paragraphs: [
          "Wilhelm Röntgen, 1895'te X-ışınlarını keşfederek modern tıbbi görüntülemenin temelini attı ve 1901'de verilen ilk Nobel Fizik Ödülü'nü kazandı; buluşunu patentlemeyi reddederek insanlığın ortak yararına sunması, onu bilim tarihinde ayrıca saygın bir konuma yerleştirir.",
          "Röntgenyum elementi, bu köklü bilimsel mirası anmak amacıyla 2004'te onun adıyla resmî olarak onaylandı.",
        ],
      },
    ],
    timeline: [
      {
        year: "1994",
        title: "GSI ekibinin üretimi",
        description:
          "Darmstadt'taki GSI laboratuvarı röntgenyumu üretti.",
      },
    ],
  },
  {
    slug: "kopernikyum",
    introduction: [
      "Kopernikyum, yapay olarak üretilen, son derece kısa ömürlü radyoaktif bir geçiş metalidir.",
      "Adını, Güneş merkezli evren modelini öne süren Polonyalı astronom Nicolaus Copernicus'tan alır.",
    ],
    discoverySummary:
      "1996'da GSI Ağır İyon Araştırma Merkezi'nde Sigurd Hofmann liderliğindeki ekip tarafından üretildi.",
    meltingPointC: "bilinmiyor",
    boilingPointC: "10 ile 15 arası (tahmini, oda sıcaklığında gaz hâlinde olabileceği öngörülüyor)",
    densityGCm3: "bilinmiyor",
    electronConfiguration: "[Rn] 5f¹⁴ 6d¹⁰ 7s² (tahmini)",
    uses: [
      "Yalnızca temel nükleer fizik araştırmalarında",
    ],
    sections: [
      {
        title: "Belki de bir soy gaz gibi davranan metal",
        paragraphs: [
          "Kopernikyum, periyodik tabloda cıva ile aynı grupta yer alır; ancak kuramsal hesaplamalara göre, atom çekirdeğinin çok yüksek yükünden kaynaklanan görecelik (rölativistik) etkiler nedeniyle oda sıcaklığında cıvadan bile daha uçucu, hatta neredeyse soy gaz benzeri davranabileceği tahmin ediliyor.",
          "Bu tür şaşırtıcı teorik tahminler, süper ağır elementlerin periyodik tablodaki 'beklenen' davranış kalıplarını nasıl bozabileceğini gösteren ilginç örneklerden biridir.",
        ],
      },
    ],
    timeline: [
      {
        year: "1996",
        title: "GSI ekibinin üretimi",
        description:
          "Darmstadt'taki GSI laboratuvarı kopernikyumu üretti.",
      },
    ],
  },
  {
    slug: "nihonyum",
    introduction: [
      "Nihonyum, yapay olarak üretilen, son derece kısa ömürlü radyoaktif bir metaldir.",
      "Adını, Japonca'da 'Japonya' anlamına gelen 'Nihon' kelimesinden alır ve bir Asya ülkesindeki araştırma ekibi tarafından keşfedilip adlandırılan ilk elementtir.",
    ],
    discoverySummary:
      "2004'te Japonya'daki RIKEN araştırma enstitüsünde Kosuke Morita liderliğindeki ekip tarafından üretildi.",
    meltingPointC: "bilinmiyor",
    boilingPointC: "bilinmiyor",
    densityGCm3: "bilinmiyor",
    electronConfiguration: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹ (tahmini)",
    uses: [
      "Yalnızca temel nükleer fizik araştırmalarında",
    ],
    sections: [
      {
        title: "Asya'nın periyodik tabloya ilk katkısı",
        paragraphs: [
          "Nihonyum, Japonya'daki RIKEN enstitüsünün yıllar süren titiz çalışmalarının sonucunda keşfedildi ve 2016'da IUPAC tarafından resmî olarak onaylandı -- bu, bir Asya ülkesinde bulunan bir araştırma ekibinin periyodik tabloya isim veren ilk element keşfiydi.",
          "Keşif, Japonya'da büyük bir ulusal gurur kaynağı oldu ve ülkenin temel fizik araştırmalarındaki küresel konumunu güçlendiren sembolik bir başarı olarak kutlandı.",
        ],
      },
    ],
    timeline: [
      {
        year: "2004",
        title: "RIKEN ekibinin üretimi",
        description:
          "Kosuke Morita liderliğindeki Japon ekip nihonyumu üretti.",
      },
      {
        year: "2016",
        title: "Resmî onay",
        description:
          "IUPAC, elementi resmî olarak nihonyum adıyla onayladı.",
      },
    ],
  },
  {
    slug: "flerovyum",
    introduction: [
      "Flerovyum, yapay olarak üretilen, radyoaktif bir metaldir ve teorik 'kararlılık adası' bölgesine komşu olması nedeniyle bilim insanlarının özel ilgisini çeker.",
      "Adını, Sovyet nükleer fizikçi Georgiy Flyorov'dan alır.",
    ],
    discoverySummary:
      "1998'de Rusya'daki Dubna Birleşik Nükleer Araştırmalar Enstitüsü'nde, ABD'deki Lawrence Livermore Ulusal Laboratuvarı ile iş birliği içinde üretildi.",
    meltingPointC: "bilinmiyor",
    boilingPointC: "bilinmiyor",
    densityGCm3: "bilinmiyor",
    electronConfiguration: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p² (tahmini)",
    uses: [
      "Yalnızca temel nükleer fizik araştırmalarında",
    ],
    sections: [
      {
        title: "Teorik 'kararlılık adası'na en yakın komşulardan biri",
        paragraphs: [
          "Nükleer fizik teorisi, belirli sayıda proton ve nötrona sahip süper ağır elementlerin, komşularına göre beklenmedik derecede uzun yarı ömürlere sahip olabileceğini öngören bir 'kararlılık adası' kavramı öne sürer.",
          "Flerovyumun bazı izotopları, komşu elementlere kıyasla nispeten daha uzun yarı ömürler göstererek bu teoriyi destekleyen ilk somut deneysel kanıtlardan bazılarını sağladı; bu da flerovyumu süper ağır element araştırmalarının en heyecan verici konularından biri yapıyor.",
        ],
      },
    ],
    timeline: [
      {
        year: "1998",
        title: "Dubna-Livermore ekibinin üretimi",
        description:
          "Rus-Amerikan ortak ekibi flerovyumu üretti.",
      },
    ],
  },
  {
    slug: "moskovyum",
    introduction: [
      "Moskovyum, yapay olarak üretilen, son derece kısa ömürlü radyoaktif bir metaldir.",
      "Adını, keşfedildiği araştırma enstitüsünün bulunduğu Moskova Oblastı'ndan alır.",
    ],
    discoverySummary:
      "2003'te Rusya'daki Dubna Birleşik Nükleer Araştırmalar Enstitüsü'nde, ABD'deki Lawrence Livermore Ulusal Laboratuvarı ile iş birliği içinde üretildi.",
    meltingPointC: "bilinmiyor",
    boilingPointC: "bilinmiyor",
    densityGCm3: "bilinmiyor",
    electronConfiguration: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³ (tahmini)",
    uses: [
      "Yalnızca temel nükleer fizik araştırmalarında",
    ],
    sections: [
      {
        title: "Rus-Amerikan iş birliğinin ürünü",
        paragraphs: [
          "Moskovyum, Soğuk Savaş sonrası dönemde Rusya'daki Dubna Enstitüsü ile ABD'deki Lawrence Livermore Ulusal Laboratuvarı arasındaki uzun soluklu bilimsel iş birliğinin ürünlerinden biridir -- bu iş birliği aynı zamanda flerovyum, livermoryum ve tennessin elementlerinin de keşfini mümkün kıldı.",
          "Element, 2016'da Moskova bölgesine ithafen resmî olarak adlandırıldı ve Rusya'nın süper ağır element araştırmalarındaki uzun süredir devam eden liderliğinin bir başka kanıtı oldu.",
        ],
      },
    ],
    timeline: [
      {
        year: "2003",
        title: "Dubna-Livermore ekibinin üretimi",
        description:
          "Rus-Amerikan ortak ekibi moskovyumu üretti.",
      },
    ],
  },
  {
    slug: "livermoryum",
    introduction: [
      "Livermoryum, yapay olarak üretilen, son derece kısa ömürlü radyoaktif bir metaldir.",
      "Adını, keşfe katkıda bulunan Lawrence Livermore Ulusal Laboratuvarı'ndan (ABD, Kaliforniya) alır.",
    ],
    discoverySummary:
      "2000'de Rusya'daki Dubna Birleşik Nükleer Araştırmalar Enstitüsü'nde, ABD'deki Lawrence Livermore Ulusal Laboratuvarı ile iş birliği içinde üretildi.",
    meltingPointC: "bilinmiyor",
    boilingPointC: "bilinmiyor",
    densityGCm3: "bilinmiyor",
    electronConfiguration: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴ (tahmini)",
    uses: [
      "Yalnızca temel nükleer fizik araştırmalarında",
    ],
    sections: [
      {
        title: "İki kıtanın laboratuvarlarını birleştiren keşif",
        paragraphs: [
          "Livermoryum, adını ABD'deki Lawrence Livermore Ulusal Laboratuvarı'ndan alır; ancak elementin fiilî üretimi Rusya'daki Dubna'da gerçekleşti -- bu isimlendirme, iki ülkenin bilim insanlarının ortak emeğini simgeler.",
          "Element, 2012'de IUPAC tarafından resmî olarak onaylandı ve periyodik tablonun 116 numaralı konumunu doldurdu.",
        ],
      },
    ],
    timeline: [
      {
        year: "2000",
        title: "Dubna-Livermore ekibinin üretimi",
        description:
          "Rus-Amerikan ortak ekibi livermoryumu üretti.",
      },
    ],
  },
  {
    slug: "tennessin",
    introduction: [
      "Tennessin, yapay olarak üretilen, son derece kısa ömürlü radyoaktif bir elementtir ve keşfedilen en son halojendir.",
      "Adını, keşfe katkıda bulunan araştırma kurumlarının bulunduğu ABD'nin Tennessee eyaletinden alır.",
    ],
    discoverySummary:
      "2010'da Rusya'daki Dubna Enstitüsü, ABD'deki Oak Ridge Ulusal Laboratuvarı, Vanderbilt Üniversitesi ve Tennessee Üniversitesi'nin ortak çalışmasıyla üretildi.",
    meltingPointC: "bilinmiyor",
    boilingPointC: "bilinmiyor",
    densityGCm3: "bilinmiyor",
    electronConfiguration: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵ (tahmini)",
    uses: [
      "Yalnızca temel nükleer fizik araştırmalarında",
    ],
    sections: [
      {
        title: "Halojen ailesinin son ve en ağır üyesi",
        paragraphs: [
          "Tennessin, flor, klor, brom, iyot ve astatinden oluşan halojen ailesinin bilinen en ağır üyesidir; üretimi için nadir bulunan berkelyum izotopunun hedef malzeme olarak kullanılması gerekti, bu da onu sentezlemek için gereken uluslararası iş birliğinin ölçeğini gösterir.",
          "Element, üç farklı Amerikan kurumunun (Oak Ridge, Vanderbilt, Tennessee Üniversitesi) katkısını onurlandırmak amacıyla Tennessee eyaletine ithafen adlandırıldı.",
        ],
      },
    ],
    timeline: [
      {
        year: "2010",
        title: "Dubna-Oak Ridge ekibinin üretimi",
        description:
          "Uluslararası ortak ekip, berkelyum hedefini kullanarak tennessin üretti.",
      },
      {
        year: "2016",
        title: "Resmî onay",
        description:
          "IUPAC, elementi resmî olarak tennessin adıyla onayladı.",
      },
    ],
  },
  {
    slug: "oganesson",
    introduction: [
      "Oganesson, bilinen en ağır elementtir ve periyodik tablonun 7. periyodunu tamamlar.",
      "Adını, hâlâ hayatta olan Rus nükleer fizikçi Yuri Oganesyan'dan alır -- bu, bir elementin hâlâ yaşayan bir bilim insanının adını taşıdığı çok az sayıdaki örnekten biridir.",
    ],
    discoverySummary:
      "2002'de Rusya'daki Dubna Birleşik Nükleer Araştırmalar Enstitüsü'nde, ABD'deki Lawrence Livermore Ulusal Laboratuvarı ile iş birliği içinde üretildi; 2006'da doğrulandı.",
    meltingPointC: "bilinmiyor",
    boilingPointC: "bilinmiyor",
    densityGCm3: "bilinmiyor",
    electronConfiguration: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶ (tahmini)",
    uses: [
      "Yalnızca temel nükleer fizik araştırmalarında",
    ],
    sections: [
      {
        title: "Periyodik tablonun şu anki son durağı",
        paragraphs: [
          "Oganesson, şimdiye kadar sentezlenmiş en ağır element olarak periyodik tablonun 7. periyodunu tamamlar; bugüne kadar yalnızca birkaç atomu üretilebilmiştir ve her biri saniyenin binde birinden bile kısa sürede bozunur.",
          "Element, süper ağır element araştırmalarına onlarca yıl öncülük eden Rus fizikçi Yuri Oganesyan'a ithafen adlandırıldı; bu, seaborgiyumdan sonra hâlâ hayattayken bir elemente adı verilen ikinci bilim insanı örneğidir.",
        ],
      },
    ],
    timeline: [
      {
        year: "2002",
        title: "Dubna-Livermore ekibinin üretimi",
        description:
          "Rus-Amerikan ortak ekibi oganessonu ilk kez üretti.",
      },
      {
        year: "2006",
        title: "Doğrulama",
        description:
          "Elementin varlığı ek deneylerle doğrulandı.",
      },
    ],
  },
  {
    slug: "hidrojen",
    introduction: [
      "Hidrojen, periyodik tablonun ilk elementi ve evrendeki en bol bulunan elementtir -- gözlemlenebilir evrenin kütlece yaklaşık dörtte üçünü oluşturur.",
      "Normal koşullarda renksiz, kokusuz, son derece hafif bir gazdır (H₂ molekülü hâlinde bulunur) ve suyun (H₂O) yapı taşlarından biridir. En basit atomdur -- sadece bir proton ve bir elektrondan oluşur.",
    ],
    discoverySummary:
      "1766'da İngiliz bilim insanı Henry Cavendish tarafından ayrı bir element olarak tanımlandı; adı Yunanca 'su oluşturan' anlamına gelen hydro-genes kelimesinden gelir.",
    meltingPointC: "-259,16",
    boilingPointC: "-252,87",
    densityGCm3: "0,00008988 (gaz)",
    electronConfiguration: "1s¹",
    uses: [
      "Amonyak (gübre hammaddesi) üretiminde Haber-Bosch prosesi",
      "Hidrojen yakıt hücrelerinde temiz enerji kaynağı",
      "Roket yakıtı olarak (sıvı hidrojen)",
      "Bitkisel yağların hidrojenasyonu (margarin üretimi)",
    ],
    sections: [
      {
        title: "Keşif hikayesi",
        paragraphs: [
          "Metallerin asitlerle tepkimesinde çıkan yanıcı gaz aslında 16. yüzyıldan beri Paracelsus ve Robert Boyle gibi isimler tarafından gözlemlenmişti, ama kimse bunu ayrı bir element olarak tanımlamamıştı.",
          "1766'da Henry Cavendish bu gazı sistematik olarak inceledi, yoğunluğunu ölçtü ve yakıldığında su oluşturduğunu gösterdi -- bu, o zamana kadar 'bölünemez' sanılan suyun aslında bir bileşik olduğunu ortaya koyan çığır açıcı bir keşifti. Element adını 1783'te Antoine Lavoisier verdi.",
        ],
      },
      {
        title: "Evrendeki bolluğu ve yıldızlardaki rolü",
        paragraphs: [
          "Hidrojen, Büyük Patlama'dan sonraki ilk birkaç dakikada oluşan ilk elementtir ve bugün hâlâ evrenin kütlece yaklaşık %75'ini oluşturur -- helyum ikinci sırada gelir, geri kalan tüm elementler toplamda %2'den azdır.",
          "Güneş dahil neredeyse tüm yıldızların enerjisi, çekirdeklerinde dört hidrojen atomunun birleşip bir helyum atomu oluşturduğu nükleer füzyon tepkimesinden gelir. Bu füzyon süreci, gördüğümüz güneş ışığının ve ısının kaynağıdır.",
        ],
      },
      {
        title: "Üç izotopu: protyum, döteryum, trityum",
        paragraphs: [
          "Hidrojenin doğal olarak bulunan, biri kararlı olmayan üç izotopu vardır. Protyum (nötronsuz, atomların %99,98'i) en yaygın biçimidir.",
          "Döteryum (bir nötronlu, 'ağır hidrojen') doğada binde birkaç oranında bulunur ve ağır su (D₂O) hâlinde bazı nükleer reaktörlerde nötron yavaşlatıcı olarak kullanılır. Trityum ise iki nötronlu, radyoaktif bir izotoptur; yarı ömrü yaklaşık 12,3 yıldır ve füzyon araştırmalarında kullanılır.",
        ],
      },
      {
        title: "Neden hem +1 hem -1 yükseltgenme basamağı alabilir?",
        paragraphs: [
          "Hidrojen periyodik tabloda alışılmadık bir konumdadır: tek elektronunu vererek +1 yüklü bir iyon (asitlerdeki H⁺ gibi) oluşturabilir, ya da bir elektron alarak -1 yüklü hidrür iyonunu (metal hidrürlerinde olduğu gibi) oluşturabilir.",
          "Bu ikili davranış, onu hem alkali metallerle (grup 1) hem de halojenlerle (grup 17) bazı ortak özellikler paylaşan, sınıflandırılması zor bir element yapar.",
        ],
      },
      {
        title: "Neden dikkatli depolanması gerekir?",
        paragraphs: [
          "Hidrojen gazı havada geniş bir aralıkta (hacimce yaklaşık %4 ila %75) tutuşabilir -- bu, çoğu yanıcı gazdan çok daha geniş bir patlama aralığıdır ve sızıntı durumunda riski artırır.",
          "Sıvı hidrojen olarak depolamak için sıcaklığın -253°C'nin altında tutulması gerekir; bu da özel yalıtımlı, kriyojenik tanklar gerektirir. 1937'deki Hindenburg zeplini faciası, hidrojenin dikkatli mühendislik gerektiren bir yakıt olduğunun tarihe geçen bir örneğidir.",
        ],
      },
    ],
    timeline: [
      {
        year: "1766",
        title: "Henry Cavendish'in keşfi",
        description:
          "Cavendish, metallerin asitlerle tepkimesinde açığa çıkan gazı sistematik olarak inceledi ve yakıldığında su oluşturduğunu gösterdi.",
      },
      {
        year: "1783",
        title: "Element adının verilmesi",
        description:
          "Antoine Lavoisier, bu yeni elemente Yunanca 'su oluşturan' anlamına gelen 'hidrojen' adını verdi.",
      },
      {
        year: "1932",
        title: "Döteryumun keşfi",
        description:
          "Harold Urey, hidrojenin ağır izotopu döteryumu keşfetti; bu buluş için 1934'te Nobel Kimya Ödülü'nü kazandı.",
      },
      {
        year: "1934",
        title: "Trityumun keşfi",
        description:
          "Ernest Rutherford, Mark Oliphant ve Paul Harteck, döteryumu bombardıman ederek hidrojenin radyoaktif izotopu trityumu ürettiler.",
      },
      {
        year: "1937",
        title: "Hindenburg faciası",
        description:
          "Hidrojenle doldurulmuş Hindenburg zeplini New Jersey'de alev aldı; olay, hidrojenin güvenli kullanımı için mühendislik önlemlerinin önemini gösteren tarihî bir dönüm noktası oldu.",
      },
    ],
  },
  {
    slug: "oksijen",
    introduction: [
      "Oksijen, Dünya atmosferinin yaklaşık %21'ini oluşturan, hayvan ve insan solunumu için hayati önem taşıyan bir gazdır.",
      "Yer kabuğunda kütlece en bol bulunan elementtir -- kayaların, minerallerin ve suyun büyük kısmı oksijen içerir.",
    ],
    discoverySummary:
      "1774'te İngiliz kimyager Joseph Priestley ve İsveçli kimyager Carl Wilhelm Scheele tarafından birbirinden bağımsız olarak keşfedildi; adını Antoine Lavoisier verdi.",
    meltingPointC: "-218,79",
    boilingPointC: "-182,96",
    densityGCm3: "0,001429 (gaz)",
    electronConfiguration: "1s² 2s² 2p⁴",
    uses: [
      "Hücresel solunum -- tüm aerobik canlılar için zorunlu",
      "Çelik üretiminde (yüksek fırın oksijen üflemesi)",
      "Tıbbi oksijen tedavisi ve hastane ekipmanları",
      "Roket yakıtlarında oksitleyici madde",
    ],
    sections: [
      {
        title: "Kim keşfetti? Bir öncelik tartışması",
        paragraphs: [
          "Oksijenin keşfi, bilim tarihinin ünlü öncelik anlaşmazlıklarından biridir. İsveçli eczacı Carl Wilhelm Scheele bu gazı muhtemelen 1771'de üretti, ancak bulgularını gecikmeli yayımladı.",
          "İngiliz din adamı Joseph Priestley ise 1774'te, cıva oksidini büyüteçle ısıtarak bağımsız olarak aynı gazı elde etti ve bulgularını ilk yayımlayan kişi oldu. Antoine Lavoisier ise bu gazın yanmadaki gerçek rolünü anlayıp ona 'oksijen' (asit oluşturan) adını verdi ve modern kimyanın temellerini attı.",
        ],
      },
      {
        title: "Solunum, fotosentez ve atmosferdeki döngüsü",
        paragraphs: [
          "Atmosferdeki serbest oksijenin neredeyse tamamı, bitkilerin, algsilerin ve siyanobakterilerin fotosentez sırasında ürettiği bir yan üründür -- Dünya atmosferinin oksijence zenginleşmesi, yaklaşık 2,4 milyar yıl önce gerçekleşen 'Büyük Oksijenlenme Olayı' ile başladı.",
          "Aerobik canlılar bu oksijeni hücresel solunumda kullanarak besinlerdeki enerjiyi açığa çıkarır; bu süreç aslında fotosentezin tam tersi bir kimyasal döngüdür.",
        ],
      },
      {
        title: "İki allotropu: O₂ ve ozon (O₃)",
        paragraphs: [
          "Oksijen doğada iki farklı moleküler formda bulunur. Sıradan oksijen gazı iki atomdan oluşan O₂ molekülüdür ve solunum için kullanılan formdur.",
          "Ozon (O₃) ise üç oksijen atomundan oluşan, stratosferde ince bir tabaka hâlinde bulunan bir allotroptur. Bu ozon tabakası, Güneş'ten gelen zararlı ultraviyole (UV) ışınların büyük kısmını soğurarak yeryüzündeki yaşamı korur.",
        ],
      },
    ],
    timeline: [
      {
        year: "1771",
        title: "Scheele'nin ilk üretimi",
        description:
          "Carl Wilhelm Scheele, çeşitli kimyasal tepkimelerle oksijeni üretti, ancak bulgularını yıllar sonra yayımladı.",
      },
      {
        year: "1774",
        title: "Priestley'nin bağımsız keşfi",
        description:
          "Joseph Priestley, cıva oksidini ısıtarak oksijeni elde etti ve bulgularını ilk yayımlayan bilim insanı oldu.",
      },
      {
        year: "1777",
        title: "Lavoisier'nin isimlendirmesi",
        description:
          "Antoine Lavoisier, gazın yanma ve asit oluşumundaki rolünü açıklayarak ona 'oksijen' adını verdi.",
      },
      {
        year: "1985",
        title: "Ozon deliğinin keşfi",
        description:
          "Bilim insanları, Antarktika üzerindeki ozon tabakasında insan kaynaklı kimyasallardan (CFC'ler) kaynaklanan ciddi bir incelme tespit etti.",
      },
    ],
  },
  {
    slug: "karbon",
    introduction: [
      "Karbon, tüm organik bileşiklerin ve dolayısıyla bilinen yaşamın temelini oluşturan elementtir; kendi kendine zincir ve halka oluşturma yeteneği sayesinde milyonlarca farklı bileşik yapabilir.",
      "Doğada elmas ve grafit gibi çok farklı fiziksel özelliklere sahip allotroplar (aynı elementin farklı yapısal biçimleri) hâlinde bulunur.",
    ],
    discoverySummary:
      "Kömür, is ve elmas biçimleriyle tarih öncesi çağlardan beri bilinir; ayrı bir element olduğu 18. yüzyılda Antoine Lavoisier'nin çalışmalarıyla netleşti.",
    meltingPointC: "~3550 (grafit, süblimleşir)",
    boilingPointC: "~4027 (yaklaşık)",
    densityGCm3: "2,267 (grafit) / 3,513 (elmas)",
    electronConfiguration: "1s² 2s² 2p²",
    uses: [
      "Organik kimyanın ve tüm canlı organizmaların temel yapı taşı",
      "Çelik alaşımlarında sertlik verici katkı maddesi",
      "Elmas: kesici takımlar ve mücevherat",
      "Aktif karbon: su ve hava filtrelerinde kirletici tutucu",
    ],
    sections: [
      {
        title: "Dört allotropu: grafit, elmas, fulleren, grafen",
        paragraphs: [
          "Grafit ve elmas, aynı elementin -- karbonun -- atomlarının tamamen farklı biçimlerde dizilmesiyle oluşan iki klasik allotroptur. Grafitte atomlar düz, kolayca kayan tabakalar hâlinde dizilir (bu yüzden kurşun kalemde iz bırakır); elmasta ise her atom dört komşusuna sıkıca bağlanarak doğadaki en sert doğal malzemeyi oluşturur.",
          "1985'te keşfedilen fullerenler (futbol topu biçimli C₆₀ molekülü, 'buckyball' de denir) ve 2004'te izole edilen grafen (tek atom kalınlığında karbon tabakası) karbonun çok daha yeni, ileri teknolojide kullanılan biçimleridir. Her iki keşif de Nobel Ödülü kazandı -- fullerenler 1996'da, grafen 2010'da.",
        ],
      },
      {
        title: "Karbon döngüsü ve iklim üzerindeki etkisi",
        paragraphs: [
          "Karbon, atmosfer, okyanuslar, canlılar ve kayaçlar arasında sürekli dolaşan bir döngü içindedir: bitkiler fotosentezle atmosferdeki CO₂'yi alır, canlılar solunum ve çürüme yoluyla onu geri verir.",
          "Fosil yakıtların (kömür, petrol, doğal gaz) yakılması, milyonlarca yıldır yer altında depolanmış karbonu hızla atmosfere geri kazandırır -- bu, günümüz iklim değişikliği tartışmalarının kimyasal temelini oluşturur.",
        ],
      },
      {
        title: "Karbon-14 ile yaş tayini",
        paragraphs: [
          "Karbonun radyoaktif izotopu karbon-14, atmosferde kozmik ışınların etkisiyle sürekli üretilir ve canlı organizmalar tarafından diğer karbon izotoplarıyla aynı oranda alınır.",
          "Bir organizma öldüğünde karbon-14 alımı durur ve mevcut miktar bilinen bir hızla (yaklaşık 5.730 yıllık yarı ömürle) azalmaya başlar. Bu öngörülebilir azalma, arkeologların ve jeologların binlerce yıl öncesine ait organik kalıntıların yaşını hesaplamasını sağlar.",
        ],
      },
    ],
    timeline: [
      {
        year: "M.Ö. ~3750",
        title: "Antik kullanım",
        description:
          "Mısırlılar ve Sümerler, kömür ve is hâlindeki karbonu metal eritme ve yazı mürekkebi yapımında kullandı.",
      },
      {
        year: "1772",
        title: "Elmasın karbon olduğunun kanıtlanması",
        description:
          "Antoine Lavoisier, elmasın yakıldığında karbondioksit oluşturduğunu göstererek elmasın saf karbon olduğunu kanıtladı.",
      },
      {
        year: "1985",
        title: "Fullerenlerin keşfi",
        description:
          "Harold Kroto, Robert Curl ve Richard Smalley, futbol topu biçimli C₆₀ molekülünü keşfetti; bu buluş 1996 Nobel Kimya Ödülü'nü kazandı.",
      },
      {
        year: "2004",
        title: "Grafenin izolasyonu",
        description:
          "Andre Geim ve Konstantin Novoselov, tek atom kalınlığındaki karbon tabakası grafeni izole etti; 2010'da Nobel Fizik Ödülü'nü kazandılar.",
      },
    ],
  },
  {
    slug: "demir",
    introduction: [
      "Demir, yer kabuğunda dördüncü en bol bulunan element ve insanlık tarihinde uygarlığı şekillendiren en önemli metallerden biridir -- Demir Çağı adını ondan alır.",
      "Dünya'nın çekirdeği büyük ölçüde demir ve nikelden oluşur; gezegenin manyetik alanı da bu erimiş demir çekirdeğin hareketinden kaynaklanır.",
    ],
    discoverySummary:
      "MÖ 5000 civarında meteor demirinden işlenmeye başlandı; MÖ 1200 civarında demir eritme teknolojisinin yayılmasıyla Demir Çağı başladı.",
    meltingPointC: "1538",
    boilingPointC: "2862",
    densityGCm3: "7,874",
    electronConfiguration: "[Ar] 3d⁶ 4s²",
    uses: [
      "Çelik üretimi -- inşaat, otomotiv ve makine sanayisinin temeli",
      "Hemoglobin yapısında oksijen taşıyıcı (kan)",
      "Mıknatıs ve elektromıknatıs yapımı",
      "Döküm parçalar ve endüstriyel ekipman",
    ],
    sections: [
      {
        title: "Dünya'nın çekirdeği ve manyetik alanı",
        paragraphs: [
          "Dünya'nın iç ve dış çekirdeğinin büyük kısmı demir ve nikelden oluşur -- gezegenin toplam kütlesinin yaklaşık üçte biri demirdir. İç çekirdek katı, dış çekirdek ise erimiş hâldedir.",
          "Dış çekirdekteki erimiş demirin, Dünya'nın dönüşüyle birlikte hareket etmesi elektrik akımları oluşturur; bu akımlar da gezegeni çevreleyen manyetik alanı üretir. Bu manyetik alan, Güneş'ten gelen zararlı parçacık rüzgarlarına karşı atmosferi koruyan bir kalkan görevi görür.",
        ],
      },
      {
        title: "Neden paslanır, nasıl önlenir?",
        paragraphs: [
          "Demir, nemli havada oksijenle tepkimeye girerek demir oksit (pas) oluşturur. Alüminyum gibi metallerin aksine, demir oksit gevşek ve gözeneklidir; metalin yüzeyinden dökülür ve altındaki demiri korumaz, bu yüzden paslanma zamanla malzemenin tamamını etkileyebilir.",
          "Paslanmayı önlemek için çinko kaplama (galvanizleme), boya, yağlama veya krom/nikel eklenerek paslanmaz çelik üretimi gibi yöntemler kullanılır.",
        ],
      },
      {
        title: "Karbon oranına göre farklı demir-çelik türleri",
        paragraphs: [
          "Saf demir yumuşak ve şekillendirilmesi kolaydır; karbon eklenmesi sertliği önemli ölçüde artırır. Döküm demir (%2-4 karbon) sert ama kırılgandır; çelik (%0,2-2 karbon) hem sert hem de nispeten esnektir.",
          "1856'da Henry Bessemer'in geliştirdiği işlemle çelik üretimi hızlı ve ucuz hâle geldi, bu da demiryolları ve gökdelenlerin inşasını mümkün kılan sanayi devrimi çağını başlattı.",
        ],
      },
    ],
    timeline: [
      {
        year: "MÖ ~5000",
        title: "Meteor demiriyle ilk işlemeler",
        description:
          "Erken uygarlıklar, gökten düşen meteorlardaki doğal demir-nikel alaşımını dövmeyi öğrendi.",
      },
      {
        year: "MÖ ~1200",
        title: "Demir Çağı'nın başlangıcı",
        description:
          "Demir eritme teknolojisinin yayılmasıyla bronzun yerini demir aldı, insanlık tarihinde yeni bir çağ başladı.",
      },
      {
        year: "1856",
        title: "Bessemer prosesi",
        description:
          "Henry Bessemer, erimiş demirden hava üfleyerek hızlı ve ucuz çelik üretimini mümkün kılan yöntemi geliştirdi.",
      },
      {
        year: "1912",
        title: "Paslanmaz çeliğin icadı",
        description:
          "Harry Brearley, kroma eklenen demirin paslanmaya karşı olağanüstü dirençli olduğunu keşfederek paslanmaz çeliği icat etti.",
      },
    ],
  },
  {
    slug: "altin",
    introduction: [
      "Altın, parlaklığını kaybetmeyen (oksitlenmeyen), son derece dövülebilir ve iletken bir soy metaldir -- bu özellikleri onu binlerce yıldır değerli kılmıştır.",
      "Doğada çoğunlukla saf (element) hâlde bulunan nadir metallerden biridir; bu yüzden antik çağlardan beri doğrudan işlenebilmiştir.",
    ],
    discoverySummary:
      "Tarih öncesi çağlardan beri bilinir ve kullanılır; ayrı bir element olarak tanımlanması gerekmemiştir çünkü doğada saf hâlde bulunur.",
    meltingPointC: "1064,18",
    boilingPointC: "2856",
    densityGCm3: "19,32",
    electronConfiguration: "[Xe] 4f¹⁴ 5d¹⁰ 6s¹",
    uses: [
      "Mücevherat ve takı üretimi",
      "Elektronik devrelerde korozyona dayanıklı iletken kaplama",
      "Yatırım aracı (külçe altın, altın rezervleri)",
      "Diş hekimliğinde restoratif malzeme",
    ],
    sections: [
      {
        title: "Neden hiç paslanmaz veya kararmaz?",
        paragraphs: [
          "Altın, kimyasal olarak son derece durağan (asal) bir metaldir -- hava, su veya çoğu asitle tepkimeye girmez. Bu özelliği, binlerce yıl önce gömülmüş altın eserlerin bugün hâlâ ilk günkü parlaklığında bulunmasını sağlar.",
          "Altını çözebilen nadir kimyasallardan biri, nitrik asit ve hidroklorik asidin belirli oranda karışımı olan 'kral suyu'dur (aqua regia) -- adını, en dirençli metali bile çözebilmesinden alır.",
        ],
      },
      {
        title: "Olağanüstü dövülebilirlik",
        paragraphs: [
          "Altın, bilinen en dövülebilir metaldir. Bir gram altın, kırılmadan yaklaşık 2 kilometre uzunluğunda ince bir tele çekilebilir.",
          "Aynı şekilde, altın öyle ince varaklar hâlinde dövülebilir ki (yaklaşık 0,0001 milimetre kalınlığa kadar) ışığı hafifçe yeşilimsi bir renkte geçirebilir hâle gelir. Bu özellik, tarihi mimari süslemelerden modern cam kaplamalara kadar birçok alanda kullanılmıştır.",
        ],
      },
      {
        title: "Uzay teknolojisinde altın",
        paragraphs: [
          "Astronotların uzay kıyafeti vizörleri, Güneş'ten gelen yoğun kızılötesi ışınımı ve ısıyı yansıtmak için son derece ince bir altın tabakasıyla kaplanır -- bu kaplama görünürlüğü neredeyse hiç etkilemeden gözleri korur.",
          "Uydu ve uzay araçlarının elektronik bağlantılarında da altın kaplama tercih edilir, çünkü uzayın aşırı sıcaklık değişimlerinde bile oksitlenmeden güvenilir iletkenlik sağlar.",
        ],
      },
    ],
    timeline: [
      {
        year: "MÖ ~4000",
        title: "İlk işlenen metallerden",
        description:
          "Altın, doğada saf hâlde bulunabildiği için insanlık tarihinin en erken işlenen metallerinden biri oldu.",
      },
      {
        year: "MÖ ~560",
        title: "İlk altın sikkeler",
        description:
          "Lidya Kralı Croesus döneminde, standart ağırlıkta ilk saf altın sikkeler basıldı.",
      },
      {
        year: "1848",
        title: "Kaliforniya altına hücumu",
        description:
          "Kaliforniya'da altın bulunması, yüz binlerce kişinin bölgeye akın ettiği tarihi bir göç ve ekonomik dönüşüm dalgası başlattı.",
      },
    ],
  },
  {
    slug: "sodyum",
    introduction: [
      "Sodyum, doğada asla saf element hâlde bulunmayan, çok reaktif bir alkali metaldir -- su ile temas ettiğinde şiddetli biçimde tepkimeye girer.",
      "Vücut sıvılarının dengesi, sinir iletimi ve kas fonksiyonları için hayati bir mineraldir; en tanıdık bileşiği sofra tuzudur (NaCl).",
    ],
    discoverySummary:
      "1807'de İngiliz kimyager Humphry Davy tarafından elektroliz yöntemiyle ilk kez saf hâlde elde edildi.",
    meltingPointC: "97,72",
    boilingPointC: "883",
    densityGCm3: "0,968",
    electronConfiguration: "[Ne] 3s¹",
    uses: [
      "Sofra tuzu (NaCl) olarak gıda ve gıda koruma",
      "Sodyum buharlı sokak lambalarında aydınlatma",
      "Sabun ve deterjan üretiminde (NaOH)",
      "Vücutta sıvı dengesi ve sinir iletiminde biyolojik rol",
    ],
    sections: [
      {
        title: "Suyla neden bu kadar şiddetli tepkimeye girer?",
        paragraphs: [
          "Sodyum suya değdiğinde hızla hidrojen gazı ve ısı açığa çıkararak sodyum hidroksit oluşturur; açığa çıkan ısı çoğu zaman hidrojen gazını tutuşturacak kadar yüksektir, bu da karakteristik alevlenmeye ve bazen küçük patlamalara yol açar.",
          "Bu yüksek reaktivite nedeniyle saf sodyum metali, hava ve nemle temasını önlemek için genellikle mineral yağı içinde saklanır.",
        ],
      },
      {
        title: "Vücutta sodyum-potasyum pompası",
        paragraphs: [
          "Hücre zarlarındaki 'sodyum-potasyum pompası' adlı özel bir protein, sürekli olarak sodyumu hücre dışına, potasyumu hücre içine taşır. Bu, sinir hücrelerinin elektriksel sinyaller üretmesi ve kasların kasılması için gereken temel mekanizmadır.",
          "Vücuttaki sodyum dengesi böbrekler tarafından sıkı biçimde kontrol edilir; hem çok az hem çok fazla sodyum ciddi sağlık sorunlarına yol açabilir.",
        ],
      },
      {
        title: "Turuncu sokak lambalarının sırrı",
        paragraphs: [
          "Sodyum buharlı lambalar, elektrik akımı verildiğinde sodyum atomlarının çok belirgin, sarı-turuncu bir ışık yayması ilkesiyle çalışır -- bu, sodyum atomlarının elektronlarının çok spesifik bir enerji seviyesinde ışık yaymasından kaynaklanır.",
          "Bu lambalar uzun yıllar boyunca enerji verimliliği ve sisi iyi delen ışıkları sayesinde sokak aydınlatmasında dünya genelinde tercih edildi, günümüzde yerini yavaş yavaş LED aydınlatmaya bırakıyor.",
        ],
      },
    ],
    timeline: [
      {
        year: "Antik çağ",
        title: "Tuz olarak bilinmesi",
        description:
          "Sodyum klorür (sofra tuzu) binlerce yıldır bilinir ve tarihte o kadar değerliydi ki Roma askerlerine bazen tuzla ödeme yapılırdı -- 'salary' (maaş) kelimesi Latince 'sal' (tuz) kökünden gelir.",
      },
      {
        year: "1807",
        title: "Humphry Davy'nin izolasyonu",
        description:
          "Davy, erimiş sodyum hidroksitin elektrolizi yoluyla saf sodyum metalini ilk kez elde etti.",
      },
    ],
  },
];

// Yazili makalelerin metninde adi gecen, kendi sayfasi olan diger
// elementlere ic link vermek icin kullanilan iliski haritasi. Ayri
// tutulmasinin nedeni: 37 makale objesinin her birini tek tek duzenlemek
// yerine, tum iliskileri tek yerden yonetebilmek.
const elementRelations: Record<string, string[]> = {
  hidrojen: ["oksijen"],
  helyum: ["hidrojen"],
  lityum: ["sodyum", "potasyum"],
  berilyum: ["magnezyum", "kalsiyum"],
  bor: ["aluminyum"],
  azot: ["oksijen", "hidrojen"],
  oksijen: ["hidrojen", "karbon"],
  flor: ["klor"],
  neon: ["argon", "kripton"],
  sodyum: ["potasyum", "klor"],
  magnezyum: ["kalsiyum", "berilyum"],
  aluminyum: ["skandiyum", "galyum"],
  silisyum: ["karbon", "germanyum"],
  fosfor: ["azot", "oksijen"],
  kukurt: ["oksijen", "demir"],
  klor: ["flor", "sodyum"],
  argon: ["neon", "kripton"],
  potasyum: ["sodyum", "kalsiyum"],
  kalsiyum: ["magnezyum", "fosfor"],
  skandiyum: ["aluminyum", "titanyum"],
  titanyum: ["skandiyum", "demir"],
  vanadyum: ["krom", "demir"],
  krom: ["demir", "vanadyum"],
  mangan: ["demir", "nikel"],
  demir: ["krom", "nikel", "karbon"],
  kobalt: ["nikel", "demir"],
  nikel: ["demir", "kobalt", "krom"],
  bakir: ["cinko", "gumus"],
  cinko: ["bakir", "demir"],
  galyum: ["aluminyum", "germanyum"],
  germanyum: ["silisyum", "galyum"],
  arsenik: ["fosfor", "galyum"],
  selenyum: ["kukurt"],
  brom: ["klor", "flor"],
  kripton: ["argon", "neon", "radon"],
  karbon: ["oksijen", "silisyum"],
  altin: ["bakir", "gumus", "platin"],
  gumus: ["altin", "bakir"],
  kalay: ["bakir"],
  iyot: ["klor", "brom", "astatin"],
  ksenon: ["kripton", "argon", "radon"],
  rubidyum: ["sodyum", "potasyum", "sezyum"],
  stronsiyum: ["kalsiyum", "magnezyum", "baryum"],
  kadmiyum: ["cinko"],
  antimon: ["kursun", "arsenik", "bizmut"],
  tellur: ["kukurt", "selenyum"],
  molibden: ["krom", "demir"],
  itriyum: ["skandiyum", "gadolinyum", "terbiyum", "erbiyum"],
  zirkonyum: ["titanyum", "hafniyum"],
  niyobyum: ["vanadyum", "tantal"],
  teknesyum: ["molibden"],
  rutenyum: ["demir"],
  rodyum: ["paladyum"],
  paladyum: ["rodyum", "platin"],
  indiyum: ["cinko", "kalay"],
  sezyum: ["rubidyum"],
  baryum: ["stronsiyum", "kalsiyum", "radyum"],
  platin: ["altin", "paladyum"],
  kursun: ["antimon", "kalay"],
  bizmut: ["kursun", "antimon"],
  hafniyum: ["zirkonyum", "titanyum"],
  tantal: ["niyobyum"],
  iridyum: ["osmiyum", "platin"],
  osmiyum: ["iridyum", "platin"],
  astatin: ["iyot", "brom"],
  radon: ["ksenon", "kripton"],
  praseodim: ["neodim"],
  neodim: ["praseodim", "samaryum"],
  samaryum: ["neodim", "evropiyum", "gadolinyum"],
  evropiyum: ["samaryum", "gadolinyum"],
  gadolinyum: ["evropiyum", "itriyum", "terbiyum"],
  terbiyum: ["itriyum", "erbiyum", "gadolinyum"],
  disprozyum: ["neodim", "holmiyum"],
  holmiyum: ["disprozyum", "tulyum"],
  erbiyum: ["terbiyum", "itriyum", "holmiyum"],
  tulyum: ["holmiyum", "erbiyum"],
  iterbiyum: ["itriyum", "sezyum", "lutesyum"],
  lutesyum: ["iterbiyum"],
  radyum: ["baryum"],
  toryum: ["uranyum", "protaktinyum"],
  uranyum: ["toryum", "plutonyum", "neptunyum"],
  plutonyum: ["uranyum", "amerikyum", "neptunyum"],
  amerikyum: ["plutonyum", "kuryum"],
  fransiyum: ["sezyum", "rubidyum"],
  aktinyum: ["lantan", "radyum"],
  protaktinyum: ["toryum", "uranyum"],
  neptunyum: ["uranyum", "plutonyum"],
  kuryum: ["amerikyum", "plutonyum"],
  berkelyum: ["kaliforniyum"],
  kaliforniyum: ["berkelyum"],
  aynstaynyum: ["fermiyum"],
  fermiyum: ["aynstaynyum"],
  mendelevyum: ["fermiyum", "nobelyum"],
  nobelyum: ["mendelevyum", "lavrensiyum"],
  lavrensiyum: ["nobelyum"],
  rutherfordyum: ["hafniyum"],
  dubniyum: ["tantal"],
  seaborgiyum: ["volfram"],
  bohriyum: ["renyum"],
  hassiyum: ["osmiyum"],
  meitneryum: ["iridyum"],
  darmstadtiyum: ["platin"],
  rontgenyum: ["altin"],
  kopernikyum: ["civa"],
  nihonyum: ["talyum"],
  flerovyum: ["kursun"],
  moskovyum: ["bizmut"],
  livermoryum: ["polonyum"],
  tennessin: ["iyot", "astatin"],
  oganesson: ["radon", "ksenon"],
};

export function findElementArticle(slug: string) {
  const article = elementArticles.find((item) => item.slug === slug);

  if (!article) {
    return undefined;
  }

  return {
    ...article,
    relatedElements: elementRelations[slug] ?? [],
  };
}
