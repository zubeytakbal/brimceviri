// Titrasyon (asit-baz notrlesme) hesaplama -- esdeger noktasinda
// asitten acsiga cikan H+ sayisi ile bazin notrledigi OH- sayisi esitlenir:
// Ca * Va * asitDegerlik = Cb * Vb * bazDegerlik.

export type TitrationTarget = "ca" | "va" | "cb" | "vb";

export type TitrationInput = {
  target: TitrationTarget;
  ca: number;
  va: number;
  cb: number;
  vb: number;
  asitDegerlik: number;
  bazDegerlik: number;
};

export type TitrationResult = {
  ca: number;
  va: number;
  cb: number;
  vb: number;
  asitDegerlik: number;
  bazDegerlik: number;
};

export function calculateTitration(
  input: TitrationInput
): TitrationResult | null {
  const { target, ca, va, cb, vb, asitDegerlik, bazDegerlik } = input;

  if (!Number.isFinite(asitDegerlik) || asitDegerlik <= 0) {
    return null;
  }

  if (!Number.isFinite(bazDegerlik) || bazDegerlik <= 0) {
    return null;
  }

  if (target === "ca") {
    if (!Number.isFinite(va) || va <= 0) {
      return null;
    }

    if (!Number.isFinite(cb) || cb < 0) {
      return null;
    }

    if (!Number.isFinite(vb) || vb < 0) {
      return null;
    }

    return {
      ca: (cb * vb * bazDegerlik) / (va * asitDegerlik),
      va,
      cb,
      vb,
      asitDegerlik,
      bazDegerlik,
    };
  }

  if (target === "va") {
    if (!Number.isFinite(ca) || ca <= 0) {
      return null;
    }

    if (!Number.isFinite(cb) || cb < 0) {
      return null;
    }

    if (!Number.isFinite(vb) || vb < 0) {
      return null;
    }

    return {
      ca,
      va: (cb * vb * bazDegerlik) / (ca * asitDegerlik),
      cb,
      vb,
      asitDegerlik,
      bazDegerlik,
    };
  }

  if (target === "cb") {
    if (!Number.isFinite(ca) || ca < 0) {
      return null;
    }

    if (!Number.isFinite(va) || va < 0) {
      return null;
    }

    if (!Number.isFinite(vb) || vb <= 0) {
      return null;
    }

    return {
      ca,
      va,
      cb: (ca * va * asitDegerlik) / (vb * bazDegerlik),
      vb,
      asitDegerlik,
      bazDegerlik,
    };
  }

  if (!Number.isFinite(ca) || ca < 0) {
    return null;
  }

  if (!Number.isFinite(va) || va < 0) {
    return null;
  }

  if (!Number.isFinite(cb) || cb <= 0) {
    return null;
  }

  return {
    ca,
    va,
    cb,
    vb: (ca * va * asitDegerlik) / (cb * bazDegerlik),
    asitDegerlik,
    bazDegerlik,
  };
}
