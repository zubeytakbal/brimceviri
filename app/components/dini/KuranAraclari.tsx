"use client";

import { useEffect, useMemo, useState } from "react";
import { cuzAraligi, dagit, ezberPlani, parcaMetni, SON_ID } from "../../converter/kuranPlan";
import { SURELER } from "../../converter/sureler";

const tamSayi = (raw: string) => {
  const n = Number(raw.trim());
  return Number.isInteger(n) ? n : Number.NaN;
};

/* ---------------- Ezber planı ---------------- */

export function EzberPlani() {
  const [sureNo, setSureNo] = useState("36");
  const [gunluk, setGunluk] = useState("5");
  const sure = SURELER[Number(sureNo) - 1];
  const g = tamSayi(gunluk);
  const plan = useMemo(() => (g >= 1 && g <= 300 ? ezberPlani(Number(sureNo), g) : []), [sureNo, g]);

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Sure</span>
            <select value={sureNo} onChange={(event) => setSureNo(event.target.value)}>
              {SURELER.map((s) => (
                <option key={s.no} value={s.no}>
                  {s.no}. {s.ad} ({s.ayet} ayet)
                </option>
              ))}
            </select>
          </label>
          <label className="date-calc-field">
            <span>Günde kaç ayet?</span>
            <input inputMode="numeric" value={gunluk} onChange={(event) => setGunluk(event.target.value)} />
          </label>
        </div>
      </div>
      {plan.length === 0 ? (
        <p className="date-calc-note">Günlük ayet sayısı için 1 ile 300 arasında bir tam sayı girin.</p>
      ) : (
        <>
          <div className="date-calc-results">
            <div className="date-calc-stat is-main">
              <span>
                {sure.ad} Suresi · {sure.ayet} ayet · günde {g} ayet
              </span>
              <strong>{plan.length} gün</strong>
              {plan.length > 1 && plan[plan.length - 1].son - plan[plan.length - 1].ilk + 1 < g && (
                <em>Son gün {plan[plan.length - 1].son - plan[plan.length - 1].ilk + 1} ayet kalır.</em>
              )}
            </div>
          </div>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <thead>
                <tr>
                  <th scope="col">Gün</th>
                  <th scope="col">Ayetler</th>
                </tr>
              </thead>
              <tbody>
                {plan.slice(0, 60).map((d) => (
                  <tr key={d.gun}>
                    <td>{d.gun}. gün</td>
                    <td>{d.ilk === d.son ? `${d.ilk}. ayet` : `${d.ilk}–${d.son}. ayetler`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {plan.length > 60 && <p className="date-calc-note">İlk 60 gün gösteriliyor; günlük ayet sayısını artırarak planı kısaltabilirsiniz.</p>}
        </>
      )}
    </div>
  );
}

/* ---------------- Hatim dağıtıcısı ---------------- */

export function HatimDagitici() {
  const [kapsam, setKapsam] = useState("hatim");
  const [kisi, setKisi] = useState("4");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const cuz = Number(new URLSearchParams(window.location.search).get("cuz"));
      if (Number.isInteger(cuz) && cuz >= 1 && cuz <= 30) setKapsam(String(cuz));
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const k = tamSayi(kisi);
  const paylar = useMemo(() => {
    if (!(k >= 1 && k <= 604)) return [];
    const [ilk, son] = kapsam === "hatim" ? [1, SON_ID] : cuzAraligi(Number(kapsam));
    return dagit(ilk, son, k);
  }, [kapsam, k]);
  const sayfaToplam = paylar.length ? paylar[paylar.length - 1].sayfaSon - paylar[0].sayfaBas + 1 : 0;

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Ne okunacak?</span>
            <select value={kapsam} onChange={(event) => setKapsam(event.target.value)}>
              <option value="hatim">Hatmin tamamı (30 cüz)</option>
              {Array.from({ length: 30 }, (_, i) => i + 1).map((c) => (
                <option key={c} value={c}>
                  {c}. cüz
                </option>
              ))}
            </select>
          </label>
          <label className="date-calc-field">
            <span>Kaç kişi okuyacak?</span>
            <input inputMode="numeric" value={kisi} onChange={(event) => setKisi(event.target.value)} />
          </label>
        </div>
      </div>
      {paylar.length === 0 ? (
        <p className="date-calc-note">Kişi sayısı için 1 ile 604 arasında bir tam sayı girin.</p>
      ) : (
        <>
          <div className="date-calc-results">
            <div className="date-calc-stat is-main">
              <span>
                {sayfaToplam} sayfa · {paylar.length} kişi
              </span>
              <strong>
                Kişi başı {Math.floor(sayfaToplam / paylar.length)}
                {sayfaToplam % paylar.length ? `–${Math.floor(sayfaToplam / paylar.length) + 1}` : ""} sayfa
              </strong>
              {paylar.length < k && <em>Sayfa sayısı kişi sayısından az olduğu için {paylar.length} pay çıktı.</em>}
            </div>
          </div>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <thead>
                <tr>
                  <th scope="col">Kişi</th>
                  <th scope="col">Sayfa</th>
                  <th scope="col">Okunacak yer</th>
                </tr>
              </thead>
              <tbody>
                {paylar.map((p) => (
                  <tr key={p.kisi}>
                    <td>{p.kisi}.</td>
                    <td>{p.sayfaBas === p.sayfaSon ? p.sayfaBas : `${p.sayfaBas}–${p.sayfaSon}`}</td>
                    <td>{parcaMetni(p.parcalar)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="date-calc-note">Paylar Medine mushafının (604 sayfa) sayfalarına göre eşit bölünür.</p>
        </>
      )}
    </div>
  );
}
