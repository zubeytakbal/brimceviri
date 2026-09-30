"use client";

import { useState } from "react";
import {
  PORT_GRUPLARI,
  PORTLAR,
  portAra,
  portAraligi,
  type PortGrubu,
} from "../../converter/ag/portlar";

/** Aranabilir ve süzülebilir port numaraları tablosu. */
export default function PortListesi() {
  const [sorgu, setSorgu] = useState("");
  const [grup, setGrup] = useState<PortGrubu | "tumu">("tumu");
  const liste = portAra(sorgu, PORTLAR).filter(
    (p) => grup === "tumu" || p.grup === grup,
  );
  const n = /^\d+$/.test(sorgu.trim()) ? Number(sorgu.trim()) : null;
  return (
    <div className="date-calc gorsel-arac">
      <div className="date-calc-input">
        <label className="date-calc-field">
          <span>Port numarası veya hizmet adı ara</span>
          <span className="date-calc-field-row">
            <input
              type="search"
              value={sorgu}
              placeholder="ör. 3389, ssh, minecraft"
              onChange={(e) => setSorgu(e.target.value)}
            />
          </span>
        </label>
      </div>
      <div className="arac-filtre" role="group" aria-label="Gruba göre süz">
        {[{ id: "tumu" as const, ad: "Tümü" }, ...PORT_GRUPLARI].map((g) => (
          <button
            key={g.id}
            type="button"
            aria-pressed={grup === g.id}
            className={grup === g.id ? "is-active" : undefined}
            onClick={() => setGrup(g.id)}
          >
            {g.ad}
          </button>
        ))}
      </div>
      {n !== null ? (
        <p className="vesikalik-ozet">
          {n}: {portAraligi(n)}
        </p>
      ) : null}
      <div className="port-tablo">
        <table>
          <thead>
            <tr>
              <th>Port</th>
              <th>Protokol</th>
              <th>Hizmet</th>
              <th>Açıklama</th>
            </tr>
          </thead>
          <tbody>
            {liste.map((p) => (
              <tr key={`${p.no}-${p.protokol}`}>
                <td>
                  <b>{p.no}</b>
                </td>
                <td>{p.protokol}</td>
                <td>
                  {p.ad}
                  {p.gayriResmi ? <small> (yaygın varsayılan)</small> : null}
                </td>
                <td>
                  {p.aciklama}
                  {p.risk ? (
                    <span className="port-risk">⚠️ {p.risk}</span>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!liste.length ? (
          <p className="date-calc-note">
            Listede yok. Bu tablo en sık kullanılan portları içerir; bir program
            kendi seçtiği herhangi bir portu kullanabilir.
          </p>
        ) : null}
      </div>
    </div>
  );
}
