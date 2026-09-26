// Ingilizce gunluk araclarin hesap motorlari -- bilinen referans degerler.
import { describe, expect, it } from "vitest";
import {
  calorieTargets,
  cmToFeetInches,
  convertFuelEconomy,
  feetInchesToCm,
  finalExamScoreNeeded,
  idealWeights,
  mifflinStJeorBmr,
  usLetterGrade,
  weightedGrade,
} from "../app/converter/englishEverydayFormulas";

describe("boy", () => {
  it("180 cm = 5 ft 10.87 in", () => {
    const result = cmToFeetInches(180)!;
    expect(result.feet).toBe(5);
    expect(result.inches).toBeCloseTo(10.866, 2);
  });
  it("5 ft 7 in = 170.18 cm", () => expect(feetInchesToCm(5, 7)).toBeCloseTo(170.18, 6));
  it("182.88 cm = tam 6 ft", () => {
    const result = cmToFeetInches(182.88)!;
    expect(result.feet).toBe(6);
    expect(result.inches).toBeCloseTo(0, 6);
  });
});

describe("not", () => {
  it("harf olcegi", () => {
    expect(usLetterGrade(95)).toBe("A");
    expect(usLetterGrade(89.9)).toBe("B+");
    expect(usLetterGrade(59)).toBe("F");
  });
  it("agirlikli ortalama", () => {
    const result = weightedGrade([{ score: 90, weight: 40 }, { score: 80, weight: 60 }])!;
    expect(result.percent).toBeCloseTo(84, 9);
    expect(result.letter).toBe("B");
  });
  it("final icin gereken not", () => {
    // Mevcut %85, final %30 agirlikli, hedef %90 -> (90 - 85*0.7)/0.3 = 101.67
    expect(finalExamScoreNeeded(85, 90, 30)).toBeCloseTo(101.667, 2);
  });
});

describe("kalori", () => {
  it("Mifflin-St Jeor", () => {
    expect(mifflinStJeorBmr("male", 80, 180, 30)).toBeCloseTo(1780, 9);
    expect(mifflinStJeorBmr("female", 60, 165, 30)).toBeCloseTo(1320.25, 9);
  });
  it("TDEE ve hedefler", () => {
    const result = calorieTargets("male", 80, 180, 30, "moderate")!;
    expect(result.tdee).toBeCloseTo(2759, 0);
    expect(result.goals.find((goal) => goal.id === "loss")!.calories).toBeCloseTo(2259, 0);
  });
});

describe("ideal kilo", () => {
  it("Devine erkek 6 ft = 77.6 kg", () => {
    const devine = idealWeights("male", 182.88)!.formulas.find((formula) => formula.id === "devine")!;
    expect(devine.kg).toBeCloseTo(77.6, 6);
  });
});

describe("yakit tuketimi", () => {
  it("30 mpg (US) = 7.84 L/100 km", () => expect(convertFuelEconomy(30, "mpg-us")!["l-100km"]).toBeCloseTo(7.8405, 3));
  it("5 L/100 km = 56.5 mpg (UK)", () => expect(convertFuelEconomy(5, "l-100km")!["mpg-uk"]).toBeCloseTo(56.496, 2));
  it("gidis-donus tutarli", () => {
    const toKmL = convertFuelEconomy(42, "mpg-uk")!["km-l"];
    expect(convertFuelEconomy(toKmL, "km-l")!["mpg-uk"]).toBeCloseTo(42, 9);
  });
});

describe("sayfa metinlerindeki ornekler", () => {
  it("not ornegi %84 ve final icin %104 / %94", () => {
    const current = weightedGrade([{ score: 92, weight: 20 }, { score: 85, weight: 20 }, { score: 78, weight: 30 }])!;
    expect(current.percent).toBeCloseTo(84, 9);
    expect(finalExamScoreNeeded(current.percent, 90, 30)).toBeCloseTo(104, 6);
    expect(finalExamScoreNeeded(current.percent, 87, 30)).toBeCloseTo(94, 6);
  });
  it("ideal kilo SSS araliklari", () => {
    const lb = (kg: number) => kg / 0.45359237;
    const woman = idealWeights("female", 66 * 2.54)!.formulas.map((formula) => lb(formula.kg));
    expect(Math.round(Math.min(...woman))).toBe(129);
    expect(Math.round(Math.max(...woman))).toBe(135);
    const man = idealWeights("male", 72 * 2.54)!.formulas.map((formula) => lb(formula.kg));
    expect(Math.round(Math.min(...man))).toBe(161);
    expect(Math.round(Math.max(...man))).toBe(177);
  });
});
