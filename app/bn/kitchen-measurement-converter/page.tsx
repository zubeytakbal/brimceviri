import type { Metadata } from "next";
import Link from "next/link";
import KitchenMeasuresConverter from "../../components/KitchenMeasuresConverter";
import { kitchenIngredientLabels } from "../../converter/kitchenIngredientLabels";
import { kitchenIngredientRows } from "../../converter/kitchenMeasures";
import { buildSiteUrl } from "../../siteConfig";

export const metadata: Metadata = {
  title: "রান্নাঘর পরিমাপ রূপান্তরকারী",
  description:
    "উপাদানের ধরন অনুযায়ী কাপ, চামচ, গ্রাম ও মিলিলিটার রূপান্তর করুন; ময়দা, চিনি, চাল, মধু, মাখন ইত্যাদির আনুমানিক মান দেখুন।",
  alternates: {
    canonical: "/bn/kitchen-measurement-converter",
    languages: {
      tr: "/mutfak-olculeri-cevirici",
      en: "/en/kitchen-measurement-converter",
      de: "/de/kuechenmass-umrechner",
      bn: "/bn/kitchen-measurement-converter",
      "x-default": "/mutfak-olculeri-cevirici",
    },
  },
  openGraph: {
    title: "রান্নাঘর পরিমাপ রূপান্তরকারী",
    description: "উপাদানের ধরন অনুযায়ী কাপ, চামচ, গ্রাম ও মিলিলিটার রূপান্তর করুন।",
    url: buildSiteUrl("/bn/kitchen-measurement-converter"),
    siteName: "BirimCeviri.app",
    locale: "bn_BD",
    type: "website",
  },
};

export default function BengaliKitchenMeasurementsPage() {
  return (
    <main className="all-conversions-page" lang="bn">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="ব্রেডক্রাম্ব">
          <Link href="/bn">হোম</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>রান্নাঘর পরিমাপ রূপান্তরকারী</span>
        </nav>

        <header className="all-conversions-header">
          <h1>রান্নাঘর পরিমাপ রূপান্তরকারী</h1>

          <p>
            আপনার জানা উপাদান ও একক বেছে নিন, সাথে সাথে গ্লাস, টেবিল
            চামচ, চা চামচ, গ্রাম, মিলিলিটার ও লিটারে সমতুল্য মান দেখুন।
            প্রতিটি উপাদানের ঘনত্ব ভিন্ন, তাই ময়দা, চিনি, চাল, মধু,
            মাখন ইত্যাদির জন্য আলাদা মান ব্যবহার করে হিসাব করা হয়।
          </p>
        </header>

        <KitchenMeasuresConverter locale="bn" />

        <section className="category-article-content">
          <h2>এক গ্লাস ময়দা বা এক চামচ চিনিতে কত গ্রাম থাকে?</h2>
          <p>
            সব কিছুর জন্য একটিমাত্র নিয়ম কাজ করে না, কারণ গ্লাস আয়তন
            মাপে আর গ্রাম ভর মাপে। এক গ্লাস ময়দা এক গ্লাস চিনির চেয়ে
            হালকা, আর মধু দুটোর চেয়েই ভারী -- তাই উপাদানের ঘনত্ব
            অনুযায়ী রূপান্তর ভিন্ন হয়।
          </p>
          <p>
            এখানকার মানগুলো দৈনন্দিন রান্নার জন্য উপযোগী ব্যবহারিক
            গড় মান। প্যাকেজিং, চালনা বা পণ্যের ধরনের ভিন্নতার কারণে
            চূড়ান্ত ওজন সামান্য পরিবর্তিত হতে পারে, তবে ফলাফল
            গৃহস্থালি ব্যবহারের জন্য যথেষ্ট নির্ভরযোগ্য।
          </p>

          <h2>সাধারণ উপাদানের তালিকা (১ গ্লাস = ২০০ মিলি)</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>প্রতি গ্লাস, টেবিল চামচ ও চা চামচের আনুমানিক গ্রাম</caption>
              <thead>
                <tr>
                  <th scope="col">উপাদান</th>
                  <th scope="col">১ গ্লাস</th>
                  <th scope="col">১ টেবিল চামচ</th>
                  <th scope="col">১ চা চামচ</th>
                </tr>
              </thead>
              <tbody>
                {kitchenIngredientRows.map((row) => (
                  <tr key={row.key}>
                    <td>{kitchenIngredientLabels.bn[row.key]}</td>
                    <td>{Math.round(row.gramsPerBardak)} গ্রাম</td>
                    <td>{Math.round((row.gramsPerBardak * 15) / 200)} গ্রাম</td>
                    <td>{Math.round((row.gramsPerBardak * 5) / 200)} গ্রাম</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>সাধারণ প্রশ্ন</h2>
          <p>
            <strong>টেবিল চামচে কত মিলিলিটার থাকে?</strong>
            <br />
            টেবিল চামচ ১৫ মিলিলিটারের সমান, অর্থাৎ ৩ চা চামচ। এখানে
            ব্যবহৃত গ্লাস ২০০ মিলিলিটারের সমান।
          </p>
          <p>
            <strong>উপাদানভেদে গ্লাসের ওজন কেন ভিন্ন হয়?</strong>
            <br />
            কারণ আয়তন স্থির থাকলেও ঘনত্ব ভিন্ন। ময়দার মতো হালকা
            উপাদান একই আয়তনে মধুর মতো ভারী উপাদানের চেয়ে কম ওজন দেয়।
          </p>
          <p>
            পুরো একটি রেসিপি বড় বা ছোট করতে চাইলে{" "}
            <Link href="/bn/recipe-converter">রেসিপি রূপান্তরকারী</Link>
            {" "}ব্যবহার করে দেখুন।
          </p>
        </section>

        <section className="conversion-section related-conversions">
          <h2>সম্পর্কিত টুলস</h2>
          <ul className="related-conversion-list">
            <li>
              <Link href="/bn/recipe-converter">রেসিপি রূপান্তরকারী</Link>
            </li>
            <li>
              <Link href="/bn/shoe-size-converter">জুতার মাপ রূপান্তরকারী</Link>
            </li>
            <li>
              <Link href="/bn/historical-units">ঐতিহাসিক পরিমাপ একক</Link>
            </li>
            <li>
              <Link href="/bn/categories/bhor">ভরের একক রূপান্তর</Link>
            </li>
          </ul>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>অন্যান্য ভাষা</h2>
          <Link
            className="text-link"
            href="/mutfak-olculeri-cevirici"
            hrefLang="tr"
          >
            তুর্কি সংস্করণ খুলুন
          </Link>
        </section>
      </div>
    </main>
  );
}
