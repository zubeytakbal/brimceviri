"use client";

import { useState } from "react";
import { harfDonustur, type HarfKipi } from "../../converter/metin/turkce";
import CopyResultButton from "../CopyResultButton";

const KIPLER: Array<[HarfKipi, string]> = [
  ["buyuk", "BÜYÜK HARF"],
  ["kucuk", "küçük harf"],
  ["baslik", "Her Kelime Büyük"],
  ["cumle", "Cümle düzeni"],
  ["ters", "tERS çEVİR"],
];

/** Büyük/küçük harf dönüştürücü; Türkçe İ/ı kuralıyla. */
export default function HarfDonustur() {
  const [metin, setMetin] = useState(
    "istanbul'da ılık bir İlkbahar sabahı. ışıklar yanıyor!",
  );
  const [kip, setKip] = useState<HarfKipi>("buyuk");
  const [tr, setTr] = useState(true);
  const sonuc = harfDonustur(metin, kip, tr);
  const kelime = metin.trim() ? metin.trim().split(/\s+/).length : 0;
  return (
    <div className="date-calc gorsel-arac">
      <div className="date-calc-input">
        <label className="date-calc-field">
          <span>Metin</span>
          <textarea
            rows={6}
            value={metin}
            onChange={(e) => setMetin(e.target.value)}
          />
        </label>
        <p className="date-calc-note">
          {Array.from(metin).length} karakter · {kelime} kelime
        </p>
      </div>
      <div
        className="ag-ornekler metin-kipler"
        role="group"
        aria-label="Dönüşüm"
      >
        {KIPLER.map(([k, ad]) => (
          <button
            key={k}
            type="button"
            aria-pressed={kip === k}
            className={kip === k ? "is-active" : undefined}
            onClick={() => setKip(k)}
          >
            {ad}
          </button>
        ))}
      </div>
      <label className="date-calc-check">
        <input
          type="checkbox"
          checked={tr}
          onChange={(e) => setTr(e.target.checked)}
        />{" "}
        Türkçe kuralı (i → İ, ı → I). Kapatınca İngilizce kuralı uygulanır.
      </label>
      <div className="metin-sonuc">
        <div className="metin-sonuc-ust">
          <b>Sonuç</b>
          <CopyResultButton text={sonuc} locale="tr" />
        </div>
        <div className="metin-sonuc-govde" aria-live="polite">
          {sonuc}
        </div>
      </div>
      <p className="date-calc-note">
        Dönüştürme tarayıcınızda yapılır; metniniz hiçbir yere gönderilmez.
      </p>
    </div>
  );
}
