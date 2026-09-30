"use client";

import { useEffect, useState } from "react";
import { uaCoz } from "../../converter/ag/ua";
import CopyResultButton from "../CopyResultButton";
import SonucTablosu from "./SonucTablosu";

type Nav = Navigator & {
  deviceMemory?: number;
  connection?: {
    effectiveType?: string;
    downlink?: number;
    rtt?: number;
    saveData?: boolean;
  };
  userAgentData?: {
    getHighEntropyValues: (h: string[]) => Promise<{
      platform?: string;
      platformVersion?: string;
      model?: string;
      architecture?: string;
      fullVersionList?: Array<{ brand: string; version: string }>;
    }>;
  };
};

const evet = (b: boolean) => (b ? "Açık" : "Kapalı");

/** Tarayıcı, işletim sistemi, ekran ve bölge bilgileri; hepsi yerelden okunur. */
export default function TarayiciBilgisi() {
  const [satirlar, setSatirlar] = useState<Array<[string, string]> | null>(
    null,
  );
  const [ua, setUa] = useState("");

  useEffect(() => {
    const n = navigator as Nav;
    const oku = async () => {
      const u = uaCoz(n.userAgent);
      let isletim = u.isletim;
      let tarayici = `${u.tarayici} ${u.surum}`.trim();
      let model = "";
      let mimari = "";
      try {
        const h = await n.userAgentData?.getHighEntropyValues([
          "platformVersion",
          "model",
          "architecture",
          "fullVersionList",
        ]);
        if (h) {
          if (h.platform === "Windows" && h.platformVersion) {
            const ana = Number(h.platformVersion.split(".")[0]);
            // Chromium: platformVersion 13 ve üstü Windows 11'dir
            isletim =
              ana >= 13 ? "Windows 11" : ana > 0 ? "Windows 10" : isletim;
          } else if (h.platform === "macOS" && h.platformVersion)
            isletim = `macOS ${h.platformVersion}`;
          const marka = h.fullVersionList?.find(
            (b) => !/Not.?A.?Brand|Chromium/i.test(b.brand),
          );
          if (marka) tarayici = `${marka.brand} ${marka.version}`;
          model = h.model ?? "";
          mimari = h.architecture ?? "";
        }
      } catch {
        /* izin verilmedi */
      }
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const ofset = -new Date().getTimezoneOffset();
      const s: Array<[string, string]> = [
        ["Tarayıcı", tarayici],
        ["İşletim sistemi", isletim],
        ["Cihaz türü", `${u.cihaz}${model ? ` (${model})` : ""}`],
        ["Ekran çözünürlüğü", `${screen.width} × ${screen.height}`],
        [
          "Gerçek piksel",
          `${Math.round(screen.width * devicePixelRatio)} × ${Math.round(screen.height * devicePixelRatio)}`,
        ],
        ["Piksel oranı", String(devicePixelRatio)],
        ["Tarayıcı penceresi", `${innerWidth} × ${innerHeight}`],
        ["Renk derinliği", `${screen.colorDepth} bit`],
        ["Dil", (n.languages?.length ? n.languages : [n.language]).join(", ")],
        [
          "Saat dilimi",
          `${tz} (UTC${ofset >= 0 ? "+" : "−"}${Math.floor(Math.abs(ofset) / 60)}${ofset % 60 ? `:${String(Math.abs(ofset) % 60).padStart(2, "0")}` : ""})`,
        ],
        ["Çerezler", evet(n.cookieEnabled)],
        [
          "Karanlık tema tercihi",
          matchMedia("(prefers-color-scheme: dark)").matches ? "Evet" : "Hayır",
        ],
        [
          "Dokunmatik ekran",
          n.maxTouchPoints > 0 ? `Evet (${n.maxTouchPoints} nokta)` : "Hayır",
        ],
        [
          "İşlemci çekirdeği",
          n.hardwareConcurrency ? String(n.hardwareConcurrency) : "Bilinmiyor",
        ],
      ];
      if (n.deviceMemory)
        s.push(["Bellek (yaklaşık)", `${n.deviceMemory} GB veya üzeri`]);
      if (mimari) s.push(["İşlemci mimarisi", mimari]);
      if (n.connection?.effectiveType)
        s.push([
          "Bağlantı (tarayıcı tahmini)",
          `${n.connection.effectiveType.toUpperCase()}${n.connection.downlink ? ` · ~${n.connection.downlink} Mbps` : ""}${n.connection.rtt ? ` · ${n.connection.rtt} ms` : ""}`,
        ]);
      s.push(["Çevrim içi", n.onLine ? "Evet" : "Hayır"]);
      setSatirlar(s);
      setUa(n.userAgent);
    };
    void oku();
  }, []);

  return (
    <div className="date-calc gorsel-arac">
      {satirlar ? (
        <>
          <p className="vesikalik-ozet">
            <b>{satirlar[0][1]}</b> · {satirlar[1][1]} · {satirlar[3][1]}
          </p>
          <SonucTablosu
            etiket="Tarayıcı ve cihaz bilgileri"
            satirlar={satirlar}
          />
          <div className="date-calc-input">
            <label className="date-calc-field">
              <span>Tarayıcı kimliği (User-Agent)</span>
              <textarea readOnly rows={3} value={ua} />
            </label>
            <CopyResultButton
              text={
                satirlar.map(([k, v]) => `${k}: ${v}`).join("\n") +
                `\nUser-Agent: ${ua}`
              }
              locale="tr"
            />
          </div>
        </>
      ) : (
        <p className="gorsel-durum">Bilgiler okunuyor…</p>
      )}
      <p className="date-calc-note">
        Bilgiler tarayıcınızın kendisinden okunur ve yalnızca bu ekranda
        gösterilir; hiçbir yere kaydedilmez veya gönderilmez. Destek ekibine
        iletmek için &quot;Kopyala&quot; düğmesini kullanabilirsiniz.
      </p>
    </div>
  );
}
