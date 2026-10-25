"use client";

import MobilBolumler from "../saat/MobilBolumler";
import SaatUstMenu from "../saat/SaatUstMenu";
import { BILIM_ARAMA, BILIM_GRUPLARI } from "./bilimListeleri";

/** Bilim bölümündeki sayfaların üst menüsü: saat bölümünün düzeni, bölümün kendi adı ve gruplarıyla. */
export default function BilimAracUst() {
  return (
    <div className="saat-arac-ust bilim-arac-ust" data-tur="arac">
      <SaatUstMenu ogeler={BILIM_ARAMA} bolum={{ etiket: "Bilim", href: "/bilim-hesaplayicilari", gruplar: BILIM_GRUPLARI, arama: "Araç, element ya da gökcismi yazın" }} />
      <MobilBolumler />
    </div>
  );
}
