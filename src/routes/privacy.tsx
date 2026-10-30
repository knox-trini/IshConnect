import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, ChevronRight, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { PAGE_SEO } from "@/lib/seo";
import { cn } from "@/lib/utils";

const config = PAGE_SEO.privacy;

const SECTIONS = [
  { id: "introduction", title: "Introduction" },
  { id: "information-we-collect", title: "Information We Collect" },
  { id: "how-we-use-information", title: "How We Use Information" },
  { id: "cookies-analytics", title: "Cookies & Analytics" },
  { id: "data-protection", title: "Data Protection" },
  { id: "third-party-services", title: "Third-Party Services" },
  { id: "email-communications", title: "Email Communications" },
  { id: "user-rights", title: "User Rights" },
  { id: "data-retention", title: "Data Retention" },
  { id: "security-measures", title: "Security Measures" },
  { id: "childrens-privacy", title: "Children's Privacy" },
  { id: "policy-updates", title: "Policy Updates" },
  { id: "contact-information", title: "Contact Information" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

const CONTENT: Record<SectionId, { paragraphs: string[]; items?: string[] }> = {
  introduction: {
    paragraphs: [
      'IshConnect ("we," "our," or "us") is operated by ISHCONNLAB, a registered technology company in the Republic of Rwanda. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.',
      "By using this website, you agree to the collection and use of information in accordance with this policy. We are committed to protecting your privacy and ensuring transparency in our data practices. If you do not agree with the terms of this policy, please do not access or use our website or services.",
      "This policy applies to all information collected through our website, communication channels, and any related services offered by IshConnect and ISHCONNLAB.",
    ],
  },
  "information-we-collect": {
    paragraphs: [
      "We collect information that you voluntarily provide to us when you fill out forms, subscribe to our newsletter, enroll in our academy programs, request services, or contact us directly.",
    ],
    items: [
      "Personal identification information such as your name, email address, phone number, and professional details",
      "Educational and professional background when enrolling in our academy programs",
      "Project requirements and technical specifications when requesting services",
      "Communication preferences and feedback you share with us",
      "Information you provide when applying for positions or partnerships",
    ],
  },
  "how-we-use-information": {
    paragraphs: ["We use the information we collect for the following purposes:"],
    items: [
      "To operate, maintain, and improve our website and services",
      "To communicate with you about our programs, updates, events, and project inquiries",
      "To process enrollments, service requests, and customer support inquiries",
      "To personalize your experience and deliver relevant content",
      "To analyze usage patterns and improve our platform's performance",
      "To comply with legal obligations and enforce our terms of service",
    ],
  },
  "cookies-analytics": {
    paragraphs: [
      "IshConnect uses cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are small text files placed on your device that help us provide a better browsing experience.",
    ],
    items: [
      "Essential cookies required for the website to function properly",
      "Analytics cookies that help us understand how visitors interact with our platform",
      "Preference cookies that remember your settings and choices",
      "Marketing cookies used to deliver relevant content and measure campaign effectiveness",
    ],
  },
  "data-protection": {
    paragraphs: [
      "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.",
      "Your data is stored on secure servers with restricted access. We regularly review our data collection, storage, and processing practices to ensure compliance with applicable data protection laws, including the Data Protection and Privacy Act of Rwanda and international standards.",
      "Access to your personal data is limited to employees, contractors, and service providers who require it to perform their duties. These individuals are bound by strict confidentiality obligations.",
    ],
  },
  "third-party-services": {
    paragraphs: [
      "We may engage trusted third-party service providers to assist us in operating our website, processing communications, analyzing data, and delivering services.",
    ],
    items: [
      "Analytics providers that help us understand website usage and improve user experience",
      "Email service providers that facilitate our communications with you",
      "Cloud infrastructure providers that host our website and store data securely",
      "Payment processors for any financial transactions conducted through our platform",
    ],
  },
  "email-communications": {
    paragraphs: [
      "We may send you emails regarding our services, academy programs, project updates, and relevant industry content. We respect your inbox and strive to send only meaningful communications.",
      "You can unsubscribe from marketing communications at any time by clicking the unsubscribe link in the footer of our emails. Transactional emails related to your inquiries, enrollments, or service requests may still be sent after opting out of marketing.",
      "We do not share your email address with third parties for their own marketing purposes without your explicit consent.",
    ],
  },
  "user-rights": {
    paragraphs: ["You have the following rights regarding your personal information:"],
    items: [
      "The right to access your personal data and obtain a copy of the information we hold about you",
      "The right to correct inaccurate or incomplete personal data",
      "The right to request deletion of your personal data, subject to legal retention requirements",
      "The right to restrict or object to certain processing of your data",
      "The right to data portability in a structured, commonly used format",
      "The right to withdraw consent at any time where processing is based on consent",
    ],
  },
  "data-retention": {
    paragraphs: [
      "We retain your personal information only for as long as necessary to fulfill the purposes described in this Privacy Policy, or as required by applicable law.",
      "When data is no longer needed, we securely delete, anonymize, or destroy it using industry-standard methods. Retention periods vary depending on the type of data, the nature of our relationship with you, and legal requirements.",
      "If you request deletion of your data, we will honor your request within a reasonable timeframe, unless we are required to retain certain information for legal, auditing, or security purposes.",
    ],
  },
  "security-measures": {
    paragraphs: [
      "We employ industry-standard security measures to protect your personal information:",
    ],
    items: [
      "SSL/TLS encryption for all data transmitted between your browser and our servers",
      "Firewalls and intrusion detection systems to prevent unauthorized access",
      "Regular security audits and vulnerability assessments",
      "Strict access controls and authentication requirements for our team",
      "Secure data backup and disaster recovery procedures",
    ],
  },
  "childrens-privacy": {
    paragraphs: [
      "Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal data without parental consent, we will take steps to delete such information promptly.",
      "If you believe a child has provided us with their personal information, please contact us immediately at ishconnlab@gmail.com so that we can take appropriate action.",
    ],
  },
  "policy-updates": {
    paragraphs: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or operational needs.",
      'We will notify you of material changes by posting the updated policy on this page with a revised "Last Updated" date. In some cases, we may provide additional notice via email or a prominent notice on our website.',
      "We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information. Your continued use of our website after changes are posted constitutes your acceptance of the updated policy.",
    ],
  },
  "contact-information": {
    paragraphs: [
      "If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us. We value your privacy and will address your inquiries promptly.",
    ],
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function useActiveSection(sectionIds: readonly string[]): string {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}

function PolicySection({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="scroll-mt-28"
    >
      <div className="rounded-2xl border border-soft-border/50 bg-surface p-8 shadow-soft transition-shadow duration-300 hover:shadow-elevated sm:p-10">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
            {String(index + 1).padStart(2, "0")}
          </span>
          Section
        </span>
        <h2 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {children}
        </div>
      </div>
    </motion.section>
  );
}

export function Privacy() {
  const activeSection = useActiveSection(SECTIONS.map((s) => s.id));

  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <>
      <SEOHead {...config} />
      <BreadcrumbJsonLd items={config.breadcrumbs} />

      <div className="pt-28">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF7ED] via-surface to-background pb-16 sm:pb-20">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[#F97316]/10 to-[#FB923C]/5 blur-3xl" />
            <div className="absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-[#FB923C]/8 to-[#FFF7ED]/20 blur-3xl" />
            <div className="absolute left-1/2 top-1/2 h-[300px] w-[800px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#F97316]/5 to-transparent blur-2xl" />
          </div>

          <div className="relative mx-auto max-w-4xl px-6 pt-16 text-center sm:pt-24">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex flex-wrap items-center justify-center gap-3"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-soft-border/60 bg-surface px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Last Updated: April 15, 2026
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-soft-border/60 bg-surface px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
                <Shield className="h-3 w-3 text-primary" />
                Operated by ISHCONNLAB
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-display text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
            >
              Privacy{" "}
              <span className="bg-gradient-to-r from-[#F97316] to-[#FB923C] bg-clip-text text-transparent">
                Policy
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Your privacy matters to us. This policy explains how IshConnect and ISHCONNLAB
              collect, use, and protect your information.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground"
            >
              <span className="rounded-full bg-[#FFF7ED] px-3 py-1 text-xs font-medium text-[#F97316]">
                Registered in Rwanda
              </span>
              <span className="text-muted-foreground/40">·</span>
              <span className="text-xs italic">
                By using this website, you agree to this Privacy Policy.
              </span>
            </motion.div>
          </div>

          {/* Section divider */}
          <div className="relative mt-12 sm:mt-16">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-soft-border to-transparent" />
          </div>
        </section>

        {/* ── Main Content ── */}
        <div className="mx-auto max-w-6xl px-6 pb-20 sm:pb-28">
          <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-14">
            {/* Table of Contents */}
            <aside className="relative">
              <div className="lg:sticky lg:top-32 lg:max-h-[calc(100vh-10rem)] lg:overflow-y-auto">
                <motion.nav
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  aria-label="Table of contents"
                  className="mb-10 rounded-2xl border border-soft-border/40 bg-surface p-5 shadow-soft lg:mb-0"
                >
                  <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    On this page
                  </h2>
                  <ul className="space-y-1">
                    {SECTIONS.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          onClick={(e) => handleTocClick(e, section.id)}
                          className={cn(
                            "group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-200",
                            activeSection === section.id
                              ? "bg-primary/10 font-medium text-primary"
                              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                          )}
                        >
                          <ChevronRight
                            className={cn(
                              "h-3 w-3 shrink-0 transition-all duration-200",
                              activeSection === section.id
                                ? "translate-x-0 opacity-100"
                                : "-translate-x-0.5 opacity-0 group-hover:translate-x-0 group-hover:opacity-50",
                            )}
                          />
                          <span>{section.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.nav>
              </div>
            </aside>

            {/* Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-16"
            >
              {SECTIONS.map((section, i) => (
                <PolicySection key={section.id} id={section.id} index={i} title={section.title}>
                  {CONTENT[section.id].paragraphs.map((p, pi) => (
                    <p key={pi}>{p}</p>
                  ))}
                  {CONTENT[section.id].items && (
                    <ul className="space-y-2">
                      {CONTENT[section.id].items!.map((item, ii) => (
                        <li key={ii} className="flex items-start gap-3">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.id === "contact-information" && (
                    <div className="mt-6 grid gap-4 rounded-xl bg-[#FFF7ED] p-5 sm:grid-cols-2 sm:p-6">
                      <a
                        href="mailto:ishconnlab@gmail.com"
                        className="group flex items-center gap-3 rounded-lg bg-surface p-4 text-sm transition-all duration-200 hover:shadow-soft"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                          <Mail className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Email</p>
                          <p className="font-medium text-foreground group-hover:text-primary">
                            ishconnlab@gmail.com
                          </p>
                        </div>
                      </a>
                      <div className="flex items-center gap-3 rounded-lg bg-surface p-4 text-sm">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                          <MapPin className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Location</p>
                          <p className="font-medium text-foreground">Kigali, Rwanda</p>
                        </div>
                      </div>
                    </div>
                  )}
                </PolicySection>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Footer Note ── */}
        <section className="border-t border-soft-border/60 bg-surface-elevated">
          <div className="mx-auto max-w-6xl px-6 py-10 text-center sm:py-12">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto max-w-xl"
            >
              <Shield className="mx-auto h-6 w-6 text-primary/60" />
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                Privacy Notice
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                © 2026 IshConnect &middot; Operated by{" "}
                <span className="font-semibold text-foreground">ISHCONNLAB</span> &middot;
                Registered in Rwanda
              </p>
              <p className="mt-1 text-xs text-muted-foreground/60">
                By using this website, you agree to this Privacy Policy.
              </p>
              <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground/50">
                <Link to="/" className="transition-colors hover:text-primary">
                  Home
                </Link>
                <span>&middot;</span>
                <Link to="/contact" className="transition-colors hover:text-primary">
                  Contact
                </Link>
                <span>&middot;</span>
                <span>Kigali, Rwanda</span>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
