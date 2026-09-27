import type { Metadata } from "next";
import { dateToolMetadata, DateDiffPage } from "../components/dates/DateToolPages";

export const metadata: Metadata = dateToolMetadata("dateDiff", "tr");

export default function Route() {
  return <DateDiffPage lang="tr" />;
}
