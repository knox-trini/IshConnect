import { Link } from "react-router-dom";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2 ${className}`}
      aria-label="IshConnect home — software development and AI innovation studio in Kigali, Rwanda"
    >
      <span
        className="relative inline-flex h-8 w-8 items-center justify-center rounded-xl bg-foreground text-background shadow-soft"
        aria-hidden
      >
        <span className="font-display text-[15px] font-bold tracking-tight">I</span>
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
      </span>
      <span className="font-display text-[17px] font-semibold tracking-tight">
        Ish<span className="text-primary">Connect</span>
        <span className="sr-only">
          {" "}
          — Software Development & AI Innovation Studio, Kigali Rwanda
        </span>
      </span>
    </Link>
  );
}
