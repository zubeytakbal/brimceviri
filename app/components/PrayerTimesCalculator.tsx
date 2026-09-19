"use client";

import { useMemo, useState } from "react";
import {
  bearingToArabicDirection,
  calculationMethods,
  computePrayerTimes,
  computeQibla,
  formatHourDecimal,
  prayerTimesPresetCities,
  type AsrMethod,
  type CalculationMethodId,
} from "../converter/prayerTimes";

function todayParts() {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
}

export default function PrayerTimesCalculator() {
  const [cityId, setCityId] = useState(prayerTimesPresetCities[0].id);
  const [latitude, setLatitude] = useState(String(prayerTimesPresetCities[0].latitude));
  const [longitude, setLongitude] = useState(String(prayerTimesPresetCities[0].longitude));
  const [utcOffset, setUtcOffset] = useState(String(prayerTimesPresetCities[0].utcOffsetHours));
  const [method, setMethod] = useState<CalculationMethodId>("mwl");
  const [asrMethod, setAsrMethod] = useState<AsrMethod>("standard");
  const [geoStatus, setGeoStatus] = useState<"idle" | "loading" | "error">("idle");

  const date = todayParts();

  function applyCity(id: string) {
    setCityId(id);
    const city = prayerTimesPresetCities.find((item) => item.id === id);
    if (city) {
      setLatitude(String(city.latitude));
      setLongitude(String(city.longitude));
      setUtcOffset(String(city.utcOffsetHours));
    }
  }

  function useMyLocation() {
    if (!navigator.geolocation) {
      setGeoStatus("error");
      return;
    }

    setGeoStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(String(Number(position.coords.latitude.toFixed(4))));
        setLongitude(String(Number(position.coords.longitude.toFixed(4))));
        setUtcOffset(String(-new Date().getTimezoneOffset() / 60));
        setGeoStatus("idle");
      },
      () => {
        setGeoStatus("error");
      }
    );
  }

  const parsedLatitude = Number(latitude);
  const parsedLongitude = Number(longitude);
  const parsedUtcOffset = Number(utcOffset);

  const prayerResult = useMemo(() => {
    if (
      !Number.isFinite(parsedLatitude) ||
      !Number.isFinite(parsedLongitude) ||
      !Number.isFinite(parsedUtcOffset)
    ) {
      return null;
    }

    return computePrayerTimes({
      year: date.year,
      month: date.month,
      day: date.day,
      latitude: parsedLatitude,
      longitude: parsedLongitude,
      utcOffsetHours: parsedUtcOffset,
      method,
      asrMethod,
    });
  }, [parsedLatitude, parsedLongitude, parsedUtcOffset, method, asrMethod, date.year, date.month, date.day]);

  const qiblaResult = useMemo(() => {
    if (!Number.isFinite(parsedLatitude) || !Number.isFinite(parsedLongitude)) {
      return null;
    }
    return computeQibla(parsedLatitude, parsedLongitude);
  }, [parsedLatitude, parsedLongitude]);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>اختر مدينة</span>
          <select value={cityId} onChange={(event) => applyCity(event.target.value)}>
            {prayerTimesPresetCities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </label>
        <label className="category-general-converter-field">
          <span>خط العرض</span>
          <input
            inputMode="decimal"
            type="text"
            value={latitude}
            onChange={(event) => setLatitude(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>خط الطول</span>
          <input
            inputMode="decimal"
            type="text"
            value={longitude}
            onChange={(event) => setLongitude(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>فارق التوقيت عن UTC (ساعة)</span>
          <input
            inputMode="decimal"
            type="text"
            value={utcOffset}
            onChange={(event) => setUtcOffset(event.target.value)}
          />
        </label>
      </div>

      <button type="button" className="engineering-target-button atomic-mass-add-button" onClick={useMyLocation}>
        استخدام موقعي الحالي
      </button>
      {geoStatus === "error" ? (
        <p className="calculator-usage-hint">
          تعذّر الوصول إلى الموقع. يمكنك اختيار مدينة من القائمة أو إدخال الإحداثيات يدويًا.
        </p>
      ) : null}

      <div className="engineering-targets">
        <span>طريقة الحساب</span>
        <div className="engineering-target-grid hydrostatic-target-grid">
          {calculationMethods.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`engineering-target-button${method === item.id ? " is-active" : ""}`}
              onClick={() => setMethod(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="engineering-targets">
        <span>مذهب حساب العصر</span>
        <div className="engineering-target-grid hydrostatic-target-grid">
          <button
            type="button"
            className={`engineering-target-button${asrMethod === "standard" ? " is-active" : ""}`}
            onClick={() => setAsrMethod("standard")}
          >
            الجمهور (شافعي، مالكي، حنبلي)
          </button>
          <button
            type="button"
            className={`engineering-target-button${asrMethod === "hanafi" ? " is-active" : ""}`}
            onClick={() => setAsrMethod("hanafi")}
          >
            حنفي
          </button>
        </div>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!prayerResult ? (
          <strong>تعذّر حساب المواقيت لهذه الإحداثيات. تحقق من القيم المدخلة.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>الفجر</span>
              <strong>{formatHourDecimal(prayerResult.fajr)}</strong>
            </div>
            <div>
              <span>الشروق</span>
              <strong>{formatHourDecimal(prayerResult.sunrise)}</strong>
            </div>
            <div>
              <span>الظهر</span>
              <strong>{formatHourDecimal(prayerResult.dhuhr)}</strong>
            </div>
            <div>
              <span>العصر</span>
              <strong>{formatHourDecimal(prayerResult.asr)}</strong>
            </div>
            <div>
              <span>المغرب</span>
              <strong>{formatHourDecimal(prayerResult.maghrib)}</strong>
            </div>
            <div>
              <span>العشاء</span>
              <strong>{formatHourDecimal(prayerResult.isha)}</strong>
            </div>
          </div>
        )}
      </div>

      {qiblaResult ? (
        <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
          <div className="paint-calculator-result-grid">
            <div>
              <span>اتجاه القبلة (من الشمال الجغرافي)</span>
              <strong>
                {qiblaResult.bearingDeg.toFixed(1)}° ({bearingToArabicDirection(qiblaResult.bearingDeg)})
              </strong>
            </div>
            <div>
              <span>المسافة إلى الكعبة المشرفة</span>
              <strong>{Math.round(qiblaResult.distanceKm).toLocaleString("ar")} كم</strong>
            </div>
          </div>
        </div>
      ) : null}

      <p className="calculator-usage-hint">
        المواقيت محسوبة فلكيًا بدقة عالية لكنها قد تختلف بدقيقة أو دقيقتين عن
        الجهة الرسمية في بلدك بسبب اختلاف طريقة الحساب أو هوامش الاحتياط
        المحلية. اتجاه القبلة محسوب بالنسبة إلى الشمال الجغرافي (الحقيقي) لا
        المغناطيسي، فإذا استخدمت بوصلة الهاتف فتأكد أنها مضبوطة على الشمال
        الحقيقي. تأكد أيضًا من صحة فارق التوقيت الحالي، لأنه قد يتغير بسبب
        التوقيت الصيفي أو حالات خاصة مثل توقيت رمضان في بعض الدول.
      </p>
    </div>
  );
}
