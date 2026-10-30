import greenAfricaImg from "@/assets/projects/green-africa.png";
import healGuardImg from "@/assets/projects/healguard.png";
import agriLinkImg from "@/assets/projects/agrilink.png";
import logisticsImg from "@/assets/projects/logistics.png";
import foodieImg from "@/assets/projects/foodie.png";

export type ProjectSlug = string;

interface FaqItem {
  question: string;
  answer: string;
}

interface StatItem {
  value: string;
  label: string;
}

interface TimelineItem {
  phase: string;
  title: string;
  description: string;
}

export interface Project {
  slug: ProjectSlug;
  title: string;
  category: string;
  description: string;
  tech: string[];
  accent: string;
  image: string;
  heroSummary: string;
  client: string;
  problem: string;
  solution: string;
  features: string[];
  workflow: string;
  uiDecisions: string;
  challenges: string;
  results: string;
  impact: string;
  stats: StatItem[];
  timeline: TimelineItem[];
  faqs: FaqItem[];
  liveUrl?: string;
  repoUrl?: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: "green-africa-dashboard",
    title: "GreenAfrica Dashboard",
    category: "Sustainability · Analytics",
    description:
      "A real-time carbon and ESG monitoring platform powering green initiatives across 7 African markets.",
    tech: ["React", "Node", "PostgreSQL", "D3"],
    accent: "from-emerald-200/60 via-primary/10 to-transparent",
    image: greenAfricaImg,
    heroSummary:
      "A comprehensive ESG and carbon monitoring dashboard built by IshConnect that tracks environmental impact across 7 African markets in real time.",
    client:
      "GreenAfrica is a sustainability-focused NGO operating across East and West Africa, requiring a centralized platform to monitor carbon emissions, ESG compliance, and green initiative metrics.",
    problem:
      "The client relied on fragmented spreadsheets and manual reporting across 7 countries, making it impossible to get real-time visibility into their environmental impact. Data inconsistencies and delayed reporting hindered their ability to make timely decisions and report to stakeholders.",
    solution:
      "IshConnect built a unified real-time dashboard aggregating data from multiple sources — IoT sensors, manual inputs, and third-party APIs — into a single pane of glass with interactive visualizations, automated reporting, and alerting.",
    features: [
      "Real-time carbon emission tracking with live data feeds",
      "ESG compliance scorecards for each operating market",
      "Interactive D3-based charts and geospatial visualizations",
      "Automated monthly sustainability report generation",
      "Alert system for emission threshold breaches",
      "Multi-user role-based access control",
      "Data export to PDF, Excel, and CSV formats",
    ],
    workflow:
      "The project followed IshConnect's agile development methodology: discovery workshops, UX prototyping, iterative sprint-based development with bi-weekly stakeholder reviews, and a phased rollout across markets.",
    uiDecisions:
      "We chose a clean, data-dense dashboard design with an emerald-green color palette reinforcing the sustainability theme. Charts use consistent color encoding across all views, and the layout prioritizes KPI visibility above the fold with drill-down capability.",
    challenges:
      "Integrating heterogeneous data sources with different formats and update frequencies across 7 countries required building a robust ETL pipeline with data validation and normalization layers.",
    results:
      "The platform reduced reporting time by 85%, improved data accuracy to 99.7%, and enabled the client to secure additional funding by providing transparent, auditable impact metrics to donors.",
    impact:
      "The dashboard now serves as the primary decision-making tool for the client's executive team, tracking over 1,200 sustainability metrics across 7 countries with 99.9% uptime.",
    stats: [
      { value: "85%", label: "Faster reporting" },
      { value: "7", label: "African markets" },
      { value: "99.7%", label: "Data accuracy" },
      { value: "1,200+", label: "Metrics tracked" },
    ],
    timeline: [
      {
        phase: "Discovery",
        title: "Requirements & Research",
        description:
          "Stakeholder interviews across 7 countries, data source audit, and technical feasibility study.",
      },
      {
        phase: "Design",
        title: "UX & Dashboard Prototyping",
        description:
          "Wireframes, interactive prototypes, and data visualization design with stakeholder feedback cycles.",
      },
      {
        phase: "Development",
        title: "Platform Engineering",
        description:
          "ETL pipeline, backend API, real-time data processing, and frontend dashboard implementation.",
      },
      {
        phase: "Deployment",
        title: "Phased Rollout",
        description: "Staged deployment across markets with training, documentation, and handover.",
      },
    ],
    faqs: [
      {
        question: "Why was React chosen for this project?",
        answer:
          "React was chosen for its component reusability, excellent ecosystem for data visualization (D3.js integration), and strong performance with real-time data updates. It allowed us to build a complex, interactive dashboard that remains fast and responsive across devices.",
      },
      {
        question: "How was SEO optimized for this dashboard?",
        answer:
          "As a private dashboard, SEO focused on the public-facing landing page and documentation. We implemented semantic HTML, structured data markup, optimized meta tags, and server-side rendering for public content using Next.js.",
      },
      {
        question: "Is the project mobile responsive?",
        answer:
          "Yes. The dashboard is fully responsive with a mobile-first design approach. Charts gracefully resize, navigation collapses into a hamburger menu, and critical KPIs remain accessible on all screen sizes down to 320px width.",
      },
      {
        question: "What technologies were used?",
        answer:
          "React for the frontend, Node.js with Express for the API layer, PostgreSQL for data storage, D3.js for custom visualizations, and a Python-based ETL pipeline for data ingestion from diverse sources.",
      },
      {
        question: "How was performance optimized?",
        answer:
          "We implemented lazy loading for chart components, virtualized data tables for large datasets, debounced real-time updates, optimized bundle size with code splitting, and used Redis caching for frequently accessed data.",
      },
      {
        question: "How long did development take?",
        answer:
          "The project was delivered in 14 weeks across 4 sprints, including discovery, design, development, testing, and phased deployment across all 7 markets.",
      },
    ],
    repoUrl: "",
    seoTitle: "GreenAfrica Dashboard — ESG & Carbon Monitoring by IshConnect Rwanda",
    seoDescription:
      "Case study of GreenAfrica Dashboard, a real-time ESG and carbon monitoring platform built by IshConnect for 7 African markets. React, D3, and sustainability analytics project by IshConnect Rwanda.",
    seoKeywords: [
      "IshConnect projects",
      "React developer Rwanda",
      "software development Rwanda",
      "ESG dashboard Africa",
      "carbon monitoring platform",
      "sustainability tech Rwanda",
      "data visualization Africa",
      "IshConnect projects",
    ],
  },
  {
    slug: "healguard-ai",
    title: "HealGuard AI",
    category: "Healthcare · AI",
    description:
      "AI-assisted triage and diagnostics aiding under-served clinics with 92% screening accuracy.",
    tech: ["Python", "PyTorch", "FastAPI", "Next.js"],
    accent: "from-sky-200/60 via-primary/10 to-transparent",
    image: healGuardImg,
    heroSummary:
      "An AI-powered healthcare platform that assists under-served clinics with triage, diagnostics, and patient management, achieving 92% screening accuracy.",
    client:
      "A network of community health clinics across East Africa serving remote populations with limited access to specialist doctors.",
    problem:
      "Clinics faced critical shortages of trained medical personnel. Patients waited weeks for diagnoses, and many conditions went undetected until advanced stages. The existing paper-based system made it impossible to track patient outcomes or identify disease patterns.",
    solution:
      "IshConnect developed an AI-assisted triage and diagnostic support platform that captures patient symptoms, runs AI-powered preliminary screenings, and provides clinical decision support to nurses and community health workers.",
    features: [
      "AI-powered symptom checker with 92% diagnostic accuracy",
      "Patient queue management and triage prioritization",
      "Electronic health records with offline support",
      "Medication interaction checker",
      "Automated referral system for specialist care",
      "Analytics dashboard for disease pattern tracking",
      "SMS-based appointment reminders and health tips",
    ],
    workflow:
      "IshConnect's team of AI engineers and healthcare domain experts collaborated through an agile process: data collection and model training, HIPAA-compliant infrastructure setup, iterative clinical validation, and phased clinic rollout.",
    uiDecisions:
      "Designed for low-literacy environments with large icons, voice-guided navigation in local languages, high-contrast color schemes, and minimal text. The interface uses a sky-blue palette to evoke trust and calmness.",
    challenges:
      "Training accurate AI models with limited local healthcare data required synthetic data augmentation and transfer learning from global medical datasets, followed by rigorous validation with local clinicians.",
    results:
      "Screening accuracy reached 92% within 6 months. Patient wait times decreased by 65%, and early detection of priority conditions increased by 78% across the clinic network.",
    impact:
      "Over 50,000 patients have been screened through HealGuard AI, with the platform now deployed across 12 clinics in Rwanda and Kenya, significantly reducing the burden on overstretched healthcare systems.",
    stats: [
      { value: "92%", label: "Screening accuracy" },
      { value: "65%", label: "Less wait time" },
      { value: "50K+", label: "Patients screened" },
      { value: "12", label: "Clinics deployed" },
    ],
    timeline: [
      {
        phase: "Research",
        title: "Clinical Data & Model Training",
        description:
          "Data collection from partner clinics, model architecture selection, and initial training with synthetic data augmentation.",
      },
      {
        phase: "Validation",
        title: "Clinical Validation",
        description:
          "Rigorous testing with local clinicians, model refinement, and regulatory compliance review.",
      },
      {
        phase: "Build",
        title: "Platform Development",
        description:
          "Full-stack application development, offline-first architecture, and integration with clinic workflows.",
      },
      {
        phase: "Scale",
        title: "Clinic Deployment",
        description:
          "Phased rollout across 12 clinics with training, monitoring, and continuous model improvement.",
      },
    ],
    faqs: [
      {
        question: "Why was React chosen for this project?",
        answer:
          "React was chosen for the frontend of the clinic management interface due to its component reusability, excellent form handling, and ability to work offline using service workers — critical for clinics with unreliable internet connectivity.",
      },
      {
        question: "How was SEO optimized for HealGuard AI?",
        answer:
          "For the public-facing website, we implemented comprehensive SEO: semantic HTML, OpenGraph tags, structured data (HealthcareBusiness schema), optimized meta titles/descriptions targeting healthcare AI keywords, and a sitemap for search engine indexing.",
      },
      {
        question: "Is the project mobile responsive?",
        answer:
          "Yes. The platform uses a responsive design that works on low-end Android devices common in rural clinics. The offline-first architecture ensures full functionality even without internet connectivity.",
      },
      {
        question: "What technologies were used?",
        answer:
          "Python with PyTorch for the AI model, FastAPI for the inference API, Next.js for the public website, React Native for the mobile health worker app, and PostgreSQL for patient data storage with HIPAA-compliant encryption.",
      },
      {
        question: "How was performance optimized?",
        answer:
          "We optimized the AI model for edge inference using quantization and pruning, implemented lazy loading for the React frontend, used CDN caching for static assets, and optimized database queries with proper indexing and connection pooling.",
      },
      {
        question: "How long did development take?",
        answer:
          "The full project from research to initial deployment took 9 months, with the core platform built in 5 months and the remaining time spent on clinical validation and regulatory compliance.",
      },
    ],
    repoUrl: "",
    seoTitle: "HealGuard AI — AI Healthcare Platform by IshConnect Rwanda",
    seoDescription:
      "Case study of HealGuard AI, an AI-powered healthcare platform built by IshConnect for East African clinics. Python, PyTorch, and AI development project by IshConnect Rwanda.",
    seoKeywords: [
      "IshConnect projects",
      "AI development Rwanda",
      "software development Rwanda",
      "healthcare AI Africa",
      "medical diagnostics platform",
      "IshConnect AI projects",
      "React developer Rwanda",
      "machine learning Africa",
    ],
  },
  {
    slug: "agrilink-rwanda",
    title: "AgriLink Rwanda",
    category: "AgriTech · Marketplace",
    description:
      "Connecting 12,000+ smallholder farmers with buyers, finance, and weather intelligence.",
    tech: ["Flutter", "Supabase", "Mapbox"],
    accent: "from-lime-200/60 via-primary/10 to-transparent",
    image: agriLinkImg,
    heroSummary:
      "A mobile-first marketplace connecting 12,000+ smallholder farmers in Rwanda with buyers, financial services, and real-time weather intelligence.",
    client:
      "A Rwandan agricultural cooperative seeking to digitize the farm-to-market value chain for smallholder farmers across the country.",
    problem:
      "Smallholder farmers lacked access to fair markets, often forced to sell through intermediaries at low prices. They also had no access to affordable financing or accurate weather data to optimize planting and harvesting decisions.",
    solution:
      "IshConnect built a mobile-first platform with a marketplace for direct farmer-to-buyer connections, integrated micro-financing, and AI-powered weather and crop advisory services.",
    features: [
      "Direct marketplace connecting farmers with verified buyers",
      "Micro-financing integration with partner banks and fintechs",
      "AI-powered weather forecasting and crop advisory",
      "Supply chain traceability from farm to table",
      "Group buying for bulk discounts on inputs",
      "Real-time market price intelligence",
      "Multi-language support (Kinyarwanda, English, French)",
    ],
    workflow:
      "IshConnect conducted extensive field research with farmers in 5 districts, followed by iterative prototyping, usability testing with low-literacy users, and phased rollout starting with pilot districts.",
    uiDecisions:
      "Designed for simple feature phones and low-end Android devices. Large touch targets, voice-assisted navigation in Kinyarwanda, icon-based menus, and offline-first data sync using Supabase's real-time capabilities.",
    challenges:
      "Building a robust offline-first experience for areas with limited connectivity, integrating with multiple mobile money platforms for payments, and designing an intuitive interface for users with varying digital literacy levels.",
    results:
      "Over 12,000 farmers registered in the first year. Average farmer income increased by 40% through direct market access. Loan repayment rates reached 95% through integrated micro-financing.",
    impact:
      "AgriLink has become one of Rwanda's most impactful agritech platforms, recognized by the Ministry of Agriculture and featured at the Rwanda Innovation Summit.",
    stats: [
      { value: "12K+", label: "Farmers connected" },
      { value: "40%", label: "Income increase" },
      { value: "95%", label: "Loan repayment" },
      { value: "5", label: "Districts active" },
    ],
    timeline: [
      {
        phase: "Research",
        title: "Field Research",
        description:
          "On-ground research with farmers across 5 districts, understanding workflows, pain points, and digital literacy levels.",
      },
      {
        phase: "Design",
        title: "User-Centered Design",
        description:
          "Prototyping and usability testing with target users, iterating on the interface for low-literacy accessibility.",
      },
      {
        phase: "Build",
        title: "Platform Development",
        description:
          "Flutter mobile app, Supabase backend, Mapbox integration, and mobile money payment gateway.",
      },
      {
        phase: "Launch",
        title: "Pilot & Scale",
        description:
          "Pilot launch in 2 districts, farmer training, feedback incorporation, then national scaling.",
      },
    ],
    faqs: [
      {
        question: "Why was Flutter chosen for this project?",
        answer:
          "Flutter was selected for its excellent cross-platform performance, ability to deliver native-quality UI on low-end Android devices, fast development cycles, and strong offline-first capabilities critical for rural areas with limited connectivity.",
      },
      {
        question: "How was SEO optimized for AgriLink?",
        answer:
          "For the public web presence, we implemented comprehensive SEO: structured data with AgriculturalOrganization schema, localized meta tags in Kinyarwanda and English, optimized for agritech and Rwanda-focused keywords, and a sitemap for search engine discoverability.",
      },
      {
        question: "Is the project mobile responsive?",
        answer:
          "The primary interface is a mobile app optimized for low-end Android devices. The companion web dashboard for administrators is fully responsive with a mobile-first design approach.",
      },
      {
        question: "What technologies were used?",
        answer:
          "Flutter for the mobile app, Supabase for backend and real-time database, Mapbox for geospatial features, and integrated mobile money APIs for payments. The admin dashboard uses React and TailwindCSS.",
      },
      {
        question: "How was performance optimized?",
        answer:
          "We implemented aggressive caching for offline use, optimized image loading with progressive resolution, minimized app bundle size through tree-shaking, and used Supabase's real-time subscriptions for instant data sync when connectivity is available.",
      },
      {
        question: "How long did development take?",
        answer:
          "The project was delivered in 16 weeks, including field research, design, development, pilot testing, and the initial rollout phase.",
      },
    ],
    repoUrl: "",
    seoTitle: "AgriLink Rwanda — AgriTech Marketplace by IshConnect",
    seoDescription:
      "Case study of AgriLink Rwanda, a mobile-first agritech marketplace connecting 12,000+ farmers with buyers and financing. Built by IshConnect using Flutter and Supabase.",
    seoKeywords: [
      "IshConnect projects",
      "software development Rwanda",
      "agritech Rwanda",
      "Flutter development Africa",
      "IshConnect agritech",
      "web development Kigali",
      "mobile app development Rwanda",
      "tech innovation Kigali",
    ],
  },
  {
    slug: "logistics-command-center",
    title: "Logistics Command Center",
    category: "Operations · Real-time",
    description:
      "Fleet & route orchestration cutting last-mile delivery costs by 31% for a regional logistics leader.",
    tech: ["TypeScript", "Kafka", "Redis", "Mapbox"],
    accent: "from-orange-200/60 via-primary/10 to-transparent",
    image: logisticsImg,
    heroSummary:
      "A real-time fleet management and route optimization platform that reduced last-mile delivery costs by 31% for a regional logistics leader in East Africa.",
    client:
      "A leading logistics and courier company operating across Rwanda, Kenya, and Uganda with a fleet of 500+ delivery vehicles.",
    problem:
      "The client struggled with inefficient route planning, high fuel costs, missed delivery windows, and lack of real-time visibility into fleet operations. Dispatch was managed by phone and whiteboards.",
    solution:
      "IshConnect built a real-time command center platform with intelligent route optimization, live fleet tracking, predictive ETAs, and automated dispatch — all accessible via a web dashboard and mobile apps for drivers.",
    features: [
      "Real-time GPS fleet tracking with 5-second update intervals",
      "AI-powered route optimization reducing mileage by 28%",
      "Predictive ETA with traffic and weather awareness",
      "Automated dispatch and load balancing across fleet",
      "Driver performance analytics and scorecards",
      "Proof of delivery with photo capture and digital signature",
      "Customer-facing tracking portal with live updates",
    ],
    workflow:
      "IshConnect followed a phased agile approach: logistics process audit, MVP with core tracking, iterative feature additions based on driver and dispatcher feedback, and full rollout across the fleet.",
    uiDecisions:
      "Designed for high-stress operations environments — a dark-themed command center interface with color-coded status indicators, map-centric layout, and keyboard shortcuts for power users.",
    challenges:
      "Handling real-time data streams from 500+ vehicles with varying GPS hardware required building a robust event-driven architecture using Kafka for message queuing and Redis for real-time state management.",
    results:
      "Last-mile delivery costs reduced by 31%. On-time delivery rate improved from 72% to 94%. Fleet utilization increased by 25%, and customer satisfaction scores rose by 40%.",
    impact:
      "The command center now handles over 15,000 deliveries per month across 3 countries, making it one of East Africa's most advanced logistics technology platforms.",
    stats: [
      { value: "31%", label: "Cost reduction" },
      { value: "94%", label: "On-time delivery" },
      { value: "500+", label: "Vehicles tracked" },
      { value: "15K/mo", label: "Deliveries handled" },
    ],
    timeline: [
      {
        phase: "Audit",
        title: "Process Audit",
        description:
          "Comprehensive audit of existing logistics workflows, fleet operations, and pain points across 3 countries.",
      },
      {
        phase: "MVP",
        title: "Core Tracking MVP",
        description:
          "Real-time GPS tracking, basic dispatch dashboard, and driver mobile app delivered in 6 weeks.",
      },
      {
        phase: "Optimize",
        title: "Route Optimization",
        description:
          "AI-powered route optimization, predictive ETAs, and automated load balancing.",
      },
      {
        phase: "Scale",
        title: "Full Deployment",
        description:
          "Rollout across entire fleet, customer tracking portal, and continuous optimization.",
      },
    ],
    faqs: [
      {
        question: "Why was TypeScript chosen for this project?",
        answer:
          "TypeScript was chosen for the entire codebase to ensure type safety across the complex real-time data flows. The strong typing prevented common runtime errors in production and made the large codebase more maintainable across multiple development teams.",
      },
      {
        question: "How was SEO optimized for this platform?",
        answer:
          "The public-facing website and customer tracking portal were SEO-optimized with structured data (LocalBusiness schema for logistics), optimized meta tags targeting logistics technology keywords, and server-side rendering for fast initial page loads and better search indexing.",
      },
      {
        question: "Is the project mobile responsive?",
        answer:
          "The command center dashboard is designed for desktop use. The driver mobile app and customer tracking portal are fully responsive and optimized for mobile devices.",
      },
      {
        question: "What technologies were used?",
        answer:
          "TypeScript with Node.js for the backend, Kafka for real-time event streaming, Redis for state management and caching, Mapbox for geospatial features, React for the web dashboard, and React Native for the driver mobile app.",
      },
      {
        question: "How was performance optimized?",
        answer:
          "We implemented WebSocket-based real-time updates instead of polling, optimized map rendering with viewport-based marker clustering, used Redis caching for frequently accessed route data, and implemented database read replicas for analytics queries.",
      },
      {
        question: "How long did development take?",
        answer:
          "The core MVP was delivered in 6 weeks, with the complete platform including route optimization and customer portal delivered in 18 weeks.",
      },
    ],
    repoUrl: "",
    seoTitle: "Logistics Command Center — Fleet Management by IshConnect Rwanda",
    seoDescription:
      "Case study of a real-time logistics command center built by IshConnect. Fleet management, route optimization, and delivery tracking platform reducing costs by 31% in East Africa.",
    seoKeywords: [
      "IshConnect projects",
      "software development Kigali",
      "logistics tech Africa",
      "fleet management Rwanda",
      "IshConnect projects",
      "React developer Rwanda",
      "TypeScript development",
      "tech innovation Kigali",
    ],
  },
  {
    slug: "foodieapp",
    title: "FoodieApp",
    category: "Consumer · Marketplace",
    description:
      "A delightful food discovery & ordering experience reaching 150k MAU within its first year.",
    tech: ["React Native", "Stripe", "Algolia"],
    accent: "from-rose-200/60 via-primary/10 to-transparent",
    image: foodieImg,
    heroSummary:
      "A mobile-first food discovery and ordering platform that reached 150,000 monthly active users within its first year of launch in Kigali, Rwanda.",
    client:
      "A Rwandan food-tech startup aiming to revolutionize food discovery and delivery in Kigali by connecting users with local restaurants, cafes, and food vendors.",
    problem:
      "Kigali's food scene was vibrant but fragmented. Users had no single platform to discover restaurants, browse menus, read reviews, or order delivery. Restaurants lacked a digital presence and delivery infrastructure.",
    solution:
      "IshConnect designed and built a full-featured food marketplace app with intelligent restaurant discovery, real-time order tracking, integrated payment processing, and a comprehensive restaurant management dashboard.",
    features: [
      "Personalized restaurant discovery with AI recommendations",
      "Real-time order tracking with live driver location",
      "Integrated payment via card, mobile money, and cash",
      "Restaurant management dashboard with analytics",
      "Review and rating system with photo uploads",
      "Smart search with Algolia-powered instant results",
      "Push notifications for order status and promotions",
    ],
    workflow:
      "IshConnect's team worked through a rapid MVP approach: market validation, design sprint, MVP build with core ordering functionality, then continuous feature releases based on user data and feedback.",
    uiDecisions:
      "A visually rich, appetite-inspiring design with full-bleed food photography, smooth animations, and a rose-inspired color palette. The interface prioritizes visual discovery with category-based browsing and personalized recommendations.",
    challenges:
      "Building a reliable real-time order tracking system and integrating with multiple payment providers while maintaining a seamless user experience required careful state management and resilient API design.",
    results:
      "150,000 MAU within 12 months. 2,500+ daily orders. 300+ restaurants onboarded. Average app rating of 4.8 stars on both iOS and Android stores.",
    impact:
      "FoodieApp has become Kigali's most popular food delivery platform, creating digital livelihoods for 300+ restaurants and 500+ delivery riders, and transforming how Kigali residents discover and enjoy food.",
    stats: [
      { value: "150K", label: "Monthly active users" },
      { value: "2.5K/day", label: "Daily orders" },
      { value: "300+", label: "Restaurants onboarded" },
      { value: "4.8★", label: "App store rating" },
    ],
    timeline: [
      {
        phase: "Validate",
        title: "Market Validation",
        description:
          "User research, competitive analysis, and concept testing with Kigali food enthusiasts.",
      },
      {
        phase: "MVP",
        title: "MVP Launch",
        description:
          "Core ordering experience, 50 restaurant partners, and manual delivery management.",
      },
      {
        phase: "Scale",
        title: "Growth & Features",
        description:
          "Real-time tracking, AI recommendations, restaurant dashboard, and payment integration.",
      },
      {
        phase: "Optimize",
        title: "Performance & Polish",
        description:
          "Performance optimization, UI polish, and expansion features for scaling to other cities.",
      },
    ],
    faqs: [
      {
        question: "Why was React Native chosen for this project?",
        answer:
          "React Native was chosen to deliver a native-quality experience on both iOS and Android from a single codebase. This reduced development time by 40% compared to building separate native apps, while still providing excellent performance for the smooth animations and real-time features the app required.",
      },
      {
        question: "How was SEO optimized for FoodieApp?",
        answer:
          "The public restaurant discovery website was SEO-optimized with structured data (Restaurant and FoodEstablishment schemas for each partner), localized content for Kigali food searches, optimized Google Business profile integration, and a comprehensive sitemap with individual restaurant pages.",
      },
      {
        question: "Is the project mobile responsive?",
        answer:
          "The primary experience is a native iOS and Android app. The restaurant management dashboard and consumer web preview are fully responsive web applications supporting all screen sizes.",
      },
      {
        question: "What technologies were used?",
        answer:
          "React Native for the mobile apps, Node.js with Express for the backend API, PostgreSQL for the database, Stripe for payment processing, Algolia for search, and WebSockets for real-time order tracking.",
      },
      {
        question: "How was performance optimized?",
        answer:
          "We implemented image lazy loading with progressive placeholders, optimized list rendering with FlatList, used React Navigation for smooth screen transitions, implemented background location updates for efficient driver tracking, and used Redis caching for restaurant menus and search results.",
      },
      {
        question: "How long did development take?",
        answer:
          "The initial MVP was built in 10 weeks. The full-featured platform with real-time tracking, AI recommendations, and restaurant dashboard was completed in 6 months of development.",
      },
    ],
    repoUrl: "",
    seoTitle: "FoodieApp — Food Delivery Platform by IshConnect Rwanda",
    seoDescription:
      "Case study of FoodieApp, a food discovery and delivery platform reaching 150K MAU in Kigali. Built by IshConnect using React Native, Stripe, and Algolia.",
    seoKeywords: [
      "IshConnect projects",
      "React developer Rwanda",
      "mobile app development Kigali",
      "food delivery platform Africa",
      "IshConnect projects",
      "software development Rwanda",
      "React Native development",
      "tech innovation Kigali",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getProjectSlugs(): ProjectSlug[] {
  return PROJECTS.map((p) => p.slug);
}
