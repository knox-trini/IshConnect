import ingabirePeaceImg from "@/assets/testimonials/Ingabire Peace.jpg";
import munyanezaCelestinImg from "@/assets/testimonials/Munyaneza_Celestin.png";
import yazzidImg from "@/assets/testimonials/yazzid.png";
import tresorImg from "@/assets/testimonials/Tresor.jpeg";
import iradukundaFilsImg from "@/assets/testimonials/Iradukunda_Fils.jpg";
import hirwaAuroreImg from "@/assets/testimonials/Hirwa_Aurore.png";

export type TestimonialCategory = "founder" | "educator" | "student";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  org: string;
  orgUrl?: string;
  category: TestimonialCategory;
  categoryLabel: string;
  image: string;
  initials: string;
  location: string;
  quote: string;
  highlights: string[];
  verified: string;
}

export const CATEGORY_ORDER: Record<TestimonialCategory, number> = {
  founder: 0,
  educator: 1,
  student: 2,
};

export const CATEGORY_LABELS: Record<TestimonialCategory, string> = {
  founder: "Founders & CEOs",
  educator: "Teachers & Educators",
  student: "Students & Learners",
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "tresor-velamin",
    name: "Tresor",
    role: "Founder",
    org: "Velamin AI",
    orgUrl: "https://www.velamini.com/",
    category: "founder",
    categoryLabel: "Founders & CEOs",
    image: tresorImg,
    initials: "TR",
    location: "Kigali, Rwanda",
    quote:
      "IshConnect turned our AI vision into a product our customers actually use every day. Their engineers think like partners — they understood our market, challenged our assumptions, and shipped with the speed of a startup and the rigour of an enterprise team.",
    highlights: ["AI platform shipped in 10 weeks", "Hands-on engineering partnership"],
    verified: "Founder, Velamin AI",
  },
  {
    id: "iradukunda-fils-dropin",
    name: "Iradukunda Fils",
    role: "CEO",
    org: "DropIn",
    orgUrl: "https://dropin.rw/",
    category: "founder",
    categoryLabel: "Founders & CEOs",
    image: iradukundaFilsImg,
    initials: "IF",
    location: "Kigali, Rwanda",
    quote:
      "From the first workshop to launch, IshConnect treated DropIn as their own product. They translated our business rules into a clean, reliable platform and kept us informed at every step. We scaled our operations in Rwanda without worrying about the software once.",
    highlights: ["Launched on schedule with zero critical bugs", "Clear communication at every milestone"],
    verified: "CEO, DropIn",
  },
  {
    id: "hirwa-aurore-edtech",
    name: "Hirwa Aurore",
    role: "CEO",
    org: "EdTech Solutions",
    orgUrl: "https://www.edtechsolutions.rw/",
    category: "founder",
    categoryLabel: "Founders & CEOs",
    image: hirwaAuroreImg,
    initials: "HA",
    location: "Kigali, Rwanda",
    quote:
      "IshConnect builds with intention. They listened to our educators, designed for our learners, and delivered a platform that has transformed how schools in Rwanda access digital learning. The team's commitment to local context is what sets them apart.",
    highlights: ["Platform adopted by schools across Rwanda", "Deep understanding of education needs"],
    verified: "CEO, EdTech Solutions",
  },
  {
    id: "munyaneza-celestin-kiyumba",
    name: "Munyaneza Celestin",
    role: "Teacher",
    org: "Kiyumba TSS",
    category: "educator",
    categoryLabel: "Teachers & Educators",
    image: munyanezaCelestinImg,
    initials: "MC",
    location: "Rwanda",
    quote:
      "As a teacher, I look for skills that give my students a real future. IshConnect's training gave my learners the confidence to build and the discipline to keep improving. The practical, project-first approach is exactly what technical education in Rwanda needs.",
    highlights: ["Students gained practical coding skills", "Project-first learning methodology"],
    verified: "Teacher, Kiyumba TSS",
  },
  {
    id: "ingabire-peace-rca",
    name: "Ingabire Peace",
    role: "Student",
    org: "Rwanda Coding Academy",
    category: "student",
    categoryLabel: "Students & Learners",
    image: ingabirePeaceImg,
    initials: "IP",
    location: "Rwanda",
    quote:
      "IshConnect showed me that I can build things that matter. The mentorship, the real projects, and the people who believed in me turned what felt impossible into my everyday reality. I now mentor younger students the way they mentored me.",
    highlights: ["From first lines of code to real projects", "Now mentoring younger learners"],
    verified: "Student, Rwanda Coding Academy",
  },
  {
    id: "yazzid-kass",
    name: "Yazzid",
    role: "Student",
    org: "KASS",
    category: "student",
    categoryLabel: "Students & Learners",
    image: yazzidImg,
    initials: "YZ",
    location: "Rwanda",
    quote:
      "The IshConnect team doesn't just teach — they open doors. I arrived curious and left with a portfolio, a community, and a clear path into tech. Every challenge they gave me pushed me further than I thought I could go.",
    highlights: ["Built a portfolio before finishing school", "Gained a supportive tech community"],
    verified: "Student, KASS",
  },
];

export function getSortedTestimonials(): Testimonial[] {
  return [...TESTIMONIALS].sort(
    (a, b) =>
      CATEGORY_ORDER[a.category] - CATEGORY_ORDER[b.category] ||
      a.name.localeCompare(b.name),
  );
}

export function getTestimonialGroups(): {
  category: TestimonialCategory;
  label: string;
  items: Testimonial[];
}[] {
  return Object.keys(CATEGORY_ORDER)
    .map((key) => key as TestimonialCategory)
    .map((category) => ({
      category,
      label: CATEGORY_LABELS[category],
      items: TESTIMONIALS.filter((t) => t.category === category),
    }))
    .filter((g) => g.items.length > 0);
}
