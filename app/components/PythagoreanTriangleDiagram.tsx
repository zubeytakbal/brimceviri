"use client";

import type { PythagoreanTarget } from "../converter/pythagoreanCalculator";

interface PythagoreanTriangleDiagramProps {
  a: number;
  b: number;
  c: number;
  highlight: PythagoreanTarget;
}

const VIEW_SIZE = 280;
const PADDING = 44;
const DRAWABLE = VIEW_SIZE - PADDING * 2;

function formatLabelNumber(value: number) {
  if (!Number.isFinite(value)) {
    return "—";
  }
  return Number(value.toFixed(4)).toLocaleString("tr-TR", {
    maximumFractionDigits: 4,
  });
}

/** a ve b kenarlarini gercek oranlarinda (buyuk olan cizim alanini
 * doldurecak sekilde) olceklendirip dik acili bir ucgen ciziyor -- cozulen
 * kenar (highlight), "cizilerek" belirir gibi bir stroke animasyonuyla
 * vurgulanir (bkz. globals.css .pythagorean-side.is-highlighted). */
export default function PythagoreanTriangleDiagram({
  a,
  b,
  c,
  highlight,
}: PythagoreanTriangleDiagramProps) {
  const maxLeg = Math.max(a, b, 1e-9);
  const scale = DRAWABLE / maxLeg;

  const rightAngle = { x: PADDING, y: VIEW_SIZE - PADDING };
  const baseVertex = { x: PADDING + a * scale, y: VIEW_SIZE - PADDING };
  const topVertex = { x: PADDING, y: VIEW_SIZE - PADDING - b * scale };

  const markSize = Math.min(16, a * scale * 0.25, b * scale * 0.25, 16);

  const baseLength = a * scale;
  const legBLength = b * scale;
  const hypotenuseLength = Math.hypot(
    baseVertex.x - topVertex.x,
    baseVertex.y - topVertex.y
  );

  const animationKey = `${a.toFixed(6)}-${b.toFixed(6)}-${c.toFixed(6)}-${highlight}`;

  return (
    <div className="pythagorean-diagram-wrap">
      <svg
        viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
        className="pythagorean-diagram"
        role="img"
        aria-label={`Kenarları a=${formatLabelNumber(a)}, b=${formatLabelNumber(b)}, c=${formatLabelNumber(c)} olan dik üçgen`}
      >
        <g key={animationKey} className="pythagorean-diagram-group">
          <path
            d={`M ${rightAngle.x} ${rightAngle.y - markSize} L ${rightAngle.x + markSize} ${rightAngle.y - markSize} L ${rightAngle.x + markSize} ${rightAngle.y}`}
            className="pythagorean-right-angle-mark"
          />

          <line
            x1={rightAngle.x}
            y1={rightAngle.y}
            x2={baseVertex.x}
            y2={baseVertex.y}
            className={`pythagorean-side${highlight === "kenar-a" ? " is-highlighted" : ""}`}
            style={
              highlight === "kenar-a"
                ? { strokeDasharray: baseLength, strokeDashoffset: baseLength }
                : undefined
            }
          />

          <line
            x1={rightAngle.x}
            y1={rightAngle.y}
            x2={topVertex.x}
            y2={topVertex.y}
            className={`pythagorean-side${highlight === "kenar-b" ? " is-highlighted" : ""}`}
            style={
              highlight === "kenar-b"
                ? { strokeDasharray: legBLength, strokeDashoffset: legBLength }
                : undefined
            }
          />

          <line
            x1={baseVertex.x}
            y1={baseVertex.y}
            x2={topVertex.x}
            y2={topVertex.y}
            className={`pythagorean-side${highlight === "hipotenus" ? " is-highlighted" : ""}`}
            style={
              highlight === "hipotenus"
                ? {
                    strokeDasharray: hypotenuseLength,
                    strokeDashoffset: hypotenuseLength,
                  }
                : undefined
            }
          />

          <text
            x={(rightAngle.x + baseVertex.x) / 2}
            y={rightAngle.y + 24}
            textAnchor="middle"
            className={`pythagorean-label${highlight === "kenar-a" ? " is-highlighted" : ""}`}
          >
            a = {formatLabelNumber(a)}
          </text>

          <text
            x={rightAngle.x - 12}
            y={(rightAngle.y + topVertex.y) / 2}
            textAnchor="end"
            className={`pythagorean-label${highlight === "kenar-b" ? " is-highlighted" : ""}`}
          >
            b = {formatLabelNumber(b)}
          </text>

          <text
            x={(baseVertex.x + topVertex.x) / 2 + 16}
            y={(baseVertex.y + topVertex.y) / 2 - 4}
            textAnchor="start"
            className={`pythagorean-label${highlight === "hipotenus" ? " is-highlighted" : ""}`}
          >
            c = {formatLabelNumber(c)}
          </text>
        </g>
      </svg>
    </div>
  );
}
