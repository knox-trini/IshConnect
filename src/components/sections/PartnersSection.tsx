import { Reveal } from "../Reveal";
import { usePublicContent } from "@/hooks/usePublicContent";

const PARTNERS = [
  { name: "mCoders", href: "https://mcoders.minict.gov.rw/" },
  { name: "EdTech Solutions Rwanda", href: "https://www.edtechsolutions.rw/" },
  { name: "Kiyumba Technical Secondary School" },
  { name: "Ingazi", href: "https://ingazi.rw/" },
  { name: "AnyService Rwanda", href: "https://anyservice.rw/" },
  { name: "Velamini", href: "https://www.velamini.com/" },
  { name: "DigiCenter Rwanda", href: "https://digicenter.rw/" },
  { name: "GIZ Rwanda", href: "https://www.giz.de/" },
  { name: "Embassy of Germany in Kigali", href: "https://kigali.diplo.de/" },
];

type Partner = { slug: string; name: string; href?: string; channelUrl?: string; order?: number };

function PartnerBadge({ name, href }: { name: string; href?: string }) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-soft-border/70 bg-surface px-4 py-2 text-sm text-foreground/70 transition-all hover:border-primary/40 hover:text-primary hover:shadow-sm"
      >
        {name}
      </a>
    );
  }
  return (
    <span className="inline-flex shrink-0 items-center rounded-full border border-soft-border/70 bg-surface px-4 py-2 text-sm text-foreground/70">
      {name}
    </span>
  );
}

export function PartnersSection() {
  const partners = usePublicContent<Partner>("partners", PARTNERS.map((p, order) => ({ ...p, slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), order })));
  const orderedPartners = [...partners].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return (
    <section className="border-y border-soft-border/60 bg-surface-elevated/50 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <Reveal variant="fade-up" duration={500}>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Trusted By Leading Institutions &amp; Partners
          </p>
        </Reveal>

        <div className="marquee-fade relative mt-8 overflow-hidden">
          <div
            className="flex items-center gap-3 marquee-track"
          >
            {[...orderedPartners, ...orderedPartners].map((p, i) => (
              <PartnerBadge key={`${p.slug}-${i}`} name={p.name} href={p.channelUrl || p.href} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
