import { findAnnualUpdate, isOutdated } from "../../converter/annualUpdates";

// Nach Ablauf des Jahres, fuer das die Werte gelten, sieht der Besucher einen Hinweis,
// bis die neuen amtlichen Werte eingetragen sind (validYear in annualUpdates.ts).
export default function AnnualOutdatedNotice({
  id,
  lang = "de",
}: {
  id: string;
  lang?: "de" | "tr";
}) {
  const update = findAnnualUpdate(id);
  if (!isOutdated(update)) return null;
  const jahr = new Date().getUTCFullYear();
  return (
    <p className="date-calc-note" role="note">
      {lang === "tr"
        ? `Not: Bu hesaplama ${update.validYear} değerlerini kullanıyor. ${jahr} için resmi değerler ekleniyor; o zamana kadar sonuçlar farklı olabilir.`
        : `Hinweis: Dieser Rechner verwendet die Werte für ${update.validYear}. Die amtlichen Werte für ${jahr} werden gerade eingearbeitet; die Ergebnisse können bis dahin abweichen.`}
    </p>
  );
}
