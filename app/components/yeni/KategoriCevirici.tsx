"use client";

// Kategori ceviricisi: deger kutusu ve iki acik birim listesi (kimden / kime).
// Secilen ciftin ayri sayfasi varsa ona link verilir.
import { useId, useState } from "react";
import Link from "@/app/components/SiteLink";
import { convert } from "../../converter/convert";
import { formatSayi, sayiOku } from "./sayi";

export type KategoriBirimi = { value: string; label: string; symbol: string };

type Props = {
  category: string;
  birimler: KategoriBirimi[];
  varsayilanKaynak: string;
  varsayilanHedef: string;
  /** "kaynak|hedef" -> cift sayfasi adresi */
  ciftSayfalari: Record<string, { href: string; ad: string }>;
};

function Liste({
  etiket,
  birimler,
  secili,
  sec,
}: {
  etiket: string;
  birimler: KategoriBirimi[];
  secili: string;
  sec: (v: string) => void;
}) {
  return (
    <ul className="yy-liste" role="listbox" aria-label={etiket}>
      {birimler.map((b) => (
        <li key={b.value}>
          <button type="button" role="option" aria-selected={b.value === secili} onClick={() => sec(b.value)}>
            {b.label} <span className="yy-sembol">[{b.symbol}]</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default function KategoriCevirici({ category, birimler, varsayilanKaynak, varsayilanHedef, ciftSayfalari }: Props) {
  const [metin, setMetin] = useState("1");
  const [kaynak, setKaynak] = useState(varsayilanKaynak);
  const [hedef, setHedef] = useState(varsayilanHedef);
  const girisId = useId();
  const deger = sayiOku(metin);
  const sonuc = deger === null ? "—" : formatSayi(convert(category, deger, kaynak, hedef));
  const cift = ciftSayfalari[`${kaynak}|${hedef}`];
  const ad = (v: string) => birimler.find((b) => b.value === v)?.label ?? v;

  return (
    <section className="yy-kart" aria-label="Çevirici">
      <div className="yy-kat-cev">
        <div>
          <label className="yy-alan" htmlFor={girisId}>
            Kimden: {ad(kaynak)}
            <input id={girisId} inputMode="decimal" autoComplete="off" value={metin} onChange={(e) => setMetin(e.target.value)} />
          </label>
          <Liste etiket="Kaynak birim" birimler={birimler} secili={kaynak} sec={setKaynak} />
        </div>
        <div>
          <div className="yy-alan">
            Kime: {ad(hedef)}
            <output aria-live="polite">{sonuc}</output>
          </div>
          <Liste etiket="Hedef birim" birimler={birimler} secili={hedef} sec={setHedef} />
        </div>
      </div>
      <div className="yy-cev-alt">
        <span>
          {metin || "—"} {birimler.find((b) => b.value === kaynak)?.symbol} = <strong>{sonuc}</strong>{" "}
          {birimler.find((b) => b.value === hedef)?.symbol}
        </span>
        {cift && (
          <Link href={cift.href} className="yy-sag">
            <strong>{cift.ad} sayfası →</strong>
          </Link>
        )}
      </div>
    </section>
  );
}
