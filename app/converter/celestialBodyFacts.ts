// Her gokcismi icin gercek, dogrulanabilir bilgiler (kesif tarihi, benzersiz
// ozellikler, uzay gorevleri). Kaynaklar: NASA (nasa.gov, solarsystem.nasa.gov),
// genel kabul gormus astronomi literatur.

export const celestialBodyFacts: Record<string, string[]> = {
  merkur: [
    "Merkür, Güneş'e en yakın gezegendir ve bu yüzden en aşırı sıcaklık farkına sahiptir — gündüz yüzeyi 430°C'ye ulaşırken, gece tarafı -180°C'ye kadar düşebilir; bunun nedeni gezegenin neredeyse hiç atmosferinin olmaması, dolayısıyla ısıyı tutamamasıdır.",
      "Merkür'ün yörüngesindeki küçük ama açıklanamayan sapma (perihelyon presesyonu), 19. yüzyılda uzun süre bilinmeyen bir gezegenin varlığıyla açıklanmaya çalışılmıştı; bu bilmece ancak Einstein'ın 1915'teki Genel Görelilik Kuramı'yla çözüldü ve kuramın ilk büyük deneysel doğrulamalarından biri oldu.",
    "NASA'nın MESSENGER (2011-2015) ve devam eden BepiColombo (ESA/JAXA ortak görevi) misyonları, Merkür'ü yakından inceleyen az sayıdaki uzay aracıdır — gezegenin Güneş'e yakınlığı, bir uzay aracının yörüngeye girmesini teknik olarak çok zorlaştırır.",
  ],
  venus: [
    "Venüs, yoğun karbondioksit atmosferinin oluşturduğu aşırı sera etkisi nedeniyle Güneş Sistemi'ndeki en sıcak gezegendir (~464°C yüzey sıcaklığı) — Merkür'den çok daha uzakta olmasına rağmen ondan bile daha sıcaktır.",
    "Venüs, Güneş Sistemi'ndeki gezegenler arasında nadir görülen bir şekilde ters yönde (retrograd) döner ve kendi ekseni etrafındaki dönüşü (243 Dünya günü) Güneş etrafındaki turundan (225 gün) daha uzun sürer — yani bir Venüs günü, bir Venüs yılından uzundur.",
    "Gökyüzünde Güneş ve Ay'dan sonra en parlak üçüncü doğal cisim olan Venüs, tarih boyunca hem 'sabah yıldızı' hem 'akşam yıldızı' olarak adlandırılmış ve Roma'da aşk tanrıçasının adını almıştır; Sovyet Venera görevleri 1970'lerde yüzeyine inen ilk uzay araçlarıydı.",
  ],
  dunya: [
    "Dünya, bilinen tek yaşam barındıran gökcismidir; sıvı su, koruyucu bir manyetik alan, oksijen açısından zengin bir atmosfer ve levha tektoniği gibi birbirini destekleyen birçok benzersiz koşulun bir arada bulunması bu yaşanabilirliği mümkün kılar.",
    "Dünya'nın Ay'ı, gezegenine oranla Güneş Sistemi'ndeki en büyük uydulardan biridir (Dünya çapının yaklaşık %27'si) — bu orantısız büyüklük, Ay'ın erken Dünya tarihinde Mars büyüklüğünde bir gök cismiyle (Theia) yaşanan dev bir çarpışma sonucu oluştuğu teorisini destekler.",
    "Dünya'nın manyetik alanı ve ozon tabakası, Güneş'ten gelen zararlı radyasyonu ve kozmik ışınları büyük ölçüde engelleyerek yüzeydeki yaşamı korur; bu koruma katmanları olmasaydı, atmosfer Mars'ınki gibi zamanla güneş rüzgarı tarafından aşınıp gidebilirdi.",
  ],
  mars: [
    "Mars'ın kırmızı rengi, yüzeyindeki demir oksit (pas) bakımından zengin tozdan kaynaklanır. Gezegen, Güneş Sistemi'ndeki en büyük volkanı (Olympus Mons, ~21,9 km yükseklikle Everest'in yaklaşık 2,5 katı) ve en büyük kanyon sistemini (Valles Marineris, ~4000 km uzunlukla ABD'yi baştan başa geçecek kadar büyük) barındırır.",
    "Mars'ın Phobos ve Deimos adlı iki küçük uydusu, şekilleri ve bileşimleri nedeniyle muhtemelen gezegenin yerçekimi tarafından yakalanmış asteroitlerdir; Phobos, Mars'a o kadar yakın yörüngededir ki milyonlarca yıl içinde ya parçalanıp bir halkaya dönüşecek ya da gezegene çarpacaktır.",
    "Mars, NASA'nın Curiosity (2012) ve Perseverance (2021) gezginleri de dahil olmak üzere en çok robotik keşif aracı gönderilen gezegendir; bu görevler, gezegenin uzak geçmişinde sıvı su ve nehir yataklarının var olduğuna dair güçlü kanıtlar bulmuştur.",
  ],
  jupiter: [
    "Jüpiter, Güneş Sistemi'ndeki en büyük gezegendir — kütlesi, diğer tüm gezegenlerin toplamının iki katından fazladır. Esas olarak hidrojen ve helyumdan oluşması nedeniyle, yeterince kütlesi olsaydı bir yıldıza dönüşebilecek bir bileşime sahiptir.",
    "Gezegenin en tanınan özelliği, en az 350 yıldır gözlemlenen ve Dünya'dan bile büyük olan devasa bir fırtına olan Büyük Kırmızı Leke'dir; ancak bu fırtına son yıllarda küçülmeye devam etmektedir.",
    "Galileo Galilei, 1610'da Jüpiter'in dört büyük uydusunu (Io, Europa, Ganymede, Callisto) teleskopla gözlemleyerek, o güne kadar her şeyin Dünya etrafında döndüğü inancını sarsan ilk doğrudan kanıtı sağladı — bu uydular bugün 'Galileo Uyduları' olarak anılır. Jüpiter'in bilinen uydu sayısı 90'ın üzerindedir.",
  ],
  saturn: [
    "Satürn, ünlü halka sistemiyle tanınır; bu halkalar esas olarak buz parçacıklarından ve az miktarda kayadan oluşur, bazı bölgelerde yalnızca birkaç metre kalınlığındadır ama on binlerce kilometre genişliğe yayılır.",
    "Satürn, Güneş Sistemi'ndeki en az yoğun gezegendir — ortalama yoğunluğu sudan bile düşüktür (yaklaşık 0,69 g/cm³), yani teorik olarak yeterince büyük bir su havuzuna konsa yüzebilirdi.",
    "NASA'nın Cassini uzay aracı, 2004-2017 yılları arasında 13 yıl boyunca Satürn'ü ve uydularını inceledi; görev, gezegenin atmosferine kontrollü bir dalışla, uydularını (özellikle Titan ve Enceladus) kirletme riskini önlemek amacıyla sona erdirildi.",
  ],
  uranus: [
    "Uranüs, kendi ekseni etrafında neredeyse yan yatmış şekilde (yaklaşık 98 derece eğimle) döner — bu, gezegenin muhtemelen oluşumunun erken döneminde Dünya büyüklüğünde bir cisimle yaşadığı devasa bir çarpışmadan kaynaklanır.",
    "Uranüs, 1781'de İngiliz gökbilimci William Herschel tarafından keşfedildi ve bu, teleskopla keşfedilen ilk gezegen oldu — o zamana kadar bilinen tüm gezegenler çıplak gözle görülebiliyordu.",
    "Bir 'buz devi' olan Uranüs, Jüpiter ve Satürn gibi gaz devlerinden farklı olarak su, amonyak ve metan buzlarından oluşan yoğun bir mantoya sahiptir; gezegenin soluk yeşilimsi-mavi rengi, atmosferindeki metan gazının kırmızı ışığı emmesinden kaynaklanır.",
  ],
  neptun: [
    "Neptün, doğrudan gözlemden önce matematiksel hesaplarla varlığı öngörülen ilk gezegendir — Uranüs'ün yörüngesindeki açıklanamayan sapmalar, gökbilimci Urbain Le Verrier ve John Couch Adams'ı bağımsız olarak bir gezegenin varlığını hesaplamaya yöneltti; gezegen 1846'da tam da öngörülen konumda bulundu.",
    "Neptün, Güneş Sistemi'ndeki en güçlü rüzgarlara sahiptir — bazı fırtına sistemlerinde rüzgar hızları saatte 2100 km'yi (ses hızının üzerinde) bulabilir.",
    "Neptün'e şimdiye kadar yalnızca bir uzay aracı, Voyager 2, 1989'da uğramıştır; en büyük uydusu Triton'un Neptün'ün dönüşüne ters yönde (retrograd) yörüngede dönmesi, onun aslında Kuiper Kuşağı'ndan yakalanmış bir cisim olduğuna işaret eder.",
  ],
  ay: [
    "Ay'ın oluşumuna dair en yaygın kabul gören 'Dev Çarpışma Hipotezi'ne göre, yaklaşık 4,5 milyar yıl önce Mars büyüklüğünde Theia adlı bir gökcismi genç Dünya'ya çarptı; bu çarpışmadan sıçrayan enkaz zamanla birleşerek Ay'ı oluşturdu.",
    "Ay, Dünya'ya 'gel-git kilitlenmesi' (tidal locking) ile bağlıdır — bu yüzden her zaman aynı yüzünü Dünya'ya döner ve 'Ay'ın karanlık yüzü' dediğimiz taraf, aslında karanlık değil sadece Dünya'dan hiç görülemeyen taraftır.",
    "Ay, Dünya'dan yılda yaklaşık 3,8 santimetre uzaklaşmaktadır — bu, Ay'ın Dünya üzerinde oluşturduğu gel-git sürtünmesinin bir sonucudur ve uzun vadede Dünya'nın dönüş hızını da yavaşça azaltmaktadır.",
  ],
  io: [
    "Io, Güneş Sistemi'ndeki volkanik olarak en aktif gökcismidir — yüzeyinde yüzlerce aktif volkan bulunur ve bazı püskürmeler uzaya yüzlerce kilometre yükseğe kükürt ve kükürt dioksit fışkırtabilir.",
    "Bu aşırı volkanik aktivitenin nedeni, Io'nun Jüpiter ile diğer Galileo uyduları (Europa, Ganymede) arasındaki yörünge rezonansından kaynaklanan 'gel-git ısınması'dır — bu güçler Io'nun iç kısmını sürekli olarak esnetip ısıtır.",
    "Io'nun yüzeyi, volkanik kükürt birikintileri nedeniyle sarı, turuncu ve kırmızı tonlarında canlı bir görünüme sahiptir ve bu rengi nedeniyle bazen 'pizza uydu' olarak da anılır.",
  ],
  europa: [
    "Europa'nın buzla kaplı yüzeyinin altında, sıvı su içeren küresel bir okyanus bulunduğuna dair güçlü kanıtlar vardır — bu okyanusun toplam su hacminin Dünya'nın tüm okyanuslarından fazla olduğu tahmin edilmektedir.",
    "Bu gizli okyanus nedeniyle Europa, Güneş Sistemi'nde Dünya dışı yaşam arayışında en umut verici adaylardan biri olarak kabul edilir; NASA'nın Europa Clipper görevi (2024'te fırlatıldı), uyduyu ve buzlu kabuğunun altındaki okyanusu ayrıntılı incelemeyi hedefler.",
    "Europa'nın yüzeyi, iç kısımdaki okyanusun gel-git kuvvetleriyle hareket etmesinden kaynaklanan çatlaklar ve çizgilerle kaplıdır; bu, onu Güneş Sistemi'ndeki en düz (kraterlerin az olduğu) yüzeylerden birine dönüştürür.",
  ],
  ganymede: [
    "Ganymede, Güneş Sistemi'ndeki en büyük uydudur — çapı Merkür gezegeninden bile büyüktür (ancak kütlesi Merkür'den azdır, çünkü buz oranı yüksek ve daha az yoğundur).",
    "Ganymede, bilinen tek uydudur ki kendi manyetik alanını üretir — bu, uydunun içinde erimiş demir bir çekirdeğin bulunduğuna işaret eder ve Jüpiter'in kendi güçlü manyetik alanı içinde küçük bir 'manyetosfer kabarcığı' oluşturur.",
    "Europa gibi Ganymede'nin de buzlu kabuğunun altında sıvı bir su okyanusu barındırdığı düşünülür; Hubble Uzay Teleskobu'nun 2015'teki gözlemleri, uydunun kutup ışıklarındaki (auroralar) küçük sapmaları inceleyerek bu okyanusun varlığına dair dolaylı kanıt sağladı.",
  ],
  callisto: [
    "Callisto, Güneş Sistemi'ndeki en fazla krater bulunan (en yoğun kraterli) yüzeye sahip gökcismidir — bu, yüzeyinin milyarlarca yıldır neredeyse hiç jeolojik olarak yenilenmediğini, dolayısıyla Güneş Sistemi'nin erken tarihinin 'fosilleşmiş' bir kaydını taşıdığını gösterir.",
    "Dört Galileo uydusu arasında Jüpiter'e en uzak olanı Callisto'dur; bu mesafe, onu Jüpiter'in güçlü radyasyon kuşaklarının çoğundan koruduğu için, gelecekteki insanlı görevler için diğer Galileo uydularına göre daha güvenli bir üs adayı olarak değerlendirilmiştir.",
    "Callisto'nun buzla kaplı yüzeyinin altında da, tıpkı Europa ve Ganymede gibi, tuzlu bir su okyanusu bulunabileceğine dair kanıtlar vardır; ancak Callisto'nun iç yapısı diğer ikisi kadar farklılaşmış (katmanlaşmış) değildir.",
  ],
  titan: [
    "Titan, Satürn'ün en büyük uydusu ve Güneş Sistemi'nde Dünya dışında yoğun bir atmosfere sahip tek uydudur; atmosferi esas olarak azottan oluşur ve yüzey basıncı Dünya'nınkinden bile yüksektir.",
    "Titan, Dünya dışında yüzeyinde kararlı sıvı göllere ve nehirlere sahip olduğu bilinen tek gökcismidir — ancak bu sıvılar su değil, metan ve etandan oluşan hidrokarbonlardır; yüzey sıcaklığı yaklaşık -179°C olduğu için su tamamen donmuş haldedir.",
    "2005'te Avrupa Uzay Ajansı'nın Huygens uzay aracı, Titan'ın yüzeyine inerek Dünya dışında bir uyduya inen ilk uzay aracı oldu; gönderdiği görüntüler, nehir yatakları ve kıyı şeritlerine benzeyen jeolojik yapılar ortaya çıkardı.",
  ],
  triton: [
    "Triton, Neptün'ün en büyük uydusudur ve Güneş Sistemi'ndeki büyük uydular arasında gezegeninin dönüş yönüne ters (retrograd) yörüngede dönen tek uydudur — bu alışılmadık durum, Triton'un aslında Neptün tarafından yakalanmış bir Kuiper Kuşağı cismi olduğunun güçlü bir kanıtıdır.",
    "Triton, yüzeyinden azot gazı ve toz fışkırtan aktif 'kriyovolkanik' gayzerlere sahiptir — bu, onu Güneş Sistemi'ndeki jeolojik olarak aktif birkaç buzlu gökcisminden biri yapar.",
    "Triton'un retrograd yörüngesi kararsızdır ve gel-git kuvvetleri onu yavaşça Neptün'e doğru çekmektedir; bilim insanları, yaklaşık 3-4 milyar yıl sonra Triton'un ya parçalanıp Neptün'e bir halka oluşturacağını ya da gezegene çarpacağını öngörüyor.",
  ],
  pluton: [
    "Plüton, 1930'da Clyde Tombaugh tarafından keşfedildiğinde Güneş Sistemi'nin dokuzuncu gezegeni ilan edildi; ancak Kuiper Kuşağı'nda benzer büyüklükte başka cisimlerin (özellikle Eris) keşfedilmesi üzerine, Uluslararası Astronomi Birliği (IAU) 2006'da Plüton'u 'cüce gezegen' olarak yeniden sınıflandırdı.",
    "NASA'nın New Horizons uzay aracı, 2015'te Plüton'a yaklaşarak ilk kez yakından görüntülerini çekti ve gezegenin yüzeyinde kalp şeklindeki devasa buzul ovası Tombaugh Regio'yu keşfetti — bu, Plüton hakkındaki bilgimizi kökten değiştiren bir görevdi.",
    "Plüton'un en büyük uydusu Charon, Plüton'un yaklaşık yarısı büyüklüğündedir — bu oran o kadar büyüktür ki bazı bilim insanları ikilinin bir 'çift cüce gezegen' sistemi olarak düşünülmesi gerektiğini savunur; ikisi ortak bir kütle merkezi etrafında birbirini 'kilitlenmiş' halde döner.",
  ],
  ceres: [
    "Ceres, Mars ile Jüpiter arasındaki asteroit kuşağındaki en büyük cisimdir ve bu kuşaktaki tüm kütlenin yaklaşık üçte birini tek başına oluşturur; aynı zamanda iç Güneş Sistemi'ndeki tek cüce gezegendir.",
    "Ceres, 1801'de İtalyan astronom Giuseppe Piazzi tarafından keşfedildiğinde önce gezegen, sonra asteroit olarak sınıflandırıldı; 2006'daki IAU kararıyla Plüton ile birlikte 'cüce gezegen' statüsüne yükseltildi.",
    "NASA'nın Dawn uzay aracı 2015'te Ceres'i yörüngeye girerek inceleyen ilk (ve şimdiye dek tek) uzay aracı oldu; Occator krateri içindeki parlak beyaz lekelerin, yüzeye sızan tuzlu sıvılardan (kriyovolkanizma) kaynaklanan tuz birikintileri olduğunu ortaya çıkardı.",
  ],
  eris: [
    "Eris, 2005'te keşfedildiğinde başlangıçta Plüton'dan daha kütleli olduğu düşünülmüştü — bu keşif, 'dokuzuncu gezegen Plüton mu, yoksa Eris de bir gezegen mi sayılmalı' tartışmasını başlatarak doğrudan Uluslararası Astronomi Birliği'nin 2006'da 'gezegen' tanımını yeniden yapmasına ve Plüton'un cüce gezegen statüsüne indirilmesine yol açtı.",
    "Eris, Kuiper Kuşağı'nın çok ötesinde, 'saçılmış disk' (scattered disk) olarak bilinen bölgede bulunur ve Güneş'e ortalama uzaklığı Plüton'un yaklaşık iki katıdır; bu uzaklık nedeniyle yüzeyi Güneş Sistemi'ndeki en soğuk ve en parlak (yüksek yansıtıcılığa sahip) yüzeylerden biridir.",
    "Eris'in adı, kaos ve çekişme tanrıçası Eris'ten gelir — bu isim, keşfinin gezegen tanımı konusunda astronomi camiasında yarattığı tartışmaya (kaosa) doğrudan bir gönderme olarak seçilmiştir. Tek bilinen uydusu Dysnomia'dır.",
  ],
};
