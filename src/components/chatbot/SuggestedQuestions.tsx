import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface SuggestedQuestionsProps {
  questions: string[];
  onSelect: (question: string) => void;
}

export function SuggestedQuestions({ questions, onSelect }: SuggestedQuestionsProps) {
  if (questions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 max-sm:gap-1.5 md:gap-2.5 lg:gap-3">
      {questions.map((question, i) => (
        <motion.button
          key={question}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => onSelect(question)}
          className="group inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary/90 transition-all hover:border-primary/30 hover:bg-primary/10 hover:text-primary active:scale-95 max-sm:px-2.5 max-sm:py-2 max-sm:text-[13px] md:px-3.5 md:py-2 md:text-sm md:gap-2 lg:px-4 lg:py-2.5 lg:text-[15px] lg:gap-2.5"
        >
          <Sparkles className="h-3 w-3 shrink-0 opacity-60 max-sm:h-3.5 max-sm:w-3.5 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4" />
          <span className="max-sm:text-[13px]">{question}</span>
        </motion.button>
      ))}
    </div>
  );
}
