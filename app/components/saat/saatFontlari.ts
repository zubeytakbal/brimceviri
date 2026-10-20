import { Anton, Archivo, Playfair_Display } from "next/font/google";

// Saat bölümünün yazı tipleri: dev saat için dar ve çok kalın Anton, metin için Archivo, saatin altındaki
// gazete düzeni (manşet, büyük rakamlar) için Playfair Display.
export const saatRakam = Anton({ subsets: ["latin", "latin-ext"], weight: "400", display: "swap", variable: "--saat-rakam" });
export const saatMetin = Archivo({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "700", "800"], display: "swap", variable: "--saat-metin" });
export const saatGazete = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--saat-gazete",
});
