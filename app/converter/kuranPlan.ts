// Ezber planı ve hatim dağıtımı. Ayetler sıra numarasıyla (1-6236) tutulur; okuma payları
// ayet sayısına değil Medine mushafı sayfalarına göre bölünür, çünkü ayet uzunlukları çok farklıdır.
import { CUZ_BASLANGIC, SURELER } from "./sureler";
import { SAYFA_BASLANGIC } from "./sureMeta";

const ILK_ID: number[] = [];
let toplam = 0;
for (const sure of SURELER) {
  ILK_ID[sure.no] = toplam + 1;
  toplam += sure.ayet;
}
export const SON_ID = toplam;

export const ayetId = (sure: number, ayet: number) => ILK_ID[sure] + ayet - 1;

export function ayetKonum(id: number): [number, number] {
  let no = 114;
  while (no > 1 && ILK_ID[no] > id) no--;
  return [no, id - ILK_ID[no] + 1];
}

const SAYFA_ID = SAYFA_BASLANGIC.map(([s, a]) => ayetId(s, a));

/** Ayetin Medine mushafındaki sayfası (1-604). */
export function sayfaOf(id: number) {
  let lo = 0;
  let hi = SAYFA_ID.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (SAYFA_ID[mid] <= id) lo = mid;
    else hi = mid - 1;
  }
  return lo + 1;
}

export type Parca = { sure: number; ilk: number; son: number };

/** [ilkId, sonId] aralığını sure parçalarına ayırır: Bakara 280–286, Al-i İmran 1–10. */
export function parcalara(ilkId: number, sonId: number): Parca[] {
  const out: Parca[] = [];
  let id = ilkId;
  while (id <= sonId) {
    const [sure, ayet] = ayetKonum(id);
    const sureSon = ILK_ID[sure] + SURELER[sure - 1].ayet - 1;
    const bitis = Math.min(sonId, sureSon);
    out.push({ sure, ilk: ayet, son: bitis - ILK_ID[sure] + 1 });
    id = bitis + 1;
  }
  return out;
}

export function parcaMetni(p: Parca[]) {
  return p
    .map(({ sure, ilk, son }) => {
      const s = SURELER[sure - 1];
      if (ilk === 1 && son === s.ayet) return `${s.ad} (tamamı)`;
      return ilk === son ? `${s.ad} ${ilk}` : `${s.ad} ${ilk}–${son}`;
    })
    .join(", ");
}

export type EzberGunu = { gun: number; ilk: number; son: number };

export function ezberPlani(sureNo: number, gunluk: number): EzberGunu[] {
  const sure = SURELER[sureNo - 1];
  if (!sure || !(gunluk >= 1)) return [];
  const gunler: EzberGunu[] = [];
  for (let ilk = 1, gun = 1; ilk <= sure.ayet; ilk += gunluk, gun++) {
    gunler.push({ gun, ilk, son: Math.min(sure.ayet, ilk + gunluk - 1) });
  }
  return gunler;
}

/** Cüzün ayet aralığı [ilkId, sonId]. */
export function cuzAraligi(cuz: number): [number, number] {
  const [s, a] = CUZ_BASLANGIC[cuz - 1];
  const sonraki = CUZ_BASLANGIC[cuz];
  return [ayetId(s, a), sonraki ? ayetId(sonraki[0], sonraki[1]) - 1 : SON_ID];
}

export type Pay = { kisi: number; sayfaBas: number; sayfaSon: number; parcalar: Parca[] };

/**
 * [ilkId, sonId] aralığını kişi sayısına sayfa sayfa eşit böler. Sayfa sayısı kişiden azsa
 * kişi sayısı sayfa sayısına indirilir.
 */
export function dagit(ilkId: number, sonId: number, kisi: number): Pay[] {
  const ilkSayfa = sayfaOf(ilkId);
  const sonSayfa = sayfaOf(sonId);
  const sayfaSayisi = sonSayfa - ilkSayfa + 1;
  const n = Math.max(1, Math.min(Math.floor(kisi), sayfaSayisi));
  const paylar: Pay[] = [];
  let bas = ilkSayfa;
  for (let k = 0; k < n; k++) {
    const adet = Math.floor(sayfaSayisi / n) + (k < sayfaSayisi % n ? 1 : 0);
    const son = bas + adet - 1;
    const pIlk = Math.max(ilkId, SAYFA_ID[bas - 1]);
    const pSon = son >= 604 ? sonId : Math.min(sonId, SAYFA_ID[son] - 1);
    paylar.push({ kisi: k + 1, sayfaBas: bas, sayfaSon: son, parcalar: parcalara(pIlk, pSon) });
    bas = son + 1;
  }
  return paylar;
}
