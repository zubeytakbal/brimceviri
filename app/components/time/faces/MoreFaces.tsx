"use client";

import type { ReactNode } from "react";
import { handAngles, moonAge } from "../clockThemes";
import type { FaceProps } from "./VintageFaces";

// 2. parti saatler: somine, kule, okul, gemi, radyolu saat, iskelet ve ay fazli
// kol saatleri, kelime saati, kum saati ve gun dongusu.

const ROMAN = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];
const rot = (angle: number, cx: number, cy: number) => `rotate(${angle} ${cx} ${cy})`;

function Dial({
  cx,
  cy,
  r,
  numbers = "arabic",
  numberRadius,
  className,
  tickClass = "mf-ticks",
}: {
  cx: number;
  cy: number;
  r: number;
  numbers?: "arabic" | "roman" | "none";
  numberRadius: number;
  className: string;
  tickClass?: string;
}) {
  return (
    <g>
      <g className={tickClass}>
        {Array.from({ length: 60 }, (_, index) => (
          <line
            key={index}
            x1={cx}
            y1={cy - r}
            x2={cx}
            y2={cy - r + (index % 5 === 0 ? r * 0.13 : r * 0.06)}
            className={index % 5 === 0 ? "is-major" : undefined}
            transform={rot(index * 6, cx, cy)}
          />
        ))}
      </g>
      {numbers !== "none" && (
        <g className={className}>
          {Array.from({ length: 12 }, (_, index) => {
            const angle = (index * 30 * Math.PI) / 180;
            return (
              <text
                key={index}
                x={cx + Math.sin(angle) * numberRadius}
                y={cy - Math.cos(angle) * numberRadius}
                textAnchor="middle"
                dominantBaseline="central"
              >
                {numbers === "roman" ? ROMAN[index] : index === 0 ? 12 : index}
              </text>
            );
          })}
        </g>
      )}
    </g>
  );
}

function Hands({
  date,
  cx,
  cy,
  hour,
  minute,
  second,
  motion = "quartz",
  color,
  secondColor,
  width = 1,
}: {
  date: Date | null;
  cx: number;
  cy: number;
  hour: number;
  minute: number;
  second?: number;
  motion?: "quartz" | "sweep" | "beat6" | "beat8";
  color: string;
  secondColor?: string;
  width?: number;
}) {
  if (!date) return null;
  const a = handAngles(date, motion);
  return (
    <g>
      <path
        d={`M${cx - 3 * width} ${cy + 8} L${cx - 2 * width} ${cy - hour + 6} L${cx} ${cy - hour} L${cx + 2 * width} ${cy - hour + 6} L${cx + 3 * width} ${cy + 8} Z`}
        fill={color}
        transform={rot(a.hour, cx, cy)}
      />
      <path
        d={`M${cx - 2.2 * width} ${cy + 10} L${cx - 1.4 * width} ${cy - minute + 6} L${cx} ${cy - minute} L${cx + 1.4 * width} ${cy - minute + 6} L${cx + 2.2 * width} ${cy + 10} Z`}
        fill={color}
        transform={rot(a.minute, cx, cy)}
      />
      {second && secondColor && (
        <g transform={rot(a.second, cx, cy)}>
          <line x1={cx} y1={cy + second * 0.22} x2={cx} y2={cy - second} stroke={secondColor} strokeWidth={1.4 * width} />
          <circle cx={cx} cy={cy + second * 0.18} r={3 * width} fill={secondColor} />
        </g>
      )}
      <circle cx={cx} cy={cy} r={3.6 * width} fill={secondColor ?? color} />
    </g>
  );
}

/** Somine (Napolyon sapkasi) saati. */
export function MantelClock({ date, label }: FaceProps) {
  return (
    <svg className="more-face mf-mantel" viewBox="0 0 300 230" role="img" aria-label={label}>
      <defs>
        <linearGradient id="mf-mahogany" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#8e4a24" />
          <stop offset="1" stopColor="#4a220e" />
        </linearGradient>
        <radialGradient id="mf-brass" cx="40%" cy="35%" r="75%">
          <stop offset="0" stopColor="#fbe7a6" />
          <stop offset="1" stopColor="#9c6f22" />
        </radialGradient>
      </defs>
      <path d="M34 176 C34 124 84 108 108 76 Q150 28 192 76 C216 108 266 124 266 176 Z" fill="url(#mf-mahogany)" />
      <path d="M52 176 C56 132 96 118 116 90 Q150 50 184 90 C204 118 244 132 248 176" fill="none" stroke="#f3c77a" strokeOpacity="0.25" strokeWidth="2" />
      <rect x="18" y="174" width="264" height="22" rx="6" fill="#3d1b0a" />
      <rect x="30" y="196" width="26" height="12" rx="4" fill="url(#mf-brass)" />
      <rect x="244" y="196" width="26" height="12" rx="4" fill="url(#mf-brass)" />
      <circle cx="150" cy="128" r="54" fill="url(#mf-brass)" />
      <circle cx="150" cy="128" r="47" fill="#fbf6ea" />
      <Dial cx={150} cy={128} r={44} numberRadius={34} className="mf-num-serif" />
      <Hands date={date} cx={150} cy={128} hour={24} minute={36} color="#1d140d" />
    </svg>
  );
}

/** Kule saati: tas kule, altin cerceve, gotik roma rakamlari. */
export function TowerClock({ date, label }: FaceProps) {
  return (
    <svg className="more-face mf-tower" viewBox="0 0 220 400" role="img" aria-label={label}>
      <defs>
        <linearGradient id="mf-stone" x1="0" x2="1">
          <stop offset="0" stopColor="#a89878" />
          <stop offset="0.5" stopColor="#d6c7a1" />
          <stop offset="1" stopColor="#9a8a6b" />
        </linearGradient>
      </defs>
      <path d="M36 96 L110 6 L184 96 Z" fill="#3c4a4f" />
      <path d="M110 6 V96" stroke="#2c3639" strokeWidth="2" />
      <circle cx="110" cy="6" r="4" fill="#d4a445" />
      <rect x="40" y="94" width="140" height="306" fill="url(#mf-stone)" />
      {Array.from({ length: 14 }, (_, row) => (
        <line key={row} x1="40" x2="180" y1={250 + row * 12} y2={250 + row * 12} stroke="#8d7d5f" strokeOpacity="0.45" />
      ))}
      <rect x="44" y="106" width="132" height="132" fill="#2b2a2a" />
      <rect x="48" y="110" width="124" height="124" fill="none" stroke="#d4a445" strokeWidth="4" />
      {[0, 1, 2, 3].map((corner) => (
        <circle key={corner} cx={corner % 2 ? 160 : 60} cy={corner < 2 ? 122 : 222} r="6" fill="#d4a445" />
      ))}
      <circle cx="110" cy="172" r="58" fill="#d4a445" />
      <circle cx="110" cy="172" r="54" fill="#f4eedc" />
      <Dial cx={110} cy={172} r={52} numbers="roman" numberRadius={40} className="mf-num-gothic" />
      <Hands date={date} cx={110} cy={172} hour={28} minute={44} motion="sweep" color="#141414" width={1.1} />
      <path d="M78 300 V282 Q92 264 106 282 V300 Z M114 300 V282 Q128 264 142 282 V300 Z" fill="#2b2a2a" />
    </svg>
  );
}

/** Okul / sinif saati: kalin siyah cerceve, iri rakamlar. */
export function SchoolClock({ date, label }: FaceProps) {
  return (
    <svg className="more-face mf-school" viewBox="0 0 240 240" role="img" aria-label={label}>
      <circle cx="120" cy="120" r="116" fill="#1b1b1b" />
      <circle cx="120" cy="120" r="104" fill="#ffffff" />
      <Dial cx={120} cy={120} r={100} numberRadius={76} className="mf-num-bold" />
      <Hands date={date} cx={120} cy={120} hour={50} minute={82} second={88} color="#111111" secondColor="#e53935" width={1.5} />
      <path d="M40 60 A100 100 0 0 1 150 24 A112 112 0 0 0 40 60 Z" fill="#ffffff" opacity="0.6" />
    </svg>
  );
}

/** Gemi saati: pirinc lomboz govde, 8 civata, 24 saat ic halka. */
export function ShipClock({ date, label }: FaceProps) {
  return (
    <svg className="more-face mf-ship" viewBox="0 0 260 260" role="img" aria-label={label}>
      <defs>
        <radialGradient id="mf-ship-brass" cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#fff0b8" />
          <stop offset="0.5" stopColor="#c9962f" />
          <stop offset="1" stopColor="#7a5213" />
        </radialGradient>
      </defs>
      <circle cx="130" cy="130" r="124" fill="url(#mf-ship-brass)" />
      {Array.from({ length: 8 }, (_, index) => {
        const angle = ((index * 45 + 22.5) * Math.PI) / 180;
        const x = 130 + Math.sin(angle) * 113;
        const y = 130 - Math.cos(angle) * 113;
        return (
          <g key={index}>
            <circle cx={x} cy={y} r="6" fill="#8a5d16" />
            <line x1={x - 4} y1={y} x2={x + 4} y2={y} stroke="#4a3208" strokeWidth="1.5" transform={rot(index * 45, x, y)} />
          </g>
        );
      })}
      <circle cx="130" cy="130" r="100" fill="#6b4a14" />
      <circle cx="130" cy="130" r="94" fill="#fbfaf5" />
      <Dial cx={130} cy={130} r={90} numberRadius={68} className="mf-num-ship" />
      <g className="mf-num-ship-inner">
        {Array.from({ length: 12 }, (_, index) => {
          const angle = (index * 30 * Math.PI) / 180;
          return (
            <text key={index} x={130 + Math.sin(angle) * 48} y={130 - Math.cos(angle) * 48} textAnchor="middle" dominantBaseline="central">
              {index + 12 === 12 ? 24 : index + 12}
            </text>
          );
        })}
      </g>
      <path d="M130 158 V184 M121 164 H139 M116 178 Q130 194 144 178" stroke="#1d3a5c" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <circle cx="130" cy="155" r="3" fill="none" stroke="#1d3a5c" strokeWidth="2" />
      <Hands date={date} cx={130} cy={130} hour={44} minute={70} second={78} color="#1d1d1d" secondColor="#b3261e" width={1.2} />
    </svg>
  );
}

function gearPath(cx: number, cy: number, teeth: number, outer: number, inner: number) {
  const points: string[] = [];
  for (let i = 0; i < teeth * 2; i += 1) {
    const r = i % 2 === 0 ? outer : inner;
    const a0 = ((i - 0.25) * Math.PI) / teeth;
    const a1 = ((i + 0.25) * Math.PI) / teeth;
    points.push(`${cx + Math.sin(a0) * r},${cy - Math.cos(a0) * r}`, `${cx + Math.sin(a1) * r},${cy - Math.cos(a1) * r}`);
  }
  return `M${points.join(" L")} Z`;
}

function Gear({ cx, cy, teeth, r, angle, className = "mf-gear" }: { cx: number; cy: number; teeth: number; r: number; angle: number; className?: string }) {
  return (
    <g transform={rot(angle, cx, cy)} className={className}>
      <path d={gearPath(cx, cy, teeth, r, r * 0.86)} />
      <circle cx={cx} cy={cy} r={r * 0.62} className="mf-gear-hole" />
      {[0, 120, 240].map((spoke) => (
        <rect key={spoke} x={cx - 1.6} y={cy - r * 0.66} width="3.2" height={r * 0.66} transform={rot(spoke, cx, cy)} />
      ))}
      <circle cx={cx} cy={cy} r="2.6" className="mf-jewel" />
    </g>
  );
}

function Strap({ color, children }: { color: string; children?: ReactNode }) {
  return (
    <g>
      <path d="M82 0 H158 L155 96 H85 Z" fill={color} />
      <path d="M85 244 H155 L158 340 H82 Z" fill={color} />
      {children}
    </g>
  );
}

/** Iskelet saat: saniyede 4 salinim yapan balans carki ve donen disliler. */
export function SkeletonWatch({ date, label }: FaceProps) {
  const t = date ? date.getTime() / 1000 : 0;
  const a = date ? handAngles(date, "beat8") : null;
  const balance = 200 * Math.sin(2 * Math.PI * 4 * t);
  return (
    <svg className="more-face mf-skeleton" viewBox="0 0 240 340" role="img" aria-label={label}>
      <Strap color="#161616">
        <path d="M86 0 V96 M154 0 V96 M86 244 V340 M154 244 V340" stroke="#3b3b3b" strokeDasharray="4 3" />
      </Strap>
      <circle cx="120" cy="170" r="98" fill="#c9ced6" />
      <circle cx="120" cy="170" r="92" fill="#1b1d21" />
      <path d="M58 150 Q80 110 130 104 L150 118 Q120 140 108 170 Z" className="mf-bridge" />
      <path d="M140 196 Q170 190 184 162 L192 178 Q180 214 146 222 Z" className="mf-bridge" />
      <Gear cx={104} cy={140} teeth={30} r={30} angle={a ? a.minute : 0} />
      <Gear cx={150} cy={150} teeth={16} r={16} angle={a ? -a.second * 2 : 0} />
      <Gear cx={96} cy={206} teeth={15} r={14} angle={a ? a.second * 5 : 0} className="mf-gear is-escape" />
      <g transform={rot(balance, 144, 210)} className="mf-balance">
        <circle cx="144" cy="210" r="22" fill="none" strokeWidth="3" />
        <line x1="122" y1="210" x2="166" y2="210" strokeWidth="2.4" />
        <line x1="144" y1="188" x2="144" y2="232" strokeWidth="2.4" />
      </g>
      <path
        d="M144 210 m-4 0 a4 4 0 1 0 8 0 a6 6 0 1 0 -12 0 a8 8 0 1 0 16 0 a10 10 0 1 0 -20 0"
        fill="none"
        stroke="#9ad0ff"
        strokeOpacity="0.55"
        strokeWidth="0.8"
      />
      <circle cx="144" cy="210" r="2.6" className="mf-jewel" />
      <circle cx="120" cy="170" r="88" fill="none" stroke="#d6dbe3" strokeWidth="10" strokeOpacity="0.92" />
      <g className="mf-num-skeleton">
        {Array.from({ length: 12 }, (_, index) => {
          const angle = (index * 30 * Math.PI) / 180;
          return (
            <text key={index} x={120 + Math.sin(angle) * 88} y={170 - Math.cos(angle) * 88} textAnchor="middle" dominantBaseline="central">
              {ROMAN[index]}
            </text>
          );
        })}
      </g>
      <Hands date={date} cx={120} cy={170} hour={48} minute={74} second={80} motion="beat8" color="#e8ecf2" secondColor="#4fc3f7" />
    </svg>
  );
}

/** Ay fazli kol saati: gercek ay evresi, 6'da ay penceresi. */
export function MoonPhaseWatch({ date, label }: FaceProps) {
  const age = date ? moonAge(date) : 0;
  const discAngle = (age / 29.530588853) * 180;
  return (
    <svg className="more-face mf-moonphase" viewBox="0 0 240 340" role="img" aria-label={label}>
      <defs>
        <clipPath id="mf-moon-window">
          <path d="M84 222 A36 36 0 0 1 156 222 Q146 212 138 222 A18 18 0 0 0 102 222 Q94 212 84 222 Z" />
        </clipPath>
        <radialGradient id="mf-moon-gold" cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#fff3c4" />
          <stop offset="1" stopColor="#c99a3a" />
        </radialGradient>
      </defs>
      <Strap color="#1f2a44">
        <path d="M88 0 V96 M152 0 V96 M88 244 V340 M152 244 V340" stroke="#c9b58a" strokeDasharray="4 3" />
      </Strap>
      <circle cx="120" cy="170" r="94" fill="url(#mf-moon-gold)" />
      <circle cx="120" cy="170" r="86" fill="#14213d" />
      <Dial cx={120} cy={170} r={82} numbers="roman" numberRadius={64} className="mf-num-moon" tickClass="mf-ticks-gold" />
      <g clipPath="url(#mf-moon-window)">
        <rect x="80" y="180" width="80" height="50" fill="#0b1633" />
        <g transform={rot(discAngle, 120, 262)}>
          <circle cx="120" cy="262" r="58" fill="#0b1633" />
          {[
            [100, 214],
            [134, 208],
            [112, 300],
            [146, 312],
            [88, 290],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="1.3" fill="#fff6d0" />
          ))}
          <circle cx="120" cy="212" r="15" fill="url(#mf-moon-gold)" />
          <circle cx="120" cy="312" r="15" fill="url(#mf-moon-gold)" />
        </g>
      </g>
      <path d="M84 222 A36 36 0 0 1 156 222 Q146 212 138 222 A18 18 0 0 0 102 222 Q94 212 84 222 Z" fill="none" stroke="#c99a3a" strokeWidth="1.2" />
      <Hands date={date} cx={120} cy={170} hour={44} minute={68} second={74} motion="beat6" color="#e9cf8b" secondColor="#e9cf8b" />
    </svg>
  );
}

const TR_NOM = ["on iki", "bir", "iki", "üç", "dört", "beş", "altı", "yedi", "sekiz", "dokuz", "on", "on bir", "on iki"];
const TR_ACC = ["on ikiyi", "biri", "ikiyi", "üçü", "dördü", "beşi", "altıyı", "yediyi", "sekizi", "dokuzu", "onu", "on biri", "on ikiyi"];
const TR_DAT = ["on ikiye", "bire", "ikiye", "üçe", "dörde", "beşe", "altıya", "yediye", "sekize", "dokuza", "ona", "on bire", "on ikiye"];
const TR_MIN: Record<number, string> = { 5: "beş", 10: "on", 15: "çeyrek", 20: "yirmi", 25: "yirmi beş" };
const EN_NUM = ["twelve", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
const EN_MIN: Record<number, string> = { 5: "five", 10: "ten", 15: "quarter", 20: "twenty", 25: "twenty-five" };

const DE_NUM = ["zwölf", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn", "elf", "zwölf"];

type WordClockLocale = "tr" | "en" | "de" | "sv" | "no" | "da";

// İskandinav dillerinde saat "yarım"a göre söylenir: 3:30 "halv fyra" (dördün
// yarısı), 3:25 "fem i halv fyra". Her dilin günlük konuşmadaki kalıbı:
// sv 3:20 "tjugo över tre", 3:40 "tjugo i fyra"; no 3:20 "ti på halv fire",
// 3:40 "ti over halv fire"; da 3:20 "tyve over tre", 3:40 "tyve i fire".
const NORDIC_CLOCK = {
  sv: {
    prefix: ["Klockan", "är"],
    num: ["tolv", "ett", "två", "tre", "fyra", "fem", "sex", "sju", "åtta", "nio", "tio", "elva", "tolv"],
    past: "över",
    to: "i",
    words: { 5: "fem", 10: "tio", 15: "kvart", 20: "tjugo" } as Record<number, string>,
    halfRelative: false,
  },
  no: {
    prefix: ["Klokka", "er"],
    num: ["tolv", "ett", "to", "tre", "fire", "fem", "seks", "sju", "åtte", "ni", "ti", "elleve", "tolv"],
    past: "over",
    to: "på",
    words: { 5: "fem", 10: "ti", 15: "kvart", 20: "tjue" } as Record<number, string>,
    halfRelative: true,
  },
  da: {
    prefix: ["Klokken", "er"],
    num: ["tolv", "et", "to", "tre", "fire", "fem", "seks", "syv", "otte", "ni", "ti", "elleve", "tolv"],
    past: "over",
    to: "i",
    words: { 5: "fem", 10: "ti", 15: "kvart", 20: "tyve" } as Record<number, string>,
    halfRelative: false,
  },
};

function nordicTimeInWords(locale: "sv" | "no" | "da", rounded: number, hour: number, next: number) {
  const c = NORDIC_CLOCK[locale];
  const h = (n: number) => `**${c.num[n]}**`;
  const w = (n: number) => `**${c.words[n]}**`;
  if (rounded === 0) return [...c.prefix, h(hour)];
  if (rounded === 30) return [...c.prefix, "**halv**", h(next)];
  if (rounded === 25) return [...c.prefix, w(5), c.to, "**halv**", h(next)];
  if (rounded === 35) return [...c.prefix, w(5), c.past, "**halv**", h(next)];
  // Norveççe 20 ve 40 dakikayı da yarıma göre söyler.
  if (c.halfRelative && rounded === 20) return [...c.prefix, w(10), c.to, "**halv**", h(next)];
  if (c.halfRelative && rounded === 40) return [...c.prefix, w(10), c.past, "**halv**", h(next)];
  if (rounded < 30) return [...c.prefix, w(rounded), c.past, h(hour)];
  return [...c.prefix, w(60 - rounded), c.to, h(next)];
}

/** Saati 5 dakikaya yuvarlayip cumleye cevirir. Vurgulanacak kelimeler ** ile isaretli. */
export function timeInWords(date: Date, locale: WordClockLocale) {
  let rounded = Math.round((date.getMinutes() + date.getSeconds() / 60) / 5) * 5;
  let hour = date.getHours() % 12 || 12;
  if (rounded === 60) {
    rounded = 0;
    hour = (hour % 12) + 1;
  }
  const next = (hour % 12) + 1;
  if (locale === "sv" || locale === "no" || locale === "da") return nordicTimeInWords(locale, rounded, hour, next);
  if (locale === "tr") {
    if (rounded === 0) return ["Saat", "tam", `**${TR_NOM[hour]}**`];
    if (rounded === 30) return hour === 12 ? ["Saat", "**yarım**"] : ["Saat", `**${TR_NOM[hour]}**`, "**buçuk**"];
    if (rounded < 30) return ["Saat", `**${TR_ACC[hour]}**`, `**${TR_MIN[rounded]}**`, "geçiyor"];
    return ["Saat", `**${TR_DAT[next]}**`, `**${TR_MIN[60 - rounded]}**`, "var"];
  }
  if (locale === "de") {
    // Hochdeutsche Form: "Viertel nach drei", "halb vier", "fünf vor halb vier".
    const h = (n: number) => `**${DE_NUM[n]}**`;
    if (rounded === 0) return ["Es", "ist", `**${hour === 1 ? "ein" : DE_NUM[hour]}**`, "Uhr"];
    if (rounded === 15) return ["Es", "ist", "**Viertel**", "nach", h(hour)];
    if (rounded === 45) return ["Es", "ist", "**Viertel**", "vor", h(next)];
    if (rounded === 30) return ["Es", "ist", "**halb**", h(next)];
    if (rounded === 25) return ["Es", "ist", "**fünf**", "vor", "**halb**", h(next)];
    if (rounded === 35) return ["Es", "ist", "**fünf**", "nach", "**halb**", h(next)];
    const words: Record<number, string> = { 5: "fünf", 10: "zehn", 20: "zwanzig" };
    if (rounded < 30) return ["Es", "ist", `**${words[rounded]}**`, "nach", h(hour)];
    return ["Es", "ist", `**${words[60 - rounded]}**`, "vor", h(next)];
  }
  if (rounded === 0) return ["It's", `**${EN_NUM[hour]}**`, "o'clock"];
  if (rounded === 30) return ["It's", "**half**", "past", `**${EN_NUM[hour]}**`];
  if (rounded < 30) return ["It's", `**${EN_MIN[rounded]}**`, "past", `**${EN_NUM[hour]}**`];
  return ["It's", `**${EN_MIN[60 - rounded]}**`, "to", `**${EN_NUM[next]}**`];
}

export function WordClock({ date, locale, label }: { date: Date | null; locale: WordClockLocale; label?: string }) {
  const words = date ? timeInWords(date, locale) : [];
  return (
    <p className="word-clock" role="img" aria-label={label}>
      {words.map((word, index) =>
        word.startsWith("**") ? (
          <strong key={index}>{word.slice(2, -2)}</strong>
        ) : (
          <span key={index}>{word}</span>
        )
      )}
    </p>
  );
}

/** Kum saati: her dakika ust hazne bosalir, alttaki birikir; dakika basinda doner. */
export function Hourglass({ date, label }: FaceProps) {
  const seconds = date ? date.getSeconds() + date.getMilliseconds() / 1000 : 0;
  const progress = seconds / 60;
  const flipping = seconds < 0.6;
  const topLevel = 40 + progress * 108;
  const bottomLevel = 290 - progress * 100;
  return (
    <svg className={`more-face mf-hourglass${flipping ? " is-flipping" : ""}`} viewBox="0 0 200 320" role="img" aria-label={label}>
      <defs>
        <clipPath id="mf-glass-top">
          <path d="M44 30 H156 C156 90 108 120 104 158 H96 C92 120 44 90 44 30 Z" />
        </clipPath>
        <clipPath id="mf-glass-bottom">
          <path d="M96 162 H104 C108 200 156 230 156 290 H44 C44 230 92 200 96 162 Z" />
        </clipPath>
        <linearGradient id="mf-sand" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f2cf7a" />
          <stop offset="1" stopColor="#d49a3a" />
        </linearGradient>
      </defs>
      <g className="mf-hourglass-body">
        <rect x="24" y="12" width="152" height="18" rx="5" fill="#6b3f1e" />
        <rect x="24" y="290" width="152" height="18" rx="5" fill="#6b3f1e" />
        <rect x="32" y="28" width="8" height="264" rx="3" fill="#8a5a2b" />
        <rect x="160" y="28" width="8" height="264" rx="3" fill="#8a5a2b" />
        <rect x="0" y={topLevel} width="200" height="160" fill="url(#mf-sand)" clipPath="url(#mf-glass-top)" />
        <path
          d={`M44 290 L${100 - 56 * Math.min(1, progress * 1.4)} ${bottomLevel + 18} Q100 ${bottomLevel - 8} ${100 + 56 * Math.min(1, progress * 1.4)} ${bottomLevel + 18} L156 290 Z`}
          fill="url(#mf-sand)"
          clipPath="url(#mf-glass-bottom)"
        />
        {progress < 0.995 && <line x1="100" y1="158" x2="100" y2={bottomLevel} stroke="#e0b25a" strokeWidth="1.6" />}
        <path d="M44 30 H156 C156 90 108 120 104 160 C108 200 156 230 156 290 H44 C44 230 92 200 96 160 C92 120 44 90 44 30 Z" fill="#dff3ff" fillOpacity="0.14" stroke="#cfe6f5" strokeWidth="2" />
        <path d="M58 40 C60 80 80 104 92 130" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function skyFor(hours: number) {
  if (hours < 5 || hours >= 20) return ["#070b1f", "#1b2550"];
  if (hours < 7) return ["#2c3e7a", "#f59e72"];
  if (hours < 17) return ["#3d8fd6", "#bfe3ff"];
  return ["#4a2f7a", "#ff8a5c"];
}

/** Gun dongusu: gunes gunduz (06-18), ay gece yayda ilerler. */
export function SunMoon({ date, label }: FaceProps) {
  const hours = date ? date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600 : 12;
  const isDay = hours >= 6 && hours < 18;
  const progress = isDay ? (hours - 6) / 12 : ((hours - 18 + 24) % 24) / 12;
  const x = 40 + progress * 320;
  const y = 210 - Math.sin(progress * Math.PI) * 160;
  const [top, bottom] = skyFor(hours);
  const phase = (date ? moonAge(date) : 14.77) / 29.530588853;
  // Golge dairesi: yeni ayda tam ortuyor, dolunayda 30 birim kayik (gorunmez).
  const shadowOffset = phase < 0.5 ? -60 * phase : 60 * (1 - phase);
  return (
    <svg className="more-face mf-sunmoon" viewBox="0 0 400 250" role="img" aria-label={label}>
      <defs>
        <linearGradient id="mf-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
        <radialGradient id="mf-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fff8d6" />
          <stop offset="0.5" stopColor="#ffd166" />
          <stop offset="1" stopColor="#ffb347" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="400" height="250" rx="18" fill="url(#mf-sky)" />
      {!isDay &&
        [
          [40, 40],
          [90, 70],
          [150, 30],
          [230, 60],
          [300, 28],
          [350, 80],
          [190, 100],
          [60, 120],
        ].map(([sx, sy]) => <circle key={`${sx}-${sy}`} cx={sx} cy={sy} r="1.4" fill="#ffffff" opacity="0.85" />)}
      <path d="M40 210 Q200 -110 360 210" fill="none" stroke="#ffffff" strokeOpacity="0.25" strokeDasharray="4 6" />
      {isDay ? (
        <>
          <circle cx={x} cy={y} r="34" fill="url(#mf-sun)" />
          <circle cx={x} cy={y} r="15" fill="#fff4c2" />
        </>
      ) : (
        <g>
          <clipPath id="mf-moon-clip">
            <circle cx={x} cy={y} r="15" />
          </clipPath>
          <circle cx={x} cy={y} r="15" fill="#f4f1e6" />
          <circle cx={x + shadowOffset} cy={y} r="15.5" fill="#0b1026" opacity="0.88" clipPath="url(#mf-moon-clip)" />
        </g>
      )}
      <path d="M0 210 Q60 190 120 206 T240 202 T400 206 V250 H0 Z" fill="#0f2a1e" opacity="0.85" />
    </svg>
  );
}

/** Radyolu calar saat (70'ler): ahsap kasa, hoparlor izgarasi, flip rakamlar. */
export function RadioClock({ flip, label }: { flip: ReactNode; label?: string }) {
  return (
    <div className="radio-clock" role="img" aria-label={label}>
      <div className="radio-grille" aria-hidden="true" />
      <div className="radio-panel">
        <div className="radio-window">{flip}</div>
        <div className="radio-dial" aria-hidden="true">
          <span>FM 88</span>
          <i />
          <span>108 MHz</span>
        </div>
        <div className="radio-leds" aria-hidden="true">
          <span className="is-on">ALARM</span>
          <span>SLEEP</span>
        </div>
      </div>
    </div>
  );
}
