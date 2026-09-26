import type { FxMultiConverterLabels } from "../../components/fx/FxMultiConverter";
import { fxCurrenciesTr } from "./fxPairsTr";

export const trMultiConverterLabels: FxMultiConverterLabels = {
  amount: "Miktar",
  from: "Hangi para biriminden",
  to: "Hangi para birimine",
  swap: "Yönü değiştir",
  resultTemplate: "{amount} {from} = {result} {to}",
  rateTemplate: "Kullanılan kur: 1 {from} = {rate} {to}",
  invalid: "Geçerli bir miktar gir (ör. 250 veya 1.250,50).",
};

export const trMultiConverterOptions = Object.values(fxCurrenciesTr).map((currency) => ({
  code: currency.code,
  label: `${currency.long} (${currency.code})`,
}));

// Istemciye tum 160+ kur yerine yalnizca secilebilir kurlar gonderilir.
export function pickRates(rates: Record<string, number>): Record<string, number> {
  return Object.fromEntries(Object.keys(fxCurrenciesTr).flatMap((code) => (rates[code] ? [[code, rates[code]]] : [])));
}
