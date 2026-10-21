import { Archivo, Overpass } from "next/font/google";

// Yol atlası bölümünün yazı tipleri. Overpass, karayolu levhalarındaki "Highway Gothic" ailesine dayanır;
// levha yazıları ve büyük rakamlar onunla, metin Archivo ile dizilir.
export const yolLevha = Overpass({ subsets: ["latin", "latin-ext"], weight: ["700", "800", "900"], display: "swap", variable: "--yol-levha" });
export const yolMetin = Archivo({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "700", "800"], display: "swap", variable: "--yol-metin" });
