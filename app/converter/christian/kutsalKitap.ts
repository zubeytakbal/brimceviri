// Türkçe Kutsal Kitap okuma planı: 66 kitabın Türkiye'deki kiliselerde kullanılan Türkçe adları ve bölümleri.
// Kitap listesi kutsalKitapVeri.ts'de (yalnızca sunucuda); istemci bileşeni listeyi prop olarak alır.

export type KitapGrubu =
  | "Tevrat (Yasa)"
  | "Tarih kitapları"
  | "Şiir ve bilgelik"
  | "Büyük peygamberler"
  | "Küçük peygamberler"
  | "Müjdeler"
  | "Elçilerin İşleri"
  | "Pavlus'un mektupları"
  | "Genel mektuplar"
  | "Vahiy";

export type Kitap = { sira: number; ad: string; bolum: number; antlasma: "eski" | "yeni"; grup: KitapGrubu };

export type Kapsam = "tumu" | "eski" | "yeni" | "mujdeler" | "mezmur-ozdeyis";

export const KAPSAMLAR: Array<{ id: Kapsam; ad: string }> = [
  { id: "tumu", ad: "Kutsal Kitap'ın tamamı" },
  { id: "yeni", ad: "Yeni Antlaşma (İncil)" },
  { id: "eski", ad: "Eski Antlaşma" },
  { id: "mujdeler", ad: "Dört Müjde (Matta, Markos, Luka, Yuhanna)" },
  { id: "mezmur-ozdeyis", ad: "Mezmurlar ve Süleyman'ın Özdeyişleri" },
];

export function kapsamKitaplari(kitaplar: Kitap[], k: Kapsam) {
  return kitaplar.filter((b) =>
    k === "tumu" ? true : k === "eski" ? b.antlasma === "eski" : k === "yeni" ? b.antlasma === "yeni" : k === "mujdeler" ? b.grup === "Müjdeler" : b.sira === 19 || b.sira === 20,
  );
}

export type Bolum = { kitap: Kitap; no: number };
export type PlanGunu = { gun: number; ilk: Bolum; son: Bolum; adet: number };

/** Bölümleri günlere olabildiğince eşit böler (bölünmüyorsa ilk günler bir bölüm fazla alır). */
export function okumaPlani(kitaplar: Kitap[], gunSayisi: number): PlanGunu[] {
  const bolumler: Bolum[] = kitaplar.flatMap((kitap) => Array.from({ length: kitap.bolum }, (_, i) => ({ kitap, no: i + 1 })));
  const n = Math.min(Math.round(gunSayisi), bolumler.length);
  if (!(n >= 1)) return [];
  const taban = Math.floor(bolumler.length / n);
  const artan = bolumler.length % n;
  const out: PlanGunu[] = [];
  let i = 0;
  for (let gun = 1; gun <= n; gun++) {
    const adet = taban + (gun <= artan ? 1 : 0);
    out.push({ gun, ilk: bolumler[i], son: bolumler[i + adet - 1], adet });
    i += adet;
  }
  return out;
}

/** "Matta 1–3", "Mezmurlar 23" ya da "Malaki 4 – Matta 2". */
export function aralikMetni(ilk: Bolum, son: Bolum) {
  if (ilk.kitap === son.kitap) return ilk.no === son.no ? `${ilk.kitap.ad} ${ilk.no}` : `${ilk.kitap.ad} ${ilk.no}–${son.no}`;
  return `${ilk.kitap.ad} ${ilk.no} – ${son.kitap.ad} ${son.no}`;
}

/** Plana göre durum: bugüne kadar okunması gereken bölüm, geride kalınan bölüm ve kalan günlerde gereken hız. */
export function planDurumu(toplam: number, okunan: number, gunSayisi: number, gecenGun: number) {
  if (!(toplam > 0) || !(okunan >= 0) || okunan > toplam || !(gunSayisi >= 1) || !(gecenGun >= 0)) return null;
  const kalanGun = Math.max(0, Math.round(gunSayisi) - Math.round(gecenGun));
  const beklenen = Math.min(toplam, Math.round((toplam / gunSayisi) * gecenGun));
  return { beklenen, geride: Math.max(0, beklenen - okunan), kalanBolum: toplam - okunan, kalanGun, yeniHiz: kalanGun > 0 ? (toplam - okunan) / kalanGun : null };
}
