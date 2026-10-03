import type { Metadata } from "next";
import { UzbekXatm } from "../../components/dini/UzbekIslamicTools";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { islamicAlternates, UZBEK_ISLAMIC_PATHS } from "../../i18n/islamicToolPaths";
import { formatUz } from "../../converter/uzNumber";
import { buildSiteUrl } from "../../siteConfig";

const path = UZBEK_ISLAMIC_PATHS.xatm;
const title = "Qur’on xatm rejasi: necha kunda xatm, kuniga necha pora";
const description = "7, 10, 20, 30 yoki 40 kunda Qur’onni xatm qilish uchun har kuni necha pora o‘qish kerakligini hisoblang. Jamoaviy xatmda poralarni kishilarga taqsimlang.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, languages: islamicAlternates("khatam") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "uz_UZ", type: "website" },
};

const f = (n: number) => formatUz(n, 2);

const faqItems: FaqItem[] = [
  {
    question: "Bir oyda xatm qilish uchun kuniga necha pora o‘qish kerak?",
    answer: "Qur’on 30 pora, shuning uchun 30 kunda xatm qilish uchun har kuni 1 pora o‘qiladi. Har namozdan keyin poraning beshdan bir qismini o‘qisangiz kifoya.",
  },
  {
    question: "Ramazonda 10 yoki 15 kunda xatm qilish uchun-chi?",
    answer: `10 kunda xatm uchun kuniga 3 pora, 15 kunda 2 pora, 20 kunda ${f(30 / 20)} pora.`,
  },
  {
    question: "Jamoaviy xatmda poralar qanday taqsimlanadi?",
    answer: "Ishtirokchilar sonini kiriting: 30 pora tartib bilan imkon qadar teng bo‘linadi. 30 kishi bo‘lsa, har biri bir poradan o‘qiydi.",
  },
];

export default function UzXatmPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/uz", label: "Bosh sahifa" },
        { href: "/uz/turkumlar", label: "Turkumlar" },
        { href: path, label: "Qur’on xatm rejasi" },
      ]}
      crumbLabel="Navigatsiya"
      title="Qur’on xatm rejasi"
      intro="Necha kunda xatm qilmoqchi ekaningizni kiriting: har kuni va har namozdan keyin necha pora o‘qish kerakligini ko‘ring. Jamoaviy xatm uchun poralarni ishtirokchilarga taqsimlang."
      tool={<UzbekXatm />}
      related={{
        title: "Boshqa islomiy hisoblagichlar",
        links: [
          { href: UZBEK_ISLAMIC_PATHS.qazo, label: "Qazo namoz va ro‘zani hisoblash" },
          { href: "/uz/hijriy-milodiy-sana-aylantirgich", label: "Hijriy-milodiy sana aylantirgich" },
        ],
      }}
      tocTitle="Mundarija"
      tocItems={[
        { id: "jadval", label: "Xatm muddati va kunlik pora" },
        { id: "faq", label: "Ko‘p beriladigan savollar" },
      ]}
      faqTitle="Ko‘p beriladigan savollar"
      faqItems={faqItems}
    >
      <h2 id="jadval">Xatm muddati va kunlik pora</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table">
          <thead>
            <tr>
              <th scope="col">Xatm muddati</th>
              <th scope="col">Kuniga</th>
            </tr>
          </thead>
          <tbody>
            {[7, 10, 15, 20, 30, 40, 60].map((d) => (
              <tr key={d}>
                <td>{d} kun</td>
                <td>{f(30 / d)} pora</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>Ko‘plab ulamolar ma’nosini tushunib, shoshilmasdan o‘qish uchun uch kundan kam muddatda xatm qilmaslikni maslahat beradi.</p>
    </TimeToolPage>
  );
}
