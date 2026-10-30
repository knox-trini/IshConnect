import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

const easeInOut = [0.16, 1, 0.3, 1] as const;

export function NotFound() {
  return (
    <>
      <SEOHead
        title="Page Not Found · IshConnect"
        description="The page you're looking for doesn't exist or has been moved. Return to IshConnect — Kigali's leading software development and AI innovation studio."
        canonical="/404"
        noindex
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "404 — Page Not Found", url: "/404" },
        ]}
      />

      <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeInOut }}
          className="max-w-md text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block text-8xl font-bold leading-none text-primary/30"
          >
            404
          </motion.span>

          <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Page not found
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-all hover:opacity-90"
            >
              <Home className="h-4 w-4" /> Go home
            </Link>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 rounded-full border border-soft-border/60 bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" /> View our work
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
