import { PAGE_SEO } from "@/lib/seo";
import { ServiceTemplate } from "@/components/ServiceTemplate";

const config = PAGE_SEO.techTraining;

export function TechTraining() {
  return (
    <ServiceTemplate
      serviceKey="techTraining"
      config={config}
      title="Tech Training & Coding Bootcamps in Rwanda"
      description="IshConnect Academy offers industry-led tech training programs and coding bootcamps in Kigali, Rwanda. Learn full stack development, AI, cybersecurity, cloud computing, and UI/UX design from experienced engineers."
      features={[
        "Full stack web development",
        "Python & AI programming",
        "Cybersecurity fundamentals",
        "Cloud & DevOps training",
        "Mobile app development",
        "UI/UX design bootcamp",
      ]}
      faqs={[
        {
          question: "Who can enroll in IshConnect Academy programs?",
          answer:
            "Our programs are open to beginners and experienced developers alike. We offer tracks for absolute beginners, intermediate learners, and advanced engineers looking to upskill.",
        },
        {
          question: "Are the bootcamps online or in-person?",
          answer:
            "We offer both options. Our bootcamps are available in-person at our Kigali facility and online with live instruction, recorded sessions, and hands-on projects.",
        },
        {
          question: "Do you provide certificates upon completion?",
          answer:
            "Yes, graduates receive a certificate of completion. Our programs also include portfolio-building projects that demonstrate your skills to employers.",
        },
      ]}
    />
  );
}
