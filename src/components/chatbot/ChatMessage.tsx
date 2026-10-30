import { motion } from "framer-motion";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "transform" }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} max-sm:gap-2 md:gap-3 lg:gap-3.5`}
    >
      {!isUser && (
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20 max-sm:h-6 max-sm:w-6 md:h-8 md:w-8 lg:h-9 lg:w-9">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="max-sm:h-3 max-sm:w-3 md:h-4 md:w-4 lg:h-[18px] lg:w-[18px]"
          >
            <path d="M12 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
            <path d="M16 14H8a4 4 0 0 0-4 4v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2a4 4 0 0 0-4-4z" />
            <path d="M17 9a3 3 0 1 0 0-6" />
          </svg>
        </div>
      )}

      <div
        className={`flex min-w-0 flex-col gap-1 ${isUser ? "items-end" : "items-start"} md:gap-1.5 lg:gap-2`}
      >
        <div
          className={[
            "rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
            "break-words overflow-hidden",
            "max-w-[92vw] max-sm:max-w-[85vw] sm:max-w-[85%] md:max-w-[82%] lg:max-w-[80%] xl:max-w-[78%]",
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-sm md:px-4 md:py-3 lg:px-5 lg:py-3.5 lg:text-[15px] lg:leading-relaxed"
              : "border border-soft-border/60 bg-surface text-foreground rounded-tl-sm shadow-soft md:px-4 md:py-3 lg:px-5 lg:py-3.5 lg:text-[15px] lg:leading-relaxed",
          ].join(" ")}
        >
          <span className="whitespace-pre-wrap">{content}</span>
        </div>
        <span
          className={`text-[10px] leading-none text-muted-foreground/60 whitespace-nowrap ${isUser ? "text-right" : "text-left"} md:text-[11px] lg:text-xs`}
        >
          {formatTime(timestamp)}
        </span>
      </div>
    </motion.div>
  );
}
