import Link from "@/app/components/SiteLink";
import type { ReactNode } from "react";
import { ipv4Hesapla } from "../../converter/ag/ip";
import { AG_ARACLARI_YOLU } from "../../converter/ag/agAraclari";
import type { FaqItem } from "../../converter/faqSchema";
import AracSayfasi from "../gorsel/AracSayfasi";
import { takvimMetadata } from "../takvim/takvimMeta";
import HashHesap from "./HashHesap";
import IndirmeSuresi from "./IndirmeSuresi";
import IpDonustur from "./IpDonustur";
import MacAraci from "./MacAraci";
import PortListesi from "./PortListesi";
import SubnetHesap from "./SubnetHesap";
import TarayiciBilgisi from "./TarayiciBilgisi";

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
  { href: AG_ARACLARI_YOLU, label: "Tüm Ağ Araçları" },
  { href: "/subnet-hesaplama", label: "Subnet Hesaplama" },
  { href: "/ip-adresi-donusturucu", label: "IP Adresi Dönüştürücü" },
  { href: "/indirme-suresi-hesaplama", label: "İndirme Süresi Hesaplama" },
  { href: "/hash-hesaplama", label: "Hash Hesaplama" },
  { href: "/port-numaralari", label: "Port Numaraları" },
  { href: "/tarayici-bilgisi", label: "Tarayıcı Bilgim" },
  { href: "/sifre-olusturucu", label: "Şifre Oluşturucu" },
];

const GIZLILIK: FaqItem = {
  question: "Yazdığım bilgiler bir yere gönderiliyor mu?",
  answer:
    "Hayır. Hesaplama tamamen tarayıcınızda yapılır; adresler, metinler ve dosyalar hiçbir sunucuya gönderilmez. Sayfa yüklendikten sonra internet bağlantısı olmadan da çalışır.",
};

/** /8 ile /32 arası maske tablosu (sayfada statik içerik olarak). */
function MaskeTablosu() {
  const satirlar = Array.from({ length: 25 }, (_, i) => ipv4Hesapla(0, 8 + i));
  return (
    <div className="port-tablo">
      <table>
        <thead>
          <tr>
            <th>CIDR</th>
            <th>Alt ağ maskesi</th>
            <th>Wildcard</th>
            <th>Toplam adres</th>
            <th>Kullanılabilir host</th>
          </tr>
        </thead>
        <tbody>
          {satirlar.map((r) => (
            <tr key={r.onek}>
              <td>
                <b>/{r.onek}</b>
              </td>
              <td>{r.maske}</td>
              <td>{r.wildcard}</td>
              <td>{r.toplam.toLocaleString("tr-TR")}</td>
              <td>{r.kullanilabilir.toLocaleString("tr-TR")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const OZEL_ARALIKLAR = (
  <ul>
    <li>
      <b>10.0.0.0/8</b>, <b>172.16.0.0/12</b>, <b>192.168.0.0/16</b>: Özel ağlar
      (RFC 1918). Ev ve ofis ağları bu aralıkları kullanır; internette
      yönlendirilmez.
    </li>
    <li>
      <b>100.64.0.0/10</b>: Operatör NAT&apos;ı (CGNAT). Modeminizin WAN adresi
      bu aralıktaysa internete doğrudan açık bir IP&apos;niz yoktur ve port
      yönlendirme dışarıdan çalışmaz.
    </li>
    <li>
      <b>169.254.0.0/16</b>: Cihaz DHCP&apos;den adres alamayınca kendine
      verdiği adres (APIPA). Genellikle bağlantı sorunu belirtisidir.
    </li>
    <li>
      <b>127.0.0.0/8</b>: Cihazın kendisi (localhost).
    </li>
  </ul>
);

const HASH_NASIL = (
  <ul>
    <li>
      <b>Windows (PowerShell):</b> <code>Get-FileHash dosya.iso</code>{" "}
      (varsayılan SHA-256) veya <code>certutil -hashfile dosya.iso MD5</code>
    </li>
    <li>
      <b>macOS:</b> <code>shasum -a 256 dosya.iso</code> veya{" "}
      <code>md5 dosya.iso</code>
    </li>
    <li>
      <b>Linux:</b> <code>sha256sum dosya.iso</code> veya{" "}
      <code>md5sum dosya.iso</code>
    </li>
  </ul>
);

const HASH_SSS: FaqItem[] = [
  {
    question: "Hash (özet) nedir?",
    answer:
      "Hash, bir dosyanın veya metnin içeriğinden hesaplanan sabit uzunlukta bir 'parmak izi'dir. İçerikte tek bir bayt bile değişirse özet tamamen değişir. Bu yüzden indirilen dosyanın eksiksiz ve değiştirilmemiş olduğunu anlamak için kullanılır.",
  },
  {
    question: "Checksum doğrulaması nasıl yapılır?",
    answer:
      "Dosyayı seçin, yayıncının sitesinde yazan checksum değerini 'Beklenen değer' kutusuna yapıştırın. Değerler eşleşirse dosya sağlamdır; eşleşmezse indirme yarıda kalmış, bozulmuş ya da dosya değiştirilmiş olabilir.",
  },
  {
    question: "MD5 ve SHA-1 güvenli mi?",
    answer:
      "Kazara bozulmayı yakalamak için hâlâ işe yarar, ancak kasıtlı değiştirmeye karşı güvenli değildir: ikisi için de aynı özete sahip farklı dosyalar üretilebildiği gösterilmiştir. Güvenlik gereken yerlerde SHA-256 veya SHA-512 kullanın.",
  },
  GIZLILIK,
];

export const AG_SAYFALARI: Record<string, Sayfa> = {
  "subnet-hesaplama": {
    yol: "/subnet-hesaplama",
    baslik: "Subnet Hesaplama",
    seoBaslik: "Subnet Hesaplama: IP Alt Ağ, CIDR ve Maske Hesaplayıcı",
    aciklama:
      "IP adresi ve CIDR'den ağ adresi, yayın adresi, kullanılabilir IP aralığı, alt ağ maskesi ve host sayısını bulun; ağı alt ağlara bölün. IPv4 ve IPv6.",
    giris:
      "IP adresini ve önek uzunluğunu (ör. /24) ya da maskeyi yazın; ağın tüm bilgileri anında hesaplanır.",
    arac: <SubnetHesap />,
    sss: [
      {
        question: "Subnet (alt ağ) maskesi nedir?",
        answer:
          "Maske, bir IP adresinin hangi kısmının ağı, hangi kısmının cihazı gösterdiğini belirler. 255.255.255.0 (/24) maskesinde ilk üç bölüm ağı, son bölüm cihazı gösterir; bu ağda 254 cihaz adres alabilir.",
      },
      {
        question: "CIDR gösterimi (/24, /16) ne anlama gelir?",
        answer:
          "Eğik çizgiden sonraki sayı, maskede baştan kaç bitin 1 olduğunu gösterir. /24 = 24 bit ağ = 255.255.255.0. Sayı büyüdükçe ağ küçülür: /25 yarısı, /26 dörtte biri kadardır.",
      },
      {
        question: "Kullanılabilir host sayısı neden 2 eksik?",
        answer:
          "Her alt ağın ilk adresi ağın kendisini, son adresi yayın (broadcast) adresini gösterir; bunlar cihazlara verilmez. /24'te 256 adresin 254'ü kullanılabilir. İstisna: noktadan noktaya bağlantılarda /31'in iki adresi de kullanılır (RFC 3021), /32 tek bir cihazı gösterir.",
      },
      {
        question: "Kaç cihaz için hangi maskeyi seçmeliyim?",
        answer:
          "Aracın altındaki 'Kaç cihaz gerekiyor?' kutusuna sayıyı yazın; en küçük uygun maske gösterilir. Örneğin 50 cihaz için /26 (62 host), 100 cihaz için /25 (126 host) yeterlidir. Büyüme payı bırakmak iyi olur.",
      },
      {
        question: "Wildcard maske nedir?",
        answer:
          "Maskenin bit bit tersidir (255.255.255.0 → 0.0.0.255). Cisco erişim listeleri (ACL) ve OSPF ayarlarında kullanılır.",
      },
      GIZLILIK,
    ],
    bolumler: [
      {
        id: "tablo",
        baslik: "CIDR ve alt ağ maskesi tablosu",
        icerik: (
          <>
            <p>
              En sık kullanılan önek uzunlukları, maskeleri ve her birinde
              kullanılabilen adres sayısı:
            </p>
            <MaskeTablosu />
          </>
        ),
      },
      {
        id: "ozel",
        baslik: "Özel ve ayrılmış IP aralıkları",
        icerik: OZEL_ARALIKLAR,
      },
      {
        id: "ornek",
        baslik: "Örnek: 192.168.1.0/24 ağını 4'e bölmek",
        icerik: (
          <p>
            /24 ağı /26&apos;lara bölündüğünde her biri 64 adreslik 4 alt ağ
            çıkar: 192.168.1.0, .64, .128 ve .192. Her birinde 62 cihaz adres
            alabilir. Araçta &quot;Bu ağı alt ağlara böl&quot; menüsünden /26
            seçerek tüm aralıkları görebilirsiniz. IPv6 için{" "}
            <Link href="/ipv6-subnet-hesaplama">IPv6 Subnet Hesaplama</Link>{" "}
            sayfasını kullanın.
          </p>
        ),
      },
    ],
  },
  "ipv6-subnet-hesaplama": {
    yol: "/ipv6-subnet-hesaplama",
    baslik: "IPv6 Subnet Hesaplama",
    seoBaslik: "IPv6 Subnet Hesaplama: Önek, Aralık ve /64 Sayısı",
    aciklama:
      "IPv6 adresi ve önekinden ağ, ilk ve son adres, adres sayısı ve /64 alt ağ sayısını bulun; kısa ve açık yazım, adres türü ve PTR kaydı.",
    giris:
      "IPv6 adresini ve öneki (ör. 2001:db8::/48) yazın; aralık, /64 sayısı ve kısa/açık yazımlar hesaplanır.",
    arac: <SubnetHesap surum="v6" />,
    sss: [
      {
        question: "IPv6'da neden /64 kullanılır?",
        answer:
          "IPv6 adresinin son 64 biti cihaz kimliği için ayrılmıştır; cihazların kendi adresini otomatik oluşturması (SLAAC) /64 alt ağ ister. Bu yüzden yerel ağlar (LAN) neredeyse her zaman /64 olur.",
      },
      {
        question: "Servis sağlayıcım bana /56 verdi, bu ne kadar?",
        answer:
          "/56, 256 adet /64 alt ağ demektir; her biri yine 18 kentilyondan fazla adres içerir. /48 ise 65.536 adet /64 alt ağdır. Evde her ağ (misafir Wi-Fi, IoT, kamera) için ayrı /64 kullanabilirsiniz.",
      },
      {
        question: "IPv6 adresi nasıl kısaltılır?",
        answer:
          "Her gruptaki baştaki sıfırlar atılır ve art arda gelen en uzun sıfır grupları bir kez '::' ile yazılır (RFC 5952). 2001:0db8:0000:0000:0000:0000:0000:0001 → 2001:db8::1.",
      },
      GIZLILIK,
    ],
    bolumler: [
      {
        id: "turler",
        baslik: "IPv6 adres türleri",
        icerik: (
          <ul>
            <li>
              <b>2000::/3</b> Genel (global unicast): internette yönlendirilen
              adresler.
            </li>
            <li>
              <b>fe80::/10</b> Yerel bağlantı (link-local): her arayüzde
              otomatik bulunur, yalnızca aynı ağ parçasında geçerlidir.
            </li>
            <li>
              <b>fc00::/7</b> Benzersiz yerel adres (ULA): IPv4&apos;teki özel
              ağların karşılığı.
            </li>
            <li>
              <b>ff00::/8</b> Çok noktaya yayın, <b>::1</b> geri döngü,{" "}
              <b>2001:db8::/32</b> belgeleme için ayrılmıştır.
            </li>
          </ul>
        ),
      },
      {
        id: "ilgili",
        baslik: "İlgili araçlar",
        icerik: (
          <p>
            IPv4 ağları için{" "}
            <Link href="/subnet-hesaplama">Subnet Hesaplama</Link>, MAC
            adresinden IPv6 link-local adresi bulmak için{" "}
            <Link href="/mac-adresi-donusturucu">MAC Adresi Dönüştürücü</Link>.
          </p>
        ),
      },
    ],
  },
  "ip-adresi-donusturucu": {
    yol: "/ip-adresi-donusturucu",
    baslik: "IP Adresi Dönüştürücü",
    seoBaslik: "IP Adresi Dönüştürücü: İkili, Onaltılı, Ondalık (IPv4 ve IPv6)",
    aciklama:
      "IP adresini ikili (binary), onaltılı (hex), ondalık tam sayı ve IPv6 eşlemeli yazıma çevirin; adresin özel, genel veya ayrılmış olduğunu görün.",
    giris:
      "IP adresini hangi biçimde olursa olsun yazın; tüm yazımları ve adresin türü gösterilir.",
    arac: <IpDonustur />,
    sss: [
      {
        question: "IP adresi ikili (binary) sayıya nasıl çevrilir?",
        answer:
          "Her bölüm (oktet) ayrı ayrı 8 bitlik ikili sayıya çevrilir: 192 = 11000000, 168 = 10101000. 192.168.1.1 = 11000000.10101000.00000001.00000001.",
      },
      {
        question: "IP adresinin ondalık (tam sayı) karşılığı nedir?",
        answer:
          "IPv4 adresi aslında 32 bitlik tek bir sayıdır: ilk bölüm × 16.777.216 + ikinci × 65.536 + üçüncü × 256 + dördüncü. 192.168.1.1 = 3.232.235.777. Veritabanlarında adres aralığı sorgusu için bu biçim kullanılır.",
      },
      {
        question: "Adresimin özel mi genel mi olduğunu nasıl anlarım?",
        answer:
          "Adresi yazdığınızda 'Adres türü' satırında gösterilir. 192.168.x.x, 10.x.x.x ve 172.16–31.x.x özel ağ adresleridir; bilgisayarınızın ağ ayarlarında görünen adres genellikle budur. İnternetteki adresiniz modeminizin dış (WAN) adresidir.",
      },
      GIZLILIK,
    ],
    bolumler: [
      {
        id: "ozel",
        baslik: "Özel ve ayrılmış IP aralıkları",
        icerik: OZEL_ARALIKLAR,
      },
      {
        id: "ptr",
        baslik: "Ters DNS (PTR) yazımı",
        icerik: (
          <p>
            Ters DNS kaydında adresin bölümleri ters sırayla yazılıp sonuna{" "}
            <code>in-addr.arpa</code> (IPv6&apos;da her onaltılı hane ters
            sırayla ve <code>ip6.arpa</code>) eklenir. E-posta sunucularında
            ters DNS kaydının doğru olması, postaların spam sayılmaması için
            önemlidir.
          </p>
        ),
      },
    ],
  },
  "mac-adresi-donusturucu": {
    yol: "/mac-adresi-donusturucu",
    baslik: "MAC Adresi Dönüştürücü",
    seoBaslik: "MAC Adresi Dönüştürücü: Biçim, EUI-64 ve Rastgele MAC Üretici",
    aciklama:
      "MAC adresini iki noktalı, tireli, Cisco ve ayırıcısız yazıma çevirin; yerel/evrensel ve multicast bitlerini, EUI-64 ve IPv6 link-local adresini görün; rastgele MAC üretin.",
    giris:
      "MAC adresini herhangi bir yazımla yapıştırın; farklı cihazların istediği biçimler ve adresin özellikleri gösterilir.",
    arac: <MacAraci />,
    sss: [
      {
        question: "MAC adresi nedir?",
        answer:
          "Ağ kartına atanmış 48 bitlik donanım adresidir (ör. 00:1A:2B:3C:4D:5E). İlk üç bayt (OUI) üreticiyi, son üç bayt cihazı gösterir. Yalnızca yerel ağda kullanılır; internete çıkmaz.",
      },
      {
        question: "Bilgisayarımın MAC adresini nasıl bulurum?",
        answer:
          "Windows'ta komut istemine getmac /v veya ipconfig /all yazın ('Fiziksel Adres'). macOS ve Linux'ta ifconfig veya ip link komutu kullanılır. Telefonlarda Ayarlar → Telefon hakkında → Durum veya Wi-Fi ağı ayrıntılarında görünür.",
      },
      {
        question: "Telefonumun MAC adresi neden her ağda farklı?",
        answer:
          "Güncel iPhone ve Android telefonlar gizlilik için her Wi-Fi ağında rastgele bir 'özel adres' kullanır. Bu adreslerin ikinci hanesi 2, 6, A veya E'dir ve üreticiyi göstermez. Modemde cihaz tanımlarken bu özelliği o ağ için kapatabilirsiniz.",
      },
      GIZLILIK,
    ],
    bolumler: [
      {
        id: "bicimler",
        baslik: "Hangi sistem hangi yazımı kullanır?",
        icerik: (
          <ul>
            <li>
              <b>00:1A:2B:3C:4D:5E</b> Linux, macOS, çoğu modem arayüzü
            </li>
            <li>
              <b>00-1A-2B-3C-4D-5E</b> Windows (ipconfig, getmac)
            </li>
            <li>
              <b>001a.2b3c.4d5e</b> Cisco anahtar ve yönlendiriciler
            </li>
            <li>
              <b>001A2B3C4D5E</b> Bazı lisans ve cihaz kayıt formları
            </li>
          </ul>
        ),
      },
      {
        id: "eui64",
        baslik: "EUI-64 ve IPv6 link-local",
        icerik: (
          <p>
            IPv6&apos;da cihazlar arayüz kimliğini MAC adresinden türetebilir:
            adresin ortasına FF:FE eklenir ve ilk baytın 7. biti çevrilir.
            Böylece oluşan <code>fe80::…</code> adresi araçta gösterilir.
            Günümüzde gizlilik için çoğu sistem bunun yerine rastgele kimlik
            kullanır. IPv6 ağ hesabı için{" "}
            <Link href="/ipv6-subnet-hesaplama">IPv6 Subnet Hesaplama</Link>.
          </p>
        ),
      },
    ],
  },
  "indirme-suresi-hesaplama": {
    yol: "/indirme-suresi-hesaplama",
    baslik: "İndirme Süresi Hesaplama",
    seoBaslik: "İndirme Süresi Hesaplama: Dosya Kaç Dakikada İner? (Mbps)",
    aciklama:
      "Dosya boyutu ve internet hızından indirme süresini hesaplayın: 4 GB film, 100 GB oyun 100 Mbps'te kaç dakika? Mbps ile MB/s farkı ve hız tablosu.",
    giris:
      "Dosya boyutunu ve internet paketinizin hızını yazın; tahmini indirme süresini ve farklı hızlardaki karşılığını görün.",
    arac: <IndirmeSuresi />,
    sss: [
      {
        question: "Mbps ile MB/s arasındaki fark nedir?",
        answer:
          "İnternet paketleri megabit (Mbps), indirme programları megabayt (MB/s) gösterir. 1 bayt = 8 bit olduğu için 100 Mbps paket en fazla 12,5 MB/s indirir. 'Paketim 100 ama 12 ile iniyor' durumu bu yüzden normaldir.",
      },
      {
        question: "Neden hesaplanan süreden daha uzun sürüyor?",
        answer:
          "Paket hızı üst sınırdır. Wi-Fi sinyali, aynı anda internet kullanan diğer cihazlar, yoğun saatler ve indirdiğiniz sunucunun hızı süreyi uzatır. Bu yüzden araç varsayılan olarak %90 pay ile hesaplar; Wi-Fi için %70'i seçin.",
      },
      {
        question:
          "Windows'ta 4 GB görünen dosya neden daha büyük hesaplanıyor?",
        answer:
          "Windows dosya boyutunu 1024 tabanlı (GiB) hesaplayıp 'GB' diye yazar. 4 GiB = 4,29 milyar bayttır. Windows'ta gördüğünüz boyut için GiB, oyun mağazalarında ve disk kutularında yazan boyut için GB seçin.",
      },
      {
        question: "Yükleme (upload) süresini de hesaplayabilir miyim?",
        answer:
          "Evet; hız kutusuna paketinizin yükleme hızını yazın. Ev paketlerinde yükleme hızı genellikle indirme hızından çok daha düşüktür, bu yüzden büyük dosyaları buluta yüklemek daha uzun sürer.",
      },
    ],
    bolumler: [
      {
        id: "formul",
        baslik: "İndirme süresi nasıl hesaplanır?",
        icerik: (
          <>
            <p>
              <b>Süre (saniye) = Dosya boyutu (bayt) × 8 ÷ Hız (bit/saniye)</b>
            </p>
            <p>
              Örnek: 4 GB = 4.000.000.000 bayt × 8 = 32 milyar bit. 100 Mbps =
              100 milyon bit/saniye. 32.000 ÷ 100 = 320 saniye ≈ 5 dakika 20
              saniye (teorik).
            </p>
          </>
        ),
      },
      {
        id: "birimler",
        baslik: "Veri birimleri",
        icerik: (
          <p>
            Bit ve bayt dönüşümleri için{" "}
            <Link href="/gigabayt-megabayt">Gigabayt – Megabayt</Link> ve{" "}
            <Link href="/kilobayt-megabayt">Kilobayt – Megabayt</Link>{" "}
            sayfalarına, video dosyası boyutu için{" "}
            <Link href="/video-bit-hizi-hesaplama">
              Video Bit Hızı Hesaplama
            </Link>{" "}
            aracına bakabilirsiniz.
          </p>
        ),
      },
    ],
  },
  "hash-hesaplama": {
    yol: "/hash-hesaplama",
    baslik: "Hash Hesaplama",
    seoBaslik:
      "Hash Hesaplama: MD5, SHA-1, SHA-256, SHA-512, CRC32 (Dosya ve Metin)",
    aciklama:
      "Metin veya dosyanın MD5, SHA-1, SHA-256, SHA-384, SHA-512 ve CRC32 özetini hesaplayın; indirilen dosyanın checksum'ını doğrulayın. Dosya yüklenmez, GB'lık dosyalar da olur.",
    giris:
      "Metni yazın veya dosyayı seçin; seçtiğiniz algoritmaların özeti anında hesaplanır ve beklenen değerle karşılaştırılır.",
    arac: <HashHesap />,
    sss: HASH_SSS,
    bolumler: [
      {
        id: "hangisi",
        baslik: "Hangi algoritmayı seçmeliyim?",
        icerik: (
          <ul>
            <li>
              <b>SHA-256:</b> Linux ISO&apos;ları, yazılım kurulum dosyaları ve
              güvenlik için bugünün standardı.
            </li>
            <li>
              <b>MD5:</b> Eski siteler ve oyun modları; yalnızca bozulma
              kontrolü için.
            </li>
            <li>
              <b>SHA-512:</b> Daha uzun özet; bazı Linux dağıtımları ve
              arşivler.
            </li>
            <li>
              <b>CRC32:</b> ZIP ve RAR arşivlerinin içindeki dosya denetimi;
              güvenlik amacı yoktur.
            </li>
          </ul>
        ),
      },
      {
        id: "komut",
        baslik: "Bilgisayarda komutla hash hesaplama",
        icerik: HASH_NASIL,
      },
    ],
  },
  "md5-hesaplama": {
    yol: "/md5-hesaplama",
    baslik: "MD5 Hesaplama",
    seoBaslik: "MD5 Hesaplama: Dosya ve Metin MD5 Hash Oluşturma (Online)",
    aciklama:
      "Dosyanın veya metnin MD5 özetini (hash) çevrim içi hesaplayın, MD5 checksum ile karşılaştırın. Dosya yüklenmez; büyük dosyalar parça parça hesaplanır.",
    giris:
      "Dosyayı seçin veya metni yazın; 32 haneli MD5 özeti hesaplanır ve yapıştırdığınız değerle karşılaştırılır.",
    arac: <HashHesap odak="md5" />,
    sss: [
      {
        question: "MD5 nedir?",
        answer:
          "MD5, her türlü veriden 128 bitlik (32 onaltılı hane) özet üreten bir algoritmadır. Örneğin boş metnin MD5'i d41d8cd98f00b204e9800998ecf8427e'dir. Dosyanın bozulup bozulmadığını anlamak için yaygın kullanılır.",
      },
      {
        question: "MD5 şifre çözülebilir mi?",
        answer:
          "MD5 bir şifreleme değil tek yönlü özettir; matematiksel olarak geri çevrilemez. Ancak kısa ve yaygın parolaların MD5'leri önceden hesaplanmış tablolarda bulunduğu için parola saklamak amacıyla kesinlikle kullanılmamalıdır.",
      },
      ...HASH_SSS.slice(1),
    ],
    bolumler: [
      {
        id: "komut",
        baslik: "Bilgisayarda MD5 hesaplama komutları",
        icerik: HASH_NASIL,
      },
      {
        id: "diger",
        baslik: "Diğer algoritmalar",
        icerik: (
          <p>
            SHA-256 checksum&apos;ı için{" "}
            <Link href="/sha256-hesaplama">SHA-256 Hesaplama</Link>, birden
            fazla algoritmayı aynı anda görmek için{" "}
            <Link href="/hash-hesaplama">Hash Hesaplama</Link> sayfasını
            kullanın.
          </p>
        ),
      },
    ],
  },
  "sha256-hesaplama": {
    yol: "/sha256-hesaplama",
    baslik: "SHA-256 Hesaplama",
    seoBaslik: "SHA-256 Hesaplama: Dosya Checksum Doğrulama (ISO, EXE)",
    aciklama:
      "ISO, EXE ve kurulum dosyalarının SHA-256 özetini hesaplayın, yayıncının checksum'ıyla karşılaştırın. Tarayıcıda çalışır, dosya yüklenmez.",
    giris:
      "İndirdiğiniz dosyayı seçin ve sitede yayımlanan SHA-256 değerini yapıştırın; dosyanın sağlam olup olmadığını hemen görün.",
    arac: <HashHesap odak="sha256" />,
    sss: [
      {
        question: "SHA-256 nedir?",
        answer:
          "SHA-2 ailesinden, 256 bitlik (64 onaltılı hane) özet üreten algoritmadır. Yazılım dağıtımı, dijital imzalar ve TLS sertifikalarında standart olarak kullanılır; bilinen pratik bir çakışma saldırısı yoktur.",
      },
      {
        question: "Checksum eşleşmezse ne yapmalıyım?",
        answer:
          "Dosyayı silip resmî siteden yeniden indirin. Tekrar eşleşmiyorsa dosyayı çalıştırmayın; indirme aynası değiştirilmiş olabilir. Doğru algoritmayı (SHA-256 mı SHA-512 mi) karşılaştırdığınızdan emin olun.",
      },
      ...HASH_SSS.slice(1),
    ],
    bolumler: [
      {
        id: "komut",
        baslik: "Bilgisayarda SHA-256 hesaplama komutları",
        icerik: HASH_NASIL,
      },
      {
        id: "nerede",
        baslik: "SHA-256 değerini nerede bulurum?",
        icerik: (
          <p>
            Yazılımın indirme sayfasında genellikle &quot;SHA256&quot;,
            &quot;checksum&quot; veya &quot;SHA256SUMS&quot; adıyla yayımlanır.
            Birden çok dosyanın özetini içeren SHA256SUMS dosyasında, kendi
            dosya adınızın yanındaki değeri kopyalayın.
          </p>
        ),
      },
    ],
  },
  "tarayici-bilgisi": {
    yol: "/tarayici-bilgisi",
    baslik: "Tarayıcı ve Cihaz Bilgim",
    seoBaslik:
      "Tarayıcım Ne? Tarayıcı Sürümü, İşletim Sistemi ve Ekran Çözünürlüğü",
    aciklama:
      "Kullandığınız tarayıcı ve sürümü, işletim sistemi, ekran çözünürlüğü, piksel oranı, dil ve saat dilimi; User-Agent bilgisini tek tıkla kopyalayın.",
    giris:
      "Destek ekibinin sorduğu tarayıcı, sürüm ve ekran bilgileri aşağıda; tek tıkla kopyalayıp gönderebilirsiniz.",
    arac: <TarayiciBilgisi />,
    sss: [
      {
        question: "User-Agent nedir?",
        answer:
          "Tarayıcının her sitede kendini tanıttığı metindir; tarayıcı adı, sürümü ve işletim sistemi bilgisini içerir. Siteler bunu uyumluluk için kullanır. Güncel tarayıcılar gizlilik için bu metindeki bazı ayrıntıları kısaltır.",
      },
      {
        question: "Ekran çözünürlüğü neden gerçekten düşük görünüyor?",
        answer:
          "Tarayıcılar ekranı 'CSS pikseli' ile ölçer. Yüksek çözünürlüklü ekranlarda bir CSS pikseli birden çok fiziksel piksele denk gelir; 'Gerçek piksel' satırı ekranın fiziksel çözünürlüğünü, 'Piksel oranı' bu katsayıyı gösterir. Windows'ta ölçekleme %125 veya %150 ise de değer farklı görünür.",
      },
      {
        question: "Windows 11 neden Windows 10 olarak görünebilir?",
        answer:
          "User-Agent metni Windows 10 ve 11'de aynıdır. Chrome ve Edge ek bilgiyle ayırt etmeye izin verir; araç bunu kullanır. Firefox'ta ayrım yapılamadığı için 'Windows 10 veya 11' yazar.",
      },
      {
        question: "Bu bilgiler kaydediliyor mu?",
        answer:
          "Hayır. Bilgiler tarayıcınızın kendisinden okunur ve yalnızca ekranınızda gösterilir; hiçbir sunucuya gönderilmez.",
      },
    ],
    bolumler: [
      {
        id: "neden",
        baslik: "Bu bilgiler ne işe yarar?",
        icerik: (
          <ul>
            <li>
              Teknik destek taleplerinde tarayıcı ve sistem bilgisini iletmek
            </li>
            <li>Bir sitenin neden düzgün görünmediğini anlamak</li>
            <li>Tarayıcının güncel olup olmadığını kontrol etmek</li>
            <li>Tasarım için ekran ve pencere boyutunu öğrenmek</li>
          </ul>
        ),
      },
      {
        id: "ilgili",
        baslik: "İlgili araçlar",
        icerik: (
          <p>
            Ekran ölçüleri için{" "}
            <Link href="/piksel-cm-dpi-hesaplama">
              Piksel, CM ve DPI Hesaplama
            </Link>
            , güçlü parola için{" "}
            <Link href="/sifre-olusturucu">Şifre Oluşturucu</Link>.
          </p>
        ),
      },
    ],
  },
  "port-numaralari": {
    yol: "/port-numaralari",
    baslik: "Port Numaraları Listesi",
    seoBaslik: "Port Numaraları Listesi: Hangi Port Ne İşe Yarar? (TCP/UDP)",
    aciklama:
      "En çok kullanılan TCP ve UDP port numaraları: 80, 443, 22, 3389, 25565 ve daha fazlası. Hizmet açıklamaları, VPN ve kamera portları, güvenlik uyarıları.",
    giris:
      "Port numarasını veya hizmet adını arayın; hangi programın kullandığını ve internete açmanın risklerini görün.",
    arac: <PortListesi />,
    sss: [
      {
        question: "Port nedir?",
        answer:
          "Bir cihazdaki farklı hizmetleri ayırt eden 0–65535 arası numaradır. IP adresi binayı, port numarası daireyi gösterir: aynı sunucuda web sitesi 443'ten, SSH 22'den hizmet verir.",
      },
      {
        question: "TCP ile UDP farkı nedir?",
        answer:
          "TCP bağlantı kurar ve verinin eksiksiz, sıralı ulaşmasını garanti eder (web, e-posta, dosya). UDP bağlantısız ve daha hızlıdır; kayıp olabilir ama gecikme azdır (DNS, oyunlar, görüntülü görüşme, VPN).",
      },
      {
        question: "Port yönlendirme (port açma) nasıl yapılır?",
        answer:
          "Modemin arayüzünde (genellikle 192.168.1.1) 'Port Yönlendirme', 'NAT' veya 'Sanal Sunucu' bölümüne girip dış portu, iç IP adresini ve iç portu yazarsınız. Modeminizin WAN adresi 100.64.x.x ise operatör NAT'ı (CGNAT) vardır ve dışarıdan erişim için operatörden sabit/genel IP istemeniz gerekir.",
      },
      {
        question: "Portun açık olup olmadığını bu sayfada test edebilir miyim?",
        answer:
          "Hayır. Tarayıcılar güvenlik nedeniyle rastgele portlara bağlantı denemesine izin vermez; port testi dışarıdan bir sunucu gerektirir. Kendi ağınızda Windows'ta Test-NetConnection adres -Port 443 komutunu kullanabilirsiniz.",
      },
    ],
    bolumler: [
      {
        id: "araliklar",
        baslik: "Port aralıkları",
        icerik: (
          <ul>
            <li>
              <b>0–1023:</b> Sistem (iyi bilinen) portları: HTTP, HTTPS, SSH,
              DNS.
            </li>
            <li>
              <b>1024–49151:</b> Kayıtlı portlar: veritabanları, oyunlar,
              uygulamalar.
            </li>
            <li>
              <b>49152–65535:</b> Dinamik portlar: bağlantı kuran tarafın geçici
              olarak kullandığı portlar.
            </li>
          </ul>
        ),
      },
      {
        id: "guvenlik",
        baslik: "Hangi portları internete açmamalı?",
        icerik: (
          <p>
            Uzak masaüstü (3389), SMB dosya paylaşımı (445), veritabanları
            (3306, 5432, 27017, 6379) ve Docker API (2375) internete doğrudan
            açıldığında otomatik saldırıların ilk hedefidir. Bu hizmetlere
            dışarıdan erişmeniz gerekiyorsa VPN kullanın ve güçlü parola
            belirleyin (<Link href="/sifre-olusturucu">Şifre Oluşturucu</Link>).
          </p>
        ),
      },
    ],
  },
};

export const agMeta = (anahtar: string) => {
  const s = AG_SAYFALARI[anahtar];
  return takvimMetadata(s.yol, {
    title: s.seoBaslik,
    short: s.baslik,
    description: s.aciklama,
  });
};

export function AgSayfasi({ anahtar }: { anahtar: string }) {
  const s = AG_SAYFALARI[anahtar];
  return (
    <AracSayfasi
      koleksiyon="ag"
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
