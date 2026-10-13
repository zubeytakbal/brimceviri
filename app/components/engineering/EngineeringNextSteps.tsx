import Link from "@/app/components/SiteLink";
import type { FlowLink } from "../../converter/engineeringFlows";

/** Bir hesaptan sonra doğal olarak yapılacak hesaplar. */
export default function EngineeringNextSteps({ links, title = "Sonraki adım" }: { links: FlowLink[]; title?: string }) {
  if (links.length === 0) return null;
  return (
    <section className="engineering-next-steps" aria-label={title}>
      <h2>{title}</h2>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
            <span>{link.why}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
