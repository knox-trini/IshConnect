import { motion } from "framer-motion";

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-3 md:gap-3.5 lg:gap-4"
    >
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20 max-sm:h-6 max-sm:w-6 md:h-8 md:w-8 lg:h-9 lg:w-9">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary max-sm:h-3 max-sm:w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4"
        >
          <path d="M12 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
          <path d="M16 14H8a4 4 0 0 0-4 4v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2a4 4 0 0 0-4-4z" />
        </svg>
      </div>

      <div className="flex items-center gap-1 rounded-2xl border border-soft-border/60 bg-surface px-4 py-3 shadow-soft rounded-tl-sm motion-reduce:gap-1.5 md:px-4 md:py-3.5 md:gap-1.5 lg:px-5 lg:py-4 lg:gap-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-primary/60 motion-reduce:bg-primary/40 md:h-2 md:w-2 lg:h-2.5 lg:w-2.5 motion-safe:animate-bounce"
            style={{ animationDelay: `${i * 0.12}s`, animationDuration: "0.6s" }}
          />
        ))}
      </div>
    </motion.div>
  );
}
