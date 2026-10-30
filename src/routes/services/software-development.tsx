import { PAGE_SEO } from "@/lib/seo";
import { ServiceTemplate } from "@/components/ServiceTemplate";

const config = PAGE_SEO.softwareDevelopment;

export function SoftwareDevelopment() {
  return (
    <ServiceTemplate
      config={config}
      title="Custom Software Development in Rwanda"
      description="IshConnect builds scalable web applications, enterprise platforms, and SaaS products for startups and businesses across Africa. Our Kigali-based engineering team delivers production-ready software using modern architectures."
      features={[
        "Web application development",
        "Enterprise software platforms",
        "SaaS product engineering",
        "API development & integration",
        "Legacy system modernization",
        "Cloud-native applications",
      ]}
      faqs={[
        { question: "What types of software does IshConnect develop?", answer: "We build web applications, enterprise platforms, SaaS products, RESTful APIs, and cloud-native applications using modern technologies like React, Node.js, Python, and Go." },
        { question: "How long does custom software development take?", answer: "Timelines vary by complexity. A typical MVP takes 8-12 weeks, while larger enterprise platforms take 3-6 months. We deliver iteratively with weekly demos." },
        { question: "Do you work with startups?", answer: "Yes, we specialize in working with startups and growing businesses across Africa. We offer flexible engagement models, including dedicated teams and project-based development." },
      ]}
    />
  );
}
