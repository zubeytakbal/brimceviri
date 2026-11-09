import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import KurumsalSayfa from "../components/yeni/KurumsalSayfa";
import { EDITOR } from "../components/yeni/editor";
import { SITE_CONTACT_EMAIL, SITE_NAME, SITE_URL } from "../siteConfig";

const aciklama = `${SITE_NAME}'i kim hazırlıyor, sitede neler var, hesaplar nasıl kontrol ediliyor ve site nasıl finanse ediliyor?`;

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: aciklama,
  alternates: {
    canonical: "/hakkimizda",
    languages: { tr: "/hakkimizda", en: "/en/about", "x-default": "/hakkimizda" },
  },
  openGraph: {
    title: `Hakkımızda | ${SITE_NAME}`,
    description: aciklama,
    url: `${SITE_URL}/hakkimizda`,
    siteName: SITE_NAME,
    locale: "tr_TR",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <KurumsalSayfa
      breadcrumbs={[{ href: "/", label: "Ana sayfa" }, { label: "Hakkımızda" }]}
      title="Hakkımızda"
      description="BirimCeviri, birim çevirme ve günlük hesapları Türkçe olarak tek yerde toplayan ücretsiz bir sitedir."
      sections={[
        {
          heading: "Siteyi kim hazırlıyor?",
          content: (
            <p>
              BirimCeviri bir şirket değil, tek kişilik bir proje. Ben <Link href="/yazar">{EDITOR.ad}</Link>; siteyi ben kurdum
              ve yürütüyorum. Beykent Üniversitesi Kimya Mühendisliği mezunuyum; birimler, yoğunluk ve mühendislik hesapları
              öğrenciliğim boyunca sürekli karşıma çıktı.
            </p>
          ),
        },
        {
          heading: "Neden böyle bir site?",
          content: (
            <p>
              Türkçe kaynaklarda birim çevirileri dağınık, bazen de yanlış yuvarlanmış durumda. Dönüm ya da arşın gibi
              Türkiye&apos;de kullanılan ölçüleri bulmak ise daha zor. Bu çevirileri ve günlük hesapları tek yerde, nasıl
              yapıldığını da anlatarak sunmak istedim.
            </p>
          ),
        },
        {
          heading: "Sitede neler var?",
          content: (
            <ul>
              <li>
                <strong>Birim çeviriciler:</strong> uzunluk, ağırlık, alan, hacim ve sıcaklıktan basınç ve enerjiye kadar.
                Hepsi <Link href="/tum-birimler">tüm çeviriciler</Link> sayfasında.
              </li>
              <li>
                <strong>Türkiye&apos;ye özgü ölçüler:</strong> dönüm, arşın ve benzerleri,{" "}
                <Link href="/tarih-cevirici">hicri ve Rumi tarih</Link>.
              </li>
              <li>
                <strong>Hesaplayıcılar:</strong> <Link href="/kdv-hesaplama">KDV</Link>,{" "}
                <Link href="/brutten-nete-maas-hesaplama">maaş</Link>, <Link href="/beton-hesaplama">beton</Link>,{" "}
                <Link href="/yas-hesaplama">yaş</Link> gibi günlük ve teknik hesaplar.
              </li>
            </ul>
          ),
        },
        {
          heading: "Hesaplar nasıl kontrol ediliyor?",
          content: (
            <p>
              Birim katsayıları SI birim sistemi (BIPM) ve NIST SP 811 gibi kaynaklardaki tanımlara dayanır ve otomatik
              testlerle kontrol edilir. İçeriğin nasıl hazırlandığını, yapay zekânın burada nasıl kullanıldığını ve hataların
              nasıl düzeltildiğini <Link href="/editoryal-politika">editoryal politika</Link> sayfasında anlattım.
            </p>
          ),
        },
        {
          heading: "Site nasıl finanse ediliyor?",
          content: (
            <p>
              Site ücretsizdir ve hesap açmadan kullanılır. Giderleri karşılamak için sayfalarda reklam gösterilebilir;
              reklamlar hesap sonuçlarını etkilemez. Verilerin nasıl işlendiği <Link href="/gizlilik">gizlilik</Link>{" "}
              sayfasında, kullanım şartları <Link href="/kullanim-kosullari">kullanım koşulları</Link> sayfasında yazıyor.
            </p>
          ),
        },
        {
          heading: "Bir hata mı gördünüz?",
          content: (
            <p>
              Sayfa adresiyle birlikte <a href={`mailto:${SITE_CONTACT_EMAIL}`}>{SITE_CONTACT_EMAIL}</a> adresine yazın.
              Araçlar bilgilendirme amaçlıdır; mühendislik, sağlık, hukuk veya güvenlikle ilgili önemli kararlarda sonucu
              bir uzmana da kontrol ettirin.
            </p>
          ),
        },
      ]}
    />
  );
}
