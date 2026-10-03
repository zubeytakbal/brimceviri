// Tarım ve hayvancılık araçları: /ciftci-araclari hub sayfası ve araç sayfalarının
// "ilgili araçlar" bölümü buradan beslenir.
export const tarimAraclari = [
  { href: "/inek-dogum-hesaplama", label: "İnek Doğum Hesaplama", description: "Tohumlamadan doğum tarihi, kızgınlık takibi ve kuruya ayırma; düve, koyun, keçi, manda, kısrak." },
  { href: "/kulucka-hesaplama", label: "Kuluçka Hesaplama", description: "Tavuk, bıldırcın, hindi, ördek ve kaz için kuluçka takvimi, civciv ısısı ve randıman." },
  { href: "/tohum-miktari-hesaplama", label: "Tohum Miktarı Hesaplama", description: "Dekara atılacak tohum miktarı." },
  { href: "/gubre-ihtiyaci-hesaplama", label: "Gübre İhtiyacı Hesaplama", description: "N-P-K oranından dekara gübre miktarı." },
  { href: "/gubre-seyreltme-hesaplama", label: "Gübre Seyreltme Hesaplama", description: "Sıvı gübrenin suyla karışım oranı." },
  { href: "/sulama-suresi-hesaplama", label: "Sulama Süresi Hesaplama", description: "Damla ve yağmurlama sulamada süre." },
  { href: "/tarla-donum-hesaplama", label: "Tarla Dönüm Hesaplama", description: "Tarla ölçülerinden dönüm, dekar ve hektar." },
];

export function tarimRelated(exclude: string) {
  return tarimAraclari.filter((t) => t.href !== exclude).map(({ href, label }) => ({ href, label }));
}
