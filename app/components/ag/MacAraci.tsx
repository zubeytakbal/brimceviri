"use client";

import { useState } from "react";
import { macCoz, rastgeleMac } from "../../converter/ag/mac";
import SonucTablosu from "./SonucTablosu";

/** MAC adresi biçimlendirici, çözümleyici ve rastgele MAC üretici. */
export default function MacAraci() {
  const [girdi, setGirdi] = useState("00-1A-2B-3C-4D-5E");
  const m = macCoz(girdi);
  return (
    <div className="date-calc gorsel-arac">
      <div className="date-calc-input">
        <label className="date-calc-field">
          <span>MAC adresi (00:1A:2B:3C:4D:5E, 00-1A-…, 001a.2b3c.4d5e)</span>
          <span className="date-calc-field-row">
            <input
              type="text"
              spellCheck={false}
              autoCapitalize="off"
              value={girdi}
              onChange={(e) => setGirdi(e.target.value)}
              aria-invalid={!m}
            />
          </span>
        </label>
        <div className="ag-ornekler">
          <button type="button" onClick={() => setGirdi(rastgeleMac())}>
            🎲 Rastgele MAC üret
          </button>
        </div>
      </div>
      {m ? (
        <>
          <p className="vesikalik-ozet">
            {m.yayin
              ? "Yayın (broadcast) adresi"
              : m.cokluYayin
                ? "Çok noktaya yayın (multicast) adresi"
                : "Tek noktaya yayın (unicast) adresi"}{" "}
            ·{" "}
            {m.yerel
              ? "Yerel olarak atanmış (rastgele / sanal)"
              : "Üretici tarafından atanmış (evrensel)"}
          </p>
          <SonucTablosu
            etiket="MAC yazımları"
            satirlar={[
              ...m.bicimler,
              ["OUI (üretici öneki)", m.oui],
              ["EUI-64", m.eui64],
              ["IPv6 link-local adresi", m.linkLocal],
            ]}
          />
          {m.yerel && !m.cokluYayin ? (
            <p className="date-calc-note">
              İkinci hanesi 2, 6, A veya E olan adresler yerel olarak
              atanmıştır: telefonların &quot;özel Wi-Fi adresi&quot; ve sanal
              makineler böyle adres kullanır; OUI bir üreticiyi göstermez.
            </p>
          ) : null}
        </>
      ) : (
        <p className="gorsel-hata">
          12 onaltılı haneden oluşan bir MAC adresi yazın (ör.
          00:1A:2B:3C:4D:5E).
        </p>
      )}
      <p className="date-calc-note">
        İşlem tarayıcınızda yapılır; adres hiçbir yere gönderilmez.
      </p>
    </div>
  );
}
