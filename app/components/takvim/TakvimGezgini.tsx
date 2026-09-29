"use client";

import { useState } from "react";
import Link from "@/app/components/SiteLink";
import {
  AY_ADLARI,
  gunHaritasi,
  halkDonemi,
  halkMetni,
  ozelGunPath,
  TAKVIM_YILLARI,
  takvimAyPath,
  takvimGunPath,
  tarihliAd,
} from "../../converter/calendar/trTakvim";
import {
  gregorianToHijri,
  HIJRI_MONTHS_TR,
  type YMD,
} from "../../converter/time/calendars";
import {
  daysInMonth,
  isWeekend,
  weekdayOf,
  ymdKey,
} from "../../converter/time/dateMath";
import {
  HOLIDAY_FIRST_YEAR,
  turkeyHolidays,
} from "../../converter/time/holidays";
import { moonPhasesBetween } from "../../converter/time/moon";
import { okulTatiliMi } from "../../converter/calendar/okulTakvimi";

const HAFTA = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
const ILK = 1900;
const SON = 2100;

/** İstanbul saatine göre ay evresi günleri: dolunay ve yeni ay. */
function evreler(year: number, month: number) {
  const m = new Map<string, string>();
  for (const e of moonPhasesBetween(
    new Date(Date.UTC(year, month - 1, 1, -3)),
    new Date(Date.UTC(year, month, 1, -3)),
  )) {
    if (e.kind !== "full" && e.kind !== "new") continue;
    const t = new Date(e.date.getTime() + 3 * 3600000);
    m.set(
      ymdKey({
        year: t.getUTCFullYear(),
        month: t.getUTCMonth() + 1,
        day: t.getUTCDate(),
      }),
      e.kind === "full" ? "🌕" : "🌑",
    );
  }
  return m;
}

/** Herhangi bir ay ve yıl için etkileşimli Türkiye takvimi (1900–2100). */
export default function TakvimGezgini({ bugun }: { bugun: YMD }) {
  const [ay, setAy] = useState({ year: bugun.year, month: bugun.month });
  const git = (delta: number) =>
    setAy((c) => {
      const i = c.year * 12 + (c.month - 1) + delta;
      const y = Math.floor(i / 12);
      if (y < ILK || y > SON) return c;
      return { year: y, month: (i % 12) + 1 };
    });

  const { year, month } = ay;
  const lead = (weekdayOf({ year, month, day: 1 }) + 6) % 7;
  // Resmî tatil renklendirmesi yalnızca doğrulanmış yıllarda (tatil kuralları geçmişte farklıydı).
  const tatil =
    year >= HOLIDAY_FIRST_YEAR.tr
      ? new Map(turkeyHolidays(year).map((h) => [ymdKey(h.date), h]))
      : new Map();
  const harita = gunHaritasi(year);
  const ayEvre = evreler(year, month);
  const sayfali = TAKVIM_YILLARI.includes(year);
  const ayEtkinlik = [...harita.entries()]
    .filter(([k]) => Number(k.slice(5, 7)) === month)
    .flatMap(([k, list]) => list.map((t) => ({ k, t })));
  const tekil = ayEtkinlik.filter(
    (x, i, a) =>
      a.findIndex(
        (y) => y.t.etkinlik.id === x.t.etkinlik.id && y.t.not === x.t.not,
      ) === i,
  );
  const h1 = gregorianToHijri({ year, month, day: 1 });
  const hSon = gregorianToHijri({ year, month, day: daysInMonth(year, month) });

  return (
    <div className="takvim-gezgini">
      <div className="takvim-ay-baslik">
        <button
          type="button"
          className="takvim-nav"
          onClick={() => git(-1)}
          aria-label="Önceki ay"
        >
          ‹
        </button>
        <h2>
          <select
            value={month}
            onChange={(e) => setAy({ year, month: Number(e.target.value) })}
            aria-label="Ay"
          >
            {AY_ADLARI.map((a, i) => (
              <option key={a} value={i + 1}>
                {a}
              </option>
            ))}
          </select>{" "}
          <select
            value={year}
            onChange={(e) => setAy({ year: Number(e.target.value), month })}
            aria-label="Yıl"
          >
            {Array.from({ length: SON - ILK + 1 }, (_, i) => ILK + i).map(
              (y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ),
            )}
          </select>
        </h2>
        <button
          type="button"
          className="takvim-nav"
          onClick={() => git(1)}
          aria-label="Sonraki ay"
        >
          ›
        </button>
      </div>
      <p className="takvim-hicri-aralik">
        Hicri: {HIJRI_MONTHS_TR[h1.month - 1]}{" "}
        {h1.year !== hSon.year ? h1.year : ""}
        {h1.month !== hSon.month
          ? ` – ${HIJRI_MONTHS_TR[hSon.month - 1]}`
          : ""}{" "}
        {hSon.year}
        {year !== bugun.year || month !== bugun.month ? (
          <>
            {" · "}
            <button
              type="button"
              className="takvim-bugune"
              onClick={() => setAy({ year: bugun.year, month: bugun.month })}
            >
              Bugüne dön
            </button>
          </>
        ) : null}
      </p>
      <div className="takvim-ay is-buyuk">
        {HAFTA.map((w) => (
          <b key={w}>{w}</b>
        ))}
        {Array.from({ length: lead }, (_, i) => (
          <span key={`e${i}`} className="is-bos" />
        ))}
        {Array.from({ length: daysInMonth(year, month) }, (_, i) => {
          const d = { year, month, day: i + 1 };
          const key = ymdKey(d);
          const h = tatil.get(key);
          const ev = harita.get(key) ?? [];
          const hicri = gregorianToHijri(d);
          const cls = [
            isWeekend(d) ? "is-weekend" : "",
            h ? (h.kind === "full" ? "is-holiday" : "is-half") : "",
            ev.length ? "has-event" : "",
            okulTatiliMi(d) ? "is-okul" : "",
            ymdKey(bugun) === key ? "is-today" : "",
          ]
            .filter(Boolean)
            .join(" ");
          const title =
            [h?.name, ...ev.map(tarihliAd)]
              .filter((v, j, a) => v && a.indexOf(v) === j)
              .join(" · ") || undefined;
          const icerik = (
            <>
              <em>
                {i + 1}
                <sup>
                  {hicri.day === 1
                    ? HIJRI_MONTHS_TR[hicri.month - 1].slice(0, 3)
                    : hicri.day}
                  {ayEvre.get(key) ?? ""}
                </sup>
              </em>
              {ev.length ? (
                <small>
                  {ev.slice(0, 2).map((t) => (
                    <i
                      key={t.etkinlik.id + (t.not ?? "")}
                      className={`kat-${t.etkinlik.kategori}`}
                    >
                      {tarihliAd(t)}
                    </i>
                  ))}
                </small>
              ) : null}
            </>
          );
          return ev.length && sayfali ? (
            <Link
              key={key}
              href={takvimGunPath(d)}
              prefetch={false}
              className={cls}
              title={title}
            >
              {icerik}
            </Link>
          ) : (
            <span key={key} className={cls || undefined} title={title}>
              {icerik}
            </span>
          );
        })}
      </div>
      <p className="holiday-legend">
        <span className="is-holiday" /> Resmî tatil <span className="is-half" />{" "}
        Yarım gün <span className="takvim-lejant-etkinlik" /> Özel/dini gün{" "}
        <span className="is-weekend" /> Hafta sonu <span className="takvim-lejant-okul" /> Okul tatili · küçük rakam Hicri gün · 🌕
        dolunay · 🌑 yeni ay
      </p>
      {tekil.length ? (
        <ul className="takvim-gezgini-liste">
          {tekil.map(({ k, t }) => (
            <li key={k + t.etkinlik.id + (t.not ?? "")}>
              <strong>
                {Number(k.slice(8))} {AY_ADLARI[month - 1]}
              </strong>{" "}
              <Link href={ozelGunPath(t.etkinlik.id)} prefetch={false}>
                {tarihliAd(t)}
              </Link>
              {t.tahmini ? <small> (tahmini)</small> : null}
            </li>
          ))}
        </ul>
      ) : null}
      <p className="date-calc-note">
        {halkMetni(halkDonemi({ year, month, day: 1 }))} (ayın 1&apos;inde, halk
        takvimi).
        {year < HOLIDAY_FIRST_YEAR.tr
          ? ` ${year} yılı için resmî tatiller işaretlenmez; tatil kuralları o yıllarda farklıydı.`
          : ""}
        {sayfali ? (
          <>
            {" "}
            <Link href={takvimAyPath(year, month)} prefetch={false}>
              {AY_ADLARI[month - 1]} {year} sayfası
            </Link>
          </>
        ) : null}
      </p>
    </div>
  );
}
