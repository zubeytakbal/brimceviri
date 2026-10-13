// Çelik profil kesit verileri. Kaynak: ArcelorMittal Europe – Sections and Merchant Bars
// Sales Programme (V2026-1) ve IPN eki; ölçüler EN 10365:2017. Her satır tests/steelSections.test.ts
// içinde formülle (kesit alanı, ağırlık, atalet ve kesit modülü) karşılaştırılır.
// Birimler: G kg/m; h, b, tw, tf, r, r2 mm; A cm²; AL m²/m; Iy, Iz cm⁴; Wel, Wpl cm³.
export type SteelSection = {
  size: number;
  G: number;
  h: number;
  b: number;
  tw: number;
  tf: number;
  r: number;
  r2?: number;
  A: number;
  AL: number;
  Iy: number;
  Wely: number;
  Wply: number;
  Iz: number;
  Welz: number;
  Wplz: number;
};

export type SteelSeriesId = "IPE" | "HEA" | "HEB" | "HEM" | "UPN" | "IPN";

export const STEEL_SECTIONS: Record<SteelSeriesId, SteelSection[]> = {
  IPE: [
    { size: 80, G: 6, h: 80, b: 46, tw: 3.8, tf: 5.2, r: 5, A: 7.6, AL: 0.328, Iy: 80.13, Wely: 20.03, Wply: 23.21, Iz: 8.489, Welz: 3.69, Wplz: 5.817 },
    { size: 100, G: 8.1, h: 100, b: 55, tw: 4.1, tf: 5.7, r: 7, A: 10.3, AL: 0.4, Iy: 171, Wely: 34.2, Wply: 39.4, Iz: 15.91, Welz: 5.788, Wplz: 9.145 },
    { size: 120, G: 10.4, h: 120, b: 64, tw: 4.4, tf: 6.3, r: 7, A: 13.2, AL: 0.475, Iy: 317.7, Wely: 52.95, Wply: 60.72, Iz: 27.66, Welz: 8.646, Wplz: 13.58 },
    { size: 140, G: 12.9, h: 140, b: 73, tw: 4.7, tf: 6.9, r: 7, A: 16.4, AL: 0.551, Iy: 541.2, Wely: 77.31, Wply: 88.34, Iz: 44.91, Welz: 12.3, Wplz: 19.24 },
    { size: 160, G: 15.8, h: 160, b: 82, tw: 5, tf: 7.4, r: 9, A: 20.1, AL: 0.623, Iy: 869.2, Wely: 108.6, Wply: 123.8, Iz: 68.31, Welz: 16.66, Wplz: 26.09 },
    { size: 180, G: 18.8, h: 180, b: 91, tw: 5.3, tf: 8, r: 9, A: 23.9, AL: 0.698, Iy: 1316, Wely: 146.3, Wply: 166.4, Iz: 100.8, Welz: 22.16, Wplz: 34.59 },
    { size: 200, G: 22.4, h: 200, b: 100, tw: 5.6, tf: 8.5, r: 12, A: 28.5, AL: 0.768, Iy: 1943, Wely: 194.3, Wply: 220.6, Iz: 142.3, Welz: 28.47, Wplz: 44.61 },
    { size: 220, G: 26.2, h: 220, b: 110, tw: 5.9, tf: 9.2, r: 12, A: 33.4, AL: 0.848, Iy: 2771, Wely: 251.9, Wply: 285.4, Iz: 204.8, Welz: 37.25, Wplz: 58.11 },
    { size: 240, G: 30.7, h: 240, b: 120, tw: 6.2, tf: 9.8, r: 15, A: 39.1, AL: 0.922, Iy: 3891, Wely: 324.3, Wply: 366.6, Iz: 283.6, Welz: 47.27, Wplz: 73.92 },
    { size: 270, G: 36.1, h: 270, b: 135, tw: 6.6, tf: 10.2, r: 15, A: 45.9, AL: 1.041, Iy: 5789, Wely: 428.8, Wply: 483.9, Iz: 419.8, Welz: 62.2, Wplz: 96.95 },
    { size: 300, G: 42.2, h: 300, b: 150, tw: 7.1, tf: 10.7, r: 15, A: 53.8, AL: 1.16, Iy: 8356, Wely: 557, Wply: 628.3, Iz: 603.7, Welz: 80.5, Wplz: 125.2 },
    { size: 330, G: 49.1, h: 330, b: 160, tw: 7.5, tf: 11.5, r: 18, A: 62.6, AL: 1.254, Iy: 11760, Wely: 713.1, Wply: 804.3, Iz: 788.1, Welz: 98.51, Wplz: 153.6 },
    { size: 360, G: 57.1, h: 360, b: 170, tw: 8, tf: 12.7, r: 18, A: 72.7, AL: 1.353, Iy: 16260, Wely: 903.6, Wply: 1019, Iz: 1043, Welz: 122.7, Wplz: 191 },
    { size: 400, G: 66.3, h: 400, b: 180, tw: 8.6, tf: 13.5, r: 21, A: 84.5, AL: 1.467, Iy: 23120, Wely: 1156, Wply: 1307, Iz: 1317, Welz: 146.4, Wplz: 229 },
    { size: 450, G: 77.6, h: 450, b: 190, tw: 9.4, tf: 14.6, r: 21, A: 98.8, AL: 1.605, Iy: 33740, Wely: 1499, Wply: 1701, Iz: 1675, Welz: 176.4, Wplz: 276.3 },
    { size: 500, G: 90.7, h: 500, b: 200, tw: 10.2, tf: 16, r: 21, A: 115.5, AL: 1.744, Iy: 48190, Wely: 1927, Wply: 2194, Iz: 2141, Welz: 214.1, Wplz: 335.8 },
    { size: 550, G: 106, h: 550, b: 210, tw: 11.1, tf: 17.2, r: 24, A: 134.4, AL: 1.877, Iy: 67110, Wely: 2440, Wply: 2787, Iz: 2667, Welz: 254, Wplz: 400.5 },
    { size: 600, G: 122, h: 600, b: 220, tw: 12, tf: 19, r: 24, A: 156, AL: 2.015, Iy: 92080, Wely: 3069, Wply: 3512, Iz: 3387, Welz: 307.9, Wplz: 485.6 },
  ],
  HEA: [
    { size: 100, G: 16.7, h: 96, b: 100, tw: 5, tf: 8, r: 12, A: 21.2, AL: 0.561, Iy: 349.2, Wely: 72.75, Wply: 83.01, Iz: 133.8, Welz: 26.76, Wplz: 41.14 },
    { size: 120, G: 19.9, h: 114, b: 120, tw: 5, tf: 8, r: 12, A: 25.3, AL: 0.677, Iy: 606.1, Wely: 106.3, Wply: 119.4, Iz: 230.8, Welz: 38.48, Wplz: 58.85 },
    { size: 140, G: 24.7, h: 133, b: 140, tw: 5.5, tf: 8.5, r: 12, A: 31.4, AL: 0.794, Iy: 1033, Wely: 155.3, Wply: 173.4, Iz: 389.3, Welz: 55.61, Wplz: 84.84 },
    { size: 160, G: 30.4, h: 152, b: 160, tw: 6, tf: 9, r: 15, A: 38.8, AL: 0.906, Iy: 1672, Wely: 220.1, Wply: 245.1, Iz: 615.5, Welz: 76.94, Wplz: 117.6 },
    { size: 180, G: 35.5, h: 171, b: 180, tw: 6, tf: 9.5, r: 15, A: 45.3, AL: 1.024, Iy: 2510, Wely: 293.6, Wply: 324.8, Iz: 924.6, Welz: 102.7, Wplz: 156.4 },
    { size: 200, G: 42.3, h: 190, b: 200, tw: 6.5, tf: 10, r: 18, A: 53.8, AL: 1.136, Iy: 3692, Wely: 388.6, Wply: 429.4, Iz: 1335, Welz: 133.5, Wplz: 203.8 },
    { size: 220, G: 50.5, h: 210, b: 220, tw: 7, tf: 11, r: 18, A: 64.3, AL: 1.255, Iy: 5409, Wely: 515.2, Wply: 568.4, Iz: 1954, Welz: 177.6, Wplz: 270.5 },
    { size: 240, G: 60.3, h: 230, b: 240, tw: 7.5, tf: 12, r: 21, A: 76.8, AL: 1.369, Iy: 7763, Wely: 675, Wply: 744.6, Iz: 2768, Welz: 230.7, Wplz: 351.6 },
    { size: 260, G: 68.2, h: 250, b: 260, tw: 7.5, tf: 12.5, r: 24, A: 86.8, AL: 1.484, Iy: 10450, Wely: 836.3, Wply: 919.7, Iz: 3667, Welz: 282.1, Wplz: 430.1 },
    { size: 280, G: 76.4, h: 270, b: 280, tw: 8, tf: 13, r: 24, A: 97.3, AL: 1.603, Iy: 13670, Wely: 1012, Wply: 1112, Iz: 4762, Welz: 340.1, Wplz: 518.1 },
    { size: 300, G: 88.3, h: 290, b: 300, tw: 8.5, tf: 14, r: 27, A: 112.5, AL: 1.717, Iy: 18260, Wely: 1259, Wply: 1383, Iz: 6309, Welz: 420.6, Wplz: 641.1 },
    { size: 320, G: 97.6, h: 310, b: 300, tw: 9, tf: 15.5, r: 27, A: 124.4, AL: 1.756, Iy: 22920, Wely: 1479, Wply: 1628, Iz: 6985, Welz: 465.6, Wplz: 709.7 },
    { size: 340, G: 105, h: 330, b: 300, tw: 9.5, tf: 16.5, r: 27, A: 133.5, AL: 1.795, Iy: 27690, Wely: 1678, Wply: 1850, Iz: 7435, Welz: 495.7, Wplz: 755.9 },
    { size: 360, G: 112, h: 350, b: 300, tw: 10, tf: 17.5, r: 27, A: 142.8, AL: 1.834, Iy: 33080, Wely: 1890, Wply: 2088, Iz: 7886, Welz: 525.7, Wplz: 802.2 },
    { size: 400, G: 125, h: 390, b: 300, tw: 11, tf: 19, r: 27, A: 159, AL: 1.912, Iy: 45060, Wely: 2311, Wply: 2561, Iz: 8563, Welz: 570.9, Wplz: 872.8 },
    { size: 450, G: 140, h: 440, b: 300, tw: 11.5, tf: 21, r: 27, A: 178, AL: 2.011, Iy: 63720, Wely: 2896, Wply: 3215, Iz: 9465, Welz: 631, Wplz: 965.5 },
    { size: 500, G: 155, h: 490, b: 300, tw: 12, tf: 23, r: 27, A: 197.5, AL: 2.11, Iy: 86970, Wely: 3549, Wply: 3948, Iz: 10360, Welz: 691.1, Wplz: 1058 },
    { size: 550, G: 166, h: 540, b: 300, tw: 12.5, tf: 24, r: 27, A: 211.8, AL: 2.209, Iy: 111930, Wely: 4145, Wply: 4621, Iz: 10810, Welz: 721.2, Wplz: 1106 },
    { size: 600, G: 178, h: 590, b: 300, tw: 13, tf: 25, r: 27, A: 226.5, AL: 2.308, Iy: 141200, Wely: 4786, Wply: 5350, Iz: 11270, Welz: 751.4, Wplz: 1155 },
    { size: 650, G: 190, h: 640, b: 300, tw: 13.5, tf: 26, r: 27, A: 241.6, AL: 2.407, Iy: 175170, Wely: 5474, Wply: 6136, Iz: 11720, Welz: 781.5, Wplz: 1204 },
    { size: 700, G: 204, h: 690, b: 300, tw: 14.5, tf: 27, r: 27, A: 260.5, AL: 2.505, Iy: 215300, Wely: 6240, Wply: 7031, Iz: 12170, Welz: 811.9, Wplz: 1256 },
    { size: 800, G: 224, h: 790, b: 300, tw: 15, tf: 28, r: 30, A: 285.8, AL: 2.698, Iy: 303440, Wely: 7682, Wply: 8699, Iz: 12630, Welz: 842.5, Wplz: 1312 },
    { size: 900, G: 252, h: 890, b: 300, tw: 16, tf: 30, r: 30, A: 320.5, AL: 2.896, Iy: 422070, Wely: 9484, Wply: 10810, Iz: 13540, Welz: 903.1, Wplz: 1414 },
    { size: 1000, G: 272, h: 990, b: 300, tw: 16.5, tf: 31, r: 30, A: 346.8, AL: 3.095, Iy: 553840, Wely: 11180, Wply: 12820, Iz: 14000, Welz: 933.6, Wplz: 1469 },
  ],
  HEB: [
    { size: 100, G: 20.4, h: 100, b: 100, tw: 6, tf: 10, r: 12, A: 26, AL: 0.567, Iy: 449.5, Wely: 89.9, Wply: 104.2, Iz: 167.2, Welz: 33.45, Wplz: 51.42 },
    { size: 120, G: 26.7, h: 120, b: 120, tw: 6.5, tf: 11, r: 12, A: 34, AL: 0.686, Iy: 864.3, Wely: 144, Wply: 165.2, Iz: 317.5, Welz: 52.92, Wplz: 80.96 },
    { size: 140, G: 33.7, h: 140, b: 140, tw: 7, tf: 12, r: 12, A: 43, AL: 0.805, Iy: 1509, Wely: 215.6, Wply: 245.4, Iz: 549.6, Welz: 78.52, Wplz: 119.7 },
    { size: 160, G: 42.6, h: 160, b: 160, tw: 8, tf: 13, r: 15, A: 54.3, AL: 0.918, Iy: 2491, Wely: 311.4, Wply: 353.9, Iz: 889.2, Welz: 111.1, Wplz: 169.9 },
    { size: 180, G: 51.2, h: 180, b: 180, tw: 8.5, tf: 14, r: 15, A: 65.3, AL: 1.037, Iy: 3831, Wely: 425.6, Wply: 481.4, Iz: 1362, Welz: 151.4, Wplz: 231 },
    { size: 200, G: 61.3, h: 200, b: 200, tw: 9, tf: 15, r: 18, A: 78.1, AL: 1.151, Iy: 5696, Wely: 569.6, Wply: 642.5, Iz: 2003, Welz: 200.3, Wplz: 305.8 },
    { size: 220, G: 71.5, h: 220, b: 220, tw: 9.5, tf: 16, r: 18, A: 91, AL: 1.27, Iy: 8090, Wely: 735.5, Wply: 827, Iz: 2843, Welz: 258.4, Wplz: 393.8 },
    { size: 240, G: 83.2, h: 240, b: 240, tw: 10, tf: 17, r: 21, A: 106, AL: 1.384, Iy: 11250, Wely: 938.2, Wply: 1053, Iz: 3922, Welz: 326.8, Wplz: 498.4 },
    { size: 260, G: 93, h: 260, b: 260, tw: 10, tf: 17.5, r: 24, A: 118.4, AL: 1.499, Iy: 14910, Wely: 1147, Wply: 1282, Iz: 5134, Welz: 394.9, Wplz: 602.2 },
    { size: 280, G: 103, h: 280, b: 280, tw: 10.5, tf: 18, r: 24, A: 131.4, AL: 1.618, Iy: 19270, Wely: 1376, Wply: 1534, Iz: 6594, Welz: 471, Wplz: 717.5 },
    { size: 300, G: 117, h: 300, b: 300, tw: 11, tf: 19, r: 27, A: 149.1, AL: 1.732, Iy: 25160, Wely: 1677, Wply: 1868, Iz: 8562, Welz: 570.8, Wplz: 870.1 },
    { size: 320, G: 127, h: 320, b: 300, tw: 11.5, tf: 20.5, r: 27, A: 161.3, AL: 1.771, Iy: 30820, Wely: 1926, Wply: 2149, Iz: 9238, Welz: 615.9, Wplz: 939 },
    { size: 340, G: 134, h: 340, b: 300, tw: 12, tf: 21.5, r: 27, A: 170.9, AL: 1.81, Iy: 36650, Wely: 2156, Wply: 2408, Iz: 9689, Welz: 645.9, Wplz: 985.7 },
    { size: 360, G: 142, h: 360, b: 300, tw: 12.5, tf: 22.5, r: 27, A: 180.6, AL: 1.849, Iy: 43190, Wely: 2399, Wply: 2682, Iz: 10140, Welz: 676, Wplz: 1032 },
    { size: 400, G: 155, h: 400, b: 300, tw: 13.5, tf: 24, r: 27, A: 197.8, AL: 1.927, Iy: 57680, Wely: 2884, Wply: 3231, Iz: 10810, Welz: 721.2, Wplz: 1104 },
    { size: 450, G: 171, h: 450, b: 300, tw: 14, tf: 26, r: 27, A: 218, AL: 2.026, Iy: 79880, Wely: 3550, Wply: 3982, Iz: 11720, Welz: 781.4, Wplz: 1197 },
    { size: 500, G: 187, h: 500, b: 300, tw: 14.5, tf: 28, r: 27, A: 238.6, AL: 2.125, Iy: 107170, Wely: 4287, Wply: 4814, Iz: 12620, Welz: 841.5, Wplz: 1291 },
    { size: 550, G: 199, h: 550, b: 300, tw: 15, tf: 29, r: 27, A: 254.1, AL: 2.224, Iy: 136690, Wely: 4970, Wply: 5590, Iz: 13070, Welz: 871.7, Wplz: 1341 },
    { size: 600, G: 212, h: 600, b: 300, tw: 15.5, tf: 30, r: 27, A: 270, AL: 2.323, Iy: 171040, Wely: 5701, Wply: 6425, Iz: 13530, Welz: 902, Wplz: 1391 },
    { size: 650, G: 225, h: 650, b: 300, tw: 16, tf: 31, r: 27, A: 286.3, AL: 2.422, Iy: 210610, Wely: 6480, Wply: 7319, Iz: 13980, Welz: 932.2, Wplz: 1441 },
    { size: 700, G: 241, h: 700, b: 300, tw: 17, tf: 32, r: 27, A: 306.4, AL: 2.52, Iy: 256880, Wely: 7339, Wply: 8327, Iz: 14440, Welz: 962.7, Wplz: 1495 },
    { size: 800, G: 262, h: 800, b: 300, tw: 17.5, tf: 33, r: 30, A: 334.2, AL: 2.713, Iy: 359080, Wely: 8977, Wply: 10220, Iz: 14900, Welz: 993.5, Wplz: 1553 },
    { size: 900, G: 291, h: 900, b: 300, tw: 18.5, tf: 35, r: 30, A: 371.3, AL: 2.911, Iy: 494060, Wely: 10970, Wply: 12580, Iz: 15810, Welz: 1054, Wplz: 1658 },
    { size: 1000, G: 314, h: 1000, b: 300, tw: 19, tf: 36, r: 30, A: 400, AL: 3.11, Iy: 644740, Wely: 12890, Wply: 14850, Iz: 16270, Welz: 1085, Wplz: 1716 },
  ],
  HEM: [
    { size: 100, G: 41.8, h: 120, b: 106, tw: 12, tf: 20, r: 12, A: 53.2, AL: 0.619, Iy: 1142, Wely: 190.4, Wply: 235.8, Iz: 399.1, Welz: 75.31, Wplz: 116.3 },
    { size: 120, G: 52.1, h: 140, b: 126, tw: 12.5, tf: 21, r: 12, A: 66.4, AL: 0.738, Iy: 2017, Wely: 288.2, Wply: 350.6, Iz: 702.7, Welz: 111.5, Wplz: 171.6 },
    { size: 140, G: 63.2, h: 160, b: 146, tw: 13, tf: 22, r: 12, A: 80.6, AL: 0.857, Iy: 3291, Wely: 411.4, Wply: 493.8, Iz: 1144, Welz: 156.7, Wplz: 240.5 },
    { size: 160, G: 76.2, h: 180, b: 166, tw: 14, tf: 23, r: 15, A: 97.1, AL: 0.97, Iy: 5098, Wely: 566.4, Wply: 674.5, Iz: 1758, Welz: 211.8, Wplz: 325.4 },
    { size: 180, G: 88.9, h: 200, b: 186, tw: 14.5, tf: 24, r: 15, A: 113.3, AL: 1.089, Iy: 7483, Wely: 748.3, Wply: 883.4, Iz: 2580, Welz: 277.4, Wplz: 425.1 },
    { size: 200, G: 103, h: 220, b: 206, tw: 15, tf: 25, r: 18, A: 131.3, AL: 1.203, Iy: 10640, Wely: 967.4, Wply: 1135, Iz: 3651, Welz: 354.4, Wplz: 543.2 },
    { size: 220, G: 117, h: 240, b: 226, tw: 15.5, tf: 26, r: 18, A: 149.4, AL: 1.322, Iy: 14600, Wely: 1217, Wply: 1419, Iz: 5012, Welz: 443.5, Wplz: 678.5 },
    { size: 240, G: 157, h: 270, b: 248, tw: 18, tf: 32, r: 21, A: 199.6, AL: 1.46, Iy: 24280, Wely: 1799, Wply: 2116, Iz: 8152, Welz: 657.4, Wplz: 1005 },
    { size: 260, G: 172, h: 290, b: 268, tw: 18, tf: 32.5, r: 24, A: 219.6, AL: 1.575, Iy: 31300, Wely: 2159, Wply: 2523, Iz: 10440, Welz: 779.7, Wplz: 1192 },
    { size: 280, G: 189, h: 310, b: 288, tw: 18.5, tf: 33, r: 24, A: 240.2, AL: 1.694, Iy: 39540, Wely: 2551, Wply: 2965, Iz: 13160, Welz: 914, Wplz: 1396 },
    { size: 300, G: 238, h: 340, b: 310, tw: 21, tf: 39, r: 27, A: 303.1, AL: 1.832, Iy: 59200, Wely: 3482, Wply: 4077, Iz: 19400, Welz: 1251, Wplz: 1913 },
    { size: 320, G: 245, h: 359, b: 309, tw: 21, tf: 40, r: 27, A: 312, AL: 1.866, Iy: 68130, Wely: 3795, Wply: 4435, Iz: 19700, Welz: 1275, Wplz: 1950 },
    { size: 340, G: 248, h: 377, b: 309, tw: 21, tf: 40, r: 27, A: 315.8, AL: 1.902, Iy: 76370, Wely: 4051, Wply: 4717, Iz: 19710, Welz: 1275, Wplz: 1952 },
    { size: 360, G: 250, h: 395, b: 308, tw: 21, tf: 40, r: 27, A: 318.8, AL: 1.934, Iy: 84860, Wely: 4297, Wply: 4989, Iz: 19520, Welz: 1267, Wplz: 1942 },
    { size: 400, G: 256, h: 432, b: 307, tw: 21, tf: 40, r: 27, A: 325.8, AL: 2.004, Iy: 104110, Wely: 4820, Wply: 5570, Iz: 19330, Welz: 1259, Wplz: 1934 },
    { size: 450, G: 263, h: 478, b: 307, tw: 21, tf: 40, r: 27, A: 335.4, AL: 2.096, Iy: 131480, Wely: 5501, Wply: 6331, Iz: 19330, Welz: 1259, Wplz: 1939 },
    { size: 500, G: 270, h: 524, b: 306, tw: 21, tf: 40, r: 27, A: 344.3, AL: 2.184, Iy: 161920, Wely: 6180, Wply: 7094, Iz: 19150, Welz: 1251, Wplz: 1932 },
    { size: 550, G: 278, h: 572, b: 306, tw: 21, tf: 40, r: 27, A: 354.4, AL: 2.28, Iy: 197980, Wely: 6922, Wply: 7932, Iz: 19150, Welz: 1252, Wplz: 1937 },
    { size: 600, G: 285, h: 620, b: 305, tw: 21, tf: 40, r: 27, A: 363.7, AL: 2.372, Iy: 237440, Wely: 7659, Wply: 8772, Iz: 18970, Welz: 1244, Wplz: 1930 },
    { size: 650, G: 293, h: 668, b: 305, tw: 21, tf: 40, r: 27, A: 373.7, AL: 2.468, Iy: 281660, Wely: 8433, Wply: 9656, Iz: 18970, Welz: 1244, Wplz: 1935 },
    { size: 700, G: 301, h: 716, b: 304, tw: 21, tf: 40, r: 27, A: 383, AL: 2.56, Iy: 329270, Wely: 9197, Wply: 10530, Iz: 18790, Welz: 1236, Wplz: 1928 },
    { size: 800, G: 317, h: 814, b: 303, tw: 21, tf: 40, r: 30, A: 404.3, AL: 2.746, Iy: 442590, Wely: 10870, Wply: 12480, Iz: 18620, Welz: 1229, Wplz: 1930 },
    { size: 900, G: 333, h: 910, b: 302, tw: 21, tf: 40, r: 30, A: 423.6, AL: 2.934, Iy: 570430, Wely: 12530, Wply: 14440, Iz: 18450, Welz: 1221, Wplz: 1928 },
    { size: 1000, G: 349, h: 1008, b: 302, tw: 21, tf: 40, r: 30, A: 444.2, AL: 3.13, Iy: 722290, Wely: 14330, Wply: 16560, Iz: 18450, Welz: 1222, Wplz: 1939 },
  ],
  UPN: [
    { size: 50, G: 5.6, h: 50, b: 38, tw: 5, tf: 7, r: 7, A: 7.1, AL: 0.232, Iy: 26.4, Wely: 10.6, Wply: 13.1, Iz: 9.12, Welz: 3.75, Wplz: 6.78, r2: 3.5 },
    { size: 65, G: 7.1, h: 65, b: 42, tw: 5.5, tf: 7.5, r: 7.5, A: 9, AL: 0.273, Iy: 57.5, Wely: 17.7, Wply: 21.7, Iz: 14.1, Welz: 5.07, Wplz: 9.38, r2: 4 },
    { size: 80, G: 8.6, h: 80, b: 45, tw: 6, tf: 8, r: 8, A: 11, AL: 0.312, Iy: 106, Wely: 26.5, Wply: 32.3, Iz: 19.4, Welz: 6.36, Wplz: 11.9, r2: 4 },
    { size: 100, G: 10.6, h: 100, b: 50, tw: 6, tf: 8.5, r: 8.5, A: 13.5, AL: 0.372, Iy: 206, Wely: 41.2, Wply: 49, Iz: 29.3, Welz: 8.49, Wplz: 16.2, r2: 4.5 },
    { size: 120, G: 13.4, h: 120, b: 55, tw: 7, tf: 9, r: 9, A: 17, AL: 0.434, Iy: 364, Wely: 60.7, Wply: 72.6, Iz: 43.2, Welz: 11.1, Wplz: 21.2, r2: 4.5 },
    { size: 140, G: 16, h: 140, b: 60, tw: 7, tf: 10, r: 10, A: 20.4, AL: 0.489, Iy: 605, Wely: 86.4, Wply: 103, Iz: 62.7, Welz: 14.8, Wplz: 28.3, r2: 5 },
    { size: 160, G: 18.8, h: 160, b: 65, tw: 7.5, tf: 10.5, r: 10.5, A: 24, AL: 0.546, Iy: 925, Wely: 116, Wply: 138, Iz: 85.3, Welz: 18.3, Wplz: 35.2, r2: 5.5 },
    { size: 180, G: 22, h: 180, b: 70, tw: 8, tf: 11, r: 11, A: 28, AL: 0.611, Iy: 1350, Wely: 150, Wply: 179, Iz: 114, Welz: 22.4, Wplz: 42.9, r2: 5.5 },
    { size: 200, G: 25.3, h: 200, b: 75, tw: 8.5, tf: 11.5, r: 11.5, A: 32.2, AL: 0.661, Iy: 1910, Wely: 191, Wply: 228, Iz: 148, Welz: 27, Wplz: 51.8, r2: 6 },
    { size: 220, G: 29.4, h: 220, b: 80, tw: 9, tf: 12.5, r: 12.5, A: 37.4, AL: 0.718, Iy: 2690, Wely: 245, Wply: 292, Iz: 197, Welz: 33.6, Wplz: 64.1, r2: 6.5 },
    { size: 240, G: 33.2, h: 240, b: 85, tw: 9.5, tf: 13, r: 13, A: 42.3, AL: 0.775, Iy: 3600, Wely: 300, Wply: 358, Iz: 248, Welz: 39.6, Wplz: 75.7, r2: 6.5 },
    { size: 260, G: 37.9, h: 260, b: 90, tw: 10, tf: 14, r: 14, A: 48.3, AL: 0.834, Iy: 4820, Wely: 371, Wply: 442, Iz: 317, Welz: 47.7, Wplz: 91.6, r2: 7 },
    { size: 280, G: 41.8, h: 280, b: 95, tw: 10, tf: 15, r: 15, A: 53.3, AL: 0.89, Iy: 6280, Wely: 448, Wply: 532, Iz: 399, Welz: 57.2, Wplz: 109, r2: 7.5 },
    { size: 300, G: 46.2, h: 300, b: 100, tw: 10, tf: 16, r: 16, A: 58.8, AL: 0.95, Iy: 8030, Wely: 535, Wply: 632, Iz: 495, Welz: 67.8, Wplz: 130, r2: 8 },
    { size: 320, G: 59.5, h: 320, b: 100, tw: 14, tf: 17.5, r: 17.5, A: 75.8, AL: 0.982, Iy: 10870, Wely: 679, Wply: 826, Iz: 597, Welz: 80.6, Wplz: 152, r2: 8.8 },
    { size: 350, G: 60.6, h: 350, b: 100, tw: 14, tf: 16, r: 16, A: 77.3, AL: 1.05, Iy: 12840, Wely: 734, Wply: 918, Iz: 570, Welz: 75, Wplz: 143, r2: 8 },
    { size: 380, G: 63.1, h: 380, b: 102, tw: 13.5, tf: 16, r: 16, A: 80.4, AL: 1.11, Iy: 15760, Wely: 829, Wply: 1010, Iz: 615, Welz: 78.7, Wplz: 148, r2: 8 },
    { size: 400, G: 71.8, h: 400, b: 110, tw: 14, tf: 18, r: 18, A: 91.5, AL: 1.18, Iy: 20350, Wely: 1020, Wply: 1240, Iz: 846, Welz: 102, Wplz: 190, r2: 9 },
  ],
  IPN: [
    { size: 80, G: 5.9, h: 80, b: 42, tw: 3.9, tf: 5.9, r: 3.9, A: 7.6, AL: 0.304, Iy: 77.8, Wely: 19.5, Wply: 22.8, Iz: 6.29, Welz: 3, Wplz: 5, r2: 2.3 },
    { size: 100, G: 8.3, h: 100, b: 50, tw: 4.5, tf: 6.8, r: 4.5, A: 10.6, AL: 0.37, Iy: 171, Wely: 34.2, Wply: 39.8, Iz: 12.2, Welz: 4.88, Wplz: 8.1, r2: 2.7 },
    { size: 120, G: 11.1, h: 120, b: 58, tw: 5.1, tf: 7.7, r: 5.1, A: 14.2, AL: 0.439, Iy: 328, Wely: 54.7, Wply: 63.6, Iz: 21.5, Welz: 7.41, Wplz: 12.4, r2: 3.1 },
    { size: 140, G: 14.3, h: 140, b: 66, tw: 5.7, tf: 8.6, r: 5.7, A: 18.2, AL: 0.502, Iy: 573, Wely: 81.9, Wply: 95.4, Iz: 35.2, Welz: 10.7, Wplz: 17.9, r2: 3.4 },
    { size: 160, G: 17.9, h: 160, b: 74, tw: 6.3, tf: 9.5, r: 6.3, A: 22.8, AL: 0.575, Iy: 935, Wely: 117, Wply: 136, Iz: 54.7, Welz: 14.8, Wplz: 24.9, r2: 3.8 },
    { size: 180, G: 21.9, h: 180, b: 82, tw: 6.9, tf: 10.4, r: 6.9, A: 27.9, AL: 0.64, Iy: 1450, Wely: 161, Wply: 187, Iz: 81.3, Welz: 19.8, Wplz: 33.2, r2: 4.1 },
    { size: 200, G: 26.2, h: 200, b: 90, tw: 7.5, tf: 11.3, r: 7.5, A: 33.4, AL: 0.709, Iy: 2140, Wely: 214, Wply: 250, Iz: 117, Welz: 26, Wplz: 43.5, r2: 4.5 },
    { size: 220, G: 31.1, h: 220, b: 98, tw: 8.1, tf: 12.2, r: 8.1, A: 39.5, AL: 0.775, Iy: 3060, Wely: 278, Wply: 324, Iz: 162, Welz: 33.1, Wplz: 55.7, r2: 4.9 },
    { size: 240, G: 36.2, h: 240, b: 106, tw: 8.7, tf: 13.1, r: 8.7, A: 46.1, AL: 0.844, Iy: 4250, Wely: 354, Wply: 412, Iz: 221, Welz: 41.7, Wplz: 70, r2: 5.2 },
    { size: 260, G: 41.9, h: 260, b: 113, tw: 9.4, tf: 14.1, r: 9.4, A: 53.3, AL: 0.906, Iy: 5740, Wely: 442, Wply: 514, Iz: 288, Welz: 51, Wplz: 85.9, r2: 5.6 },
    { size: 280, G: 47.9, h: 280, b: 119, tw: 10.1, tf: 15.2, r: 10.1, A: 61, AL: 0.966, Iy: 7590, Wely: 542, Wply: 632, Iz: 364, Welz: 61.2, Wplz: 103, r2: 6.1 },
    { size: 300, G: 54.2, h: 300, b: 125, tw: 10.8, tf: 16.2, r: 10.8, A: 69, AL: 1.03, Iy: 9800, Wely: 653, Wply: 762, Iz: 451, Welz: 72.2, Wplz: 121, r2: 6.5 },
    { size: 320, G: 61, h: 320, b: 131, tw: 11.5, tf: 17.3, r: 11.5, A: 77.7, AL: 1.09, Iy: 12510, Wely: 782, Wply: 914, Iz: 555, Welz: 84.7, Wplz: 143, r2: 6.9 },
    { size: 340, G: 68, h: 340, b: 137, tw: 12.2, tf: 18.3, r: 12.2, A: 86.7, AL: 1.15, Iy: 15700, Wely: 923, Wply: 1080, Iz: 674, Welz: 98.4, Wplz: 166, r2: 7.3 },
    { size: 360, G: 76.1, h: 360, b: 143, tw: 13, tf: 19.5, r: 13, A: 97, AL: 1.21, Iy: 19610, Wely: 1090, Wply: 1276, Iz: 818, Welz: 114, Wplz: 194, r2: 7.8 },
    { size: 380, G: 84, h: 380, b: 149, tw: 13.7, tf: 20.5, r: 13.7, A: 107, AL: 1.27, Iy: 24010, Wely: 1260, Wply: 1482, Iz: 975, Welz: 131, Wplz: 221, r2: 8.2 },
    { size: 400, G: 92.4, h: 400, b: 155, tw: 14.4, tf: 21.6, r: 14.4, A: 117.7, AL: 1.33, Iy: 29210, Wely: 1460, Wply: 1714, Iz: 1160, Welz: 149, Wplz: 253, r2: 8.6 },
    { size: 450, G: 115, h: 450, b: 170, tw: 16.2, tf: 24.3, r: 16.2, A: 146.9, AL: 1.48, Iy: 45850, Wely: 2040, Wply: 2400, Iz: 1730, Welz: 203, Wplz: 345, r2: 9.7 },
    { size: 500, G: 141, h: 500, b: 185, tw: 18, tf: 27, r: 18, A: 179.4, AL: 1.63, Iy: 68740, Wely: 2750, Wply: 3240, Iz: 2480, Welz: 268, Wplz: 456, r2: 10.8 },
    { size: 550, G: 166, h: 550, b: 200, tw: 19, tf: 30, r: 19, A: 212, AL: 1.8, Iy: 99180, Wely: 3610, Wply: 4240, Iz: 3490, Welz: 349, Wplz: 592, r2: 11.9 },
    { size: 600, G: 199, h: 600, b: 215, tw: 21.6, tf: 32.4, r: 21.6, A: 253.7, AL: 1.92, Iy: 139000, Wely: 4630, Wply: 5452, Iz: 4670, Welz: 434, Wplz: 752, r2: 13 },
  ],
};
