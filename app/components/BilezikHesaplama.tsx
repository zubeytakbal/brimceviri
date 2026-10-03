"use client";

import { useState } from "react";
import { ondalik } from "../converter/sayiOku";
import { bilezikKarsiligi, SIKKELER } from "../converter/turkishAltin";

const g = (n: number) => n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const SECILI = ["ceyrek-altin", "yarim-altin", "tam-altin", "cumhuriyet-altini", "gremse-altin", "besli-altin"];

export default function BilezikHesaplama() {
  const [adet, setAdet] = useState<Record<string, string>>({ "ceyrek-altin": "10" });
  const [iscilik, setIscilik] = useState("30");
  const adetler = Object.fromEntries(Object.entries(adet).map(([k, v]) => [k, Math.max(0, Math.floor(ondalik(v) || 0))]));
  const r = bilezikKarsiligi(adetler, ondalik(iscilik));

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields is-amounts">
          {SECILI.map((id) => {
            const s = SIKKELER.find((x) => x.id === id)!;
            return (
              <label key={id} className="date-calc-field">
                <span>
                  {s.ad} (adet)
                </span>
                <input inputMode="numeric" value={adet[id] ?? ""} onChange={(e) => setAdet({ ...adet, [id]: e.target.value })} />
              </label>
            );
          })}
          <label className="date-calc-field">
            <span>Bilezik işçiliği (milyem)</span>
            <input inputMode="numeric" value={iscilik} onChange={(e) => setIscilik(e.target.value)} />
          </label>
        </div>
      </div>
      {r ? (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>Tahmini 22 ayar bilezik</span>
            <strong>{g(r.iscilikli)} gram</strong>
            <em>{iscilik.trim() ? `${ondalik(iscilik)} milyem işçilikle` : "işçiliksiz"}</em>
          </div>
          <div className="date-calc-stat">
            <span>İşçiliksiz (birebir) karşılık</span>
            <strong>{g(r.isciliksiz)} gram</strong>
            <em>altınlarınızın toplam ağırlığı {g(r.brut)} g</em>
          </div>
          <div className="date-calc-stat">
            <span>İçindeki has (24 ayar) altın</span>
            <strong>{g(r.has)} gram</strong>
            <em>{r.ceyrekKarsiligi.toLocaleString("tr-TR", { maximumFractionDigits: 2 })} çeyrek değerinde</em>
          </div>
        </div>
      ) : (
        <p className="date-calc-note">Altın adetlerini girin.</p>
      )}
      <p className="date-calc-note">
        Kuyumcu altınlarınızı has değeriyle alır, bileziği ayar + işçilik milyemiyle satar. İşçilik bilezik modeline ve kuyumcuya göre değişir (22 ayar bilezikte
        çoğunlukla 10–60 milyem); kuyumcunuza sorup yazın.
      </p>
    </div>
  );
}
