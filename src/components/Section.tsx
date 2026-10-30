import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Section({
  id,
  className = "",
  children,
  ...rest
}: { id?: string; className?: string; children: ReactNode } & React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-6xl px-6 py-16 sm:py-20 md:py-28 ${className}`}
      {...rest}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-soft-border/70 bg-surface px-3 py-1 text-xs font-medium text-foreground/70">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <Reveal variant="fade-up" duration={500}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal variant="fade-up" delay={eyebrow ? 50 : 0} duration={600}>
        <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal variant="fade-up" delay={eyebrow ? 120 : 70} duration={600}>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
