// Bilim hesaplayicilari alt hub'larinin icerigi: gruplu arac listesi, kisa rehber ve SSS.
import type { FaqItem } from "./faqSchema";

export type ScienceHubTool = { href: string; title: string; description: string };

export type ScienceHub = {
  slug: "kimya" | "matematik" | "fizik" | "geometri" | "biyoloji";
  path: string;
  name: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  groups: Array<{ title: string; tools: ScienceHubTool[] }>;
  related: Array<{ href: string; label: string }>;
  sections: Array<{ id: string; title: string; paragraphs: string[] }>;
  faq: FaqItem[];
};

const K = "/bilim-hesaplayicilari/kimya";
const M = "/bilim-hesaplayicilari/matematik";

export const scienceHubs: ScienceHub[] = [
  {
    slug: "kimya",
    path: K,
    name: "Kimya",
    title: "Kimya Hesaplayıcıları",
    metaTitle: "Kimya Hesaplayıcıları: Mol, Molarite, pH, Stokiyometri",
    metaDescription:
      "Mol, molarite, molalite, pH, seyreltme, titrasyon, stokiyometri, entalpi ve daha fazlası: 9-12. sınıf ve AYT kimyasına uygun 20 hesaplayıcı ve periyodik tablo.",
    intro:
      "Lise ve üniversite kimyasında en sık yapılan hesaplar tek yerde: mol ve kütle dönüşümlerinden çözelti derişimlerine, pH'tan tepkime verimine kadar. Her araç formülü ve adım adım çözümü gösterir.",
    groups: [
      {
        title: "Elementler, bileşikler ve mol",
        tools: [
          { href: `${K}/periyodik-tablo`, title: "Periyodik Tablo", description: "İnteraktif tablo; her element için atom numarası, kütlesi ve ayrıntılı sayfa." },
          { href: `${K}/element-siralamasi`, title: "En Ağır ve En Hafif Elementler", description: "118 elementi atom kütlesi, atom numarası ya da ada göre sırala." },
          { href: `${K}/bilesikler`, title: "Kimyasal Bileşikler (Molar Kütle)", description: "Yaygın bileşiklerin formülü ve molar kütlesi (g/mol)." },
          { href: `${K}/atom-kutlesi-hesaplama`, title: "Atom Kütlesi Hesaplama", description: "İzotop bolluklarından ortalama atom kütlesini hesapla." },
          { href: `${K}/mol-hesaplama`, title: "Mol Hesaplama", description: "Kütle ve molar kütleden mol sayısı; mol sayısından kütle ve tanecik sayısı." },
        ],
      },
      {
        title: "Çözeltiler ve derişim",
        tools: [
          { href: `${K}/molarite-hesaplama`, title: "Molarite Hesaplama", description: "Çözünen mol ve çözelti hacminden mol/L derişim." },
          { href: `${K}/molalite-hesaplama`, title: "Molalite Hesaplama", description: "Çözücü kütlesine göre derişim (mol/kg)." },
          { href: `${K}/kutlece-yuzde-hesaplama`, title: "Kütlece Yüzde Hesaplama", description: "Çözünen ve çözelti kütlesinden % derişim." },
          { href: `${K}/ppm-hesaplama`, title: "ppm Hesaplama", description: "Çözünen ve çözücü kütlesinden milyonda bir (ppm) derişim." },
          { href: `${K}/seyreltme-hesaplama`, title: "Seyreltme Hesaplama", description: "C₁V₁ = C₂V₂ ile eksik derişimi ya da hacmi bul." },
          { href: `${K}/titrasyon-hesaplama`, title: "Titrasyon Hesaplama", description: "Harcanan titrant hacminden bilinmeyen derişimi hesapla." },
          { href: `${K}/ph-hesaplama`, title: "pH Hesaplama", description: "pH, pOH, [H⁺] ve [OH⁻] arasında dönüşüm; asidik, bazik ya da nötr." },
        ],
      },
      {
        title: "Tepkimeler ve enerji",
        tools: [
          { href: `${K}/stokiyometri-hesaplama`, title: "Stokiyometri Hesaplama", description: "Denkleştirilmiş denklemin katsayılarıyla bilinen maddeden hedef madde miktarı." },
          { href: `${K}/verim-hesaplama`, title: "Verim Hesaplama", description: "Teorik ve gerçek ürün miktarından yüzde verim." },
          { href: `${K}/entalpi-hesaplama`, title: "Entalpi Hesaplama", description: "Kütle, özgül ısı ve sıcaklık farkından ısı miktarı (q = m·c·ΔT)." },
          { href: `${K}/kc-hesaplama`, title: "Kc Hesaplama", description: "Denge derişimleri ve katsayılardan Kc denge sabiti." },
          { href: `${K}/pil-potansiyeli-hesaplama`, title: "Pil Potansiyeli Hesaplama", description: "Standart indirgenme potansiyellerinden E°pil." },
          { href: `${K}/yari-omur-hesaplama`, title: "Yarı Ömür Hesaplama", description: "Radyoaktif bozunmada kalan miktar ve geçen süre." },
          { href: `${K}/buhar-basinci-hesaplama`, title: "Buhar Basıncı Hesaplama", description: "Clausius-Clapeyron ile sıcaklığa bağlı buhar basıncı." },
        ],
      },
    ],
    related: [
      { href: "/kategoriler/yogunluk", label: "Yoğunluk Dönüşümleri" },
      { href: "/kategoriler/basinc", label: "Basınç Dönüşümleri" },
      { href: "/kategoriler/sicaklik", label: "Sıcaklık Dönüşümleri" },
      { href: "/erime-kaynama-noktasi-hesaplama", label: "Erime ve Kaynama Noktası" },
      { href: "/bilim-hesaplayicilari/biyoloji", label: "Biyoloji Hesaplayıcıları" },
      { href: M, label: "Matematik Hesaplayıcıları" },
    ],
    sections: [
      {
        id: "nereden-baslamali",
        title: "Hangi hesaplayıcıyı kullanmalıyım?",
        paragraphs: [
          "Soruda gram verilip mol isteniyorsa önce mol hesaplayıcısını, bunun için gereken molar kütleyi bileşikler listesinden ya da periyodik tablodan kullanın. Derişim sorularında çözeltinin hacmi verilmişse molarite, çözücünün kütlesi verilmişse molalite kullanılır.",
          "Tepkime sorularında denkleştirilmiş denklem esastır: stokiyometri aracı katsayılardan ürün ya da gerekli reaktan miktarını bulur, verim aracı gerçek ürünün teorik ürüne oranını verir. Isı alışverişi için entalpi, denge durumunu yorumlamak için Kc hesaplayıcısı kullanılır.",
        ],
      },
      {
        id: "birimler",
        title: "Kimyada sık kullanılan birimler",
        paragraphs: [
          "Madde miktarı mol (mol), molar kütle g/mol, derişim mol/L (M) ya da mol/kg (m) ile ifade edilir. Normal koşullarda (0 °C, 1 atm) 1 mol ideal gaz 22,4 L hacim kaplar; Avogadro sayısı 6,022 × 10²³'tür.",
          "Basınç için atm, mmHg ve kPa; enerji için kJ ve kcal birlikte kullanılır. Bu birimler arasındaki dönüşümler için basınç ve enerji dönüşüm sayfalarına bakabilirsiniz.",
        ],
      },
    ],
    faq: [
      { question: "Molarite ile molalite arasındaki fark nedir?", answer: "Molarite bir litre çözeltideki çözünen mol sayısıdır (mol/L); molalite bir kilogram çözücüdeki çözünen mol sayısıdır (mol/kg). Molalite sıcaklıkla değişmez, bu yüzden donma ve kaynama noktası hesaplarında kullanılır." },
      { question: "pH nasıl hesaplanır?", answer: "pH = −log[H⁺] formülüyle bulunur. 25 °C'de pH + pOH = 14'tür; örneğin [H⁺] = 1 × 10⁻³ M olan bir çözeltinin pH'ı 3'tür." },
      { question: "Bu hesaplayıcılar AYT müfredatına uygun mu?", answer: "Evet. Mol kavramı, çözeltiler, tepkimelerde enerji, kimyasal denge ve elektrokimya konuları 9-12. sınıf ve AYT kimya müfredatını kapsar." },
    ],
  },
  {
    slug: "matematik",
    path: M,
    name: "Matematik",
    title: "Matematik Hesaplayıcıları",
    metaTitle: "Matematik Hesaplayıcıları: EBOB-EKOK, Denklem, Logaritma",
    metaDescription:
      "EBOB-EKOK, kesir, karekök, üslü sayılar, logaritma, denklem çözme, ortalama, standart sapma, permütasyon ve olasılık: adım adım çözümlü 25 matematik hesaplayıcısı.",
    intro:
      "Ortaokuldan üniversiteye matematik hesapları adım adım çözümleriyle: sayılar ve bölünebilme, kesirler ve yüzdeler, denklemler, istatistik ve olasılık, diziler.",
    groups: [
      {
        title: "Sayılar ve işlemler",
        tools: [
          { href: `${M}/ebob-ekok-hesaplama`, title: "EBOB-EKOK Hesaplama", description: "İki ya da daha fazla sayının ortak bölen ve katları, asal çarpanlarla." },
          { href: `${M}/bolen-sayisi-hesaplama`, title: "Bölen Sayısı Hesaplama", description: "Pozitif bölen sayısı, bölenlerin listesi ve toplamı." },
          { href: `${M}/faktoriyel-hesaplama`, title: "Faktöriyel Hesaplama", description: "n! değeri ve sondaki sıfır sayısı." },
          { href: `${M}/karekok-hesaplama`, title: "Karekök Hesaplama", description: "Karekök ve kökün sadeleştirilmiş hâli (√72 = 6√2)." },
          { href: `${M}/kupkok-hesaplama`, title: "Küpkök Hesaplama", description: "Küpkök ve sadeleştirme." },
          { href: `${M}/uslu-sayilar-hesaplama`, title: "Üslü Sayılar Hesaplama", description: "Pozitif, negatif ve sıfır üslerle üs alma." },
          { href: `${M}/logaritma-hesaplama`, title: "Logaritma Hesaplama", description: "Her tabanda logaritma, ln ve log₁₀; bilinmeyen taban ya da sayı." },
          { href: `${M}/sayilar`, title: "Sayı Özellikleri", description: "Bir sayının karesi, küpü, asal olup olmadığı ve bölenleri." },
          { href: "/sayi-tabani-cevirici", title: "Sayı Tabanı Çevirici", description: "İkili, sekizli, onlu ve onaltılık tabanlar arasında dönüşüm." },
        ],
      },
      {
        title: "Kesir, oran ve yüzde",
        tools: [
          { href: `${M}/kesir-hesaplama`, title: "Kesir Hesaplama", description: "Kesirlerle dört işlem ve sadeleştirme." },
          { href: `${M}/oran-oranti-hesaplama`, title: "Oran-Orantı Hesaplama", description: "a/b = c/d orantısında bilinmeyen terimi çapraz çarpımla bul." },
          { href: `${M}/yuzde-hesaplama`, title: "Yüzde Hesaplama", description: "Yüzde, yüzde artış-azalış ve bir sayının yüzdesi." },
        ],
      },
      {
        title: "Denklemler",
        tools: [
          { href: `${M}/1-bilinmeyenli-denklem-cozme`, title: "1 Bilinmeyenli Denklem Çözme", description: "Denklem ve eşitsizlikleri adım adım çöz; türev, integral ve limit ifadeleri." },
          { href: `${M}/ikinci-dereceden-denklem-cozme`, title: "İkinci Dereceden Denklem (Delta)", description: "Delta (diskriminant) ve kökler; çift kök ve gerçek kök yok durumları." },
          { href: `${M}/2-bilinmeyenli-denklem-sistemi-cozme`, title: "2 Bilinmeyenli Denklem Sistemi", description: "x ve y bilinmeyenli, doğrusal ya da doğrusal olmayan sistemler." },
          { href: `${M}/3-bilinmeyenli-denklem-sistemi-cozme`, title: "3 Bilinmeyenli Denklem Sistemi", description: "x, y ve z bilinmeyenli üç denklemli sistemler." },
        ],
      },
      {
        title: "İstatistik ve olasılık",
        tools: [
          { href: `${M}/ortalama-hesaplama`, title: "Ortalama, Medyan, Mod, Std. Sapma", description: "Bir veri setinin tüm temel istatistikleri tek seferde." },
          { href: `${M}/medyan-hesaplama`, title: "Medyan (Ortanca) Hesaplama", description: "Veri sayısı tek ya da çift olsa da ortadaki değer." },
          { href: `${M}/mod-hesaplama`, title: "Mod (Tepe Değer) Hesaplama", description: "En sık tekrar eden değer(ler)." },
          { href: `${M}/varyans-hesaplama`, title: "Varyans Hesaplama", description: "Örneklem ve anakütle varyansı." },
          { href: `${M}/standart-sapma-hesaplama`, title: "Standart Sapma Hesaplama", description: "Verinin ortalamadan ne kadar saptığı." },
          { href: `${M}/olasilik-hesaplama`, title: "Olasılık Hesaplama", description: "İstenen ve toplam durum sayısından klasik olasılık." },
          { href: `${M}/permutasyon-kombinasyon-hesaplama`, title: "Permütasyon ve Kombinasyon", description: "nPr, nCr ve klasik olasılık." },
        ],
      },
      {
        title: "Diziler",
        tools: [
          { href: `${M}/aritmetik-dizi-hesaplama`, title: "Aritmetik Dizi Hesaplama", description: "Genel terim, n. terim ve ilk n terimin toplamı." },
          { href: `${M}/geometrik-dizi-hesaplama`, title: "Geometrik Dizi Hesaplama", description: "Ortak çarpanlı dizilerde terim ve toplam." },
        ],
      },
    ],
    related: [
      { href: "/bilim-hesaplayicilari/geometri", label: "Geometri Hesaplayıcıları" },
      { href: "/harf-notu-hesaplama", label: "Harf Notu Hesaplama" },
      { href: "/kdv-hesaplama", label: "KDV Hesaplama" },
      { href: "/iki-tarih-arasi-gun-hesaplama", label: "İki Tarih Arası Gün Hesaplama" },
      { href: K, label: "Kimya Hesaplayıcıları" },
    ],
    sections: [
      {
        id: "adim-adim",
        title: "Adım adım çözüm neden önemli?",
        paragraphs: [
          "Hesaplayıcılar yalnızca sonucu değil, sonuca giden yolu da gösterir: EBOB-EKOK'ta asal çarpanlara ayırma, ikinci dereceden denklemde diskriminant, denklem sistemlerinde her çözüm adımı. Böylece ödevinizi kontrol ederken hatanın hangi adımda olduğunu görebilirsiniz.",
          "Kesirli ve ondalıklı sonuçlar mümkün olduğunda sadeleştirilmiş hâlde verilir; köklü ifadeler de √72 = 6√2 gibi en sade biçimde yazılır.",
        ],
      },
      {
        id: "istatistik",
        title: "Ortalama, medyan ve mod ne zaman kullanılır?",
        paragraphs: [
          "Aritmetik ortalama verinin genel düzeyini gösterir ama uç değerlerden etkilenir. Medyan sıralı verinin ortasıdır ve gelir gibi çarpık dağılımlarda daha güvenilirdir. Mod en sık tekrarlanan değerdir; ayakkabı numarası gibi kategorik verilerde işe yarar.",
          "Standart sapma verinin ortalama etrafında ne kadar dağıldığını gösterir. Veri bir örneklemse n − 1'e, tüm anakütleyse n'ye bölünür; hesaplayıcı ikisini de verir.",
        ],
      },
    ],
    faq: [
      { question: "EBOB ve EKOK nasıl bulunur?", answer: "Sayılar asal çarpanlarına ayrılır. EBOB, ortak asal çarpanların en küçük üslülerinin çarpımıdır; EKOK, tüm asal çarpanların en büyük üslülerinin çarpımıdır. İki sayı için EBOB × EKOK = sayıların çarpımıdır." },
      { question: "Delta (diskriminant) neyi gösterir?", answer: "ax² + bx + c = 0 denkleminde Δ = b² − 4ac'dir. Δ > 0 ise iki farklı gerçek kök, Δ = 0 ise çakışık (tek) kök, Δ < 0 ise gerçek kök yoktur." },
      { question: "Permütasyon ile kombinasyon farkı nedir?", answer: "Permütasyonda sıralama önemlidir (P(n,r) = n!/(n−r)!); kombinasyonda önemli değildir (C(n,r) = n!/(r!(n−r)!)). Örneğin 5 kişiden başkan ve yardımcı seçmek permütasyon, 2 kişilik ekip seçmek kombinasyondur." },
    ],
  },
  {
    slug: "fizik",
    path: "/bilim-hesaplayicilari/fizik",
    name: "Fizik",
    title: "Fizik Hesaplayıcıları",
    metaTitle: "Fizik Hesaplayıcıları: Eğik Atış, Kuvvet, Enerji, Genleşme",
    metaDescription:
      "Eğik atış, ısıl genleşme ve elastik uzama hesaplayıcıları; hız, ivme, kuvvet, enerji, basınç, güç ve tork birim dönüşümleri. Lise fiziği ve mühendislik için.",
    intro:
      "Hareket, kuvvet ve enerji hesapları ile fizikte kullanılan birimlerin dönüşümleri. Formüller SI birimleriyle verilir; sonuçları istediğiniz birime çevirebilirsiniz.",
    groups: [
      {
        title: "Fizik hesaplayıcıları",
        tools: [
          { href: "/bilim-hesaplayicilari/fizik/egik-atis-hesaplama", title: "Eğik Atış Hesaplama", description: "İlk hız, açı ve yükseklikten menzil, maksimum yükseklik ve uçuş süresi; yatay atış da." },
          { href: "/isil-genlesme-hesaplama", title: "Isıl Genleşme Hesaplama", description: "Sıcaklık değişiminde boy, alan ve hacim genleşmesi (ΔL = αL₀ΔT)." },
          { href: "/elastik-uzama-hesaplama", title: "Elastik Uzama Hesaplama", description: "Hooke yasası ve elastisite modülüyle çubuklarda uzama." },
          { href: "/buyuk-daire-mesafesi-hesaplama", title: "Büyük Daire Mesafesi", description: "Dünya üzerinde iki koordinat arasındaki en kısa mesafe." },
          { href: "/erime-kaynama-noktasi-hesaplama", title: "Erime ve Kaynama Noktası", description: "Elementlerin erime ve kaynama noktası °C, °F ve K olarak." },
        ],
      },
      {
        title: "Fizik birim dönüşümleri",
        tools: [
          { href: "/kategoriler/hiz", title: "Hız", description: "km/sa, m/s ve mph." },
          { href: "/kategoriler/ivme", title: "İvme", description: "m/s², ft/s² ve yerçekimi ivmesi (g)." },
          { href: "/kategoriler/kuvvet", title: "Kuvvet", description: "Newton ve kilogram-kuvvet." },
          { href: "/kategoriler/enerji", title: "Enerji", description: "Joule, kilovat-saat, kalori ve BTU." },
          { href: "/kategoriler/guc", title: "Güç", description: "Watt, kilowatt, megawatt ve beygir gücü." },
          { href: "/kategoriler/basinc", title: "Basınç", description: "Pascal, bar, PSI, mmHg ve atmosfer." },
          { href: "/kategoriler/tork", title: "Tork", description: "Newton-metre ve pound-fit." },
          { href: "/kategoriler/momentum", title: "Momentum", description: "kg·m/s ve newton-saniye (impuls)." },
          { href: "/kategoriler/frekans", title: "Frekans", description: "Hertz, kilohertz, megahertz ve gigahertz." },
        ],
      },
    ],
    related: [
      { href: "/muhendislik-hesaplayicilari", label: "Mühendislik Hesaplayıcıları" },
      { href: "/bilim-hesaplayicilari/matematik", label: "Matematik Hesaplayıcıları" },
      { href: "/bilim-hesaplayicilari/geometri", label: "Geometri Hesaplayıcıları" },
      { href: K, label: "Kimya Hesaplayıcıları" },
    ],
    sections: [
      {
        id: "si",
        title: "Fizikte SI birimleri",
        paragraphs: [
          "Uluslararası Birim Sistemi'nin (SI) yedi temel birimi metre, kilogram, saniye, amper, kelvin, mol ve kandeladır. Newton (kg·m/s²), joule (N·m), watt (J/s) ve pascal (N/m²) gibi birimler bunlardan türetilir.",
          "Soru çözerken tüm büyüklükleri önce SI birimine çevirmek hataları önler: km/sa değerini 3,6'ya bölerek m/s'ye, gramı 1000'e bölerek kilograma çevirin.",
        ],
      },
      {
        id: "egik-atis",
        title: "Eğik atışın temel formülleri",
        paragraphs: [
          "Hava direnci ihmal edildiğinde yatay hız sabit kalır (vₓ = v₀·cosθ), düşey hız ise yerçekimiyle azalır (v_y = v₀·sinθ − g·t). Menzil R = v₀²·sin2θ / g formülüyle bulunur ve aynı ilk hızla en uzak menzil 45°'lik atışta elde edilir.",
        ],
      },
    ],
    faq: [
      { question: "Yerçekimi ivmesi kaç alınmalı?", answer: "Standart değer g = 9,80665 m/s²'dir. Lise sorularında çoğunlukla 10 m/s² alınır; eğik atış hesaplayıcısında değeri değiştirebilirsiniz." },
      { question: "1 beygir gücü kaç watt?", answer: "Metrik beygir gücü (PS) 735,5 W, mekanik (İngiliz) beygir gücü (hp) yaklaşık 745,7 W'tır." },
      { question: "Newton ile kilogram-kuvvet farkı nedir?", answer: "1 kgf, 1 kg kütleye standart yerçekiminde etki eden kuvvettir ve 9,80665 N'a eşittir." },
    ],
  },
  {
    slug: "geometri",
    path: "/bilim-hesaplayicilari/geometri",
    name: "Geometri",
    title: "Geometri Hesaplayıcıları",
    metaTitle: "Geometri Hesaplayıcıları: Pisagor, Alan, Hacim, Açı",
    metaDescription:
      "Pisagor teoremi, alan ve hacim dönüşümleri, açı birimleri, tarla alanı, havuz hacmi ve merdiven eğimi: geometri ve ölçüm hesapları bir arada.",
    intro:
      "Dik üçgenden alan ve hacme, açı birimlerinden gerçek hayattaki ölçüm hesaplarına kadar geometri araçları. Okul soruları kadar tarla, havuz ya da merdiven gibi pratik hesaplar için de kullanılabilir.",
    groups: [
      {
        title: "Geometri hesaplayıcıları",
        tools: [
          { href: "/bilim-hesaplayicilari/geometri/pisagor-teoremi-hesaplama", title: "Pisagor Teoremi Hesaplama", description: "Dik üçgende hipotenüsü ya da dik kenarı c² = a² + b² ile adım adım bul." },
          { href: "/merdiven-hesaplama", title: "Merdiven Hesaplama", description: "Basamak sayısı, rıht yüksekliği ve Blondel formülüyle basamak derinliği." },
          { href: "/buyuk-daire-mesafesi-hesaplama", title: "Büyük Daire Mesafesi", description: "Küre üzerinde iki nokta arasındaki en kısa yol (haversine)." },
        ],
      },
      {
        title: "Alan ve hacim hesapları",
        tools: [
          { href: "/tarla-donum-hesaplama", title: "Tarla Dönüm Hesaplama", description: "Dikdörtgen, üçgen ya da düzensiz tarlanın alanı; dönüm ve m²." },
          { href: "/havuz-hacmi-hesaplama", title: "Havuz Hacmi Hesaplama", description: "Dikdörtgen ve yuvarlak havuzlarda m³ su hacmi." },
          { href: "/beton-hesaplama", title: "Beton Hesaplama", description: "Temel, döşeme ve kolon için beton hacmi ve çimento torbası." },
          { href: "/boya-hesaplama", title: "Boya Hesaplama", description: "Duvar alanından gereken boya miktarı." },
        ],
      },
      {
        title: "Ölçü birimi dönüşümleri",
        tools: [
          { href: "/kategoriler/uzunluk", title: "Uzunluk", description: "Metre, kilometre, inç, fit ve mil." },
          { href: "/kategoriler/alan", title: "Alan", description: "m², dönüm, dekar, hektar ve akre." },
          { href: "/kategoriler/hacim", title: "Hacim", description: "Litre, mililitre ve metreküp." },
          { href: "/kategoriler/aci", title: "Açı", description: "Derece, radyan ve gradyan." },
        ],
      },
    ],
    related: [
      { href: M, label: "Matematik Hesaplayıcıları" },
      { href: "/bilim-hesaplayicilari/fizik", label: "Fizik Hesaplayıcıları" },
      { href: "/insaatci-araclari", label: "İnşaatçı Araçları" },
      { href: "/mimar-araclari", label: "Mimar Araçları" },
    ],
    sections: [
      {
        id: "formuller",
        title: "Temel alan ve hacim formülleri",
        paragraphs: [
          "Dikdörtgenin alanı a × b, üçgenin alanı (taban × yükseklik) / 2, dairenin alanı π·r²'dir. Dikdörtgenler prizmasının hacmi a × b × c, silindirin hacmi π·r²·h, kürenin hacmi (4/3)·π·r³ ile bulunur.",
          "Dik üçgende hipotenüs c ise a² + b² = c² (Pisagor bağıntısı) geçerlidir. Bu bağıntı bir merdivenin eğim uzunluğunu, bir ekranın köşegenini ya da bir arazinin çapraz mesafesini bulmak için de kullanılır.",
        ],
      },
      {
        id: "birimler",
        title: "Alan ve hacim birimleri",
        paragraphs: [
          "1 m² = 10.000 cm², 1 dönüm (dekar) = 1.000 m², 1 hektar = 10.000 m²'dir. Hacimde 1 m³ = 1.000 litre, 1 litre = 1 dm³ = 1.000 cm³'tür. Ayrıntılı dönüşümler için alan ve hacim sayfalarına bakabilirsiniz.",
        ],
      },
    ],
    faq: [
      { question: "Pisagor teoremi hangi üçgenlerde geçerlidir?", answer: "Yalnızca dik üçgenlerde. Dik açının karşısındaki kenar (hipotenüs) en uzun kenardır ve karesi diğer iki kenarın karelerinin toplamına eşittir." },
      { question: "1 dönüm kaç metrekare?", answer: "Türkiye'de kullanılan dönüm (dekar) 1.000 m²'dir. Eski Osmanlı dönümü yaklaşık 919 m²'dir." },
      { question: "Derece radyana nasıl çevrilir?", answer: "Derece değeri π/180 ile çarpılır: 180° = π radyan ≈ 3,1416 rad, 90° = π/2 radyan." },
    ],
  },
  {
    slug: "biyoloji",
    path: "/bilim-hesaplayicilari/biyoloji",
    name: "Biyoloji",
    title: "Biyoloji Hesaplayıcıları",
    metaTitle: "Biyoloji Hesaplayıcıları: Kodon, Amino Asit, Peptit",
    metaDescription:
      "Kodon tablosu ile DNA/RNA dizisini amino asitlere çevirin, 20 amino asidin formül ve molar kütlelerini görün, peptit molar kütlesini hesaplayın.",
    intro:
      "Moleküler biyoloji ve biyokimya için araçlar: genetik kodu çözmek, amino asit özelliklerine bakmak ve peptitlerin molar kütlesini hesaplamak için.",
    groups: [
      {
        title: "Moleküler biyoloji",
        tools: [
          { href: "/bilim-hesaplayicilari/biyoloji/kodon-tablosu", title: "Kodon Tablosu ve DNA/RNA Çevirici", description: "DNA ya da RNA dizisini amino asit dizisine çevir; 64 kodonun tam listesi." },
          { href: "/bilim-hesaplayicilari/biyoloji/amino-asitler", title: "Amino Asitler", description: "20 standart amino asidin kısaltmaları, formülleri, molar kütleleri ve esansiyel olup olmadıkları." },
          { href: "/bilim-hesaplayicilari/biyoloji/peptit-molar-kutle-hesaplama", title: "Peptit Molar Kütle Hesaplama", description: "Gly-Ala-Val gibi bir diziden peptit zincirinin molar kütlesi." },
        ],
      },
      {
        title: "Biyokimya ve sağlık hesapları",
        tools: [
          { href: `${K}/bilesikler`, title: "Kimyasal Bileşikler", description: "Su, tuz, glikoz gibi yaygın bileşiklerin molar kütlesi." },
          { href: `${K}/molarite-hesaplama`, title: "Molarite Hesaplama", description: "Mol sayısı ve hacimden çözelti derişimi (mol/L)." },
          { href: "/kategoriler/kan-sekeri", title: "Kan Şekeri Birimleri", description: "mg/dL ile mmol/L arasında dönüşüm." },
          { href: "/vucut-yuzey-alani-hesaplama", title: "Vücut Yüzey Alanı", description: "Boy ve kilodan Mosteller formülüyle vücut yüzey alanı (m²)." },
        ],
      },
    ],
    related: [
      { href: K, label: "Kimya Hesaplayıcıları" },
      { href: "/doktor-hemsire-araclari", label: "Doktor ve Hemşire Araçları" },
      { href: "/bmi-hesaplama", label: "BMI Hesaplama" },
      { href: "/kategoriler/vitamin-d", label: "D Vitamini Birimleri" },
    ],
    sections: [
      {
        id: "genetik-kod",
        title: "Genetik kod nasıl okunur?",
        paragraphs: [
          "DNA'daki bilgi önce mRNA'ya kopyalanır (transkripsiyon), ardından ribozomda üçlü nükleotid grupları (kodonlar) hâlinde okunarak amino asitlere çevrilir (translasyon). 64 kodondan 61'i amino asitleri, 3'ü (UAA, UAG, UGA) dur sinyalini belirtir; AUG hem metiyonini hem başlangıç sinyalini kodlar.",
          "Kodon tablosu aracı yazdığınız DNA ya da RNA dizisini üçerli okuyarak amino asit dizisine çevirir.",
        ],
      },
      {
        id: "peptit",
        title: "Peptit kütlesi nasıl hesaplanır?",
        paragraphs: [
          "Her peptit bağı oluşurken bir su molekülü (18,015 g/mol) ayrılır. Bu yüzden n amino asitten oluşan bir peptidin kütlesi, amino asit kütlelerinin toplamından (n − 1) × 18,015 çıkarılarak bulunur.",
        ],
      },
    ],
    faq: [
      { question: "Kaç tane esansiyel amino asit vardır?", answer: "İnsanlar için 9 esansiyel amino asit vardır: histidin, izolösin, lösin, lizin, metiyonin, fenilalanin, treonin, triptofan ve valin. Bunlar vücutta üretilemez, besinlerle alınmalıdır." },
      { question: "Başlangıç kodonu hangisidir?", answer: "AUG (DNA'da ATG) başlangıç kodonudur ve metiyonini kodlar. Translasyon genellikle ilk AUG'den başlar." },
      { question: "Bir kodon kaç nükleotidden oluşur?", answer: "Üç nükleotidden. Dört farklı baz olduğu için 4³ = 64 farklı kodon vardır." },
    ],
  },
];

export function findScienceHub(slug: ScienceHub["slug"]) {
  return scienceHubs.find((h) => h.slug === slug)!;
}
