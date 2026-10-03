import type { Metadata } from "next";
import { RosaryGuide } from "../../components/christian/ChristianTools2";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { MYSTERIES, MYSTERY_BY_WEEKDAY, WEEKDAYS, type MysterySet } from "../../converter/christian/christianCalc";
import { CHRISTIAN_TOOLS_PATH, christianRelated } from "../../i18n/englishChristianTools";
import { catholicAlternates } from "../../i18n/catholicTools";
import { buildSiteUrl } from "../../siteConfig";

const path = "/en/rosary";
const year = new Date().getFullYear();
const title = "Rosary Mysteries of the Day: Which Mysteries Today?";
const description = "Which Rosary mysteries are prayed today? Joyful, Sorrowful, Glorious and Luminous Mysteries by day of the week, with a tap-through Rosary that counts every bead.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, languages: catholicAlternates("rosary") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
};

const daysFor = (set: MysterySet) => WEEKDAYS.filter((_, i) => MYSTERY_BY_WEEKDAY[i] === set).join(" and ");

const faqItems: FaqItem[] = [
  ...(Object.keys(MYSTERIES) as MysterySet[]).map((set) => ({
    question: `When are the ${MYSTERIES[set].name} prayed?`,
    answer: `On ${daysFor(set)}. The ${MYSTERIES[set].name} are: ${MYSTERIES[set].items.join(", ")}.`,
  })),
  {
    question: "How many Hail Marys are in a Rosary?",
    answer: "Five decades of ten Hail Marys make 50, plus three Hail Marys at the beginning: 53 in a five-decade Rosary.",
  },
];

export default function RosaryPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/en", label: "Home" },
        { href: CHRISTIAN_TOOLS_PATH, label: "Christian Tools" },
        { href: path, label: "Rosary" },
      ]}
      crumbLabel="Breadcrumb"
      title="Rosary Mysteries of the Day"
      intro="See which mysteries are prayed today, then tap through the Rosary bead by bead: the guide shows the prayer, the decade and how many Hail Marys are left."
      tool={<RosaryGuide initialDate={`${year}-01-01`} />}
      related={{ title: "More Christian tools", links: christianRelated(path) }}
      tocTitle="Contents"
      tocItems={[
        { id: "week", label: "Mysteries by day of the week" },
        { id: "faq", label: "Frequently asked questions" },
      ]}
      faqTitle="Frequently asked questions"
      faqItems={faqItems}
    >
      <h2 id="week">Mysteries by day of the week</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Day</th>
              <th scope="col">Mysteries</th>
            </tr>
          </thead>
          <tbody>
            {WEEKDAYS.map((d, i) => (
              <tr key={d}>
                <td>{d}</td>
                <td>{MYSTERIES[MYSTERY_BY_WEEKDAY[i]].name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        This weekly schedule comes from Pope John Paul II&apos;s apostolic letter Rosarium Virginis Mariae (2002), which added the Luminous
        Mysteries for Thursday. Some people keep older customs, such as the Joyful Mysteries on the Sundays of Advent and the Sorrowful Mysteries
        on the Sundays of Lent; you can choose any set in the guide.
      </p>
    </TimeToolPage>
  );
}
