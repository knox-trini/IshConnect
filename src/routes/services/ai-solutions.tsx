import { PAGE_SEO } from "@/lib/seo";
import { ServiceTemplate } from "@/components/ServiceTemplate";

const config = PAGE_SEO.aiSolutions;

export function AiSolutions() {
  return (
    <ServiceTemplate
      serviceKey="aiSolutions"
      config={config}
      title="AI Solutions in Rwanda"
      description="IshConnect delivers artificial intelligence and machine learning solutions for African businesses. Our Kigali team builds intelligent automation, predictive analytics, NLP, and computer vision systems."
      features={[
        "Machine learning model development",
        "Natural language processing (NLP)",
        "Computer vision solutions",
        "Predictive analytics",
        "Intelligent process automation",
        "AI consulting & strategy",
      ]}
      faqs={[
        {
          question: "Do you build custom AI models or use pre-trained ones?",
          answer:
            "Both. We fine-tune pre-trained models for rapid deployment and build custom models from scratch when unique business problems require specialized solutions.",
        },
        {
          question: "What AI technologies do you specialize in?",
          answer:
            "We work with TensorFlow, PyTorch, Hugging Face, OpenAI APIs, and LangChain for NLP, computer vision, predictive analytics, and intelligent automation.",
        },
        {
          question: "How do you handle training data and privacy?",
          answer:
            "We follow strict data governance practices. Training data is encrypted, anonymized where possible, and stored on secure infrastructure compliant with relevant regulations.",
        },
      ]}
    />
  );
}
