// Tek atom Lewis nokta gosterimi -- yalnizca ana grup elementleri
// (grup 1, 2, 13-18) icin anlamlidir; gecis metalleri, lantanitler ve
// aktinitler icin standart bir Lewis nokta gosterimi mufredatta
// ogretilmez, bu yuzden bu elementler icin null donulur.

import type { PeriodicElement } from "./periodicTableData";

export function getValenceElectronCount(
  element: PeriodicElement
): number | null {
  const { group, atomicNumber } = element;

  if (group === null) {
    return null;
  }

  if (atomicNumber === 2) {
    // Helyum: 18. grupta olmasina ragmen 1. periyotta oldugu icin
    // dolu kabugu 8 degil 2 degerlik elektronu icerir.
    return 2;
  }

  if (group === 1 || group === 2) {
    return group;
  }

  if (group >= 13 && group <= 18) {
    return group - 10;
  }

  return null;
}

export type LewisDotSide = "top" | "right" | "bottom" | "left";

export type LewisDotPlacement = {
  side: LewisDotSide;
  count: 1 | 2;
};

const SIDE_ORDER: LewisDotSide[] = ["top", "right", "bottom", "left"];

export function getLewisDotPlacements(
  valenceElectrons: number
): LewisDotPlacement[] {
  return SIDE_ORDER.map((side, index) => {
    let count: 0 | 1 | 2 = 0;

    if (valenceElectrons > index) {
      count = 1;
    }

    if (valenceElectrons > index + 4) {
      count = 2;
    }

    return { side, count };
  }).filter((placement): placement is LewisDotPlacement => placement.count > 0);
}
