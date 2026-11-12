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

export type AnaSayfaLinki = { href: string; ad: string };

/** B duzeni: en cok tiklanan ve en cok aranan araclar, tek cumlelik aciklamayla. */
export const POPULER_ARACLAR: readonly (AnaSayfaLinki & { aciklama: string; grup: string })[] = [
  { grup: "gunluk-yasam", href: "/yas-hesaplama", ad: "Yaş hesaplama", aciklama: "Doğum tarihinden yıl, ay ve gün olarak yaş." },
  { grup: "insaat", href: "/beton-hesaplama", ad: "Beton hesaplama", aciklama: "Döşeme ve kolon için metreküp, çimento ve kum." },
  { grup: "insaat", href: "/boya-hesaplama", ad: "Boya hesaplama", aciklama: "Duvar alanına göre kaç litre boya gerektiği." },
  { grup: "ekoloji", href: "/dogalgaz-tuketimi-hesaplama", ad: "Doğalgaz tüketimi", aciklama: "Aylık m³ tüketimden tahmini fatura." },
  { grup: "diger", href: "/kible-yonu-hesaplama", ad: "Kıble yönü", aciklama: "Telefonda canlı pusulayla kıbleyi bulur; 81 ilin kıble açısı da var." },
  { grup: "insaat", href: "/merdiven-hesaplama", ad: "Merdiven hesaplama", aciklama: "Toplam yüksekliğe göre basamak sayısı, rıht yüksekliği ve basamak derinliği." },
  { grup: "biyoloji", href: "/tarla-donum-hesaplama", ad: "Tarla dönüm hesaplama", aciklama: "Kenar ölçülerinden düzensiz tarlanın bile alanını dönüm ve m² olarak bulur." },
  { grup: "saglik", href: "/uyku-hesaplama", ad: "Uyku hesaplama", aciklama: "Uyku döngülerine göre yatma ve kalkma saati." },
];
export type AnaSayfaGrubu = { slug: string; ad: string; linkler: AnaSayfaLinki[] };

// Site tek vurgu rengi (mavi) kullanir.
export const MAVI = "#3b68fc";
export const grupRengi = (_slug: string) => MAVI;

const B = "/bilim-hesaplayicilari";
const E = "/muhendislik-hesaplayicilari/elektrik-hesaplari";

/**
 * Arac kategorileri: Omni'nin kategori duzeni (Biyoloji, Kimya, Insaat, Donusum, Ekoloji, Gunluk yasam, Finans,
 * Yiyecek, Saglik, Matematik, Fizik, Spor, Istatistik, Diger). Butun dillerde ayni kategoriler kullanilir; diller
 * yalniz adlari cevirir. Henuz yeterli araci olmayan kategoriler (Spor, Istatistik) gosterilmez; araclari Diger'e
 * veya en yakin kategoriye girer, arac sayisi artinca kendi kategorilerine tasinir. Donusum gruplar.ts'de.
 */
export const HESAPLAYICI_GRUPLARI: readonly AnaSayfaGrubu[] = [
  {
    slug: "finans",
    ad: "Finans",
    linkler: [
      { href: "/yillik-izin-hesaplama", ad: "Yıllık izin" },
      { href: "/kredi-hesaplama", ad: "Kredi" },
      { href: "/altin-hesaplama", ad: "Altın" },
      { href: "/altin-hesaplama/ceyrek-altin", ad: "Çeyrek altın" },
      { href: "/altin-hesaplama/cumhuriyet-altini", ad: "Cumhuriyet altını" },
      { href: "/ceyrek-bilezik-hesaplama", ad: "Çeyrekten bileziğe" },
      { href: "/24-ayar-altin-22-ayar-altin", ad: "24 ayardan 22 ayara" },
      { href: "/22-ayar-altin-24-ayar-altin", ad: "22 ayardan 24 ayara" },
    ],
  },
  {
    slug: "gunluk-yasam",
    ad: "Günlük yaşam",
    linkler: [
      { href: "/yas-hesaplama", ad: "Yaş" },
      { href: "/tarih-cevirici", ad: "Hicri, Rumi, Miladi tarih" },
      { href: "/iki-tarih-arasi-gun-hesaplama", ad: "İki tarih arası gün" },
      { href: "/kacinci-hafta", ad: "Yılın kaçıncı haftası" },
      { href: "/tarihe-gun-ekleme", ad: "Tarihe gün ekleme" },
      { href: "/is-gunu-hesaplama", ad: "İş günü" },
      { href: "/saat-hesaplama", ad: "Saat" },
      { href: "/yerel-saat-hesaplama", ad: "Yerel saat farkı" },
      { href: "/dogdugum-gun-hangi-gun", ad: "Doğduğum gün hangi gün" },
      { href: "/yakit-tuketimi-hesaplama", ad: "Yakıt tüketimi" },
      { href: "/trafik-cezasi-erken-odeme-hesaplama", ad: "Trafik cezası erken ödeme" },
      { href: "/ehliyet-yenileme-suresi-hesaplama", ad: "Ehliyet yenileme süresi" },
      { href: "/lastik-ebati-hesaplama", ad: "Lastik ebatı" },
      { href: "/seyir-suresi-hesaplama", ad: "Seyir süresi" },
      { href: "/devamsizlik-hesaplama", ad: "Devamsızlık" },
      { href: "/harf-notu-hesaplama", ad: "Harf notu" },
      { href: "/ayakkabi-numarasi-cevirme", ad: "Ayakkabı numarası" },
      { href: "/beden-olcusu-cevirici", ad: "Beden ölçüsü" },
    ],
  },
  {
    slug: "insaat",
    ad: "İnşaat",
    linkler: [
      { href: "/beton-hesaplama", ad: "Beton" },
      { href: "/merdiven-hesaplama", ad: "Merdiven" },
      { href: "/kereste-hesaplama", ad: "Kereste metreküp" },
      { href: "/emsal-kaks-hesaplama", ad: "Emsal (KAKS)" },
      { href: "/hafriyat-hesaplama", ad: "Hafriyat ve kazı" },
      { href: "/demir-agirlik-hesaplama", ad: "İnşaat demiri ağırlığı" },
      { href: "/sac-agirlik-hesaplama", ad: "Sac ağırlığı" },
      { href: "/malzeme-agirligi-hesaplama", ad: "Malzeme ağırlığı" },
      { href: "/egim-cevirme", ad: "Eğim (yüzde, derece)" },
      { href: "/boya-hesaplama", ad: "Boya" },
      { href: "/fayans-hesaplama", ad: "Fayans" },
      { href: "/parke-hesaplama", ad: "Parke ve laminat" },
      { href: "/duvar-kagidi-hesaplama", ad: "Duvar kağıdı" },
      { href: "/kombi-kac-kw-hesaplama", ad: "Kombi kaç kW olmalı" },
      { href: "/petek-dilim-hesaplama", ad: "Petek dilim" },
    ],
  },
  {
    slug: "saglik",
    ad: "Sağlık",
    linkler: [
      { href: "/uyku-hesaplama", ad: "Uyku" },
    ],
  },
  {
    slug: "matematik",
    ad: "Matematik",
    linkler: [
      { href: `${B}/matematik/ebob-ekok-hesaplama`, ad: "EBOB ve EKOK" },
      { href: `${B}/matematik/2-bilinmeyenli-denklem-sistemi-cozme`, ad: "2 bilinmeyenli denklem" },
      { href: `${B}/matematik/3-bilinmeyenli-denklem-sistemi-cozme`, ad: "3 bilinmeyenli denklem" },
      { href: "/roma-rakamlari-cevirme", ad: "Roma rakamları" },
    ],
  },
  {
    slug: "fizik",
    ad: "Fizik",
    linkler: [
      { href: `${E}/kw-to-amper-hesaplama`, ad: "kW ve amper" },
      { href: "/kva-kw-hesaplama", ad: "kVA ve kW" },
      { href: "/hesaplayicilar/ohm-yasasi", ad: "Ohm yasası" },
      { href: "/awg-mm2-cevirici", ad: "AWG ve mm²" },
      { href: "/psu-guc-hesaplama", ad: "PSU güç kaynağı" },
      { href: "/anten-uzunlugu-hesaplama", ad: "Anten uzunluğu" },
      { href: "/kesme-hizi-devir-hesaplama", ad: "Kesme hızı ve devir" },
      { href: "/civata-torku-hesaplama", ad: "Cıvata torku" },
      { href: "/isil-genlesme-hesaplama", ad: "Isıl genleşme" },
      { href: "/kaynak-isi-girdisi-hesaplama", ad: "Kaynak ısı girdisi" },
      { href: "/malzeme-ozellikleri", ad: "Malzeme özellikleri" },
      { href: "/yan-ruzgar-hesaplama", ad: "Yan rüzgâr bileşeni" },
      { href: "/boru-capi-donusum-hesaplama", ad: "Boru çapı (DN, NPS)" },
      { href: "/boru-capi-hesaplama", ad: "Boru çapı ve akış hızı" },
      { href: "/basinc-kaybi-hesaplama", ad: "Basınç kaybı" },
      { href: "/tank-hacmi-hesaplama", ad: "Tank hacmi" },
      { href: "/hesaplayicilar/isi-enerjisi", ad: "Isı enerjisi" },
      { href: "/hesaplayicilar/isi-iletimi", ad: "Isı iletimi" },
    ],
  },
  {
    slug: "kimya",
    ad: "Kimya",
    linkler: [
      { href: `${B}/kimya/mol-hesaplama`, ad: "Mol" },
      { href: `${B}/kimya/atom-kutlesi-hesaplama`, ad: "Atom kütlesi" },
      { href: "/alkol-seyreltme-hesaplama", ad: "Alkol seyreltme" },
      { href: "/klor-dozaji-hesaplama", ad: "Havuz klor dozajı" },
    ],
  },
  {
    slug: "biyoloji",
    ad: "Biyoloji",
    linkler: [
      { href: "/tarla-donum-hesaplama", ad: "Tarla dönüm" },
      { href: "/tohum-miktari-hesaplama", ad: "Tohum miktarı" },
      { href: "/dekara-fidan-sayisi-hesaplama", ad: "Dekara fidan sayısı" },
      { href: "/gubre-ihtiyaci-hesaplama", ad: "Gübre ihtiyacı" },
      { href: "/ilaclama-hesaplama", ad: "İlaçlama" },
      { href: "/inek-dogum-hesaplama", ad: "İnek doğum" },
      { href: "/veteriner-ilac-dozu-hesaplama", ad: "Veteriner ilaç dozu" },
      { href: `${B}/biyoloji/kodon-tablosu`, ad: "Kodon tablosu" },
    ],
  },
  {
    slug: "ekoloji",
    ad: "Ekoloji ve enerji",
    linkler: [
      { href: "/elektrik-tuketimi-hesaplama", ad: "Elektrik tüketimi" },
      { href: "/dogalgaz-tuketimi-hesaplama", ad: "Doğalgaz tüketimi" },
      { href: "/kombi-klima-isitma-maliyeti-karsilastirma", ad: "Isınma maliyeti karşılaştırma" },
      { href: "/elektrikli-arac-maliyet-karsilastirma", ad: "Elektrikli mi benzinli mi" },
      { href: "/lpg-donusum-amortisman-hesaplama", ad: "LPG dönüşüm amortismanı" },
    ],
  },
  {
    slug: "yiyecek",
    ad: "Yiyecek ve içecek",
    linkler: [
      { href: "/mutfak-olculeri-cevirici", ad: "Mutfak ölçüleri" },
      { href: "/kokteyl-olcusu-cevirici", ad: "Kokteyl ölçüsü" },
      { href: "/abv-standart-icki-hesaplama", ad: "ABV ve standart içki" },
    ],
  },
  {
    slug: "diger",
    ad: "Diğer",
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
      { href: "/koordinat-donusturucu", ad: "Koordinat dönüştürücü" },
      { href: "/harita-olcegi-hesaplama", ad: "Harita ölçeği" },
      { href: "/uzunluk-karsilastirma", ad: "Uzunluk karşılaştırma" },
      { href: "/tarihi-olcu-birimleri", ad: "Tarihi ölçü birimleri" },
      { href: "/kosu-pace-hesaplama", ad: "Koşu temposu" },
    ],
  },
];

/** Grup sayfalarinin giris yazisi (grup slug'ina gore). */
export const GRUP_GIRISI: Readonly<Record<string, string>> = {
  donusum:
    "Uzunluk, ağırlık, alan ve hacimden basınç, enerji ve radyasyona kadar bütün birim çeviricileri. Dönüm ve arşın gibi Türkiye'de kullanılan ölçüler de burada.",
  finans:
    "Maaş bordrosundan KDV'ye, kıdem tazminatından kredi taksitine kadar parayla ilgili hesaplar; çeyrek ve cumhuriyet altını, ayar ve has hesapları da burada. Mevzuata bağlı hesaplarda güncel oranlar kullanılır; önemli kararlarda bir mali müşavire danışın.",
  "gunluk-yasam": "Yaş ve tarih hesapları, araç masrafları ve süreleri, okul notları, ayakkabı ve beden ölçüleri gibi günlük işler.",
  insaat:
    "Beton, tuğla, boya ve fayans gibi malzemelerden ne kadar almanız gerektiğini, kombi ve klima seçimini hesaplayın. Sonuçlar fire payıyla verilir; siparişten önce ustanızla kontrol etmeniz iyi olur.",
  saglik: "Uyku, vücut kitle indeksi, ideal kilo ve gebelik haftası gibi hesaplar. Bu araçlar bilgilendirme amaçlıdır, hekim görüşünün yerini tutmaz.",
  matematik: "Yüzde, EBOB-EKOK, ortalama ve denklem çözümü; birçoğunda çözüm adım adım gösterilir.",
  fizik: "Elektrik, mekanik, akışkan ve ısı hesapları: kablo kesiti, Ohm yasası, cıvata torku, boru çapı, ısı iletimi ve daha fazlası.",
  kimya: "Mol ve atom kütlesi gibi ders hesapları; alkol seyreltme ve havuz klor dozajı gibi günlük kimya.",
  biyoloji: "Tarla alanı, tohum ve fidan sayısı, gübre ve ilaçlama miktarı, inek doğum tarihi ve kodon tablosu.",
  ekoloji: "Elektrik ve doğalgaz tüketimi, ısınma yöntemlerinin maliyeti, elektrikli araç ve LPG karşılaştırmaları.",
  yiyecek: "Mutfak ölçüleri, kokteyl ölçüleri ve içeceklerdeki alkol miktarı.",
  diger: "Kıble yönü, kaza namazı ve zekât gibi dini hesaplar; koordinat ve harita ölçeği; başka bir kategoriye girmeyen araçlar.",
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
  finans: [
    { ad: "Maaş, vergi ve kredi", hrefler: ["/yillik-izin-hesaplama", "/kredi-hesaplama"] },
    { ad: "Altın", hrefler: ["/altin-hesaplama", "/altin-hesaplama/ceyrek-altin", "/altin-hesaplama/cumhuriyet-altini", "/ceyrek-bilezik-hesaplama", "/24-ayar-altin-22-ayar-altin", "/22-ayar-altin-24-ayar-altin"] },
  ],
  "gunluk-yasam": [
    { ad: "Tarih ve zaman", hrefler: ["/yas-hesaplama", "/tarih-cevirici", "/iki-tarih-arasi-gun-hesaplama", "/kacinci-hafta", "/tarihe-gun-ekleme", "/is-gunu-hesaplama", "/saat-hesaplama", "/yerel-saat-hesaplama", "/dogdugum-gun-hangi-gun"] },
    { ad: "Araç ve yol", hrefler: ["/yakit-tuketimi-hesaplama", "/trafik-cezasi-erken-odeme-hesaplama", "/ehliyet-yenileme-suresi-hesaplama", "/lastik-ebati-hesaplama", "/seyir-suresi-hesaplama"] },
    { ad: "Okul", hrefler: ["/devamsizlik-hesaplama", "/harf-notu-hesaplama"] },
    { ad: "Beden ve numara", hrefler: ["/ayakkabi-numarasi-cevirme", "/beden-olcusu-cevirici"] },
  ],
  insaat: [
    { ad: "Yapı ve malzeme", hrefler: ["/beton-hesaplama", "/merdiven-hesaplama", "/kereste-hesaplama", "/emsal-kaks-hesaplama", "/hafriyat-hesaplama", "/demir-agirlik-hesaplama", "/sac-agirlik-hesaplama", "/malzeme-agirligi-hesaplama", "/egim-cevirme"] },
    { ad: "Ev ve dekorasyon", hrefler: ["/boya-hesaplama", "/fayans-hesaplama", "/parke-hesaplama", "/duvar-kagidi-hesaplama"] },
    { ad: "Isıtma ve soğutma", hrefler: ["/kombi-kac-kw-hesaplama", "/petek-dilim-hesaplama"] },
  ],
  fizik: [
    { ad: "Elektrik", hrefler: ["/muhendislik-hesaplayicilari/elektrik-hesaplari/kw-to-amper-hesaplama", "/kva-kw-hesaplama", "/hesaplayicilar/ohm-yasasi", "/awg-mm2-cevirici", "/psu-guc-hesaplama", "/anten-uzunlugu-hesaplama"] },
    { ad: "Mekanik ve malzeme", hrefler: ["/kesme-hizi-devir-hesaplama", "/civata-torku-hesaplama", "/isil-genlesme-hesaplama", "/kaynak-isi-girdisi-hesaplama", "/malzeme-ozellikleri", "/yan-ruzgar-hesaplama"] },
    { ad: "Akışkan ve ısı", hrefler: ["/boru-capi-donusum-hesaplama", "/boru-capi-hesaplama", "/basinc-kaybi-hesaplama", "/tank-hacmi-hesaplama", "/hesaplayicilar/isi-enerjisi", "/hesaplayicilar/isi-iletimi"] },
  ],
  biyoloji: [
    { ad: "Tarım ve hayvancılık", hrefler: ["/tarla-donum-hesaplama", "/tohum-miktari-hesaplama", "/dekara-fidan-sayisi-hesaplama", "/gubre-ihtiyaci-hesaplama", "/ilaclama-hesaplama", "/inek-dogum-hesaplama", "/veteriner-ilac-dozu-hesaplama"] },
    { ad: "Genetik", hrefler: ["/bilim-hesaplayicilari/biyoloji/kodon-tablosu"] },
  ],
  diger: [
    { ad: "Dini hesaplar", hrefler: ["/kible-yonu-hesaplama", "/hicri-yas-hesaplama", "/kirk-mevlidi-hesaplama", "/hafizlik-hesaplama", "/hatim-hesaplama", "/kaza-namazi-hesaplama", "/kaza-orucu-hesaplama", "/zekat-hesaplama", "/hayiz-hesaplama"] },
    { ad: "Harita ve taşıma", hrefler: ["/koordinat-donusturucu", "/harita-olcegi-hesaplama"] },
    { ad: "Ölçü karşılaştırma", hrefler: ["/uzunluk-karsilastirma", "/tarihi-olcu-birimleri"] },
    { ad: "Spor", hrefler: ["/kosu-pace-hesaplama"] },
  ],
};
