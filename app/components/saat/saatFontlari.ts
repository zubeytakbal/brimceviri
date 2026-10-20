import { Anton, Archivo } from "next/font/google";

// Saat bölümünün yazı tipleri: rakamlar için dar ve çok kalın Anton, metin için Archivo.
export const saatRakam = Anton({ subsets: ["latin", "latin-ext"], weight: "400", display: "swap", variable: "--saat-rakam" });
export const saatMetin = Archivo({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "700", "800"], display: "swap", variable: "--saat-metin" });
