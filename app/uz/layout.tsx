import type { Metadata } from "next";
import type { ReactNode } from "react";

// Özbekçe AdSense'in desteklediği diller arasında değil: bu bölümde AdSense hesap etiketi yer almaz.
export const metadata: Metadata = {
  other: { "google-adsense-account": [] },
};

export default function UzbekLayout({ children }: { children: ReactNode }) {
  return children;
}
