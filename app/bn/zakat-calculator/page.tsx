import type { Metadata } from "next";
import { BengaliZakat } from "../../components/dini/BengaliIslamicTools";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { NISAB_ALTIN_VORI, NISAB_GUMUS_VORI, VORI_GRAM, zakatVori } from "../../converter/diniHesaplar";
import { BENGALI_ISLAMIC_HUB, ISLAMIC_TOOL_PATHS, islamicAlternates } from "../../i18n/islamicToolPaths";
import { buildSiteUrl } from "../../siteConfig";

const path = ISLAMIC_TOOL_PATHS.zakat.bn;
const title = "যাকাত ক্যালকুলেটর: ভরি হিসাবে সোনা-রুপার নিসাব ও যাকাত";
const description =
  "সাড়ে ৭ ভরি সোনা বা সাড়ে ৫২ ভরি রুপার নিসাব ধরে আপনার যাকাত হিসাব করুন। নগদ, ব্যাংক, সোনা-রুপা (ভরি), ব্যবসার পণ্য ও ঋণ লিখুন; আজকের দাম আপনি নিজে দেবেন।";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, languages: islamicAlternates("zakat") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "bn_BD", type: "website" },
};

const f = (n: number, d = 2) => n.toLocaleString("bn-BD", { maximumFractionDigits: d });
// উদাহরণ: রুপা ভরি ২,৫০০ টাকা ধরে।
const ex = zakatVori({ nakit: 200000, banka: 0, ticari: 0, alacak: 0, borc: 0, altinVori: 0, gumusVori: 0, altinVoriFiyati: 0, gumusVoriFiyati: 2500, nisab: "gumus" })!;

const faqItems: FaqItem[] = [
  {
    question: "যাকাতের নিসাব কত ভরি?",
    answer: `সোনার নিসাব সাড়ে ৭ ভরি (${f(NISAB_ALTIN_VORI * VORI_GRAM)} গ্রাম) এবং রুপার নিসাব সাড়ে ৫২ ভরি (${f(NISAB_GUMUS_VORI * VORI_GRAM)} গ্রাম)। এখানে ১ ভরি = ${f(VORI_GRAM, 3)} গ্রাম (বাজুস)।`,
  },
  {
    question: "নগদ টাকার যাকাতে সোনা না রুপার নিসাব ধরব?",
    answer:
      "বাংলাদেশ ও উপমহাদেশের অধিকাংশ আলেম বর্তমানে নগদ অর্থ ও ব্যবসার পণ্যের ক্ষেত্রে রুপার নিসাব ধরার কথা বলেন, কারণ এতে গরিবের উপকার বেশি। কেউ কেউ সোনার নিসাবের মত দেন। ক্যালকুলেটরে দুটিই বেছে নেওয়া যায়; সন্দেহ থাকলে নির্ভরযোগ্য আলেমের পরামর্শ নিন।",
  },
  {
    question: "কত টাকা থাকলে যাকাত দিতে হবে?",
    answer: `রুপার নিসাব অনুযায়ী সাড়ে ৫২ ভরি রুপার দাম পরিমাণ টাকা। যেমন রুপার ভরি ২,৫০০ টাকা হলে নিসাব ${f(ex.nisabDegeri, 0)} টাকা; তখন ২ লাখ টাকার যাকাত ${f(ex.zekat, 0)} টাকা। নিসাব পরিমাণ সম্পদের ওপর এক চান্দ্র বছর পূর্ণ হতে হবে।`,
  },
  {
    question: "যাকাত কত শতাংশ?",
    answer: "যাকাতযোগ্য মোট সম্পদের ২.৫ শতাংশ, অর্থাৎ চল্লিশ ভাগের এক ভাগ। ঋণ থাকলে আগে তা বাদ দিতে হয়।",
  },
];

export default function BnZakatPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/bn", label: "হোম" },
        { href: BENGALI_ISLAMIC_HUB, label: "ইসলামিক টুলস" },
        { href: path, label: "যাকাত ক্যালকুলেটর" },
      ]}
      crumbLabel="নেভিগেশন"
      title="যাকাত ক্যালকুলেটর"
      intro="সোনা ও রুপার আজকের ভরির দাম, তারপর আপনার নগদ, ব্যাংক, সোনা-রুপা ও ঋণ লিখুন। নিসাব পূর্ণ হলে কত টাকা যাকাত দিতে হবে তা সঙ্গে সঙ্গে দেখুন।"
      tool={<BengaliZakat />}
      related={{
        title: "আরও ইসলামিক টুলস",
        links: [
          { href: ISLAMIC_TOOL_PATHS.kaza.bn, label: "কাজা নামাজ ও রোজা হিসাব" },
          { href: ISLAMIC_TOOL_PATHS.khatam.bn, label: "কুরআন খতম পরিকল্পনা" },
          { href: ISLAMIC_TOOL_PATHS.qasr.bn, label: "কসর দূরত্ব হিসাব" },
          { href: "/bn/gold-price-calculator", label: "সোনার দাম ক্যালকুলেটর" },
        ],
      }}
      tocTitle="সূচিপত্র"
      tocItems={[
        { id: "niyom", label: "যাকাত হিসাবের নিয়ম" },
        { id: "faq", label: "প্রশ্নোত্তর" },
      ]}
      faqTitle="প্রশ্নোত্তর"
      faqItems={faqItems}
    >
      <h2 id="niyom">যাকাত হিসাবের নিয়ম</h2>
      <p>
        নগদ টাকা, ব্যাংকে জমা, সঞ্চয়পত্র ও শেয়ার, ব্যবসার পণ্য, ফেরত পাওয়ার আশা আছে এমন পাওনা এবং সোনা-রুপার বাজারমূল্য যোগ করুন; এরপর ঋণ বাদ দিন।
        বাকি সম্পদ নিসাবের সমান বা বেশি হলে এবং তার ওপর এক চান্দ্র বছর পূর্ণ হলে ২.৫ শতাংশ যাকাত দিতে হয়। বসবাসের বাড়ি, ব্যবহারের গাড়ি ও
        আসবাবপত্রে যাকাত নেই। সোনা-রুপার দাম প্রতিদিন বদলায়, তাই এই পেজে কোনো দাম সংরক্ষণ করা হয়নি; বাজুস ঘোষিত আজকের দাম নিজে লিখুন।
      </p>
    </TimeToolPage>
  );
}
