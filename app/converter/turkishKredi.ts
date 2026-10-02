// Kredi taksit hesabı (Türkiye'deki bankaların ödeme planı yöntemi).
//
// Bankalar aylık faize KKDF ve BSMV'yi ekleyerek "vergili faiz" bulur ve eşit
// taksit (anüite) formülünü bu oranla uygular:
//   i = r × (1 + KKDF + BSMV)
//   taksit = anapara × i / (1 − (1 + i)^−n)
// Her ay: faiz = kalan anapara × r, KKDF = faiz × KKDF oranı, BSMV = faiz × BSMV
// oranı, anapara ödemesi = taksit − faiz − KKDF − BSMV.
//
// Oranlar kredi türüne göre varsayılan olarak gelir; kullanıcı değiştirebilir.

export type KrediTuru = "ihtiyac" | "tasit" | "konut";

export const KREDI_TURLERI: { id: KrediTuru; label: string; kkdf: number; bsmv: number }[] = [
  { id: "ihtiyac", label: "İhtiyaç kredisi", kkdf: 15, bsmv: 15 },
  { id: "tasit", label: "Taşıt kredisi", kkdf: 15, bsmv: 15 },
  // Konut kredisi KKDF ve BSMV'den muaftır; kredi kullanan kişinin üzerine
  // kayıtlı başka bir konut varsa istisna uygulanmayabilir.
  { id: "konut", label: "Konut kredisi", kkdf: 0, bsmv: 0 },
];

export type KrediGirdisi = {
  /** Çekilen tutar (TL) */
  anapara: number;
  /** Vade (ay) */
  vade: number;
  /** Aylık faiz oranı, yüzde olarak (ör. 3,49) */
  aylikFaiz: number;
  /** KKDF oranı, yüzde olarak */
  kkdf: number;
  /** BSMV oranı, yüzde olarak */
  bsmv: number;
};

export type OdemeSatiri = {
  ay: number;
  taksit: number;
  anapara: number;
  faiz: number;
  kkdf: number;
  bsmv: number;
  kalan: number;
};

export type KrediSonucu = {
  taksit: number;
  toplamOdeme: number;
  toplamFaiz: number;
  toplamKkdf: number;
  toplamBsmv: number;
  /** Faiz + KKDF + BSMV */
  toplamMaliyet: number;
  /** Vergiler dahil aylık efektif oran, yüzde olarak */
  vergiliAylikOran: number;
  plan: OdemeSatiri[];
};

export function krediHesapla({ anapara, vade, aylikFaiz, kkdf, bsmv }: KrediGirdisi): KrediSonucu | null {
  if (!(anapara > 0) || !Number.isInteger(vade) || vade < 1 || vade > 600) return null;
  if (!(aylikFaiz >= 0) || !(kkdf >= 0) || !(bsmv >= 0)) return null;

  const r = aylikFaiz / 100;
  const kkdfOran = kkdf / 100;
  const bsmvOran = bsmv / 100;
  const i = r * (1 + kkdfOran + bsmvOran);
  const taksit = i === 0 ? anapara / vade : (anapara * i) / (1 - Math.pow(1 + i, -vade));

  const plan: OdemeSatiri[] = [];
  let kalan = anapara;
  for (let ay = 1; ay <= vade; ay++) {
    const faiz = kalan * r;
    const ayKkdf = faiz * kkdfOran;
    const ayBsmv = faiz * bsmvOran;
    // Son ayda kayan nokta artığını kapat: kalan anapara tam sıfırlanır.
    const anaparaOdemesi = ay === vade ? kalan : taksit - faiz - ayKkdf - ayBsmv;
    kalan = ay === vade ? 0 : kalan - anaparaOdemesi;
    plan.push({ ay, taksit, anapara: anaparaOdemesi, faiz, kkdf: ayKkdf, bsmv: ayBsmv, kalan });
  }

  const toplam = (key: "faiz" | "kkdf" | "bsmv") => plan.reduce((sum, row) => sum + row[key], 0);
  const toplamFaiz = toplam("faiz");
  const toplamKkdf = toplam("kkdf");
  const toplamBsmv = toplam("bsmv");

  return {
    taksit,
    toplamOdeme: taksit * vade,
    toplamFaiz,
    toplamKkdf,
    toplamBsmv,
    toplamMaliyet: toplamFaiz + toplamKkdf + toplamBsmv,
    vergiliAylikOran: i * 100,
    plan,
  };
}
