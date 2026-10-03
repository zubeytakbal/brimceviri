import type { Metadata } from "next";
import { BengaliKaza } from "../../components/dini/BengaliIslamicTools";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { kazaNamazi } from "../../converter/diniHesaplar";
import { BENGALI_ISLAMIC_HUB, ISLAMIC_TOOL_PATHS, islamicAlternates } from "../../i18n/islamicToolPaths";
import { buildSiteUrl } from "../../siteConfig";

const path = ISLAMIC_TOOL_PATHS.kaza.bn;
const title = "কাজা নামাজ হিসাব: কত বছরের কাজা, কত ওয়াক্ত ও কাজা রোজা";
const description = "কত বছর, মাস বা দিন নামাজ পড়া হয়নি লিখুন: মোট কাজা ওয়াক্ত, রাকাত এবং দিনে কত ওয়াক্ত পড়লে কবে শেষ হবে দেখুন। কাজা রোজার হিসাবও আছে।";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, languages: islamicAlternates("kaza") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "bn_BD", type: "website" },
};

const f = (n: number) => n.toLocaleString("bn-BD");
const one = kazaNamazi(1, 0, 0, true, 5)!;

const faqItems: FaqItem[] = [
  {
    question: "এক বছরের কাজা নামাজ কত ওয়াক্ত?",
    answer: `বিতরসহ দিনে ৬ ওয়াক্ত ধরলে এক বছরে (৩৬৫ দিন) ${f(one.vakit)} ওয়াক্ত ও ${f(one.rekat)} রাকাত। দিনে ৫ ওয়াক্ত কাজা পড়লে প্রায় ${f(one.bitisGun)} দিনে শেষ হবে।`,
  },
  {
    question: "কাজা নামাজে কোন নামাজগুলো পড়তে হয়?",
    answer: "শুধু ফরজ ও হানাফি মাজহাব অনুযায়ী বিতর (ওয়াজিব) কাজা করতে হয়: ফজর ২, জোহর ৪, আসর ৪, মাগরিব ৩, এশা ৪ ও বিতর ৩ রাকাত। সুন্নত নামাজের কাজা নেই।",
  },
  {
    question: "কত বছরের কাজা তা মনে না থাকলে কী করব?",
    answer: "প্রবল ধারণা অনুযায়ী একটি হিসাব ধরে নিন এবং সতর্কতার জন্য কিছুটা বেশি ধরুন। তারপর প্রতিদিন নিয়মিত কিছু ওয়াক্ত কাজা আদায় করতে থাকুন।",
  },
];

export default function BnKazaPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/bn", label: "হোম" },
        { href: BENGALI_ISLAMIC_HUB, label: "ইসলামিক টুলস" },
        { href: path, label: "কাজা নামাজ হিসাব" },
      ]}
      crumbLabel="নেভিগেশন"
      title="কাজা নামাজ ও রোজা হিসাব"
      intro="কত সময় নামাজ পড়া হয়নি এবং কতটি রমজানের রোজা রাখা হয়নি লিখুন: মোট কাজা এবং প্রতিদিন বা প্রতি সপ্তাহে কতটি করে আদায় করলে কবে শেষ হবে, তা দেখুন।"
      tool={<BengaliKaza />}
      related={{
        title: "আরও ইসলামিক টুলস",
        links: [
          { href: ISLAMIC_TOOL_PATHS.zakat.bn, label: "যাকাত ক্যালকুলেটর" },
          { href: ISLAMIC_TOOL_PATHS.khatam.bn, label: "কুরআন খতম পরিকল্পনা" },
          { href: ISLAMIC_TOOL_PATHS.qasr.bn, label: "কসর দূরত্ব হিসাব" },
        ],
      }}
      tocTitle="সূচিপত্র"
      tocItems={[
        { id: "hisab", label: "কাজা কীভাবে হিসাব হয়" },
        { id: "faq", label: "প্রশ্নোত্তর" },
      ]}
      faqTitle="প্রশ্নোত্তর"
      faqItems={faqItems}
    >
      <h2 id="hisab">কাজা কীভাবে হিসাব হয়</h2>
      <p>
        নামাজ না পড়া প্রতিটি দিনের জন্য পাঁচ ওয়াক্ত ফরজ এবং বিতর কাজা হয়। বছরকে ৩৬৫ দিন ও মাসকে ৩০ দিন ধরা হয়েছে; সঠিক দিন জানা থাকলে দিনের ঘরে
        লিখুন। রোজার ক্ষেত্রে প্রতিটি রমজান ৩০ দিন ধরা হয়েছে, সঙ্গে আলাদাভাবে ছুটে যাওয়া রোজার দিন যোগ হয়। কাফফারার মতো আলাদা বিধান এই হিসাবে
        ধরা হয়নি।
      </p>
    </TimeToolPage>
  );
}
