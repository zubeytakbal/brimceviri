import { describe, expect, it } from "vitest";
import { compass, directSunMinutes, heightByReference, heightFromShadow, noonElevation, perpendicularTilt, shadowLength } from "../app/converter/time/sunGeometry";

const ANKARA = [39.9199, 32.8543] as const;

describe("gölge geometrisi", () => {
  it("45°'de gölge boya eşit, 30°'de √3 katı", () => {
    expect(shadowLength(10, 45)).toBeCloseTo(10, 6);
    expect(shadowLength(1, 30)).toBeCloseTo(Math.sqrt(3), 6);
    expect(shadowLength(1, -2)).toBeNull();
  });
  it("gölgeden yükseklik ve referans çubuk yöntemi", () => {
    expect(heightFromShadow(10, 45)).toBeCloseTo(10, 6);
    expect(heightByReference(1, 1.5, 18)).toBeCloseTo(12, 6);
  });
  it("pusula yönleri", () => {
    expect(compass(0)).toBe("K");
    expect(compass(180)).toBe("G");
    expect(compass(135)).toBe("GD");
    expect(compass(359)).toBe("K");
  });
});

describe("öğle güneşi (Ankara)", () => {
  // Öğle yüksekliği ≈ 90° − enlem ± eğiklik (23,44°) + kırılma.
  it("21 Aralık ≈ 26,7°, 21 Haziran ≈ 73,5°", () => {
    expect(noonElevation(2026, 12, 21, ...ANKARA)).toBeCloseTo(26.7, 0);
    expect(noonElevation(2026, 6, 21, ...ANKARA)).toBeCloseTo(73.5, 0);
    expect(perpendicularTilt(30)).toBe(60);
  });
});

describe("pencere güneş alır mı", () => {
  it("engel yokken güneye bakan pencere aralıkta tüm gündüz güneş alır", () => {
    const r = directSunMinutes(2026, 12, 21, ...ANKARA, 180, 0, 20);
    expect(r.minutes).toBeGreaterThan(8 * 60);
  });
  it("31° engel aralık öğle güneşini (26,7°) keser", () => {
    expect(directSunMinutes(2026, 12, 21, ...ANKARA, 180, 12, 20).minutes).toBe(0);
    expect(directSunMinutes(2026, 3, 21, ...ANKARA, 180, 12, 20).minutes).toBeGreaterThan(0);
  });
  it("kuzeye bakan pencere aralıkta hiç güneş almaz", () => {
    expect(directSunMinutes(2026, 12, 21, ...ANKARA, 0, 0, 20).minutes).toBe(0);
  });
});
