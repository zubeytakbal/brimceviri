import Link from "@/app/components/SiteLink";
import type { ReactNode } from "react";
import type { FaqItem } from "../../converter/faqSchema";
import { DOSYA_ARACLARI_YOLU } from "../../converter/gorsel/dosyaAraclari";
import AracSayfasi from "../gorsel/AracSayfasi";
import { takvimMetadata } from "../takvim/takvimMeta";
import VeriDonusturucu, { JsonDuzenleyici } from "./VeriAraclari";
import ArsivAc from "./ArsivAc";
import { ZipAc, ZipOlustur } from "./ZipAraclari";

const GIZLILIK: FaqItem = {
  question: "Dosyalarım bir sunucuya yükleniyor mu?",
  answer:
    "Hayır. Dönüştürme tarayıcınızda yapılır; müşteri listesi, bordro veya not çizelgesi gibi kişisel veriler içeren dosyalarınız bilgisayarınızdan çıkmaz.",
};

const TURKCE: FaqItem = {
  question: "CSV'yi Excel'de açınca Türkçe karakterler neden bozuk görünüyor?",
  answer:
    "Excel, başında işaret (BOM) olmayan UTF-8 CSV dosyalarını eski Windows kodlamasıyla okur; ğ, ş, İ gibi harfler bozulur. Araç varsayılan olarak UTF-8 BOM ekler; bu sayede dosya Excel'de çift tıklayınca doğru açılır. Türkçe Excel ayrıca virgül yerine noktalı virgül (;) ayırıcı bekler.",
};

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
  { href: "/excel-csv-cevirme", label: "Excel CSV Çevirme" },
  { href: "/csv-excel-cevirme", label: "CSV Excel Çevirme" },
  { href: "/csv-json-cevirme", label: "CSV JSON Çevirme" },
  { href: "/json-csv-cevirme", label: "JSON CSV Çevirme" },
  { href: "/json-duzenleyici", label: "JSON Düzenleyici" },
  { href: "/zip-olusturma", label: "ZIP Oluşturma" },
  { href: "/zip-acma", label: "ZIP Açma" },
  { href: "/rar-acma", label: "RAR Açma" },
  { href: "/7z-acma", label: "7Z Açma" },
  { href: "/rar-zip-cevirme", label: "RAR ZIP Çevirme" },
  { href: "/pdf-metin-cikarma", label: "PDF'ten Metin Çıkarma" },
];

const AYIRICI_BOLUMU = {
  id: "ayirici",
  baslik: "Virgül mü noktalı virgül mü?",
  icerik: (
    <p>
      CSV &quot;virgülle ayrılmış değerler&quot; demektir; ancak Türkçe ve
      birçok Avrupa dilinde virgül ondalık ayırıcı olduğu için Excel bu
      bölgelerde noktalı virgül (;) kullanır. Dosyayı Türkçe Excel&apos;de
      açacaksanız noktalı virgül, bir yazılıma, Google E-Tablolar&apos;a veya
      İngilizce Excel&apos;e aktaracaksanız virgül seçin.
    </p>
  ),
};

export const VERI_SAYFALARI: Record<string, Sayfa> = {
  "excel-csv-cevirme": {
    yol: "/excel-csv-cevirme",
    baslik: "Excel CSV Çevirme",
    seoBaslik: "Excel CSV Çevirme: XLSX'i CSV'ye Dönüştür (Türkçe Karakterli)",
    aciklama:
      "Excel (.xlsx) dosyasını CSV'ye çevirin: sayfa seçimi, ; veya , ayırıcı, Türkçe karakter için UTF-8 BOM, tüm sayfaları ZIP. Dosya sunucuya yüklenmez.",
    giris:
      "Excel çalışma kitabınızı bir yazılıma, e-ticaret paneline veya veritabanına aktarmak için CSV'ye çevirin. Sayfayı seçin, önizleyin ve indirin.",
    arac: <VeriDonusturucu mod="excel-csv" />,
    sss: [
      {
        question: "Excel dosyası nasıl CSV'ye çevrilir?",
        answer:
          "Dosyayı seçin, birden fazla sayfa varsa istediğiniz sayfayı seçin, ayırıcıyı belirleyin ve 'CSV indir' düğmesine basın. Tüm sayfaları ayrı CSV dosyaları olarak ZIP içinde de indirebilirsiniz.",
      },
      {
        question: "Tarihler ve formüller ne olur?",
        answer:
          "Tarih biçimli hücreler 2024-01-31 gibi ISO biçiminde yazılır. Formüllerin kendisi değil, Excel'in son hesapladığı değer alınır. Renk, kenarlık gibi biçimlendirmeler CSV'de bulunmaz.",
      },
      {
        question: ".xls (eski Excel) dosyaları destekleniyor mu?",
        answer:
          "Hayır, yalnızca .xlsx desteklenir. Eski dosyayı Excel'de açıp 'Farklı Kaydet > Excel Çalışma Kitabı (.xlsx)' ile kaydederek dönüştürebilirsiniz.",
      },
      TURKCE,
      GIZLILIK,
    ],
    bolumler: [AYIRICI_BOLUMU],
  },
  "csv-excel-cevirme": {
    yol: "/csv-excel-cevirme",
    baslik: "CSV Excel Çevirme",
    seoBaslik:
      "CSV Excel Çevirme: CSV'yi XLSX'e Dönüştür (Türkçe Karakter Sorunsuz)",
    aciklama:
      "CSV dosyalarını Türkçe karakterleri bozulmadan Excel'e (.xlsx) çevirin; ayırıcı otomatik bulunur, sayılar sayı olarak kaydedilir, birden çok CSV tek dosyada ayrı sayfalar olur.",
    giris:
      "Bankadan, e-Devlet'ten veya bir yazılımdan indirdiğiniz CSV dosyasını Excel'de bozuk karakterler ve tek sütuna sıkışmış veriler olmadan açın. Birden çok CSV'yi tek Excel dosyasında birleştirin.",
    arac: <VeriDonusturucu mod="csv-excel" />,
    sss: [
      {
        question: "CSV Excel'de neden tek sütunda görünüyor?",
        answer:
          "Dosyadaki ayırıcı (ör. virgül) Excel'in beklediği ayırıcıyla (Türkçe'de noktalı virgül) aynı değilse tüm satır tek hücreye yazılır. Bu araç ayırıcıyı otomatik bulur ve her değeri kendi sütununa yerleştiren gerçek bir .xlsx dosyası üretir.",
      },
      {
        question:
          "Başında sıfır olan TC kimlik ve telefon numaraları korunur mu?",
        answer:
          "Evet. '05321234567' gibi başında sıfır olan değerler metin olarak saklanır, sıfır silinmez. Diğer sayılar Excel'de hesaplanabilir sayı olur; istemezseniz 'Sayıları tanı' seçeneğini kapatın.",
      },
      {
        question: "Birden fazla CSV'yi tek Excel dosyasına koyabilir miyim?",
        answer:
          "Evet. Dosyaları birlikte seçin; her CSV, dosya adıyla ayrı bir sayfa (sekme) olur.",
      },
      TURKCE,
      GIZLILIK,
    ],
    bolumler: [
      {
        id: "kodlama",
        baslik: "Karakter kodlaması",
        icerik: (
          <p>
            Araç dosyayı önce UTF-8 olarak okur; geçerli UTF-8 değilse Türkçe
            Windows kodlamasıyla (Windows-1254) yeniden dener. Böylece eski
            programların ürettiği CSV&apos;lerde de ğ, ş ve İ doğru görünür.
          </p>
        ),
      },
      AYIRICI_BOLUMU,
    ],
  },
  "csv-json-cevirme": {
    yol: "/csv-json-cevirme",
    baslik: "CSV JSON Çevirme",
    seoBaslik: "CSV JSON Çevirme: Tabloyu JSON Dizisine Dönüştür (Ücretsiz)",
    aciklama:
      "CSV verisini JSON nesne dizisine çevirin; sayı ve true/false tanıma, 'adres.il' başlıklarından iç içe nesne, girinti seçimi. Yapıştırın veya dosya seçin; yüklemeden.",
    giris:
      "CSV dosyanızı veya yapıştırdığınız tabloyu yazılımlarda ve API'lerde kullanılan JSON biçimine çevirin. Başlık satırı anahtar olur, her satır bir nesne.",
    arac: <VeriDonusturucu mod="csv-json" />,
    sss: [
      {
        question: "Çıktı JSON nasıl görünür?",
        answer:
          'İlk satır başlıksa her satır bir nesne olur: [{"ad":"Ayşe","yas":30}, …]. Başlık yoksa her satır bir dizi olur: [["Ayşe",30], …].',
      },
      {
        question: "İç içe JSON nasıl üretilir?",
        answer:
          'Başlıkta nokta kullanın: "adres.il" ve "adres.ilce" sütunları {"adres": {"il": …, "ilce": …}} olur. İstemezseniz ilgili seçeneği kapatın.',
      },
      GIZLILIK,
    ],
    bolumler: [
      {
        id: "turler",
        baslik: "Veri türleri",
        icerik: (
          <p>
            &quot;Sayıları tanı&quot; açıkken 42 ve 3.14 sayı, true/false
            mantıksal değer, boş hücreler null olur. Başında sıfır olan kodlar
            ve virgüllü ondalıklar (85,5) metin olarak kalır; JSON&apos;da
            ondalık ayırıcı noktadır.
          </p>
        ),
      },
    ],
  },
  "json-csv-cevirme": {
    yol: "/json-csv-cevirme",
    baslik: "JSON CSV Çevirme",
    seoBaslik: "JSON CSV Çevirme: JSON'u Excel ve CSV Tablosuna Dönüştür",
    aciklama:
      "JSON dizisini CSV veya Excel tablosuna çevirin; iç içe alanlar 'adres.il' sütunlarına açılır, tablo önizlemesi, Türkçe Excel için ; ayırıcı. Yüklemeden, ücretsiz.",
    giris:
      "API yanıtlarını, dışa aktarılmış kayıtları veya JSON dosyalarını tabloya çevirip Excel'de açın. İç içe nesneler ayrı sütunlara açılır.",
    arac: <VeriDonusturucu mod="json-csv" />,
    sss: [
      {
        question: "İç içe nesneler ve diziler nasıl aktarılır?",
        answer:
          'İç içe nesneler "adres.il" gibi nokta ile ayrılmış sütunlara açılır. Diziler hücreye JSON metni olarak (["a","b"]) yazılır.',
      },
      {
        question: "Kök nesne dizi değilse ne olur?",
        answer:
          'JSON {"kayitlar": [...]} gibi içinde tek bir dizi bulunan bir nesneyse o dizi tablo yapılır; aksi hâlde nesnenin kendisi tek satır olur.',
      },
      TURKCE,
      GIZLILIK,
    ],
    bolumler: [AYIRICI_BOLUMU],
  },
  "json-duzenleyici": {
    yol: "/json-duzenleyici",
    baslik: "JSON Düzenleyici ve Doğrulayıcı",
    seoBaslik: "JSON Düzenleyici: JSON Biçimlendir, Doğrula, Küçült (Online)",
    aciklama:
      "JSON'u okunaklı biçimlendirin, hatayı satır ve sütunuyla bulun, tek satıra küçültün veya anahtarları sıralayın. Veri tarayıcıda kalır, sunucuya gönderilmez.",
    giris:
      "Tek satırlık API yanıtlarını okunaklı hâle getirin ya da JSON'daki hatanın yerini bulun. Yapıştırdığınız veri tarayıcınızdan çıkmaz.",
    arac: <JsonDuzenleyici />,
    sss: [
      {
        question: "JSON'da en sık yapılan hatalar nelerdir?",
        answer:
          "Son öğeden sonra fazladan virgül, anahtarların çift tırnak yerine tek tırnakla yazılması, tırnaksız anahtarlar ve yorum satırları (//) JSON'da geçersizdir. Araç hatanın satır ve sütununu gösterir.",
      },
      {
        question: "Veri güvende mi?",
        answer:
          "Evet. Biçimlendirme ve doğrulama tarayıcınızda yapılır; API anahtarı veya kişisel veri içeren JSON'lar hiçbir sunucuya gönderilmez.",
      },
    ],
    bolumler: [
      {
        id: "ilgili",
        baslik: "İlgili araçlar",
        icerik: (
          <p>
            JSON&apos;u tabloya çevirmek için{" "}
            <Link href="/json-csv-cevirme">JSON CSV Çevirme</Link>, tabloyu JSON
            yapmak için <Link href="/csv-json-cevirme">CSV JSON Çevirme</Link>{" "}
            araçlarını kullanın.
          </p>
        ),
      },
    ],
  },
  "zip-olusturma": {
    yol: "/zip-olusturma",
    baslik: "ZIP Oluşturma (Dosya Sıkıştırma)",
    seoBaslik:
      "ZIP Oluşturma: Dosya ve Klasörleri ZIP Yap (Ücretsiz, Yüklemeden)",
    aciklama:
      "Dosyaları veya bütün bir klasörü tek ZIP dosyasında toplayın; Deflate sıkıştırma, Türkçe dosya adları, klasör yapısı korunur. Dosyalar sunucuya yüklenmez.",
    giris:
      "Birden çok dosyayı e-postayla göndermek veya bir sisteme tek dosya olarak yüklemek için ZIP yapın. Dosyaları ya da klasörü seçin, adını verin, indirin.",
    arac: <ZipOlustur />,
    sss: [
      {
        question: "ZIP dosyayı ne kadar küçültür?",
        answer:
          "Metin, Word, Excel ve CSV gibi dosyalar genellikle %50–90 küçülür. JPG, PNG, MP4 ve PDF gibi zaten sıkıştırılmış dosyalar neredeyse aynı kalır; bunları küçültmek için Fotoğraf Küçültme, Video Sıkıştırma veya PDF Sıkıştırma araçlarını kullanın.",
      },
      {
        question: "Klasör yapısı korunur mu?",
        answer:
          "Evet. 'Klasör seç' ile seçtiğiniz klasördeki alt klasörler ZIP içinde aynı yapıyla saklanır.",
      },
      {
        question: "Şifreli ZIP oluşturabilir miyim?",
        answer:
          "Şu an hayır. ZIP'in yaygın şifreleme yöntemi zayıftır; hassas belgeleri paylaşmak için dosyaları şifreli bir bulut klasöründe paylaşmanızı öneririz.",
      },
      GIZLILIK,
    ],
    bolumler: [
      {
        id: "turkce",
        baslik: "Türkçe dosya adları",
        icerik: (
          <p>
            Dosya adları UTF-8 olarak ve bunu bildiren işaretle yazılır; Windows
            10/11, macOS ve Android&apos;de &quot;Ödev_Çağla.docx&quot; gibi
            adlar bozulmadan açılır.
          </p>
        ),
      },
    ],
  },
  "rar-acma": {
    yol: "/rar-acma",
    baslik: "RAR Açma (Online RAR Çıkarma)",
    seoBaslik:
      "RAR Açma: Programsız RAR Dosyası Aç (Şifreli RAR Dahil, Online)",
    aciklama:
      "RAR dosyasını WinRAR kurmadan açın; şifreli RAR'ları şifreyle çıkarın, dosyaları tek tek veya ZIP olarak indirin. Telefonda da çalışır, dosya sunucuya yüklenmez.",
    giris:
      "WinRAR yüklü olmayan bir bilgisayarda veya telefonda RAR arşivinin içindekilere ulaşın. Arşivi seçin, istediğiniz dosyayı indirin.",
    arac: <ArsivAc />,
    sss: [
      {
        question: "Program kurmadan RAR dosyası nasıl açılır?",
        answer:
          "Bu sayfada arşivi seçin; içindeki dosyalar listelenir, ⬇ ile tek tek ya da 'ZIP olarak indir' ile hepsini birden kaydedebilirsiniz. WinRAR veya 7-Zip kurmanıza gerek yoktur; telefonda da çalışır.",
      },
      {
        question: "Şifreli arşivler açılır mı?",
        answer:
          "Evet. Arşiv şifreliyse şifre kutusu açılır; doğru şifreyi girdiğinizde dosyalar çıkarılır. Şifre bilinmiyorsa arşiv açılamaz.",
      },
      {
        question: "Hangi biçimler destekleniyor?",
        answer:
          "RAR (RAR4 ve RAR5), 7Z, ZIP, TAR, TAR.GZ/TGZ, GZ, BZ2, XZ, ISO, CAB ve daha fazlası. Çok parçalı arşivlerin yalnızca ilk parçası tek başına açılmaz; tüm parçaları birleştirilmiş tek dosya gerekir.",
      },
      {
        question: "Dosyalarım bir sunucuya yükleniyor mu?",
        answer:
          "Hayır. Arşiv tarayıcınızda açılır. Büyük arşivler (1 GB üstü) tarayıcı belleğini aşabilir; bu durumda masaüstü bir arşiv programı kullanın.",
      },
    ],
    bolumler: [
      {
        id: "ilgili",
        baslik: "İlgili araçlar",
        icerik: (
          <p>
            RAR arşivini herkesin açabileceği ZIP biçimine çevirmek için{" "}
            <Link href="/rar-zip-cevirme">RAR ZIP Çevirme</Link>, yeni bir arşiv
            hazırlamak için <Link href="/zip-olusturma">ZIP Oluşturma</Link>{" "}
            aracını kullanın.
          </p>
        ),
      },
    ],
  },
  "7z-acma": {
    yol: "/7z-acma",
    baslik: "7Z Açma (7-Zip Arşivi Açma)",
    seoBaslik: "7Z Açma: 7-Zip Dosyasını Programsız Aç (Online, Ücretsiz)",
    aciklama:
      "7Z arşivlerini 7-Zip kurmadan açın; şifreli 7Z desteği, TAR.GZ ve ISO dahil. Dosyaları tek tek veya ZIP olarak indirin; arşiv sunucuya yüklenmez.",
    giris:
      "7-Zip ile sıkıştırılmış .7z dosyalarını program kurmadan açın. Mac ve telefonlarda da çalışır.",
    arac: <ArsivAc />,
    sss: [
      {
        question: "Program kurmadan RAR dosyası nasıl açılır?",
        answer:
          "Bu sayfada arşivi seçin; içindeki dosyalar listelenir, ⬇ ile tek tek ya da 'ZIP olarak indir' ile hepsini birden kaydedebilirsiniz. WinRAR veya 7-Zip kurmanıza gerek yoktur; telefonda da çalışır.",
      },
      {
        question: "Şifreli arşivler açılır mı?",
        answer:
          "Evet. Arşiv şifreliyse şifre kutusu açılır; doğru şifreyi girdiğinizde dosyalar çıkarılır. Şifre bilinmiyorsa arşiv açılamaz.",
      },
      {
        question: "Hangi biçimler destekleniyor?",
        answer:
          "RAR (RAR4 ve RAR5), 7Z, ZIP, TAR, TAR.GZ/TGZ, GZ, BZ2, XZ, ISO, CAB ve daha fazlası. Çok parçalı arşivlerin yalnızca ilk parçası tek başına açılmaz; tüm parçaları birleştirilmiş tek dosya gerekir.",
      },
      {
        question: "Dosyalarım bir sunucuya yükleniyor mu?",
        answer:
          "Hayır. Arşiv tarayıcınızda açılır. Büyük arşivler (1 GB üstü) tarayıcı belleğini aşabilir; bu durumda masaüstü bir arşiv programı kullanın.",
      },
    ],
    bolumler: [
      {
        id: "7z-nedir",
        baslik: "7Z nedir?",
        icerik: (
          <p>
            7Z, açık kaynaklı 7-Zip programının LZMA/LZMA2 sıkıştırmasını
            kullanan arşiv biçimidir; çoğu zaman ZIP&apos;ten belirgin şekilde
            daha küçük dosya üretir. Windows&apos;un eski sürümleri ve
            telefonlar 7Z&apos;yi kendiliğinden açamaz.
          </p>
        ),
      },
    ],
  },
  "rar-zip-cevirme": {
    yol: "/rar-zip-cevirme",
    baslik: "RAR ZIP Çevirme",
    seoBaslik: "RAR ZIP Çevirme: RAR ve 7Z Arşivlerini ZIP'e Dönüştür (Online)",
    aciklama:
      "RAR, 7Z veya TAR.GZ arşivlerini her bilgisayarda açılan ZIP dosyasına çevirin; klasör yapısı korunur, şifreli arşivler desteklenir. Yüklemeden, ücretsiz.",
    giris:
      "RAR veya 7Z arşivini, Windows ve macOS'un kendiliğinden açabildiği ZIP biçimine çevirin; e-postayla veya başvuru sistemlerine yüklemek için idealdir.",
    arac: <ArsivAc zipOdakli />,
    sss: [
      {
        question: "Program kurmadan RAR dosyası nasıl açılır?",
        answer:
          "Bu sayfada arşivi seçin; içindeki dosyalar listelenir, ⬇ ile tek tek ya da 'ZIP olarak indir' ile hepsini birden kaydedebilirsiniz. WinRAR veya 7-Zip kurmanıza gerek yoktur; telefonda da çalışır.",
      },
      {
        question: "Şifreli arşivler açılır mı?",
        answer:
          "Evet. Arşiv şifreliyse şifre kutusu açılır; doğru şifreyi girdiğinizde dosyalar çıkarılır. Şifre bilinmiyorsa arşiv açılamaz.",
      },
      {
        question: "Hangi biçimler destekleniyor?",
        answer:
          "RAR (RAR4 ve RAR5), 7Z, ZIP, TAR, TAR.GZ/TGZ, GZ, BZ2, XZ, ISO, CAB ve daha fazlası. Çok parçalı arşivlerin yalnızca ilk parçası tek başına açılmaz; tüm parçaları birleştirilmiş tek dosya gerekir.",
      },
      {
        question: "Dosyalarım bir sunucuya yükleniyor mu?",
        answer:
          "Hayır. Arşiv tarayıcınızda açılır. Büyük arşivler (1 GB üstü) tarayıcı belleğini aşabilir; bu durumda masaüstü bir arşiv programı kullanın.",
      },
    ],
    bolumler: [
      {
        id: "neden",
        baslik: "Neden ZIP?",
        icerik: (
          <p>
            ZIP; Windows, macOS, Android ve iPhone&apos;da ek program gerekmeden
            açılır. Birçok okul, kamu ve iş başvuru sistemi de yalnızca ZIP
            kabul eder. Çevirme sırasında klasör yapısı ve dosya adları korunur.
          </p>
        ),
      },
    ],
  },
  "zip-acma": {
    yol: "/zip-acma",
    baslik: "ZIP Açma (Online ZIP Çıkarma)",
    seoBaslik: "ZIP Açma: Arşivi Programsız Aç, Dosyaları İndir (Online)",
    aciklama:
      "ZIP dosyasını program kurmadan açın; içindekileri listeleyin, resim ve metinleri önizleyin, tek tek indirin. Türkçe adlı eski ZIP'ler doğru görünür; yüklemeden.",
    giris:
      "Telefonda veya program kuramadığınız bir bilgisayarda ZIP dosyasının içini görün, istediğiniz dosyayı indirin.",
    arac: <ZipAc />,
    sss: [
      {
        question: "Telefonda ZIP nasıl açılır?",
        answer:
          "Bu sayfada ZIP dosyasını seçin; içindeki dosyalar listelenir, ⬇ düğmesiyle istediğinizi telefonunuza kaydedebilirsiniz. Uygulama kurmanız gerekmez.",
      },
      {
        question: "Dosya adlarındaki Türkçe karakterler neden bozuk çıkar?",
        answer:
          "Eski Windows programları ZIP içindeki adları Türkçe DOS kodlamasıyla (CP857) yazar ve bazı açıcılar bunu tanımaz. Araç bu kodlamayı algılayıp ğ, ş, İ harflerini doğru gösterir.",
      },
      {
        question: "RAR ve 7Z dosyaları açılır mı?",
        answer: "Şu an yalnızca ZIP desteklenir. Şifreli ZIP'ler de açılamaz.",
      },
      GIZLILIK,
    ],
    bolumler: [
      {
        id: "ilgili",
        baslik: "İlgili araçlar",
        icerik: (
          <p>
            Dosyaları yeniden paketlemek için{" "}
            <Link href="/zip-olusturma">ZIP Oluşturma</Link>, içindeki Excel
            dosyasını CSV yapmak için{" "}
            <Link href="/excel-csv-cevirme">Excel CSV Çevirme</Link> aracını
            kullanın.
          </p>
        ),
      },
    ],
  },
};

export const veriMeta = (anahtar: string) => {
  const s = VERI_SAYFALARI[anahtar];
  return takvimMetadata(s.yol, {
    title: s.seoBaslik,
    short: s.baslik,
    description: s.aciklama,
  });
};

export function VeriSayfasi({ anahtar }: { anahtar: string }) {
  const s = VERI_SAYFALARI[anahtar];
  return (
    <AracSayfasi
      yol={s.yol}
      baslik={s.baslik}
      giris={s.giris}
      arac={s.arac}
      sss={s.sss}
      bolumler={s.bolumler}
      baglantilar={BAGLANTILAR}
    />
  );
}
