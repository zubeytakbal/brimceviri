// MAC adresi biçimlendirme, çözümleme ve üretme. EUI-48 (IEEE 802).

export type MacSonuc = {
  onaltili: string;
  bicimler: Array<[string, string]>;
  /** I/G biti: 1 ise çok noktaya yayın (grup) adresi */
  cokluYayin: boolean;
  /** U/L biti: 1 ise yerel olarak atanmış (rastgele/sanal) adres */
  yerel: boolean;
  yayin: boolean;
  oui: string;
  eui64: string;
  linkLocal: string;
};

/** Her türlü ayırıcıyla yazılmış MAC'i 12 hane onaltılıya çevirir; geçersizse null. */
export function macTemizle(girdi: string): string | null {
  const s = girdi.trim().toLowerCase();
  const h = s.replace(/[\s:.\-]/g, "");
  if (!/^[0-9a-f]{12}$/.test(h)) return null;
  // Ayırıcı varsa gruplar tutarlı olmalı (aa:bb:… / aa-bb-… / aabb.ccdd.eeff)
  if (
    /[:.\-]/.test(s) &&
    !/^[0-9a-f]{2}([:-])(?:[0-9a-f]{2}\1){4}[0-9a-f]{2}$/.test(s) &&
    !/^[0-9a-f]{4}\.[0-9a-f]{4}\.[0-9a-f]{4}$/.test(s) &&
    !/^[0-9a-f]{6}-[0-9a-f]{6}$/.test(s)
  )
    return null;
  return h;
}

const ikiser = (h: string) => h.match(/../g)!;

export function macCoz(girdi: string): MacSonuc | null {
  const h = macTemizle(girdi);
  if (!h) return null;
  const b = ikiser(h);
  const ilk = parseInt(b[0], 16);
  const buyuk = h.toUpperCase();
  // EUI-64: ortaya FFFE eklenir, U/L biti çevrilir (RFC 4291 Ek A)
  const e = [
    (ilk ^ 2).toString(16).padStart(2, "0"),
    ...b.slice(1, 3),
    "ff",
    "fe",
    ...b.slice(3),
  ];
  const eui64 = [0, 2, 4, 6].map((i) => e[i] + e[i + 1]).join(":");
  const linkLocal = `fe80::${[0, 2, 4, 6]
    .map((i) => parseInt(e[i] + e[i + 1], 16).toString(16))
    .join(":")}`;
  return {
    onaltili: h,
    bicimler: [
      ["İki nokta (Linux, macOS)", ikiser(buyuk).join(":")],
      ["Tire (Windows)", ikiser(buyuk).join("-")],
      ["Cisco", h.match(/..../g)!.join(".")],
      ["Küçük harf", b.join(":")],
      ["Ayırıcısız", buyuk],
      ["Ondalık", BigInt(`0x${h}`).toString()],
    ],
    cokluYayin: (ilk & 1) === 1,
    yerel: (ilk & 2) === 2,
    yayin: h === "ffffffffffff",
    oui: ikiser(buyuk).slice(0, 3).join(":"),
    eui64,
    linkLocal,
  };
}

/** Rastgele, yerel olarak atanmış tek noktaya yayın MAC üretir (ikinci hane 2, 6, A veya E). */
export function rastgeleMac(
  rnd: (n: number) => Uint8Array = (n) =>
    crypto.getRandomValues(new Uint8Array(n)),
) {
  const b = rnd(6);
  b[0] = (b[0] & 0xfc) | 0x02;
  return Array.from(b, (x) =>
    x.toString(16).padStart(2, "0").toUpperCase(),
  ).join(":");
}
