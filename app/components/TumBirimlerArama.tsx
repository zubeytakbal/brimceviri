"use client";

// Tüm birimler sayfasının arama kutusu ve kategori listesi. Liste sunucuda tam hâliyle derlenir; arama yalnızca
// eşleşmeyen kategorileri gizler ve eşleşen dönüşüm sayfalarını (ör. "inç cm" → İnç → Santimetre) üstte gösterir.
import { useState } from "react";
import Link from "@/app/components/SiteLink";
import { aramaMetni } from "../converter/aramaMetni";

export type AramaOgesi = { href: string; title: string; description: string; pairs: Array<{ href: string; label: string }>; keys: string };
export type AramaGrubu = { id: string; title: string; items: AramaOgesi[] };
export type AramaCifti = { href: string; label: string; keys: string };

const eslesir = (metin: string, kelimeler: string[]) => kelimeler.every((k) => metin.includes(k));

export default function TumBirimlerArama({ groups, pairs }: { groups: AramaGrubu[]; pairs: AramaCifti[] }) {
  const [q, setQ] = useState("");
  const kelimeler = aramaMetni(q).split(" ").filter(Boolean);
  const aktif = kelimeler.length > 0;
  const gruplar = groups
    .map((g) => ({ ...g, items: aktif ? g.items.filter((i) => eslesir(i.keys, kelimeler)) : g.items }))
    .filter((g) => g.items.length > 0);
  // Adı aranan kelimeyle başlayan dönüşümler önce (ör. "kalori" → Kalori → Joule).
  const ciftler = aktif
    ? pairs
        .filter((p) => eslesir(p.keys, kelimeler))
        .sort((a, b) => Number(b.keys.startsWith(kelimeler[0])) - Number(a.keys.startsWith(kelimeler[0])))
        .slice(0, 12)
    : [];
  const toplam = gruplar.reduce((n, g) => n + g.items.length, 0);

  return (
    <>
      <form className="tum-birimler-arama" role="search" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="tum-birimler-q">Birim ya da dönüşüm ara</label>
        <input
          id="tum-birimler-q"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Örnek: inç cm, psi, dönüm, kalori, ayakkabı"
          autoComplete="off"
        />
        {aktif ? (
          <p aria-live="polite">
            {toplam || ciftler.length ? `${ciftler.length} dönüşüm sayfası, ${toplam} kategori bulundu.` : "Sonuç bulunamadı. Birimin adını ya da simgesini yazmayı deneyin (ör. kg, bar, mil)."}
          </p>
        ) : null}
      </form>

      {ciftler.length ? (
        <div className="tum-birimler-ciftler">
          <h2>Dönüşüm sayfaları</h2>
          <p className="tool-list-pairs">
            {ciftler.map((p) => (
              <Link key={p.href} href={p.href}>
                {p.label}
              </Link>
            ))}
          </p>
        </div>
      ) : null}

      {gruplar.length ? (
        <div className="section-layout">
          <nav className="section-nav" aria-label="Dönüşüm kategorileri">
            <p className="section-nav-title">Kategoriler</p>
            <ul>
              {gruplar.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`}>
                    {g.title} <span>{g.items.length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="section-main">
            {gruplar.map((g) => (
              <section className="tool-list-section" id={g.id} key={g.id}>
                <h2>{g.title}</h2>
                <ul className="tool-list">
                  {g.items.map((c) => (
                    <li key={c.href}>
                      <Link href={c.href} className="tool-list-title">
                        {c.title}
                      </Link>
                      <p>{c.description}</p>
                      {c.pairs.length > 0 && (
                        <p className="tool-list-pairs">
                          {c.pairs.map((pair) => (
                            <Link key={pair.href} href={pair.href}>
                              {pair.label}
                            </Link>
                          ))}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
