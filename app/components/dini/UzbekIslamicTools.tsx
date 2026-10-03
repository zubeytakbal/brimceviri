"use client";

import { useState } from "react";
import { CUZ_SAYISI, hatimDagit, kazaNamazi, kazaOrucu } from "../../converter/diniHesaplar";
import { formatUz } from "../../converter/uzNumber";

const f = formatUz;
const num = (raw: string) => {
  const s = raw.trim().replace(/\s/g, "").replace(",", ".");
  return s ? Number(s) : Number.NaN;
};
const n0 = (raw: string) => (raw.trim() === "" ? 0 : num(raw));

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="date-calc-field">
      <span>{label}</span>
      <input inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

export function UzbekQazo() {
  const [y, setY] = useState("1");
  const [m, setM] = useState("0");
  const [d, setD] = useState("0");
  const [daily, setDaily] = useState("5");
  const [witr, setWitr] = useState(true);
  const [ram, setRam] = useState("1");
  const [extra, setExtra] = useState("0");
  const [weekly, setWeekly] = useState("2");
  const n = kazaNamazi(n0(y), n0(m), n0(d), witr, num(daily));
  const r = kazaOrucu(n0(ram), 30, n0(extra), num(weekly));

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <strong className="date-calc-input-title">Qazo namoz: qancha vaqt namoz o‘qilmagan?</strong>
        <div className="date-calc-fields">
          <Field label="Yil" value={y} onChange={setY} />
          <Field label="Oy" value={m} onChange={setM} />
          <Field label="Kun" value={d} onChange={setD} />
          <Field label="Kuniga necha vaqt qazo o‘qiysiz" value={daily} onChange={setDaily} />
        </div>
        <label className="date-calc-check">
          <input type="checkbox" checked={witr} onChange={(e) => setWitr(e.target.checked)} />
          Vitr namozi bilan (Hanafiy mazhabida vojib)
        </label>
      </div>
      {n ? (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>Qazo namozlar</span>
            <strong>{f(n.vakit)} vaqt</strong>
            <em>
              {f(n.gun)} kun · {f(n.rekat)} rakat
            </em>
          </div>
          <div className="date-calc-stat">
            <span>Tugash muddati</span>
            <strong>{f(n.bitisGun)} kun</strong>
            <em>taxminan {f(n.bitisGun / 365, 1)} yil</em>
          </div>
          <div className="date-calc-stat">
            <span>Har bir vaqtdan</span>
            <strong>{f(n.gun)} tadan</strong>
            <em>bomdod, peshin, asr, shom, xufton{witr ? ", vitr" : ""}</em>
          </div>
        </div>
      ) : (
        <p className="date-calc-note">Muddatni va kuniga kamida 1 vaqt kiriting.</p>
      )}

      <div className="date-calc-input">
        <strong className="date-calc-input-title">Qazo ro‘za</strong>
        <div className="date-calc-fields">
          <Field label="To‘liq tutilmagan Ramazonlar soni" value={ram} onChange={setRam} />
          <Field label="Bundan tashqari qoldirilgan kunlar" value={extra} onChange={setExtra} />
          <Field label="Haftasiga necha kun tutasiz" value={weekly} onChange={setWeekly} />
        </div>
      </div>
      {r ? (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>Qazo ro‘zalar</span>
            <strong>{f(r.gun)} kun</strong>
            <em>har bir Ramazon 30 kun deb olindi</em>
          </div>
          <div className="date-calc-stat">
            <span>Tugash muddati</span>
            <strong>{f(r.bitisHafta)} hafta</strong>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function UzbekXatm() {
  const [days, setDays] = useState("30");
  const [done, setDone] = useState("0");
  const [people, setPeople] = useState("30");
  const dd = num(days);
  const left = CUZ_SAYISI - n0(done);
  const perDay = dd >= 1 && left > 0 ? left / dd : Number.NaN;
  const group = hatimDagit(num(people));

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-chips">
          {[7, 10, 15, 20, 30, 40].map((x) => (
            <button key={x} type="button" onClick={() => setDays(String(x))}>
              {x} kunda
            </button>
          ))}
        </div>
        <div className="date-calc-fields">
          <Field label="Necha kunda xatm qilasiz" value={days} onChange={setDays} />
          <Field label="O‘qib bo‘lingan pora" value={done} onChange={setDone} />
        </div>
      </div>
      {Number.isFinite(perDay) ? (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>Har kuni o‘qish kerak</span>
            <strong>{f(perDay, 2)} pora</strong>
            <em>har namozdan keyin taxminan {f(perDay / 5, 2)} pora</em>
          </div>
          <div className="date-calc-stat">
            <span>Qolgan</span>
            <strong>{f(left)} pora</strong>
          </div>
        </div>
      ) : (
        <p className="date-calc-note">Kunlar soni 1 yoki undan ko‘p, o‘qilgan pora 30 dan kam bo‘lishi kerak.</p>
      )}
      <div className="date-calc-input">
        <strong className="date-calc-input-title">Jamoaviy xatm: kim qaysi porani o‘qiydi</strong>
        <div className="date-calc-fields">
          <Field label="Necha kishi (1–30)" value={people} onChange={setPeople} />
        </div>
      </div>
      {group.length ? (
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Kishi</th>
                <th scope="col">Pora</th>
              </tr>
            </thead>
            <tbody>
              {group.map((p) => (
                <tr key={p.kisi}>
                  <td>{p.kisi}-kishi</td>
                  <td>{p.ilkCuz === p.sonCuz ? `${p.ilkCuz}-pora` : `${p.ilkCuz}–${p.sonCuz}-poralar`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
