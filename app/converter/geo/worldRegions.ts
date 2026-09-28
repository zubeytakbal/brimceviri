// Bolge haritalari: Turkiye'den en cok aranan bolgeler.
export type WorldRegionPage = {
  id: string;
  title: string;
  summary: string;
  /** Bolgedeki ulkeler (ISO3) */
  members: string[];
  /** Kismen bolgede sayilan ulkeler */
  partial?: string[];
  /** Gozlemci / ek ulkeler (Turk Devletleri Teskilati gibi) */
  observers?: string[];
  intro: string;
  paragraphs: string[];
};

export const worldRegionPages: WorldRegionPage[] = [
  {
    id: "orta-dogu",
    title: "Orta Doğu Haritası",
    summary: "Mısır'dan İran'a, Türkiye'den Yemen'e bölge ülkeleri.",
    members: ["TUR", "CYN", "CYP", "SYR", "LBN", "ISR", "PSE", "JOR", "IRQ", "IRN", "SAU", "KWT", "BHR", "QAT", "ARE", "OMN", "YEM", "EGY"],
    intro:
      "Orta Doğu; Asya, Afrika ve Avrupa'nın birleştiği, Akdeniz ile Basra Körfezi arasında uzanan bölgedir. Sınırları kaynaktan kaynağa değişir; bu haritada en yaygın tanım kullanılmıştır.",
    paragraphs: [
      "Bölgenin yüzölçümü en büyük ülkesi Suudi Arabistan, en küçüğü Bahreyn'dir. Ülkelerin çoğu Türkiye ile aynı saat dilimine yakındır; İran Türkiye'den 30 dakika ileridedir.",
      "Mısır'ın büyük bölümü Afrika'da olsa da Sina Yarımadası ve siyasi-kültürel bağları nedeniyle Orta Doğu'ya dahil edilir. Türkiye ise hem Avrupa hem Asya'da toprakları olan bir köprü ülkedir.",
    ],
  },
  {
    id: "orta-asya",
    title: "Orta Asya Haritası",
    summary: "Kazakistan, Kırgızistan, Özbekistan, Türkmenistan ve Tacikistan.",
    members: ["KAZ", "KGZ", "UZB", "TKM", "TJK"],
    partial: ["AFG", "MNG"],
    intro:
      "Orta Asya, Hazar Denizi'nden Çin'e, Rusya'dan Afganistan'a uzanan ve denize kıyısı olmayan beş ülkeden oluşan bölgedir. Tacikistan dışındaki dört ülkenin resmî dili bir Türk dilidir.",
    paragraphs: [
      "Kazakistan yaklaşık 2,7 milyon km² ile dünyanın denize kıyısı olmayan en büyük ülkesidir. Özbekistan ise Lihtenştayn ile birlikte, denize ulaşmak için iki ülke geçmesi gereken iki ülkeden biridir.",
      "Kazakistan, Özbekistan, Türkmenistan ve Tacikistan Türkiye'den 2 saat, Kırgızistan 3 saat ileridedir; Kazakistan 2024'te tüm ülkede UTC+5'e geçti. Afganistan ve Moğolistan bazı tanımlarda bölgeye dahil edilir.",
    ],
  },
  {
    id: "kafkasya",
    title: "Kafkasya Haritası",
    summary: "Azerbaycan, Gürcistan, Ermenistan ve çevresi.",
    members: ["AZE", "GEO", "ARM"],
    partial: ["RUS", "TUR", "IRN"],
    intro:
      "Kafkasya, Karadeniz ile Hazar Denizi arasındaki dağlık bölgedir. Güney Kafkasya'da Azerbaycan, Gürcistan ve Ermenistan yer alır; Kuzey Kafkasya ise Rusya Federasyonu'na bağlıdır.",
    paragraphs: [
      "Büyük Kafkas Dağları, Avrupa ile Asya arasındaki sınır olarak da kabul edilir. Bölgenin en yüksek noktası Rusya'daki Elbruz Dağı'dır (5.642 m).",
      "Azerbaycan, Gürcistan ve Ermenistan Türkiye'den 1 saat ileridedir. Azerbaycan'ın Nahçıvan Özerk Cumhuriyeti, Türkiye ile kara sınırı bulunan bir bölgedir.",
    ],
  },
  {
    id: "balkanlar",
    title: "Balkanlar Haritası",
    summary: "Balkan Yarımadası ülkeleri ve Türkiye'nin Trakya bölgesi.",
    members: ["ALB", "BIH", "BGR", "GRC", "XKX", "MNE", "MKD", "SRB"],
    partial: ["HRV", "ROU", "SVN", "TUR"],
    intro:
      "Balkanlar, Karadeniz, Ege, Adriyatik ve İyon denizleriyle çevrili yarımadadır. Adını Bulgaristan'daki Balkan (Koca Balkan) Dağları'ndan alır; Türkiye'nin Trakya bölgesi de yarımadadadır.",
    paragraphs: [
      "Hırvatistan, Romanya ve Slovenya yalnızca kısmen yarımadada yer aldıkları için bazı tanımlarda Balkan ülkesi sayılır, bazılarında sayılmaz. Haritada bu ülkeler daha açık renkle gösterilmiştir.",
      "Yunanistan, Bulgaristan ve Romanya Türkiye'den 1 saat geride (yaz aylarında aynı saatte), Batı Balkan ülkeleri ise kışın 2 saat, yazın 1 saat geridedir.",
    ],
  },
  {
    id: "turk-devletleri",
    title: "Türk Devletleri Haritası",
    summary: "Türk Devletleri Teşkilatı üyeleri ve gözlemcileri.",
    members: ["TUR", "AZE", "KAZ", "KGZ", "UZB"],
    observers: ["HUN", "TKM", "CYN"],
    intro:
      "Türk Devletleri Teşkilatı (TDT) 2009'da Türk Keneşi adıyla kuruldu. Türkiye, Azerbaycan, Kazakistan, Kırgızistan ve Özbekistan üyedir; Macaristan, Türkmenistan ve Kuzey Kıbrıs Türk Cumhuriyeti gözlemci statüsündedir.",
    paragraphs: [
      "Üye ülkelerin toplam yüzölçümü yaklaşık 4,2 milyon km²'dir; bunun yaklaşık üçte ikisi Kazakistan'a aittir. Ankara ile Bişkek arasındaki kuş uçuşu mesafe yaklaşık 3.500 km'dir.",
      "Teşkilatın sekretaryası İstanbul'dadır. Üyelerin saati Türkiye'den 0 ile 3 saat arasında ileridedir (Kırgızistan +3 saat).",
    ],
  },
];

export function findWorldRegion(id: string) {
  return worldRegionPages.find((r) => r.id === id) ?? null;
}
