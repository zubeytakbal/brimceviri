import { seoTitle } from "../../seoTitle";
import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import GermanEggTimer from "../../components/time/GermanEggTimer";
import { EGG_SIZES, EGG_STAGES } from "../../components/time/eggTimes";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { timeToolsRelatedDe } from "../../i18n/germanTimeTools";
import { buildSiteUrl } from "../../siteConfig";

const path = "/de/eieruhr";
const title = "Eieruhr online: Eier kochen weich, wachsweich, hart";
const description =
  "Online-Eieruhr mit Kochzeiten: Garstufe (weich, wachsweich, hart) und Eigröße wählen, Start drücken – am Ende klingelt es. Mit Kochzeit-Tabelle für S bis XL.";

export const metadata: Metadata = {
  title: seoTitle(title, "Eieruhr online: Eier weich oder hart kochen"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "de_DE", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "Wie lange muss ein Frühstücksei kochen?",
    answer: "Ein weiches Ei der Größe M braucht etwa 5 Minuten, ein wachsweiches etwa 7 und ein hartes etwa 10 Minuten – kühlschrankkalt in sprudelnd kochendes Wasser gelegt.",
  },
  {
    question: "Ab wann zählt die Kochzeit?",
    answer: "Ab dem Moment, in dem das Ei ins kochende Wasser kommt. Starten Sie den Timer direkt danach. Wer Eier im kalten Wasser aufsetzt, muss mit deutlich kürzeren und weniger genauen Zeiten rechnen.",
  },
  {
    question: "Muss man Eier abschrecken?",
    answer: "Abschrecken mit kaltem Wasser stoppt das Nachgaren, sonst wird das Eigelb im heißen Ei noch fester. Leichter schälen lassen sich Eier dadurch nicht zuverlässig; das hängt vor allem vom Alter der Eier ab.",
  },
  {
    question: "Warum platzen Eier beim Kochen?",
    answer: "Durch den Temperatursprung dehnt sich die Luft in der Luftblase aus. Anpieksen am stumpfen Ende und vorsichtiges Hineinlegen mit einem Löffel helfen.",
  },
];

export default function EieruhrPage() {
  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: "/de/timer", label: "Timer" },
          { href: path, label: "Eieruhr" },
        ]}
        crumbLabel="Brotkrumen"
        title="Eieruhr online"
        intro="Garstufe und Eigröße wählen, das Ei ins sprudelnd kochende Wasser legen und „Start“ drücken. Ist die Zeit um, klingelt die Eieruhr."
        tool={<GermanEggTimer />}
        related={{ title: "Das könnte Sie auch interessieren", links: timeToolsRelatedDe(path) }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "tabelle", label: "Kochzeiten-Tabelle" },
          { id: "tipps", label: "So gelingt das Frühstücksei" },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="tabelle">Kochzeiten-Tabelle</h2>
        <p>Richtwerte in Minuten für kühlschrankkalte Eier, in sprudelnd kochendes Wasser gelegt:</p>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Garstufe</th>
                {EGG_SIZES.map((s) => (
                  <th scope="col" key={s.id}>
                    Größe {s.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EGG_STAGES.map((st) => (
                <tr key={st.id}>
                  <td>
                    <strong>{st.label}</strong>
                    <br />
                    <small>{st.text}</small>
                  </td>
                  {EGG_SIZES.map((s) => (
                    <td key={s.id}>{(st.minutes + s.delta).toLocaleString("de-DE", { maximumFractionDigits: 1 })}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          <small>
            Die Angaben in Kochratgebern schwanken um etwa eine Minute; Herdleistung, Topfgröße und Höhenlage spielen mit. Eier mit Zimmertemperatur
            brauchen rund eine Minute weniger.
          </small>
        </p>

        <h2 id="tipps">So gelingt das Frühstücksei</h2>
        <ol>
          <li>Wasser sprudelnd aufkochen; so viel, dass die Eier bedeckt sind.</li>
          <li>Eier am stumpfen Ende anpieksen und mit einem Löffel vorsichtig ins Wasser legen.</li>
          <li>Sofort den Timer starten und die Hitze so regeln, dass das Wasser leicht weiterkocht.</li>
          <li>Nach dem Signal kurz kalt abschrecken, damit das Eigelb nicht nachgart.</li>
        </ol>
        <p>
          Für Nudeln, Tee oder Pizza gibt es fertige Zeiten beim <Link href="/de/timer">Online-Timer</Link>.
        </p>
      </TimeToolPage>
    </div>
  );
}
