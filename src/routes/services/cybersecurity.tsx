import { PAGE_SEO } from "@/lib/seo";
import { ServiceTemplate } from "@/components/ServiceTemplate";

const config = PAGE_SEO.cybersecurity;

export function Cybersecurity() {
  return (
    <ServiceTemplate
      serviceKey="cybersecurity"
      config={config}
      title="Cybersecurity Services in Rwanda"
      description="IshConnect provides comprehensive cybersecurity services to protect your business. Our Kigali-based security team offers penetration testing, security audits, threat monitoring, and compliance solutions."
      features={[
        "Penetration testing",
        "Security audits & assessments",
        "Threat monitoring & response",
        "Compliance & governance",
        "Zero-trust architecture",
        "Security awareness training",
      ]}
      faqs={[
        {
          question: "How do you conduct a penetration test?",
          answer:
            "Our certified security engineers simulate real-world attacks against your systems, covering web apps, mobile apps, APIs, and network infrastructure, then deliver a detailed report with remediation guidance.",
        },
        {
          question: "Do you help with compliance requirements?",
          answer:
            "Yes, we help businesses achieve and maintain compliance with industry standards including ISO 27001, SOC 2, GDPR, and local data protection regulations in Rwanda.",
        },
        {
          question: "How often should we run a security audit?",
          answer:
            "We recommend quarterly vulnerability scans and annual comprehensive penetration tests. However, we advise an immediate audit after any major infrastructure or application change.",
        },
      ]}
    />
  );
}
