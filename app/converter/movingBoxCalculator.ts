// Tasinma kutusu/hacim hesaplama -- ev tipine gore nakliye sektorunde
// yaygin kullanilan tahmini kutu sayisi ve kamyon hacmi degerlerini
// dondurur. Kesin bir formul degil, sektorel ortalama bir referans
// tablosudur; kullanici oda sayisina gore secim yapar.

export type HomeType =
  | "studio"
  | "1+1"
  | "2+1"
  | "3+1"
  | "4+1"
  | "5+1";

export type MovingBoxEstimate = {
  homeType: HomeType;
  label: string;
  smallBoxCount: number;
  largeBoxCount: number;
  truckVolumeM3: number;
};

const HOME_TYPE_ESTIMATES: Record<HomeType, MovingBoxEstimate> = {
  studio: {
    homeType: "studio",
    label: "Stüdyo Daire",
    smallBoxCount: 12,
    largeBoxCount: 8,
    truckVolumeM3: 8,
  },
  "1+1": {
    homeType: "1+1",
    label: "1+1",
    smallBoxCount: 18,
    largeBoxCount: 12,
    truckVolumeM3: 12,
  },
  "2+1": {
    homeType: "2+1",
    label: "2+1",
    smallBoxCount: 28,
    largeBoxCount: 18,
    truckVolumeM3: 18,
  },
  "3+1": {
    homeType: "3+1",
    label: "3+1",
    smallBoxCount: 38,
    largeBoxCount: 25,
    truckVolumeM3: 24,
  },
  "4+1": {
    homeType: "4+1",
    label: "4+1",
    smallBoxCount: 48,
    largeBoxCount: 32,
    truckVolumeM3: 32,
  },
  "5+1": {
    homeType: "5+1",
    label: "5+1 ve üzeri",
    smallBoxCount: 58,
    largeBoxCount: 40,
    truckVolumeM3: 40,
  },
};

export function getMovingBoxEstimate(homeType: HomeType): MovingBoxEstimate {
  return HOME_TYPE_ESTIMATES[homeType];
}

export const homeTypeOrder: HomeType[] = [
  "studio",
  "1+1",
  "2+1",
  "3+1",
  "4+1",
  "5+1",
];
