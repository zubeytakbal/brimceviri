import Link from "@/app/components/SiteLink";
import type { ReactNode } from "react";
import type { FaqItem } from "../../converter/faqSchema";
import { DOSYA_ARACLARI_YOLU } from "../../converter/gorsel/dosyaAraclari";
import AracSayfasi from "../gorsel/AracSayfasi";
import { takvimMetadata } from "../takvim/takvimMeta";
import EypAc from "./EypAc";
import FaturaAc from "./FaturaAc";
import ImzAc from "./ImzAc";
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
  { href: "/imz-dosyasi-acma", label: "İMZ Dosyası Açma" },
  { href: "/e-fatura-goruntuleme", label: "e-Fatura Görüntüleme" },
  { href: "/e-fatura-excel-aktarma", label: "e-Fatura → Excel" },
  { href: "/pdf-birlestirme", label: "PDF Birleştirme" },
];

const IMZ_ORTAK_SSS: FaqItem[] = [
  {
    question: "Dosyam bir sunucuya yükleniyor mu?",
    answer:
      "Hayır. İmzalı dosya tarayıcınızda açılır; içindeki belge, kimlik bilgileri ve sertifika bu cihazdan çıkmaz.",
  },
  {
    question: "Bu araç e-imzayı resmî olarak doğrular mı?",
    answer:
      "Araç iki şeyi denetler: imzanın imzacının sertifikasındaki anahtarla matematiksel olarak doğru olup olmadığını ve dosyanın imzalandıktan sonra değişip değişmediğini. Sertifikanın iptal edilip edilmediği (SİL/OCSP) ve kök sertifika zinciri denetlenmez. Hukuki bir işlemde İmzager gibi onaylı bir doğrulama yazılımı kullanın.",
  },
  {
    question: "Güvenli elektronik imza ıslak imza yerine geçer mi?",
    answer:
      "5070 sayılı Elektronik İmza Kanunu'na göre güvenli elektronik imza, elle atılan imzayla aynı hukuki sonucu doğurur. Kanun, resmî şekle veya özel bir merasime bağlı işlemleri ve teminat sözleşmelerini bunun dışında tutar.",
  },
];

const FATURA_ORTAK_SSS: FaqItem[] = [
  {
    question: "Faturalarım bir sunucuya yükleniyor mu?",
    answer:
      "Hayır. XML dosyaları tarayıcınızda okunur; firma bilgileri, tutarlar ve kalemler bu cihazdan çıkmaz.",
  },
  {
    question: "e-Arşiv faturaları da açılır mı?",
    answer:
      "Evet. e-Fatura (Temel ve Ticari) ile e-Arşiv faturaları aynı UBL-TR XML biçimini kullanır; ikisi de açılır. İade, tevkifat, istisna ve özel matrah faturaları da desteklenir.",
  },
  {
    question: "Görüntülediğim fatura resmî belge yerine geçer mi?",
    answer:
      "Faturanın hukuki aslı XML dosyasıdır; ekrandaki görünüm ve PDF, o dosyanın okunaklı bir kopyasıdır. Muhasebe kaydı ve saklama için XML dosyasını da saklayın.",
  },
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
  "imz-dosyasi-acma": {
    yol: "/imz-dosyasi-acma",
    baslik: "İMZ Dosyası Açma",
    seoBaslik:
      "İMZ Dosyası Açma: e-İmzalı Dosyayı Aç ve İmzayı Gör (Programsız)",
    aciklama:
      "e-İmzalı .imz dosyasının içindeki PDF, Word veya UDF belgesini program kurmadan çıkarın; imzacıyı, imza zamanını ve dosyanın değişip değişmediğini görün.",
    giris:
      "E-posta, KEP veya UYAP üzerinden gelen .imz uzantılı e-imzalı dosyayı açın; içindeki asıl belgeyi indirin ve kimin, ne zaman imzaladığını görün.",
    arac: <ImzAc />,
    sss: [
      {
        question: "İMZ dosyası nedir?",
        answer:
          "İMZ, e-imzayla imzalanmış bir dosyanın kaydedildiği biçimdir. İmzalanan belge (PDF, Word, UDF, görsel vb.), imzacının sertifikası ve imza tek bir dosyada birleştirilir. Yapısı uluslararası CAdES / PKCS#7 standardına dayanır.",
      },
      {
        question: "İMZ dosyasının içindeki belgeyi nasıl çıkarırım?",
        answer:
          "Dosyayı bu sayfaya bırakın. İçindeki belge otomatik bulunur ve türü tanınır; 'Asıl dosyayı indir' ile kaydedin. Dosya adı 'sozlesme.pdf.imz' ise çıkan dosya 'sozlesme.pdf' olur.",
      },
      {
        question: "'İmza geçersiz' ne anlama gelir?",
        answer:
          "Dosya imzalandıktan sonra değiştirilmiş ya da imza bozulmuş demektir. Böyle bir belgeye güvenmeyin; gönderenden dosyayı yeniden isteyin.",
      },
      {
        question: "Birden fazla kişinin imzası görünür mü?",
        answer:
          "Evet. Aynı belgeyi birlikte imzalayanlar (paralel imza), bir imzayı onaylayan seri imzalar ve imzalı dosyanın yeniden imzalandığı iç içe katmanlar ayrı ayrı listelenir.",
      },
      ...IMZ_ORTAK_SSS,
    ],
    bolumler: [
      {
        id: "nasil",
        baslik: "İMZ dosyası nasıl açılır?",
        icerik: (
          <ol>
            <li>.imz dosyasını yukarıdaki alana bırakın veya seçin.</li>
            <li>İçindeki belge tanınır; PDF ise sayfaları hemen gösterilir.</li>
            <li>
              <b>Asıl dosyayı indir</b> ile belgeyi kaydedin; imzacı ve imza
              bilgileri altta listelenir.
            </li>
          </ol>
        ),
      },
      {
        id: "bilgiler",
        baslik: "Hangi imza bilgileri gösterilir?",
        icerik: (
          <ul>
            <li>İmzacının adı ve (gizlenmiş) kimlik numarası</li>
            <li>Sertifikayı veren kuruluş ve sertifikanın geçerlilik süresi</li>
            <li>
              İmza zamanı; zaman damgası varsa zaman damgası sunucusunun saati
            </li>
            <li>İmzanın ve belgenin bütünlüğünün denetim sonucu</li>
          </ul>
        ),
      },
      {
        id: "ilgili",
        baslik: "İçinden çıkan belgeyle devam edin",
        icerik: (
          <p>
            İçinden UYAP belgesi çıkarsa{" "}
            <Link href="/udf-dosyasi-acma">UDF Dosyası Açma</Link>, e-Yazışma
            paketi çıkarsa{" "}
            <Link href="/eyp-dosyasi-acma">EYP Dosyası Açma</Link> aracıyla
            açabilirsiniz. PDF&apos;e görsel imza eklemek için{" "}
            <Link href="/pdf-imzalama">PDF İmzalama</Link> aracını kullanın.
          </p>
        ),
      },
    ],
  },
  "p7s-dosyasi-acma": {
    yol: "/p7s-dosyasi-acma",
    baslik: "P7S ve P7M Dosyası Açma",
    seoBaslik: "P7S Dosyası Açma: smime.p7s ve P7M İmzasını Görüntüle",
    aciklama:
      "P7S ve P7M e-imza dosyalarını açın: imzacıyı ve sertifikayı görün, P7M içindeki belgeyi çıkarın, ayrık P7S imzasını asıl dosyayla doğrulayın. Yüklemeden.",
    giris:
      "E-postalara eklenen smime.p7s ya da içinde belge taşıyan .p7m dosyasını açın; kimin imzaladığını ve belgenin değişip değişmediğini görün.",
    arac: <ImzAc p7s />,
    sss: [
      {
        question: "E-postadaki smime.p7s dosyası nedir?",
        answer:
          "Gönderenin e-postayı dijital olarak imzaladığını gösteren S/MIME imzasıdır. İçinde e-postanın metni yoktur; yalnızca imza ve gönderenin sertifikası bulunur. Silmeniz e-postaya zarar vermez; bu sayfada açarak sertifika sahibini görebilirsiniz.",
      },
      {
        question: "P7S ile P7M arasındaki fark nedir?",
        answer:
          "P7M içinde imzalanan belgeyi de taşır; açınca belge çıkar. P7S ise 'ayrık' imzadır: belge ayrı bir dosyadır ve imza yalnızca onu doğrular. P7S'yi doğrulamak için imzalanan asıl dosyayı da seçmeniz gerekir.",
      },
      {
        question: "P7S dosyasını asıl belgeyle nasıl doğrularım?",
        answer:
          "Önce .p7s dosyasını seçin, ardından çıkan ikinci alana imzalanan asıl dosyayı bırakın. Dosya bire bir aynıysa imza 'geçerli' görünür; tek bir bayt bile değişmişse 'geçersiz' olur.",
      },
      ...IMZ_ORTAK_SSS,
    ],
    bolumler: [
      {
        id: "nasil",
        baslik: "P7S / P7M dosyası nasıl açılır?",
        icerik: (
          <ol>
            <li>.p7s veya .p7m dosyasını yukarıdaki alana bırakın.</li>
            <li>
              P7M ise içindeki belge çıkarılır; P7S ise asıl dosyayı ayrıca
              seçmeniz istenir.
            </li>
            <li>İmzacı, sertifika ve doğrulama sonucu altta gösterilir.</li>
          </ol>
        ),
      },
      {
        id: "imz",
        baslik: "İMZ dosyaları",
        icerik: (
          <p>
            Türkiye&apos;de e-imza programlarının ürettiği .imz dosyaları da
            aynı standarda dayanır; onlar için{" "}
            <Link href="/imz-dosyasi-acma">İMZ Dosyası Açma</Link> sayfasını
            kullanabilirsiniz.
          </p>
        ),
      },
    ],
  },
  "e-fatura-goruntuleme": {
    yol: "/e-fatura-goruntuleme",
    baslik: "e-Fatura XML Görüntüleme",
    seoBaslik: "e-Fatura Görüntüleme: XML Faturayı Aç, PDF Yap (e-Arşiv Dahil)",
    aciklama:
      "e-Fatura ve e-Arşiv XML dosyasını program kurmadan açın; faturayı kendi şablonuyla ya da sade görünümle görün, PDF olarak kaydedin, kalemleri Excel'e aktarın.",
    giris:
      "Size gönderilen ya da portaldan indirdiğiniz e-Fatura XML dosyasını okunaklı fatura görünümünde açın.",
    arac: <FaturaAc />,
    sss: [
      {
        question: "e-Fatura XML dosyası nasıl açılır?",
        answer:
          "XML dosyasını bu sayfaya bırakın. Fatura; satıcı, alıcı, kalemler, vergiler ve toplamlarla birlikte gösterilir. Faturanın içinde kendi görüntüleme şablonu (XSLT) varsa 'Faturanın kendi şablonu' seçeneğiyle faturayı düzenleyenin tasarımıyla da görebilirsiniz.",
      },
      {
        question: "XML'i not defterinde açınca neden anlamsız görünüyor?",
        answer:
          "e-Fatura, bilgisayarların okuyacağı UBL-TR biçiminde bir XML'dir; içinde e-imza ve Base64 ile gömülmüş şablon gibi uzun bölümler bulunur. Bu araç bu yapıyı okuyup insanın okuyabileceği fatura görünümüne çevirir.",
      },
      {
        question: "ETTN nedir?",
        answer:
          "Evrensel Tekil Tanımlama Numarası; her e-faturaya verilen ve faturayı benzersiz kılan 36 karakterlik koddur. Fatura numarasıyla birlikte görünümün üst kısmında gösterilir.",
      },
      ...FATURA_ORTAK_SSS,
    ],
    bolumler: [
      {
        id: "nasil",
        baslik: "e-Fatura XML'i nasıl görüntülenir?",
        icerik: (
          <ol>
            <li>
              Fatura XML dosyasını (veya içinde XML olan ZIP&apos;i) seçin.
            </li>
            <li>
              Fatura sade görünümde açılır; varsa faturanın kendi şablonuna
              geçebilirsiniz.
            </li>
            <li>
              <b>PDF olarak kaydet / yazdır</b> ya da{" "}
              <b>Kalemleri Excel&apos;e aktar</b> düğmesini kullanın.
            </li>
          </ol>
        ),
      },
      {
        id: "gosterilen",
        baslik: "Faturada gösterilenler",
        icerik: (
          <ul>
            <li>
              Senaryo (Temel, Ticari, e-Arşiv) ve tip (Satış, İade, Tevkifat…)
            </li>
            <li>Fatura no, tarih, ETTN, sipariş ve irsaliye bilgileri</li>
            <li>Satıcı ve alıcının unvanı, VKN/TCKN, vergi dairesi, adres</li>
            <li>Kalemler: miktar, birim, birim fiyat, iskonto, KDV oranı</li>
            <li>Hesaplanan vergiler, tevkifat, genel toplam ve notlar</li>
          </ul>
        ),
      },
      {
        id: "toplu",
        baslik: "Çok sayıda fatura mı var?",
        icerik: (
          <p>
            Aylık faturalarınızı tek tabloda görmek için{" "}
            <Link href="/e-fatura-excel-aktarma">
              e-Fatura Excel&apos;e Aktarma
            </Link>{" "}
            aracına yüzlerce XML&apos;i veya ZIP&apos;i birlikte bırakın.
          </p>
        ),
      },
    ],
  },
  "xml-fatura-pdf-cevirme": {
    yol: "/xml-fatura-pdf-cevirme",
    baslik: "XML Faturayı PDF'ye Çevirme",
    seoBaslik: "XML Fatura PDF Çevirme: e-Fatura XML'ini PDF Yap (Ücretsiz)",
    aciklama:
      "e-Fatura veya e-Arşiv XML faturasını PDF'ye çevirin; faturanın kendi şablonu veya sade A4 görünüm. Program yok, kayıt yok, dosya yüklenmez.",
    giris:
      "Muhasebeye, müşteriye göndermek ya da yazdırmak için XML faturayı herkesin açabildiği PDF'ye çevirin.",
    arac: <FaturaAc odak="pdf" />,
    sss: [
      {
        question: "XML fatura PDF'ye nasıl çevrilir?",
        answer:
          "XML dosyasını seçin, fatura açılınca 'PDF olarak kaydet / yazdır'a basın. Yazdırma penceresinde hedef olarak 'PDF olarak kaydet'i seçip kaydedin. Kenar boşluklarını 'Varsayılan', ölçeği '%100' bırakın ve 'Üstbilgi ve altbilgi' seçeneğini kapatın.",
      },
      {
        question: "PDF'te faturanın kendi tasarımı olur mu?",
        answer:
          "Faturada gömülü şablon varsa 'Faturanın kendi şablonu' seçeneğini açtıktan sonra PDF'e kaydedin; PDF, faturayı düzenleyen firmanın tasarımıyla oluşur. Güvenlik için şablon içindeki betikler çalıştırılmaz; bazı şablonlardaki karekod bu yüzden görünmeyebilir.",
      },
      ...FATURA_ORTAK_SSS,
    ],
    bolumler: [
      {
        id: "nasil",
        baslik: "XML faturayı PDF'ye çevirme adımları",
        icerik: (
          <ol>
            <li>XML faturayı seçin.</li>
            <li>Sade görünüm veya faturanın kendi şablonunu seçin.</li>
            <li>
              <b>PDF olarak kaydet / yazdır</b> düğmesine basıp yazdırma
              penceresinde &quot;PDF olarak kaydet&quot;i seçin.
            </li>
          </ol>
        ),
      },
      {
        id: "ilgili",
        baslik: "İlgili araçlar",
        icerik: (
          <p>
            Birden çok faturayı birleştirmek için PDF&apos;leri{" "}
            <Link href="/pdf-birlestirme">PDF Birleştirme</Link> aracına verin;
            fatura listesini tablo olarak almak için{" "}
            <Link href="/e-fatura-excel-aktarma">
              e-Fatura Excel&apos;e Aktarma
            </Link>{" "}
            aracını kullanın.
          </p>
        ),
      },
    ],
  },
  "e-fatura-excel-aktarma": {
    yol: "/e-fatura-excel-aktarma",
    baslik: "e-Fatura Excel'e Aktarma",
    seoBaslik: "e-Fatura XML Excel'e Aktarma: Toplu Fatura Listesi ve Kalemler",
    aciklama:
      "Yüzlerce e-Fatura ve e-Arşiv XML'ini (veya ZIP'ini) tek seferde Excel'e aktarın: fatura özeti ve tüm kalemler iki ayrı sayfada. Ücretsiz, yüklemeden.",
    giris:
      "Ay sonu mutabakatı, KDV kontrolü veya gider takibi için faturalarınızı tek Excel tablosunda toplayın.",
    arac: <FaturaAc odak="excel" />,
    sss: [
      {
        question: "Excel dosyasında hangi bilgiler olur?",
        answer:
          "'Faturalar' sayfasında her fatura için tarih, numara, ETTN, senaryo, tip, satıcı ve alıcı (VKN/TCKN), para birimi, mal/hizmet toplamı, iskonto, KDV, diğer vergiler, tevkifat, vergiler dahil toplam ve ödenecek tutar bulunur. 'Kalemler' sayfasında tüm faturaların satırları miktar, birim fiyat, KDV oranı ve tutarlarıyla listelenir.",
      },
      {
        question: "Kaç fatura aktarabilirim?",
        answer:
          "Sınır cihazınızın belleğidir; yüzlerce fatura sorunsuz işlenir. Portaldan indirdiğiniz ZIP'leri açmadan doğrudan bırakabilirsiniz; aynı ETTN'li faturalar bir kez sayılır.",
      },
      {
        question: "Tutarlar Excel'de sayı olarak mı gelir?",
        answer:
          "Evet. Tutarlar ve miktarlar sayı olarak yazılır; Excel'de doğrudan toplayabilir, pivot tablo yapabilir ve filtreleyebilirsiniz.",
      },
      ...FATURA_ORTAK_SSS,
    ],
    bolumler: [
      {
        id: "nasil",
        baslik: "Faturaları Excel'e aktarma adımları",
        icerik: (
          <ol>
            <li>
              Fatura XML&apos;lerini veya ZIP dosyalarını seçin (birden çok
              seçebilir, sonradan ekleyebilirsiniz).
            </li>
            <li>Liste ve toplam tutar hemen görünür.</li>
            <li>
              <b>Excel&apos;e aktar</b> ile iki sayfalı .xlsx dosyasını indirin.
            </li>
          </ol>
        ),
      },
      {
        id: "kullanim",
        baslik: "Nerelerde işe yarar?",
        icerik: (
          <ul>
            <li>Gelen faturaların muhasebe kayıtlarıyla karşılaştırılması</li>
            <li>İndirilecek KDV ve tevkifat tutarlarının kontrolü</li>
            <li>Tedarikçi bazında gider ve alım analizi</li>
            <li>Kalem bazında fiyat takibi</li>
          </ul>
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
