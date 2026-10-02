import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import ToolHubPage, { countTools } from "../../components/ToolHubPage";
import {
  GERMAN_TOOL_HUB_PATH,
  germanToolGroups,
} from "../../i18n/germanToolDirectory";
import { TURKISH_TOOL_HUB_PATH } from "../../i18n/turkishToolDirectory";
import { buildSiteUrl } from "../../siteConfig";

const toolCount = countTools(germanToolGroups);

const description = `${toolCount} kostenlose Online-Rechner nach Themen: Brutto-Netto, Prozente, Feiertage, Kalenderwoche, Dreisatz, Brüche, Timer und mehr – ohne Anmeldung.`;

export const metadata: Metadata = {
  title: "Alle Rechner: Brutto-Netto, Prozent, Kalender und mehr",
  description,
  alternates: {
    canonical: GERMAN_TOOL_HUB_PATH,
    languages: {
      tr: TURKISH_TOOL_HUB_PATH,
      de: GERMAN_TOOL_HUB_PATH,
      "x-default": TURKISH_TOOL_HUB_PATH,
    },
  },
  openGraph: {
    title: "Alle Rechner",
    description,
    url: buildSiteUrl(GERMAN_TOOL_HUB_PATH),
    siteName: "BirimCeviri.app",
    locale: "de_DE",
    type: "website",
  },
};

export default function AlleRechnerPage() {
  return (
    <ToolHubPage
      homeHref="/de"
      homeLabel="Startseite"
      breadcrumbLabel="Alle Rechner"
      breadcrumbAriaLabel="Seitenpfad"
      jumpAriaLabel="Themen"
      title="Alle Rechner"
      groups={germanToolGroups}
      intro={
        <>
          Alle {toolCount} Rechner der Seite nach Themen sortiert. Sie sind
          kostenlos, ohne Anmeldung und rechnen direkt in Ihrem Browser. Für
          Einheiten finden Sie alles unter{" "}
          <Link href="/de/alle-umrechnungen">Alle Umrechnungen</Link>.
        </>
      }
    />
  );
}
