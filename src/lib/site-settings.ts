export interface SocialLink {
  platform: string;
  label: string;
  url: string;
  enabled?: boolean;
}

export interface ApplicationLink {
  key: string;
  label: string;
  url: string;
  enabled?: boolean;
  openInNewTab?: boolean;
}

export interface FooterLink {
  label: string;
  url: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface SiteStat {
  value: number;
  suffix: string;
  label: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  text: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SiteSettings {
  slug?: string;
  footerDescription?: string;
  copyrightText?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
  socialLinks?: SocialLink[];
  footerLinks?: FooterLinkGroup[];
  applicationLinks?: ApplicationLink[];
  heroBadge?: string;
  heroTitle?: string;
  heroHighlight?: string;
  heroDescription?: string;
  heroPrimaryLabel?: string;
  heroPrimaryUrl?: string;
  heroSecondaryLabel?: string;
  heroSecondaryUrl?: string;
  aboutTitle?: string;
  aboutHighlight?: string;
  aboutDescription?: string;
  aboutPageTitle?: string;
  aboutPageDescription?: string;
  missionTitle?: string;
  missionDescription?: string;
  missionDescriptionSecondary?: string;
  bootcampTitle?: string;
  bootcampHighlight?: string;
  bootcampDescription?: string;
  bootcampKickoffText?: string;
  bootcampStartDate?: string;
  bootcampFormat?: string;
  bootcampRegisterUrl?: string;
  bootcampWhatsappUrl?: string;
  bootcampInstagramUrl?: string;
  stats?: SiteStat[];
  timeline?: TimelineItem[];
  faqs?: FaqItem[];
}

export const DEFAULT_FOOTER_LINKS: FooterLinkGroup[] = [
  {
    title: "Company",
    links: [
      { label: "Home", url: "/" },
      { label: "About", url: "/about" },
      { label: "Founder", url: "/founder" },
      { label: "Team", url: "/team" },
      { label: "Work", url: "/work" },
      { label: "Contact", url: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Services Overview", url: "/solutions" },
      { label: "Software Development", url: "/software-development-rwanda" },
      { label: "Web Development", url: "/web-development-kigali" },
      { label: "Mobile App Development", url: "/mobile-app-development-rwanda" },
      { label: "AI Solutions", url: "/ai-solutions-rwanda" },
      { label: "Cloud Infrastructure", url: "/cloud-services-rwanda" },
      { label: "Cybersecurity", url: "/cybersecurity-rwanda" },
    ],
  },
  {
    title: "Ecosystem",
    links: [
      { label: "Academy", url: "/academy" },
      { label: "WebCare", url: "/webcare" },
      { label: "Community", url: "/community" },
      { label: "DevQueens", url: "/devqueens" },
      { label: "Challenges", url: "/challenges" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Privacy Policy", url: "/privacy" },
      { label: "Start a Project", url: "/contact" },
    ],
  },
];

export const DEFAULT_SETTINGS: SiteSettings = {
  slug: "global",
  footerDescription:
    "IshConnect is a software development and AI innovation studio based in Kigali, Rwanda. We build web applications, mobile platforms, AI systems, and technology education programs that empower businesses and future tech talent across Africa.",
  copyrightText: "IshConnect. Operated by ISHCONNLAB.",
  contactEmail: "ishconnlab@gmail.com",
  contactPhone: "+250 787 377 750",
  contactAddress: "KG 11 Ave, Kigali, Rwanda",
  socialLinks: [
    { platform: "x", label: "Twitter / X", url: "https://x.com/IConnlab", enabled: true },
    {
      platform: "linkedin",
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/ishconnlab",
      enabled: true,
    },
    { platform: "github", label: "GitHub", url: "https://github.com/ishconnlab", enabled: true },
    {
      platform: "instagram",
      label: "Instagram",
      url: "https://www.instagram.com/ish.connect",
      enabled: true,
    },
  ],
  footerLinks: DEFAULT_FOOTER_LINKS,
  applicationLinks: [
    {
      key: "start-project",
      label: "Start a Project",
      url: "/contact",
      enabled: true,
      openInNewTab: false,
    },
    { key: "community", label: "Community", url: "/community", enabled: true, openInNewTab: false },
    {
      key: "explore-work",
      label: "Explore Our Work",
      url: "/work",
      enabled: true,
      openInNewTab: false,
    },
    {
      key: "bootcamp-register",
      label: "Register for Bootcamp",
      url: "https://tally.so/r/Pd4IRQ",
      enabled: true,
      openInNewTab: true,
    },
  ],
  heroBadge: "African future-tech · est. 2020",
  heroTitle: "Software Development Company in",
  heroHighlight: "Rwanda & Africa",
  heroDescription:
    "We build web apps, mobile platforms, and AI systems for startups and enterprises across Africa from Kigali.",
  heroPrimaryLabel: "Start a Project",
  heroPrimaryUrl: "/contact",
  heroSecondaryLabel: "Explore Our Work",
  heroSecondaryUrl: "/work",
  aboutTitle: "Building Africa's",
  aboutHighlight: "digital future.",
  aboutDescription:
    "IshConnect is a technology studio focused on software engineering, innovation, and empowering African tech talent.",
  aboutPageTitle: "Building Africa's",
  aboutPageDescription:
    "IshConnect is a Kigali-based technology studio focused on software engineering, AI systems, and tech education. We build digital products that drive economic growth across Africa.",
  missionTitle: "What we do — and who we serve.",
  missionDescription:
    "Founded in 2020, IshConnect delivers world-class software development, AI solutions, and technology training to startups, enterprises, and government organizations across Rwanda and the African continent.",
  missionDescriptionSecondary:
    "Through our Academy, we train the next generation of African engineers. Our WebCare service keeps digital products running smoothly, and our DevQueens initiative empowers women in technology.",
  bootcampTitle: "IshConnect Summer",
  bootcampHighlight: "Coding & AI Bootcamp",
  bootcampDescription:
    "Starts soon — 100% online. Build real projects, learn from live instructors, and code together with the IshConnect community.",
  bootcampKickoffText: "The IshConnect Summer Coding & AI Bootcamp 2026 starts in 3 days.",
  bootcampStartDate: "28 July 2026",
  bootcampFormat: "100% Online",
  bootcampRegisterUrl: "https://tally.so/r/Pd4IRQ",
  bootcampWhatsappUrl: "https://chat.whatsapp.com/Kg6jU7XWt3JFiMnztbjK1Y?s=cl&p=a&ilr=1",
  bootcampInstagramUrl: "https://www.instagram.com/ish.connect/",
  stats: [
    { value: 500, suffix: "+", label: "Students Empowered" },
    { value: 50, suffix: "+", label: "Projects Delivered" },
    { value: 7, suffix: "+", label: "Countries Reached" },
    { value: 98, suffix: "%", label: "Client Satisfaction" },
  ],
  timeline: [
    {
      year: "2020",
      title: "The Beginning of IshConnect",
      text: "Started as a passion-driven technology initiative focused on software development, innovation, and empowering young African creators through digital skills and real-world projects.",
    },
    {
      year: "2023",
      title: "First Production Project Shipped",
      text: "Successfully delivered the first client-focused software solution, marking the beginning of IshConnect's journey into professional digital product development.",
    },
    {
      year: "2024",
      title: "Rapid Product Development",
      text: "Built and launched multiple impactful platforms including LMS systems, fintech tools, AI-powered applications, agritech solutions, mobile apps, and smart management systems.",
    },
    {
      year: "2025",
      title: "Training Programs & Innovation Expansion",
      text: "Organized mentorship programs, internships, and expanded into AI, cybersecurity, education technology, and community innovation projects.",
    },
    {
      year: "2026",
      title: "DevQueens & National Tech Impact",
      text: "Launched DevQueens, participated in global hackathons, and scaled impactful digital products across multiple sectors.",
    },
  ],
  faqs: [
    {
      question: "What is IshConnect?",
      answer:
        "IshConnect is a Kigali-based technology studio specializing in software development, AI solutions, and tech education in Rwanda. We also run DevQueens, a program empowering women in African tech, offer WebCare website maintenance, and host a thriving tech community.",
    },
    {
      question: "What services does IshConnect offer in Rwanda?",
      answer:
        "IshConnect offers web and mobile app development, AI and machine learning solutions, cloud infrastructure, cybersecurity, UI/UX design, WebCare website maintenance services, and technology training through IshConnect Academy in Kigali, Rwanda.",
    },
    {
      question: "Does IshConnect offer coding bootcamps in Kigali?",
      answer:
        "Yes, IshConnect Academy offers industry-led coding bootcamps and tech training programs including full stack engineering, Python programming, cybersecurity, mobile development, cloud and DevOps, and UI/UX design in Kigali, Rwanda.",
    },
    {
      question: "What is DevQueens by IshConnect?",
      answer:
        "DevQueens is an IshConnect initiative that empowers women in African technology through mentorship, community building, scholarships, and pathways into world-class tech careers.",
    },
    {
      question: "Where is IshConnect located?",
      answer:
        "IshConnect is based in Kigali, Rwanda at KG 11 Ave, serving clients across Rwanda and the African continent with software development, AI, and digital transformation services.",
    },
    {
      question: "Who is the founder of IshConnect?",
      answer:
        "IshConnect was founded in 2020 by Ishimwe J. Claude, a software engineer and entrepreneur based in Kigali, Rwanda. Learn more about the founder.",
    },
    {
      question: "How big is the IshConnect team?",
      answer:
        "IshConnect has a multidisciplinary team of engineers, designers, and educators including leadership, backend engineers, mobile engineers, cloud architects, product designers, and QA engineers based in Kigali, Rwanda. Meet the full team.",
    },
  ],
};

export function mergeSettings(value?: Partial<SiteSettings> | null): SiteSettings {
  return { ...DEFAULT_SETTINGS, ...(value || {}) };
}

export function findApplicationLink(
  settings: SiteSettings,
  key: string,
  fallbackUrl: string,
): ApplicationLink {
  const match = (settings.applicationLinks || DEFAULT_SETTINGS.applicationLinks || []).find(
    (link) => link.key === key && link.enabled !== false,
  );
  return {
    key,
    label: match?.label || key,
    url: match?.url || fallbackUrl,
    enabled: match?.enabled !== false,
    openInNewTab: match?.openInNewTab ?? /^https?:\/\//i.test(match?.url || fallbackUrl),
  };
}
