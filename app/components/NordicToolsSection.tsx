// İsveççe, Norveççe ve Danca ana sayfalarındaki "Araçlar" bölümü. Kartlar
// birim kategorisi kartlarıyla aynı stili kullanır; yeni bir İskandinav aracı
// eklendiğinde yalnızca NORDIC_TOOLS listesine bir satır eklenir.
import Link from "@/app/components/SiteLink";
import { NORDIC_WEEK_PATHS, type NordicLocale } from "../converter/time/nordicWeek";
import { sleepGuidePaths } from "../i18n/sleepGuidePaths";
import { NORDIC_TIME_CARD_TEXT, NORDIC_TIME_LABELS, NORDIC_TIME_PATHS, type NordicTimeTool } from "./time/nordicTimeCopy";
import { DecorativeIcon, type SiteIconName } from "./siteIcons";

type ToolCard = { id: string; href: string; title: string; description: string; iconName: SiteIconName };

const SECTION_COPY: Record<NordicLocale, { title: string; description: string }> = {
  sv: { title: "Verktyg och räknare", description: "Praktiska verktyg för vardagen, helt på svenska." },
  no: { title: "Verktøy og kalkulatorer", description: "Praktiske verktøy for hverdagen, helt på norsk." },
  da: { title: "Værktøjer og beregnere", description: "Praktiske værktøjer til hverdagen, helt på dansk." },
};

const NORDIC_TOOLS: Record<NordicLocale, ToolCard[]> = {
  sv: [
    { id: "week", href: NORDIC_WEEK_PATHS.sv, title: "Vilken vecka är det?", description: "Aktuellt veckonummer och alla veckor med datum.", iconName: "weekNumber" },
    { id: "sleep", href: sleepGuidePaths.sv!, title: "Sömnkalkylator", description: "Räkna ut när du ska lägga dig eller vakna.", iconName: "sleepCalculator" },
  ],
  no: [
    { id: "week", href: NORDIC_WEEK_PATHS.no, title: "Hvilken uke er det?", description: "Gjeldende ukenummer og alle uker med datoer.", iconName: "weekNumber" },
    { id: "sleep", href: sleepGuidePaths.no!, title: "Søvnkalkulator", description: "Finn ut når du bør legge deg eller stå opp.", iconName: "sleepCalculator" },
  ],
  da: [
    { id: "week", href: NORDIC_WEEK_PATHS.da, title: "Hvilken uge er det?", description: "Aktuelt ugenummer og alle uger med datoer.", iconName: "weekNumber" },
    { id: "sleep", href: sleepGuidePaths.da!, title: "Søvnberegner", description: "Find ud af, hvornår du skal gå i seng eller stå op.", iconName: "sleepCalculator" },
  ],
};

const TIME_TOOL_ICONS: Record<NordicTimeTool, SiteIconName> = {
  // Türkçe ana sayfadaki zaman araçlarıyla aynı ikonlar.
  clock: "time",
  timer: "paceCalculator",
  stopwatch: "paceCalculator",
  alarm: "time",
};

function timeToolCards(locale: NordicLocale): ToolCard[] {
  return (["clock", "timer", "stopwatch", "alarm"] as NordicTimeTool[]).map((tool) => ({
    id: tool,
    href: NORDIC_TIME_PATHS[tool][locale],
    title: NORDIC_TIME_LABELS[tool][locale],
    description: NORDIC_TIME_CARD_TEXT[tool][locale],
    iconName: TIME_TOOL_ICONS[tool],
  }));
}

export default function NordicToolsSection({ locale }: { locale: NordicLocale }) {
  const copy = SECTION_COPY[locale];
  const [week, ...rest] = NORDIC_TOOLS[locale];
  const cards = [week, ...timeToolCards(locale), ...rest];
  return (
    <section className="directory-section">
      <header className="directory-section-header">
        <div>
          <h2>{copy.title}</h2>
          <p>{copy.description}</p>
        </div>
      </header>
      <div className="directory-home-category-grid">
        {cards.map((tool) => (
          <article className="directory-home-card" key={tool.id}>
            <Link className="directory-card-stretch" href={tool.href} aria-label={`${tool.title} - ${tool.description}`} />
            <div className="directory-card-body directory-card-body-icon">
              <span className="home-category-icon-box" aria-hidden="true">
                <DecorativeIcon className="home-category-icon-svg" name={tool.iconName} size={44} />
              </span>
              <h3 className="home-category-title">{tool.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
