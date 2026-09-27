"use client";

import { handAngles } from "../clockThemes";

// Eski usul saatler: sarkacli duvar saati, guguklu saat, cep saati, zilli calar
// saat ve nixie tuplu saat. Hepsi SVG/CSS ile cizilir; ibreler gercek
// mekanizmalari gibi hareket eder.

export type FaceProps = {
  date: Date | null;
  label?: string;
  /** Guguk kusu cikti / zil caliyor gibi saat basi animasyonu. */
  active?: boolean;
};

const ROMAN = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];
const rot = (angle: number, cx: number, cy: number) => `rotate(${angle} ${cx} ${cy})`;

function Ticks({ cx, cy, outer, inner, majorInner, className }: { cx: number; cy: number; outer: number; inner: number; majorInner: number; className: string }) {
  return (
    <g className={className}>
      {Array.from({ length: 60 }, (_, index) => (
        <line
          key={index}
          x1={cx}
          y1={cy - outer}
          x2={cx}
          y2={cy - (index % 5 === 0 ? majorInner : inner)}
          className={index % 5 === 0 ? "is-major" : undefined}
          transform={rot(index * 6, cx, cy)}
        />
      ))}
    </g>
  );
}

function Numerals({ cx, cy, radius, roman, className, dy = 4 }: { cx: number; cy: number; radius: number; roman?: boolean; className: string; dy?: number }) {
  return (
    <g className={className}>
      {Array.from({ length: 12 }, (_, index) => {
        const number = index === 0 ? 12 : index;
        const angle = (index * 30 * Math.PI) / 180;
        return (
          <text key={index} x={cx + Math.sin(angle) * radius} y={cy - Math.cos(angle) * radius + dy} textAnchor="middle">
            {roman ? ROMAN[index] : number}
          </text>
        );
      })}
    </g>
  );
}

/** Sarkacli duvar saati: saniye sarkacla gosterilir (2 sn periyot). */
export function PendulumClock({ date, label }: FaceProps) {
  const a = date ? handAngles(date, "quartz") : null;
  const swing = a ? 7 * Math.cos(Math.PI * a.exactSeconds) : 0;
  return (
    <svg className="vintage-face vf-pendulum" viewBox="0 0 240 420" role="img" aria-label={label}>
      <defs>
        <linearGradient id="vf-wood" x1="0" x2="1">
          <stop offset="0" stopColor="#4d2712" />
          <stop offset="0.45" stopColor="#8a4b26" />
          <stop offset="1" stopColor="#4a2410" />
        </linearGradient>
        <radialGradient id="vf-brass" cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#fbe7a6" />
          <stop offset="0.6" stopColor="#d4a445" />
          <stop offset="1" stopColor="#8f6420" />
        </radialGradient>
        <radialGradient id="vf-enamel" cx="50%" cy="40%" r="70%">
          <stop offset="0" stopColor="#fffaf0" />
          <stop offset="1" stopColor="#efe2c4" />
        </radialGradient>
      </defs>
      <path d="M28 118 Q28 22 120 22 Q212 22 212 118 L212 384 Q212 404 192 404 L48 404 Q28 404 28 384 Z" fill="url(#vf-wood)" />
      <path d="M40 118 Q40 36 120 36 Q200 36 200 118 L200 380 Q200 392 188 392 L52 392 Q40 392 40 380 Z" fill="none" stroke="#2e1608" strokeOpacity="0.5" />
      <circle cx="120" cy="16" r="9" fill="url(#vf-brass)" />
      <rect x="24" y="398" width="192" height="12" rx="4" fill="#3a1c0b" />
      <circle cx="120" cy="112" r="76" fill="url(#vf-brass)" />
      <circle cx="120" cy="112" r="68" fill="url(#vf-enamel)" />
      <circle cx="120" cy="112" r="60" fill="none" stroke="#3b2a20" strokeWidth="0.8" />
      <Ticks cx={120} cy={112} outer={64} inner={61} majorInner={58} className="vf-ticks-dark" />
      <Numerals cx={120} cy={112} radius={49} roman className="vf-roman" />
      <circle cx="102" cy="134" r="3" fill="#3b2a20" />
      <circle cx="138" cy="134" r="3" fill="#3b2a20" />
      <rect x="68" y="202" width="104" height="176" rx="12" fill="#1e0f06" />
      <g transform={rot(swing, 120, 196)}>
        <line x1="120" y1="196" x2="120" y2="332" stroke="#c9a045" strokeWidth="3" />
        <circle cx="120" cy="338" r="23" fill="url(#vf-brass)" />
        <circle cx="113" cy="331" r="7" fill="#fff6d6" opacity="0.45" />
      </g>
      <rect x="68" y="202" width="104" height="176" rx="12" fill="#ffffff" opacity="0.06" />
      <path d="M78 212 L96 212 L78 300 Z" fill="#ffffff" opacity="0.07" />
      {a && (
        <>
          <path d="M117 118 L118 86 Q112 80 120 70 Q128 80 122 86 L123 118 Z" fill="#1c120c" transform={rot(a.hour, 120, 112)} />
          <path d="M120 116 L118 60 L120 50 L122 60 Z" fill="#1c120c" transform={rot(a.minute, 120, 112)} />
        </>
      )}
      <circle cx="120" cy="112" r="4.5" fill="#1c120c" />
    </svg>
  );
}

/** Guguklu saat: saat basi kapak acilir, kus cikar. */
export function CuckooClock({ date, label, active }: FaceProps) {
  const a = date ? handAngles(date, "quartz") : null;
  const swing = a ? 12 * Math.cos(Math.PI * a.exactSeconds) : 0;
  return (
    <svg className={`vintage-face vf-cuckoo${active ? " is-active" : ""}`} viewBox="0 0 240 420" role="img" aria-label={label}>
      <defs>
        <linearGradient id="vf-cuckoo-wood" x1="0" x2="1">
          <stop offset="0" stopColor="#5a3318" />
          <stop offset="0.5" stopColor="#8b5a2b" />
          <stop offset="1" stopColor="#5a3318" />
        </linearGradient>
      </defs>
      <line x1="92" y1="280" x2="92" y2="360" stroke="#b58b3a" strokeWidth="2" strokeDasharray="3 3" />
      <line x1="148" y1="280" x2="148" y2="384" stroke="#b58b3a" strokeWidth="2" strokeDasharray="3 3" />
      <g className="vf-pinecone">
        <ellipse cx="92" cy="380" rx="11" ry="24" fill="#4a2c14" />
        <ellipse cx="148" cy="404" rx="11" ry="24" fill="#4a2c14" />
        <path d="M84 366 L100 372 M84 378 L100 384 M84 390 L100 396 M140 390 L156 396 M140 402 L156 408 M140 414 L156 420" stroke="#2c180a" strokeWidth="2" />
      </g>
      <g transform={rot(swing, 120, 272)}>
        <line x1="120" y1="272" x2="120" y2="340" stroke="#b58b3a" strokeWidth="2" />
        <path d="M120 332 C104 342 104 362 120 372 C136 362 136 342 120 332 Z" fill="#6b4220" stroke="#3a220f" />
      </g>
      <rect x="44" y="100" width="152" height="178" rx="6" fill="url(#vf-cuckoo-wood)" />
      <path d="M44 150 H196 M44 200 H196 M44 250 H196" stroke="#3a220f" strokeOpacity="0.18" />
      <path d="M6 118 L120 22 L234 118 L214 118 L120 44 L26 118 Z" fill="#3b2211" />
      <path d="M26 118 L120 44 L214 118 Z" fill="#6b3f1e" />
      <path d="M52 100 L120 50 L188 100" fill="none" stroke="#3b2211" strokeWidth="2" strokeDasharray="6 5" />
      <g fill="#4f6b2a">
        <ellipse cx="120" cy="26" rx="18" ry="8" />
        <ellipse cx="104" cy="32" rx="10" ry="5" transform={rot(-30, 104, 32)} />
        <ellipse cx="136" cy="32" rx="10" ry="5" transform={rot(30, 136, 32)} />
      </g>
      <rect x="98" y="106" width="44" height="36" rx="3" fill="#1d1008" />
      <g className="vf-cuckoo-bird">
        <ellipse cx="120" cy="126" rx="15" ry="9" fill="#7a5a36" />
        <circle cx="131" cy="119" r="7" fill="#8c6a42" />
        <path d="M137 118 L146 120 L137 122 Z" fill="#e0a526" />
        <circle cx="133" cy="117" r="1.4" fill="#111" />
        <path d="M106 124 L96 120 L100 130 Z" fill="#5c4226" />
      </g>
      <g className="vf-cuckoo-doors">
        <rect className="vf-door-left" x="98" y="106" width="22" height="36" fill="#7a4a22" stroke="#3a220f" />
        <rect className="vf-door-right" x="120" y="106" width="22" height="36" fill="#7a4a22" stroke="#3a220f" />
      </g>
      <circle cx="120" cy="206" r="60" fill="#4a2a12" />
      <circle cx="120" cy="206" r="54" fill="#f4e9d0" />
      <Ticks cx={120} cy={206} outer={52} inner={49} majorInner={47} className="vf-ticks-dark" />
      <Numerals cx={120} cy={206} radius={40} className="vf-cuckoo-numbers" />
      {a && (
        <>
          <path d="M120 212 L116 186 L120 176 L124 186 Z" fill="#f7eedb" stroke="#2b1a0d" strokeWidth="1.4" transform={rot(a.hour, 120, 206)} />
          <path d="M120 214 L117 172 L120 160 L123 172 Z" fill="#f7eedb" stroke="#2b1a0d" strokeWidth="1.4" transform={rot(a.minute, 120, 206)} />
        </>
      )}
      <circle cx="120" cy="206" r="4" fill="#2b1a0d" />
    </svg>
  );
}

/** Cep saati: Breguet ibreler, 6'da kucuk saniye (saniyede 5 adim). */
export function PocketWatch({ date, label }: FaceProps) {
  const a = date ? handAngles(date, "beat5") : null;
  return (
    <svg className="vintage-face vf-pocket" viewBox="0 0 240 300" role="img" aria-label={label}>
      <defs>
        <radialGradient id="vf-gold" cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#fff1b8" />
          <stop offset="0.45" stopColor="#dcb04e" />
          <stop offset="1" stopColor="#8a6117" />
        </radialGradient>
        <radialGradient id="vf-pocket-enamel" cx="50%" cy="40%" r="75%">
          <stop offset="0" stopColor="#fffdf6" />
          <stop offset="1" stopColor="#f1e6cf" />
        </radialGradient>
      </defs>
      <path d="M132 30 C170 6 214 20 238 4" fill="none" stroke="#c99a3a" strokeWidth="4" strokeDasharray="7 3" strokeLinecap="round" />
      <ellipse cx="120" cy="34" rx="18" ry="14" fill="none" stroke="url(#vf-gold)" strokeWidth="6" />
      <rect x="106" y="46" width="28" height="16" rx="4" fill="url(#vf-gold)" />
      <path d="M110 48 V60 M116 48 V60 M122 48 V60 M128 48 V60" stroke="#8a6117" strokeWidth="1.2" />
      <rect x="113" y="60" width="14" height="10" fill="url(#vf-gold)" />
      <circle cx="120" cy="172" r="104" fill="url(#vf-gold)" />
      <circle cx="120" cy="172" r="96" fill="none" stroke="#8a6117" strokeWidth="1.5" />
      <circle cx="120" cy="172" r="90" fill="url(#vf-pocket-enamel)" />
      <Ticks cx={120} cy={172} outer={86} inner={82} majorInner={80} className="vf-ticks-fine" />
      <Numerals cx={120} cy={172} radius={68} roman className="vf-pocket-roman" dy={5} />
      <circle cx="120" cy="216" r="20" fill="none" stroke="#6b5a45" strokeWidth="0.8" />
      <Ticks cx={120} cy={216} outer={19} inner={17} majorInner={15} className="vf-ticks-fine" />
      {a && (
        <g transform={rot(a.second, 120, 216)}>
          <line x1="120" y1="220" x2="120" y2="199" stroke="#1d3a8a" strokeWidth="1" />
        </g>
      )}
      <circle cx="120" cy="216" r="1.8" fill="#1d3a8a" />
      {a && (
        <>
          <g transform={rot(a.hour, 120, 172)} stroke="#1d3a8a" fill="none" strokeWidth="2.2">
            <line x1="120" y1="180" x2="120" y2="140" />
            <circle cx="120" cy="134" r="6" />
            <line x1="120" y1="128" x2="120" y2="120" />
          </g>
          <g transform={rot(a.minute, 120, 172)} stroke="#1d3a8a" fill="none" strokeWidth="1.8">
            <line x1="120" y1="182" x2="120" y2="116" />
            <circle cx="120" cy="110" r="5" />
            <line x1="120" y1="105" x2="120" y2="92" />
          </g>
        </>
      )}
      <circle cx="120" cy="172" r="4" fill="#1d3a8a" />
      <path d="M52 120 A80 80 0 0 1 150 84 A96 96 0 0 0 52 120 Z" fill="#ffffff" opacity="0.35" />
    </svg>
  );
}

/** Zilli calar saat: saat basinda ciftce zil calar ve saat titrer. */
export function TwinBellClock({ date, label, active }: FaceProps) {
  const a = date ? handAngles(date, "quartz") : null;
  const alarmAngle = 7 * 30;
  return (
    <svg className={`vintage-face vf-twinbell${active ? " is-active" : ""}`} viewBox="0 0 260 300" role="img" aria-label={label}>
      <defs>
        <linearGradient id="vf-metal" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f4f6f8" />
          <stop offset="0.5" stopColor="#b7c0ca" />
          <stop offset="1" stopColor="#7c8794" />
        </linearGradient>
        <radialGradient id="vf-red" cx="40%" cy="35%" r="75%">
          <stop offset="0" stopColor="#ef5350" />
          <stop offset="1" stopColor="#8e1616" />
        </radialGradient>
      </defs>
      <g className="vf-twinbell-body">
        <path d="M92 70 Q130 24 168 70" fill="none" stroke="url(#vf-metal)" strokeWidth="7" strokeLinecap="round" />
        <g transform="rotate(-24 70 76)">
          <path d="M34 80 A36 36 0 0 1 106 80 Z" fill="url(#vf-metal)" />
          <rect x="30" y="78" width="80" height="6" rx="3" fill="#8b95a1" />
        </g>
        <g transform="rotate(24 190 76)">
          <path d="M154 80 A36 36 0 0 1 226 80 Z" fill="url(#vf-metal)" />
          <rect x="150" y="78" width="80" height="6" rx="3" fill="#8b95a1" />
        </g>
        <g className="vf-hammer">
          <line x1="130" y1="96" x2="130" y2="58" stroke="#7c8794" strokeWidth="4" />
          <circle cx="130" cy="56" r="6" fill="url(#vf-metal)" />
        </g>
        <path d="M80 240 L64 272 M180 240 L196 272" stroke="url(#vf-metal)" strokeWidth="8" strokeLinecap="round" />
        <circle cx="130" cy="164" r="94" fill="url(#vf-red)" />
        <circle cx="130" cy="164" r="82" fill="url(#vf-metal)" />
        <circle cx="130" cy="164" r="76" fill="#fbfbf8" />
        <Ticks cx={130} cy={164} outer={73} inner={70} majorInner={66} className="vf-ticks-dark" />
        <Numerals cx={130} cy={164} radius={55} className="vf-twinbell-numbers" dy={6} />
        <g transform={rot(alarmAngle, 130, 164)}>
          <line x1="130" y1="164" x2="130" y2="118" stroke="#e8a317" strokeWidth="2.5" />
          <path d="M130 110 L125 120 L135 120 Z" fill="#e8a317" />
        </g>
        {a && (
          <>
            <path d="M130 172 L126 160 L130 118 L134 160 Z" fill="#161616" transform={rot(a.hour, 130, 164)} />
            <path d="M130 174 L127 160 L130 100 L133 160 Z" fill="#161616" transform={rot(a.minute, 130, 164)} />
            <g transform={rot(a.second, 130, 164)}>
              <line x1="130" y1="182" x2="130" y2="96" stroke="#d32f2f" strokeWidth="1.5" />
            </g>
          </>
        )}
        <circle cx="130" cy="164" r="5" fill="#d32f2f" />
        <path d="M76 110 A76 76 0 0 1 150 90 A90 90 0 0 0 76 110 Z" fill="#ffffff" opacity="0.5" />
      </g>
    </svg>
  );
}

/** Nixie tuplu saat: cam tup icinde turuncu parlayan katot rakamlar. */
export function NixieClock({
  hourText,
  minuteText,
  secondText,
  showSeconds,
  label,
}: {
  hourText: string;
  minuteText: string;
  secondText: string;
  showSeconds: boolean;
  label?: string;
}) {
  const groups = showSeconds ? [hourText, minuteText, secondText] : [hourText, minuteText];
  return (
    <div className="nixie-clock" role="img" aria-label={label}>
      {groups.map((group, groupIndex) => (
        <span key={groupIndex} className="nixie-group">
          {groupIndex > 0 && (
            <span className="nixie-colon" aria-hidden="true">
              <i />
              <i />
            </span>
          )}
          {group.split("").map((digit, index) => (
            <span key={index} className="nixie-tube" aria-hidden="true">
              {"0123456789".split("").map((ghost) => (
                <span key={ghost} className={ghost === digit ? "nixie-digit is-lit" : "nixie-digit"}>
                  {ghost}
                </span>
              ))}
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}
