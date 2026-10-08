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
    realWorldValues: [
      { label: "Paket kuru makarna", value: 500, anchorUnit: "g" },
      { label: "Paket öğütülmüş kahve", value: 250, anchorUnit: "g" },
      { label: "1 litre suyun kütlesi (yaklaşık)", value: 1, anchorUnit: "kg" },
    ],
    mistakes: [
      "Türkçede ondalık ayırıcı virgüldür: 1,5 kg bir buçuk kilogramdır; 1.500 g ise bin beş yüz gramdır. İngilizce kaynaklardaki \"1.5 kg\" yine bir buçuk kilogram demektir.",
      "Grama çevirmek için 1.000 ile çarpılır, kilograma çevirmek için 1.000'e bölünür; 250 g, 0,25 kg'dır.",
    ],
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
    realWorldValues: [
      { label: "Standart iç kapı yüksekliği", value: 210, anchorUnit: "cm" },
      { label: "Çalışma masası yüksekliği (tipik)", value: 75, anchorUnit: "cm" },
      { label: "Yetişkin boyu örneği", value: 1.75, anchorUnit: "m" },
    ],
    mistakes: [
      "Boy yazarken ondalık virgülü karıştırmayın: 1,75 m = 175 cm'dir; \"1,75 cm\" yazmak bir buçuk santimetre demektir.",
      "Metreden santimetreye 100 ile çarpılır; alan (m² → cm²) çevirirken 10.000 ile çarpılır.",
    ],
  },
  [pairKey("uzunluk", "cm", "mm")]: {
    sectorNote:
      "Hassas mühendislik ve teknik çizimlerde milimetre, günlük ölçümlerde santimetre tercih edilir.",
  },
  [pairKey("uzunluk", "km", "m")]: {
    sectorNote:
      "Şehirler arası mesafelerde kilometre, saha/bina ölçümlerinde metre kullanılır.",
    realWorldValues: [
      { label: "Atletizm pisti bir tur", value: 400, anchorUnit: "m" },
      { label: "İstanbul Boğazı'nın en dar yeri (yaklaşık)", value: 700, anchorUnit: "m" },
      { label: "Maraton", value: 42.195, anchorUnit: "km" },
    ],
  },
  [pairKey("kutle", "g", "mg")]: {
    sectorNote:
      "Eczacılık ve laboratuvar ölçümlerinde miligram, mutfak tariflerinde gram tercih edilir.",
    where:
      "Miligram; ilaç kutularında bir tabletteki etken madde miktarında, gıda takviyelerinin ve besin değeri tablolarının vitamin-mineral satırlarında karşına çıkar. 1 g = 1.000 mg.",
    mistakes: [
      "Miligram (mg) ile mikrogram (µg veya mcg) arasında 1.000 kat fark vardır; özellikle vitamin ve ilaç etiketlerinde birimi dikkatle okuyun.",
      "Eski ABD kaynaklarındaki \"gr\" gram değil, \"grain\" olabilir: 1 grain yaklaşık 64,8 mg'dır.",
      "İlaç dozları için bu sayfayı değil, ilacın prospektüsünü ve hekim ya da eczacının talimatını esas alın.",
    ],
  },
  [pairKey("guc", "BTU/h", "W")]: {
    realWorldValues: [
      { label: "9.000 BTU klima (soğutma kapasitesi)", value: 9000, anchorUnit: "BTU/h" },
      { label: "12.000 BTU klima", value: 12000, anchorUnit: "BTU/h" },
      { label: "18.000 BTU klima", value: 18000, anchorUnit: "BTU/h" },
      { label: "24.000 BTU klima", value: 24000, anchorUnit: "BTU/h" },
    ],
    where:
      "BTU/saat; Türkiye'de en çok klimaların soğutma ve ısıtma kapasitesinde karşına çıkar (\"9.000 BTU klima\" aslında 9.000 BTU/saattir). Teknik kataloglar aynı kapasiteyi kW olarak da verir: 1 BTU/saat ≈ 0,293 W.",
    mistakes: [
      "BTU klimanın verdiği soğutma gücüdür, çektiği elektrik değildir: 9.000 BTU (yaklaşık 2,6 kW) bir klima, enerji verimliliğine (EER/SEER) bağlı olarak bunun yaklaşık üçte biri kadar elektrik gücü çeker.",
      "Klimalardaki \"1 ton\" 12.000 BTU/saat demektir; ağırlıkla ilgisi yoktur.",
      "Odaya uygun BTU yalnızca metrekareyle değil, cephe, yalıtım, kat ve kişi sayısıyla da değişir; satıcının keşif hesabı daha doğru sonuç verir.",
    ],
  },
  [pairKey("guc", "kW", "W")]: {
    realWorldValues: [
      { label: "LED ampul (tipik)", value: 9, anchorUnit: "W" },
      { label: "Su ısıtıcısı (kettle)", value: 2000, anchorUnit: "W" },
      { label: "Dizüstü bilgisayar şarj adaptörü (tipik)", value: 65, anchorUnit: "W" },
    ],
    mistakes: [
      "kW güçtür, kWh enerjidir: 2.000 W'lık su ısıtıcısı 6 dakika çalışınca 0,2 kWh harcar.",
      "Aynı anda çalışan cihazların gücü toplanır; toplam güç sigortanın taşıyabileceğini aşarsa sigorta atar.",
    ],
  },
  [pairKey("elektrik", "A", "mA")]: {
    realWorldValues: [
      { label: "Kırmızı LED'in tipik çalışma akımı", value: 20, anchorUnit: "mA" },
      { label: "Hızlı olmayan telefon şarj aleti (5 V)", value: 2, anchorUnit: "A" },
      { label: "Evlerde yaygın priz sigortası", value: 16, anchorUnit: "A" },
    ],
    mistakes: [
      "mA akımdır, mAh ise batarya kapasitesidir: 5.000 mAh batarya 500 mA çekilirse yaklaşık 10 saat dayanır.",
      "Şarj aletindeki A değeri en fazla verebileceği akımdır; cihaz ihtiyacı kadarını çeker.",
    ],
  },
  [pairKey("kuvvet", "kgf", "N")]: {
    realWorldValues: [
      { label: "1 kg kütlenin Dünya'daki ağırlığı", value: 1, anchorUnit: "kgf" },
      { label: "Ortalama bir elmanın ağırlığı (yaklaşık)", value: 1, anchorUnit: "N" },
    ],
    where:
      "Kilogram-kuvvet eski mühendislik belgelerinde, askı ve halat yük sınırlarında ve el dinamometrelerinde; newton ise fizik derslerinde ve güncel teknik belgelerde kullanılır. 1 kgf tam olarak 9,80665 N'dir.",
    mistakes: [
      "Kilogram kütledir, kilogram-kuvvet kuvvettir. 1 kg kütle Ay'da da 1 kg'dır, ama ağırlığı yaklaşık 1,6 N'a düşer.",
      "Kafadan hesapta 1 kgf ≈ 10 N almak %2 fazla verir; hassas hesapta 9,81 kullanın.",
    ],
  },
  [pairKey("aci", "°", "rad")]: {
    realWorldValues: [
      { label: "Dik açı", value: 90, anchorUnit: "°" },
      { label: "Yarım tur", value: 180, anchorUnit: "°" },
      { label: "Tam tur", value: 360, anchorUnit: "°" },
      { label: "1 radyan", value: 1, anchorUnit: "rad" },
    ],
    where:
      "Derece günlük hayatta, haritada ve yapıda; radyan ise matematik, fizik ve programlamada (trigonometrik fonksiyonlar) kullanılır. π radyan = 180°, 1 radyan ≈ 57,2958°.",
    mistakes: [
      "Hesap makinesinin DEG/RAD modunu kontrol edin: sin 30 derece modunda 0,5, radyan modunda yaklaşık −0,988 çıkar.",
      "Excel ve çoğu programlama dilinde SIN, COS fonksiyonları radyan bekler; dereceyi önce RADIANS() ya da π/180 ile çevirin.",
    ],
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
    realWorldValues: [
      { label: "Küçük su şişesi", value: 500, anchorUnit: "mL" },
      { label: "Teneke içecek kutusu", value: 330, anchorUnit: "mL" },
      { label: "Tariflerdeki su bardağı", value: 200, anchorUnit: "mL" },
      { label: "Damacana", value: 19, anchorUnit: "L" },
    ],
    mistakes: [
      "1 mL = 1 cm³ = 1 cc'dir; şırınga ve motor hacimlerindeki \"cc\" mililitreyle aynıdır.",
      "Litre hacimdir, ağırlık değildir: 1 litre su yaklaşık 1 kg gelir ama 1 litre zeytinyağı yaklaşık 0,92 kg, 1 litre bal yaklaşık 1,4 kg gelir.",
    ],
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
      { label: "CD kapasitesi", value: 700, anchorUnit: "MB" },
      { label: "Tek katmanlı DVD kapasitesi", value: 4.7, anchorUnit: "GB" },
      { label: "Akıllı telefon fotoğrafı (12 MP, JPEG, tipik)", value: 3, anchorUnit: "MB" },
    ],
    where: "Veri birimleri; telefon ve bilgisayar depolamasında, mobil internet paketlerinde (GB kota), dosya ve fotoğraf boyutlarında, bulut depolama planlarında karşına çıkar. Bu sayfada 1 GB = 1.000 MB, 1 TB = 1.000 GB (ondalık, SI) kabul edilir; disk üreticileri de bu tanımı kullanır.",
    mistakes: [
      "Windows diskleri ikili birimle (GiB) gösterir ama \"GB\" yazar: kutusunda 1 TB yazan disk Windows'ta yaklaşık 931 GB görünür. Disk eksik değildir, birim farklıdır (1 GiB = 1.073.741.824 bayt).",
      "Megabit (Mb) ile megabayt (MB) farklıdır: 1 bayt 8 bittir. 100 Mbps internet en fazla saniyede 12,5 MB indirir.",
      "Telefonda \"128 GB\" depolamanın bir kısmını işletim sistemi kullanır; kullanılabilir alan her zaman daha azdır.",
    ],
  },
  [pairKey("veri", "TB", "GB")]: {
    realWorldValues: [
      { label: "Yaygın SSD boyutu", value: 512, anchorUnit: "GB" },
      { label: "Harici disk", value: 2, anchorUnit: "TB" },
      { label: "Blu-ray disk (çift katman)", value: 50, anchorUnit: "GB" },
    ],
    where: "Veri birimleri; telefon ve bilgisayar depolamasında, mobil internet paketlerinde (GB kota), dosya ve fotoğraf boyutlarında, bulut depolama planlarında karşına çıkar. Bu sayfada 1 GB = 1.000 MB, 1 TB = 1.000 GB (ondalık, SI) kabul edilir; disk üreticileri de bu tanımı kullanır.",
    mistakes: [
      "Windows diskleri ikili birimle (GiB) gösterir ama \"GB\" yazar: kutusunda 1 TB yazan disk Windows'ta yaklaşık 931 GB görünür. Disk eksik değildir, birim farklıdır (1 GiB = 1.073.741.824 bayt).",
      "Megabit (Mb) ile megabayt (MB) farklıdır: 1 bayt 8 bittir. 100 Mbps internet en fazla saniyede 12,5 MB indirir.",
      "Telefonda \"128 GB\" depolamanın bir kısmını işletim sistemi kullanır; kullanılabilir alan her zaman daha azdır.",
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
    realWorldValues: [
      { label: "Bir futbol maçı (normal süre)", value: 90, anchorUnit: "min" },
      { label: "İş Kanunu'na göre haftalık en fazla normal çalışma", value: 45, anchorUnit: "h" },
    ],
    mistakes: [
      "Ondalık saat dakika değildir: 1,5 saat 1 saat 50 dakika değil, 1 saat 30 dakikadır; 2,25 saat 2 saat 15 dakikadır.",
      "Mesai ve fatura hesaplarında dakikayı saate çevirmek için 60'a bölün: 135 dakika = 2,25 saat.",
    ],
  },
  [pairKey("zaman", "day", "h")]: {
    realWorldValues: [
      { label: "Bir hafta", value: 168, anchorUnit: "h" },
      { label: "30 günlük ay", value: 30, anchorUnit: "day" },
      { label: "Bir yıl (365 gün)", value: 365, anchorUnit: "day" },
    ],
    mistakes: [
      "Takvim günü ile iş günü farklıdır: \"10 iş günü\" hafta sonları ve resmî tatiller hariç sayılır, takvimde 2 haftadan uzun sürebilir.",
      "Türkiye 2016'dan beri yıl boyu aynı saati (UTC+3) kullanır, ama yaz saati uygulayan ülkelerde saat değişen gün 23 ya da 25 saat sürer.",
    ],
  },
  [pairKey("uzunluk", "nmi", "km")]: {
    realWorldValues: [
      { label: "Karasuları genişliği (Karadeniz ve Akdeniz'de Türkiye)", value: 12, anchorUnit: "nmi" },
      { label: "Münhasır ekonomik bölgenin en fazla genişliği", value: 200, anchorUnit: "nmi" },
      { label: "İstanbul Boğazı'nın uzunluğu (yaklaşık)", value: 31, anchorUnit: "km" },
    ],
    where:
      "Deniz mili; denizcilikte, havacılıkta, deniz hukukunda (karasuları) ve seyir haritalarında kullanılır. 1 deniz mili tam olarak 1.852 metredir ve yaklaşık bir enlem dakikasına karşılık gelir; bu yüzden haritada mesafe ölçmek kolaydır.",
    mistakes: [
      "Deniz mili (1,852 km) kara milinden (1,609 km) uzundur; ikisi farklı birimdir.",
      "Hız birimi knot, saatte bir deniz milidir; \"deniz mili/saat\" ile knot aynı şeydir.",
    ],
  },
  [pairKey("veri", "Mbit", "MB")]: {
    realWorldValues: [
      { label: "100 Mbps internetin en yüksek indirme hızı (saniyede)", value: 100, anchorUnit: "Mbit" },
      { label: "1 GB'lık dosyanın boyutu", value: 1000, anchorUnit: "MB" },
    ],
    where:
      "İnternet paketlerinin hızı megabit/saniye (Mbps) ile, indirme programlarının gösterdiği hız ve dosya boyutları ise megabayt (MB) ile verilir. 1 bayt 8 bit olduğu için 8 Mbit = 1 MB'tır.",
    mistakes: [
      "100 Mbps internet saniyede 100 MB değil, en fazla 12,5 MB indirir; 1 GB'lık dosya ideal koşulda yaklaşık 80 saniye sürer.",
      "Küçük b bit, büyük B bayttır: Mb ve MB aynı şey değildir.",
      "Gerçek indirme hızı protokol yükü, Wi-Fi ve sunucu nedeniyle paket hızının altında kalır; %10-20 düşük görmek olağandır.",
    ],
  },
  [pairKey("hacim", "sb", "yk")]: {
    realWorldValues: [
      { label: "Tariflerdeki 1 su bardağı", value: 1, anchorUnit: "sb" },
      { label: "Yarım su bardağı", value: 0.5, anchorUnit: "sb" },
    ],
    where:
      "Su bardağı ve yemek kaşığı Türk yemek tariflerinin temel ölçüleridir. Bu sayfada su bardağı 200 mL, yemek kaşığı 15 mL kabul edilir; yani 1 su bardağı yaklaşık 13 yemek kaşığıdır.",
    mistakes: [
      "Çay bardağı su bardağı değildir: çay bardağı yaklaşık yarısı kadardır. Tarifte hangisinin yazdığına dikkat edin.",
      "ABD tariflerindeki \"cup\" 240 mL'dir, Türk su bardağından (200 mL) %20 büyüktür.",
      "Un gibi kuru malzemede bardak ve kaşık ölçüsü malzemenin ne kadar sıkıştırıldığına göre değişir; hassas tariflerde tartı kullanın.",
    ],
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
      { label: "Akıllı telefon bataryası (tipik)", value: 15, anchorUnit: "Wh" },
      { label: "Dizüstü bilgisayar bataryası (tipik)", value: 50, anchorUnit: "Wh" },
      { label: "2.000 W su ısıtıcısının 3 dakikası", value: 100, anchorUnit: "Wh" },
      { label: "Elektrikli otomobil bataryası (tipik)", value: 60, anchorUnit: "kWh" },
    ],
    where:
      "Kilovatsaat elektrik faturasında ve beyaz eşyaların enerji etiketindeki yıllık tüketimde; vatsaat ise powerbank, dizüstü ve elektrikli bisiklet bataryalarında karşına çıkar. Tüketim = güç × süre: 2.000 W'lık bir cihaz yarım saatte 1 kWh harcar.",
    mistakes: [
      "kW güç, kWh enerjidir; faturada ödenen kWh'dir. Cihazın etiketindeki W değerini çalıştığı saatle çarpmadan tüketim bulunmaz.",
      "Powerbank üzerindeki mAh enerji değildir: 20.000 mAh × 3,7 V ≈ 74 Wh. Uçakta kabin bagajında 100 Wh'e kadar powerbank'a genellikle izin verilir.",
    ],
  },
  [pairKey("basinc", "atm", "bar")]: {
    realWorldValues: [
      { label: "Deniz seviyesinde hava basıncı", value: 1, anchorUnit: "atm" },
      { label: "10 metre su altında (mutlak basınç)", value: 2, anchorUnit: "atm" },
      { label: "Everest zirvesinde hava basıncı (yaklaşık)", value: 0.33, anchorUnit: "atm" },
    ],
    where:
      "Atmosfer; fizik ve kimya derslerinde, dalışta (her 10 metre derinlik yaklaşık 1 atm ekler) ve hava basıncı karşılaştırmalarında kullanılır. 1 atm tam olarak 101.325 Pa, yani 1,01325 bar'dır; ikisi birbirine çok yakındır ama aynı değildir.",
    mistakes: [
      "\"Teknik atmosfer\" (at, 1 kgf/cm²) standart atmosferden farklıdır: 1 at ≈ 0,981 bar. Eski makine kataloglarında \"atü\" ve \"at\" bu birimi gösterir.",
      "Gösterge basıncı atmosferi saymaz: 1 bar gösteren bir tank içinde yaklaşık 2 bar (mutlak) basınç vardır.",
    ],
  },
  [pairKey("basinc", "mmHg", "Pa")]: {
    realWorldValues: [
      { label: "Tansiyonda sık verilen referans değer (büyük)", value: 120, anchorUnit: "mmHg" },
      { label: "Tansiyonda sık verilen referans değer (küçük)", value: 80, anchorUnit: "mmHg" },
      { label: "Deniz seviyesinde hava basıncı", value: 760, anchorUnit: "mmHg" },
    ],
    where:
      "Milimetre cıva; tansiyon aletlerinde ve eski cıvalı barometrelerde kullanılır. Meteoroloji bugün hektopaskal (hPa) kullanır: 760 mmHg = 1.013,25 hPa. 1 mmHg ≈ 133,32 Pa.",
    mistakes: [
      "Türkiye'de tansiyon \"12'ye 8\" diye santimetre cıva ile söylenir; aletteki değer milimetredir: 12/8 = 120/80 mmHg.",
      "Hava durumundaki 1013 hPa (hektopaskal) 1013 Pa değildir; 101.300 Pa'dır.",
    ],
  },
  [pairKey("hiz", "knot", "km/h")]: {
    realWorldValues: [
      { label: "Konteyner gemisi seyir hızı (tipik)", value: 20, anchorUnit: "knot" },
      { label: "Yolcu uçağı seyir hızı (yaklaşık)", value: 480, anchorUnit: "knot" },
      { label: "Fırtına (Beaufort 9) alt sınırı", value: 41, anchorUnit: "knot" },
    ],
    where:
      "Knot; denizcilikte tekne ve gemi hızında, havacılıkta uçak hızında ve rüzgâr raporlarında kullanılır. 1 knot saatte 1 deniz milidir: tam olarak 1,852 km/s.",
    mistakes: [
      "Knot zaten saatte deniz mili demektir; \"knot/saat\" denmez.",
      "Knot, mph değildir: 1 knot = 1,852 km/s, 1 mph = 1,609 km/s.",
      "Rüzgâr hızı kaynağa göre knot, km/s ya da m/s verilir: 20 knot ≈ 37 km/s ≈ 10,3 m/s.",
    ],
  },
  [pairKey("kutle", "ct", "g")]: {
    realWorldValues: [
      { label: "1 karatlık pırlanta", value: 1, anchorUnit: "ct" },
      { label: "Yarım karatlık (50 puan) taş", value: 0.5, anchorUnit: "ct" },
      { label: "1 gram", value: 1, anchorUnit: "g" },
    ],
    where:
      "Karat (ct); pırlanta, yakut, zümrüt gibi değerli taşların ağırlığında kullanılır. 1 karat tam olarak 0,2 gramdır ve 100 puana (point) bölünür: 0,25 ct, \"25 puanlık\" taş demektir.",
    mistakes: [
      "Taşların karatı ağırlıktır; altının \"ayarı\" ise saflıktır. İngilizcede ikisine de karat dendiği için 22 ayar altın ile 22 karatlık taş karıştırılır; aralarında hiçbir ilişki yoktur.",
      "Karat ağırlıktır, boyut değildir: farklı taşlar farklı yoğunlukta olduğu için aynı karattaki iki taşın büyüklüğü farklı olabilir.",
    ],
  },
  [pairKey("alan", "ha", "m²")]: {
    realWorldValues: [
      { label: "Futbol sahası (105 × 68 m)", value: 7140, anchorUnit: "m²" },
      { label: "100 × 100 m'lik kare alan", value: 10000, anchorUnit: "m²" },
      { label: "Bir dönüm", value: 1000, anchorUnit: "m²" },
    ],
    where:
      "Hektar; tarım ve orman arazilerinde, AB tarım desteklerinde, şehir planlamada ve park/kampüs alanlarında kullanılır. 1 hektar 10.000 m², yani 10 dönümdür.",
    mistakes: [
      "1 hektar 100 × 100 metrelik alandır; 100 metrekare değildir.",
      "Alan çevirirken kenar uzunluğu değil alan çarpılır: 2 hektarlık kare arazinin kenarı 200 m değil, yaklaşık 141 m'dir.",
    ],
  },
  [pairKey("hacim", "yk", "mL")]: {
    realWorldValues: [
      { label: "1 yemek kaşığı (ölçü kaşığı)", value: 1, anchorUnit: "yk" },
      { label: "Tariflerdeki su bardağı", value: 200, anchorUnit: "mL" },
    ],
    where:
      "Yemek kaşığı tariflerde ve şurup gibi sıvı ilaçların kullanım talimatında karşına çıkar. Bu sayfadaki yemek kaşığı standart ölçü kaşığıdır: 15 mL; çay kaşığı 5 mL'dir.",
    mistakes: [
      "Evdeki sofra kaşıkları standart değildir ve 7-20 mL arasında değişebilir; ilaç dozunu ölçerken kutudan çıkan ölçü kaşığını ya da şırıngayı kullanın.",
      "Kaşık hacim ölçüsüdür: aynı kaşık un, şeker ve tuz farklı gram gelir. Gram yazan tarifte tartı kullanın.",
      "ABD tariflerindeki tablespoon 14,8 mL'dir; fark küçüktür ama büyük miktarlarda birikir.",
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
      { label: "Amerikan futbolu sahası uzunluğu", value: 91.44, anchorUnit: "m" },
      { label: "Golfte uzun bir ilk vuruş (drive)", value: 250, anchorUnit: "yd" },
      { label: "Bir top kumaş (tipik)", value: 50, anchorUnit: "yd" },
    ],
    where:
      "Yarda; golfte mesafelerde, Amerikan futbolunda, ABD ve Birleşik Krallık'ta kumaş satışında ve İngiltere'de kısa yol mesafelerinde kullanılır. 1 yarda tam olarak 0,9144 metredir.",
    mistakes: [
      "Yarda metreye yakındır ama %8,6 kısadır: 100 yarda 91,44 metredir; uzun mesafede fark büyür.",
      "Eski Türk ölçüsü arşın yarda değildir: çarşı arşını yaklaşık 68 cm'dir.",
    ],
  },
  [pairKey("uzunluk", "ft", "in")]: {
    sectorNote:
      "Marangozluk ve inşaatta sıkça kullanılan İngiliz ölçü biriminde 1 fit tam olarak 12 inçe eşittir.",
    realWorldValues: [
      { label: "6 feet boy", value: 6, anchorUnit: "ft" },
      { label: "ABD'de standart kontrplak levha boyu", value: 8, anchorUnit: "ft" },
    ],
    mistakes: [
      "Feet onluk değil on ikilik bölünür: 5,5 feet 5 feet 6 inçtir (5'6\"), 5'5\" değildir.",
      "Tek tırnak (') feet, çift tırnak (\") inç demektir: 6'2\" = 6 feet 2 inç = 74 inç.",
    ],
  },
  [pairKey("hiz", "m/s", "km/h")]: {
    realWorldValues: [
      { label: "Yürüme hızı (ortalama)", value: 1.4, anchorUnit: "m/s" },
      { label: "100 m dünya rekorunun ortalama hızı (9,58 s)", value: 10.44, anchorUnit: "m/s" },
      { label: "Kuvvetli rüzgâr", value: 10, anchorUnit: "m/s" },
      { label: "Havada ses hızı (20 °C)", value: 343, anchorUnit: "m/s" },
    ],
    where:
      "Metre/saniye; meteorolojide rüzgâr hızında, fizik problemlerinde ve atletizm analizlerinde; km/saat ise trafikte ve günlük hayatta kullanılır. Çevirmek için m/s × 3,6 = km/saat.",
    mistakes: [
      "Türkçe metinlerde \"km/s\" çoğu zaman km/saat anlamında yazılır, ama bilimsel gösterimde km/s kilometre/saniyedir. Bu sayfada km/saat km/h olarak gösterilir.",
      "km/saatten m/s'ye geçerken 3,6 ile çarpılmaz, bölünür: 90 km/saat = 25 m/s.",
    ],
  },
  [pairKey("uzunluk", "mm", "in")]: {
    realWorldValues: [
      { label: "Kulaklık jakı", value: 3.5, anchorUnit: "mm" },
      { label: "Kredi kartı kalınlığı", value: 0.76, anchorUnit: "mm" },
      { label: "1/4 inç matkap ucu", value: 0.25, anchorUnit: "in" },
      { label: "Yaz lastiğinde yasal en az diş derinliği", value: 1.6, anchorUnit: "mm" },
    ],
    where:
      "Milimetre–inç dönüşümü hırdavatta (vida, matkap ucu, anahtar), bisiklet parçalarında, tesisatta ve ABD'den gelen ürünlerin ölçülerinde karşına çıkar. 1 inç tam olarak 25,4 mm'dir.",
    mistakes: [
      "İnç anahtarlar metrik somunlara tam oturmaz: 1/2 inç (12,7 mm) anahtar 13 mm somunda boşluk yapar ve somunu yuvarlatabilir.",
      "Kesirli inçleri ondalığa çevirin: 1/8 inç = 3,175 mm, 3/16 inç = 4,7625 mm, 5/16 inç = 7,9375 mm.",
    ],
  },
  [pairKey("alan", "km²", "m²")]: {
    realWorldValues: [
      { label: "1 hektar", value: 10000, anchorUnit: "m²" },
      { label: "İstanbul il alanı (yaklaşık)", value: 5461, anchorUnit: "km²" },
    ],
    where:
      "Kilometrekare; il, ülke ve göl yüzölçümlerinde ve nüfus yoğunluğunda (kişi/km²) kullanılır. 1 km² = 1.000.000 m² = 100 hektar = 1.000 dönüm.",
    mistakes: [
      "1 km² 1.000 m² değildir; 1.000 × 1.000 = 1.000.000 m²'dir. Kenar 1.000 kat büyüyünce alan bir milyon kat büyür.",
    ],
  },
  [pairKey("hacim", "m³", "L")]: {
    realWorldValues: [
      { label: "IBC tankı", value: 1000, anchorUnit: "L" },
      { label: "Bir ton suyun hacmi", value: 1, anchorUnit: "m³" },
      { label: "Damacana", value: 19, anchorUnit: "L" },
    ],
    where:
      "Metreküp; su ve doğalgaz sayaçlarında ve faturalarında, hazır beton siparişinde, depo ve havuz hacimlerinde kullanılır. 1 m³ = 1.000 litredir; su faturasındaki \"ton\" da pratikte metreküptür.",
    mistakes: [
      "Hacmi hesaplarken birimleri aynı yapın: 2 m × 1 m × 50 cm'lik bir depo 2 × 1 × 0,5 = 1 m³, yani 1.000 litredir.",
      "Doğalgaz sayacındaki m³ gazın hacmidir; ödenen enerji miktarı bu hacmin gazın ısıl değeriyle çarpılmasıyla bulunur.",
    ],
  },
  [pairKey("alan", "m²", "cm²")]: {
    realWorldValues: [
      { label: "A4 kâğıt (21 × 29,7 cm)", value: 623.7, anchorUnit: "cm²" },
      { label: "60 × 60 cm fayans", value: 3600, anchorUnit: "cm²" },
    ],
    where:
      "Santimetrekare; fayans, kâğıt, kumaş ve küçük yüzeylerin alanında; metrekare ise oda, duvar ve arsa alanında kullanılır. 1 m² = 10.000 cm².",
    mistakes: [
      "m²'den cm²'ye geçerken 100 ile değil 10.000 ile çarpılır (100 × 100).",
      "Fayans hesabında 1 m²'ye 60 × 60 cm fayanstan 2,78 adet düşer; kesim payı için genellikle %10 fazla alınır.",
    ],
  },
};

export function getFlagshipPairInsight(
  category: string,
  fromUnit: string,
  toUnit: string
): FlagshipPairInsight | undefined {
  return insights[pairKey(category, fromUnit, toUnit)];
}
