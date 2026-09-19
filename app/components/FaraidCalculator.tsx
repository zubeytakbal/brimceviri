"use client";

import { useMemo, useState } from "react";
import { computeFaraid } from "../converter/faraidCalculator";

function useCountField(initial = "0") {
  return useState(initial);
}

export default function FaraidCalculator() {
  const [husband, setHusband] = useState(false);
  const [wivesCount, setWivesCount] = useCountField("0");
  const [father, setFather] = useState(false);
  const [mother, setMother] = useState(false);
  const [sons, setSons] = useCountField("0");
  const [daughters, setDaughters] = useCountField("0");
  const [fullBrothers, setFullBrothers] = useCountField("0");
  const [fullSisters, setFullSisters] = useCountField("0");
  const [estateValue, setEstateValue] = useState("");

  const result = useMemo(() => {
    return computeFaraid({
      husband,
      wivesCount: Number(wivesCount) || 0,
      father,
      mother,
      sons: Number(sons) || 0,
      daughters: Number(daughters) || 0,
      fullBrothers: Number(fullBrothers) || 0,
      fullSisters: Number(fullSisters) || 0,
    });
  }, [husband, wivesCount, father, mother, sons, daughters, fullBrothers, fullSisters]);

  const noHeirsSelected =
    !husband && Number(wivesCount) === 0 && !father && !mother &&
    Number(sons) === 0 && Number(daughters) === 0 && Number(fullBrothers) === 0 && Number(fullSisters) === 0;

  const estateNumber = Number(estateValue);
  const hasEstateValue = Number.isFinite(estateNumber) && estateNumber > 0;

  return (
    <div className="category-general-converter">
      <div className="engineering-targets">
        <span>الزوج/الزوجة</span>
        <div className="engineering-target-grid hydrostatic-target-grid">
          <button
            type="button"
            className={`engineering-target-button${husband ? " is-active" : ""}`}
            onClick={() => setHusband((value) => !value)}
          >
            الهالك زوج (له زوجة أو زوجات)
          </button>
        </div>
        <label className="category-general-converter-field">
          <span>عدد الزوجات الباقيات على قيد الحياة (إن كانت الهالكة امرأة أو كان الهالك متعدد الزوجات)</span>
          <input inputMode="numeric" type="text" value={wivesCount} onChange={(event) => setWivesCount(event.target.value)} />
        </label>
      </div>

      <div className="engineering-targets">
        <span>الأصول</span>
        <div className="engineering-target-grid hydrostatic-target-grid">
          <button
            type="button"
            className={`engineering-target-button${father ? " is-active" : ""}`}
            onClick={() => setFather((value) => !value)}
          >
            الأب حي
          </button>
          <button
            type="button"
            className={`engineering-target-button${mother ? " is-active" : ""}`}
            onClick={() => setMother((value) => !value)}
          >
            الأم حية
          </button>
        </div>
      </div>

      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>عدد الأبناء (ذكور)</span>
          <input inputMode="numeric" type="text" value={sons} onChange={(event) => setSons(event.target.value)} />
        </label>
        <label className="category-general-converter-field">
          <span>عدد البنات</span>
          <input inputMode="numeric" type="text" value={daughters} onChange={(event) => setDaughters(event.target.value)} />
        </label>
        <label className="category-general-converter-field">
          <span>عدد الإخوة الأشقاء</span>
          <input inputMode="numeric" type="text" value={fullBrothers} onChange={(event) => setFullBrothers(event.target.value)} />
        </label>
        <label className="category-general-converter-field">
          <span>عدد الأخوات الشقيقات</span>
          <input inputMode="numeric" type="text" value={fullSisters} onChange={(event) => setFullSisters(event.target.value)} />
        </label>
      </div>

      <label className="category-general-converter-field">
        <span>قيمة التركة الإجمالية (اختياري، لعرض المبالغ لا النسب فقط)</span>
        <input inputMode="decimal" type="text" value={estateValue} onChange={(event) => setEstateValue(event.target.value)} />
      </label>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {noHeirsSelected ? (
          <strong>اختر الورثة الأحياء أولًا لعرض الأنصبة.</strong>
        ) : !result ? (
          <strong>
            لا يمكن حساب هذه الحالة بالورثة المدعومين في هذه الأداة. يرجى استشارة عالم شرعي أو محكمة مختصة.
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            {result.shares.map((share) => (
              <div key={share.id}>
                <span>
                  {share.label} ({share.headCount} {share.headCount > 1 ? "أشخاص" : "شخص"})
                </span>
                <strong>
                  {(share.perPersonFraction * 100).toLocaleString("ar", { maximumFractionDigits: 2 })}% لكل فرد
                  {hasEstateValue
                    ? ` — ${(share.perPersonFraction * estateNumber).toLocaleString("ar", { maximumFractionDigits: 2 })}`
                    : ""}
                </strong>
              </div>
            ))}
          </div>
        )}
      </div>

      {result && result.unresolvedFraction > 0.0001 ? (
        <p className="calculator-usage-hint">
          تنبيه: يتبقى {(result.unresolvedFraction * 100).toLocaleString("ar", { maximumFractionDigits: 2 })}%
          من التركة غير مخصص، على الأرجح لوجود ورثة آخرين غير مدعومين في هذه
          الأداة (كالإخوة لأب، أو الأجداد والجدات، أو أبناء الابن). يجب
          استشارة عالم شرعي أو محكمة مختصة لتحديد مصير هذا الباقي.
        </p>
      ) : null}

      {result?.awlApplied ? (
        <p className="calculator-usage-hint">
          تم تطبيق "العول": مجموع الأنصبة المفروضة تجاوز التركة كاملة،
          فجرى تخفيضها جميعًا بنفس النسبة حتى يتساوى المجموع مع التركة.
          هذا حكم متفق عليه بين الفقهاء.
        </p>
      ) : null}

      {result?.raddApplied ? (
        <p className="calculator-usage-hint">
          تم تطبيق "الرد": لم يوجد عاصب يأخذ الباقي، فأُعيد توزيعه على
          أصحاب الفروض (عدا الزوج والزوجة) بنسبة أنصبتهم. هذا مطبَّق هنا
          وفق مذهبي الحنفية والحنابلة؛ المذهبان المالكي والشافعي لا
          يطبقان الرد تقليديًا ويرَيان أن الباقي يذهب لبيت المال.
        </p>
      ) : null}

      <p className="calculator-usage-hint">
        <strong>تنبيه مهم:</strong> هذه الأداة تقديرية وتعليمية فقط، ولا
        تغني عن استشارة عالم شرعي موثوق أو محكمة مختصة، خصوصًا في تقسيم
        ممتلكات حقيقية. تغطي هذه الحاسبة فقط: الزوج/الزوجة، الأب، الأم،
        الأبناء والبنات، والإخوة والأخوات الأشقاء. لا تغطي الأجداد
        والجدات، أو أبناء الابن، أو الإخوة لأب أو لأم، أو أولاد الإخوة، أو
        الأعمام، أو أي حالة ميراث معقدة أخرى. تأكد أيضًا من سداد ديون
        الهالك وتنفيذ الوصية (بحد أقصى ثلث التركة) قبل توزيع الباقي على
        الورثة، فهذه الحاسبة تحسب توزيع "التركة الصافية" فقط بعد ذلك.
      </p>
    </div>
  );
}
