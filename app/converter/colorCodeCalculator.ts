export type RgbColor = { r: number; g: number; b: number };
export type HslColor = { h: number; s: number; l: number };

export function normalizeHex(input: string): string | null {
  let hex = input.trim().replace(/^#/, "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  if (!/^[0-9a-fA-F]{6}$/.test(hex)) {
    return null;
  }

  return `#${hex.toLowerCase()}`;
}

export function hexToRgb(input: string): RgbColor | null {
  const normalized = normalizeHex(input);

  if (!normalized) {
    return null;
  }

  const intValue = parseInt(normalized.slice(1), 16);

  return {
    r: (intValue >> 16) & 255,
    g: (intValue >> 8) & 255,
    b: intValue & 255,
  };
}

export function rgbToHex({ r, g, b }: RgbColor): string {
  const clamp = (value: number) => Math.max(0, Math.min(255, Math.round(value)));

  return `#${[clamp(r), clamp(g), clamp(b)]
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("")}`;
}

export function parseRgbInput(input: string): RgbColor | null {
  const numbers = input.match(/-?\d+(\.\d+)?/g);

  if (!numbers || numbers.length < 3) {
    return null;
  }

  const [r, g, b] = numbers.map(Number);

  if ([r, g, b].some((value) => !Number.isFinite(value) || value < 0 || value > 255)) {
    return null;
  }

  return { r, g, b };
}

export function rgbToHsl({ r, g, b }: RgbColor): HslColor {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;

  if (max === min) {
    return { h: 0, s: 0, l: Math.round(l * 100) };
  }

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h: number;
  if (max === rn) {
    h = (gn - bn) / d + (gn < bn ? 6 : 0);
  } else if (max === gn) {
    h = (bn - rn) / d + 2;
  } else {
    h = (rn - gn) / d + 4;
  }

  h *= 60;

  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function parseHslInput(input: string): HslColor | null {
  const numbers = input.match(/-?\d+(\.\d+)?/g);

  if (!numbers || numbers.length < 3) {
    return null;
  }

  const [h, s, l] = numbers.map(Number);

  if (
    !Number.isFinite(h) ||
    !Number.isFinite(s) ||
    !Number.isFinite(l) ||
    s < 0 ||
    s > 100 ||
    l < 0 ||
    l > 100
  ) {
    return null;
  }

  return { h: ((h % 360) + 360) % 360, s, l };
}

export function hslToRgb({ h, s, l }: HslColor): RgbColor {
  const sn = s / 100;
  const ln = l / 100;

  if (sn === 0) {
    const value = Math.round(ln * 255);
    return { r: value, g: value, b: value };
  }

  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
  const p = 2 * ln - q;

  const hueToRgb = (t: number) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };

  const hn = h / 360;

  return {
    r: Math.round(hueToRgb(hn + 1 / 3) * 255),
    g: Math.round(hueToRgb(hn) * 255),
    b: Math.round(hueToRgb(hn - 1 / 3) * 255),
  };
}
