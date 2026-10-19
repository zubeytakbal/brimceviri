import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import Zikirmatik from "../components/dini/Zikirmatik";
import { TESBIHAT, TESBIHAT_KAYNAK, ZIKIR_NASLAR, ZIKIRLER } from "../converter/dini/zikirler";
import TimeToolPage from "../components/time/TimeToolPage";
import type { FaqItem } from "../converter/faqSchema";
import { diniRelated } from "../i18n/diniAraclar";
import { seoTitle } from "../seoTitle";
import { buildSiteUrl } from "../siteConfig";

const path = "/zikirmatik";
const title = "Zikirmatik: Online Tesbih Sayacı (Sesli, Titreşimli, 33-99-100)";
const description =
  "Online zikirmatik: dokun, say. 33, 99, 100 ya da özel hedef; namaz sonrası tesbihat (33+33+33) otomatik sırayla, kendi zikir listen, ses, titreşim, tam ekran ve günlük istatistik. Uygulama gerekmez.";

export const metadata: Metadata = {
  title: seoTitle(title, "Zikirmatik: Online Tesbih Sayacı", "Zikirmatik"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "tr_TR", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "Namazdan sonra tesbihat kaçar kez çekilir?",
    answer: "Farz namazlardan sonra 33 kez Sübhânallah, 33 kez Elhamdülillâh ve 33 kez Allâhu Ekber denir. Hedefi 33'e ayarlayıp her zikirden sonra sayacı sıfırlayabilirsiniz.",
  },
  {
    question: "Namaz tesbihatı modunda ne oluyor?",
    answer: `33 Sübhânallah bitince sayaç kendiliğinden Elhamdülillâh'a, o da bitince Allâhu Ekber'e geçer; sonunda yüze tamamlayan "Lâ ilâhe illallâhu vahdehû..." gelir (${TESBIHAT_KAYNAK}). Her adımda zikrin Arapça yazılışı ve anlamı görünür.`,
  },
  {
    question: "Kendi zikir listemi nasıl yaparım?",
    answer: "\"Zikir listem\" sekmesinde \"Listeyi düzenle\"ye basın; zikirleri ve adetlerini sırayla yazın. Saydıkça biri bitince sıradakine geçilir. Birden fazla liste oluşturabilirsiniz.",
  },
  {
    question: "Zikir saymak için tesbih ya da zikirmatik kullanılabilir mi?",
    answer:
      "Zikrin sayısını takip etmek için parmak, tesbih ya da sayaç kullanmak bir araçtır; önemli olan zikrin kendisidir. Hz. Peygamber'in tesbihlerini eliyle (parmaklarıyla) saydığı rivayet edilir (Ebû Dâvûd, Vitr 24). Dini bir konuda tereddüdünüz olursa Diyanet İşleri Başkanlığı'nın Alo 190 hattına danışabilirsiniz.",
  },
  {
    question: "Sübhânallâhi ve bihamdihî kaç kez söylenir?",
    answer: "Buhârî ve Müslim'deki rivayette günde yüz defa söyleyenin fazileti anlatılır (Buhârî, Daavât 65; Müslim, Zikir 28). Zikirmatikte bu zikri seçip hedefi 100 yapabilirsiniz.",
  },
  {
    question: "Tesbihatta neden 33 kez söylenir?",
    answer: `Namazdan sonra 33 Sübhânallah, 33 Elhamdülillâh ve 33 Allâhu Ekber söylenmesi ve yüzün bir kez tevhidle tamamlanması hadiste böyle öğretilmiştir (${TESBIHAT_KAYNAK}). 33'ün üç katı 99, tevhidle birlikte 100 eder.`,
  },
  {
    question: "İnternet olmadan çalışır mı?",
    answer: "Sayfa bir kez açıldıktan sonra sayma işlemi tamamen telefonunuzda yapılır; internet bağlantısı kopsa da saymaya devam edebilirsiniz. Kayıtlar sunucuya gönderilmez, yalnızca bu cihazda tutulur.",
  },
  {
    question: "Sayaç kapatınca sıfırlanır mı?",
    answer: "Hayır. Sayı tarayıcınızda saklanır; sayfayı yeniden açtığınızda kaldığınız yerden devam eder. Telefonunuzda ana ekrana ekleyerek uygulama gibi kullanabilirsiniz.",
  },
  {
    question: "Titreşim neden çalışmıyor?",
    answer: "Titreşim Android telefonlardaki tarayıcılarda çalışır; iPhone'daki Safari web sitelerinin titreşim kullanmasına izin vermez.",
  },
];

export default function ZikirmatikPage() {
  return (
    <TimeToolPage
      crumbs={[
        { href: "/", label: "Ana Sayfa" },
        { href: "/dini-araclar", label: "Dini Araçlar" },
        { href: path, label: "Zikirmatik" },
      ]}
      crumbLabel="Sayfa yolu"
      title="Online Zikirmatik"
      intro="Daireye dokunarak sayın; kayıtlar bu cihazda saklanır."
      tool={<Zikirmatik />}
      related={{ title: "Diğer dini araçlar", links: diniRelated(path) }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "zikirler", label: "Zikirler ve anlamları" },
        { id: "tesbihat", label: "Namazdan sonra tesbihat" },
        { id: "ayet-hadis", label: "Zikir hakkında ayet ve hadisler" },
        { id: "kullanim", label: "Nasıl kullanılır?" },
        { id: "faq", label: "Sık sorulan sorular" },
      ]}
      faqTitle="Sık sorulan sorular"
      faqItems={faqItems}
    >
      <h2 id="zikirler">Zikirler ve anlamları</h2>
      <div className="holiday-table-wrap">
        <table className="holiday-table zk-tablo">
          <thead>
            <tr>
              <th scope="col">Zikir</th>
              <th scope="col">Arapça</th>
              <th scope="col">Anlamı</th>
            </tr>
          </thead>
          <tbody>
            {ZIKIRLER.map((z) => (
              <tr key={z.id}>
                <th scope="row">{z.ad}</th>
                <td lang="ar" dir="rtl">
                  {z.arapca}
                </td>
                <td>
                  {z.anlam}
                  {z.kaynak ? <small> ({z.kaynak})</small> : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="tesbihat">Namazdan sonra tesbihat</h2>
      <p>
        Farz namazlardan sonra {TESBIHAT.slice(0, 3).map((a) => `${a.adet} kez ${a.zikir.ad}`).join(", ")} denir; sayıyı yüze tamamlamak için bir kez{" "}
        &quot;{TESBIHAT[3].zikir.ad}&quot; söylenir ({TESBIHAT_KAYNAK}). Anlamı: {TESBIHAT[3].zikir.anlam} Zikirmatikte &quot;Namaz tesbihatı&quot;
        sekmesini seçtiğinizde bu sıra kendiliğinden ilerler; her adımın bitişinde ses ve titreşimle haber verilir.
      </p>

      <h2 id="ayet-hadis">Zikir hakkında ayet ve hadisler</h2>
      <ul className="zk-naslar">
        {ZIKIR_NASLAR.map((n) => (
          <li key={n.kaynak}>
            <blockquote>{n.metin}</blockquote>
            <cite>{n.kaynak}</cite>
          </li>
        ))}
      </ul>

      <h2 id="kullanim">Nasıl kullanılır?</h2>
      <p>
        Zikri seçin, hedefi (33, 99, 100, özel bir sayı ya da sınırsız) belirleyin ve daireye dokunun; dairenin çevresi hedefe ne kadar
        yaklaştığınızı gösterir. Yanlış dokunduysanız &quot;Geri al&quot; ile bir eksiltebilirsiniz. &quot;Tam ekran&quot; ekranın her yerini
        dokunmatik yapar ve ekranın kapanmasını engeller. Klavyede daireye odaklanıp boşluk ya da Enter tuşuyla da sayabilirsiniz. İstatistik
        bölümü bugün, son 7 ve 30 günde kaç zikir çektiğinizi ve kaç gün üst üste devam ettiğinizi gösterir; kayıtlarınızı dosyaya yedekleyip
        başka bir cihaza taşıyabilirsiniz. Allah'ın 99 ismini anlamlarıyla <Link href="/esmaul-husna">Esmâ-i Hüsnâ</Link> sayfasında
        bulabilirsiniz.
      </p>
    </TimeToolPage>
  );
}
