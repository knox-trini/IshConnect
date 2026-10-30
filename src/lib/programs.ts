export type CourseSlug = string;

export interface Program {
  slug: CourseSlug;
  title: string;
  duration: string;
  summary: string;
  tags: string[];
  applyUrl?: string;
  applicationEnabled?: boolean;
}

export const PROGRAMS: Program[] = [
  {
    slug: "full-stack",
    title: "Full Stack Engineering",
    duration: "16 weeks",
    summary:
      "Become a production-ready engineer building end-to-end web products with modern tooling.",
    tags: ["React", "Node", "PostgreSQL", "TypeScript"],
  },
  {
    slug: "python",
    title: "Python Programming",
    duration: "10 weeks",
    summary: "From fundamentals to data, automation and APIs — hands-on, project-driven.",
    tags: ["Python", "Pandas", "FastAPI", "Automation"],
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    duration: "12 weeks",
    summary: "Defend systems with hands-on labs in offensive & defensive security.",
    tags: ["Networks", "OWASP", "Pentesting", "Blue Team"],
  },
  {
    slug: "mobile",
    title: "Mobile Development",
    duration: "12 weeks",
    summary: "Ship beautiful native-quality apps for iOS and Android using React Native.",
    tags: ["React Native", "Expo", "Animations", "Stores"],
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    duration: "10 weeks",
    summary: "Design resilient cloud systems and automate the path from commit to production.",
    tags: ["AWS", "Docker", "K8s", "CI/CD"],
  },
  {
    slug: "ui-ux",
    title: "UI / UX Design",
    duration: "8 weeks",
    summary: "Research, prototype and ship interfaces users love — taught by working designers.",
    tags: ["Figma", "Research", "Systems", "Motion"],
  },
];
