import type { Metadata } from "next";
import { dateToolMetadata, BusinessDayPage } from "../../components/dates/DateToolPages";

export const metadata: Metadata = dateToolMetadata("businessDays", "en");

export default function Route() {
  return <BusinessDayPage lang="en" />;
}
