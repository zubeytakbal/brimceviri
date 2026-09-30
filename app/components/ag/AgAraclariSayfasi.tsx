import Link from "@/app/components/SiteLink";
import { AG_ARACLARI_YOLU } from "../../converter/ag/agAraclari";
import type { FaqItem } from "../../converter/faqSchema";
import DosyaAracCubugu from "../gorsel/DosyaAracCubugu";
import DosyaAracPaneli from "../gorsel/DosyaAracPaneli";
import { takvimMetadata } from "../takvim/takvimMeta";
import TimeToolPage from "../time/TimeToolPage";

export const agAraclariMeta = () =>
  takvimMetadata(AG_ARACLARI_YOLU, {
    title: "Ağ Araçları: Subnet, IP, Hash, Port ve İndirme Süresi (Ücretsiz)",
    short: "Ağ Araçları",
    description:
      "Subnet ve IP hesaplama, IPv6, MAC adresi, MD5/SHA-256 checksum, indirme süresi, port listesi ve tarayıcı bilgisi tek panelde. Ücretsiz; hesaplamalar tarayıcıda yapılır.",
  });

const SSS: FaqItem[] = [
  {
    question: "Bu araçlar bilgilerimi bir yere gönderiyor mu?",
    answer:
      "Hayır. Buradaki tüm hesaplamalar tarayıcınızda yapılır; IP adresleri, metinler ve dosyalar hiçbir sunucuya gönderilmez.",
  },
  {
    question: "Kimler için uygun?",
    answer:
      "Ağ yöneticileri ve öğrenciler (subnet, IPv6, port), yazılımcılar (hash, checksum, IP dönüşümü) ve evde internetini anlamak isteyen herkes (indirme süresi, tarayıcı bilgisi, MAC adresi) için.",
  },
  {
    question: "Telefonda çalışır mı?",
    answer:
      "Evet. Tüm araçlar Android ve iPhone tarayıcılarında çalışır; hash aracı telefondaki dosyaları da hesaplayabilir.",
  },
];

export function AgAraclariSayfasi() {
  return (
    <>
      <DosyaAracCubugu koleksiyon="ag" />
      <TimeToolPage
        crumbs={[{ href: "/", label: "Ana Sayfa" }, { label: "Ağ Araçları" }]}
        crumbLabel="Sayfa yolu"
        title="Ağ Araçları"
        intro="IP ve alt ağ hesaplama, checksum doğrulama, port rehberi ve bağlantı araçları tek yerde. Hepsi ücretsiz ve kayıtsız; hesaplamalar tarayıcınızda yapılır."
        tool={<DosyaAracPaneli koleksiyon="ag" />}
        related={{
          title: "İlginizi çekebilir",
          links: [
            { href: "/dosya-araclari", label: "Dosya Araçları" },
            { href: "/sifre-olusturucu", label: "Şifre Oluşturucu" },
            { href: "/qr-kod-olusturucu", label: "QR Kod Oluşturucu (Wi-Fi)" },
            { href: "/kategoriler/veri", label: "Veri Depolama Dönüşümleri" },
            {
              href: "/video-bit-hizi-hesaplama",
              label: "Video Bit Hızı Hesaplama",
            },
          ],
        }}
        tocTitle="İçindekiler"
        tocItems={[
          { id: "neler", label: "Hangi araç ne işe yarar?" },
          { id: "faq", label: "Sık sorulan sorular" },
        ]}
        faqTitle="Sık sorulan sorular"
        faqItems={SSS}
      >
        <h2 id="neler">Hangi araç ne işe yarar?</h2>
        <ul>
          <li>
            <Link href="/subnet-hesaplama">Subnet Hesaplama</Link>: Ağ ve yayın
            adresi, IP aralığı, maske; ağı alt ağlara bölme.
          </li>
          <li>
            <Link href="/hash-hesaplama">Hash Hesaplama</Link>: İndirdiğiniz
            dosyanın bozulmadığını MD5 veya SHA-256 ile doğrulama.
          </li>
          <li>
            <Link href="/indirme-suresi-hesaplama">
              İndirme Süresi Hesaplama
            </Link>
            : Paket hızınızla bir oyunun ya da filmin kaç dakikada ineceği.
          </li>
          <li>
            <Link href="/port-numaralari">Port Numaraları</Link>: Modemde port
            açarken hangi numaranın hangi hizmete ait olduğu.
          </li>
        </ul>
        <p>
          Kablosuz ağınızı misafirlerle paylaşmak için{" "}
          <Link href="/qr-kod-olusturucu">Wi-Fi QR kodu</Link>, modem ve
          hesaplarınız için güçlü parola üretmek için{" "}
          <Link href="/sifre-olusturucu">Şifre Oluşturucu</Link>{" "}
          kullanabilirsiniz.
        </p>
      </TimeToolPage>
    </>
  );
}
