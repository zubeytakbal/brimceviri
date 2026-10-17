// Para birimi sadeleştirmeleri (redenominasyon): kanunla belirlenmiş sabit oranlar.
// Türkiye: 5083 sayılı Türkiye Cumhuriyeti Devletinin Para Birimi Hakkında Kanun (1 Ocak 2005, 1 YTL = 1.000.000 TL);
//   1 Ocak 2009'da "Yeni" ibaresi kaldırıldı (1 YTL = 1 TL).
// Azerbaycan: 1 Ocak 2006, 1 AZN = 5.000 AZM (Azerbaycan Merkez Bankası).
// Türkmenistan: 1 Ocak 2009, 1 TMT = 5.000 TMM (Türkmenistan Merkez Bankası).
// Bu oranlar yalnızca adı değişen paranın karşılığıdır; enflasyon ve satın alma gücü hesaba katılmaz.

export type RedenominationUnit = { id: string; label: string; short: string; perNew: number };
export type RedenominationSystem = { id: string; country: string; date: string; units: RedenominationUnit[] };

export const REDENOMINATIONS: RedenominationSystem[] = [
  {
    id: "tr",
    country: "Türkiye",
    date: "1 Ocak 2005",
    units: [
      { id: "eski-tl", label: "Eski Türk lirası (2005 öncesi)", short: "eski TL", perNew: 1_000_000 },
      { id: "ytl", label: "Yeni Türk lirası (YTL, 2005–2008)", short: "YTL", perNew: 1 },
      { id: "tl", label: "Türk lirası (TL, 2009 sonrası)", short: "TL", perNew: 1 },
    ],
  },
  {
    id: "az",
    country: "Azerbaycan",
    date: "1 Ocak 2006",
    units: [
      { id: "azm", label: "Eski Azerbaycan manatı (AZM)", short: "AZM", perNew: 5000 },
      { id: "azn", label: "Yeni Azerbaycan manatı (AZN)", short: "AZN", perNew: 1 },
    ],
  },
  {
    id: "tm",
    country: "Türkmenistan",
    date: "1 Ocak 2009",
    units: [
      { id: "tmm", label: "Eski Türkmen manatı (TMM)", short: "TMM", perNew: 5000 },
      { id: "tmt", label: "Yeni Türkmen manatı (TMT)", short: "TMT", perNew: 1 },
    ],
  },
];

/** Aynı ülke içindeki iki para arasında dönüşüm: önce yeni paraya, sonra hedefe. */
export function convertRedenomination(systemId: string, value: number, fromId: string, toId: string): number | null {
  const system = REDENOMINATIONS.find((s) => s.id === systemId);
  const from = system?.units.find((u) => u.id === fromId);
  const to = system?.units.find((u) => u.id === toId);
  if (!from || !to || !Number.isFinite(value)) return null;
  return (value / from.perNew) * to.perNew;
}
