// Şehir bulutunda yazı boyutu için yaklaşık metropol nüfusu (milyon). Sayfada sayı olarak gösterilmez;
// yalnızca şehirleri büyükten küçüğe birkaç boy sınıfına ayırmak için kullanılır.
const NUFUS: Record<string, number> = {
  istanbul: 15.7, ankara: 5.8, izmir: 4.5, londra: 9.6, paris: 11.2, berlin: 4.7, amsterdam: 2.5, bruksel: 2.1,
  madrid: 6.8, barselona: 5.6, roma: 4.3, milano: 4.3, viyana: 2.9, zurih: 1.4, stokholm: 2.4, oslo: 1.1,
  kopenhag: 2.1, helsinki: 1.5, dublin: 1.5, lizbon: 2.9, atina: 3.6, varsova: 3.1, prag: 2.7, budapeste: 3.0,
  bukres: 2.3, sofya: 1.7, belgrad: 1.7, kiev: 3.5, moskova: 12.6, baku: 2.3, tiflis: 1.2, dubai: 3.6,
  riyad: 7.7, mekke: 2.4, doha: 2.4, kuveyt: 3.3, bagdat: 7.7, tahran: 9.4, amman: 4.6, beyrut: 2.4,
  kahire: 22.6, tokyo: 37.1, seul: 25.5, pekin: 21.9, sanghay: 29.2, "hong-kong": 7.5, singapur: 6.0,
  bangkok: 11.2, cakarta: 33.4, manila: 14.9, "kuala-lumpur": 8.6, "yeni-delhi": 33.8, mumbai: 21.7,
  karaci: 17.6, islamabad: 1.3, dakka: 23.9, katmandu: 1.6, taskent: 2.9, almati: 2.2, astana: 1.4,
  biskek: 1.1, askabat: 1.0, kabil: 4.6, taipei: 7.0, sidney: 5.4, melbourne: 5.2, perth: 2.3, auckland: 1.7,
  lagos: 16.6, nairobi: 5.3, johannesburg: 6.2, kazablanka: 4.3, tunus: 2.7, cezayir: 3.0, "addis-ababa": 5.7,
  "new-york": 19.5, washington: 6.3, "los-angeles": 12.5, sikago: 9.4, houston: 7.3, miami: 6.1,
  "san-francisco": 4.6, "las-vegas": 2.3, toronto: 6.7, vancouver: 2.7, montreal: 4.4, meksiko: 22.5,
  "sao-paulo": 22.8, "rio-de-janeiro": 13.8, "buenos-aires": 15.6, santiago: 6.9, lima: 11.2, bogota: 11.7,
  karakas: 3.0, havana: 2.1, honolulu: 1.0, anchorage: 0.4, lefkosa: 0.35, saraybosna: 0.55, pristine: 0.25,
  uskup: 0.6, tiran: 0.9, zagreb: 1.1, ljubljana: 0.55, bratislava: 0.7, kisinev: 0.8, minsk: 2.0, vilnius: 0.75,
  riga: 0.85, tallinn: 0.6, valletta: 0.4, luksemburg: 0.25, erivan: 1.1, sam: 2.6, maskat: 1.7, manama: 0.7,
  sana: 3.3, trablus: 1.2, hartum: 6.3, mogadisu: 2.8, dusanbe: 1.0, "ulan-batur": 1.7, hanoi: 8.6, male: 0.25,
  reykjavik: 0.24, podgorica: 0.2, kolombo: 5.6, yangon: 5.7, "phnom-penh": 2.3, pyongyang: 3.2,
  "bandar-seri-begawan": 0.25, montevideo: 1.8, quito: 2.0, "la-paz": 1.9, asuncion: 3.6, panama: 2.0,
  "san-jose": 1.4, "santo-domingo": 3.6, kingston: 1.2, dakar: 3.6, akra: 2.6, abidjan: 5.9, yaunde: 4.5,
  luanda: 9.6, kampala: 3.9, darusselam: 7.9, cibuti: 0.6, suva: 0.18,
};

/** Listedeki şehirlere, listenin kendi en küçüğü ve en büyüğüne göre (logaritmik) 1–5 arası boy verir. */
export function bulutBoylari(sluglar: string[]) {
  const log = sluglar.map((s) => Math.log(NUFUS[s] ?? 1));
  const enAz = Math.min(...log);
  const aralik = Math.max(...log) - enAz || 1;
  return new Map(sluglar.map((s, i) => [s, 1 + Math.round(((log[i] - enAz) / aralik) * 4)]));
}
