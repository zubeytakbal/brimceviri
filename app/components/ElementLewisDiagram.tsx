import {
  getLewisDotPlacements,
  getValenceElectronCount,
  type LewisDotSide,
} from "../converter/lewisDotStructure";
import type { PeriodicElement } from "../converter/periodicTableData";

const DOT_COORDS: Record<LewisDotSide, { single: [number, number]; pair: [[number, number], [number, number]] }> = {
  top: { single: [50, 12], pair: [[42, 12], [58, 12]] },
  right: { single: [88, 50], pair: [[88, 42], [88, 58]] },
  bottom: { single: [50, 88], pair: [[42, 88], [58, 88]] },
  left: { single: [12, 50], pair: [[12, 42], [12, 58]] },
};

export default function ElementLewisDiagram({
  element,
}: {
  element: PeriodicElement;
}) {
  const valenceElectrons = getValenceElectronCount(element);

  if (valenceElectrons === null) {
    return null;
  }

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
      <h2>{element.nameTr} İçin Lewis Nokta Yapısı</h2>
      <p>
        {element.nameTr} atomunun değerlik kabuğunda{" "}
        <strong>{valenceElectrons} elektron</strong> bulunur. Lewis nokta
        gösteriminde bu elektronlar sembolün etrafına, önce her kenara birer
        tane, dörtten fazlaysa ikinci elektrondan itibaren çift olacak
        şekilde yerleştirilir.
      </p>

      <svg
        viewBox="0 0 100 100"
        role="img"
        aria-label={`${element.nameTr} elementinin Lewis nokta yapısı: ${valenceElectrons} değerlik elektronu`}
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
