import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import KurumsalSayfa from "../components/yeni/KurumsalSayfa";
import { EDITOR } from "../components/yeni/editor";
import { SITE_CONTACT_EMAIL, SITE_NAME, SITE_URL } from "../siteConfig";

const aciklama = `${SITE_NAME} sayfaları nasıl hazırlanıyor, yapay zekâ nasıl kullanılıyor, kaynaklar nasıl seçiliyor ve hatalar nasıl düzeltiliyor?`;

export const metadata: Metadata = {
  title: "Editoryal Politika",
  description: aciklama,
  alternates: { canonical: "/editoryal-politika" },
  openGraph: {
    title: `Editoryal Politika | ${SITE_NAME}`,
    description: aciklama,
    url: `${SITE_URL}/editoryal-politika`,
    siteName: SITE_NAME,
    locale: "tr_TR",
    type: "website",
  },
};

export default function EditorialPolicyPage() {
  return (
    <KurumsalSayfa
      breadcrumbs={[{ href: "/", label: "Ana sayfa" }, { label: "Editoryal politika" }]}
      title="Editoryal Politika"
      description="Bu sitedeki sayfaların nasıl hazırlandığını ve neye dikkat ettiğimi anlatıyorum."
      sections={[
        {
          heading: "Sayfaları kim hazırlıyor?",
          content: (
            <p>
              Site tek kişilik bir proje; içerikten <Link href="/yazar">{EDITOR.ad}</Link> sorumlu. Ayrı bir uzman ya da
              kontrol ekibi yok. Bu yüzden sayfalarda uzman onayından söz edilmez.
            </p>
          ),
        },
        {
          heading: "Yapay zekâ kullanıyor muyuz?",
          content: (
            <p>
              Evet. Sayfa taslakları ve kodun bir bölümü yapay zekâ araçlarının yardımıyla hazırlanıyor. Taslaklar yayına
              girmeden önce tarafımdan kontrol edilir. Yapay zekânın yazdığı bir bilgiyi kaynağına bakmadan doğru kabul etmem.
            </p>
          ),
        },
        {
          heading: "Sayılar nereden geliyor?",
          content: (
            <>
              <p>
                Birim katsayıları SI birim sistemi (BIPM) ve NIST SP 811 gibi kaynaklardaki tanımlara dayanır. Örneğin 1 inç
                tam olarak 2,54 cm&apos;dir. Vergi, maaş ya da ceza gibi mevzuata bağlı hesaplarda resmî kaynak esas alınır.
              </p>
              <p>
                Kesin tanımı olmayan değerler, örneğin eski ölçüler ya da malzeme yoğunlukları, yaklaşık kabul edilir. Yeni
                düzende yazılan sayfalarda hangi değerin neden seçildiği ve kaynaklar sayfanın içinde belirtilir.
              </p>
            </>
          ),
        },
        {
          heading: "Hesaplar nasıl kontrol ediliyor?",
          content: (
            <p>
              Birim katsayıları ve birçok hesap formülü otomatik testlerle kontrol edilir. Testler hataları azaltır ama
              hepsini yakalamaz. O yüzden önemli kararlarda sonucu ayrıca doğrulamanızı öneririm.
            </p>
          ),
        },
        {
          heading: "Sağlık, hukuk ve para konuları",
          content: (
            <p>
              Bu konulardaki araçlar genel bilgilendirme içindir; doktor, avukat, mali müşavir veya mühendis görüşünün yerini
              tutmaz. Uzman kontrolü gerektirdiğini düşündüğüm bazı klinik araçları bu yüzden kaldırdım ya da arama
              motorlarına kapattım.
            </p>
          ),
        },
        {
          heading: "Sayfalar ne zaman güncelleniyor?",
          content: (
            <p>
              Site şu anda yeniden düzenleniyor ve sayfalar sırayla yeni düzende yeniden yazılıyor. Bu yüzden bütün sayfalar
              aynı olgunlukta değil. Yeni düzendeki sayfalarda son güncelleme tarihi görünür. Mevzuata bağlı hesapların
              güncelliğini kontrol etmek benim sorumluluğumda; eski kalmış bir değer görürseniz lütfen bildirin.
            </p>
          ),
        },
        {
          heading: "Hataları nasıl düzeltiyorum?",
          content: (
            <p>
              Hata gördüğünüzde sayfa adresi, girdiğiniz değer ve beklediğiniz sonuçla birlikte{" "}
              <a href={`mailto:${SITE_CONTACT_EMAIL}`}>{SITE_CONTACT_EMAIL}</a> adresine yazın. Bildirimi inceler, hata
              doğrulanırsa sayfayı düzeltirim.
            </p>
          ),
        },
        {
          heading: "Reklamlar",
          content: (
            <p>
              Sayfalarda reklam gösterilebilir. Reklam verenler içeriği ya da hesap sonuçlarını etkilemez. Ayrıntılar{" "}
              <Link href="/gizlilik">gizlilik</Link> sayfasında.
            </p>
          ),
        },
      ]}
    />
  );
}
