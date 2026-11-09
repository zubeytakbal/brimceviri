"use client";

// Ana sayfanin hizli ceviricisi. Birim kayit dosyasini yuklemez; kategoriler sunucudan kucuk bir veri olarak gelir.
import { useId, useState } from "react";
import Link from "@/app/components/SiteLink";
import { birimCevir } from "../../converter/hizliCevir";
import type { HizliBirim, HizliKategori } from "../../converter/hizliCevirmeVeri";
import { formatSayi, sayiOku } from "./sayi";

export type HizliSecenek = { kategori: HizliKategori; href: string; kaynak: string; hedef: string };

const birimAdi = (b: HizliBirim) => `${b.n} (${b.d ?? b.s})`;

export default function HizliCevirici({ secenekler }: { secenekler: HizliSecenek[] }) {
  const kok = useId();
  const [sira, setSira] = useState(0);
  const [metin, setMetin] = useState("1");
  const [kaynak, setKaynak] = useState(secenekler[0].kaynak);
  const [hedef, setHedef] = useState(secenekler[0].hedef);
  const { kategori, href } = secenekler[sira];
  const bul = (s: string) => kategori.birimler.find((b) => b.s === s) ?? kategori.birimler[0];
  const deger = sayiOku(metin);
  const sonuc = deger === null ? "" : formatSayi(birimCevir(kategori, deger, bul(kaynak), bul(hedef)));

  function kategoriSec(yeni: number) {
    setSira(yeni);
    setKaynak(secenekler[yeni].kaynak);
    setHedef(secenekler[yeni].hedef);
  }

  const birimSecimi = (deger: string, degistir: (v: string) => void, etiket: string) => (
    <select aria-label={etiket} value={deger} onChange={(e) => degistir(e.target.value)}>
      {kategori.birimler.map((b) => (
        <option key={b.s} value={b.s}>
          {birimAdi(b)}
        </option>
      ))}
    </select>
  );

  return (
    <section className="yy-hizli" aria-labelledby={`${kok}-baslik`}>
      <h2 id={`${kok}-baslik`}>Hızlı çevirme</h2>
      <div className="yy-hizli-satir">
        <select
          className="yy-hizli-kategori"
          aria-label="Kategori"
          value={sira}
          onChange={(e) => kategoriSec(Number(e.target.value))}
        >
          {secenekler.map((s, i) => (
            <option key={s.kategori.key} value={i}>
              {s.kategori.ad}
            </option>
          ))}
        </select>
        <input
          aria-label="Değer"
          inputMode="decimal"
          autoComplete="off"
          value={metin}
          onChange={(e) => setMetin(e.target.value)}
          onFocus={(e) => e.currentTarget.select()}
        />
        {birimSecimi(kaynak, setKaynak, "Kaynak birim")}
        <button
          type="button"
          aria-label="Birimleri değiştir"
          onClick={() => {
            setKaynak(hedef);
            setHedef(kaynak);
          }}
        >
          ⇄
        </button>
        <output aria-live="polite">{sonuc || "—"}</output>
        {birimSecimi(hedef, setHedef, "Hedef birim")}
      </div>
      <p className="yy-hizli-alt">
        <Link href={href}>{kategori.ad} çeviricisinde bütün birimleri gör</Link>
      </p>
    </section>
  );
}
