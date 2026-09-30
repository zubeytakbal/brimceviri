// QR kod içerikleri: Wi-Fi, kartvizit (vCard), e-posta, SMS, WhatsApp, konum gibi standart biçimler.

/** Wi-Fi QR alanlarında \ ; , : " karakterleri kaçışlanır. */
const wifiKac = (s: string) => s.replace(/([\;,:"])/g, "\\$1");
/** vCard alanlarında \ , ; ve satır sonu kaçışlanır. */
const vcKac = (s: string) =>
  s
    .replace(/\\/g, "\\\\")
    .replace(/([,;])/g, "\\$1")
    .replace(/\r?\n/g, "\\n");

export type WifiGuvenlik = "WPA" | "WEP" | "nopass";

export function wifiQr(
  ssid: string,
  sifre: string,
  guvenlik: WifiGuvenlik,
  gizli = false,
) {
  return `WIFI:T:${guvenlik};S:${wifiKac(ssid)};${guvenlik !== "nopass" ? `P:${wifiKac(sifre)};` : ""}${gizli ? "H:true;" : ""};`;
}

export type Kartvizit = {
  ad: string;
  soyad: string;
  kurum?: string;
  unvan?: string;
  telefon?: string;
  eposta?: string;
  web?: string;
  adres?: string;
};

export function vcardQr(k: Kartvizit) {
  const satirlar = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${vcKac(k.soyad)};${vcKac(k.ad)};;;`,
    `FN:${vcKac(`${k.ad} ${k.soyad}`.trim())}`,
    k.kurum && `ORG:${vcKac(k.kurum)}`,
    k.unvan && `TITLE:${vcKac(k.unvan)}`,
    k.telefon && `TEL;TYPE=CELL:${k.telefon.replace(/[^\d+]/g, "")}`,
    k.eposta && `EMAIL:${k.eposta.trim()}`,
    k.web && `URL:${k.web.trim()}`,
    k.adres && `ADR;TYPE=WORK:;;${vcKac(k.adres)};;;;`,
    "END:VCARD",
  ];
  return satirlar.filter(Boolean).join("\n");
}

export function epostaQr(adres: string, konu = "", metin = "") {
  const p = new URLSearchParams();
  if (konu) p.set("subject", konu);
  if (metin) p.set("body", metin);
  const q = p.toString().replace(/\+/g, "%20");
  return `mailto:${adres.trim()}${q ? `?${q}` : ""}`;
}

/** Türkiye numaralarını uluslararası biçime getirir: 0532… → +90532…; 532… → +90532… */
export function telefonNormal(t: string) {
  const r = t.replace(/[^\d+]/g, "");
  if (r.startsWith("+")) return r;
  if (r.startsWith("00")) return `+${r.slice(2)}`;
  if (r.startsWith("90") && r.length === 12) return `+${r}`;
  if (r.startsWith("0") && r.length === 11) return `+90${r.slice(1)}`;
  if (r.length === 10 && r.startsWith("5")) return `+90${r}`;
  return r;
}

export const telefonQr = (t: string) => `tel:${telefonNormal(t)}`;
export const smsQr = (t: string, mesaj = "") =>
  `SMSTO:${telefonNormal(t)}:${mesaj}`;
export const whatsappQr = (t: string, mesaj = "") =>
  `https://wa.me/${telefonNormal(t).replace("+", "")}${mesaj ? `?text=${encodeURIComponent(mesaj)}` : ""}`;
export const konumQr = (enlem: number, boylam: number) =>
  `geo:${enlem},${boylam}`;

/** Okunan QR içeriğinin türünü ve okunur alanlarını çıkarır. */
export function qrCoz(m: string): {
  tur: string;
  alanlar: Array<[string, string]>;
} {
  if (/^WIFI:/i.test(m)) {
    const al = (k: string) =>
      m
        .match(new RegExp(`[:;]${k}:((?:\\\\.|[^;])*)`))?.[1]
        ?.replace(/\\(.)/g, "$1") ?? "";
    return {
      tur: "Wi-Fi ağı",
      alanlar: [
        ["Ağ adı (SSID)", al("S")],
        ["Şifre", al("P")],
        ["Güvenlik", al("T") || "Açık"],
      ],
    };
  }
  if (/^BEGIN:VCARD/i.test(m)) {
    const al = (k: string) =>
      m
        .match(new RegExp(`^${k}(?:;[^:\\n]*)?:(.*)$`, "mi"))?.[1]
        ?.replace(/\\(.)/g, "$1")
        .trim() ?? "";
    return {
      tur: "Kartvizit",
      alanlar: (
        [
          ["Ad", al("FN")],
          ["Kurum", al("ORG")],
          ["Telefon", al("TEL")],
          ["E-posta", al("EMAIL")],
          ["Web", al("URL")],
        ] as Array<[string, string]>
      ).filter(([, v]) => v),
    };
  }
  if (/^mailto:/i.test(m))
    return { tur: "E-posta", alanlar: [["Adres", m.slice(7).split("?")[0]]] };
  if (/^tel:/i.test(m))
    return { tur: "Telefon", alanlar: [["Numara", m.slice(4)]] };
  if (/^SMSTO:/i.test(m)) {
    const [, no, ...msj] = m.split(":");
    return {
      tur: "SMS",
      alanlar: [
        ["Numara", no],
        ["Mesaj", msj.join(":")],
      ],
    };
  }
  if (/^geo:/i.test(m))
    return { tur: "Konum", alanlar: [["Koordinat", m.slice(4)]] };
  if (/^https?:\/\//i.test(m))
    return { tur: "Bağlantı", alanlar: [["Adres", m]] };
  return { tur: "Metin", alanlar: [] };
}
