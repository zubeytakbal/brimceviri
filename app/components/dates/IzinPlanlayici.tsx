"use client";

import { useMemo, useState } from "react";
import { icsDatei } from "../../converter/time/brueckentage";
import { formatYmdParts, ymdKey } from "../../converter/time/dateMath";
import { kisiselIzinPlani } from "../../converter/time/izinPlani";

const kisa = (d: { year: number; month: number; day: number }) =>
  formatYmdParts(d, "tr", { day: "numeric", month: "long", year: "numeric" });
const gun = (d: { year: number; month: number; day: number }) =>
  formatYmdParts(d, "tr", { weekday: "short" });
const sayi = (n: number) => String(n).replace(".", ",");

export default function IzinPlanlayici({ year }: { year: number }) {
  const [izin, setIzin] = useState(7);
  const [workdays, setWorkdays] = useState([false, true, true, true, true, true, false]);
  const [range, setRange] = useState({ year, start: `${year}-01-01`, end: `${year}-12-31` });
  const [mode, setMode] = useState<"enUzun" | "enVerimli">("enUzun");
  const start = range.year === year ? range.start : `${year}-01-01`;
  const end = range.year === year ? range.end : `${year}-12-31`;
  const choices = useMemo(() => kisiselIzinPlani(year, izin, workdays, start, end), [year, izin, workdays, start, end]);
  const selected = choices[mode];
  const plan = { zeitraeume: selected ? [selected] : [], urlaub: selected?.urlaub ?? 0, freieTage: selected?.tage ?? 0 };
  const invalid = !start || !end || start > end || !workdays.some(Boolean);

  const indir = () => {
    const blob = new Blob([icsDatei(plan.zeitraeume, "Yıllık izin")], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `izin-plani-${year}.ics`;
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Kullanabileceğim izin (gün)</span>
            <input
              type="number"
              min={0.5}
              step={0.5}
              max={30}
              value={izin}
              onChange={(event) =>
                setIzin(
                  Math.max(0.5, Math.min(30, Number(event.target.value) || 0.5)),
                )
              }
            />
          </label>
        </div>
        <div className="date-calc-fields">
          <label className="date-calc-field"><span>En erken tatil başlangıcı</span>
            <input type="date" min={`${year}-01-01`} max={`${year}-12-31`} value={start}
              onChange={e => setRange({ year, start: e.target.value, end })} /></label>
          <label className="date-calc-field"><span>En geç tatil bitişi</span>
            <input type="date" min={`${year}-01-01`} max={`${year}-12-31`} value={end}
              onChange={e => setRange({ year, start, end: e.target.value })} /></label>
        </div>
        <fieldset className="date-calc-checks">
          <legend>Çalıştığım günler</legend>
          {[1, 2, 3, 4, 5, 6, 0].map(d => <label key={d}>
            <input type="checkbox" checked={workdays[d]} onChange={e => setWorkdays(workdays.map((v, i) => i === d ? e.target.checked : v))} />
            {['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'][d]}
          </label>)}
        </fieldset>
        <label className="date-calc-field"><span>Plan tercihi</span>
          <select value={mode} onChange={e => setMode(e.target.value as typeof mode)}>
            <option value="enUzun">En uzun kesintisiz tatil</option>
            <option value="enVerimli">İzin günü başına en çok tatil</option>
          </select>
        </label>
        {invalid ? <p role="alert">Geçerli bir tarih aralığı ve en az bir çalışma günü seçin.</p> : null}
        {!invalid && !selected ? <p role="status">Bu aralık ve izin bütçesiyle plan bulunamadı. Tarih aralığını veya bütçeyi genişletin.</p> : null}
      </div>
      <div className="date-calc-results">
        <div className="date-calc-stat is-main">
          <span>{sayi(plan.urlaub)} gün izinle</span>
          <strong>{plan.freieTage} gün tatil</strong>
          <em>
            {plan.zeitraeume.length} ayrı tatil · her izin günü ortalama{" "}
            {plan.urlaub
              ? sayi(Math.round((plan.freieTage / plan.urlaub) * 10) / 10)
              : "—"}{" "}
            gün tatil kazandırıyor
          </em>
        </div>
      </div>
      <ul className="bridge-list">
        {plan.zeitraeume.map((z) => (
          <li
            key={ymdKey(z.von)}
            className={
              z.tage / Math.max(z.urlaub, 0.5) >= 3 ? "is-best" : undefined
            }
          >
            <div className="bridge-head">
              <strong>{z.tage} gün tatil</strong>
              <span>{sayi(z.urlaub)} gün izinle</span>
            </div>
            <p>
              {kisa(z.von)} {gun(z.von)} – {kisa(z.bis)} {gun(z.bis)}
              <br />
              <small>
                İzin:{" "}
                {z.urlaubstage.map((d) => `${kisa(d)} ${gun(d)}`).join(", ")}
                {z.feiertage.length ? ` · ${[...new Set(z.feiertage.map((f) => f.replace(/ \d\. Gün$/, "")))].join(", ")}` : ""}
              </small>
            </p>
          </li>
        ))}
      </ul>
      {plan.zeitraeume.length ? (
        <div className="holiday-actions">
          <button
            type="button"
            className="time-tool-button is-secondary"
            onClick={indir}
          >
            📅 İzin planını takvime ekle (.ics)
          </button>
        </div>
      ) : null}
      <p className="date-calc-note">
        Resmî tatiller izin bütçesinden düşülmez; arefe yarım gün izin sayılır.
      </p>
    </div>
  );
}
