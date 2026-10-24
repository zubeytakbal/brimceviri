"use client";

import MobilBolumler from "../saat/MobilBolumler";
import SaatUstMenu from "../saat/SaatUstMenu";
import { HESAP_ARAMA, HESAP_GRUPLARI } from "./hesapBolumu";

/** Hesap bölümündeki araç sayfalarının üst menüsü: saat bölümünün düzeni, bölümün kendi adı ve gruplarıyla. */
export default function HesapAracUst() {
  return (
    <div className="saat-arac-ust hesap-arac-ust" data-tur="arac">
      <SaatUstMenu ogeler={HESAP_ARAMA} bolum={{ etiket: "Hesap", href: "/hesaplayicilar", gruplar: HESAP_GRUPLARI, arama: "Hesaplama aracı yazın" }} />
      <MobilBolumler />
    </div>
  );
}
