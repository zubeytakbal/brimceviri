"use client";

// Akici saniye ibreli analog saat (SVG). Tema: "classic" | "night".
export default function AnalogClock({
  date,
  size = 260,
  theme = "classic",
  label,
}: {
  date: Date | null;
  size?: number;
  theme?: "classic" | "night";
  label?: string;
}) {
  const ms = date ? date.getMilliseconds() : 0;
  const seconds = date ? date.getSeconds() + ms / 1000 : 0;
  const minutes = date ? date.getMinutes() + seconds / 60 : 0;
  const hours = date ? (date.getHours() % 12) + minutes / 60 : 0;
  const hand = (angle: number) => `rotate(${angle} 100 100)`;

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
            y1={major ? 16 : 18}
            x2="100"
            y2={major ? 28 : 23}
            className={major ? "analog-clock-tick is-major" : "analog-clock-tick"}
            transform={hand(index * 6)}
          />
        );
      })}
      {[12, 3, 6, 9].map((number) => {
        const angle = (number * 30 * Math.PI) / 180;
        return (
          <text
            key={number}
            x={100 + Math.sin(angle) * 60}
            y={100 - Math.cos(angle) * 60 + 7}
            className="analog-clock-number"
            textAnchor="middle"
          >
            {number}
          </text>
        );
      })}
      {date && (
        <>
          <line x1="100" y1="112" x2="100" y2="52" className="analog-clock-hour" transform={hand(hours * 30)} />
          <line x1="100" y1="116" x2="100" y2="34" className="analog-clock-minute" transform={hand(minutes * 6)} />
          <g transform={hand(seconds * 6)}>
            <line x1="100" y1="124" x2="100" y2="24" className="analog-clock-second" />
            <circle cx="100" cy="24" r="3.2" className="analog-clock-second-tip" />
          </g>
        </>
      )}
      <circle cx="100" cy="100" r="5" className="analog-clock-center" />
    </svg>
  );
}
