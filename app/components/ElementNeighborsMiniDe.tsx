import Link from "next/link";
import { periodicTable, type PeriodicElement } from "../converter/periodicTableData";
import { elementNamesDeBySymbol, slugifyElementNameDe } from "../converter/periodicTableDataDe";

function findAt(row: number, col: number) {
  return periodicTable.find(
    (element) => element.row === row && element.col === col
  );
}

export default function ElementNeighborsMiniDe({
  element,
}: {
  element: PeriodicElement;
}) {
  const rows = [element.row - 1, element.row, element.row + 1];
  const cols = [element.col - 1, element.col, element.col + 1];

  const hasAnyNeighbor = rows.some((row) =>
    cols.some((col) => {
      if (row === element.row && col === element.col) {
        return false;
      }
      return Boolean(findAt(row, col));
    })
  );

  if (!hasAnyNeighbor) {
    return null;
  }

  return (
    <aside className="element-neighbors-mini">
      <h2>Position im Periodensystem</h2>
      <div className="element-neighbors-grid">
        {rows.map((row) =>
          cols.map((col) => {
            const neighbor = findAt(row, col);
            const key = `${row}-${col}`;

            if (!neighbor) {
              return <div key={key} className="element-neighbors-empty" />;
            }

            const isCurrent = neighbor.atomicNumber === element.atomicNumber;
            const neighborNameDe = elementNamesDeBySymbol[neighbor.symbol] ?? neighbor.symbol;

            if (isCurrent) {
              return (
                <div
                  key={key}
                  className="periodic-table-cell element-neighbors-current"
                  data-category={neighbor.category}
                >
                  <span className="element-number">
                    {neighbor.atomicNumber}
                  </span>
                  <span className="element-symbol">{neighbor.symbol}</span>
                </div>
              );
            }

            return (
              <Link
                key={key}
                href={`/de/periodensystem/${slugifyElementNameDe(neighborNameDe)}`}
                className="periodic-table-cell"
                data-category={neighbor.category}
                aria-label={neighborNameDe}
              >
                <span className="element-number">
                  {neighbor.atomicNumber}
                </span>
                <span className="element-symbol">{neighbor.symbol}</span>
              </Link>
            );
          })
        )}
      </div>
      <Link className="text-link" href="/de/periodensystem">
        Vollständiges Periodensystem öffnen
      </Link>
    </aside>
  );
}
