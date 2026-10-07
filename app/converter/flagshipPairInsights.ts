// 29 sayfa (popularEmbedSlugs listesindeki ciftler) icin elle arastirilmis,
// gercek dunya degerleri ve sektor notlari. Amac: bu ciftlerde sayfayi
// Wikipedia/rakip cevirici sitelerden ayristirmak. Genis (~800 sayfa) veri
// setine cikarilmiyor cunku her deger elle dogrulanmis olmali -- otomatik
// uretim burada anlam tasimiyor.
//
// ONEMLI: anchorUnit degerleri unitRegistry id'si degil, ConversionPage.
// fromUnit/toUnit alanlarinin gercekte tuttugu unit SYMBOL degeridir (bkz.
// conversionPages.ts: fromUnit: first.symbol). Kategori de anahtara dahil,
// cunku bazi kategoriler sembolu paylasiyor (F: fahrenhayt/farad, C:
// santigrat/coulomb) -- kategorisiz anahtar yanlis eslesme riski tasirdi.

export type RealWorldValue = {
  label: string;
  // deger, anchorUnit (sembol) cinsinden ifade edilir; sayfa hangi yonde
  // olursa olsun convert() ile dogru birime cevrilir.
  value: number;
  anchorUnit: string;
};

export type FlagshipPairInsight = {
  realWorldValues?: RealWorldValue[];
  sectorNote?: string;
  /** Bu iki birim günlük hayatta nerede karşılaşılır (tek paragraf). */
  where?: string;
  /** Bu çiftte sık yapılan hatalar ve karışan ölçüler. */
  mistakes?: string[];
  /** inç–cm: 16:9 ekranların köşegen, genişlik ve yükseklik tablosu. */
  screenTable?: boolean;
  /** feet–metre: 4'10" ile 6'6" arası boyların cm karşılığı. */
  heightTable?: boolean;
};

function pairKey(category: string, symbolA: string, symbolB: string): string {
  return `${category}::${[symbolA, symbolB].sort().join("::")}`;
}

const insights: Record<string, FlagshipPairInsight> = {
  [pairKey("uzunluk", "km", "mi")]: {
    realWorldValues: [
      { label: "5K koşusu", value: 5, anchorUnit: "km" },
      { label: "10K koşusu", value: 10, anchorUnit: "km" },
      { label: "Yarı maraton", value: 21.0975, anchorUnit: "km" },
      { label: "Maraton mesafesi", value: 42.195, anchorUnit: "km" },
      { label: "İstanbul–Ankara karayolu (yaklaşık)", value: 450, anchorUnit: "km" },
    ],
    where:
      "Mil; ABD ve Birleşik Krallık'ta yol tabelalarında, araç kilometre (mil) sayaçlarında, koşu ve bisiklet uygulamalarında karşına çıkar. Bu ülkelerden ikinci el araç alırken sayaçtaki değer mildir. 1 mil tam olarak 1,609344 km'dir.",
    mistakes: [
      "Deniz mili farklı bir birimdir: 1 deniz mili 1,852 km'dir; denizcilikte ve havacılıkta kullanılır. Kara mili (1,609 km) ile karıştırılmamalıdır.",
      "Kafadan hesap için mili 1,6 ile çarpmak yeterince yakındır (100 mil ≈ 160 km); ters yönde km'yi 0,62 ile çarpın.",
      "ABD'den getirilen araçta \"miles\" yazan sayaç değeri km değildir: 60.000 mil yaklaşık 96.560 km eder.",
    ],
  },
  [pairKey("uzunluk", "cm", "in")]: {
    realWorldValues: [
      { label: "Standart kredi kartının uzun kenarı", value: 8.56, anchorUnit: "cm" },
      { label: "6,1 inç telefon ekranı (köşegen)", value: 6.1, anchorUnit: "in" },
      { label: "15,6 inç dizüstü bilgisayar ekranı (köşegen)", value: 15.6, anchorUnit: "in" },
      { label: "Kot pantolon W32 (bel ölçüsü)", value: 32, anchorUnit: "in" },
      { label: "Otomobil jantı (205/55 R16 lastikteki 16)", value: 16, anchorUnit: "in" },
      { label: "Dağ bisikleti tekeri", value: 29, anchorUnit: "in" },
    ],
    where:
      "İnç Türkiye'de en çok ekran boyutlarında (televizyon, monitör, telefon, tablet), otomobil jantlarında, bisiklet tekerlerinde, kot pantolon bedenlerinde (W bel, L boy) ve tesisat borularında karşına çıkar. ABD'den alınan ürünlerin ölçüleri de çoğunlukla inçtir. 1 inç 1959'dan beri tam olarak 2,54 cm kabul edilir; yani bu dönüşüm yaklaşık değil, kesindir.",
    mistakes: [
      "Ekran boyutu köşegendir, genişlik değil: 55 inç bir televizyonun köşegeni 139,7 cm, ama 16:9 ekranın genişliği yaklaşık 121,8 cm'dir. Duvara ya da TV ünitesine sığıp sığmayacağına genişliğe bakarak karar verin.",
      "Tesisattaki \"1/2 inç boru\" nominal (anma) ölçüdür: borunun dış çapı 12,7 mm değil, yaklaşık 21,3 mm'dir. Boru ve fitting alırken dış çap tablosuna bakın.",
      "Kesirli inçler ondalığa çevrilmeden hesaplanmamalı: 1/4 inç = 0,635 cm, 1/8 inç = 3,175 mm, 3/8 inç = 9,525 mm.",
      "Kot pantolonda W32 bel çevresi yaklaşık 81 cm demektir; ama markalar etiket ölçüsünü farklı kestiği için gerçek bel ölçüsü 1-3 cm sapabilir.",
    ],
    screenTable: true,
  },
  [pairKey("uzunluk", "m", "ft")]: {
    realWorldValues: [
      { label: "Resmi basketbol potası yüksekliği", value: 3.048, anchorUnit: "m" },
      { label: "Yolcu uçağının seyir irtifası (tipik)", value: 35000, anchorUnit: "ft" },
      { label: "Everest'in yüksekliği", value: 8849, anchorUnit: "m" },
      { label: "ABD'de standart tavan yüksekliği", value: 8, anchorUnit: "ft" },
    ],
    where:
      "Feet; ABD ve Birleşik Krallık'ta boy ölçüsünde (5'9\" gibi), ev ilanlarındaki oda ve tavan ölçülerinde ve dünyanın her yerinde havacılıkta irtifa birimi olarak kullanılır. Uçuşta pilotun \"35 bin feet\" dediği yükseklik yaklaşık 10.700 metredir. 1 foot tam olarak 0,3048 metredir.",
    mistakes: [
      "5'9\" yazımı 5,9 feet demek değildir: 5 feet 9 inç demektir, yani 5,75 feet ≈ 175,3 cm. Boy çevirirken feet ve inç kısmını ayrı hesaplayın.",
      "Feet'in tekili \"foot\"tur; kısaltması ft ya da tek tırnaktır ('), inç ise çift tırnaktır (\").",
      "Kafadan hesap için feet'i 0,3 ile çarpmak küçük değerlerde iş görür, ama 35.000 ft'te 168 metre hata yapar; tam katsayı 0,3048'dir.",
    ],
    heightTable: true,
  },
  [pairKey("kutle", "kg", "lb")]: {
    realWorldValues: [
      { label: "Ekonomi sınıfı uçak bagaj limiti (tipik)", value: 23, anchorUnit: "kg" },
      { label: "Olimpik halter barı (erkek)", value: 20, anchorUnit: "kg" },
      { label: "Spor salonundaki 45 lb'lik plaka", value: 45, anchorUnit: "lb" },
      { label: "Yeni doğan bebek (ortalama)", value: 3.4, anchorUnit: "kg" },
      { label: "Bir kutu un (ABD, 5 lb)", value: 5, anchorUnit: "lb" },
    ],
    where:
      "Pound; ABD ve Birleşik Krallık'ta vücut ağırlığında, spor salonu ekipmanlarında (dambıl, plaka), yurt dışı alışveriş sitelerindeki ürün ağırlıklarında, havayolu bagaj kurallarında ve boks sıklet sınıflarında kullanılır. 1 pound tam olarak 0,45359237 kg'dır.",
    mistakes: [
      "Kafadan hesapta pound'u 2'ye bölmek yaklaşık değer verir ama %10'a yakın sapar; doğru kısayol 2,2'ye bölmektir (150 lb ≈ 68 kg).",
      "Birleşik Krallık'ta vücut ağırlığı çoğu zaman \"stone\" ile söylenir: 1 stone = 14 pound ≈ 6,35 kg. \"11 stone\" yaklaşık 70 kg eder.",
      "Spor salonunda plaka ve barların hangi birimde olduğuna bakın: 45 lb'lik plaka 20,4 kg'dır, 20 kg'lık plakayla aynı değildir.",
      "\"lbs\" kısaltması pound'un çoğuludur; birim aynıdır.",
    ],
  },
  [pairKey("kutle", "kg", "g")]: {
    sectorNote:
      "Mutfak tariflerinde ve eczacılıkta hassas malzeme ölçümü için gram, toplu/ticari miktarlar için kilogram kullanılır.",
  },
  [pairKey("hacim", "gal", "L")]: {
    realWorldValues: [
      { label: "Ortalama otomobil yakıt deposu", value: 50, anchorUnit: "L" },
      { label: "5 galonluk su damacanası", value: 5, anchorUnit: "gal" },
      { label: "ABD'de 1 galonluk süt şişesi", value: 1, anchorUnit: "gal" },
      { label: "ABD'de tipik binek araç deposu", value: 15, anchorUnit: "gal" },
    ],
    where:
      "Galon; ABD'de akaryakıt fiyatlarında (dolar/galon), süt ve içecek ambalajlarında, boya kovalarında ve akvaryum hacimlerinde kullanılır. Türkiye'deki 19 litrelik damacana da aslında 5 ABD galonudur (18,93 L). Bu sayfadaki galon ABD galonudur: 3,785411784 litre.",
    mistakes: [
      "ABD galonu ile İngiliz galonu farklıdır: ABD galonu 3,785 L, İngiliz (imperial) galonu 4,546 L'dir. Birleşik Krallık kaynaklı bir değer için İngiliz galonu çeviricisini kullanın.",
      "ABD'deki yakıt tüketimi \"mpg\" (galon başına mil) olarak verilir ve tersine çalışır: 30 mpg yaklaşık 7,8 L/100 km eder; sayı büyüdükçe tüketim azalır.",
      "ABD akaryakıt fiyatını litreye çevirirken fiyatı 3,785'e bölün: galonu 3,50 dolar olan benzin litresi yaklaşık 0,92 dolardır.",
    ],
  },
  [pairKey("sicaklik", "F", "C")]: {
    realWorldValues: [
      { label: "Tıbbi ateş eşiği", value: 38, anchorUnit: "C" },
      { label: "Normal vücut ısısı (klasik değer)", value: 98.6, anchorUnit: "F" },
      { label: "Amerikan tariflerinde orta fırın", value: 350, anchorUnit: "F" },
      { label: "Kurabiye ve börek için fırın", value: 375, anchorUnit: "F" },
      { label: "Kızartma ve közleme için fırın", value: 425, anchorUnit: "F" },
      { label: "Rahat oda sıcaklığı", value: 70, anchorUnit: "F" },
      { label: "Suyun donma noktası", value: 32, anchorUnit: "F" },
    ],
    where:
      "Fahrenheit; ABD'de hava durumunda, Amerikan yemek tariflerindeki fırın sıcaklıklarında, ithal termometre ve fırın kadranlarında ve ABD kaynaklı sağlık bilgilerinde (ateş) karşına çıkar. Formül: °C = (°F − 32) × 5 ⁄ 9.",
    mistakes: [
      "Fahrenheit oransal değildir: 0 °F, 0 °C değildir (−17,8 °C'dir) ve 100 °F, 50 °F'nin \"iki katı sıcak\" değildir. Önce 32 çıkarılmalıdır.",
      "\"Fahrenheit'tan 30 çıkar, ikiye böl\" kısayolu oda sıcaklığı civarında iş görür, ama fırın sıcaklığında 15-20 derece sapar: 400 °F gerçekte 204 °C'dir, kısayol 185 °C verir.",
      "Amerikan tariflerindeki 350 °F genelde 175-180 °C'ye ayarlanır; fanlı (turbo) fırında 10-20 °C düşük ayar yeterlidir.",
      "−40 derece iki ölçekte de aynıdır: −40 °F = −40 °C.",
    ],
  },
  [pairKey("uzunluk", "m", "cm")]: {
    sectorNote:
      "Terzilik, mühendislik çizimleri ve günlük boy/mesafe ölçümlerinde en sık başvurulan uzunluk dönüşümüdür.",
  },
  [pairKey("uzunluk", "cm", "mm")]: {
    sectorNote:
      "Hassas mühendislik ve teknik çizimlerde milimetre, günlük ölçümlerde santimetre tercih edilir.",
  },
  [pairKey("uzunluk", "km", "m")]: {
    sectorNote:
      "Şehirler arası mesafelerde kilometre, saha/bina ölçümlerinde metre kullanılır.",
  },
  [pairKey("kutle", "g", "mg")]: {
    sectorNote:
      "Eczacılık ve laboratuvar ölçümlerinde miligram, mutfak tariflerinde gram tercih edilir.",
  },
  [pairKey("kutle", "g", "oz")]: {
    realWorldValues: [
      { label: "8 oz'luk biftek", value: 8, anchorUnit: "oz" },
      { label: "16 oz (= 1 pound)", value: 16, anchorUnit: "oz" },
      { label: "Standart çikolata tableti", value: 100, anchorUnit: "g" },
      { label: "Bir paket kuru makarna", value: 500, anchorUnit: "g" },
    ],
    where:
      "Ons; ABD ve Birleşik Krallık'ta yemek tariflerinde, et ve paketli gıda etiketlerinde, posta ve kargo ağırlıklarında kullanılır. Bu sayfadaki ons gıda (avoirdupois) onsudur: tam olarak 28,349523125 gram.",
    mistakes: [
      "Altın ve gümüş fiyatlarındaki ons \"troy ons\"tur ve 31,1035 gramdır; gıda onsundan (28,35 g) yaklaşık %10 ağırdır. Altının ons fiyatını grama çevirirken 31,1035'e bölün.",
      "Sıvı ons (fl oz) ağırlık değil hacim birimidir: 1 ABD sıvı onsu 29,57 mL'dir. Tarifte \"8 fl oz süt\" yazıyorsa ölçü kabıyla ölçülür, tartılmaz.",
      "1 pound 16 onstur; \"1,5 lb\" 24 ons, yani yaklaşık 680 gram eder.",
    ],
  },
  [pairKey("kutle", "kg", "ton")]: {
    realWorldValues: [
      { label: "Ortalama binek otomobil ağırlığı", value: 1.5, anchorUnit: "ton" },
      { label: "B sınıfı ehliyetle kullanılabilecek azami araç ağırlığı", value: 3500, anchorUnit: "kg" },
      { label: "Beş dingilli tırın azami toplam ağırlığı", value: 40, anchorUnit: "ton" },
    ],
    where:
      "Ton; nakliye ve kargo ücretlerinde, araç ruhsatındaki azami yüklü ağırlıkta, inşaat malzemelerinde (demir, çimento, kum) ve tarım ürünlerinin hasat miktarlarında kullanılır. Türkiye'de ve bu sayfada ton metrik tondur: 1.000 kg.",
    mistakes: [
      "ABD'deki \"short ton\" 907,2 kg, Birleşik Krallık'taki \"long ton\" 1.016 kg'dır; yabancı kaynaklı bir tonaj metrik ton olmayabilir.",
      "Klimalardaki \"ton\" ağırlık değil soğutma gücüdür: 1 ton soğutma 12.000 BTU/saat eder.",
    ],
  },
  [pairKey("kutle", "oz", "lb")]: {
    sectorNote:
      "İngiliz/ABD ölçü sisteminde küçük ağırlıklar ons, daha büyük ağırlıklar pound ile ifade edilir (1 pound = 16 ons).",
  },
  [pairKey("hacim", "L", "mL")]: {
    sectorNote:
      "İlaç dozları ve laboratuvar ölçümlerinde mililitre, günlük sıvı ölçümlerinde litre kullanılır.",
  },
  [pairKey("hiz", "km/h", "mph")]: {
    realWorldValues: [
      { label: "Türkiye otoyol hız sınırı", value: 120, anchorUnit: "km/h" },
      { label: "Türkiye şehir içi hız sınırı", value: 50, anchorUnit: "km/h" },
      { label: "Birleşik Krallık otoyol sınırı", value: 70, anchorUnit: "mph" },
      { label: "ABD'de yaygın otoyol sınırı", value: 65, anchorUnit: "mph" },
      { label: "ABD'de okul bölgesi sınırı (yaygın)", value: 20, anchorUnit: "mph" },
    ],
    where:
      "Mil/saat (mph); ABD ve Birleşik Krallık'ta hız tabelalarında ve araç göstergelerinde kullanılır. Bu ülkelerde araç kiralayan biri için tabeladaki 70, saatte yaklaşık 113 km demektir. 1 mph tam olarak 1,609344 km/s'dir.",
    mistakes: [
      "Knot (deniz mili/saat) farklıdır: 1 knot 1,852 km/s'dir; gemi, uçak ve rüzgâr hızında kullanılır.",
      "İthal araçların göstergesinde büyük rakamlar mph, küçük iç ölçek km/s olabilir; hangi ölçeğe baktığınızı kontrol edin.",
      "Kafadan hesap için mph'yi 1,6 ile çarpın (60 mph ≈ 96 km/s); ters yönde km/s'yi 0,62 ile çarpın.",
    ],
  },
  [pairKey("basinc", "bar", "psi")]: {
    realWorldValues: [
      { label: "Standart otomobil lastik basıncı", value: 2.2, anchorUnit: "bar" },
      { label: "Yol bisikleti lastiği (tipik)", value: 7, anchorUnit: "bar" },
      { label: "Espresso makinesi demleme basıncı", value: 9, anchorUnit: "bar" },
      { label: "Dolu dalış tüpü", value: 200, anchorUnit: "bar" },
      { label: "Deniz seviyesinde hava basıncı", value: 1.01325, anchorUnit: "bar" },
    ],
    where:
      "Bar ve psi; araç lastik basıncında (kapı kenarındaki etikette ikisi birden yazar), benzin istasyonu hava pompalarında, kompresör ve bisiklet pompası göstergelerinde, dalış tüplerinde ve hidroforlarda karşına çıkar. 1 bar ≈ 14,504 psi.",
    mistakes: [
      "Lastik göstergesi atmosfer basıncının üstündeki basıncı (gösterge basıncı) ölçer; 2,2 bar lastikteki mutlak basınç yaklaşık 3,2 bar'dır. Tablolardaki değerler gösterge basıncıdır.",
      "Lastik basıncını soğukken ölçün: sürüş sonrası ısınan lastik 0,2-0,3 bar fazla gösterebilir.",
      "Bazı göstergeler kPa kullanır: 2,2 bar = 220 kPa.",
    ],
  },
  [pairKey("veri", "MB", "GB")]: {
    realWorldValues: [
      { label: "Ortalama HD film dosyası", value: 4, anchorUnit: "GB" },
    ],
  },
  [pairKey("veri", "KB", "MB")]: {
    realWorldValues: [
      { label: "Ortalama MP3 şarkı dosyası", value: 4, anchorUnit: "MB" },
    ],
  },
  [pairKey("zaman", "h", "s")]: {
    sectorNote:
      "Bilimsel ve teknik hesaplamalarda saniye, günlük zaman planlamasında saat kullanılır.",
  },
  [pairKey("zaman", "min", "h")]: {
    sectorNote:
      "Spor, mutfak ve toplantı süresi gibi günlük planlamalarda dakika, uzun süreçlerde saat tercih edilir.",
  },
  [pairKey("alan", "ft²", "m²")]: {
    realWorldValues: [
      { label: "Ortalama 2+1 daire (net alan)", value: 90, anchorUnit: "m²" },
      { label: "ABD ilanında 1.000 sq ft daire", value: 1000, anchorUnit: "ft²" },
      { label: "Standart otopark yeri (2,5 × 5 m)", value: 12.5, anchorUnit: "m²" },
    ],
    where:
      "Fit kare (sq ft); ABD, Kanada ve Birleşik Krallık'ta ev ve ofis ilanlarında, döşeme ve boya ambalajlarındaki kaplama alanında kullanılır. 1 ft² tam olarak 0,09290304 m²'dir; kabaca 1 m² ≈ 10,76 ft².",
    mistakes: [
      "Alan birimleri karesiyle çevrilir: 1 feet 0,3048 m olsa da 1 fit kare 0,3048 değil 0,0929 m²'dir. Uzunluk katsayısını alana uygulamak 3 kat hata yapar.",
      "Türkiye'deki ilanlarda brüt ve net m² farklıdır (brüt duvarları ve ortak alan payını içerir); ABD'deki sq ft de çoğunlukla dış duvarlardan ölçülür. Karşılaştırırken aynı türü kullanın.",
    ],
  },
  [pairKey("alan", "dekar", "dönüm")]: {
    sectorNote:
      "Türkiye'de tarım arazisi alım satımında ve tapu kayıtlarında dönüm ve dekar birbirinin yerine kullanılan resmi birimlerdir.",
    where:
      "Bugünkü (metrik) dönüm ile dekar aynı büyüklüktür: ikisi de 1.000 m². Tarım destekleri ve verim istatistikleri dekar başına, köydeki tarla alım satımı ise çoğunlukla dönüm üzerinden konuşulur.",
    mistakes: [
      "Eski kayıtlardaki \"eski dönüm\" 1.000 m² değil, yaklaşık 919 m²'dir (40 × 40 arşın). Eski tapu ve miras belgelerinde hangi dönümün kastedildiğine bakın.",
      "10 dönüm (dekar) 1 hektardır; uluslararası raporlarda ve AB destek belgelerinde hektar kullanılır.",
    ],
  },
  [pairKey("alan", "dönüm", "ha")]: {
    sectorNote:
      "Tarım ve orman arazisi büyüklüğü Türkiye'de dönüm, uluslararası raporlamada hektar cinsinden ifade edilir.",
  },
  [pairKey("guc", "kW", "hp")]: {
    realWorldValues: [
      { label: "Küçük binek otomobil motoru (tipik)", value: 100, anchorUnit: "hp" },
      { label: "Ev tipi elektrikli süpürge", value: 2, anchorUnit: "kW" },
      { label: "Orta boy tarım traktörü", value: 75, anchorUnit: "hp" },
    ],
    where:
      "Beygirgücü; araç ilanlarında, tekne motorlarında ve traktörlerde; kilovat ise elektrik motorlarında, jeneratörlerde, elektrikli araçlarda ve teknik belgelerde kullanılır. Bu sayfadaki beygirgücü metrik beygirgücüdür (PS): 1 hp = 735,49875 W.",
    mistakes: [
      "Metrik beygirgücü (PS, 735,5 W) ile ABD'nin mekanik beygirgücü (HP, 745,7 W) arasında yaklaşık %1,4 fark vardır; ABD kaynaklı motor değerleri için mekanik beygirgücü çeviricisini kullanın.",
      "kW güçtür, kWh enerjidir: 2 kW'lık bir cihaz 1 saat çalışınca 2 kWh elektrik harcar.",
      "Kafadan hesap için kW'ı 1,36 ile çarpın (100 kW ≈ 136 hp); ters yönde hp'yi 0,735 ile çarpın.",
    ],
  },
  [pairKey("alan", "dönüm", "m²")]: {
    realWorldValues: [
      { label: "Bir evlek", value: 250, anchorUnit: "m²" },
      { label: "Futbol sahası (105 × 68 m)", value: 7140, anchorUnit: "m²" },
      { label: "1 hektar", value: 10000, anchorUnit: "m²" },
    ],
    where:
      "Dönüm; tarla, bağ, bahçe ve sera ilanlarında, köy arazilerinin alım satımında ve tarım kredisi başvurularında kullanılır. İmarlı arsa ve konut ise metrekare ile satılır. Bugünkü dönüm 1.000 m²'dir ve dekarla aynıdır.",
    mistakes: [
      "Eski tapu kayıtlarındaki \"eski dönüm\" yaklaşık 919 m²'dir; 1.000 m² ile hesaplamak her dönümde 80 m² fazla çıkarır.",
      "Tarlanın dönümü ile üzerine yapılabilecek bina alanı farklıdır; inşaat alanı imar durumundaki emsal ve TAKS oranlarına göre hesaplanır.",
    ],
  },
  [pairKey("enerji", "kcal", "kJ")]: {
    realWorldValues: [
      { label: "Yetişkin için günlük referans alım", value: 2000, anchorUnit: "kcal" },
      { label: "1 gram yağ", value: 9, anchorUnit: "kcal" },
      { label: "1 gram alkol", value: 7, anchorUnit: "kcal" },
      { label: "1 gram protein veya karbonhidrat", value: 4, anchorUnit: "kcal" },
    ],
    where:
      "Gıda etiketlerindeki besin değeri tablosunda enerji hem kJ hem kcal olarak yazılır (örneğin \"1650 kJ / 394 kcal\"). Diyet ve spor uygulamaları çoğunlukla kcal kullanır. 1 kcal tam olarak 4,184 kJ'dir.",
    mistakes: [
      "Günlük dilde \"kalori\" denen şey aslında kilokaloridir: bir elmanın \"80 kalorisi\" 80 kcal, yani 80.000 kaloridir. Etiketteki büyük harfli \"Cal\" da kcal demektir.",
      "Etikette önce kJ yazdığı için kJ değerini kcal sanmak dört kat hatalı sonuç verir: 1650 kJ, 394 kcal'dir.",
      "Değerler genellikle 100 g ya da 100 mL içindir; porsiyon başına hesap için porsiyon gramajıyla oranlayın.",
    ],
  },
  [pairKey("enerji", "J", "cal")]: {
    realWorldValues: [
      {
        label: "Kalori-joule bilimsel sabiti (1 kalori)",
        value: 1,
        anchorUnit: "cal",
      },
    ],
  },
  [pairKey("enerji", "kWh", "Wh")]: {
    realWorldValues: [
      {
        label: "Türkiye'de ortalama hane günlük elektrik tüketimi",
        value: 10,
        anchorUnit: "kWh",
      },
    ],
  },
  [pairKey("sicaklik", "K", "C")]: {
    realWorldValues: [
      { label: "Mutlak sıfır noktası", value: 0, anchorUnit: "K" },
      { label: "Oda sıcaklığı", value: 20, anchorUnit: "C" },
      { label: "İnsan vücut sıcaklığı", value: 37, anchorUnit: "C" },
      { label: "Suyun deniz seviyesinde kaynama noktası", value: 100, anchorUnit: "C" },
    ],
    where:
      "Kelvin; fizik ve kimya hesaplarında (gaz kanunları, termodinamik) ve LED ampul ile ekranların renk sıcaklığında karşına çıkar: 2700 K sıcak beyaz, 4000 K nötr beyaz, 6500 K gün ışığı tonudur. K = °C + 273,15.",
    mistakes: [
      "\"Derece Kelvin\" denmez, yalnızca kelvin (K) denir; derece işareti kullanılmaz.",
      "Sıcaklık farkı iki ölçekte aynıdır: 10 °C artış 10 K artıştır. 273,15 yalnızca sıcaklığın kendisini çevirirken eklenir.",
      "Ampul kutusundaki 6500 K ışığın rengini anlatır, ampulün ısısını değil.",
    ],
  },
  [pairKey("uzunluk", "m", "yd")]: {
    realWorldValues: [
      {
        label: "Amerikan futbolu sahası uzunluğu",
        value: 91.44,
        anchorUnit: "m",
      },
    ],
  },
  [pairKey("uzunluk", "ft", "in")]: {
    sectorNote:
      "Marangozluk ve inşaatta sıkça kullanılan İngiliz ölçü biriminde 1 fit tam olarak 12 inçe eşittir.",
  },
};

export function getFlagshipPairInsight(
  category: string,
  fromUnit: string,
  toUnit: string
): FlagshipPairInsight | undefined {
  return insights[pairKey(category, fromUnit, toUnit)];
}
