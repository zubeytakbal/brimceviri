"use client";

import { useState } from "react";
import { heceleMetin } from "../../converter/metin/turkce";
import CopyResultButton from "../CopyResultButton";

/** Türkçe metni hecelerine ayırır; şiirde her dizenin hece sayısını (hece ölçüsü) verir. */
export default function HeceAyir() {
  const [metin, setMetin] = useState(
    "Korkma, sönmez bu şafaklarda yüzen al sancak;\nSönmeden yurdumun üstünde tüten en son ocak.",
  );
  const satirlar = heceleMetin(metin);
  const dolu = satirlar.filter((s) => s.satir.trim());
  const toplam = dolu.reduce((t, s) => t + s.sayi, 0);
  const ayni = dolu.length > 1 && dolu.every((s) => s.sayi === dolu[0].sayi);
  return (
    <div className="date-calc gorsel-arac">
      <div className="date-calc-input">
        <label className="date-calc-field">
          <span>Kelime, cümle veya şiir (her dize ayrı satırda)</span>
          <textarea
            rows={6}
            value={metin}
            onChange={(e) => setMetin(e.target.value)}
          />
        </label>
      </div>
      <p className="vesikalik-ozet">
        Toplam <b>{toplam}</b> hece
        {dolu.length > 1 ? ` · ${dolu.length} dize` : ""}
        {ayni ? ` · tüm dizeler ${dolu[0].sayi}'li hece ölçüsünde` : ""}
      </p>
      <div className="metin-sonuc">
        <div className="metin-sonuc-ust">
          <b>Hecelere ayrılmış</b>
          <CopyResultButton
            text={satirlar.map((s) => s.heceli).join("\n")}
            locale="tr"
          />
        </div>
        <ol className="hece-liste">
          {satirlar.map((s, i) =>
            s.satir.trim() ? (
              <li key={i}>
                <span>{s.heceli}</span>
                <b>{s.sayi}</b>
              </li>
            ) : null,
          )}
        </ol>
      </div>
      <p className="date-calc-note">
        Heceleme Türkçenin kurallarına göre yapılır: her hecede bir ünlü
        bulunur, iki ünlü arasındaki tek ünsüz sonraki heceye geçer. Tren, spor
        gibi yabancı kökenli kelimelerin başındaki ünsüz öbekleri bozulmaz.
      </p>
    </div>
  );
}
