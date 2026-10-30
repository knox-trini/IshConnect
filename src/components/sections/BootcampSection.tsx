import { Calendar, Laptop, MessageCircle, Instagram, ArrowUpRight, Sparkles } from "lucide-react";
import { Section, SectionHeading } from "../Section";
import { Reveal } from "../Reveal";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useSiteContent } from "@/hooks/useSiteContent";
import { getContentIcon } from "@/lib/content-icons";

export function BootcampSection() {
  const settings = useSiteSettings();
  const { home } = useSiteContent();
  const copy = home.bootcamp;
  return (
    <Section id="bootcamps" className="bg-surface-elevated/40">
      <SectionHeading
        eyebrow={copy.eyebrow}
        title={
          <>
            {settings.bootcampTitle || "IshConnect Summer"}{" "}
            <span className="text-primary">
              {settings.bootcampHighlight || "Coding & AI Bootcamp"}
            </span>
          </>
        }
        description={
          settings.bootcampDescription ||
          "Starts soon - 100% online. Build real projects, learn from live instructors, and code together with the IshConnect community."
        }
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {/* Start info card */}
        <Reveal variant="fade-up" duration={600}>
          <div className="flex h-full flex-col rounded-3xl border border-soft-border/70 bg-surface p-7 shadow-soft">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Calendar className="h-5 w-5" />
            </span>
            <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
              {copy.kickoffTitle}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {settings.bootcampKickoffText ||
                "The IshConnect Summer Coding & AI Bootcamp 2026 starts in 3 days."}
            </p>
            <div className="mt-5 space-y-2 rounded-2xl border border-soft-border/70 bg-foreground/5 p-4 text-sm">
              <p className="flex items-center gap-2 font-medium text-foreground">
                <Calendar className="h-4 w-4 text-primary" /> Start date
                <span className="ml-auto text-muted-foreground">
                  {settings.bootcampStartDate || "28 July 2026"}
                </span>
              </p>
              <p className="flex items-center gap-2 font-medium text-foreground">
                <Laptop className="h-4 w-4 text-primary" /> Format
                <span className="ml-auto text-muted-foreground">
                  {settings.bootcampFormat || "100% Online"}
                </span>
              </p>
            </div>
          </div>
        </Reveal>

        {/* Prepare card */}
        <Reveal variant="fade-up" delay={80} duration={600}>
          <div className="flex h-full flex-col rounded-3xl border border-soft-border/70 bg-surface p-7 shadow-soft">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
              <Sparkles className="h-5 w-5" />
            </span>
            <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
              {copy.prepareTitle}
            </h3>
            <ul className="mt-5 space-y-3">
              {copy.checklist.map((item) => {
                const Icon = getContentIcon(item.icon);
                return (
                  <li
                    key={item.text}
                    className="flex items-start gap-2.5 text-sm text-foreground/80"
                  >
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    {item.text}
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>

        {/* Connect card */}
        <Reveal variant="fade-up" delay={160} duration={600}>
          <div className="flex h-full flex-col rounded-3xl border border-soft-border/70 bg-surface p-7 shadow-soft">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
              <MessageCircle className="h-5 w-5" />
            </span>
            <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
              {copy.connectTitle}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {copy.connectDescription}
            </p>
            <div className="mt-5 space-y-2.5">
              <a
                href={settings.bootcampWhatsappUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[44px] w-full items-center justify-between rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-[#25D366]/20 transition-all duration-300 hover:bg-[#20BD5A]"
              >
                {copy.whatsappLabel}{" "}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={settings.bootcampInstagramUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[44px] w-full items-center justify-between rounded-full border border-soft-border/70 bg-foreground/5 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                {copy.instagramLabel} <Instagram className="h-3.5 w-3.5" />
              </a>
              <a
                href={settings.bootcampRegisterUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[44px] w-full items-center justify-between rounded-full bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-colors hover:bg-primary"
              >
                {copy.registerLabel}{" "}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
