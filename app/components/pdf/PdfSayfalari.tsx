import Link from "@/app/components/SiteLink";
import type { ReactNode } from "react";
import type { FaqItem } from "../../converter/faqSchema";
import { DOSYA_ARACLARI_YOLU } from "../../converter/gorsel/dosyaAraclari";
import DosyaAracCubugu from "../gorsel/DosyaAracCubugu";
import TimeToolPage from "../time/TimeToolPage";
import { takvimMetadata } from "../takvim/takvimMeta";
import GorselPdf from "./GorselPdf";
import PdfBirlestir from "./PdfBirlestir";
import PdfBol from "./PdfBol";

const PDF_BAGLANTILAR = [
  { href: DOSYA_ARACLARI_YOLU, label: "Tüm Dosya Araçları" },
  { href: "/pdf-birlestirme", label: "PDF Birleştirme" },
  { href: "/pdf-bolme", label: "PDF Bölme" },
  { href: "/jpg-pdf-cevirme", label: "JPG PDF Çevirme" },
  { href: "/resimden-yaziya-cevirme", label: "Resimden Yazıya Çevirme" },
  { href: "/fotograf-boyutu-kucultme", label: "Fotoğraf Boyutu Küçültme" },
];

function PdfSayfa({
  yol,
  baslik,
  giris,
  arac,
  sss,
  bolumler,
}: {
  yol: string;
  baslik: string;
  giris: string;
  arac: ReactNode;
  sss: FaqItem[];
  bolumler: Array<{ id: string; baslik: string; icerik: ReactNode }>;
}) {
  return (
    <>
      <DosyaAracCubugu />
      <TimeToolPage
        crumbs={[
          { href: "/", label: "Ana Sayfa" },
          { href: DOSYA_ARACLARI_YOLU, label: "Dosya Araçları" },
          { label: baslik },
        ]}
        crumbLabel="Sayfa yolu"
        title={baslik}
        intro={giris}
        tool={arac}
        related={{
          title: "İlginizi çekebilir",
          links: PDF_BAGLANTILAR.filter((l) => l.href !== yol),
        }}
        tocTitle="İçindekiler"
        tocItems={[
          ...bolumler.map((b) => ({ id: b.id, label: b.baslik })),
          { id: "faq", label: "Sık sorulan sorular" },
        ]}
        faqTitle="Sık sorulan sorular"
        faqItems={sss}
      >
        {bolumler.map((b) => (
          <section key={b.id}>
            <h2 id={b.id}>{b.baslik}</h2>
            {b.icerik}
          </section>
        ))}
      </TimeToolPage>
    </>
  );
}

const GUVENLIK: FaqItem = {
  question: "PDF dosyalarım bir sunucuya yükleniyor mu?",
  answer:
    "Hayır. İşlem tamamen tarayıcınızda yapılır; sözleşme, fatura veya kimlik gibi belgeleriniz bilgisayarınızdan çıkmaz. Dosya boyutu veya günlük kullanım sınırı yoktur.",
};

/* /pdf-birlestirme */
export const pdfBirlestirMeta = () =>
  takvimMetadata("/pdf-birlestirme", {
    title:
      "PDF Birleştirme: PDF Dosyalarını Tek Dosyada Birleştir (Yüklemeden)",
    short: "PDF Birleştirme",
    description:
      "Birden fazla PDF dosyasını istediğiniz sırayla tek PDF'te birleştirin. Ücretsiz, sınırsız, filigransız; dosyalar sunucuya yüklenmez, tarayıcınızda birleştirilir.",
  });

export function PdfBirlestirSayfasi() {
  return (
    <PdfSayfa
      yol="/pdf-birlestirme"
      baslik="PDF Birleştirme"
      giris="PDF dosyalarınızı seçin, sırasını belirleyin ve tek bir PDF olarak indirin. Dosyalar tarayıcınızda birleştirilir; hiçbir sunucuya yüklenmez."
      arac={<PdfBirlestir />}
      sss={[
        {
          question: "PDF dosyaları nasıl birleştirilir?",
          answer:
            "Birleştirmek istediğiniz PDF'leri seçin veya sürükleyip bırakın. Listede ↑ ↓ düğmeleriyle sırayı ayarlayın ve 'PDF'i birleştir' düğmesine basın. Birleşik dosya otomatik olarak iner.",
        },
        {
          question: "Kaç PDF birleştirebilirim, boyut sınırı var mı?",
          answer:
            "Tek seferde 50 PDF'e kadar seçebilirsiniz. Belirli bir boyut sınırı yoktur; işlem bilgisayarınızın belleğiyle yapıldığı için çok büyük dosyalarda birkaç saniye sürebilir.",
        },
        {
          question: "Birleştirince kalite düşer mi?",
          answer:
            "Hayır. Sayfalar olduğu gibi kopyalanır; yazılar, görseller ve bağlantılar yeniden sıkıştırılmaz.",
        },
        {
          question: "Şifreli PDF birleştirilebilir mi?",
          answer:
            "Açılış şifresi olan PDF'ler okunamaz; önce şifresini kaldırıp sonra birleştirin.",
        },
        GUVENLIK,
      ]}
      bolumler={[
        {
          id: "kullanim",
          baslik: "Ne zaman işe yarar?",
          icerik: (
            <ul>
              <li>
                Başvuru için istenen belgeleri (kimlik, diploma, transkript) tek
                dosyada göndermek
              </li>
              <li>
                Taranmış sayfaları, faturaları veya raporları bir araya getirmek
              </li>
              <li>E-posta ekindeki dosya sayısını azaltmak</li>
            </ul>
          ),
        },
        {
          id: "ipucu",
          baslik: "İpuçları",
          icerik: (
            <p>
              Birleştirmeden önce gereksiz sayfaları{" "}
              <Link href="/pdf-bolme">PDF Bölme</Link> aracının &quot;Sayfaları
              çıkar&quot; seçeneğiyle ayıklayabilir, fotoğrafları{" "}
              <Link href="/jpg-pdf-cevirme">JPG PDF Çevirme</Link> ile
              PDF&apos;e çevirip listeye ekleyebilirsiniz.
            </p>
          ),
        },
      ]}
    />
  );
}

/* /jpg-pdf-cevirme */
export const jpgPdfMeta = () =>
  takvimMetadata("/jpg-pdf-cevirme", {
    title: "JPG PDF Çevirme: Fotoğrafları PDF Yap (A4, Toplu, Yüklemeden)",
    short: "JPG PDF Çevirme",
    description:
      "JPG, PNG, WebP ve iPhone HEIC fotoğraflarını tek PDF'e çevirin; A4'e sığdırın, sırayı belirleyin. Ücretsiz, filigransız; görseller sunucuya yüklenmez.",
  });

export function JpgPdfSayfasi() {
  return (
    <PdfSayfa
      yol="/jpg-pdf-cevirme"
      baslik="JPG PDF Çevirme"
      giris="Fotoğraflarınızı ve taranmış belgelerinizi tek bir PDF dosyasına çevirin. JPG, PNG, WebP ve iPhone HEIC desteklenir; her görsel A4 sayfaya ortalanır veya kendi boyutunda kalır."
      arac={<GorselPdf />}
      sss={[
        {
          question: "JPG dosyası PDF'e nasıl çevrilir?",
          answer:
            "Görselleri seçin, sırayı ayarlayın, sayfa boyutunu (A4 veya görselin kendi boyutu) seçip 'PDF oluştur' düğmesine basın. Her görsel ayrı bir sayfa olur.",
        },
        {
          question: "Telefon fotoğrafları PDF'te yan dönüyor mu?",
          answer:
            "Hayır. Araç fotoğrafın yön bilgisini uygulayarak sayfaya yerleştirir; dikey çekilen fotoğraf PDF'te de dik görünür.",
        },
        {
          question: "PDF dosyası çok büyük çıktı, ne yapabilirim?",
          answer:
            "Telefon fotoğrafları birkaç MB olabilir. Önce Fotoğraf Boyutu Küçültme aracıyla fotoğrafları örneğin 300 KB'ın altına indirip sonra PDF'e çevirin.",
        },
        GUVENLIK,
      ]}
      bolumler={[
        {
          id: "kullanim",
          baslik: "Ne zaman işe yarar?",
          icerik: (
            <ul>
              <li>
                Telefonla çekilen belge fotoğraflarını başvuru için tek PDF
                yapmak
              </li>
              <li>
                Ödev, not veya fatura fotoğraflarını düzenli bir dosyada
                toplamak
              </li>
              <li>
                E-Devlet ve kurum başvurularında PDF istenen yerlere görsel
                yüklemek
              </li>
            </ul>
          ),
        },
        {
          id: "a4",
          baslik: "A4 mü, görsel boyutu mu?",
          icerik: (
            <p>
              Yazdırılacak veya resmi bir yere yüklenecek belgeler için A4
              seçin; görsel sayfaya orantılı sığdırılır. &quot;Görselin kendi
              boyutu&quot; ise sayfayı fotoğrafın ölçüsünde oluşturur, ekranda
              okumak için uygundur. Belgeyi önce{" "}
              <Link href="/fotograf-kirpma">kırpıp düzeltmek</Link> daha temiz
              bir sonuç verir.
            </p>
          ),
        },
      ]}
    />
  );
}

/* /pdf-bolme */
export const pdfBolMeta = () =>
  takvimMetadata("/pdf-bolme", {
    title: "PDF Bölme: Sayfalara Ayır, Sayfa Çıkar (Ücretsiz, Yüklemeden)",
    short: "PDF Bölme",
    description:
      "PDF'i her sayfa ayrı, her N sayfada bir veya istediğiniz aralıklarla bölün; seçtiğiniz sayfaları yeni PDF'e çıkarın. Ücretsiz, tarayıcıda, yüklemesiz.",
  });

export function PdfBolSayfasi() {
  return (
    <PdfSayfa
      yol="/pdf-bolme"
      baslik="PDF Bölme ve Sayfa Çıkarma"
      giris="PDF dosyanızı sayfalarına ayırın, belirli aralıklarla bölün veya yalnızca ihtiyacınız olan sayfaları yeni bir PDF'e çıkarın. İşlem tarayıcınızda yapılır."
      arac={<PdfBol />}
      sss={[
        {
          question: "PDF'ten belirli sayfalar nasıl çıkarılır?",
          answer:
            "'Sayfaları çıkar' seçeneğini seçin ve sayfa numaralarını yazın (ör. 1, 3, 5-8). Seçtiğiniz sayfalar yazdığınız sırayla yeni bir PDF'e kopyalanır.",
        },
        {
          question: "Özel aralıklar nasıl yazılır?",
          answer:
            "Virgülle ayrılan her aralık ayrı bir PDF olur: '1-3, 4-6, 7' yazarsanız üç dosya oluşur. '8-' yazmak 8. sayfadan sona kadar demektir.",
        },
        {
          question: "Bölünen dosyaları tek seferde indirebilir miyim?",
          answer:
            "Evet. Birden fazla dosya oluştuğunda 'Tümünü ZIP olarak indir' düğmesiyle hepsini tek dosyada indirebilirsiniz.",
        },
        GUVENLIK,
      ]}
      bolumler={[
        {
          id: "yontemler",
          baslik: "Bölme yöntemleri",
          icerik: (
            <ul>
              <li>
                <b>Her sayfa ayrı PDF:</b> 10 sayfalık belge 10 ayrı dosya olur.
              </li>
              <li>
                <b>Her N sayfada böl:</b> Örneğin 2 seçilirse iki yüzlü taranmış
                kimlik veya belgeler ayrı dosyalara ayrılır.
              </li>
              <li>
                <b>Özel aralıklar:</b> &quot;1-3, 4-10&quot; gibi her aralık
                ayrı dosya.
              </li>
              <li>
                <b>Sayfaları çıkar:</b> Seçilen sayfalar tek dosyada; gereksiz
                sayfaları silmek için de kullanılır.
              </li>
            </ul>
          ),
        },
      ]}
    />
  );
}
