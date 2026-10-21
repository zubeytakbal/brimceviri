"use client";

import MobilBolumler from "./MobilBolumler";
import SaatUstMenu from "./SaatUstMenu";
import { SAAT_ARAMA } from "./saatListeleri";

/** Saat bölümündeki araç sayfalarının üst menüsü (sitenin genel menüsünün yerine). */
export default function SaatAracUst() {
  return (
    <div className="saat-arac-ust">
      <SaatUstMenu ogeler={SAAT_ARAMA} />
      <MobilBolumler />
    </div>
  );
}
