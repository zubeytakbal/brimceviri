import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import KurumsalSayfa from "../components/yeni/KurumsalSayfa";
import { EDITOR } from "../components/yeni/editor";
import { SITE_CONTACT_EMAIL, SITE_NAME, SITE_URL } from "../siteConfig";

const aciklama = `${EDITOR.ad}: ${SITE_NAME}'i kuran ve yürüten kişi. Kimya mühendisliği mezunu, web projeleri geliştiriyor.`;

export const metadata: Metadata = {
  title: EDITOR.ad,
  description: aciklama,
  alternates: { canonical: "/yazar" },
  openGraph: {
    title: `${EDITOR.ad} | ${SITE_NAME}`,
    description: aciklama,
    url: `${SITE_URL}/yazar`,
    siteName: SITE_NAME,
    locale: "tr_TR",
    type: "profile",
  },
};

// Google: ProfilePage yapisal verisi, sayfanin odagi tek kisi olan yazar sayfalari icin.
const profil = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: EDITOR.ad,
    description: "Kimya mühendisliği mezunu, BirimCeviri.app'in kurucusu.",
    alumniOf: { "@type": "CollegeOrUniversity", name: "Beykent Üniversitesi" },
    url: `${SITE_URL}/yazar`,
  },
};

export default function AuthorPage() {
  return (
    <KurumsalSayfa
      schema={profil}
      breadcrumbs={[{ href: "/", label: "Ana sayfa" }, { href: "/hakkimizda", label: "Hakkımızda" }, { label: EDITOR.ad }]}
      title={EDITOR.ad}
      description={`${SITE_NAME}'i kuran ve yürüten kişi.`}
      sections={[
        {
          heading: "Ben kimim?",
          content: (
            <>
              <p>
                Beykent Üniversitesi Kimya Mühendisliği bölümünden mezun oldum. Okurken yazılıma merak sardım: önce internet
                üzerinden HTML dersleri aldım, sonra bir yıl bilgisayar programcılığı okudum. E-ticaretle uğraştığım dönem de
                web sitelerine ilgimi artırdı.
              </p>
              <p>
                Bugün yapay zekâ araçlarıyla kod yazıp kendi web projelerimi geliştiriyorum. BirimCeviri de bunlardan biri.
              </p>
            </>
          ),
        },
        {
          heading: "Bu sitede ne yapıyorum?",
          content: (
            <p>
              Sitenin yapısına, araçlarına ve içeriğine ben karar veriyorum. Sayfaların nasıl hazırlandığını{" "}
              <Link href="/editoryal-politika">editoryal politika</Link> sayfasında anlattım. Hesaplar bilgilendirme amaçlıdır;
              resmî mühendislik onayı ya da danışmanlık vermiyorum.
            </p>
          ),
        },
        {
          heading: "İletişim",
          content: (
            <p>
              Hata bildirimi ve önerileriniz için: <a href={`mailto:${SITE_CONTACT_EMAIL}`}>{SITE_CONTACT_EMAIL}</a>
            </p>
          ),
        },
      ]}
    />
  );
}
