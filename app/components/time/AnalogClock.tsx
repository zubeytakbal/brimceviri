"use client";

import { handAngles, type SecondMotion } from "./clockThemes";

export type AnalogTheme = "classic" | "night" | "station" | "roman" | "gold";

const ROMAN = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];

// Akici saniye ibreli analog saat (SVG). Temalar CSS ile renklenir; istasyon ve
// roma temalarinin kadran/ibre bicimi de burada degisir.
export default function AnalogClock({
  date,
  size = 260,
  theme = "classic",
  label,
  allNumbers = false,
  motion = "sweep",
}: {
  date: Date | null;
  size?: number;
  theme?: AnalogTheme;
  label?: string;
  allNumbers?: boolean;
  motion?: SecondMotion;
}) {
  const angles = date ? handAngles(date, motion) : { hour: 0, minute: 0, second: 0 };
  const hand = (angle: number) => `rotate(${angle} 100 100)`;
  const isStation = theme === "station";
  const numbers =
    isStation ? [] : theme === "roman" || allNumbers ? [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] : [12, 3, 6, 9];

  return (
    <svg
      className={`analog-clock is-${theme}`}
      viewBox="0 0 200 200"
      width={size}
      height={size}
      role="img"
      aria-label={label}
    >
      <defs>
        <radialGradient id={`clock-face-${theme}`} cx="50%" cy="40%" r="65%">
          <stop offset="0%" className="analog-clock-face-light" />
          <stop offset="100%" className="analog-clock-face-dark" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="97" className="analog-clock-rim" />
      <circle cx="100" cy="100" r="90" fill={`url(#clock-face-${theme})`} />
      {Array.from({ length: 60 }, (_, index) => {
        const major = index % 5 === 0;
        return (
          <line
            key={index}
            x1="100"
            y1={isStation ? 14 : major ? 16 : 18}
            x2="100"
            y2={isStation ? (major ? 36 : 21) : major ? 28 : 23}
            className={major ? "analog-clock-tick is-major" : "analog-clock-tick"}
            transform={hand(index * 6)}
          />
        );
      })}
      {numbers.map((number) => {
        const angle = (number * 30 * Math.PI) / 180;
        const radius = theme === "roman" ? 55 : 60;
        const minor = theme !== "roman" && allNumbers && number % 3 !== 0;
        return (
          <text
            key={number}
            x={100 + Math.sin(angle) * radius}
            y={100 - Math.cos(angle) * radius + 6}
            className={minor ? "analog-clock-number is-minor" : "analog-clock-number"}
            textAnchor="middle"
          >
            {theme === "roman" ? ROMAN[number % 12] : number}
          </text>
        );
      })}
      {date && (
        <>
          <line x1="100" y1={isStation ? 124 : 112} x2="100" y2="52" className="analog-clock-hour" transform={hand(angles.hour)} />
          <line x1="100" y1={isStation ? 124 : 116} x2="100" y2={isStation ? 20 : 34} className="analog-clock-minute" transform={hand(angles.minute)} />
          <g transform={hand(angles.second)}>
            <line x1="100" y1="130" x2="100" y2={isStation ? 38 : 24} className="analog-clock-second" />
            <circle cx="100" cy={isStation ? 38 : 24} r={isStation ? 8 : 3.2} className="analog-clock-second-tip" />
          </g>
        </>
      )}
      <circle cx="100" cy="100" r="5" className="analog-clock-center" />
    </svg>
  );
}
