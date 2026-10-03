"use client";

import { useState } from "react";
import {
  CUZ_SAYISI,
  hatimDagit,
  KASR_KM,
  kasrDurumu,
  kazaNamazi,
  kazaOrucu,
  MIL_KM,
  zakatVori,
} from "../../converter/diniHesaplar";

const BN = "bn-BD";
const f = (n: number, d = 0) => n.toLocaleString(BN, { maximumFractionDigits: d });
const taka = (n: number) => `৳ ${n.toLocaleString(BN, { maximumFractionDigits: 2 })}`;

/** Bengali or Latin digits, with or without thousands commas. */
export function bnNumber(raw: string) {
  const latin = raw.replace(/[০-৯]/g, (d) => String("০১২৩৪৫৬৭৮৯".indexOf(d))).replace(/[\s,৳]/g, "");
  if (!latin) return Number.NaN;
  const n = Number(latin);
  return Number.isFinite(n) ? n : Number.NaN;
}
const n0 = (raw: string) => (raw.trim() === "" ? 0 : bnNumber(raw));

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="date-calc-field">
      <span>{label}</span>
      <input inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

/* ---------------- যাকাত ---------------- */

export function BengaliZakat() {
  const [nisab, setNisab] = useState<"gumus" | "altin">("gumus");
  const [gold, setGold] = useState("");
  const [silver, setSilver] = useState("");
  const [cash, setCash] = useState("");
  const [bank, setBank] = useState("");
  const [goods, setGoods] = useState("");
  const [due, setDue] = useState("");
  const [debt, setDebt] = useState("");
  const [goldVori, setGoldVori] = useState("");
  const [silverVori, setSilverVori] = useState("");
  const r = zakatVori({
    nakit: n0(cash),
    banka: n0(bank),
    ticari: n0(goods),
    alacak: n0(due),
    borc: n0(debt),
    altinVori: n0(goldVori),
    gumusVori: n0(silverVori),
    altinVoriFiyati: n0(gold),
    gumusVoriFiyati: n0(silver),
    nisab,
  });

  return (
    <div className="date-calc">
      <div className="date-converter-modes is-light" role="tablist" aria-label="নিসাব">
        {(
          [
            ["gumus", "রুপার নিসাব (সাড়ে ৫২ ভরি)"],
            ["altin", "সোনার নিসাব (সাড়ে ৭ ভরি)"],
          ] as const
        ).map(([v, t]) => (
          <button key={v} type="button" role="tab" aria-selected={nisab === v} className={nisab === v ? "is-active" : undefined} onClick={() => setNisab(v)}>
            {t}
          </button>
        ))}
      </div>
      <div className="date-calc-input">
        <strong className="date-calc-input-title">আজকের বাজারদর (প্রতি ভরি, টাকা)</strong>
        <div className="date-calc-fields is-amounts">
          <Field label="সোনা (২২ ক্যারেট) প্রতি ভরি" value={gold} onChange={setGold} />
          <Field label="রুপা প্রতি ভরি" value={silver} onChange={setSilver} />
        </div>
        <strong className="date-calc-input-title">আপনার সম্পদ</strong>
        <div className="date-calc-fields is-amounts">
          <Field label="নগদ টাকা" value={cash} onChange={setCash} />
          <Field label="ব্যাংক, সঞ্চয়পত্র, শেয়ার" value={bank} onChange={setBank} />
          <Field label="ব্যবসার পণ্য" value={goods} onChange={setGoods} />
          <Field label="পাওনা টাকা (ফেরত পাওয়ার আশা আছে)" value={due} onChange={setDue} />
          <Field label="সোনা (ভরি)" value={goldVori} onChange={setGoldVori} />
          <Field label="রুপা (ভরি)" value={silverVori} onChange={setSilverVori} />
          <Field label="ঋণ (বাদ যাবে)" value={debt} onChange={setDebt} />
        </div>
      </div>
      {r ? (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>{r.nisabUstunde ? "আপনার যাকাত" : "নিসাব পূর্ণ হয়নি"}</span>
            <strong>{taka(r.zekat)}</strong>
            <em>{r.nisabUstunde ? "মোট যাকাতযোগ্য সম্পদের ২.৫% (চল্লিশ ভাগের এক ভাগ)" : "এ বছর যাকাত ফরজ নয়"}</em>
          </div>
          <div className="date-calc-stat">
            <span>যাকাতযোগ্য মোট সম্পদ</span>
            <strong>{taka(r.netVarlik)}</strong>
            <em>ঋণ বাদ দেওয়ার পর</em>
          </div>
          <div className="date-calc-stat">
            <span>নিসাব ({nisab === "gumus" ? "সাড়ে ৫২ ভরি রুপা" : "সাড়ে ৭ ভরি সোনা"})</span>
            <strong>{taka(r.nisabDegeri)}</strong>
          </div>
          {r.altinDegeri || r.gumusDegeri ? (
            <div className="date-calc-stat">
              <span>সোনা ও রুপার মূল্য</span>
              <strong>{taka(r.altinDegeri + r.gumusDegeri)}</strong>
            </div>
          ) : null}
        </div>
      ) : (
        <p className="date-calc-note">প্রথমে {nisab === "gumus" ? "রুপার" : "সোনার"} প্রতি ভরির আজকের দাম লিখুন; সোনা বা রুপা থাকলে তার দামও লিখুন।</p>
      )}
    </div>
  );
}

/* ---------------- কাজা নামাজ ও রোজা ---------------- */

export function BengaliKaza() {
  const [y, setY] = useState("1");
  const [m, setM] = useState("0");
  const [d, setD] = useState("0");
  const [daily, setDaily] = useState("5");
  const [witr, setWitr] = useState(true);
  const [ram, setRam] = useState("1");
  const [extra, setExtra] = useState("0");
  const [weekly, setWeekly] = useState("2");
  const n = kazaNamazi(n0(y), n0(m), n0(d), witr, bnNumber(daily));
  const r = kazaOrucu(n0(ram), 30, n0(extra), bnNumber(weekly));

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <strong className="date-calc-input-title">কাজা নামাজ: কত সময় নামাজ পড়া হয়নি?</strong>
        <div className="date-calc-fields">
          <Field label="বছর" value={y} onChange={setY} />
          <Field label="মাস" value={m} onChange={setM} />
          <Field label="দিন" value={d} onChange={setD} />
          <Field label="দিনে কত ওয়াক্ত কাজা পড়বেন" value={daily} onChange={setDaily} />
        </div>
        <label className="date-calc-check">
          <input type="checkbox" checked={witr} onChange={(e) => setWitr(e.target.checked)} />
          বিতর নামাজসহ (হানাফি মাজহাবে ওয়াজিব)
        </label>
      </div>
      {n ? (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>কাজা নামাজ</span>
            <strong>{f(n.vakit)} ওয়াক্ত</strong>
            <em>
              {f(n.gun)} দিন · {f(n.rekat)} রাকাত
            </em>
          </div>
          <div className="date-calc-stat">
            <span>শেষ হতে সময়</span>
            <strong>{f(n.bitisGun)} দিন</strong>
            <em>প্রায় {f(n.bitisGun / 365, 1)} বছর</em>
          </div>
          <div className="date-calc-stat">
            <span>প্রতি ওয়াক্তের কাজা</span>
            <strong>{f(n.gun)}টি করে</strong>
            <em>ফজর, জোহর, আসর, মাগরিব, এশা{witr ? ", বিতর" : ""}</em>
          </div>
        </div>
      ) : (
        <p className="date-calc-note">সময় ও দিনে অন্তত ১ ওয়াক্ত লিখুন।</p>
      )}

      <div className="date-calc-input">
        <strong className="date-calc-input-title">কাজা রোজা</strong>
        <div className="date-calc-fields">
          <Field label="পুরো রমজান রাখা হয়নি (কতটি)" value={ram} onChange={setRam} />
          <Field label="এর বাইরে ছুটে যাওয়া রোজা (দিন)" value={extra} onChange={setExtra} />
          <Field label="সপ্তাহে কত দিন রাখবেন" value={weekly} onChange={setWeekly} />
        </div>
      </div>
      {r ? (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>কাজা রোজা</span>
            <strong>{f(r.gun)} দিন</strong>
            <em>প্রতি রমজান ৩০ দিন ধরে; ২৯ দিনের রমজান হলে কম হবে</em>
          </div>
          <div className="date-calc-stat">
            <span>শেষ হতে সময়</span>
            <strong>{f(r.bitisHafta)} সপ্তাহ</strong>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ---------------- খতম পরিকল্পনা ---------------- */

export function BengaliKhatam() {
  const [days, setDays] = useState("30");
  const [done, setDone] = useState("0");
  const [people, setPeople] = useState("30");
  const dd = bnNumber(days);
  const left = CUZ_SAYISI - n0(done);
  const perDay = dd >= 1 && left > 0 ? left / dd : Number.NaN;
  const group = hatimDagit(bnNumber(people));

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-chips">
          {[7, 10, 15, 20, 30, 40].map((x) => (
            <button key={x} type="button" onClick={() => setDays(String(x))}>
              {f(x)} দিনে
            </button>
          ))}
        </div>
        <div className="date-calc-fields">
          <Field label="কত দিনে খতম করবেন" value={days} onChange={setDays} />
          <Field label="ইতিমধ্যে পড়া পারা" value={done} onChange={setDone} />
        </div>
      </div>
      {Number.isFinite(perDay) ? (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>প্রতিদিন পড়তে হবে</span>
            <strong>{f(perDay, 2)} পারা</strong>
            <em>প্রতি ওয়াক্ত নামাজের পর প্রায় {f(perDay / 5, 2)} পারা</em>
          </div>
          <div className="date-calc-stat">
            <span>বাকি</span>
            <strong>{f(left)} পারা</strong>
          </div>
        </div>
      ) : (
        <p className="date-calc-note">দিনের সংখ্যা ১ বা বেশি এবং পড়া পারা ৩০-এর কম হতে হবে।</p>
      )}
      <div className="date-calc-input">
        <strong className="date-calc-input-title">সম্মিলিত খতম: কে কোন পারা পড়বেন</strong>
        <div className="date-calc-fields">
          <Field label="কতজন (১–৩০)" value={people} onChange={setPeople} />
        </div>
      </div>
      {group.length ? (
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">জন</th>
                <th scope="col">পারা</th>
              </tr>
            </thead>
            <tbody>
              {group.map((p) => (
                <tr key={p.kisi}>
                  <td>{f(p.kisi)}</td>
                  <td>{p.ilkCuz === p.sonCuz ? `${f(p.ilkCuz)} নং পারা` : `${f(p.ilkCuz)}–${f(p.sonCuz)} নং পারা`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

/* ---------------- কসর দূরত্ব ---------------- */

export function BengaliQasr() {
  const [dist, setDist] = useState("100");
  const [unit, setUnit] = useState<"km" | "mile">("km");
  const [stay, setStay] = useState("3");
  const km = unit === "km" ? bnNumber(dist) : bnNumber(dist) * MIL_KM;
  const r = kasrDurumu(km, n0(stay));

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <Field label="গন্তব্যের দূরত্ব" value={dist} onChange={setDist} />
          <label className="date-calc-field">
            <span>একক</span>
            <select value={unit} onChange={(e) => setUnit(e.target.value as "km" | "mile")}>
              <option value="km">কিলোমিটার</option>
              <option value="mile">মাইল</option>
            </select>
          </label>
          <Field label="সেখানে কত দিন থাকবেন" value={stay} onChange={setStay} />
        </div>
      </div>
      {r ? (
        <div className="date-calc-results">
          <div className={`date-calc-stat is-main ${r.musafir ? "sefer-seferi" : "sefer-degil"}`}>
            <span>ফলাফল</span>
            <strong>{r.musafir ? "আপনি মুসাফির – কসর করবেন" : "মুসাফির নন – পূর্ণ নামাজ"}</strong>
            <em>
              {!r.mesafeYeterli
                ? `দূরত্ব ৪৮ মাইলের (প্রায় ${f(KASR_KM, 2)} কিমি) কম`
                : !r.kalisKisa
                  ? "১৫ দিন বা বেশি থাকার নিয়ত করলে সেখানে মুকিম"
                  : "জোহর, আসর ও এশার ৪ রাকাত ফরজ ২ রাকাত পড়বেন"}
            </em>
          </div>
          <div className="date-calc-stat">
            <span>দূরত্ব</span>
            <strong>{f(km, 1)} কিমি</strong>
            <em>{f(km / MIL_KM, 1)} মাইল</em>
          </div>
        </div>
      ) : (
        <p className="date-calc-note">দূরত্ব ও থাকার দিন লিখুন।</p>
      )}
    </div>
  );
}
