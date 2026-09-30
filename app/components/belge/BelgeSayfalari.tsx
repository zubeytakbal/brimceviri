import Link from "@/app/components/SiteLink";
import type { ReactNode } from "react";
import type { FaqItem } from "../../converter/faqSchema";
import { DOSYA_ARACLARI_YOLU } from "../../converter/gorsel/dosyaAraclari";
import AracSayfasi from "../gorsel/AracSayfasi";
import { takvimMetadata } from "../takvim/takvimMeta";
import EypAc from "./EypAc";
import UdfAc from "./UdfAc";

type Sayfa = {
  yol: string;
  baslik: string;
  seoBaslik: string;
  aciklama: string;
  giris: string;
  arac: ReactNode;
  sss: FaqItem[];
  bolumler: Array<{ id: string; baslik: string; icerik: ReactNode }>;
};

const BAGLANTILAR = [
  { href: DOSYA_ARACLARI_YOLU, label: "Tüm Dosya Araçları" },
  { href: "/udf-dosyasi-acma", label: "UDF Dosyası Açma" },
  { href: "/udf-pdf-cevirme", label: "UDF → PDF" },
  { href: "/udf-word-cevirme", label: "UDF → Word" },
  { href: "/eyp-dosyasi-acma", label: "EYP Dosyası Açma" },
  { href: "/pdf-birlestirme", label: "PDF Birleştirme" },
  { href: "/pdf-imzalama", label: "PDF İmzalama" },
  { href: "/pdf-sifre-kaldirma", label: "PDF Şifre Kaldırma" },
];

const UDF_ORTAK_SSS: FaqItem[] = [
  {
    question: "UDF dosyası nedir?",
    answer:
      "UDF, UYAP (Ulusal Yargı Ağı Bilişim Sistemi) Doküman Editörü'nün belge biçimidir. Dilekçe, tutanak, karar ve bilirkişi raporları gibi yargı belgeleri bu biçimde hazırlanır. Dosya aslında içinde belge metni (content.xml), belge bilgileri ve varsa e-imza bulunan bir ZIP paketidir.",
  },
  {
    question: "Belgem bir sunucuya yükleniyor mu?",
    answer:
      "Hayır. UDF dosyası tarayıcınızda, bu cihazda açılır ve dönüştürülür; hiçbir sunucuya gönderilmez. Dava dosyası, kişisel veri veya müvekkil bilgisi içeren belgeler için bu önemlidir.",
  },
  {
    question: "E-imzalı UDF açılır mı? İmza korunur mu?",
    answer:
      "E-imzalı UDF'ler de açılır ve belge içinde imza bulunduğu belirtilir. Ancak dönüştürülen PDF veya Word dosyası e-imza taşımaz; imzalı aslın hukuki yerine geçmez. İmzalı asıl gerektiğinde UDF dosyasının kendisini kullanın.",
  },
  {
    question: "UDF'yi resmî yoldan nasıl açarım?",
    answer:
      "Resmî yöntem, UYAP Doküman Editörü'nü kurmaktır; editörde Dosya menüsündeki PDF olarak kaydetme seçeneğiyle PDF de alınabilir. Bu sayfa, program kurmadan hızlıca okumak ve PDF/Word'e çevirmek içindir.",
  },
];

const UDF_NASIL: ReactNode = (
  <ol>
    <li>UDF dosyasını yukarıdaki alana bırakın veya seçin.</li>
    <li>Belge, sayfa düzeniyle aşağıda açılır.</li>
    <li>
      <b>PDF olarak kaydet</b>, <b>Word (.docx) indir</b> veya{" "}
      <b>Metin (.txt) indir</b> düğmesini kullanın.
    </li>
  </ol>
);

const UDF_DESTEK: ReactNode = (
  <ul>
    <li>Kalın, italik, altı çizili yazı; yazı tipi, boyut ve renk</li>
    <li>
      Sola, ortaya, sağa ve iki yana hizalama; girinti ve paragraf boşlukları
    </li>
    <li>Sekmeyle hizalanmış satırlar (Esas No, Karar No gibi)</li>
    <li>Tablolar, birleştirilmiş hücreler ve kenarlıklar</li>
    <li>Belgeye gömülü görseller (logo, kaşe görüntüsü)</li>
    <li>Sayfa boyutu (A4, A5, Letter), yönü ve kenar boşlukları</li>
    <li>Üst ve alt bilgi, sayfa sonları</li>
  </ul>
);

export const BELGE_SAYFALARI: Record<string, Sayfa> = {
  "udf-dosyasi-acma": {
    yol: "/udf-dosyasi-acma",
    baslik: "UDF Dosyası Açma",
    seoBaslik:
      "UDF Dosyası Açma: UYAP Editörsüz Online Görüntüle, PDF ve Word'e Çevir",
    aciklama:
      "UYAP UDF dosyasını program kurmadan açın; sayfa düzeniyle görüntüleyin, PDF, Word (.docx) veya metin olarak kaydedin. Belge sunucuya yüklenmez.",
    giris:
      "Mahkemeden, avukatınızdan veya UYAP'tan gelen .udf uzantılı belgeyi UYAP Doküman Editörü ya da Java kurmadan, telefonda veya bilgisayarda okuyun.",
    arac: <UdfAc />,
    sss: [
      ...UDF_ORTAK_SSS,
      {
        question: "Telefonda UDF dosyası nasıl açılır?",
        answer:
          "Bu sayfayı telefonunuzun tarayıcısında açıp UDF dosyasını seçin. WhatsApp veya e-postayla gelen dosyayı önce telefona kaydedin, sonra 'UDF dosyasını seçin' alanından Dosyalar/İndirilenler klasöründen seçin.",
      },
      {
        question: "Belge bozuk ya da farklı görünüyorsa ne yapmalıyım?",
        answer:
          "Yazı tipleri cihazınızdakiyle değiştirilebildiği için satır kırılımları UYAP editöründen biraz farklı olabilir; metin ve biçim aynı kalır. Dosya hiç açılmıyorsa bir UDF belgesi olmayabilir veya indirme yarıda kalmış olabilir; dosyayı yeniden indirin.",
      },
    ],
    bolumler: [
      { id: "nasil", baslik: "UDF dosyası nasıl açılır?", icerik: UDF_NASIL },
      {
        id: "destek",
        baslik: "Belgenin hangi özellikleri korunur?",
        icerik: UDF_DESTEK,
      },
      {
        id: "kimler",
        baslik: "Kimler kullanır?",
        icerik: (
          <p>
            Avukatlar, stajyerler, bilirkişiler, arabulucular ve davası olan
            vatandaşlar; UYAP Vatandaş veya Avukat Portal&apos;dan indirilen
            evrakı bilgisayarında editör olmadan okumak, müvekkile PDF olarak
            göndermek ya da metni Word&apos;de düzenlemek için kullanır. PDF
            gelen evrakı birleştirmek için{" "}
            <Link href="/pdf-birlestirme">PDF Birleştirme</Link> aracına
            geçebilirsiniz.
          </p>
        ),
      },
    ],
  },
  "udf-pdf-cevirme": {
    yol: "/udf-pdf-cevirme",
    baslik: "UDF'yi PDF'ye Çevirme",
    seoBaslik: "UDF PDF Çevirme: UYAP UDF'yi PDF Yap (Ücretsiz, Yüklemeden)",
    aciklama:
      "UYAP UDF belgesini sayfa düzeni, tablo ve biçimiyle PDF'ye çevirin. Program kurulmaz, dosya sunucuya yüklenmez; telefonda da çalışır.",
    giris:
      "UDF belgesini herkesin açabildiği PDF'ye çevirin: müvekkile, işverene veya kuruma göndermek ve yazdırmak için.",
    arac: <UdfAc odak="pdf" />,
    sss: [
      {
        question: "PDF nasıl kaydedilir?",
        answer:
          "Belge açıldıktan sonra 'PDF olarak kaydet'e basın. Açılan yazdırma penceresinde hedef (yazıcı) olarak 'PDF olarak kaydet'i seçin ve Kaydet'e basın. Android'de Yazdır → PDF olarak kaydet, iPhone'da Paylaş → Yazdır ekranında önizlemeyi iki parmakla büyütüp paylaşarak PDF alırsınız.",
      },
      {
        question: "PDF'teki yazılar seçilebilir mi?",
        answer:
          "Evet. Belge resme çevrilmez; yazılar metin olarak kalır, PDF içinde arama yapılabilir ve kopyalanabilir.",
      },
      {
        question: "Sayfa kenar boşlukları UDF'deki gibi mi olur?",
        answer:
          "Evet. UDF'de kayıtlı kâğıt boyutu, yönü ve kenar boşlukları PDF'e aktarılır. Yazdırma penceresinde 'Kenar boşlukları: Varsayılan' ve 'Ölçek: %100' seçili kalsın; 'Üstbilgi ve altbilgi' seçeneğini kapatın.",
      },
      ...UDF_ORTAK_SSS,
    ],
    bolumler: [
      {
        id: "nasil",
        baslik: "UDF'yi PDF'ye çevirme adımları",
        icerik: UDF_NASIL,
      },
      {
        id: "destek",
        baslik: "PDF'e aktarılanlar",
        icerik: UDF_DESTEK,
      },
      {
        id: "sonra",
        baslik: "PDF'i aldıktan sonra",
        icerik: (
          <ul>
            <li>
              Birden fazla evrakı tek dosya yapmak için{" "}
              <Link href="/pdf-birlestirme">PDF Birleştirme</Link>
            </li>
            <li>
              Dosya e-posta için büyükse{" "}
              <Link href="/pdf-sikistirma">PDF Sıkıştırma</Link>
            </li>
            <li>
              Kişisel verileri korumak için{" "}
              <Link href="/pdf-sifreleme">PDF Şifreleme</Link>
            </li>
          </ul>
        ),
      },
    ],
  },
  "udf-word-cevirme": {
    yol: "/udf-word-cevirme",
    baslik: "UDF'yi Word'e Çevirme",
    seoBaslik: "UDF Word Çevirme: UYAP UDF'yi DOCX Yap (Düzenlenebilir)",
    aciklama:
      "UYAP UDF belgesini düzenlenebilir Word (.docx) dosyasına çevirin; hizalama, tablo, kalın/italik ve sayfa düzeni korunur. Yüklemeden, ücretsiz.",
    giris:
      "Dilekçe ya da karar metnini Word'de düzenlemek, alıntı yapmak veya şablon olarak kullanmak için UDF'yi .docx'e çevirin.",
    arac: <UdfAc odak="word" />,
    sss: [
      {
        question: "Word dosyası hangi programlarda açılır?",
        answer:
          "Oluşan .docx dosyası Microsoft Word, LibreOffice Writer, Google Dokümanlar, WPS Office ve telefonlardaki Word uygulamasında açılır ve düzenlenir.",
      },
      {
        question: "Word'de düzenlediğim belgeyi tekrar UDF yapabilir miyim?",
        answer:
          "Bu araç yalnızca UDF'den Word'e çevirir. Düzenlediğiniz metni UDF yapmak için UYAP Doküman Editörü'nde yeni belge açıp metni yapıştırın ve UDF olarak kaydedin. İmza gerekiyorsa belgeyi UYAP üzerinden yeniden imzalamanız gerekir.",
      },
      {
        question: "Yazı tipi neden farklı görünüyor?",
        answer:
          "Word dosyasına UDF'deki yazı tipi adı (çoğunlukla Times New Roman) yazılır. Cihazınızda o yazı tipi yoksa Word benzeriyle gösterir; başka bir bilgisayarda doğru görünür.",
      },
      ...UDF_ORTAK_SSS,
    ],
    bolumler: [
      {
        id: "nasil",
        baslik: "UDF'yi Word'e çevirme adımları",
        icerik: UDF_NASIL,
      },
      {
        id: "destek",
        baslik: "Word'e aktarılanlar",
        icerik: UDF_DESTEK,
      },
      {
        id: "metin",
        baslik: "Yalnızca metin gerekiyorsa",
        icerik: (
          <p>
            Metni başka bir yere yapıştıracaksanız <b>Metin (.txt) indir</b>{" "}
            düğmesi biçimsiz, Türkçe karakterleri doğru düz metin verir. İki
            sürüm arasındaki farkları görmek için{" "}
            <Link href="/metin-karsilastirma">Metin Karşılaştırma</Link> aracını
            kullanabilirsiniz.
          </p>
        ),
      },
    ],
  },
  "eyp-dosyasi-acma": {
    yol: "/eyp-dosyasi-acma",
    baslik: "EYP Dosyası Açma",
    seoBaslik:
      "EYP Dosyası Açma: e-Yazışma Paketini Online Görüntüle (İmzager'siz)",
    aciklama:
      "KEP veya EBYS'den gelen .eyp dosyasını program kurmadan açın: üst yazıyı görün, konu, sayı, tarih ve gönderen bilgilerini okuyun, ekleri indirin. Yüklemeden.",
    giris:
      "Kamu kurumlarından KEP veya EBYS ile gelen e-Yazışma Paketi (.eyp) dosyasındaki resmî yazıyı ve eklerini İmzager kurmadan görüntüleyin.",
    arac: <EypAc />,
    sss: [
      {
        question: "EYP dosyası nedir?",
        answer:
          "EYP (e-Yazışma Paketi), kamu kurumlarının resmî yazışmalarında kullanılan elektronik paket biçimidir. İçinde üst yazı (çoğunlukla PDF), ekler, yazının konu, sayı, tarih ve dağıtım bilgilerini tutan üstveri ve e-imza bulunur. Paket, Open Packaging Conventions (OPC) standardına uygun bir ZIP yapısındadır.",
      },
      {
        question: "EYP dosyasını resmî yoldan nasıl açarım?",
        answer:
          "Resmî ve ücretsiz yöntem, TÜBİTAK Kamu SM'nin İmzager programıdır; imzaların doğrulanması da bu programla yapılır. Bu sayfa ise kurulum yapmadan yazıyı okumak ve ekleri almak içindir.",
      },
      {
        question: "E-imza burada doğrulanıyor mu?",
        answer:
          "Hayır. Araç paketteki imza dosyasının varlığını gösterir ancak imzanın geçerliliğini doğrulamaz. Hukuki işlem yapmadan önce imzayı İmzager ile ya da yazıdaki doğrulama kodunu gönderen kurumun belge doğrulama adresinde kontrol edin.",
      },
      {
        question: "Ekler neden 'pakette yok' görünüyor?",
        answer:
          "Bazı ekler pakete gömülmez: fiziksel ekler (CD, klasör gibi) ayrıca gönderilir, bazıları ise harici bir adrese bağlantı olarak verilir. Üstveride adı geçen ancak pakette dosyası olmayan ekler bu şekilde listelenir.",
      },
      {
        question: "Dosyam bir sunucuya yükleniyor mu?",
        answer:
          "Hayır. Paket tarayıcınızda açılır; resmî yazı ve ekleri bu cihazdan çıkmaz.",
      },
      {
        question: "EYP'yi ZIP olarak açabilir miyim?",
        answer:
          "Evet, EYP bir ZIP yapısındadır; uzantısını .zip yapıp açtığınızda klasörleri görürsünüz. Ancak dosya adları ve bilgiler dağınıktır; bu araç üst yazıyı, bilgileri ve ekleri düzenli gösterir.",
      },
    ],
    bolumler: [
      {
        id: "nasil",
        baslik: "EYP dosyası nasıl açılır?",
        icerik: (
          <ol>
            <li>
              KEP hesabınızdan veya EBYS&apos;den .eyp dosyasını bilgisayarınıza
              ya da telefonunuza indirin.
            </li>
            <li>Dosyayı yukarıdaki alana bırakın veya seçin.</li>
            <li>
              Konu, sayı, tarih ve gönderen bilgileri üstte, üst yazı altta
              gösterilir; ekleri tek tek veya üst yazıyla birlikte ZIP olarak
              indirin.
            </li>
          </ol>
        ),
      },
      {
        id: "icerik",
        baslik: "EYP paketinin içinde neler var?",
        icerik: (
          <ul>
            <li>
              <b>Üst yazı:</b> Resmî yazının kendisi, çoğunlukla PDF.
            </li>
            <li>
              <b>Ekler:</b> Yazıya eklenen belgeler (PDF, Excel, görsel vb.).
            </li>
            <li>
              <b>Üstveri:</b> Konu, sayı, tarih, gönderen kurum, dağıtım ve ilgi
              bilgileri.
            </li>
            <li>
              <b>Paket özeti ve imza:</b> Paketin değiştirilmediğini gösteren
              özet değerleri ve e-imza.
            </li>
          </ul>
        ),
      },
      {
        id: "ilgili",
        baslik: "İlgili araçlar",
        icerik: (
          <p>
            Üst yazıyı ve ekleri tek PDF yapmak için{" "}
            <Link href="/pdf-birlestirme">PDF Birleştirme</Link>, adliyeden
            gelen .udf belgeleri için{" "}
            <Link href="/udf-dosyasi-acma">UDF Dosyası Açma</Link> aracını
            kullanın.
          </p>
        ),
      },
    ],
  },
};

export const belgeMeta = (anahtar: string) => {
  const s = BELGE_SAYFALARI[anahtar];
  return takvimMetadata(s.yol, {
    title: s.seoBaslik,
    short: s.baslik,
    description: s.aciklama,
  });
};

export function BelgeSayfasi({ anahtar }: { anahtar: string }) {
  const s = BELGE_SAYFALARI[anahtar];
  return (
    <AracSayfasi
      yol={s.yol}
      baslik={s.baslik}
      giris={s.giris}
      arac={s.arac}
      sss={s.sss}
      bolumler={s.bolumler}
      baglantilar={BAGLANTILAR.filter((b) => b.href !== s.yol)}
    />
  );
}
