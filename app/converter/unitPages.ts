import { unitRegistry } from "./unitRegistry";

export type UnitPage = {
  slug: string;
  category: string;
  unit: string;
  name: string;
  symbol: string;
  shortDescription: string;
  historySummary: string;
  measurementSystem: string;
  siEquivalent: string;
  commonUses: string;
};

type UnitDescription = {
  shortDescription: string;
  historySummary: string;
  measurementSystem: string;
  siEquivalent: string;
  commonUses: string;
};

const unitDescriptions: Record<string, UnitDescription> = {
  "metre": {
    shortDescription: "Metre, Uluslararası Birim Sistemi'nde uzunluğun temel birimidir. Günlük yaşamdan mühendisliğe kadar mesafe ve boyut ölçümünde kullanılır.",
    historySummary: "Metre, 18. yüzyılın sonunda evrensel bir ölçü standardı oluşturma amacıyla geliştirildi. Günümüzde tanımı ışığın boşlukta belirli bir zaman aralığında aldığı yola dayanır.",
    measurementSystem: "Uluslararası Birim Sistemi (SI)",
    siEquivalent: "Temel SI uzunluk birimi",
    commonUses: "İnşaat, bilim, üretim, geometri ve genel ölçüm",
  },
  "kilometre": {
    shortDescription: "Kilometre, 1000 metreye eşit bir uzunluk birimidir. Şehirler arası ve coğrafi mesafeleri ifade etmekte kullanılır.",
    historySummary: "Kilometre, metrik sistemin ondalık yapısı içinde metrenin katı olarak yerleşti. Kara yolları ve harita ölçeklerinde standart bir gösterim hâline geldi.",
    measurementSystem: "Uluslararası Birim Sistemi (SI, kat birim)",
    siEquivalent: "1 km = 1000 m",
    commonUses: "Karayolu mesafeleri, coğrafya, haritacılık ve altyapı",
  },
  "santimetre": {
    shortDescription: "Santimetre, metrenin yüzde birine eşit bir uzunluk birimidir. Küçük nesnelerin ve günlük ölçülerin ifade edilmesinde yaygındır.",
    historySummary: "Santimetre, metrik sistemde ondalık alt birim olarak gelişti. Ölçümleri pratik ve hızlı hesaplanabilir hâle getirdiği için geniş kullanım kazandı.",
    measurementSystem: "Uluslararası Birim Sistemi (SI, alt birim)",
    siEquivalent: "1 cm = 0,01 m",
    commonUses: "Mobilya, tekstil, antropometri ve günlük ölçümler",
  },
  "milimetre": {
    shortDescription: "Milimetre, metrenin binde birine eşit bir uzunluk birimidir. Hassas teknik ölçümlerde sık kullanılır.",
    historySummary: "Milimetre, sanayi ve mühendislikte daha küçük toleransların ölçülmesi ihtiyacıyla yaygınlaştı. Özellikle üretim ve çizim standartlarında temel bir alt birim oldu.",
    measurementSystem: "Uluslararası Birim Sistemi (SI, alt birim)",
    siEquivalent: "1 mm = 0,001 m",
    commonUses: "Mekanik üretim, teknik resim, işleme toleransları",
  },
  "fit": {
    shortDescription: "Fit, İngiliz ve Amerikan ölçü sistemlerinde kullanılan bir uzunluk birimidir. Bir uluslararası fit tam olarak 0,3048 metreye eşittir.",
    historySummary: "Fit, eski ölçü geleneklerinde insan ayağına dayalı bir yaklaşımdan doğdu. Farklı bölgesel değerler zamanla bırakıldı ve uluslararası fit 1959'da standartlaştırıldı.",
    measurementSystem: "İngiliz ve ABD ölçü sistemleri",
    siEquivalent: "1 ft = 0,3048 m",
    commonUses: "Mimarlık, bina kotları, havacılık ve saha ölçüleri",
  },
  "inc": {
    shortDescription: "İnç, İngiliz ve Amerikan ölçü sistemlerinde kullanılan kısa bir uzunluk birimidir. Bir inç tam olarak 2,54 santimetreye eşittir.",
    historySummary: "İnç, tarih boyunca insan bedenine dayalı yerel ölçülerden türedi. Modern uluslararası inç 1959 yılından beri tam olarak 25,4 milimetre olarak tanımlanır.",
    measurementSystem: "İngiliz ve ABD ölçü sistemleri",
    siEquivalent: "1 in = 25,4 mm = 2,54 cm",
    commonUses: "Ekran boyutları, borulama, bağlantı elemanları ve teknik kataloglar",
  },
  "yarda": {
    shortDescription: "Yarda, İngiliz ve Amerikan ölçü sistemlerinde kullanılan bir uzunluk birimidir. Bir yarda tam olarak 0,9144 metreye eşittir.",
    historySummary: "Yarda, tarihsel olarak insan adımı ve beden ölçüleriyle ilişkilendirilen bir uzunluk yaklaşımından gelişti. Modern değeri uluslararası anlaşmalarla sabitlendi.",
    measurementSystem: "İngiliz ve ABD ölçü sistemleri",
    siEquivalent: "1 yd = 0,9144 m",
    commonUses: "Spor sahaları, tekstil, peyzaj ve saha planlaması",
  },
  "mil": {
    shortDescription: "Mil, özellikle Amerika Birleşik Devletleri ve Birleşik Krallık'ta kullanılan bir uzunluk birimidir. Bir uluslararası mil 1609,344 metreye eşittir.",
    historySummary: "Milin kökeni Roma dönemindeki bin adımlık mesafe anlayışına uzanır. Modern uluslararası mil 1959 yılında tam olarak 1609,344 metre olarak standartlaştırıldı.",
    measurementSystem: "İngiliz ve ABD ölçü sistemleri",
    siEquivalent: "1 mi = 1609,344 m",
    commonUses: "Karayolu mesafeleri, navigasyon ve saha ölçekleri",
  },
  "metrekare": {
    shortDescription: "Metrekare, alanın SI türetilmiş birimidir. Zemin, kesit ve yüzey hesaplarında temel referans olarak kullanılır.",
    historySummary: "Metrekare, metrenin iki boyutlu uzantısı olarak metrik sistem içinde yerleşti. Yapı, arazi ve mühendislik çizimlerinde standart alan dili hâline geldi.",
    measurementSystem: "Uluslararası Birim Sistemi (SI)",
    siEquivalent: "Temel SI alan birimi",
    commonUses: "Mimarlık, iç mekân, panel yüzeyleri ve kesit alanları",
  },
  "hektar": {
    shortDescription: "Hektar, özellikle arazi ölçümünde kullanılan büyük bir alan birimidir. 1 hektar tam olarak 10000 metrekareye eşittir.",
    historySummary: "Hektar, geniş tarımsal ve coğrafi alanları daha kısa ifade etmek için metrik sistem içinde yaygınlaşmıştır.",
    measurementSystem: "Metrik sistem, SI ile uyumlu",
    siEquivalent: "1 ha = 10000 m²",
    commonUses: "Tarım arazileri, imar planları ve büyük arsa kayıtları",
  },
  "fitkare": {
    shortDescription: "Fitkare, İngiliz ve ABD ölçü sistemlerinde kullanılan bir alan birimidir. Bir kare fit yaklaşık 0,092903 metrekareye eşittir.",
    historySummary: "Fitkare, fit biriminin yapı ve emlak alanındaki yaygın kullanımıyla birlikte yerleşmiştir.",
    measurementSystem: "İngiliz ve ABD ölçü sistemleri",
    siEquivalent: "1 ft² = 0,092903 m²",
    commonUses: "Emlak ilanları, döşeme alanları ve bazı yapı katalogları",
  },
  "metrekup": {
    shortDescription: "Metreküp, hacmin SI türetilmiş birimidir. Büyük hacimler ve teknik kapasiteler için temel referanstır.",
    historySummary: "Metreküp, metrenin üç boyutlu uzantısı olarak bilim ve mühendislikte temel hacim birimi hâline geldi.",
    measurementSystem: "Uluslararası Birim Sistemi (SI)",
    siEquivalent: "Temel SI hacim birimi",
    commonUses: "Depolama hacmi, bina iç hacmi, proses tankları ve akış hesapları",
  },
  "litre": {
    shortDescription: "Litre, sıvı ve kapasiteleri ifade etmek için çok yaygın kullanılan bir hacim birimidir. 1 litre, 0,001 metreküpe eşittir.",
    historySummary: "Litre, metrik sistem içinde günlük kullanım ile teknik ihtiyacı birleştiren pratik bir hacim birimi olarak yaygınlaşmıştır.",
    measurementSystem: "Metrik sistem, SI ile uyumlu",
    siEquivalent: "1 L = 0,001 m³",
    commonUses: "Sıvılar, tank hacimleri, laboratuvar kapları ve günlük ölçüler",
  },
  "mililitre": {
    shortDescription: "Mililitre, litrenin binde birine eşit küçük bir hacim birimidir. Hassas sıvı ölçümlerinde kullanılır.",
    historySummary: "Mililitre, ilaç, laboratuvar ve mutfak ölçülerinde küçük hacimlerin güvenilir biçimde ifade edilmesi için yaygınlaşmıştır.",
    measurementSystem: "Metrik sistem, SI ile uyumlu",
    siEquivalent: "1 mL = 0,000001 m³",
    commonUses: "İlaç dozları, laboratuvar örnekleri ve küçük sıvı hacimleri",
  },
  "kilogram": {
    shortDescription: "Kilogram, Uluslararası Birim Sistemi'nde kütlenin temel birimidir. Ticaret, laboratuvar ve mühendislikte yaygın olarak kullanılır.",
    historySummary: "Kilogram önce su kütlesine, sonra fiziksel bir prototipe dayalıydı. 2019'dan itibaren Planck sabitinin sabitlenmiş değeri üzerinden tanımlanmaktadır.",
    measurementSystem: "Uluslararası Birim Sistemi (SI)",
    siEquivalent: "Temel SI kütle birimi",
    commonUses: "Ticaret, taşıma, laboratuvar ve proses hesapları",
  },
  "gram": {
    shortDescription: "Gram, kilogramın binde birine eşit bir kütle birimidir. Gıda, laboratuvar ve küçük maddesel miktarları ifade etmekte kullanılır.",
    historySummary: "Gram, metrik sistemin erken döneminde su kütlesi temelli yaklaşımlardan gelişti ve daha sonra kilogramın alt birimi olarak standartlaştı.",
    measurementSystem: "Uluslararası Birim Sistemi (SI, alt birim)",
    siEquivalent: "1 g = 0,001 kg",
    commonUses: "Gıda, kimya, eczacılık ve hassas ölçüm",
  },
  "miligram": {
    shortDescription: "Miligram, gramın binde birine eşit çok küçük bir kütle birimidir. İlaç ve laboratuvar ölçümlerinde kritik öneme sahiptir.",
    historySummary: "Miligram, hassas terazilerin ve analitik laboratuvarların gelişmesiyle birlikte özellikle sağlık ve kimya alanlarında öne çıktı.",
    measurementSystem: "Uluslararası Birim Sistemi (SI, alt birim)",
    siEquivalent: "1 mg = 0,000001 kg",
    commonUses: "İlaç dozları, analizler ve hassas formülasyonlar",
  },
  "ton": {
    shortDescription: "Metrik ton, 1000 kilograma eşit büyük bir kütle birimidir. Ağır yüklerin ve endüstriyel miktarların ifade edilmesinde kullanılır.",
    historySummary: "Ton, büyük yükleri ve ticari kütleleri daha kısa ifade etmek için metrik sistem içinde yerleşti. Lojistik ve endüstride yaygın kullanım kazandı.",
    measurementSystem: "Metrik sistem, SI ile uyumlu",
    siEquivalent: "1 t = 1000 kg",
    commonUses: "Lojistik, üretim, hammadde ticareti ve ağır sanayi",
  },
  "pound": {
    shortDescription: "Pound, İngiliz ve Amerikan ölçü sistemlerinde kullanılan bir kütle birimidir. Bir uluslararası pound tam olarak 0,45359237 kilograma eşittir.",
    historySummary: "Pound ve lb sembolü Roma dönemindeki libra biriminden gelir. Modern avoirdupois pound 1959 yılında uluslararası olarak sabitlenmiştir.",
    measurementSystem: "İngiliz ve ABD ölçü sistemleri",
    siEquivalent: "1 lb = 0,45359237 kg",
    commonUses: "Perakende, taşımacılık, beslenme ve endüstriyel kataloglar",
  },
  "ons": {
    shortDescription: "Ons, İngiliz ve Amerikan ölçü sistemlerinde kullanılan küçük bir kütle birimidir. Bir avoirdupois ons 28,349523125 grama eşittir.",
    historySummary: "Ons, tarih boyunca farklı ticari ve tıbbi sistemlerde kullanıldı. Modern avoirdupois ons, pound ile olan 1/16 ilişkisi üzerinden standartlaştı.",
    measurementSystem: "İngiliz ve ABD ölçü sistemleri",
    siEquivalent: "1 oz = 28,349523125 g",
    commonUses: "Paketleme, gıda, mücevher dışı hafif ticari ölçüler",
  },
  "metre-saniye": {
    shortDescription: "Metre/saniye, hızın SI türetilmiş birimidir. Mühendislik ve fizikte temel referans kabul edilir.",
    historySummary: "Metre ve saniyenin birleşiminden türeyen bu gösterim, modern bilimsel hız ölçümünün standart dilidir.",
    measurementSystem: "Uluslararası Birim Sistemi (SI)",
    siEquivalent: "Temel SI hız birimi",
    commonUses: "Akışkanlar, mekanik hareket ve bilimsel ölçümler",
  },
  "kilometre-saat": {
    shortDescription: "Kilometre/saat, kara taşımacılığında yaygın kullanılan pratik bir hız birimidir.",
    historySummary: "Yol ve ulaşım sistemlerinin yaygınlaşmasıyla kilometre/saat gösterimi sürüş ve seyahat için standartlaşmıştır.",
    measurementSystem: "Metrik pratik kullanım",
    siEquivalent: "1 km/h ≈ 0,277778 m/s",
    commonUses: "Araç hızları, trafik işaretleri ve saha ölçümleri",
  },
  "mil-saat": {
    shortDescription: "Mil/saat, özellikle ABD ve Birleşik Krallık uygulamalarında kullanılan bir hız birimidir.",
    historySummary: "Mil ve saat birimlerinin birleşimi, kara ulaşımında Anglo-Amerikan ölçü geleneğinin temel hız dilini oluşturmuştur.",
    measurementSystem: "İngiliz ve ABD ölçü sistemleri",
    siEquivalent: "1 mph = 1,609344 km/h",
    commonUses: "Karayolu hızları, otomotiv ve saha raporları",
  },
  "saniye": {
    shortDescription: "Saniye, zamanın SI temel birimidir. Tüm süre ve hız hesaplarının temelinde yer alır.",
    historySummary: "Modern saniye tanımı atomik geçiş frekansına bağlanarak evrensel ve yüksek hassasiyetli hâle getirilmiştir.",
    measurementSystem: "Uluslararası Birim Sistemi (SI)",
    siEquivalent: "Temel SI zaman birimi",
    commonUses: "Deney süreleri, hareket analizi, veri kayıtları ve zamanlama",
  },
  "dakika": {
    shortDescription: "Dakika, 60 saniyeye eşit pratik bir zaman birimidir.",
    historySummary: "Dakika, günlük planlama ile bilimsel olmayan süre takibinde tarihsel olarak yaygınlaşmış bir ara birimdir.",
    measurementSystem: "SI dışı, SI ile birlikte kullanılan zaman birimi",
    siEquivalent: "1 min = 60 s",
    commonUses: "Toplantılar, kısa süreler, egzersiz ve proses çevrimleri",
  },
  "saat": {
    shortDescription: "Saat, 3600 saniyeye eşit yaygın bir zaman birimidir.",
    historySummary: "Saat birimi, göksel ve mekanik zaman ölçüm geleneklerinden modern takvim ve vardiya sistemlerine taşınmıştır.",
    measurementSystem: "SI dışı, SI ile birlikte kullanılan zaman birimi",
    siEquivalent: "1 h = 3600 s",
    commonUses: "Çalışma süreleri, seyahat, enerji tüketimi ve günlük planlama",
  },
  "pascal": {
    shortDescription: "Pascal, Uluslararası Birim Sistemi'nde basıncın türetilmiş birimidir. 1 Pa = 1 N/m² ilişkisiyle tanımlanır.",
    historySummary: "Birim adını Blaise Pascal'dan alır. Akışkanlar ve basınç çalışmalarındaki bilimsel gelişmelerle birlikte SI içinde standart basınç referansı oldu.",
    measurementSystem: "Uluslararası Birim Sistemi (SI)",
    siEquivalent: "Temel SI basınç birimi, 1 Pa = 1 N/m²",
    commonUses: "Bilimsel hesaplar, malzeme analizi ve referans dönüşümler",
  },
  "kilopascal": {
    shortDescription: "Kilopascal, 1000 pascala eşit bir basınç birimidir. Pratik mühendislikte pascaldan daha okunabilir sonuçlar sağlar.",
    historySummary: "Kilopascal, özellikle saha ölçümleri ve mühendislik belgelerinde sayısal okunabilirliği artırdığı için yaygınlaşmıştır.",
    measurementSystem: "Uluslararası Birim Sistemi (SI, kat birim)",
    siEquivalent: "1 kPa = 1000 Pa",
    commonUses: "HVAC, yapı mühendisliği, lastik basıncı ve proses verileri",
  },
  "bar": {
    shortDescription: "Bar, 100000 pascala eşit bir basınç birimidir. Sanayi ve ekipman göstergelerinde çok yaygın bir pratik gösterimdir.",
    historySummary: "Bar, atmosferik büyüklüklere yakın basınçları daha kısa ifade edebilmek için teknik uygulamalarda yaygınlık kazandı. SI dışı olsa da endüstride güçlü şekilde yaşamaya devam etti.",
    measurementSystem: "SI dışı metrik mühendislik birimi",
    siEquivalent: "1 bar = 100000 Pa",
    commonUses: "Kompresörler, hidrolik, pnömatik ve servis manometreleri",
  },
  "atmosfer": {
    shortDescription: "Atmosfer, Dünya atmosferinin deniz seviyesindeki ortalama basıncına yakın bir referans değere dayanan basınç birimidir. Standart atmosfer olarak da anılır.",
    historySummary: "Atmosfer birimi, barometrik ölçümlerin ve deniz seviyesi referans basıncının teknik ve bilimsel çalışmalarda standart bir karşılaştırma noktası olarak kullanılmasıyla yaygınlaştı. 1954 yılında 10. Genel Ağırlıklar ve Ölçüler Konferansı (CGPM) standart atmosferi tam olarak 101 325 Pa olarak tanımladı.",
    measurementSystem: "SI dışı, meteoroloji ve mühendislikte referans birim",
    siEquivalent: "1 atm = 101 325 Pa (tanımlı değer)",
    commonUses: "Referans koşulları, meteoroloji, vakum ve basınç ölçümleri",
  },
  "psi": {
    shortDescription: "PSI, pound-force per square inch ifadesinin kısaltmasıdır. Anglo-Amerikan teknik sistemlerde kullanılan yaygın bir basınç birimidir.",
    historySummary: "PSI özellikle otomotiv, hidrolik ve saha servis geleneği içinde yerleşti. SI birimleri yaygınlaşsa da birçok ekipman etiketi ve katalogta kullanılmaya devam etmektedir.",
    measurementSystem: "İngiliz ve ABD mühendislik kullanımı",
    siEquivalent: "1 psi = 6894,757293168 Pa",
    commonUses: "Lastik basıncı, hidrolik sistemler ve teknik servis",
  },
  "milimetre-civa": {
    shortDescription: "Milimetre cıva, bir cıva sütununun yüksekliğine dayanan bir basınç birimidir. Tıbbi ve laboratuvar ölçümlerinde tarihsel önem taşır.",
    historySummary: "mmHg, cıvalı manometrelerin yaygın olduğu dönemde yerleşti. Özellikle tansiyon ölçümleri ve vakum/atmosfer referansları için kalıcı bir teknik kullanım alanı oluşturdu.",
    measurementSystem: "SI dışı tarihsel mühendislik ve tıbbi birim",
    siEquivalent: "1 mmHg = 133,322387415 Pa",
    commonUses: "Tansiyon ölçümleri, laboratuvar manometreleri ve vakum referansları",
  },
  "kilogram-kuvvet-santimetrekare": {
    shortDescription: "Kilogram-kuvvet/santimetrekare, kuvvet ve alan ilişkisine dayanan SI dışı bir basınç birimidir. Eski göstergelerde ve bazı servis belgelerinde görülür.",
    historySummary: "Bu birim, kilogram-kuvvet kavramının teknik çizelgelerde yaygın kullanıldığı dönemde özellikle pompa, kazan ve mekanik gösterge dünyasında yerleşti.",
    measurementSystem: "SI dışı metrik mühendislik birimi",
    siEquivalent: "1 kgf/cm² = 98066,5 Pa = 0,980665 bar",
    commonUses: "Eski pompa ve kazan göstergeleri, servis kitapçıkları ve analog cihazlar",
  },
  "joule": {
    shortDescription: "Joule, enerjinin SI türetilmiş birimidir. İş, ısı ve enerji miktarlarını ifade etmek için kullanılır.",
    historySummary: "Joule birimi, mekanik iş ve enerji kavramlarının bilimsel standardizasyonuyla birlikte SI içinde temel enerji referansı hâline gelmiştir.",
    measurementSystem: "Uluslararası Birim Sistemi (SI)",
    siEquivalent: "Temel SI enerji birimi",
    commonUses: "Termodinamik, enerji dengeleri ve bilimsel hesaplar",
  },
  "kilovatsaat": {
    shortDescription: "Kilovat-saat, elektrik tüketiminde yaygın kullanılan bir enerji birimidir.",
    historySummary: "Elektrik sayaçları ve faturalandırma sistemleri nedeniyle kilovat-saat, pratik enerji kullanımının en tanınan birimlerinden biri olmuştur.",
    measurementSystem: "Teknik ve ticari enerji birimi",
    siEquivalent: "1 kWh = 3,6 MJ",
    commonUses: "Elektrik faturaları, batarya kapasitesi ve tüketim karşılaştırmaları",
  },
  "watt": {
    shortDescription: "Watt, gücün SI türetilmiş birimidir. Enerjinin aktarım hızını ifade eder.",
    historySummary: "Watt, endüstri ve elektrik mühendisliğinde güç seviyelerini ifade eden temel standart birim hâline gelmiştir.",
    measurementSystem: "Uluslararası Birim Sistemi (SI)",
    siEquivalent: "Temel SI güç birimi",
    commonUses: "Cihaz gücü, motor etiketleri ve enerji sistemleri",
  },
  "kilowatt": {
    shortDescription: "Kilowatt, 1000 watt’a eşit güç birimidir. Tesisat ve ekipman kapasitesinde çok kullanılır.",
    historySummary: "Kilowatt, watt biriminin büyük güç değerlerinde daha okunabilir kullanımı için mühendislik belgelerinde yaygınlaşmıştır.",
    measurementSystem: "Uluslararası Birim Sistemi (SI, kat birim)",
    siEquivalent: "1 kW = 1000 W",
    commonUses: "Elektrik panoları, HVAC ekipmanı, jeneratör ve makine gücü",
  },
  "santigrat": {
    shortDescription: "Santigrat ölçeği, günlük yaşam ve mühendislikte en yaygın sıcaklık gösterimlerinden biridir.",
    historySummary: "Santigrat ölçeği, suyun donma ve kaynama noktalarına dayalı pratik bir sıcaklık sistemi olarak yerleşti.",
    measurementSystem: "SI ile birlikte kullanılan sıcaklık ölçeği",
    siEquivalent: "Sıcaklık farkında 1 °C = 1 K",
    commonUses: "Hava durumu, HVAC, proses takibi ve günlük sıcaklık değerleri",
  },
  "fahrenhayt": {
    shortDescription: "Fahrenheit, özellikle ABD’de yaygın olan bir sıcaklık ölçeğidir.",
    historySummary: "Fahrenheit ölçeği tarihsel olarak Anglo-Amerikan ölçüm pratiğinde yerleşmiş ve günümüzde de geniş kullanıcı tabanını korumuştur.",
    measurementSystem: "İngiliz ve ABD ölçüm geleneği",
    siEquivalent: "Sıcaklık farkında 1 °F = 5/9 K",
    commonUses: "ABD hava durumu verileri, ev içi sıcaklıklar ve bazı teknik kataloglar",
  },
  "kelvin": {
    shortDescription: "Kelvin, sıcaklığın SI temel birimidir ve mutlak sıcaklık ölçeğini temsil eder.",
    historySummary: "Kelvin ölçeği termodinamik sıcaklığı sıfırdan başlatan bilimsel yaklaşımın sonucu olarak geliştirilmiştir.",
    measurementSystem: "Uluslararası Birim Sistemi (SI)",
    siEquivalent: "Temel SI sıcaklık birimi",
    commonUses: "Termodinamik, bilimsel hesaplar ve mutlak sıcaklık gerektiren analizler",
  },
  "metrekup-saat": {
    shortDescription: "Metreküp/saat, hacimsel debiyi ifade eden pratik bir akış birimidir.",
    historySummary: "Bina tesisatı ve proses akışlarında saat tabanlı okuma ihtiyacı nedeniyle bu gösterim geniş kullanım kazanmıştır.",
    measurementSystem: "Teknik hacimsel debi birimi",
    siEquivalent: "1 m³/h ≈ 0,000277778 m³/s",
    commonUses: "Pompa seçimi, HVAC, su ve proses akışları",
  },
  "litre-dakika": {
    shortDescription: "Litre/dakika, küçük ve orta ölçekli akış sistemlerinde okunabilir debi gösterimi sağlar.",
    historySummary: "Dakika bazlı daha küçük akışları izlemek için laboratuvar, servis ve saha uygulamalarında yaygınlaşmıştır.",
    measurementSystem: "Teknik hacimsel debi birimi",
    siEquivalent: "1 L/min ≈ 0,0000166667 m³/s",
    commonUses: "Su hatları, cihaz beslemeleri ve küçük proses akışları",
  },
  "volt": {
    shortDescription: "Volt, elektrik geriliminin SI türetilmiş birimidir.",
    historySummary: "Elektrik potansiyel farkını standartlaştıran volt birimi, modern elektrik ve elektronik sistemlerin temel gösterimlerinden biridir.",
    measurementSystem: "Uluslararası Birim Sistemi (SI)",
    siEquivalent: "Temel SI gerilim birimi",
    commonUses: "Elektronik devreler, güç kaynakları ve şebeke gerilimleri",
  },
  "kilovolt": {
    shortDescription: "Kilovolt, 1000 volt’a eşit gerilim birimidir. Yüksek gerilim sistemlerinde kullanılır.",
    historySummary: "Büyük iletim ve dağıtım seviyelerinin daha kısa ifade edilmesi için kilovolt yaygın teknik kullanıma girmiştir.",
    measurementSystem: "Uluslararası Birim Sistemi (SI, kat birim)",
    siEquivalent: "1 kV = 1000 V",
    commonUses: "Şebeke, trafo ve yüksek gerilim ekipmanları",
  },
  "amper": {
    shortDescription: "Amper, elektrik akımının SI temel büyüklüklerinden biri olan standart birimidir.",
    historySummary: "Amper birimi, elektrik yükünün akış hızını ölçmek için geliştirilen uluslararası standardın parçasıdır.",
    measurementSystem: "Uluslararası Birim Sistemi (SI)",
    siEquivalent: "Temel SI akım birimi",
    commonUses: "Akım ölçümleri, koruma elemanları ve cihaz etiketleri",
  },
  "miliamper": {
    shortDescription: "Miliamper, amperin binde birine eşit küçük akım birimidir.",
    historySummary: "Elektronik ve ölçüm cihazlarında düşük akımların rahat okunabilmesi için miliamper gösterimi yaygınlaşmıştır.",
    measurementSystem: "Uluslararası Birim Sistemi (SI, alt birim)",
    siEquivalent: "1 mA = 0,001 A",
    commonUses: "Elektronik devreler, sensörler ve düşük akım testleri",
  },
  "kg-m3": {
    shortDescription: "Kilogram/metreküp (kg/m³), yoğunluğun SI türetilmiş birimidir. Bir maddenin birim hacmindeki kütlesini ifade eder.",
    historySummary: "SI sisteminin temel kütle ve uzunluk birimlerinden türetilen kg/m³, bilimsel ve mühendislik hesaplarında yoğunluk için standart referans birim hâline gelmiştir.",
    measurementSystem: "Uluslararası Birim Sistemi (SI, türetilmiş birim)",
    siEquivalent: "Temel SI yoğunluk birimi",
    commonUses: "Malzeme bilimi, akışkanlar mekaniği, meteoroloji ve mühendislik hesapları",
  },
  "pascal-saniye": {
    shortDescription: "Pascal-saniye (Pa·s), dinamik viskozitenin SI türetilmiş birimidir. Bir akışkanın akışa karşı gösterdiği direnci ifade eder.",
    historySummary: "Pascal-saniye, SI sisteminin basınç ve zaman birimlerinden doğrudan türetilmiştir ve akışkanlar mekaniğinde dinamik viskozitenin standart bilimsel referans birimidir.",
    measurementSystem: "Uluslararası Birim Sistemi (SI, türetilmiş birim)",
    siEquivalent: "Temel SI dinamik viskozite birimi: 1 Pa·s = 1 N·s/m²",
    commonUses: "Akışkanlar mekaniği, Reynolds sayısı hesapları, boru hattı tasarımı ve akışkan karakterizasyonu",
  },
  "centipoise": {
    shortDescription: "Santipoise (cP), dinamik viskoziteyi ifade etmek için endüstride yaygın kullanılan bir birimdir. Suyun 20°C'deki viskozitesi yaklaşık 1 cP'dir.",
    historySummary: "Santipoise, CGS sistemindeki poise biriminin binde biridir; motor yağı, boya ve gıda endüstrisinde viskozite değerlerinin pratik ve okunabilir biçimde ifade edilmesi için yaygınlaşmıştır.",
    measurementSystem: "CGS sistemi (SI dışı, alt birim)",
    siEquivalent: "1 cP = 0,001 Pa·s",
    commonUses: "Motor yağı ve madeni yağ viskozite dereceleri, boya ve kaplama endüstrisi, gıda bilimi",
  },
  "kg-m-s": {
    shortDescription: "Kilogram-metre/saniye (kg·m/s), momentumun (devinirlik) SI türetilmiş birimidir. Bir cismin kütlesi ile hızının çarpımını ifade eder.",
    historySummary: "Momentum kavramı klasik mekaniğin temel taşlarından biridir ve kilogram-metre/saniye birimi doğrudan SI'nin temel kütle, uzunluk ve zaman birimlerinden türetilir.",
    measurementSystem: "Uluslararası Birim Sistemi (SI, türetilmiş birim)",
    siEquivalent: "Temel SI momentum birimi: 1 kg·m/s = 1 kg × 1 m/s",
    commonUses: "Çarpışma analizleri, roket ve itki hesapları, parçacık fiziği",
  },
  "n-s": {
    shortDescription: "Newton-saniye (N·s), impulsun (itme) SI türetilmiş birimidir ve boyutsal olarak momentum ile aynıdır.",
    historySummary: "Newton-saniye, impuls-momentum teoreminin doğal bir sonucu olarak ortaya çıkar; bir cisme uygulanan kuvvetin zamanla çarpımı, o cismin momentumundaki değişime eşittir.",
    measurementSystem: "Uluslararası Birim Sistemi (SI, türetilmiş birim)",
    siEquivalent: "1 N·s = 1 kg·m/s",
    commonUses: "Çarpışma ve darbe analizleri, roket itkisi, spor biyomekaniği",
  },
  "newton-metre": {
    shortDescription: "Newton-metre (N·m), torkun (döndürme momentinin) SI türetilmiş birimidir. 1 metre uzunluğundaki bir kolun ucuna dik olarak uygulanan 1 newtonluk kuvvetin oluşturduğu torku ifade eder.",
    historySummary: "Newton-metre, SI sisteminin temel birimlerinden (kuvvet ve uzunluk) doğrudan türetilmiştir ve mühendislikte döndürme etkisini ifade etmek için standart birim hâline gelmiştir.",
    measurementSystem: "Uluslararası Birim Sistemi (SI, türetilmiş birim)",
    siEquivalent: "Temel SI tork birimi: 1 N·m = 1 N × 1 m",
    commonUses: "Motor torku, tork anahtarları, cıvata sıkma değerleri ve mekanik tasarım hesapları",
  },
  "lb-ft": {
    shortDescription: "Pound-fit (lb-ft), İngiliz ve Amerikan ölçü sistemlerinde tork ifade etmek için kullanılan geleneksel bir birimdir.",
    historySummary: "Pound-fit, pound-force ve fit (foot) birimlerinin çarpımından türetilmiş olup özellikle ABD kaynaklı otomotiv ve mühendislik dokümanlarında yaygın kullanılır.",
    measurementSystem: "İngiliz ve ABD ölçü sistemleri",
    siEquivalent: "1 lb-ft ≈ 1,355818 N·m",
    commonUses: "ABD kaynaklı motor torku etiketleri, tork anahtarları ve mekanik veri sayfaları",
  },
  "newton": {
    shortDescription: "Newton (N), kuvvetin Uluslararası Birim Sistemi'ndeki türetilmiş birimidir. 1 kg kütleye 1 m/s² ivme kazandıran kuvveti ifade eder.",
    historySummary: "Newton birimi, Isaac Newton'ın hareket yasalarına atfen adlandırılmış ve 1948 yılında Uluslararası Ağırlıklar ve Ölçüler Genel Konferansı tarafından SI birimi olarak resmen kabul edilmiştir.",
    measurementSystem: "Uluslararası Birim Sistemi (SI, türetilmiş birim)",
    siEquivalent: "Temel SI kuvvet birimi: 1 N = 1 kg·m/s²",
    commonUses: "Mekanik mühendislik, statik ve dinamik hesaplar, malzeme dayanımı testleri",
  },
  "kilogram-kuvvet": {
    shortDescription: "Kilogram-kuvvet (kgf), yerçekimi ivmesi altında 1 kilogramlık kütlenin uyguladığı kuvveti ifade eden, SI dışı geleneksel bir birimdir.",
    historySummary: "Kilogram-kuvvet, SI sisteminden önce mühendislik pratiğinde yaygın kullanılan bir kuvvet birimiydi; günümüzde yerini büyük ölçüde newtona bırakmış olsa da eski teknik dokümanlarda ve bazı ölçüm cihazlarında hâlâ karşılaşılır.",
    measurementSystem: "SI dışı, yerçekimine bağlı geleneksel birim",
    siEquivalent: "1 kgf = 9,80665 N",
    commonUses: "Eski mühendislik dokümanları, tork anahtarları, yay ve çekme testleri",
  },
  "beygirgucu-metric": {
    shortDescription: "Beygirgücü (hp), özellikle motorlu taşıtlarda motor gücünü ifade etmek için kullanılan geleneksel bir güç birimidir. Metrik beygirgücü 735,49875 watt'a eşittir.",
    historySummary: "Beygirgücü, 18. yüzyılda James Watt tarafından buhar makinelerinin gücünü at gücüyle karşılaştırmak amacıyla ortaya atılmıştır. Metrik versiyonu Avrupa'da otomotiv sektöründe yaygın standart hâline gelmiştir.",
    measurementSystem: "Metrik beygirgücü (PS/CV ailesi, SI dışı)",
    siEquivalent: "1 hp (metrik) = 735,49875 W",
    commonUses: "Otomobil ve motosiklet motor gücü, teknik veri sayfaları ve araç karşılaştırmaları",
  },
  "g-cm3": {
    shortDescription: "Gram/santimetreküp (g/cm³), laboratuvar ve kimya ortamlarında yaygın kullanılan bir yoğunluk birimidir.",
    historySummary: "Metrik sistemin ondalık yapısı içinde küçük ölçekli numunelerin yoğunluğunu pratik biçimde ifade etmek için gram ve santimetreküp birimleri birleştirilmiştir.",
    measurementSystem: "Uluslararası Birim Sistemi (SI, alt birim kombinasyonu)",
    siEquivalent: "1 g/cm³ = 1000 kg/m³",
    commonUses: "Kimya laboratuvarları, malzeme yoğunluğu tabloları ve mineraloji",
  },
};

const unitPageOrder = ["metre","kilometre","santimetre","milimetre","mil","fit","inc","yarda","kilogram","gram","miligram","pound","ton","ons","pascal","kilopascal","bar","atmosfer","psi","milimetre-civa","kilogram-kuvvet-santimetrekare","metrekare","hektar","fitkare","litre","metrekup","mililitre","santigrat","fahrenhayt","kelvin","saniye","dakika","saat","metre-saniye","kilometre-saat","mil-saat","joule","kilovatsaat","watt","kilowatt","metrekup-saat","litre-dakika","volt","kilovolt","amper","miliamper","kilogram-metrekup","gram-santimetrekup","beygirgucu","newton","kilogram-kuvvet","newton-metre","pound-fit","kilogram-metre-saniye","newton-saniye","pascal-saniye","santipoise"];

export const unitPages: UnitPage[] = unitRegistry
  .filter((entry) => entry.tr && unitDescriptions[entry.id])
  .map((entry) => {
    const description = unitDescriptions[entry.id];

    return {
      slug: entry.tr!.slug,
      category: entry.category,
      unit: entry.symbol,
      name: entry.tr!.name,
      symbol: entry.displaySymbol ?? entry.symbol,
      ...description,
    };
  })
  .sort(
    (a, b) => unitPageOrder.indexOf(a.slug) - unitPageOrder.indexOf(b.slug)
  );

export function findUnitPage(category: string, unit: string) {
  return unitPages.find(
    (unitPage) => unitPage.category === category && unitPage.unit === unit
  );
}
