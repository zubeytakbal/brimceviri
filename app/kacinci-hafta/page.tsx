import type { Metadata } from "next";
import { dateToolMetadata, WeekNumberPage, weekNumberTitle } from "../components/dates/DateToolPages";

// Tarihe bagli ornekler her gun degisir.
export const revalidate = 21600;

export function generateMetadata(): Metadata {
  return dateToolMetadata("weekNumber", "tr", weekNumberTitle("tr"));
}

export default function Route() {
  return <WeekNumberPage lang="tr" />;
}
