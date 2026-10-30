import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const headingId = `${baseId}-heading-${i}`;
        const panelId = `${baseId}-panel-${i}`;

        return (
          <div
            key={i}
            className="rounded-2xl border border-soft-border/60 bg-surface shadow-soft transition-shadow duration-200 hover:shadow-elevated"
          >
            <h3>
              <button
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                id={headingId}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-foreground transition-colors hover:text-primary sm:px-6 sm:py-5 sm:text-base"
              >
                <span>{item.question}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                >
                  <ChevronDown className="h-3.5 w-3.5" />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headingId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-soft-border/40 px-5 pb-5 pt-4 text-sm leading-relaxed text-muted-foreground sm:px-6 sm:pb-6">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
