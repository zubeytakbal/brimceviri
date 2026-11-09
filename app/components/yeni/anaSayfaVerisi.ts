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
export type AnaSayfaGrubu = { ad: string; linkler: AnaSayfaLinki[] };

const B = "/bilim-hesaplayicilari";
const E = "/muhendislik-hesaplayicilari/elektrik-hesaplari";

export const HESAPLAYICI_GRUPLARI: readonly AnaSayfaGrubu[] = [
  {
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
    ad: "Kimya ve biyoloji",
    linkler: [
      { href: `${B}/kimya/mol-hesaplama`, ad: "Mol" },
      { href: `${B}/biyoloji/kodon-tablosu`, ad: "Kodon tablosu" },
      { href: `${B}/kimya/atom-kutlesi-hesaplama`, ad: "Atom kütlesi" },
    ],
  },
  {
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
