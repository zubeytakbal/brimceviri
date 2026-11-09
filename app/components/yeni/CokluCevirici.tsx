"use client";

// Gruplu cok kutulu cevirici: herhangi bir kutuya yazilan deger, diger tum kutulari gunceller.
// Ilk iki grup acik, digerleri kapali gelir; gruplarda olmayan birimler acilir listeden secilir.
import { useId, useState } from "react";
import { convert } from "../../converter/convert";
import { formatSayi, sayiOku } from "./sayi";

export type CokluBirim = { value: string; label: string; symbol: string };
export type CokluGrup = { ad: string; birimler: string[] };

type Props = {
  category: string;
  birimler: CokluBirim[];
  gruplar: CokluGrup[];
  /** Ilk acilista dolu gelen kutu ve degeri */
  baslangic: { birim: string; deger: number };
};

const ACIK_GRUP = 2;
// "arşın", "fersah (Osm.)" gibi adla ayni ya da uzun semboller satiri kalabaliklastirmasin.
const SEMBOL_SINIRI = 4;

export default function CokluCevirici({ category, birimler, gruplar, baslangic }: Props) {
  const [kaynak, setKaynak] = useState(baslangic.birim);
  const [metin, setMetin] = useState(formatSayi(baslangic.deger));
  const gruptakiler = new Set(gruplar.flatMap((g) => g.birimler));
  const digerleri = birimler.filter((b) => !gruptakiler.has(b.value));
  const [diger, setDiger] = useState(digerleri[0]?.value ?? "");
  const kok = useId();
  const deger = sayiOku(metin);
  const bul = (v: string) => birimler.find((b) => b.value === v);

  function goster(birim: string) {
    if (birim === kaynak) return metin;
    if (deger === null) return "";
    return formatSayi(convert(category, deger, kaynak, birim));
  }

  function yaz(birim: string, yeni: string) {
    setKaynak(birim);
    setMetin(yeni);
  }

  function satir(birim: string, etiket?: string) {
    const b = bul(birim);
    if (!b) return null;
    const id = `${kok}-${birim}`;
    return (
      <div key={birim} className="yy-satir">
        <label htmlFor={id}>{etiket ?? b.label}</label>
        <span className="yy-giris">
          <input
            id={id}
            inputMode="decimal"
            autoComplete="off"
            value={goster(birim)}
            onChange={(e) => yaz(birim, e.target.value)}
            onFocus={(e) => {
              // Hesaplanan degerdeki binlik noktalari kaldirarak bu kutuyu kaynak yap; "1.000" duzenlenirken 1 okunmasin.
              if (birim !== kaynak) yaz(birim, goster(birim).replace(/\./g, ""));
              const el = e.currentTarget;
              requestAnimationFrame(() => el.select());
            }}
          />
          {b.symbol.length <= SEMBOL_SINIRI && <span aria-hidden="true">{b.symbol}</span>}
        </span>
      </div>
    );
  }

  return (
    <section className="yy-arac" aria-label="Çevirici">
      {gruplar.map((g, i) => (
        <details key={g.ad} open={i < ACIK_GRUP}>
          <summary>{g.ad}</summary>
          {g.birimler.map((b) => satir(b))}
        </details>
      ))}
      {digerleri.length > 0 && (
        <details>
          <summary>Diğer birimler</summary>
          <div className="yy-satir">
            <label htmlFor={`${kok}-sec`}>Birim</label>
            <select id={`${kok}-sec`} value={diger} onChange={(e) => setDiger(e.target.value)}>
              {digerleri.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>
          {satir(diger, "Değer")}
        </details>
      )}
      <div className="yy-arac-alt">
        <span>Bir kutuya yazın.</span>
        <button type="button" onClick={() => yaz(baslangic.birim, formatSayi(baslangic.deger))}>
          Sıfırla
        </button>
      </div>
    </section>
  );
}
