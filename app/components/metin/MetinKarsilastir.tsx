"use client";

import { useMemo, useState } from "react";
import { metinKarsilastir, type FarkParca } from "../../converter/metin/fark";

const Parcalar = ({
  p,
  tur,
}: {
  p: FarkParca[];
  tur: "silindi" | "eklendi";
}) => (
  <>
    {p.map((x, i) =>
      x.tur === tur ? (
        <mark key={i} className={`fark-${tur}`}>
          {x.deger}
        </mark>
      ) : (
        <span key={i}>{x.deger}</span>
      ),
    )}
  </>
);

/** İki metni satır ve kelime düzeyinde karşılaştırır. */
export default function MetinKarsilastir() {
  const [sol, setSol] = useState("");
  const [sag, setSag] = useState("");
  const [bosluk, setBosluk] = useState(false);
  const [harf, setHarf] = useState(false);
  const [yalnizFark, setYalnizFark] = useState(false);

  const sonuc = useMemo(
    () =>
      sol || sag
        ? metinKarsilastir(sol, sag, { boslukYoksay: bosluk, harfYoksay: harf })
        : [],
    [sol, sag, bosluk, harf],
  );

  const say = (t: string) => sonuc.filter((s) => s.tur === t).length;
  const farkVar = sonuc.some((s) => s.tur !== "ayni");

  let solNo = 0;
  let sagNo = 0;
  const satirlar = sonuc.map((s) => ({
    ...s,
    solNo: s.sol !== null ? ++solNo : null,
    sagNo: s.sag !== null ? ++sagNo : null,
  }));

  return (
    <div className="date-calc gorsel-arac">
      <div className="fark-girdiler">
        <label className="date-calc-field">
          <span>Eski metin</span>
          <textarea
            className="ocr-metin"
            rows={10}
            value={sol}
            spellCheck={false}
            onChange={(e) => setSol(e.target.value)}
            placeholder="İlk metni yapıştırın"
          />
        </label>
        <label className="date-calc-field">
          <span>Yeni metin</span>
          <textarea
            className="ocr-metin"
            rows={10}
            value={sag}
            spellCheck={false}
            onChange={(e) => setSag(e.target.value)}
            placeholder="Karşılaştırılacak metni yapıştırın"
          />
        </label>
      </div>
      <div className="fark-secenek">
        <label className="date-calc-check">
          <input
            type="checkbox"
            checked={bosluk}
            onChange={(e) => setBosluk(e.target.checked)}
          />{" "}
          Boşluk farklarını yok say
        </label>
        <label className="date-calc-check">
          <input
            type="checkbox"
            checked={harf}
            onChange={(e) => setHarf(e.target.checked)}
          />{" "}
          Büyük/küçük harfi yok say
        </label>
        <label className="date-calc-check">
          <input
            type="checkbox"
            checked={yalnizFark}
            onChange={(e) => setYalnizFark(e.target.checked)}
          />{" "}
          Yalnızca farklı satırları göster
        </label>
        <button
          type="button"
          className="time-tool-button is-secondary"
          onClick={() => {
            setSol(sag);
            setSag(sol);
          }}
        >
          ⇄ Yer değiştir
        </button>
      </div>
      {sonuc.length ? (
        <>
          <p className={farkVar ? "vesikalik-ozet" : "gorsel-tamam"}>
            {farkVar
              ? `${say("degisti")} satır değişti · ${say("eklendi")} satır eklendi · ${say("silindi")} satır silindi`
              : "✓ İki metin aynı."}
          </p>
          <div className="fark-tablo" role="table" aria-label="Karşılaştırma">
            {satirlar
              .filter((s) => !yalnizFark || s.tur !== "ayni")
              .map((s, i) => (
                <div key={i} className={`fark-satir is-${s.tur}`} role="row">
                  <span className="fark-no">{s.solNo ?? ""}</span>
                  <span className="fark-sol" role="cell">
                    {s.solParcalar ? (
                      <Parcalar p={s.solParcalar} tur="silindi" />
                    ) : (
                      (s.sol ?? "")
                    )}
                  </span>
                  <span className="fark-no">{s.sagNo ?? ""}</span>
                  <span className="fark-sag" role="cell">
                    {s.sagParcalar ? (
                      <Parcalar p={s.sagParcalar} tur="eklendi" />
                    ) : (
                      (s.sag ?? "")
                    )}
                  </span>
                </div>
              ))}
          </div>
        </>
      ) : null}
      <p className="date-calc-note">
        Karşılaştırma tarayıcınızda yapılır; sözleşme, ödev veya kod gibi
        metinler hiçbir sunucuya gönderilmez.
      </p>
    </div>
  );
}
