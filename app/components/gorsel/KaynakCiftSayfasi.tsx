import Link from "@/app/components/SiteLink";
import { DOSYA_ARACLARI_YOLU } from "../../converter/gorsel/dosyaAraclari";
import {
  KAYNAK_CIFTLER,
  type KaynakCift,
} from "../../converter/gorsel/kaynakCiftler";
import TimeToolPage from "../time/TimeToolPage";
import { takvimMetadata } from "../takvim/takvimMeta";
import DosyaAracCubugu from "./DosyaAracCubugu";
import GorselDonusturucu from "./GorselDonusturucu";

export const kaynakCiftMeta = (c: KaynakCift) =>
  takvimMetadata(`/${c.slug}`, {
    title: c.seoBaslik,
    short: c.baslik,
    description: c.aciklama,
  });

export const kaynakCiftBul = (slug: string) =>
  KAYNAK_CIFTLER.find((c) => c.slug === slug)!;

/** AVIF, GIF, BMP, SVG, TIFF, JFIF → JPG/PNG sayfası. */
export function KaynakCiftSayfasi({ cift: c }: { cift: KaynakCift }) {
  const hedefAd = c.hedef === "jpg" ? "JPG" : "PNG";
  return (
    <>
      <DosyaAracCubugu />
      <TimeToolPage
        crumbs={[
          { href: "/", label: "Ana Sayfa" },
          { href: DOSYA_ARACLARI_YOLU, label: "Dosya Araçları" },
          { href: "/gorsel-donusturucu", label: "Görsel Dönüştürücü" },
          { label: c.baslik },
        ]}
        crumbLabel="Sayfa yolu"
        title={c.baslik}
        intro={c.giris}
        tool={
          <GorselDonusturucu
            hedef={c.hedef}
            kaynakAd={c.kaynakAd}
            kabul={`${c.kabul},image/*`}
          />
        }
        related={{
          title: "İlginizi çekebilir",
          links: [
            { href: DOSYA_ARACLARI_YOLU, label: "Tüm Dosya Araçları" },
            { href: "/gorsel-donusturucu", label: "Görsel Dönüştürücü" },
            ...KAYNAK_CIFTLER.filter((x) => x.slug !== c.slug).map((x) => ({
              href: `/${x.slug}`,
              label: x.baslik,
            })),
            { href: "/heic-jpg-cevirme", label: "HEIC JPG Çevirme" },
            { href: "/webp-jpg-cevirme", label: "WebP JPG Çevirme" },
            {
              href: "/fotograf-boyutu-kucultme",
              label: "Fotoğraf Boyutu Küçültme",
            },
          ],
        }}
        tocTitle="İçindekiler"
        tocItems={[
          ...c.bolumler.map((b) => ({ id: b.id, label: b.baslik })),
          { id: "nasil", label: `${c.kaynakAd} nasıl ${hedefAd}'ye çevrilir?` },
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
        <h2 id="nasil">
          {c.kaynakAd} nasıl {hedefAd}&apos;ye çevrilir?
        </h2>
        <ol>
          <li>
            {c.kaynakAd} dosyalarınızı seçin veya sürükleyip bırakın (en fazla
            30 dosya).
          </li>
          <li>
            {c.hedef === "jpg"
              ? "Kaliteyi ve saydam alanların rengini isterseniz değiştirin."
              : "İsterseniz en fazla genişliği belirleyin."}
          </li>
          <li>
            Dönüştürülen {hedefAd} dosyalarını tek tek veya ZIP olarak indirin.
          </li>
        </ol>
        <p>
          Ayrıca dönüştürdüğünüz görseli{" "}
          <Link href="/resim-boyutlandirma">boyutlandırabilir</Link>,{" "}
          <Link href="/fotograf-boyutu-kucultme">hedef KB değerine</Link>{" "}
          küçültebilir veya <Link href="/jpg-pdf-cevirme">PDF&apos;e</Link>{" "}
          çevirebilirsiniz.
        </p>
      </TimeToolPage>
    </>
  );
}
