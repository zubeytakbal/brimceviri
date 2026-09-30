// IPv4 / IPv6 ayrıştırma, alt ağ (CIDR) hesaplama ve adres sınıflandırma. Tamamen yerel hesap.

export type Ipv4Sonuc = {
  adres: string;
  onek: number;
  maske: string;
  wildcard: string;
  ag: string;
  yayin: string;
  ilk: string;
  son: string;
  toplam: number;
  kullanilabilir: number;
  sinif: string;
  tur: string;
  ikiliAdres: string;
  ikiliMaske: string;
};

/** "192.168.1.10" → 32 bit işaretsiz tam sayı; geçersizse null. */
export function ipv4Sayi(s: string): number | null {
  const p = s.trim().split(".");
  if (p.length !== 4) return null;
  let n = 0;
  for (const x of p) {
    if (!/^\d{1,3}$/.test(x)) return null;
    const v = Number(x);
    if (v > 255) return null;
    n = n * 256 + v;
  }
  return n;
}

export const ipv4Metin = (n: number) =>
  [n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");

const maskeSayi = (onek: number) =>
  onek === 0 ? 0 : (0xffffffff << (32 - onek)) >>> 0;

/** Noktalı maskeyi (255.255.255.0) önek uzunluğuna çevirir; bitişik değilse null. */
export function maskeOnek(maske: string): number | null {
  const n = ipv4Sayi(maske);
  if (n === null) return null;
  const b = n.toString(2).padStart(32, "0");
  if (!/^1*0*$/.test(b)) return null;
  return b.indexOf("0") === -1 ? 32 : b.indexOf("0");
}

/** "10.0.0.5/24", "10.0.0.5 255.255.255.0" veya yalnız adres (varsayılan /24 değil, sınıfa göre değil: /32). */
export function ipv4Ayristir(
  girdi: string,
): { adres: number; onek: number } | null {
  const s = girdi.trim().replace(/\s+/g, " ");
  const m = /^([\d.]+)\s*(?:\/\s*(\d{1,2})|\s([\d.]+))?$/.exec(s);
  if (!m) return null;
  const adres = ipv4Sayi(m[1]);
  if (adres === null) return null;
  let onek = 32;
  if (m[2] !== undefined) {
    onek = Number(m[2]);
    if (onek > 32) return null;
  } else if (m[3] !== undefined) {
    const o = maskeOnek(m[3]);
    if (o === null) return null;
    onek = o;
  }
  return { adres, onek };
}

const ikili8 = (n: number) =>
  [n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255]
    .map((x) => x.toString(2).padStart(8, "0"))
    .join(".");

type Aralik = [number, number, string];
const r4 = (cidr: string, ad: string): Aralik => {
  const [a, o] = cidr.split("/");
  const n = ipv4Sayi(a)!;
  const k = Number(o);
  const m = maskeSayi(k);
  return [(n & m) >>> 0, ((n & m) | (~m >>> 0)) >>> 0, ad];
};

/** IANA özel amaçlı IPv4 adres blokları (RFC 6890 ve ilgili RFC'ler). Daha dar olan önce. */
const OZEL4: Aralik[] = [
  r4("0.0.0.0/8", "Bu ağ (kaynak adresi olarak)"),
  r4("10.0.0.0/8", "Özel ağ (RFC 1918)"),
  r4("100.64.0.0/10", "Paylaşımlı adres alanı / CGNAT (RFC 6598)"),
  r4("127.0.0.0/8", "Geri döngü (loopback)"),
  r4("169.254.0.0/16", "Yerel bağlantı (APIPA, link-local)"),
  r4("172.16.0.0/12", "Özel ağ (RFC 1918)"),
  r4("192.0.0.0/24", "IETF protokol atamaları"),
  r4("192.0.2.0/24", "Belgeleme (TEST-NET-1)"),
  r4("192.88.99.0/24", "6to4 aktarma (kullanımdan kalktı)"),
  r4("192.168.0.0/16", "Özel ağ (RFC 1918)"),
  r4("198.18.0.0/15", "Ağ performans testi"),
  r4("198.51.100.0/24", "Belgeleme (TEST-NET-2)"),
  r4("203.0.113.0/24", "Belgeleme (TEST-NET-3)"),
  r4("224.0.0.0/4", "Çok noktaya yayın (multicast)"),
  r4("255.255.255.255/32", "Sınırlı yayın (broadcast)"),
  r4("240.0.0.0/4", "Gelecek kullanım için ayrılmış"),
];

export function ipv4Tur(n: number): string {
  for (const [a, b, ad] of OZEL4) if (n >= a && n <= b) return ad;
  return "Genel (internette yönlendirilebilir)";
}

export function ipv4Sinif(n: number): string {
  const o = n >>> 24;
  if (o < 128) return "A";
  if (o < 192) return "B";
  if (o < 224) return "C";
  if (o < 240) return "D (multicast)";
  return "E (deneysel)";
}

export function ipv4Hesapla(adres: number, onek: number): Ipv4Sonuc {
  const m = maskeSayi(onek);
  const ag = (adres & m) >>> 0;
  const yayin = (ag | (~m >>> 0)) >>> 0;
  const toplam = 2 ** (32 - onek);
  // /31 (RFC 3021) ve /32'de ağ ve yayın adresi ayrılmaz
  const kullanilabilir = onek >= 31 ? toplam : Math.max(0, toplam - 2);
  return {
    adres: ipv4Metin(adres),
    onek,
    maske: ipv4Metin(m),
    wildcard: ipv4Metin(~m >>> 0),
    ag: ipv4Metin(ag),
    yayin: ipv4Metin(yayin),
    ilk: ipv4Metin(onek >= 31 ? ag : ag + 1),
    son: ipv4Metin(onek >= 31 ? yayin : yayin - 1),
    toplam,
    kullanilabilir,
    sinif: ipv4Sinif(adres),
    tur: ipv4Tur(adres),
    ikiliAdres: ikili8(adres),
    ikiliMaske: ikili8(m),
  };
}

/** Ağı eşit alt ağlara böler (yeni önek uzunluğuyla). En fazla `sinir` satır döner. */
export function altAglar(
  adres: number,
  onek: number,
  yeniOnek: number,
  sinir = 256,
): { liste: Ipv4Sonuc[]; toplam: number } {
  if (yeniOnek < onek || yeniOnek > 32) return { liste: [], toplam: 0 };
  const ag = (adres & maskeSayi(onek)) >>> 0;
  const adet = 2 ** (yeniOnek - onek);
  const boy = 2 ** (32 - yeniOnek);
  const liste: Ipv4Sonuc[] = [];
  for (let i = 0; i < Math.min(adet, sinir); i++)
    liste.push(ipv4Hesapla(ag + i * boy, yeniOnek));
  return { liste, toplam: adet };
}

/** Gereken host sayısı için en küçük alt ağ öneki. */
export function hosttanOnek(host: number): number | null {
  if (!Number.isFinite(host) || host < 1) return null;
  if (host === 1) return 32;
  if (host === 2) return 31;
  for (let o = 30; o >= 0; o--) if (2 ** (32 - o) - 2 >= host) return o;
  return null;
}

// ------------------------------------------------------------------ IPv6

/** IPv6 metnini 128 bit BigInt'e çevirir (gömülü IPv4 ve bölge kimliği desteklenir). */
export function ipv6Sayi(girdi: string): bigint | null {
  let s = girdi
    .trim()
    .toLowerCase()
    .replace(/^\[|\]$/g, "");
  s = s.replace(/%.+$/, "");
  if (!s || /[^0-9a-f:.]/.test(s)) return null;
  // sondaki gömülü IPv4
  const v4 = /(\d+\.\d+\.\d+\.\d+)$/.exec(s);
  if (v4) {
    const n = ipv4Sayi(v4[1]);
    if (n === null) return null;
    s =
      s.slice(0, -v4[1].length) +
      `${(n >>> 16).toString(16)}:${(n & 0xffff).toString(16)}`;
  }
  const ciftler = s.split("::");
  if (ciftler.length > 2) return null;
  const bol = (x: string) => (x ? x.split(":") : []);
  const bas = bol(ciftler[0]);
  const son = ciftler.length === 2 ? bol(ciftler[1]) : [];
  const eksik = 8 - bas.length - son.length;
  if (ciftler.length === 2 ? eksik < 1 : eksik !== 0) return null;
  const gruplar = [...bas, ...Array(Math.max(0, eksik)).fill("0"), ...son];
  if (gruplar.length !== 8) return null;
  let n = BigInt(0);
  for (const g of gruplar) {
    if (!/^[0-9a-f]{1,4}$/.test(g)) return null;
    n = (n << BigInt(16)) | BigInt(parseInt(g, 16));
  }
  return n;
}

const gruplar6 = (n: bigint) =>
  Array.from({ length: 8 }, (_, i) =>
    Number((n >> BigInt((7 - i) * 16)) & BigInt(0xffff)),
  );

/** Açık yazım: 2001:0db8:0000:… */
export const ipv6Acik = (n: bigint) =>
  gruplar6(n)
    .map((g) => g.toString(16).padStart(4, "0"))
    .join(":");

/** RFC 5952 kısaltılmış yazım. */
export function ipv6Kisa(n: bigint): string {
  const g = gruplar6(n);
  // en uzun (≥2) sıfır dizisini bul; eşitlikte ilki
  let enBas = -1;
  let enUz = 0;
  for (let i = 0; i < 8; ) {
    if (g[i] !== 0) {
      i++;
      continue;
    }
    let j = i;
    while (j < 8 && g[j] === 0) j++;
    if (j - i > enUz && j - i >= 2) {
      enBas = i;
      enUz = j - i;
    }
    i = j;
  }
  const h = g.map((x) => x.toString(16));
  if (enBas < 0) return h.join(":");
  const sol = h.slice(0, enBas).join(":");
  const sag = h.slice(enBas + enUz).join(":");
  return `${sol}::${sag}`;
}

type Aralik6 = [bigint, number, string];
const r6 = (cidr: string, ad: string): Aralik6 => {
  const [a, o] = cidr.split("/");
  return [ipv6Sayi(a)!, Number(o), ad];
};
const maske6 = (onek: number) =>
  onek === 0
    ? BigInt(0)
    : ((BigInt(1) << BigInt(128)) - BigInt(1)) ^
      ((BigInt(1) << BigInt(128 - onek)) - BigInt(1));

/** IANA IPv6 özel amaçlı blokları; daha dar olan önce. */
const OZEL6: Aralik6[] = [
  r6("::/128", "Belirtilmemiş adres"),
  r6("::1/128", "Geri döngü (loopback)"),
  r6("::ffff:0:0/96", "IPv4 eşlemeli adres"),
  r6("64:ff9b::/96", "IPv4-IPv6 çevirisi (NAT64)"),
  r6("100::/64", "Atılacak trafik (discard)"),
  r6("2001::/32", "Teredo tüneli"),
  r6("2001:db8::/32", "Belgeleme"),
  r6("2002::/16", "6to4"),
  r6("fc00::/7", "Benzersiz yerel adres (ULA, özel ağ)"),
  r6("fe80::/10", "Yerel bağlantı (link-local)"),
  r6("ff00::/8", "Çok noktaya yayın (multicast)"),
  r6("2000::/3", "Genel tek noktaya yayın (global unicast)"),
];

export function ipv6Tur(n: bigint): string {
  for (const [a, o, ad] of OZEL6) {
    const m = maske6(o);
    if ((n & m) === (a & m)) return ad;
  }
  return "Ayrılmış / atanmamış";
}

export type Ipv6Sonuc = {
  kisa: string;
  acik: string;
  onek: number;
  ag: string;
  ilk: string;
  son: string;
  /** Adres sayısı (2^(128-önek)) metin olarak */
  toplam: string;
  /** /64 alt ağ sayısı (önek ≤ 64 ise) */
  altAg64?: string;
  tur: string;
  ptr: string;
};

export function ipv6Ayristir(
  girdi: string,
): { adres: bigint; onek: number } | null {
  const [a, o] = girdi.trim().split("/");
  const adres = ipv6Sayi(a);
  if (adres === null) return null;
  const onek = o === undefined ? 128 : Number(o);
  if (!Number.isInteger(onek) || onek < 0 || onek > 128) return null;
  return { adres, onek };
}

const binlik = (n: bigint) =>
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export function ipv6Hesapla(adres: bigint, onek: number): Ipv6Sonuc {
  const m = maske6(onek);
  const ag = adres & m;
  const son = ag | (((BigInt(1) << BigInt(128)) - BigInt(1)) ^ m);
  const toplam = BigInt(1) << BigInt(128 - onek);
  const acik = ipv6Acik(adres);
  return {
    kisa: ipv6Kisa(adres),
    acik,
    onek,
    ag: `${ipv6Kisa(ag)}/${onek}`,
    ilk: ipv6Kisa(ag),
    son: ipv6Kisa(son),
    toplam: onek >= 64 ? binlik(toplam) : `2^${128 - onek}`,
    altAg64: onek <= 64 ? binlik(BigInt(1) << BigInt(64 - onek)) : undefined,
    tur: ipv6Tur(adres),
    ptr: `${acik.replace(/:/g, "").split("").reverse().join(".")}.ip6.arpa`,
  };
}

// ------------------------------------------------------------------ dönüştürücü

export type Ipv4Bicimler = {
  noktali: string;
  ondalik: string;
  onaltili: string;
  ikili: string;
  sekizli: string;
  ipv6Esleme: string;
  ptr: string;
  tur: string;
  sinif: string;
};

/** IPv4 adresini farklı yazımlara çevirir. Girdi noktalı, ondalık, 0x onaltılı veya ikili olabilir. */
export function ipv4Bicimler(girdi: string): Ipv4Bicimler | null {
  const s = girdi.trim().replace(/\s+/g, "");
  let n: number | null = null;
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(s)) n = ipv4Sayi(s);
  else if (/^0x[0-9a-f]{1,8}$/i.test(s)) n = parseInt(s.slice(2), 16);
  else if (/^[01]{8}(\.?[01]{8}){3}$/.test(s))
    n = parseInt(s.replace(/\./g, ""), 2);
  else if (/^\d{1,10}$/.test(s)) {
    const v = Number(s);
    if (v <= 0xffffffff) n = v;
  }
  if (n === null) return null;
  const o = [n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255];
  return {
    noktali: o.join("."),
    ondalik: String(n),
    onaltili: `0x${n.toString(16).toUpperCase().padStart(8, "0")}`,
    ikili: ikili8(n),
    sekizli: o.map((x) => `0${x.toString(8)}`).join("."),
    ipv6Esleme: `::ffff:${o.join(".")}`,
    ptr: `${[...o].reverse().join(".")}.in-addr.arpa`,
    tur: ipv4Tur(n),
    sinif: ipv4Sinif(n),
  };
}
