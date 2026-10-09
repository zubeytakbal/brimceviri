import { buildPairPractice, type PairLocale, type PairPracticeInput } from "../converter/pairPractice";

export default function PairPracticeGuide(props: PairPracticeInput & { locale: PairLocale }) {
  const { locale, ...input } = props;
  const guide = buildPairPractice(locale, input);

  return (
    <>
      <section className="conversion-section">
        <h2>{guide.title}</h2>
        <p>{guide.intro}</p>
        <ul>
          {guide.steps.map((step) => (
            <li key={step.slice(0, 32)}>{step}</li>
          ))}
        </ul>
        <div className="conversion-table-wrap">
          <table className="conversion-table">
            <thead>
              <tr>
                <th>{input.fromName}</th>
                <th>{input.toName}</th>
              </tr>
            </thead>
            <tbody>
              {guide.rows.map((row) => (
                <tr key={row.input}>
                  <td>{row.input}</td>
                  <td>{row.output}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="conversion-section">
        <h2>{guide.checkTitle}</h2>
        <p>{guide.check}</p>
      </section>
      <section className="conversion-section">
        <h2>{guide.noteTitle}</h2>
        <p>{guide.note}</p>
      </section>
    </>
  );
}
