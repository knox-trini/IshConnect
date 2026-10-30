import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { CheckCircle2, Loader2, Send } from "lucide-react";

export function ChallengeForm({ defaultChallenge = "" }: { defaultChallenge?: string }) {
  const form = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setSending(true);

    const time = new Date().toLocaleString("en-US", {
      timeZone: "Africa/Kigali",
      dateStyle: "full",
      timeStyle: "short",
    });

    const hidden = document.createElement("input");
    hidden.type = "hidden";
    hidden.name = "time";
    hidden.value = time;
    form.current.appendChild(hidden);

    try {
      await emailjs.sendForm(
        "service_jwu75oc",
        "template_n0866mq",
        form.current,
        "z5e8SQcYysgocvAsl",
      );
      setSent(true);
      form.current.reset();
    } catch {
      alert("Failed to send submission. Please try again.");
    } finally {
      hidden.remove();
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-3xl border border-soft-border/70 bg-surface p-8 text-center shadow-soft sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f97316]/10">
          <CheckCircle2 className="h-7 w-7 text-[#f97316]" />
        </div>
        <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
          Submission sent successfully
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thank you! The IshConnect team will review your project and get back to you.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#f97316] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#f97316]/25 transition-all duration-300 hover:bg-[#ea580c] hover:shadow-xl hover:shadow-[#f97316]/35 active:scale-[0.98]"
        >
          Submit Another Project
        </button>
      </div>
    );
  }

  return (
    <form ref={form} onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Jean Claude"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-[#f97316] focus:outline-none focus:ring-2 focus:ring-[#f97316]/20"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jean@example.com"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-[#f97316] focus:outline-none focus:ring-2 focus:ring-[#f97316]/20"
          />
        </div>
      </div>

      <div>
        <label htmlFor="challenge" className="mb-1.5 block text-sm font-medium text-foreground">
          Challenge Name
        </label>
        <input
          id="challenge"
          name="challenge"
          type="text"
          required
          defaultValue={defaultChallenge}
          key={defaultChallenge}
          placeholder="e.g. 7-Day Coding Challenge"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-[#f97316] focus:outline-none focus:ring-2 focus:ring-[#f97316]/20"
        />
      </div>

      <div>
        <label htmlFor="link" className="mb-1.5 block text-sm font-medium text-foreground">
          Project Link
        </label>
        <input
          id="link"
          name="link"
          type="url"
          required
          placeholder="https://github.com/your-username/project"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-[#f97316] focus:outline-none focus:ring-2 focus:ring-[#f97316]/20"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Any notes or details for the IshConnect team..."
          className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-[#f97316] focus:outline-none focus:ring-2 focus:ring-[#f97316]/20"
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#f97316] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#f97316]/25 transition-all duration-300 hover:bg-[#ea580c] hover:shadow-xl hover:shadow-[#f97316]/35 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {sending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Submit Challenge
          </>
        )}
      </button>
    </form>
  );
}
