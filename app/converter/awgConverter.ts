// AWG (American Wire Gauge) capi, standart tanima gore surekli bir
// formulle hesaplanir (NBS/ASTM standardi): d(inch) = 0.005 x 92^((36-n)/39).
// Bu yuzden sabit bir tablo yerine formulden turetiliyor -- yanlis
// transkripsiyon riski tasimaz, tanimin kendisidir.

export function awgToDiameterMm(awg: number): number | null {
  if (!Number.isFinite(awg)) {
    return null;
  }

  const diameterInches = 0.005 * 92 ** ((36 - awg) / 39);

  return diameterInches * 25.4;
}

export function awgToAreaMm2(awg: number): number | null {
  const diameterMm = awgToDiameterMm(awg);

  if (diameterMm === null) {
    return null;
  }

  return (Math.PI / 4) * diameterMm ** 2;
}

export function areaMm2ToAwg(areaMm2: number): number | null {
  if (!Number.isFinite(areaMm2) || areaMm2 <= 0) {
    return null;
  }

  const diameterMm = Math.sqrt((4 * areaMm2) / Math.PI);
  const diameterInches = diameterMm / 25.4;
  const ratio = diameterInches / 0.005;

  if (ratio <= 0) {
    return null;
  }

  const exponent = Math.log(ratio) / Math.log(92);

  return 36 - exponent * 39;
}

// AWG 0'dan kalin olculer icin "n/0" gosterimi kullanilir (1/0, 2/0, 3/0,
// 4/0); formulde bunlar sirasiyla n = 0, -1, -2, -3'e karsilik gelir.
export const commonAwgSizes = [
  -3, -2, -1, 0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24,
] as const;

export function formatAwgLabel(awg: number): string {
  if (awg <= 0) {
    return `${1 - awg}/0 AWG`;
  }

  return `${awg} AWG`;
}
