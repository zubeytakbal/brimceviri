// Filigran çizimi (canvas). Yazı veya logo; tek konumda ya da tüm görsele döşenmiş.

export type Konum =
  | "sol-ust"
  | "ust"
  | "sag-ust"
  | "sol"
  | "orta"
  | "sag"
  | "sol-alt"
  | "alt"
  | "sag-alt";

export type FiligranAyar = {
  tur: "yazi" | "logo";
  yazi: string;
  renk: string;
  /** Yazı yüksekliği ya da logo genişliği, görselin kısa kenarına göre yüzde. */
  boyut: number;
  saydamlik: number; // 0–1
  aci: number; // derece
  konum: Konum | "dose";
  kalin: boolean;
  golge: boolean;
};

/** Filigranı verilen tuval bağlamına çizer. `logo` yalnız tür "logo" iken kullanılır. */
export function filigranCiz(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  a: FiligranAyar,
  logo?: ImageBitmap | null,
) {
  const kisa = Math.min(w, h);
  const pay = kisa * 0.03;
  ctx.save();
  ctx.globalAlpha = a.saydamlik;
  let ow: number;
  let oh: number;
  let ciz: (x: number, y: number) => void;

  if (a.tur === "logo" && logo) {
    ow = (kisa * a.boyut) / 100;
    oh = (ow * logo.height) / logo.width;
    ciz = (x, y) => ctx.drawImage(logo, x - ow / 2, y - oh / 2, ow, oh);
  } else {
    const satirlar = (a.yazi || " ").split("\n");
    const fs = Math.max(8, (kisa * a.boyut) / 100);
    ctx.font = `${a.kalin ? "700" : "500"} ${fs}px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = a.renk;
    if (a.golge) {
      ctx.shadowColor = "rgba(0,0,0,0.45)";
      ctx.shadowBlur = fs * 0.15;
      ctx.shadowOffsetX = fs * 0.04;
      ctx.shadowOffsetY = fs * 0.04;
    }
    const satirH = fs * 1.2;
    ow = Math.max(...satirlar.map((s) => ctx.measureText(s).width));
    oh = satirH * satirlar.length;
    ciz = (x, y) =>
      satirlar.forEach((s, i) =>
        ctx.fillText(s, x, y - oh / 2 + satirH * (i + 0.5)),
      );
  }

  const radyan = (a.aci * Math.PI) / 180;
  const tekil = (x: number, y: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(radyan);
    ciz(0, 0);
    ctx.restore();
  };

  if (a.konum === "dose") {
    // Döndürülmüş bir ızgara: köşegeni kaplayacak kadar geniş alan, satırlar kaydırmalı.
    const adimX = ow + kisa * 0.12;
    const adimY = oh + kisa * 0.14;
    const r = Math.hypot(w, h);
    ctx.translate(w / 2, h / 2);
    ctx.rotate(radyan);
    let satir = 0;
    for (let y = -r; y <= r; y += adimY, satir++) {
      const kay = satir % 2 ? adimX / 2 : 0;
      for (let x = -r - kay; x <= r; x += adimX) ciz(x, y);
    }
  } else {
    // Döndürülmüş kutunun sınır kutusuna göre kenar payı.
    const bw =
      Math.abs(ow * Math.cos(radyan)) + Math.abs(oh * Math.sin(radyan));
    const bh =
      Math.abs(ow * Math.sin(radyan)) + Math.abs(oh * Math.cos(radyan));
    const yatay = a.konum.includes("sol")
      ? pay + bw / 2
      : a.konum.includes("sag")
        ? w - pay - bw / 2
        : w / 2;
    const dikey = a.konum.includes("ust")
      ? pay + bh / 2
      : a.konum.includes("alt")
        ? h - pay - bh / 2
        : h / 2;
    tekil(yatay, dikey);
  }
  ctx.restore();
}
