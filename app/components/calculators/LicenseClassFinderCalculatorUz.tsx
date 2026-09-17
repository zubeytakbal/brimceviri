"use client";

import { useState } from "react";
import Link from "next/link";
import {
  findRequiredUzLicenseClass,
  findRequiredUzMotorcycleLicenseClass,
  uzLicenseClasses,
} from "../../converter/licenseClassFinderUz";

function parseNumericValue(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return Number.NaN;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

type VehicleGroup = "car" | "motorcycle";

export default function LicenseClassFinderCalculatorUz() {
  const [vehicleGroup, setVehicleGroup] = useState<VehicleGroup>("car");

  const [totalSeats, setTotalSeats] = useState("5");
  const [maxLoadedWeightKg, setMaxLoadedWeightKg] = useState("2000");
  const [hasTrailer, setHasTrailer] = useState(false);
  const [trailerWeightKg, setTrailerWeightKg] = useState("");

  const [isMoped, setIsMoped] = useState(false);

  const carResult = findRequiredUzLicenseClass({
    totalSeats: parseNumericValue(totalSeats),
    maxLoadedWeightKg: parseNumericValue(maxLoadedWeightKg),
    hasTrailer,
    trailerWeightKg: hasTrailer ? parseNumericValue(trailerWeightKg) : 0,
  });

  const motorcycleResult = findRequiredUzMotorcycleLicenseClass({ isMoped });

  const result = vehicleGroup === "car" ? carResult : motorcycleResult;

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Transport Turi</span>
          <select
            value={vehicleGroup}
            onChange={(event) => setVehicleGroup(event.target.value as VehicleGroup)}
          >
            <option value="car">Avtomobil / Yuk Mashinasi / Avtobus</option>
            <option value="motorcycle">Mototsikl / Moped</option>
          </select>
        </label>
      </div>

      {vehicleGroup === "car" ? (
        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Haydovchi Dahil Jami O&apos;rindiqlar Soni</span>
            <input
              type="text"
              inputMode="decimal"
              value={totalSeats}
              onChange={(event) => setTotalSeats(event.target.value)}
            />
          </label>
          <label className="category-general-converter-field">
            <span>Eng Yuqori Yuklangan Og&apos;irlik (kg)</span>
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
              Tirkama tortaman
            </span>
          </label>
          {hasTrailer && (
            <label className="category-general-converter-field">
              <span>Tirkamaning Eng Yuqori Yuklangan Og&apos;irligi (kg)</span>
              <input
                type="text"
                inputMode="decimal"
                value={trailerWeightKg}
                onChange={(event) => setTrailerWeightKg(event.target.value)}
              />
            </label>
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
              Moped/skuter (≤50cc yoki ≤4kVt elektr, eng yuqori tezlik ≤50 km/soat)
            </span>
          </label>
        </div>
      )}

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {result === null ? (
          <strong>To&apos;g&apos;ri qiymatlar kiritib hisoblashni ko&apos;ring.</strong>
        ) : (
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <tbody>
                <tr className="is-active">
                  <td>
                    <strong>Kerakli Guvohnoma Toifasi</strong>
                  </td>
                  <td>
                    <strong>{result.label}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Qamrovi</td>
                  <td>{result.description}</td>
                </tr>
                <tr>
                  <td>Eng Kichik Yosh</td>
                  <td>{result.minAge}</td>
                </tr>
                <tr>
                  <td>Amal Qilish Muddati</td>
                  <td>{result.validityYears} yil</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Eslatma:</strong> Bu hisoblash avtomobil/yuk
        mashinasi/avtobus toifalarini (B, BE, C, CE, D, DE) va
        mototsikl/moped toifalarini (A1, A) qamraydi; maxsus texnika
        (traktor va h.k.) toifalari bu versiyada yo&apos;q. Natija
        umumiy yo&apos;naltiruvchi ma&apos;lumot; aniq va dolzarb
        ma&apos;lumot uchun rasmiy qonunchilikni yoki avtomaktabni
        tekshirish tavsiya etiladi.
      </p>

      <h2>Barcha Guvohnoma Toifalari</h2>
      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <thead>
            <tr>
              <th scope="col">Toifa</th>
              <th scope="col">Qamrovi</th>
              <th scope="col">Eng Kichik Yosh</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(uzLicenseClasses).map((licenseClass) => (
              <tr key={licenseClass.id}>
                <td>
                  <Link href={`/uz/haydovchilik-toifasi-topish/${licenseClass.id.toLowerCase()}`}>
                    {licenseClass.label} Toifasi →
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
