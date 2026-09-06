import Link from "next/link";
import {
  periodicTable,
  slugifyElementName,
  type PeriodicElement,
} from "../converter/periodicTableData";

function findAt(row: number, col: number) {
  return periodicTable.find(
    (element) => element.row === row && element.col === col
  );
}

export default function ElementNeighborsMini({
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
      <h2>Periyodik tablodaki konumu</h2>
      <div className="element-neighbors-grid">
        {rows.map((row) =>
          cols.map((col) => {
            const neighbor = findAt(row, col);
            const key = `${row}-${col}`;

            if (!neighbor) {
              return <div key={key} className="element-neighbors-empty" />;
            }

            const isCurrent = neighbor.atomicNumber === element.atomicNumber;

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
                href={`/bilim-hesaplayicilari/kimya/periyodik-tablo/${slugifyElementName(neighbor.nameTr)}`}
                className="periodic-table-cell"
                data-category={neighbor.category}
                aria-label={neighbor.nameTr}
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
      <Link
        className="text-link"
        href="/bilim-hesaplayicilari/kimya/periyodik-tablo"
      >
        Tam periyodik tabloyu aç
      </Link>
    </aside>
  );
}
