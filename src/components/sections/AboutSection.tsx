import { Section, SectionHeading } from "../Section";
import { Reveal } from "../Reveal";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { DEFAULT_SETTINGS, type TimelineItem } from "@/lib/site-settings";

export function AboutSection() {
  const settings = useSiteSettings();
  const timeline = settings.timeline?.length
    ? settings.timeline
    : (DEFAULT_SETTINGS.timeline as TimelineItem[]);
  return (
    <Section id="about">
      <SectionHeading
        eyebrow="About"
        title={
          <>
            {settings.aboutTitle || "Building Africa's"}{" "}
            <span className="text-primary">{settings.aboutHighlight || "digital future."}</span>
          </>
        }
        description={
          settings.aboutDescription ||
          "IshConnect is a technology studio focused on software engineering, innovation, and empowering African tech talent."
        }
      />

      {/* TREE TIMELINE */}
      <div className="mt-24">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Journey</p>
          <h3 className="mt-2 text-3xl font-semibold tracking-tight">
            Our growth tree — IshConnect timeline
          </h3>
          <p className="mt-3 max-w-2xl text-sm text-gray-600">
            A structured evolution map showing how <strong>IshConnect</strong> grew from a
            passion-driven technology initiative in Kigali, Rwanda into a leading software
            development and AI company.
          </p>
        </div>

        {/* TREE CONTAINER */}
        <div className="relative">
          {/* TRUNK */}
          <div className="absolute left-4 sm:left-1/2 top-0 h-full w-0.5 bg-gray-200 sm:-translate-x-px" />

          <div className="space-y-14">
            {timeline.map((t, i) => {
              const isLeft = i % 2 === 0;
              return (
                <Reveal key={t.title} variant="fade-up" delay={i * 50} duration={500}>
                  <div className="relative flex flex-col sm:flex-row sm:items-center">
                    {/* BRANCH DOT */}
                    <div className="absolute left-4 sm:left-1/2 top-6 -translate-x-1/2 z-10">
                      <div className="h-3.5 w-3.5 rounded-full bg-primary shadow-sm" />
                    </div>

                    {/* Content - left side on desktop for even items */}
                    <div
                      className={`ml-12 sm:ml-0 sm:w-[45%] ${isLeft ? "sm:mr-auto sm:pr-8" : "sm:ml-auto sm:pl-8"}`}
                    >
                      <CardContent t={t} />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}

function CardContent({ t }: { t: TimelineItem }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
        {t.year}
      </span>
      <h4 className="mt-3 text-lg font-semibold text-gray-900">{t.title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{t.text}</p>
    </div>
  );
}
