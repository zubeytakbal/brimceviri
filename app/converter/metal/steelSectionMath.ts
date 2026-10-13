// Paralel başlıklı I/H profiller (IPE, HE) için kesit hesapları; köşe yuvarlaklıkları dahil.
import type { SteelSection } from "./steelSections";

type Dims = Pick<SteelSection, "h" | "b" | "tw" | "tf" | "r">;

// Bir köşe dolgusunun alanı ve ağırlık merkezinin köşeden uzaklığı.
const filletArea = (r: number) => (1 - Math.PI / 4) * r * r;
const filletCentroid = (r: number) => ((10 - 3 * Math.PI) / (12 - 3 * Math.PI)) * r;

/** Kesit alanı (cm²): iki başlık + gövde + dört köşe dolgusu. */
export function iSectionAreaCm2({ h, b, tw, tf, r }: Dims) {
  return (2 * b * tf + (h - 2 * tf) * tw + (4 - Math.PI) * r * r) / 100;
}

/** Güçlü eksen atalet momenti Iy (cm⁴). */
export function iSectionIyCm4({ h, b, tw, tf, r }: Dims) {
  const plates = (b * h ** 3 - (b - tw) * (h - 2 * tf) ** 3) / 12;
  const y = h / 2 - tf - filletCentroid(r);
  return (plates + 4 * filletArea(r) * y * y) / 1e4;
}

/** Zayıf eksen atalet momenti Iz (cm⁴). */
export function iSectionIzCm4({ h, b, tw, tf, r }: Dims) {
  const plates = (2 * tf * b ** 3 + (h - 2 * tf) * tw ** 3) / 12;
  const x = tw / 2 + filletCentroid(r);
  return (plates + 4 * filletArea(r) * x * x) / 1e4;
}

/** Atalet yarıçapı i = √(I / A) (cm). */
export function radiusOfGyrationCm(inertiaCm4: number, areaCm2: number) {
  return Math.sqrt(inertiaCm4 / areaCm2);
}
