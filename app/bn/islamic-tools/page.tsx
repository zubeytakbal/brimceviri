import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import {
  CUZ_SAYISI,
  KASR_KM,
  KASR_MIL,
  NISAB_ALTIN_VORI,
  NISAB_GUMUS_VORI,
  VORI_GRAM,
  ZEKAT_ORANI,
  kazaNamazi,
} from "../../converter/diniHesaplar";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { BENGALI_ISLAMIC_HUB, ISLAMIC_HUB_ALTERNATES, ISLAMIC_TOOL_PATHS } from "../../i18n/islamicToolPaths";
import { buildSiteUrl } from "../../siteConfig";

const title = "ইসলামিক টুলস: যাকাত, কাজা নামাজ, খতম ও কসর হিসাব";
const description = "বাংলায় ইসলামিক ক্যালকুলেটর: ভরি হিসাবে যাকাত, কাজা নামাজ ও রোজা, কুরআন খতম পরিকল্পনা এবং কসর নামাজের দূরত্ব।";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: BENGALI_ISLAMIC_HUB, languages: ISLAMIC_HUB_ALTERNATES },
  openGraph: { title, description, url: buildSiteUrl(BENGALI_ISLAMIC_HUB), siteName: "BirimCeviri.app", locale: "bn_BD", type: "website" },
};

const f = (n: number, d = 2) => n.toLocaleString("bn-BD", { maximumFractionDigits: d });
const kazaYear = kazaNamazi(1, 0, 0, true, 5)!;
const kazaYearNoWitr = kazaNamazi(1, 0, 0, false, 5)!;
const threeYearDays = kazaNamazi(3, 0, 0, true, 5)!.bitisGun;

const tools = [
  { href: ISLAMIC_TOOL_PATHS.zakat.bn, label: "যাকাত ক্যালকুলেটর", text: "সাড়ে ৫২ ভরি রুপা বা সাড়ে ৭ ভরি সোনার নিসাব ধরে যাকাত হিসাব।" },
  { href: ISLAMIC_TOOL_PATHS.kaza.bn, label: "কাজা নামাজ ও রোজা হিসাব", text: "কত বছরের কাজা, কত ওয়াক্ত ও রাকাত, কবে শেষ হবে।" },
  { href: ISLAMIC_TOOL_PATHS.khatam.bn, label: "কুরআন খতম পরিকল্পনা", text: "দৈনিক কত পারা, সম্মিলিত খতমে পারা ভাগ।" },
  { href: ISLAMIC_TOOL_PATHS.qasr.bn, label: "কসর দূরত্ব হিসাব", text: "৪৮ মাইল ও ১৫ দিনের নিয়মে আপনি মুসাফির কি না।" },
];

const faqItems: FaqItem[] = [
  {
    question: "এই ক্যালকুলেটরের ফলাফল কি ফতোয়া?",
    answer:
      "না। টুলগুলো শুধু গাণিতিক অংশটুকু করে: আপনার দেওয়া সংখ্যা থেকে যোগ, ভাগ ও শতাংশ। কোন সম্পদ যাকাতযোগ্য, কোন সফর শরিয়তের সফর বা কোন নামাজ কাজা হয়েছে, এসব প্রশ্নের উত্তর ব্যক্তির অবস্থার ওপর নির্ভর করে। নিজের ক্ষেত্রে সন্দেহ থাকলে নির্ভরযোগ্য আলেমকে জিজ্ঞাসা করুন।",
  },
  {
    question: "সোনা-রুপার দাম বা নামাজের সময় কেন দেখানো হয় না?",
    answer:
      "এগুলো প্রতিদিন বা এলাকাভেদে বদলায়। পুরনো দাম দিয়ে যাকাত হিসাব করলে ফল ভুল হবে, তাই যাকাত ক্যালকুলেটরে যেদিন হিসাব করছেন সেদিনের ভরির দাম নিজে লিখতে হয়।",
  },
  {
    question: "এক ভরি কত গ্রাম ধরা হয়েছে?",
    answer: `এখানে ১ ভরি = ${f(VORI_GRAM, 3)} গ্রাম। এই মানে সাড়ে ৭ ভরি সোনা ${f(NISAB_ALTIN_VORI * VORI_GRAM)} গ্রাম এবং সাড়ে ৫২ ভরি রুপা ${f(NISAB_GUMUS_VORI * VORI_GRAM)} গ্রাম। গহনার ওজন আনা ও রতিতে লেখা থাকলে সোনার দাম ক্যালকুলেটরে তা ভরিতে মিলিয়ে নিতে পারেন।`,
  },
];

export default function BnIslamicToolsPage() {
  return (
    <main className="other-categories-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(faqItems)).replace(/</g, "\\u003c") }} />
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

        <section className="category-article-content">
          <h2>কোন হিসাবের জন্য কোন টুল</h2>
          <p>
            <strong>সম্পদের হিসাব:</strong> যে চান্দ্র তারিখে আপনার সম্পদ প্রথম নিসাবে পৌঁছেছিল, প্রতি বছর সেই তারিখে যাকাত
            ক্যালকুলেটর খুলুন। নগদ, ব্যাংকের জমা, ব্যবসার মাল আর সোনা-রুপা আলাদা ঘরে লিখলে কোন খাত থেকে কত এল তা পরিষ্কার থাকে।
            গহনার ওজন গ্রামে জানা থাকলে আগে ভরিতে রূপান্তর করুন; বাজারদর মিলিয়ে দেখতে{" "}
            <Link href="/bn/gold-price-calculator">সোনার দাম ক্যালকুলেটর</Link> কাজে লাগে।
          </p>
          <p>
            <strong>ইবাদতের হিসাব:</strong> জীবনের কোনো সময়ে নিয়মিত নামাজ বা রোজা ছুটে গিয়ে থাকলে কাজা হিসাব মোট সংখ্যাটি বের করে দেয়
            এবং দৈনিক কতটুকু আদায় করলে কবে শেষ হবে তা দেখায়। খতম পরিকল্পনা একা পড়ার লক্ষ্য ঠিক করতে, অথবা পরিবার বা মসজিদে সম্মিলিত
            খতমে কে কোন পারা পড়বেন তা ভাগ করতে ব্যবহার করুন।
          </p>
          <p>
            <strong>সফরের হিসাব:</strong> গ্রামের বাড়ি, অন্য জেলা বা বিদেশে যাওয়ার আগে রাস্তার দূরত্ব আর সেখানে কত দিন থাকার ইচ্ছা, এই
            দুটি সংখ্যা দিয়ে কসর দূরত্ব হিসাব বলে দেয় নামাজ কসর হবে কি না। ঢাকা থেকে কোনো শহরের দূরত্ব ম্যাপে সড়কপথে দেখে নিন, সরলরেখায়
            নয়।
          </p>

          <h2>এক নজরে মূল সংখ্যাগুলো</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th scope="col">বিষয়</th>
                  <th scope="col">টুলে ধরা মান</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>সোনার নিসাব</td>
                  <td>
                    {f(NISAB_ALTIN_VORI, 1)} ভরি = {f(NISAB_ALTIN_VORI * VORI_GRAM)} গ্রাম
                  </td>
                </tr>
                <tr>
                  <td>রুপার নিসাব</td>
                  <td>
                    {f(NISAB_GUMUS_VORI, 1)} ভরি = {f(NISAB_GUMUS_VORI * VORI_GRAM)} গ্রাম
                  </td>
                </tr>
                <tr>
                  <td>যাকাতের হার</td>
                  <td>{f(ZEKAT_ORANI * 100, 1)}% (প্রতি ১ লাখ টাকায় {f(100000 * ZEKAT_ORANI, 0)} টাকা)</td>
                </tr>
                <tr>
                  <td>এক বছরের কাজা নামাজ (বিতরসহ)</td>
                  <td>
                    {f(kazaYear.vakit, 0)} ওয়াক্ত, {f(kazaYear.rekat, 0)} রাকাত
                  </td>
                </tr>
                <tr>
                  <td>এক বছরের কাজা নামাজ (শুধু ফরজ)</td>
                  <td>
                    {f(kazaYearNoWitr.vakit, 0)} ওয়াক্ত, {f(kazaYearNoWitr.rekat, 0)} রাকাত
                  </td>
                </tr>
                <tr>
                  <td>এক মাসে খতম</td>
                  <td>{f(CUZ_SAYISI, 0)} পারা ÷ ৩০ দিন = দৈনিক ১ পারা</td>
                </tr>
                <tr>
                  <td>কসরের দূরত্ব</td>
                  <td>
                    {f(KASR_MIL, 0)} মাইল ≈ {f(KASR_KM)} কিলোমিটার
                  </td>
                </tr>
                <tr>
                  <td>মুকিম হওয়ার নিয়ত</td>
                  <td>এক জায়গায় ১৫ দিন বা বেশি</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            উদাহরণ হিসেবে, কারও তিন বছরের নামাজ ছুটে গিয়ে থাকলে বিতরসহ মোট {f(kazaYear.vakit * 3, 0)} ওয়াক্ত হয়। প্রতিদিন পাঁচ ওয়াক্ত
            করে কাজা পড়লে এটি {f(threeYearDays, 0)} দিনে, অর্থাৎ প্রায় {f(threeYearDays / 365, 1)} বছরে শেষ হবে; দিনে দশ ওয়াক্ত পড়লে
            সময় অর্ধেকে নেমে আসে।
          </p>

          <h2>হিসাবের ধরন ও মাজহাবের পার্থক্য</h2>
          <p>
            টুলগুলোর ডিফল্ট মান হানাফি মাজহাব অনুযায়ী, কারণ বাংলাদেশের অধিকাংশ মুসলমান এই মাজহাব অনুসরণ করেন। যেখানে অন্য মত প্রচলিত,
            সেখানে বদলানোর সুযোগ রাখা হয়েছে। হানাফি মাজহাবে বিতর ওয়াজিব বলে কাজার হিসাবে তা যোগ হয়; শাফেয়ি, মালেকি ও হাম্বলি মাজহাবে
            বিতর সুন্নত, তাই কাজা টুলে বিতর বাদ দেওয়ার ঘরটি আছে। যাকাতে নগদ অর্থের জন্য সোনা না রুপার নিসাব ধরা হবে, তা নিয়ে আলেমদের
            মত আলাদা, সেজন্য দুটিই বেছে নেওয়া যায়।
          </p>
          <p>
            সফরের ক্ষেত্রে হানাফি মাজহাবে ১৫ দিনের কম থাকার নিয়ত হলে মুসাফির থাকা যায়; শাফেয়ি ও মালেকি মাজহাবে এই সীমা চার দিন। দূরত্বের
            সীমা নিয়ে মাজহাবগুলোর মত কাছাকাছি হলেও প্রাচীন মাইল বা ফারসাখকে কিলোমিটারে রূপান্তরের হিসাবে আলেমদের মধ্যে কিছুটা পার্থক্য
            আছে। এই পেজ কোনো মতকে শ্রেষ্ঠ বলে না; শুধু কোন টুল কোন মান ধরে হিসাব করছে তা স্পষ্ট করে।
          </p>

          <h2>প্রশ্নোত্তর</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}
          <p>
            মণ, সের ও তোলার মতো পুরনো ওজনকে কেজি-গ্রামে নিতে দেখুন{" "}
            <Link href="/bn/traditional-weight">ঐতিহ্যবাহী ওজন রূপান্তর</Link>।
          </p>
        </section>
      </div>
    </main>
  );
}
