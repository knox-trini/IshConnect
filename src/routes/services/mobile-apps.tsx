import { PAGE_SEO } from "@/lib/seo";
import { ServiceTemplate } from "@/components/ServiceTemplate";

const config = PAGE_SEO.mobileApps;

export function MobileApps() {
  return (
    <ServiceTemplate
      config={config}
      title="Mobile App Development in Rwanda"
      description="IshConnect builds iOS and Android mobile applications using React Native and Flutter. Our Kigali-based developers create native-quality apps for startups, enterprises, and organizations across Africa."
      features={[
        "iOS app development",
        "Android app development",
        "Cross-platform apps (React Native)",
        "Cross-platform apps (Flutter)",
        "App UI/UX design",
        "App store deployment & maintenance",
      ]}
      faqs={[
        { question: "Which platform do you develop for — iOS, Android, or both?", answer: "We develop for both platforms simultaneously using React Native or Flutter, ensuring native performance and look-and-feel on iOS and Android from a single codebase." },
        { question: "How long does it take to build a mobile app?", answer: "A production-ready MVP typically takes 10-14 weeks. The timeline depends on complexity, third-party integrations, and platform-specific requirements." },
        { question: "Do you help with app store submission?", answer: "Yes, we handle the entire app store submission process for both Apple App Store and Google Play Store, including preparing assets, metadata, and compliance requirements." },
      ]}
    />
  );
}
