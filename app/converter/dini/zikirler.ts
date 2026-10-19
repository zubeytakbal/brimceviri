// Zikirmatik verisi ve hesapları: zikirlerin Arapça yazılışı, okunuşu ve anlamı; namaz sonrası tesbihat sırası;
// günlük sayım istatistikleri (bugün, son 7/30 gün, kaç gün üst üste). Hepsi tarayıcıda, cihazda saklanır.
import { addDaysYmd, parseYmd, ymdKey } from "../time/dateMath";

export type Zikir = { id: string; ad: string; arapca: string; anlam: string; kaynak?: string };

export const ZIKIRLER: Zikir[] = [
  { id: "subhanallah", ad: "Sübhânallah", arapca: "سُبْحَانَ اللّٰهِ", anlam: "Allah'ı her türlü eksiklik ve kusurdan tenzih ederim." },
  { id: "elhamdulillah", ad: "Elhamdülillâh", arapca: "اَلْحَمْدُ لِلّٰهِ", anlam: "Hamd (övgü ve şükür) Allah'a mahsustur." },
  { id: "allahuekber", ad: "Allâhu Ekber", arapca: "اَللّٰهُ أَكْبَرُ", anlam: "Allah en büyüktür." },
  { id: "kelimeitevhid", ad: "Lâ ilâhe illallâh", arapca: "لَا إِلٰهَ إِلَّا اللّٰهُ", anlam: "Allah'tan başka ilah yoktur." },
  { id: "estagfirullah", ad: "Estağfirullâh", arapca: "أَسْتَغْفِرُ اللّٰهَ", anlam: "Allah'tan bağışlanma dilerim." },
  { id: "salavat", ad: "Allâhümme salli alâ Muhammed", arapca: "اَللّٰهُمَّ صَلِّ عَلَى مُحَمَّدٍ", anlam: "Allah'ım, Muhammed'e rahmet eyle (salavât)." },
  {
    id: "subhanallahivebihamdihi",
    ad: "Sübhânallâhi ve bihamdihî",
    arapca: "سُبْحَانَ اللّٰهِ وَبِحَمْدِهِ",
    anlam: "Allah'ı hamd ile tesbih ederim.",
    kaynak: "Buhârî, Daavât 65; Müslim, Zikir 28 (günde yüz defa söyleyenin fazileti)",
  },
  { id: "lahavle", ad: "Lâ havle ve lâ kuvvete illâ billâh", arapca: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللّٰهِ", anlam: "Güç ve kuvvet ancak Allah'ın yardımıyladır." },
  { id: "hasbunallah", ad: "Hasbünallâhu ve ni'mel vekîl", arapca: "حَسْبُنَا اللّٰهُ وَنِعْمَ الْوَكِيلُ", anlam: "Allah bize yeter, O ne güzel vekildir.", kaynak: "Âl-i İmrân 3/173" },
];

export const SERBEST: Zikir = { id: "serbest", ad: "Serbest zikir", arapca: "", anlam: "Dilediğiniz zikri sayın." };

export const zikirBul = (id: string) => ZIKIRLER.find((z) => z.id === id) ?? SERBEST;

/** Namaz sonrası tesbihat: 33 + 33 + 33 ve yüze tamamlayan tevhid (Müslim, Mesâcid 146). */
export const TESBIHAT_KAYNAK = "Müslim, Mesâcid 146";
export const TESBIHAT: Array<{ zikir: Zikir; adet: number }> = [
  { zikir: ZIKIRLER[0], adet: 33 },
  { zikir: ZIKIRLER[1], adet: 33 },
  { zikir: ZIKIRLER[2], adet: 33 },
  {
    zikir: {
      id: "tevhid-tamamlama",
      ad: "Lâ ilâhe illallâhu vahdehû lâ şerîke leh, lehü'l-mülkü ve lehü'l-hamdü ve hüve alâ külli şey'in kadîr",
      arapca: "لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
      anlam: "Allah'tan başka ilah yoktur; O tektir, ortağı yoktur. Mülk O'nundur, hamd O'na mahsustur ve O her şeye gücü yetendir.",
      kaynak: TESBIHAT_KAYNAK,
    },
    adet: 1,
  },
];

/** Bir sıra (tesbihat ya da kişisel liste) içinde toplam sayıya göre hangi adımda olunduğu. */
export function siraKonumu(adimlar: Array<{ adet: number }>, sayi: number) {
  let kalan = sayi;
  for (let i = 0; i < adimlar.length; i += 1) {
    if (kalan < adimlar[i].adet) return { adim: i, adimIci: kalan, bitti: false };
    kalan -= adimlar[i].adet;
  }
  return { adim: adimlar.length - 1, adimIci: adimlar[adimlar.length - 1]?.adet ?? 0, bitti: true };
}

/** Günlük sayımlar: "YYYY-AA-GG" → o gün çekilen zikir sayısı. */
export type GunlukSayim = Record<string, number>;

export function gunlukEkle(s: GunlukSayim, gun: string, n: number): GunlukSayim {
  return { ...s, [gun]: Math.max(0, (s[gun] ?? 0) + n) };
}

export function sonGunler(s: GunlukSayim, bugun: string, gunSayisi: number) {
  const b = parseYmd(bugun)!;
  return Array.from({ length: gunSayisi }, (_, i) => {
    const k = ymdKey(addDaysYmd(b, i - gunSayisi + 1));
    return { gun: k, sayi: s[k] ?? 0 };
  });
}

export function istatistik(s: GunlukSayim, bugun: string) {
  const top = (n: number) => sonGunler(s, bugun, n).reduce((t, g) => t + g.sayi, 0);
  // Üst üste zikir çekilen gün sayısı: bugün henüz çekilmediyse dünden geriye sayılır.
  const b = parseYmd(bugun)!;
  let d = (s[bugun] ?? 0) > 0 ? b : addDaysYmd(b, -1);
  let seri = 0;
  while ((s[ymdKey(d)] ?? 0) > 0) {
    seri += 1;
    d = addDaysYmd(d, -1);
  }
  return { bugun: s[bugun] ?? 0, hafta: top(7), ay: top(30), seri, tumu: Object.values(s).reduce((t, x) => t + x, 0) };
}

/** Zikir hakkında ayet ve hadisler (meal ve kaynak). */
export const ZIKIR_NASLAR: Array<{ metin: string; kaynak: string }> = [
  { metin: "Bilesiniz ki kalpler ancak Allah'ı anmakla huzur bulur.", kaynak: "Ra'd 13/28" },
  { metin: "Öyleyse yalnız beni anın ki ben de sizi anayım. Bana şükredin, nankörlük etmeyin.", kaynak: "Bakara 2/152" },
  { metin: "Ey iman edenler! Allah'ı çokça anın ve O'nu sabah akşam tesbih edin.", kaynak: "Ahzâb 33/41-42" },
  {
    metin: "İki kelime vardır ki dile hafif, mizanda ağır, Rahmân'a sevimlidir: Sübhânallâhi ve bihamdihî, Sübhânallâhi'l-azîm.",
    kaynak: "Buhârî, Tevhîd 58; Müslim, Zikir 31",
  },
  {
    metin: "Kim günde yüz defa \"Sübhânallâhi ve bihamdihî\" derse, deniz köpüğü kadar da olsa günahları bağışlanır.",
    kaynak: "Buhârî, Daavât 65; Müslim, Zikir 28",
  },
  {
    metin:
      "Kim her namazın ardından otuz üç defa Sübhânallah, otuz üç defa Elhamdülillâh, otuz üç defa Allâhu Ekber der ve yüzü tamamlamak için \"Lâ ilâhe illallâhu vahdehû lâ şerîke leh, lehü'l-mülkü ve lehü'l-hamdü ve hüve alâ külli şey'in kadîr\" derse, deniz köpüğü kadar da olsa günahları bağışlanır.",
    kaynak: TESBIHAT_KAYNAK,
  },
];
