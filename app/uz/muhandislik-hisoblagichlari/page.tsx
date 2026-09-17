import type { Metadata } from "next";
import Link from "next/link";
import StaticPageLayout from "../../components/StaticPageLayout";
import { buildSiteUrl } from "../../siteConfig";

const pagePath = "/uz/muhandislik-hisoblagichlari";

export const metadata: Metadata = {
  title: "Muhandislik Hisoblagichlari Markazi",
  description:
    "Bosim, suyuqliklar, issiqlik energetikasi, elektr va material muhandisligi bo'yicha barcha O'zbekcha muhandislik hisoblagichlariga bir joydan o'ting.",
  alternates: {
    canonical: pagePath,
    languages: {
      tr: "/muhendislik-hesaplayicilari",
      "uz-UZ": pagePath,
      "x-default": "/muhendislik-hesaplayicilari",
    },
  },
  openGraph: {
    title: "Muhandislik Hisoblagichlari Markazi",
    description: "Barcha muhandislik hisoblagichlariga bir joydan o'ting.",
    url: buildSiteUrl(pagePath),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

const pressureAndFluidLinks = [
  {
    href: "/uz/bosim-kuch-maydon-hisoblash",
    title: "Bosim, Kuch va Maydon",
    description: "P = F / A formulasi bilan bosim, kuch va maydon orasida hisoblang.",
  },
  {
    href: "/uz/gidrostatik-bosim-hisoblash",
    title: "Gidrostatik Bosim",
    description: "Zichlik, chuqurlik va tortishish kuchidan bosim farqini hisoblang.",
  },
  {
    href: "/uz/reynolds-soni-hisoblash",
    title: "Reynolds Soni",
    description: "Tezlik, qovushqoqlik, diametr va zichlikdan oqim rejimini baholang.",
  },
  {
    href: "/uz/quvur-diametri-sarfi-hisoblash",
    title: "Quvur Diametri va Sarfi",
    description: "Suyuqlik sarfi va tezligidan kerakli quvur diametrini hisoblang.",
  },
  {
    href: "/uz/bosim-yoqotilishi-hisoblash",
    title: "Quvurda Bosim Yo'qotilishi",
    description: "Darcy-Weisbach formulasi bilan ishqalanishdan bosim yo'qotilishini hisoblang.",
  },
];

const thermalLinks = [
  {
    href: "/uz/issiqlik-energiyasi-hisoblash",
    title: "Issiqlik Energiyasi",
    description: "Q = m × c × ΔT formulasi bilan isitish/sovutish energiyasini hisoblang.",
  },
  {
    href: "/uz/issiqlik-otkazuvchanligi-hisoblash",
    title: "Issiqlik O'tkazuvchanligi",
    description: "Turli material va qalinliklarda issiqlik o'tish tezligini solishtiring.",
  },
  {
    href: "/uz/issiqlik-kengayishi-hisoblash",
    title: "Issiqlik Kengayishi",
    description: "Harorat o'zgarishidan materialning chiziqli kengayishini hisoblang.",
  },
  {
    href: "/uz/superheat-subcooling-hisoblash",
    title: "Superheat / Subcooling",
    description: "Sovutish tizimlarida haddan tashqari qizish va sovutishni hisoblang.",
  },
];

const electricalLinks = [
  {
    href: "/uz/om-qonuni-hisoblash",
    title: "Om Qonuni",
    description: "V = I × R formulasi bilan kuchlanish, tok yoki qarshilikni hisoblang.",
  },
  {
    href: "/uz/kvt-dan-amperga-aylantirgich",
    title: "kVt dan Amperga Aylantirgich",
    description: "Quvvat va kuchlanishdan tok kuchini hisoblang.",
  },
  {
    href: "/uz/amperdan-kvt-ga-aylantirgich",
    title: "Amperdan kVt ga Aylantirgich",
    description: "Tok va kuchlanishdan elektr quvvatini hisoblang.",
  },
  {
    href: "/uz/payvandlash-amperaji-hisoblash",
    title: "Payvandlash Amperaji",
    description: "Elektrod diametri va qoplama turidan payvandlash tokini hisoblang.",
  },
  {
    href: "/uz/payvandlash-issiqlik-kiritishi-hisoblash",
    title: "Payvandlash Issiqlik Kiritishi",
    description: "Kuchlanish, tok va tezlikdan payvandlash issiqlik kiritishini hisoblang.",
  },
];

const materialAndMechanicalLinks = [
  {
    href: "/uz/material-xossalari",
    title: "Material Xossalari Markazi",
    description: "100 dan ortiq materialning zichligi va boshqa fizik xossalari.",
  },
  {
    href: "/uz/material-ogirligi-hisoblash",
    title: "Material Og'irligi",
    description: "Hajm va zichlikdan metall/material qismlarining og'irligini hisoblang.",
  },
  {
    href: "/uz/elastik-chozilish-hisoblash",
    title: "Elastik Cho'zilish",
    description: "Kuchlanish va elastiklik modulidan materialning cho'zilishini hisoblang.",
  },
  {
    href: "/uz/bolt-torki-hisoblash",
    title: "Bolt Torki",
    description: "Bolt diametri va material turidan kerakli tortish momentini hisoblang.",
  },
  {
    href: "/uz/kesish-tezligi-aylanish-hisoblash",
    title: "Kesish Tezligi va Aylanish",
    description: "Material va asbob diametridan shpindel aylanish tezligini hisoblang.",
  },
  {
    href: "/uz/anten-uzunligi-hisoblash",
    title: "Anten Uzunligi",
    description: "Chastotadan dipol/monopol antenna uzunligini hisoblang.",
  },
  {
    href: "/uz/hafriyat-hisoblash",
    title: "Hafriyat Hajmi",
    description: "O'lchamlardan qazish va tuproq hajmini hisoblang.",
  },
];

export default function UzbekEngineeringHubPage() {
  return (
    <StaticPageLayout
      locale="uz"
      breadcrumbAriaLabel="Sahifa yo'li"
      breadcrumbs={[
        { href: "/uz", label: "Bosh sahifa" },
        { label: "Muhandislik Hisoblagichlari Markazi" },
      ]}
      title="Muhandislik Hisoblagichlari Markazi"
      description="Bosim va suyuqliklar, issiqlik energetikasi, elektr va material muhandisligi bo'yicha barcha muhandislik hisoblagichlarini mavzu bo'yicha guruhlangan holda toping."
      alternateLink={{
        href: "/muhendislik-hesaplayicilari",
        hrefLang: "tr",
        label: "Turkcha versiyasini ko'rish",
      }}
      sections={[
        {
          heading: "Bosim va Suyuqliklar",
          content: (
            <ul className="related-conversion-list">
              {pressureAndFluidLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <strong>{item.title}</strong>
                    {" — "}
                    {item.description}
                  </Link>
                </li>
              ))}
            </ul>
          ),
        },
        {
          heading: "Issiqlik Energetikasi",
          content: (
            <ul className="related-conversion-list">
              {thermalLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <strong>{item.title}</strong>
                    {" — "}
                    {item.description}
                  </Link>
                </li>
              ))}
            </ul>
          ),
        },
        {
          heading: "Elektr",
          content: (
            <ul className="related-conversion-list">
              {electricalLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <strong>{item.title}</strong>
                    {" — "}
                    {item.description}
                  </Link>
                </li>
              ))}
            </ul>
          ),
        },
        {
          heading: "Material va Mexanika",
          content: (
            <ul className="related-conversion-list">
              {materialAndMechanicalLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <strong>{item.title}</strong>
                    {" — "}
                    {item.description}
                  </Link>
                </li>
              ))}
            </ul>
          ),
        },
      ]}
    />
  );
}
