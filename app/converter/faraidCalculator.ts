// حاسبة المواريث (الفرائض) -- تغطي الحالة "الأساسية" الأكثر شيوعًا فقط:
// الزوج/الزوجات، الأب، الأم، الأبناء والبنات، الإخوة والأخوات الأشقاء.
// لا تغطي: الأجداد والجدات، أبناء الابن، أولاد الإخوة، الإخوة لأب أو لأم،
// الأعمام، أو أي حالة ميراث بالتعصيب البعيد (ذوو الأرحام). إذا كانت
// الحالة الحقيقية تحتوي على وارث من هؤلاء غير المدعومين هنا، فالنتيجة
// غير موثوقة ويجب اللجوء لعالم شرعي أو محكمة مختصة.
//
// الأحكام المطبقة هنا هي محل اتفاق جمهور الفقهاء في الحالات الأساسية،
// باستثناء نقطتين مختلف فيهما بين المذاهب تم توضيحهما في الكود:
// 1) "الرد" (إعادة الفائض على أصحاب الفروض عند عدم وجود عصبة) مطبق هنا
//    وفق مذهبي الحنفية والحنابلة؛ الشافعية والمالكية تقليديًا لا يطبقونه.
// 2) "العمريتان/الغراوين" (زوج أو زوجة + أب + أم بلا فرع وارث ولا إخوة)
//    مطبقة هنا وفق قول الجمهور (الأم تأخذ ثلث الباقي لا ثلث التركة).

export type FaraidInput = {
  husband: boolean;
  wivesCount: number;
  father: boolean;
  mother: boolean;
  sons: number;
  daughters: number;
  fullBrothers: number;
  fullSisters: number;
};

export type FaraidHeirShare = {
  id: string;
  label: string;
  totalShareFraction: number;
  headCount: number;
  perPersonFraction: number;
  reason: string;
};

export type FaraidResult = {
  shares: FaraidHeirShare[];
  awlApplied: boolean;
  raddApplied: boolean;
  unresolvedFraction: number;
  totalFraction: number;
};

function addShare(
  map: Map<string, { fraction: number; headCount: number; label: string; reason: string }>,
  id: string,
  fraction: number,
  headCount: number,
  label: string,
  reason: string
) {
  const existing = map.get(id);
  if (existing) {
    existing.fraction += fraction;
  } else {
    map.set(id, { fraction, headCount, label, reason });
  }
}

export function computeFaraid(input: FaraidInput): FaraidResult | null {
  const husband = input.husband;
  const wivesCount = Math.max(0, Math.floor(input.wivesCount) || 0);
  const father = input.father;
  const mother = input.mother;
  const sons = Math.max(0, Math.floor(input.sons) || 0);
  const daughters = Math.max(0, Math.floor(input.daughters) || 0);
  const fullBrothers = Math.max(0, Math.floor(input.fullBrothers) || 0);
  const fullSisters = Math.max(0, Math.floor(input.fullSisters) || 0);

  const hasSpouseClaim = husband || wivesCount > 0;
  const hasDescendant = sons > 0 || daughters > 0;
  const hasSon = sons > 0;
  const siblingCountForMother = fullBrothers + fullSisters;
  const siblingsBlocked = father || hasSon;

  const fixed = new Map<string, { fraction: number; headCount: number; label: string; reason: string }>();

  // 1) الزوج/الزوجات (ثابت دائمًا، لا يتأثر بالرد ولا يُحجب)
  if (husband) {
    const fraction = hasDescendant ? 1 / 4 : 1 / 2;
    addShare(fixed, "husband", fraction, 1, "الزوج", hasDescendant ? "1/4 لوجود فرع وارث" : "1/2 لعدم وجود فرع وارث");
  }
  if (wivesCount > 0) {
    const fraction = hasDescendant ? 1 / 8 : 1 / 4;
    addShare(fixed, "wives", fraction, wivesCount, wivesCount > 1 ? "الزوجات" : "الزوجة", hasDescendant ? "1/8 مجتمعة لوجود فرع وارث" : "1/4 مجتمعة لعدم وجود فرع وارث");
  }

  // 2) حالة "العمريتين/الغراوين": زوج أو زوجة + أب + أم، بلا فرع وارث وبلا إخوة
  const isGharrawayn =
    father && mother && hasSpouseClaim && !hasDescendant && siblingCountForMother === 0;

  // 3) الأم
  if (mother) {
    if (isGharrawayn) {
      const spouseFraction = fixed.get("husband")?.fraction ?? fixed.get("wives")?.fraction ?? 0;
      const remainderAfterSpouse = 1 - spouseFraction;
      addShare(fixed, "mother", remainderAfterSpouse / 3, 1, "الأم", "ثلث الباقي بعد نصيب الزوج/الزوجة (حالة العمريتين)");
    } else if (hasDescendant || siblingCountForMother >= 2) {
      addShare(fixed, "mother", 1 / 6, 1, "الأم", "1/6 لوجود فرع وارث أو وجود أخوين فأكثر");
    } else {
      addShare(fixed, "mother", 1 / 3, 1, "الأم", "1/3 لعدم وجود فرع وارث وأقل من أخوين");
    }
  }

  // 4) الأب: نصيب ثابت 1/6 إن وجد فرع وارث (يُضاف له التعصيب لاحقًا إن لم يوجد ابن)
  const fatherTakesResidue = father && !hasSon;
  if (father && hasDescendant) {
    addShare(fixed, "father", 1 / 6, 1, "الأب", "1/6 لوجود فرع وارث");
  }

  // 5) البنات: نصيب ثابت فقط إذا لم يوجد ابن (وإلا يصبحن عصبة مع الابن لاحقًا)
  const daughtersFixedApplied = !hasSon && daughters > 0;
  if (daughtersFixedApplied) {
    const fraction = daughters === 1 ? 1 / 2 : 2 / 3;
    addShare(fixed, "daughters", fraction, daughters, daughters > 1 ? "البنات" : "البنت", daughters === 1 ? "1/2 لبنت واحدة" : "2/3 مجتمعة لبنتين فأكثر");
  }

  // 6) الأخوات الشقيقات: نصيب ثابت فقط إذا لم يُحجبن ولا يوجد إخوة (أشقاء ذكور)
  //    ولسن عصبة مع البنات (حالة أخرى أدناه)
  const sistersAsabaWithDaughters =
    !siblingsBlocked && fullSisters > 0 && fullBrothers === 0 && daughtersFixedApplied;
  const sistersFixedApplied =
    !siblingsBlocked && fullSisters > 0 && fullBrothers === 0 && !sistersAsabaWithDaughters;
  if (sistersFixedApplied) {
    const fraction = fullSisters === 1 ? 1 / 2 : 2 / 3;
    addShare(fixed, "sisters", fraction, fullSisters, fullSisters > 1 ? "الأخوات الشقيقات" : "الأخت الشقيقة", fullSisters === 1 ? "1/2 لأخت واحدة" : "2/3 مجتمعة لأختين فأكثر");
  }

  const totalFixed = [...fixed.values()].reduce((sum, entry) => sum + entry.fraction, 0);

  let awlApplied = false;
  if (totalFixed > 1 + 1e-9) {
    awlApplied = true;
    const scale = 1 / totalFixed;
    for (const entry of fixed.values()) {
      entry.fraction *= scale;
    }
  }

  const finalTotalFixed = [...fixed.values()].reduce((sum, entry) => sum + entry.fraction, 0);
  let remainder = Math.max(0, 1 - finalTotalFixed);
  let raddApplied = false;

  const residueClaimants = new Map<string, { fraction: number; headCount: number; label: string; reason: string }>();

  if (!awlApplied && remainder > 1e-9) {
    const candidates: Array<{ id: string; weight: number; headCount: number; label: string; reason: string }> = [];

    if (fatherTakesResidue) {
      candidates.push({ id: "father", weight: 1, headCount: 1, label: "الأب", reason: "الباقي تعصيبًا" });
    }
    if (hasSon) {
      candidates.push({ id: "sons", weight: sons * 2, headCount: sons, label: sons > 1 ? "الأبناء" : "الابن", reason: "الباقي تعصيبًا (للذكر مثل حظ الأنثيين)" });
      if (daughters > 0) {
        candidates.push({ id: "daughters", weight: daughters * 1, headCount: daughters, label: daughters > 1 ? "البنات" : "البنت", reason: "الباقي تعصيبًا مع الإخوة (للذكر مثل حظ الأنثيين)" });
      }
    }
    if (!siblingsBlocked) {
      if (fullBrothers > 0) {
        candidates.push({ id: "brothers", weight: fullBrothers * 2, headCount: fullBrothers, label: fullBrothers > 1 ? "الإخوة الأشقاء" : "الأخ الشقيق", reason: "الباقي تعصيبًا (للذكر مثل حظ الأنثيين)" });
        if (fullSisters > 0) {
          candidates.push({ id: "sisters", weight: fullSisters * 1, headCount: fullSisters, label: fullSisters > 1 ? "الأخوات الشقيقات" : "الأخت الشقيقة", reason: "الباقي تعصيبًا مع الإخوة (للذكر مثل حظ الأنثيين)" });
        }
      } else if (sistersAsabaWithDaughters) {
        candidates.push({ id: "sisters", weight: 1, headCount: fullSisters, label: fullSisters > 1 ? "الأخوات الشقيقات" : "الأخت الشقيقة", reason: "عصبة مع البنات (تأخذ الباقي بعد نصيب البنات)" });
      }
    }

    const totalWeight = candidates.reduce((sum, item) => sum + item.weight, 0);

    if (totalWeight > 0) {
      for (const candidate of candidates) {
        const share = (remainder * candidate.weight) / totalWeight;
        addShare(residueClaimants, candidate.id, share, candidate.headCount, candidate.label, candidate.reason);
      }
      remainder = 0;
    } else {
      const raddEligibleIds = [...fixed.keys()].filter((id) => id !== "husband" && id !== "wives");
      if (raddEligibleIds.length > 0) {
        raddApplied = true;
        const raddBaseTotal = raddEligibleIds.reduce((sum, id) => sum + (fixed.get(id)?.fraction ?? 0), 0);
        for (const id of raddEligibleIds) {
          const entry = fixed.get(id);
          if (!entry || raddBaseTotal <= 0) continue;
          const addition = remainder * (entry.fraction / raddBaseTotal);
          entry.fraction += addition;
        }
        remainder = 0;
      }
      // لا يوجد عصبة ولا وارث آخر يستحق الرد (فقط زوج/زوجة موجودون): يبقى الباقي
      // غير مخصص عمدًا -- لا نفترض أن الزوج يأخذه، لاحتمال وجود ورثة آخرين غير
      // مدعومين في هذه الحاسبة (كالإخوة لأب أو الأجداد).
    }
  }

  const merged = new Map(fixed);
  for (const [id, entry] of residueClaimants) {
    const existing = merged.get(id);
    if (existing) {
      existing.fraction += entry.fraction;
      existing.reason = `${existing.reason} + ${entry.reason}`;
    } else {
      merged.set(id, entry);
    }
  }

  if (merged.size === 0) {
    return null;
  }

  const shares: FaraidHeirShare[] = [...merged.entries()].map(([id, entry]) => ({
    id,
    label: entry.label,
    totalShareFraction: entry.fraction,
    headCount: entry.headCount,
    perPersonFraction: entry.headCount > 0 ? entry.fraction / entry.headCount : entry.fraction,
    reason: entry.reason,
  }));

  const totalFraction = shares.reduce((sum, item) => sum + item.totalShareFraction, 0);

  return {
    shares,
    awlApplied,
    raddApplied,
    unresolvedFraction: Math.max(0, 1 - totalFraction),
    totalFraction,
  };
}
