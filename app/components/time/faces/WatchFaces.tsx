"use client";

import type { ReactNode } from "react";
import { handAngles } from "../clockThemes";
import type { FaceProps } from "./VintageFaces";

// Kol saatleri: dalgic, kronograf, klasik, pilot (SVG), retro dijital ve akilli
// saat (HTML). Mekanik olanlarin saniye ibresi saniyede 6-8 kucuk adimla akar.

const rot = (angle: number, cx = 120, cy = 170) => `rotate(${angle} ${cx} ${cy})`;
const CX = 120;
const CY = 170;

function Strap({ color, detail, width = 76 }: { color: string; detail?: ReactNode; width?: number }) {
  const half = width / 2;
  return (
    <g>
      <path d={`M${CX - half} 0 H${CX + half} L${CX + half - 3} 96 H${CX - half + 3} Z`} fill={color} />
      <path d={`M${CX - half + 3} 244 H${CX + half - 3} L${CX + half} 340 H${CX - half} Z`} fill={color} />
      {detail}
    </g>
  );
}

function Lugs({ fill }: { fill: string }) {
  return (
    <g fill={fill}>
      <rect x="78" y="76" width="16" height="36" rx="5" />
      <rect x="146" y="76" width="16" height="36" rx="5" />
      <rect x="78" y="228" width="16" height="36" rx="5" />
      <rect x="146" y="228" width="16" height="36" rx="5" />
    </g>
  );
}

function MinuteTrack({ outer, inner, majorInner, className }: { outer: number; inner: number; majorInner: number; className: string }) {
  return (
    <g className={className}>
      {Array.from({ length: 60 }, (_, index) => (
        <line
          key={index}
          x1={CX}
          y1={CY - outer}
          x2={CX}
          y2={CY - (index % 5 === 0 ? majorInner : inner)}
          className={index % 5 === 0 ? "is-major" : undefined}
          transform={rot(index * 6)}
        />
      ))}
    </g>
  );
}

const polar = (radius: number, index: number, total = 12) => {
  const angle = (index * (360 / total) * Math.PI) / 180;
  return { x: CX + Math.sin(angle) * radius, y: CY - Math.cos(angle) * radius };
};

function SteelDefs() {
  return (
    <defs>
      <linearGradient id="wf-steel" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#f5f7fa" />
        <stop offset="0.45" stopColor="#aeb7c2" />
        <stop offset="1" stopColor="#6d7784" />
      </linearGradient>
      <linearGradient id="wf-gold" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#fff0b8" />
        <stop offset="0.5" stopColor="#d4a445" />
        <stop offset="1" stopColor="#8a6117" />
      </linearGradient>
    </defs>
  );
}

/** Dalgic saati: donen bezel, fosforlu isaretler, tarih penceresi. */
export function DiveWatch({ date, label }: FaceProps) {
  const a = date ? handAngles(date, "beat8") : null;
  return (
    <svg className="watch-face wf-diver" viewBox="0 0 240 340" role="img" aria-label={label}>
      <SteelDefs />
      <Strap color="#1a1d22" detail={<path d="M100 20 H140 M100 40 H140 M100 60 H140 M100 280 H140 M100 300 H140 M100 320 H140" stroke="#2c3038" strokeWidth="6" strokeLinecap="round" />} />
      <Lugs fill="url(#wf-steel)" />
      <rect x="212" y="158" width="16" height="24" rx="4" fill="url(#wf-steel)" />
      <circle cx={CX} cy={CY} r="100" fill="url(#wf-steel)" />
      <circle cx={CX} cy={CY} r="93" fill="#0f2238" />
      {Array.from({ length: 60 }, (_, index) =>
        index < 15 || index % 5 === 0 ? (
          <line key={index} x1={CX} y1={CY - 91} x2={CX} y2={CY - (index % 5 === 0 ? 84 : 87)} stroke="#e8eef5" strokeWidth={index % 5 === 0 ? 2 : 1} transform={rot(index * 6)} />
        ) : null
      )}
      {[10, 20, 30, 40, 50].map((value) => {
        const p = polar(80, value, 60);
        return (
          <text key={value} x={p.x} y={p.y + 4} textAnchor="middle" className="wf-bezel-number">
            {value}
          </text>
        );
      })}
      <path d={`M${CX} ${CY - 72} L${CX - 7} ${CY - 84} H${CX + 7} Z`} fill="#e8eef5" />
      <circle cx={CX} cy={CY - 80} r="2.4" fill="#b6f5c8" />
      <circle cx={CX} cy={CY} r="72" fill="#0a0e13" />
      {Array.from({ length: 12 }, (_, index) => {
        if (index === 3) return null;
        const p = polar(58, index);
        if (index === 0) return <path key={index} d={`M${CX} ${CY - 48} L${CX - 8} ${CY - 64} H${CX + 8} Z`} className="wf-lume" />;
        if (index === 6 || index === 9)
          return <rect key={index} x={p.x - 3.5} y={p.y - 9} width="7" height="18" rx="1.5" className="wf-lume" transform={rot(index * 30, p.x, p.y)} />;
        return <circle key={index} cx={p.x} cy={p.y} r="5.2" className="wf-lume" />;
      })}
      <rect x="160" y="162" width="22" height="16" rx="2" fill="#f5f5f0" />
      <text x="171" y="174.5" textAnchor="middle" className="wf-date">
        {date ? date.getDate() : ""}
      </text>
      <text x={CX} y={CY + 30} textAnchor="middle" className="wf-dial-text">
        AUTOMATIC · 200 m
      </text>
      {a && (
        <>
          <path d={`M${CX} ${CY + 12} L${CX - 5} ${CY} L${CX} ${CY - 42} L${CX + 5} ${CY} Z`} className="wf-lume-hand" transform={rot(a.hour)} />
          <path d={`M${CX} ${CY + 14} L${CX - 4} ${CY} L${CX} ${CY - 62} L${CX + 4} ${CY} Z`} className="wf-lume-hand" transform={rot(a.minute)} />
          <g transform={rot(a.second)}>
            <line x1={CX} y1={CY + 18} x2={CX} y2={CY - 66} stroke="#e8eef5" strokeWidth="1.4" />
            <circle cx={CX} cy={CY - 44} r="4" className="wf-lume" />
            <line x1={CX} y1={CY - 58} x2={CX} y2={CY - 66} stroke="#ff7a1a" strokeWidth="1.6" />
          </g>
        </>
      )}
      <circle cx={CX} cy={CY} r="4" fill="#e8eef5" />
    </svg>
  );
}

const TACHY = [60, 70, 80, 90, 100, 120, 150, 200, 300, 400];

/** Kronograf (panda kadran): 3 alt kadran ve takimetre bezeli. */
export function ChronographWatch({ date, label }: FaceProps) {
  const a = date ? handAngles(date, "beat8") : null;
  const sub = (cx: number, cy: number, angle: number | null, key: string) => (
    <g key={key}>
      <circle cx={cx} cy={cy} r="17" fill="#15171b" />
      {Array.from({ length: 12 }, (_, index) => (
        <line key={index} x1={cx} y1={cy - 16} x2={cx} y2={cy - 13} stroke="#d9dde2" strokeWidth="0.8" transform={rot(index * 30, cx, cy)} />
      ))}
      {angle !== null && <line x1={cx} y1={cy + 3} x2={cx} y2={cy - 13} stroke="#f2f4f7" strokeWidth="1.6" transform={rot(angle, cx, cy)} />}
      <circle cx={cx} cy={cy} r="1.6" fill="#f2f4f7" />
    </g>
  );
  return (
    <svg className="watch-face wf-chrono" viewBox="0 0 240 340" role="img" aria-label={label}>
      <SteelDefs />
      <Strap color="url(#wf-steel)" detail={<path d="M82 0 V96 M158 0 V96 M82 244 V340 M158 244 V340 M82 32 H158 M82 64 H158 M82 276 H158 M82 308 H158" stroke="#7d8793" strokeWidth="1.2" />} />
      <Lugs fill="url(#wf-steel)" />
      <rect x="198" y="112" width="14" height="18" rx="3" fill="url(#wf-steel)" transform={rot(-30, 205, 121)} />
      <rect x="198" y="210" width="14" height="18" rx="3" fill="url(#wf-steel)" transform={rot(30, 205, 219)} />
      <rect x="214" y="160" width="12" height="20" rx="3" fill="url(#wf-steel)" />
      <circle cx={CX} cy={CY} r="100" fill="url(#wf-steel)" />
      <circle cx={CX} cy={CY} r="93" fill="#111317" />
      {TACHY.map((value) => {
        const angle = ((3600 / value) * 6) % 360;
        const rad = (angle * Math.PI) / 180;
        return (
          <text key={value} x={CX + Math.sin(rad) * 84} y={CY - Math.cos(rad) * 84 + 3} textAnchor="middle" className="wf-tachy">
            {value}
          </text>
        );
      })}
      <circle cx={CX} cy={CY} r="76" fill="#f4f4f1" />
      <MinuteTrack outer={75} inner={72} majorInner={68} className="wf-track-dark" />
      {Array.from({ length: 12 }, (_, index) => {
        if (index % 3 !== 0 || index === 0) {
          const p = polar(60, index);
          return <rect key={index} x={p.x - 1.6} y={p.y - 7} width="3.2" height="14" fill="#2a2d33" transform={rot(index * 30, p.x, p.y)} />;
        }
        return null;
      })}
      <rect x={CX - 3} y={CY - 70} width="6" height="16" fill="#2a2d33" />
      {sub(CX - 34, CY, a ? a.second : null, "sec")}
      {sub(CX + 34, CY, date ? (date.getMinutes() % 30) * 12 : null, "min")}
      {sub(CX, CY + 36, date ? (date.getHours() % 12) * 30 + date.getMinutes() / 2 : null, "hr")}
      <text x={CX} y={CY - 28} textAnchor="middle" className="wf-dial-text-dark">
        CHRONOGRAPH
      </text>
      {a && (
        <>
          <path d={`M${CX - 3} ${CY + 10} H${CX + 3} L${CX + 2} ${CY - 44} L${CX} ${CY - 48} L${CX - 2} ${CY - 44} Z`} fill="#1d2025" transform={rot(a.hour)} />
          <path d={`M${CX - 2.5} ${CY + 12} H${CX + 2.5} L${CX + 1.5} ${CY - 66} L${CX} ${CY - 70} L${CX - 1.5} ${CY - 66} Z`} fill="#1d2025" transform={rot(a.minute)} />
        </>
      )}
      <line x1={CX} y1={CY + 20} x2={CX} y2={CY - 74} stroke="#d32f2f" strokeWidth="1.2" />
      <circle cx={CX} cy={CY} r="3.6" fill="#d32f2f" />
    </svg>
  );
}

/** Klasik kol saati: ince altin kasa, deri kayis, dauphine ibreler. */
export function DressWatch({ date, label }: FaceProps) {
  const a = date ? handAngles(date, "beat6") : null;
  return (
    <svg className="watch-face wf-dress" viewBox="0 0 240 340" role="img" aria-label={label}>
      <SteelDefs />
      <Strap
        color="#6b3a1f"
        width={70}
        detail={<path d="M91 0 V94 M149 0 V94 M91 246 V340 M149 246 V340" stroke="#e8c9a0" strokeWidth="1" strokeDasharray="4 3" />}
      />
      <rect x="112" y="296" width="16" height="6" rx="3" fill="#2b170b" />
      <circle cx="120" cy="286" r="3" fill="#2b170b" />
      <circle cx="120" cy="316" r="3" fill="#2b170b" />
      <rect x="208" y="162" width="12" height="16" rx="3" fill="url(#wf-gold)" />
      <circle cx={CX} cy={CY} r="90" fill="url(#wf-gold)" />
      <circle cx={CX} cy={CY} r="84" fill="#fbf8f1" />
      <MinuteTrack outer={82} inner={80} majorInner={80} className="wf-track-gold" />
      {Array.from({ length: 12 }, (_, index) => {
        const p = polar(66, index);
        const long = index === 0;
        return (
          <rect
            key={index}
            x={p.x - (long ? 2.4 : 1.6)}
            y={p.y - (long ? 10 : 7)}
            width={long ? 4.8 : 3.2}
            height={long ? 20 : 14}
            fill="url(#wf-gold)"
            stroke="#8a6117"
            strokeWidth="0.4"
            transform={rot(index * 30, p.x, p.y)}
          />
        );
      })}
      <circle cx={CX} cy={CY + 40} r="16" fill="none" stroke="#c9b58a" strokeWidth="0.8" />
      {a && <line x1={CX} y1={CY + 43} x2={CX} y2={CY + 26} stroke="#8a6117" strokeWidth="1" transform={rot(a.second, CX, CY + 40)} />}
      <circle cx={CX} cy={CY + 40} r="1.6" fill="#8a6117" />
      {a && (
        <>
          <path d={`M${CX} ${CY + 8} L${CX - 5} ${CY} L${CX} ${CY - 48} L${CX + 5} ${CY} Z`} fill="url(#wf-gold)" stroke="#8a6117" strokeWidth="0.5" transform={rot(a.hour)} />
          <path d={`M${CX} ${CY + 10} L${CX - 4} ${CY} L${CX} ${CY - 72} L${CX + 4} ${CY} Z`} fill="url(#wf-gold)" stroke="#8a6117" strokeWidth="0.5" transform={rot(a.minute)} />
        </>
      )}
      <circle cx={CX} cy={CY} r="3" fill="#8a6117" />
    </svg>
  );
}

/** Pilot / saha saati: siyah kadran, buyuk rakamlar, ic 24 saat halkasi. */
export function FieldWatch({ date, label }: FaceProps) {
  const a = date ? handAngles(date, "quartz") : null;
  return (
    <svg className="watch-face wf-field" viewBox="0 0 240 340" role="img" aria-label={label}>
      <SteelDefs />
      <Strap color="#5b6139" detail={<path d="M84 0 V96 M156 0 V96 M84 244 V340 M156 244 V340" stroke="#474c2b" strokeWidth="2" />} />
      <Lugs fill="url(#wf-steel)" />
      <rect x="212" y="158" width="14" height="24" rx="4" fill="url(#wf-steel)" />
      <circle cx={CX} cy={CY} r="96" fill="url(#wf-steel)" />
      <circle cx={CX} cy={CY} r="88" fill="#15171a" />
      <MinuteTrack outer={86} inner={82} majorInner={78} className="wf-track-light" />
      {Array.from({ length: 12 }, (_, index) => {
        if (index === 0) return null;
        const p = polar(62, index);
        return (
          <text key={index} x={p.x} y={p.y + 7} textAnchor="middle" className="wf-field-number">
            {index}
          </text>
        );
      })}
      <path d={`M${CX} ${CY - 56} L${CX - 9} ${CY - 74} H${CX + 9} Z`} fill="#f2f2ea" />
      <circle cx={CX - 12} cy={CY - 74} r="2" fill="#f2f2ea" />
      <circle cx={CX + 12} cy={CY - 74} r="2" fill="#f2f2ea" />
      {Array.from({ length: 12 }, (_, index) => {
        const p = polar(40, index);
        return (
          <text key={index} x={p.x} y={p.y + 3} textAnchor="middle" className="wf-field-inner">
            {index + 12 === 12 ? 24 : index + 12}
          </text>
        );
      })}
      {a && (
        <>
          <path d={`M${CX} ${CY + 12} L${CX - 5} ${CY} L${CX} ${CY - 44} L${CX + 5} ${CY} Z`} fill="#f2f2ea" transform={rot(a.hour)} />
          <path d={`M${CX} ${CY + 14} L${CX - 4} ${CY} L${CX} ${CY - 70} L${CX + 4} ${CY} Z`} fill="#f2f2ea" transform={rot(a.minute)} />
          <line x1={CX} y1={CY + 20} x2={CX} y2={CY - 78} stroke="#f2f2ea" strokeWidth="1.2" transform={rot(a.second)} />
        </>
      )}
      <circle cx={CX} cy={CY} r="3.5" fill="#f2f2ea" />
    </svg>
  );
}

/** Retro dijital kol saati: gri-yesil LCD, yedi segment rakamlar. */
export function LcdWatch({
  hourText,
  minuteText,
  secondText,
  meridiem,
  weekday,
  day,
  segments,
  label,
}: {
  hourText: string;
  minuteText: string;
  secondText: string;
  meridiem: string | null;
  weekday: string;
  day: string;
  segments: (value: string) => ReactNode;
  label?: string;
}) {
  return (
    <div className="lcd-watch" role="img" aria-label={label}>
      <span className="lcd-strap is-top" aria-hidden="true" />
      <div className="lcd-case">
        <span className="lcd-button is-left-top" />
        <span className="lcd-button is-left-bottom" />
        <span className="lcd-button is-right-top" />
        <span className="lcd-button is-right-bottom" />
        <span className="lcd-brand">ALARM · CHRONOGRAPH</span>
        <div className="lcd-screen">
          <div className="lcd-top">
            <span>{weekday}</span>
            <span>{meridiem ?? "24H"}</span>
            <span>{day}</span>
          </div>
          <div className="lcd-main">
            {segments(hourText)}
            <span className="lcd-colon">:</span>
            {segments(minuteText)}
            <span className="lcd-seconds">{segments(secondText)}</span>
          </div>
        </div>
        <span className="lcd-caption">WATER RESIST</span>
      </div>
      <span className="lcd-strap is-bottom" aria-hidden="true" />
    </div>
  );
}

/** Akilli saat: gun / saat / dakika ilerleme halkalari. */
export function SmartWatch({
  date,
  hourText,
  minuteText,
  dateText,
  label,
}: {
  date: Date | null;
  hourText: string;
  minuteText: string;
  dateText: string;
  label?: string;
}) {
  const seconds = date ? date.getSeconds() + date.getMilliseconds() / 1000 : 0;
  const minutes = date ? date.getMinutes() + seconds / 60 : 0;
  const hours = date ? date.getHours() + minutes / 60 : 0;
  const rings = [
    { r: 88, value: hours / 24, className: "is-day" },
    { r: 74, value: minutes / 60, className: "is-hour" },
    { r: 60, value: seconds / 60, className: "is-minute" },
  ];
  return (
    <div className="smart-watch" role="img" aria-label={label}>
      <span className="smart-strap is-top" aria-hidden="true" />
      <div className="smart-case">
        <span className="smart-crown" aria-hidden="true" />
        <svg className="smart-rings" viewBox="0 0 200 200" aria-hidden="true">
          {rings.map((ring) => {
            const length = 2 * Math.PI * ring.r;
            return (
              <g key={ring.r} className={ring.className}>
                <circle cx="100" cy="100" r={ring.r} className="smart-ring-track" />
                <circle
                  cx="100"
                  cy="100"
                  r={ring.r}
                  className="smart-ring-value"
                  strokeDasharray={`${length * ring.value} ${length}`}
                  transform="rotate(-90 100 100)"
                />
              </g>
            );
          })}
        </svg>
        <div className="smart-time">
          <strong>
            {hourText}:{minuteText}
          </strong>
          <span>{dateText}</span>
        </div>
      </div>
      <span className="smart-strap is-bottom" aria-hidden="true" />
    </div>
  );
}
