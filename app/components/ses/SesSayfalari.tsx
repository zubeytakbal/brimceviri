import Link from "@/app/components/SiteLink";
import type { FaqItem } from "../../converter/faqSchema";
import { DOSYA_ARACLARI_YOLU } from "../../converter/gorsel/dosyaAraclari";
import { SES_CIFTLERI, type SesCift } from "../../converter/ses/sesCiftler";
import AracSayfasi from "../gorsel/AracSayfasi";
import { takvimMetadata } from "../takvim/takvimMeta";
import SesDonusturucu from "./SesDonusturucu";
import SesKesme from "./SesKesme";

export const SES_HUB = "/ses-donusturucu";
const HUB = { href: SES_HUB, label: "Ses Dönüştürücü" };

const BAGLANTILAR = [
  { href: DOSYA_ARACLARI_YOLU, label: "Tüm Dosya Araçları" },
  HUB,
  { href: "/ses-kesme", label: "Ses Kesme (MP3 Kesici)" },
  ...SES_CIFTLERI.map((c) => ({ href: `/${c.slug}`, label: c.baslik })),
  { href: "/kilobayt-megabayt", label: "Kilobayt → Megabayt" },
];

export const sesCiftMeta = (c: SesCift) =>
  takvimMetadata(`/${c.slug}`, {
    title: c.seoBaslik,
    short: c.baslik,
    description: c.aciklama,
  });

export const sesCiftBul = (slug: string) =>
  SES_CIFTLERI.find((c) => c.slug === slug)!;

export function SesCiftSayfasi({ cift: c }: { cift: SesCift }) {
  const hedefAd = c.hedef.toUpperCase();
  return (
    <AracSayfasi
      yol={`/${c.slug}`}
      baslik={c.baslik}
      giris={c.giris}
      ara={HUB}
      arac={
        <SesDonusturucu
          hedef={c.hedef}
          kaynakAd={c.kaynakAd}
          kabul={c.kabul}
          varsayilanKbps={c.varsayilanKbps}
        />
      }
      baglantilar={BAGLANTILAR}
      sss={c.sss}
      bolumler={[
        ...c.bolumler.map((b) => ({
          id: b.id,
          baslik: b.baslik,
          icerik: (
            <>
              {b.paragraflar.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </>
          ),
        })),
        {
          id: "adimlar",
          baslik: `${c.kaynakAd.split(" ")[0]} nasıl ${hedefAd}'ye çevrilir?`,
          icerik: (
            <>
              <ol>
                <li>Dosyalarınızı seçin veya sürükleyip bırakın.</li>
                <li>
                  {c.hedef === "mp3"
                    ? "Ses kalitesini seçin; konuşma kayıtları için mono seçeneğini işaretleyebilirsiniz."
                    : "İsterseniz tek kanal (mono) seçin."}
                </li>
                <li>
                  Hazır olan dosyaları dinleyin, tek tek veya ZIP olarak
                  indirin.
                </li>
              </ol>
              <p>
                Sesin yalnızca bir bölümünü almak ya da zil sesi yapmak için{" "}
                <Link href="/ses-kesme">Ses Kesme</Link> aracını kullanın.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}

/* /ses-donusturucu */
export const sesHubMeta = () =>
  takvimMetadata(SES_HUB, {
    title: "Ses Dönüştürücü: MP3, WAV, M4A, OPUS, FLAC Çevirme (Yüklemeden)",
    short: "Ses Dönüştürücü",
    description:
      "Ses ve video dosyalarını MP3 veya WAV'a çevirin: M4A, OPUS (WhatsApp), OGG, FLAC, WAV, MP4. Kalite ve mono seçimi, toplu dönüştürme; dosyalar sunucuya yüklenmez.",
  });

const HUB_SSS: FaqItem[] = [
  {
    question: "Hangi dosyalar açılabilir?",
    answer:
      "MP3, WAV, M4A/AAC, OGG, OPUS, FLAC ile MP4, MOV, WebM gibi videoların ses kısmı açılır. WMA ve AMR gibi eski biçimler çoğu tarayıcıda desteklenmez. Açılan dosyalar tarayıcınızın kendi ses çözücüsüyle okunur.",
  },
  {
    question: "Dosyalarım nereye gidiyor?",
    answer:
      "Hiçbir yere. Dönüştürme bilgisayarınızda, tarayıcının içinde yapılır; dosyalar sunucuya yüklenmez. Yalnızca MP3 kodlayıcı (yaklaşık 140 KB) ilk kullanımda indirilir.",
  },
  {
    question: "MP3 mü WAV mı seçmeliyim?",
    answer:
      "Dinlemek, paylaşmak ve arşivlemek için MP3; ses düzenleme programları, santral sistemleri ve donanımlar için WAV seçin. WAV kayıpsızdır ama 7–10 kat büyüktür.",
  },
  {
    question: "Ücretsiz mi, sınır var mı?",
    answer:
      "Ücretsizdir, kayıt gerektirmez. Tek seferde 20 dosya seçebilirsiniz; süre sınırı yoktur ancak 1 saati aşan kayıtlarda tarayıcı belleği yetmeyebilir.",
  },
];

export function SesHubSayfasi() {
  return (
    <AracSayfasi
      yol={SES_HUB}
      baslik="Ses Dönüştürücü"
      giris="Ses ve video dosyalarınızı MP3 veya WAV'a çevirin. Kaliteyi seçin, birden fazla dosyayı aynı anda dönüştürün ve ZIP olarak indirin. Dosyalar tarayıcınızda işlenir, hiçbir sunucuya yüklenmez."
      arac={<SesDonusturucu />}
      baglantilar={BAGLANTILAR}
      sss={HUB_SSS}
      bolumler={[
        {
          id: "donusumler",
          baslik: "Hazır dönüştürme sayfaları",
          icerik: (
            <ul className="takvim-hub-liste">
              {SES_CIFTLERI.map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}`}>{c.baslik}</Link> — {c.kart}
                </li>
              ))}
              <li>
                <Link href="/ses-kesme">Ses Kesme</Link> — MP3 ve videolardan
                bölüm kesin, zil sesi yapın.
              </li>
            </ul>
          ),
        },
        {
          id: "bicimler",
          baslik: "Ses biçimleri karşılaştırması",
          icerik: (
            <div className="holiday-table-wrap">
              <table className="holiday-table">
                <thead>
                  <tr>
                    <th scope="col">Biçim</th>
                    <th scope="col">Sıkıştırma</th>
                    <th scope="col">1 dakika ≈</th>
                    <th scope="col">Tipik kullanım</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>WAV</td>
                    <td>Yok (kayıpsız)</td>
                    <td>10 MB</td>
                    <td>Kayıt, düzenleme</td>
                  </tr>
                  <tr>
                    <td>FLAC</td>
                    <td>Kayıpsız</td>
                    <td>5–6 MB</td>
                    <td>Müzik arşivi</td>
                  </tr>
                  <tr>
                    <td>MP3 (192 kbps)</td>
                    <td>Kayıplı</td>
                    <td>1,4 MB</td>
                    <td>Her yerde dinleme</td>
                  </tr>
                  <tr>
                    <td>M4A / AAC</td>
                    <td>Kayıplı</td>
                    <td>≈1 MB</td>
                    <td>iPhone, iTunes</td>
                  </tr>
                  <tr>
                    <td>OPUS</td>
                    <td>Kayıplı</td>
                    <td>0,1–0,5 MB</td>
                    <td>Sesli mesaj, görüşme</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ),
        },
      ]}
    />
  );
}

/* /ses-kesme */
export const sesKesmeMeta = () =>
  takvimMetadata("/ses-kesme", {
    title: "Ses Kesme: MP3 Kesme ve Zil Sesi Yapma (Ücretsiz, Yüklemeden)",
    short: "Ses Kesme",
    description:
      "MP3, WAV, M4A veya videodan istediğiniz bölümü dalga formu üzerinde seçip kesin; yumuşak giriş/çıkış ekleyin, zil sesi yapın. Dosyalar sunucuya yüklenmez.",
  });

export function SesKesmeSayfasi() {
  return (
    <AracSayfasi
      yol="/ses-kesme"
      baslik="Ses Kesme (MP3 Kesici)"
      giris="Şarkı, kayıt veya videodan istediğiniz bölümü dalga formu üzerinde seçin, dinleyin ve MP3 ya da WAV olarak indirin. Zil sesi, bildirim sesi veya sunum müziği hazırlamak için idealdir."
      ara={HUB}
      arac={<SesKesme />}
      baglantilar={BAGLANTILAR}
      sss={[
        {
          question: "MP3 nasıl kesilir?",
          answer:
            "Dosyayı seçin, dalga formunda başlangıç ve bitiş tutamaklarını sürükleyin (ya da saniyeyi yazın), '▶ Seçimi dinle' ile kontrol edin ve 'Kes ve indir' düğmesine basın.",
        },
        {
          question: "Yumuşak giriş ve çıkış ne işe yarar?",
          answer:
            "Kesilen parçanın başında sesi sıfırdan yavaşça açar, sonunda yavaşça kısar. Böylece zil sesi veya sunum müziği aniden başlayıp bitmez.",
        },
        {
          question: "iPhone zil sesi yapabilir miyim?",
          answer:
            "iPhone zil sesleri 40 saniyeden kısa .m4r dosyası olmalıdır ve GarageBand ya da bilgisayardaki Apple Aygıtlar/iTunes ile eklenir. Buradan kestiğiniz 30 saniyelik MP3'ü GarageBand'e aktarıp zil sesi olarak dışa aktarabilirsiniz. Android'de MP3 doğrudan zil sesi olarak seçilebilir.",
        },
        {
          question: "Videodan ses kesebilir miyim?",
          answer:
            "Evet. MP4, MOV veya WebM video seçtiğinizde sesi açılır; seçtiğiniz bölüm yalnızca ses olarak (MP3/WAV) kaydedilir.",
        },
        {
          question: "Dosyam bir sunucuya yükleniyor mu?",
          answer:
            "Hayır. Kesme tarayıcınızda yapılır; dosya bilgisayarınızdan çıkmaz.",
        },
      ]}
      bolumler={[
        {
          id: "ipuclari",
          baslik: "İpuçları",
          icerik: (
            <ul>
              <li>
                Tutamaçları klavyeyle de oynatabilirsiniz: tutamaca tıklayıp ← →
                tuşlarıyla 0,1 saniye kaydırın.
              </li>
              <li>
                &quot;Zil sesi (30 sn)&quot; düğmesi bitişi başlangıçtan 30
                saniye sonraya ayarlar.
              </li>
              <li>
                Tüm dosyayı başka biçime çevirmek için{" "}
                <Link href={SES_HUB}>Ses Dönüştürücü</Link>&apos;yü kullanın.
              </li>
            </ul>
          ),
        },
      ]}
    />
  );
}
