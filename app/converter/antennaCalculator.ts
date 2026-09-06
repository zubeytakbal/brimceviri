export type AntennaLengths = {
  fullWavelengthM: number;
  halfWaveDipoleM: number;
  quarterWaveVerticalM: number;
};

// Yarim dalga dipol ve ceyrek dalga vertikal formulleri, uc etkisini
// (end effect) hesaba katan pratik katsayilari kullanir (142.5 ve
// 71.25); tam dalga boyu ise serbest uzaydaki teorik degerdir (300/f).
export function calculateAntennaLengths(
  frequencyMHz: number
): AntennaLengths | null {
  if (!Number.isFinite(frequencyMHz) || frequencyMHz <= 0) {
    return null;
  }

  return {
    fullWavelengthM: 300 / frequencyMHz,
    halfWaveDipoleM: 142.5 / frequencyMHz,
    quarterWaveVerticalM: 71.25 / frequencyMHz,
  };
}

export function calculateResonantFrequencyFromDipole(
  dipoleLengthM: number
): number | null {
  if (!Number.isFinite(dipoleLengthM) || dipoleLengthM <= 0) {
    return null;
  }

  return 142.5 / dipoleLengthM;
}
