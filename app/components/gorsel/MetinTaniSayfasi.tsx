import Link from "@/app/components/SiteLink";
import type { FaqItem } from "../../converter/faqSchema";
import { DOSYA_ARACLARI_YOLU } from "../../converter/gorsel/dosyaAraclari";
import TimeToolPage from "../time/TimeToolPage";
import { takvimMetadata } from "../takvim/takvimMeta";
import DosyaAracCubugu from "./DosyaAracCubugu";
import MetinTani from "./MetinTani";

export const OCR_YOLU = "/resimden-yaziya-cevirme";

export const ocrMeta = () =>
  takvimMetadata(OCR_YOLU, {
    title: "Resimden Yazıya Çevirme (OCR): Fotoğraftaki Yazıyı Metne Çevir",
    short: "Resimden Yazıya Çevirme",
    description:
      "Fotoğraf, ekran görüntüsü veya taranmış belgedeki yazıyı düzenlenebilir metne çevirin. Türkçe karakterler dahil, toplu, ücretsiz; görseller sunucuya yüklenmez.",
  });

const SSS: FaqItem[] = [
  {
    question: "Resimdeki yazı nasıl metne çevrilir?",
    answer:
      "Görseli seçin, sürükleyip bırakın ya da ekran görüntüsünü Ctrl+V ile yapıştırın. Araç yazıyı okur ve düzenlenebilir bir metin kutusuna yazar; metni düzeltip kopyalayabilir veya TXT dosyası olarak indirebilirsiniz.",
  },
  {
    question: "Türkçe karakterleri (ç, ğ, ı, İ, ö, ş, ü) tanıyor mu?",
    answer:
      "Evet. 'Türkçe' dili seçiliyken Türkçe dil modeli kullanılır ve Türkçe harfler doğru tanınır. Görselde İngilizce kelimeler de varsa 'İngilizce'yi de seçili bırakın.",
  },
  {
    question: "El yazısını okuyabilir mi?",
    answer:
      "Tanıma motoru basılı yazı için tasarlanmıştır. Düzgün ve ayrık el yazısında kısmen sonuç alınabilir, ancak bitişik el yazısında doğruluk düşüktür.",
  },
  {
    question: "Doğruluğu nasıl artırabilirim?",
    answer:
      "Yazının net, düz ve iyi aydınlatılmış olduğu, gölge ve parlama olmayan bir görsel kullanın. Belgeyi mümkün olduğunca dik çekin, 'Görüntüyü iyileştir' seçeneğini açık tutun ve sadece görseldeki dilleri seçin.",
  },
  {
    question: "Görsellerim bir sunucuya yükleniyor mu?",
    answer:
      "Hayır. Tanıma tamamen tarayıcınızda yapılır. Yalnızca tanıma motoru ve seçtiğiniz dillerin verisi ilk kullanımda jsDelivr'den bir kez indirilir; görselleriniz ve metinleriniz bilgisayarınızdan çıkmaz.",
  },
];

export function MetinTaniSayfasi() {
  return (
    <>
      <DosyaAracCubugu />
      <TimeToolPage
        crumbs={[
          { href: "/", label: "Ana Sayfa" },
          { href: DOSYA_ARACLARI_YOLU, label: "Dosya Araçları" },
          { label: "Resimden Yazıya Çevirme" },
        ]}
        crumbLabel="Sayfa yolu"
        title="Resimden Yazıya Çevirme (OCR)"
        intro="Fotoğraf, ekran görüntüsü, taranmış belge veya kitap sayfasındaki yazıyı düzenlenebilir metne çevirin. Türkçe karakterler doğru tanınır; birden fazla görseli sırayla okuyup tümünü tek seferde kopyalayabilirsiniz."
        tool={<MetinTani />}
        related={{
          title: "İlginizi çekebilir",
          links: [
            { href: DOSYA_ARACLARI_YOLU, label: "Tüm Dosya Araçları" },
            { href: "/fotograf-kirpma", label: "Fotoğraf Kırpma ve Döndürme" },
            { href: "/heic-jpg-cevirme", label: "HEIC JPG Çevirme" },
            { href: "/gorsel-donusturucu", label: "Görsel Dönüştürücü" },
            {
              href: "/fotograf-bulaniklastirma",
              label: "Fotoğraf Bulanıklaştırma",
            },
          ],
        }}
        tocTitle="İçindekiler"
        tocItems={[
          { id: "kullanim", label: "Nerelerde işe yarar?" },
          { id: "ipuclari", label: "Daha iyi sonuç için" },
          { id: "faq", label: "Sık sorulan sorular" },
        ]}
        faqTitle="Sık sorulan sorular"
        faqItems={SSS}
      >
        <h2 id="kullanim">Nerelerde işe yarar?</h2>
        <ul>
          <li>
            Kitap, dergi veya ders notu sayfalarını yeniden yazmadan metne
            çevirmek
          </li>
          <li>
            Ekran görüntüsündeki yazıyı, hata mesajını ya da tabloyu kopyalamak
          </li>
          <li>Fatura, dekont veya belge fotoğrafındaki bilgileri aktarmak</li>
          <li>Afiş, tabela ya da menü fotoğrafındaki yazıyı almak</li>
        </ul>
        <h2 id="ipuclari">Daha iyi sonuç için</h2>
        <ul>
          <li>
            Belge yan veya ters çekildiyse önce{" "}
            <Link href="/fotograf-kirpma">Fotoğraf Kırpma ve Döndürme</Link>{" "}
            aracıyla düzeltin ve yalnızca yazılı bölümü kırpın.
          </li>
          <li>
            Telefonu belgeye paralel tutun; eğik çekimlerde satırlar kayabilir.
          </li>
          <li>
            Yazının üzerine gölge ya da flaş parlaması düşmemesine dikkat edin.
          </li>
          <li>
            Sonucu mutlaka okuyup düzeltin; özellikle rakam ve özel isimleri
            kontrol edin.
          </li>
        </ul>
      </TimeToolPage>
    </>
  );
}
