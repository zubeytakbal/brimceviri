import Link from "@/app/components/SiteLink";
import {
  FORMAT_TABLOSU,
  GORSEL_CIFTLER,
  GORSEL_HUB,
  type GorselCift,
} from "../../converter/gorsel/ciftler";
import type { FaqItem } from "../../converter/faqSchema";
import { DOSYA_ARACLARI_YOLU } from "../../converter/gorsel/dosyaAraclari";
import DosyaAracCubugu from "./DosyaAracCubugu";
import TimeToolPage from "../time/TimeToolPage";
import { takvimMetadata } from "../takvim/takvimMeta";
import GorselDonusturucu from "./GorselDonusturucu";

const ANA = { href: "/", label: "Ana Sayfa" };
const PANEL = { href: DOSYA_ARACLARI_YOLU, label: "Dosya Araçları" };
const HUB = { href: GORSEL_HUB, label: "Görsel Dönüştürücü" };

const DIGER_ARACLAR = [
  { href: "/dosya-araclari", label: "Tüm Dosya Araçları" },
  { href: "/piksel-cm-dpi-hesaplama", label: "Piksel, CM ve DPI Hesaplama" },
  {
    href: "/sosyal-medya-gorsel-boyutlari-hesaplama",
    label: "Sosyal Medya Görsel Boyutları",
  },
  { href: "/kilobayt-megabayt", label: "Kilobayt → Megabayt" },
  { href: "/kategoriler/veri", label: "Veri Depolama Dönüşümleri" },
  { href: "/fotografci-araclari", label: "Fotoğrafçı Araçları" },
  { href: "/grafik-tasarimci-araclari", label: "Grafik Tasarımcı Araçları" },
];

function FormatTablosu() {
  return (
    <div className="holiday-table-wrap">
      <table className="holiday-table">
        <thead>
          <tr>
            <th scope="col">Özellik</th>
            <th scope="col">JPG</th>
            <th scope="col">PNG</th>
            <th scope="col">WebP</th>
          </tr>
        </thead>
        <tbody>
          {FORMAT_TABLOSU.map((r) => (
            <tr key={r.ozellik}>
              <th scope="row">{r.ozellik}</th>
              <td>{r.jpg}</td>
              <td>{r.png}</td>
              <td>{r.webp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const gorselCiftMeta = (c: GorselCift) =>
  takvimMetadata(`/${c.slug}`, {
    title: c.seoBaslik,
    short: c.kisa,
    description: c.aciklama,
  });

export function GorselCiftSayfasi({ cift: c }: { cift: GorselCift }) {
  return (
    <>
      <DosyaAracCubugu />
      <TimeToolPage
        crumbs={[ANA, PANEL, HUB, { label: c.baslik }]}
        crumbLabel="Sayfa yolu"
        title={c.baslik}
        intro={c.giris}
        tool={<GorselDonusturucu kaynak={c.kaynak} hedef={c.hedef} />}
        related={{
          title: "İlginizi çekebilir",
          links: [
            HUB,
            ...GORSEL_CIFTLER.filter((x) => x.slug !== c.slug).map((x) => ({
              href: `/${x.slug}`,
              label: x.baslik,
            })),
            ...DIGER_ARACLAR,
          ],
        }}
        tocTitle="İçindekiler"
        tocItems={[
          ...c.bolumler.map((b) => ({ id: b.id, label: b.baslik })),
          { id: "karsilastirma", label: "JPG, PNG ve WebP karşılaştırması" },
          { id: "faq", label: "Sık sorulan sorular" },
        ]}
        faqTitle="Sık sorulan sorular"
        faqItems={c.sss}
      >
        {c.bolumler.map((b) => (
          <section key={b.id}>
            <h2 id={b.id}>{b.baslik}</h2>
            {b.paragraflar.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </section>
        ))}
        <h2 id="karsilastirma">JPG, PNG ve WebP karşılaştırması</h2>
        <FormatTablosu />
        <p>
          Görselin ekranda ve baskıda kaç santimetre olacağını hesaplamak için{" "}
          <Link href="/piksel-cm-dpi-hesaplama">
            Piksel, CM ve DPI Hesaplama
          </Link>
          , Instagram ve diğer platformların önerdiği ölçüler için{" "}
          <Link href="/sosyal-medya-gorsel-boyutlari-hesaplama">
            Sosyal Medya Görsel Boyutları
          </Link>{" "}
          sayfasına bakabilirsiniz.
        </p>
      </TimeToolPage>
    </>
  );
}

export const gorselHubMeta = () =>
  takvimMetadata(GORSEL_HUB, {
    title: "Görsel Dönüştürücü: JPG, PNG ve WebP Çevirme (Yüklemeden)",
    short: "Görsel Dönüştürücü",
    description:
      "JPG, PNG ve WebP görselleri birbirine çevirin; kalite ve genişlik ayarlayın, toplu dönüştürüp ZIP indirin. Dosyalar sunucuya yüklenmez, tarayıcınızda işlenir.",
  });

export function GorselHub() {
  const sss: FaqItem[] = [
    {
      question: "Görsel dönüştürücü ücretsiz mi, sınırı var mı?",
      answer:
        "Ücretsizdir, kayıt gerektirmez ve filigran eklemez. Tek seferde 30 dosya seçebilirsiniz; işlem bilgisayarınızın gücüyle yapıldığı için çok büyük görsellerde birkaç saniye sürebilir.",
    },
    {
      question: "Dosyalarım nereye gidiyor?",
      answer:
        "Hiçbir yere. Görseller tarayıcınızın içinde açılıp yeniden kaydedilir; internete, bizim sunucularımıza ya da başka bir hizmete gönderilmez. Sayfa açıldıktan sonra internet bağlantınız kesilse de çalışır.",
    },
    {
      question: "Hangi formatı seçmeliyim?",
      answer:
        "Fotoğraf paylaşacak, e-postayla gönderecek veya bir başvuru sistemine yükleyecekseniz JPG; logo, ekran görüntüsü veya saydam arka planlı görsel için PNG; web sitenizde kullanacaksanız WebP en uygun seçimdir.",
    },
    {
      question: "Konum bilgisi fotoğrafta kalır mı?",
      answer:
        "Hayır. Dönüştürülen dosyaya çekim yeri, tarih ve kamera modeli gibi EXIF bilgileri aktarılmaz. Paylaşmadan önce konum bilgisini silmek için de kullanabilirsiniz.",
    },
  ];
  return (
    <>
      <DosyaAracCubugu />
      <TimeToolPage
        crumbs={[ANA, PANEL, { label: "Görsel Dönüştürücü" }]}
        crumbLabel="Sayfa yolu"
        title="Görsel Dönüştürücü"
        intro="JPG, PNG ve WebP görselleri birbirine çevirin. Çıktı formatını, kaliteyi ve en fazla genişliği seçin; birden fazla dosyayı aynı anda dönüştürüp ZIP olarak indirin. Dosyalar tarayıcınızda işlenir, hiçbir sunucuya yüklenmez."
        tool={<GorselDonusturucu />}
        related={{ title: "İlginizi çekebilir", links: DIGER_ARACLAR }}
        tocTitle="İçindekiler"
        tocItems={[
          { id: "donusumler", label: "Hazır dönüştürme sayfaları" },
          { id: "karsilastirma", label: "JPG, PNG ve WebP karşılaştırması" },
          { id: "faq", label: "Sık sorulan sorular" },
        ]}
        faqTitle="Sık sorulan sorular"
        faqItems={sss}
      >
        <h2 id="donusumler">Hazır dönüştürme sayfaları</h2>
        <ul className="takvim-hub-liste">
          {GORSEL_CIFTLER.map((c) => (
            <li key={c.slug}>
              <Link href={`/${c.slug}`}>{c.baslik}</Link> —{" "}
              {c.aciklama.split(":")[0]}
            </li>
          ))}
        </ul>
        <h2 id="karsilastirma">JPG, PNG ve WebP karşılaştırması</h2>
        <FormatTablosu />
        <p>
          Dosya boyutlarını KB ve MB arasında çevirmek için{" "}
          <Link href="/kategoriler/veri">Veri Depolama Dönüşümleri</Link>, baskı
          ölçüsü için{" "}
          <Link href="/piksel-cm-dpi-hesaplama">
            Piksel, CM ve DPI Hesaplama
          </Link>{" "}
          sayfalarını kullanabilirsiniz.
        </p>
      </TimeToolPage>
    </>
  );
}
