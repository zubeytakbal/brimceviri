// Molarite (mol/L derisim) hesaplama -- molarite, mol sayisi ve hacim
// arasindaki M = n / V bagintisina dayanir.

export type MolariteTarget = "molarite" | "molSayisi" | "hacim";

export type MolariteCalculationInput = {
  target: MolariteTarget;
  molarite: number;
  molSayisi: number;
  hacimLitre: number;
};

export type MolariteCalculationResult = {
  molarite: number;
  molSayisi: number;
  hacimLitre: number;
};

export function calculateMolarite(
  input: MolariteCalculationInput
): MolariteCalculationResult | null {
  const { target, molarite, molSayisi, hacimLitre } = input;

  if (target === "molarite") {
    if (!Number.isFinite(molSayisi) || molSayisi < 0) {
      return null;
    }

    if (!Number.isFinite(hacimLitre) || hacimLitre <= 0) {
      return null;
    }

    return { molarite: molSayisi / hacimLitre, molSayisi, hacimLitre };
  }

  if (target === "molSayisi") {
    if (!Number.isFinite(molarite) || molarite < 0) {
      return null;
    }

    if (!Number.isFinite(hacimLitre) || hacimLitre < 0) {
      return null;
    }

    return { molarite, molSayisi: molarite * hacimLitre, hacimLitre };
  }

  if (!Number.isFinite(molarite) || molarite <= 0) {
    return null;
  }

  if (!Number.isFinite(molSayisi) || molSayisi < 0) {
    return null;
  }

  return { molarite, molSayisi, hacimLitre: molSayisi / molarite };
}
