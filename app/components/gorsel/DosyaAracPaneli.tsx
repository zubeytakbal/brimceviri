"use client";

import { useState } from "react";
import Link from "@/app/components/SiteLink";
import AracIkonu from "./AracIkonu";
import { KOLEKSIYONLAR, type KoleksiyonId } from "./koleksiyon";

/**
 * Dosya Araçları paneli: kategori düğmeleriyle filtrelenen araç kartları.
 * Tüm kartlar sayfada her zaman bulunur (arama motorları için); filtre yalnızca görünürlüğü değiştirir.
 */
export default function DosyaAracPaneli({
  koleksiyon = "dosya",
}: {
  koleksiyon?: KoleksiyonId;
}) {
  const k = KOLEKSIYONLAR[koleksiyon];
  const [secili, setSecili] = useState<string>("tumu");
  const kategoriler = k.kategoriler.filter((x) =>
    k.araclar.some((a) => a.kategoriler.includes(x.id)),
  );
  return (
    <div className="arac-paneli">
      <ul className="arac-guven" aria-label="Özellikler">
        {k.guven.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
      <div
        className="arac-filtre"
        role="group"
        aria-label="Kategoriye göre filtrele"
      >
        {[{ id: "tumu", ad: "Tümü" }, ...kategoriler].map((x) => (
          <button
            key={x.id}
            type="button"
            aria-pressed={secili === x.id}
            className={secili === x.id ? "is-active" : undefined}
            onClick={() => setSecili(x.id)}
          >
            {x.ad}
          </button>
        ))}
      </div>
      <ul className="arac-izgara">
        {k.araclar.map((a) => (
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
