import type { ReactNode } from "react";
import type { Gorsel } from "../../converter/calendar/trTakvim";

// Takvim etkinlikleri için sahne tarzı SVG illüstrasyonlar (gradyan, ışık-gölge; çizgi film değil).
// 120×120 alan, yuvarlak köşe ile kırpılır. Türk bayrağı: Türk Bayrağı Kanunu oranları
// (Wikimedia Commons "Flag of Turkey.svg" geometrisi). Kimlikler görsel adıyla öneklenir.

type Stop = [number, string, number?];

function Grad({
  id,
  stops,
  x2 = 0,
  y2 = 1,
}: {
  id: string;
  stops: Stop[];
  x2?: number;
  y2?: number;
}) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2={x2} y2={y2}>
      {stops.map(([o, c, a]) => (
        <stop key={`${o}${c}`} offset={o} stopColor={c} stopOpacity={a ?? 1} />
      ))}
    </linearGradient>
  );
}

function RGrad({
  id,
  stops,
  cx = 0.5,
  cy = 0.5,
  r = 0.5,
}: {
  id: string;
  stops: Stop[];
  cx?: number;
  cy?: number;
  r?: number;
}) {
  return (
    <radialGradient id={id} cx={cx} cy={cy} r={r}>
      {stops.map(([o, c, a]) => (
        <stop key={`${o}${c}`} offset={o} stopColor={c} stopOpacity={a ?? 1} />
      ))}
    </radialGradient>
  );
}

const Gok = ({ id }: { id: string }) => (
  <rect width="120" height="120" fill={`url(#${id})`} />
);

function Bayrak({ x, y, w }: { x: number; y: number; w: number }) {
  const s = w / 1200;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect width="1200" height="800" fill="#e30a17" />
      <circle cx="425" cy="400" r="200" fill="#fff" />
      <circle cx="475" cy="400" r="160" fill="#e30a17" />
      <path
        fill="#fff"
        d="M583.334,400 764.235,458.779 652.431,304.894V495.106L764.235,341.221z"
      />
    </g>
  );
}

/** İnce hilal (dış daire eksi kaydırılmış iç daire) — maske ile, arka plandan bağımsız. */
function Hilal({
  id,
  cx,
  cy,
  r,
  fill,
}: {
  id: string;
  cx: number;
  cy: number;
  r: number;
  fill: string;
}) {
  return (
    <>
      <mask id={id}>
        <circle cx={cx} cy={cy} r={r} fill="#fff" />
        <circle
          cx={cx + r * 0.42}
          cy={cy - r * 0.18}
          r={r * 0.86}
          fill="#000"
        />
      </mask>
      <circle cx={cx} cy={cy} r={r} fill={fill} mask={`url(#${id})`} />
    </>
  );
}

function Yildiz({
  cx,
  cy,
  r,
  fill,
}: {
  cx: number;
  cy: number;
  r: number;
  fill: string;
}) {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const rr = i % 2 ? r * 0.4 : r;
    return `${(cx + rr * Math.cos(a)).toFixed(2)},${(cy + rr * Math.sin(a)).toFixed(2)}`;
  }).join(" ");
  return <polygon points={pts} fill={fill} />;
}

function Isinlar({
  cx,
  cy,
  r1,
  r2,
  n,
  stroke,
  w = 4,
}: {
  cx: number;
  cy: number;
  r1: number;
  r2: number;
  n: number;
  stroke: string;
  w?: number;
}) {
  return (
    <g stroke={stroke} strokeWidth={w} strokeLinecap="round">
      {Array.from({ length: n }, (_, i) => {
        const a = (2 * Math.PI * i) / n;
        return (
          <line
            key={i}
            x1={cx + r1 * Math.cos(a)}
            y1={cy + r1 * Math.sin(a)}
            x2={cx + r2 * Math.cos(a)}
            y2={cy + r2 * Math.sin(a)}
          />
        );
      })}
    </g>
  );
}

function Yildizlar({
  seed,
  n,
  fill = "#fff",
  maxY = 70,
}: {
  seed: number;
  n: number;
  fill?: string;
  maxY?: number;
}) {
  const noktalar = yildizNoktalari(seed, n);
  return (
    <g fill={fill}>
      {noktalar.map(([x, y, r, o], i) => (
        <circle
          key={i}
          cx={(x * 116 + 2).toFixed(1)}
          cy={(y * maxY + 2).toFixed(1)}
          r={(r * 0.7 + 0.3).toFixed(2)}
          opacity={(o * 0.6 + 0.4).toFixed(2)}
        />
      ))}
    </g>
  );
}

/** Tohumlu sözde rastgele yıldız konumları (her çizimde aynı sonuç). */
function yildizNoktalari(seed: number, n: number) {
  let s = seed;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: n }, () => [rnd(), rnd(), rnd(), rnd()]);
}

/** Osmanlı camisi silüeti: ana kubbe, yarım kubbeler, iki kalem minare. */
function Cami({
  fill,
  pencere,
  serefe,
}: {
  fill: string;
  pencere?: string;
  serefe?: string;
}) {
  const minare = (x: number) => (
    <g key={x}>
      <rect x={x - 2} y="40" width="4" height="66" fill={fill} />
      <polygon points={`${x - 2.4},40 ${x},24 ${x + 2.4},40`} fill={fill} />
      <rect
        x={x - 3.6}
        y="56"
        width="7.2"
        height="2.2"
        rx="1"
        fill={serefe ?? fill}
      />
      <rect
        x={x - 3.6}
        y="72"
        width="7.2"
        height="2.2"
        rx="1"
        fill={serefe ?? fill}
      />
      <line x1={x} y1="24" x2={x} y2="20" stroke={fill} strokeWidth="0.8" />
    </g>
  );
  return (
    <g>
      {minare(20)}
      {minare(100)}
      <rect x="32" y="84" width="56" height="22" fill={fill} />
      <rect x="43" y="76" width="34" height="9" fill={fill} />
      <path d="M44,77 A16,16 0 0 1 76,77z" fill={fill} />
      <path d="M31,86 A8,8 0 0 1 47,86z M73,86 A8,8 0 0 1 89,86z" fill={fill} />
      <line x1="60" y1="61" x2="60" y2="54" stroke={fill} strokeWidth="1" />
      <circle cx="60" cy="53" r="1.4" fill={fill} />
      {pencere ? (
        <g fill={pencere}>
          {[37, 44, 51, 65, 72, 79].map((x) => (
            <rect key={x} x={x} y="91" width="3" height="6" rx="1.5" />
          ))}
          {[48, 54, 60, 66, 72].map((x) => (
            <rect key={x} x={x - 1} y="79" width="2" height="4" rx="1" />
          ))}
        </g>
      ) : null}
    </g>
  );
}

function Cicek5({
  x,
  y,
  r,
  id,
}: {
  x: number;
  y: number;
  r: number;
  id: string;
}) {
  return (
    <g>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse
          key={a}
          cx={x}
          cy={y - r * 0.62}
          rx={r * 0.46}
          ry={r * 0.62}
          fill={`url(#${id})`}
          transform={`rotate(${a} ${x} ${y})`}
        />
      ))}
      <circle cx={x} cy={y} r={r * 0.22} fill="#d98a3a" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <circle
          key={a}
          cx={x + r * 0.34 * Math.cos((a * Math.PI) / 180)}
          cy={y + r * 0.34 * Math.sin((a * Math.PI) / 180)}
          r={r * 0.06}
          fill="#8a4b1c"
        />
      ))}
    </g>
  );
}

function Lale({
  x,
  y,
  id,
  idA,
}: {
  x: number;
  y: number;
  id: string;
  idA: string;
}) {
  return (
    <g>
      <path
        d={`M${x},${y + 6} Q${x + (60 - x) * 0.2},${y + 40} 60,100`}
        fill="none"
        stroke="#3d6b35"
        strokeWidth="2.2"
      />
      <path
        d={`M${x - 10},${y} C${x - 11},${y - 12} ${x - 6},${y - 20} ${x},${y - 23} C${x + 6},${y - 20} ${x + 11},${y - 12} ${x + 10},${y} C${x + 7},${y + 9} ${x - 7},${y + 9} ${x - 10},${y}z`}
        fill={`url(#${id})`}
      />
      <path
        d={`M${x},${y + 8} C${x - 8},${y + 4} ${x - 9},${y - 10} ${x - 3},${y - 21} C${x + 3},${y - 12} ${x + 5},${y - 2} ${x},${y + 8}z`}
        fill={`url(#${idA})`}
      />
      <path
        d={`M${x + 1},${y + 8} C${x + 7},${y + 2} ${x + 8},${y - 8} ${x + 5},${y - 17}`}
        fill="none"
        stroke="#000"
        strokeOpacity="0.12"
        strokeWidth="1"
      />
    </g>
  );
}

function HavaiFisek({
  cx,
  cy,
  r,
  renk,
}: {
  cx: number;
  cy: number;
  r: number;
  renk: string;
}) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r * 0.9} fill={renk} opacity="0.12" />
      {Array.from({ length: 18 }, (_, i) => {
        const a = (2 * Math.PI * i) / 18;
        const r1 = r * 0.25;
        const r2 = r * (i % 2 ? 0.85 : 1);
        return (
          <g key={i}>
            <line
              x1={cx + r1 * Math.cos(a)}
              y1={cy + r1 * Math.sin(a)}
              x2={cx + r2 * Math.cos(a)}
              y2={cy + r2 * Math.sin(a)}
              stroke={renk}
              strokeWidth="0.8"
              strokeLinecap="round"
              opacity="0.8"
            />
            <circle
              cx={cx + r2 * Math.cos(a)}
              cy={cy + r2 * Math.sin(a)}
              r="1"
              fill="#fff"
            />
          </g>
        );
      })}
    </g>
  );
}

function Cam({
  x,
  y,
  h,
  kar,
}: {
  x: number;
  y: number;
  h: number;
  kar?: boolean;
}) {
  const w = h * 0.42;
  return (
    <g>
      <rect x={x - 1} y={y + h - 4} width="2" height="5" fill="#3b2a1e" />
      {[0, 1, 2].map((i) => {
        const ty = y + i * h * 0.28;
        const bw = w * (0.55 + i * 0.25);
        return (
          <g key={i}>
            <polygon
              points={`${x},${ty} ${x - bw},${ty + h * 0.42} ${x + bw},${ty + h * 0.42}`}
              fill={i % 2 ? "#1f4d3b" : "#23573f"}
            />
            {kar ? (
              <path
                d={`M${x - bw * 0.9},${ty + h * 0.4} Q${x - bw * 0.3},${ty + h * 0.3} ${x},${ty + h * 0.36} Q${x + bw * 0.4},${ty + h * 0.3} ${x + bw * 0.9},${ty + h * 0.4}`}
                fill="none"
                stroke="#f4f8fb"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ) : null}
          </g>
        );
      })}
    </g>
  );
}

function Disli({
  cx,
  cy,
  r,
  dis,
  id,
}: {
  cx: number;
  cy: number;
  r: number;
  dis: number;
  id: string;
}) {
  return (
    <g>
      {Array.from({ length: dis }, (_, i) => (
        <rect
          key={i}
          x={cx - r * 0.13}
          y={cy - r - r * 0.2}
          width={r * 0.26}
          height={r * 0.36}
          rx="1"
          fill={`url(#${id})`}
          transform={`rotate(${(360 / dis) * i} ${cx} ${cy})`}
        />
      ))}
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id})`} />
      <circle
        cx={cx}
        cy={cy}
        r={r * 0.72}
        fill="none"
        stroke="#000"
        strokeOpacity="0.15"
        strokeWidth="1.2"
      />
      <circle cx={cx} cy={cy} r={r * 0.3} fill="#2b313b" />
      <circle
        cx={cx}
        cy={cy}
        r={r * 0.3}
        fill="none"
        stroke="#fff"
        strokeOpacity="0.25"
      />
    </g>
  );
}

function Cizim({ g }: { g: Gorsel }): ReactNode {
  const p = `tg-${g}`;
  switch (g) {
    case "bayrak":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-gok`}
              stops={[
                [0, "#6fa3d4"],
                [1, "#dfeaf4"],
              ]}
            />
            <Grad
              id={`${p}-dir`}
              x2={1}
              y2={0}
              stops={[
                [0, "#8c8f94"],
                [0.5, "#f1f2f4"],
                [1, "#6b6f75"],
              ]}
            />
            <Grad
              id={`${p}-kivrim`}
              x2={1}
              y2={0}
              stops={[
                [0, "#000", 0.25],
                [0.18, "#fff", 0.12],
                [0.36, "#000", 0.18],
                [0.58, "#fff", 0.16],
                [0.78, "#000", 0.22],
                [1, "#fff", 0.08],
              ]}
            />
            <clipPath id={`${p}-dalga`}>
              <path d="M24,20 C40,13 56,27 74,20 C86,15 94,17 100,21 L100,69 C94,66 86,64 74,69 C56,76 40,62 24,68z" />
            </clipPath>
          </defs>
          <Gok id={`${p}-gok`} />
          <path
            d="M0,112 Q40,100 70,106 T120,104 V120 H0z"
            fill="#8fb07a"
            opacity="0.6"
          />
          <rect
            x="20.5"
            y="12"
            width="3.5"
            height="108"
            fill={`url(#${p}-dir)`}
          />
          <circle cx="22.2" cy="11" r="2.8" fill="#d8b24a" />
          <g clipPath={`url(#${p}-dalga)`}>
            <Bayrak x={24} y={18} w={76} />
            <rect
              x="24"
              y="12"
              width="76"
              height="62"
              fill={`url(#${p}-kivrim)`}
            />
          </g>
        </>
      );
    case "ramazan":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-gok`}
              stops={[
                [0, "#15203f"],
                [0.55, "#3b3f6b"],
                [0.85, "#c9776a"],
                [1, "#f0b27a"],
              ]}
            />
            <RGrad
              id={`${p}-isik`}
              stops={[
                [0, "#ffe7a0", 0.9],
                [1, "#ffe7a0", 0],
              ]}
            />
          </defs>
          <Gok id={`${p}-gok`} />
          <Yildizlar seed={7} n={26} maxY={40} />
          <circle cx="92" cy="18" r="11" fill={`url(#${p}-isik)`} />
          <Hilal id={`${p}-hilal`} cx={92} cy={18} r={6.5} fill="#fff4cf" />
          {/* mahya: minareler arasına gerilen ışıklı yazı */}
          <path
            d="M20,49 Q60,55 100,49"
            fill="none"
            stroke="#000"
            strokeOpacity="0.4"
            strokeWidth="0.5"
          />
          {Array.from({ length: 21 }, (_, i) => {
            const t = i / 20;
            return (
              <circle
                key={i}
                cx={20 + 80 * t}
                cy={49 + 12 * t * (1 - t)}
                r="0.8"
                fill="#ffe29a"
              />
            );
          })}
          <text
            x="60"
            y="45"
            textAnchor="middle"
            fontSize="5.2"
            fontWeight="700"
            letterSpacing="0.5"
            fill="#ffe29a"
            fontFamily="Georgia, serif"
          >
            HOŞ GELDİN RAMAZAN
          </text>
          <Cami fill="#141a2e" pencere="#f6c768" serefe="#f6c768" />
          <rect y="106" width="120" height="14" fill="#10152a" />
        </>
      );
    case "kandil":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-gok`}
              stops={[
                [0, "#070b1f"],
                [0.7, "#1b2550"],
                [1, "#2c3a6e"],
              ]}
            />
            <RGrad
              id={`${p}-hale`}
              stops={[
                [0, "#ffd678", 0.75],
                [1, "#ffd678", 0],
              ]}
            />
          </defs>
          <Gok id={`${p}-gok`} />
          <Yildizlar seed={31} n={40} maxY={70} />
          <circle
            cx="60"
            cy="24"
            r="12"
            fill={`url(#${p}-hale)`}
            opacity="0.5"
          />
          <Hilal id={`${p}-hilal`} cx={60} cy={24} r={7} fill="#fff1c4" />
          {[20, 100].flatMap((x) =>
            [57, 73].map((y) => (
              <ellipse
                key={`${x}${y}`}
                cx={x}
                cy={y}
                rx="9"
                ry="5"
                fill={`url(#${p}-hale)`}
              />
            )),
          )}
          <ellipse
            cx="60"
            cy="72"
            rx="30"
            ry="14"
            fill={`url(#${p}-hale)`}
            opacity="0.45"
          />
          <Cami fill="#0d1226" pencere="#ffcf66" serefe="#ffe08a" />
          <rect y="106" width="120" height="14" fill="#090d1c" />
        </>
      );
    case "kurban":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-gok`}
              stops={[
                [0, "#a9cbe6"],
                [1, "#f3efe2"],
              ]}
            />
            <Grad
              id={`${p}-tepe`}
              stops={[
                [0, "#9bbf73"],
                [1, "#6f9950"],
              ]}
            />
            <Grad
              id={`${p}-tepe2`}
              stops={[
                [0, "#b9d193"],
                [1, "#98b877"],
              ]}
            />
            <RGrad
              id={`${p}-yun`}
              cx={0.45}
              cy={0.35}
              r={0.65}
              stops={[
                [0, "#fbf8f0"],
                [0.7, "#e6dfcd"],
                [1, "#c9bea5"],
              ]}
            />
            <Grad
              id={`${p}-bas`}
              stops={[
                [0, "#d2c09e"],
                [1, "#a38c68"],
              ]}
            />
            <Grad
              id={`${p}-boynuz`}
              x2={1}
              y2={1}
              stops={[
                [0, "#c7ae80"],
                [1, "#8a7250"],
              ]}
            />
          </defs>
          <Gok id={`${p}-gok`} />
          <path
            d="M0,78 Q30,66 64,74 T120,70 V120 H0z"
            fill={`url(#${p}-tepe2)`}
          />
          <rect x="94.3" y="62" width="1.4" height="10" fill="#5f4a35" />
          <circle cx="95" cy="60" r="6" fill="#6a8c4c" />
          <path d="M0,96 Q50,86 120,94 V120 H0z" fill={`url(#${p}-tepe)`} />
          {/* uzaktaki koyun */}
          <g opacity="0.8">
            <ellipse cx="104" cy="82" rx="6" ry="3.6" fill="#eee7d6" />
            <ellipse cx="98.5" cy="80.5" rx="2" ry="1.5" fill="#6d5c45" />
            <line
              x1="101"
              y1="85"
              x2="101"
              y2="88"
              stroke="#5a4a38"
              strokeWidth="0.8"
            />
            <line
              x1="107"
              y1="85"
              x2="107"
              y2="88"
              stroke="#5a4a38"
              strokeWidth="0.8"
            />
          </g>
          {/* kurbanlık koç */}
          <ellipse cx="62" cy="104" rx="30" ry="3" fill="#000" opacity="0.15" />
          <g stroke="#4a3f33" strokeWidth="3" strokeLinecap="round">
            <line x1="45" y1="86" x2="45" y2="104" />
            <line x1="51" y1="87" x2="52" y2="103" />
            <line x1="76" y1="86" x2="77" y2="104" />
            <line x1="82" y1="85" x2="82" y2="102" />
          </g>
          <path
            d="M38,74 C37,62 52,57 64,59 C77,57 90,62 90,73 C92,84 81,90 65,89 C50,91 39,86 38,74z"
            fill={`url(#${p}-yun)`}
          />
          <g
            fill="none"
            stroke="#b9ad92"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.8"
          >
            <path d="M50,64 q3,-3 6,0 M60,62 q3,-3 6,0 M70,63 q3,-3 6,0 M80,66 q3,-3 6,0 M46,72 q3,-3 6,0 M56,70 q3,-3 6,0 M66,71 q3,-3 6,0 M76,73 q3,-3 6,0 M52,80 q3,-3 6,0 M62,79 q3,-3 6,0 M72,80 q3,-3 6,0 M82,79 q3,-3 6,0" />
          </g>
          <path
            d="M89,68 q5,2 4,9"
            fill="none"
            stroke="#d8cfb9"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M44,70 C38,66 34,61 31,57 C27,54 22,56 20,60 C18,65 21,69 26,70 C31,72 37,77 43,79z"
            fill={`url(#${p}-bas)`}
          />
          <ellipse cx="21.5" cy="63" rx="1.4" ry="1" fill="#3a3027" />
          <circle cx="28" cy="59.5" r="1.2" fill="#1f1a15" />
          <path d="M37,58 q5,-1 6,3 q-4,1 -6,-3z" fill="#a38c68" />
          <path
            d="M31,55 C33,47 43,47 44,55 C45,62 38,65 34,61 C32,58 35,55 38,57"
            fill="none"
            stroke={`url(#${p}-boynuz)`}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M31,55 C33,47 43,47 44,55 C45,62 38,65 34,61"
            fill="none"
            stroke="#6e5a3e"
            strokeWidth="4"
            strokeDasharray="0.6 2"
            opacity="0.5"
          />
        </>
      );
    case "cocuk":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-gok`}
              stops={[
                [0, "#5d9fd6"],
                [1, "#e4f0f9"],
              ]}
            />
            <Grad
              id={`${p}-ucurtma`}
              x2={1}
              y2={1}
              stops={[
                [0, "#f5c542"],
                [1, "#e0892a"],
              ]}
            />
          </defs>
          <Gok id={`${p}-gok`} />
          <ellipse cx="30" cy="30" rx="16" ry="5" fill="#fff" opacity="0.7" />
          <ellipse cx="38" cy="27" rx="9" ry="5" fill="#fff" opacity="0.7" />
          {/* uçurtma */}
          <g transform="rotate(-12 86 32)">
            <polygon
              points="86,14 100,32 86,52 72,32"
              fill={`url(#${p}-ucurtma)`}
            />
            <polygon points="86,14 100,32 86,32" fill="#fff" opacity="0.18" />
            <line
              x1="86"
              y1="14"
              x2="86"
              y2="52"
              stroke="#7a4a1a"
              strokeWidth="0.7"
            />
            <line
              x1="72"
              y1="32"
              x2="100"
              y2="32"
              stroke="#7a4a1a"
              strokeWidth="0.7"
            />
          </g>
          <path
            d="M82,52 q-6,8 -2,14 q4,6 -2,12"
            fill="none"
            stroke="#7a4a1a"
            strokeWidth="0.7"
          />
          <path
            d="M84,51 L40,120"
            stroke="#f4f4f4"
            strokeWidth="0.5"
            opacity="0.8"
          />
          {/* bayrak süsleri */}
          {[0, 1].map((row) => (
            <g key={row}>
              <path
                d={`M-4,${62 + row * 22} Q60,${82 + row * 22} 124,${62 + row * 22}`}
                fill="none"
                stroke="#5b4a3a"
                strokeWidth="0.6"
              />
              {Array.from({ length: 7 }, (_, i) => {
                const t = (i + 0.5) / 7;
                const x = -4 + 128 * t;
                const y = 62 + row * 22 + 20 * 2 * t * (1 - t);
                const a = (0.5 - t) * -28;
                return (
                  <g
                    key={i}
                    transform={`translate(${x - 6} ${y}) rotate(${a} 6 0)`}
                  >
                    <Bayrak x={0} y={0} w={12} />
                    <rect width="12" height="8" fill="#000" opacity="0.08" />
                  </g>
                );
              })}
            </g>
          ))}
        </>
      );
    case "anma":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-gok`}
              stops={[
                [0, "#8e9aab"],
                [0.7, "#d5d8dd"],
                [1, "#e9e6e1"],
              ]}
            />
            <Grad
              id={`${p}-tas`}
              stops={[
                [0, "#e9e3d6"],
                [1, "#b9b1a0"],
              ]}
            />
          </defs>
          <Gok id={`${p}-gok`} />
          <text
            x="60"
            y="30"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#2f3a48"
            fontFamily="Georgia, serif"
            letterSpacing="1"
          >
            09.05
          </text>
          <text
            x="60"
            y="41"
            textAnchor="middle"
            fontSize="5.5"
            fill="#2f3a48"
            fontFamily="Georgia, serif"
            letterSpacing="0.8"
          >
            10 KASIM 1938
          </text>
          {/* Anıtkabir: sütunlu şeref holü */}
          <rect x="14" y="94" width="92" height="6" fill="#a9a293" />
          <polygon points="40,100 80,100 86,112 34,112" fill="#bdb6a6" />
          {Array.from({ length: 6 }, (_, i) => (
            <line
              key={i}
              x1={36 + i}
              y1={102 + i * 2}
              x2={84 - i}
              y2={102 + i * 2}
              stroke="#8f887a"
              strokeWidth="0.5"
            />
          ))}
          <rect x="24" y="62" width="72" height="32" fill={`url(#${p}-tas)`} />
          <rect x="21" y="56" width="78" height="7" fill="#d9d2c3" />
          <rect
            x="21"
            y="62"
            width="78"
            height="1.5"
            fill="#8f887a"
            opacity="0.6"
          />
          <rect
            x="28"
            y="66"
            width="64"
            height="28"
            fill="#6e685c"
            opacity="0.55"
          />
          {Array.from({ length: 12 }, (_, i) => (
            <rect
              key={i}
              x={28 + i * 5.6}
              y="64"
              width="2.8"
              height="30"
              fill="#efe9dc"
            />
          ))}
          <rect y="112" width="120" height="8" fill="#8f887a" />
          {/* yarıya indirilmiş bayrak */}
          <rect x="108" y="18" width="1.6" height="94" fill="#6b6f75" />
          <Bayrak x={88} y={46} w={20} />
        </>
      );
    case "defne":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-gok`}
              stops={[
                [0, "#4a5a7d"],
                [0.55, "#d98c5f"],
                [0.78, "#f3c486"],
                [1, "#f3c486"],
              ]}
            />
            <Grad
              id={`${p}-deniz`}
              stops={[
                [0, "#5a6f8f"],
                [1, "#2c3b58"],
              ]}
            />
            <RGrad
              id={`${p}-gunes`}
              stops={[
                [0, "#fff1c9"],
                [0.5, "#ffd48a", 0.7],
                [1, "#ffd48a", 0],
              ]}
            />
          </defs>
          <Gok id={`${p}-gok`} />
          <circle cx="86" cy="80" r="20" fill={`url(#${p}-gunes)`} />
          <rect y="84" width="120" height="36" fill={`url(#${p}-deniz)`} />
          {[88, 93, 99].map((y, i) => (
            <line
              key={y}
              x1={80 - i * 4}
              y1={y}
              x2={92 + i * 4}
              y2={y}
              stroke="#ffd9a0"
              strokeWidth="0.9"
              opacity={0.7 - i * 0.15}
            />
          ))}
          <path d="M0,84 L0,80 Q14,76 30,80 L44,84z" fill="#2a2b3a" />
          {/* Çanakkale Şehitler Abidesi: dört ayak üzerinde kare kütle */}
          <g fill="#23232f">
            <rect x="34" y="16" width="36" height="22" />
            <polygon points="36,38 43,38 45,96 38,96" />
            <polygon points="61,38 68,38 66,96 59,96" />
            <polygon points="44,38 47,38 48,96 45,96" opacity="0.7" />
            <polygon points="57,38 60,38 59,96 56,96" opacity="0.7" />
            <rect x="28" y="96" width="48" height="6" />
            <path d="M0,102 H120 V120 H0z" />
          </g>
          <rect
            x="34"
            y="16"
            width="36"
            height="1.5"
            fill="#f3c486"
            opacity="0.35"
          />
          <rect x="92" y="54" width="1" height="48" fill="#23232f" />
          <Bayrak x={93} y={54} w={14} />
        </>
      );
    case "kalp":
      return (
        <>
          <defs>
            <RGrad
              id={`${p}-zemin`}
              cx={0.5}
              cy={0.4}
              r={0.8}
              stops={[
                [0, "#5a1826"],
                [1, "#1e070d"],
              ]}
            />
            <Grad
              id={`${p}-dis`}
              x2={0.4}
              y2={1}
              stops={[
                [0, "#d8233f"],
                [1, "#6d0a1b"],
              ]}
            />
            <Grad
              id={`${p}-ic`}
              stops={[
                [0, "#ef4a62"],
                [1, "#9e1027"],
              ]}
            />
            <Grad
              id={`${p}-yaprak`}
              x2={1}
              y2={1}
              stops={[
                [0, "#4f8a3d"],
                [1, "#24502a"],
              ]}
            />
          </defs>
          <rect width="120" height="120" fill={`url(#${p}-zemin)`} />
          <path
            d="M60,64 C61,80 56,96 58,120"
            fill="none"
            stroke="#2f5d34"
            strokeWidth="3"
          />
          <path
            d="M59,92 C48,84 36,88 30,96 C40,100 52,100 59,92z"
            fill={`url(#${p}-yaprak)`}
          />
          <path
            d="M59,92 C48,90 38,93 30,96"
            fill="none"
            stroke="#1b3a1f"
            strokeWidth="0.6"
          />
          <path
            d="M60,80 C70,72 82,74 88,82 C78,88 66,88 60,80z"
            fill={`url(#${p}-yaprak)`}
          />
          <path
            d="M51,64 L56,70 L60,64 L64,70 L69,64 C66,72 54,72 51,64z"
            fill="#2f5d34"
          />
          <path
            d="M38,44 C33,30 46,20 58,25 C50,32 46,44 50,58 C43,58 39,51 38,44z"
            fill={`url(#${p}-dis)`}
          />
          <path
            d="M82,44 C87,30 74,20 62,25 C70,32 74,44 70,58 C77,58 81,51 82,44z"
            fill={`url(#${p}-dis)`}
          />
          <path
            d="M40,44 C44,62 76,62 80,44 C76,54 68,60 60,60 C52,60 44,54 40,44z"
            fill={`url(#${p}-dis)`}
          />
          <path
            d="M44,42 C44,56 56,62 60,62 C64,62 76,56 76,42 C70,50 64,52 60,52 C56,52 50,50 44,42z"
            fill={`url(#${p}-ic)`}
          />
          <path
            d="M48,38 C48,28 60,23 70,30 C67,38 60,44 52,46 C50,44 48,41 48,38z"
            fill={`url(#${p}-ic)`}
          />
          <path
            d="M54,36 C56,30 66,31 65,37 C64,41 58,41 58,38"
            fill="none"
            stroke="#6d0a1b"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M44,40 C46,34 50,30 54,29"
            fill="none"
            stroke="#ff8a9b"
            strokeWidth="0.8"
            opacity="0.6"
          />
        </>
      );
    case "cicek":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-zemin`}
              stops={[
                [0, "#f7efe8"],
                [1, "#e8d9cc"],
              ]}
            />
            <Grad
              id={`${p}-kirmizi`}
              x2={1}
              y2={0}
              stops={[
                [0, "#9e1830"],
                [0.5, "#dd3b4f"],
                [1, "#a1192f"],
              ]}
            />
            <Grad
              id={`${p}-kirmiziA`}
              stops={[
                [0, "#f2677a"],
                [1, "#c52a40"],
              ]}
            />
            <Grad
              id={`${p}-pembe`}
              x2={1}
              y2={0}
              stops={[
                [0, "#c9577e"],
                [0.5, "#f19ab8"],
                [1, "#c65a82"],
              ]}
            />
            <Grad
              id={`${p}-pembeA`}
              stops={[
                [0, "#fbc3d6"],
                [1, "#e57ca1"],
              ]}
            />
            <Grad
              id={`${p}-sari`}
              x2={1}
              y2={0}
              stops={[
                [0, "#d68f14"],
                [0.5, "#f7c948"],
                [1, "#d48c16"],
              ]}
            />
            <Grad
              id={`${p}-sariA`}
              stops={[
                [0, "#fde39a"],
                [1, "#eeb030"],
              ]}
            />
            <Grad
              id={`${p}-yaprak`}
              x2={1}
              y2={1}
              stops={[
                [0, "#7fae63"],
                [1, "#3d6b35"],
              ]}
            />
          </defs>
          <rect width="120" height="120" fill={`url(#${p}-zemin)`} />
          <path
            d="M60,108 C44,96 30,70 26,52 C38,66 50,84 60,108z"
            fill={`url(#${p}-yaprak)`}
          />
          <path
            d="M60,108 C76,96 92,72 96,56 C84,70 70,86 60,108z"
            fill={`url(#${p}-yaprak)`}
          />
          <Lale x={40} y={46} id={`${p}-pembe`} idA={`${p}-pembeA`} />
          <Lale x={80} y={48} id={`${p}-sari`} idA={`${p}-sariA`} />
          <Lale x={60} y={36} id={`${p}-kirmizi`} idA={`${p}-kirmiziA`} />
          <path
            d="M60,108 C56,90 52,80 50,70 C56,82 60,94 60,108z"
            fill={`url(#${p}-yaprak)`}
          />
          <path
            d="M52,94 Q60,98 68,94 L66,100 Q60,103 54,100z"
            fill="#c9a06a"
          />
          <path
            d="M60,97 l-6,10 M60,97 l6,10"
            stroke="#b38850"
            strokeWidth="1.5"
          />
        </>
      );
    case "kitap":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-duvar`}
              stops={[
                [0, "#e7ecef"],
                [1, "#cfd8de"],
              ]}
            />
            <Grad
              id={`${p}-masa`}
              stops={[
                [0, "#8b5a3c"],
                [1, "#5b3822"],
              ]}
            />
            <Grad
              id={`${p}-sol`}
              x2={1}
              y2={0}
              stops={[
                [0, "#f3efe6"],
                [0.85, "#fbf9f4"],
                [1, "#d9d2c4"],
              ]}
            />
            <Grad
              id={`${p}-sag`}
              x2={1}
              y2={0}
              stops={[
                [0, "#d9d2c4"],
                [0.15, "#fbf9f4"],
                [1, "#efe9dd"],
              ]}
            />
          </defs>
          <rect width="120" height="120" fill={`url(#${p}-duvar)`} />
          <rect y="80" width="120" height="40" fill={`url(#${p}-masa)`} />
          <path d="M0,80 H120" stroke="#b07a52" strokeWidth="1" />
          <ellipse cx="60" cy="98" rx="50" ry="6" fill="#000" opacity="0.2" />
          <path
            d="M60,50 C48,44 30,44 12,48 L10,96 C30,92 48,92 60,98 C72,92 90,92 110,96 L108,48 C90,44 72,44 60,50z"
            fill="#2c4a6e"
          />
          <path
            d="M60,48 C48,42 32,42 15,46 L13,92 C32,88 48,88 60,95z"
            fill={`url(#${p}-sol)`}
          />
          <path
            d="M60,48 C72,42 88,42 105,46 L107,92 C88,88 72,88 60,95z"
            fill={`url(#${p}-sag)`}
          />
          <g stroke="#a7a39a" strokeWidth="0.7">
            {[54, 59, 64, 69, 74, 79].map((y, i) => (
              <g key={y}>
                <path d={`M20,${y} Q36,${y - 3} 54,${y + 1}`} fill="none" />
                {i < 5 ? (
                  <path d={`M66,${y + 1} Q84,${y - 3} 100,${y}`} fill="none" />
                ) : null}
              </g>
            ))}
          </g>
          <g transform="rotate(-18 92 104)">
            <rect x="62" y="102" width="46" height="4" rx="1" fill="#e8b93a" />
            <polygon points="108,102 115,104 108,106" fill="#e9c9a0" />
            <polygon points="112.5,103.3 115,104 112.5,104.7" fill="#333" />
            <rect x="58" y="102" width="5" height="4" rx="1" fill="#c9a0a0" />
          </g>
          <g fill="none" stroke="#2b2b2b" strokeWidth="1.2">
            <ellipse cx="30" cy="108" rx="7" ry="5" />
            <ellipse cx="46" cy="108" rx="7" ry="5" />
            <path d="M37,107 q2,-2 2,0" />
          </g>
        </>
      );
    case "saglik":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-zemin`}
              stops={[
                [0, "#e8f5f3"],
                [1, "#c6e3de"],
              ]}
            />
            <RGrad
              id={`${p}-metal`}
              cx={0.35}
              cy={0.3}
              r={0.8}
              stops={[
                [0, "#ffffff"],
                [0.5, "#c7ccd2"],
                [1, "#6f7780"],
              ]}
            />
            <Grad
              id={`${p}-boru`}
              x2={1}
              y2={0}
              stops={[
                [0, "#9aa1a9"],
                [0.5, "#eef0f2"],
                [1, "#7c848d"],
              ]}
            />
          </defs>
          <rect width="120" height="120" fill={`url(#${p}-zemin)`} />
          <path
            d="M60,62 C60,84 50,100 38,100 C26,100 24,86 34,82 C44,78 60,86 72,90"
            fill="none"
            stroke="#000"
            strokeOpacity="0.1"
            strokeWidth="5"
            transform="translate(3 4)"
          />
          <path
            d="M40,18 C36,34 38,48 52,58 M80,18 C84,34 82,48 68,58"
            fill="none"
            stroke={`url(#${p}-boru)`}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <ellipse cx="40" cy="16" rx="3" ry="4" fill="#2b2f36" />
          <ellipse cx="80" cy="16" rx="3" ry="4" fill="#2b2f36" />
          <path
            d="M52,58 Q60,64 68,58"
            fill="none"
            stroke="#2b2f36"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M60,62 C60,84 50,100 38,100 C26,100 24,86 34,82 C44,78 60,86 72,90"
            fill="none"
            stroke="#2b2f36"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <path
            d="M60,62 C60,84 50,100 38,100"
            fill="none"
            stroke="#fff"
            strokeOpacity="0.2"
            strokeWidth="1.2"
          />
          <rect
            x="72"
            y="87"
            width="6"
            height="6"
            rx="1"
            fill={`url(#${p}-boru)`}
          />
          <circle cx="88" cy="90" r="12" fill={`url(#${p}-metal)`} />
          <circle
            cx="88"
            cy="90"
            r="8.5"
            fill="#dfe3e7"
            stroke="#8a929b"
            strokeWidth="0.8"
          />
          <circle
            cx="88"
            cy="90"
            r="8.5"
            fill="none"
            stroke="#fff"
            strokeOpacity="0.6"
            strokeWidth="0.6"
            strokeDasharray="10 40"
          />
        </>
      );
    case "nevruz":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-gok`}
              stops={[
                [0, "#120f24"],
                [0.7, "#3a1f2b"],
                [1, "#5a2b22"],
              ]}
            />
            <RGrad
              id={`${p}-hale`}
              cy={0.6}
              stops={[
                [0, "#ff9a3c", 0.55],
                [1, "#ff9a3c", 0],
              ]}
            />
            <Grad
              id={`${p}-dis`}
              stops={[
                [0, "#ff5a1f"],
                [1, "#c9310d"],
              ]}
            />
            <Grad
              id={`${p}-orta`}
              stops={[
                [0, "#ffb238"],
                [1, "#ff7a1f"],
              ]}
            />
            <Grad
              id={`${p}-ic`}
              stops={[
                [0, "#fff6c4"],
                [1, "#ffd04a"],
              ]}
            />
            <Grad
              id={`${p}-kutuk`}
              stops={[
                [0, "#6b4428"],
                [1, "#3b2415"],
              ]}
            />
          </defs>
          <Gok id={`${p}-gok`} />
          <circle cx="60" cy="68" r="46" fill={`url(#${p}-hale)`} />
          <path d="M0,98 Q60,90 120,98 V120 H0z" fill="#1b1410" />
          <path
            d="M60,18 C74,36 88,54 81,74 C76,88 44,88 39,74 C32,56 46,46 51,33 C53,44 57,48 60,48 C65,38 63,28 60,18z"
            fill={`url(#${p}-dis)`}
          />
          <path
            d="M60,36 C70,50 76,62 71,76 C67,86 51,86 48,76 C44,64 52,56 55,48 C57,56 59,58 61,58 C64,52 63,44 60,36z"
            fill={`url(#${p}-orta)`}
          />
          <path
            d="M60,56 C66,64 68,72 65,80 C63,85 56,85 55,80 C53,72 57,66 60,56z"
            fill={`url(#${p}-ic)`}
          />
          <rect
            x="28"
            y="84"
            width="64"
            height="7"
            rx="3.5"
            fill={`url(#${p}-kutuk)`}
            transform="rotate(14 60 88)"
          />
          <rect
            x="28"
            y="84"
            width="64"
            height="7"
            rx="3.5"
            fill={`url(#${p}-kutuk)`}
            transform="rotate(-14 60 88)"
          />
          {[
            [44, 22],
            [78, 30],
            [70, 14],
            [52, 10],
            [86, 44],
            [34, 40],
          ].map(([x, y]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r="0.9" fill="#ffc861" />
          ))}
        </>
      );
    case "ilkbahar":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-gok`}
              stops={[
                [0, "#a8d3f0"],
                [1, "#eef8fd"],
              ]}
            />
            <RGrad
              id={`${p}-tac`}
              cx={0.5}
              cy={0.9}
              r={0.9}
              stops={[
                [0, "#e98aa9"],
                [0.5, "#f8c9d9"],
                [1, "#fff4f8"],
              ]}
            />
            <Grad
              id={`${p}-dal`}
              stops={[
                [0, "#6b4a32"],
                [1, "#3f2a1c"],
              ]}
            />
            <Grad
              id={`${p}-yaprak`}
              x2={1}
              y2={1}
              stops={[
                [0, "#9ccc6f"],
                [1, "#4f8f3a"],
              ]}
            />
          </defs>
          <Gok id={`${p}-gok`} />
          <path
            d="M0,100 Q40,92 80,98 T120,94 V120 H0z"
            fill="#b7d99a"
            opacity="0.7"
          />
          <path
            d="M-2,92 C26,82 48,72 70,60 C84,52 100,44 122,40"
            fill="none"
            stroke={`url(#${p}-dal)`}
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <path
            d="M40,76 C42,64 38,54 32,46 M70,60 C76,50 86,44 94,42 M92,48 C96,58 104,62 110,62"
            fill="none"
            stroke={`url(#${p}-dal)`}
            strokeWidth="2"
            strokeLinecap="round"
          />
          {[
            [48, 76, -30],
            [80, 58, 20],
            [102, 60, -10],
          ].map(([x, y, a]) => (
            <path
              key={`${x}`}
              transform={`translate(${x} ${y}) rotate(${a})`}
              d="M0,0 C4,-6 12,-6 16,0 C12,4 4,4 0,0z"
              fill={`url(#${p}-yaprak)`}
            />
          ))}
          <Cicek5 x={32} y={46} r={9} id={`${p}-tac`} />
          <Cicek5 x={58} y={64} r={8} id={`${p}-tac`} />
          <Cicek5 x={92} y={40} r={10} id={`${p}-tac`} />
          <Cicek5 x={74} y={52} r={6} id={`${p}-tac`} />
          <Cicek5 x={18} y={84} r={7} id={`${p}-tac`} />
        </>
      );
    case "yaz":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-gok`}
              stops={[
                [0, "#3e6db3"],
                [0.5, "#f29e6b"],
                [1, "#ffd28a"],
              ]}
            />
            <Grad
              id={`${p}-deniz`}
              stops={[
                [0, "#e98a5e"],
                [0.25, "#3d6aa3"],
                [1, "#1d3a66"],
              ]}
            />
            <RGrad
              id={`${p}-gunes`}
              stops={[
                [0, "#fffbe6"],
                [0.45, "#ffe08a"],
                [0.7, "#ffc36b", 0.6],
                [1, "#ffc36b", 0],
              ]}
            />
          </defs>
          <Gok id={`${p}-gok`} />
          <circle cx="60" cy="72" r="34" fill={`url(#${p}-gunes)`} />
          <rect y="74" width="120" height="46" fill={`url(#${p}-deniz)`} />
          {[78, 82, 87, 93, 100, 108].map((y, i) => (
            <rect
              key={y}
              x={60 - (14 - i * 1.5)}
              y={y}
              width={(14 - i * 1.5) * 2}
              height="1.2"
              rx="0.6"
              fill="#ffe2a8"
              opacity={0.85 - i * 0.12}
            />
          ))}
          <path
            d="M0,74 H120"
            stroke="#fff"
            strokeOpacity="0.4"
            strokeWidth="0.5"
          />
          <g fill="#1d2440">
            <path d="M88,70 L88,52 L99,70z" />
            <path d="M87,70 L87,56 L80,70z" opacity="0.85" />
            <path d="M78,71 H102 L98,75 H82z" />
          </g>
          <path
            d="M8,34 q4,-3 8,0 q4,-3 8,0"
            fill="none"
            stroke="#1d2440"
            strokeWidth="0.8"
          />
          <path
            d="M26,24 q3,-2 6,0 q3,-2 6,0"
            fill="none"
            stroke="#1d2440"
            strokeWidth="0.7"
          />
        </>
      );
    case "sonbahar":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-gok`}
              stops={[
                [0, "#f2c98c"],
                [1, "#f6ecdf"],
              ]}
            />
            <RGrad
              id={`${p}-tac`}
              cx={0.4}
              cy={0.35}
              r={0.7}
              stops={[
                [0, "#f7b046"],
                [0.6, "#dd6b25"],
                [1, "#a8401a"],
              ]}
            />
            <Grad
              id={`${p}-tepe1`}
              stops={[
                [0, "#d9894a"],
                [1, "#b8622c"],
              ]}
            />
            <Grad
              id={`${p}-tepe2`}
              stops={[
                [0, "#a9502a"],
                [1, "#7c3a1f"],
              ]}
            />
          </defs>
          <Gok id={`${p}-gok`} />
          <path
            d="M0,70 Q30,58 60,66 T120,60 V120 H0z"
            fill={`url(#${p}-tepe1)`}
            opacity="0.55"
          />
          <path
            d="M0,86 Q40,72 80,82 T120,78 V120 H0z"
            fill={`url(#${p}-tepe1)`}
          />
          <path d="M0,100 Q50,92 120,100 V120 H0z" fill={`url(#${p}-tepe2)`} />
          <path
            d="M44,100 C46,84 44,72 40,62 M44,84 C50,76 56,72 62,70 M43,76 C38,70 32,68 28,68"
            fill="none"
            stroke="#3f2a1c"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="42" cy="50" r="22" fill={`url(#${p}-tac)`} />
          <circle cx="26" cy="60" r="12" fill={`url(#${p}-tac)`} />
          <circle cx="60" cy="58" r="13" fill={`url(#${p}-tac)`} />
          {[
            [80, 40, 30, "#d9622b"],
            [96, 58, -20, "#e8a33a"],
            [74, 76, 60, "#b8452b"],
            [104, 30, 10, "#c8541f"],
          ].map(([x, y, r, f]) => (
            <path
              key={`${x}`}
              transform={`translate(${x} ${y}) rotate(${r}) scale(0.35)`}
              d="M0,-20 L4,-10 L12,-14 L10,-4 L20,-2 L10,4 L14,12 L4,10 L0,20 L-4,10 L-14,12 L-10,4 L-20,-2 L-10,-4 L-12,-14 L-4,-10z"
              fill={f as string}
            />
          ))}
        </>
      );
    case "kis":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-gok`}
              stops={[
                [0, "#1c2f52"],
                [1, "#6d8fb5"],
              ]}
            />
            <Grad
              id={`${p}-dag`}
              x2={1}
              y2={1}
              stops={[
                [0, "#f5f8fb"],
                [0.6, "#c9d7e6"],
                [1, "#8ea5c0"],
              ]}
            />
            <Grad
              id={`${p}-kar`}
              stops={[
                [0, "#f3f7fb"],
                [1, "#d3e0ec"],
              ]}
            />
          </defs>
          <Gok id={`${p}-gok`} />
          <Yildizlar seed={11} n={60} maxY={110} />
          <polygon
            points="-6,90 34,36 56,66 76,40 126,92"
            fill={`url(#${p}-dag)`}
          />
          <polygon points="34,36 42,47 36,45 30,50 26,47" fill="#fff" />
          <polygon points="76,40 86,52 79,50 72,55 68,50" fill="#fff" />
          <path d="M0,96 Q60,80 120,94 V120 H0z" fill={`url(#${p}-kar)`} />
          <Cam x={24} y={62} h={36} kar />
          <Cam x={38} y={72} h={28} kar />
          <Cam x={96} y={66} h={32} kar />
        </>
      );
    case "yilbasi":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-gok`}
              stops={[
                [0, "#070b1f"],
                [1, "#27315c"],
              ]}
            />
            <Grad
              id={`${p}-su`}
              stops={[
                [0, "#1b2448"],
                [1, "#0a0f24"],
              ]}
            />
          </defs>
          <Gok id={`${p}-gok`} />
          <Yildizlar seed={5} n={30} maxY={60} />
          <HavaiFisek cx={34} cy={30} r={18} renk="#ffcc4d" />
          <HavaiFisek cx={84} cy={24} r={15} renk="#ff5d73" />
          <HavaiFisek cx={66} cy={50} r={11} renk="#6fd3e0" />
          {/* İstanbul silüeti: Galata Kulesi ve cami kubbeleri */}
          <g fill="#0c1024">
            <rect x="14" y="66" width="8" height="26" />
            <polygon points="13,66 18,54 23,66" />
            <rect x="12.5" y="68" width="11" height="2" />
            <rect x="0" y="82" width="36" height="12" />
            <path d="M60,82 A14,14 0 0 1 88,82z" />
            <rect x="56" y="82" width="36" height="12" />
            <rect x="52" y="60" width="2.4" height="34" />
            <polygon points="52,60 53.2,52 54.4,60" />
            <rect x="94" y="62" width="2.4" height="32" />
            <polygon points="94,62 95.2,54 96.4,62" />
            <path d="M40,90 A7,7 0 0 1 54,90z" />
            <rect x="36" y="88" width="84" height="6" />
          </g>
          <rect y="94" width="120" height="26" fill={`url(#${p}-su)`} />
          {[
            [34, 98],
            [84, 100],
            [18, 104],
            [70, 106],
          ].map(([x, y]) => (
            <rect
              key={`${x}`}
              x={x - 6}
              y={y}
              width="12"
              height="0.8"
              rx="0.4"
              fill="#ffcc4d"
              opacity="0.5"
            />
          ))}
        </>
      );
    case "cemre":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-gok`}
              stops={[
                [0, "#9cc4e4"],
                [0.7, "#e9eef0"],
                [1, "#f7efe0"],
              ]}
            />
            <RGrad
              id={`${p}-gunes`}
              stops={[
                [0, "#fffbe8"],
                [0.35, "#ffe9a8", 0.8],
                [1, "#ffe9a8", 0],
              ]}
            />
            <Grad
              id={`${p}-kar`}
              stops={[
                [0, "#f6f9fb"],
                [1, "#d7e2ea"],
              ]}
            />
            <Grad
              id={`${p}-su`}
              x2={1}
              y2={0}
              stops={[
                [0, "#6f9fc4"],
                [0.5, "#a9cbe3"],
                [1, "#6f9fc4"],
              ]}
            />
          </defs>
          <Gok id={`${p}-gok`} />
          <circle cx="86" cy="28" r="30" fill={`url(#${p}-gunes)`} />
          <g stroke="#fff3c4" strokeWidth="1.2" opacity="0.55">
            <line x1="86" y1="28" x2="40" y2="92" />
            <line x1="86" y1="28" x2="62" y2="100" />
            <line x1="86" y1="28" x2="20" y2="74" />
          </g>
          <path
            d="M0,70 Q30,62 60,68 T120,64 V120 H0z"
            fill="#a9b8a0"
            opacity="0.6"
          />
          <path d="M0,82 Q40,74 120,80 V120 H0z" fill={`url(#${p}-kar)`} />
          {[
            [18, 90, 10],
            [80, 88, 12],
            [50, 104, 9],
            [100, 106, 8],
          ].map(([x, y, r]) => (
            <ellipse
              key={x}
              cx={x}
              cy={y}
              rx={r}
              ry={r * 0.35}
              fill="#8fae6b"
            />
          ))}
          <path
            d="M-4,112 C30,98 50,108 70,96 C84,88 100,90 124,84 L124,92 C104,96 90,96 76,104 C56,116 32,108 -4,120z"
            fill={`url(#${p}-su)`}
          />
          {[
            [26, 108],
            [60, 104],
            [96, 92],
          ].map(([x, y]) => (
            <path key={x} d={`M${x},${y} l6,-2 l5,1 l-3,2z`} fill="#f4f8fb" />
          ))}
          <path
            d="M30,84 C30,70 28,58 22,46 M28,64 C34,58 38,54 44,52 M29,72 C24,68 18,66 14,66 M24,52 C20,46 20,40 22,36"
            fill="none"
            stroke="#4a3527"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {[
            [44, 52],
            [22, 36],
            [14, 66],
            [36, 55],
          ].map(([x, y]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r="1.6" fill="#8fc26a" />
          ))}
        </>
      );
    case "hidirellez":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-gok`}
              stops={[
                [0, "#2b2350"],
                [0.6, "#7a4b78"],
                [1, "#e0916e"],
              ]}
            />
            <RGrad
              id={`${p}-ates`}
              cy={0.7}
              stops={[
                [0, "#ffb347", 0.8],
                [1, "#ffb347", 0],
              ]}
            />
            <RGrad
              id={`${p}-cali`}
              cx={0.4}
              cy={0.35}
              r={0.7}
              stops={[
                [0, "#3f7a3a"],
                [1, "#1f3d22"],
              ]}
            />
            <Grad
              id={`${p}-alev`}
              stops={[
                [0, "#fff1b0"],
                [0.5, "#ffb238"],
                [1, "#e0521c"],
              ]}
            />
          </defs>
          <Gok id={`${p}-gok`} />
          <Yildizlar seed={19} n={20} maxY={40} />
          <path d="M0,96 Q60,88 120,96 V120 H0z" fill="#2a1f2a" />
          {/* dilek gül ağacı */}
          <path
            d="M42,100 C42,88 40,80 36,72"
            stroke="#3b2a1e"
            strokeWidth="3"
            fill="none"
          />
          <circle cx="36" cy="58" r="22" fill={`url(#${p}-cali)`} />
          <circle cx="22" cy="68" r="11" fill={`url(#${p}-cali)`} />
          <circle cx="52" cy="66" r="12" fill={`url(#${p}-cali)`} />
          {[
            [26, 50],
            [40, 44],
            [48, 58],
            [30, 64],
            [18, 70],
            [54, 70],
            [38, 56],
          ].map(([x, y]) => (
            <g key={`${x}${y}`}>
              <circle cx={x} cy={y} r="2.6" fill="#d6284a" />
              <circle cx={x - 0.6} cy={y - 0.6} r="1.1" fill="#f16a82" />
            </g>
          ))}
          {[
            [30, 72, "#e30a17"],
            [44, 76, "#f2f2f2"],
            [22, 78, "#e30a17"],
            [52, 80, "#f7c948"],
          ].map(([x, y, c]) => (
            <path
              key={`${x}`}
              d={`M${x},${(y as number) - 4} q2,5 -1,11 l2,0 q2,-6 0,-11z`}
              fill={c as string}
            />
          ))}
          {/* ateş */}
          <circle cx="88" cy="90" r="24" fill={`url(#${p}-ates)`} />
          <path
            d="M88,64 C96,74 100,82 96,92 C93,99 83,99 80,92 C77,84 84,78 86,72 C87,78 89,80 90,80 C91,74 90,70 88,64z"
            fill={`url(#${p}-alev)`}
          />
          <g stroke="#4a2c1a" strokeWidth="3.5" strokeLinecap="round">
            <line x1="76" y1="100" x2="100" y2="94" />
            <line x1="76" y1="94" x2="100" y2="100" />
          </g>
        </>
      );
    case "polis":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-gok`}
              stops={[
                [0, "#0c1426"],
                [1, "#1d2b45"],
              ]}
            />
            <RGrad
              id={`${p}-mavi`}
              stops={[
                [0, "#6fb6ff", 0.9],
                [1, "#1f6fd1", 0],
              ]}
            />
            <RGrad
              id={`${p}-kirmizi`}
              stops={[
                [0, "#ff7a7a", 0.9],
                [1, "#d11f2f", 0],
              ]}
            />
            <Grad
              id={`${p}-kasa`}
              stops={[
                [0, "#e9eef4"],
                [1, "#9aa6b4"],
              ]}
            />
            <Grad
              id={`${p}-cam`}
              stops={[
                [0, "#2c3e5c"],
                [1, "#101a2c"],
              ]}
            />
          </defs>
          <Gok id={`${p}-gok`} />
          <circle cx="40" cy="52" r="34" fill={`url(#${p}-mavi)`} />
          <circle cx="80" cy="52" r="34" fill={`url(#${p}-kirmizi)`} />
          <path d="M0,104 H120 V120 H0z" fill="#0a0f1c" />
          {/* ekip aracı */}
          <path
            d="M8,98 C8,88 14,84 24,82 L36,66 C38,63 42,62 46,62 H78 C82,62 85,63 87,66 L98,82 C108,84 112,88 112,98 Z"
            fill={`url(#${p}-kasa)`}
          />
          <path
            d="M40,68 H58 V82 H30z M62,68 H80 L90,82 H62z"
            fill={`url(#${p}-cam)`}
          />
          <rect x="8" y="88" width="104" height="6" fill="#1f5fbf" />
          <rect x="44" y="56" width="32" height="6" rx="2" fill="#20242c" />
          <rect x="46" y="57" width="13" height="4" rx="1.5" fill="#5aa9ff" />
          <rect x="61" y="57" width="13" height="4" rx="1.5" fill="#ff5a5a" />
          <circle cx="30" cy="100" r="9" fill="#15181e" />
          <circle cx="30" cy="100" r="4" fill="#8a929c" />
          <circle cx="90" cy="100" r="9" fill="#15181e" />
          <circle cx="90" cy="100" r="4" fill="#8a929c" />
          <text
            x="60"
            y="93"
            textAnchor="middle"
            fontSize="5"
            fontWeight="700"
            fill="#fff"
            fontFamily="system-ui, sans-serif"
            letterSpacing="1"
          >
            POLİS
          </text>
        </>
      );
    case "orman":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-gok`}
              stops={[
                [0, "#8ec5e8"],
                [1, "#eaf5f8"],
              ]}
            />
            <Grad
              id={`${p}-dag`}
              stops={[
                [0, "#7b9fb8"],
                [1, "#a9c3d2"],
              ]}
            />
            <Grad
              id={`${p}-gol`}
              stops={[
                [0, "#5f95b5"],
                [1, "#2f5f7e"],
              ]}
            />
          </defs>
          <Gok id={`${p}-gok`} />
          <circle cx="88" cy="26" r="9" fill="#fff4c4" />
          <polygon
            points="-4,70 30,34 52,56 76,30 124,72"
            fill={`url(#${p}-dag)`}
          />
          <path d="M0,72 Q60,64 120,72 V80 H0z" fill="#4f8a55" />
          <rect y="78" width="120" height="42" fill={`url(#${p}-gol)`} />
          {[80, 86, 94].map((y, i) => (
            <line
              key={y}
              x1={20 + i * 10}
              y1={y}
              x2={50 + i * 12}
              y2={y}
              stroke="#fff"
              strokeOpacity="0.35"
              strokeWidth="0.8"
            />
          ))}
          <g opacity="0.35" transform="translate(0 156) scale(1 -1)">
            <Cam x={14} y={50} h={30} />
            <Cam x={104} y={48} h={32} />
          </g>
          <Cam x={14} y={48} h={32} />
          <Cam x={26} y={56} h={24} />
          <Cam x={104} y={46} h={34} />
          <Cam x={92} y={56} h={24} />
        </>
      );
    case "firtina":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-gok`}
              stops={[
                [0, "#1a2130"],
                [0.6, "#3a4658"],
                [1, "#56637a"],
              ]}
            />
            <Grad
              id={`${p}-deniz`}
              stops={[
                [0, "#2d4a5e"],
                [1, "#122433"],
              ]}
            />
            <Grad
              id={`${p}-dalga`}
              stops={[
                [0, "#6f95a8"],
                [1, "#2d4a5e"],
              ]}
            />
            <Grad
              id={`${p}-isik`}
              x2={1}
              y2={0}
              stops={[
                [0, "#fff3b0", 0.7],
                [1, "#fff3b0", 0],
              ]}
            />
          </defs>
          <Gok id={`${p}-gok`} />
          {[
            [20, 22, 26],
            [60, 16, 30],
            [100, 26, 24],
          ].map(([x, y, r]) => (
            <ellipse
              key={x}
              cx={x}
              cy={y}
              rx={r}
              ry={r * 0.4}
              fill="#0f141e"
              opacity="0.6"
            />
          ))}
          <polygon
            points="36,24 28,46 34,46 26,66 44,40 37,40 44,24"
            fill="#fff6c4"
          />
          <polygon
            points="98,58 20,40 20,52"
            fill={`url(#${p}-isik)`}
            transform="scale(-1 1) translate(-120 0)"
          />
          {/* deniz feneri */}
          <polygon points="94,92 98,56 106,56 110,92" fill="#f2f2f2" />
          <polygon points="95.4,80 108.6,80 109.3,86 94.7,86" fill="#d6283a" />
          <polygon points="96.7,64 107.3,64 107.8,70 96.2,70" fill="#d6283a" />
          <rect x="96" y="50" width="12" height="6" fill="#fff3b0" />
          <polygon points="95,50 102,44 109,50" fill="#1f2430" />
          <rect y="80" width="120" height="40" fill={`url(#${p}-deniz)`} />
          <path
            d="M-4,96 C10,84 22,84 30,92 C36,80 50,78 58,90 C66,82 78,82 86,94 C96,86 108,86 124,94 V120 H-4z"
            fill={`url(#${p}-dalga)`}
          />
          <path
            d="M-4,96 C10,84 22,84 30,92 C36,80 50,78 58,90 C66,82 78,82 86,94 C96,86 108,86 124,94"
            fill="none"
            stroke="#e6f0f5"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M0,108 C20,102 40,106 60,102 C80,98 100,104 120,100"
            fill="none"
            stroke="#e6f0f5"
            strokeOpacity="0.5"
            strokeWidth="1"
          />
        </>
      );
    case "deutschland":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-gok`}
              stops={[
                [0, "#3d5a85"],
                [0.6, "#e59c6a"],
                [1, "#f6d09a"],
              ]}
            />
            <Grad
              id={`${p}-stein`}
              stops={[
                [0, "#e7d4ae"],
                [1, "#b89a6a"],
              ]}
            />
            <Grad
              id={`${p}-falte`}
              x2={1}
              y2={0}
              stops={[
                [0, "#000", 0.2],
                [0.3, "#fff", 0.12],
                [0.6, "#000", 0.18],
                [1, "#fff", 0.08],
              ]}
            />
            <clipPath id={`${p}-flagge`}>
              <path d="M84,16 C92,12 100,20 110,16 L110,40 C100,44 92,36 84,40z" />
            </clipPath>
          </defs>
          <Gok id={`${p}-gok`} />
          {/* Brandenburger Tor */}
          <rect x="14" y="98" width="92" height="22" fill="#6d5a45" />
          <rect x="18" y="56" width="84" height="8" fill={`url(#${p}-stein)`} />
          <rect x="16" y="52" width="88" height="5" fill="#cdb489" />
          <rect x="40" y="44" width="40" height="9" fill={`url(#${p}-stein)`} />
          <path d="M52,44 l4,-8 h8 l4,8z" fill="#3f5a4a" />
          <path
            d="M56,36 l2,-5 l2,5 M62,36 l2,-5 l2,5"
            stroke="#3f5a4a"
            strokeWidth="1.5"
            fill="none"
          />
          {Array.from({ length: 6 }, (_, i) => (
            <rect
              key={i}
              x={20 + i * 15.4}
              y="64"
              width="5"
              height="34"
              fill={`url(#${p}-stein)`}
            />
          ))}
          {Array.from({ length: 5 }, (_, i) => (
            <rect
              key={i}
              x={25 + i * 15.4}
              y="64"
              width="10.4"
              height="34"
              fill="#4a3a2a"
              opacity="0.55"
            />
          ))}
          <rect x="18" y="96" width="84" height="3" fill="#cdb489" />
          <rect x="82.6" y="12" width="1.4" height="86" fill="#5d5a55" />
          <g clipPath={`url(#${p}-flagge)`}>
            <rect x="84" y="10" width="26" height="12" fill="#111" />
            <rect x="84" y="20" width="26" height="10" fill="#dd0000" />
            <rect x="84" y="29" width="26" height="14" fill="#ffce00" />
            <rect
              x="84"
              y="10"
              width="26"
              height="34"
              fill={`url(#${p}-falte)`}
            />
          </g>
        </>
      );
    case "ostern":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-gok`}
              stops={[
                [0, "#bfe0f3"],
                [1, "#f4fbf2"],
              ]}
            />
            <Grad
              id={`${p}-gras`}
              stops={[
                [0, "#8cc466"],
                [1, "#4f8f3a"],
              ]}
            />
            <RGrad
              id={`${p}-ei1`}
              cx={0.35}
              cy={0.3}
              r={0.8}
              stops={[
                [0, "#ffe7a8"],
                [1, "#e0a322"],
              ]}
            />
            <RGrad
              id={`${p}-ei2`}
              cx={0.35}
              cy={0.3}
              r={0.8}
              stops={[
                [0, "#bfe3ff"],
                [1, "#3b7fc4"],
              ]}
            />
            <RGrad
              id={`${p}-ei3`}
              cx={0.35}
              cy={0.3}
              r={0.8}
              stops={[
                [0, "#ffc1cf"],
                [1, "#d6456b"],
              ]}
            />
          </defs>
          <Gok id={`${p}-gok`} />
          <path
            d="M16,40 C24,34 30,24 36,14"
            stroke="#6b4a32"
            strokeWidth="2"
            fill="none"
          />
          {[
            [22, 36],
            [27, 30],
            [31, 23],
            [34, 17],
          ].map(([x, y]) => (
            <ellipse
              key={y}
              cx={x + 2}
              cy={y}
              rx="3"
              ry="2"
              fill="#e9e4dc"
              stroke="#c9c2b8"
              strokeWidth="0.5"
            />
          ))}
          <path d="M0,86 Q60,74 120,86 V120 H0z" fill={`url(#${p}-gras)`} />
          <g>
            <ellipse cx="40" cy="88" rx="12" ry="16" fill={`url(#${p}-ei1)`} />
            <path
              d="M29,84 Q40,80 51,84 M29,90 Q40,94 51,90"
              stroke="#b5461f"
              strokeWidth="1.6"
              fill="none"
            />
            <ellipse cx="64" cy="84" rx="13" ry="17" fill={`url(#${p}-ei2)`} />
            {[0, 1, 2, 3, 4].map((i) => (
              <circle
                key={i}
                cx={57 + i * 3.6}
                cy={i % 2 ? 80 : 86}
                r="1.5"
                fill="#fff"
                opacity="0.9"
              />
            ))}
            <ellipse cx="88" cy="90" rx="11" ry="15" fill={`url(#${p}-ei3)`} />
            <path
              d="M78,90 l5,-5 l5,5 l5,-5 l4,4"
              stroke="#fff"
              strokeWidth="1.4"
              fill="none"
            />
          </g>
          {Array.from({ length: 18 }, (_, i) => (
            <path
              key={i}
              d={`M${6 + i * 6.4},120 q${i % 2 ? 2 : -2},-12 ${i % 3 ? 1 : 3},-${16 + (i % 4) * 3}`}
              stroke="#5a9c42"
              strokeWidth="1.6"
              fill="none"
            />
          ))}
        </>
      );
    case "weihnachten":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-gok`}
              stops={[
                [0, "#0d1733"],
                [1, "#2b3b6b"],
              ]}
            />
            <Grad
              id={`${p}-baum`}
              x2={1}
              y2={0}
              stops={[
                [0, "#1e5a38"],
                [0.5, "#2f7d4c"],
                [1, "#184a2e"],
              ]}
            />
            <RGrad
              id={`${p}-glanz`}
              stops={[
                [0, "#ffe7a3", 0.8],
                [1, "#ffe7a3", 0],
              ]}
            />
            <RGrad
              id={`${p}-rot`}
              cx={0.35}
              cy={0.3}
              r={0.8}
              stops={[
                [0, "#ff8a8a"],
                [1, "#b3122a"],
              ]}
            />
            <RGrad
              id={`${p}-gold`}
              cx={0.35}
              cy={0.3}
              r={0.8}
              stops={[
                [0, "#fff1b0"],
                [1, "#c8921c"],
              ]}
            />
          </defs>
          <Gok id={`${p}-gok`} />
          <Yildizlar seed={23} n={30} maxY={60} />
          <circle cx="60" cy="18" r="14" fill={`url(#${p}-glanz)`} />
          <path d="M0,100 Q60,92 120,100 V120 H0z" fill="#e9f0f7" />
          <rect x="56" y="92" width="8" height="12" fill="#5a3a22" />
          <polygon points="60,22 84,56 36,56" fill={`url(#${p}-baum)`} />
          <polygon points="60,36 92,76 28,76" fill={`url(#${p}-baum)`} />
          <polygon points="60,52 100,96 20,96" fill={`url(#${p}-baum)`} />
          <path
            d="M40,54 Q60,62 80,52 M34,74 Q60,84 88,72 M28,94 Q60,102 94,92"
            stroke="#f3d27a"
            strokeWidth="1"
            fill="none"
            opacity="0.8"
          />
          {[
            [50, 48, "rot"],
            [70, 64, "gold"],
            [44, 70, "gold"],
            [62, 84, "rot"],
            [82, 88, "gold"],
            [36, 90, "rot"],
            [74, 46, "rot"],
          ].map(([x, y, c]) => (
            <circle
              key={`${x}${y}`}
              cx={x}
              cy={y}
              r="3.2"
              fill={`url(#${p}-${c})`}
            />
          ))}
          <Yildiz cx={60} cy={20} r={7} fill="#ffd966" />
        </>
      );
    case "advent":
      return (
        <>
          <defs>
            <RGrad
              id={`${p}-zemin`}
              cy={0.4}
              r={0.8}
              stops={[
                [0, "#5a3522"],
                [1, "#1c0f0a"],
              ]}
            />
            <Grad
              id={`${p}-kerze`}
              x2={1}
              y2={0}
              stops={[
                [0, "#a3121f"],
                [0.5, "#e03b46"],
                [1, "#8f0f1a"],
              ]}
            />
            <RGrad
              id={`${p}-flamme`}
              cx={0.5}
              cy={0.7}
              stops={[
                [0, "#fffbe0"],
                [0.5, "#ffc24a"],
                [1, "#ff8a1f", 0],
              ]}
            />
            <RGrad
              id={`${p}-halo`}
              stops={[
                [0, "#ffc24a", 0.4],
                [1, "#ffc24a", 0],
              ]}
            />
          </defs>
          <rect width="120" height="120" fill={`url(#${p}-zemin)`} />
          <circle cx="60" cy="50" r="46" fill={`url(#${p}-halo)`} />
          <ellipse cx="60" cy="92" rx="46" ry="16" fill="#1f4d2c" />
          {Array.from({ length: 22 }, (_, i) => {
            const a = (i / 22) * 2 * Math.PI;
            return (
              <ellipse
                key={i}
                cx={60 + 42 * Math.cos(a)}
                cy={92 + 13 * Math.sin(a)}
                rx="7"
                ry="3"
                fill={i % 2 ? "#2f6b3e" : "#3d8a4f"}
                transform={`rotate(${(a * 180) / Math.PI} ${60 + 42 * Math.cos(a)} ${92 + 13 * Math.sin(a)})`}
              />
            );
          })}
          {[
            [26, 94],
            [94, 94],
            [52, 82],
            [74, 102],
          ].map(([x, y]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r="2.6" fill="#c8102e" />
          ))}
          {[
            [30, 80],
            [50, 72],
            [72, 74],
            [90, 82],
          ].map(([x, y]) => (
            <g key={x}>
              <rect
                x={x - 4}
                y={y - 26}
                width="8"
                height="26"
                rx="1"
                fill={`url(#${p}-kerze)`}
              />
              <line
                x1={x}
                y1={y - 26}
                x2={x}
                y2={y - 29}
                stroke="#222"
                strokeWidth="0.8"
              />
              <ellipse
                cx={x}
                cy={y - 33}
                rx="3"
                ry="6"
                fill={`url(#${p}-flamme)`}
              />
            </g>
          ))}
        </>
      );
    case "karneval":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-zemin`}
              stops={[
                [0, "#2a1f4d"],
                [1, "#6b2a5c"],
              ]}
            />
            <Grad
              id={`${p}-maske`}
              x2={1}
              y2={1}
              stops={[
                [0, "#fff1b0"],
                [0.5, "#e0b23a"],
                [1, "#a8741a"],
              ]}
            />
          </defs>
          <rect width="120" height="120" fill={`url(#${p}-zemin)`} />
          {Array.from({ length: 40 }, (_, i) => {
            const x = (i * 37) % 118;
            const y = (i * 53) % 116;
            const c = ["#e0243a", "#ffffff", "#ffd23a", "#3ab0ff", "#58c46a"][
              i % 5
            ];
            return (
              <rect
                key={i}
                x={x}
                y={y}
                width="3"
                height="1.6"
                fill={c}
                transform={`rotate(${i * 29} ${x} ${y})`}
              />
            );
          })}
          <path
            d="M10,20 C40,40 20,60 50,70 S 80,100 110,90"
            stroke="#e0243a"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M110,14 C80,30 100,52 70,60"
            stroke="#ffd23a"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M22,58 C30,44 48,46 60,52 C72,46 90,44 98,58 C96,70 84,76 72,70 C66,66 64,62 60,62 C56,62 54,66 48,70 C36,76 24,70 22,58z"
            fill={`url(#${p}-maske)`}
          />
          <path
            d="M34,58 C38,52 46,52 50,58 C46,62 38,62 34,58z M70,58 C74,52 82,52 86,58 C82,62 74,62 70,58z"
            fill="#2a1f4d"
          />
          <path
            d="M98,58 C104,50 110,40 108,30"
            stroke="#e0b23a"
            strokeWidth="2"
            fill="none"
          />
          <path d="M104,34 q8,-10 2,-18 q-6,8 -2,18z" fill="#e0243a" />
          <path d="M100,40 q10,-4 12,-14 q-10,2 -12,14z" fill="#ffffff" />
        </>
      );
    case "kirche":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-gok`}
              stops={[
                [0, "#9cc4e6"],
                [1, "#eef4f8"],
              ]}
            />
            <Grad
              id={`${p}-wand`}
              x2={1}
              y2={0}
              stops={[
                [0, "#f4efe6"],
                [1, "#d8cdbb"],
              ]}
            />
            <Grad
              id={`${p}-dach`}
              stops={[
                [0, "#8a3a2a"],
                [1, "#5e2418"],
              ]}
            />
          </defs>
          <Gok id={`${p}-gok`} />
          <path d="M0,92 Q40,84 80,90 T120,88 V120 H0z" fill="#8fb57a" />
          <rect x="54" y="40" width="20" height="58" fill={`url(#${p}-wand)`} />
          <polygon points="52,40 64,6 76,40" fill={`url(#${p}-dach)`} />
          <line
            x1="64"
            y1="6"
            x2="64"
            y2="0"
            stroke="#c8a24a"
            strokeWidth="1.2"
          />
          <line
            x1="61"
            y1="2"
            x2="67"
            y2="2"
            stroke="#c8a24a"
            strokeWidth="1.2"
          />
          <circle
            cx="64"
            cy="50"
            r="4.5"
            fill="#fbf7ef"
            stroke="#6b5a45"
            strokeWidth="0.8"
          />
          <path d="M60,62 q4,-6 8,0 v10 h-8z" fill="#4a5a6a" />
          <rect x="22" y="62" width="34" height="36" fill={`url(#${p}-wand)`} />
          <polygon points="18,64 38,46 58,64" fill={`url(#${p}-dach)`} />
          {[28, 42].map((x) => (
            <path key={x} d={`M${x},74 q3,-5 6,0 v12 h-6z`} fill="#4a5a6a" />
          ))}
          <path d="M60,98 v-10 q4,-5 8,0 v10z" fill="#5a3a22" />
          <g fill="#3f6b3a">
            <ellipse cx="96" cy="78" rx="12" ry="16" />
            <ellipse cx="10" cy="84" rx="9" ry="12" />
          </g>
          <rect x="95" y="90" width="2" height="8" fill="#5a3a22" />
        </>
      );
    case "laterne":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-gok`}
              stops={[
                [0, "#0c1330"],
                [1, "#2a3160"],
              ]}
            />
            <RGrad
              id={`${p}-licht`}
              stops={[
                [0, "#fff4c4", 0.9],
                [0.5, "#ffb84a", 0.5],
                [1, "#ff8a1f", 0],
              ]}
            />
            <RGrad
              id={`${p}-l1`}
              cx={0.4}
              cy={0.4}
              stops={[
                [0, "#fff4c4"],
                [1, "#f08a24"],
              ]}
            />
            <RGrad
              id={`${p}-l2`}
              cx={0.4}
              cy={0.4}
              stops={[
                [0, "#fff4c4"],
                [1, "#e0415a"],
              ]}
            />
            <RGrad
              id={`${p}-l3`}
              cx={0.4}
              cy={0.4}
              stops={[
                [0, "#fff4c4"],
                [1, "#3a8ad6"],
              ]}
            />
          </defs>
          <Gok id={`${p}-gok`} />
          <Yildizlar seed={41} n={24} maxY={50} />
          <path d="M0,104 Q60,96 120,104 V120 H0z" fill="#10152a" />
          {[
            [28, 62, "l1", "rund"],
            [62, 50, "l2", "stern"],
            [94, 66, "l3", "rund"],
          ].map(([x, y, g, f]) => (
            <g key={x as number}>
              <line
                x1={(x as number) - 10}
                y1={(y as number) + 40}
                x2={x as number}
                y2={(y as number) - 16}
                stroke="#6b4a32"
                strokeWidth="1.4"
              />
              <line
                x1={x as number}
                y1={(y as number) - 16}
                x2={x as number}
                y2={(y as number) - 11}
                stroke="#333"
                strokeWidth="0.8"
              />
              <circle
                cx={x as number}
                cy={y as number}
                r="18"
                fill={`url(#${p}-licht)`}
              />
              {f === "stern" ? (
                <Yildiz
                  cx={x as number}
                  cy={y as number}
                  r={12}
                  fill={`url(#${p}-${g})`}
                />
              ) : (
                <>
                  <ellipse
                    cx={x as number}
                    cy={y as number}
                    rx="10"
                    ry="11"
                    fill={`url(#${p}-${g})`}
                  />
                  <path
                    d={`M${(x as number) - 10},${y} h20`}
                    stroke="#fff"
                    strokeOpacity="0.4"
                    strokeWidth="0.6"
                  />
                </>
              )}
            </g>
          ))}
        </>
      );
    case "kuerbis":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-gok`}
              stops={[
                [0, "#150d2a"],
                [1, "#3a1f3f"],
              ]}
            />
            <RGrad
              id={`${p}-k`}
              cx={0.4}
              cy={0.35}
              r={0.7}
              stops={[
                [0, "#ffb347"],
                [0.7, "#e0701a"],
                [1, "#a8460f"],
              ]}
            />
            <RGrad
              id={`${p}-glut`}
              stops={[
                [0, "#fff3a0"],
                [1, "#ff9a1f"],
              ]}
            />
          </defs>
          <Gok id={`${p}-gok`} />
          <circle cx="92" cy="24" r="12" fill="#f6ecc4" />
          <circle cx="97" cy="21" r="10" fill="#150d2a" opacity="0.15" />
          <path d="M0,100 Q60,94 120,100 V120 H0z" fill="#1a1020" />
          <path
            d="M58,40 q2,-10 8,-12"
            stroke="#4f6b2a"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <ellipse cx="44" cy="72" rx="20" ry="26" fill={`url(#${p}-k)`} />
          <ellipse cx="76" cy="72" rx="20" ry="26" fill={`url(#${p}-k)`} />
          <ellipse cx="60" cy="72" rx="20" ry="28" fill={`url(#${p}-k)`} />
          <path
            d="M44,62 l8,-8 l6,10z M76,62 l-8,-8 l-6,10z"
            fill={`url(#${p}-glut)`}
          />
          <path
            d="M40,80 q20,14 40,0 l-5,2 l-3,-4 l-4,5 l-4,-5 l-4,5 l-4,-5 l-4,5 l-4,-5 l-3,4z"
            fill={`url(#${p}-glut)`}
          />
        </>
      );
    case "ernte":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-zemin`}
              stops={[
                [0, "#f6e3c2"],
                [1, "#e0c08c"],
              ]}
            />
            <Grad
              id={`${p}-tisch`}
              stops={[
                [0, "#8b5a3c"],
                [1, "#5b3822"],
              ]}
            />
            <RGrad
              id={`${p}-k`}
              cx={0.4}
              cy={0.35}
              r={0.7}
              stops={[
                [0, "#ffb347"],
                [1, "#c8621a"],
              ]}
            />
            <RGrad
              id={`${p}-apfel`}
              cx={0.35}
              cy={0.3}
              r={0.8}
              stops={[
                [0, "#ff8a7a"],
                [1, "#b3122a"],
              ]}
            />
          </defs>
          <rect width="120" height="120" fill={`url(#${p}-zemin)`} />
          {Array.from({ length: 11 }, (_, i) => {
            const a = -40 + i * 8;
            return (
              <g key={i} transform={`rotate(${a} 60 88)`}>
                <line
                  x1="60"
                  y1="88"
                  x2="60"
                  y2="22"
                  stroke="#c9a24a"
                  strokeWidth="1.4"
                />
                {[0, 1, 2, 3].map((k) => (
                  <ellipse
                    key={k}
                    cx={60 + (k % 2 ? 2 : -2)}
                    cy={24 + k * 4}
                    rx="1.8"
                    ry="3"
                    fill="#d9b252"
                  />
                ))}
              </g>
            );
          })}
          <rect x="52" y="66" width="16" height="4" fill="#8a6a2a" />
          <rect y="92" width="120" height="28" fill={`url(#${p}-tisch)`} />
          <ellipse cx="34" cy="92" rx="18" ry="13" fill={`url(#${p}-k)`} />
          <path
            d="M34,80 q1,-5 4,-6"
            stroke="#4f6b2a"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="78" cy="96" r="8" fill={`url(#${p}-apfel)`} />
          <circle cx="94" cy="98" r="7" fill={`url(#${p}-apfel)`} />
          <path
            d="M78,88 q1,-3 3,-4"
            stroke="#5a3a22"
            strokeWidth="1"
            fill="none"
          />
        </>
      );
    case "uhr":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-zemin`}
              stops={[
                [0, "#e8eef4"],
                [1, "#c9d6e2"],
              ]}
            />
            <RGrad
              id={`${p}-rand`}
              cx={0.4}
              cy={0.35}
              r={0.7}
              stops={[
                [0, "#f2f4f6"],
                [0.7, "#a9b2bc"],
                [1, "#6d7680"],
              ]}
            />
          </defs>
          <rect width="120" height="120" fill={`url(#${p}-zemin)`} />
          <circle cx="60" cy="60" r="42" fill={`url(#${p}-rand)`} />
          <circle cx="60" cy="60" r="36" fill="#fdfdfb" />
          {Array.from({ length: 12 }, (_, i) => (
            <line
              key={i}
              x1="60"
              y1="27"
              x2="60"
              y2={i % 3 ? 31 : 34}
              stroke="#2b2f36"
              strokeWidth={i % 3 ? 1.6 : 2.6}
              transform={`rotate(${i * 30} 60 60)`}
            />
          ))}
          <line
            x1="60"
            y1="60"
            x2="60"
            y2="40"
            stroke="#2b2f36"
            strokeWidth="3.4"
            strokeLinecap="round"
            transform="rotate(75 60 60)"
          />
          <line
            x1="60"
            y1="60"
            x2="60"
            y2="32"
            stroke="#2b2f36"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="60" cy="60" r="2.6" fill="#d6283a" />
          <path
            d="M92,24 A40,40 0 0 1 104,52"
            stroke="#d6283a"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <polygon points="106,58 99,50 108,48" fill="#d6283a" />
          <text
            x="98"
            y="20"
            fontSize="10"
            fontWeight="700"
            fill="#d6283a"
            fontFamily="system-ui, sans-serif"
          >
            ±1h
          </text>
        </>
      );
    case "silvester":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-gok`}
              stops={[
                [0, "#070b1f"],
                [1, "#27315c"],
              ]}
            />
            <Grad
              id={`${p}-su`}
              stops={[
                [0, "#1b2448"],
                [1, "#0a0f24"],
              ]}
            />
          </defs>
          <Gok id={`${p}-gok`} />
          <Yildizlar seed={9} n={24} maxY={50} />
          <HavaiFisek cx={30} cy={30} r={17} renk="#ffcc4d" />
          <HavaiFisek cx={88} cy={26} r={15} renk="#ff5d73" />
          <HavaiFisek cx={62} cy={48} r={10} renk="#6fd3e0" />
          {/* Berliner Fernsehturm und Stadtsilhouette */}
          <g fill="#0c1024">
            <rect x="72" y="36" width="1.6" height="14" />
            <circle cx="72.8" cy="56" r="5" />
            <rect x="71" y="60" width="3.6" height="34" />
            <rect x="0" y="84" width="30" height="10" />
            <rect x="8" y="76" width="10" height="18" />
            <path d="M34,94 v-10 a8,8 0 0 1 16,0 v10z" />
            <rect x="52" y="80" width="14" height="14" />
            <rect x="80" y="78" width="16" height="16" />
            <rect x="98" y="84" width="22" height="10" />
          </g>
          <circle cx="72.8" cy="56" r="1" fill="#ffcc4d" />
          <rect y="94" width="120" height="26" fill={`url(#${p}-su)`} />
          {[
            [30, 98],
            [88, 100],
            [62, 106],
          ].map(([x, y]) => (
            <rect
              key={x}
              x={x - 6}
              y={y}
              width="12"
              height="0.8"
              rx="0.4"
              fill="#ffcc4d"
              opacity="0.5"
            />
          ))}
        </>
      );
    case "kinder":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-gok`}
              stops={[
                [0, "#5d9fd6"],
                [1, "#e4f0f9"],
              ]}
            />
            <RGrad
              id={`${p}-b1`}
              cx={0.35}
              cy={0.3}
              r={0.8}
              stops={[
                [0, "#ff9aa8"],
                [1, "#d6283a"],
              ]}
            />
            <RGrad
              id={`${p}-b2`}
              cx={0.35}
              cy={0.3}
              r={0.8}
              stops={[
                [0, "#fff1a8"],
                [1, "#e0a322"],
              ]}
            />
            <RGrad
              id={`${p}-b3`}
              cx={0.35}
              cy={0.3}
              r={0.8}
              stops={[
                [0, "#a8f0b8"],
                [1, "#2f9e5a"],
              ]}
            />
            <RGrad
              id={`${p}-b4`}
              cx={0.35}
              cy={0.3}
              r={0.8}
              stops={[
                [0, "#b8d8ff"],
                [1, "#3a6fd6"],
              ]}
            />
          </defs>
          <Gok id={`${p}-gok`} />
          <ellipse cx="86" cy="24" rx="16" ry="5" fill="#fff" opacity="0.7" />
          <path d="M0,100 Q60,90 120,100 V120 H0z" fill="#8fc26a" />
          {[
            [34, 40, "b1"],
            [56, 30, "b2"],
            [78, 42, "b3"],
            [46, 56, "b4"],
          ].map(([x, y, g]) => (
            <g key={g as string}>
              <path
                d={`M${x},${(y as number) + 14} q-2,16 ${60 - (x as number)},${96 - (y as number)}`}
                stroke="#8a8f99"
                strokeWidth="0.8"
                fill="none"
              />
              <ellipse
                cx={x as number}
                cy={y as number}
                rx="11"
                ry="14"
                fill={`url(#${p}-${g})`}
              />
              <path
                d={`M${(x as number) - 2},${(y as number) + 13} h4 l-2,3z`}
                fill="#555"
                opacity="0.4"
              />
            </g>
          ))}
        </>
      );
    case "kerze":
      return (
        <>
          <defs>
            <RGrad
              id={`${p}-zemin`}
              cy={0.35}
              r={0.8}
              stops={[
                [0, "#3a3248"],
                [1, "#0f0c16"],
              ]}
            />
            <RGrad
              id={`${p}-halo`}
              cy={0.35}
              stops={[
                [0, "#ffd678", 0.5],
                [1, "#ffd678", 0],
              ]}
            />
            <Grad
              id={`${p}-glas`}
              x2={1}
              y2={0}
              stops={[
                [0, "#8a1c24"],
                [0.5, "#d6404a"],
                [1, "#7a141c"],
              ]}
            />
            <RGrad
              id={`${p}-flamme`}
              cx={0.5}
              cy={0.7}
              stops={[
                [0, "#fffbe0"],
                [0.5, "#ffc24a"],
                [1, "#ff8a1f", 0],
              ]}
            />
          </defs>
          <rect width="120" height="120" fill={`url(#${p}-zemin)`} />
          <circle cx="60" cy="44" r="40" fill={`url(#${p}-halo)`} />
          <path d="M0,100 Q60,94 120,100 V120 H0z" fill="#1b1622" />
          <path
            d="M44,98 L48,56 H72 L76,98z"
            fill={`url(#${p}-glas)`}
            opacity="0.92"
          />
          <rect x="46" y="52" width="28" height="5" rx="1" fill="#c8a24a" />
          <rect x="42" y="96" width="36" height="5" rx="1" fill="#c8a24a" />
          <ellipse cx="60" cy="44" rx="5" ry="10" fill={`url(#${p}-flamme)`} />
          <path
            d="M26,100 C30,90 38,88 44,92 M94,100 C90,90 82,88 76,92"
            stroke="#3f6b3a"
            strokeWidth="3"
            fill="none"
          />
        </>
      );
    case "stern":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-gok`}
              stops={[
                [0, "#0a1230"],
                [1, "#2a3a6e"],
              ]}
            />
            <RGrad
              id={`${p}-glanz`}
              stops={[
                [0, "#fff4c4", 0.9],
                [0.3, "#ffd966", 0.5],
                [1, "#ffd966", 0],
              ]}
            />
          </defs>
          <Gok id={`${p}-gok`} />
          <Yildizlar seed={17} n={40} maxY={80} />
          <circle cx="62" cy="34" r="30" fill={`url(#${p}-glanz)`} />
          <Isinlar
            cx={62}
            cy={34}
            r1={8}
            r2={26}
            n={8}
            stroke="#fff4c4"
            w={1.2}
          />
          <Yildiz cx={62} cy={34} r={10} fill="#fff1b0" />
          <path d="M62,44 L58,110 L66,110z" fill="#fff4c4" opacity="0.2" />
          <path d="M0,96 Q40,84 80,94 T120,92 V120 H0z" fill="#e9f0f7" />
          <g fill="#1a2248">
            <path d="M10,104 v-8 l6,-6 l6,6 v8z M84,104 v-10 l8,-7 l8,7 v10z M100,106 v-6 l5,-4 l5,4 v6z" />
          </g>
          <rect x="14" y="98" width="3" height="3" fill="#ffd966" />
          <rect x="90" y="97" width="3" height="3" fill="#ffd966" />
        </>
      );
    case "okul":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-gok`}
              stops={[
                [0, "#8fc1e6"],
                [1, "#e9f3fa"],
              ]}
            />
            <Grad
              id={`${p}-bina`}
              stops={[
                [0, "#f3e3c8"],
                [1, "#d9c29c"],
              ]}
            />
            <Grad
              id={`${p}-cati`}
              stops={[
                [0, "#b5472f"],
                [1, "#8a3322"],
              ]}
            />
            <Grad
              id={`${p}-cam`}
              stops={[
                [0, "#bfdcf0"],
                [1, "#7fa9c8"],
              ]}
            />
          </defs>
          <Gok id={`${p}-gok`} />
          <circle cx="98" cy="22" r="8" fill="#fff4c4" />
          {/* bayrak direği */}
          <rect x="16" y="20" width="1.6" height="78" fill="#7a7f86" />
          <Bayrak x={17.6} y={22} w={20} />
          {/* okul binası */}
          <polygon points="28,52 60,34 92,52" fill={`url(#${p}-cati)`} />
          <rect x="30" y="52" width="60" height="44" fill={`url(#${p}-bina)`} />
          <rect x="30" y="52" width="60" height="3" fill="#b99c70" />
          <circle
            cx="60"
            cy="45"
            r="5"
            fill="#fbf7ef"
            stroke="#8a3322"
            strokeWidth="1"
          />
          <line
            x1="60"
            y1="45"
            x2="60"
            y2="41.8"
            stroke="#2b2b2b"
            strokeWidth="0.8"
          />
          <line
            x1="60"
            y1="45"
            x2="62.4"
            y2="45"
            stroke="#2b2b2b"
            strokeWidth="0.8"
          />
          {[36, 48, 66, 78].map((x) =>
            [58, 72].map((y) => (
              <g key={`${x}${y}`}>
                <rect
                  x={x}
                  y={y}
                  width="7"
                  height="9"
                  fill={`url(#${p}-cam)`}
                />
                <line
                  x1={x + 3.5}
                  y1={y}
                  x2={x + 3.5}
                  y2={y + 9}
                  stroke="#f3e3c8"
                  strokeWidth="0.8"
                />
              </g>
            )),
          )}
          <rect x="55" y="80" width="10" height="16" fill="#6b4428" />
          <rect x="52" y="78" width="16" height="2" fill="#b99c70" />
          <path d="M0,96 H120 V120 H0z" fill="#9fb58a" />
          <path d="M48,96 L72,96 L84,120 L36,120z" fill="#c9bfae" />
          <Cam x={104} y={70} h={28} />
        </>
      );
    case "isci":
      return (
        <>
          <defs>
            <Grad
              id={`${p}-zemin`}
              stops={[
                [0, "#3a4250"],
                [1, "#1f242d"],
              ]}
            />
            <Grad
              id={`${p}-celik`}
              x2={1}
              y2={1}
              stops={[
                [0, "#eef1f4"],
                [0.45, "#aab2bc"],
                [1, "#5d6671"],
              ]}
            />
            <Grad
              id={`${p}-bakir`}
              x2={1}
              y2={1}
              stops={[
                [0, "#f3c38b"],
                [0.5, "#c47a3a"],
                [1, "#7a4420"],
              ]}
            />
          </defs>
          <rect width="120" height="120" fill={`url(#${p}-zemin)`} />
          <Disli cx={46} cy={52} r={26} dis={12} id={`${p}-celik`} />
          <Disli cx={86} cy={86} r={17} dis={9} id={`${p}-bakir`} />
        </>
      );
  }
}

export default function TakvimGorsel({
  gorsel,
  size = 96,
  title,
}: {
  gorsel: Gorsel;
  size?: number;
  title?: string;
}) {
  return (
    <svg
      className="takvim-gorsel"
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <clipPath id={`tg-${gorsel}-kirp`}>
          <rect width="120" height="120" rx="20" />
        </clipPath>
      </defs>
      <g clipPath={`url(#tg-${gorsel}-kirp)`}>
        <Cizim g={gorsel} />
      </g>
    </svg>
  );
}
