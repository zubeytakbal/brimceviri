"use client";

// Cift sayfasinin ceviricisi: deger kutusu, yon degistirme (ters sayfaya link) ve sonuc.
import { useId, useState } from "react";
import Link from "@/app/components/SiteLink";
import { convert } from "../../converter/convert";
import { smartDefaultInput } from "../../converter/smartDefaultInput";
import { formatSayi, sayiOku } from "./sayi";

type Props = {
  category: string;
  fromUnit: string;
  toUnit: string;
  fromName: string;
  toName: string;
  /** Ters yon sayfasi; yoksa dugme bu sayfada yonu cevirir. */
  tersHref?: string;
  tersAd: string;
  birDeger: string;
  tersBirDeger: string;
};

export default function CiftCevirici(p: Props) {
  const [metin, setMetin] = useState(() => formatSayi(smartDefaultInput(p.category, p.fromUnit, p.toUnit)));
  const [ters, setTers] = useState(false);
  const girisId = useId();
  const [kaynak, hedef] = ters ? [p.toUnit, p.fromUnit] : [p.fromUnit, p.toUnit];
  const [kaynakAd, hedefAd] = ters ? [p.toName, p.fromName] : [p.fromName, p.toName];
  const deger = sayiOku(metin);
  const sonuc = deger === null ? "" : formatSayi(convert(p.category, deger, kaynak, hedef));

  const ikon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <path d="M7 7h13l-4-4M17 17H4l4 4" />
    </svg>
  );

  return (
    <section className="yy-kart" aria-label="Çevirici">
      <div className="yy-cev">
        <label className="yy-alan" htmlFor={girisId}>
          {kaynakAd} [{kaynak}]
          <input id={girisId} inputMode="decimal" autoComplete="off" value={metin} onChange={(e) => setMetin(e.target.value)} />
        </label>
        {p.tersHref && !ters ? (
          <Link href={p.tersHref} className="yy-cevir" aria-label={`Yönü değiştir: ${p.tersAd}`}>
            {ikon}
          </Link>
        ) : (
          <button type="button" className="yy-cevir" style={{ border: 0, cursor: "pointer" }} aria-label="Yönü değiştir" onClick={() => setTers((t) => !t)}>
            {ikon}
          </button>
        )}
        <div className="yy-alan">
          {hedefAd} [{hedef}]
          <output aria-live="polite">{sonuc || "—"}</output>
        </div>
      </div>
      <div className="yy-cev-alt">
        <strong>
          1 {p.fromUnit} = {p.birDeger} {p.toUnit}
        </strong>
        <span className="yy-soluk">
          1 {p.toUnit} = {p.tersBirDeger} {p.fromUnit}
        </span>
        {p.tersHref && (
          <Link href={p.tersHref} className="yy-sag">
            Ters yön: {p.tersAd} →
          </Link>
        )}
      </div>
    </section>
  );
}
