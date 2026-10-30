import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Smartphone,
  Cloud,
  ShieldCheck,
  Server,
  Palette,
  ArrowUpRight,
} from "lucide-react";
import { Section, SectionHeading } from "../Section";
import { Reveal } from "../Reveal";

const SOLUTIONS = [
  {
    icon: LayoutDashboard,
    title: "Digital Platforms",
    desc: "Scalable web apps, dashboards, and SaaS platforms for African markets.",
    href: "/software-development-rwanda",
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    desc: "Native iOS & Android apps built with React Native and Flutter.",
    href: "/mobile-app-development-rwanda",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    desc: "Cloud migration, serverless architecture, and DevOps automation.",
    href: "/cloud-services-rwanda",
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity",
    desc: "Threat modeling, penetration testing, and zero-trust security.",
    href: "/cybersecurity-rwanda",
  },
  {
    icon: Server,
    title: "Backend Engineering",
    desc: "Robust APIs, data pipelines, and high-performance backends.",
    href: "/software-development-rwanda",
  },
  {
    icon: Palette,
    title: "UI / UX Design",
    desc: "User research, prototyping, and interface design that converts.",
    href: "/solutions",
  },
];

export function SolutionsSection() {
  return (
    <Section id="solutions">
      <SectionHeading
        eyebrow="Solutions"
        title={
          <>
            Engineering <span className="text-primary">excellence</span>, end to end.
          </>
        }
        description="From idea to launch — a multidisciplinary team that ships premium digital products."
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SOLUTIONS.map((s, i) => (
          <Reveal key={s.title} variant="fade-up" delay={i * 60} duration={550}>
            <article className="group relative overflow-hidden rounded-3xl border border-soft-border/70 bg-surface p-6 shadow-soft transition-all duration-300 hover:shadow-elevated hover:-translate-y-1">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/0 blur-2xl transition-colors duration-500 group-hover:bg-primary/15" />
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <Link
                to={s.href}
                className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-foreground/70 transition-colors group-hover:text-primary"
              >
                View Service <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
