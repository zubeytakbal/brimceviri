// "ad (sembol)" etiketi: adı sembolü zaten içeren birimlerde sembol tekrar edilmez
// ("El (hand) (hand)", "Feinsilber (999) (999)", "Gradián (gon) (gon)" olmasın).
export function adSembol(ad: string, sembol: string) {
  const kok = sembol.replace(/\s*\(.*\)$/, "").toLowerCase();
  const kelimeler = ad.toLowerCase().split(/[^\p{L}\p{N}]+/u);
  return kok && kelimeler.includes(kok) ? ad : `${ad} (${sembol})`;
}
