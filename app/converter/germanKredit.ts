// Almanca kredi hesapları (Annuitätendarlehen): aylık eşit taksit, faiz
// kalan borca göre aylık işler. Oranları kullanıcı girer; yasal bir oran
// kullanılmaz. Ücret ve sigortalar hesaba katılmaz.
//
// - Ratenkredit: bankalar "effektiver Jahreszins" ilan eder. Ücretsiz bir
//   kredide aylık oran i, (1 + i)^12 = 1 + effektiv olacak şekilde bulunur
//   (PAngV'deki üstel yöntem); Sollzins = 12 × i.
// - Baufinanzierung: Sollzins nominaldir, aylık oran = Sollzins ÷ 12;
//   aylık taksit = Darlehen × (Sollzins + anfängliche Tilgung) ÷ 12.

export const MAX_MONATE = 100 * 12;

/** Efektif yıllık faizden (%) aylık oran. */
export const monatszinsAusEffektiv = (effektivProzent: number) => (1 + effektivProzent / 100) ** (1 / 12) - 1;

/** Nominal yıllık faizden (Sollzins, %) efektif yıllık faiz (%). */
export const effektivAusSollzins = (sollzinsProzent: number) => ((1 + sollzinsProzent / 100 / 12) ** 12 - 1) * 100;

/** Annuität: n ayda borcu sıfırlayan aylık taksit. */
export function monatsrate(betrag: number, monatszins: number, monate: number) {
  if (!(betrag > 0) || !(monate >= 1) || !Number.isFinite(monatszins)) return Number.NaN;
  if (monatszins === 0) return betrag / monate;
  const q = (1 + monatszins) ** monate;
  return (betrag * monatszins * q) / (q - 1);
}

/** Aylık taksit verilince alınabilecek kredi tutarı (bugünkü değer). */
export function kreditbetragAusRate(rate: number, monatszins: number, monate: number) {
  if (!(rate > 0) || !(monate >= 1) || !Number.isFinite(monatszins)) return Number.NaN;
  if (monatszins === 0) return rate * monate;
  return (rate * (1 - (1 + monatszins) ** -monate)) / monatszins;
}

export type TilgungsJahr = {
  jahr: number;
  zinsen: number;
  tilgung: number;
  sondertilgung: number;
  restschuld: number;
};

export type Tilgungsplan = {
  jahre: TilgungsJahr[];
  /** Borcun bittiği ay; taksit faizi karşılamıyorsa null. */
  laufzeitMonate: number | null;
  gesamtZinsen: number;
  gesamtGezahlt: number;
};

/**
 * Aylık taksitle geri ödeme planı. Yıllık özel ödeme (Sondertilgung) her yıl
 * sonunda kalan borçtan düşülür. Son taksit kalan borç kadardır.
 */
export function tilgungsplan({
  betrag,
  monatszins,
  rate,
  sondertilgungProJahr = 0,
  maxMonate = MAX_MONATE,
}: {
  betrag: number;
  monatszins: number;
  rate: number;
  sondertilgungProJahr?: number;
  maxMonate?: number;
}): Tilgungsplan | null {
  if (!(betrag > 0) || !(rate > 0) || !(monatszins >= 0) || !(sondertilgungProJahr >= 0)) return null;

  let rest = betrag;
  let gesamtZinsen = 0;
  let gesamtGezahlt = 0;
  let laufzeitMonate: number | null = null;
  const jahre: TilgungsJahr[] = [];
  let jahr: TilgungsJahr = { jahr: 1, zinsen: 0, tilgung: 0, sondertilgung: 0, restschuld: rest };

  for (let monat = 1; monat <= maxMonate; monat++) {
    const zinsen = rest * monatszins;
    const zahlung = Math.min(rate, rest + zinsen);
    const tilgung = zahlung - zinsen;
    if (tilgung <= 0 && rest > 0) return { jahre, laufzeitMonate: null, gesamtZinsen, gesamtGezahlt };

    rest -= tilgung;
    jahr.zinsen += zinsen;
    jahr.tilgung += tilgung;
    gesamtZinsen += zinsen;
    gesamtGezahlt += zahlung;

    if (monat % 12 === 0 && rest > 1e-9 && sondertilgungProJahr > 0) {
      const sonder = Math.min(sondertilgungProJahr, rest);
      rest -= sonder;
      jahr.sondertilgung += sonder;
      gesamtGezahlt += sonder;
    }

    if (rest <= 1e-9) {
      rest = 0;
      laufzeitMonate = monat;
    }

    if (monat % 12 === 0 || rest === 0) {
      jahr.restschuld = rest;
      jahre.push(jahr);
      if (rest === 0) break;
      jahr = { jahr: jahr.jahr + 1, zinsen: 0, tilgung: 0, sondertilgung: 0, restschuld: rest };
    }
  }

  return { jahre, laufzeitMonate, gesamtZinsen, gesamtGezahlt };
}

/** Konut kredisi: Darlehen × (Sollzins + anfängliche Tilgung) ÷ 12. */
export const baufiRate = (darlehen: number, sollzinsProzent: number, tilgungProzent: number) =>
  (darlehen * (sollzinsProzent + tilgungProzent)) / 100 / 12;

/** n yıl sonundaki kalan borç (Zinsbindung sonu); plan daha önce biterse 0. */
export function restschuldNachJahren(plan: Tilgungsplan, jahre: number) {
  if (jahre <= 0) return Number.NaN;
  const row = plan.jahre[jahre - 1];
  return row ? row.restschuld : 0;
}
