"use client";

import { useEffect, useState } from "react";
import {
  BIBLE_BOOKS,
  EASTER_MAX_YEAR,
  EASTER_MIN_YEAR,
  formatLongDate,
  formatMinutes,
  formatShortDate,
  orthodoxEaster,
  orthodoxFeasts,
  orthodoxLent,
  westernEaster,
  westernFeasts,
  westernLent,
} from "../../converter/christian/christianCalc";
import { diffDays, parseYmd } from "../../converter/time/dateMath";

const fmt = (n: number) => n.toLocaleString("en-US");

function todayIso() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/* ---------------- Easter ---------------- */

export function EasterCalculator({ initialYear }: { initialYear: number }) {
  const [year, setYear] = useState(String(initialYear));
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    // The page is pre-rendered; switch to the visitor's current year after hydration.
    const frame = requestAnimationFrame(() => {
      if (!touched) setYear(String(new Date().getFullYear()));
    });
    return () => cancelAnimationFrame(frame);
  }, [touched]);

  const pick = (value: number) => {
    setTouched(true);
    setYear(String(value));
  };
  const y = Number(year);
  const west = westernEaster(y);
  const east = orthodoxEaster(y);
  const wf = westernFeasts(y);
  const of = orthodoxFeasts(y);
  const gap = west && east ? diffDays(west, east) : 0;

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Year ({EASTER_MIN_YEAR}–{EASTER_MAX_YEAR})</span>
            <input
              inputMode="numeric"
              value={year}
              onChange={(event) => {
                setTouched(true);
                setYear(event.target.value.replace(/\D/g, "").slice(0, 4));
              }}
            />
          </label>
        </div>
        <div className="date-calc-chips" aria-label="Change year">
          <button type="button" onClick={() => pick(y - 1)} disabled={!west || y <= EASTER_MIN_YEAR}>
            ← {y - 1}
          </button>
          <button type="button" onClick={() => pick(y + 1)} disabled={!west || y >= EASTER_MAX_YEAR}>
            {y + 1} →
          </button>
        </div>
      </div>

      {west && east && wf && of ? (
        <>
          <div className="date-calc-results">
            <div className="date-calc-stat is-main">
              <span>Easter Sunday {y} (Western)</span>
              <strong>{formatLongDate(west)}</strong>
              <em>Catholic and Protestant churches</em>
            </div>
            <div className="date-calc-stat">
              <span>Orthodox Easter (Pascha) {y}</span>
              <strong>{formatLongDate(east)}</strong>
              <em>{gap === 0 ? "same day as Western Easter" : `${gap / 7} week${gap === 7 ? "" : "s"} after Western Easter`}</em>
            </div>
          </div>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <caption>Western moveable feasts {y}</caption>
              <thead>
                <tr>
                  <th scope="col">Feast</th>
                  <th scope="col">Date</th>
                  <th scope="col">Notes</th>
                </tr>
              </thead>
              <tbody>
                {wf.map((f) => (
                  <tr key={f.id}>
                    <td>{f.name}</td>
                    <td>{formatShortDate(f.date)}</td>
                    <td>{f.note ?? ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <caption>Orthodox moveable feasts {y} (Gregorian dates)</caption>
              <thead>
                <tr>
                  <th scope="col">Feast</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {of.map((f) => (
                  <tr key={f.id}>
                    <td>{f.name}</td>
                    <td>{formatShortDate(f.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="date-calc-note">
          Enter a year between {EASTER_MIN_YEAR} and {EASTER_MAX_YEAR}. The Gregorian calendar, and with it today&apos;s Western Easter rule,
          started in 1582.
        </p>
      )}
    </div>
  );
}

/* ---------------- Lent ---------------- */

export function LentCalculator({ initialDate }: { initialDate: string }) {
  const [date, setDate] = useState(initialDate);
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (!touched) setDate(todayIso());
    });
    return () => cancelAnimationFrame(frame);
  }, [touched]);

  const d = parseYmd(date);
  const s = d ? westernLent(d) : null;
  // After Easter, the side panels show the coming year's Lent.
  const next = d && s?.phase === "after" ? westernLent({ year: d.year + 1, month: 1, day: 1 }) : null;
  const shown = next ?? s;
  const shownYear = d ? d.year + (next ? 1 : 0) : 0;
  const o = d ? orthodoxLent(shownYear) : null;

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Date</span>
            <input
              type="date"
              value={date}
              onChange={(event) => {
                setTouched(true);
                setDate(event.target.value);
              }}
            />
          </label>
        </div>
      </div>

      {s ? (
        <div className="date-calc-results">
          {s.phase === "lent" ? (
            <div className="date-calc-stat is-main">
              <span>{s.isSunday ? "Sunday in Lent (not counted)" : "Day of Lent"}</span>
              <strong>{s.isSunday ? `After day ${s.day} of 40` : `Day ${s.day} of 40`}</strong>
              <em>
                {s.daysLeftAfterToday} Lenten day{s.daysLeftAfterToday === 1 ? "" : "s"} left · {s.daysToEaster} day{s.daysToEaster === 1 ? "" : "s"} until
                Easter
              </em>
            </div>
          ) : s.phase === "before" ? (
            <div className="date-calc-stat is-main">
              <span>Lent has not started</span>
              <strong>
                {s.daysUntil} day{s.daysUntil === 1 ? "" : "s"} until Ash Wednesday
              </strong>
              <em>{formatLongDate(s.start)}</em>
            </div>
          ) : (
            <div className="date-calc-stat is-main">
              <span>Lent {d!.year} is over</span>
              <strong>Easter was {formatShortDate(s.easter)}</strong>
              <em>{next && next.phase === "before" ? `Next Ash Wednesday: ${formatLongDate(next.start)} (in ${diffDays(d!, next.start)} days)` : ""}</em>
            </div>
          )}
          <div className="date-calc-stat">
            <span>Ash Wednesday → Holy Saturday {shownYear}</span>
            <strong>
              {formatShortDate(shown!.start)} – {formatShortDate(addDay(shown!.easter, -1))}
            </strong>
            <em>46 days, of which 40 are counted (Sundays excluded)</em>
          </div>
          {o ? (
            <div className="date-calc-stat">
              <span>Orthodox Great Lent {shownYear}</span>
              <strong>
                {formatShortDate(o.start)} – {formatShortDate(o.end)}
              </strong>
              <em>Clean Monday to the Friday before Lazarus Saturday · Pascha {formatShortDate(o.easter)}</em>
            </div>
          ) : null}
        </div>
      ) : (
        <p className="date-calc-note">
          Pick a date between {EASTER_MIN_YEAR} and {EASTER_MAX_YEAR}.
        </p>
      )}
    </div>
  );
}

function addDay(date: { year: number; month: number; day: number }, days: number) {
  const t = new Date(Date.UTC(date.year, date.month - 1, date.day + days));
  return { year: t.getUTCFullYear(), month: t.getUTCMonth() + 1, day: t.getUTCDate() };
}

/* ---------------- Bible book finder ---------------- */

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

/** All books on one page: ?book= opens a book's chapter-by-chapter verse counts. */
export function BibleBookFinder() {
  const [q, setQ] = useState("");
  const [testament, setTestament] = useState<"all" | "Old" | "New">("all");
  const [slug, setSlug] = useState("genesis");
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const book = new URLSearchParams(window.location.search).get("book");
      if (book && BIBLE_BOOKS.some((b) => b.slug === book)) setSlug(book);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  const book = BIBLE_BOOKS.find((b) => b.slug === slug)!;
  // "Psalm 23", not "Psalms 23".
  const ref = (n: number) => `${book.slug === "psalms" ? "Psalm" : book.name} ${n}`;
  const longest = Math.max(...book.versesPerChapter);
  const shortest = Math.min(...book.versesPerChapter);
  const query = norm(q);
  const rows = BIBLE_BOOKS.filter(
    (b) => (testament === "all" || b.testament === testament) && (!query || norm(`${b.name} ${b.section}`).includes(query)),
  );

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field sure-arama">
            <span>Search a book</span>
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. Psalms, John, Epistles" />
          </label>
          <label className="date-calc-field">
            <span>Testament</span>
            <select value={testament} onChange={(e) => setTestament(e.target.value as typeof testament)}>
              <option value="all">Both</option>
              <option value="Old">Old Testament</option>
              <option value="New">New Testament</option>
            </select>
          </label>
        </div>
      </div>
      <section className="category-article-content" id="book">
        <h2>
          {book.name}: {book.chapters} {book.chapters === 1 ? "chapter" : "chapters"}, {fmt(book.verses)} verses
        </h2>
        <p>
          Book {book.order} of 66 ({book.section}, {book.testament} Testament). About {formatMinutes(book.readingMinutes)} to read
          {book.chapters > 1
            ? `; ${ref(book.versesPerChapter.indexOf(longest) + 1)} is the longest chapter (${longest} verses) and ${ref(book.versesPerChapter.indexOf(shortest) + 1)} the shortest (${shortest}).`
            : "."}
        </p>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Chapter</th>
                <th scope="col">Verses</th>
              </tr>
            </thead>
            <tbody>
              {book.versesPerChapter.map((v, i) => (
                <tr key={i}>
                  <td>{ref(i + 1)}</td>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Book</th>
              <th scope="col">Chapters</th>
              <th scope="col">Verses</th>
              <th scope="col">Reading time</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((b) => (
              <tr key={b.slug}>
                <td>{b.order}</td>
                <td>
                  <a
                    href={`?book=${b.slug}#book`}
                    rel="nofollow"
                    onClick={(event) => {
                      event.preventDefault();
                      setSlug(b.slug);
                      document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {b.name}
                  </a>
                  <br />
                  <small>{b.section}</small>
                </td>
                <td>{b.chapters}</td>
                <td>{fmt(b.verses)}</td>
                <td>{formatMinutes(b.readingMinutes)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.length === 0 ? <p className="date-calc-note">No book matches your search.</p> : null}
    </div>
  );
}
