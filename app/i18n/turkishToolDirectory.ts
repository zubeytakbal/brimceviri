// Türkçe araçların tek listesi: /hesaplayicilar hub sayfası, üst menüdeki
// "Hesaplamalar" ve "Tarih & Saat" açılır menüleri ve ana sayfadaki
// "Popüler araçlar" bloğu buradan beslenir. Yeni bir Türkçe araç eklenince
// buraya da eklenmeli; tests/turkishToolDirectory.test.ts eksik ya da kırık
// adresleri yakalar.

export type ToolLink = { href: string; label: string };

export type ToolGroup = {
  id: string;
  title: string;
  description: string;
  links: ToolLink[];
};

export const TURKISH_TOOL_HUB_PATH = "/hesaplayicilar";

export const turkishToolGroups: ToolGroup[] = [
  {
    id: "para-ve-is",
    title: "Para, Maaş ve Vergi",
    description: "Kredi taksiti, KDV, net maaş, tazminat ve altın gibi günlük para hesapları.",
    links: [
      { href: "/kredi-hesaplama", label: "Kredi Hesaplama" },
      { href: "/kdv-hesaplama", label: "KDV Hesaplama" },
      { href: "/brutten-nete-maas-hesaplama", label: "Brütten Nete Maaş" },
      { href: "/kidem-tazminati-hesaplama", label: "Kıdem ve İhbar Tazminatı" },
      { href: "/yillik-izin-hesaplama", label: "Yıllık İzin Hesaplama" },
      { href: "/altin-hesaplama", label: "Altın Hesaplama" },
      { href: "/has-hesaplama", label: "Hurda Altın ve Has Hesaplama" },
      { href: "/ceyrek-bilezik-hesaplama", label: "Çeyrekten Bileziğe Hesaplama" },
      { href: "/eski-para-yeni-para-cevirme", label: "Eski Para Yeni Para Çevirme" },
      { href: "/emlak-komisyonu-hesaplama", label: "Emlak Komisyonu" },
      { href: "/amortisman-hesaplama", label: "Amortisman Hesaplama" },
    ],
  },
  {
    id: "saglik-ve-spor",
    title: "Sağlık ve Spor",
    description: "Vücut kitle indeksi, ideal kilo, gebelik haftası, uyku ve antrenman hesapları.",
    links: [
      { href: "/bmi-hesaplama", label: "BMI (Vücut Kitle İndeksi)" },
      { href: "/ideal-kilo-hesaplama", label: "İdeal Kilo Hesaplama" },
      { href: "/vucut-yag-orani-hesaplama", label: "Vücut Yağ Oranı" },
      { href: "/gebelik-haftasi-hesaplama", label: "Gebelik Haftası Hesaplama" },
      { href: "/yumurtlama-hesaplama", label: "Yumurtlama ve Adet Takvimi Hesaplama" },
      { href: "/uyku-hesaplama", label: "Uyku Hesaplama" },
      { href: "/kosu-pace-hesaplama", label: "Koşu Pace (Tempo)" },
      { href: "/1rm-hesaplama", label: "1RM (Bir Tekrar Maksimum)" },
      { href: "/abv-standart-icki-hesaplama", label: "ABV ve Standart İçki" },
      { href: "/vucut-yuzey-alani-hesaplama", label: "Vücut Yüzey Alanı (BSA)" },
    ],
  },
  {
    id: "klinik",
    title: "Klinik Skorlar",
    description: "Sağlık profesyonelleri için skorlama ve doz hesapları. Sonuçları klinik değerlendirmeyle birlikte kullanın.",
    links: [
      { href: "/tahlil-degerleri-cevirme", label: "Tahlil Değerleri Birim Çevirme (mg/dL ↔ mmol/L)" },
      { href: "/glasgow-koma-skalasi-hesaplama", label: "Glasgow Koma Skalası" },
      { href: "/cha2ds2-vasc-skoru-hesaplama", label: "CHA2DS2-VASc Skoru" },
      { href: "/wells-skoru-hesaplama", label: "Wells Skoru" },
      { href: "/qsofa-hesaplama", label: "qSOFA" },
      { href: "/sofa-skoru-hesaplama", label: "SOFA Skoru" },
      { href: "/meld-skoru-hesaplama", label: "MELD Skoru" },
      { href: "/braden-skalasi-hesaplama", label: "Braden Skalası" },
      { href: "/kreatinin-klirensi-hesaplama", label: "Kreatinin Klirensi" },
      { href: "/iv-damla-hizi-hesaplama", label: "IV Damla Hızı" },
      { href: "/veteriner-ilac-dozu-hesaplama", label: "Veteriner İlaç Dozu" },
    ],
  },
  {
    id: "tarih",
    title: "Tarih ve Takvim",
    description: "Yaş, iki tarih arası gün, iş günü, hafta numarası, tatiller ve takvim çevirileri.",
    links: [
      { href: "/yas-hesaplama", label: "Yaş Hesaplama" },
      { href: "/iki-tarih-arasi-gun-hesaplama", label: "İki Tarih Arası Gün" },
      { href: "/tarihe-gun-ekleme", label: "Tarihe Gün Ekleme" },
      { href: "/is-gunu-hesaplama", label: "İş Günü Hesaplama" },
      { href: "/kacinci-hafta", label: "Yılın Kaçıncı Haftası" },
      { href: "/dogdugum-gun-hangi-gun", label: "Doğduğum Gün Hangi Gün" },
      { href: "/tarih-cevirici", label: "Hicri Rumi Miladi Tarih Çevirici" },
      { href: "/ebced-hesabi", label: "Ebced Hesabı" },
      { href: "/roma-rakamlari-cevirme", label: "Roma Rakamları Çevirici" },
    ],
  },
  {
    id: "dini",
    title: "Dini Araçlar",
    description: "Kıble pusulası, kaza namazı ve orucu, zekât, hatim, hafızlık, seferî mesafe, zikirmatik ve daha fazlası. Değişken tutar ve vakit içermez.",
    links: [
      { href: "/kaza-orucu-hesaplama", label: "Kaza Orucu Hesaplama" },
      { href: "/kible-yonu-hesaplama", label: "Kıble Yönü (Canlı Pusula)" },
      { href: "/kaza-namazi-hesaplama", label: "Kaza Namazı Hesaplama" },
      { href: "/hatim-hesaplama", label: "Hatim Hesaplama" },
      { href: "/zekat-hesaplama", label: "Zekât Hesaplama" },
      { href: "/hicri-yas-hesaplama", label: "Hicri Yaş Hesaplama" },
      { href: "/kurban-hissesi-hesaplama", label: "Kurban Hissesi Hesaplama" },
      { href: "/hafizlik-hesaplama", label: "Hafızlık Hesaplama" },
      { href: "/hayiz-hesaplama", label: "Hayız ve Nifas Hesaplama" },
      { href: "/kirk-mevlidi-hesaplama", label: "40 Mevlidi ve 52. Gece Hesaplama" },
    ],
  },
  {
    id: "saat",
    title: "Saat ve Zamanlayıcı",
    description: "Dünya saatleri, saat dilimi çevirici, geri sayım sayacı, kronometre ve alarm.",
    links: [
      { href: "/saat-dilimi-cevirici", label: "Saat Dilimi Çevirici" },
      { href: "/saat-hesaplama", label: "Saat Hesaplama" },
      { href: "/yerel-saat-hesaplama", label: "Yerel Saat Farkı" },
    ],
  },
  {
    id: "ev-ve-yapi",
    title: "Ev, İnşaat ve Bahçe",
    description: "Boya, fayans, beton ve tuğla miktarından tarla dönümüne, havuz ve sulamaya kadar.",
    links: [
      { href: "/boya-hesaplama", label: "Boya Hesaplama" },
      { href: "/fayans-hesaplama", label: "Fayans Hesaplama" },
      { href: "/parke-hesaplama", label: "Parke (Laminat) Hesaplama" },
      { href: "/duvar-kagidi-hesaplama", label: "Duvar Kağıdı Hesaplama" },
      { href: "/beton-hesaplama", label: "Beton Hesaplama" },
      { href: "/tugla-hesaplama", label: "Tuğla Hesaplama" },
      { href: "/siva-hesaplama", label: "Sıva Hesaplama" },
      { href: "/merdiven-hesaplama", label: "Merdiven Hesaplama" },
      { href: "/hafriyat-hesaplama", label: "Hafriyat ve Kazı" },
      { href: "/kereste-hesaplama", label: "Kereste Metreküp" },
      { href: "/emsal-kaks-hesaplama", label: "Emsal (KAKS) Hesaplama" },
      { href: "/tasinma-kutusu-hesaplama", label: "Taşınma Kutusu Hesaplama" },
      { href: "/havuz-hacmi-hesaplama", label: "Havuz Hacmi" },
      { href: "/klor-dozaji-hesaplama", label: "Klor Dozajı (Havuz)" },
    ],
  },
  {
    id: "tarim",
    title: "Tarım ve Hayvancılık",
    description: "İnek doğum ve kuluçka takvimi, gübre, tohum, sulama ve tarla hesapları.",
    links: [
      { href: "/inek-dogum-hesaplama", label: "İnek Doğum Hesaplama" },
      { href: "/kulucka-hesaplama", label: "Kuluçka Hesaplama" },
      { href: "/dekara-fidan-sayisi-hesaplama", label: "Dekara Fidan Sayısı" },
      { href: "/ilaclama-hesaplama", label: "İlaçlama Hesaplama" },
      { href: "/gubre-ihtiyaci-hesaplama", label: "Gübre İhtiyacı" },
      { href: "/tohum-miktari-hesaplama", label: "Tohum Miktarı" },
      { href: "/sulama-suresi-hesaplama", label: "Sulama Süresi" },
      { href: "/tarla-donum-hesaplama", label: "Tarla Dönüm Hesaplama" },
    ],
  },
  {
    id: "enerji-ve-arac",
    title: "Enerji, Fatura ve Araç",
    description: "Elektrik ve doğalgaz tüketimi, klima BTU, yakıt, LPG ve elektrikli araç hesapları.",
    links: [
      { href: "/elektrik-tuketimi-hesaplama", label: "Elektrik Tüketimi" },
      { href: "/dogalgaz-tuketimi-hesaplama", label: "Doğalgaz Tüketimi" },
      { href: "/klima-btu-hesaplama", label: "Klima BTU Hesaplama" },
      { href: "/petek-dilim-hesaplama", label: "Petek Dilim Hesabı" },
      { href: "/kombi-kac-kw-hesaplama", label: "Kombi Kaç kW Olmalı?" },
      { href: "/kombi-klima-isitma-maliyeti-karsilastirma", label: "Kombi mi Klima mı?" },
      { href: "/isi-pompasi-kombi-karsilastirma", label: "Isı Pompası mı Kombi mi?" },
      { href: "/led-ampul-tasarruf-hesaplama", label: "LED Ampul Tasarrufu" },
      { href: "/gunes-paneli-amortisman-hesaplama", label: "Güneş Paneli Amortismanı" },
      { href: "/yalitim-amortisman-hesaplama", label: "Yalıtım Amortismanı" },
      { href: "/yakit-tuketimi-hesaplama", label: "Yakıt Tüketimi Hesaplama" },
      { href: "/lpg-donusum-amortisman-hesaplama", label: "LPG Dönüşüm Amortismanı" },
      { href: "/elektrikli-arac-sarj-hesaplama", label: "Elektrikli Araç Şarj Süresi" },
      { href: "/elektrikli-arac-maliyet-karsilastirma", label: "Elektrikli mi Benzinli mi?" },
      { href: "/lastik-ebati-hesaplama", label: "Lastik Ebatı Hesaplama" },
      { href: "/ehliyet-yenileme-suresi-hesaplama", label: "Ehliyet Yenileme Süresi" },
      { href: "/trafik-cezasi-erken-odeme-hesaplama", label: "Trafik Cezası Erken Ödeme" },
      { href: "/ceza-puani-hesaplama", label: "Ceza Puanı Hesaplama" },
      { href: "/arac-muayene-tarihi-hesaplama", label: "Araç Muayene Tarihi" },
      { href: "/bisiklet-jant-olcusu", label: "Bisiklet Jant Ölçüsü" },
    ],
  },
  {
    id: "olcu-ve-gunluk",
    title: "Mutfak, Beden ve Okul",
    description: "Mutfak ölçüleri, tarif ölçekleme, ayakkabı ve beden numarası, not ve devamsızlık.",
    links: [
      { href: "/mutfak-olculeri-cevirici", label: "Mutfak Ölçüleri Çevirici" },
      { href: "/tarif-cevirici", label: "Tarif Çevirici" },
      { href: "/kokteyl-olcusu-cevirici", label: "Kokteyl Ölçüsü Çevirici" },
      { href: "/alkol-seyreltme-hesaplama", label: "Alkol Seyreltme" },
      { href: "/ayakkabi-numarasi-cevirme", label: "Ayakkabı Numarası Çevirme" },
      { href: "/beden-olcusu-cevirici", label: "Beden Ölçüsü Çevirici" },
      { href: "/yuzuk-olcusu-cevirici", label: "Yüzük Ölçüsü Çevirici" },
      { href: "/seyahat-priz-voltaj-hesaplama", label: "Seyahat Priz ve Voltaj" },
      { href: "/devamsizlik-hesaplama", label: "Devamsızlık Hesaplama" },
      { href: "/harf-notu-hesaplama", label: "Harf Notu Hesaplama" },
      { href: "/uzunluk-karsilastirma", label: "Uzunluk Karşılaştırma" },
    ],
  },
  {
    id: "dosya-ve-gorsel",
    title: "Dosya ve Görsel Araçları",
    description: "Fotoğraf küçültme, kırpma ve format çevirme. Dosyalar yüklenmez, tarayıcıda işlenir.",
    links: [
      { href: "/piksel-cm-dpi-hesaplama", label: "Piksel, CM ve DPI" },
      { href: "/renk-kodu-cevirici", label: "Renk Kodu Çevirici" },
    ],
  },
  // Bilim bölümü 25 Ekim 2026'da Hesaplamalar'a katıldı; araçların adresleri aynı kaldı.
  {
    id: "matematik",
    title: "Matematik",
    description: "EBOB-EKOK, bölen sayısı, karekök, yüzde, denklem çözme, ortalama, olasılık ve Pisagor teoremi; adım adım çözümlü.",
    links: [
      { href: "/bilim-hesaplayicilari/matematik/ebob-ekok-hesaplama", label: "EBOB-EKOK Hesaplama" },
      { href: "/bilim-hesaplayicilari/matematik/bolen-sayisi-hesaplama", label: "Bölen Sayısı Hesaplama" },
      { href: "/bilim-hesaplayicilari/matematik/karekok-hesaplama", label: "Karekök Hesaplama" },
      { href: "/bilim-hesaplayicilari/matematik/yuzde-hesaplama", label: "Yüzde Hesaplama" },
      { href: "/bilim-hesaplayicilari/matematik/ikinci-dereceden-denklem-cozme", label: "İkinci Dereceden Denklem (Delta)" },
      { href: "/bilim-hesaplayicilari/matematik/2-bilinmeyenli-denklem-sistemi-cozme", label: "2 Bilinmeyenli Denklem Sistemi" },
      { href: "/bilim-hesaplayicilari/matematik/3-bilinmeyenli-denklem-sistemi-cozme", label: "3 Bilinmeyenli Denklem Sistemi" },
      { href: "/bilim-hesaplayicilari/matematik/ortalama-hesaplama", label: "Ortalama, Medyan, Mod, Std. Sapma" },
      { href: "/bilim-hesaplayicilari/matematik/mod-hesaplama", label: "Mod (Tepe Değer) Hesaplama" },
      { href: "/bilim-hesaplayicilari/matematik/olasilik-hesaplama", label: "Olasılık Hesaplama" },
      { href: "/bilim-hesaplayicilari/matematik/permutasyon-kombinasyon-hesaplama", label: "Permütasyon ve Kombinasyon" },
      { href: "/bilim-hesaplayicilari/geometri/pisagor-teoremi-hesaplama", label: "Pisagor Teoremi Hesaplama" },
    ],
  },
  {
    id: "kimya",
    title: "Kimya",
    description: "Mol ve atom kütlesi, pil potansiyeli; periyodik tablo, yaygın bileşiklerin molar kütlesi ve kodon tablosu.",
    links: [
      { href: "/bilim-hesaplayicilari/kimya/periyodik-tablo", label: "Periyodik Tablo" },
      { href: "/bilim-hesaplayicilari/kimya/bilesikler", label: "Kimyasal Bileşikler (Molar Kütle)" },
      { href: "/bilim-hesaplayicilari/kimya/mol-hesaplama", label: "Mol Hesaplama" },
      { href: "/bilim-hesaplayicilari/kimya/atom-kutlesi-hesaplama", label: "Atom Kütlesi Hesaplama" },
      { href: "/bilim-hesaplayicilari/kimya/pil-potansiyeli-hesaplama", label: "Pil Potansiyeli Hesaplama" },
      { href: "/bilim-hesaplayicilari/biyoloji/kodon-tablosu", label: "Kodon Tablosu ve DNA/RNA Çevirici" },
    ],
  },
  {
    id: "gokcisimleri",
    title: "Gökcisimleri",
    description: "Gezegenlerin ve uyduların çapı, kütlesi ve yerçekimi; iki gökcismini karşılaştırma ve kilonun her gezegende kaç kilo ettiği.",
    links: [
    ],
  },
  {
    id: "teknik",
    title: "Teknik ve Mühendislik",
    description: "Elektrik, tesisat, kaynak, talaşlı imalat, malzeme, fotoğraf ve ses teknik hesapları.",
    links: [
      { href: "/muhendislik-hesaplayicilari", label: "Mühendislik Hesaplayıcıları" },
      { href: "/awg-mm2-cevirici", label: "AWG - mm² Çevirici" },
      { href: "/swg-mm-cevirici", label: "SWG - mm (Tel Kalınlığı)" },
      { href: "/matkap-ucu-olcusu-cevirme", label: "Matkap Ucu Ölçüsü (İnç - mm)" },
      { href: "/igne-numarasi-gauge-mm", label: "İğne ve Branül Numarası (G - mm)" },
      { href: "/mesh-mikron-cevirme", label: "Mesh - Mikron (Elek)" },
      { href: "/egim-cevirme", label: "Eğim Çevirme (% - Derece)" },
      { href: "/brix-baume-cevirme", label: "Brix - Baumé Çevirme" },
      { href: "/boru-capi-hesaplama", label: "Boru Çapı, Debi ve Akış Hızı" },
      { href: "/boru-capi-donusum-hesaplama", label: "Boru Çapı Dönüşümü (DN-NPS)" },
      { href: "/tank-hacmi-hesaplama", label: "Tank Hacmi ve Doluluk" },
      { href: "/pis-su-borusu-egimi-hesaplama", label: "Pis Su Borusu Eğimi" },
      { href: "/basinc-kaybi-hesaplama", label: "Basınç Kaybı" },
      { href: "/civata-torku-hesaplama", label: "Cıvata Torku" },
      { href: "/kaynak-amperaji-hesaplama", label: "Kaynak Amperajı" },
      { href: "/kaynak-isi-girdisi-hesaplama", label: "Kaynak Isı Girdisi" },
      { href: "/kesme-hizi-devir-hesaplama", label: "Kesme Hızı - Devir" },
      { href: "/isil-genlesme-hesaplama", label: "Isıl Genleşme" },
      { href: "/elastik-uzama-hesaplama", label: "Elastik Uzama" },
      { href: "/kiris-hesaplama", label: "Kiriş Hesabı (Sehim ve Moment)" },
      { href: "/atalet-momenti-hesaplama", label: "Atalet Momenti" },
      { href: "/burkulma-hesaplama", label: "Burkulma Hesabı" },
      { href: "/mil-burulma-hesaplama", label: "Mil Burulma Hesabı" },
      { href: "/sertlik-donusum-hesaplama", label: "Sertlik Dönüşümü" },
      { href: "/malzeme-agirligi-hesaplama", label: "Malzeme Ağırlığı" },
      { href: "/demir-agirlik-hesaplama", label: "İnşaat Demiri Ağırlığı" },
      { href: "/sac-agirlik-hesaplama", label: "Sac Ağırlığı" },
      { href: "/boru-agirlik-hesaplama", label: "Boru Ağırlığı" },
      { href: "/kutu-profil-agirlik-hesaplama", label: "Kutu Profil Ağırlığı" },
      { href: "/malzeme-ozellikleri", label: "Malzeme Özellikleri" },
      { href: "/superheat-subcooling-hesaplama", label: "Superheat ve Subcooling" },
      { href: "/u-degeri-hesaplama", label: "U Değeri Hesaplama" },
      { href: "/hidrolik-silindir-hesaplama", label: "Hidrolik Silindir" },
      { href: "/pnomatik-silindir-hesaplama", label: "Pnömatik Silindir" },
      { href: "/kva-kw-hesaplama", label: "kVA kW Hesaplama" },
      { href: "/kompanzasyon-hesaplama", label: "Kompanzasyon Hesabı" },
      { href: "/motor-devir-hesaplama", label: "Motor Devri" },
      { href: "/pompa-gucu-hesaplama", label: "Pompa Gücü" },
      { href: "/lmtd-hesaplama", label: "LMTD ve Isı Eşanjörü" },
      { href: "/debi-isi-yuku-hesaplama", label: "Debiden Isı Yükü" },
      { href: "/suyun-kaynama-noktasi-hesaplama", label: "Suyun Kaynama Noktası" },
      { href: "/psu-guc-hesaplama", label: "PSU Güç Kaynağı" },
      { href: "/cbm-hesaplama", label: "CBM ve Hacimsel Ağırlık" },
      { href: "/anten-uzunlugu-hesaplama", label: "Anten Uzunluğu" },
      { href: "/sayi-tabani-cevirici", label: "Sayı Tabanı Çevirici" },
      { href: "/ping-gecikme-hesaplama", label: "Ping / Gecikme" },
      { href: "/video-bit-hizi-hesaplama", label: "Video Bit Hızı" },
      { href: "/bpm-ms-hesaplama", label: "BPM - MS" },
      { href: "/odak-uzakligi-esdegeri-hesaplama", label: "Odak Uzaklığı Eşdeğeri" },
      { href: "/pozlama-esdegeri-hesaplama", label: "Pozlama Eşdeğeri" },
      { href: "/gunes-acisi-ve-golge-boyu-hesaplama", label: "Güneş Açısı ve Gölge Boyu" },
    ],
  },
  {
    id: "harita-ve-havacilik",
    title: "Harita, Coğrafya ve Havacılık",
    description: "İller arası mesafe, rakım, koordinat, harita ölçeği ve uçuş hesapları.",
    links: [
      { href: "/koordinat-donusturucu", label: "Koordinat Dönüştürücü" },
      { href: "/harita-olcegi-hesaplama", label: "Harita Ölçeği" },
      { href: "/buyuk-daire-mesafesi-hesaplama", label: "Büyük Daire Mesafesi" },
      { href: "/erime-kaynama-noktasi-hesaplama", label: "Erime ve Kaynama Noktası" },
      { href: "/yogunluk-irtifasi-hesaplama", label: "Yoğunluk İrtifası" },
      { href: "/bofor-cevirme", label: "Bofor (Rüzgâr) Çevirme" },
      { href: "/yan-ruzgar-hesaplama", label: "Yan Rüzgar Bileşeni" },
      { href: "/inis-orani-hesaplama", label: "İniş Oranı" },
      { href: "/agirlik-denge-hesaplama", label: "Ağırlık ve Denge" },
      { href: "/seyir-suresi-hesaplama", label: "Seyir Süresi" },
    ],
  },
];

const byHref = new Map(
  turkishToolGroups.flatMap((group) => group.links.map((link) => [link.href, link] as const))
);

function pick(hrefs: string[]): ToolLink[] {
  return hrefs.map((href) => {
    const link = byHref.get(href);
    if (!link) throw new Error(`turkishToolDirectory: ${href} listede yok`);
    return link;
  });
}

/** Üst menü "Hesaplamalar" (günlük hayat): Search Console'da en çok gösterim alan araçlar önde. */
export const turkishCalculatorMenu = pick([
  "/yas-hesaplama",
  "/kredi-hesaplama",
  "/kdv-hesaplama",
  "/brutten-nete-maas-hesaplama",
  "/kidem-tazminati-hesaplama",
  "/altin-hesaplama",
  "/bmi-hesaplama",
  "/uyku-hesaplama",
  "/gebelik-haftasi-hesaplama",
  "/yakit-tuketimi-hesaplama",
  "/elektrik-tuketimi-hesaplama",
  "/beton-hesaplama",
  "/boya-hesaplama",
  "/fayans-hesaplama",
  "/tarla-donum-hesaplama",
]);

/** Üst menü "Mühendislik". */
export const turkishEngineeringMenu: ToolLink[] = [
  { href: "/muhendislik-hesaplayicilari/elektrik-hesaplari", label: "Elektrik Hesapları (kW-Amper, Kablo Kesiti)" },
  { href: "/malzeme-ozellikleri", label: "Malzeme Özellikleri" },
  { href: "/malzeme-agirligi-hesaplama", label: "Malzeme Ağırlığı" },
  { href: "/demir-agirlik-hesaplama", label: "İnşaat Demiri Ağırlığı" },
  { href: "/kiris-hesaplama", label: "Kiriş Hesabı" },
  { href: "/kva-kw-hesaplama", label: "kVA kW Hesaplama" },
  { href: "/kompanzasyon-hesaplama", label: "Kompanzasyon Hesabı" },
  { href: "/boru-capi-hesaplama", label: "Boru Çapı ve Debi" },
  { href: "/civata-torku-hesaplama", label: "Cıvata Torku" },
  { href: "/u-degeri-hesaplama", label: "U Değeri" },
];

/** Üst menü "Dünya ve Coğrafya": iller arası mesafe, il rakımları, ülkeler ve koordinat sitenin en çok tıklanan araçlarından. */
export const turkishGeoMenu: ToolLink[] = [
  { href: "/koordinat-donusturucu", label: "Koordinat Dönüştürücü" },
  { href: "/kible-yonu-hesaplama", label: "Kıble Yönü" },
  { href: "/harita-olcegi-hesaplama", label: "Harita Ölçeği" },
  { href: "/buyuk-daire-mesafesi-hesaplama", label: "Büyük Daire Mesafesi" },
];

/** Üst menü "Tarih & Saat". */
export const turkishTimeMenu = pick([
  "/saat-dilimi-cevirici",
  "/iki-tarih-arasi-gun-hesaplama",
  "/kacinci-hafta",
]);

/** Ana sayfadaki "Popüler araçlar" bloğu. */
// Ana sayfadaki "En çok kullanılan araçlar": Search Console'un son 3 ayında (18 Temmuz – 17 Ekim 2026) Google'dan en çok
// tıklama alan Türkçe araç sayfaları, tıklama sırasıyla (birim dönüşüm sayfaları ana sayfada ayrı bölümde).
export const turkishPopularTools = pick([
  "/malzeme-ozellikleri",
  "/altin-hesaplama",
  "/kible-yonu-hesaplama",
  "/uyku-hesaplama",
  "/koordinat-donusturucu",
  "/dogalgaz-tuketimi-hesaplama",
  "/merdiven-hesaplama",
  "/tarla-donum-hesaplama",
  "/yas-hesaplama",
]);
