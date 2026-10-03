"use client";

import { useEffect, useMemo, useState } from "react";
import {
  catchUp,
  feastDate,
  formatChapterRange,
  formatLongDate,
  formatShortDate,
  MYSTERIES,
  MYSTERY_BY_WEEKDAY,
  NOVENA_FEASTS,
  novenaFor,
  PAY_PERIODS,
  READING_SCOPES,
  readingSchedule,
  rosarySteps,
  scopeBooks,
  scopeChapters,
  tithe,
  upcomingNovenas,
  WEEKDAYS,
  type MysterySet,
  type PayPeriod,
  type ReadingScope,
} from "../../converter/christian/christianCalc";
import { addDaysYmd, diffDays, parseYmd, weekdayOf } from "../../converter/time/dateMath";

const fmt = (n: number, digits = 0) => n.toLocaleString("en-US", { maximumFractionDigits: digits });
const money = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const num = (raw: string) => {
  const n = Number(raw.replace(/[\s,$€£]/g, ""));
  return raw.trim() === "" ? Number.NaN : n;
};

function todayIso() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Fixed value for the pre-rendered HTML, replaced by the visitor's date after hydration. */
function useToday(initial: string) {
  const [today, setToday] = useState(initial);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setToday(todayIso()));
    return () => cancelAnimationFrame(frame);
  }, []);
  return today;
}

function Tabs<T extends string>({ value, onChange, options, label }: { value: T; onChange: (v: T) => void; options: Array<[T, string]>; label: string }) {
  return (
    <div className="date-converter-modes is-light" role="tablist" aria-label={label}>
      {options.map(([v, text]) => (
        <button key={v} type="button" role="tab" aria-selected={value === v} className={value === v ? "is-active" : undefined} onClick={() => onChange(v)}>
          {text}
        </button>
      ))}
    </div>
  );
}

/* ---------------- Bible reading plan ---------------- */

export function ReadingPlanCalculator({ initialDate }: { initialDate: string }) {
  const today = useToday(initialDate);
  const [mode, setMode] = useState<"plan" | "behind">("plan");
  const [scope, setScope] = useState<ReadingScope>("bible");
  const [days, setDays] = useState("365");
  const [start, setStart] = useState("");
  const [showAll, setShowAll] = useState(false);
  // Catch-up inputs
  const [planStart, setPlanStart] = useState("");
  const [lastBook, setLastBook] = useState("genesis");
  const [lastChapter, setLastChapter] = useState("0");
  const startDate = start || today;
  const planStartDate = planStart || `${today.slice(0, 4)}-01-01`;

  const chapters = useMemo(() => scopeChapters(scope), [scope]);
  const books = useMemo(() => scopeBooks(scope), [scope]);
  const plan = useMemo(() => readingSchedule(chapters, num(days)), [chapters, days]);
  const s = parseYmd(startDate);

  const book = books.find((b) => b.slug === lastBook) ?? books[0];
  const lastCh = Math.min(Math.max(0, Math.round(num(lastChapter)) || 0), book.chapters);
  const readCount = chapters.findIndex((c) => c.book === book) + lastCh;
  const ps = parseYmd(planStartDate);
  const t = parseYmd(today);
  const elapsed = ps && t ? diffDays(ps, t) : Number.NaN;
  const c = mode === "behind" && Number.isFinite(elapsed) ? catchUp(chapters.length, readCount, num(days), elapsed) : null;

  const shown = showAll ? plan : plan.slice(0, 14);

  return (
    <div className="date-calc">
      <Tabs
        label="Calculator mode"
        value={mode}
        onChange={setMode}
        options={[
          ["plan", "Make a reading plan"],
          ["behind", "I fell behind – catch up"],
        ]}
      />
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>What to read</span>
            <select
              value={scope}
              onChange={(e) => {
                setScope(e.target.value as ReadingScope);
                setLastBook(scopeBooks(e.target.value as ReadingScope)[0].slug);
              }}
            >
              {READING_SCOPES.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <label className="date-calc-field">
            <span>Plan length (days)</span>
            <input inputMode="numeric" value={days} onChange={(e) => setDays(e.target.value)} />
          </label>
          {mode === "plan" ? (
            <label className="date-calc-field">
              <span>Start date</span>
              <input type="date" value={startDate} onChange={(e) => setStart(e.target.value)} />
            </label>
          ) : (
            <label className="date-calc-field">
              <span>Plan started on</span>
              <input type="date" value={planStartDate} onChange={(e) => setPlanStart(e.target.value)} />
            </label>
          )}
        </div>
        <div className="date-calc-chips" aria-label="Plan length">
          {[30, 90, 180, 365, 730].map((d) => (
            <button key={d} type="button" onClick={() => setDays(String(d))}>
              {d === 365 ? "1 year" : d === 730 ? "2 years" : `${d} days`}
            </button>
          ))}
        </div>
        {mode === "behind" ? (
          <div className="date-calc-fields">
            <label className="date-calc-field">
              <span>Last book I finished a chapter in</span>
              <select value={book.slug} onChange={(e) => setLastBook(e.target.value)}>
                {books.map((b) => (
                  <option key={b.slug} value={b.slug}>
                    {b.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="date-calc-field">
              <span>Last chapter read (0–{book.chapters})</span>
              <input inputMode="numeric" value={lastChapter} onChange={(e) => setLastChapter(e.target.value)} />
            </label>
          </div>
        ) : null}
      </div>

      {mode === "plan" ? (
        plan.length && s ? (
          <>
            <div className="date-calc-results">
              <div className="date-calc-stat is-main">
                <span>Chapters per day</span>
                <strong>{fmt(chapters.length / plan.length, 2)}</strong>
                <em>
                  {fmt(chapters.length)} chapters in {fmt(plan.length)} days
                </em>
              </div>
              <div className="date-calc-stat">
                <span>Finish date</span>
                <strong>{formatShortDate(addDaysYmd(s, plan.length - 1))}</strong>
                <em>if you read every day</em>
              </div>
            </div>
            <div className="holiday-table-wrap">
              <table className="holiday-table">
                <thead>
                  <tr>
                    <th scope="col">Day</th>
                    <th scope="col">Date</th>
                    <th scope="col">Read</th>
                  </tr>
                </thead>
                <tbody>
                  {shown.map((d) => (
                    <tr key={d.day}>
                      <td>{d.day}</td>
                      <td>{formatShortDate(addDaysYmd(s, d.day - 1))}</td>
                      <td>{formatChapterRange(d.from, d.to)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {plan.length > 14 ? (
              <button type="button" className="kaza-takip-btn" onClick={() => setShowAll((v) => !v)}>
                {showAll ? "Show the first 14 days" : `Show all ${fmt(plan.length)} days`}
              </button>
            ) : null}
          </>
        ) : (
          <p className="date-calc-note">Enter a plan length of at least 1 day and a start date.</p>
        )
      ) : c ? (
        <div className="date-calc-results">
          <div className={`date-calc-stat is-main${c.behind === 0 ? "" : " sefer-sinirda"}`}>
            <span>{c.behind === 0 ? "You are on track" : "You are behind by"}</span>
            <strong>{c.behind === 0 ? `${fmt(c.read - c.expected)} chapters ahead` : `${fmt(c.behind)} chapters`}</strong>
            <em>
              {fmt(c.read)} of {fmt(c.total)} read · plan expected {fmt(c.expected)} by today
            </em>
          </div>
          <div className="date-calc-stat">
            <span>New pace to finish on time</span>
            <strong>{Number.isFinite(c.newPace) ? `${fmt(c.newPace, 2)} chapters/day` : "Plan period is over"}</strong>
            <em>
              {fmt(c.remaining)} chapters left in {fmt(c.daysLeft)} days (planned pace {fmt(c.planPace, 2)})
            </em>
          </div>
          {c.remaining > 0 ? (
            <div className="date-calc-stat">
              <span>Or keep the planned pace</span>
              <strong>{t ? formatShortDate(addDaysYmd(t, Math.ceil(c.remaining / c.planPace) - 1)) : "—"}</strong>
              <em>new finish date at {fmt(c.planPace, 2)} chapters/day</em>
            </div>
          ) : null}
        </div>
      ) : (
        <p className="date-calc-note">Check the plan start date (it must be today or earlier) and the plan length.</p>
      )}
    </div>
  );
}

/* ---------------- Novena ---------------- */

export function NovenaCalculator({ initialDate }: { initialDate: string }) {
  const today = useToday(initialDate);
  const [feastId, setFeastId] = useState("michael");
  const [custom, setCustom] = useState("");
  const t = parseYmd(today)!;
  const feast = NOVENA_FEASTS.find((f) => f.id === feastId);

  // Next occurrence whose novena has not ended yet.
  let day = null as ReturnType<typeof feastDate>;
  if (feastId === "custom") day = parseYmd(custom);
  else if (feast) {
    day = feastDate(feast, t.year);
    if (day && diffDays(t, day) < 1) day = feastDate(feast, t.year + 1);
  }
  const n = day ? novenaFor(day) : null;
  const upcoming = upcomingNovenas(t, 6);
  const dayOfNovena = n ? diffDays(n.start, t) + 1 : 0;

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Novena</span>
            <select value={feastId} onChange={(e) => setFeastId(e.target.value)}>
              {NOVENA_FEASTS.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
              <option value="custom">Other feast or intention date…</option>
            </select>
          </label>
          {feastId === "custom" ? (
            <label className="date-calc-field">
              <span>Feast or target date</span>
              <input type="date" value={custom} onChange={(e) => setCustom(e.target.value)} />
            </label>
          ) : null}
        </div>
      </div>

      {n ? (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>Start the novena on</span>
            <strong>{formatLongDate(n.start)}</strong>
            <em>
              {dayOfNovena >= 1 && dayOfNovena <= 9
                ? `Today is day ${dayOfNovena} of 9`
                : dayOfNovena < 1
                  ? `${fmt(1 - dayOfNovena)} day${dayOfNovena === 0 ? "" : "s"} from today`
                  : "this novena has ended"}
            </em>
          </div>
          <div className="date-calc-stat">
            <span>Last (ninth) day</span>
            <strong>{formatShortDate(n.end)}</strong>
            <em>the eve of the feast</em>
          </div>
          <div className="date-calc-stat">
            <span>Feast day</span>
            <strong>{formatShortDate(n.feastDay)}</strong>
          </div>
        </div>
      ) : (
        <p className="date-calc-note">Pick a feast date.</p>
      )}

      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <caption>Upcoming novenas</caption>
          <thead>
            <tr>
              <th scope="col">Novena</th>
              <th scope="col">Starts</th>
              <th scope="col">Feast</th>
            </tr>
          </thead>
          <tbody>
            {upcoming.map((u) => (
              <tr key={`${u.feast.id}-${u.feastDay.year}`}>
                <td>{u.feast.name}</td>
                <td>{formatShortDate(u.start)}</td>
                <td>{formatShortDate(u.feastDay)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------- Rosary ---------------- */

export function RosaryGuide({ initialDate }: { initialDate: string }) {
  const today = useToday(initialDate);
  const t = parseYmd(today)!;
  const todaySet = MYSTERY_BY_WEEKDAY[weekdayOf(t)];
  const [set, setSet] = useState<MysterySet | null>(null);
  const [fatima, setFatima] = useState(true);
  const [step, setStep] = useState(0);
  const active = set ?? todaySet;
  const steps = useMemo(() => rosarySteps(active, fatima), [active, fatima]);
  const current = steps[Math.min(step, steps.length - 1)];
  const done = step >= steps.length;
  const hailMarysDone = steps.slice(0, step).filter((s) => s.bead === "small").length;

  return (
    <div className="date-calc">
      <div className="date-calc-results">
        <div className="date-calc-stat is-main">
          <span>Today ({WEEKDAYS[weekdayOf(t)]})</span>
          <strong>{MYSTERIES[todaySet].name}</strong>
          <em>{MYSTERIES[todaySet].items.join(" · ")}</em>
        </div>
      </div>
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Mysteries to pray</span>
            <select
              value={active}
              onChange={(e) => {
                setSet(e.target.value as MysterySet);
                setStep(0);
              }}
            >
              {(Object.keys(MYSTERIES) as MysterySet[]).map((k) => (
                <option key={k} value={k}>
                  {MYSTERIES[k].name}
                  {k === todaySet ? " (today)" : ""}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="date-calc-check">
          <input type="checkbox" checked={fatima} onChange={(e) => setFatima(e.target.checked)} />
          Add the Fatima Prayer after each decade
        </label>
      </div>

      <button type="button" className="zikir-buton" onClick={() => setStep((s) => Math.min(s + 1, steps.length))} aria-label="Next prayer">
        {done ? (
          <>
            <span className="zikir-ad">Rosary complete</span>
            <strong>✓</strong>
            <span className="zikir-hedef">tap “Start again” to pray another</span>
          </>
        ) : (
          <>
            <span className="zikir-ad">{current.decade ? `Decade ${current.decade} of 5` : step === 0 ? "Opening" : step < 6 ? "Opening" : "Closing"}</span>
            <strong className="rosary-prayer">{current.prayer}</strong>
            <span className="zikir-hedef">{current.count ? `${current.count} · tap for next` : "tap for next"}</span>
          </>
        )}
      </button>
      <div className="kaza-takip-cubuk" aria-hidden="true">
        <i style={{ width: `${(Math.min(step, steps.length) / steps.length) * 100}%` }} />
      </div>
      <div className="kaza-takip-alt">
        <button type="button" className="kaza-takip-btn" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
          Back
        </button>
        <button type="button" className="kaza-takip-btn" onClick={() => setStep(0)}>
          Start again
        </button>
        <span className="kaza-takip-kalan">
          {hailMarysDone} of 53 Hail Marys · step {Math.min(step + 1, steps.length)} of {steps.length}
        </span>
      </div>
    </div>
  );
}

/* ---------------- Tithe ---------------- */

export function TitheCalculator() {
  const [gross, setGross] = useState("");
  const [net, setNet] = useState("");
  const [period, setPeriod] = useState<PayPeriod>("monthly");
  const [percent, setPercent] = useState("10");
  const g = tithe(num(gross), period, num(percent));
  const n = tithe(num(net), period, num(percent));
  const per = PAY_PERIODS.find((p) => p.id === period)!;

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields is-amounts">
          <label className="date-calc-field">
            <span>Gross pay (before tax)</span>
            <input inputMode="decimal" value={gross} onChange={(e) => setGross(e.target.value)} placeholder="e.g. 4,500" />
          </label>
          <label className="date-calc-field">
            <span>Net pay (take-home, optional)</span>
            <input inputMode="decimal" value={net} onChange={(e) => setNet(e.target.value)} placeholder="e.g. 3,450" />
          </label>
          <label className="date-calc-field">
            <span>Paid</span>
            <select value={period} onChange={(e) => setPeriod(e.target.value as PayPeriod)}>
              {PAY_PERIODS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>
          <label className="date-calc-field">
            <span>Giving (%)</span>
            <input inputMode="decimal" value={percent} onChange={(e) => setPercent(e.target.value)} />
          </label>
        </div>
      </div>

      {g || n ? (
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col"></th>
                {g ? <th scope="col">On gross pay</th> : null}
                {n ? <th scope="col">On net pay</th> : null}
              </tr>
            </thead>
            <tbody>
              {(
                [
                  [`Per paycheck (${per.label.toLowerCase()})`, "perPeriod"],
                  ["Per week", "weekly"],
                  ["Per month", "monthly"],
                  ["Per year", "annual"],
                ] as const
              ).map(([label, key]) => (
                <tr key={key}>
                  <td>{label}</td>
                  {g ? (
                    <td>
                      <strong>{money(g[key])}</strong>
                    </td>
                  ) : null}
                  {n ? <td>{money(n[key])}</td> : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="date-calc-note">Enter your pay for one pay period; the percentage is 10% by default.</p>
      )}
      {g && n ? (
        <p className="date-calc-note">
          Giving on gross pay is {money(g.annual - n.annual)} more per year than on net pay.
        </p>
      ) : null}
    </div>
  );
}
