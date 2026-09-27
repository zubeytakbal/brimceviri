import type { Metadata } from "next";
import { PomodoroPage } from "../components/time/FocusPages";
import { timeToolAlternates, timeToolPaths } from "../i18n/timeToolPaths";
import { buildSiteUrl } from "../siteConfig";

const title = "Pomodoro Zamanlayıcı: 25 Dakika Odak, 5 Dakika Mola";
const description = "Online Pomodoro zamanlayıcı: 25 dk odak, 5 dk mola, her 4 turda uzun mola. Görev adı, bildirim, kendi müziğin ve günlük odak istatistiği; kurulum yok.";
const path = timeToolPaths.pomodoro.tr!;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, ...timeToolAlternates("pomodoro") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

export default function PomodoroRoute() {
  return <PomodoroPage lang="tr" />;
}
