import { useState, useRef, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setInput("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="sticky bottom-0 border-t border-border/40 bg-background/80 backdrop-blur-sm max-sm:pb-safe-or-2">
      <div className="flex items-end gap-2 p-3 max-sm:gap-1.5 max-sm:p-2.5 md:gap-2.5 md:p-3.5 lg:gap-3 lg:p-4 xl:gap-3.5 xl:p-5">
        <div className="relative flex flex-1 items-center">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            disabled={disabled}
            inputMode="text"
            autoComplete="off"
            autoCorrect="on"
            className="w-full rounded-2xl border border-border/60 bg-surface/80 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20 disabled:opacity-50 max-sm:py-3 max-sm:text-[15px] md:py-3 md:text-[14px] lg:py-3.5 lg:px-5 lg:text-[15px] xl:py-4 xl:text-base"
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleSubmit}
          disabled={!input.trim() || disabled}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-all hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed max-sm:h-11 max-sm:w-11 active:scale-95 md:h-11 md:w-11 lg:h-12 lg:w-12 xl:h-13 xl:w-13"
          aria-label="Send message"
        >
          <ArrowUp
            className="h-4.5 w-4.5 max-sm:h-5 max-sm:w-5 md:h-5 md:w-5 lg:h-5.5 lg:w-5.5 xl:h-6 xl:w-6"
            strokeWidth={2.5}
          />
        </motion.button>
      </div>
    </div>
  );
}
