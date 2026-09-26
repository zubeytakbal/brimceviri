"use client";

import { useMemo, useState, type PointerEvent } from "react";
import { formatRate, type FxSeriesPoint } from "../../converter/fx/fxMath";

export type FxChartLabels = {
  range30: string;
  range1y: string;
  // ekran okuyucu icin: "{pair} kurunun {range} grafiği"
  ariaTemplate: string;
  high: string;
  low: string;
  // Tarayicinin ay adlarini bilmedigi diller icin (Chrome'da "uz" -> "M01"):
  // kisa ay adlari ve "{d} {m}" / "{d} {m} {y}" sablonlari.
  manualDates?: { monthsShort: string[]; short: string; withYear: string };
};

type Props = {
  pairLabel: string;
  daily: FxSeriesPoint[];
  yearly: FxSeriesPoint[];
  numberLocale: string;
  labels: FxChartLabels;
};

const WIDTH = 640;
const HEIGHT = 240;
const PAD = { top: 16, right: 12, bottom: 28, left: 64 };

function formatDate(iso: string, numberLocale: string, withYear: boolean, manual?: FxChartLabels["manualDates"]) {
  if (manual) {
    const [year, month, day] = iso.split("-").map(Number);
    return (withYear ? manual.withYear : manual.short)
      .replace("{d}", String(day))
      .replace("{m}", manual.monthsShort[month - 1])
      .replace("{y}", String(year));
  }
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(numberLocale, {
    day: "numeric",
    month: "short",
    ...(withYear ? { year: "numeric" } : {}),
    timeZone: "UTC",
  });
}

export default function FxChart({ pairLabel, daily, yearly, numberLocale, labels }: Props) {
  const hasYearly = yearly.length >= 2;
  const [range, setRange] = useState<"30" | "1y">("30");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const series = range === "1y" && hasYearly ? yearly : daily;

  const geometry = useMemo(() => {
    const values = series.map((point) => point.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = (max - min) * 0.08 || max * 0.01;
    const low = min - padding;
    const high = max + padding;
    const innerWidth = WIDTH - PAD.left - PAD.right;
    const innerHeight = HEIGHT - PAD.top - PAD.bottom;
    const x = (index: number) => PAD.left + (series.length === 1 ? innerWidth / 2 : (index / (series.length - 1)) * innerWidth);
    const y = (value: number) => PAD.top + (1 - (value - low) / (high - low)) * innerHeight;
    const points = series.map((point, index) => ({ x: x(index), y: y(point.value) }));
    const line = points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ");
    const baseY = PAD.top + innerHeight;
    const area = points.length ? `${line} L${points[points.length - 1].x.toFixed(1)},${baseY} L${points[0].x.toFixed(1)},${baseY} Z` : "";
    const ticks = [0, 1, 2, 3].map((step) => {
      const value = low + ((high - low) * step) / 3;
      return { value, y: y(value) };
    });
    const maxIndex = values.indexOf(max);
    const minIndex = values.indexOf(min);
    return { points, line, area, ticks, maxIndex, minIndex, innerWidth };
  }, [series]);

  if (series.length < 2) return null;

  const withYear = range === "1y";
  const xLabelIndexes = [0, Math.floor((series.length - 1) / 2), series.length - 1];

  const handlePointer = (event: PointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const svgX = ((event.clientX - rect.left) / rect.width) * WIDTH;
    const ratio = (svgX - PAD.left) / geometry.innerWidth;
    const index = Math.round(ratio * (series.length - 1));
    setHoverIndex(Math.min(series.length - 1, Math.max(0, index)));
  };

  const active = hoverIndex !== null && hoverIndex < series.length ? hoverIndex : null;
  const activePoint = active !== null ? geometry.points[active] : null;
  const rangeName = range === "1y" ? labels.range1y : labels.range30;

  return (
    <div className="fx-chart">
      {hasYearly && (
        <div className="fx-chart-tabs" role="group">
          <button type="button" className={`fx-chart-tab${range === "30" ? " is-active" : ""}`} aria-pressed={range === "30"} onClick={() => { setRange("30"); setHoverIndex(null); }}>
            {labels.range30}
          </button>
          <button type="button" className={`fx-chart-tab${range === "1y" ? " is-active" : ""}`} aria-pressed={range === "1y"} onClick={() => { setRange("1y"); setHoverIndex(null); }}>
            {labels.range1y}
          </button>
        </div>
      )}

      <div className="fx-chart-frame">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role="img"
          aria-label={labels.ariaTemplate.replace("{pair}", pairLabel).replace("{range}", rangeName)}
          onPointerMove={handlePointer}
          onPointerDown={handlePointer}
          onPointerLeave={() => setHoverIndex(null)}
        >
          <defs>
            <linearGradient id="fx-chart-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#58c1c1" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#58c1c1" stopOpacity="0" />
            </linearGradient>
          </defs>

          {geometry.ticks.map((tick) => (
            <g key={tick.y}>
              <line x1={PAD.left} x2={WIDTH - PAD.right} y1={tick.y} y2={tick.y} className="fx-chart-grid" />
              <text x={PAD.left - 8} y={tick.y + 4} textAnchor="end" className="fx-chart-axis">
                {formatRate(tick.value, numberLocale)}
              </text>
            </g>
          ))}

          {xLabelIndexes.map((index, position) => (
            <text
              key={`${index}-${position}`}
              x={geometry.points[index].x}
              y={HEIGHT - 8}
              textAnchor={position === 0 ? "start" : position === 2 ? "end" : "middle"}
              className="fx-chart-axis"
            >
              {formatDate(series[index].date, numberLocale, withYear, labels.manualDates)}
            </text>
          ))}

          <path d={geometry.area} fill="url(#fx-chart-fill)" />
          <path d={geometry.line} className="fx-chart-line" />

          <circle cx={geometry.points[geometry.maxIndex].x} cy={geometry.points[geometry.maxIndex].y} r="3.5" className="fx-chart-extreme" />
          <circle cx={geometry.points[geometry.minIndex].x} cy={geometry.points[geometry.minIndex].y} r="3.5" className="fx-chart-extreme" />

          {activePoint && (
            <g>
              <line x1={activePoint.x} x2={activePoint.x} y1={PAD.top} y2={HEIGHT - PAD.bottom} className="fx-chart-cursor" />
              <circle cx={activePoint.x} cy={activePoint.y} r="5" className="fx-chart-dot" />
            </g>
          )}
        </svg>

        {active !== null && activePoint && (
          <div
            className="fx-chart-tooltip"
            style={{
              left: `${(activePoint.x / WIDTH) * 100}%`,
              transform: `translateX(${activePoint.x > WIDTH * 0.7 ? "-100%" : activePoint.x < WIDTH * 0.3 ? "0" : "-50%"})`,
            }}
          >
            <span>{formatDate(series[active].date, numberLocale, true, labels.manualDates)}</span>
            <strong>{formatRate(series[active].value, numberLocale)}</strong>
          </div>
        )}
      </div>

      <p className="fx-chart-extremes">
        <span>
          {labels.high}: <strong>{formatRate(series[geometry.maxIndex].value, numberLocale)}</strong> ({formatDate(series[geometry.maxIndex].date, numberLocale, withYear, labels.manualDates)})
        </span>
        <span>
          {labels.low}: <strong>{formatRate(series[geometry.minIndex].value, numberLocale)}</strong> ({formatDate(series[geometry.minIndex].date, numberLocale, withYear, labels.manualDates)})
        </span>
      </p>
    </div>
  );
}
