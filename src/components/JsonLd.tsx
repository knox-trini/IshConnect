import { Helmet } from "react-helmet-async";
import { SITE_NAME, SITE_ALTERNATE_NAMES, SITE_LEGAL_NAME, SITE_URL } from "@/lib/seo";
import type { Program } from "@/lib/programs";
import type { Project } from "@/lib/projects";

function SchemaScript({ schema }: { schema: Record<string, unknown> }) {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: SITE_NAME,
    alternateName: SITE_ALTERNATE_NAMES,
    legalName: SITE_LEGAL_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.png`,
    description:
      "IshConnect delivers world-class software solutions, AI training, and technology education designed for the future of Africa. Home of DevQueens.",
    foundingDate: "2020",
    founders: [
      {
        "@type": "Person",
        name: "Ishimwe J. Claude",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "KG 11 Ave",
      addressLocality: "Kigali",
      addressCountry: "RW",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "ishconnlab@gmail.com",
        telephone: "+250787377750",
        url: `${SITE_URL}/contact`,
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        url: `${SITE_URL}/contact`,
      },
      {
        "@type": "ContactPoint",
        contactType: "enrollment",
        url: `${SITE_URL}/academy`,
      },
    ],
    sameAs: [
      "https://x.com/IConnlab",
      "https://www.linkedin.com/in/ishconnlab",
      "https://github.com/ishconnlab",
      "https://www.instagram.com/ish.connect",
      "https://www.ishconnect.rw",
    ],
    knowsAbout: [
      "Software Development",
      "Web Development",
      "AI and Machine Learning",
      "Cybersecurity",
      "Cloud Computing",
      "Mobile App Development",
      "UI/UX Design",
      "Technology Training",
      "Digital Transformation",
      "Website Maintenance",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "IshConnect Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Software Development",
            url: `${SITE_URL}/software-development-rwanda`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Development",
            url: `${SITE_URL}/web-development-kigali`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "WebCare",
            url: `${SITE_URL}/webcare`,
          },
        },
      ],
    },
  };

  return <SchemaScript schema={schema} />;
}

export function SiteNavigationElementJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "@id": `${SITE_URL}#sitenavigation`,
    name: [
      "Home",
      "Services",
      "Work",
      "Academy",
      "About",
      "Contact",
      "Founder",
      "Team",
      "WebCare",
      "Community",
    ],
    url: [
      `${SITE_URL}/`,
      `${SITE_URL}/solutions`,
      `${SITE_URL}/work`,
      `${SITE_URL}/academy`,
      `${SITE_URL}/about`,
      `${SITE_URL}/contact`,
      `${SITE_URL}/founder`,
      `${SITE_URL}/team`,
      `${SITE_URL}/webcare`,
      `${SITE_URL}/community`,
    ],
  };

  return <SchemaScript schema={schema} />;
}

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    name: SITE_NAME,
    alternateName: SITE_ALTERNATE_NAMES,
    url: SITE_URL,
    description:
      "Software solutions, AI training, and technology education for the future of Africa by IshConnect.",
    publisher: {
      "@id": `${SITE_URL}#organization`,
    },
    inLanguage: "en-RW",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Technology Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Software Development",
            url: `${SITE_URL}/software-development-rwanda`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Development",
            url: `${SITE_URL}/web-development-kigali`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mobile App Development",
            url: `${SITE_URL}/mobile-app-development-rwanda`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Solutions",
            url: `${SITE_URL}/ai-solutions-rwanda`,
          },
        },
      ],
    },
  };

  return <SchemaScript schema={schema} />;
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}${items[items.length - 1]?.url || "/"}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };

  return <SchemaScript schema={schema} />;
}

export function CourseJsonLd({ program }: { program: Program }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: program.title,
    description: program.summary,
    provider: {
      "@id": `${SITE_URL}#organization`,
    },
    timeRequired: program.duration,
    offers: {
      "@type": "Offer",
      category: "Paid",
      availability: "http://schema.org/InStock",
      url: `${SITE_URL}/academy#${program.slug}`,
    },
    teaches: program.tags.join(", "),
    educationalCredentialAwarded: "Certificate of Completion",
  };

  return <SchemaScript schema={schema} />;
}

export function ServiceJsonLd({ name, description }: { name: string; description: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@id": `${SITE_URL}#organization`,
    },
    areaServed: [
      {
        "@type": "Country",
        name: "RW",
      },
      {
        "@type": "Continent",
        name: "Africa",
      },
    ],
    serviceType: name,
    audience: {
      "@type": "BusinessAudience",
      geographicArea: {
        "@type": "AdministrativeArea",
        name: "Rwanda",
      },
    },
    offers: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        price: "Custom",
        description: "Custom pricing based on project scope — free consultation available",
      },
      availability: "http://schema.org/InStock",
    },
    category: "Technology Services",
  };

  return <SchemaScript schema={schema} />;
}

export function FaqJsonLd({ questions }: { questions: { question: string; answer: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}#faq`,
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return <SchemaScript schema={schema} />;
}

export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${SITE_URL}#localbusiness`,
    name: SITE_NAME,
    alternateName: SITE_ALTERNATE_NAMES,
    legalName: SITE_LEGAL_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.png`,
    image: `${SITE_URL}/og-image.png`,
    description:
      "IshConnect is a Kigali-based technology studio specializing in software development, AI training, and tech education in Rwanda.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kigali",
      addressCountry: "RW",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -1.9441,
      longitude: 30.0619,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    telephone: "+250787377750",
    email: "ishconnlab@gmail.com",
    areaServed: ["RW", "Africa"],
  };

  return <SchemaScript schema={schema} />;
}

export function CreativeWorkJsonLd({ project }: { project: Project }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${SITE_URL}/work/${project.slug}#creativework`,
    name: project.title,
    description: project.description,
    abstract: project.heroSummary,
    keywords: project.seoKeywords.join(", "),
    author: {
      "@id": `${SITE_URL}#organization`,
    },
    provider: {
      "@id": `${SITE_URL}#organization`,
    },
    dateCreated: "2020",
    datePublished: "2020",
    educationalUse: "Case Study",
    teaches: project.tech.join(", "),
    about: {
      "@type": "Thing",
      name: project.category,
    },
  };

  return <SchemaScript schema={schema} />;
}

export function ItemListJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/work#itemlist`,
    name: "IshConnect Portfolio",
    description: "Case studies and projects by IshConnect in Kigali, Rwanda",
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: `${SITE_URL}${item.url}`,
    })),
  };

  return <SchemaScript schema={schema} />;
}

export function ProjectJsonLd({ project }: { project: Project }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Project",
    "@id": `${SITE_URL}/work/${project.slug}#project`,
    name: project.title,
    description: project.description,
    url: `${SITE_URL}/work/${project.slug}`,
    image: project.image,
    provider: {
      "@id": `${SITE_URL}#organization`,
    },
    category: project.category,
    keywords: project.seoKeywords.join(", "),
    status: "Completed",
  };

  return <SchemaScript schema={schema} />;
}
