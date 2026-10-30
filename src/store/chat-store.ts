import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
  isTyping: boolean;
  addMessage: (role: "user" | "assistant", content: string) => void;
  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
  setTyping: (typing: boolean) => void;
  clearMessages: () => void;
}

function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      isOpen: false,
      isTyping: false,

      addMessage: (role, content) => {
        const message: ChatMessage = {
          id: generateId(),
          role,
          content,
          timestamp: Date.now(),
        };
        set((state) => ({
          messages: [...state.messages, message].slice(-50),
        }));
      },

      toggleChat: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      openChat: () => {
        set({ isOpen: true });
      },

      closeChat: () => {
        set({ isOpen: false });
      },

      setTyping: (typing) => {
        set({ isTyping: typing });
      },

      clearMessages: () => {
        set({ messages: [] });
      },
    }),
    {
      name: "ishconnect-chat-history",
      partialize: (state) => ({
        messages: state.messages,
      }),
    },
  ),
);
