"use client";

import { useState } from "react";

const GORSEL = (x: File) =>
  x.type.startsWith("image/") ||
  /\.(jpe?g|jfif|png|webp|gif|bmp|avif|heic|heif)$/i.test(x.name);
const PDF = (x: File) => x.type === "application/pdf" || /\.pdf$/i.test(x.name);

/** Sürükle-bırak destekli dosya seçme alanı (görsel veya PDF). */
export default function DosyaBirak({
  baslik,
  tur = "gorsel",
  accept = tur === "pdf" ? "application/pdf,.pdf" : "image/*,.heic,.heif",
  max,
  coklu = true,
  onSec,
}: {
  baslik: string;
  tur?: "gorsel" | "pdf";
  accept?: string;
  max: number;
  coklu?: boolean;
  onSec: (dosyalar: File[]) => void;
}) {
  const [surukle, setSurukle] = useState(false);
  const sec = (liste: FileList | null) => {
    const d = [...(liste ?? [])].filter(tur === "pdf" ? PDF : GORSEL);
    if (d.length) onSec(d.slice(0, max));
  };
  return (
    <label
      className={`gorsel-birak${surukle ? " is-drag" : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setSurukle(true);
      }}
      onDragLeave={() => setSurukle(false)}
      onDrop={(e) => {
        e.preventDefault();
        setSurukle(false);
        sec(e.dataTransfer.files);
      }}
    >
      <input
        type="file"
        multiple={coklu}
        accept={accept}
        onChange={(e) => {
          sec(e.target.files);
          e.target.value = "";
        }}
      />
      <strong>{baslik}</strong>
      <span>
        veya buraya sürükleyip bırakın{coklu ? ` · en fazla ${max} dosya` : ""}
      </span>
      <small>
        🔒 Dosyalarınız bilgisayarınızdan çıkmaz; işlem tarayıcınızda yapılır.
      </small>
    </label>
  );
}
