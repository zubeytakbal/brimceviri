"use client";

import { useRef, useState } from "react";

const CIFT_ESIK = 80; // ms; bu kadar kısa arayla gelen iki tıklama insan eliyle zor olur

type Sayac = {
  sol: number;
  orta: number;
  sag: number;
  geri: number;
  ileri: number;
  yukari: number;
  asagi: number;
  cift: number;
  hatali: number;
};
const BOS: Sayac = {
  sol: 0,
  orta: 0,
  sag: 0,
  geri: 0,
  ileri: 0,
  yukari: 0,
  asagi: 0,
  cift: 0,
  hatali: 0,
};

/** Fare testi: tuşlar, tekerlek, çift tıklama ve istenmeyen (arızalı) çift tıklama tespiti. */
export default function FareTesti() {
  const [s, setS] = useState<Sayac>(BOS);
  const [aktif, setAktif] = useState("");
  const [enKisa, setEnKisa] = useState<number | null>(null);
  const son = useRef(0);
  const art = (k: keyof Sayac) => setS((x) => ({ ...x, [k]: x[k] + 1 }));

  return (
    <div className="date-calc gorsel-arac">
      <div
        className={`fare-alan${aktif ? ` is-${aktif}` : ""}`}
        onMouseDown={(e) => {
          e.preventDefault();
          const ad =
            (["sol", "orta", "sag", "geri", "ileri"] as const)[e.button] ??
            "sol";
          art(ad);
          setAktif(ad);
          if (e.button === 0) {
            const t = performance.now();
            const fark = t - son.current;
            if (son.current && fark < CIFT_ESIK) art("hatali");
            if (son.current && fark < 500)
              setEnKisa((m) => (m === null ? fark : Math.min(m, fark)));
            son.current = t;
          }
        }}
        onMouseUp={() => setAktif("")}
        onDoubleClick={() => art("cift")}
        onContextMenu={(e) => e.preventDefault()}
        onWheel={(e) => art(e.deltaY < 0 ? "yukari" : "asagi")}
        role="application"
        aria-label="Fare test alanı"
      >
        <div className="fare-sekil">
          <span
            className={`fare-tus is-sol${aktif === "sol" ? " is-basili" : ""}`}
          />
          <span
            className={`fare-tus is-orta${aktif === "orta" ? " is-basili" : ""}`}
          />
          <span
            className={`fare-tus is-sag${aktif === "sag" ? " is-basili" : ""}`}
          />
        </div>
        <p>Bu alanda tıklayın, çift tıklayın ve tekerleği çevirin</p>
      </div>
      <table className="ag-sonuc">
        <tbody>
          {(
            [
              ["Sol tık", s.sol],
              ["Sağ tık", s.sag],
              ["Orta tık (tekerlek)", s.orta],
              ["Geri / ileri yan tuşlar", `${s.geri} / ${s.ileri}`],
              ["Tekerlek yukarı / aşağı", `${s.yukari} / ${s.asagi}`],
              ["Çift tıklama (sistemin algıladığı)", s.cift],
              ["Şüpheli çift tıklama (< 80 ms)", s.hatali],
              [
                "İki sol tık arası en kısa süre",
                enKisa === null ? "—" : `${Math.round(enKisa)} ms`,
              ],
            ] as Array<[string, string | number]>
          ).map(([k, v]) => (
            <tr
              key={k}
              className={
                k.startsWith("Şüpheli") && s.hatali ? "is-hatali" : undefined
              }
            >
              <th scope="row">{k}</th>
              <td>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {s.hatali ? (
        <p className="gorsel-hata">
          ⚠️ Tek tıkladığınız hâlde çift tıklama algılandıysa sol tuşun anahtarı
          (switch) aşınmış olabilir.
        </p>
      ) : null}
      <button
        type="button"
        className="time-tool-button is-secondary"
        onClick={() => {
          setS(BOS);
          setEnKisa(null);
          son.current = 0;
        }}
      >
        Sıfırla
      </button>
      <p className="date-calc-note">
        Yavaşça tek tek tıklayın: &quot;Şüpheli çift tıklama&quot; sayısı
        artıyorsa fare tek basışta iki tık gönderiyor demektir.
      </p>
    </div>
  );
}
