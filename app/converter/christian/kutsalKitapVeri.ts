// Kutsal Kitap'ın 66 kitabı: Türkçe adlar ve bölüm sayıları. Bölüm sayıları bibleData.ts'deki Protestan kanonundan
// gelir; Türkçe Kutsal Kitap çevirilerinin bölüm yapısı aynıdır. Yalnızca sunucuda kullanılır (ayet verisi büyüktür).
import { BIBLE_ROWS } from "./bibleData";
import type { Kitap, KitapGrubu } from "./kutsalKitap";

export const KITAP_ADLARI = [
  "Yaratılış", "Mısır'dan Çıkış", "Levililer", "Çölde Sayım", "Yasa'nın Tekrarı", "Yeşu", "Hâkimler", "Rut", "1. Samuel", "2. Samuel",
  "1. Krallar", "2. Krallar", "1. Tarihler", "2. Tarihler", "Ezra", "Nehemya", "Ester", "Eyüp", "Mezmurlar", "Süleyman'ın Özdeyişleri",
  "Vaiz", "Ezgiler Ezgisi", "Yeşaya", "Yeremya", "Ağıtlar", "Hezekiel", "Daniel", "Hoşea", "Yoel", "Amos",
  "Ovadya", "Yunus", "Mika", "Nahum", "Habakkuk", "Sefanya", "Hagay", "Zekeriya", "Malaki",
  "Matta", "Markos", "Luka", "Yuhanna", "Elçilerin İşleri", "Romalılar", "1. Korintliler", "2. Korintliler", "Galatyalılar", "Efesliler",
  "Filipililer", "Koloseliler", "1. Selanikliler", "2. Selanikliler", "1. Timoteos", "2. Timoteos", "Titus", "Filimon", "İbraniler", "Yakup",
  "1. Petrus", "2. Petrus", "1. Yuhanna", "2. Yuhanna", "3. Yuhanna", "Yahuda", "Vahiy",
] as const;

const grubu = (sira: number): KitapGrubu =>
  sira <= 5 ? "Tevrat (Yasa)"
  : sira <= 17 ? "Tarih kitapları"
  : sira <= 22 ? "Şiir ve bilgelik"
  : sira <= 27 ? "Büyük peygamberler"
  : sira <= 39 ? "Küçük peygamberler"
  : sira <= 43 ? "Müjdeler"
  : sira === 44 ? "Elçilerin İşleri"
  : sira <= 57 ? "Pavlus'un mektupları"
  : sira <= 65 ? "Genel mektuplar"
  : "Vahiy";

export const KITAPLAR: Kitap[] = BIBLE_ROWS.map((r, i) => ({
  sira: i + 1,
  ad: KITAP_ADLARI[i],
  bolum: r[4].length,
  antlasma: i < 39 ? "eski" : "yeni",
  grup: grubu(i + 1),
}));

