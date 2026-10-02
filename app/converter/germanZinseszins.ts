// Zinseszinsrechner (bileşik faiz + aylık birikim). Faiz oranını kullanıcı
// girer; yasal bir oran ya da vergi kullanılmaz, sonuç vergi öncesidir.
//
// Aylık birikim her ayın sonunda yatırılır (nachschüssig). Faiz:
// - "jaehrlich": yıl sonunda yazılır; yıl içindeki yatırımlar o yıl basit
//   faizle ay oranında kazanır (Sparkassen-/unterjährige Verzinsung).
// - "monatlich": her ay sonunda p/12 ile bileşik.

export type Zinsintervall = "jaehrlich" | "monatlich";

export type ZinseszinsInput = {
  startkapital: number;
  sparrate: number;
  zinssatz: number;
  jahre: number;
  intervall: Zinsintervall;
};

export type ZinseszinsJahr = {
  jahr: number;
  einzahlungen: number;
  zinsen: number;
  zinsenKumuliert: number;
  kapital: number;
};

export type ZinseszinsErgebnis = {
  endkapital: number;
  einzahlungen: number;
  zinsen: number;
  jahre: ZinseszinsJahr[];
};

export const MAX_JAHRE = 100;

export function zinseszins(input: ZinseszinsInput): ZinseszinsErgebnis | null {
  const { startkapital, sparrate, zinssatz, intervall } = input;
  const jahre = Math.round(input.jahre);
  if (![startkapital, sparrate, zinssatz].every(Number.isFinite)) return null;
  if (startkapital < 0 || sparrate < 0 || zinssatz < -100 || zinssatz > 1000) return null;
  if (!(jahre >= 1 && jahre <= MAX_JAHRE)) return null;

  const p = zinssatz / 100;
  let kapital = startkapital;
  let eingezahlt = startkapital;
  let zinsenKumuliert = 0;
  const rows: ZinseszinsJahr[] = [];

  for (let jahr = 1; jahr <= jahre; jahr++) {
    const kapitalVorher = kapital;
    let zinsenJahr = 0;

    if (intervall === "monatlich") {
      for (let monat = 1; monat <= 12; monat++) {
        const z = kapital * (p / 12);
        zinsenJahr += z;
        kapital += z + sparrate;
      }
    } else {
      // Yıl başındaki sermaye tam yıl; m. ayın sonunda yatan para (12 − m) ay faiz alır.
      let zinsenUnterjaehrig = 0;
      for (let monat = 1; monat <= 12; monat++) {
        zinsenUnterjaehrig += sparrate * p * ((12 - monat) / 12);
      }
      zinsenJahr = kapitalVorher * p + zinsenUnterjaehrig;
      kapital = kapitalVorher + 12 * sparrate + zinsenJahr;
    }

    eingezahlt += 12 * sparrate;
    zinsenKumuliert += zinsenJahr;
    rows.push({ jahr, einzahlungen: eingezahlt, zinsen: zinsenJahr, zinsenKumuliert, kapital });
  }

  return { endkapital: kapital, einzahlungen: eingezahlt, zinsen: zinsenKumuliert, jahre: rows };
}

/** Sermayenin ikiye katlanma süresi (yıl), aylık birikim olmadan. */
export function verdopplungszeit(zinssatz: number, intervall: Zinsintervall) {
  if (!(zinssatz > 0)) return Number.NaN;
  const p = zinssatz / 100;
  return intervall === "monatlich" ? Math.log(2) / (12 * Math.log(1 + p / 12)) : Math.log(2) / Math.log(1 + p);
}

/** Hedef sermayeye ulaşmak için gereken aylık birikim (ikili arama). */
export function benoetigteSparrate(ziel: number, input: Omit<ZinseszinsInput, "sparrate">) {
  const ohne = zinseszins({ ...input, sparrate: 0 });
  if (!ohne || !(ziel > 0)) return Number.NaN;
  if (ohne.endkapital >= ziel) return 0;
  let lo = 0;
  let hi = ziel / 12;
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    const r = zinseszins({ ...input, sparrate: mid });
    if (!r) return Number.NaN;
    if (r.endkapital < ziel) lo = mid;
    else hi = mid;
  }
  return hi;
}
