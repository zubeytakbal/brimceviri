"use client";

// "Tüm Hesaplama Araçları" sayfasının koyu üst alanı: bütün araçlarda arama ve grup kısayolları. Bilim ana sayfası da
// aynı alanı kendi metinleriyle kullanır.
import { useMemo, useState } from "react";
import Link from "@/app/components/SiteLink";

type Arac = { href: string; ad: string; grup: string };
type Grup = { id: string; baslik: string; sayi: number };
/** Bölüme göre değişen metinler (Hesap, Bilim). */
type Metin = { etiket: string; ara: string; ornek: string; yok: string; birim: string };

const HESAP_METNI: Metin = {
  etiket: "hesaplama aracı",
  ara: "Hesaplama aracı ara",
  ornek: "Ne hesaplamak istiyorsunuz? Örn. kdv, boya, klima",
  yok: "Bu aramaya uyan araç bulunamadı.",
  birim: "araç",
};

const sade = (s: string) => s.toLocaleLowerCase("tr").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ı/g, "i");

export default function HesapHubHero({ araclar, gruplar, metin = HESAP_METNI }: { araclar: Arac[]; gruplar: Grup[]; metin?: Metin }) {
  const [soru, setSoru] = useState("");
  const sonuc = useMemo(() => {
    const kelimeler = sade(soru).split(/\s+/).filter(Boolean);
    if (!kelimeler.length) return [];
    return araclar.filter((a) => kelimeler.every((k) => sade(`${a.ad} ${a.grup}`).includes(k))).slice(0, 8);
  }, [soru, araclar]);

  return (
    <section className="timehub-hero hesap-hub-hero" aria-label={metin.ara}>
      <p className="timehub-hero-label">
        {gruplar.reduce((t, g) => t + g.sayi, 0)} {metin.etiket} · {gruplar.length} grup
      </p>
      <div className="hesap-hub-arama">
        <label htmlFor="hesap-hub-ara" className="sr-only">
          {metin.ara}
        </label>
        <input id="hesap-hub-ara" type="search" value={soru} onChange={(e) => setSoru(e.target.value)} placeholder={metin.ornek} autoComplete="off" />
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
          <p className="hesap-hub-yok">{metin.yok}</p>
        )
      ) : null}
      <ul className="timehub-strip hesap-hub-gruplar">
        {gruplar.map((g) => (
          <li key={g.id}>
            <a href={`#${g.id}`}>
              <strong>{g.baslik}</strong>
              <span>{g.sayi}</span>
              <em>{metin.birim}</em>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
