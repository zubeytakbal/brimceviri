import {
  Anton,
  Archivo,
  Old_Standard_TT,
  Playfair_Display,
  UnifrakturMaguntia,
} from "next/font/google";

// Saat bölümünün yazı tipleri: dev saat için dar ve çok kalın Anton, metin için Archivo. Saatin altındaki eski
// gazete düzeninde manşet ve büyük rakamlar Playfair Display, metin 19. yüzyıl baskı harfi Old Standard TT, gazete
// adı gotik (fraktur) UnifrakturMaguntia ile. Fraktur yalnızca Türkçe özel harf içermeyen sabit gazete adında kullanılır.
export const saatRakam = Anton({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
  preload: false,
  variable: "--saat-rakam",
});
export const saatMetin = Archivo({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
  preload: false,
  variable: "--saat-metin",
});
export const saatGazete = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
  variable: "--saat-gazete",
});
export const saatEski = Old_Standard_TT({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
  variable: "--saat-eski",
});
export const saatFraktur = UnifrakturMaguntia({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false,
  variable: "--saat-fraktur",
});
