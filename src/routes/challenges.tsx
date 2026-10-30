import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Code2,
  ExternalLink,
  GraduationCap,
  Layers,
  Sparkles,
  Trophy,
} from "lucide-react";

import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { PAGE_SEO } from "@/lib/seo";
import { Section, SectionHeading } from "@/components/Section";
import { ChallengeForm } from "@/components/ChallengeForm";
import { ChallengeModal, type ChallengeDetail } from "@/components/ChallengeModal";

const config = PAGE_SEO.challenges;

type ChallengeLevel = "Beginner" | "Intermediate" | "Advanced";
type FilterKey = "all" | "beginner" | "intermediate" | "advanced" | "full-stack" | "ai-data" | "ui-ux";

interface Challenge extends ChallengeDetail {
  filter: FilterKey;
}

const CHALLENGES: Challenge[] = [
  {
    title: "7-Day Coding Challenge",
    level: "Beginner",
    description: "Build daily mini-projects and learn the fundamentals of web development from scratch.",
    skills: ["HTML", "CSS", "JavaScript"],
    duration: "7 days",
    filter: "beginner",
    whatYouBuild: "7 mini web projects including a personal portfolio page, interactive calculator, to-do list app, quiz game, countdown timer, image gallery, and a final capstone project.",
    keyFeatures: [
      "Daily project-based curriculum with progressive difficulty",
      "Live preview on browser — no setup required",
      "GitHub repository for each daily project",
      "Final capstone combining all skills learned",
    ],
    outcomes: [
      "HTML5 semantic structure and accessibility basics",
      "CSS Flexbox, Grid, and responsive design",
      "JavaScript DOM manipulation and event handling",
    ],
  },
  {
    title: "Landing Page Clone Challenge",
    level: "Beginner",
    description: "Clone real-world landing pages like Airbnb or Netflix to master layout and responsive design.",
    skills: ["HTML", "Tailwind", "React"],
    duration: "5 days",
    filter: "beginner",
    whatYouBuild: "A pixel-perfect clone of a real-world landing page (Airbnb or Netflix) with responsive layout, mobile navigation, hero sections, and interactive UI components.",
    keyFeatures: [
      "Fully responsive hero section with CTA buttons",
      "Mobile hamburger menu and smooth scroll navigation",
      "Feature grid sections with icons and hover effects",
      "Footer with multi-column layout and social links",
    ],
    outcomes: [
      "Tailwind CSS utility-first workflow mastery",
      "Responsive design patterns for all screen sizes",
      "React component composition and props",
    ],
  },
  {
    title: "UI Clone Challenge",
    level: "Intermediate",
    description: "Recreate complex app UIs (Instagram / Netflix) pixel-perfect with modern frontend tools.",
    skills: ["React", "Tailwind CSS"],
    duration: "1 week",
    filter: "ui-ux",
    whatYouBuild: "A fully functional UI clone of Instagram's feed page or Netflix's browse page with working tabs, modals, and responsive grid layouts.",
    keyFeatures: [
      "Component-based architecture with reusable UI primitives",
      "Tab switching and modal overlay interactions",
      "Responsive grid that adapts from mobile to desktop",
      "Dark mode theme toggle",
    ],
    outcomes: [
      "Advanced React component patterns and composition",
      "Pixel-perfect implementation from design references",
      "State management for UI interactions",
    ],
  },
  {
    title: "Dashboard UI Challenge",
    level: "Intermediate",
    description: "Build a fully responsive admin dashboard UI with charts, data tables, and interactive widgets.",
    skills: ["React", "Charts", "Responsive Design"],
    duration: "1 week",
    filter: "ui-ux",
    whatYouBuild: "A professional admin dashboard with interactive charts, sortable data tables, sidebar navigation, and live statistics widgets.",
    keyFeatures: [
      "Interactive line, bar, and pie charts with real mock data",
      "Sortable and filterable data table with pagination",
      "Collapsible sidebar with nested navigation items",
      "Statistics cards with animated counters",
    ],
    outcomes: [
      "Chart.js / Recharts integration for data visualization",
      "Complex responsive layout with sidebar + main area",
      "Data table patterns: sorting, filtering, pagination",
    ],
  },
  {
    title: "Mobile App UI Challenge",
    level: "Intermediate",
    description: "Design and build a mobile app interface using React Native with Expo for cross-platform experience.",
    skills: ["React Native", "Expo", "UI Components"],
    duration: "1 week",
    filter: "ui-ux",
    whatYouBuild: "A cross-platform mobile app UI with bottom tab navigation, list views, detail screens, and smooth touch interactions using React Native and Expo.",
    keyFeatures: [
      "Bottom tab navigator with 3-4 screen tabs",
      "FlatList with pull-to-refresh and infinite scroll",
      "Detail screen with shared element transitions",
      "Dark/Light theme support via context",
    ],
    outcomes: [
      "React Native fundamentals and Expo CLI workflow",
      "Cross-platform component patterns (iOS + Android)",
      "Mobile navigation with React Navigation",
    ],
  },
  {
    title: "Debugging Challenge",
    level: "Intermediate",
    description: "Fix broken production-like code and learn real-world debugging techniques used by professional engineers.",
    skills: ["JavaScript", "React"],
    duration: "3 days",
    filter: "intermediate",
    whatYouBuild: "A broken React application with 10+ hidden bugs across state management, rendering, API calls, and event handling that you must identify and fix.",
    keyFeatures: [
      "Console errors from undefined state and props",
      "Rendering bugs: infinite loops, stale closures, missing keys",
      "API call bugs: wrong endpoints, missing error handling",
      "Event handler bugs: incorrect binding, propagation issues",
    ],
    outcomes: [
      "Professional debugging workflows with DevTools",
      "React error boundary patterns and error recovery",
      "Systematic bug-hunting methodology",
    ],
  },
  {
    title: "Bug Fix Sprint",
    level: "Intermediate",
    description: "Debug and fix a broken React + Node.js project under time constraints, simulating a real sprint.",
    skills: ["Debugging", "Logic", "REST APIs"],
    duration: "3 days",
    filter: "intermediate",
    whatYouBuild: "A full-stack React + Node.js project with 15+ bugs across the frontend, backend API, and database layer that you'll diagnose and fix under sprint pressure.",
    keyFeatures: [
      "Backend bugs: wrong status codes, broken middleware, SQL errors",
      "Frontend bugs: incorrect data display, broken forms, auth issues",
      "Integration bugs: mismatched API contracts, CORS issues",
      "Database bugs: wrong queries, missing migrations",
    ],
    outcomes: [
      "Full-stack debugging from browser to database",
      "Reading and understanding production error traces",
      "Time-constrained problem-solving under sprint pressure",
    ],
  },
  {
    title: "REST API Challenge",
    level: "Intermediate",
    description: "Build a complete CRUD API for users and products with proper routing, validation, and error handling.",
    skills: ["Node.js", "Express", "MongoDB"],
    duration: "5 days",
    filter: "intermediate",
    whatYouBuild: "A production-ready REST API with full CRUD operations, input validation, authentication middleware, error handling, and API documentation.",
    keyFeatures: [
      "User CRUD: register, login, profile update, delete account",
      "Product CRUD: create, list, search, update, delete with pagination",
      "JWT authentication middleware and protected routes",
      "Input validation with express-validator and custom error responses",
    ],
    outcomes: [
      "RESTful API design principles and best practices",
      "MongoDB schema design with Mongoose ODM",
      "Express middleware patterns for auth, logging, and error handling",
    ],
  },
  {
    title: "Deploy Your App Challenge",
    level: "Intermediate",
    description: "Deploy a full-stack application online using modern cloud platforms and CI/CD pipelines.",
    skills: ["Vercel", "Render", "AWS Basics"],
    duration: "3 days",
    filter: "intermediate",
    whatYouBuild: "A full-stack application fully deployed to production with custom domain, HTTPS, CI/CD pipeline, and monitoring — ready for real users.",
    keyFeatures: [
      "Frontend deployed on Vercel with automatic CI/CD from GitHub",
      "Backend API deployed on Render or Railway with persistent DB",
      "Custom domain configuration with SSL certificate",
      "Environment variable management and production logging",
    ],
    outcomes: [
      "End-to-end deployment workflow from code to production",
      "CI/CD pipeline configuration with GitHub Actions",
      "Cloud platform basics: Vercel, Render, and AWS essentials",
    ],
  },
  {
    title: "Full-Stack Startup Challenge",
    level: "Advanced",
    description: "Build a SaaS MVP from scratch with authentication, payments, and a polished user interface.",
    skills: ["React", "Node", "MongoDB"],
    duration: "3 weeks",
    filter: "full-stack",
    whatYouBuild: "A complete SaaS MVP with user authentication, payment processing, a dashboard, and core business logic — ready to show investors.",
    keyFeatures: [
      "User auth: email/password + Google OAuth with session management",
      "Payment integration: Stripe subscription with pricing tiers",
      "Dashboard with usage analytics, billing history, and settings",
      "Admin panel for user management and revenue tracking",
    ],
    outcomes: [
      "Full-stack SaaS architecture from database to deployment",
      "Payment processing integration with Stripe",
      "Production-ready patterns: auth, security, error handling",
    ],
  },
  {
    title: "Startup Builder Challenge",
    level: "Advanced",
    description: "Build a complete SaaS MVP including frontend, backend, database, and a pitch deck for investors.",
    skills: ["Frontend", "Backend", "Pitch"],
    duration: "4 weeks",
    filter: "full-stack",
    whatYouBuild: "A complete startup MVP: functional web application + business model + investor pitch deck. Go from idea to investable product.",
    keyFeatures: [
      "Full-stack application with real business logic",
      "Revenue model implementation (subscription or pay-per-use)",
      "Investor pitch deck with market analysis and financials",
      "Live demo environment for investor review",
    ],
    outcomes: [
      "End-to-end product development from ideation to launch",
      "Business modeling and investor communication skills",
      "Technical architecture decisions for scaling startups",
    ],
  },
  {
    title: "Authentication System Challenge",
    level: "Advanced",
    description: "Implement a secure JWT-based login and registration system with role-based access control.",
    skills: ["Security", "Auth Flows", "JWT"],
    duration: "1 week",
    filter: "advanced",
    whatYouBuild: "A complete authentication system with JWT tokens, refresh tokens, email verification, password reset, and role-based access control (RBAC).",
    keyFeatures: [
      "JWT access + refresh token flow with secure HTTP-only cookies",
      "Email verification flow with verification links",
      "Password reset flow with time-limited tokens",
      "Role-based access control (admin, moderator, user)",
    ],
    outcomes: [
      "JWT authentication best practices and security patterns",
      "Secure session management and token rotation",
      "RBAC implementation patterns for multi-role systems",
    ],
  },
  {
    title: "System Design Mini Challenge",
    level: "Advanced",
    description: "Design a scalable chat application (WhatsApp-like) covering architecture, APIs, and data modeling.",
    skills: ["Architecture", "APIs", "Databases"],
    duration: "1 week",
    filter: "advanced",
    whatYouBuild: "A complete system design document and prototype for a scalable real-time chat application serving millions of users.",
    keyFeatures: [
      "High-level architecture: microservices vs monolith decision",
      "Database schema: users, messages, groups, attachments",
      "Real-time messaging with WebSockets and message queuing",
      "Scalability: horizontal scaling, caching, CDN strategy",
    ],
    outcomes: [
      "System design methodology for large-scale applications",
      "Data modeling for high-throughput real-time systems",
      "Trade-off analysis: consistency, availability, partition tolerance",
    ],
  },
  {
    title: "AI Chatbot Builder",
    level: "Advanced",
    description: "Build an intelligent chatbot using APIs or rule-based logic with natural language understanding.",
    skills: ["Python / JS", "APIs", "Logic"],
    duration: "2 weeks",
    filter: "ai-data",
    whatYouBuild: "An intelligent chatbot with natural language understanding that can handle customer inquiries, process intents, and maintain conversation context.",
    keyFeatures: [
      "Intent recognition with NLP (OpenAI API or custom rules)",
      "Multi-turn conversation with context memory",
      "API integration for real-time data lookups",
      "Chat UI with typing indicators and message history",
    ],
    outcomes: [
      "NLP and intent classification fundamentals",
      "Conversation flow design and state management",
      "API integration patterns for AI services",
    ],
  },
  {
    title: "Image Classifier Mini AI",
    level: "Advanced",
    description: "Train a simple machine learning model to classify images and integrate it into a web app.",
    skills: ["Python", "ML Basics", "TensorFlow"],
    duration: "2 weeks",
    filter: "ai-data",
    whatYouBuild: "A web application where users upload images and get real-time classification results from a trained machine learning model.",
    keyFeatures: [
      "ML model training with TensorFlow/Keras using a real dataset",
      "Model export and serving via REST API (Flask or FastAPI)",
      "Web UI with drag-and-drop image upload and results display",
      "Confidence scores and top-5 predictions visualization",
    ],
    outcomes: [
      "End-to-end ML pipeline: data prep, training, deployment",
      "Model serving patterns and REST API integration",
      "Image preprocessing and augmentation techniques",
    ],
  },
  {
    title: "AI Mini Project Challenge",
    level: "Advanced",
    description: "Build simple AI-powered tools using APIs and pre-trained models — sentiment analysis, summarization, and more.",
    skills: ["Python", "APIs", "AI Basics"],
    duration: "2 weeks",
    filter: "ai-data",
    whatYouBuild: "A collection of 3 AI-powered mini tools: sentiment analysis, text summarization, and content generation — all accessible via a clean web interface.",
    keyFeatures: [
      "Sentiment analyzer: classify text as positive/negative/neutral",
      "Text summarizer: generate concise summaries from long articles",
      "Content generator: AI-powered text completion and writing assistant",
      "Clean dashboard UI to test all AI tools side by side",
    ],
    outcomes: [
      "Working with pre-trained models and AI APIs (OpenAI, HuggingFace)",
      "Prompt engineering and LLM integration patterns",
      "Building user-friendly interfaces for AI-powered features",
    ],
  },
];

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All Challenges" },
  { key: "beginner", label: "Beginner" },
  { key: "intermediate", label: "Intermediate" },
  { key: "advanced", label: "Advanced" },
  { key: "full-stack", label: "Full-Stack" },
  { key: "ai-data", label: "AI / Data" },
  { key: "ui-ux", label: "UI / UX" },
];

const STATS = [
  { value: 4, suffix: "+", label: "Active Challenges" },
  { value: 200, suffix: "+", label: "Students Participating" },
  { value: 150, suffix: "+", label: "Projects Submitted" },
  { value: 68, suffix: "%", label: "Completion Rate" },
];

const STEPS = [
  { icon: Layers, title: "Choose a challenge", description: "Pick a challenge that matches your skill level and interests." },
  { icon: Code2, title: "Build your solution", description: "Develop locally or online using your preferred tools and stack." },
  { icon: ExternalLink, title: "Submit GitHub link", description: "Push your code to GitHub and submit the repository URL." },
  { icon: CheckCircle2, title: "Reviewed by IshConnect team", description: "Get constructive feedback from experienced engineers." },
  { icon: Trophy, title: "Earn certificate & recognition", description: "Receive a certificate and get featured on our platform." },
];

function Counter({ to, suffix, delay = 0 }: { to: number; suffix: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toString());

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, to, {
        duration: 1.2,
        delay,
        ease: [0.16, 1, 0.3, 1],
      });
      return controls.stop;
    }
  }, [inView, mv, to, delay]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

function LevelBadge({ level }: { level: ChallengeLevel }) {
  const styles: Record<ChallengeLevel, string> = {
    Beginner: "bg-primary/10 text-primary",
    Intermediate: "bg-foreground/5 text-foreground/80",
    Advanced: "bg-foreground text-background",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[level]}`}
    >
      {level}
    </span>
  );
}

function ChallengeCard({
  challenge,
  index,
  onViewDetails,
}: {
  challenge: Challenge;
  index: number;
  onViewDetails: (challenge: Challenge) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex flex-col rounded-3xl border border-soft-border/70 bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-semibold text-foreground">
          {challenge.title}
        </h3>
        <LevelBadge level={challenge.level} />
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {challenge.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {challenge.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-soft-border/70 px-2.5 py-1 text-xs text-foreground/70"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-soft-border/60 pt-4">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {challenge.duration}
        </span>

        <button
          onClick={() => onViewDetails(challenge)}
          className="inline-flex items-center gap-1 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background transition-all duration-300 hover:gap-1.5 magnetic-btn"
        >
          View Details
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </motion.div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 sm:pt-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -right-20 top-40 h-80 w-80 rounded-full bg-secondary/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-soft-border/70 bg-surface px-3 py-1.5 text-xs font-medium text-foreground/80 shadow-soft"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          IshConnect Academy · Coding Challenges
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="mt-6 font-display text-3xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-4xl md:text-5xl"
        >
          Real-World Coding{" "}
          <span className="relative inline-block">
            <span className="text-primary">Challenges</span>
            <svg
              className="absolute -bottom-2 left-0 h-2 w-full text-primary/40"
              viewBox="0 0 200 8"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M0 6 Q 50 0 100 4 T 200 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty"
        >
          Practice, build, and prove your skills through industry-level projects designed by
          IshConnect engineers in Kigali, Rwanda.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <a
            href="#challenges"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background magnetic-btn"
          >
            Start Challenge
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <Link
            to="/academy"
            className="inline-flex items-center gap-2 rounded-full border border-soft-border bg-surface px-5 py-3 text-sm font-medium text-foreground hover:border-primary hover:text-primary"
          >
            Explore Academy
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section
      className="mt-20 border-y border-soft-border/60 bg-surface-elevated"
      aria-label="Challenge program statistics"
    >
      <h2 className="sr-only">Challenge program impact by the numbers</h2>
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-6 py-16 sm:py-20 md:grid-cols-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <p className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              <Counter to={s.value} suffix={s.suffix} delay={i * 0.12} />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ChallengesSection({
  onViewDetails,
}: {
  onViewDetails: (challenge: Challenge) => void;
}) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const filtered =
    activeFilter === "all"
      ? CHALLENGES
      : CHALLENGES.filter((c) => c.filter === activeFilter);

  return (
    <Section id="challenges">
      <SectionHeading
        eyebrow="Challenge Library"
        title="Choose Your Challenge"
        description="Select a challenge that matches your current skill level and start building real projects for your portfolio."
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 flex flex-wrap gap-2"
      >
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
              activeFilter === f.key
                ? "bg-foreground text-background"
                : "border border-soft-border/60 bg-surface text-foreground/70 hover:border-primary hover:text-primary"
            }`}
          >
            {f.label}
          </button>
        ))}
      </motion.div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((challenge, i) => (
          <ChallengeCard key={challenge.title} challenge={challenge} index={i} onViewDetails={onViewDetails} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-sm text-muted-foreground">
          No challenges match this filter.
        </p>
      )}
    </Section>
  );
}

function HowItWorksSection() {
  return (
    <section className="border-y border-soft-border/60 bg-surface-elevated">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <SectionHeading
          align="center"
          eyebrow="How It Works"
          title="From Challenge to Career"
          description="A structured path to build real skills, get feedback, and earn recognition."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-5">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.55,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex flex-col items-center text-center"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <step.icon className="h-5 w-5" />
              </span>

              <span className="mt-4 flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                {i + 1}
              </span>

              <h3 className="mt-3 font-display text-base font-semibold text-foreground">
                {step.title}
              </h3>

              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {step.description}
              </p>

              {i < STEPS.length - 1 && (
                <div
                  aria-hidden
                  className="mt-4 hidden h-px w-full border-t border-dashed border-soft-border/60 md:block"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SubmissionSection({
  selectedChallenge,
}: {
  selectedChallenge: string;
}) {
  return (
    <Section id="submit">
      <SectionHeading
        align="center"
        eyebrow="Submit Your Work"
        title="Submit Your Project"
        description="Share your completed challenge and get feedback from the IshConnect engineering team."
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mt-10 max-w-xl"
      >
        <div className="rounded-3xl border border-soft-border/70 bg-surface p-6 shadow-soft sm:p-8">
          <ChallengeForm defaultChallenge={selectedChallenge} />
        </div>

      </motion.div>
    </Section>
  );
}

export function Challenges() {
  const [selectedChallenge, setSelectedChallenge] = useState("");
  const [modalChallenge, setModalChallenge] = useState<Challenge | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewDetails = useCallback((challenge: Challenge) => {
    setModalChallenge(challenge);
    setModalOpen(true);
  }, []);

  const handleStartBuilding = useCallback(() => {
    if (!modalChallenge) return;
    setSelectedChallenge(modalChallenge.title);
    setModalOpen(false);
    setTimeout(() => {
      const el = document.getElementById("submit");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 350);
  }, [modalChallenge]);

  return (
    <>
      <SEOHead {...config} />
      <BreadcrumbJsonLd items={config.breadcrumbs} />

      <div className="pt-6">
        <HeroSection />
        <StatsSection />
        <ChallengesSection onViewDetails={handleViewDetails} />
        <HowItWorksSection />
        <SubmissionSection selectedChallenge={selectedChallenge} />

        <ChallengeModal
          open={modalOpen}
          challenge={modalChallenge}
          onClose={() => setModalOpen(false)}
          onStart={handleStartBuilding}
        />

        {/* Footer note */}
        <section className="border-t border-soft-border/60 bg-background">
          <div className="mx-auto max-w-6xl px-6 py-12 text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-soft-border/70 bg-surface px-4 py-2 shadow-soft">
              <GraduationCap className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">
                This program is part of{" "}
                <Link to="/academy" className="font-medium text-foreground hover:text-primary">
                  IshConnect Academy
                </Link>{" "}
                by <span className="font-semibold text-foreground">ISHCONNLAB</span> — empowering
                African developers through real-world experience.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
