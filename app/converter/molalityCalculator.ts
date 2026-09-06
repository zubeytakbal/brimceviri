// Molalite (mol/kg cozucu) hesaplama -- molarite'den farkli olarak
// hacme degil cozucu kutlesine dayanir, bu yuzden sicaklikla degismez.
// m = n / kg(cozucu).

export type MolalityTarget = "molalite" | "molSayisi" | "cozucuKutlesi";

export type MolalityCalculationInput = {
  target: MolalityTarget;
  molalite: number;
  molSayisi: number;
  cozucuKutlesiKg: number;
};

export type MolalityCalculationResult = {
  molalite: number;
  molSayisi: number;
  cozucuKutlesiKg: number;
};

export function calculateMolality(
  input: MolalityCalculationInput
): MolalityCalculationResult | null {
  const { target, molalite, molSayisi, cozucuKutlesiKg } = input;

  if (target === "molalite") {
    if (!Number.isFinite(molSayisi) || molSayisi < 0) {
      return null;
    }

    if (!Number.isFinite(cozucuKutlesiKg) || cozucuKutlesiKg <= 0) {
      return null;
    }

    return {
      molalite: molSayisi / cozucuKutlesiKg,
      molSayisi,
      cozucuKutlesiKg,
    };
  }

  if (target === "molSayisi") {
    if (!Number.isFinite(molalite) || molalite < 0) {
      return null;
    }

    if (!Number.isFinite(cozucuKutlesiKg) || cozucuKutlesiKg < 0) {
      return null;
    }

    return {
      molalite,
      molSayisi: molalite * cozucuKutlesiKg,
      cozucuKutlesiKg,
    };
  }

  if (!Number.isFinite(molalite) || molalite <= 0) {
    return null;
  }

  if (!Number.isFinite(molSayisi) || molSayisi < 0) {
    return null;
  }

  return {
    molalite,
    molSayisi,
    cozucuKutlesiKg: molSayisi / molalite,
  };
}
