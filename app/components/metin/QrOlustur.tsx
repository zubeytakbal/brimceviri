"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  kontrast,
  qrMatris,
  qrSvg,
  type Duzeltme,
} from "../../converter/metin/qr";
import {
  epostaQr,
  konumQr,
  smsQr,
  telefonQr,
  vcardQr,
  whatsappQr,
  wifiQr,
  type WifiGuvenlik,
} from "../../converter/metin/qrIcerik";
import { bitmapAc, indir } from "../gorsel/tuval";

type Tur =
  | "url"
  | "metin"
  | "wifi"
  | "vcard"
  | "eposta"
  | "telefon"
  | "sms"
  | "whatsapp"
  | "konum";

const TURLER: Array<{ id: Tur; ad: string }> = [
  { id: "url", ad: "🔗 Bağlantı" },
  { id: "metin", ad: "Aa Metin" },
  { id: "wifi", ad: "📶 Wi-Fi" },
  { id: "vcard", ad: "👤 Kartvizit" },
  { id: "whatsapp", ad: "💬 WhatsApp" },
  { id: "eposta", ad: "✉️ E-posta" },
  { id: "telefon", ad: "📞 Telefon" },
  { id: "sms", ad: "SMS" },
  { id: "konum", ad: "📍 Konum" },
];

type Alan = {
  ad: string;
  etiket: string;
  tur?: string;
  cok?: boolean;
  yer?: string;
};

const ALANLAR: Record<Tur, Alan[]> = {
  url: [
    { ad: "url", etiket: "Web adresi", tur: "url", yer: "https://ornek.com" },
  ],
  metin: [
    {
      ad: "metin",
      etiket: "Metin",
      cok: true,
      yer: "QR okutulunca görünecek metin",
    },
  ],
  wifi: [
    { ad: "ssid", etiket: "Ağ adı (SSID)", yer: "EvAgim" },
    { ad: "sifre", etiket: "Şifre", yer: "Wi-Fi şifresi" },
  ],
  vcard: [
    { ad: "ad", etiket: "Ad" },
    { ad: "soyad", etiket: "Soyad" },
    { ad: "telefon", etiket: "Telefon", tur: "tel", yer: "0532 123 45 67" },
    { ad: "eposta", etiket: "E-posta", tur: "email" },
    { ad: "kurum", etiket: "Kurum" },
    { ad: "unvan", etiket: "Unvan" },
    { ad: "web", etiket: "Web sitesi", tur: "url" },
    { ad: "adres", etiket: "Adres" },
  ],
  eposta: [
    { ad: "adres", etiket: "E-posta adresi", tur: "email" },
    { ad: "konu", etiket: "Konu" },
    { ad: "govde", etiket: "Mesaj", cok: true },
  ],
  telefon: [
    {
      ad: "tel",
      etiket: "Telefon numarası",
      tur: "tel",
      yer: "0532 123 45 67",
    },
  ],
  sms: [
    { ad: "tel", etiket: "Telefon numarası", tur: "tel" },
    { ad: "mesaj", etiket: "Mesaj", cok: true },
  ],
  whatsapp: [
    {
      ad: "tel",
      etiket: "WhatsApp numarası",
      tur: "tel",
      yer: "0532 123 45 67",
    },
    { ad: "mesaj", etiket: "Hazır mesaj (isteğe bağlı)", cok: true },
  ],
  konum: [
    { ad: "enlem", etiket: "Enlem", yer: "41.0082" },
    { ad: "boylam", etiket: "Boylam", yer: "28.9784" },
  ],
};

/** Bağlantı, Wi-Fi, kartvizit, WhatsApp vb. için QR kod oluşturur; PNG ve SVG indirilir. */
export default function QrOlustur() {
  const [tur, setTur] = useState<Tur>("url");
  const [v, setV] = useState<Record<string, string>>({
    url: "https://birimceviri.app",
  });
  const [guvenlik, setGuvenlik] = useState<WifiGuvenlik>("WPA");
  const [duzeltme, setDuzeltme] = useState<Duzeltme>("M");
  const [renk, setRenk] = useState("#000000");
  const [zemin, setZemin] = useState("#ffffff");
  const [boyut, setBoyut] = useState(1024);
  const [logo, setLogo] = useState<ImageBitmap | null>(null);
  const tuval = useRef<HTMLCanvasElement>(null);

  const al = (k: string) => v[k]?.trim() ?? "";

  const icerik = useMemo(() => {
    switch (tur) {
      case "url": {
        const u = al("url");
        return u && !/^[a-z][\w+.-]*:/i.test(u) ? `https://${u}` : u;
      }
      case "metin":
        return v.metin ?? "";
      case "wifi":
        return al("ssid") ? wifiQr(al("ssid"), v.sifre ?? "", guvenlik) : "";
      case "vcard":
        return al("ad") || al("soyad")
          ? vcardQr({
              ad: al("ad"),
              soyad: al("soyad"),
              telefon: al("telefon"),
              eposta: al("eposta"),
              kurum: al("kurum"),
              unvan: al("unvan"),
              web: al("web"),
              adres: al("adres"),
            })
          : "";
      case "eposta":
        return al("adres")
          ? epostaQr(al("adres"), al("konu"), v.govde ?? "")
          : "";
      case "telefon":
        return al("tel") ? telefonQr(al("tel")) : "";
      case "sms":
        return al("tel") ? smsQr(al("tel"), v.mesaj ?? "") : "";
      case "whatsapp":
        return al("tel") ? whatsappQr(al("tel"), v.mesaj ?? "") : "";
      case "konum": {
        const e = Number(al("enlem").replace(",", "."));
        const b = Number(al("boylam").replace(",", "."));
        return al("enlem") &&
          al("boylam") &&
          Math.abs(e) <= 90 &&
          Math.abs(b) <= 180
          ? konumQr(e, b)
          : "";
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- al() yalnızca v'yi okur
  }, [tur, v, guvenlik]);

  const sonuc = useMemo(() => {
    if (!icerik) return { m: null, hata: "" };
    try {
      return { m: qrMatris(icerik, logo ? "H" : duzeltme), hata: "" };
    } catch (e) {
      return {
        m: null,
        hata: e instanceof Error ? e.message : "QR oluşturulamadı.",
      };
    }
  }, [icerik, duzeltme, logo]);

  // Önizleme ve PNG için tuvale çizim
  useEffect(() => {
    const c = tuval.current;
    const m = sonuc.m;
    if (!c || !m) return;
    const kenar = 4;
    const toplam = m.boyut + kenar * 2;
    const hucre = Math.max(1, Math.floor(boyut / toplam));
    c.width = c.height = hucre * toplam;
    const x = c.getContext("2d")!;
    x.clearRect(0, 0, c.width, c.height);
    if (zemin !== "transparent") {
      x.fillStyle = zemin;
      x.fillRect(0, 0, c.width, c.height);
    }
    x.fillStyle = renk;
    for (let r = 0; r < m.boyut; r++)
      for (let k = 0; k < m.boyut; k++)
        if (m.koyu(r, k))
          x.fillRect((k + kenar) * hucre, (r + kenar) * hucre, hucre, hucre);
    if (logo) {
      // Logo QR alanının en fazla %22'sini kaplar (H düzeltmesi ~%30 kaybı tolere eder).
      const alan = m.boyut * hucre * 0.22;
      const k = alan / Math.max(logo.width, logo.height);
      const w = logo.width * k;
      const h = logo.height * k;
      const cx = c.width / 2;
      const cy = c.height / 2;
      x.fillStyle = zemin === "transparent" ? "#ffffff" : zemin;
      x.fillRect(
        cx - w / 2 - hucre,
        cy - h / 2 - hucre,
        w + 2 * hucre,
        h + 2 * hucre,
      );
      x.drawImage(logo, cx - w / 2, cy - h / 2, w, h);
    }
  }, [sonuc, renk, zemin, boyut, logo]);

  const pngIndir = () =>
    tuval.current?.toBlob((b) => {
      if (!b) return;
      const u = URL.createObjectURL(b);
      indir(u, "qr-kod.png");
      setTimeout(() => URL.revokeObjectURL(u), 5000);
    }, "image/png");

  const svgIndir = () => {
    if (!sonuc.m) return;
    const u = URL.createObjectURL(
      new Blob([qrSvg(sonuc.m, { renk, zemin })], { type: "image/svg+xml" }),
    );
    indir(u, "qr-kod.svg");
    setTimeout(() => URL.revokeObjectURL(u), 5000);
  };

  const oran = zemin === "transparent" ? 21 : kontrast(renk, zemin);

  return (
    <div className="date-calc gorsel-arac qr-arac">
      <div
        className="date-converter-modes is-light qr-turler"
        role="tablist"
        aria-label="QR türü"
      >
        {TURLER.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tur === t.id}
            className={tur === t.id ? "is-active" : undefined}
            onClick={() => setTur(t.id)}
          >
            {t.ad}
          </button>
        ))}
      </div>
      <div className="qr-duzen">
        <div className="date-calc-input">
          <div className="date-calc-fields">
            {ALANLAR[tur].map((a) => (
              <label
                key={a.ad}
                className={`date-calc-field${a.cok ? " qr-genis" : ""}`}
              >
                <span>{a.etiket}</span>
                <span className="date-calc-field-row">
                  {a.cok ? (
                    <textarea
                      rows={3}
                      value={v[a.ad] ?? ""}
                      placeholder={a.yer}
                      onChange={(e) =>
                        setV((s) => ({ ...s, [a.ad]: e.target.value }))
                      }
                    />
                  ) : (
                    <input
                      type={a.tur ?? "text"}
                      value={v[a.ad] ?? ""}
                      placeholder={a.yer}
                      onChange={(e) =>
                        setV((s) => ({ ...s, [a.ad]: e.target.value }))
                      }
                    />
                  )}
                </span>
              </label>
            ))}
            {tur === "wifi" ? (
              <label className="date-calc-field">
                <span>Güvenlik</span>
                <span className="date-calc-field-row">
                  <select
                    value={guvenlik}
                    onChange={(e) =>
                      setGuvenlik(e.target.value as WifiGuvenlik)
                    }
                  >
                    <option value="WPA">WPA/WPA2/WPA3</option>
                    <option value="WEP">WEP (eski)</option>
                    <option value="nopass">Şifresiz</option>
                  </select>
                </span>
              </label>
            ) : null}
          </div>
          <details className="qr-ayarlar">
            <summary>Tasarım ve boyut</summary>
            <div className="date-calc-fields">
              <label className="date-calc-field">
                <span>QR rengi</span>
                <span className="date-calc-field-row">
                  <input
                    type="color"
                    value={renk}
                    onChange={(e) => setRenk(e.target.value)}
                  />
                </span>
              </label>
              <label className="date-calc-field">
                <span>Arka plan</span>
                <span className="date-calc-field-row">
                  <input
                    type="color"
                    value={zemin === "transparent" ? "#ffffff" : zemin}
                    onChange={(e) => setZemin(e.target.value)}
                    disabled={zemin === "transparent"}
                  />
                  <label className="qr-saydam">
                    <input
                      type="checkbox"
                      checked={zemin === "transparent"}
                      onChange={(e) =>
                        setZemin(e.target.checked ? "transparent" : "#ffffff")
                      }
                    />{" "}
                    Saydam
                  </label>
                </span>
              </label>
              <label className="date-calc-field">
                <span>Hata düzeltme</span>
                <span className="date-calc-field-row">
                  <select
                    value={logo ? "H" : duzeltme}
                    disabled={!!logo}
                    onChange={(e) => setDuzeltme(e.target.value as Duzeltme)}
                  >
                    <option value="L">Düşük (%7)</option>
                    <option value="M">Orta (%15)</option>
                    <option value="Q">Yüksek (%25)</option>
                    <option value="H">En yüksek (%30)</option>
                  </select>
                </span>
              </label>
              <label className="date-calc-field">
                <span>PNG boyutu</span>
                <span className="date-calc-field-row">
                  <select
                    value={boyut}
                    onChange={(e) => setBoyut(Number(e.target.value))}
                  >
                    {[256, 512, 1024, 2048].map((b) => (
                      <option key={b} value={b}>
                        {b} px
                      </option>
                    ))}
                  </select>
                </span>
              </label>
              <label className="date-calc-field">
                <span>Ortaya logo (isteğe bağlı)</span>
                <span className="date-calc-field-row">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f)
                        void bitmapAc(f)
                          .then(setLogo)
                          .catch(() => setLogo(null));
                    }}
                  />
                  {logo ? (
                    <button
                      type="button"
                      className="video-an"
                      onClick={() => setLogo(null)}
                    >
                      Kaldır
                    </button>
                  ) : null}
                </span>
              </label>
            </div>
          </details>
        </div>
        <div className="qr-onizleme">
          {sonuc.m ? (
            <>
              <canvas ref={tuval} aria-label="QR kod önizlemesi" />
              <div className="qr-dugmeler">
                <button
                  type="button"
                  className="time-tool-button"
                  onClick={pngIndir}
                >
                  PNG indir
                </button>
                <button
                  type="button"
                  className="time-tool-button is-secondary"
                  onClick={svgIndir}
                >
                  SVG indir
                </button>
              </div>
              {oran < 4 ? (
                <p className="video-uyari">
                  Renkler arasındaki kontrast düşük; bazı telefonlar QR&apos;ı
                  okuyamayabilir. Koyu renkli QR, açık renkli zemin kullanın.
                </p>
              ) : null}
            </>
          ) : (
            <p className="gorsel-durum">
              {sonuc.hata || "Bilgileri girin, QR kod burada oluşur."}
            </p>
          )}
        </div>
      </div>
      <p className="date-calc-note">
        QR kod tarayıcınızda oluşturulur; girdiğiniz Wi-Fi şifresi veya kişisel
        bilgiler hiçbir sunucuya gönderilmez. Oluşturulan QR kodlar süresiz
        çalışır, takip veya yönlendirme içermez.
      </p>
    </div>
  );
}
