"use client";

// "Tüm Hesaplama Araçları" sayfasının koyu üst alanı: bütün araçlarda arama ve grup kısayolları.
import { useMemo, useState } from "react";
import Link from "@/app/components/SiteLink";

type Arac = { href: string; ad: string; grup: string };
type Grup = { id: string; baslik: string; sayi: number };

const sade = (s: string) => s.toLocaleLowerCase("tr").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ı/g, "i");

export default function HesapHubHero({ araclar, gruplar }: { araclar: Arac[]; gruplar: Grup[] }) {
  const [soru, setSoru] = useState("");
  const sonuc = useMemo(() => {
    const kelimeler = sade(soru).split(/\s+/).filter(Boolean);
    if (!kelimeler.length) return [];
    return araclar.filter((a) => kelimeler.every((k) => sade(`${a.ad} ${a.grup}`).includes(k))).slice(0, 8);
  }, [soru, araclar]);

  return (
    <section className="timehub-hero hesap-hub-hero" aria-label="Hesaplama aracı ara">
      <p className="timehub-hero-label">
        {araclar.length} araç · {gruplar.length} grup
      </p>
      <div className="hesap-hub-arama">
        <label htmlFor="hesap-hub-ara" className="sr-only">
          Hesaplama aracı ara
        </label>
        <input id="hesap-hub-ara" type="search" value={soru} onChange={(e) => setSoru(e.target.value)} placeholder="Ne hesaplamak istiyorsunuz? Örn. kdv, boya, klima" autoComplete="off" />
      </div>
      {soru.trim() ? (
        sonuc.length ? (
          <ul className="hesap-hub-sonuc">
            {sonuc.map((a) => (
              <li key={a.href}>
                <Link href={a.href}>
                  <strong>{a.ad}</strong>
                  <span>{a.grup}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="hesap-hub-yok">Bu aramaya uyan araç bulunamadı.</p>
        )
      ) : null}
      <ul className="timehub-strip hesap-hub-gruplar">
        {gruplar.map((g) => (
          <li key={g.id}>
            <a href={`#${g.id}`}>
              <strong>{g.baslik}</strong>
              <span>{g.sayi}</span>
              <em>araç</em>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
