// Pil potansiyeli hesaplama -- standart hucre potansiyeli, katot ve
// anotun standart indirgenme potansiyelleri farkindan bulunur:
// E_hucre = E_katot - E_anot.

export type CellPotentialResult = {
  eKatot: number;
  eAnot: number;
  eHucre: number;
  kendiliginden: boolean;
};

export function calculateCellPotential(
  eKatot: number,
  eAnot: number
): CellPotentialResult | null {
  if (!Number.isFinite(eKatot) || !Number.isFinite(eAnot)) {
    return null;
  }

  const eHucre = eKatot - eAnot;

  return {
    eKatot,
    eAnot,
    eHucre,
    kendiliginden: eHucre > 0,
  };
}
