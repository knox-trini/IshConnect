import { PAGE_SEO, type PageSEOConfig } from "./seo";

export interface LinkItem {
  label: string;
  to: string;
  primary?: boolean;
}

export interface TitleBlock {
  eyebrow: string;
  title: string;
  highlight: string;
  suffix: string;
  description: string;
}

export interface NavItem {
  label: string;
  to: string;
}

export interface ExternalNavItem {
  label: string;
  href: string;
  badge: string;
}

export interface SolutionCard {
  icon: string;
  title: string;
  desc: string;
  href: string;
}

export interface Pillar {
  icon: string;
  title: string;
  text: string;
}

export interface SuccessStory {
  icon: string;
  initials: string;
  name: string;
  role: string;
  meta: string;
  text: string;
}

export interface TextStat {
  value: string;
  label: string;
}

export interface ChallengeStep {
  icon: string;
  title: string;
  description: string;
}

export interface ChallengeItem {
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  skills: string[];
  duration: string;
  filter: string;
  whatYouBuild: string;
  keyFeatures: string[];
  outcomes: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PrivacySection {
  id: string;
  title: string;
  paragraphs: string[];
  items?: string[];
}

export interface ServiceContent {
  title: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  faqs: FaqItem[];
}

export interface SiteContent {
  seo: Record<string, PageSEOConfig>;
  global: {
    nav: {
      primary: NavItem[];
      secondary: NavItem[];
      external: ExternalNavItem[];
      moreLabel: string;
    };
    installBanner: {
      before: string;
      highlight: string;
      after: string;
      install: string;
      dismiss: string;
    };
    pageLoader: string;
    notFound: {
      title: string;
      description: string;
      home: string;
      work: string;
      metaTitle: string;
      metaDescription: string;
    };
    errorPage: {
      title: string;
      description: string;
      details: string;
      retry: string;
      home: string;
      metaTitle: string;
      metaDescription: string;
    };
    projectDetail: {
      backToAll: string;
      viewCode: string;
      viewLive: string;
      repoMissingTitle: string;
      problem: string;
      solution: string;
      client: string;
      challenges: string;
      keyFeatures: string;
      uiDecisions: string;
      workflow: string;
      timeline: string;
      results: string;
      impact: string;
      faq: string;
      faqTitle: string;
      faqDescriptionPrefix: string;
      backToProjects: string;
      notFoundTitle: string;
      notFoundDescription: string;
      notFoundBack: string;
      notFoundMetaTitle: string;
      notFoundMetaDescription: string;
    };
  };
  home: {
    partners: {
      heading: string;
    };
    solutions: TitleBlock & {
      cards: SolutionCard[];
      linkLabel: string;
    };
    work: TitleBlock & {
      seeWorkLabel: string;
    };
    academy: TitleBlock & {
      enrollLabel: string;
    };
    initiatives: TitleBlock & {
      devqueens: {
        badge: string;
        title: string;
        highlight: string;
        suffix: string;
        description: string;
        pillars: Pillar[];
        stats: TextStat[];
        joinLabel: string;
        successLabel: string;
        readStory: string;
        stories: SuccessStory[];
        achievement: {
          mentees: string;
          mentors: string;
          cities: string;
        };
      };
      webcare: {
        badge: string;
        title: string;
        highlight: string;
        description: string;
        descriptionStrong: string;
        features: string[];
        websitesLabel: string;
        featuredPrefix: string;
        viewPrefix: string;
      };
    };
    testimonials: TitleBlock & {
      orgsLabel: string;
      readAllLabel: string;
      emptyLabel: string;
      verifiedLabel: string;
    };
    bootcamp: {
      eyebrow: string;
      kickoffTitle: string;
      prepareTitle: string;
      checklist: { icon: string; text: string }[];
      connectTitle: string;
      connectDescription: string;
      whatsappLabel: string;
      instagramLabel: string;
      registerLabel: string;
    };
  };
  about: {
    badge: string;
    quickLinks: LinkItem[];
    missionBadge: string;
    missionTitle: string;
    missionHighlight: string;
    journeyEyebrow: string;
    journeyTitle: string;
    journeyDescription: string;
    ctaTitle: string;
    ctaLinks: LinkItem[];
  };
  founder: {
    badge: string;
    basedInLabel: string;
    basedIn: string;
    quote: string;
    quoteHighlight: string;
    name: string;
    intro: string;
    bio: string;
    foundedLabel: string;
    founded: string;
    locationLabel: string;
    location: string;
    missionLabel: string;
    mission: string;
    role: string;
    image: string;
    moreTitle: string;
    moreLinks: LinkItem[];
  };
  team: TitleBlock & {
    leadershipLabel: string;
    ctaTitle: string;
    ctaLinks: LinkItem[];
  };
  academyPage: {
    ctaTitle: string;
    ctaLinks: LinkItem[];
  };
  academy: TitleBlock & {
    devqueens: TitleBlock & {
      pillars: Pillar[];
      stats: TextStat[];
      joinLabel: string;
      communityUrl: string;
    };
  };
  contact: TitleBlock & {
    cards: {
      email: string;
      phone: string;
      studio: string;
    };
    form: {
      name: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      phonePlaceholder: string;
      subjectPlaceholder: string;
      messagePlaceholder: string;
      submit: string;
      sending: string;
      successTitle: string;
      successDescription: string;
      errorTitle: string;
    };
  };
  solutionsPage: {
    services: { name: string; description: string }[];
    ctaTitle: string;
    ctaLinks: LinkItem[];
  };
  testimonialsPage: {
    faqs: FaqItem[];
    ctaTitle: string;
    ctaLinks: LinkItem[];
  };
  challenges: {
    hero: {
      badge: string;
      title: string;
      highlight: string;
      description: string;
      primaryLabel: string;
      secondaryLabel: string;
    };
    stats: { value: number; suffix: string; label: string }[];
    filters: { key: string; label: string }[];
    items: ChallengeItem[];
    library: TitleBlock;
    emptyLabel: string;
    viewDetails: string;
    howItWorks: TitleBlock;
    steps: ChallengeStep[];
    submission: TitleBlock;
    footer: {
      before: string;
      academyLabel: string;
      after: string;
    };
  };
  privacy: {
    lastUpdated: string;
    operatedBy: string;
    title: string;
    highlight: string;
    description: string;
    registered: string;
    agreement: string;
    tocTitle: string;
    sectionLabel: string;
    emailLabel: string;
    locationLabel: string;
    location: string;
    footerTitle: string;
    footerText: string;
    footerAgreement: string;
    footerLocation: string;
    sections: PrivacySection[];
  };
  services: Record<
    | "softwareDevelopment"
    | "webDevelopment"
    | "mobileApps"
    | "aiSolutions"
    | "cybersecurity"
    | "cloudServices"
    | "techTraining",
    ServiceContent
  >;
}

export const DEFAULT_SITE_CONTENT: SiteContent = {
  seo: PAGE_SEO,
  global: {
    nav: {
      primary: [
        { to: "/", label: "Home" },
        { to: "/solutions", label: "Services" },
        { to: "/work", label: "Work" },
        { to: "/academy", label: "Academy" },
        { to: "/about", label: "About" },
        { to: "/contact", label: "Contact" },
      ],
      secondary: [
        { to: "/webcare", label: "WebCare" },
        { to: "/community", label: "Community" },
        { to: "/founder", label: "Founder" },
        { to: "/team", label: "Team" },
        { to: "/challenges", label: "Challenges" },
        { to: "/testimonials", label: "Testimonials" },
      ],
      external: [{ href: "https://lab.ishconnect.rw", label: "Internship", badge: "LAB" }],
      moreLabel: "More",
    },
    installBanner: {
      before: "Install",
      highlight: "IshConnect",
      after: "for a faster experience",
      install: "Install",
      dismiss: "Dismiss install banner",
    },
    pageLoader: "Loading, please wait…",
    notFound: {
      title: "Page not found",
      description: "The page you're looking for doesn't exist or has been moved.",
      home: "Go home",
      work: "View our work",
      metaTitle: "Page Not Found · IshConnect",
      metaDescription:
        "The page you're looking for doesn't exist or has been moved. Return to IshConnect — Kigali's leading software development and AI innovation studio.",
    },
    errorPage: {
      title: "This page didn't load",
      description: "Something went wrong on our end. You can try refreshing or head back home.",
      details: "Error details",
      retry: "Try again",
      home: "Go home",
      metaTitle: "This page didn't load · IshConnect",
      metaDescription: "Something went wrong on our end. Please try refreshing or head back home.",
    },
    projectDetail: {
      backToAll: "Back to all projects",
      viewCode: "View Code",
      viewLive: "View Live Project",
      repoMissingTitle: "Add a repository URL in the project settings to enable this link.",
      problem: "The Problem",
      solution: "Our Solution",
      client: "Client",
      challenges: "Challenges",
      keyFeatures: "Key Features",
      uiDecisions: "UI/UX Decisions",
      workflow: "Development Workflow",
      timeline: "Project Timeline",
      results: "Results",
      impact: "Impact",
      faq: "FAQ",
      faqTitle: "Frequently Asked Questions",
      faqDescriptionPrefix: "Technical insights and decisions behind",
      backToProjects: "View all projects by IshConnect",
      notFoundTitle: "Project not found",
      notFoundDescription: 'The project "{slug}" doesn\'t exist or has been removed.',
      notFoundBack: "Back to projects",
      notFoundMetaTitle: "Project not found · IshConnect",
      notFoundMetaDescription:
        "The project you're looking for doesn't exist. Browse our portfolio of software, AI, and digital products by IshConnect Rwanda.",
    },
  },
  home: {
    partners: {
      heading: "Trusted By Leading Institutions & Partners",
    },
    solutions: {
      eyebrow: "Solutions",
      title: "Engineering",
      highlight: "excellence",
      suffix: ", end to end.",
      description:
        "From idea to launch — a multidisciplinary team that ships premium digital products.",
      cards: [
        {
          icon: "dashboard",
          title: "Digital Platforms",
          desc: "Scalable web apps, dashboards, and SaaS platforms for African markets.",
          href: "/software-development-rwanda",
        },
        {
          icon: "mobile",
          title: "Mobile Applications",
          desc: "Native iOS & Android apps built with React Native and Flutter.",
          href: "/mobile-app-development-rwanda",
        },
        {
          icon: "cloud",
          title: "Cloud Infrastructure",
          desc: "Cloud migration, serverless architecture, and DevOps automation.",
          href: "/cloud-services-rwanda",
        },
        {
          icon: "security",
          title: "Cybersecurity",
          desc: "Threat modeling, penetration testing, and zero-trust security.",
          href: "/cybersecurity-rwanda",
        },
        {
          icon: "server",
          title: "Backend Engineering",
          desc: "Robust APIs, data pipelines, and high-performance backends.",
          href: "/software-development-rwanda",
        },
        {
          icon: "design",
          title: "UI / UX Design",
          desc: "User research, prototyping, and interface design that converts.",
          href: "/solutions",
        },
      ],
      linkLabel: "View Service",
    },
    work: {
      eyebrow: "Selected Work",
      title: "Products that move",
      highlight: "markets.",
      suffix: "",
      description:
        "A handful of recent collaborations across fintech, health, agritech, sustainability and consumer.",
      seeWorkLabel: "See Work",
    },
    academy: {
      eyebrow: "Academy",
      title: "Technology Talent",
      highlight: "Programs",
      suffix: ".",
      description:
        "Industry-led, project-based programs that prepare African talent for global opportunities.",
      enrollLabel: "Enroll Now",
    },
    initiatives: {
      eyebrow: "Initiatives",
      title: "One studio.",
      highlight: "Two bold missions.",
      suffix: "",
      description:
        "IshConnect builds the people who build the web — and the web for the people who build Rwanda. Explore DevQueens and WebCare.",
      devqueens: {
        badge: "DevQueens",
        title: "Empowering the Next Generation of",
        highlight: "Women in Technology.",
        suffix: "",
        description:
          "Closing the gender gap in African tech through mentorship, community, and ambition.",
        pillars: [
          {
            icon: "sparkles",
            title: "Mentorship",
            text: "1:1 guidance from senior women engineers shipping at top companies.",
          },
          {
            icon: "users",
            title: "Community",
            text: "A safe, ambitious sisterhood of builders, founders and creators.",
          },
          {
            icon: "heart",
            title: "Empowerment",
            text: "Scholarships, devices, and pathways into world-class tech careers.",
          },
        ],
        stats: [
          { value: "120+", label: "Mentees" },
          { value: "32", label: "Mentors" },
          { value: "9", label: "Cities" },
        ],
        joinLabel: "Join",
        successLabel: "Success Stories",
        readStory: "Read story",
        stories: [
          {
            icon: "shield",
            initials: "T",
            name: "Tendani",
            role: "Cybersecurity Internship",
            meta: "Completed · 2025",
            text: "Tendani completed the IshConnect cybersecurity internship in 2025, gaining hands-on experience in network security, threat analysis, and defensive security practices under the direct mentorship of senior security engineers.",
          },
          {
            icon: "code",
            initials: "RA",
            name: "Ramla Abdullahi",
            role: "Computer Science & Cyber Student",
            meta: "Cyber Internship",
            text: "Ramla Abdullahi is a computer science & cybersecurity student who sharpened her practical skills through the IshConnect cyber internship — bridging academic theory with real-world security challenges on live projects.",
          },
          {
            icon: "award",
            initials: "AM",
            name: "AbdulAziz Memon",
            role: "CEO, Xantrail Studio",
            meta: "Completed Full Stack",
            text: "AbdulAziz Memon, CEO of Xantrail Studio, completed the full-stack program with IshConnect — turning his technical training into a thriving studio that ships web products for real clients.",
          },
        ],
        achievement: {
          mentees: "120+ Mentees",
          mentors: "32 Mentors",
          cities: "9 Cities",
        },
      },
      webcare: {
        badge: "About WebCare",
        title: "Professional Websites for",
        highlight: "Schools & Businesses.",
        description:
          "WebCare is the web development service of ISHCONNECT — designing, building, and maintaining credible, results-driven websites for Rwandan institutions and businesses.",
        descriptionStrong: "No templates — every site is built specifically for the client.",
        features: [
          "Custom websites built from scratch — no templates",
          "Focused on Rwandan schools, universities, and businesses",
          "12 months of post-launch maintenance included",
          "Fully responsive — optimised for mobile and desktop",
        ],
        websitesLabel: "Websites We've Built",
        featuredPrefix: "Featured",
        viewPrefix: "View",
      },
    },
    testimonials: {
      eyebrow: "Testimonials",
      title: "Trusted by",
      highlight: "founders, teachers & students.",
      suffix: "",
      description:
        "From classrooms to boardrooms, hear what the people building Africa's digital future say about working with IshConnect.",
      orgsLabel: "Voices from across Rwanda",
      readAllLabel: "Read All Testimonials",
      emptyLabel: "Testimonials will appear here when published.",
      verifiedLabel: "Verified",
    },
    bootcamp: {
      eyebrow: "Bootcamp Update",
      kickoffTitle: "Kickoff details",
      prepareTitle: "Before Day 1, please prepare",
      checklist: [
        { icon: "wifi", text: "Stable internet connection" },
        { icon: "laptop", text: "Laptop/PC with VS Code, Node.js and Git installed" },
        { icon: "video", text: "Zoom/Google Meet ready for live sessions" },
      ],
      connectTitle: "Stay connected",
      connectDescription:
        "Keep inviting others — registration is still open. Let's build together.",
      whatsappLabel: "Join WhatsApp Community",
      instagramLabel: "Follow on Instagram",
      registerLabel: "Register now",
    },
  },
  about: {
    badge: "About IshConnect",
    quickLinks: [
      { label: "Meet the Founder", to: "/founder", primary: true },
      { label: "Our Team", to: "/team" },
      { label: "Explore Work", to: "/work" },
    ],
    missionBadge: "Mission",
    missionTitle: "What we do — and",
    missionHighlight: "who we serve.",
    journeyEyebrow: "Journey",
    journeyTitle: "Our growth tree — IshConnect timeline",
    journeyDescription:
      "A structured evolution map showing how IshConnect grew from a passion-driven technology initiative in Kigali, Rwanda into a leading software development and AI company.",
    ctaTitle: "Learn more about IshConnect",
    ctaLinks: [
      { label: "Founder", to: "/founder", primary: true },
      { label: "Team", to: "/team" },
      { label: "Our Work", to: "/work" },
      { label: "Academy", to: "/academy" },
      { label: "Contact", to: "/contact" },
    ],
  },
  founder: {
    badge: "Founder",
    basedInLabel: "Based in",
    basedIn: "Kigali, Rwanda",
    quote: "We are not just building software. We are building Africa's",
    quoteHighlight: "digital future.",
    name: "Ishimwe J. Claude",
    intro:
      "Ishimwe J. Claude is the Founder and Chief Executive Officer of IshConnect, a Kigali-based technology company he established in 2020 with a vision to build world-class digital products and nurture homegrown tech talent across Africa.",
    bio: "With deep expertise in software engineering, AI systems architecture, and technology strategy, Claude has led IshConnect from a passion-driven initiative into a full-stack innovation studio delivering web platforms, mobile applications, AI solutions, and digital infrastructure for clients across Rwanda, East Africa, and beyond.",
    foundedLabel: "Founded",
    founded: "IshConnect, 2020",
    locationLabel: "Location",
    location: "Kigali, Rwanda",
    missionLabel: "Mission",
    mission:
      "Empowering African innovation through technology — building scalable digital solutions that drive economic growth, bridge the skills gap, and position Rwanda as a global technology hub.",
    role: "CEO & Founder",
    image: "/src/assets/team/ceo.jpeg",
    moreTitle: "More about IshConnect",
    moreLinks: [
      { label: "About IshConnect", to: "/about", primary: true },
      { label: "Our Team", to: "/team" },
      { label: "Contact", to: "/contact" },
    ],
  },
  team: {
    eyebrow: "Team",
    title: "The minds behind the",
    highlight: "mission.",
    suffix: "",
    description:
      "A multidisciplinary team of engineers, designers, and educators building impactful digital experiences across Africa.",
    leadershipLabel: "Leadership",
    ctaTitle: "Explore more of IshConnect",
    ctaLinks: [
      { label: "Meet the Founder", to: "/founder", primary: true },
      { label: "About IshConnect", to: "/about" },
      { label: "Our Work", to: "/work" },
    ],
  },
  academyPage: {
    ctaTitle: "Join the IshConnect ecosystem",
    ctaLinks: [
      { label: "WebCare", to: "/webcare", primary: true },
      { label: "Community", to: "/community" },
    ],
  },
  academy: {
    eyebrow: "Academy",
    title: "Technology Talent",
    highlight: "Programs",
    suffix: ".",
    description:
      "Industry-led, project-based programs that prepare African talent for global opportunities.",
    devqueens: {
      eyebrow: "DevQueens",
      title: "Empowering the Next Generation of",
      highlight: "Women in Technology",
      suffix: ".",
      description:
        "Closing the gender gap in African tech through mentorship, community, and ambition.",
      pillars: [
        {
          icon: "sparkles",
          title: "Mentorship",
          text: "1:1 guidance from senior women engineers shipping at top companies.",
        },
        {
          icon: "users",
          title: "Community",
          text: "A safe, ambitious sisterhood of builders, founders and creators.",
        },
        {
          icon: "heart",
          title: "Empowerment",
          text: "Scholarships, devices, and pathways into world-class tech careers.",
        },
      ],
      stats: [
        { value: "120+", label: "Mentees" },
        { value: "32", label: "Mentors" },
        { value: "9", label: "Cities" },
      ],
      joinLabel: "Join Our Community",
      communityUrl: "https://chat.whatsapp.com/BIyl1UovWjzLwcGw6vtcUJ",
    },
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's build something",
    highlight: "remarkable.",
    suffix: "",
    description:
      "Tell us about your project, your program, or just say hello — we read every message.",
    cards: {
      email: "Email",
      phone: "Phone",
      studio: "Studio",
    },
    form: {
      name: "Full name",
      email: "Email",
      phone: "Phone (optional)",
      subject: "Subject (optional)",
      message: "Message",
      namePlaceholder: "Jane Mukamana",
      emailPlaceholder: "you@example.com",
      phonePlaceholder: "+250 78x xxx xxx",
      subjectPlaceholder: "Project · Partnership · Other",
      messagePlaceholder: "Tell us what you're building…",
      submit: "Send message",
      sending: "Sending…",
      successTitle: "Message sent",
      successDescription: "We'll respond within one business day.",
      errorTitle: "Email failed",
    },
  },
  solutionsPage: {
    services: [
      {
        name: "Digital Platform Engineering",
        description:
          "Full-stack web and mobile platforms built with modern tooling for scale and performance.",
      },
      {
        name: "Cloud & DevOps",
        description:
          "Resilient cloud infrastructure, CI/CD pipelines, and automated deployment strategies.",
      },
      {
        name: "Cybersecurity",
        description:
          "Offensive and defensive security services including audit, penetration testing, and compliance.",
      },
      {
        name: "UI / UX Design",
        description:
          "Research-driven interface design, prototyping, and design systems for digital products.",
      },
    ],
    ctaTitle: "See our work in action",
    ctaLinks: [
      { label: "View Our Work", to: "/work", primary: true },
      { label: "Start a Project", to: "/contact" },
    ],
  },
  testimonialsPage: {
    faqs: [
      {
        question: "Who has worked with IshConnect?",
        answer:
          "IshConnect works with founders and CEOs of Rwandan startups like Velamin AI, DropIn, and EdTech Solutions, as well as educators and students at institutions including Rwanda Coding Academy, Kiyumba TSS, and KASS.",
      },
      {
        question: "What do IshConnect clients say?",
        answer:
          "Founders highlight on-time delivery, clean engineering, and a true partnership approach. Educators and students praise IshConnect's practical, project-first training and mentorship that turns learners into builders.",
      },
      {
        question: "How can I share my experience with IshConnect?",
        answer:
          "We love hearing from our community. Reach out through the contact page and share your story — whether you are a founder, a teacher, or a student we have worked with.",
      },
    ],
    ctaTitle: "Ready to write your own IshConnect story?",
    ctaLinks: [
      { label: "Start a Project", to: "/contact", primary: true },
      { label: "Join the Academy", to: "/academy" },
    ],
  },
  challenges: {
    hero: {
      badge: "IshConnect Academy · Coding Challenges",
      title: "Real-World Coding",
      highlight: "Challenges",
      description:
        "Practice, build, and prove your skills through industry-level projects designed by IshConnect engineers in Kigali, Rwanda.",
      primaryLabel: "Start Challenge",
      secondaryLabel: "Explore Academy",
    },
    stats: [
      { value: 4, suffix: "+", label: "Active Challenges" },
      { value: 200, suffix: "+", label: "Students Participating" },
      { value: 150, suffix: "+", label: "Projects Submitted" },
      { value: 68, suffix: "%", label: "Completion Rate" },
    ],
    filters: [
      { key: "all", label: "All Challenges" },
      { key: "beginner", label: "Beginner" },
      { key: "intermediate", label: "Intermediate" },
      { key: "advanced", label: "Advanced" },
      { key: "full-stack", label: "Full-Stack" },
      { key: "ai-data", label: "AI / Data" },
      { key: "ui-ux", label: "UI / UX" },
    ],
    items: [
      {
        title: "7-Day Coding Challenge",
        level: "Beginner",
        description:
          "Build daily mini-projects and learn the fundamentals of web development from scratch.",
        skills: ["HTML", "CSS", "JavaScript"],
        duration: "7 days",
        filter: "beginner",
        whatYouBuild:
          "7 mini web projects including a personal portfolio page, interactive calculator, to-do list app, quiz game, countdown timer, image gallery, and a final capstone project.",
        keyFeatures: [
          "Daily project-based curriculum with progressive difficulty",
          "Live preview on browser — no setup required",
          "GitHub repository for each daily project",
          "Final capstone combining all skills learned",
        ],
        outcomes: [
          "HTML5 semantic structure and accessibility basics",
          "CSS Flexbox, Grid, and responsive design",
          "JavaScript DOM manipulation and event handling",
        ],
      },
      {
        title: "Landing Page Clone Challenge",
        level: "Beginner",
        description:
          "Clone real-world landing pages like Airbnb or Netflix to master layout and responsive design.",
        skills: ["HTML", "Tailwind", "React"],
        duration: "5 days",
        filter: "beginner",
        whatYouBuild:
          "A pixel-perfect clone of a real-world landing page (Airbnb or Netflix) with responsive layout, mobile navigation, hero sections, and interactive UI components.",
        keyFeatures: [
          "Fully responsive hero section with CTA buttons",
          "Mobile hamburger menu and smooth scroll navigation",
          "Feature grid sections with icons and hover effects",
          "Footer with multi-column layout and social links",
        ],
        outcomes: [
          "Tailwind CSS utility-first workflow mastery",
          "Responsive design patterns for all screen sizes",
          "React component composition and props",
        ],
      },
      {
        title: "UI Clone Challenge",
        level: "Intermediate",
        description:
          "Recreate complex app UIs (Instagram / Netflix) pixel-perfect with modern frontend tools.",
        skills: ["React", "Tailwind CSS"],
        duration: "1 week",
        filter: "ui-ux",
        whatYouBuild:
          "A fully functional UI clone of Instagram's feed page or Netflix's browse page with working tabs, modals, and responsive grid layouts.",
        keyFeatures: [
          "Component-based architecture with reusable UI primitives",
          "Tab switching and modal overlay interactions",
          "Responsive grid that adapts from mobile to desktop",
          "Dark mode theme toggle",
        ],
        outcomes: [
          "Advanced React component patterns and composition",
          "Pixel-perfect implementation from design references",
          "State management for UI interactions",
        ],
      },
      {
        title: "Dashboard UI Challenge",
        level: "Intermediate",
        description:
          "Build a fully responsive admin dashboard UI with charts, data tables, and interactive widgets.",
        skills: ["React", "Charts", "Responsive Design"],
        duration: "1 week",
        filter: "ui-ux",
        whatYouBuild:
          "A professional admin dashboard with interactive charts, sortable data tables, sidebar navigation, and live statistics widgets.",
        keyFeatures: [
          "Interactive line, bar, and pie charts with real mock data",
          "Sortable and filterable data table with pagination",
          "Collapsible sidebar with nested navigation items",
          "Statistics cards with animated counters",
        ],
        outcomes: [
          "Chart.js / Recharts integration for data visualization",
          "Complex responsive layout with sidebar + main area",
          "Data table patterns: sorting, filtering, pagination",
        ],
      },
      {
        title: "Mobile App UI Challenge",
        level: "Intermediate",
        description:
          "Design and build a mobile app interface using React Native with Expo for cross-platform experience.",
        skills: ["React Native", "Expo", "UI Components"],
        duration: "1 week",
        filter: "ui-ux",
        whatYouBuild:
          "A cross-platform mobile app UI with bottom tab navigation, list views, detail screens, and smooth touch interactions using React Native and Expo.",
        keyFeatures: [
          "Bottom tab navigator with 3-4 screen tabs",
          "FlatList with pull-to-refresh and infinite scroll",
          "Detail screen with shared element transitions",
          "Dark/Light theme support via context",
        ],
        outcomes: [
          "React Native fundamentals and Expo CLI workflow",
          "Cross-platform component patterns (iOS + Android)",
          "Mobile navigation with React Navigation",
        ],
      },
      {
        title: "Debugging Challenge",
        level: "Intermediate",
        description:
          "Fix broken production-like code and learn real-world debugging techniques used by professional engineers.",
        skills: ["JavaScript", "React"],
        duration: "3 days",
        filter: "intermediate",
        whatYouBuild:
          "A broken React application with 10+ hidden bugs across state management, rendering, API calls, and event handling that you must identify and fix.",
        keyFeatures: [
          "Console errors from undefined state and props",
          "Rendering bugs: infinite loops, stale closures, missing keys",
          "API call bugs: wrong endpoints, missing error handling",
          "Event handler bugs: incorrect binding, propagation issues",
        ],
        outcomes: [
          "Professional debugging workflows with DevTools",
          "React error boundary patterns and error recovery",
          "Systematic bug-hunting methodology",
        ],
      },
      {
        title: "Bug Fix Sprint",
        level: "Intermediate",
        description:
          "Debug and fix a broken React + Node.js project under time constraints, simulating a real sprint.",
        skills: ["Debugging", "Logic", "REST APIs"],
        duration: "3 days",
        filter: "intermediate",
        whatYouBuild:
          "A full-stack React + Node.js project with 15+ bugs across the frontend, backend API, and database layer that you'll diagnose and fix under sprint pressure.",
        keyFeatures: [
          "Backend bugs: wrong status codes, broken middleware, SQL errors",
          "Frontend bugs: incorrect data display, broken forms, auth issues",
          "Integration bugs: mismatched API contracts, CORS issues",
          "Database bugs: wrong queries, missing migrations",
        ],
        outcomes: [
          "Full-stack debugging from browser to database",
          "Reading and understanding production error traces",
          "Time-constrained problem-solving under sprint pressure",
        ],
      },
      {
        title: "REST API Challenge",
        level: "Intermediate",
        description:
          "Build a complete CRUD API for users and products with proper routing, validation, and error handling.",
        skills: ["Node.js", "Express", "MongoDB"],
        duration: "5 days",
        filter: "intermediate",
        whatYouBuild:
          "A production-ready REST API with full CRUD operations, input validation, authentication middleware, error handling, and API documentation.",
        keyFeatures: [
          "User CRUD: register, login, profile update, delete account",
          "Product CRUD: create, list, search, update, delete with pagination",
          "JWT authentication middleware and protected routes",
          "Input validation with express-validator and custom error responses",
        ],
        outcomes: [
          "RESTful API design principles and best practices",
          "MongoDB schema design with Mongoose ODM",
          "Express middleware patterns for auth, logging, and error handling",
        ],
      },
      {
        title: "Deploy Your App Challenge",
        level: "Intermediate",
        description:
          "Deploy a full-stack application online using modern cloud platforms and CI/CD pipelines.",
        skills: ["Vercel", "Render", "AWS Basics"],
        duration: "3 days",
        filter: "intermediate",
        whatYouBuild:
          "A full-stack application fully deployed to production with custom domain, HTTPS, CI/CD pipeline, and monitoring — ready for real users.",
        keyFeatures: [
          "Frontend deployed on Vercel with automatic CI/CD from GitHub",
          "Backend API deployed on Render or Railway with persistent DB",
          "Custom domain configuration with SSL certificate",
          "Environment variable management and production logging",
        ],
        outcomes: [
          "End-to-end deployment workflow from code to production",
          "CI/CD pipeline configuration with GitHub Actions",
          "Cloud platform basics: Vercel, Render, and AWS essentials",
        ],
      },
      {
        title: "Full-Stack Startup Challenge",
        level: "Advanced",
        description:
          "Build a SaaS MVP from scratch with authentication, payments, and a polished user interface.",
        skills: ["React", "Node", "MongoDB"],
        duration: "3 weeks",
        filter: "full-stack",
        whatYouBuild:
          "A complete SaaS MVP with user authentication, payment processing, a dashboard, and core business logic — ready to show investors.",
        keyFeatures: [
          "User auth: email/password + Google OAuth with session management",
          "Payment integration: Stripe subscription with pricing tiers",
          "Dashboard with usage analytics, billing history, and settings",
          "Admin panel for user management and revenue tracking",
        ],
        outcomes: [
          "Full-stack SaaS architecture from database to deployment",
          "Payment processing integration with Stripe",
          "Production-ready patterns: auth, security, error handling",
        ],
      },
      {
        title: "Startup Builder Challenge",
        level: "Advanced",
        description:
          "Build a complete SaaS MVP including frontend, backend, database, and a pitch deck for investors.",
        skills: ["Frontend", "Backend", "Pitch"],
        duration: "4 weeks",
        filter: "full-stack",
        whatYouBuild:
          "A complete startup MVP: functional web application + business model + investor pitch deck. Go from idea to investable product.",
        keyFeatures: [
          "Full-stack application with real business logic",
          "Revenue model implementation (subscription or pay-per-use)",
          "Investor pitch deck with market analysis and financials",
          "Live demo environment for investor review",
        ],
        outcomes: [
          "End-to-end product development from ideation to launch",
          "Business modeling and investor communication skills",
          "Technical architecture decisions for scaling startups",
        ],
      },
      {
        title: "Authentication System Challenge",
        level: "Advanced",
        description:
          "Implement a secure JWT-based login and registration system with role-based access control.",
        skills: ["Security", "Auth Flows", "JWT"],
        duration: "1 week",
        filter: "advanced",
        whatYouBuild:
          "A complete authentication system with JWT tokens, refresh tokens, email verification, password reset, and role-based access control (RBAC).",
        keyFeatures: [
          "JWT access + refresh token flow with secure HTTP-only cookies",
          "Email verification flow with verification links",
          "Password reset flow with time-limited tokens",
          "Role-based access control (admin, moderator, user)",
        ],
        outcomes: [
          "JWT authentication best practices and security patterns",
          "Secure session management and token rotation",
          "RBAC implementation patterns for multi-role systems",
        ],
      },
      {
        title: "System Design Mini Challenge",
        level: "Advanced",
        description:
          "Design a scalable chat application (WhatsApp-like) covering architecture, APIs, and data modeling.",
        skills: ["Architecture", "APIs", "Databases"],
        duration: "1 week",
        filter: "advanced",
        whatYouBuild:
          "A complete system design document and prototype for a scalable real-time chat application serving millions of users.",
        keyFeatures: [
          "High-level architecture: microservices vs monolith decision",
          "Database schema: users, messages, groups, attachments",
          "Real-time messaging with WebSockets and message queuing",
          "Scalability: horizontal scaling, caching, CDN strategy",
        ],
        outcomes: [
          "System design methodology for large-scale applications",
          "Data modeling for high-throughput real-time systems",
          "Trade-off analysis: consistency, availability, partition tolerance",
        ],
      },
      {
        title: "AI Chatbot Builder",
        level: "Advanced",
        description:
          "Build an intelligent chatbot using APIs or rule-based logic with natural language understanding.",
        skills: ["Python / JS", "APIs", "Logic"],
        duration: "2 weeks",
        filter: "ai-data",
        whatYouBuild:
          "An intelligent chatbot with natural language understanding that can handle customer inquiries, process intents, and maintain conversation context.",
        keyFeatures: [
          "Intent recognition with NLP (OpenAI API or custom rules)",
          "Multi-turn conversation with context memory",
          "API integration for real-time data lookups",
          "Chat UI with typing indicators and message history",
        ],
        outcomes: [
          "NLP and intent classification fundamentals",
          "Conversation flow design and state management",
          "API integration patterns for AI services",
        ],
      },
      {
        title: "Image Classifier Mini AI",
        level: "Advanced",
        description:
          "Train a simple machine learning model to classify images and integrate it into a web app.",
        skills: ["Python", "ML Basics", "TensorFlow"],
        duration: "2 weeks",
        filter: "ai-data",
        whatYouBuild:
          "A web application where users upload images and get real-time classification results from a trained machine learning model.",
        keyFeatures: [
          "ML model training with TensorFlow/Keras using a real dataset",
          "Model export and serving via REST API (Flask or FastAPI)",
          "Web UI with drag-and-drop image upload and results display",
          "Confidence scores and top-5 predictions visualization",
        ],
        outcomes: [
          "End-to-end ML pipeline: data prep, training, deployment",
          "Model serving patterns and REST API integration",
          "Image preprocessing and augmentation techniques",
        ],
      },
      {
        title: "AI Mini Project Challenge",
        level: "Advanced",
        description:
          "Build simple AI-powered tools using APIs and pre-trained models — sentiment analysis, summarization, and more.",
        skills: ["Python", "APIs", "AI Basics"],
        duration: "2 weeks",
        filter: "ai-data",
        whatYouBuild:
          "A collection of 3 AI-powered mini tools: sentiment analysis, text summarization, and content generation — all accessible via a clean web interface.",
        keyFeatures: [
          "Sentiment analyzer: classify text as positive/negative/neutral",
          "Text summarizer: generate concise summaries from long articles",
          "Content generator: AI-powered text completion and writing assistant",
          "Clean dashboard UI to test all AI tools side by side",
        ],
        outcomes: [
          "Working with pre-trained models and AI APIs (OpenAI, HuggingFace)",
          "Prompt engineering and LLM integration patterns",
          "Building user-friendly interfaces for AI-powered features",
        ],
      },
    ],
    library: {
      eyebrow: "Challenge Library",
      title: "Choose Your Challenge",
      highlight: "",
      suffix: "",
      description:
        "Select a challenge that matches your current skill level and start building real projects for your portfolio.",
    },
    emptyLabel: "No challenges match this filter.",
    viewDetails: "View Details",
    howItWorks: {
      eyebrow: "How It Works",
      title: "From Challenge to Career",
      highlight: "",
      suffix: "",
      description: "A structured path to build real skills, get feedback, and earn recognition.",
    },
    steps: [
      {
        icon: "layers",
        title: "Choose a challenge",
        description: "Pick a challenge that matches your skill level and interests.",
      },
      {
        icon: "code",
        title: "Build your solution",
        description: "Develop locally or online using your preferred tools and stack.",
      },
      {
        icon: "external",
        title: "Submit GitHub link",
        description: "Push your code to GitHub and submit the repository URL.",
      },
      {
        icon: "check",
        title: "Reviewed by IshConnect team",
        description: "Get constructive feedback from experienced engineers.",
      },
      {
        icon: "trophy",
        title: "Earn certificate & recognition",
        description: "Receive a certificate and get featured on our platform.",
      },
    ],
    submission: {
      eyebrow: "Submit Your Work",
      title: "Submit Your Project",
      highlight: "",
      suffix: "",
      description:
        "Share your completed challenge and get feedback from the IshConnect engineering team.",
    },
    footer: {
      before: "This program is part of",
      academyLabel: "IshConnect Academy",
      after: "by ISHCONNLAB — empowering African developers through real-world experience.",
    },
  },
  privacy: {
    lastUpdated: "Last Updated: April 15, 2026",
    operatedBy: "Operated by ISHCONNLAB",
    title: "Privacy",
    highlight: "Policy",
    description:
      "Your privacy matters to us. This policy explains how IshConnect and ISHCONNLAB collect, use, and protect your information.",
    registered: "Registered in Rwanda",
    agreement: "By using this website, you agree to this Privacy Policy.",
    tocTitle: "On this page",
    sectionLabel: "Section",
    emailLabel: "Email",
    locationLabel: "Location",
    location: "Kigali, Rwanda",
    footerTitle: "Privacy Notice",
    footerText: "© 2026 IshConnect · Operated by ISHCONNLAB · Registered in Rwanda",
    footerAgreement: "By using this website, you agree to this Privacy Policy.",
    footerLocation: "Kigali, Rwanda",
    sections: [
      {
        id: "introduction",
        title: "Introduction",
        paragraphs: [
          'IshConnect ("we," "our," or "us") is operated by ISHCONNLAB, a registered technology company in the Republic of Rwanda. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.',
          "By using this website, you agree to the collection and use of information in accordance with this policy. We are committed to protecting your privacy and ensuring transparency in our data practices. If you do not agree with the terms of this policy, please do not access or use our website or services.",
          "This policy applies to all information collected through our website, communication channels, and any related services offered by IshConnect and ISHCONNLAB.",
        ],
      },
      {
        id: "information-we-collect",
        title: "Information We Collect",
        paragraphs: [
          "We collect information that you voluntarily provide to us when you fill out forms, subscribe to our newsletter, enroll in our academy programs, request services, or contact us directly.",
        ],
        items: [
          "Personal identification information such as your name, email address, phone number, and professional details",
          "Educational and professional background when enrolling in our academy programs",
          "Project requirements and technical specifications when requesting services",
          "Communication preferences and feedback you share with us",
          "Information you provide when applying for positions or partnerships",
        ],
      },
      {
        id: "how-we-use-information",
        title: "How We Use Information",
        paragraphs: ["We use the information we collect for the following purposes:"],
        items: [
          "To operate, maintain, and improve our website and services",
          "To communicate with you about our programs, updates, events, and project inquiries",
          "To process enrollments, service requests, and customer support inquiries",
          "To personalize your experience and deliver relevant content",
          "To analyze usage patterns and improve our platform's performance",
          "To comply with legal obligations and enforce our terms of service",
        ],
      },
      {
        id: "cookies-analytics",
        title: "Cookies & Analytics",
        paragraphs: [
          "IshConnect uses cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are small text files placed on your device that help us provide a better browsing experience.",
        ],
        items: [
          "Essential cookies required for the website to function properly",
          "Analytics cookies that help us understand how visitors interact with our platform",
          "Preference cookies that remember your settings and choices",
          "Marketing cookies used to deliver relevant content and measure campaign effectiveness",
        ],
      },
      {
        id: "data-protection",
        title: "Data Protection",
        paragraphs: [
          "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.",
          "Your data is stored on secure servers with restricted access. We regularly review our data collection, storage, and processing practices to ensure compliance with applicable data protection laws, including the Data Protection and Privacy Act of Rwanda and international standards.",
          "Access to your personal data is limited to employees, contractors, and service providers who require it to perform their duties. These individuals are bound by strict confidentiality obligations.",
        ],
      },
      {
        id: "third-party-services",
        title: "Third-Party Services",
        paragraphs: [
          "We may engage trusted third-party service providers to assist us in operating our website, processing communications, analyzing data, and delivering services.",
        ],
        items: [
          "Analytics providers that help us understand website usage and improve user experience",
          "Email service providers that facilitate our communications with you",
          "Cloud infrastructure providers that host our website and store data securely",
          "Payment processors for any financial transactions conducted through our platform",
        ],
      },
      {
        id: "email-communications",
        title: "Email Communications",
        paragraphs: [
          "We may send you emails regarding our services, academy programs, project updates, and relevant industry content. We respect your inbox and strive to send only meaningful communications.",
          "You can unsubscribe from marketing communications at any time by clicking the unsubscribe link in the footer of our emails. Transactional emails related to your inquiries, enrollments, or service requests may still be sent after opting out of marketing.",
          "We do not share your email address with third parties for their own marketing purposes without your explicit consent.",
        ],
      },
      {
        id: "user-rights",
        title: "User Rights",
        paragraphs: ["You have the following rights regarding your personal information:"],
        items: [
          "The right to access your personal data and obtain a copy of the information we hold about you",
          "The right to correct inaccurate or incomplete personal data",
          "The right to request deletion of your personal data, subject to legal retention requirements",
          "The right to restrict or object to certain processing of your data",
          "The right to data portability in a structured, commonly used format",
          "The right to withdraw consent at any time where processing is based on consent",
        ],
      },
      {
        id: "data-retention",
        title: "Data Retention",
        paragraphs: [
          "We retain your personal information only for as long as necessary to fulfill the purposes described in this Privacy Policy, or as required by applicable law.",
          "When data is no longer needed, we securely delete, anonymize, or destroy it using industry-standard methods. Retention periods vary depending on the type of data, the nature of our relationship with you, and legal requirements.",
          "If you request deletion of your data, we will honor your request within a reasonable timeframe, unless we are required to retain certain information for legal, auditing, or security purposes.",
        ],
      },
      {
        id: "security-measures",
        title: "Security Measures",
        paragraphs: [
          "We employ industry-standard security measures to protect your personal information:",
        ],
        items: [
          "SSL/TLS encryption for all data transmitted between your browser and our servers",
          "Firewalls and intrusion detection systems to prevent unauthorized access",
          "Regular security audits and vulnerability assessments",
          "Strict access controls and authentication requirements for our team",
          "Secure data backup and disaster recovery procedures",
        ],
      },
      {
        id: "childrens-privacy",
        title: "Children's Privacy",
        paragraphs: [
          "Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal data without parental consent, we will take steps to delete such information promptly.",
          "If you believe a child has provided us with their personal information, please contact us immediately at ishconnlab@gmail.com so that we can take appropriate action.",
        ],
      },
      {
        id: "policy-updates",
        title: "Policy Updates",
        paragraphs: [
          "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or operational needs.",
          'We will notify you of material changes by posting the updated policy on this page with a revised "Last Updated" date. In some cases, we may provide additional notice via email or a prominent notice on our website.',
          "We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information. Your continued use of our website after changes are posted constitutes your acceptance of the updated policy.",
        ],
      },
      {
        id: "contact-information",
        title: "Contact Information",
        paragraphs: [
          "If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us. We value your privacy and will address your inquiries promptly.",
        ],
      },
    ],
  },
  services: {
    softwareDevelopment: {
      title: "Custom Software Development in Rwanda",
      description:
        "IshConnect builds scalable web applications, enterprise platforms, and SaaS products for startups and businesses across Africa. Our Kigali-based engineering team delivers production-ready software using modern architectures.",
      features: [
        "Web application development",
        "Enterprise software platforms",
        "SaaS product engineering",
        "API development & integration",
        "Legacy system modernization",
        "Cloud-native applications",
      ],
      ctaText: "Start a Project",
      ctaLink: "/contact",
      faqs: [
        {
          question: "What types of software does IshConnect develop?",
          answer:
            "We build web applications, enterprise platforms, SaaS products, RESTful APIs, and cloud-native applications using modern technologies like React, Node.js, Python, and Go.",
        },
        {
          question: "How long does custom software development take?",
          answer:
            "Timelines vary by complexity. A typical MVP takes 8-12 weeks, while larger enterprise platforms take 3-6 months. We deliver iteratively with weekly demos.",
        },
        {
          question: "Do you work with startups?",
          answer:
            "Yes, we specialize in working with startups and growing businesses across Africa. We offer flexible engagement models, including dedicated teams and project-based development.",
        },
      ],
    },
    webDevelopment: {
      title: "Web Development in Kigali, Rwanda",
      description:
        "IshConnect designs and develops modern websites, web applications, and e-commerce platforms. From corporate sites to complex portals, our team in Kigali delivers responsive, performant web solutions.",
      features: [
        "Custom website development",
        "Single-page applications (SPA)",
        "E-commerce platforms",
        "Content management systems",
        "Progressive web apps (PWA)",
        "Website maintenance & support",
      ],
      ctaText: "Start a Project",
      ctaLink: "/contact",
      faqs: [
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
      ],
    },
    mobileApps: {
      title: "Mobile App Development in Rwanda",
      description:
        "IshConnect builds iOS and Android mobile applications using React Native and Flutter. Our Kigali-based developers create native-quality apps for startups, enterprises, and organizations across Africa.",
      features: [
        "iOS app development",
        "Android app development",
        "Cross-platform apps (React Native)",
        "Cross-platform apps (Flutter)",
        "App UI/UX design",
        "App store deployment & maintenance",
      ],
      ctaText: "Start a Project",
      ctaLink: "/contact",
      faqs: [
        {
          question: "Which platform do you develop for — iOS, Android, or both?",
          answer:
            "We develop for both platforms simultaneously using React Native or Flutter, ensuring native performance and look-and-feel on iOS and Android from a single codebase.",
        },
        {
          question: "How long does it take to build a mobile app?",
          answer:
            "A production-ready MVP typically takes 10-14 weeks. The timeline depends on complexity, third-party integrations, and platform-specific requirements.",
        },
        {
          question: "Do you help with app store submission?",
          answer:
            "Yes, we handle the entire app store submission process for both Apple App Store and Google Play Store, including preparing assets, metadata, and compliance requirements.",
        },
      ],
    },
    aiSolutions: {
      title: "AI Solutions in Rwanda",
      description:
        "IshConnect delivers artificial intelligence and machine learning solutions for African businesses. Our Kigali team builds intelligent automation, predictive analytics, NLP, and computer vision systems.",
      features: [
        "Machine learning model development",
        "Natural language processing (NLP)",
        "Computer vision solutions",
        "Predictive analytics",
        "Intelligent process automation",
        "AI consulting & strategy",
      ],
      ctaText: "Start a Project",
      ctaLink: "/contact",
      faqs: [
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
      ],
    },
    cybersecurity: {
      title: "Cybersecurity Services in Rwanda",
      description:
        "IshConnect provides comprehensive cybersecurity services to protect your business. Our Kigali-based security team offers penetration testing, security audits, threat monitoring, and compliance solutions.",
      features: [
        "Penetration testing",
        "Security audits & assessments",
        "Threat monitoring & response",
        "Compliance & governance",
        "Zero-trust architecture",
        "Security awareness training",
      ],
      ctaText: "Start a Project",
      ctaLink: "/contact",
      faqs: [
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
      ],
    },
    cloudServices: {
      title: "Cloud Services in Rwanda",
      description:
        "IshConnect offers cloud infrastructure and DevOps services to help businesses scale. From cloud migration to serverless architecture, our Kigali team ensures reliable and cost-effective cloud operations.",
      features: [
        "Cloud migration & strategy",
        "Serverless architecture",
        "CI/CD pipeline setup",
        "Infrastructure as code",
        "Cloud cost optimization",
        "Managed cloud services",
      ],
      ctaText: "Start a Project",
      ctaLink: "/contact",
      faqs: [
        {
          question: "Which cloud providers do you work with?",
          answer:
            "We work with AWS, Google Cloud Platform (GCP), Microsoft Azure, and DigitalOcean. We recommend the best provider based on your workload, budget, and geographic requirements.",
        },
        {
          question: "How do you handle cloud migration?",
          answer:
            "We follow a phased approach: assessment and planning, proof of concept, data migration, application migration, and optimization. We minimize downtime with a detailed rollback plan.",
        },
        {
          question: "Can you reduce our cloud costs?",
          answer:
            "Yes. We conduct a thorough cost analysis, right-size resources, implement auto-scaling, use reserved instances, and remove unused assets — typically reducing costs by 20-40%.",
        },
      ],
    },
    techTraining: {
      title: "Tech Training & Coding Bootcamps in Rwanda",
      description:
        "IshConnect Academy offers industry-led tech training programs and coding bootcamps in Kigali, Rwanda. Learn full stack development, AI, cybersecurity, cloud computing, and UI/UX design from experienced engineers.",
      features: [
        "Full stack web development",
        "Python & AI programming",
        "Cybersecurity fundamentals",
        "Cloud & DevOps training",
        "Mobile app development",
        "UI/UX design bootcamp",
      ],
      ctaText: "Start a Project",
      ctaLink: "/contact",
      faqs: [
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
      ],
    },
  },
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function mergeValue<T>(base: T, override: unknown): T {
  if (override === undefined || override === null) return base;
  if (Array.isArray(base)) return (Array.isArray(override) ? override : base) as T;
  if (isRecord(base) && isRecord(override)) {
    const result: Record<string, unknown> = { ...base };
    for (const [key, value] of Object.entries(override)) {
      result[key] = key in base ? mergeValue(base[key], value) : value;
    }
    return result as T;
  }
  return override as T;
}

export function mergeSiteContent(override?: unknown): SiteContent {
  return mergeValue(DEFAULT_SITE_CONTENT, override);
}
