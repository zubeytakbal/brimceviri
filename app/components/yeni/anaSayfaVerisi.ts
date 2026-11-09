// Turkce ana sayfanin elle secilmis listeleri. Siralar Search Console gosterim ve tiklamalarina dayanir (Kasim 2026).
// Yalnizca Google'a acik sayfalar girer (tests/anaSayfa.test.ts).

/** Hizli ceviricide secilebilen kategoriler ve ilk acilan birim cifti (categoryPages category -> [kaynak, hedef]). */
export const HIZLI_KATEGORILER: Readonly<Record<string, readonly [string, string]>> = {
  uzunluk: ["m", "cm"],
  kutle: ["kg", "g"],
  alan: ["m²", "dönüm"],
  hacim: ["L", "mL"],
  sicaklik: ["C", "F"],
  zaman: ["h", "min"],
  hiz: ["km/h", "m/s"],
  basinc: ["bar", "psi"],
  enerji: ["kWh", "kJ"],
  guc: ["kW", "hp"],
  veri: ["GB", "MB"],
  aci: ["°", "rad"],
};

/** Sik kullanilan donusumler: konu konu, her konuda en cok aranan bes cift. */
export const SIK_GRUPLARI: readonly { ad: string; sluglar: readonly string[] }[] = [
  { ad: "Uzunluk", sluglar: ["inc-santimetre", "metre-santimetre", "fit-metre", "kilometre-metre", "santimetre-milimetre"] },
  { ad: "Alan", sluglar: ["metrekare-donum", "donum-metrekare", "dekar-donum", "hektar-donum", "hektar-metrekare"] },
  { ad: "Ağırlık", sluglar: ["kilogram-gram", "ton-kilogram", "pound-kilogram", "gram-miligram", "gram-kilogram"] },
  { ad: "Hacim", sluglar: ["metrekup-litre", "litre-metrekup", "mililitre-litre", "galon-litre", "varil-litre"] },
  { ad: "Diğer", sluglar: ["bar-psi", "knot-kilometre-saat", "megabayt-gigabayt", "watt-kilowatt", "deniz-mili-kilometre"] },
];

export type AnaSayfaLinki = { href: string; ad: string };

/** B duzeni: en cok tiklanan ve en cok aranan araclar, tek cumlelik aciklamayla. */
export const POPULER_ARACLAR: readonly (AnaSayfaLinki & { aciklama: string; grup: string })[] = [
  { grup: "finans-ve-maas", href: "/kdv-hesaplama", ad: "KDV hesaplama", aciklama: "KDV dahil ve hariç tutar, %1, %10 ve %20 oranları." },
  { grup: "finans-ve-maas", href: "/brutten-nete-maas-hesaplama", ad: "Brütten nete maaş", aciklama: "Vergi ve SGK kesintileriyle eline geçecek maaş." },
  { grup: "finans-ve-maas", href: "/kidem-tazminati-hesaplama", ad: "Kıdem tazminatı", aciklama: "Çalışma süresi ve brüt ücrete göre tazminat." },
  { grup: "tarih-ve-zaman", href: "/yas-hesaplama", ad: "Yaş hesaplama", aciklama: "Doğum tarihinden yıl, ay ve gün olarak yaş." },
  { grup: "insaat-ve-ev", href: "/beton-hesaplama", ad: "Beton hesaplama", aciklama: "Döşeme ve kolon için metreküp, çimento ve kum." },
  { grup: "insaat-ve-ev", href: "/boya-hesaplama", ad: "Boya hesaplama", aciklama: "Duvar alanına göre kaç litre boya gerektiği." },
  { grup: "enerji-ve-arac", href: "/dogalgaz-tuketimi-hesaplama", ad: "Doğalgaz tüketimi", aciklama: "Aylık m³ tüketimden tahmini fatura." },
  { grup: "saglik-ve-spor", href: "/uyku-hesaplama", ad: "Uyku hesaplama", aciklama: "Uyku döngülerine göre yatma ve kalkma saati." },
];
export type AnaSayfaGrubu = { slug: string; ad: string; linkler: AnaSayfaLinki[] };

/** Grup renkleri (grup slug'ina gore). Ayni grup her yerde ayni renkte gorunur. */
export const GRUP_RENGI: Readonly<Record<string, string>> = {
  "finans-ve-maas": "#1f7a4d",
  "insaat-ve-ev": "#c05621",
  "tarih-ve-zaman": "#2f55a4",
  "enerji-ve-arac": "#a16207",
  "saglik-ve-spor": "#c0392b",
  kuyumcu: "#9a7400",
  "tarim-ve-hayvancilik": "#4d7c0f",
  matematik: "#6b46c1",
  "kimya-ve-biyoloji": "#0e7c86",
  "muhendislik-ve-elektrik": "#4a5568",
  "harita-ve-tasima": "#2477a8",
  "gunluk-olculer": "#b83280",
  "dini-hesaplar": "#7b5536",
  temel: "#0b5f54",
  muhendislik: "#4a5568",
  "isi-ve-akiskan": "#c05621",
  elektrik: "#2f55a4",
  "isik-ve-radyasyon": "#a16207",
  "saglik-ve-kimya": "#c0392b",
  "tarim-ve-arazi": "#4d7c0f",
  "kuyumculuk-ve-tekstil": "#9a7400",
};
// Site tek vurgu rengi (mavi) kullanir; grup renkleri ileride gerekirse diye duruyor.
export const MAVI = "#3b68fc";
export const grupRengi = (_slug: string) => MAVI;

const B = "/bilim-hesaplayicilari";
const E = "/muhendislik-hesaplayicilari/elektrik-hesaplari";

export const HESAPLAYICI_GRUPLARI: readonly AnaSayfaGrubu[] = [
  {
    slug: "finans-ve-maas",
    ad: "Finans ve maaş",
    linkler: [
      { href: "/kdv-hesaplama", ad: "KDV" },
      { href: "/brutten-nete-maas-hesaplama", ad: "Brütten nete maaş" },
      { href: "/kidem-tazminati-hesaplama", ad: "Kıdem ve ihbar tazminatı" },
      { href: "/yillik-izin-hesaplama", ad: "Yıllık izin" },
      { href: "/kredi-hesaplama", ad: "Kredi" },
    ],
  },
  {
    slug: "insaat-ve-ev",
    ad: "İnşaat ve ev",
    linkler: [
      { href: "/boya-hesaplama", ad: "Boya" },
      { href: "/fayans-hesaplama", ad: "Fayans" },
      { href: "/beton-hesaplama", ad: "Beton" },
      { href: "/tugla-hesaplama", ad: "Tuğla" },
      { href: "/merdiven-hesaplama", ad: "Merdiven" },
      { href: "/parke-hesaplama", ad: "Parke ve laminat" },
      { href: "/kereste-hesaplama", ad: "Kereste metreküp" },
      { href: "/emsal-kaks-hesaplama", ad: "Emsal (KAKS)" },
      { href: "/duvar-kagidi-hesaplama", ad: "Duvar kağıdı" },
      { href: "/hafriyat-hesaplama", ad: "Hafriyat ve kazı" },
      { href: "/klor-dozaji-hesaplama", ad: "Havuz klor dozajı" },
    ],
  },
  {
    slug: "tarih-ve-zaman",
    ad: "Tarih ve zaman",
    linkler: [
      { href: "/yas-hesaplama", ad: "Yaş" },
      { href: "/tarih-cevirici", ad: "Hicri, Rumi, Miladi tarih" },
      { href: "/iki-tarih-arasi-gun-hesaplama", ad: "İki tarih arası gün" },
      { href: "/kacinci-hafta", ad: "Yılın kaçıncı haftası" },
      { href: "/tarihe-gun-ekleme", ad: "Tarihe gün ekleme" },
      { href: "/is-gunu-hesaplama", ad: "İş günü" },
      { href: "/yerel-saat-hesaplama", ad: "Yerel saat farkı" },
      { href: "/dogdugum-gun-hangi-gun", ad: "Doğduğum gün hangi gün" },
      { href: "/roma-rakamlari-cevirme", ad: "Roma rakamları" },
    ],
  },
  {
    slug: "enerji-ve-arac",
    ad: "Enerji ve araç",
    linkler: [
      { href: "/yakit-tuketimi-hesaplama", ad: "Yakıt tüketimi" },
      { href: "/trafik-cezasi-erken-odeme-hesaplama", ad: "Trafik cezası erken ödeme" },
      { href: "/elektrik-tuketimi-hesaplama", ad: "Elektrik tüketimi" },
      { href: "/dogalgaz-tuketimi-hesaplama", ad: "Doğalgaz tüketimi" },
      { href: "/klima-btu-hesaplama", ad: "Klima BTU" },
      { href: "/kombi-kac-kw-hesaplama", ad: "Kombi kaç kW olmalı" },
      { href: "/petek-dilim-hesaplama", ad: "Petek dilim" },
      { href: "/ehliyet-yenileme-suresi-hesaplama", ad: "Ehliyet yenileme süresi" },
      { href: "/lastik-ebati-hesaplama", ad: "Lastik ebatı" },
      { href: "/kombi-klima-isitma-maliyeti-karsilastirma", ad: "Isınma maliyeti karşılaştırma" },
      { href: "/elektrikli-arac-maliyet-karsilastirma", ad: "Elektrikli mi benzinli mi" },
      { href: "/lpg-donusum-amortisman-hesaplama", ad: "LPG dönüşüm amortismanı" },
    ],
  },
  {
    slug: "saglik-ve-spor",
    ad: "Sağlık ve spor",
    linkler: [
      { href: "/uyku-hesaplama", ad: "Uyku" },
      { href: "/bmi-hesaplama", ad: "Vücut kitle indeksi (BMI)" },
      { href: "/ideal-kilo-hesaplama", ad: "İdeal kilo" },
      { href: "/gebelik-haftasi-hesaplama", ad: "Gebelik haftası" },
      { href: "/kosu-pace-hesaplama", ad: "Koşu temposu" },
    ],
  },
  {
    slug: "kuyumcu",
    ad: "Kuyumcu",
    linkler: [
      { href: "/altin-hesaplama", ad: "Altın" },
      { href: "/altin-hesaplama/ceyrek-altin", ad: "Çeyrek altın" },
      { href: "/altin-hesaplama/cumhuriyet-altini", ad: "Cumhuriyet altını" },
      { href: "/ceyrek-bilezik-hesaplama", ad: "Çeyrekten bileziğe" },
      { href: "/has-hesaplama", ad: "Hurda altın ve has" },
      { href: "/24-ayar-altin-22-ayar-altin", ad: "24 ayardan 22 ayara" },
      { href: "/22-ayar-altin-24-ayar-altin", ad: "22 ayardan 24 ayara" },
    ],
  },
  {
    slug: "tarim-ve-hayvancilik",
    ad: "Tarım ve hayvancılık",
    linkler: [
      { href: "/tarla-donum-hesaplama", ad: "Tarla dönüm" },
      { href: "/tohum-miktari-hesaplama", ad: "Tohum miktarı" },
      { href: "/dekara-fidan-sayisi-hesaplama", ad: "Dekara fidan sayısı" },
      { href: "/inek-dogum-hesaplama", ad: "İnek doğum" },
      { href: "/gubre-ihtiyaci-hesaplama", ad: "Gübre ihtiyacı" },
      { href: "/ilaclama-hesaplama", ad: "İlaçlama" },
    ],
  },
  {
    slug: "matematik",
    ad: "Matematik",
    linkler: [
      { href: `${B}/matematik/yuzde-hesaplama`, ad: "Yüzde" },
      { href: `${B}/matematik/ebob-ekok-hesaplama`, ad: "EBOB ve EKOK" },
      { href: `${B}/matematik/ortalama-hesaplama`, ad: "Ortalama, medyan, mod" },
      { href: `${B}/matematik/karekok-hesaplama`, ad: "Karekök" },
      { href: `${B}/matematik/2-bilinmeyenli-denklem-sistemi-cozme`, ad: "2 bilinmeyenli denklem" },
      { href: `${B}/matematik/3-bilinmeyenli-denklem-sistemi-cozme`, ad: "3 bilinmeyenli denklem" },
      { href: "/sayi-tabani-cevirici", ad: "Sayı tabanı" },
    ],
  },
  {
    slug: "kimya-ve-biyoloji",
    ad: "Kimya ve biyoloji",
    linkler: [
      { href: `${B}/kimya/mol-hesaplama`, ad: "Mol" },
      { href: `${B}/biyoloji/kodon-tablosu`, ad: "Kodon tablosu" },
      { href: `${B}/kimya/atom-kutlesi-hesaplama`, ad: "Atom kütlesi" },
    ],
  },
  {
    slug: "muhendislik-ve-elektrik",
    ad: "Mühendislik ve elektrik",
    linkler: [
      { href: `${E}/kw-to-amper-hesaplama`, ad: "kW ve amper" },
      { href: `${E}/kablo-kesiti-hesaplama`, ad: "Kablo kesiti" },
      { href: "/kva-kw-hesaplama", ad: "kVA ve kW" },
      { href: "/hesaplayicilar/ohm-yasasi", ad: "Ohm yasası" },
      { href: "/awg-mm2-cevirici", ad: "AWG ve mm²" },
      { href: "/psu-guc-hesaplama", ad: "PSU güç kaynağı" },
      { href: "/demir-agirlik-hesaplama", ad: "İnşaat demiri ağırlığı" },
      { href: "/sac-agirlik-hesaplama", ad: "Sac ağırlığı" },
      { href: "/boru-capi-donusum-hesaplama", ad: "Boru çapı (DN, NPS)" },
      { href: "/boru-capi-hesaplama", ad: "Boru çapı ve akış hızı" },
      { href: "/basinc-kaybi-hesaplama", ad: "Basınç kaybı" },
      { href: "/tank-hacmi-hesaplama", ad: "Tank hacmi" },
      { href: "/kesme-hizi-devir-hesaplama", ad: "Kesme hızı ve devir" },
      { href: "/civata-torku-hesaplama", ad: "Cıvata torku" },
      { href: "/isil-genlesme-hesaplama", ad: "Isıl genleşme" },
      { href: "/kaynak-isi-girdisi-hesaplama", ad: "Kaynak ısı girdisi" },
      { href: "/hesaplayicilar/isi-enerjisi", ad: "Isı enerjisi" },
      { href: "/hesaplayicilar/isi-iletimi", ad: "Isı iletimi" },
      { href: "/anten-uzunlugu-hesaplama", ad: "Anten uzunluğu" },
    ],
  },
  {
    slug: "harita-ve-tasima",
    ad: "Harita ve taşıma",
    linkler: [
      { href: "/koordinat-donusturucu", ad: "Koordinat dönüştürücü" },
      { href: "/harita-olcegi-hesaplama", ad: "Harita ölçeği" },
      { href: "/egim-cevirme", ad: "Eğim (yüzde, derece)" },
      { href: "/cbm-hesaplama", ad: "CBM ve hacimsel ağırlık" },
      { href: "/seyir-suresi-hesaplama", ad: "Seyir süresi" },
      { href: "/yan-ruzgar-hesaplama", ad: "Yan rüzgâr bileşeni" },
    ],
  },
  {
    slug: "gunluk-olculer",
    ad: "Günlük ölçüler",
    linkler: [
      { href: "/mutfak-olculeri-cevirici", ad: "Mutfak ölçüleri" },
      { href: "/ayakkabi-numarasi-cevirme", ad: "Ayakkabı numarası" },
      { href: "/beden-olcusu-cevirici", ad: "Beden ölçüsü" },
      { href: "/yuzuk-olcusu-cevirici", ad: "Yüzük ölçüsü" },
      { href: "/devamsizlik-hesaplama", ad: "Devamsızlık" },
      { href: "/harf-notu-hesaplama", ad: "Harf notu" },
      { href: "/kokteyl-olcusu-cevirici", ad: "Kokteyl ölçüsü" },
      { href: "/alkol-seyreltme-hesaplama", ad: "Alkol seyreltme" },
      { href: "/abv-standart-icki-hesaplama", ad: "ABV ve standart içki" },
      { href: "/uzunluk-karsilastirma", ad: "Uzunluk karşılaştırma" },
      { href: "/tarihi-olcu-birimleri", ad: "Tarihi ölçü birimleri" },
    ],
  },
  {
    slug: "dini-hesaplar",
    ad: "Dini hesaplar",
    linkler: [
      { href: "/kible-yonu-hesaplama", ad: "Kıble yönü" },
      { href: "/hicri-yas-hesaplama", ad: "Hicri yaş" },
      { href: "/kirk-mevlidi-hesaplama", ad: "40 mevlidi" },
      { href: "/hafizlik-hesaplama", ad: "Hafızlık" },
      { href: "/hatim-hesaplama", ad: "Hatim" },
      { href: "/kaza-namazi-hesaplama", ad: "Kaza namazı" },
      { href: "/kaza-orucu-hesaplama", ad: "Kaza orucu" },
      { href: "/zekat-hesaplama", ad: "Zekât" },
      { href: "/hayiz-hesaplama", ad: "Hayız ve nifas" },
    ],
  },
];

/** Grup sayfalarinin giris yazisi (grup slug'ina gore). */
export const GRUP_GIRISI: Readonly<Record<string, string>> = {
  "finans-ve-maas":
    "Maaş bordrosundan KDV'ye, kıdem tazminatından kredi taksitine kadar parayla ilgili günlük hesaplar. Mevzuata bağlı hesaplarda güncel oranlar kullanılır; önemli kararlarda bir mali müşavire danışın.",
  "insaat-ve-ev":
    "Boya, fayans, beton ve tuğla gibi malzemelerden ne kadar almanız gerektiğini hesaplayın. Sonuçlar fire payıyla verilir; siparişten önce ustanızla kontrol etmeniz iyi olur.",
  "tarih-ve-zaman": "Yaşınızı, iki tarih arasındaki gün sayısını, iş günlerini ve hicri, Rumi, miladi tarih karşılıklarını bulun.",
  "enerji-ve-arac": "Yakıt, elektrik ve doğalgaz tüketimi; kombi, klima ve petek seçimi; aracınızla ilgili masraf ve süreler.",
  "saglik-ve-spor":
    "Uyku, vücut kitle indeksi, ideal kilo ve gebelik haftası gibi hesaplar. Bu araçlar bilgilendirme amaçlıdır, hekim görüşünün yerini tutmaz.",
  kuyumcu: "Altın ve gümüş ayarları, çeyrek ve cumhuriyet altını, hurda altının has karşılığı.",
  "tarim-ve-hayvancilik": "Tarla alanı, tohum ve fidan sayısı, gübre ve ilaçlama miktarı, inek doğum tarihi.",
  matematik: "Yüzde, EBOB-EKOK, ortalama ve denklem çözümü; birçoğunda çözüm adım adım gösterilir.",
  "kimya-ve-biyoloji": "Mol, atom kütlesi ve kodon tablosu gibi kimya ve biyoloji derslerinde kullanılan araçlar.",
  "muhendislik-ve-elektrik":
    "Elektrik, metal, akışkan ve ısı hesapları: kablo kesiti, demir ağırlığı, boru çapı, cıvata torku ve daha fazlası.",
  "harita-ve-tasima": "Koordinat ve harita ölçeği dönüşümleri, eğim, kargo hacmi ve seyir hesapları.",
  "gunluk-olculer": "Mutfak ve beden ölçüleri, ayakkabı ve yüzük numaraları, okul notları gibi günlük çeviriler.",
  "dini-hesaplar": "Kıble yönü, kaza namazı ve orucu, zekât ve hicri yaş gibi hesaplar.",
  temel: "Uzunluk, ağırlık, alan, hacim, sıcaklık ve zaman gibi en sık kullanılan ölçü birimleri.",
  muhendislik: "Basınç, kuvvet, tork, enerji ve güç gibi mühendislikte kullanılan birimler.",
  "isi-ve-akiskan": "Debi, viskozite, ısıl iletkenlik ve yakıt tüketimi birimleri.",
  elektrik: "Direnç, kapasitans, endüktans ve manyetik alan gibi elektrik birimleri.",
  "isik-ve-radyasyon": "Aydınlatma şiddeti, radyasyon dozu ve radyoaktivite birimleri.",
  "saglik-ve-kimya": "Kan şekeri, D vitamini, konsantrasyon ve su sertliği birimleri.",
  "tarim-ve-arazi": "Dekar başına verim ve doz, alana göre fiyat ve yağış miktarı.",
  "kuyumculuk-ve-tekstil": "Altın ve gümüş ayarı, kumaş gramajı, iplik numarası ve halı düğüm sıklığı.",
};

/** Buyuk gruplarin alt basliklari (grup sayfasinda). Gruptaki her link tam bir alt baslikta yer alir (tests/anaSayfa.test.ts). */
export const ALT_GRUPLAR: Readonly<Record<string, readonly { ad: string; hrefler: readonly string[] }[]>> = {
  "insaat-ve-ev": [
    { ad: "Yapı ve malzeme", hrefler: ["/beton-hesaplama", "/tugla-hesaplama", "/merdiven-hesaplama", "/kereste-hesaplama", "/emsal-kaks-hesaplama", "/hafriyat-hesaplama"] },
    { ad: "Ev ve dekorasyon", hrefler: ["/boya-hesaplama", "/fayans-hesaplama", "/parke-hesaplama", "/duvar-kagidi-hesaplama", "/klor-dozaji-hesaplama"] },
  ],
  "enerji-ve-arac": [
    { ad: "Araç", hrefler: ["/yakit-tuketimi-hesaplama", "/trafik-cezasi-erken-odeme-hesaplama", "/ehliyet-yenileme-suresi-hesaplama", "/lastik-ebati-hesaplama", "/elektrikli-arac-maliyet-karsilastirma", "/lpg-donusum-amortisman-hesaplama"] },
    { ad: "Ev enerjisi ve ısınma", hrefler: ["/elektrik-tuketimi-hesaplama", "/dogalgaz-tuketimi-hesaplama", "/klima-btu-hesaplama", "/kombi-kac-kw-hesaplama", "/petek-dilim-hesaplama", "/kombi-klima-isitma-maliyeti-karsilastirma"] },
  ],
  "muhendislik-ve-elektrik": [
    { ad: "Elektrik", hrefler: ["/muhendislik-hesaplayicilari/elektrik-hesaplari/kw-to-amper-hesaplama", "/muhendislik-hesaplayicilari/elektrik-hesaplari/kablo-kesiti-hesaplama", "/kva-kw-hesaplama", "/hesaplayicilar/ohm-yasasi", "/awg-mm2-cevirici", "/psu-guc-hesaplama", "/anten-uzunlugu-hesaplama"] },
    { ad: "Metal ve makine", hrefler: ["/demir-agirlik-hesaplama", "/sac-agirlik-hesaplama", "/kesme-hizi-devir-hesaplama", "/civata-torku-hesaplama", "/isil-genlesme-hesaplama", "/kaynak-isi-girdisi-hesaplama"] },
    { ad: "Akışkan ve ısı", hrefler: ["/boru-capi-donusum-hesaplama", "/boru-capi-hesaplama", "/basinc-kaybi-hesaplama", "/tank-hacmi-hesaplama", "/hesaplayicilar/isi-enerjisi", "/hesaplayicilar/isi-iletimi"] },
  ],
  "gunluk-olculer": [
    { ad: "Ölçü ve beden", hrefler: ["/mutfak-olculeri-cevirici", "/ayakkabi-numarasi-cevirme", "/beden-olcusu-cevirici", "/yuzuk-olcusu-cevirici", "/uzunluk-karsilastirma", "/tarihi-olcu-birimleri"] },
    { ad: "Okul", hrefler: ["/devamsizlik-hesaplama", "/harf-notu-hesaplama"] },
    { ad: "İçecek", hrefler: ["/kokteyl-olcusu-cevirici", "/alkol-seyreltme-hesaplama", "/abv-standart-icki-hesaplama"] },
  ],
};
