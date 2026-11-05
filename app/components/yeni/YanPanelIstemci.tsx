"use client";

import { useDeferredValue, useId, useState } from "react";
import Link from "@/app/components/SiteLink";

export type PanelGrubu = {
  id: string;
  ad: string;
  acik: boolean;
  ogeler: { ad: string; href: string }[];
};

const sade = (s: string) =>
  s
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

function Gruplar({ gruplar, aktifHref, arama }: { gruplar: PanelGrubu[]; aktifHref?: string; arama: string }) {
  return gruplar.map((g) => {
    const ogeler = arama ? g.ogeler.filter((o) => sade(o.ad).includes(arama)) : g.ogeler;
    if (ogeler.length === 0) return null;
    return (
      // Aramada eslesen gruplar acik gelir; aksi halde yalnizca bulunulan grup acik.
      <details key={arama ? `${g.id}-a` : g.id} open={Boolean(arama) || g.acik}>
        <summary>
          {g.ad} <small>{g.ogeler.length}</small>
        </summary>
        <ul>
          {ogeler.map((o) => (
            <li key={o.href + o.ad}>
              <Link href={o.href} aria-current={o.href === aktifHref ? "page" : undefined}>
                {o.ad}
              </Link>
            </li>
          ))}
        </ul>
      </details>
    );
  });
}

export default function YanPanelIstemci({
  birimler,
  hesaplayicilar,
  aktifHref,
}: {
  birimler: PanelGrubu[];
  hesaplayicilar: PanelGrubu[];
  aktifHref?: string;
}) {
  const [metin, setMetin] = useState("");
  const arama = sade(useDeferredValue(metin).trim());
  const aramaId = useId();
  const sonucVar =
    !arama || [...birimler, ...hesaplayicilar].some((g) => g.ogeler.some((o) => sade(o.ad).includes(arama)));

  return (
    <aside className="yy-panel" aria-label="Tüm çeviriciler ve hesaplayıcılar">
      <div className="yy-panel-bas">
        <p className="yy-hd">Tüm çeviriciler</p>
        <label className="yy-panel-ara" htmlFor={aramaId}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c3cad6" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
          </svg>
          <input
            id={aramaId}
            type="search"
            placeholder="Panelde ara"
            aria-label="Panelde ara"
            value={metin}
            onChange={(e) => setMetin(e.target.value)}
          />
        </label>
      </div>
      <p className="yy-panel-etiket">Birim çeviriciler</p>
      <Gruplar gruplar={birimler} aktifHref={aktifHref} arama={arama} />
      <p className="yy-panel-etiket">Hesaplayıcılar</p>
      <Gruplar gruplar={hesaplayicilar} aktifHref={aktifHref} arama={arama} />
      {!sonucVar && <p className="yy-panel-bos">Eşleşen sayfa yok.</p>}
      <Link href="/hesaplayicilar" className="yy-panel-tumu">
        Tüm araçların listesi →
      </Link>
    </aside>
  );
}
