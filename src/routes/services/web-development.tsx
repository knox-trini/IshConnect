import { PAGE_SEO } from "@/lib/seo";
import { ServiceTemplate } from "@/components/ServiceTemplate";

const config = PAGE_SEO.webDevelopment;

export function WebDevelopment() {
  return (
    <ServiceTemplate
      serviceKey="webDevelopment"
      config={config}
      title="Web Development in Kigali, Rwanda"
      description="IshConnect designs and develops modern websites, web applications, and e-commerce platforms. From corporate sites to complex portals, our team in Kigali delivers responsive, performant web solutions."
      features={[
        "Custom website development",
        "Single-page applications (SPA)",
        "E-commerce platforms",
        "Content management systems",
        "Progressive web apps (PWA)",
        "Website maintenance & support",
      ]}
      faqs={[
        {
          question: "What web technologies does IshConnect use?",
          answer:
            "We build with React, Next.js, TypeScript, Node.js, and Tailwind CSS for frontend, with PostgreSQL, MongoDB, and Firebase for backend and data.",
        },
        {
          question: "Do you offer e-commerce development?",
          answer:
            "Yes, we build custom e-commerce platforms and can integrate with Shopify, WooCommerce, and other leading platforms for businesses in Rwanda and across Africa.",
        },
        {
          question: "Can you redesign an existing website?",
          answer:
            "Absolutely. We audit your current site, improve performance and SEO, and redesign the UI/UX while preserving your content and search rankings.",
        },
      ]}
    />
  );
}
