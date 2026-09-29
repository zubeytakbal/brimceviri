"use client";

import { useEffect, useState } from "react";
import CountdownDisplay, { type CountdownCopy } from "./CountdownDisplay";

type Saved = { id: string; title: string; date: string; time: string };

export type CustomCountdownCopy = CountdownCopy & {
  heading: string;
  titleLabel: string;
  titlePlaceholder: string;
  dateLabel: string;
  timeLabel: string;
  add: string;
  share: string;
  copied: string;
  remove: string;
  empty: string;
  shared: string;
};

const STORAGE_KEY = "birimceviri:countdowns";

function parse(date: string, time: string) {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = (time || "00:00").split(":").map(Number);
  if (!year || !month || !day) return null;
  return { year, month, day, hour: hour || 0, minute: minute || 0 };
}

// Kendi geri sayimini olustur: dogum gunu, sinav, tatil... Tarayicida saklanir,
// paylasim linki ile baskasina gonderilebilir (?b=baslik&t=2027-01-01T09:00).
export default function CustomCountdown({ lang, copy, basePath }: { lang: "tr" | "en" | "de"; copy: CustomCountdownCopy; basePath: string }) {
  const [items, setItems] = useState<Saved[]>([]);
  const [shared, setShared] = useState<Saved | null>(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("00:00");
  const [loaded, setLoaded] = useState(false);
  const [copiedId, setCopiedId] = useState("");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) setItems((JSON.parse(raw) as Saved[]).filter((item) => item && typeof item.date === "string"));
      } catch {
        // Okunamazsa liste bos baslar.
      }
      const params = new URLSearchParams(window.location.search);
      const t = params.get("t");
      if (t && /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2})?$/.test(t)) {
        const [d, hm] = t.split("T");
        setShared({ id: "shared", title: (params.get("b") ?? "").slice(0, 80), date: d, time: hm ?? "00:00" });
      }
      setLoaded(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Gizli sekme: liste yalnizca bu ziyarette kalir.
    }
  }, [items, loaded]);

  const add = () => {
    if (!parse(date, time)) return;
    setItems((current) => [...current, { id: `${Date.now()}`, title: title.trim().slice(0, 80), date, time }]);
    setTitle("");
  };

  const share = async (item: Saved) => {
    const url = `${window.location.origin}${basePath}?b=${encodeURIComponent(item.title)}&t=${item.date}T${item.time}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(item.id);
      window.setTimeout(() => setCopiedId(""), 2000);
    } catch {
      window.prompt(copy.share, url);
    }
  };

  const renderItem = (item: Saved, removable: boolean) => {
    const target = parse(item.date, item.time);
    if (!target) return null;
    return (
      <li key={item.id} className="custom-countdown-item">
        <strong>{item.title || item.date}</strong>
        <CountdownDisplay targets={[target]} zone="local" lang={lang} title={item.title} copy={copy} compact />
        <div className="custom-countdown-actions">
          <button type="button" className="time-tool-button is-secondary" onClick={() => void share(item)}>
            {copiedId === item.id ? copy.copied : copy.share}
          </button>
          {removable && (
            <button type="button" className="time-tool-button is-secondary" onClick={() => setItems((current) => current.filter((i) => i.id !== item.id))}>
              {copy.remove}
            </button>
          )}
        </div>
      </li>
    );
  };

  return (
    <div className="custom-countdown">
      <h2>{copy.heading}</h2>
      {shared && (
        <div className="custom-countdown-shared">
          <p>{copy.shared}</p>
          <ul>{renderItem(shared, false)}</ul>
        </div>
      )}
      <div className="custom-countdown-form">
        <label>
          <span>{copy.titleLabel}</span>
          <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder={copy.titlePlaceholder} maxLength={80} />
        </label>
        <label>
          <span>{copy.dateLabel}</span>
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </label>
        <label>
          <span>{copy.timeLabel}</span>
          <input type="time" value={time} onChange={(event) => setTime(event.target.value)} />
        </label>
        <button type="button" className="sleep-primary-button is-compact" onClick={add} disabled={!date}>
          {copy.add}
        </button>
      </div>
      {items.length === 0 ? <p className="custom-countdown-empty">{copy.empty}</p> : <ul className="custom-countdown-list">{items.map((item) => renderItem(item, true))}</ul>}
    </div>
  );
}
