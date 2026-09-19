import {
  getLewisDotPlacements,
  getValenceElectronCount,
  type LewisDotSide,
} from "../converter/lewisDotStructure";
import type { PeriodicElement } from "../converter/periodicTableData";
import { elementNamesDeBySymbol } from "../converter/periodicTableDataDe";

const DOT_COORDS: Record<LewisDotSide, { single: [number, number]; pair: [[number, number], [number, number]] }> = {
  top: { single: [50, 12], pair: [[42, 12], [58, 12]] },
  right: { single: [88, 50], pair: [[88, 42], [88, 58]] },
  bottom: { single: [50, 88], pair: [[42, 88], [58, 88]] },
  left: { single: [12, 50], pair: [[12, 42], [12, 58]] },
};

export default function ElementLewisDiagramDe({
  element,
}: {
  element: PeriodicElement;
}) {
  const valenceElectrons = getValenceElectronCount(element);

  if (valenceElectrons === null) {
    return null;
  }

  const nameDe = elementNamesDeBySymbol[element.symbol] ?? element.symbol;
  const placements = getLewisDotPlacements(valenceElectrons);

  const dots: { x: number; y: number }[] = [];

  for (const placement of placements) {
    const coords = DOT_COORDS[placement.side];

    if (placement.count === 1) {
      dots.push({ x: coords.single[0], y: coords.single[1] });
    } else {
      dots.push({ x: coords.pair[0][0], y: coords.pair[0][1] });
      dots.push({ x: coords.pair[1][0], y: coords.pair[1][1] });
    }
  }

  return (
    <aside className="element-lewis-widget">
      <h2>Lewis-Punktschreibweise für {nameDe}</h2>
      <p>
        Das {nameDe}-Atom hat <strong>{valenceElectrons} Elektronen</strong>{" "}
        in seiner Valenzschale. In der Lewis-Punktschreibweise werden diese
        Elektronen um das Symbol herum platziert, zunächst je eines pro
        Seite, und ab dem fünften Elektron paarweise.
      </p>

      <svg
        viewBox="0 0 100 100"
        role="img"
        aria-label={`Lewis-Punktschreibweise von ${nameDe}: ${valenceElectrons} Valenzelektronen`}
        className="element-lewis-svg"
      >
        <text x="50" y="56" textAnchor="middle" className="element-lewis-symbol">
          {element.symbol}
        </text>
        {dots.map((dot, index) => (
          <circle
            key={`${dot.x}-${dot.y}-${index}`}
            cx={dot.x}
            cy={dot.y}
            r="3.2"
            className="element-lewis-dot"
          />
        ))}
      </svg>
    </aside>
  );
}
