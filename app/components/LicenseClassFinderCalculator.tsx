"use client";

import { useState } from "react";
import Link from "next/link";
import {
  findRequiredLicenseClass,
  findRequiredMotorcycleLicenseClass,
  licenseClasses,
} from "../converter/licenseClassFinder";

function parseNumericValue(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return Number.NaN;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

type VehicleGroup = "car" | "motorcycle";

export default function LicenseClassFinderCalculator() {
  const [vehicleGroup, setVehicleGroup] = useState<VehicleGroup>("car");

  const [isLightQuadricycle, setIsLightQuadricycle] = useState(false);
  const [totalSeats, setTotalSeats] = useState("5");
  const [maxLoadedWeightKg, setMaxLoadedWeightKg] = useState("2000");
  const [hasTrailer, setHasTrailer] = useState(false);
  const [trailerWeightKg, setTrailerWeightKg] = useState("");

  const [isMoped, setIsMoped] = useState(false);
  const [engineCc, setEngineCc] = useState("125");
  const [powerKw, setPowerKw] = useState("11");

  const carResult = findRequiredLicenseClass({
    totalSeats: parseNumericValue(totalSeats),
    maxLoadedWeightKg: parseNumericValue(maxLoadedWeightKg),
    hasTrailer,
    trailerWeightKg: hasTrailer ? parseNumericValue(trailerWeightKg) : 0,
    isLightQuadricycle,
  });

  const motorcycleResult = findRequiredMotorcycleLicenseClass({
    isMoped,
    engineCc: parseNumericValue(engineCc),
    powerKw: parseNumericValue(powerKw),
  });

  const result = vehicleGroup === "car" ? carResult : motorcycleResult;

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Araç Tipi</span>
          <select
            value={vehicleGroup}
            onChange={(event) => setVehicleGroup(event.target.value as VehicleGroup)}
          >
            <option value="car">Otomobil / Kamyon / Otobüs</option>
            <option value="motorcycle">Motosiklet / Moped</option>
          </select>
        </label>
      </div>

      {vehicleGroup === "car" ? (
        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>
              <input
                type="checkbox"
                checked={isLightQuadricycle}
                onChange={(event) => setIsLightQuadricycle(event.target.checked)}
              />{" "}
              Hafif dört tekerlekli araç (quadricycle, ≤400/550 kg, ≤15 kW)
            </span>
          </label>
          {!isLightQuadricycle && (
            <>
              <label className="category-general-converter-field">
                <span>Sürücü Dahil Toplam Koltuk Sayısı</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={totalSeats}
                  onChange={(event) => setTotalSeats(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>Azami Yüklü Ağırlık (kg)</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={maxLoadedWeightKg}
                  onChange={(event) => setMaxLoadedWeightKg(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>
                  <input
                    type="checkbox"
                    checked={hasTrailer}
                    onChange={(event) => setHasTrailer(event.target.checked)}
                  />{" "}
                  Römork çekiyorum
                </span>
              </label>
              {hasTrailer && (
                <label className="category-general-converter-field">
                  <span>Römorkun Azami Yüklü Ağırlığı (kg)</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={trailerWeightKg}
                    onChange={(event) => setTrailerWeightKg(event.target.value)}
                  />
                </label>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>
              <input
                type="checkbox"
                checked={isMoped}
                onChange={(event) => setIsMoped(event.target.checked)}
              />{" "}
              Moped (≤50cc, azami hız ≤45 km/s)
            </span>
          </label>
          {!isMoped && (
            <>
              <label className="category-general-converter-field">
                <span>Motor Hacmi (cc)</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={engineCc}
                  onChange={(event) => setEngineCc(event.target.value)}
                />
              </label>
              <label className="category-general-converter-field">
                <span>Motor Gücü (kW)</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={powerKw}
                  onChange={(event) => setPowerKw(event.target.value)}
                />
              </label>
            </>
          )}
        </div>
      )}

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {result === null ? (
          <strong>Geçerli değerler girerek hesaplamayı gör.</strong>
        ) : (
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <tbody>
                <tr className="is-active">
                  <td>
                    <strong>Gereken Ehliyet Sınıfı</strong>
                  </td>
                  <td>
                    <strong>{result.label}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Kapsam</td>
                  <td>{result.description}</td>
                </tr>
                <tr>
                  <td>Asgari Yaş</td>
                  <td>{result.minAge}</td>
                </tr>
                <tr>
                  <td>Geçerlilik Süresi</td>
                  <td>{result.validityYears} yıl</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Not:</strong> Bu hesaplama otomobil/kamyon/otobüs
        sınıflarını (B, B1, BE, C1, C1E, C, CE, D1, D1E, D, DE) ve
        motosiklet/moped sınıflarını (M, A1, A2, A) kapsar; iş
        makinesi/traktör (F, G, H) sınıfları henüz dahil değildir.
        Sonuç genel bir yönlendirmedir, kesin ve güncel bilgi için
        resmi yönetmeliği veya bir sürücü kursunu kontrol etmen
        önerilir.
      </p>

      <h2>Tüm Ehliyet Sınıfları</h2>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th scope="col">Sınıf</th>
              <th scope="col">Kapsam</th>
              <th scope="col">Asgari Yaş</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(licenseClasses).map((licenseClass) => (
              <tr key={licenseClass.id}>
                <td>
                  <Link href={`/ehliyet-sinifi-bulma/${licenseClass.id.toLowerCase()}`}>
                    {licenseClass.label} Sınıfı →
                  </Link>
                </td>
                <td>{licenseClass.description}</td>
                <td>{licenseClass.minAge}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
