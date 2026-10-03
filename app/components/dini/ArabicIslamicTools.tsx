"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  ayyamAqiqa,
  hawlZakat,
  hukmQasr,
  iddatAshhur,
  iddatQuru,
  iddatWafat,
  IQAMA,
  MASAFAT_QASR_KM,
  NISAB_DHAHAB_G,
  NISAB_FIDDA_G,
  type IddaNaw,
  type MadhhabIqama,
  type Qur,
} from "../../converter/arabicFiqh";
import { adadAr, hijriNass, miladiNass } from "../../converter/calendar/saTaqwim";
import type { YMD } from "../../converter/time/calendars";
import { addDaysYmd, diffDays, parseYmd, ymdKey } from "../../converter/time/dateMath";

/** أرقام عربية أو هندية أو لاتينية، مع فواصل الآلاف أو بدونها. */
export function arNumber(raw: string) {
  const latin = raw
    .replace(/[٠-٩]/g, (c) => String(c.charCodeAt(0) - 0x660))
    .replace(/[۰-۹]/g, (c) => String(c.charCodeAt(0) - 0x6f0))
    .replace(/٫/g, ".")
    .replace(/[\s,٬]/g, "");
  if (!latin) return Number.NaN;
  const n = Number(latin);
  return Number.isFinite(n) ? n : Number.NaN;
}

const f = (n: number, d = 2) => n.toLocaleString("ar-SA-u-nu-latn", { maximumFractionDigits: d });
const tarikh = (d: YMD) => `${miladiNass(d)} · ${hijriNass(d)}`;

function todayIso() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** يبدأ بتاريخ ثابت (للعرض المسبق) ثم ينتقل إلى تاريخ اليوم في المتصفح ما لم يغيّره المستخدم. */
function useDate(initial: string, shift = 0) {
  const [value, setValue] = useState(initial);
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (!touched) {
        const t = parseYmd(todayIso())!;
        setValue(ymdKey(addDaysYmd(t, shift)));
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [touched, shift]);
  const set = (v: string) => {
    setTouched(true);
    setValue(v);
  };
  return [value, set] as const;
}

function DateField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="date-calc-field">
      <span>{label}</span>
      <input type="date" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function NumField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="date-calc-field">
      <span>{label}</span>
      <input inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function Modes<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: ReadonlyArray<readonly [T, string]>; onChange: (v: T) => void }) {
  return (
    <div className="date-converter-modes is-light" role="radiogroup" aria-label={label}>
      {options.map(([v, t]) => (
        <button key={v} type="button" role="radio" aria-checked={value === v} className={value === v ? "is-active" : undefined} onClick={() => onChange(v)}>
          {t}
        </button>
      ))}
    </div>
  );
}

function Stat({ main, label, value, note }: { main?: boolean; label: string; value: ReactNode; note?: ReactNode }) {
  return (
    <div className={`date-calc-stat${main ? " is-main" : ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      {note ? <em>{note}</em> : null}
    </div>
  );
}

const baqi = (to: YMD, today: YMD | null) => {
  if (!today) return "";
  const n = diffDays(today, to);
  if (n > 0) return `باقي ${adadAr(n, "yawm")}`;
  if (n === 0) return "اليوم";
  return `مضى ${adadAr(-n, "yawm")}`;
};

/* ---------------- العدة ---------------- */

const IDDA_ANWA = [
  ["wafat", "المتوفى عنها زوجها"],
  ["hayd", "مطلقة تحيض"],
  ["ayisa", "مطلقة لا تحيض"],
  ["haml", "الحامل"],
] as const;

export function IddahCalculator({ initialDate }: { initialDate: string }) {
  const [naw, setNaw] = useState<IddaNaw>("wafat");
  const [bidaya, setBidaya] = useDate(initialDate);
  const [akhir, setAkhir] = useDate(initialDate, -10);
  const [wiladaMutawaqqaa, setWilada] = useDate(initialDate, 120);
  const [dawra, setDawra] = useState("28");
  const [muddat, setMuddat] = useState("6");
  const [qur, setQur] = useState<Qur>("hayd");
  const [today] = useDate(initialDate);
  const t = parseYmd(today);
  const b = parseYmd(bidaya);
  const bidayaLabel = naw === "wafat" ? "تاريخ الوفاة" : naw === "haml" ? "تاريخ الوفاة أو الطلاق" : "تاريخ الطلاق";

  let natija: ReactNode = <p className="date-calc-note">أدخل التاريخ.</p>;
  if (b && naw === "wafat") {
    const r = iddatWafat(b);
    natija = (
      <div className="date-calc-results">
        <Stat main label="تنتهي العدة بالأشهر الهجرية" value={tarikh(r.bilAhilla)} note={`أربعة أشهر هجرية وعشرة أيام (${adadAr(diffDays(b, r.bilAhilla), "yawm")}) · ${baqi(r.bilAhilla, t)}`} />
        <Stat label="إن عُدّت الأشهر بالأيام (130 يومًا)" value={tarikh(r.bilAyyam)} note="قول من يرى أن الوفاة إذا وقعت في أثناء الشهر تُحسب الأشهر ثلاثين يومًا" />
      </div>
    );
  } else if (b && naw === "ayisa") {
    const r = iddatAshhur(b);
    natija = (
      <div className="date-calc-results">
        <Stat main label="تنتهي العدة بالأشهر الهجرية" value={tarikh(r.bilAhilla)} note={`ثلاثة أشهر هجرية (${adadAr(diffDays(b, r.bilAhilla), "yawm")}) · ${baqi(r.bilAhilla, t)}`} />
        <Stat label="إن عُدّت الأشهر بالأيام (90 يومًا)" value={tarikh(r.bilAyyam)} />
      </div>
    );
  } else if (b && naw === "haml") {
    const w = parseYmd(wiladaMutawaqqaa);
    natija = (
      <div className="date-calc-results">
        <Stat main label="تنتهي العدة بوضع الحمل" value={w ? tarikh(w) : "—"} note={w ? `موعد الولادة المتوقع · ${baqi(w, t)}` : "أدخل موعد الولادة المتوقع"} />
        <Stat label="ماذا لو تأخرت الولادة أو تقدمت؟" value="العبرة بالولادة الفعلية" note="ولو وضعت بعد الوفاة بلحظة انقضت عدتها عند جمهور الفقهاء" />
      </div>
    );
  } else if (b && naw === "hayd") {
    const a = parseYmd(akhir);
    const r = a ? iddatQuru(b, a, arNumber(dawra), arNumber(muddat), qur) : null;
    natija = r ? (
      <div className="date-calc-results">
        <Stat main label="تنتهي العدة تقريبًا" value={tarikh(r.nihaya)} note={`${adadAr(r.ayyam, "yawm")} من الطلاق · ${baqi(r.nihaya, t)}`} />
        <Stat
          label="الحيضات المتوقعة بعد الطلاق"
          value={r.badaya.map((x) => miladiNass(x, false)).join(" · ")}
          note={r.fiHayd ? "وقع الطلاق في أثناء الحيض، فلا تُحسب هذه الحيضة" : "وقع الطلاق في الطهر"}
        />
      </div>
    ) : (
      <p className="date-calc-note">تأكد أن بداية آخر حيضة قبل الطلاق، وأن طول الدورة بين 15 و90 يومًا ومدة الحيض أقل منها.</p>
    );
  }

  return (
    <div className="date-calc">
      <Modes label="نوع العدة" value={naw} options={IDDA_ANWA} onChange={setNaw} />
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <DateField label={bidayaLabel} value={bidaya} onChange={setBidaya} />
          {naw === "haml" ? <DateField label="موعد الولادة المتوقع" value={wiladaMutawaqqaa} onChange={setWilada} /> : null}
          {naw === "hayd" ? (
            <>
              <DateField label="بداية آخر حيضة قبل الطلاق" value={akhir} onChange={setAkhir} />
              <NumField label="طول الدورة (يوم)" value={dawra} onChange={setDawra} />
              <NumField label="مدة الحيض (يوم)" value={muddat} onChange={setMuddat} />
            </>
          ) : null}
        </div>
        {naw === "hayd" ? (
          <Modes
            label="معنى القرء"
            value={qur}
            options={[
              ["hayd", "القرء: الحيض (الحنفية والحنابلة)"],
              ["tuhr", "القرء: الطهر (المالكية والشافعية)"],
            ]}
            onChange={setQur}
          />
        ) : null}
      </div>
      {natija}
      <p className="date-calc-note">
        {naw === "hayd"
          ? "تقدير مبني على انتظام الدورة؛ العبرة بالحيض الفعلي، والمرأة مؤتمنة على عدتها."
          : "الأشهر الهجرية حسب تقويم أم القرى؛ قد يختلف أول الشهر برؤية الهلال في بلدك يومًا."}{" "}
        للحالات الخاصة (الرجعة، انقطاع الحيض، الشك) راجعي جهة الإفتاء في بلدك.
      </p>
    </div>
  );
}

/* ---------------- العقيقة ---------------- */

export function AqiqahCalculator({ initialDate }: { initialDate: string }) {
  const [wilada, setWilada] = useDate(initialDate);
  const [madhhab, setMadhhab] = useState<"jumhur" | "maliki">("jumhur");
  const [qablFajr, setQablFajr] = useState(false);
  const [today] = useDate(initialDate);
  const t = parseYmd(today);
  const w = parseYmd(wilada);
  const mahsub = madhhab === "jumhur" || qablFajr;
  const r = w ? ayyamAqiqa(w, mahsub) : null;

  return (
    <div className="date-calc">
      <Modes
        label="طريقة العد"
        value={madhhab}
        options={[
          ["jumhur", "الجمهور: يُحسب يوم الولادة"],
          ["maliki", "المالكية"],
        ]}
        onChange={setMadhhab}
      />
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <DateField label="تاريخ الولادة" value={wilada} onChange={setWilada} />
        </div>
        {madhhab === "maliki" ? (
          <label className="date-calc-check">
            <input type="checkbox" checked={qablFajr} onChange={(e) => setQablFajr(e.target.checked)} />
            وُلد قبل طلوع الفجر
          </label>
        ) : null}
      </div>
      {r ? (
        <div className="date-calc-results">
          {r.map((x, i) => (
            <Stat
              key={x.n}
              main={i === 0}
              label={i === 0 ? "اليوم السابع (موعد العقيقة)" : i === 1 ? "اليوم الرابع عشر" : "اليوم الحادي والعشرون"}
              value={tarikh(x.tarikh)}
              note={i === 0 ? `${mahsub ? "يوم الولادة هو اليوم الأول" : "يبدأ العد من اليوم التالي للولادة"} · ${baqi(x.tarikh, t)}` : baqi(x.tarikh, t)}
            />
          ))}
        </div>
      ) : (
        <p className="date-calc-note">أدخل تاريخ الولادة.</p>
      )}
      <p className="date-calc-note">
        السابع هو المستحب عند الجميع، والرابع عشر ثم الحادي والعشرون عند من قال به (كالحنابلة). يُستحب في السابع أيضًا حلق الرأس والتسمية.
      </p>
    </div>
  );
}

/* ---------------- قصر الصلاة ---------------- */

export function QasrCalculator() {
  const [km, setKm] = useState("120");
  const [ayyam, setAyyam] = useState("3");
  const [majhul, setMajhul] = useState(false);
  const [madhhab, setMadhhab] = useState<MadhhabIqama>("jumhur");
  const r = hukmQasr(arNumber(km), majhul ? null : arNumber(ayyam), madhhab);
  const hadd = IQAMA[madhhab].ayyam;

  return (
    <div className="date-calc">
      <Modes
        label="مدة الإقامة"
        value={madhhab}
        options={[
          ["jumhur", "الجمهور: أربعة أيام"],
          ["hanafi", "الحنفية: خمسة عشر يومًا"],
        ]}
        onChange={setMadhhab}
      />
      <div className="date-calc-input">
        <div className="date-calc-fields is-amounts">
          <NumField label="مسافة السفر (كم، ذهابًا فقط)" value={km} onChange={setKm} />
          {!majhul ? <NumField label="الأيام التي تنوي الإقامة فيها" value={ayyam} onChange={setAyyam} /> : null}
        </div>
        <label className="date-calc-check">
          <input type="checkbox" checked={majhul} onChange={(e) => setMajhul(e.target.checked)} />
          لا أدري متى تنقضي حاجتي
        </label>
      </div>
      {r ? (
        <div className="date-calc-results">
          <Stat
            main
            label="الحكم"
            value={r.yaqsur ? "أنت مسافر: تقصر الصلاة الرباعية" : "تتم الصلاة"}
            note={
              !r.masafa
                ? `المسافة أقل من نحو ${MASAFAT_QASR_KM} كم`
                : r.iqamaTawila
                  ? madhhab === "jumhur"
                    ? "نية الإقامة أكثر من أربعة أيام تقطع حكم السفر"
                    : "نية الإقامة خمسة عشر يومًا فأكثر تقطع حكم السفر"
                  : majhul
                    ? "تقصر ما دمت لا تدري متى تنقضي حاجتك ولو طالت المدة"
                    : `الإقامة دون حد ${adadAr(hadd, "yawm")}`
            }
          />
          {r.yaqsur ? (
            <Stat label="كيف تصلي؟" value="الظهر والعصر والعشاء ركعتين" note="الفجر ركعتان والمغرب ثلاث كما هي، ويجوز الجمع عند الحاجة عند الجمهور" />
          ) : null}
        </div>
      ) : (
        <p className="date-calc-note">أدخل المسافة بالكيلومتر.</p>
      )}
      <p className="date-calc-note">
        مسافة القصر عند الجمهور أربعة برد، وتُقدّر في الفتاوى المعاصرة بنحو 80 كم (وقيل 81 إلى 89 كم)، ويرى بعض العلماء كابن تيمية أن المرجع العرف. يبدأ القصر بعد مفارقة
        عمران البلد.
      </p>
    </div>
  );
}

/* ---------------- حول زكاة المدخرات ---------------- */

export function ZakatHawlCalculator({ initialDate }: { initialDate: string }) {
  const [bulugh, setBulugh] = useDate(initialDate, -300);
  const [rasid, setRasid] = useState("");
  const [siar, setSiar] = useState("");
  const [nisab, setNisab] = useState<"dhahab" | "fidda">("dhahab");
  const [sana, setSana] = useState<"hijri" | "miladi">("hijri");
  const [today] = useDate(initialDate);
  const t = parseYmd(today);
  const b = parseYmd(bulugh);
  const r = b ? hawlZakat(b, rasid.trim() ? arNumber(rasid) : 0, arNumber(siar), nisab, sana === "miladi") : null;

  return (
    <div className="date-calc">
      <Modes
        label="النصاب"
        value={nisab}
        options={[
          ["dhahab", `نصاب الذهب (${NISAB_DHAHAB_G} جرامًا عيار 24)`],
          ["fidda", `نصاب الفضة (${NISAB_FIDDA_G} جرامًا)`],
        ]}
        onChange={setNisab}
      />
      <Modes
        label="السنة"
        value={sana}
        options={[
          ["hijri", "حول هجري (2.5%)"],
          ["miladi", "سنة ميلادية (2.577%)"],
        ]}
        onChange={setSana}
      />
      <div className="date-calc-input">
        <div className="date-calc-fields is-amounts">
          <DateField label="تاريخ بلوغ مدخراتك النصاب أول مرة" value={bulugh} onChange={setBulugh} />
          <NumField label={`سعر جرام ${nisab === "dhahab" ? "الذهب عيار 24" : "الفضة"} اليوم (بعملتك)`} value={siar} onChange={setSiar} />
          <NumField label="رصيدك المدخر يوم الحول" value={rasid} onChange={setRasid} />
        </div>
      </div>
      {r ? (
        <div className="date-calc-results">
          <Stat main label="يوم حولان الحول" value={tarikh(r.hawl)} note={baqi(r.hawl, t)} />
          <Stat
            label={r.balagha ? "الزكاة الواجبة يوم الحول" : "لم يبلغ الرصيد النصاب"}
            value={f(r.zakat)}
            note={r.balagha ? `${sana === "miladi" ? "2.577%" : "2.5% (ربع العشر)"} من كل الرصيد، ومنه ما أُضيف من الراتب خلال السنة` : "لا زكاة حتى يبلغ النصاب ويحول عليه الحول من جديد"}
          />
          <Stat label="قيمة النصاب بسعرك" value={f(r.nisab)} />
        </div>
      ) : (
        <p className="date-calc-note">أدخل سعر الجرام اليوم لمعرفة قيمة النصاب.</p>
      )}
      <p className="date-calc-note">
        طريقة الحول الواحد: من يدخر من راتبه كل شهر يجعل لماله كله حولًا واحدًا يبدأ من يوم بلوغه النصاب، فيزكي يومها كل ما عنده، ويكون ما لم يحل عليه
        الحول زكاة معجلة. من حسب بالسنة الميلادية زاد النسبة إلى 2.577% لأنها أطول من الهجرية بنحو 11 يومًا.
      </p>
    </div>
  );
}
