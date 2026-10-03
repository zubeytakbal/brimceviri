import type { Metadata } from "next";
import { BengaliKhatam } from "../../components/dini/BengaliIslamicTools";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { BENGALI_ISLAMIC_HUB, ISLAMIC_TOOL_PATHS, islamicAlternates } from "../../i18n/islamicToolPaths";
import { buildSiteUrl } from "../../siteConfig";

const path = ISLAMIC_TOOL_PATHS.khatam.bn;
const title = "কুরআন খতম পরিকল্পনা: কত দিনে খতম, দৈনিক কত পারা";
const description = "৭, ১০, ২০, ৩০ বা ৪০ দিনে কুরআন খতম করতে প্রতিদিন কত পারা পড়তে হবে হিসাব করুন। সম্মিলিত খতমে কে কোন পারা পড়বেন তাও ভাগ করুন।";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, languages: islamicAlternates("khatam") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "bn_BD", type: "website" },
};

const f = (n: number, d = 2) => n.toLocaleString("bn-BD", { maximumFractionDigits: d });

const faqItems: FaqItem[] = [
  {
    question: "এক মাসে কুরআন খতম করতে দৈনিক কত পারা পড়তে হয়?",
    answer: "কুরআনে ৩০ পারা, তাই ৩০ দিনে খতম করতে প্রতিদিন ১ পারা। প্রতি ওয়াক্ত নামাজের পর এক পারার পাঁচ ভাগের এক ভাগ পড়লেই হয়ে যায়।",
  },
  {
    question: "রমজানে ১০ বা ১৫ দিনে খতম করতে কত পারা লাগে?",
    answer: `১০ দিনে খতম করতে দৈনিক ৩ পারা, ১৫ দিনে ২ পারা এবং ২০ দিনে ${f(30 / 20)} পারা।`,
  },
  {
    question: "সম্মিলিত খতমে পারা কীভাবে ভাগ করব?",
    answer: "অংশগ্রহণকারীর সংখ্যা লিখুন; ৩০ পারা ক্রমানুসারে যতটা সম্ভব সমানভাবে ভাগ হবে। ৩০ জন হলে প্রত্যেকে এক পারা পড়বেন।",
  },
];

export default function BnKhatamPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/bn", label: "হোম" },
        { href: BENGALI_ISLAMIC_HUB, label: "ইসলামিক টুলস" },
        { href: path, label: "কুরআন খতম পরিকল্পনা" },
      ]}
      crumbLabel="নেভিগেশন"
      title="কুরআন খতম পরিকল্পনা"
      intro="কত দিনে খতম করতে চান লিখুন: প্রতিদিন ও প্রতি ওয়াক্তে কত পারা পড়তে হবে দেখুন। সম্মিলিত খতমের জন্য পারাগুলো অংশগ্রহণকারীদের মধ্যে ভাগ করুন।"
      tool={<BengaliKhatam />}
      related={{
        title: "আরও ইসলামিক টুলস",
        links: [
          { href: ISLAMIC_TOOL_PATHS.zakat.bn, label: "যাকাত ক্যালকুলেটর" },
          { href: ISLAMIC_TOOL_PATHS.kaza.bn, label: "কাজা নামাজ ও রোজা হিসাব" },
          { href: ISLAMIC_TOOL_PATHS.qasr.bn, label: "কসর দূরত্ব হিসাব" },
        ],
      }}
      tocTitle="সূচিপত্র"
      tocItems={[
        { id: "tobil", label: "খতমের সময় ও দৈনিক পারা" },
        { id: "faq", label: "প্রশ্নোত্তর" },
      ]}
      faqTitle="প্রশ্নোত্তর"
      faqItems={faqItems}
    >
      <h2 id="tobil">খতমের সময় ও দৈনিক পারা</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">খতমের সময়</th>
              <th scope="col">দৈনিক পারা</th>
            </tr>
          </thead>
          <tbody>
            {[7, 10, 15, 20, 30, 40, 60].map((d) => (
              <tr key={d}>
                <td>{f(d, 0)} দিন</td>
                <td>{f(30 / d)} পারা</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>অনেক আলেম তিন দিনের কম সময়ে খতম না করার পরামর্শ দেন, যাতে অর্থ বুঝে ও ধীরে পড়া যায়।</p>
    </TimeToolPage>
  );
}
