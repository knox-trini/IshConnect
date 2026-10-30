import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Loader2, CheckCircle2, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { sendEnrollment, type CourseSlug } from "@/lib/email";

import { PROGRAMS, type Program } from "@/lib/programs";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z.string().trim().min(6, "Enter a valid phone").max(30),
  message: z.string().trim().max(800).optional(),
});

type Values = z.infer<typeof schema>;

export function EnrollModal({
  open,
  program,
  onClose,
}: {
  open: boolean;
  program: Program | null;
  onClose: () => void;
}) {
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Values>({
    resolver: zodResolver(schema),
  });

  const close = () => {
    onClose();

    setTimeout(() => {
      setDone(false);
      reset();
    }, 250);
  };

  const onSubmit = async (values: Values) => {
    if (!program) return;

    try {
      await sendEnrollment({
        name: values.name,
        email: values.email,
        phone: values.phone,
        course: program.title,
        courseSlug: program.slug as CourseSlug,
        message: values.message,
      });

      setDone(true);
      toast.success("Enrollment submitted", {
        description: "We'll be in touch within 24 hours.",
      });
    } catch (e: unknown) {
      const err = e as Record<string, unknown>;
      const msg = err?.text ?? err?.message ?? JSON.stringify(err);
      console.error("EmailJS enrollment error:", msg);
      toast.error("Enrollment failed", { description: String(msg) });
    }
  };

  return (
    <AnimatePresence>
      {open && program && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-4"
        >
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={close} />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-soft-border/70 bg-surface shadow-elevated sm:max-w-lg max-h-[92vh] overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-soft-border/70 bg-background/80 text-foreground/70 backdrop-blur transition-colors hover:text-foreground sm:right-4 sm:top-4 sm:h-9 sm:w-9"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="border-b border-soft-border/60 bg-linear-to-br from-primary/10 via-secondary/5 to-transparent px-4 py-4 sm:px-6 sm:py-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-[11px] font-medium text-foreground/70 shadow-soft sm:text-xs">
                <GraduationCap className="h-3.5 w-3.5 text-primary" />
                Enroll · {program.duration}
              </span>

              <h3 className="mt-2 font-display text-xl font-semibold tracking-tight sm:text-2xl">
                {program.title}
              </h3>

              <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {program.summary}
              </p>
            </div>

            {done ? (
              <div className="flex flex-col items-center justify-center px-4 py-10 text-center sm:px-6 sm:py-12">
                <CheckCircle2 className="h-12 w-12 text-primary" />

                <h4 className="mt-4 font-display text-lg font-semibold sm:text-xl">
                  You're on the list!
                </h4>

                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Our team will reach out within 24 hours with next steps for {program.title}.
                </p>

                <button
                  onClick={close}
                  className="mt-6 rounded-xl bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-3 px-4 py-4 sm:px-6 sm:py-5"
              >
                <Field label="Full name" error={errors.name?.message}>
                  <input
                    type="text"
                    autoComplete="name"
                    {...register("name")}
                    placeholder="Jane Mukamana"
                    className="w-full rounded-xl border border-soft-border bg-surface px-3 py-2.5 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/50 focus:border-primary focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-primary)_18%,transparent)] max-sm:px-2.5 max-sm:py-2 max-sm:text-[13px]"
                  />
                </Field>

                <Field label="Email" error={errors.email?.message}>
                  <input
                    type="email"
                    autoComplete="email"
                    {...register("email")}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-soft-border bg-surface px-3 py-2.5 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/50 focus:border-primary focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-primary)_18%,transparent)] max-sm:px-2.5 max-sm:py-2 max-sm:text-[13px]"
                  />
                </Field>

                <Field label="Phone number" error={errors.phone?.message}>
                  <input
                    type="tel"
                    autoComplete="tel"
                    {...register("phone")}
                    placeholder="+250 78x xxx xxx"
                    className="w-full rounded-xl border border-soft-border bg-surface px-3 py-2.5 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/50 focus:border-primary focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-primary)_18%,transparent)] max-sm:px-2.5 max-sm:py-2 max-sm:text-[13px]"
                  />
                </Field>

                <Field label="Course selected">
                  <input
                    readOnly
                    value={program.title}
                    className="w-full rounded-xl border border-soft-border bg-muted px-3 py-2.5 text-sm text-muted-foreground outline-none max-sm:px-2.5 max-sm:py-2 max-sm:text-[13px]"
                  />
                </Field>

                <Field label="Message / inquiry (optional)" error={errors.message?.message}>
                  <textarea
                    rows={3}
                    {...register("message")}
                    placeholder="Tell us about your goals…"
                    className="w-full rounded-xl border border-soft-border bg-surface px-3 py-2.5 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/50 focus:border-primary focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-primary)_18%,transparent)] resize-none max-sm:px-2.5 max-sm:py-2 max-sm:text-[13px]"
                  />
                </Field>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-all hover:scale-[1.01] disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    "Submit enrollment"
                  )}
                </button>

                <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
                  We respect your privacy. Your details are only used to follow up about this
                  program.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-medium text-foreground/80 sm:text-xs">
        {label}
      </span>

      {children}

      {error && <span className="mt-1 block text-[11px] text-destructive">{error}</span>}
    </label>
  );
}

// Re-export for convenience
export { PROGRAMS };
