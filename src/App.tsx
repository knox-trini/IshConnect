import { lazy, Suspense, useEffect, type ReactNode } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { usePageTracking } from "@/hooks/usePageTracking";
import { OrganizationJsonLd, WebSiteJsonLd, LocalBusinessJsonLd, SiteNavigationElementJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SEOHead } from "@/components/SEOHead";
import { PageLoader } from "@/components/PageLoader";
import { PAGE_SEO } from "@/lib/seo";
import { RootLayout } from "@/routes/__root";
import { NotFound } from "@/routes/not-found";

const Home = lazy(() => import("@/routes/index").then((m) => ({ default: m.Home })));
const About = lazy(() => import("@/routes/about").then((m) => ({ default: m.About })));
const Founder = lazy(() => import("@/routes/founder").then((m) => ({ default: m.Founder })));
const Team = lazy(() => import("@/routes/team").then((m) => ({ default: m.Team })));
const Academy = lazy(() => import("@/routes/academy").then((m) => ({ default: m.Academy })));
const Contact = lazy(() => import("@/routes/contact").then((m) => ({ default: m.Contact })));
const Solutions = lazy(() => import("@/routes/solutions").then((m) => ({ default: m.Solutions })));
const Work = lazy(() => import("@/routes/work").then((m) => ({ default: m.Work })));
const ProjectCaseStudy = lazy(() =>
  import("@/routes/project").then((m) => ({ default: m.ProjectCaseStudy })),
);
const Privacy = lazy(() => import("@/routes/privacy").then((m) => ({ default: m.Privacy })));
const SoftwareDevelopment = lazy(() =>
  import("@/routes/services/software-development").then((m) => ({
    default: m.SoftwareDevelopment,
  })),
);
const WebDevelopment = lazy(() =>
  import("@/routes/services/web-development").then((m) => ({ default: m.WebDevelopment })),
);
const MobileApps = lazy(() =>
  import("@/routes/services/mobile-apps").then((m) => ({ default: m.MobileApps })),
);
const AiSolutions = lazy(() =>
  import("@/routes/services/ai-solutions").then((m) => ({ default: m.AiSolutions })),
);
const Cybersecurity = lazy(() =>
  import("@/routes/services/cybersecurity").then((m) => ({ default: m.Cybersecurity })),
);
const CloudServices = lazy(() =>
  import("@/routes/services/cloud").then((m) => ({ default: m.CloudServices })),
);
const TechTraining = lazy(() =>
  import("@/routes/services/tech-training").then((m) => ({ default: m.TechTraining })),
);
const Challenges = lazy(() =>
  import("@/routes/challenges").then((m) => ({ default: m.Challenges })),
);
const Testimonials = lazy(() =>
  import("@/routes/testimonials").then((m) => ({ default: m.Testimonials })),
);
const AdminLogin = lazy(() => import("@/routes/admin-login").then((m) => ({ default: m.AdminLogin })));
const AdminDashboard = lazy(() => import("@/routes/admin").then((m) => ({ default: m.AdminDashboard })));

function LoadingFallback() {
  return <PageLoader />;
}

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const },
};

function RoutePage({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <motion.div {...pageTransition}>{children}</motion.div>
    </ErrorBoundary>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  usePageTracking();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<RootLayout />}>
          <Route index element={<RoutePage><Home /></RoutePage>} />
          <Route path="about" element={<RoutePage><About /></RoutePage>} />
          <Route path="founder" element={<RoutePage><Founder /></RoutePage>} />
          <Route path="team" element={<RoutePage><Team /></RoutePage>} />
          <Route path="academy" element={<RoutePage><Academy /></RoutePage>} />
          <Route path="challenges" element={<RoutePage><Challenges /></RoutePage>} />
          <Route path="contact" element={<RoutePage><Contact /></RoutePage>} />
          <Route path="solutions" element={<RoutePage><Solutions /></RoutePage>} />
          <Route path="work" element={<RoutePage><Work /></RoutePage>} />
          <Route path="work/:slug" element={<RoutePage><ProjectCaseStudy /></RoutePage>} />
          <Route path="software-development-rwanda" element={<RoutePage><SoftwareDevelopment /></RoutePage>} />
          <Route path="web-development-kigali" element={<RoutePage><WebDevelopment /></RoutePage>} />
          <Route path="mobile-app-development-rwanda" element={<RoutePage><MobileApps /></RoutePage>} />
          <Route path="ai-solutions-rwanda" element={<RoutePage><AiSolutions /></RoutePage>} />
          <Route path="cybersecurity-rwanda" element={<RoutePage><Cybersecurity /></RoutePage>} />
          <Route path="cloud-services-rwanda" element={<RoutePage><CloudServices /></RoutePage>} />
          <Route path="tech-training-rwanda" element={<RoutePage><TechTraining /></RoutePage>} />
          <Route path="privacy" element={<RoutePage><Privacy /></RoutePage>} />
          <Route path="webcare" element={<RoutePage><WebCarePage /></RoutePage>} />
          <Route path="community" element={<RoutePage><CommunityPage /></RoutePage>} />
          <Route path="devqueens" element={<RoutePage><DevQueensPage /></RoutePage>} />
          <Route path="testimonials" element={<RoutePage><Testimonials /></RoutePage>} />
          <Route path="admin/login" element={<RoutePage><AdminLogin /></RoutePage>} />
          <Route path="admin" element={<RoutePage><AdminDashboard /></RoutePage>} />
          <Route path="*" element={<RoutePage><NotFound /></RoutePage>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function WebCarePage() {
  const config = PAGE_SEO.webcare;
  useEffect(() => {
    window.location.href = "https://webcare.ishconnect.rw/";
  }, []);
  return (
    <>
      <SEOHead {...config} />
      <BreadcrumbJsonLd items={config.breadcrumbs} />
      <LoadingFallback />
    </>
  );
}

function CommunityPage() {
  const config = PAGE_SEO.community;
  useEffect(() => {
    window.location.href = "https://chat.whatsapp.com/Kg6jU7XWt3JFiMnztbjK1Y?s=cl&p=a&ilr=0";
  }, []);
  return (
    <>
      <SEOHead {...config} />
      <BreadcrumbJsonLd items={config.breadcrumbs} />
      <LoadingFallback />
    </>
  );
}

function DevQueensPage() {
  const config = PAGE_SEO.devqueens;
  useEffect(() => {
    window.location.href = "https://chat.whatsapp.com/BIyl1UovWjzLwcGw6vtcUJ";
  }, []);
  return (
    <>
      <SEOHead {...config} />
      <BreadcrumbJsonLd items={config.breadcrumbs} />
      <LoadingFallback />
    </>
  );
}

export function App() {
  useEffect(() => {
    const loader = document.getElementById("app-loader");
    if (!loader || loader.classList.contains("app-loader--hidden")) return;
    loader.classList.add("app-loader--hidden");
    const remove = () => loader.remove();
    loader.addEventListener("transitionend", remove, { once: true });
    window.setTimeout(remove, 500);
  }, []);

  return (
    <ErrorBoundary>
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <LocalBusinessJsonLd />
      <SiteNavigationElementJsonLd />
      <Suspense fallback={<LoadingFallback />}>
        <AnimatedRoutes />
      </Suspense>
    </ErrorBoundary>
  );
}
