"use client";

import { useState } from "react";
import { icsDatei } from "../../converter/time/brueckentage";
import { formatYmdParts, ymdKey } from "../../converter/time/dateMath";
import { izinPlani } from "../../converter/time/izinPlani";

const kisa = (d: { year: number; month: number; day: number }) =>
  formatYmdParts(d, "tr", { day: "numeric", month: "long" });
const gun = (d: { year: number; month: number; day: number }) =>
  formatYmdParts(d, "tr", { weekday: "short" });
const sayi = (n: number) => String(n).replace(".", ",");

export default function IzinPlanlayici({ year }: { year: number }) {
  const [izin, setIzin] = useState(7);
  const [cumartesi, setCumartesi] = useState(false);
  const plan = izinPlani(year, izin, cumartesi);

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
              min={1}
              max={30}
              value={izin}
              onChange={(event) =>
                setIzin(
                  Math.max(1, Math.min(30, Number(event.target.value) || 1)),
                )
              }
            />
          </label>
        </div>
        <div className="date-calc-checks">
          <label>
            <input
              type="checkbox"
              checked={cumartesi}
              onChange={(event) => setCumartesi(event.target.checked)}
            />{" "}
            Cumartesi de çalışıyorum
          </label>
        </div>
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
        Plan, izin günlerini resmî tatiller ve hafta sonlarıyla birleştirerek en
        uzun toplam tatili verir; arefeler yarım gün izin sayılır. Tek seferde
        en fazla 10 gün izin planlanır. İznin kullanım zamanı işverenle birlikte
        belirlenir.
      </p>
    </div>
  );
}
