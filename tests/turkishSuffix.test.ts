import { describe, expect, it } from "vitest";
import { trEitherQuestion, trQuestionParticle } from "../app/converter/turkishSuffix";

describe("trQuestionParticle", () => {
  it("follows vowel harmony", () => {
    expect(trQuestionParticle("Mars")).toBe("mı");
    expect(trQuestionParticle("Jüpiter")).toBe("mi");
    expect(trQuestionParticle("Plüton")).toBe("mu");
    expect(trQuestionParticle("Merkür")).toBe("mü");
    expect(trQuestionParticle("Bakır")).toBe("mı");
    expect(trQuestionParticle("Alüminyum")).toBe("mu");
    expect(trQuestionParticle("İzmir")).toBe("mi");
  });

  it("builds either-or questions", () => {
    expect(trEitherQuestion("Mars", "Ay")).toBe("Mars mı Ay mı");
    expect(trEitherQuestion("Dünya", "Neptün")).toBe("Dünya mı Neptün mü");
  });
});

import { trAblative, trDative, trGenitive, trLocative } from "../app/converter/turkishSuffix";

describe("case suffixes", () => {
  it("genitive", () => {
    expect(trGenitive("Ankara")).toBe("Ankara'nın");
    expect(trGenitive("Mars")).toBe("Mars'ın");
    expect(trGenitive("İzmir")).toBe("İzmir'in");
    expect(trGenitive("Plüton")).toBe("Plüton'un");
    expect(trGenitive("Merkür")).toBe("Merkür'ün");
    expect(trGenitive("Denali")).toBe("Denali'nin");
    expect(trGenitive("6")).toBe("6'nın");
    expect(trGenitive("3")).toBe("3'ün");
    expect(trGenitive("40")).toBe("40'ın");
    expect(trGenitive("100")).toBe("100'ün");
    expect(trGenitive("K2")).toBe("K2'nin");
  });
  it("ablative and locative", () => {
    expect(trAblative("Ay")).toBe("Ay'dan");
    expect(trAblative("Mars")).toBe("Mars'tan");
    expect(trAblative("Jüpiter")).toBe("Jüpiter'den");
    expect(trAblative("Bakır")).toBe("Bakır'dan");
    expect(trLocative("Ankara")).toBe("Ankara'da");
    expect(trLocative("Muş")).toBe("Muş'ta");
    expect(trLocative("Rize")).toBe("Rize'de");
  });
  it("dative", () => {
    expect(trDative("Everest")).toBe("Everest'e");
    expect(trDative("Denali")).toBe("Denali'ye");
    expect(trDative("6")).toBe("6'ya");
    expect(trDative("9")).toBe("9'a");
    expect(trDative("2")).toBe("2'ye");
  });
});
