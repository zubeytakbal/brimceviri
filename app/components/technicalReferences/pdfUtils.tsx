"use client";

import { Fragment } from "react";
import {
  Circle,
  Document,
  Font,
  Line,
  Link,
  Page,
  Path,
  Rect,
  StyleSheet,
  Svg,
  Text,
  View,
  pdf,
} from "@react-pdf/renderer";
import type {
  TechnicalReferenceLocale,
  TechnicalReferenceSource,
} from "../../converter/technicalReferenceData";

type PdfTableSection = {
  caption: string;
  columns: string[];
  rows: string[][];
};

type PdfLineChartSection = {
  kind: "line";
  caption: string;
  xLabel: string;
  yLabel: string;
  xTicks: number[];
  yTicks: number[];
  points: Array<{
    x: number;
    y: number;
  }>;
  color: [number, number, number];
  formatX: (
    value: number,
    locale: TechnicalReferenceLocale
  ) => string;
  formatY: (
    value: number,
    locale: TechnicalReferenceLocale
  ) => string;
};

type PdfBandChartSection = {
  kind: "band";
  caption: string;
  xLabel: string;
  yLabel: string;
  xTicks: number[];
  xMin: number;
  xMax: number;
  bands: Array<{
    label: string;
    start: number;
    end: number;
    color: [number, number, number];
  }>;
};

type PdfChartSection = PdfLineChartSection | PdfBandChartSection;

type PdfVariable = {
  symbol: string;
  description: string;
};

export type TechnicalReferencePdfDefinition = {
  locale: TechnicalReferenceLocale;
  fileName: string;
  title: string;
  description?: string;
  definitionHeading?: string;
  definition?: string[];
  formulaHeading?: string;
  formulas?: string[];
  variablesHeading?: string;
  variables?: PdfVariable[];
  exampleHeading?: string;
  example?: string[];
  conditionsHeading: string;
  conditions: string[];
  tables?: PdfTableSection[];
  charts?: PdfChartSection[];
  useCasesHeading: string;
  useCases: string[];
  commonMistakesHeading: string;
  commonMistakes: string[];
  relatedLinksHeading: string;
  relatedLinks: Array<{
    label: string;
    url: string;
  }>;
  sourcesHeading: string;
  sources: ReadonlyArray<TechnicalReferenceSource>;
};

const pagePadding = 36;
const chartWidth = 520;
const chartHeight = 248;
const chartMargins = {
  top: 22,
  right: 20,
  bottom: 42,
  left: 68,
};

let fontsRegistered = false;

const styles = StyleSheet.create({
  page: {
    paddingTop: pagePadding,
    paddingRight: pagePadding,
    paddingBottom: pagePadding,
    paddingLeft: pagePadding,
    backgroundColor: "#ffffff",
    color: "#172033",
    fontFamily: "NotoSans",
    fontSize: 10.2,
    lineHeight: 1.55,
  },
  title: {
    fontSize: 17,
    fontWeight: 700,
    lineHeight: 1.25,
  },
  description: {
    marginTop: 8,
    fontSize: 10.2,
    color: "#44505f",
    lineHeight: 1.6,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    marginBottom: 7,
    paddingBottom: 4,
    borderBottomWidth: 0.7,
    borderBottomColor: "#aeb5c1",
    fontSize: 11.2,
    fontWeight: 700,
  },
  paragraph: {
    marginBottom: 5,
    lineHeight: 1.6,
  },
  bulletList: {
    marginTop: 1,
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  bulletMark: {
    width: 10,
    fontWeight: 700,
  },
  bulletText: {
    flex: 1,
    lineHeight: 1.55,
  },
  formula: {
    marginBottom: 4,
    fontSize: 10.5,
    fontWeight: 700,
  },
  variableList: {
    borderTopWidth: 0.6,
    borderTopColor: "#b8c2cc",
  },
  variableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.6,
    borderBottomColor: "#b8c2cc",
  },
  variableSymbol: {
    width: 88,
    paddingVertical: 7,
    paddingRight: 12,
    fontWeight: 700,
  },
  variableDescription: {
    flex: 1,
    paddingVertical: 7,
    lineHeight: 1.55,
  },
  chartBlock: {
    marginTop: 14,
  },
  chartCaption: {
    marginBottom: 6,
    fontSize: 10.4,
    fontWeight: 700,
  },
  chartFigure: {
    borderWidth: 0.7,
    borderColor: "#b8c2cc",
    padding: 8,
  },
  chartNote: {
    marginTop: 6,
    fontSize: 9.2,
    color: "#44505f",
  },
  tableBlock: {
    marginTop: 14,
  },
  tableCaption: {
    marginBottom: 6,
    fontSize: 10.4,
    fontWeight: 700,
  },
  table: {
    width: "100%",
    borderWidth: 0.7,
    borderColor: "#b8c2cc",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    borderRightWidth: 0.7,
    borderBottomWidth: 0.7,
    borderColor: "#b8c2cc",
    paddingVertical: 5,
    paddingHorizontal: 6,
    fontSize: 9.2,
    lineHeight: 1.45,
  },
  tableHeaderCell: {
    fontWeight: 700,
  },
  linkText: {
    color: "#0f657f",
    textDecoration: "underline",
  },
  sourceBlock: {
    marginBottom: 8,
  },
  sourceTitle: {
    marginBottom: 3,
    fontWeight: 700,
  },
  sourceMeta: {
    marginBottom: 2,
    fontSize: 9.2,
    lineHeight: 1.5,
  },
});

function registerPdfFonts() {
  if (fontsRegistered) {
    return;
  }

  const regularFontSource =
    typeof window === "undefined"
      ? `${process
          .cwd()
          .replace(/\\/g, "/")}/public/fonts/NotoSans-Regular.ttf`
      : `${window.location.origin}/fonts/NotoSans-Regular.ttf`;
  const boldFontSource =
    typeof window === "undefined"
      ? `${process
          .cwd()
          .replace(/\\/g, "/")}/public/fonts/NotoSans-Bold.ttf`
      : `${window.location.origin}/fonts/NotoSans-Bold.ttf`;

  Font.register({
    family: "NotoSans",
    fonts: [
      {
        src: regularFontSource,
        fontWeight: 400,
      },
      {
        src: boldFontSource,
        fontWeight: 700,
      },
    ],
  });
  Font.registerHyphenationCallback((word) => [word]);
  fontsRegistered = true;
}

function formatNumber(
  value: number,
  locale: TechnicalReferenceLocale,
  options?: Intl.NumberFormatOptions
) {
  return new Intl.NumberFormat(
    locale === "tr" ? "tr-TR" : "en-US",
    options
  ).format(value);
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

function rgb(color: [number, number, number]) {
  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}

function chunkRows(rows: string[][], size: number) {
  const chunks: string[][][] = [];

  for (let index = 0; index < rows.length; index += size) {
    chunks.push(rows.slice(index, index + size));
  }

  return chunks;
}

function getColumnFlexes(columnCount: number) {
  if (columnCount === 2) {
    return [1, 1];
  }

  if (columnCount === 3) {
    return [1, 1, 1.4];
  }

  if (columnCount === 5) {
    return [1.2, 0.9, 1.45, 1.05, 2];
  }

  return Array.from({ length: columnCount }, () => 1);
}

function BulletList({ items }: { items: string[] }) {
  return (
    <View style={styles.bulletList}>
      {items.map((item, index) => (
        <View key={`${index}-${item}`} style={styles.bulletItem}>
          <Text style={styles.bulletMark}>•</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function VariableTable({
  variables,
}: {
  variables: PdfVariable[];
}) {
  return (
    <View style={styles.variableList}>
      {variables.map((variable) => (
        <View key={variable.symbol} style={styles.variableRow}>
          <Text style={styles.variableSymbol}>
            {variable.symbol}
          </Text>
          <Text style={styles.variableDescription}>
            {variable.description}
          </Text>
        </View>
      ))}
    </View>
  );
}

function LineChart({
  chart,
  locale,
}: {
  chart: PdfLineChartSection;
  locale: TechnicalReferenceLocale;
}) {
  const plotWidth =
    chartWidth - chartMargins.left - chartMargins.right;
  const plotHeight =
    chartHeight - chartMargins.top - chartMargins.bottom;
  const xDomain = [...chart.points.map((point) => point.x), ...chart.xTicks];
  const yDomain = [...chart.points.map((point) => point.y), ...chart.yTicks];
  const xMin = Math.min(...xDomain);
  const xMax = Math.max(...xDomain);
  const yMin = Math.min(...yDomain);
  const yMax = Math.max(...yDomain);

  const pathData = chart.points
    .map((point, index) => {
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

      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <View style={styles.chartBlock} wrap={false}>
      <Text style={styles.chartCaption}>{chart.caption}</Text>

      <View style={styles.chartFigure}>
        <Svg width={chartWidth} height={chartHeight}>
          <Rect
            x={chartMargins.left}
            y={chartMargins.top}
            width={plotWidth}
            height={plotHeight}
            stroke="#5b6677"
            strokeWidth={1}
            fill="#ffffff"
          />

          {chart.yTicks.map((tick) => {
            const y = scaleValue(
              tick,
              yMin,
              yMax,
              chartMargins.top + plotHeight,
              chartMargins.top
            );

            return (
              <Fragment key={`${chart.caption}-y-${tick}`}>
                <Line
                  x1={chartMargins.left}
                  y1={y}
                  x2={chartMargins.left + plotWidth}
                  y2={y}
                  stroke="#e1e7ec"
                  strokeWidth={1}
                />
                <Text
                  x={chartMargins.left - 10}
                  y={y + 3}
                  style={{
                    fontFamily: "NotoSans",
                    fontSize: 9,
                    fill: "#4f5b6b",
                    textAnchor: "end",
                  }}
                >
                  {chart.formatY(tick, locale)}
                </Text>
              </Fragment>
            );
          })}

          {chart.xTicks.map((tick) => {
            const x = scaleValue(
              tick,
              xMin,
              xMax,
              chartMargins.left,
              chartMargins.left + plotWidth
            );

            return (
              <Fragment key={`${chart.caption}-x-${tick}`}>
                <Line
                  x1={x}
                  y1={chartMargins.top}
                  x2={x}
                  y2={chartMargins.top + plotHeight}
                  stroke="#e1e7ec"
                  strokeWidth={1}
                />
                <Text
                  x={x}
                  y={chartMargins.top + plotHeight + 18}
                  style={{
                    fontFamily: "NotoSans",
                    fontSize: 9,
                    fill: "#4f5b6b",
                    textAnchor: "middle",
                  }}
                >
                  {chart.formatX(tick, locale)}
                </Text>
              </Fragment>
            );
          })}

          <Path
            d={pathData}
            stroke={rgb(chart.color)}
            strokeWidth={2.2}
            fill="none"
          />

          {chart.points.map((point) => {
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
              <Circle
                key={`${chart.caption}-${point.x}-${point.y}`}
                cx={x}
                cy={y}
                r={2.6}
                fill={rgb(chart.color)}
              />
            );
          })}

          <Text
            x={20}
            y={chartMargins.top + plotHeight / 2}
            style={{
              fontFamily: "NotoSans",
              fontSize: 9.5,
              fontWeight: 700,
              fill: "#172033",
              transform: `rotate(-90, 20, ${
                chartMargins.top + plotHeight / 2
              })`,
              textAnchor: "middle",
            }}
          >
            {chart.yLabel}
          </Text>

          <Text
            x={chartMargins.left + plotWidth / 2}
            y={chartHeight - 6}
            style={{
              fontFamily: "NotoSans",
              fontSize: 9.5,
              fontWeight: 700,
              fill: "#172033",
              textAnchor: "middle",
            }}
          >
            {chart.xLabel}
          </Text>
        </Svg>
      </View>
    </View>
  );
}

function BandChart({
  chart,
  locale,
}: {
  chart: PdfBandChartSection;
  locale: TechnicalReferenceLocale;
}) {
  const plotWidth =
    chartWidth - chartMargins.left - chartMargins.right;
  const plotHeight =
    chartHeight - chartMargins.top - chartMargins.bottom;
  const bandHeight = plotHeight / chart.bands.length;

  return (
    <View style={styles.chartBlock} wrap={false}>
      <Text style={styles.chartCaption}>{chart.caption}</Text>

      <View style={styles.chartFigure}>
        <Svg width={chartWidth} height={chartHeight}>
          <Rect
            x={chartMargins.left}
            y={chartMargins.top}
            width={plotWidth}
            height={plotHeight}
            stroke="#5b6677"
            strokeWidth={1}
            fill="#ffffff"
          />

          {chart.bands.map((band, index) => {
            const y = chartMargins.top + index * bandHeight;
            const x = scaleValue(
              band.start,
              chart.xMin,
              chart.xMax,
              chartMargins.left,
              chartMargins.left + plotWidth
            );
            const width =
              scaleValue(
                band.end,
                chart.xMin,
                chart.xMax,
                chartMargins.left,
                chartMargins.left + plotWidth
              ) - x;

            return (
              <Fragment key={`${chart.caption}-${band.label}`}>
                <Rect
                  x={x}
                  y={y}
                  width={Math.max(width, 0)}
                  height={bandHeight}
                  fill={rgb(band.color)}
                />
                <Text
                  x={chartMargins.left - 10}
                  y={y + bandHeight / 2 + 3}
                  style={{
                    fontFamily: "NotoSans",
                    fontSize: 9,
                    fill: "#172033",
                    textAnchor: "end",
                  }}
                >
                  {band.label}
                </Text>
              </Fragment>
            );
          })}

          {chart.xTicks.map((tick) => {
            const x = scaleValue(
              tick,
              chart.xMin,
              chart.xMax,
              chartMargins.left,
              chartMargins.left + plotWidth
            );

            return (
              <Fragment key={`${chart.caption}-tick-${tick}`}>
                <Line
                  x1={x}
                  y1={chartMargins.top}
                  x2={x}
                  y2={chartMargins.top + plotHeight}
                  stroke="#e1e7ec"
                  strokeWidth={1}
                />
                <Text
                  x={x}
                  y={chartMargins.top + plotHeight + 18}
                  style={{
                    fontFamily: "NotoSans",
                    fontSize: 9,
                    fill: "#4f5b6b",
                    textAnchor: "middle",
                  }}
                >
                  {formatNumber(tick, locale)}
                </Text>
              </Fragment>
            );
          })}

          <Text
            x={20}
            y={chartMargins.top + plotHeight / 2}
            style={{
              fontFamily: "NotoSans",
              fontSize: 9.5,
              fontWeight: 700,
              fill: "#172033",
              transform: `rotate(-90, 20, ${
                chartMargins.top + plotHeight / 2
              })`,
              textAnchor: "middle",
            }}
          >
            {chart.yLabel}
          </Text>

          <Text
            x={chartMargins.left + plotWidth / 2}
            y={chartHeight - 6}
            style={{
              fontFamily: "NotoSans",
              fontSize: 9.5,
              fontWeight: 700,
              fill: "#172033",
              textAnchor: "middle",
            }}
          >
            {chart.xLabel}
          </Text>
        </Svg>
      </View>
    </View>
  );
}

function PdfTable({
  table,
}: {
  table: PdfTableSection;
}) {
  const rowChunks = chunkRows(table.rows, 22);
  const columnFlexes = getColumnFlexes(table.columns.length);

  return (
    <View style={styles.tableBlock}>
      {rowChunks.map((chunk, chunkIndex) => (
        <View key={`${table.caption}-${chunkIndex}`} wrap={false}>
          <Text style={styles.tableCaption}>
            {chunkIndex === 0
              ? table.caption
              : `${table.caption} (continued)`}
          </Text>

          <View style={styles.table}>
            <View style={styles.tableHeaderRow}>
              {table.columns.map((column, index) => (
                <View
                  key={`${table.caption}-head-${column}`}
                  style={[
                    styles.tableCell,
                    styles.tableHeaderCell,
                    { flexGrow: columnFlexes[index], flexBasis: 0 },
                  ]}
                >
                  <Text>{column}</Text>
                </View>
              ))}
            </View>

            {chunk.map((row, rowIndex) => (
              <View
                key={`${table.caption}-row-${chunkIndex}-${rowIndex}`}
                style={styles.tableRow}
              >
                {row.map((cell, cellIndex) => (
                  <View
                    key={`${table.caption}-${chunkIndex}-${rowIndex}-${cellIndex}`}
                    style={[
                      styles.tableCell,
                      {
                        flexGrow: columnFlexes[cellIndex],
                        flexBasis: 0,
                      },
                    ]}
                  >
                    <Text>{cell}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

function TechnicalReferencePdfDocument({
  definition,
}: {
  definition: TechnicalReferencePdfDefinition;
}) {
  const isTurkish = definition.locale === "tr";
  const sourceLabels = isTurkish
    ? {
        url: "URL",
        accessed: "Erişim",
        updated: "Güncelleme/Yayın",
        conditions: "Veri koşulu",
        notStated: "Kaynak sayfasında belirtilmedi",
      }
    : {
        url: "URL",
        accessed: "Accessed",
        updated: "Updated/Release",
        conditions: "Data condition",
        notStated: "Not stated on the source page",
      };

  return (
    <Document
      author="BirimCeviri.app"
      title={definition.title}
      language={definition.locale}
      subject={definition.description ?? definition.title}
    >
      <Page size="A4" style={styles.page} wrap>
        <Text style={styles.title}>{definition.title}</Text>
        {definition.description ? (
          <Text style={styles.description}>
            {definition.description}
          </Text>
        ) : null}

        {definition.definitionHeading &&
        definition.definition?.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {definition.definitionHeading}
            </Text>
            {definition.definition.map((paragraph) => (
              <Text key={paragraph} style={styles.paragraph}>
                {paragraph}
              </Text>
            ))}
          </View>
        ) : null}

        {definition.formulaHeading &&
        definition.formulas?.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {definition.formulaHeading}
            </Text>
            {definition.formulas.map((formula) => (
              <Text key={formula} style={styles.formula}>
                {formula}
              </Text>
            ))}
          </View>
        ) : null}

        {definition.variablesHeading &&
        definition.variables?.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {definition.variablesHeading}
            </Text>
            <VariableTable variables={definition.variables} />
          </View>
        ) : null}

        {definition.exampleHeading &&
        definition.example?.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {definition.exampleHeading}
            </Text>
            {definition.example.map((paragraph) => (
              <Text key={paragraph} style={styles.paragraph}>
                {paragraph}
              </Text>
            ))}
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {definition.conditionsHeading}
          </Text>
          <BulletList items={definition.conditions} />
        </View>

        {definition.charts?.map((chart) =>
          chart.kind === "line" ? (
            <LineChart
              chart={chart}
              key={chart.caption}
              locale={definition.locale}
            />
          ) : (
            <BandChart
              chart={chart}
              key={chart.caption}
              locale={definition.locale}
            />
          )
        )}

        {definition.tables?.map((table) => (
          <PdfTable key={table.caption} table={table} />
        ))}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {definition.useCasesHeading}
          </Text>
          <BulletList items={definition.useCases} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {definition.commonMistakesHeading}
          </Text>
          <BulletList items={definition.commonMistakes} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {definition.relatedLinksHeading}
          </Text>

          <View style={styles.bulletList}>
            {definition.relatedLinks.map((item) => (
              <View key={item.url} style={styles.bulletItem}>
                <Text style={styles.bulletMark}>•</Text>
                <Link src={item.url} style={styles.linkText}>
                  {`${item.label}: ${item.url}`}
                </Link>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {definition.sourcesHeading}
          </Text>

          {definition.sources.map((source, index) => (
            <View key={source.id} style={styles.sourceBlock}>
              <Text style={styles.sourceTitle}>
                {`${index + 1}. ${source.label}`}
              </Text>
              <Text style={styles.sourceMeta}>
                {`${sourceLabels.url}: ${source.url}`}
              </Text>
              <Text style={styles.sourceMeta}>
                {`${sourceLabels.accessed}: ${source.accessedOn}`}
              </Text>
              <Text style={styles.sourceMeta}>
                {`${sourceLabels.updated}: ${
                  source.updatedOn ?? sourceLabels.notStated
                }`}
              </Text>
              <Text style={styles.sourceMeta}>
                {`${sourceLabels.conditions}: ${
                  source.conditions[definition.locale] ?? source.conditions.en
                }`}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

function triggerBlobDownload(blob: Blob, fileName: string) {
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 0);
}

export function createTechnicalReferencePdf(
  definition: TechnicalReferencePdfDefinition
) {
  registerPdfFonts();

  return pdf(
    <TechnicalReferencePdfDocument definition={definition} />
  );
}

export async function downloadTechnicalReferencePdf(
  definition: TechnicalReferencePdfDefinition
) {
  const documentInstance =
    createTechnicalReferencePdf(definition);
  const blob = await documentInstance.toBlob();

  triggerBlobDownload(blob, definition.fileName);
}
