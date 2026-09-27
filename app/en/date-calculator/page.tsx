import type { Metadata } from "next";
import { dateToolMetadata, DateAddPage } from "../../components/dates/DateToolPages";

// Tarihe bagli ornekler her gun degisir.
export const revalidate = 21600;

export const metadata: Metadata = dateToolMetadata("dateAdd", "en");

export default function Route() {
  return <DateAddPage lang="en" />;
}
