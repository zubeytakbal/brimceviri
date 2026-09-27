import type { Metadata } from "next";
import { PomodoroPage } from "../../components/time/FocusPages";
import { timeToolAlternates, timeToolPaths } from "../../i18n/timeToolPaths";
import { buildSiteUrl } from "../../siteConfig";

const title = "Pomodoro Timer: 25-Minute Focus Sessions";
const description = "Free online Pomodoro timer: 25-minute focus, 5-minute breaks, a long break every 4 rounds. Task name, notifications, your own sound and today's focus stats.";
const path = timeToolPaths.pomodoro.en!;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, ...timeToolAlternates("pomodoro") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "en_US", type: "website" },
};

export default function PomodoroRoute() {
  return <PomodoroPage lang="en" />;
}
