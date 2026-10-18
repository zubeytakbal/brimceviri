export type FormworkElement = "doseme" | "kolon" | "kiris" | "tekil-temel";

export type FormworkInput = {
  element: FormworkElement;
  lengthM: number;
  widthM: number;
  heightM: number;
  quantity: number;
};

export type FormworkResult = {
  areaPerElementM2: number;
  totalAreaM2: number;
  quantity: number;
};

export function calculateFormworkArea(input: FormworkInput): FormworkResult | null {
  const { element, lengthM, widthM, heightM, quantity } = input;
  const dimensions = element === "doseme" ? [lengthM, widthM] : [lengthM, widthM, heightM];

  if (
    !["doseme", "kolon", "kiris", "tekil-temel"].includes(element) ||
    !dimensions.every((value) => Number.isFinite(value) && value > 0) ||
    !Number.isInteger(quantity) ||
    quantity < 1
  ) {
    return null;
  }

  let areaPerElementM2: number;
  switch (element) {
    case "doseme":
      areaPerElementM2 = lengthM * widthM;
      break;
    case "kolon":
    case "tekil-temel":
      areaPerElementM2 = 2 * (lengthM + widthM) * heightM;
      break;
    case "kiris":
      areaPerElementM2 = (widthM + 2 * heightM) * lengthM;
      break;
  }

  const totalAreaM2 = areaPerElementM2 * quantity;
  if (!Number.isFinite(areaPerElementM2) || !Number.isFinite(totalAreaM2)) return null;

  return { areaPerElementM2, totalAreaM2, quantity };
}
