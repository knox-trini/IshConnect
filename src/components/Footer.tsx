import { memo } from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Instagram, ArrowUpRight } from "lucide-react";

import { Logo } from "./Logo";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { DEFAULT_FOOTER_LINKS, findApplicationLink } from "@/lib/site-settings";

export const Footer = memo(function Footer() {
  const settings = useSiteSettings();
  const sections = settings.footerLinks?.length ? settings.footerLinks : DEFAULT_FOOTER_LINKS;
  const startProject = findApplicationLink(settings, "start-project", "/contact");
  const startProjectExternal = startProject.openInNewTab || /^https?:\/\//i.test(startProject.url);

  const socialLinks = (settings.socialLinks || []).filter((s) => s.enabled !== false);

  return (
    <footer className="border-t border-soft-border/60 bg-surface-elevated">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-2 md:grid-cols-12">
        {/* Brand */}
        <div className="sm:col-span-2 md:col-span-4">
          <Link to="/" aria-label="IshConnect Home">
            <Logo />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {settings.footerDescription}
          </p>
          <div className="mt-5 flex items-center gap-2">
            {socialLinks.map((social) => {
              const href = social.url || "#";
              const label = social.label || social.platform;
              if (social.platform === "linkedin") {
                return (
                  <a
                    key={social.platform + href}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-soft-border/60 text-foreground/70 transition-colors hover:border-primary hover:text-primary"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                );
              }
              if (social.platform === "github") {
                return (
                  <a
                    key={social.platform + href}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-soft-border/60 text-foreground/70 transition-colors hover:border-primary hover:text-primary"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                );
              }
              if (social.platform === "instagram") {
                return (
                  <a
                    key={social.platform + href}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-soft-border/60 text-foreground/70 transition-colors hover:border-primary hover:text-primary"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                );
              }
              return (
                <a
                  key={social.platform + href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-soft-border/60 text-foreground/70 transition-colors hover:border-primary hover:text-primary"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        {sections.map((s) => (
          <div key={s.title} className="md:col-span-2">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {s.title}
            </h4>
            <ul className="space-y-2.5">
              {s.links.map((l, i) => (
                <li key={i}>
                  {/^https?:\/\//i.test(l.url) ? (
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-foreground/80 transition-colors hover:text-primary"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link
                      to={l.url}
                      className="text-sm text-foreground/80 transition-colors hover:text-primary"
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* CTA */}
        <div className="md:col-span-2">
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Start
          </h4>
          {startProjectExternal ? (
            <a
              href={startProject.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.02] hover:bg-primary-hover"
            >
              {startProject.label}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ) : (
            <Link
              to={startProject.url}
              className="group inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.02] hover:bg-primary-hover"
            >
              {startProject.label}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-soft-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-6 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <Link to="/" className="hover:text-primary transition-colors">
              IshConnect
            </Link>
            . {settings.copyrightText}
          </p>
          <p className="text-muted-foreground/60">
            <Link to="/solutions" className="hover:text-primary transition-colors">
              Software Development
            </Link>{" "}
            &middot;
            <Link to="/ai-solutions-rwanda" className="hover:text-primary transition-colors">
              {" "}
              AI Solutions
            </Link>{" "}
            &middot;
            <Link to="/academy" className="hover:text-primary transition-colors">
              {" "}
              Tech Training
            </Link>{" "}
            &middot;
            <Link to="/about" className="hover:text-primary transition-colors">
              {" "}
              About
            </Link>{" "}
            &middot;
            <Link to="/founder" className="hover:text-primary transition-colors">
              {" "}
              Founder
            </Link>{" "}
            &middot;
            <Link to="/team" className="hover:text-primary transition-colors">
              {" "}
              Team
            </Link>
          </p>
          <p className="text-muted-foreground/40">
            {settings.contactAddress || "Kigali, Rwanda"} &middot; Global Reach
          </p>
          <Link
            to="/admin/login"
            className="text-muted-foreground/50 transition-colors hover:text-primary"
          >
            Admin sign in
          </Link>
          <button
            type="button"
            aria-label="Open events editor"
            className="inline-flex h-2 w-2 cursor-pointer items-center justify-center rounded-full bg-foreground/10 text-transparent transition-colors hover:bg-foreground/30"
            onClick={() =>
              void import("@/lib/events").then(({ useEventsStore }) =>
                useEventsStore.getState().openEditor(),
              )
            }
          />
        </div>
      </div>
    </footer>
  );
});
