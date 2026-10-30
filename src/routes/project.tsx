import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  CheckCircle2,
  Clock,
  Calendar,
  Users,
  Target,
  Lightbulb,
  Code2,
  Sparkles,
} from "lucide-react";

import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbJsonLd, CreativeWorkJsonLd, ProjectJsonLd } from "@/components/JsonLd";
import { FaqAccordion } from "@/components/FaqAccordion";
import { PROJECTS, type Project } from "@/lib/projects";
import { usePublicContent } from "@/hooks/usePublicContent";
import { useSiteContent } from "@/hooks/useSiteContent";

const easeInOut = [0.16, 1, 0.3, 1] as const;

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeInOut },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

function SectionBlock({
  icon,
  title,
  children,
}: {
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="rounded-2xl border border-soft-border/60 bg-surface p-6 shadow-soft sm:p-8"
    >
      {icon && (
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
      )}
      <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">{title}</h3>
      <div className="mt-4 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </motion.div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-soft-border/50 bg-surface px-4 py-3 text-center shadow-soft">
      <p className="font-display text-2xl font-bold tracking-tight text-foreground">{value}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function TimelineStep({
  phase,
  title,
  description,
  index,
}: {
  phase: string;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex gap-5"
    >
      <div className="flex flex-col items-center">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          {index + 1}
        </div>
        {index < 3 && <div className="mt-1 h-full w-0.5 bg-primary/20" />}
      </div>
      <div className="pb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">{phase}</p>
        <h4 className="mt-1 font-display text-base font-semibold text-foreground">{title}</h4>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.3, delay: i * 0.04 }}
          className="flex items-start gap-2.5"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span className="text-sm text-muted-foreground">{item}</span>
        </motion.li>
      ))}
    </ul>
  );
}

export function ProjectCaseStudy() {
  const { global } = useSiteContent();
  const copy = global.projectDetail;
  const { slug } = useParams<{ slug: string }>();
  const projects = usePublicContent<Project>("projects", PROJECTS);
  const project = slug ? projects.find((item) => item.slug === slug) : undefined;

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-md text-center">
          <SEOHead
            title={copy.notFoundMetaTitle}
            description={copy.notFoundMetaDescription}
            canonical="/work"
            noindex
          />
          <h1 className="text-6xl font-bold text-foreground">404</h1>
          <h2 className="mt-4 text-xl font-semibold text-foreground">{copy.notFoundTitle}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {copy.notFoundDescription.replace("{slug}", slug ?? "")}
          </p>
          <Link
            to="/work"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-all hover:opacity-90"
          >
            <ArrowLeft className="h-4 w-4" /> {copy.notFoundBack}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={project.seoTitle}
        description={project.seoDescription}
        canonical={`/work/${project.slug}`}
        ogType="article"
        keywords={project.seoKeywords}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Work", url: "/work" },
          { name: project.title, url: `/work/${project.slug}` },
        ]}
      />
      <CreativeWorkJsonLd project={project} />
      <ProjectJsonLd project={project} />

      <div className="pt-28">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden border-b border-soft-border/60 pb-12 sm:pb-16">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-30 blur-3xl`}
            />
          </div>

          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                to="/work"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> {copy.backToAll}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="mt-6 max-w-3xl"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-soft-border/60 bg-surface px-3 py-1 text-xs font-medium text-foreground/70">
                <Sparkles className="h-3 w-3 text-primary" />
                {project.category}
              </span>

              <h1 className="mt-4 font-display text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
                {project.title}
              </h1>

              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {project.heroSummary}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-soft-border/60 bg-surface px-2.5 py-1 text-xs font-medium text-foreground/70"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {project.repoUrl && /^https?:\/\/\S+$/i.test(project.repoUrl) ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-soft-border/60 bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <Github className="h-3.5 w-3.5" /> {copy.viewCode}
                  </a>
                ) : (
                  <span
                    aria-disabled="true"
                    title={copy.repoMissingTitle}
                    className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-full border border-soft-border/60 bg-surface px-4 py-2 text-sm font-medium text-muted-foreground/60"
                  >
                    <Github className="h-3.5 w-3.5" /> {copy.viewCode}
                  </span>
                )}
                {project.liveUrl && /^https?:\/\/\S+$/i.test(project.liveUrl) && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-soft-border/60 bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> {copy.viewLive}
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Stats Bar ── */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-6 py-10 sm:grid-cols-4 sm:gap-4"
        >
          {project.stats.map((s) => (
            <motion.div key={s.label} variants={sectionVariants}>
              <StatCard value={s.value} label={s.label} />
            </motion.div>
          ))}
        </motion.section>

        {/* ── Content Grid ── */}
        <div className="mx-auto max-w-6xl px-6 pb-20 sm:pb-28">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            {/* Problem */}
            <SectionBlock icon={<Target className="h-5 w-5" />} title={copy.problem}>
              <p>{project.problem}</p>
            </SectionBlock>

            {/* Solution */}
            <SectionBlock icon={<Lightbulb className="h-5 w-5" />} title={copy.solution}>
              <p>{project.solution}</p>
            </SectionBlock>

            {/* Client */}
            <SectionBlock icon={<Users className="h-5 w-5" />} title={copy.client}>
              <p>{project.client}</p>
            </SectionBlock>

            {/* Challenges */}
            <SectionBlock icon={<Code2 className="h-5 w-5" />} title={copy.challenges}>
              <p>{project.challenges}</p>
            </SectionBlock>
          </div>

          {/* Feature List */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-8 rounded-2xl border border-soft-border/60 bg-surface p-6 shadow-soft sm:p-8"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
              {copy.keyFeatures}
            </h3>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <FeatureList items={project.features} />
            </div>
          </motion.div>

          {/* UI Decisions & Workflow */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-8">
            <SectionBlock title={copy.uiDecisions}>
              <p>{project.uiDecisions}</p>
            </SectionBlock>
            <SectionBlock title={copy.workflow}>
              <p>{project.workflow}</p>
            </SectionBlock>
          </div>

          {/* Timeline */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-8 rounded-2xl border border-soft-border/60 bg-surface p-6 shadow-soft sm:p-8"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Calendar className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
              {copy.timeline}
            </h3>
            <div className="mt-6">
              {project.timeline.map((t, i) => (
                <TimelineStep key={t.phase} {...t} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Results & Impact */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-8">
            <SectionBlock icon={<Target className="h-5 w-5" />} title={copy.results}>
              <p>{project.results}</p>
            </SectionBlock>
            <SectionBlock icon={<Sparkles className="h-5 w-5" />} title={copy.impact}>
              <p>{project.impact}</p>
            </SectionBlock>
          </div>

          {/* FAQ Section */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-8"
          >
            <div className="mb-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                <Clock className="h-3 w-3" />
                {copy.faq}
              </span>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground">
                {copy.faqTitle}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {copy.faqDescriptionPrefix} {project.title}.
              </p>
            </div>
            <FaqAccordion items={project.faqs} />
          </motion.div>

          {/* Back link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link
              to="/work"
              className="inline-flex items-center gap-2 rounded-full border border-soft-border/60 bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" /> {copy.backToProjects}
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
