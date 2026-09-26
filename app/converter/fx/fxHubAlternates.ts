// Doviz hub sayfalari dilden dile karsilik gelir (her biri o ulkenin yerel
// parasi etrafinda kurulu doviz cevirici). Cift sayfalari ise pazara ozeldir
// (dolar-tl, sar-to-bdt, dollar-som) ve birbirinin karsiligi degildir; bu
// yuzden hreflang yalnizca hub'lar arasinda verilir.
export const fxHubAlternates = {
  tr: "/doviz-cevirici",
  bn: "/bn/currency-converter",
  "uz-UZ": "/uz/valyuta-aylantirgich",
  "x-default": "/doviz-cevirici",
};
