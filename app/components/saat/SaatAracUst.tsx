"use client";

import { usePathname } from "next/navigation";
import MobilBolumler from "./MobilBolumler";
import SaatUstMenu from "./SaatUstMenu";
import { SAAT_ARAMA } from "./saatListeleri";

// Liste ve tablo sayfaları: siyah başlık yırtık kenarla biter, liste kâğıt üstünde kalır. Diğerlerinde araç da siyah
// başlık alanının içine alınır (CSS, data-tur ile ayırır).
const LISTE = new Set([
  "/dunya-saatleri",
  "/takvim",
  "/resmi-tatiller",
  "/okul-takvimi",
  "/ozel-gunler",
  "/hicri-takvim",
  "/gokyuzu-olaylari-takvimi",
  "/firtina-takvimi",
  "/ay-gozlem-cizelgesi",
]);
const listeMi = (yol: string) => LISTE.has(yol) || /^\/(takvim|ozel-gunler|resmi-tatiller)\//.test(yol);

/** Saat bölümündeki araç sayfalarının üst menüsü (sitenin genel menüsünün yerine). */
export default function SaatAracUst() {
  const yol = (usePathname() ?? "").replace(/\/$/, "");
  return (
    <div className="saat-arac-ust" data-tur={listeMi(yol) ? "liste" : "arac"}>
      <SaatUstMenu ogeler={SAAT_ARAMA} />
      <MobilBolumler />
    </div>
  );
}
