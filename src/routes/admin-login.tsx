import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { cmsAdmin } from "@/lib/cms-api";

export function AdminLogin() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    cmsAdmin
      .setupStatus()
      .then((res: unknown) => {
        const status = res as { hasAdmin?: boolean };
        if (status?.hasAdmin === false) setMode("signup");
        else setMode("signin");
      })
      .catch(() => setMode("signin"));
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (mode === "signup") {
        await cmsAdmin.signup(email, password);
      } else {
        await cmsAdmin.login(email, password);
      }
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const isSignup = mode === "signup";

  return (
    <section className="relative mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-5 py-16 sm:px-6 sm:py-24">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-soft-border/70 bg-surface p-7 shadow-elevated sm:p-9">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            IshConnect · Administration
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
            {isSignup ? "Create admin account" : "Welcome back"}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {isSignup
              ? "Set up the first administrator account to manage website content."
              : "Sign in with your authorized administrator account to manage website content."}
          </p>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <label className="block text-sm font-medium">
              Administrator email
              <span className="relative mt-2 block">
                <Mail
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  required
                  type="email"
                  autoComplete="username"
                  autoCapitalize="none"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="name@company.com"
                  className="w-full rounded-xl border border-soft-border bg-background py-3 pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
                />
              </span>
            </label>

            <label className="block text-sm font-medium">
              Password
              <span className="relative mt-2 block">
                <LockKeyhole
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-soft-border bg-background py-3 pl-11 pr-12 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </span>
            </label>

            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              disabled={busy}
              className="inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover disabled:cursor-wait disabled:opacity-60"
            >
              {busy
                ? isSignup
                  ? "Creating account…"
                  : "Signing in…"
                : isSignup
                  ? "Create account and sign in"
                  : "Sign in securely"}
            </button>
          </form>

          <div className="mt-6 rounded-2xl border border-soft-border/60 bg-background/70 p-4">
            <p className="text-xs leading-relaxed text-muted-foreground">
              {isSignup
                ? "This creates the first administrator account. Only one admin can be created through this setup flow."
                : "Need administrator access? Ask the site owner to provision your account. Public registration is unavailable once an admin exists."}
            </p>
          </div>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to website
          </Link>
        </div>
        <p className="mt-5 text-center text-xs text-muted-foreground/70">
          Authorized personnel only
        </p>
      </div>
    </section>
  );
}
