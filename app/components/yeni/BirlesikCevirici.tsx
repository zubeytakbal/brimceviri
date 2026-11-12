"use client";

// Birlesik kategori sayfasinin ceviricisi: her uye kategori icin bir sekme. Birimleri birbirine
// cevrilemeyen kategoriler (doz, aktivite) ayni kutuda karismasin diye ayri ceviricilerdir.
// Adresteki #bolum (ör. /radyasyon#aktivite) ilgili sekmeyi acar; icindekiler linkleri de oyle.
import { useEffect, useState } from "react";
import CokluCevirici, { type CokluBirim, type CokluGrup } from "./CokluCevirici";

export type CeviriciParca = {
  id: string;
  sekme: string;
  category: string;
  birimler: CokluBirim[];
  gruplar: CokluGrup[];
  baslangic: { birim: string; deger: number };
};

export default function BirlesikCevirici({ parcalar }: { parcalar: CeviriciParca[] }) {
  const [aktif, setAktif] = useState(0);

  useEffect(() => {
    function hashten() {
      const i = parcalar.findIndex((p) => `#${p.id}` === window.location.hash);
      if (i >= 0) setAktif(i);
    }
    hashten();
    window.addEventListener("hashchange", hashten);
    return () => window.removeEventListener("hashchange", hashten);
  }, [parcalar]);

  const p = parcalar[aktif];
  return (
    <div className="yy-birlesik">
      <div className="yy-birlesik-sekmeler" role="group" aria-label="Çevirici seçimi">
        {parcalar.map((s, i) => (
          <button key={s.id} type="button" aria-pressed={i === aktif} onClick={() => setAktif(i)}>
            {s.sekme}
          </button>
        ))}
      </div>
      <CokluCevirici key={p.id} category={p.category} birimler={p.birimler} gruplar={p.gruplar} baslangic={p.baslangic} />
    </div>
  );
}
