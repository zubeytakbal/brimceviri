// qSOFA (quick SOFA) hesaplama -- sepsis suphesi olan hastalarda
// yatak basi hizli risk taramasi icin kullanilan 3 kriterlik basit bir
// skordur. Bu bir tarama araci, tani koymaz.

export type QsofaInput = {
  lowBloodPressure: boolean;
  highRespiratoryRate: boolean;
  alteredMentation: boolean;
};

export function calculateQsofa(input: QsofaInput): number {
  const { lowBloodPressure, highRespiratoryRate, alteredMentation } = input;

  return (
    (lowBloodPressure ? 1 : 0) +
    (highRespiratoryRate ? 1 : 0) +
    (alteredMentation ? 1 : 0)
  );
}
