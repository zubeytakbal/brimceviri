"use client";

import { useState } from "react";

const GORSEL = (x: File) =>
  x.type.startsWith("image/") ||
  /\.(jpe?g|jfif|png|webp|gif|bmp|avif|heic|heif|tiff?|svg|ico)$/i.test(x.name);
const PDF = (x: File) => x.type === "application/pdf" || /\.pdf$/i.test(x.name);
const SES = (x: File) =>
  x.type.startsWith("audio/") ||
  x.type.startsWith("video/") ||
  /\.(mp3|wav|m4a|aac|ogg|oga|opus|flac|wma|amr|weba|mp4|m4v|mov|webm|mkv|3gp)$/i.test(
    x.name,
  );
const VIDEO = (x: File) =>
  x.type.startsWith("video/") ||
  /\.(mp4|m4v|mov|webm|mkv|3gp|avi)$/i.test(x.name);
const HEPSI = () => true;
const SUZGEC = {
  gorsel: GORSEL,
  pdf: PDF,
  ses: SES,
  video: VIDEO,
  belge: HEPSI,
};
const KABUL = {
  gorsel: "image/*,.heic,.heif,.tif,.tiff,.svg,.jfif",
  pdf: "application/pdf,.pdf",
  ses: "audio/*,video/*,.opus,.m4a,.flac,.amr,.mkv",
  video: "video/*,.mov,.mkv,.m4v",
  belge: "",
};

/** Sürükle-bırak destekli dosya seçme alanı (görsel, PDF veya ses/video). */
export default function DosyaBirak({
  baslik,
  tur = "gorsel",
  accept = KABUL[tur],
  max,
  coklu = true,
  onSec,
}: {
  baslik: string;
  tur?: "gorsel" | "pdf" | "ses" | "video" | "belge";
  accept?: string;
  max: number;
  coklu?: boolean;
  onSec: (dosyalar: File[]) => void;
}) {
  const [surukle, setSurukle] = useState(false);
  const sec = (liste: FileList | null) => {
    const d = [...(liste ?? [])].filter(SUZGEC[tur]);
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
        accept={accept || undefined}
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
