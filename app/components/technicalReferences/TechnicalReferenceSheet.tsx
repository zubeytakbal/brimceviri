"use client";

import Link from "next/link";
import type { ReactNode, SVGProps } from "react";
import type {
  TechnicalReferenceLocale,
  TechnicalReferenceSource,
} from "../../converter/technicalReferenceData";
import {
  downloadTechnicalReferencePdf,
  type TechnicalReferencePdfDefinition,
} from "./pdfUtils";

type TechnicalReferenceLink = {
  label: string;
  href: string;
};

type TechnicalReferenceVariable = {
  symbol: string;
  description: string;
};

type TechnicalReferenceSheetProps = {
  locale: TechnicalReferenceLocale;
  label: string;
  title: string;
  description?: string;
  definitionHeading?: string;
  definition?: string[];
  formulaHeading?: string;
  formulas?: string[];
  variablesHeading?: string;
  variables?: TechnicalReferenceVariable[];
  exampleHeading?: string;
  example?: string[];
  conditionsHeading: string;
  conditions: string[];
  useCasesHeading: string;
  useCases: string[];
  commonMistakesHeading: string;
  commonMistakes: string[];
  relatedLinksHeading: string;
  relatedLinks: TechnicalReferenceLink[];
  sourcesHeading: string;
  sources: ReadonlyArray<TechnicalReferenceSource>;
  pdfDefinition: TechnicalReferencePdfDefinition;
  children: ReactNode;
};

type TechnicalReferenceTableProps = {
  caption: string;
  columns: string[];
  rows: string[][];
};

type LineChartPoint = {
  x: number;
  y: number;
};

type TechnicalReferenceLineChartProps = {
  locale: TechnicalReferenceLocale;
  title: string;
  xLabel: string;
  yLabel: string;
  points: ReadonlyArray<LineChartPoint>;
  xTicks: number[];
  yTicks: number[];
  formatX: (value: number, locale: TechnicalReferenceLocale) => string;
  formatY: (value: number, locale: TechnicalReferenceLocale) => string;
  lineClassName?: string;
};

type TechnicalReferenceBandChartProps = {
  locale: TechnicalReferenceLocale;
  title: string;
  xLabel: string;
  yLabel: string;
  xMin: number;
  xMax: number;
  xTicks: number[];
  bands: Array<{
    label: string;
    start: number;
    end: number;
    className: string;
  }>;
};

const svgWidth = 720;
const svgHeight = 360;
const chartMargins = {
  top: 26,
  right: 22,
  bottom: 48,
  left: 84,
};

function formatUpdatedDate(
  locale: TechnicalReferenceLocale,
  updatedOn?: string
) {
  if (updatedOn) {
    return updatedOn;
  }

  return locale === "tr"
    ? "Kaynak sayfasında belirtilmedi"
    : "Not stated on the source page";
}

function renderText(
  value: string,
  x: number,
  y: number,
  extra?: SVGProps<SVGTextElement>
) {
  return (
    <text x={x} y={y} {...extra}>
      {value}
    </text>
  );
}

function scaleValue(
  value: number,
  domainMin: number,
  domainMax: number,
  rangeMin: number,
  rangeMax: number
) {
  if (domainMax === domainMin) {
    return rangeMin;
  }

  const ratio = (value - domainMin) / (domainMax - domainMin);

  return rangeMin + ratio * (rangeMax - rangeMin);
}

export function TechnicalReferenceTable({
  caption,
  columns,
  rows,
}: TechnicalReferenceTableProps) {
  return (
    <div className="technical-reference-table-wrap">
      <table className="technical-reference-table">
        <caption>{caption}</caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${caption}-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td key={`${caption}-${rowIndex}-${cellIndex}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TechnicalReferenceLineChart({
  locale,
  title,
  xLabel,
  yLabel,
  points,
  xTicks,
  yTicks,
  formatX,
  formatY,
  lineClassName,
}: TechnicalReferenceLineChartProps) {
  const plotWidth =
    svgWidth - chartMargins.left - chartMargins.right;
  const plotHeight =
    svgHeight - chartMargins.top - chartMargins.bottom;
  const xDomain = [...points.map((point) => point.x), ...xTicks];
  const yDomain = [...points.map((point) => point.y), ...yTicks];
  const xMin = Math.min(...xDomain);
  const xMax = Math.max(...xDomain);
  const yMin = Math.min(...yDomain);
  const yMax = Math.max(...yDomain);

  const polylinePoints = points
    .map((point) => {
      const x = scaleValue(
        point.x,
        xMin,
        xMax,
        chartMargins.left,
        chartMargins.left + plotWidth
      );
      const y = scaleValue(
        point.y,
        yMin,
        yMax,
        chartMargins.top + plotHeight,
        chartMargins.top
      );

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <figure className="technical-reference-figure">
      <svg
        className="technical-reference-chart"
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        role="img"
        aria-label={title}
      >
        <rect
          x={chartMargins.left}
          y={chartMargins.top}
          width={plotWidth}
          height={plotHeight}
          className="technical-reference-plot-border"
        />

        {yTicks.map((tick) => {
          const y = scaleValue(
            tick,
            yMin,
            yMax,
            chartMargins.top + plotHeight,
            chartMargins.top
          );

          return (
            <g key={`${title}-y-${tick}`}>
              <line
                x1={chartMargins.left}
                y1={y}
                x2={chartMargins.left + plotWidth}
                y2={y}
                className="technical-reference-grid-line"
              />
              {renderText(
                formatY(tick, locale),
                chartMargins.left - 12,
                y + 4,
                {
                  className: "technical-reference-axis-label",
                  textAnchor: "end",
                }
              )}
            </g>
          );
        })}

        {xTicks.map((tick) => {
          const x = scaleValue(
            tick,
            xMin,
            xMax,
            chartMargins.left,
            chartMargins.left + plotWidth
          );

          return (
            <g key={`${title}-x-${tick}`}>
              <line
                x1={x}
                y1={chartMargins.top}
                x2={x}
                y2={chartMargins.top + plotHeight}
                className="technical-reference-grid-line"
              />
              {renderText(
                formatX(tick, locale),
                x,
                chartMargins.top + plotHeight + 24,
                {
                  className: "technical-reference-axis-label",
                  textAnchor: "middle",
                }
              )}
            </g>
          );
        })}

        <line
          x1={chartMargins.left}
          y1={chartMargins.top + plotHeight}
          x2={chartMargins.left + plotWidth}
          y2={chartMargins.top + plotHeight}
          className="technical-reference-axis-line"
        />
        <line
          x1={chartMargins.left}
          y1={chartMargins.top}
          x2={chartMargins.left}
          y2={chartMargins.top + plotHeight}
          className="technical-reference-axis-line"
        />

        <polyline
          points={polylinePoints}
          className={
            lineClassName ?? "technical-reference-data-line"
          }
        />

        {points.map((point) => {
          const x = scaleValue(
            point.x,
            xMin,
            xMax,
            chartMargins.left,
            chartMargins.left + plotWidth
          );
          const y = scaleValue(
            point.y,
            yMin,
            yMax,
            chartMargins.top + plotHeight,
            chartMargins.top
          );

          return (
            <circle
              cx={x}
              cy={y}
              key={`${title}-${point.x}-${point.y}`}
              r="4.5"
              className="technical-reference-data-point"
            />
          );
        })}

        {renderText(
          yLabel,
          18,
          chartMargins.top + plotHeight / 2,
          {
            className: "technical-reference-axis-title",
            transform: `rotate(-90 18 ${
              chartMargins.top + plotHeight / 2
            })`,
            textAnchor: "middle",
          }
        )}
        {renderText(
          xLabel,
          chartMargins.left + plotWidth / 2,
          svgHeight - 12,
          {
            className: "technical-reference-axis-title",
            textAnchor: "middle",
          }
        )}
      </svg>

      <figcaption>{title}</figcaption>
    </figure>
  );
}

export function TechnicalReferenceBandChart({
  locale,
  title,
  xLabel,
  yLabel,
  xMin,
  xMax,
  xTicks,
  bands,
}: TechnicalReferenceBandChartProps) {
  const plotWidth =
    svgWidth - chartMargins.left - chartMargins.right;
  const plotHeight =
    svgHeight - chartMargins.top - chartMargins.bottom;
  const bandHeight = plotHeight / bands.length;

  return (
    <figure className="technical-reference-figure">
      <svg
        className="technical-reference-chart"
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        role="img"
        aria-label={title}
      >
        <rect
          x={chartMargins.left}
          y={chartMargins.top}
          width={plotWidth}
          height={plotHeight}
          className="technical-reference-plot-border"
        />

        {bands.map((band, index) => {
          const y = chartMargins.top + index * bandHeight;
          const x = scaleValue(
            band.start,
            xMin,
            xMax,
            chartMargins.left,
            chartMargins.left + plotWidth
          );
          const width =
            scaleValue(
              band.end,
              xMin,
              xMax,
              chartMargins.left,
              chartMargins.left + plotWidth
            ) - x;

          return (
            <g key={`${title}-${band.label}`}>
              <rect
                x={x}
                y={y}
                width={Math.max(width, 0)}
                height={bandHeight}
                className={band.className}
              />
              {renderText(
                band.label,
                chartMargins.left - 12,
                y + bandHeight / 2 + 4,
                {
                  className: "technical-reference-axis-label",
                  textAnchor: "end",
                }
              )}
            </g>
          );
        })}

        {xTicks.map((tick) => {
          const x = scaleValue(
            tick,
            xMin,
            xMax,
            chartMargins.left,
            chartMargins.left + plotWidth
          );

          return (
            <g key={`${title}-tick-${tick}`}>
              <line
                x1={x}
                y1={chartMargins.top}
                x2={x}
                y2={chartMargins.top + plotHeight}
                className="technical-reference-grid-line"
              />
              {renderText(
                new Intl.NumberFormat(
                  locale === "tr" ? "tr-TR" : "en-US"
                ).format(tick),
                x,
                chartMargins.top + plotHeight + 24,
                {
                  className: "technical-reference-axis-label",
                  textAnchor: "middle",
                }
              )}
            </g>
          );
        })}

        <line
          x1={chartMargins.left}
          y1={chartMargins.top + plotHeight}
          x2={chartMargins.left + plotWidth}
          y2={chartMargins.top + plotHeight}
          className="technical-reference-axis-line"
        />
        <line
          x1={chartMargins.left}
          y1={chartMargins.top}
          x2={chartMargins.left}
          y2={chartMargins.top + plotHeight}
          className="technical-reference-axis-line"
        />

        {renderText(
          yLabel,
          18,
          chartMargins.top + plotHeight / 2,
          {
            className: "technical-reference-axis-title",
            transform: `rotate(-90 18 ${
              chartMargins.top + plotHeight / 2
            })`,
            textAnchor: "middle",
          }
        )}
        {renderText(
          xLabel,
          chartMargins.left + plotWidth / 2,
          svgHeight - 12,
          {
            className: "technical-reference-axis-title",
            textAnchor: "middle",
          }
        )}
      </svg>

      <figcaption>{title}</figcaption>
    </figure>
  );
}

export default function TechnicalReferenceSheet({
  locale,
  label,
  title,
  description,
  definitionHeading,
  definition,
  formulaHeading,
  formulas,
  variablesHeading,
  variables,
  exampleHeading,
  example,
  conditionsHeading,
  conditions,
  useCasesHeading,
  useCases,
  commonMistakesHeading,
  commonMistakes,
  relatedLinksHeading,
  relatedLinks,
  sourcesHeading,
  sources,
  pdfDefinition,
  children,
}: TechnicalReferenceSheetProps) {
  const downloadLabel =
    locale === "tr" ? "PDF olarak indir" : "Download PDF";
  const updatedLabel =
    locale === "tr" ? "Güncelleme/Yayın" : "Updated/Release";
  const accessedLabel =
    locale === "tr" ? "Erişim" : "Accessed";
  const conditionsLabel =
    locale === "tr" ? "Veri koşulu" : "Data condition";

  return (
    <section className="technical-reference-sheet">
      <header className="technical-reference-header">
        <div>
          <p className="technical-reference-kicker">{label}</p>
          <h3>{title}</h3>
          {description ? <p>{description}</p> : null}
        </div>

        <button
          className="technical-reference-download"
          onClick={() =>
            void downloadTechnicalReferencePdf(pdfDefinition)
          }
          type="button"
        >
          {downloadLabel}
        </button>
      </header>

      {definitionHeading && definition?.length ? (
        <section className="technical-reference-block">
          <h4>{definitionHeading}</h4>
          {definition.map((paragraph) => (
            <p key={paragraph} className="technical-reference-copy">
              {paragraph}
            </p>
          ))}
        </section>
      ) : null}

      {formulaHeading && formulas?.length ? (
        <section className="technical-reference-block">
          <h4>{formulaHeading}</h4>
          <ul className="technical-reference-list technical-reference-formulas">
            {formulas.map((formula) => (
              <li key={formula}>{formula}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {variablesHeading && variables?.length ? (
        <section className="technical-reference-block">
          <h4>{variablesHeading}</h4>
          <dl className="technical-reference-variables">
            {variables.map((item) => (
              <div key={item.symbol}>
                <dt>{item.symbol}</dt>
                <dd>{item.description}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {exampleHeading && example?.length ? (
        <section className="technical-reference-block">
          <h4>{exampleHeading}</h4>
          {example.map((paragraph) => (
            <p key={paragraph} className="technical-reference-copy">
              {paragraph}
            </p>
          ))}
        </section>
      ) : null}

      <section className="technical-reference-block">
        <h4>{conditionsHeading}</h4>
        <ul className="technical-reference-list">
          {conditions.map((condition) => (
            <li key={condition}>{condition}</li>
          ))}
        </ul>
      </section>

      <div className="technical-reference-body">{children}</div>

      <section className="technical-reference-block">
        <h4>{useCasesHeading}</h4>
        <ul className="technical-reference-list">
          {useCases.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="technical-reference-block">
        <h4>{commonMistakesHeading}</h4>
        <ul className="technical-reference-list">
          {commonMistakes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="technical-reference-block">
        <h4>{relatedLinksHeading}</h4>
        <ul className="technical-reference-link-list">
          {relatedLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="technical-reference-block">
        <h4>{sourcesHeading}</h4>
        <ol className="technical-reference-source-list">
          {sources.map((source) => (
            <li key={source.id}>
              <strong>{source.label}</strong>
              <div className="technical-reference-source-meta">
                <span>
                  <b>URL:</b>{" "}
                  <a
                    href={source.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {source.url}
                  </a>
                </span>
                <span>
                  <b>{accessedLabel}:</b> {source.accessedOn}
                </span>
                <span>
                  <b>{updatedLabel}:</b>{" "}
                  {formatUpdatedDate(locale, source.updatedOn)}
                </span>
                <span>
                  <b>{conditionsLabel}:</b>{" "}
                  {source.conditions[locale] ?? source.conditions.en}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </section>
  );
}
