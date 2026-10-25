// Bilim hesaplayicilari alt hub'larinin icerigi: gruplu arac listesi, kisa rehber ve SSS.
import type { FaqItem } from "./faqSchema";

export type ScienceHubTool = { href: string; title: string; description: string };

export type ScienceHub = {
  slug: "kimya" | "matematik";
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
    metaTitle: "Kimya Hesaplayıcıları: Mol, Periyodik Tablo, Bileşikler",
    metaDescription:
      "Mol ve atom kütlesi hesaplama, pil potansiyeli, periyodik tablo, yaygın bileşiklerin molar kütleleri ve kodon tablosu: adım adım çözümlü kimya araçları.",
    intro:
      "Lise ve üniversite kimyasında mol ve kütle dönüşümleri, atom kütlesi ve pil potansiyeli hesapları; elementler ve bileşikler için başvuru tabloları. Her araç formülü ve adım adım çözümü gösterir.",
    groups: [
      {
        title: "Elementler, bileşikler ve mol",
        tools: [
          { href: `${K}/periyodik-tablo`, title: "Periyodik Tablo", description: "İnteraktif tablo; 118 elementin atom numarası ve kütlesi, sık aranan elementler için ayrıntılı sayfa." },
          { href: `${K}/bilesikler`, title: "Kimyasal Bileşikler (Molar Kütle)", description: "Yaygın bileşiklerin formülü ve molar kütlesi (g/mol)." },
          { href: `${K}/atom-kutlesi-hesaplama`, title: "Atom Kütlesi Hesaplama", description: "İzotop bolluklarından ortalama atom kütlesini hesapla." },
          { href: `${K}/mol-hesaplama`, title: "Mol Hesaplama", description: "Kütle ve molar kütleden mol sayısı; mol sayısından kütle ve tanecik sayısı." },
        ],
      },
      {
        title: "Elektrokimya",
        tools: [
          { href: `${K}/pil-potansiyeli-hesaplama`, title: "Pil Potansiyeli Hesaplama", description: "Standart indirgenme potansiyellerinden E°pil." },
        ],
      },
      {
        title: "Biyokimya",
        tools: [
          { href: "/bilim-hesaplayicilari/biyoloji/kodon-tablosu", title: "Kodon Tablosu ve DNA/RNA Çevirici", description: "DNA ya da RNA dizisini amino asit dizisine çevir; 64 kodonun tam listesi." },
        ],
      },
    ],
    related: [
      { href: "/kategoriler/yogunluk", label: "Yoğunluk Dönüşümleri" },
      { href: "/kategoriler/basinc", label: "Basınç Dönüşümleri" },
      { href: "/kategoriler/sicaklik", label: "Sıcaklık Dönüşümleri" },
      { href: "/erime-kaynama-noktasi-hesaplama", label: "Erime ve Kaynama Noktası" },
      { href: M, label: "Matematik Hesaplayıcıları" },
    ],
    sections: [
      {
        id: "nereden-baslamali",
        title: "Hangi hesaplayıcıyı kullanmalıyım?",
        paragraphs: [
          "Soruda gram verilip mol isteniyorsa önce mol hesaplayıcısını, bunun için gereken molar kütleyi bileşikler listesinden ya da periyodik tablodan kullanın. İzotop bolluklarından ortalama atom kütlesi isteniyorsa atom kütlesi hesaplayıcısı kullanılır.",
          "Elektrokimya sorularında pil potansiyeli aracı, iki yarı tepkimenin standart indirgenme potansiyellerinden E°pil değerini ve hücrenin kendiliğinden çalışıp çalışmadığını verir.",
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
      { question: "Bu hesaplayıcılar AYT müfredatına uygun mu?", answer: "Mol kavramı, atom kütlesi ve elektrokimya konuları 9-12. sınıf ve AYT kimya müfredatında yer alır; araçlar bu konulardaki hesapları adım adım gösterir." },
    ],
  },
  {
    slug: "matematik",
    path: M,
    name: "Matematik",
    title: "Matematik Hesaplayıcıları",
    metaTitle: "Matematik Hesaplayıcıları: EBOB-EKOK, Denklem, Olasılık",
    metaDescription:
      "EBOB-EKOK, bölen sayısı, karekök, yüzde, ikinci dereceden denklem, denklem sistemleri, ortalama, olasılık, permütasyon ve Pisagor teoremi: adım adım çözümlü matematik hesaplayıcıları.",
    intro:
      "Ortaokuldan üniversiteye matematik hesapları adım adım çözümleriyle: sayılar ve bölünebilme, yüzdeler, denklemler, istatistik ve olasılık, geometri.",
    groups: [
      {
        title: "Sayılar ve işlemler",
        tools: [
          { href: `${M}/ebob-ekok-hesaplama`, title: "EBOB-EKOK Hesaplama", description: "İki ya da daha fazla sayının ortak bölen ve katları, asal çarpanlarla." },
          { href: `${M}/bolen-sayisi-hesaplama`, title: "Bölen Sayısı Hesaplama", description: "Pozitif bölen sayısı, bölenlerin listesi ve toplamı." },
          { href: `${M}/karekok-hesaplama`, title: "Karekök Hesaplama", description: "Karekök ve kökün sadeleştirilmiş hâli (√72 = 6√2)." },
          { href: "/sayi-tabani-cevirici", title: "Sayı Tabanı Çevirici", description: "İkili, sekizli, onlu ve onaltılık tabanlar arasında dönüşüm." },
        ],
      },
      {
        title: "Yüzde",
        tools: [
          { href: `${M}/yuzde-hesaplama`, title: "Yüzde Hesaplama", description: "Yüzde, yüzde artış-azalış ve bir sayının yüzdesi." },
        ],
      },
      {
        title: "Denklemler",
        tools: [
          { href: `${M}/ikinci-dereceden-denklem-cozme`, title: "İkinci Dereceden Denklem (Delta)", description: "Delta (diskriminant) ve kökler; çift kök ve gerçek kök yok durumları." },
          { href: `${M}/2-bilinmeyenli-denklem-sistemi-cozme`, title: "2 Bilinmeyenli Denklem Sistemi", description: "x ve y bilinmeyenli, doğrusal ya da doğrusal olmayan sistemler." },
          { href: `${M}/3-bilinmeyenli-denklem-sistemi-cozme`, title: "3 Bilinmeyenli Denklem Sistemi", description: "x, y ve z bilinmeyenli üç denklemli sistemler." },
        ],
      },
      {
        title: "İstatistik ve olasılık",
        tools: [
          { href: `${M}/ortalama-hesaplama`, title: "Ortalama, Medyan, Mod, Std. Sapma", description: "Bir veri setinin tüm temel istatistikleri tek seferde." },
          { href: `${M}/mod-hesaplama`, title: "Mod (Tepe Değer) Hesaplama", description: "En sık tekrar eden değer(ler)." },
          { href: `${M}/olasilik-hesaplama`, title: "Olasılık Hesaplama", description: "İstenen ve toplam durum sayısından klasik olasılık." },
          { href: `${M}/permutasyon-kombinasyon-hesaplama`, title: "Permütasyon ve Kombinasyon", description: "nPr, nCr ve klasik olasılık." },
        ],
      },
      {
        title: "Geometri",
        tools: [
          { href: "/bilim-hesaplayicilari/geometri/pisagor-teoremi-hesaplama", title: "Pisagor Teoremi Hesaplama", description: "Dik üçgende hipotenüsü ya da dik kenarı c² = a² + b² ile adım adım bul." },
        ],
      },
    ],
    related: [
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
];

export function findScienceHub(slug: ScienceHub["slug"]) {
  return scienceHubs.find((h) => h.slug === slug)!;
}
