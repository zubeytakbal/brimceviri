// Kategori sayfalarinin araç listesinin altindaki aciklama: kategorideki araclar ne hesaplar, sonuclari kullanirken
// nelere dikkat edilmeli. Yalniz araclarin gercekten yaptigi anlatilir; emin olunmayan ayrinti yazilmaz.
export const GRUP_ACIKLAMASI: Readonly<Record<string, { baslik: string; paragraflar: readonly string[] }>> = {
  finans: {
    baslik: "Bu araçlar ne hesaplar?",
    paragraflar: [
      "Maaş, vergi ve kredi araçları günlük para hesaplarını kolaylaştırır. Brütten nete maaş aracı brüt ücretten SGK primini, işsizlik sigortasını, gelir vergisini ve damga vergisini düşerek eline geçecek tutarı gösterir. Kıdem ve ihbar tazminatı aracı çalışma süresine ve ücrete göre tazminatı, yıllık izin aracı izin gününü, kredi aracı faiz oranı ve vadeye göre taksiti hesaplar. KDV aracı ise bir tutarın KDV dahil ve hariç halini bulur.",
      "Altın araçları gram, ayar ve adet arasındaki ilişkiyi hesaplar: çeyrek ve Cumhuriyet altınının ağırlığı, bilezik ya da hurda altının içindeki has altın, 22 ayar ile 24 ayar arasındaki karşılık. Vergi oranları, tavanlar ve altın fiyatları sık değiştiği için sonuçlar bilgilendirme amaçlıdır; bordro, sözleşme ya da alım satım gibi işlemlerde muhasebecinizin, bankanızın ya da kuyumcunuzun hesabı esas alınır.",
    ],
  },
  "gunluk-yasam": {
    baslik: "Bu araçlar ne hesaplar?",
    paragraflar: [
      "Günlük yaşam araçları gündelik sorulara hızlı cevap vermek için hazırlandı. Tarih ve zaman araçları doğum tarihinden yaşı, iki tarih arasındaki gün sayısını, bir tarihe gün eklenince hangi güne çıkıldığını, iş günü sayısını ve yılın kaçıncı haftasında olunduğunu hesaplar; Hicri, Rumi ve Miladi takvimler arasında çeviri yapar.",
      "Araç ve yol bölümünde yakıt tüketimi, trafik cezasında erken ödeme indirimi, ehliyetin yenileme süresi, lastik ebatı ve seyir süresi hesapları bulunur. Okul araçları devamsızlık ve harf notu, ölçü araçları da ayakkabı, giysi ve yüzük numaralarının farklı sistemlerdeki karşılığı içindir. Numara tabloları markadan markaya değişebildiği için alışverişte markanın kendi tablosuna da bakmanızı öneririz.",
    ],
  },
  insaat: {
    baslik: "Bu araçlar ne hesaplar?",
    paragraflar: [
      "İnşaat araçları bir işe başlamadan önce ne kadar malzeme alınacağını kestirmek için kullanılır. Beton, tuğla, boya, fayans, parke ve duvar kağıdı araçları ölçülerden hacmi ya da alanı bulur ve gereken malzeme miktarını gösterir. Merdiven aracı yükseklikten basamak sayısını ve rıht yüksekliğini, emsal aracı arsa alanından yapılabilecek inşaat alanını, hafriyat aracı kazı hacmini hesaplar; demir, sac ve malzeme ağırlığı araçları ağırlığı yoğunluktan bulur.",
      "Isıtma ve soğutma bölümünde klima için gereken BTU, kombi gücü ve petek dilim sayısı oda ölçülerine göre tahmin edilir. Sonuçlar yaygın kabullere dayanır; yalıtım, cephe yönü ve malzemenin cinsi sonucu değiştirir. Sipariş vermeden ya da projeyi kesinleştirmeden önce ustanıza veya mühendisinize danışmanız iyi olur.",
    ],
  },
  saglik: {
    baslik: "Bu araçlar ne hesaplar?",
    paragraflar: [
      "Sağlık araçları vücut ölçüleri ve günlük alışkanlıklarla ilgili hesapları kolaylaştırır. Vücut kitle indeksi (BMI) aracı boy ve kilodan endeksi hesaplayıp hangi aralıkta olduğunuzu gösterir; ideal kilo aracı boya göre yaygın formüllerin verdiği değerleri karşılaştırır. Gebelik haftası aracı son adet tarihinden kaçıncı haftada olunduğunu ve tahmini doğum tarihini, uyku aracı da 90 dakikalık uyku döngülerine göre yatma ve kalkma saatini hesaplar.",
      "Bu sonuçlar genel bilgilendirme içindir ve kişisel sağlık durumunuzu bilmez. Örneğin BMI kas ile yağı ayırt etmez, gebelik haftası ultrason ölçümüne göre değişebilir. Tedavi, ilaç ya da diyetle ilgili kararlarda hekiminize danışın.",
    ],
  },
  matematik: {
    baslik: "Bu araçlar ne hesaplar?",
    paragraflar: [
      "Matematik araçları sık yapılan hesapları kolaylaştırır; birçoğunda çözüm adım adım gösterilir. Yüzde aracı bir sayının yüzdesini, bir sayının diğerinin yüzde kaçı olduğunu ve yüzde artış ya da azalışı hesaplar. EBOB ve EKOK aracı sayıların en büyük ortak bölenini ve en küçük ortak katını, ortalama aracı aritmetik ortalama, medyan ve modu birlikte verir; karekök aracı da bir sayının karekökünü bulur.",
      "Denklem araçları iki ve üç bilinmeyenli doğrusal denklem sistemlerini çözer. Sayı tabanı aracı ikilik, onluk ve on altılık gibi tabanlar arasında, Roma rakamları aracı da sayılar ile Roma rakamları arasında çeviri yapar. Ödev kontrolü için kullanıyorsanız aracın gösterdiği adımları kendi çözümünüzle karşılaştırmak en faydalı yoldur.",
    ],
  },
  fizik: {
    baslik: "Bu araçlar ne hesaplar?",
    paragraflar: [
      "Fizik araçları elektrik, mekanik ve akışkan hesaplarını bir araya getirir. Elektrik bölümünde kW ile amper ve kVA ile kW arasındaki çevirme, kablo kesiti seçimi, Ohm yasası, AWG ile mm² karşılığı, bilgisayar güç kaynağı ihtiyacı ve anten boyu hesaplanır. Mekanik ve malzeme bölümünde kesme hızı ve devir, cıvata sıkma torku, ısıl genleşme, kaynakta ısı girdisi ve malzemelerin yoğunluk gibi özellikleri yer alır.",
      "Akışkan ve ısı bölümündeki araçlar boru çapı ile akış hızını, boru hattındaki basınç kaybını, tank hacmini, ısı enerjisini ve ısı iletimini hesaplar. Bu araçlar ön hesap ve kontrol için uygundur; elektrik tesisatı ya da basınçlı sistemler gibi güvenlik gerektiren işlerde yönetmeliğe uygun proje hesabını yetkili bir mühendis yapmalıdır.",
    ],
  },
  kimya: {
    baslik: "Bu araçlar ne hesaplar?",
    paragraflar: [
      "Kimya araçları ders ve laboratuvar hesaplarında sık geçen dönüşümleri kolaylaştırır. Mol aracı kütle, mol sayısı ve molar kütle arasında hesap yapar; atom kütlesi aracı elementlerin atom kütlelerini kullanarak hesap yapmanızı sağlar.",
      "Günlük kullanımda alkol seyreltme aracı belirli derecedeki alkolü istenen dereceye indirmek için ne kadar su eklenmesi gerektiğini, havuz klor dozajı aracı da havuz hacmine göre gereken klor miktarını gösterir. Klor ürünlerinin etken madde oranı markaya göre değiştiği için ürün etiketindeki talimat her zaman önce gelir. Kimyasallarla çalışırken eldiven ve gözlük kullanın, farklı temizlik ürünlerini birbirine karıştırmayın.",
    ],
  },
  biyoloji: {
    baslik: "Bu araçlar ne hesaplar?",
    paragraflar: [
      "Biyoloji kategorisinin büyük bölümü tarım ve hayvancılık araçlarından oluşur. Tarla dönüm aracı kenar ölçülerinden tarlanın alanını dönüm ve metrekare olarak bulur. Tohum miktarı ve dekara fidan sayısı araçları ne kadar tohum ya da fide gerektiğini, gübre ihtiyacı aracı gereken gübre miktarını, ilaçlama aracı da depo hacmine göre ilaç ve su karışımını hesaplar.",
      "Hayvancılık tarafında inek doğum aracı tohumlama tarihinden tahmini doğum tarihini, veteriner ilaç dozu aracı ise hayvanın ağırlığına göre dozu gösterir. Genetik bölümündeki kodon tablosu DNA ve RNA kodonlarının hangi amino asidi kodladığını listeler. Tarım ilaçlarında ve hayvan ilaçlarında ürün etiketindeki ve veteriner hekiminizin önerdiği doz esastır.",
    ],
  },
  ekoloji: {
    baslik: "Bu araçlar ne hesaplar?",
    paragraflar: [
      "Ekoloji ve enerji araçları evdeki ve yoldaki enerji tüketimini görünür hale getirir. Elektrik tüketimi aracı cihazın gücü ve kullanım süresinden tüketimi ve fatura tahminini, doğalgaz tüketimi aracı da metreküp tüketimi kilovatsaate çevirip maliyeti hesaplar. Isınma maliyeti karşılaştırması farklı ısınma yöntemlerinin maliyetini yan yana koyar.",
      "Ulaşım tarafında elektrikli araç ile benzinli aracın maliyetini karşılaştırabilir, LPG dönüşümünün kendini ne zaman amorti edeceğini hesaplayabilirsiniz. Sonuçlar girdiğiniz birim fiyatlara bağlıdır; elektrik, doğalgaz ve yakıt fiyatları sık değiştiği için güncel fiyatları kendiniz girmeniz en doğru sonucu verir.",
    ],
  },
  yiyecek: {
    baslik: "Bu araçlar ne hesaplar?",
    paragraflar: [
      "Yiyecek ve içecek araçları mutfaktaki ölçü karışıklığını gidermek için hazırlandı. Mutfak ölçüleri aracı su bardağı, çay bardağı, yemek kaşığı ve çay kaşığı gibi ölçüleri gram ve mililitreye çevirir. Un, şeker ve pirinç gibi malzemelerin yoğunluğu farklı olduğu için aynı bardak her malzemede farklı gram eder; araç bu yüzden hesabı malzemeye göre yapar.",
      "Kokteyl ölçüsü aracı ons gibi bar ölçülerini mililitre ve santilitreye çevirir. ABV ve standart içki aracı içeceğin hacminden ve alkol oranından içindeki saf alkol miktarını ve kaç standart içkiye denk geldiğini hesaplar; standart içki tanımı ülkeden ülkeye değişir. Alkol hesapları bilgilendirme içindir, araç kullanacaksanız alkol almayın.",
    ],
  },
  diger: {
    baslik: "Bu araçlar ne hesaplar?",
    paragraflar: [
      "Diğer kategorisinde belirli bir konuya özel araçlar yer alır. Dini hesaplar bölümünde kıble yönü, Hicri takvime göre yaş, kırk mevlidi ve elli iki gecesi tarihleri, hafızlık ve hatim planı, kaza namazı ve kaza orucu, zekât ile hayız ve nifas süreleri hesaplanır. Fıkhi konularda farklı görüşler bulunabilir; araçlar sayfalarında belirtilen görüşe göre hesap yapar, kesin hüküm için bir din görevlisine danışmanız önerilir.",
      "Harita ve taşıma bölümünde koordinat biçimleri arasında çeviri, harita ölçeğiyle gerçek mesafe hesabı ve kargo hacmi (CBM) ile hacimsel ağırlık hesabı bulunur. Uzunluk karşılaştırma ve tarihi ölçü birimleri sayfaları ölçüleri tanıdık nesnelerle ve eski ölçü sistemleriyle karşılaştırır; koşu temposu aracı da mesafe ve süreden temponuzu hesaplar.",
    ],
  },
};
