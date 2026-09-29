// Turkiye'de kullanilan altin cesitleri: Darphane ziynet ve Ata (Cumhuriyet) serisi, takı ayarlari.
// Darphane altinlari 22 ayar (916,6 milyem) basilir; agirliklar sabittir.
// Has karsiligi = agirlik × milyem / 1000 (24 ayar saf altin gramı).

export const ZIYNET_MILYEM = 916.6;

export type Sikke = {
  id: string;
  ad: string;
  kisa: string;
  seri: "ziynet" | "ata";
  gram: number;
  /** Tam (teklik) altının kaç katı */
  deger: number;
  aciklama: string;
};

export const SIKKELER: Sikke[] = [
  {
    id: "ceyrek-altin",
    ad: "Çeyrek altın",
    kisa: "Çeyrek",
    seri: "ziynet",
    gram: 1.754,
    deger: 0.25,
    aciklama:
      "En çok alınıp satılan ziynet altın; düğün ve doğum hediyelerinde en yaygın olanı.",
  },
  {
    id: "yarim-altin",
    ad: "Yarım altın",
    kisa: "Yarım",
    seri: "ziynet",
    gram: 3.508,
    deger: 0.5,
    aciklama: "İki çeyreğe eşdeğer ziynet altın.",
  },
  {
    id: "tam-altin",
    ad: "Tam altın",
    kisa: "Tam",
    seri: "ziynet",
    gram: 7.016,
    deger: 1,
    aciklama:
      "Ziynet serisinin teklik altını; halk arasında tam altın veya ziynet lira.",
  },
  {
    id: "gremse-altin",
    ad: "Gremse altın (ikibuçukluk)",
    kisa: "Gremse",
    seri: "ziynet",
    gram: 17.54,
    deger: 2.5,
    aciklama: "İki buçuk tam altın değerinde; genellikle düğünlerde takılır.",
  },
  {
    id: "besli-altin",
    ad: "Beşli altın",
    kisa: "Beşli",
    seri: "ziynet",
    gram: 35.08,
    deger: 5,
    aciklama: "Beş tam altın değerinde ziynet serisinin en büyük parçası.",
  },
  {
    id: "ata-ceyrek",
    ad: "Ata çeyrek",
    kisa: "Ata çeyrek",
    seri: "ata",
    gram: 1.804,
    deger: 0.25,
    aciklama:
      "Atatürk portreli Cumhuriyet serisinin çeyreği; ziynet çeyrekten 0,05 g ağır.",
  },
  {
    id: "ata-yarim",
    ad: "Ata yarım",
    kisa: "Ata yarım",
    seri: "ata",
    gram: 3.608,
    deger: 0.5,
    aciklama: "Cumhuriyet serisinin yarım altını.",
  },
  {
    id: "cumhuriyet-altini",
    ad: "Cumhuriyet altını (Ata lira)",
    kisa: "Ata lira",
    seri: "ata",
    gram: 7.216,
    deger: 1,
    aciklama:
      "Atatürk portreli teklik altın; yatırım için tercih edilir, ziynet tamdan 0,2 g ağır.",
  },
  {
    id: "ata-ikibucukluk",
    ad: "Ata ikibuçukluk",
    kisa: "Ata 2,5'luk",
    seri: "ata",
    gram: 18.04,
    deger: 2.5,
    aciklama: "Cumhuriyet serisinin ikibuçukluk altını.",
  },
  {
    id: "ata-besli",
    ad: "Ata beşli (Cumhuriyet beşlisi)",
    kisa: "Ata beşli",
    seri: "ata",
    gram: 36.08,
    deger: 5,
    aciklama: "Cumhuriyet serisinin en büyük altını.",
  },
];

export const AYARLAR = [
  { ayar: 24, milyem: 995, ad: "24 ayar (has, 995)" },
  { ayar: 22, milyem: 916, ad: "22 ayar (bilezik, 916)" },
  { ayar: 21, milyem: 875, ad: "21 ayar (875)" },
  { ayar: 18, milyem: 750, ad: "18 ayar (750)" },
  { ayar: 14, milyem: 585, ad: "14 ayar (585)" },
  { ayar: 10, milyem: 417, ad: "10 ayar (417)" },
  { ayar: 8, milyem: 333, ad: "8 ayar (333)" },
];

export const findSikke = (id: string) =>
  SIKKELER.find((s) => s.id === id) ?? null;

export const hasGram = (gram: number, milyem: number) => (gram * milyem) / 1000;

/** Ziynet/Ata adetlerinden toplam agirlik ve has altin. */
export function sikkeToplam(adetler: Record<string, number>) {
  let brut = 0;
  let tamKarsiligi = 0;
  for (const s of SIKKELER) {
    const n = Math.max(0, adetler[s.id] ?? 0);
    brut += n * s.gram;
    tamKarsiligi += n * s.deger;
  }
  return {
    brut,
    has: hasGram(brut, ZIYNET_MILYEM),
    tamKarsiligi,
    ceyrekKarsiligi: tamKarsiligi * 4,
  };
}

/**
 * Takı / bilezik: agirlik, ayar ve iscilik (milyem). Kuyumcu satis fiyati genelde
 * gram × (ayar milyemi + iscilik milyemi) / 1000 × has altin fiyati olarak hesaplanir.
 */
export function taki(
  gram: number,
  milyem: number,
  iscilikMilyem: number,
  hasFiyat?: number | null,
) {
  const has = hasGram(gram, milyem);
  const hasIscilikli = hasGram(gram, milyem + iscilikMilyem);
  return {
    has,
    hasIscilikli,
    deger: hasFiyat ? has * hasFiyat : null,
    satisFiyati: hasFiyat ? hasIscilikli * hasFiyat : null,
  };
}
