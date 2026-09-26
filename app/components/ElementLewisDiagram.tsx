import {
  getLewisDotPlacements,
  getValenceElectronCount,
  type LewisDotSide,
} from "../converter/lewisDotStructure";
import type { PeriodicElement } from "../converter/periodicTableData";
import type { ContentLocale } from "./contentLocale";
import { getElementName } from "./elementLocale";

const DOT_COORDS: Record<LewisDotSide, { single: [number, number]; pair: [[number, number], [number, number]] }> = {
  top: { single: [50, 12], pair: [[42, 12], [58, 12]] },
  right: { single: [88, 50], pair: [[88, 42], [88, 58]] },
  bottom: { single: [50, 88], pair: [[42, 88], [58, 88]] },
  left: { single: [12, 50], pair: [[12, 42], [12, 58]] },
};

const copy = {
  tr: {
    title: (name: string) => `${name} İçin Lewis Nokta Yapısı`,
    intro: (name: string, valenceElectrons: number) => (
      <>
        {name} atomunun değerlik kabuğunda{" "}
        <strong>{valenceElectrons} elektron</strong> bulunur. Lewis nokta
        gösteriminde bu elektronlar sembolün etrafına, önce her kenara birer
        tane, dörtten fazlaysa ikinci elektrondan itibaren çift olacak
        şekilde yerleştirilir.
      </>
    ),
    ariaLabel: (name: string, valenceElectrons: number) =>
      `${name} elementinin Lewis nokta yapısı: ${valenceElectrons} değerlik elektronu`,
  },
  de: {
    title: (name: string) => `Lewis-Punktschreibweise für ${name}`,
    intro: (name: string, valenceElectrons: number) => (
      <>
        Das {name}-Atom hat <strong>{valenceElectrons} Elektronen</strong>{" "}
        in seiner Valenzschale. In der Lewis-Punktschreibweise werden diese
        Elektronen um das Symbol herum platziert, zunächst je eines pro
        Seite, und ab dem fünften Elektron paarweise.
      </>
    ),
    ariaLabel: (name: string, valenceElectrons: number) =>
      `Lewis-Punktschreibweise von ${name}: ${valenceElectrons} Valenzelektronen`,
  },
};

export default function ElementLewisDiagram({
  element,
  locale = "tr",
}: {
  element: PeriodicElement;
  locale?: ContentLocale;
}) {
  const t = copy[locale];
  const name = getElementName(element, locale);
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
      <h2>{t.title(name)}</h2>
      <p>{t.intro(name, valenceElectrons)}</p>

      <svg
        viewBox="0 0 100 100"
        role="img"
        aria-label={t.ariaLabel(name, valenceElectrons)}
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
