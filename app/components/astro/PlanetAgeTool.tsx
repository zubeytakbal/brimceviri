"use client";

import { useState } from "react";
import { daysBetween, daysFromYears, planetAges } from "../../converter/time/planetAge";

const num = (v: number, digits: number) => v.toLocaleString("tr-TR", { minimumFractionDigits: digits, maximumFractionDigits: digits });
const ageText = (v: number) => num(v, v < 10 ? 2 : 1);
/** Kalan süre: iki yıldan kısaysa gün, uzunsa Dünya yılı olarak. */
const waitText = (days: number) =>
  days < 730 ? `${Math.ceil(days).toLocaleString("tr-TR")} Dünya günü` : `yaklaşık ${num(days / 365.25, 1)} Dünya yılı`;
/** Dünya yaşını virgülsüz yazar: "25 yaşınızı 12 gün geçince". */
function earthAgeText(years: number) {
  const whole = Math.floor(years);
  const days = Math.round((years - whole) * 365.25);
  return days ? `${whole} yaşınızı ${days} gün geçince` : `${whole} yaşınıza girdiğinizde`;
}
const dateText = (d: Date) => new Intl.DateTimeFormat("tr-TR", { timeZone: "UTC", day: "numeric", month: "long", year: "numeric" }).format(d);

export default function PlanetAgeTool({ defaultAge }: { defaultAge: number }) {
  const [mode, setMode] = useState<"age" | "birth">("age");
  const [age, setAge] = useState(String(defaultAge));
  const [birth, setBirth] = useState("");

  const years = Number(age.replace(",", "."));
  const birthDate = mode === "birth" && /^\d{4}-\d{2}-\d{2}$/.test(birth) ? new Date(`${birth}T00:00:00Z`) : null;
  const days = mode === "age" ? (years > 0 && years < 150 ? daysFromYears(years) : null) : birthDate ? daysBetween(birthDate, new Date()) : null;
  const rows = days !== null && days > 0 ? planetAges(days, birthDate ?? undefined) : null;

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-chips" role="group" aria-label="Giriş türü">
          <button type="button" aria-pressed={mode === "age"} onClick={() => setMode("age")}>
            Dünya&apos;daki yaşım
          </button>
          <button type="button" aria-pressed={mode === "birth"} onClick={() => setMode("birth")}>
            Doğum tarihim
          </button>
        </div>
        <div className="date-calc-fields">
          {mode === "age" ? (
            <label className="date-calc-field">
              <span>Yaşınız (Dünya yılı)</span>
              <input type="text" inputMode="decimal" value={age} onChange={(e) => setAge(e.target.value)} />
            </label>
          ) : (
            <label className="date-calc-field">
              <span>Doğum tarihiniz</span>
              <input type="date" value={birth} min="1900-01-01" max="2100-12-31" onChange={(e) => setBirth(e.target.value)} />
            </label>
          )}
        </div>
      </div>
      <div className="date-calc-results" aria-live="polite">
        {rows ? (
          rows.map((r) => {
            const whole = Math.floor(r.age);
            const nextText = whole >= 1 ? `${whole + 1} yaşına` : "1 yaşına";
            // Doğum tarihi biliniyorsa kalan süre ve tarih; yalnızca yaş girildiyse o yaşa Dünya'da kaç yaşındayken girildiği.
            const when = r.next
              ? `${nextText} girmenize ${waitText((r.next.date.getTime() - birthDate!.getTime()) / 86400000 - days!)} kaldı (${dateText(r.next.date)}).`
              : r.id === "dunya"
                ? ""
                : `${nextText}, Dünya'da ${earthAgeText(((whole + 1) * r.orbitDays) / 365.25)} girersiniz.`;
            return (
              <div key={r.id} className={r.id === "dunya" ? "date-calc-stat is-main" : "date-calc-stat"}>
                <span>{r.name}</span>
                <strong>{whole >= 1 ? `${whole} yaşındasınız` : "Henüz 1 yaşında değilsiniz"}</strong>
                <em>
                  {whole < 1 ? `İlk yılınız %${Math.floor(r.age * 100)} tamamlandı. ` : ""}
                  {when}
                  {(when || whole < 1) && <br />}
                  Tam değer {ageText(r.age)} yıl · bir yılı {num(r.orbitDays, 0)} Dünya günü · orada {Math.floor(r.localDays).toLocaleString("tr-TR")} gün yaşadınız
                </em>
              </div>
            );
          })
        ) : (
          <div className="date-calc-stat is-main">
            <span>Gezegenlerdeki yaşınız</span>
            <strong>—</strong>
            <em>{mode === "age" ? "0 ile 150 arasında bir yaş girin." : "Bugünden önceki bir doğum tarihi seçin."}</em>
          </div>
        )}
      </div>
    </div>
  );
}
