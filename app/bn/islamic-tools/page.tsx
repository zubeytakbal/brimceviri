import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { BENGALI_ISLAMIC_HUB, ISLAMIC_TOOL_PATHS } from "../../i18n/islamicToolPaths";
import { buildSiteUrl } from "../../siteConfig";

const title = "ইসলামিক টুলস: যাকাত, কাজা নামাজ, খতম ও কসর হিসাব";
const description = "বাংলায় ইসলামিক ক্যালকুলেটর: ভরি হিসাবে যাকাত, কাজা নামাজ ও রোজা, কুরআন খতম পরিকল্পনা এবং কসর নামাজের দূরত্ব।";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: BENGALI_ISLAMIC_HUB, languages: { bn: BENGALI_ISLAMIC_HUB, tr: "/dini-araclar", "x-default": "/dini-araclar" } },
  openGraph: { title, description, url: buildSiteUrl(BENGALI_ISLAMIC_HUB), siteName: "BirimCeviri.app", locale: "bn_BD", type: "website" },
};

const tools = [
  { href: ISLAMIC_TOOL_PATHS.zakat.bn, label: "যাকাত ক্যালকুলেটর", text: "সাড়ে ৫২ ভরি রুপা বা সাড়ে ৭ ভরি সোনার নিসাব ধরে যাকাত হিসাব।" },
  { href: ISLAMIC_TOOL_PATHS.kaza.bn, label: "কাজা নামাজ ও রোজা হিসাব", text: "কত বছরের কাজা, কত ওয়াক্ত ও রাকাত, কবে শেষ হবে।" },
  { href: ISLAMIC_TOOL_PATHS.khatam.bn, label: "কুরআন খতম পরিকল্পনা", text: "দৈনিক কত পারা, সম্মিলিত খতমে পারা ভাগ।" },
  { href: ISLAMIC_TOOL_PATHS.qasr.bn, label: "কসর দূরত্ব হিসাব", text: "৪৮ মাইল ও ১৫ দিনের নিয়মে আপনি মুসাফির কি না।" },
];

export default function BnIslamicToolsPage() {
  return (
    <main className="other-categories-page">
      <div className="directory-shell">
        <nav className="breadcrumbs" aria-label="নেভিগেশন">
          <Link href="/bn">হোম</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>ইসলামিক টুলস</span>
        </nav>
        <header className="other-categories-header">
          <h1>ইসলামিক টুলস</h1>
          <p>
            বাংলাদেশ ও উপমহাদেশে প্রচলিত হানাফি নিয়ম অনুযায়ী তৈরি হিসাব: ভরি এককে নিসাব, ৪৮ মাইলের সফর এবং পারা অনুযায়ী খতম। সোনা-রুপার দাম বা
            নামাজের সময়ের মতো প্রতিদিন বদলায় এমন তথ্য এখানে সংরক্ষণ করা হয়নি।
          </p>
        </header>
        <ul className="tool-hub-list dini-hub-list">
          {tools.map((t) => (
            <li key={t.href}>
              <Link href={t.href}>
                <span>{t.label}</span>
                <small>{t.text}</small>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
