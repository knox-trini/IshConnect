import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Sparkles, Trash2 } from "lucide-react";
import { useChatStore } from "@/store/chat-store";
import { findBestMatch, getFollowUpQuestions } from "@/lib/chatbot/response-engine";
import { welcomeMessage, suggestedInitialQuestions } from "@/lib/chatbot/intents";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChatHeader } from "./ChatHeader";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { SuggestedQuestions } from "./SuggestedQuestions";
import { ChatInput } from "./ChatInput";

const TYPING_DELAY_MIN = 800;
const TYPING_DELAY_MAX = 1800;

export function ChatBot() {
  const {
    messages,
    isOpen,
    isTyping,
    addMessage,
    toggleChat,
    closeChat,
    setTyping,
    clearMessages,
  } = useChatStore();

  const [showWelcome, setShowWelcome] = useState(true);
  const [suggestedQs, setSuggestedQs] = useState<string[]>([]);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    });
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom, isOpen]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setShowWelcome(true);
      setSuggestedQs(suggestedInitialQuestions);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (!isOpen) {
      setShowClearConfirm(false);
    }
  }, [isOpen]);

  const handleSend = useCallback(
    async (content: string) => {
      addMessage("user", content);
      setShowWelcome(false);
      setSuggestedQs([]);
      setTyping(true);

      const delay = TYPING_DELAY_MIN + Math.random() * (TYPING_DELAY_MAX - TYPING_DELAY_MIN);
      await new Promise((r) => setTimeout(r, delay));

      const result = findBestMatch(content);
      addMessage("assistant", result.response);

      setTyping(false);

      const followUps = getFollowUpQuestions(result.intentId);
      if (followUps && followUps.length > 0) {
        setSuggestedQs(followUps);
      }
    },
    [addMessage, setTyping],
  );

  const handleSuggestedSelect = useCallback(
    (question: string) => {
      handleSend(question);
    },
    [handleSend],
  );

  const handleClearHistory = useCallback(() => {
    clearMessages();
    setShowWelcome(true);
    setSuggestedQs(suggestedInitialQuestions);
    setShowClearConfirm(false);
  }, [clearMessages]);

  const panelVariants = {
    hidden: isMobile ? { opacity: 0, y: 80 } : { opacity: 0, y: 16, scale: 0.96 },
    visible: isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeChat}
              className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-[2px] sm:bg-black/10 sm:backdrop-blur-0"
            />
            <motion.div
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: isMobile ? 0.3 : 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={[
                "fixed z-[61] flex flex-col overflow-hidden border bg-background shadow-elevated",
                "max-sm:inset-x-3 max-sm:bottom-3 max-sm:max-h-[85dvh] max-sm:rounded-2xl max-sm:border-border/60",
                "sm:bottom-6 sm:right-6 sm:w-[440px] sm:h-[600px] sm:rounded-2xl sm:border-border/60",
                "md:w-[500px] md:h-[680px] md:bottom-8 md:right-8",
                "lg:w-[560px] lg:h-[76vh] lg:bottom-8 lg:right-8 lg:border-border/70 lg:shadow-premium-desktop",
                "xl:w-[620px] xl:h-[80vh] xl:bottom-10 xl:right-10",
                "2xl:w-[680px] 2xl:h-[84vh] 2xl:bottom-12 2xl:right-12",
              ].join(" ")}
            >
              <ChatHeader onClose={closeChat} />

              <div
                ref={containerRef}
                className="flex-1 overflow-y-auto overscroll-contain scrollbar-thin
                  px-4 pb-2 pt-4
                  max-sm:px-3 max-sm:pt-3
                  md:px-5 md:pt-5 md:pb-3
                  lg:px-6 lg:pt-6 lg:pb-4
                  xl:px-7 xl:pt-7
                  2xl:px-8 2xl:pt-8"
              >
                {messages.length === 0 && showWelcome ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="flex flex-col gap-5 md:gap-6"
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20 md:h-12 md:w-12">
                        <Sparkles className="h-5 w-5 text-primary md:h-6 md:w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground md:text-base">
                          IshConnect AI
                        </p>
                        <p className="text-xs text-muted-foreground/60 md:text-sm">
                          Premium AI Assistant
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-soft-border/60 bg-surface p-4 shadow-soft rounded-tl-sm md:p-5 lg:p-6">
                      <p className="text-sm leading-relaxed text-foreground md:text-base md:leading-relaxed">
                        {welcomeMessage.text}
                      </p>
                    </div>

                    {suggestedQs.length > 0 && (
                      <div>
                        <p className="mb-2.5 text-xs font-medium text-muted-foreground/60 md:text-sm md:mb-3">
                          Suggested questions
                        </p>
                        <SuggestedQuestions
                          questions={suggestedQs}
                          onSelect={handleSuggestedSelect}
                        />
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
                    {messages.map((msg) => (
                      <ChatMessage
                        key={msg.id}
                        role={msg.role}
                        content={msg.content}
                        timestamp={msg.timestamp}
                      />
                    ))}

                    <AnimatePresence>{isTyping && <TypingIndicator />}</AnimatePresence>

                    {suggestedQs.length > 0 && !isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 lg:mt-2"
                      >
                        <SuggestedQuestions
                          questions={suggestedQs}
                          onSelect={handleSuggestedSelect}
                        />
                      </motion.div>
                    )}
                  </div>
                )}

                {messages.length > 0 && !isTyping && (
                  <div className="relative mt-5 flex justify-center md:mt-6 lg:mt-8">
                    <AnimatePresence>
                      {showClearConfirm ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="flex items-center gap-2 rounded-lg border border-border/60 bg-surface px-3 py-1.5 shadow-soft md:px-3.5 md:py-2"
                        >
                          <span className="text-xs text-muted-foreground md:text-sm">
                            Clear all messages?
                          </span>
                          <button
                            onClick={handleClearHistory}
                            className="text-xs font-medium text-destructive hover:text-destructive/80 transition-colors md:text-sm"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setShowClearConfirm(false)}
                            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors md:text-sm"
                          >
                            No
                          </button>
                        </motion.div>
                      ) : (
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onClick={() => setShowClearConfirm(true)}
                          className="flex items-center gap-1 text-[11px] text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors md:text-xs"
                        >
                          <Trash2 className="h-3 w-3 md:h-3.5 md:w-3.5" />
                          Clear history
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                <div ref={messagesEndRef} className="h-2 md:h-3" />
              </div>

              {!isTyping && (
                <div className="border-t border-border/30 bg-background/50 px-4 py-2 max-sm:px-3 max-sm:py-1.5 md:px-5 md:py-2.5 lg:px-6 lg:py-3">
                  <p className="text-center text-[10px] text-muted-foreground/40 md:text-[11px] lg:text-xs">
                    Still need help?{" "}
                    <a
                      href="mailto:ishconnlab@gmail.com"
                      className="font-medium text-primary hover:text-primary-hover transition-colors"
                    >
                      Contact us
                    </a>
                  </p>
                </div>
              )}

              <ChatInput onSend={handleSend} disabled={isTyping} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={toggleChat}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow transition-shadow hover:shadow-[0_8px_40px_rgb(249_115_22/0.3)] active:shadow-glow max-sm:bottom-4 max-sm:right-4 max-sm:h-13 max-sm:w-13 motion-safe:active:scale-95 md:bottom-8 md:right-8 md:h-15 md:w-15 lg:bottom-10 lg:right-10 lg:h-16 lg:w-16 xl:bottom-12 xl:right-12 xl:h-[68px] xl:w-[68px]"
            aria-label="Open AI chat assistant"
          >
            <motion.div
              animate={isMobile ? {} : { rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
              className="motion-reduce:animate-none"
            >
              <MessageCircle
                className="h-6 w-6 max-sm:h-5.5 max-sm:w-5.5 md:h-6.5 md:w-6.5 lg:h-7 lg:w-7 xl:h-[30px] xl:w-[30px]"
                strokeWidth={2}
              />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
