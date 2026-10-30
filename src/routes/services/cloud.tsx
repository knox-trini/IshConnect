import { PAGE_SEO } from "@/lib/seo";
import { ServiceTemplate } from "@/components/ServiceTemplate";

const config = PAGE_SEO.cloudServices;

export function CloudServices() {
  return (
    <ServiceTemplate
      config={config}
      title="Cloud Services in Rwanda"
      description="IshConnect offers cloud infrastructure and DevOps services to help businesses scale. From cloud migration to serverless architecture, our Kigali team ensures reliable and cost-effective cloud operations."
      features={[
        "Cloud migration & strategy",
        "Serverless architecture",
        "CI/CD pipeline setup",
        "Infrastructure as code",
        "Cloud cost optimization",
        "Managed cloud services",
      ]}
      faqs={[
        { question: "Which cloud providers do you work with?", answer: "We work with AWS, Google Cloud Platform (GCP), Microsoft Azure, and DigitalOcean. We recommend the best provider based on your workload, budget, and geographic requirements." },
        { question: "How do you handle cloud migration?", answer: "We follow a phased approach: assessment and planning, proof of concept, data migration, application migration, and optimization. We minimize downtime with a detailed rollback plan." },
        { question: "Can you reduce our cloud costs?", answer: "Yes. We conduct a thorough cost analysis, right-size resources, implement auto-scaling, use reserved instances, and remove unused assets — typically reducing costs by 20-40%." },
      ]}
    />
  );
}
