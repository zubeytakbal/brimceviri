import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import StaticPageLayout from "../../components/StaticPageLayout";
import {
  SITE_CONTACT_EMAIL,
  SITE_NAME,
  SITE_URL,
} from "../../siteConfig";

export const metadata: Metadata = {
  title: "Aloqa",
  description:
    "BirimCeviri.app bilan bog'liq fikr-mulohaza, tuzatishlar va texnik muammolar uchun aloqa ma'lumotlari.",
  alternates: {
    canonical: "/uz/aloqa",
    languages: {
      tr: "/iletisim",
      "uz-UZ": "/uz/aloqa",
      "x-default": "/iletisim",
    },
  },
  openGraph: {
    title: `Aloqa | ${SITE_NAME}`,
    description:
      "BirimCeviri.app bilan bog'liq fikr-mulohaza, tuzatishlar va texnik muammolar uchun aloqa ma'lumotlari.",
    url: `${SITE_URL}/uz/aloqa`,
    siteName: SITE_NAME,
    locale: "uz_UZ",
    type: "website",
  },
};

export default function UzbekContactPage() {
  return (
    <StaticPageLayout
      locale="uz"
      breadcrumbAriaLabel="Sahifa yo'li"
      breadcrumbs={[
        { href: "/uz", label: "Bosh sahifa" },
        { label: "Aloqa" },
      ]}
      title="Aloqa"
      description="Fikr-mulohaza, tuzatishlar va umumiy muloqot uchun quyidagi manzildan foydalaning."
      sections={[
        {
          heading: "Elektron pochta",
          content: (
            <>
              <p>
                Aloqa:{" "}
                <a href={`mailto:${SITE_CONTACT_EMAIL}`}>
                  {SITE_CONTACT_EMAIL}
                </a>
              </p>
              <p>
                Texnik xatolar haqida xabar berishda sahifa manzili va
                namuna qiymatini qo&apos;shish ko&apos;rib chiqishni
                tezlashtiradi.
              </p>
            </>
          ),
        },
        {
          heading: "Qamrov",
          content: (
            <>
              <p>
                Ushbu aloqa kanali kontent tuzatishlari, texnik
                muammolar va umumiy fikr-mulohaza uchun mo&apos;ljallangan.
              </p>
              <p>
                Bu rasmiy muhandislik tasdig&apos;i, konsalting yoki
                shoshilinch xavfsizlik tekshiruvi uchun kanal emas.
              </p>
              <p>
                {`Sog'liq bilan bog'liq kalkulyatorlar (BMI, homiladorlik haftasi, uyqu va boshqalar) natijasi bo'yicha shaxsiy tibbiy maslahat bera olmaymiz. Bunday savollar bilan shifokorga, shoshilinch holatda esa tez tibbiy yordamga murojaat qiling. Soliq va to'lovlar bo'yicha rasmiy javobni soliq organlari yoki buxgalter beradi.`}
              </p>
            </>
          ),
        },
        {
          heading: "Qanday mavzularda yozishingiz mumkin",
          content: (
            <ul>
              <li>{`Hisoblash natijasida, aylantirish koeffitsientida yoki matndagi ma'lumotda ko'rgan xato.`}</li>
              <li>{`Ishlamayotgan kalkulyator, ochilmaydigan havola yoki telefonda noto'g'ri ko'rinadigan sahifa.`}</li>
              <li>{`O'zbekcha matndagi tarjima xatosi, g'alati jumla yoki noto'g'ri atama. Bunday holda jumlani aynan ko'chirib, to'g'ri variantni taklif qilsangiz, tuzatish ancha osonlashadi.`}</li>
              <li>{`Saytda yo'q birlik yoki kalkulyator bo'yicha taklif; masalan, O'zbekistonda keng ishlatiladigan, lekin bu yerda topilmagan o'lchov.`}</li>
              <li>{`Reklama, hamkorlik yoki sayt vositalaridan o'z sahifangizda foydalanish bo'yicha savollar.`}</li>
            </ul>
          ),
        },
        {
          heading: "Xato haqida xabar berishda nimalarni yozish kerak",
          content: (
            <>
              <p>
                {`Kalkulyatorlarga kiritgan qiymatlaringiz brauzeringizning o'zida hisoblanadi va bizga yuborilmaydi. Shuning uchun siz nimani kiritganingizni biz ko'ra olmaymiz va xatoni takrorlash uchun quyidagilar kerak bo'ladi:`}
              </p>
              <ul>
                <li>{`sahifaning to'liq manzili (brauzerning manzil satridan nusxa oling);`}</li>
                <li>{`kiritgan qiymatlaringiz va tanlagan birliklaringiz;`}</li>
                <li>{`ko'rgan natija va kutgan natijangiz, imkon bo'lsa uning manbasi (standart, darslik, rasmiy hujjat);`}</li>
                <li>{`muammo texnik ko'rinsa, qurilma va brauzer nomi.`}</li>
              </ul>
              <p>
                {`Qulay shakl: "Sahifa: …/uz/laminat-hisoblash. Kiritganim: maydon 20 m², paketda 2,222 m², zaxira 10%. Natija: … paket. Kutganim: … paket, chunki …". Shu ko'rinishdagi xabarni tekshirish oson. Xato tasdiqlansa, sahifa tuzatiladi.`}
              </p>
            </>
          ),
        },
        {
          heading: "Maxfiylik",
          content: (
            <p>
              {`Elektron pochta manzilingiz faqat xabaringizga javob berish uchun ishlatiladi va uchinchi shaxslarga berilmaydi. Xabarda parol, pasport yoki bank kartasi ma'lumotlari kabi maxfiy ma'lumotlarni yubormang: xatoni tekshirish uchun ular kerak emas. Saytda ma'lumotlar qanday qayta ishlanishi `}
              <Link href="/uz/maxfiylik-siyosati">Maxfiylik siyosati</Link>
              {` sahifasida tushuntirilgan.`}
            </p>
          ),
        },
      ]}
      alternateLink={{
        href: "/iletisim",
        hrefLang: "tr",
        label: "Turkcha versiyasini ko'rish",
      }}
    />
  );
}
