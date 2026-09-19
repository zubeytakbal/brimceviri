"use client";

import { useMemo, useState } from "react";

type MaterialId =
  | "mineral-wool"
  | "eps"
  | "xps"
  | "gypsum-board"
  | "softwood"
  | "brick"
  | "concrete"
  | "glass"
  | "steel"
  | "custom";

type Layer = {
  id: number;
  material: MaterialId;
  thickness: string;
  unit: "mm" | "in";
  conductivity: string;
};

const materials: Array<{ id: MaterialId; label: string; conductivity: number }> = [
  { id: "mineral-wool", label: "Mineral wool insulation", conductivity: 0.037 },
  { id: "eps", label: "EPS insulation", conductivity: 0.036 },
  { id: "xps", label: "XPS insulation", conductivity: 0.029 },
  { id: "gypsum-board", label: "Gypsum board", conductivity: 0.17 },
  { id: "softwood", label: "Softwood", conductivity: 0.12 },
  { id: "brick", label: "Brick", conductivity: 0.6 },
  { id: "concrete", label: "Normal-weight concrete", conductivity: 1.4 },
  { id: "glass", label: "Glass", conductivity: 1 },
  { id: "steel", label: "Carbon steel", conductivity: 50 },
  { id: "custom", label: "Custom conductivity", conductivity: 0 },
];

function readNumber(value: string) {
  const parsed = Number(value.trim().replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function format(value: number, digits = 3) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value);
}

function makeLayer(id: number, material: MaterialId = "mineral-wool"): Layer {
  return { id, material, thickness: "100", unit: "mm", conductivity: "0.04" };
}

export default function EnglishThermalResistanceCalculator() {
  const [layers, setLayers] = useState<Layer[]>([
    makeLayer(1, "gypsum-board"),
    makeLayer(2, "mineral-wool"),
    makeLayer(3, "brick"),
  ]);
  const [insideSurfaceResistance, setInsideSurfaceResistance] = useState("0");
  const [outsideSurfaceResistance, setOutsideSurfaceResistance] = useState("0");

  const result = useMemo(() => {
    const insideFilm = readNumber(insideSurfaceResistance);
    const outsideFilm = readNumber(outsideSurfaceResistance);
    if (insideFilm === null || outsideFilm === null || insideFilm < 0 || outsideFilm < 0) return null;

    const calculatedLayers = layers.map((layer) => {
      const thickness = readNumber(layer.thickness);
      const selected = materials.find((material) => material.id === layer.material);
      const conductivity = layer.material === "custom"
        ? readNumber(layer.conductivity)
        : selected?.conductivity ?? null;
      const thicknessMetres = thickness === null ? null : layer.unit === "in" ? thickness * 0.0254 : thickness / 1000;

      if (thicknessMetres === null || conductivity === null || thicknessMetres <= 0 || conductivity <= 0) {
        return null;
      }

      return { ...layer, conductivity, resistance: thicknessMetres / conductivity };
    });

    if (calculatedLayers.some((layer) => layer === null)) return null;

    const validLayers = calculatedLayers as Array<Layer & { conductivity: number; resistance: number }>;
    const resistance = validLayers.reduce((sum, layer) => sum + layer.resistance, 0);
    const totalResistance = resistance + insideFilm + outsideFilm;
    return { layers: validLayers, resistance, uValue: 1 / resistance, insideFilm, outsideFilm, totalResistance, assemblyUValue: 1 / totalResistance };
  }, [insideSurfaceResistance, layers, outsideSurfaceResistance]);

  function updateLayer(id: number, updates: Partial<Layer>) {
    setLayers((current) => current.map((layer) => layer.id === id ? { ...layer, ...updates } : layer));
  }

  function addLayer() {
    setLayers((current) => current.length >= 8 ? current : [...current, makeLayer(Math.max(...current.map((layer) => layer.id)) + 1)]);
  }

  function removeLayer(id: number) {
    setLayers((current) => current.length === 1 ? current : current.filter((layer) => layer.id !== id));
  }

  return (
    <div className="category-general-converter">
      <p className="calculator-usage-hint">
        Add solid material layers from inside to outside. You can optionally add surface-film resistance values from your project method or standard; no default film values are assumed.
      </p>

      <div className="engineering-calculator-card">
        <div className="calculator-section-heading">
          <h2>Construction layers</h2>
          <button type="button" className="text-link" onClick={addLayer} disabled={layers.length >= 8}>
            Add layer
          </button>
        </div>

        <div className="thermal-resistance-layers">
          {layers.map((layer, index) => (
            <fieldset className="thermal-resistance-layer" key={layer.id}>
              <legend>Layer {index + 1}</legend>
              <div className="paint-calculator-grid">
                <label className="category-general-converter-field">
                  <span>Material</span>
                  <select value={layer.material} onChange={(event) => updateLayer(layer.id, { material: event.target.value as MaterialId })}>
                    {materials.map((material) => <option key={material.id} value={material.id}>{material.label}</option>)}
                  </select>
                </label>
                <label className="category-general-converter-field">
                  <span>Thickness</span>
                  <div className="category-general-converter-input-row">
                    <input type="text" inputMode="decimal" value={layer.thickness} onChange={(event) => updateLayer(layer.id, { thickness: event.target.value })} />
                    <select value={layer.unit} onChange={(event) => updateLayer(layer.id, { unit: event.target.value as Layer["unit"] })}>
                      <option value="mm">mm</option>
                      <option value="in">in</option>
                    </select>
                  </div>
                </label>
                {layer.material === "custom" && (
                  <label className="category-general-converter-field">
                    <span>Thermal conductivity (k)</span>
                    <div className="category-general-converter-input-row">
                      <input type="text" inputMode="decimal" value={layer.conductivity} onChange={(event) => updateLayer(layer.id, { conductivity: event.target.value })} />
                      <span>W/(m·K)</span>
                    </div>
                  </label>
                )}
              </div>
              <button type="button" className="engineering-clear-button" onClick={() => removeLayer(layer.id)} disabled={layers.length === 1}>
                Remove layer
              </button>
            </fieldset>
          ))}
        </div>
      </div>

      <div className="engineering-calculator-card">
        <div className="calculator-section-heading"><div><h2>Optional surface-film resistance</h2><p className="calculator-usage-hint">Enter Rsi and Rse only when their values are defined by your applicable construction and calculation method.</p></div></div>
        <div className="paint-calculator-grid">
          <label className="category-general-converter-field"><span>Inside surface resistance (Rsi)</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={insideSurfaceResistance} onChange={(event) => setInsideSurfaceResistance(event.target.value)} /><span>m²·K/W</span></div></label>
          <label className="category-general-converter-field"><span>Outside surface resistance (Rse)</span><div className="category-general-converter-input-row"><input type="text" inputMode="decimal" value={outsideSurfaceResistance} onChange={(event) => setOutsideSurfaceResistance(event.target.value)} /><span>m²·K/W</span></div></label>
        </div>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>Enter a positive thickness and thermal conductivity for every layer.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div><span>Total thermal resistance (R)</span><strong>{format(result.resistance)} m²·K/W</strong><small>{format(result.resistance * 5.678263, 2)} h·ft²·°F/Btu</small></div>
            <div><span>Layer-only U-value</span><strong>{format(result.uValue)} W/(m²·K)</strong><small>{format(result.uValue * 0.17611, 3)} Btu/(h·ft²·°F)</small></div>
            <div><span>Surface-film resistance</span><strong>{format(result.insideFilm + result.outsideFilm)} m²·K/W</strong><small>Rsi {format(result.insideFilm)} · Rse {format(result.outsideFilm)}</small></div>
            <div><span>U-value with supplied films</span><strong>{format(result.assemblyUValue)} W/(m²·K)</strong><small>Total R {format(result.totalResistance)} m²·K/W</small></div>
          </div>
        )}
      </div>

      {result && (
        <div className="conversion-table-wrap">
          <table className="conversion-table">
            <caption>Layer resistance breakdown</caption>
            <thead><tr><th scope="col">Layer</th><th scope="col">k [W/(m·K)]</th><th scope="col">R [m²·K/W]</th></tr></thead>
            <tbody>{result.layers.map((layer, index) => <tr key={layer.id}><td>Layer {index + 1}</td><td>{format(layer.conductivity, 4)}</td><td>{format(layer.resistance, 4)}</td></tr>)}</tbody>
          </table>
        </div>
      )}

      <p className="calculator-usage-hint">
        <strong>Important:</strong> conductivity varies with grade, moisture, density, temperature and installation. A code or energy-model U-value may also require surface films, repeating thermal bridges, air cavities, fasteners and junction losses.
      </p>
    </div>
  );
}
