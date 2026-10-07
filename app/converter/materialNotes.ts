// En çok aranan malzemeler için elle yazılmış, malzemeye özgü açıklamalar. Sayısal örnekler
// materialsDatabase'deki yoğunluktan hesaplanır; aralıklar yaygın mühendislik kaynaklarındaki
// tipik değerlerdir.

export type MaterialNote = { heading: string; paragraphs: string[] };

export const materialNotesTr: Record<string, MaterialNote> = {
  pekmez: {
    heading: "Pekmezin yoğunluğu neden değişir?",
    paragraphs: [
      "Pekmez; üzüm, dut ya da keçiboynuzu şırasının kaynatılıp koyulaştırılmasıyla yapılır. Yoğunluğu, kaynatma sonunda kalan şeker (kuru madde) oranına bağlıdır. Kuru madde oranı arttıkça hem yoğunluk hem kıvam artar; iyi koyulaşmış bir pekmezde bu oran çoğunlukla %65-80 arasındadır.",
      "Az kaynatılmış ya da su katılmış pekmez daha hafif ve akışkan olur. Evde basit bir kontrol için boş bir kabı tartın, 100 mL pekmez koyup yeniden tartın: fark gram cinsinden yaklaşık 140 çıkıyorsa yoğunluk 1,4 g/cm³ civarındadır.",
      "Tahin-pekmez gibi karışımlarda tahin (yaklaşık 1,0 g/cm³) karışımın yoğunluğunu düşürür, bu yüzden karışımın bir bardağı aynı hacimdeki saf pekmezden daha hafif gelir.",
    ],
  },
  altin: {
    heading: "Altının ayarı yoğunluğunu nasıl değiştirir?",
    paragraphs: [
      "19,32 g/cm³ değeri saf (24 ayar) altına aittir. Takı altını bakır, gümüş ve çinko gibi daha hafif metallerle alaşımlanır, bu yüzden ayar düştükçe yoğunluk da düşer: 22 ayar altın yaklaşık 17,7-17,9 g/cm³, 18 ayar 15,2-15,9 g/cm³, 14 ayar ise katılan metallere göre 12,9-14,6 g/cm³ aralığındadır.",
      "Yoğunluk, altının gerçek olup olmadığını anlamanın en eski yollarından biridir (Arşimet yöntemi). Parça önce havada, sonra suya tamamen batırılmış hâlde tartılır; havadaki ağırlık iki tartım arasındaki farka bölünür. Sonuç ayarın beklenen aralığının çok altındaysa parçanın içi başka bir metal olabilir.",
      "Tungsten (19,25 g/cm³) altına çok yakın yoğunlukta olduğu için sahte külçelerde dolgu olarak kullanılabilir; bu yüzden değerli parçalarda yoğunluk ölçümü tek başına kesin kanıt sayılmaz.",
    ],
  },
  demir: {
    heading: "Demir, çelik ve inşaat demiri ağırlığı",
    paragraphs: [
      "7,87 g/cm³ saf demirin yoğunluğudur. Günlük hayatta 'demir' denilen malzemelerin çoğu aslında çeliktir: karbon ve alaşım elementleri yoğunluğu 7,75-8,05 g/cm³ aralığına taşır. Dökme demirde ise içindeki grafit nedeniyle yoğunluk 6,8-7,4 g/cm³'e iner.",
      "İnşaat demirinin (nervürlü çelik) metre ağırlığı çapın karesinin 162'ye bölünmesiyle hızlıca bulunur: Ø8 için 0,395 kg/m, Ø10 için 0,617 kg/m, Ø12 için 0,888 kg/m, Ø16 için 1,58 kg/m. Bu formül 7.850 kg/m³ çelik yoğunluğundan türetilmiştir.",
      "Demir paslandığında oluşan pas (demir oksit) yaklaşık 5,2 g/cm³ yoğunluğundadır, yani daha fazla hacim kaplar. Betondaki donatı paslandığında betonu içeriden çatlatmasının nedeni bu hacim artışıdır.",
    ],
  },
  aluminyum: {
    heading: "Alüminyum alaşımlarında yoğunluk",
    paragraphs: [
      "Saf alüminyum 2,70 g/cm³ ile çeliğin yaklaşık üçte biri ağırlığındadır. Yaygın alaşımların yoğunluğu 2,63-2,85 g/cm³ arasında değişir: profil ve doğramada kullanılan 6061 ve 6063 alaşımları 2,70, uçak sanayisinde kullanılan 7075 alaşımı ise çinko içeriği nedeniyle yaklaşık 2,81 g/cm³'tür.",
      "1 mm kalınlığında 1 m² alüminyum sac yaklaşık 2,7 kg gelir. Aynı ölçüdeki çelik sac 7,85 kg olduğundan, araç ve uçak gövdelerinde alüminyum tercih edilmesinin ana nedeni bu farktır.",
      "Bir içecek kutusu yaklaşık 13-15 gramdır; geri dönüşümde alüminyumun yeniden eritilmesi, cevherden üretime göre enerjinin yaklaşık yüzde 5'iyle yapılabilir.",
    ],
  },
  etanol: {
    heading: "Etanol ve su karışımının yoğunluğu",
    paragraphs: [
      "Saf etanol 20 °C'de 0,789 g/cm³ yoğunluğundadır. Suyla karıştırıldığında yoğunluk alkol oranına göre değişir; alkolmetreler bu ilişkiden yararlanarak alkol derecesini yoğunluktan okur. Örneğin hacimce %40 alkollü bir içkinin yoğunluğu 20 °C'de yaklaşık 0,948 g/cm³'tür.",
      "Etanol ve su karıştırıldığında hacimler tam toplanmaz: 50 mL etanol ile 50 mL su yaklaşık 96-97 mL karışım verir. Bu yüzden alkol oranı hacimle değil yoğunlukla ölçülür.",
      "Etanolün yoğunluğu sıcaklıkla belirgin biçimde değişir; 10 °C'lik artış yoğunluğu yaklaşık yüzde 1 düşürür. Hassas ölçümde sıcaklık mutlaka not edilmelidir.",
    ],
  },
  bal: {
    heading: "Balın yoğunluğu ve su oranı",
    paragraphs: [
      "Balın yoğunluğu çoğunlukla 1,36-1,45 g/cm³ arasındadır ve neredeyse tamamen su oranına bağlıdır. Olgun balda su oranı genellikle %17-20'dir; su oranı arttıkça bal hem hafifler hem de mayalanmaya yatkın hâle gelir.",
      "Bu yoğunlukla 1 su bardağı (200 mL) bal yaklaşık 284 g, 1 yemek kaşığı yaklaşık 21 g gelir. Tarifte gram yerine hacim veriliyorsa bu fark önemlidir: aynı bardak su yalnızca 200 g çeker.",
      "Kristalleşen (donan) balın yoğunluğu pek değişmez, yalnızca kıvamı katılaşır. Kavanozu ılık suda (40 °C'yi geçmeden) bekletmek balı yeniden akışkan yapar.",
    ],
  },
  mermer: {
    heading: "Mermer plakaların ağırlığı",
    paragraphs: [
      "Mermer, kireçtaşının ısı ve basınç altında yeniden kristalleşmesiyle oluşan metamorfik bir kayaçtır. Yoğunluğu çoğunlukla 2,56-2,75 g/cm³ arasındadır; dolomitik mermerler kalsitik olanlardan biraz daha ağırdır.",
      "Tezgâh ve zemin hesabında kalınlık belirleyicidir: 2 cm kalınlığında 1 m² mermer yaklaşık 54 kg, 3 cm kalınlığında yaklaşık 81 kg gelir. Mutfak tezgâhı taşınırken ve dolap gövdesi seçilirken bu ağırlık dikkate alınmalıdır.",
      "Mermer ile granit dışarıdan benzeyebilir; granit biraz daha yoğun ve çok daha serttir. Mermer limon ve sirke gibi asitlerle tepkimeye girip matlaşır, granit ise bu tepkimeyi göstermez.",
    ],
  },
  zeytinyagi: {
    heading: "Zeytinyağı neden suyun üstünde kalır?",
    paragraphs: [
      "Zeytinyağının yoğunluğu 20 °C'de yaklaşık 0,91-0,92 g/cm³'tür; sudan yaklaşık yüzde 8 hafif olduğu ve suyla karışmadığı için her zaman üstte toplanır.",
      "Bu yüzden 1 litre zeytinyağı 1 kg değil yaklaşık 918 g gelir; 5 litrelik teneke yaklaşık 4,6 kg, 1 kg zeytinyağı ise yaklaşık 1,09 litre eder. Yağ litreyle satılıp kiloyla fiyatlandırıldığında bu fark hesaba katılmalıdır.",
      "Zeytinyağı buzdolabında (yaklaşık 4 °C) bulanıklaşıp katılaşmaya başlar. Bu bir kalite kusuru değildir; oda sıcaklığında yeniden berraklaşır.",
    ],
  },
  asfalt: {
    heading: "Asfaltın yoğunluğu: bitüm ve asfalt betonu",
    paragraphs: [
      "Yollarda kullanılan 'asfalt' aslında asfalt betonudur: yaklaşık %5'i bitüm, geri kalanı kırma taş, kum ve filler olan bir karışımdır. Sıkıştırılmış asfalt betonunun yoğunluğu 2,3-2,4 g/cm³ arasındadır; bağlayıcı olan saf bitüm ise yalnızca 1,02-1,05 g/cm³'tür.",
      "Bu yoğunlukla 5 cm kalınlığında 1 m² asfalt kaplama yaklaşık 116 kg gelir. Bir ton asfalt, 5 cm kalınlıkla yaklaşık 8,6 m² alan kaplar.",
      "Serimden önceki gevşek sıcak karışım daha hafiftir; silindirle sıkıştırma boşlukları kapattıkça yoğunluk tasarım değerine yükselir.",
    ],
  },
  seker: {
    heading: "Toz şeker neden kristalinden hafif?",
    paragraphs: [
      "Şeker kristalinin (sakaroz) kendi yoğunluğu yaklaşık 1,59 g/cm³'tür. Toz şeker ise taneler arasında hava kaldığı için yığın hâlinde yaklaşık 0,8-0,9 g/cm³ gelir; burada verilen değer bu yığın yoğunluğudur.",
      "Bu nedenle bir su bardağı toz şeker yaklaşık 170 g gelir. Pudra şekeri daha çok hava tuttuğu için aynı bardak daha hafif, esmer şeker ise nemli ve sıkışık olduğu için daha ağır gelir.",
      "Şeker suda çözündüğünde hava boşlukları kaybolur: 1 kg şeker suda çözülünce yaklaşık 0,63 litre hacim ekler.",
    ],
  },
  abs: {
    heading: "ABS filament ve levha hesabı",
    paragraphs: [
      "ABS'nin yoğunluğu türüne göre 1,03-1,07 g/cm³'tür. Bu, PLA'dan (yaklaşık 1,24 g/cm³) belirgin biçimde düşüktür.",
      "3D yazıcıda 1,75 mm çapındaki 1 kg ABS filament yaklaşık 400 metre uzunluktadır; aynı ağırlıktaki PLA filament yaklaşık 330 metredir. Bu yüzden aynı makaradan ABS ile daha fazla parça basılır.",
      "ABS sudan çok az ağırdır, bu yüzden suda yavaşça batar. Geri dönüşümdeki yüzdürme-batırma ayırmasında bu özellik, ABS'nin suda yüzen PE ve PP'den ayrılmasını kolaylaştırır.",
    ],
  },
  pet: {
    heading: "PET şişeler ve geri dönüşüm",
    paragraphs: [
      "PET'in yoğunluğu kristallik derecesine bağlıdır: amorf PET yaklaşık 1,33-1,34 g/cm³, kristal PET 1,45 g/cm³ civarındadır. Su ve içecek şişeleri bu iki değer arasında kalır.",
      "PET sudan ağır olduğu için batar; şişe kapakları ise PP ya da HDPE olduğu için yüzer. Geri dönüşüm tesislerinde öğütülmüş şişe ve kapak parçaları su tankında bu farkla birbirinden ayrılır.",
      "Yarım litrelik bir su şişesi yaklaşık 10-15 g PET'tir; bu da yaklaşık 7-11 cm³ plastik demektir.",
    ],
  },
};

export const materialNotesDe: Record<string, MaterialNote> = {
  demir: {
    heading: "Eisen, Stahl und Betonstahl",
    paragraphs: [
      "7,87 g/cm³ ist die Dichte von reinem Eisen. Was im Alltag „Eisen“ heißt, ist meist Stahl: Kohlenstoff und Legierungselemente verschieben die Dichte in den Bereich 7,75–8,05 g/cm³. Gusseisen ist wegen seines Graphitanteils mit 6,8–7,4 g/cm³ deutlich leichter.",
      "Das Metergewicht von Betonstahl lässt sich mit Durchmesser² / 162 schnell abschätzen: Ø8 mm wiegt 0,395 kg/m, Ø10 mm 0,617 kg/m, Ø12 mm 0,888 kg/m und Ø16 mm 1,58 kg/m. Die Formel folgt aus der Stahldichte von 7.850 kg/m³.",
      "Rost (Eisenoxid) hat nur etwa 5,2 g/cm³ und braucht deshalb mehr Platz als das Eisen, aus dem er entsteht. Diese Volumenzunahme sprengt bei rostender Bewehrung den Beton von innen ab.",
    ],
  },
  granit: {
    heading: "Warum die Dichte von Granit schwankt",
    paragraphs: [
      "Granit ist ein Gemenge aus Quarz (2,65 g/cm³), Feldspat (2,55–2,76 g/cm³) und Glimmer (rund 2,8–3,0 g/cm³). Je nach Anteil dieser Minerale liegt die Dichte meist zwischen 2,6 und 2,8 g/cm³; dunkle, glimmerreiche Sorten sind etwas schwerer.",
      "Eine 3 cm starke Granitplatte wiegt etwa 82 kg pro Quadratmeter, eine 2 cm starke etwa 55 kg. Für Küchenarbeitsplatten und Fensterbänke sollte der Unterbau entsprechend ausgelegt sein.",
      "Gegenüber Marmor ist Granit etwas dichter und deutlich härter; Säuren wie Zitronensaft oder Essig greifen ihn praktisch nicht an.",
    ],
  },
  altin: {
    heading: "Wie der Feingehalt die Dichte von Gold verändert",
    paragraphs: [
      "19,32 g/cm³ gilt für Feingold (999). Schmuckgold wird mit leichteren Metallen wie Kupfer, Silber und Zink legiert, daher sinkt die Dichte mit dem Feingehalt: 750er Gold liegt bei etwa 15,2–15,9 g/cm³, 585er je nach Legierung bei 12,9–14,6 g/cm³.",
      "Mit der Auftriebsmethode lässt sich die Dichte zu Hause prüfen: Das Stück wird an der Luft und vollständig unter Wasser gewogen; das Luftgewicht geteilt durch die Differenz beider Wägungen ergibt die Dichte.",
      "Wolfram (19,25 g/cm³) ist fast genauso dicht wie Gold und wird deshalb bei Fälschungen als Kern verwendet. Eine Dichtemessung allein ist bei wertvollen Stücken daher kein sicherer Echtheitsnachweis.",
    ],
  },
  butan: {
    heading: "Butan als Gas und als Flüssiggas",
    paragraphs: [
      "Gasförmiges Butan ist etwa doppelt so schwer wie Luft. Bei einem Leck sammelt es sich deshalb am Boden, in Kellern und Gruben, und nicht unter der Decke.",
      "In Kartuschen und Flaschen liegt Butan unter Druck flüssig vor; die Dichte beträgt dann rund 0,58 kg/l. 1 kg flüssiges Butan ergibt beim Verdampfen etwa 0,4 m³ Gas.",
      "Unter etwa 0 °C verdampft Butan kaum noch, weshalb Campingkocher mit reinem Butan im Winter schlecht brennen; Mischungen mit Propan helfen dagegen.",
    ],
  },
  aluminyum: {
    heading: "Dichte von Aluminiumlegierungen",
    paragraphs: [
      "Reines Aluminium wiegt mit 2,70 g/cm³ etwa ein Drittel so viel wie Stahl. Übliche Legierungen liegen zwischen 2,63 und 2,85 g/cm³: 6061 und 6063 (Profile, Fensterrahmen) bei 2,70 g/cm³, die Luftfahrtlegierung 7075 wegen ihres Zinkanteils bei etwa 2,81 g/cm³.",
      "Ein Quadratmeter Aluminiumblech mit 1 mm Stärke wiegt etwa 2,7 kg, das gleiche Stahlblech 7,85 kg. Dieser Unterschied ist der Hauptgrund für Aluminium im Fahrzeug- und Flugzeugbau.",
    ],
  },
};
