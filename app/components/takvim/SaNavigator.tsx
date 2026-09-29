"use client";

import { useState } from "react";
import Link from "@/app/components/SiteLink";
import {
  GREG_MONTHS_AR,
  HIJRI_MONTHS_AR,
  kharitatSana,
  SA_HIJRI_SANAWAT,
  saHijriShahrPath,
  saMunasabaPath,
  shahrHijri,
} from "../../converter/calendar/saTaqwim";
import type { YMD } from "../../converter/time/calendars";
import { addDaysYmd, diffDays, ymdKey } from "../../converter/time/dateMath";
import { SaMiftah, SaShahrGrid } from "./SaShahrGrid";

const AWWAL = 1400;
const AKHIR = 1500;

/** تقويم تفاعلي بالأشهر الهجرية (1400–1500هـ) مع التاريخ الميلادي لكل يوم. */
export default function SaNavigator({
  yawm,
  hy0,
  hm0,
}: {
  yawm: YMD;
  hy0: number;
  hm0: number;
}) {
  const [shahr, setShahr] = useState({ hy: hy0, hm: hm0 });
  const intaqil = (delta: number) =>
    setShahr((c) => {
      const i = c.hy * 12 + (c.hm - 1) + delta;
      const y = Math.floor(i / 12);
      if (y < AWWAL || y > AKHIR) return c;
      return { hy: y, hm: (i % 12) + 1 };
    });
  const { hy, hm } = shahr;
  const { bidaya, nihaya, ayyam } = shahrHijri(hy, hm);
  const munasabat: Array<{ key: string; id: string; ism: string }> = [];
  for (let d = bidaya; diffDays(d, nihaya) >= 0; d = addDaysYmd(d, 1)) {
    for (const t of kharitatSana(d.year).munasabat.get(ymdKey(d)) ?? [])
      munasabat.push({ key: ymdKey(d), id: t.m.id, ism: t.m.ism });
  }
  return (
    <div className="takvim-gezgini">
      <div className="takvim-ay-baslik">
        <button
          type="button"
          className="takvim-nav"
          onClick={() => intaqil(-1)}
          aria-label="الشهر السابق"
        >
          ›
        </button>
        <h2>
          <select
            value={hm}
            onChange={(e) => setShahr({ hy, hm: Number(e.target.value) })}
            aria-label="الشهر الهجري"
          >
            {HIJRI_MONTHS_AR.map((m, i) => (
              <option key={m} value={i + 1}>
                {m}
              </option>
            ))}
          </select>{" "}
          <select
            value={hy}
            onChange={(e) => setShahr({ hy: Number(e.target.value), hm })}
            aria-label="السنة الهجرية"
          >
            {Array.from({ length: AKHIR - AWWAL + 1 }, (_, i) => AWWAL + i).map(
              (y) => (
                <option key={y} value={y}>
                  {y}هـ
                </option>
              ),
            )}
          </select>
        </h2>
        <button
          type="button"
          className="takvim-nav"
          onClick={() => intaqil(1)}
          aria-label="الشهر التالي"
        >
          ‹
        </button>
      </div>
      <p className="takvim-hicri-aralik">
        {bidaya.day} {GREG_MONTHS_AR[bidaya.month - 1]}{" "}
        {bidaya.year !== nihaya.year ? bidaya.year : ""} – {nihaya.day}{" "}
        {GREG_MONTHS_AR[nihaya.month - 1]} {nihaya.year}م · {ayyam} يومًا
        {hy !== hy0 || hm !== hm0 ? (
          <>
            {" · "}
            <button
              type="button"
              className="takvim-bugune"
              onClick={() => setShahr({ hy: hy0, hm: hm0 })}
            >
              اليوم
            </button>
          </>
        ) : null}
      </p>
      <SaShahrGrid hy={hy} hm={hm} yawm={yawm} kabir />
      <SaMiftah />
      {munasabat.length ? (
        <ul className="takvim-gezgini-liste">
          {munasabat.map((x) => (
            <li key={x.key + x.id}>
              <strong>
                {Number(x.key.slice(8))}{" "}
                {GREG_MONTHS_AR[Number(x.key.slice(5, 7)) - 1]}
              </strong>{" "}
              <Link href={saMunasabaPath(x.id)} prefetch={false}>
                {x.ism}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
      {SA_HIJRI_SANAWAT.includes(hy) ? (
        <p className="date-calc-note">
          <Link href={saHijriShahrPath(hy, hm)} prefetch={false}>
            تقويم شهر {HIJRI_MONTHS_AR[hm - 1]} {hy}هـ
          </Link>
        </p>
      ) : null}
    </div>
  );
}
