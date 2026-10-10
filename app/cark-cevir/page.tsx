import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { takvimMetadata } from "../components/takvim/takvimMeta";
import TimeToolPage from "../components/time/TimeToolPage";
import WheelSpinner from "../components/wheel/WheelSpinner";
import type { FaqItem } from "../converter/faqSchema";

export const metadata: Metadata = takvimMetadata("/cark-cevir", {
  title: "Çark Çevir: İsim Çarkı, Kura ve Instagram Çekilişi",
  short: "Çark Çevir: İsim Çarkı ve Çekiliş",
  description:
    "İsimleri yaz, çarkı çevir: sınıfta kim kalkacak, akşam ne yenecek, takımlar nasıl kurulacak? Ağırlıklı dilim, takım bölme, adillik testi ve parmak izli Instagram çekilişi tek sayfada.",
});

const faq: FaqItem[] = [
  {
    question: "Çark gerçekten rastgele mi?",
    answer:
      "Evet. Kazanan, tarayıcınızın kriptografik rastgele sayı üreticisiyle (crypto.getRandomValues) çark dönmeye başlamadan seçilir; çarkın nerede duracağı bu seçime göre hesaplanır. Üstteki “Adil mi?” düğmesi aynı seçimi 10.000 kez tekrarlayıp her ismin çıkma oranını gösterir.",
  },
  {
    question: "Bir ismin çıkma ihtimalini nasıl artırırım?",
    answer:
      "İsmin sonuna yıldız ve sayı yazın: “Pizza *3” diğer seçeneklerden üç kat geniş dilim alır ve üç kat sık çıkar. 1 ile 99 arasında bir ağırlık verilebilir.",
  },
  {
    question: "Çıkan ismi listeden nasıl çıkarırım?",
    answer:
      "Kazanan kartındaki “Listeden çıkar” düğmesine basın. Herkesin sırayla seçilmesini istiyorsanız Girdiler sekmesindeki “Çıkan ismi listeden çıkar” kutusunu işaretleyin; her çevirmeden sonra çıkan isim otomatik silinir.",
  },
  {
    question: "Listem kaydediliyor mu, başkası görebilir mi?",
    answer:
      "Liste ve kaydettiğiniz çarklar yalnızca kendi tarayıcınızda saklanır, sunucuya gönderilmez. “Paylaş” ile kopyaladığınız link listeyi adresin # işaretinden sonraki kısmında taşır; linki kime gönderirseniz o kişi aynı çarkı görür.",
  },
  {
    question: "Instagram çekilişi için izin gerekir mi?",
    answer:
      "Türkiye'de işletmelerin ve markaların düzenlediği ödüllü çekilişler, Karşılığı Nakit Olmayan Piyangolar ve Çekilişler Hakkında Yönetmelik kapsamında Milli Piyango İdaresi iznine tabi olabilir. Bu araç kazananı adil biçimde seçer ama izin yerine geçmez; ticari bir çekiliş planlıyorsanız önce Milli Piyango İdaresi'ne ya da bir hukukçuya danışın.",
  },
  {
    question: "Liste parmak izi ne işe yarar?",
    answer:
      "Katılımcı listesi alfabetik sıralanıp SHA-256 ile özetlenir ve ilk 12 karakteri gösterilir. Aynı listeyi yapıştıran herkes aynı kodu görür; listeye sonradan bir isim eklenir ya da çıkarılırsa kod tamamen değişir. Sonucu paylaşırken kodu da yazarsanız takipçiler listeyle oynanmadığını kontrol edebilir.",
  },
];

export default function CarkCevirRoute() {
  return (
    <TimeToolPage
      crumbs={[{ href: "/", label: "Ana Sayfa" }, { label: "Çark Çevir" }]}
      crumbLabel="Sayfa yolu"
      title="Çark Çevir"
      intro="İsimleri ya da seçenekleri her satıra bir tane yazın, çarka dokunun. Sınıfta söz sırası, akşam yemeği kararı, takım kurma ve Instagram çekilişi için; liste tarayıcınızda kalır."
      tool={<WheelSpinner />}
      related={{
        title: "İlginizi çekebilir",
        links: [
          { href: "/zamanlayici", label: "Zamanlayıcı" },
          { href: "/kronometre", label: "Kronometre" },
          { href: "/geri-sayim", label: "Geri Sayım" },
          { href: "/devamsizlik-hesaplama", label: "Devamsızlık Hesaplama" },
          { href: "/pomodoro", label: "Pomodoro" },
        ],
      }}
      tocTitle="İçindekiler"
      tocItems={[
        { id: "nasil", label: "Nasıl kullanılır?" },
        { id: "adil", label: "Çark adil mi?" },
        { id: "sinif", label: "Sınıfta ve oyunlarda" },
        { id: "cekilis", label: "Instagram çekilişi" },
        { id: "faq", label: "Sık Sorulan Sorular" },
      ]}
      faqTitle="Sık Sorulan Sorular"
      faqItems={faq}
    >
      <h2 id="nasil">Nasıl kullanılır?</h2>
      <p>
        Girdiler sekmesindeki kutuya her satıra bir isim yazın ya da “Hazır listeler” menüsünden birini seçin; çark siz
        yazdıkça güncellenir. Çarka, ortadaki ÇEVİR düğmesine dokunun ya da liste kutusundayken Ctrl + Enter&apos;a
        basın. Çark yavaşlayarak durur ve ibrenin gösterdiği isim büyük bir kartta açılır. Karttan aynı listeyle tekrar
        çevirebilir ya da çıkan ismi listeden silebilirsiniz.
      </p>
      <p>
        Üstteki araç çubuğundan renk temasını, dönüş süresini (3, 6 ya da 10 saniye) ve tık sesini değiştirebilir,
        sık kullandığınız listeleri “Kaydet” ile saklayıp “Çarklarım”dan tek dokunuşla açabilirsiniz. “Paylaş” düğmesi
        çarkın linkini kopyalar; linki açan kişi aynı listeyi görür. Tam ekran düğmesi yalnızca çarkı bırakır, sınıfta
        tahtaya ya da toplantıda ekrana yansıtmak için uygundur.
      </p>

      <h2 id="adil">Çark adil mi?</h2>
      <p>
        Kazanan çark dönmeye başlamadan, tarayıcının kriptografik rastgele sayı üreticisiyle seçilir; animasyon yalnızca
        bu sonucu gösterir. Her ismin çıkma ihtimali dilimin genişliğiyle aynıdır: 12 isimlik bir listede her isim
        yaklaşık %8,3 ihtimalle çıkar. “Adil mi?” düğmesi aynı seçimi 10.000 kez tekrarlar ve her ismin gerçekte kaç
        kez çıktığını beklenen oranla yan yana gösterir. 10.000 denemede oranların beklenenden yarım puan kadar
        sapması normaldir; deneme sayısı arttıkça fark küçülür.
      </p>
      <p>
        Ağırlık verdiğiniz isimler (“Ali *2” gibi) çarkta da iki kat geniş görünür, yani hile gizli değildir: herkes
        hangi seçeneğin daha büyük dilim aldığını çarkın üstünde görür.
      </p>

      <h2 id="sinif">Sınıfta ve oyunlarda</h2>
      <p>
        Öğretmenler sınıf listesini bir kez kaydedip her derste açabilir. “Çıkan ismi listeden çıkar” seçeneği açıkken
        aynı öğrenci iki kez kaldırılmaz, liste bitene kadar herkes sırayla gelir. Takımlar sekmesi listeyi 2 ile 6
        arasında eşit takıma rastgele böler; beden eğitimi, grup ödevi ya da yarışma için kullanılabilir. Grup
        çalışmasında süre tutmak için <Link href="/zamanlayici">zamanlayıcıyı</Link>, yoklama hesabı için{" "}
        <Link href="/devamsizlik-hesaplama">devamsızlık hesaplamayı</Link> kullanabilirsiniz.
      </p>
      <p>
        Evde “bu akşam ne yesek?”, arkadaşlarla “doğruluk mu cesaret mi?” ya da “kim başlasın?” gibi kararlar için
        hazır listeler var. 1&apos;den 20&apos;ye sayılar listesi tombala, zar yerine sayı çekme ve sıra belirleme için
        işe yarar.
      </p>

      <h2 id="cekilis">Instagram çekilişi</h2>
      <p>
        Çekiliş sekmesine yorumları olduğu gibi yapıştırın: araç her satırın ilk kelimesini kullanıcı adı olarak alır,
        baştaki @ işaretini temizler, birden fazla yorum yapan kişiyi bir kez sayar ve hariç tuttuğunuz hesapları
        (kendi hesabınız, çalışanlarınız) listeden çıkarır. Kaç asıl ve kaç yedek kazanan istediğinizi seçin; sonuç
        tarih, katılımcı sayısı ve liste parmak iziyle bir kart olarak gelir. “Sonucu kopyala” ile metni hikâyenize ya
        da gönderinize yapıştırabilirsiniz.
      </p>
      <p>
        Yedek kazanan, asıl kazanan belirtilen sürede ulaşmazsa ödülün kime geçeceğini baştan belli eder ve ikinci bir
        çekilişe gerek bırakmaz. Türkiye&apos;de işletmelerin ödüllü çekilişleri Milli Piyango İdaresi iznine tabi
        olabilir; bu araç kazananı adil biçimde seçer, ancak gereken izinlerin yerine geçmez.
      </p>
    </TimeToolPage>
  );
}
