import type { Metadata } from "next";
import { BengaliQasr } from "../../components/dini/BengaliIslamicTools";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { KASR_KM, KASR_MIL } from "../../converter/diniHesaplar";
import { BENGALI_ISLAMIC_HUB, ISLAMIC_TOOL_PATHS, islamicAlternates } from "../../i18n/islamicToolPaths";
import { buildSiteUrl } from "../../siteConfig";

const path = ISLAMIC_TOOL_PATHS.qasr.bn;
const title = "কসর নামাজ দূরত্ব: কত কিলোমিটার সফরে মুসাফির?";
const description = "৪৮ মাইল (প্রায় ৭৭ কিলোমিটার) বা বেশি দূরত্বে সফর এবং ১৫ দিনের কম থাকার নিয়ত হলে কসর। দূরত্ব ও থাকার দিন লিখে দেখুন আপনি মুসাফির কি না।";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, languages: islamicAlternates("qasr") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "bn_BD", type: "website" },
};

const f = (n: number, d = 2) => n.toLocaleString("bn-BD", { maximumFractionDigits: d });

const faqItems: FaqItem[] = [
  {
    question: "কত কিলোমিটার সফর করলে কসর নামাজ পড়তে হয়?",
    answer: `হানাফি মাজহাব অনুযায়ী ${f(KASR_MIL, 0)} মাইল, অর্থাৎ প্রায় ${f(KASR_KM)} কিলোমিটার বা তার বেশি দূরত্বে সফরের নিয়তে বের হলে। অনেক বইয়ে এটি গোল করে ৭৮ কিলোমিটার লেখা হয়।`,
  },
  {
    question: "কত দিন থাকলে আর কসর করা যায় না?",
    answer: "গন্তব্যে ১৫ দিন বা তার বেশি থাকার নিয়ত করলে সেখানে মুকিম হয়ে যান এবং পূর্ণ নামাজ পড়বেন। ১৫ দিনের কম থাকার নিয়ত হলে কসর করবেন।",
  },
  {
    question: "কসরে কোন নামাজ কত রাকাত?",
    answer: "শুধু চার রাকাতের ফরজ নামাজ — জোহর, আসর ও এশা — দুই রাকাত পড়া হয়। ফজর ও মাগরিবের ফরজ এবং বিতর অপরিবর্তিত থাকে।",
  },
];

export default function BnQasrPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/bn", label: "হোম" },
        { href: BENGALI_ISLAMIC_HUB, label: "ইসলামিক টুলস" },
        { href: path, label: "কসর দূরত্ব হিসাব" },
      ]}
      crumbLabel="নেভিগেশন"
      title="কসর নামাজ দূরত্ব হিসাব"
      intro="গন্তব্যের দূরত্ব (কিলোমিটার বা মাইল) এবং সেখানে কত দিন থাকবেন লিখুন: হানাফি মাজহাবের নিয়মে আপনি মুসাফির কি না এবং কসর করবেন কি না, তা দেখুন।"
      tool={<BengaliQasr />}
      related={{
        title: "আরও ইসলামিক টুলস",
        links: [
          { href: ISLAMIC_TOOL_PATHS.zakat.bn, label: "যাকাত ক্যালকুলেটর" },
          { href: ISLAMIC_TOOL_PATHS.kaza.bn, label: "কাজা নামাজ ও রোজা হিসাব" },
          { href: ISLAMIC_TOOL_PATHS.khatam.bn, label: "কুরআন খতম পরিকল্পনা" },
        ],
      }}
      tocTitle="সূচিপত্র"
      tocItems={[
        { id: "niyom", label: "মুসাফিরের নিয়ম" },
        { id: "faq", label: "প্রশ্নোত্তর" },
      ]}
      faqTitle="প্রশ্নোত্তর"
      faqItems={faqItems}
    >
      <h2 id="niyom">মুসাফিরের নিয়ম</h2>
      <p>
        দূরত্ব ধরা হয় যাত্রাপথে, অর্থাৎ যে রাস্তায় আপনি যাবেন তার দৈর্ঘ্য; সরলরেখার দূরত্ব নয়। নিজের এলাকার সীমা পার হওয়ার পর থেকে কসর শুরু হয়।
        অন্য মাজহাবে দূরত্বের হিসাব কিছুটা ভিন্ন হতে পারে; সন্দেহ থাকলে আলেমের পরামর্শ নিন।
      </p>
    </TimeToolPage>
  );
}
