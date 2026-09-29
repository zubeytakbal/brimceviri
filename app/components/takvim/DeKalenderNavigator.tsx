"use client";

import { useState } from "react";
import Link from "@/app/components/SiteLink";
import {
  DE_JAHRE,
  DE_MONATE,
  deBesondererTagPfad,
  deMonatPfad,
  deTagesKarte,
} from "../../converter/calendar/deKalender";
import type { YMD } from "../../converter/time/calendars";
import {
  GERMAN_STATES,
  type StateCode,
} from "../../converter/time/germanHolidays";
import { DeLegende, DeMonatsGitter } from "./DeMonatsGitter";

const ILK = 1900;
const SON = 2100;

/** Interaktiver Monatskalender (1900–2100) mit Bundesland-Auswahl und Kalenderwochen. */
export default function DeKalenderNavigator({ heute }: { heute: YMD }) {
  const [ansicht, setAnsicht] = useState({
    year: heute.year,
    month: heute.month,
  });
  const [land, setLand] = useState<StateCode | "">("");
  const gehe = (delta: number) =>
    setAnsicht((c) => {
      const i = c.year * 12 + (c.month - 1) + delta;
      const y = Math.floor(i / 12);
      if (y < ILK || y > SON) return c;
      return { year: y, month: (i % 12) + 1 };
    });
  const { year, month } = ansicht;
  const termine = [...deTagesKarte(year).entries()]
    .filter(([k]) => Number(k.slice(5, 7)) === month)
    .flatMap(([k, list]) => list.map((t) => ({ k, t })))
    .filter((x, i, a) => a.findIndex((y) => y.t.tag.id === x.t.tag.id) === i);
  const mitSeite = DE_JAHRE.includes(year);

  return (
    <div className="takvim-gezgini">
      <div className="takvim-ay-baslik">
        <button
          type="button"
          className="takvim-nav"
          onClick={() => gehe(-1)}
          aria-label="Vorheriger Monat"
        >
          ‹
        </button>
        <h2>
          <select
            value={month}
            onChange={(e) =>
              setAnsicht({ year, month: Number(e.target.value) })
            }
            aria-label="Monat"
          >
            {DE_MONATE.map((m, i) => (
              <option key={m} value={i + 1}>
                {m}
              </option>
            ))}
          </select>{" "}
          <select
            value={year}
            onChange={(e) =>
              setAnsicht({ year: Number(e.target.value), month })
            }
            aria-label="Jahr"
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
          onClick={() => gehe(1)}
          aria-label="Nächster Monat"
        >
          ›
        </button>
      </div>
      <p className="takvim-hicri-aralik">
        <label>
          Feiertage für{" "}
          <select
            value={land}
            onChange={(e) => setLand(e.target.value as StateCode | "")}
            aria-label="Bundesland"
          >
            <option value="">ganz Deutschland</option>
            {GERMAN_STATES.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        {year !== heute.year || month !== heute.month ? (
          <>
            {" · "}
            <button
              type="button"
              className="takvim-bugune"
              onClick={() =>
                setAnsicht({ year: heute.year, month: heute.month })
              }
            >
              Heute
            </button>
          </>
        ) : null}
      </p>
      <DeMonatsGitter
        year={year}
        month={month}
        land={land || null}
        heute={heute}
        gross
        verlinken={mitSeite}
      />
      <DeLegende land={Boolean(land)} />
      {termine.length ? (
        <ul className="takvim-gezgini-liste">
          {termine.map(({ k, t }) => (
            <li key={k + t.tag.id}>
              <strong>{Number(k.slice(8))}.</strong>{" "}
              <Link href={deBesondererTagPfad(t.tag.id)} prefetch={false}>
                {t.tag.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
      <p className="date-calc-note">
        {year < 2019
          ? "Feiertage nach heutiger Rechtslage; vor 2019 galten in einzelnen Ländern andere Regeln. "
          : ""}
        {mitSeite ? (
          <Link href={deMonatPfad(year, month)} prefetch={false}>
            {DE_MONATE[month - 1]} {year}: Feiertage, Arbeitstage und Mondphasen
          </Link>
        ) : null}
      </p>
    </div>
  );
}
