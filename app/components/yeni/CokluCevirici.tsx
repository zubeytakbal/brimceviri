"use client";

// Gruplu cok kutulu cevirici: herhangi bir kutuya yazilan deger, diger tum kutulari gunceller.
// Gruplarda olmayan birimler "Diger birim" satirinda acilir listeden secilir.
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

  function kutu(birim: string, etiket?: string) {
    const b = bul(birim);
    if (!b) return null;
    const id = `${kok}-${birim}`;
    return (
      <label key={birim} className="yy-kutu" htmlFor={id}>
        <span>{etiket ?? b.label}</span>
        <span className="yy-kutu-giris">
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
            aria-describedby={`${id}-s`}
          />
          <span id={`${id}-s`} className="yy-kutu-sembol">
            {b.symbol}
          </span>
        </span>
      </label>
    );
  }

  return (
    <section className="yy-coklu" aria-label="Çevirici">
      {gruplar.map((g) => (
        <fieldset key={g.ad}>
          <legend>{g.ad}</legend>
          <div className="yy-kutular">{g.birimler.map((b) => kutu(b))}</div>
        </fieldset>
      ))}
      {digerleri.length > 0 && (
        <fieldset>
          <legend>Diğer birimler</legend>
          <div className="yy-kutular">
            <label className="yy-kutu" htmlFor={`${kok}-sec`}>
              <span>Birim seçin</span>
              <select id={`${kok}-sec`} value={diger} onChange={(e) => setDiger(e.target.value)}>
                {digerleri.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label} [{b.symbol}]
                  </option>
                ))}
              </select>
            </label>
            {kutu(diger, "Değer")}
          </div>
        </fieldset>
      )}
      <div className="yy-coklu-alt">
        <span>Herhangi bir kutuya yazın; diğerleri anında hesaplanır.</span>
        <button type="button" onClick={() => yaz(baslangic.birim, formatSayi(baslangic.deger))}>
          Sıfırla
        </button>
      </div>
    </section>
  );
}
