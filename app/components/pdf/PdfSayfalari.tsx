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
import PdfDuzenle from "./PdfDuzenle";
import PdfJpg from "./PdfJpg";
import PdfMetin from "./PdfMetin";
import PdfNumara from "./PdfNumara";

const PDF_BAGLANTILAR = [
  { href: DOSYA_ARACLARI_YOLU, label: "Tüm Dosya Araçları" },
  { href: "/pdf-birlestirme", label: "PDF Birleştirme" },
  { href: "/pdf-bolme", label: "PDF Bölme" },
  { href: "/jpg-pdf-cevirme", label: "JPG PDF Çevirme" },
  { href: "/pdf-jpg-cevirme", label: "PDF JPG Çevirme" },
  { href: "/pdf-sayfa-duzenleme", label: "PDF Sayfa Silme ve Döndürme" },
  { href: "/pdf-sayfa-numarasi-ekleme", label: "PDF Sayfa Numarası Ekleme" },
  { href: "/pdf-metin-cikarma", label: "PDF'ten Metin Çıkarma" },
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

/* /pdf-jpg-cevirme */
export const pdfJpgMeta = () =>
  takvimMetadata("/pdf-jpg-cevirme", {
    title: "PDF JPG Çevirme: PDF Sayfalarını Resme Dönüştür (Yüklemeden)",
    short: "PDF JPG Çevirme",
    description:
      "PDF sayfalarını JPG veya PNG resimlere çevirin; 72, 150 veya 300 DPI çözünürlük, sayfa aralığı seçimi, ZIP indirme. Ücretsiz; PDF sunucuya yüklenmez.",
  });

export function PdfJpgSayfasi() {
  return (
    <PdfSayfa
      yol="/pdf-jpg-cevirme"
      baslik="PDF JPG Çevirme"
      giris="PDF dosyanızın sayfalarını JPG veya PNG resimlere çevirin. Çözünürlüğü seçin, tüm sayfaları ya da yalnızca istediklerinizi dönüştürüp tek tek veya ZIP olarak indirin."
      arac={<PdfJpg />}
      sss={[
        {
          question: "PDF nasıl JPG'ye çevrilir?",
          answer:
            "PDF'i seçin, çözünürlüğü ve formatı belirleyin, isterseniz sayfa aralığı yazın ve 'JPG'ye çevir' düğmesine basın. Her sayfa ayrı bir resim olur; hepsini ZIP olarak indirebilirsiniz.",
        },
        {
          question: "Hangi çözünürlüğü seçmeliyim?",
          answer:
            "Ekranda göstermek veya mesajla paylaşmak için 72–150 DPI yeterlidir. Yazdırmak ya da küçük yazıların net okunması için 300 DPI seçin; dosyalar daha büyük olur.",
        },
        {
          question: "JPG mi PNG mi?",
          answer:
            "Fotoğraf içeren sayfalarda JPG çok daha küçük dosya verir. Yalnızca yazı ve çizim içeren sayfalarda PNG kenarları daha keskin tutar.",
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
                PDF kabul etmeyen yerlere (sosyal medya, mesajlaşma, bazı
                formlar) belge yüklemek
              </li>
              <li>Sunum veya rapor sayfalarını görsel olarak paylaşmak</li>
              <li>
                Tek bir sayfayı resim olarak kaydedip kırpmak veya üzerine not
                almak
              </li>
            </ul>
          ),
        },
        {
          id: "dpi",
          baslik: "Çözünürlük ve piksel",
          icerik: (
            <p>
              A4 bir sayfa 72 DPI&apos;da 595×842, 150 DPI&apos;da 1240×1754,
              300 DPI&apos;da 2480×3508 piksel olur. Daha fazla bilgi için{" "}
              <Link href="/piksel-cm-dpi-hesaplama">
                Piksel, CM ve DPI Hesaplama
              </Link>{" "}
              aracına bakın.
            </p>
          ),
        },
      ]}
    />
  );
}

/* /pdf-sayfa-duzenleme */
export const pdfDuzenleMeta = () =>
  takvimMetadata("/pdf-sayfa-duzenleme", {
    title: "PDF Sayfa Silme, Döndürme ve Sıralama (Önizlemeli, Yüklemeden)",
    short: "PDF Sayfa Düzenleme",
    description:
      "PDF sayfalarını küçük önizlemelerle görün; istediğiniz sayfaları silin, ters sayfaları döndürün, sürükleyerek sıralayın ve kaydedin. Ücretsiz, tarayıcıda.",
  });

export function PdfDuzenleSayfasi() {
  return (
    <PdfSayfa
      yol="/pdf-sayfa-duzenleme"
      baslik="PDF Sayfa Silme, Döndürme ve Sıralama"
      giris="PDF'inizin tüm sayfalarını küçük önizlemelerle görün. Gereksiz sayfaları silin, yan veya ters taranmış sayfaları döndürün, sayfaların yerini değiştirin ve yeni PDF'i indirin."
      arac={<PdfDuzenle />}
      sss={[
        {
          question: "PDF'ten sayfa nasıl silinir?",
          answer:
            "PDF'i seçin, silmek istediğiniz sayfanın altındaki 🗑 düğmesine basın ve 'Değişiklikleri kaydet' deyin. Yanlışlıkla işaretlediğiniz sayfayı ↩ ile geri alabilirsiniz.",
        },
        {
          question: "Ters taranmış PDF sayfası kalıcı olarak nasıl düzeltilir?",
          answer:
            "Sayfanın altındaki ↻ (sağa) veya ↺ (sola) düğmesiyle 90° adımlarla döndürün. Kaydettiğiniz dosyada döndürme kalıcıdır; her PDF okuyucuda doğru yönde açılır. Tüm sayfalar için 'Tümünü döndür' düğmesini kullanın.",
        },
        {
          question: "Sayfaların sırası nasıl değiştirilir?",
          answer:
            "Sayfayı sürükleyip başka bir sayfanın üzerine bırakın ya da ← → düğmeleriyle bir adım taşıyın. Arkadan öne taranmış belgeler için 'Sırayı ters çevir' tek tıkla düzeltir.",
        },
        {
          question: "Kalite veya bağlantılar bozulur mu?",
          answer:
            "Sayfalar yeniden sıkıştırılmaz; yazılar seçilebilir kalır ve görseller aynı kalitede kopyalanır. Yer imleri ve form alanları gibi belge düzeyindeki bazı özellikler yeni dosyaya taşınmayabilir.",
        },
        GUVENLIK,
      ]}
      bolumler={[
        {
          id: "yapabilecekleriniz",
          baslik: "Neler yapabilirsiniz?",
          icerik: (
            <ul>
              <li>
                <b>Sayfa silme:</b> Boş, tekrar eden veya gereksiz sayfaları
                kaldırın.
              </li>
              <li>
                <b>Sayfa döndürme:</b> Telefonla veya tarayıcıyla yan çekilmiş
                sayfaları tek tek ya da hepsini birden düzeltin.
              </li>
              <li>
                <b>Sıralama:</b> Sürükle-bırak veya düğmelerle sayfaların yerini
                değiştirin.
              </li>
            </ul>
          ),
        },
        {
          id: "ipuclari",
          baslik: "İpuçları",
          icerik: (
            <p>
              Yalnızca birkaç sayfayı ayrı bir dosyaya almak istiyorsanız{" "}
              <Link href="/pdf-bolme">PDF Bölme</Link> aracındaki
              &quot;Sayfaları çıkar&quot; seçeneği daha hızlıdır. Birden fazla
              PDF&apos;i birleştirdikten sonra sayfaları burada
              düzenleyebilirsiniz:{" "}
              <Link href="/pdf-birlestirme">PDF Birleştirme</Link>.
            </p>
          ),
        },
      ]}
    />
  );
}

/* /pdf-sayfa-numarasi-ekleme */
export const pdfNumaraMeta = () =>
  takvimMetadata("/pdf-sayfa-numarasi-ekleme", {
    title: "PDF Sayfa Numarası Ekleme: Konum, Biçim, Kapak Atlama (Ücretsiz)",
    short: "PDF Sayfa Numarası Ekleme",
    description:
      "PDF sayfalarına alt veya üst, sol, orta ya da sağ köşeye sayfa numarası ekleyin; '1 / 10' veya 'Sayfa 1' biçimi, başlangıç numarası ve kapak atlama. Yüklemeden, ücretsiz.",
  });

export function PdfNumaraSayfasi() {
  return (
    <PdfSayfa
      yol="/pdf-sayfa-numarasi-ekleme"
      baslik="PDF Sayfa Numarası Ekleme"
      giris="Tez, ödev, rapor veya sözleşme PDF'inize sayfa numarası ekleyin. Konumu, biçimi ve başlangıç numarasını seçin; kapak sayfasını numaralandırmadan bırakabilirsiniz."
      arac={<PdfNumara />}
      sss={[
        {
          question: "PDF'e sayfa numarası nasıl eklenir?",
          answer:
            "PDF'i seçin, numaranın konumunu (ör. alt orta) ve biçimini belirleyin, 'Sayfa numarası ekle' düğmesine basın. Numaralı PDF otomatik iner ve ilk sayfanın önizlemesi gösterilir.",
        },
        {
          question: "Kapak sayfasına numara koymadan nasıl numaralandırırım?",
          answer:
            "'Kapak sayfasını numaralandırma' kutusunu işaretleyin. İlk sayfa boş kalır, ikinci sayfadan itibaren seçtiğiniz ilk numara (ör. 1) yazılır.",
        },
        {
          question: "Numaralandırmayı 5'ten başlatabilir miyim?",
          answer:
            "Evet. 'İlk numara' alanına istediğiniz sayıyı yazın. Bu, bir belgenin ikinci bölümünü ayrı dosya olarak hazırlarken işe yarar.",
        },
        {
          question: "Tez için sayfa numarası nereye konmalı?",
          answer:
            "Üniversitelerin tez yazım kılavuzları genellikle numarayı sayfanın alt ortasına veya sağ üst köşesine koymayı ister; kendi enstitünüzün kılavuzunu kontrol edin. Ön kısımdaki Roma rakamlı sayfalar için belgeyi bölerek ayrı numaralandırabilirsiniz.",
        },
        GUVENLIK,
      ]}
      bolumler={[
        {
          id: "secenekler",
          baslik: "Seçenekler",
          icerik: (
            <ul>
              <li>
                <b>Konum:</b> Üst veya alt; sol, orta ya da sağ (6 konum).
              </li>
              <li>
                <b>Biçim:</b> &quot;1&quot;, &quot;1 / 10&quot; veya &quot;Sayfa
                1&quot;.
              </li>
              <li>
                <b>Başlangıç numarası</b> ve <b>kapak atlama</b>.
              </li>
              <li>
                <b>Yazı boyutu:</b> 9–16 pt; metin koyu gri Helvetica ile
                yazılır.
              </li>
            </ul>
          ),
        },
        {
          id: "ipuclari",
          baslik: "İpuçları",
          icerik: (
            <p>
              Önce bölümleri{" "}
              <Link href="/pdf-birlestirme">PDF Birleştirme</Link> ile tek
              dosyada toplayıp sayfa sırasını{" "}
              <Link href="/pdf-sayfa-duzenleme">PDF Sayfa Düzenleme</Link> ile
              kontrol edin; numarayı en son ekleyin.
            </p>
          ),
        },
      ]}
    />
  );
}

/* /pdf-metin-cikarma */
export const pdfMetinMeta = () =>
  takvimMetadata("/pdf-metin-cikarma", {
    title:
      "PDF'ten Metin Çıkarma: PDF'i Yazıya Çevir, Taranmışta OCR (Ücretsiz)",
    short: "PDF'ten Metin Çıkarma",
    description:
      "PDF'teki yazıyı kopyalanabilir metne çevirin ve TXT olarak indirin. Taranmış PDF sayfaları Türkçe OCR ile okunur. Ücretsiz; dosya sunucuya yüklenmez.",
  });

export function PdfMetinSayfasi() {
  return (
    <PdfSayfa
      yol="/pdf-metin-cikarma"
      baslik="PDF'ten Metin Çıkarma"
      giris="PDF'inizdeki yazıları sayfa sayfa çıkarın, kopyalayın veya TXT dosyası olarak indirin. Metni seçilemeyen taranmış sayfalar Türkçe karakter destekli OCR ile okunur."
      arac={<PdfMetin />}
      sss={[
        {
          question: "PDF'teki yazı neden kopyalanmıyor?",
          answer:
            "PDF bir tarayıcı veya telefonla taranmışsa sayfalar aslında resimdir ve metin katmanı yoktur. Bu araç böyle sayfaları algılar ve OCR (optik karakter tanıma) ile okuyarak metne çevirir.",
        },
        {
          question: "Taranmış PDF Türkçe karakterlerle okunur mu?",
          answer:
            "Evet. Dil olarak Türkçe seçiliyken ç, ğ, ı, İ, ö, ş, ü harfleri tanınır. Belgede İngilizce kısımlar da varsa iki dili birlikte seçin.",
        },
        {
          question: "Tablo ve sütun düzeni korunur mu?",
          answer:
            "Çıktı düz metindir; satır sonları korunur ama tablo hücreleri ve çok sütunlu düzen sekme veya boşluklarla yaklaşık olarak gelir. Word'de düzenleyecekseniz metni yapıştırdıktan sonra biçimlendirmeniz gerekebilir.",
        },
        {
          question: "OCR ne kadar sürer?",
          answer:
            "Dijital PDF'lerde metin birkaç saniyede çıkarılır. Taranmış sayfalarda her sayfa bilgisayarınızın hızına göre 3–15 saniye sürebilir; dil verisi ilk kullanımda bir kez indirilir.",
        },
        GUVENLIK,
      ]}
      bolumler={[
        {
          id: "nasil",
          baslik: "Nasıl çalışır?",
          icerik: (
            <ol>
              <li>
                Her sayfanın metin katmanı okunur (Word&apos;den veya
                e-Devlet&apos;ten alınan PDF&apos;lerde yazı doğrudan
                buradadır).
              </li>
              <li>
                Metin katmanı boş olan sayfalar taranmış kabul edilir, yüksek
                çözünürlükte çizilir ve OCR ile okunur.
              </li>
              <li>
                Tüm sayfalar &quot;--- Sayfa n ---&quot; ayraçlarıyla tek
                metinde birleştirilir.
              </li>
            </ol>
          ),
        },
        {
          id: "ilgili",
          baslik: "İlgili araçlar",
          icerik: (
            <p>
              Fotoğraf veya ekran görüntüsündeki yazı için{" "}
              <Link href="/resimden-yaziya-cevirme">
                Resimden Yazıya Çevirme
              </Link>
              , sayfaları resim olarak kaydetmek için{" "}
              <Link href="/pdf-jpg-cevirme">PDF JPG Çevirme</Link> aracını
              kullanın.
            </p>
          ),
        },
      ]}
    />
  );
}
