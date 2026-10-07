import type { CgpaFormulaOption } from "../../components/CgpaCalculator";
import { cgpaUniversities, cgpaToPercentage, type CgpaUniversity } from "../../converter/india/cgpaUniversities";

export function formulaOptions(): CgpaFormulaOption[] {
  return cgpaUniversities.map((university) => ({
    slug: university.slug,
    label: university.shortName,
    multiplier: university.multiplier,
    offset: university.offset,
    scale: university.scale,
  }));
}

export function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function formatVerifiedDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${date}T00:00:00Z`)
  );
}

export const TABLE_CGPAS = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];

export function percentLabel(value: number | null) {
  return value === null ? "—" : `${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(value)}%`;
}

export function SourceChangeNotice({ university, changedAt }: { university: CgpaUniversity; changedAt: string }) {
  return (
    <p className="calculator-usage-hint" role="status">
      <strong>Being re-checked:</strong> the official {university.shortName} source changed on {formatVerifiedDate(changedAt.slice(0, 10))}.
      We are checking whether the formula changed. Until then, confirm the result with the{" "}
      <a href={university.sourceUrl} rel="noopener noreferrer" target="_blank">
        official document
      </a>
      .
    </p>
  );
}

export function UniversityTable() {
  return (
    <div className="conversion-table-wrap">
      <table className="conversion-table">
        <thead>
          <tr>
            <th>University / board</th>
            <th>Formula</th>
            {[6, 7, 8, 9].map((c) => (
              <th key={c}>CGPA {c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cgpaUniversities.map((university) => (
            <tr key={university.slug}>
              <td>
                <a href={`#${university.slug}`}>{university.shortName}</a>
              </td>
              <td>{university.offset ? `(CGPA − ${university.offset}) × ${university.multiplier}` : `CGPA × ${university.multiplier}`}</td>
              {[6, 7, 8, 9].map((c) => (
                <td key={c}>{percentLabel(cgpaToPercentage(c, university))}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Each university's official source, scope and notes; old per-university pages redirect here. */
export function UniversityDetails() {
  return (
    <dl className="category-unit-glossary">
      {cgpaUniversities.map((university) => (
        <div key={university.slug} id={university.slug}>
          <dt>
            {university.name} <small>{university.location}</small>
          </dt>
          <dd>
            Formula: {university.offset ? `(CGPA − ${university.offset}) × ${university.multiplier}` : `CGPA × ${university.multiplier}`} on a{" "}
            {university.scale}-point scale. Applies to {university.scope}.
          </dd>
          {university.notes?.map((note) => (
            <dd key={note}>{note}</dd>
          ))}
          <dd>
            Source:{" "}
            <a href={university.sourceUrl} rel="noopener noreferrer" target="_blank">
              {university.sourceTitle}
            </a>{" "}
            (checked {formatVerifiedDate(university.verifiedOn)}).
          </dd>
        </div>
      ))}
    </dl>
  );
}
