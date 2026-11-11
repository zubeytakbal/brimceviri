import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import DnaRnaTranslatorCalculator from "../../../components/DnaRnaTranslatorCalculator";
import type { FaqItem } from "../../../converter/faqSchema";
import { codonTable } from "../../../converter/codonTable";
import { buildSiteUrl } from "../../../siteConfig";
import AracSayfasi from "@/app/components/yeni/AracSayfasi";

const faqItems: FaqItem[] = [
  {
    question: "Kaç tane kodon vardır?",
    answer:
      "4 farklı bazın (A, U, G, C) 3'lü gruplar (kodon) oluşturmasıyla 4³ = 64 farklı kodon oluşur. Bunların 61'i bir amino asidi kodlar, 3'ü (UAA, UAG, UGA) ise dur (stop) kodonudur ve hiçbir amino asit kodlamaz.",
  },
  {
    question: "Başlangıç kodonu hangisidir?",
    answer:
      "AUG, protein sentezini başlatan kodondur ve aynı zamanda metionin amino asidini kodlar. Bu yüzden neredeyse tüm proteinlerin sentezi metioninle başlar.",
  },
  {
    question: "Dur (stop) kodonları hangileridir?",
    answer:
      "UAA, UAG ve UGA — üçü de hiçbir amino asit kodlamaz, ribozoma proteinin bittiğini bildirir.",
  },
  {
    question: "Neden birden fazla kodon aynı amino asidi kodluyor?",
    answer:
      "Buna 'genetik kodun dejenerasyonu' (kodon dejenerasyonu) denir — 61 kodon sadece 20 amino asidi kodladığı için çoğu amino asidin birden fazla kodonu vardır (örn. lösin 6 farklı kodonla kodlanabilir). Bu fazlalık, DNA/RNA'daki bazı mutasyonların amino asit dizisini değiştirmemesini sağlar.",
  },
];


export const metadata: Metadata = {
  title: "Kodon Tablosu ve DNA/RNA Amino Asit Çevirici",
  description:
    "64 kodonun tam listesi (AUG başlangıç kodonu, UAA/UAG/UGA dur kodonları dahil) ve kendi DNA/RNA dizini yazıp anında amino asit dizisine çevirebileceğin canlı araç.",
  alternates: { canonical: "/bilim-hesaplayicilari/biyoloji/kodon-tablosu" },
  openGraph: {
    title: "Kodon Tablosu ve DNA/RNA Amino Asit Çevirici",
    description: "64 kodonun tam listesi ve canlı DNA/RNA çevirici.",
    url: buildSiteUrl("/bilim-hesaplayicilari/biyoloji/kodon-tablosu"),
    siteName: "BirimCeviri.app",
    locale: "tr_TR",
    type: "website",
  },
};

export default function CodonTablePage() {

  return (
    <AracSayfasi
      yol="/bilim-hesaplayicilari/biyoloji/kodon-tablosu"
      baslik="Kodon Tablosu ve DNA/RNA Amino Asit Çevirici"
      hesap={<DnaRnaTranslatorCalculator />}
      giris={<><p>64 kodonun tam listesi — hangi kodon hangi amino asidi kodluyor, başlangıç ve dur kodonları hangileri.</p></>}
      sss={faqItems}
      serbestIcindekiler={[{"id":"tam-kodon-tablosu-mrna","baslik":"Tam Kodon Tablosu (mRNA)"},{"id":"kaynaklar","baslik":"Kaynaklar"}]}
      serbestIcerik={
        <>
          <h2 id="tam-kodon-tablosu-mrna">Tam Kodon Tablosu (mRNA)</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>64 kodon ve kodladıkları amino asitler</caption>
              <thead>
                <tr>
                  <th scope="col">Kodon</th>
                  <th scope="col">Amino Asit</th>
                  <th scope="col">Not</th>
                </tr>
              </thead>
              <tbody>
                {codonTable.map((entry) => (
                  <tr key={entry.codon}>
                    <td>{entry.codon}</td>
                    <td>
                      {entry.threeLetterCode
                        ? `${entry.nameTr} (${entry.threeLetterCode})`
                        : entry.nameTr}
                    </td>
                    <td>{entry.isStart ? "Başlangıç Kodonu" : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h2 id="kaynaklar">Kaynaklar</h2>
          <p>
            Kodon tablosu, tüm canlılarda (bazı istisnalar dışında)
            ortak olan evrensel genetik koda dayanır — standart bir
            biyokimya/moleküler biyoloji referansıdır.
          </p>
        </>
      }
    />
  );
}
