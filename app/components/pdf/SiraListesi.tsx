"use client";

import type { ReactNode } from "react";

/** Yukarı/aşağı taşınabilir, silinebilir dosya listesi (birleştirme ve görselden PDF sırası için). */
export default function SiraListesi<T extends { id: number }>({
  ogeler,
  onDegis,
  ad,
  bilgi,
}: {
  ogeler: T[];
  onDegis: (liste: T[]) => void;
  ad: (o: T) => string;
  bilgi?: (o: T) => ReactNode;
}) {
  const tasi = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= ogeler.length) return;
    const l = [...ogeler];
    [l[i], l[j]] = [l[j], l[i]];
    onDegis(l);
  };
  return (
    <ol className="sira-liste">
      {ogeler.map((o, i) => (
        <li key={o.id}>
          <span className="sira-no">{i + 1}</span>
          <span className="gorsel-ad" title={ad(o)}>
            {ad(o)}
          </span>
          {bilgi ? <span className="gorsel-boyut">{bilgi(o)}</span> : null}
          <span className="sira-dugmeler">
            <button
              type="button"
              onClick={() => tasi(i, -1)}
              disabled={i === 0}
              aria-label={`${ad(o)} yukarı taşı`}
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => tasi(i, 1)}
              disabled={i === ogeler.length - 1}
              aria-label={`${ad(o)} aşağı taşı`}
            >
              ↓
            </button>
            <button
              type="button"
              onClick={() => onDegis(ogeler.filter((x) => x.id !== o.id))}
              aria-label={`${ad(o)} kaldır`}
            >
              ×
            </button>
          </span>
        </li>
      ))}
    </ol>
  );
}
