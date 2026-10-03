import type { Metadata } from "next";
import { UzbekQazo } from "../../components/dini/UzbekIslamicTools";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { kazaNamazi } from "../../converter/diniHesaplar";
import { islamicAlternates, UZBEK_ISLAMIC_PATHS } from "../../i18n/islamicToolPaths";
import { formatUz } from "../../converter/uzNumber";
import { buildSiteUrl } from "../../siteConfig";

const path = UZBEK_ISLAMIC_PATHS.qazo;
const title = "Qazo namozlarni hisoblash: necha vaqt, necha rakat, qazo ro‘za";
const description =
  "Necha yil, oy yoki kun namoz o‘qilmaganini kiriting: jami qazo namozlar, rakatlar soni va kuniga necha vaqt o‘qisangiz qachon tugashini bilib oling. Qazo ro‘za hisobi ham bor.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, languages: islamicAlternates("kaza") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "uz_UZ", type: "website" },
};

const f = (n: number) => formatUz(n);
const one = kazaNamazi(1, 0, 0, true, 5)!;

const faqItems: FaqItem[] = [
  {
    question: "Bir yillik qazo namoz necha vaqt bo‘ladi?",
    answer: `Vitr bilan kuniga 6 vaqt hisoblansa, bir yilda (365 kun) ${f(one.vakit)} vaqt va ${f(one.rekat)} rakat. Kuniga 5 vaqt qazo o‘qilsa, taxminan ${f(one.bitisGun)} kunda tugaydi.`,
  },
  {
    question: "Qaysi namozlar qazo qilinadi?",
    answer: "Faqat farzlar va Hanafiy mazhabiga ko‘ra vitr (vojib): bomdod 2, peshin 4, asr 4, shom 3, xufton 4 va vitr 3 rakat. Sunnat namozlarning qazosi yo‘q.",
  },
  {
    question: "Qancha qazo borligini aniq bilmasam nima qilaman?",
    answer: "G‘olib gumoningizga ko‘ra bir miqdorni belgilang, ehtiyot uchun biroz ko‘proq oling va har kuni muntazam ravishda bir necha vaqt qazo o‘qib boring. Savollaringiz bo‘lsa, imom-xatibga murojaat qiling.",
  },
];

export default function UzQazoPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/uz", label: "Bosh sahifa" },
        { href: "/uz/turkumlar", label: "Turkumlar" },
        { href: path, label: "Qazo namozlarni hisoblash" },
      ]}
      crumbLabel="Navigatsiya"
      title="Qazo namoz va qazo ro‘zani hisoblash"
      intro="Qancha vaqt namoz o‘qilmaganini va nechta Ramazon ro‘zasi tutilmaganini kiriting: jami qazo va har kuni yoki har hafta qanchadan ado etsangiz qachon tugashini ko‘ring."
      tool={<UzbekQazo />}
      related={{
        title: "Boshqa islomiy hisoblagichlar",
        links: [
          { href: UZBEK_ISLAMIC_PATHS.xatm, label: "Qur’on xatm rejasi" },
          { href: "/uz/hijriy-milodiy-sana-aylantirgich", label: "Hijriy-milodiy sana aylantirgich" },
        ],
      }}
      tocTitle="Mundarija"
      tocItems={[
        { id: "hisob", label: "Qazo qanday hisoblanadi" },
        { id: "faq", label: "Ko‘p beriladigan savollar" },
      ]}
      faqTitle="Ko‘p beriladigan savollar"
      faqItems={faqItems}
    >
      <h2 id="hisob">Qazo qanday hisoblanadi</h2>
      <p>
        Namoz o‘qilmagan har bir kun uchun besh vaqt farz va vitr qazo bo‘ladi. Yil 365 kun, oy 30 kun deb olingan; aniq kunlar sonini bilsangiz,
        «Kun» maydoniga yozing. Ro‘zada har bir Ramazon 30 kun deb hisoblanadi va alohida qoldirilgan kunlar qo‘shiladi. Kafforat kabi alohida
        hukmlar bu hisobga kirmaydi.
      </p>
    </TimeToolPage>
  );
}
