"use client";

// Ingilizce ev projesi araclari: tile, brick, laminate, paint, wallpaper.
// ABD olculeri varsayilan; "Metric" secilince alanlar metrik varsayilanlarla
// yeniden doldurulur (birim cevirisi yapilmaz, kullanici kendi olculerini girer).

import { useMemo, useState, type ReactNode } from "react";
import {
  brickEstimate,
  DOOR_AREA,
  flooringEstimate,
  LITERS_PER_US_GALLON,
  paintEstimate,
  tileEstimate,
  wallpaperEstimate,
  WINDOW_AREA,
} from "../converter/englishHomeProjectFormulas";
import EnglishModeToggle from "./EnglishModeToggle";
import { formatNumber, parseInput, type UnitSystem } from "./englishFormHelpers";

const num = (value: string) => parseInput(value) ?? NaN;

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="category-general-converter-field">
      <span>{label}</span>
      <input inputMode="decimal" type="text" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function SystemToggle({ value, onChange }: { value: UnitSystem; onChange: (value: UnitSystem) => void }) {
  return (
    <EnglishModeToggle<UnitSystem>
      label="Units"
      value={value}
      onChange={onChange}
      options={[
        { value: "us", label: "US (ft, in)" },
        { value: "metric", label: "Metric (m, cm)" },
      ]}
    />
  );
}

function Result({ children, empty }: { children: ReactNode; empty: string | null }) {
  return (
    <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
      {empty ? <strong>{empty}</strong> : <div className="paint-calculator-result-grid">{children}</div>}
    </div>
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

// ---------------- Tile ----------------
const TILE_DEFAULTS = {
  us: { area: "120", width: "12", length: "24", grout: "0.125", perBox: "8" },
  metric: { area: "11", width: "30", length: "60", grout: "0.3", perBox: "8" },
};

export function EnglishTileCalculator() {
  const [system, setSystem] = useState<UnitSystem>("us");
  const [values, setValues] = useState(TILE_DEFAULTS.us);
  const [waste, setWaste] = useState("10");
  const set = (key: keyof typeof values) => (value: string) => setValues((current) => ({ ...current, [key]: value }));
  const us = system === "us";

  const result = useMemo(
    () =>
      tileEstimate({
        area: num(values.area),
        tileWidth: num(values.width),
        tileLength: num(values.length),
        grout: num(values.grout),
        wastePercent: num(waste),
        tilesPerBox: parseInput(values.perBox) ?? undefined,
        system,
      }),
    [values, waste, system]
  );

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <SystemToggle
          value={system}
          onChange={(next) => {
            setSystem(next);
            setValues(TILE_DEFAULTS[next]);
          }}
        />
        <div className="paint-calculator-grid">
          <Field label={us ? "Area to tile (sq ft)" : "Area to tile (m²)"} value={values.area} onChange={set("area")} />
          <Field label={us ? "Tile width (in)" : "Tile width (cm)"} value={values.width} onChange={set("width")} />
          <Field label={us ? "Tile length (in)" : "Tile length (cm)"} value={values.length} onChange={set("length")} />
          <Field label={us ? "Grout joint (in)" : "Grout joint (cm)"} value={values.grout} onChange={set("grout")} />
          <Field label="Waste allowance (%)" value={waste} onChange={setWaste} />
          <Field label="Tiles per box (optional)" value={values.perBox} onChange={set("perBox")} />
        </div>
      </div>
      <Result empty={result ? null : "Enter the area and a tile size greater than 0."}>
        {result && (
          <>
            <Stat label="Tiles needed" value={`${formatNumber(result.tiles, 0)} tiles`} />
            {result.boxes !== null && <Stat label="Boxes to buy" value={`${formatNumber(result.boxes, 0)} boxes`} />}
            <Stat label="Area incl. waste" value={`${formatNumber(result.areaWithWaste, 1)} ${us ? "sq ft" : "m²"}`} />
            <Stat label="One tile covers (with grout)" value={`${formatNumber(result.tileCoverage, us ? 3 : 4)} ${us ? "sq ft" : "m²"}`} />
          </>
        )}
      </Result>
      <p className="calculator-usage-hint">
        Use 10% waste for straight layouts, 15% for diagonal or herringbone patterns and large-format tile. Buy all boxes from the same
        lot (dye lot) so the color matches.
      </p>
    </div>
  );
}

// ---------------- Brick ----------------
const BRICK_DEFAULTS = {
  us: { wall: "200", openings: "0", length: "7.625", height: "2.25", joint: "0.375" },
  metric: { wall: "20", openings: "0", length: "21.5", height: "6.5", joint: "1" },
};

export function EnglishBrickCalculator() {
  const [system, setSystem] = useState<UnitSystem>("us");
  const [values, setValues] = useState(BRICK_DEFAULTS.us);
  const [waste, setWaste] = useState("5");
  const set = (key: keyof typeof values) => (value: string) => setValues((current) => ({ ...current, [key]: value }));
  const us = system === "us";

  const result = useMemo(
    () =>
      brickEstimate({
        wallArea: num(values.wall),
        openingsArea: parseInput(values.openings) ?? 0,
        brickLength: num(values.length),
        brickHeight: num(values.height),
        joint: num(values.joint),
        wastePercent: num(waste),
        system,
      }),
    [values, waste, system]
  );

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <SystemToggle
          value={system}
          onChange={(next) => {
            setSystem(next);
            setValues(BRICK_DEFAULTS[next]);
          }}
        />
        <div className="paint-calculator-grid">
          <Field label={us ? "Wall area (sq ft)" : "Wall area (m²)"} value={values.wall} onChange={set("wall")} />
          <Field label={us ? "Doors & windows (sq ft)" : "Doors & windows (m²)"} value={values.openings} onChange={set("openings")} />
          <Field label={us ? "Brick length (in)" : "Brick length (cm)"} value={values.length} onChange={set("length")} />
          <Field label={us ? "Brick height (in)" : "Brick height (cm)"} value={values.height} onChange={set("height")} />
          <Field label={us ? "Mortar joint (in)" : "Mortar joint (cm)"} value={values.joint} onChange={set("joint")} />
          <Field label="Waste allowance (%)" value={waste} onChange={setWaste} />
        </div>
      </div>
      <Result empty={result ? null : "Enter a wall area larger than the openings and a brick size greater than 0."}>
        {result && (
          <>
            <Stat label="Bricks to buy" value={`${formatNumber(result.bricks, 0)} bricks`} />
            <Stat label={us ? "Bricks per sq ft" : "Bricks per m²"} value={formatNumber(result.bricksPerUnitArea, 2)} />
            <Stat label="Net wall area" value={`${formatNumber(result.netArea, 1)} ${us ? "sq ft" : "m²"}`} />
            <Stat label="Without waste" value={`${formatNumber(Math.ceil(result.exact), 0)} bricks`} />
          </>
        )}
      </Result>
      <p className="calculator-usage-hint">
        {us
          ? "Defaults are a US modular brick (7⅝ × 2¼ in actual size) with ⅜ in mortar joints: about 6.86 bricks per square foot of single-wythe wall."
          : "Defaults are a common 215 × 65 mm brick with 10 mm joints: about 59 bricks per square meter of single-leaf wall."}{" "}
        A double-wythe wall needs twice as many.
      </p>
    </div>
  );
}

// ---------------- Laminate / flooring ----------------
const FLOOR_DEFAULTS = { us: { area: "180", box: "22.5" }, metric: { area: "17", box: "2.1" } };

export function EnglishFlooringCalculator() {
  const [system, setSystem] = useState<UnitSystem>("us");
  const [values, setValues] = useState(FLOOR_DEFAULTS.us);
  const [waste, setWaste] = useState("10");
  const [price, setPrice] = useState("");
  const set = (key: keyof typeof values) => (value: string) => setValues((current) => ({ ...current, [key]: value }));
  const us = system === "us";
  const unit = us ? "sq ft" : "m²";

  const result = useMemo(
    () => flooringEstimate({ area: num(values.area), coveragePerBox: num(values.box), wastePercent: num(waste), pricePerBox: parseInput(price) ?? undefined }),
    [values, waste, price]
  );

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <SystemToggle
          value={system}
          onChange={(next) => {
            setSystem(next);
            setValues(FLOOR_DEFAULTS[next]);
          }}
        />
        <div className="paint-calculator-grid">
          <Field label={`Floor area (${unit})`} value={values.area} onChange={set("area")} />
          <Field label={`Coverage per box (${unit})`} value={values.box} onChange={set("box")} />
          <Field label="Waste allowance (%)" value={waste} onChange={setWaste} />
          <Field label="Price per box (optional)" value={price} onChange={setPrice} />
        </div>
      </div>
      <Result empty={result ? null : "Enter the floor area and the coverage printed on the box."}>
        {result && (
          <>
            <Stat label="Boxes to buy" value={`${formatNumber(result.boxes, 0)} boxes`} />
            <Stat label="Area incl. waste" value={`${formatNumber(result.areaWithWaste, 1)} ${unit}`} />
            <Stat label="You will buy" value={`${formatNumber(result.purchasedArea, 1)} ${unit}`} />
            <Stat label="Left over after install" value={`${formatNumber(result.leftover, 1)} ${unit}`} />
            {result.cost !== null && <Stat label="Material cost" value={new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(result.cost)} />}
          </>
        )}
      </Result>
      <p className="calculator-usage-hint">
        Use 10% waste for a simple rectangular room, 15% for rooms with many corners, closets or a diagonal layout. Keep one unopened box
        for future repairs.
      </p>
    </div>
  );
}

// ---------------- Paint ----------------
const PAINT_DEFAULTS = {
  us: { length: "12", width: "14", height: "8", coverage: "350" },
  metric: { length: "4", width: "4.5", height: "2.5", coverage: "10" },
};

export function EnglishPaintCalculator() {
  const [system, setSystem] = useState<UnitSystem>("us");
  const [values, setValues] = useState(PAINT_DEFAULTS.us);
  const [doors, setDoors] = useState("1");
  const [windows, setWindows] = useState("1");
  const [coats, setCoats] = useState<"1" | "2">("2");
  const [ceiling, setCeiling] = useState(false);
  const set = (key: keyof typeof values) => (value: string) => setValues((current) => ({ ...current, [key]: value }));
  const us = system === "us";
  const unit = us ? "sq ft" : "m²";

  const result = useMemo(
    () =>
      paintEstimate({
        length: num(values.length),
        width: num(values.width),
        height: num(values.height),
        doors: parseInput(doors) ?? 0,
        windows: parseInput(windows) ?? 0,
        coats: Number(coats),
        coverage: num(values.coverage),
        includeCeiling: ceiling,
        system,
      }),
    [values, doors, windows, coats, ceiling, system]
  );

  const purchaseText = (purchase: { gallons: number; quarts: number }) =>
    [purchase.gallons ? `${purchase.gallons} gallon${purchase.gallons === 1 ? "" : "s"}` : "", purchase.quarts ? `${purchase.quarts} quart${purchase.quarts === 1 ? "" : "s"}` : ""]
      .filter(Boolean)
      .join(" + ");

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <SystemToggle
          value={system}
          onChange={(next) => {
            setSystem(next);
            setValues(PAINT_DEFAULTS[next]);
          }}
        />
        <div className="paint-calculator-grid">
          <Field label={us ? "Room length (ft)" : "Room length (m)"} value={values.length} onChange={set("length")} />
          <Field label={us ? "Room width (ft)" : "Room width (m)"} value={values.width} onChange={set("width")} />
          <Field label={us ? "Wall height (ft)" : "Wall height (m)"} value={values.height} onChange={set("height")} />
          <Field label="Doors" value={doors} onChange={setDoors} />
          <Field label="Windows" value={windows} onChange={setWindows} />
          <Field label={us ? "Coverage (sq ft per gallon)" : "Coverage (m² per liter)"} value={values.coverage} onChange={set("coverage")} />
        </div>
        <EnglishModeToggle<"1" | "2">
          label="Coats"
          value={coats}
          onChange={setCoats}
          options={[
            { value: "1", label: "1 coat" },
            { value: "2", label: "2 coats (recommended)" },
          ]}
        />
        <EnglishModeToggle<"no" | "yes">
          label="Paint the ceiling too?"
          value={ceiling ? "yes" : "no"}
          onChange={(value) => setCeiling(value === "yes")}
          options={[
            { value: "no", label: "Walls only" },
            { value: "yes", label: "Walls + ceiling" },
          ]}
        />
      </div>
      <Result empty={result ? null : "Enter the room size, wall height and paint coverage."}>
        {result && (
          <>
            {result.purchase ? (
              <Stat label="Paint to buy" value={purchaseText(result.purchase) || "Less than 1 quart"} />
            ) : (
              <Stat label="Paint needed" value={`${formatNumber(Math.ceil(result.paint * 10) / 10, 1)} L`} />
            )}
            <Stat label="Exact amount" value={us ? `${formatNumber(result.paint, 2)} gal` : `${formatNumber(result.paint, 2)} L`} />
            <Stat label="Net wall area" value={`${formatNumber(result.netWall, 1)} ${unit}`} />
            {ceiling && <Stat label="Ceiling area" value={`${formatNumber(result.ceiling, 1)} ${unit}`} />}
            <Stat label={`Area × ${coats} coat${coats === "1" ? "" : "s"}`} value={`${formatNumber(result.paintedArea, 1)} ${unit}`} />
            {us && <Stat label="In liters" value={`${formatNumber(result.paint * LITERS_PER_US_GALLON, 1)} L`} />}
          </>
        )}
      </Result>
      <p className="calculator-usage-hint">
        Each door removes {us ? `${DOOR_AREA.us} sq ft` : `${DOOR_AREA.metric} m²`} and each window {us ? `${WINDOW_AREA.us} sq ft` : `${WINDOW_AREA.metric} m²`}.
        Check the coverage on your paint can: most interior paints cover about 350–400 sq ft per gallon (8.5–10 m² per liter) on smooth walls;
        rough, porous or dark-to-light jobs need more.
      </p>
    </div>
  );
}

// ---------------- Wallpaper ----------------
const WALLPAPER_DEFAULTS = {
  us: { length: "12", width: "14", height: "8", openings: "6", rollWidth: "20.5", rollLength: "33", repeat: "0" },
  metric: { length: "4", width: "3.5", height: "2.5", openings: "1.8", rollWidth: "53", rollLength: "10.05", repeat: "0" },
};

export function EnglishWallpaperCalculator() {
  const [system, setSystem] = useState<UnitSystem>("us");
  const [values, setValues] = useState(WALLPAPER_DEFAULTS.us);
  const set = (key: keyof typeof values) => (value: string) => setValues((current) => ({ ...current, [key]: value }));
  const us = system === "us";

  const result = useMemo(
    () =>
      wallpaperEstimate({
        length: num(values.length),
        width: num(values.width),
        height: num(values.height),
        openingsWidth: parseInput(values.openings) ?? 0,
        rollWidth: num(values.rollWidth),
        rollLength: num(values.rollLength),
        patternRepeat: parseInput(values.repeat) ?? 0,
        system,
      }),
    [values, system]
  );

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <SystemToggle
          value={system}
          onChange={(next) => {
            setSystem(next);
            setValues(WALLPAPER_DEFAULTS[next]);
          }}
        />
        <div className="paint-calculator-grid">
          <Field label={us ? "Room length (ft)" : "Room length (m)"} value={values.length} onChange={set("length")} />
          <Field label={us ? "Room width (ft)" : "Room width (m)"} value={values.width} onChange={set("width")} />
          <Field label={us ? "Wall height (ft)" : "Wall height (m)"} value={values.height} onChange={set("height")} />
          <Field label={us ? "Width of doors & windows (ft)" : "Width of doors & windows (m)"} value={values.openings} onChange={set("openings")} />
          <Field label={us ? "Roll width (in)" : "Roll width (cm)"} value={values.rollWidth} onChange={set("rollWidth")} />
          <Field label={us ? "Roll length (ft)" : "Roll length (m)"} value={values.rollLength} onChange={set("rollLength")} />
          <Field label={us ? "Pattern repeat (in)" : "Pattern repeat (cm)"} value={values.repeat} onChange={set("repeat")} />
        </div>
      </div>
      <Result empty={result ? null : "Enter the room, the roll size and a wall height shorter than the roll."}>
        {result && (
          <>
            <Stat label="Rolls to buy" value={`${formatNumber(result.rolls, 0)} ${us ? "double rolls" : "rolls"}`} />
            <Stat label="Strips needed" value={formatNumber(result.strips, 0)} />
            <Stat label="Strips per roll" value={formatNumber(result.stripsPerRoll, 0)} />
            <Stat label="Wall width to cover" value={`${formatNumber(result.wallWidth, 1)} ${us ? "ft" : "m"}`} />
          </>
        )}
      </Result>
      <p className="calculator-usage-hint">
        {us
          ? "Defaults are a US double roll (20.5 in × 33 ft, about 56 sq ft). Wallpaper sold in the US is priced per single roll but packaged as double rolls — check the label."
          : "Defaults are a standard European roll (0.53 × 10.05 m, about 5.3 m²)."}{" "}
        Buy one extra roll from the same batch for mistakes and future repairs.
      </p>
    </div>
  );
}
