import Link from "@/app/components/SiteLink";
import { bulutBoylari } from "../../converter/time/sehirNufuslari";

type BulutSehri = { tr: string; nameTr: string };

/** Gazete dizgisiyle şehir bulutu: büyük şehir büyük harfle; alfabetik sırada. */
export default function SehirBulutu({ sehirler, bu }: { sehirler: BulutSehri[]; bu?: BulutSehri }) {
  const hepsi = [...(bu ? [bu] : []), ...sehirler].sort((a, b) => a.nameTr.localeCompare(b.nameTr, "tr"));
  const boy = bulutBoylari(hepsi.map((c) => c.tr));
  return (
    <p className="sehir-bulutu">
      {hepsi.map((c) =>
        c.tr === bu?.tr ? (
          <span key={c.tr} className={`bulut-b${boy.get(c.tr)} is-bu`} aria-current="page">
            {c.nameTr}
          </span>
        ) : (
          <Link key={c.tr} href={`/dunya-saatleri/${c.tr}`} prefetch={false} className={`bulut-b${boy.get(c.tr)}`}>
            {c.nameTr}
          </Link>
        ),
      )}
    </p>
  );
}
