"use client";

import { useState } from "react";
import Link from "@/app/components/SiteLink";
import {
  DOSYA_ARACLARI,
  DOSYA_KATEGORILER,
  type DosyaKategori,
} from "../../converter/gorsel/dosyaAraclari";
import AracIkonu from "./AracIkonu";

/**
 * Dosya Araçları paneli: kategori düğmeleriyle filtrelenen araç kartları.
 * Tüm kartlar sayfada her zaman bulunur (arama motorları için); filtre yalnızca görünürlüğü değiştirir.
 */
export default function DosyaAracPaneli() {
  const [secili, setSecili] = useState<DosyaKategori | "tumu">("tumu");
  const kategoriler = DOSYA_KATEGORILER.filter((k) =>
    DOSYA_ARACLARI.some((a) => a.kategoriler.includes(k.id)),
  );
  return (
    <div className="arac-paneli">
      <ul className="arac-guven" aria-label="Özellikler">
        <li>Ücretsiz</li>
        <li>Kayıt yok</li>
        <li>Filigran yok</li>
        <li>Dosyalar yüklenmez</li>
      </ul>
      <div
        className="arac-filtre"
        role="group"
        aria-label="Kategoriye göre filtrele"
      >
        {[{ id: "tumu" as const, ad: "Tümü" }, ...kategoriler].map((k) => (
          <button
            key={k.id}
            type="button"
            aria-pressed={secili === k.id}
            className={secili === k.id ? "is-active" : undefined}
            onClick={() => setSecili(k.id)}
          >
            {k.ad}
          </button>
        ))}
      </div>
      <ul className="arac-izgara">
        {DOSYA_ARACLARI.map((a) => (
          <li
            key={a.href}
            hidden={secili !== "tumu" && !a.kategoriler.includes(secili)}
          >
            <Link href={a.href} className="arac-kart">
              <AracIkonu ikon={a.ikon} />
              <strong>
                {a.baslik}
                {a.yeni ? <span className="arac-yeni">Yeni</span> : null}
              </strong>
              <span>{a.aciklama}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
