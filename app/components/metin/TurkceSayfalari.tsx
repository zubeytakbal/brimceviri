import Link from "@/app/components/SiteLink";
import type { ReactNode } from "react";
import type { FaqItem } from "../../converter/faqSchema";
import { METIN_ARACLARI_YOLU } from "../../converter/metin/metinAraclari";
import AracSayfasi from "../gorsel/AracSayfasi";
import { takvimMetadata } from "../takvim/takvimMeta";
import HarfDonustur from "./HarfDonustur";
import HeceAyir from "./HeceAyir";
import KarakterDuzelt from "./KarakterDuzelt";
import NumaraDogrula from "./NumaraDogrula";
import SayiYazi from "./SayiYazi";

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
  { href: METIN_ARACLARI_YOLU, label: "Tüm Metin Araçları" },
  { href: "/turkce-karakter-duzeltme", label: "Türkçe Karakter Düzeltme" },
  {
    href: "/buyuk-kucuk-harf-donusturme",
    label: "Büyük Küçük Harf Dönüştürme",
  },
  { href: "/sayiyi-yaziya-cevirme", label: "Sayıyı Yazıya Çevirme" },
  { href: "/hece-ayirma", label: "Hece Ayırma" },
  { href: "/iban-dogrulama", label: "IBAN Doğrulama" },
  { href: "/tc-kimlik-no-dogrulama", label: "TC Kimlik No Doğrulama" },
  { href: "/metin-karsilastirma", label: "Metin Karşılaştırma" },
];

const GIZLILIK: FaqItem = {
  question: "Yazdığım metin bir yere gönderiliyor mu?",
  answer:
    "Hayır. İşlem tamamen tarayıcınızda yapılır; metniniz veya numaralarınız hiçbir sunucuya gönderilmez ve kaydedilmez.",
};

const DOGRULAMA_GIZLILIK: FaqItem = {
  question: "Girdiğim numaralar kaydediliyor mu?",
  answer:
    "Hayır. Kontrol tarayıcınızda matematiksel olarak yapılır; numaralar hiçbir sunucuya gönderilmez, hiçbir veritabanında sorgulanmaz ve kaydedilmez.",
};

export const TURKCE_SAYFALARI: Record<string, Sayfa> = {
  "turkce-karakter-duzeltme": {
    yol: "/turkce-karakter-duzeltme",
    baslik: "Türkçe Karakter Düzeltme",
    seoBaslik: "Türkçe Karakter Düzeltme: turkce → Türkçe (Online Çevirici)",
    aciklama:
      "Türkçe karaktersiz yazılmış metni (turkce, cok, guzel) otomatik olarak doğru Türkçe karakterlere (Türkçe, çok, güzel) çevirin. Düzeltilen harfler işaretlenir.",
    giris:
      "Türkçe klavye olmadan yazılmış metni yapıştırın; ç, ğ, ı, ö, ş, ü harfleri bağlama bakılarak otomatik yerine konur.",
    arac: <KarakterDuzelt />,
    sss: [
      {
        question: "Türkçe karakter düzeltme nasıl çalışır?",
        answer:
          "Her harfin çevresindeki harflere bakılarak o harfin Türkçe karşılığının (c/ç, g/ğ, i/ı, o/ö, s/ş, u/ü) hangisi olduğu tahmin edilir. Yöntem, Prof. Dr. Deniz Yüret'in geliştirdiği ve milyonlarca Türkçe kelimeden öğrenilmiş örüntülere dayanan açık kaynaklı bir yöntemdir.",
      },
      {
        question: "Düzeltme her zaman doğru mu?",
        answer:
          "Günlük metinlerde çok büyük oranda doğrudur, ancak özel adlarda, kısaltmalarda ve iki anlamlı kelimelerde (ör. 'sık/şık', 'kar/kâr') yanılabilir. Düzeltilen harfler sarı ile işaretlendiği için kopyalamadan önce hızlıca kontrol edebilirsiniz.",
      },
      {
        question:
          "Telefonda Türkçe karakter olmadan yazdım, uzun metni düzeltebilir miyim?",
        answer:
          "Evet. Uzunluk sınırı yoktur; e-posta, ödev, dilekçe veya mesaj metnini tamamen yapıştırabilirsiniz.",
      },
      GIZLILIK,
    ],
    bolumler: [
      {
        id: "nerede",
        baslik: "Nerelerde işe yarar?",
        icerik: (
          <ul>
            <li>
              Yabancı klavyeyle veya Türkçe karakter olmadan yazılmış e-posta ve
              mesajlar
            </li>
            <li>
              Eski sistemlerden alınan, Türkçe karakterleri silinmiş listeler ve
              adresler
            </li>
            <li>SMS&apos;le gelen ya da telefonda hızlı yazılmış notlar</li>
          </ul>
        ),
      },
      {
        id: "ters",
        baslik: "Tersini yapmak: Türkçe karakterleri kaldırma",
        icerik: (
          <p>
            Dosya adı, web adresi veya Türkçe karakteri kabul etmeyen formlar
            için{" "}
            <Link href="/turkce-karakter-kaldirma">
              Türkçe Karakter Kaldırma
            </Link>{" "}
            aracını kullanın. Harflerin büyük ya da küçük yazılması için{" "}
            <Link href="/buyuk-kucuk-harf-donusturme">
              Büyük Küçük Harf Dönüştürme
            </Link>
            .
          </p>
        ),
      },
    ],
  },
  "turkce-karakter-kaldirma": {
    yol: "/turkce-karakter-kaldirma",
    baslik: "Türkçe Karakter Kaldırma",
    seoBaslik:
      "Türkçe Karakter Kaldırma: ç ğ ı ö ş ü → c g i o s u (ve URL Yapma)",
    aciklama:
      "Metindeki Türkçe karakterleri İngilizce karşılıklarına çevirin (ç→c, ğ→g, ı→i, ö→o, ş→s, ü→u); dosya adı ve web adresi (slug) için uygun hâle getirin.",
    giris:
      "Türkçe karakter kabul etmeyen formlar, dosya adları, e-posta adresleri ve web adresleri için metni sadeleştirin.",
    arac: <KarakterDuzelt odak="kaldir" />,
    sss: [
      {
        question: "Hangi harfler değiştirilir?",
        answer:
          "ç→c, ğ→g, ı→i, İ→I, ö→o, ş→s, ü→u ve büyük hâlleri; ayrıca şapkalı â, î, û harfleri a, i, u olur. Diğer harfler, rakamlar ve noktalama işaretleri olduğu gibi kalır.",
      },
      {
        question: "Web adresi (URL) seçeneği ne yapar?",
        answer:
          'Metni küçük harfe çevirir, Türkçe karakterleri kaldırır, kesme işaretlerini siler ve boşlukları tire yapar: "Şişli\'de Kira Artışı 2026" → "sislide-kira-artisi-2026". Blog yazısı ve ürün sayfası adresleri için kullanılır.',
      },
      {
        question: "Pasaport ve banka formlarında adımı nasıl yazmalıyım?",
        answer:
          "Resmî belgede adınız nasıl yazıyorsa öyle yazın. Form Türkçe karakter kabul etmiyorsa bu araçtaki karşılıkları kullanabilirsiniz; ancak bazı kurumların farklı kuralı olabilir (ör. Ü için UE), formun açıklamasını kontrol edin.",
      },
      GIZLILIK,
    ],
    bolumler: [
      {
        id: "tablo",
        baslik: "Türkçe karakterlerin karşılıkları",
        icerik: (
          <div className="port-tablo">
            <table>
              <thead>
                <tr>
                  <th>Türkçe</th>
                  <th>Karşılığı</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Ç ç", "C c"],
                  ["Ğ ğ", "G g"],
                  ["I ı", "I i"],
                  ["İ i", "I i"],
                  ["Ö ö", "O o"],
                  ["Ş ş", "S s"],
                  ["Ü ü", "U u"],
                ].map(([a, b]) => (
                  <tr key={a}>
                    <td>{a}</td>
                    <td>{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
      },
      {
        id: "ters",
        baslik: "Tersini yapmak",
        icerik: (
          <p>
            Türkçe karaktersiz yazılmış bir metni düzeltmek için{" "}
            <Link href="/turkce-karakter-duzeltme">
              Türkçe Karakter Düzeltme
            </Link>{" "}
            aracını kullanın.
          </p>
        ),
      },
    ],
  },
  "buyuk-kucuk-harf-donusturme": {
    yol: "/buyuk-kucuk-harf-donusturme",
    baslik: "Büyük Küçük Harf Dönüştürme",
    seoBaslik: "Büyük Küçük Harf Dönüştürme: Türkçe İ/ı Doğru (Online)",
    aciklama:
      "Metni BÜYÜK HARF, küçük harf, Her Kelimenin İlk Harfi Büyük ve cümle düzenine çevirin. Türkçe İ, ı, i, I harfleri doğru dönüşür; karakter ve kelime sayısı.",
    giris:
      'Metni yapıştırın ve dönüşümü seçin. Word ve birçok programın yaptığı "i → I" hatası burada olmaz: istanbul → İSTANBUL.',
    arac: <HarfDonustur />,
    sss: [
      {
        question:
          "Neden bazı programlarda 'istanbul' büyütülünce 'ISTANBUL' oluyor?",
        answer:
          "İngilizce kuralında i'nin büyüğü I'dır. Türkçede ise i → İ ve ı → I'dır. Dil ayarı Türkçe olmayan programlar bu yüzden 'ISTANBUL' ve 'ıstanbul' gibi hatalı sonuç verir. Bu araç varsayılan olarak Türkçe kuralını kullanır.",
      },
      {
        question: "Her Kelime Büyük seçeneğinde bağlaçlar da büyük mü olur?",
        answer:
          "Evet; bu seçenek her kelimenin ilk harfini büyütür. Başlıklarda 've, ile, ya da' gibi bağlaçların küçük kalmasını istiyorsanız sonucu düzenlemeniz gerekir. Kesme işaretinden sonraki ekler küçük kalır: Ankara'da.",
      },
      {
        question:
          "Kod veya İngilizce metin için İngilizce kuralını kullanabilir miyim?",
        answer:
          "Evet. 'Türkçe kuralı' kutusunu kapatınca i ↔ I dönüşümü uygulanır; değişken adları ve İngilizce metinler için uygundur.",
      },
      GIZLILIK,
    ],
    bolumler: [
      {
        id: "kurallar",
        baslik: "Türkçede büyük harf kuralları (özet)",
        icerik: (
          <ul>
            <li>Cümleler büyük harfle başlar.</li>
            <li>Özel adlar (kişi, yer, kurum adları) büyük harfle başlar.</li>
            <li>
              Özel adlara getirilen ekler kesme işaretiyle ayrılır ve küçük
              yazılır: İzmir&apos;e, Ayşe&apos;nin.
            </li>
            <li>
              Tamamı büyük yazılan metinde de İ ve I ayrımı korunur: İZMİR,
              ILGAZ.
            </li>
          </ul>
        ),
      },
      {
        id: "ilgili",
        baslik: "İlgili araçlar",
        icerik: (
          <p>
            Türkçe karaktersiz metni düzeltmek için{" "}
            <Link href="/turkce-karakter-duzeltme">
              Türkçe Karakter Düzeltme
            </Link>
            , iki metni karşılaştırmak için{" "}
            <Link href="/metin-karsilastirma">Metin Karşılaştırma</Link>.
          </p>
        ),
      },
    ],
  },
  "sayiyi-yaziya-cevirme": {
    yol: "/sayiyi-yaziya-cevirme",
    baslik: "Sayıyı Yazıya Çevirme",
    seoBaslik: "Sayıyı Yazıya Çevirme: Çek, Senet ve Fatura İçin (TL, Kuruş)",
    aciklama:
      "Sayıyı ve para tutarını Türkçe yazıya çevirin: 1.250,50 → bin iki yüz elli Türk lirası elli kuruş. Çek ve senet için bitişik yazım, büyük harf seçeneği.",
    giris:
      'Tutarı yazın; yazıyla karşılığı anında çıkar. Çek, senet, fatura ve sözleşmelerde "yalnız … TL" satırı için kopyalayın.',
    arac: <SayiYazi />,
    sss: [
      {
        question: "Çeke tutar yazıyla nasıl yazılır?",
        answer:
          "Uygulamada tutar bitişik ve baş harfleri büyük yazılır, başına ve sonuna # işareti konur: #BinİkiYüzElliTL#. Bu, sonradan kelime eklenmesini zorlaştırır. Araçtaki 'Bitişik yaz' seçeneğini ve 'TL / Kr' birimini kullanın.",
      },
      {
        question: "1000 'bir bin' mi yazılır, 'bin' mi?",
        answer:
          "Türkçede 'bin' yazılır: 1.000 = bin, 1.100 = bin yüz. Ancak milyon ve üstünde 'bir' söylenir: 1.000.000 = bir milyon.",
      },
      {
        question: "Kuruşlu tutarlar nasıl yazılır?",
        answer:
          "Lira ve kuruş ayrı söylenir: 15,75 TL = on beş Türk lirası yetmiş beş kuruş. Virgülden sonra tek hane yazarsanız (15,5) elli kuruş olarak kabul edilir; iki haneden fazlası kuruşa yuvarlanır.",
      },
      {
        question: "Hangi büyüklüğe kadar çevirir?",
        answer:
          "Kentilyona (10^21) kadar olan tam sayılar yazıya çevrilir. Binlik ayırıcı olarak nokta, ondalık ayırıcı olarak virgül kullanın; 1234.50 gibi İngilizce yazım da tanınır.",
      },
    ],
    bolumler: [
      {
        id: "yazim",
        baslik: "Sayıların yazımında dikkat edilecekler",
        icerik: (
          <ul>
            <li>
              Sayılar ayrı yazılır: on beş, yüz yirmi üç (çek ve senette bitişik
              yazım bir güvenlik uygulamasıdır).
            </li>
            <li>
              Binlik gruplar nokta, ondalık kısım virgülle ayrılır: 1.250,50.
            </li>
            <li>
              Para birimi kısaltması TL, kuruş kısaltması Kr veya kr olarak
              yazılır.
            </li>
          </ul>
        ),
      },
      {
        id: "ilgili",
        baslik: "İlgili araçlar",
        icerik: (
          <p>
            KDV dahil tutar için{" "}
            <Link href="/kdv-hesaplama">KDV Hesaplama</Link>, fatura kontrolü
            için <Link href="/e-fatura-goruntuleme">e-Fatura Görüntüleme</Link>{" "}
            ve IBAN kontrolü için{" "}
            <Link href="/iban-dogrulama">IBAN Doğrulama</Link>.
          </p>
        ),
      },
    ],
  },
  "hece-ayirma": {
    yol: "/hece-ayirma",
    baslik: "Hece Ayırma",
    seoBaslik: "Hece Ayırma ve Hece Sayısı Bulma (Hece Ölçüsü Hesaplama)",
    aciklama:
      "Türkçe kelimeleri hecelerine ayırın (kar-deş-lik), şiirde her dizenin hece sayısını bulun ve hece ölçüsünü görün. Öğrenciler ve öğretmenler için.",
    giris:
      "Kelimeyi, cümleyi veya şiiri yazın; heceler tireyle ayrılır ve her dizenin hece sayısı gösterilir.",
    arac: <HeceAyir />,
    sss: [
      {
        question: "Türkçede heceleme kuralı nedir?",
        answer:
          "Her hecede yalnızca bir ünlü bulunur. İki ünlü arasındaki tek ünsüz sonraki heceye geçer (o-kul), iki ünsüz yan yana gelirse ayrılır (el-ma, kar-deş). Türkçe kökenli kelimeler ünsüz öbeğiyle başlamaz; tren, spor gibi yabancı kökenli kelimelerde baştaki ünsüzler bir arada kalır.",
      },
      {
        question: "Hece ölçüsü nedir, nasıl bulunur?",
        answer:
          "Hece ölçüsü, şiirde dizelerin hece sayısının eşit olmasına dayanan ölçüdür. Her dizedeki heceler sayılır; tüm dizeler aynı sayıdaysa şiir o ölçüdedir (ör. 7'li, 8'li, 11'li). Halk şiirinde en yaygın ölçüler 7'li, 8'li ve 11'lidir. Şiiri her dize ayrı satırda olacak şekilde yapıştırın.",
      },
      {
        question: "Satır sonunda kelime nasıl bölünür?",
        answer:
          "Satır sonunda kelimeler hece sınırından bölünür ve satır sonuna kısa çizgi konur. Tek harfli heceler satır başında veya sonunda bırakılmaz.",
      },
      GIZLILIK,
    ],
    bolumler: [
      {
        id: "ornekler",
        baslik: "Heceleme örnekleri",
        icerik: (
          <ul>
            <li>okul → o-kul</li>
            <li>kardeşlik → kar-deş-lik</li>
            <li>saat → sa-at</li>
            <li>Türkçe → Türk-çe</li>
            <li>İstanbul → İs-tan-bul</li>
          </ul>
        ),
      },
      {
        id: "ilgili",
        baslik: "İlgili araçlar",
        icerik: (
          <p>
            Yazım için{" "}
            <Link href="/buyuk-kucuk-harf-donusturme">
              Büyük Küçük Harf Dönüştürme
            </Link>{" "}
            ve{" "}
            <Link href="/turkce-karakter-duzeltme">
              Türkçe Karakter Düzeltme
            </Link>
            ; not ortalaması için{" "}
            <Link href="/harf-notu-hesaplama">Harf Notu Hesaplama</Link>.
          </p>
        ),
      },
    ],
  },
  "tc-kimlik-no-dogrulama": {
    yol: "/tc-kimlik-no-dogrulama",
    baslik: "TC Kimlik No Doğrulama",
    seoBaslik: "TC Kimlik No Doğrulama: Numara Geçerli mi? (Algoritma, Toplu)",
    aciklama:
      "TC kimlik numarasının kurallara uygun (geçerli) olup olmadığını kontrol hanesi algoritmasıyla doğrulayın; Excel listelerini toplu kontrol edin. Numara kaydedilmez.",
    giris:
      "Numarayı yazın veya bir listeyi yapıştırın; yazım hatası olan numaralar hemen görünür.",
    arac: <NumaraDogrula tur="tckn" />,
    sss: [
      {
        question: "TC kimlik numarası nasıl doğrulanır?",
        answer:
          "Numara 11 hanedir ve ilk hanesi 0 olamaz. 1, 3, 5, 7, 9. hanelerin toplamının 7 katından 2, 4, 6, 8. hanelerin toplamı çıkarılır; sonucun 10'a bölümünden kalan 10. haneyi verir. İlk 10 hanenin toplamının 10'a bölümünden kalan da 11. hanedir.",
      },
      {
        question:
          "Geçerli çıkması numaranın gerçek bir kişiye ait olduğunu gösterir mi?",
        answer:
          "Hayır. Araç yalnızca numaranın yazım kurallarına uygun olup olmadığını, yani yanlış yazılıp yazılmadığını kontrol eder. Kişinin kimliğini doğrulamak için resmî kurumların sorgulama hizmetleri kullanılmalıdır.",
      },
      {
        question: "Toplu kontrol nasıl yapılır?",
        answer:
          "'Toplu kontrol' sekmesine geçin ve Excel'deki TC kimlik no sütununu kopyalayıp yapıştırın. Her satırın sonucu ve hatalı olanların nedeni tabloda gösterilir.",
      },
      DOGRULAMA_GIZLILIK,
    ],
    bolumler: [
      {
        id: "neden",
        baslik: "Nerelerde kullanılır?",
        icerik: (
          <ul>
            <li>
              Personel, öğrenci veya müşteri listelerinde yazım hatalarını
              bulmak
            </li>
            <li>
              Form ve yazılımlarda girilen numaranın biçimini kontrol etmek
            </li>
            <li>Fatura ve bordro öncesi veri temizliği</li>
          </ul>
        ),
      },
      {
        id: "ilgili",
        baslik: "İlgili doğrulama araçları",
        icerik: (
          <p>
            Şirketler için{" "}
            <Link href="/vergi-no-dogrulama">Vergi No Doğrulama</Link>, banka
            hesapları için <Link href="/iban-dogrulama">IBAN Doğrulama</Link>.
          </p>
        ),
      },
    ],
  },
  "vergi-no-dogrulama": {
    yol: "/vergi-no-dogrulama",
    baslik: "Vergi No Doğrulama",
    seoBaslik: "Vergi No Doğrulama: VKN Geçerli mi? (10 Haneli, Toplu Kontrol)",
    aciklama:
      "10 haneli vergi kimlik numarasının (VKN) kontrol hanesini doğrulayın; cari ve tedarikçi listelerini toplu kontrol edin. Tarayıcıda çalışır, numara kaydedilmez.",
    giris:
      "Vergi numarasını yazın veya bir listeyi yapıştırın; hatalı yazılmış numaralar hemen görünür.",
    arac: <NumaraDogrula tur="vkn" />,
    sss: [
      {
        question: "Vergi kimlik numarası kaç hanedir?",
        answer:
          "Şirketlerin ve kurumların vergi kimlik numarası 10 hanedir; son hane, ilk 9 haneden hesaplanan kontrol hanesidir. Gerçek kişilerde vergi numarası yerine 11 haneli TC kimlik numarası kullanılır.",
      },
      {
        question: "Geçerli çıkan numara mükellefin var olduğunu gösterir mi?",
        answer:
          "Hayır. Araç yalnızca numaranın doğru yazılıp yazılmadığını kontrol hanesiyle denetler. Mükellefin kaydını ve unvanını sorgulamak için Gelir İdaresi Başkanlığı'nın resmî hizmetlerini kullanın.",
      },
      {
        question: "e-Fatura keserken neden vergi numarası kontrol edilmeli?",
        answer:
          "Yanlış yazılmış vergi numarası faturanın reddedilmesine veya yanlış mükellefe gitmesine yol açabilir. Cari listesini toplu kontrol ederek yazım hatalarını önceden bulabilirsiniz.",
      },
      DOGRULAMA_GIZLILIK,
    ],
    bolumler: [
      {
        id: "ilgili",
        baslik: "İlgili araçlar",
        icerik: (
          <p>
            Gelen faturaları okumak ve Excel&apos;e aktarmak için{" "}
            <Link href="/e-fatura-excel-aktarma">
              e-Fatura Excel&apos;e Aktarma
            </Link>
            ; şahıs numaraları için{" "}
            <Link href="/tc-kimlik-no-dogrulama">TC Kimlik No Doğrulama</Link>.
          </p>
        ),
      },
    ],
  },
  "iban-dogrulama": {
    yol: "/iban-dogrulama",
    baslik: "IBAN Doğrulama",
    seoBaslik: "IBAN Doğrulama: IBAN Geçerli mi? (Kontrol, Banka Kodu, Toplu)",
    aciklama:
      "IBAN'da yazım hatası olup olmadığını uluslararası kontrol numarasıyla (mod 97) doğrulayın; TR IBAN'ında banka kodu ve hesap numarasını görün, listeleri toplu kontrol edin.",
    giris:
      "Para göndermeden önce IBAN'ı kontrol edin: tek bir hane bile yanlışsa hemen görünür.",
    arac: <NumaraDogrula tur="iban" />,
    sss: [
      {
        question: "IBAN doğrulama neyi kontrol eder?",
        answer:
          "IBAN'ın 3. ve 4. karakterleri, tüm numaradan hesaplanan kontrol numarasıdır (ISO 13616, mod 97). Bir hane yanlış yazılırsa veya iki hanenin yeri değişirse kontrol tutmaz. Araç ayrıca ülkeye göre uzunluğu denetler: Türkiye IBAN'ı 26 karakterdir.",
      },
      {
        question: "TR IBAN'ı nasıl okunur?",
        answer:
          "TR + 2 hane kontrol numarası + 5 hane banka kodu + 1 hane rezerv alan (0) + 16 hane hesap numarası. Örneğin TR33 0006 1…: 00061 banka kodudur.",
      },
      {
        question: "Geçerli çıkan IBAN'a para göndermek güvenli mi?",
        answer:
          "Araç yalnızca yazım hatası olmadığını gösterir; hesabın açık olduğunu veya kime ait olduğunu göstermez. Para göndermeden önce bankanızın alıcı adı kontrolünü mutlaka yapın.",
      },
      DOGRULAMA_GIZLILIK,
    ],
    bolumler: [
      {
        id: "yapi",
        baslik: "Türkiye IBAN yapısı",
        icerik: (
          <div className="port-tablo">
            <table>
              <thead>
                <tr>
                  <th>Karakter</th>
                  <th>Anlamı</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1–2</td>
                  <td>Ülke kodu (TR)</td>
                </tr>
                <tr>
                  <td>3–4</td>
                  <td>Kontrol numarası</td>
                </tr>
                <tr>
                  <td>5–9</td>
                  <td>Banka kodu</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>Rezerv alan (0)</td>
                </tr>
                <tr>
                  <td>11–26</td>
                  <td>Hesap numarası</td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
      },
      {
        id: "ilgili",
        baslik: "İlgili araçlar",
        icerik: (
          <p>
            Tutarı yazıyla yazmak için{" "}
            <Link href="/sayiyi-yaziya-cevirme">Sayıyı Yazıya Çevirme</Link>,
            vergi numarası için{" "}
            <Link href="/vergi-no-dogrulama">Vergi No Doğrulama</Link>.
          </p>
        ),
      },
    ],
  },
};

export const turkceMeta = (anahtar: string) => {
  const s = TURKCE_SAYFALARI[anahtar];
  return takvimMetadata(s.yol, {
    title: s.seoBaslik,
    short: s.baslik,
    description: s.aciklama,
  });
};

export function TurkceSayfasi({ anahtar }: { anahtar: string }) {
  const s = TURKCE_SAYFALARI[anahtar];
  return (
    <AracSayfasi
      koleksiyon="metin"
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
