import { Section, SectionHeading } from "../Section";
import { Reveal } from "../Reveal";
import { Linkedin } from "lucide-react";
import { TEAM_CONTENT } from "@/lib/team-content";
import { resolveCmsImage } from "@/lib/cms-api";
import { usePublicContent } from "@/hooks/usePublicContent";

type TeamMember = { slug: string; name: string; role: string; image?: string; linkedin?: string; leadership?: boolean; order?: number };

export function TeamSection() {
  const members = usePublicContent<TeamMember>("team", TEAM_CONTENT);
  const leads = members.filter((member) => member.leadership).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const team = members.filter((member) => !member.leadership).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return (
    <Section id="team">
      <SectionHeading
        eyebrow="Team"
        title={
          <>
            The minds behind the <span className="text-primary">mission.</span>
          </>
        }
        description="A multidisciplinary team of engineers, designers, and educators building impactful digital experiences across Africa."
      />

      {/* LEADERS */}
      <div className="mt-14 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {leads.map((member, i) => (
          <Reveal key={member.name} variant="fade-up" delay={i * 80} duration={550}>
            <div className="group overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-elevated h-full">
              <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFF7ED] via-orange-50 to-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.18),transparent_60%)]" />
                <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#F97316] shadow-sm">
                  Leadership
                </div>
                <a
                  href={member.linkedin || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                  className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0A66C2] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0A66C2] hover:text-white"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <div className="relative h-28 w-28 overflow-hidden rounded-full ring-4 ring-white/90 shadow-xl">
                  <img
                    src={resolveCmsImage(member.image)}
                    alt={`${member.name} — ${member.role}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 border-t border-orange-100 bg-white/90 p-5 backdrop-blur">
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {member.role}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* TEAM GRID */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((member, i) => (
          <Reveal key={member.name} variant="fade-up" delay={i * 40} duration={400}>
            <div className="group flex items-center gap-3 rounded-2xl border border-orange-100 bg-white px-4 py-4 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-semibold text-primary">
                {member.name[0]}
              </span>
              <div>
                <p className="text-sm font-semibold leading-tight text-foreground">{member.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{member.role}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
