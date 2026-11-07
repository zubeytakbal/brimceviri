"use client";

import { useState } from "react";
import { kazaOrucu } from "../../converter/diniHesaplar";

const fmt = (n: number, d = 0) => n.toLocaleString("tr-TR", { maximumFractionDigits: d });
const sayi = (raw: string) => {
  const s = raw.trim().replace(/\s/g, "");
  if (!s) return Number.NaN;
  const n = Number(s.includes(",") ? s.replace(/\./g, "").replace(",", ".") : s);
  return Number.isFinite(n) ? n : Number.NaN;
};

function Field({ label, value, onChange, suffix }: { label: string; value: string; onChange: (v: string) => void; suffix?: string }) {
  return (
    <label className="date-calc-field">
      <span>
        {label}
        {suffix ? ` (${suffix})` : ""}
      </span>
      <input inputMode="decimal" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}


/* ---------------- Seferî mesafe ---------------- */

/* ---------------- Sure bulucu ---------------- */

/* ---------------- Umre mesafesi ---------------- */

/* ---------------- Kaza orucu ---------------- */

export function KazaOrucuHesaplama() {
  const [ramazan, setRamazan] = useState("1");
  const [gunSayisi, setGunSayisi] = useState("30");
  const [ekGun, setEkGun] = useState("0");
  const [haftalik, setHaftalik] = useState("2");
  const r = kazaOrucu(sayi(ramazan), sayi(gunSayisi), sayi(ekGun), sayi(haftalik));

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields is-amounts">
          <Field label="Hiç tutulmayan Ramazan sayısı" value={ramazan} onChange={setRamazan} />
          <Field label="Ramazan kaç gün sürdü" suffix="29 ya da 30" value={gunSayisi} onChange={setGunSayisi} />
          <Field label="Ayrıca tutulamayan günler" value={ekGun} onChange={setEkGun} />
          <Field label="Haftada kaç gün tutacaksınız" suffix="1–7" value={haftalik} onChange={setHaftalik} />
        </div>
        <div className="date-calc-chips" aria-label="Haftalık plan">
          {[
            ["2", "Pazartesi + Perşembe"],
            ["3", "Haftada 3 gün"],
            ["7", "Her gün"],
          ].map(([value, label]) => (
            <button key={value} type="button" onClick={() => setHaftalik(value)}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {r ? (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>Kaza orucu borcu</span>
            <strong>{fmt(r.gun)} gün</strong>
            <em>
              haftada {fmt(sayi(haftalik))} gün tutarak {fmt(r.bitisHafta)} haftada ({fmt(r.bitisHafta / 52, 1)} yıl) biter
            </em>
          </div>
        </div>
      ) : (
        <p className="date-calc-note">Değerleri kontrol edin: Ramazan 29 ya da 30 gün, haftada 1–7 gün.</p>
      )}
    </div>
  );
}
