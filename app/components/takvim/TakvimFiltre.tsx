"use client";

// Takvim ızgarasının üstündeki tür çipleri: bir türü kapatınca o türün etiketleri ızgarada ve gün gün tabloda gizlenir.
// İçerik sunucuda derlenir; bu bileşen yalnızca sarmalayıcının sınıflarını değiştirir.
import { useState, type ReactNode } from "react";
import { ETIKET_TURLERI, type EtiketTur } from "../../converter/calendar/gunEtiketleri";

export default function TakvimFiltre({ children, turler }: { children: ReactNode; turler?: EtiketTur[] }) {
  const [gizli, setGizli] = useState<EtiketTur[]>([]);
  const liste = ETIKET_TURLERI.filter((t) => !turler || turler.includes(t.tur));
  const degistir = (tur: EtiketTur) => setGizli((g) => (g.includes(tur) ? g.filter((x) => x !== tur) : [...g, tur]));
  return (
    <div className={["takvim-filtreli", ...gizli.map((t) => `gizle-${t}`)].join(" ")}>
      <div className="takvim-filtre" role="group" aria-label="Takvimde gösterilecekler">
        {liste.map((t) => (
          <button key={t.tur} type="button" className={`etk-cip etk-${t.tur}`} aria-pressed={!gizli.includes(t.tur)} onClick={() => degistir(t.tur)}>
            <span className="etk-nokta" aria-hidden="true" />
            {t.ad}
          </button>
        ))}
      </div>
      {children}
    </div>
  );
}
