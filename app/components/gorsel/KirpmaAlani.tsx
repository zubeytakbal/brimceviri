"use client";

import { useRef } from "react";
import {
  kirpmaSinirla,
  type Bolge,
  type Olcu,
} from "../../converter/gorsel/sikistirma";

/**
 * Sabit oranlı kırpma alanı: kutu sürüklenerek taşınır, dışı karartılır.
 * Bölge kaynak görselin piksel koordinatlarındadır.
 */
export default function KirpmaAlani({
  url,
  kaynak,
  bolge,
  onDegis,
  onBitir,
}: {
  url: string;
  kaynak: Olcu;
  bolge: Bolge;
  onDegis: (b: Bolge) => void;
  onBitir: (b: Bolge) => void;
}) {
  const kap = useRef<HTMLDivElement>(null);
  const surukleme = useRef<{ px: number; py: number; b: Bolge } | null>(null);
  const son = useRef(bolge);

  const yuzde = (v: number, t: number) => `${(v / t) * 100}%`;

  const tasi = (e: React.PointerEvent) => {
    const s = surukleme.current;
    const k = kap.current;
    if (!s || !k) return;
    const olcek = kaynak.genislik / k.clientWidth;
    const b = kirpmaSinirla(
      {
        ...s.b,
        x: s.b.x + (e.clientX - s.px) * olcek,
        y: s.b.y + (e.clientY - s.py) * olcek,
      },
      kaynak,
    );
    son.current = b;
    onDegis(b);
  };

  const oklar = (e: React.KeyboardEvent) => {
    const adim = Math.max(1, Math.round(kaynak.genislik / 100));
    const d = {
      ArrowLeft: [-adim, 0],
      ArrowRight: [adim, 0],
      ArrowUp: [0, -adim],
      ArrowDown: [0, adim],
    }[e.key];
    if (!d) return;
    e.preventDefault();
    const b = kirpmaSinirla(
      { ...bolge, x: bolge.x + d[0], y: bolge.y + d[1] },
      kaynak,
    );
    onDegis(b);
    onBitir(b);
  };

  return (
    <div
      className="kirpma-kap"
      ref={kap}
      style={{ aspectRatio: `${kaynak.genislik} / ${kaynak.yukseklik}` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- yerel nesne URL'si, optimize edilemez */}
      <img src={url} alt="" draggable={false} />
      <div
        className="kirpma-kutu"
        role="slider"
        tabIndex={0}
        aria-label="Kırpma alanı: sürükleyin veya ok tuşlarıyla taşıyın"
        aria-valuemin={0}
        aria-valuemax={kaynak.genislik}
        aria-valuenow={bolge.x}
        aria-valuetext={`Sol ${bolge.x}, üst ${bolge.y} piksel`}
        style={{
          left: yuzde(bolge.x, kaynak.genislik),
          top: yuzde(bolge.y, kaynak.yukseklik),
          width: yuzde(bolge.w, kaynak.genislik),
          height: yuzde(bolge.h, kaynak.yukseklik),
        }}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          surukleme.current = { px: e.clientX, py: e.clientY, b: bolge };
          son.current = bolge;
        }}
        onPointerMove={tasi}
        onPointerUp={() => {
          if (surukleme.current) onBitir(son.current);
          surukleme.current = null;
        }}
        onKeyDown={oklar}
      >
        <span className="kirpma-kilavuz" aria-hidden="true" />
      </div>
    </div>
  );
}
