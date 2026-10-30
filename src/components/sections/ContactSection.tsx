import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { sendContact } from "@/lib/email";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useSiteContent } from "@/hooks/useSiteContent";

import { Section, SectionHeading } from "../Section";
import { Reveal } from "../Reveal";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().max(30).optional(),
  subject: z.string().trim().max(120).optional(),
  message: z.string().trim().min(5, "Tell us a little more").max(1500),
});

type Values = z.infer<typeof schema>;

export function ContactSection() {
  const settings = useSiteSettings();
  const { contact: copy } = useSiteContent();
  const form = copy.form;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = async (v: Values) => {
    try {
      await sendContact(v);
      toast.success(form.successTitle, { description: form.successDescription });
      reset();
    } catch (e: unknown) {
      const err = e as Record<string, unknown>;
      const msg = err?.text ?? err?.message ?? JSON.stringify(err);
      console.error("EmailJS error:", msg);
      toast.error(form.errorTitle, { description: String(msg) });
    }
  };

  return (
    <Section id="contact">
      <SectionHeading
        eyebrow={copy.eyebrow}
        title={
          <>
            {copy.title} <span className="text-primary">{copy.highlight}</span>
            {copy.suffix}
          </>
        }
        description={copy.description}
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-12">
        <Reveal variant="fade-left" duration={600} className="lg:col-span-5">
          <div className="space-y-4">
            <ContactCard
              icon={<Mail className="h-4 w-4" />}
              title="Email"
              value={copy.cards.email || settings.contactEmail || "ishconnlab@gmail.com"}
              href={`mailto:${copy.cards.email || settings.contactEmail || "ishconnlab@gmail.com"}`}
            />
            <ContactCard
              icon={<Phone className="h-4 w-4" />}
              title="Phone"
              value={copy.cards.phone || settings.contactPhone || "+250 787 377 750"}
              href={`tel:${(copy.cards.phone || settings.contactPhone || "").replace(/[^\d+]/g, "")}`}
            />
            <ContactCard
              icon={<MapPin className="h-4 w-4" />}
              title="Studio"
              value={copy.cards.studio || settings.contactAddress || "KG 11 Ave, Kigali, Rwanda"}
            />
          </div>
        </Reveal>

        <Reveal variant="fade-right" delay={100} duration={600} className="lg:col-span-7">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 rounded-3xl border border-orange-100 bg-[#FFF7ED] p-5 shadow-soft sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={form.name} error={errors.name?.message}>
                <input
                  {...register("name")}
                  placeholder={form.namePlaceholder}
                  className="w-full rounded-2xl border border-orange-200 bg-white px-3.5 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 transition-all duration-200 focus:border-[#F97316] focus:shadow-[0_0_0_4px_rgba(249,115,22,0.15)] max-sm:px-3 max-sm:py-2.5 max-sm:text-[13px]"
                />
              </Field>
              <Field label={form.email} error={errors.email?.message}>
                <input
                  type="email"
                  {...register("email")}
                  placeholder={form.emailPlaceholder}
                  className="w-full rounded-2xl border border-orange-200 bg-white px-3.5 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 transition-all duration-200 focus:border-[#F97316] focus:shadow-[0_0_0_4px_rgba(249,115,22,0.15)] max-sm:px-3 max-sm:py-2.5 max-sm:text-[13px]"
                />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={form.phone} error={errors.phone?.message}>
                <input
                  {...register("phone")}
                  placeholder={form.phonePlaceholder}
                  className="w-full rounded-2xl border border-orange-200 bg-white px-3.5 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 transition-all duration-200 focus:border-[#F97316] focus:shadow-[0_0_0_4px_rgba(249,115,22,0.15)] max-sm:px-3 max-sm:py-2.5 max-sm:text-[13px]"
                />
              </Field>
              <Field label={form.subject}>
                <input
                  {...register("subject")}
                  placeholder={form.subjectPlaceholder}
                  className="w-full rounded-2xl border border-orange-200 bg-white px-3.5 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 transition-all duration-200 focus:border-[#F97316] focus:shadow-[0_0_0_4px_rgba(249,115,22,0.15)] max-sm:px-3 max-sm:py-2.5 max-sm:text-[13px]"
                />
              </Field>
            </div>

            <Field label={form.message} error={errors.message?.message}>
              <textarea
                rows={5}
                {...register("message")}
                placeholder={form.messagePlaceholder}
                className="w-full rounded-2xl border border-orange-200 bg-white px-3.5 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 transition-all duration-200 focus:border-[#F97316] focus:shadow-[0_0_0_4px_rgba(249,115,22,0.15)] resize-none max-sm:px-3 max-sm:py-2.5 max-sm:text-[13px]"
              />
            </Field>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-2xl bg-[#F97316] px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.01] hover:bg-[#FB923C] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {form.sending}
                </>
              ) : (
                <>
                  {form.submit}
                  <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

function ContactCard({
  icon,
  title,
  value,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-center gap-3 rounded-3xl border border-orange-100 bg-white p-5 shadow-soft transition-all duration-300 hover:border-[#F97316]/40 hover:-translate-y-0.5">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-100 text-[#F97316]">
        {icon}
      </span>
      <div>
        <p className="text-xs uppercase tracking-wider text-gray-500">{title}</p>
        <p className="text-sm font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );

  return href ? <a href={href}>{inner}</a> : inner;
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
      <span className="mb-1.5 block text-xs font-medium text-gray-700">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  );
}
