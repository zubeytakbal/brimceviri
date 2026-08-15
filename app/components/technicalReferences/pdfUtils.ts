"use client";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
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

export type TechnicalReferencePdfDefinition = {
  locale: TechnicalReferenceLocale;
  fileName: string;
  title: string;
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

type AutoTableDoc = jsPDF & {
  lastAutoTable?: {
    finalY: number;
  };
};

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

function ensurePageSpace(
  doc: jsPDF,
  cursorY: number,
  requiredHeight: number
) {
  const pageHeight = doc.internal.pageSize.getHeight();

  if (cursorY + requiredHeight > pageHeight - 14) {
    doc.addPage();
    return 16;
  }

  return cursorY;
}

function drawSectionTitle(doc: jsPDF, text: string, y: number) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(text, 14, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
}

function drawBulletList(
  doc: jsPDF,
  items: string[],
  startY: number
) {
  let cursorY = startY;

  items.forEach((item) => {
    cursorY = ensurePageSpace(doc, cursorY, 10);
    const lines = doc.splitTextToSize(item, 176);
    doc.text("\u2022", 16, cursorY);
    doc.text(lines, 21, cursorY);
    cursorY += lines.length * 4.7 + 1.5;
  });

  return cursorY;
}

function drawSourceList(
  doc: jsPDF,
  locale: TechnicalReferenceLocale,
  sources: ReadonlyArray<TechnicalReferenceSource>,
  startY: number
) {
  let cursorY = startY;
  const metaLabel =
    locale === "tr"
      ? {
          url: "URL",
          accessed: "Erişim",
          updated: "Güncelleme/Yayın",
          conditions: "Koşul",
          notStated: "Kaynak sayfasında belirtilmedi",
        }
      : {
          url: "URL",
          accessed: "Accessed",
          updated: "Updated/Release",
          conditions: "Condition",
          notStated: "Not stated on the source page",
        };

  sources.forEach((source, index) => {
    cursorY = ensurePageSpace(doc, cursorY, 24);
    doc.setFont("helvetica", "bold");
    doc.text(`${index + 1}. ${source.label}`, 14, cursorY);
    doc.setFont("helvetica", "normal");
    cursorY += 4.8;

    const urlLines = doc.splitTextToSize(
      `${metaLabel.url}: ${source.url}`,
      182
    );
    doc.text(urlLines, 16, cursorY);
    cursorY += urlLines.length * 4.4;

    doc.text(
      `${metaLabel.accessed}: ${source.accessedOn}`,
      16,
      cursorY
    );
    cursorY += 4.4;

    doc.text(
      `${metaLabel.updated}: ${
        source.updatedOn ?? metaLabel.notStated
      }`,
      16,
      cursorY
    );
    cursorY += 4.4;

    const conditionLines = doc.splitTextToSize(
      `${metaLabel.conditions}: ${source.conditions[locale]}`,
      178
    );
    doc.text(conditionLines, 16, cursorY);
    cursorY += conditionLines.length * 4.4 + 2;
  });

  return cursorY;
}

function drawLineChart(
  doc: jsPDF,
  locale: TechnicalReferenceLocale,
  chart: PdfLineChartSection,
  startY: number
) {
  const chartY = startY;
  const chartX = 18;
  const chartWidth = 172;
  const chartHeight = 76;
  const plotX = chartX + 18;
  const plotY = chartY + 10;
  const plotWidth = chartWidth - 28;
  const plotHeight = chartHeight - 20;
  const xDomain = [...chart.points.map((point) => point.x), ...chart.xTicks];
  const yDomain = [...chart.points.map((point) => point.y), ...chart.yTicks];
  const xMin = Math.min(...xDomain);
  const xMax = Math.max(...xDomain);
  const yMin = Math.min(...yDomain);
  const yMax = Math.max(...yDomain);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(chart.caption, 14, chartY);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  doc.setDrawColor(165, 173, 186);
  doc.rect(chartX, chartY + 4, chartWidth, chartHeight);

  chart.yTicks.forEach((tick) => {
    const normalized = (tick - yMin) / (yMax - yMin);
    const y = plotY + plotHeight - normalized * plotHeight;
    doc.setDrawColor(225, 229, 235);
    doc.line(plotX, y, plotX + plotWidth, y);
    doc.setTextColor(68, 78, 92);
    doc.text(chart.formatY(tick, locale), chartX + 1.5, y + 1.3);
  });

  chart.xTicks.forEach((tick) => {
    const normalized = (tick - xMin) / (xMax - xMin);
    const x = plotX + normalized * plotWidth;
    doc.setDrawColor(225, 229, 235);
    doc.line(x, plotY, x, plotY + plotHeight);
    doc.setTextColor(68, 78, 92);
    doc.text(
      chart.formatX(tick, locale),
      x - 5,
      plotY + plotHeight + 5.5
    );
  });

  doc.setDrawColor(55, 65, 81);
  doc.line(plotX, plotY, plotX, plotY + plotHeight);
  doc.line(
    plotX,
    plotY + plotHeight,
    plotX + plotWidth,
    plotY + plotHeight
  );

  doc.text(chart.yLabel, chartX + 1.5, chartY + 7.5);
  doc.text(
    chart.xLabel,
    plotX + plotWidth - 24,
    chartY + chartHeight + 2.5
  );

  doc.setDrawColor(...chart.color);
  doc.setLineWidth(0.8);

  chart.points.forEach((point, index) => {
    const normalizedX = (point.x - xMin) / (xMax - xMin);
    const normalizedY = (point.y - yMin) / (yMax - yMin);
    const x = plotX + normalizedX * plotWidth;
    const y = plotY + plotHeight - normalizedY * plotHeight;

    if (index > 0) {
      const prevPoint = chart.points[index - 1];
      const prevX =
        plotX + ((prevPoint.x - xMin) / (xMax - xMin)) * plotWidth;
      const prevY =
        plotY +
        plotHeight -
        ((prevPoint.y - yMin) / (yMax - yMin)) * plotHeight;
      doc.line(prevX, prevY, x, y);
    }

    doc.setFillColor(...chart.color);
    doc.circle(x, y, 0.85, "F");
  });

  doc.setLineWidth(0.2);

  return chartY + chartHeight + 10;
}

function drawBandChart(
  doc: jsPDF,
  locale: TechnicalReferenceLocale,
  chart: PdfBandChartSection,
  startY: number
) {
  const chartY = startY;
  const chartX = 18;
  const chartWidth = 172;
  const chartHeight = 72;
  const plotX = chartX + 18;
  const plotY = chartY + 10;
  const plotWidth = chartWidth - 28;
  const plotHeight = chartHeight - 20;
  const bandHeight = plotHeight / chart.bands.length;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(chart.caption, 14, chartY);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  doc.setDrawColor(165, 173, 186);
  doc.rect(chartX, chartY + 4, chartWidth, chartHeight);

  chart.bands.forEach((band, index) => {
    const y = plotY + index * bandHeight;
    const x =
      plotX +
      ((band.start - chart.xMin) / (chart.xMax - chart.xMin)) *
        plotWidth;
    const width =
      (((band.end - chart.xMin) / (chart.xMax - chart.xMin)) *
        plotWidth) -
      ((band.start - chart.xMin) / (chart.xMax - chart.xMin)) *
        plotWidth;

    doc.setFillColor(...band.color);
    doc.rect(x, y, width, bandHeight, "F");
    doc.setTextColor(17, 24, 39);
    doc.text(band.label, chartX + 1.5, y + bandHeight / 2 + 1.3);
  });

  chart.xTicks.forEach((tick) => {
    const x =
      plotX +
      ((tick - chart.xMin) / (chart.xMax - chart.xMin)) * plotWidth;
    doc.setDrawColor(55, 65, 81);
    doc.line(x, plotY + plotHeight, x, plotY + plotHeight + 2.5);
    doc.setTextColor(68, 78, 92);
    doc.text(
      formatNumber(tick, locale),
      x - 6,
      plotY + plotHeight + 6.5
    );
  });

  doc.setTextColor(68, 78, 92);
  doc.text(chart.yLabel, chartX + 1.5, chartY + 7.5);
  doc.text(
    chart.xLabel,
    plotX + plotWidth - 30,
    chartY + chartHeight + 2.5
  );
  doc.setDrawColor(55, 65, 81);
  doc.line(
    plotX,
    plotY + plotHeight,
    plotX + plotWidth,
    plotY + plotHeight
  );

  return chartY + chartHeight + 10;
}

export async function downloadTechnicalReferencePdf(
  definition: TechnicalReferencePdfDefinition
) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  }) as AutoTableDoc;

  let cursorY = 16;

  doc.setFillColor(255, 255, 255);
  doc.rect(
    0,
    0,
    doc.internal.pageSize.getWidth(),
    doc.internal.pageSize.getHeight(),
    "F"
  );
  doc.setTextColor(17, 24, 39);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(definition.title, 14, cursorY);
  cursorY += 7;

  drawSectionTitle(doc, definition.conditionsHeading, cursorY);
  cursorY += 5.5;
  doc.setFontSize(9.5);
  cursorY = drawBulletList(doc, definition.conditions, cursorY);
  cursorY += 2;

  definition.charts?.forEach((chart) => {
    cursorY = ensurePageSpace(doc, cursorY, 92);
    cursorY =
      chart.kind === "line"
        ? drawLineChart(doc, definition.locale, chart, cursorY)
        : drawBandChart(doc, definition.locale, chart, cursorY);
  });

  definition.tables?.forEach((table) => {
    cursorY = ensurePageSpace(doc, cursorY, 34);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(table.caption, 14, cursorY);
    doc.setFont("helvetica", "normal");
    cursorY += 3;
    autoTable(doc, {
      startY: cursorY,
      head: [table.columns],
      body: table.rows,
      margin: {
        left: 14,
        right: 14,
      },
      styles: {
        font: "helvetica",
        fontSize: 8.2,
        cellPadding: 1.8,
        textColor: [17, 24, 39],
        lineColor: [186, 194, 204],
        lineWidth: 0.15,
      },
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [17, 24, 39],
        fontStyle: "bold",
        lineColor: [112, 124, 140],
        lineWidth: 0.18,
      },
      theme: "grid",
    });
    cursorY = (doc.lastAutoTable?.finalY ?? cursorY) + 6;
  });

  cursorY = ensurePageSpace(doc, cursorY, 24);
  drawSectionTitle(doc, definition.useCasesHeading, cursorY);
  cursorY += 5.5;
  cursorY = drawBulletList(doc, definition.useCases, cursorY);
  cursorY += 2;

  cursorY = ensurePageSpace(doc, cursorY, 24);
  drawSectionTitle(doc, definition.commonMistakesHeading, cursorY);
  cursorY += 5.5;
  cursorY = drawBulletList(doc, definition.commonMistakes, cursorY);
  cursorY += 2;

  cursorY = ensurePageSpace(doc, cursorY, 18);
  drawSectionTitle(doc, definition.relatedLinksHeading, cursorY);
  cursorY += 5.5;
  cursorY = drawBulletList(
    doc,
    definition.relatedLinks.map(
      (item) => `${item.label}: ${item.url}`
    ),
    cursorY
  );
  cursorY += 2;

  cursorY = ensurePageSpace(doc, cursorY, 30);
  drawSectionTitle(doc, definition.sourcesHeading, cursorY);
  cursorY += 5.5;
  drawSourceList(doc, definition.locale, definition.sources, cursorY);

  doc.save(definition.fileName);
}
