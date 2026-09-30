"use client";

import { useState } from "react";
import { ipv4Bicimler, ipv6Hesapla, ipv6Sayi } from "../../converter/ag/ip";
import SonucTablosu from "./SonucTablosu";

const ORNEKLER = [
  "192.168.1.1",
  "3232235777",
  "0x08080808",
  "2001:db8::1",
  "::ffff:10.0.0.1",
];

/** IPv4 / IPv6 adresini farklı yazımlara çevirir ve türünü gösterir. */
export default function IpDonustur() {
  const [girdi, setGirdi] = useState("192.168.1.1");
  const v4 = ipv4Bicimler(girdi);
  const v6n = v4 ? null : ipv6Sayi(girdi);
  const v6 = v6n !== null ? ipv6Hesapla(v6n, 128) : null;
  return (
    <div className="date-calc gorsel-arac">
      <div className="date-calc-input">
        <label className="date-calc-field">
          <span>
            IP adresi (noktalı, ondalık, 0x onaltılı, ikili veya IPv6)
          </span>
          <span className="date-calc-field-row">
            <input
              type="text"
              spellCheck={false}
              autoCapitalize="off"
              value={girdi}
              onChange={(e) => setGirdi(e.target.value)}
              aria-invalid={!v4 && !v6}
            />
          </span>
        </label>
        <div className="ag-ornekler">
          {ORNEKLER.map((o) => (
            <button key={o} type="button" onClick={() => setGirdi(o)}>
              {o}
            </button>
          ))}
        </div>
      </div>
      {v4 ? (
        <>
          <p className="vesikalik-ozet">
            <b>{v4.noktali}</b> · Sınıf {v4.sinif} · {v4.tur}
          </p>
          <SonucTablosu
            etiket="IPv4 yazımları"
            satirlar={[
              ["Noktalı ondalık", v4.noktali],
              ["Tam sayı (ondalık)", v4.ondalik],
              ["Onaltılı (hex)", v4.onaltili],
              ["İkili (binary)", v4.ikili],
              ["Sekizli (octal)", v4.sekizli],
              ["IPv6 eşlemeli", v4.ipv6Esleme],
              ["Ters DNS (PTR)", v4.ptr],
              ["Adres türü", v4.tur],
            ]}
          />
        </>
      ) : v6 ? (
        <>
          <p className="vesikalik-ozet">
            <b>{v6.kisa}</b> · {v6.tur}
          </p>
          <SonucTablosu
            etiket="IPv6 yazımları"
            satirlar={[
              ["Kısa yazım (RFC 5952)", v6.kisa],
              ["Açık (tam) yazım", v6.acik],
              ["Tam sayı (ondalık)", v6n!.toString()],
              ["Adres türü", v6.tur],
              ["Ters DNS (PTR)", v6.ptr],
            ]}
          />
        </>
      ) : (
        <p className="gorsel-hata">Bu bir IPv4 veya IPv6 adresi değil.</p>
      )}
      <p className="date-calc-note">
        Dönüştürme tarayıcınızda yapılır; adres hiçbir yere gönderilmez.
      </p>
    </div>
  );
}
