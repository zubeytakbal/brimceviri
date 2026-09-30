import type { ReactNode } from "react";
import type { FaqItem } from "../../converter/faqSchema";
import { DOSYA_ARACLARI_YOLU } from "../../converter/gorsel/dosyaAraclari";
import TimeToolPage from "../time/TimeToolPage";
import DosyaAracCubugu from "./DosyaAracCubugu";

/** Dosya aracı sayfası iskeleti: araç çubuğu, kırıntı, araç, bölümler, SSS, ilgili bağlantılar. */
export default function AracSayfasi({
  yol,
  baslik,
  giris,
  arac,
  sss,
  bolumler,
  baglantilar,
  ara,
}: {
  yol: string;
  baslik: string;
  giris: string;
  arac: ReactNode;
  sss: FaqItem[];
  bolumler: Array<{ id: string; baslik: string; icerik: ReactNode }>;
  baglantilar: Array<{ href: string; label: string }>;
  /** Dosya Araçları ile sayfa arasındaki ara kırıntı (ör. Görsel Dönüştürücü). */
  ara?: { href: string; label: string };
}) {
  return (
    <>
      <DosyaAracCubugu />
      <TimeToolPage
        crumbs={[
          { href: "/", label: "Ana Sayfa" },
          { href: DOSYA_ARACLARI_YOLU, label: "Dosya Araçları" },
          ...(ara ? [ara] : []),
          { label: baslik },
        ]}
        crumbLabel="Sayfa yolu"
        title={baslik}
        intro={giris}
        tool={arac}
        related={{
          title: "İlginizi çekebilir",
          links: baglantilar.filter((l) => l.href !== yol),
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
