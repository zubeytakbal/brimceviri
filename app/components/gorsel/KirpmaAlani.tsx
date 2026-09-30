"use client";

import { useRef } from "react";
import {
  kirpmaSinirla,
  koseSurukle,
  type Bolge,
  type Kose,
  type Olcu,
} from "../../converter/gorsel/sikistirma";

const KOSELER: Kose[] = ["ku", "kd", "gu", "gd"];

/**
 * Kırpma alanı: kutu sürüklenerek taşınır, dışı karartılır. `tutamac` açıkken köşelerden
 * boyutlandırılır (`oran` verilirse en-boy oranı korunur). Bölge kaynak görselin piksel koordinatlarındadır.
 */
export default function KirpmaAlani({
  url,
  kaynak,
  bolge,
  onDegis,
  onBitir,
  tutamac = false,
  oran = null,
  kilavuz = "yuz",
}: {
  url: string;
  kaynak: Olcu;
  bolge: Bolge;
  onDegis: (b: Bolge) => void;
  onBitir: (b: Bolge) => void;
  tutamac?: boolean;
  oran?: number | null;
  kilavuz?: "yuz" | "ucte-bir";
}) {
  const kap = useRef<HTMLDivElement>(null);
  const surukleme = useRef<{
    px: number;
    py: number;
    b: Bolge;
    kose?: Kose;
  } | null>(null);
  const son = useRef(bolge);

  const yuzde = (v: number, t: number) => `${(v / t) * 100}%`;

  const tasi = (e: React.PointerEvent) => {
    const s = surukleme.current;
    const k = kap.current;
    if (!s || !k) return;
    const olcek = kaynak.genislik / k.clientWidth;
    const dx = (e.clientX - s.px) * olcek;
    const dy = (e.clientY - s.py) * olcek;
    const b = s.kose
      ? koseSurukle(s.b, s.kose, dx, dy, kaynak, oran)
      : kirpmaSinirla({ ...s.b, x: s.b.x + dx, y: s.b.y + dy }, kaynak);
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
      style={{
        aspectRatio: `${kaynak.genislik} / ${kaynak.yukseklik}`,
        width: `min(100%, ${Math.round((520 * kaynak.genislik) / kaynak.yukseklik)}px)`,
      }}
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
          const kose = (e.target as HTMLElement).dataset.kose as
            | Kose
            | undefined;
          surukleme.current = { px: e.clientX, py: e.clientY, b: bolge, kose };
          son.current = bolge;
        }}
        onPointerMove={tasi}
        onPointerUp={() => {
          if (surukleme.current) onBitir(son.current);
          surukleme.current = null;
        }}
        onKeyDown={oklar}
      >
        <span
          className={kilavuz === "yuz" ? "kirpma-kilavuz" : "kirpma-ucte"}
          aria-hidden="true"
        />
        {tutamac
          ? KOSELER.map((k) => (
              <span
                key={k}
                className={`kirpma-tutamac is-${k}`}
                data-kose={k}
                aria-hidden="true"
              />
            ))
          : null}
      </div>
    </div>
  );
}
