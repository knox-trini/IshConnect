import { memo, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useSiteContent } from "@/hooks/useSiteContent";
import { findApplicationLink } from "@/lib/site-settings";

export const Navbar = memo(function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showEcosystem, setShowEcosystem] = useState(false);
  const { pathname } = useLocation();
  const { global: siteGlobal } = useSiteContent();
  const { primary, secondary, external, moreLabel } = siteGlobal.nav;
  const settings = useSiteSettings();
  const startProject = findApplicationLink(settings, "start-project", "/contact");
  const startProjectExternal = startProject.openInNewTab || /^https?:\/\//i.test(startProject.url);

  useEffect(() => {
    setScrolled(window.scrollY > 12);
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 12);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setShowEcosystem(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-4">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`flex w-full max-w-6xl items-center justify-between gap-2 rounded-full border border-soft-border/60 px-3 py-2 transition-all duration-300 sm:gap-4 sm:px-4 ${
          scrolled
            ? "glass-nav shadow-soft"
            : "bg-background/60 lg:bg-background/40 lg:backdrop-blur-md"
        }`}
        aria-label="Main navigation"
      >
        <Logo />

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex" role="list">
          {primary.map((item) => {
            const active = pathname === item.to;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-full px-2.5 py-2 text-sm font-medium whitespace-nowrap transition-colors sm:px-3.5 ${
                    active ? "text-primary" : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </Link>
              </li>
            );
          })}

          {/* Ecosystem dropdown */}
          <li className="relative ml-2 pl-2 border-l border-soft-border/50">
            <button
              onClick={() => setShowEcosystem((v) => !v)}
              onMouseEnter={() => setShowEcosystem(true)}
              onMouseLeave={() => setShowEcosystem(false)}
              className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
              aria-expanded={showEcosystem}
              aria-haspopup="true"
            >
              {moreLabel}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${showEcosystem ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {showEcosystem && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-48 rounded-2xl border border-soft-border/60 bg-surface p-1.5 shadow-elevated"
                  onMouseEnter={() => setShowEcosystem(true)}
                  onMouseLeave={() => setShowEcosystem(false)}
                >
                  {secondary.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`block rounded-xl px-3 py-2.5 text-sm transition-colors ${
                        pathname === item.to
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/80 hover:bg-muted"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="mt-1 border-t border-soft-border/30 pt-1">
                    {external.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-muted"
                      >
                        {item.label}
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                          {item.badge}
                        </span>
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          {startProjectExternal ? (
            <a
              href={startProject.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background magnetic-btn lg:inline-flex"
            >
              {startProject.label}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ) : (
            <Link
              to={startProject.url}
              className="hidden items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background magnetic-btn lg:inline-flex"
            >
              {startProject.label}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          )}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-soft-border/60 bg-surface lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-3 top-[68px] rounded-3xl border border-soft-border/60 bg-surface p-4 shadow-elevated lg:hidden"
          >
            <ul className="flex flex-col">
              {primary.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`block rounded-2xl px-4 py-3 text-sm font-medium ${
                      pathname === item.to
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/80 hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-1 border-t border-soft-border/40 pt-1">
                <p className="px-4 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  {moreLabel}
                </p>
                {secondary.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`block rounded-2xl px-4 py-3 text-sm ${
                      pathname === item.to
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/60 hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                {external.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm text-foreground/60 hover:bg-muted"
                  >
                    {item.label}
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                      {item.badge}
                    </span>
                  </a>
                ))}
              </li>
              <li className="mt-2">
                {startProjectExternal ? (
                  <a
                    href={startProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-full bg-foreground px-4 py-3 text-sm font-medium text-background"
                  >
                    {startProject.label} <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <Link
                    to={startProject.url}
                    className="flex items-center justify-center gap-1.5 rounded-full bg-foreground px-4 py-3 text-sm font-medium text-background"
                  >
                    {startProject.label} <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
});
