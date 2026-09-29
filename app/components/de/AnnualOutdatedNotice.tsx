import { findAnnualUpdate, isOutdated } from "../../converter/annualUpdates";

// Nach Ablauf des Jahres, fuer das die Werte gelten, sieht der Besucher einen Hinweis,
// bis die neuen amtlichen Werte eingetragen sind (validYear in annualUpdates.ts).
export default function AnnualOutdatedNotice({ id }: { id: string }) {
  const update = findAnnualUpdate(id);
  if (!isOutdated(update)) return null;
  return (
    <p className="date-calc-note" role="note">
      Hinweis: Dieser Rechner verwendet die Werte für {update.validYear}. Die
      amtlichen Werte für {new Date().getUTCFullYear()} werden gerade
      eingearbeitet; die Ergebnisse können bis dahin abweichen.
    </p>
  );
}
