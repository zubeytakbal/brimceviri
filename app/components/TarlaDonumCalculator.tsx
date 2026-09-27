"use client";

// Tarla / arsa alani: dikdortgen, ucgen veya kosegenli dortgen.
import { useState } from "react";
import {
  areaBreakdown,
  quadrilateralArea,
  rectangleArea,
  triangleArea,
} from "../converter/tarlaAlanFormulas";
import EnglishModeToggle from "./EnglishModeToggle";
import { parseInput } from "./englishFormHelpers";

type Shape = "dikdortgen" | "dortgen" | "ucgen";

const fmt = (value: number, digits = 2) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits }).format(value);

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="category-general-converter-field">
      <span>{label}</span>
      <input inputMode="decimal" type="text" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

const num = (value: string) => parseInput(value) ?? Number.NaN;

export default function TarlaDonumCalculator() {
  const [shape, setShape] = useState<Shape>("dikdortgen");
  const [width, setWidth] = useState("40");
  const [length, setLength] = useState("75");
  const [sides, setSides] = useState(["80", "60", "90", "55"]);
  const [diagonal, setDiagonal] = useState("100");
  const [triangle, setTriangle] = useState(["60", "80", "100"]);

  const area =
    shape === "dikdortgen"
      ? rectangleArea(num(width), num(length))
      : shape === "dortgen"
        ? quadrilateralArea(num(sides[0]), num(sides[1]), num(sides[2]), num(sides[3]), num(diagonal))
        : triangleArea(num(triangle[0]), num(triangle[1]), num(triangle[2]));
  const result = area === null ? null : areaBreakdown(area);

  const updateSide = (index: number, value: string) => setSides((current) => current.map((side, i) => (i === index ? value : side)));
  const updateTriangle = (index: number, value: string) =>
    setTriangle((current) => current.map((side, i) => (i === index ? value : side)));

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <EnglishModeToggle<Shape>
          label="Tarlanın şekli"
          value={shape}
          onChange={setShape}
          options={[
            { value: "dikdortgen", label: "Dikdörtgen / kare" },
            { value: "dortgen", label: "Düzensiz dört kenar" },
            { value: "ucgen", label: "Üçgen" },
          ]}
        />
        {shape === "dikdortgen" && (
          <div className="paint-calculator-grid">
            <Field label="En (metre)" value={width} onChange={setWidth} />
            <Field label="Boy (metre)" value={length} onChange={setLength} />
          </div>
        )}
        {shape === "dortgen" && (
          <>
            <div className="paint-calculator-grid">
              <Field label="1. kenar AB (m)" value={sides[0]} onChange={(value) => updateSide(0, value)} />
              <Field label="2. kenar BC (m)" value={sides[1]} onChange={(value) => updateSide(1, value)} />
              <Field label="3. kenar CD (m)" value={sides[2]} onChange={(value) => updateSide(2, value)} />
              <Field label="4. kenar DA (m)" value={sides[3]} onChange={(value) => updateSide(3, value)} />
              <Field label="Köşegen AC (m)" value={diagonal} onChange={setDiagonal} />
            </div>
          </>
        )}
        {shape === "ucgen" && (
          <div className="paint-calculator-grid">
            <Field label="1. kenar (m)" value={triangle[0]} onChange={(value) => updateTriangle(0, value)} />
            <Field label="2. kenar (m)" value={triangle[1]} onChange={(value) => updateTriangle(1, value)} />
            <Field label="3. kenar (m)" value={triangle[2]} onChange={(value) => updateTriangle(2, value)} />
          </div>
        )}
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {result ? (
          <div className="paint-calculator-result-grid">
            <Stat label="Alan" value={`${fmt(result.m2)} m²`} />
            <Stat label="Dönüm / dekar" value={`${fmt(result.donum, 3)} dönüm`} />
            <Stat label="Eski dönüm (919,3 m²)" value={`${fmt(result.eskiDonum, 3)} eski dönüm`} />
            <Stat label="Ar" value={`${fmt(result.ar)} ar`} />
            <Stat label="Hektar" value={`${fmt(result.hektar, 4)} ha`} />
          </div>
        ) : (
          <strong>
            {shape === "dikdortgen"
              ? "En ve boyu metre olarak girin."
              : "Bu kenar uzunluklarıyla bir şekil oluşmuyor. Kenarları ve köşegeni kontrol edin (üçgenin her kenarı diğer ikisinin toplamından kısa olmalı)."}
          </strong>
        )}
      </div>

      <p className="calculator-usage-hint">
        {shape === "dortgen"
          ? "Düzensiz tarlada 4 kenarı ve karşılıklı iki köşe (A ile C) arasındaki köşegeni ölçün. Tarla iki üçgene bölünür ve her biri Heron formülüyle hesaplanır. Köşegen olmadan dört kenar tek başına alanı belirlemez."
          : shape === "ucgen"
            ? "Üç kenarı ölçün; alan Heron formülüyle hesaplanır."
            : "Dikdörtgen veya kare arazide en × boy alanı verir."}{" "}
        Sonuç yaklaşık bir ölçümdür; tapu ve satışta kadastro kaydındaki m² esas alınır.
      </p>
    </div>
  );
}
