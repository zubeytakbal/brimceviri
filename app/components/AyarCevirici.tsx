"use client";

// Altın ayar çevirici (Türkçe): kuyumcu milyemleriyle (24 ayar 995, 22 ayar 916 …) bir ayardaki altının has karşılığı,
// aynı has altının başka ayarda kaç gram ettiği ve ayarı düşürmek/yükseltmek için eklenecek alaşım ya da has altın.
import { useState } from "react";
import { AYARLAR, hasGram } from "../converter/turkishAltin";
import { alloy, equivalentWeight } from "../converter/goldPurity";

const sayi = (raw: string) => Number(raw.trim().replace(/\./g, "").replace(",", "."));
const g = (n: number) => n.toLocaleString("tr-TR", { minimumFractionDigits: 3, maximumFractionDigits: 3 });

export default function AyarCevirici({ kaynak, hedef }: { kaynak: number; hedef: number }) {
  const [gram, setGram] = useState("10");
  const [k, setK] = useState(kaynak);
  const [h, setH] = useState(hedef);
  const [fiyat, setFiyat] = useState("");
  const a1 = AYARLAR.find((x) => x.ayar === k)!;
  const a2 = AYARLAR.find((x) => x.ayar === h)!;
  const w = sayi(gram);
  const ok = w > 0;
  const has = hasGram(w, a1.milyem);
  const esdeger = equivalentWeight(w, a1.milyem / 1000, a2.milyem / 1000);
  // 24 ayara (995) alaşıma has altın katarak çıkılamaz; bu yön rafineri işidir.
  const al = h === 24 && k < 24 ? null : alloy(w, a1.milyem / 1000, a2.milyem / 1000);
  const tl = sayi(fiyat);

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields is-amounts">
          <label className="date-calc-field">
            <span>Ağırlık (gram)</span>
            <input inputMode="decimal" value={gram} onChange={(e) => setGram(e.target.value)} />
          </label>
          <label className="date-calc-field">
            <span>Elinizdeki ayar</span>
            <select value={k} onChange={(e) => setK(Number(e.target.value))}>
              {AYARLAR.map((x) => (
                <option key={x.ayar} value={x.ayar}>
                  {x.ad}
                </option>
              ))}
            </select>
          </label>
          <label className="date-calc-field">
            <span>Çevrilecek ayar</span>
            <select value={h} onChange={(e) => setH(Number(e.target.value))}>
              {AYARLAR.map((x) => (
                <option key={x.ayar} value={x.ayar}>
                  {x.ad}
                </option>
              ))}
            </select>
          </label>
          <label className="date-calc-field">
            <span>Has altın gram fiyatı (TL, isteğe bağlı)</span>
            <input inputMode="decimal" value={fiyat} placeholder="ör. 4.250" onChange={(e) => setFiyat(e.target.value)} />
          </label>
        </div>
      </div>
      {ok ? (
        <div className="date-calc-results">
          <div className="date-calc-stat">
            <span>İçindeki has altın</span>
            <strong>{g(has)} g</strong>
            <em>
              {g(w)} g × {a1.milyem} / 1000
            </em>
          </div>
          {k !== h ? (
            <div className="date-calc-stat">
              <span>{h} ayar karşılığı</span>
              <strong>{g(esdeger)} g</strong>
              <em>aynı has altın {h} ayarda bu kadar gelir</em>
            </div>
          ) : null}
          {al && al.direction !== "same" ? (
            <div className="date-calc-stat">
              <span>{al.direction === "down" ? "Eklenecek alaşım (bakır, gümüş)" : "Eklenecek has altın"}</span>
              <strong>{g(al.direction === "down" ? al.addAlloy : al.addPureGold)} g</strong>
              <em>
                sonuç: {g(al.finalWeight)} g {h} ayar
              </em>
            </div>
          ) : k !== h && h > k ? (
            <div className="date-calc-stat">
              <span>Ayar yükseltme</span>
              <strong>—</strong>
              <em>24 ayara alaşım eklenerek değil, rafineriyle çıkılır</em>
            </div>
          ) : null}
          {tl > 0 ? (
            <div className="date-calc-stat">
              <span>Has değeri</span>
              <strong>{(has * tl).toLocaleString("tr-TR", { maximumFractionDigits: 0 })} TL</strong>
              <em>kuyumcu alış fiyatı işçilik ve marj nedeniyle farklıdır</em>
            </div>
          ) : null}
        </div>
      ) : (
        <p className="date-calc-note">Gram olarak bir ağırlık girin.</p>
      )}
    </div>
  );
}
