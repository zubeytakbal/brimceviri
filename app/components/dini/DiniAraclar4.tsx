"use client";

import { useEffect, useState } from "react";
import { anmaGunleri } from "../../converter/diniHesaplar";
import { gregorianToHijri, HIJRI_MONTHS_TR, type YMD } from "../../converter/time/calendars";
import { diffDays, parseYmd, weekdayOf } from "../../converter/time/dateMath";
import { Modes } from "./DiniAraclar2";

const AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
const GUNLER = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];

const tarih = (d: YMD) => `${d.day} ${AYLAR[d.month - 1]} ${d.year} ${GUNLER[weekdayOf(d)]}`;
const hicri = (d: YMD) => {
  const h = gregorianToHijri(d);
  return `${h.day} ${HIJRI_MONTHS_TR[h.month - 1]} ${h.year}`;
};

function bugunIso() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Istanbul", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

/** Sabit tarihle ön işlenir; tarayıcıda (kullanıcı değiştirmediyse) bugüne geçer. */
function useBugun(initial: string) {
  const [value, setValue] = useState(initial);
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (!touched) setValue(bugunIso());
    });
    return () => cancelAnimationFrame(frame);
  }, [touched]);
  const set = (v: string) => {
    setTouched(true);
    setValue(v);
  };
  return [value, set] as const;
}

const ADLAR: Record<number, string> = { 3: "Üçü", 7: "Yedisi", 40: "Kırkı (40 mevlidi)", 52: "Elli ikisi (52. gece)" };

export function AnmaGunleriHesaplama({ initialDate }: { initialDate: string }) {
  const [olum, setOlum] = useBugun(initialDate);
  const [bugunRaw] = useBugun(initialDate);
  const [baslangic, setBaslangic] = useState<"olum" | "defin">("olum");
  const [defin, setDefin] = useState("");
  const [birinci, setBirinci] = useState(true);
  const o = parseYmd(olum);
  const d = parseYmd(defin);
  const bugun = parseYmd(bugunRaw);
  const kaynak = baslangic === "olum" ? o : d;
  const liste = kaynak ? anmaGunleri(kaynak, birinci) : null;

  const kalan = (g: YMD) => {
    if (!bugun) return "";
    const n = diffDays(bugun, g);
    if (n > 0) return `${n} gün kaldı`;
    if (n === 0) return "bugün";
    return `${-n} gün önceydi`;
  };

  return (
    <div className="date-calc">
      <Modes
        label="Sayım başlangıcı"
        value={baslangic}
        onChange={setBaslangic}
        options={[
          ["olum", "Ölüm gününden say"],
          ["defin", "Defin gününden say"],
        ]}
      />
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Vefat tarihi</span>
            <input type="date" value={olum} onChange={(e) => setOlum(e.target.value)} />
          </label>
          {baslangic === "defin" ? (
            <label className="date-calc-field">
              <span>Defin tarihi</span>
              <input type="date" value={defin} onChange={(e) => setDefin(e.target.value)} />
            </label>
          ) : null}
        </div>
        <label className="date-calc-check">
          <input type="checkbox" checked={birinci} onChange={(e) => setBirinci(e.target.checked)} />
          {baslangic === "olum" ? "Vefat günü 1. gün sayılsın" : "Defin günü 1. gün sayılsın"} (yaygın sayım)
        </label>
      </div>

      {liste ? (
        <>
          <div className="date-calc-results">
            {liste
              .filter((x) => x.n === 40 || x.n === 52)
              .map((x, i) => (
                <div key={x.n} className={`date-calc-stat${i === 0 ? " is-main" : ""}`}>
                  <span>{ADLAR[x.n]}</span>
                  <strong>{tarih(x.gun)}</strong>
                  <em>
                    Gecesi: {tarih(x.gecesi)} akşamı · {kalan(x.gun)}
                  </em>
                </div>
              ))}
          </div>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <thead>
                <tr>
                  <th scope="col">Gün</th>
                  <th scope="col">Tarih</th>
                  <th scope="col">Gecesi (önceki akşam)</th>
                  <th scope="col">Hicri</th>
                </tr>
              </thead>
              <tbody>
                {liste.map((x) => (
                  <tr key={x.n}>
                    <th scope="row">{ADLAR[x.n]}</th>
                    <td>{tarih(x.gun)}</td>
                    <td>{tarih(x.gecesi)}</td>
                    <td>{hicri(x.gun)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="date-calc-note">{baslangic === "defin" ? "Defin tarihini girin." : "Vefat tarihini girin."}</p>
      )}
      <p className="date-calc-note">
        Bu günler halk geleneğidir; Diyanet İşleri Başkanlığı Din İşleri Yüksek Kurulu&apos;na göre dinî bir dayanakları yoktur. Mevlit, Yâsin ve dua her gün okunabilir.
      </p>
    </div>
  );
}
