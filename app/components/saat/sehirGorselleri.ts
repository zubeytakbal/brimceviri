import type { SehirGorseli } from "./SehirSaatiHero";

// Şehir sayfalarının arka plan fotoğrafları: o şehri tanıtan tarihi ya da simge yapı. Dosyalar public/saat/
// altında, kaynak, yazar ve lisans bilgisiyle (Wikimedia Commons, serbest lisanslı). Fotoğrafı olmayan şehirde
// koyu düz arka plan kullanılır.
const GORSELLER: Record<string, SehirGorseli> = {
  amsterdam: { dosya: "amsterdam", yer: "Kanallar", yazar: "Basile Morin", lisans: "CC BY-SA 4.0", kaynak: "https://commons.wikimedia.org/wiki/File:Colorful_windows_and_canal_houses_at_blue_hour_with_water_reflection_in_Damrak_Amsterdam_Netherlands.jpg" },
  atina: { dosya: "atina", yer: "Akropolis", yazar: "A.Savin", lisans: "CC BY-SA 3.0", kaynak: "https://commons.wikimedia.org/wiki/File:Attica_06-13_Athens_50_View_from_Philopappos_-_Acropolis_Hill.jpg" },
  belgrad: { dosya: "belgrad", yer: "Aziz Sava Katedrali", yazar: "Petar Milošević", lisans: "CC BY-SA 4.0", kaynak: "https://commons.wikimedia.org/wiki/File:Church_of_Saint_Sava_(Belgrade,_Serbia).jpg" },
  bruksel: { dosya: "bruksel", yer: "Grand-Place", yazar: "VitVit", lisans: "CC BY-SA 4.0", kaynak: "https://commons.wikimedia.org/wiki/File:Brusel_Grand-Place_domy_3.jpg" },
  dublin: { dosya: "dublin", yer: "Ha'penny Köprüsü", yazar: "P. Hughes", lisans: "CC BY 4.0", kaynak: "https://commons.wikimedia.org/wiki/File:Dubln_-_River_Liffey_with_Ha%27Penny_Bridge_in_distance.jpg" },
  helsinki: { dosya: "helsinki", yer: "Helsinki Katedrali", yazar: "Alvesgaspar", lisans: "CC BY-SA 3.0", kaynak: "https://commons.wikimedia.org/wiki/File:Helsinki_July_2013-27a.jpg" },
  izmir: { dosya: "izmir", yer: "Saat Kulesi, Konak", yazar: "Mors et Vita", lisans: "CC BY 4.0", kaynak: "https://commons.wikimedia.org/wiki/File:Izmir_Konak_Square_and_Clock_Tower,_2026.jpg" },
  kiev: { dosya: "kiev", yer: "Ayasofya Katedrali", yazar: "Rbrechko", lisans: "CC BY-SA 4.0", kaynak: "https://commons.wikimedia.org/wiki/File:80-391-0151_Kyiv_St.Sophia%27s_Cathedral_RB_18_2.jpg" },
  kopenhag: { dosya: "kopenhag", yer: "Nyhavn", yazar: "Moahim", lisans: "CC BY-SA 4.0", kaynak: "https://commons.wikimedia.org/wiki/File:2018_-_Nyhavn_on_sunset.jpg" },
  londra: { dosya: "londra", yer: "Tower Bridge", yazar: "Fuzzypiggy", lisans: "CC BY-SA 3.0", kaynak: "https://commons.wikimedia.org/wiki/File:Tower_Bridge_at_Dawn.jpg" },
  moskova: { dosya: "moskova", yer: "Kızıl Meydan ve Aziz Vasil Katedrali", yazar: "Wikimedia Commons", lisans: "Public domain", kaynak: "https://commons.wikimedia.org/wiki/File:Saint_Basil%27s_Cathedral,_Red_Square,_2009-06-19.jpg" },
  oslo: { dosya: "oslo", yer: "Opera Binası", yazar: "Pudelek (Marcin Szala)", lisans: "CC BY-SA 4.0", kaynak: "https://commons.wikimedia.org/wiki/File:New_Opera_in_Oslo.jpg" },
  prag: { dosya: "prag", yer: "Karlův Köprüsü", yazar: "Tadeáš Gregor", lisans: "CC BY-SA 4.0", kaynak: "https://commons.wikimedia.org/wiki/File:Charles_Bridge_Covid.jpg" },
  roma: { dosya: "roma", yer: "Kolezyum", yazar: "Diliff", lisans: "CC BY-SA 2.5", kaynak: "https://commons.wikimedia.org/wiki/File:Colosseum_in_Rome,_Italy_-_April_2007.jpg" },
  sofya: { dosya: "sofya", yer: "Aleksandr Nevski Katedrali", yazar: "acediscovery", lisans: "CC BY 4.0", kaynak: "https://commons.wikimedia.org/wiki/File:Alexander_Nevsky_Cathedral_Sofia.jpg" },
  stokholm: { dosya: "stokholm", yer: "Gamla Stan", yazar: "OleNeitzel", lisans: "CC BY 4.0", kaynak: "https://commons.wikimedia.org/wiki/File:Munkbroleden_with_Kornhamstorg_at_Gamla_Stan,_Stockholm,_Sweden_01.jpg" },
  tiflis: { dosya: "tiflis", yer: "Eski Tiflis", yazar: "GeoO", lisans: "CC BY-SA 4.0", kaynak: "https://commons.wikimedia.org/wiki/File:Old_Tbilisi_town_in_Tbilisi,_Georgia.jpg" },
  varsova: { dosya: "varsova", yer: "Eski Şehir Meydanı", yazar: "Rhododendrites", lisans: "CC BY-SA 4.0", kaynak: "https://commons.wikimedia.org/wiki/File:Market_Square_Warsaw_(22594p).jpg" },
};

export function sehirGorseli(sehirSlug: string): SehirGorseli | null {
  return GORSELLER[sehirSlug] ?? null;
}
