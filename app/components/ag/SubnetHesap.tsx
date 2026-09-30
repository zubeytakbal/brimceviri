"use client";

import { useState } from "react";
import {
  altAglar,
  hosttanOnek,
  ipv4Ayristir,
  ipv4Hesapla,
  ipv6Ayristir,
  ipv6Hesapla,
} from "../../converter/ag/ip";
import SonucTablosu from "./SonucTablosu";

const sayi = (n: number) => n.toLocaleString("tr-TR");

const ORNEK4 = [
  "192.168.1.0/24",
  "10.0.0.0/8",
  "172.16.5.10/20",
  "192.168.1.130 255.255.255.192",
];
const ORNEK6 = [
  "2001:db8:abcd::/48",
  "fe80::1/64",
  "2a00:1450:4001::/56",
  "fd00::/8",
];

function Ipv4() {
  const [girdi, setGirdi] = useState("192.168.1.0/24");
  const [yeniOnek, setYeniOnek] = useState(0);
  const [host, setHost] = useState("");
  const g = ipv4Ayristir(girdi);
  const r = g ? ipv4Hesapla(g.adres, g.onek) : null;
  const bol =
    g && yeniOnek > g.onek ? altAglar(g.adres, g.onek, yeniOnek) : null;
  const hostOnek = hosttanOnek(Number(host));
  return (
    <>
      <div className="date-calc-input">
        <label className="date-calc-field">
          <span>IP adresi ve CIDR (ör. 192.168.1.0/24) veya adres + maske</span>
          <span className="date-calc-field-row">
            <input
              type="text"
              inputMode="decimal"
              spellCheck={false}
              value={girdi}
              onChange={(e) => {
                setGirdi(e.target.value);
                setYeniOnek(0);
              }}
              aria-invalid={!r}
            />
          </span>
        </label>
        <div className="ag-ornekler">
          {ORNEK4.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => {
                setGirdi(o);
                setYeniOnek(0);
              }}
            >
              {o}
            </button>
          ))}
        </div>
      </div>
      {!r ? (
        <p className="gorsel-hata">
          Geçerli bir IPv4 adresi yazın: 192.168.1.10/24 veya 192.168.1.10
          255.255.255.0
        </p>
      ) : (
        <>
          <p className="vesikalik-ozet">
            <b>
              {r.ag}/{r.onek}
            </b>{" "}
            · {sayi(r.kullanilabilir)} kullanılabilir adres · {r.tur}
          </p>
          <SonucTablosu
            etiket="Alt ağ bilgileri"
            satirlar={[
              ["Ağ adresi", r.ag],
              ["Yayın (broadcast) adresi", r.yayin],
              ["İlk kullanılabilir IP", r.ilk],
              ["Son kullanılabilir IP", r.son],
              ["Alt ağ maskesi", r.maske],
              ["Wildcard maske", r.wildcard],
              ["CIDR", `/${r.onek}`],
              ["Toplam adres", sayi(r.toplam)],
              ["Kullanılabilir host", sayi(r.kullanilabilir)],
              ["Adres sınıfı", r.sinif],
              ["Adres türü", r.tur],
            ]}
          />
          <div className="ag-ikili">
            <div>
              <span>Adres</span>
              <code>{r.ikiliAdres}</code>
            </div>
            <div>
              <span>Maske</span>
              <code>{r.ikiliMaske}</code>
            </div>
          </div>
          {r.onek < 32 ? (
            <div className="date-calc-input">
              <label className="date-calc-field">
                <span>Bu ağı alt ağlara böl</span>
                <span className="date-calc-field-row">
                  <select
                    value={yeniOnek}
                    onChange={(e) => setYeniOnek(Number(e.target.value))}
                  >
                    <option value={0}>Seçin…</option>
                    {Array.from(
                      { length: Math.min(32, r.onek + 16) - r.onek },
                      (_, i) => r.onek + i + 1,
                    ).map((o) => (
                      <option key={o} value={o}>
                        /{o} → {sayi(2 ** (o - r.onek))} alt ağ, her biri{" "}
                        {sayi(o >= 31 ? 2 ** (32 - o) : 2 ** (32 - o) - 2)} host
                      </option>
                    ))}
                  </select>
                </span>
              </label>
            </div>
          ) : null}
          {bol ? (
            <div className="fatura-liste">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Ağ</th>
                    <th>Kullanılabilir aralık</th>
                    <th>Yayın</th>
                  </tr>
                </thead>
                <tbody>
                  {bol.liste.map((x, i) => (
                    <tr key={x.ag}>
                      <td>{i + 1}</td>
                      <td>
                        {x.ag}/{x.onek}
                      </td>
                      <td>
                        {x.ilk} – {x.son}
                      </td>
                      <td>{x.yayin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {bol.toplam > bol.liste.length ? (
                <p className="date-calc-note">
                  İlk {sayi(bol.liste.length)} / {sayi(bol.toplam)} alt ağ
                  gösteriliyor.
                </p>
              ) : null}
            </div>
          ) : null}
        </>
      )}
      <div className="date-calc-input">
        <label className="date-calc-field">
          <span>Kaç cihaz (host) gerekiyor? En uygun maskeyi bulun</span>
          <span className="date-calc-field-row">
            <input
              type="number"
              min={1}
              inputMode="numeric"
              value={host}
              placeholder="ör. 50"
              onChange={(e) => setHost(e.target.value)}
            />
          </span>
        </label>
        {host && hostOnek !== null ? (
          <p className="gorsel-tamam">
            <b>/{hostOnek}</b> ({ipv4Hesapla(0, hostOnek).maske}) →{" "}
            {sayi(ipv4Hesapla(0, hostOnek).kullanilabilir)} kullanılabilir adres
          </p>
        ) : host ? (
          <p className="gorsel-hata">
            IPv4'te en fazla 4.294.967.294 host olabilir.
          </p>
        ) : null}
      </div>
    </>
  );
}

function Ipv6() {
  const [girdi, setGirdi] = useState("2001:db8:abcd::/48");
  const g = ipv6Ayristir(girdi);
  const r = g ? ipv6Hesapla(g.adres, g.onek) : null;
  return (
    <>
      <div className="date-calc-input">
        <label className="date-calc-field">
          <span>IPv6 adresi ve önek (ör. 2001:db8::/32)</span>
          <span className="date-calc-field-row">
            <input
              type="text"
              spellCheck={false}
              autoCapitalize="off"
              value={girdi}
              onChange={(e) => setGirdi(e.target.value)}
              aria-invalid={!r}
            />
          </span>
        </label>
        <div className="ag-ornekler">
          {ORNEK6.map((o) => (
            <button key={o} type="button" onClick={() => setGirdi(o)}>
              {o}
            </button>
          ))}
        </div>
      </div>
      {!r ? (
        <p className="gorsel-hata">
          Geçerli bir IPv6 adresi yazın: 2001:db8::1/64
        </p>
      ) : (
        <>
          <p className="vesikalik-ozet">
            <b>{r.ag}</b> · {r.tur}
          </p>
          <SonucTablosu
            etiket="IPv6 önek bilgileri"
            satirlar={[
              ["Kısa yazım", r.kisa],
              ["Açık (tam) yazım", r.acik],
              ["Ağ öneki", r.ag],
              ["İlk adres", r.ilk],
              ["Son adres", r.son],
              ["Adres sayısı", r.toplam],
              ...(r.altAg64
                ? ([["/64 alt ağ sayısı", r.altAg64]] as Array<
                    [string, string]
                  >)
                : []),
              ["Adres türü", r.tur],
              ["Ters DNS (PTR)", r.ptr],
            ]}
          />
        </>
      )}
    </>
  );
}

/** IPv4 / IPv6 alt ağ hesaplayıcı. */
export default function SubnetHesap({ surum = "v4" }: { surum?: "v4" | "v6" }) {
  const [s, setS] = useState(surum);
  return (
    <div className="date-calc gorsel-arac">
      <div
        className="date-converter-modes is-light"
        role="tablist"
        aria-label="IP sürümü"
      >
        {(["v4", "v6"] as const).map((x) => (
          <button
            key={x}
            type="button"
            role="tab"
            aria-selected={s === x}
            className={s === x ? "is-active" : ""}
            onClick={() => setS(x)}
          >
            {x === "v4" ? "IPv4" : "IPv6"}
          </button>
        ))}
      </div>
      {s === "v4" ? <Ipv4 /> : <Ipv6 />}
      <p className="date-calc-note">
        Hesaplama tarayıcınızda yapılır; yazdığınız adresler hiçbir yere
        gönderilmez.
      </p>
    </div>
  );
}
