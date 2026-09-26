// Hesap motorlari: Ingilizce ev projesi araclari (tile, brick, laminate,
// paint, wallpaper). Girdiler ABD olculeriyle (ft, in, gal) veya metrik
// (m, cm, mm, L) verilebilir; hesap her iki sistemde de ayni formulu kullanir.

export const SQ_IN_PER_SQ_FT = 144;
export const SQ_CM_PER_SQ_M = 10000;
export const LITERS_PER_US_GALLON = 3.785411784;

const positive = (value: number) => Number.isFinite(value) && value > 0;
const nonNegative = (value: number) => Number.isFinite(value) && value >= 0;

// ---- Tile ----
// Alan: ft2 (US) veya m2 (metric); fayans ve derz: inc (US) veya cm (metric).
export type TileInput = {
  area: number;
  tileWidth: number;
  tileLength: number;
  grout: number;
  wastePercent: number;
  tilesPerBox?: number;
  system: "us" | "metric";
};

export function tileEstimate(input: TileInput) {
  const { area, tileWidth, tileLength, grout, wastePercent, tilesPerBox, system } = input;
  if (![area, tileWidth, tileLength].every(positive) || !nonNegative(grout) || !nonNegative(wastePercent)) return null;
  const smallPerLarge = system === "us" ? SQ_IN_PER_SQ_FT : SQ_CM_PER_SQ_M;
  // Her fayansin kapladigi alan, derzin yarisi her iki kenarda sayilarak (L + g)(W + g).
  const tileCoverage = ((tileWidth + grout) * (tileLength + grout)) / smallPerLarge;
  const areaWithWaste = area * (1 + wastePercent / 100);
  const tiles = Math.ceil(areaWithWaste / tileCoverage - 1e-9);
  const boxes = tilesPerBox && positive(tilesPerBox) ? Math.ceil(tiles / tilesPerBox - 1e-9) : null;
  return { tileCoverage, areaWithWaste, tiles, boxes };
}

// ---- Brick ----
// Duvar alani: ft2 veya m2; tugla boyu/yuksekligi ve derz: inc veya cm.
export type BrickInput = {
  wallArea: number;
  openingsArea: number;
  brickLength: number;
  brickHeight: number;
  joint: number;
  wastePercent: number;
  system: "us" | "metric";
};

export function brickEstimate(input: BrickInput) {
  const { wallArea, openingsArea, brickLength, brickHeight, joint, wastePercent, system } = input;
  if (![wallArea, brickLength, brickHeight].every(positive) || ![openingsArea, joint, wastePercent].every(nonNegative)) return null;
  const netArea = wallArea - openingsArea;
  if (netArea <= 0) return null;
  const smallPerLarge = system === "us" ? SQ_IN_PER_SQ_FT : SQ_CM_PER_SQ_M;
  const bricksPerUnitArea = smallPerLarge / ((brickLength + joint) * (brickHeight + joint));
  const exact = netArea * bricksPerUnitArea;
  const bricks = Math.ceil(exact * (1 + wastePercent / 100) - 1e-9);
  return { netArea, bricksPerUnitArea, exact, bricks };
}

// ---- Laminate / flooring ----
export type FlooringInput = {
  area: number;
  coveragePerBox: number;
  wastePercent: number;
  pricePerBox?: number;
};

export function flooringEstimate(input: FlooringInput) {
  const { area, coveragePerBox, wastePercent, pricePerBox } = input;
  if (![area, coveragePerBox].every(positive) || !nonNegative(wastePercent)) return null;
  const areaWithWaste = area * (1 + wastePercent / 100);
  const boxes = Math.ceil(areaWithWaste / coveragePerBox - 1e-9);
  const purchasedArea = boxes * coveragePerBox;
  const leftover = purchasedArea - area;
  const cost = pricePerBox && positive(pricePerBox) ? boxes * pricePerBox : null;
  return { areaWithWaste, boxes, purchasedArea, leftover, cost };
}

// ---- Paint ----
// Olculer ft (US) veya m (metric). Kapi/pencere alanlari varsayilan:
// US 21 ft2 (3 x 7 ft kapi) ve 15 ft2 (3 x 5 ft pencere); metrik 1,9 m2 ve 1,4 m2.
export const DOOR_AREA = { us: 21, metric: 1.9 } as const;
export const WINDOW_AREA = { us: 15, metric: 1.4 } as const;

export type PaintInput = {
  length: number;
  width: number;
  height: number;
  doors: number;
  windows: number;
  coats: number;
  /** ft2 per gallon (US) or m2 per liter (metric). */
  coverage: number;
  includeCeiling: boolean;
  system: "us" | "metric";
};

export function paintEstimate(input: PaintInput) {
  const { length, width, height, doors, windows, coats, coverage, includeCeiling, system } = input;
  if (![length, width, height, coats, coverage].every(positive) || ![doors, windows].every(nonNegative)) return null;
  const grossWall = 2 * (length + width) * height;
  const netWall = Math.max(0, grossWall - doors * DOOR_AREA[system] - windows * WINDOW_AREA[system]);
  const ceiling = includeCeiling ? length * width : 0;
  const paintedArea = (netWall + ceiling) * coats;
  const paint = paintedArea / coverage; // gallons (US) or liters (metric)
  return { grossWall, netWall, ceiling, paintedArea, paint, purchase: system === "us" ? gallonsToPurchase(paint) : null };
}

/** 2.17 gal -> 2 gallons + 1 quart; 2.8 gal -> 3 gallons (4 quarts cost about as much as a gallon). */
export function gallonsToPurchase(gallons: number) {
  if (!positive(gallons)) return { gallons: 0, quarts: 0 };
  let whole = Math.floor(gallons + 1e-9);
  let quarts = Math.max(0, Math.ceil((gallons - whole) * 4 - 1e-9));
  if (quarts >= 3) {
    whole += 1;
    quarts = 0;
  }
  return { gallons: whole, quarts };
}

// ---- Wallpaper (serit yontemi) ----
// Olculer: oda ve yukseklik ft (US) / m (metric); rulo eni ve desen tekrari
// inc (US) / cm (metric); rulo boyu ft (US) / m (metric).
export type WallpaperInput = {
  length: number;
  width: number;
  height: number;
  openingsWidth: number;
  rollWidth: number;
  rollLength: number;
  patternRepeat: number;
  system: "us" | "metric";
};

export function wallpaperEstimate(input: WallpaperInput) {
  const { length, width, height, openingsWidth, rollWidth, rollLength, patternRepeat, system } = input;
  if (![length, width, height, rollWidth, rollLength].every(positive) || ![openingsWidth, patternRepeat].every(nonNegative)) return null;
  const smallPerLarge = system === "us" ? 12 : 100; // in per ft, cm per m
  const wallWidth = 2 * (length + width) - openingsWidth;
  if (wallWidth <= 0) return null;
  const strips = Math.ceil((wallWidth * smallPerLarge) / rollWidth - 1e-9);
  // Desenli kagitta her serit bir desen tekrari kadar uzun kesilir (hizalama payi).
  const stripLength = height + patternRepeat / smallPerLarge;
  const stripsPerRoll = Math.floor(rollLength / stripLength + 1e-9);
  if (stripsPerRoll < 1) return null;
  const rolls = Math.ceil(strips / stripsPerRoll - 1e-9);
  return { wallWidth, strips, stripLength, stripsPerRoll, rolls, wallArea: wallWidth * height };
}
