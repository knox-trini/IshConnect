import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/JsonLd";
import { PAGE_SEO } from "@/lib/seo";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { Reveal } from "@/components/Reveal";

const config = PAGE_SEO.testimonials;

const faqQuestions = [
  {
    question: "Who has worked with IshConnect?",
    answer:
      "IshConnect works with founders and CEOs of Rwandan startups like Velamin AI, DropIn, and EdTech Solutions, as well as educators and students at institutions including Rwanda Coding Academy, Kiyumba TSS, and KASS.",
  },
  {
    question: "What do IshConnect clients say?",
    answer:
      "Founders highlight on-time delivery, clean engineering, and a true partnership approach. Educators and students praise IshConnect's practical, project-first training and mentorship that turns learners into builders.",
  },
  {
    question: "How can I share my experience with IshConnect?",
    answer:
      "We love hearing from our community. Reach out through the contact page and share your story — whether you are a founder, a teacher, or a student we have worked with.",
  },
];

export function Testimonials() {
  return (
    <>
      <SEOHead {...config} />
      <BreadcrumbJsonLd items={config.breadcrumbs} />
      <FaqJsonLd questions={faqQuestions} />
      <div className="pt-28 sm:pt-32">
        <TestimonialsSection />
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <Reveal variant="fade-up" duration={600}>
            <div className="rounded-3xl border border-soft-border/70 bg-surface p-8 sm:p-12 shadow-soft text-center">
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                Ready to write your own IshConnect story?
              </h2>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background magnetic-btn"
                >
                  Start a Project
                </Link>
                <Link
                  to="/academy"
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-soft-border bg-white/70 px-5 py-2.5 text-sm font-medium text-foreground hover:border-primary hover:text-primary"
                >
                  Join the Academy
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
}
