import { Intent, intents, fallbackResponses } from "./intents";

export interface MatchResult {
  response: string;
  intentId: string;
  confidence: number;
}

let lastMatchedIntent: string | null = null;

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[\s,.;!?]+/)
    .filter((t) => t.length > 0);
}

function scoreIntent(intent: Intent, query: string): number {
  const normalized = query.toLowerCase().trim();
  const tokens = tokenize(normalized);
  let score = 0;

  for (const phrase of intent.phrases) {
    if (normalized.includes(phrase.toLowerCase())) {
      score += 25;
    }
  }

  for (const keyword of intent.keywords) {
    const kw = keyword.toLowerCase();
    const regex = new RegExp(`\\b${escapeRegex(kw)}\\b`, "i");
    if (regex.test(query)) {
      score += 12;
    } else if (normalized.includes(kw)) {
      score += 6;
    }
  }

  for (const [, syns] of Object.entries(intent.synonyms)) {
    for (const syn of syns) {
      const regex = new RegExp(`\\b${escapeRegex(syn)}\\b`, "i");
      if (regex.test(query)) {
        score += 4;
      }
    }
  }

  if (tokens.length <= 3 && score > 0) {
    score *= 1.4;
  }

  return score;
}

function pickBestResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)];
}

export function findBestMatch(query: string): MatchResult {
  const trimmed = query.trim();
  if (!trimmed) {
    return {
      response: "Please ask me a question! I'm here to help with anything about IshConnect.",
      intentId: "empty",
      confidence: 0,
    };
  }

  const scored = intents
    .map((intent) => ({
      intent,
      score: scoreIntent(intent, trimmed),
    }))
    .sort((a, b) => b.score - a.score);

  const best = scored[0];

  if (best && best.score >= 5) {
    lastMatchedIntent = best.intent.id;
    return {
      response: pickBestResponse(best.intent.responses),
      intentId: best.intent.id,
      confidence: best.score,
    };
  }

  const response = pickBestResponse(fallbackResponses);
  return {
    response,
    intentId: "fallback",
    confidence: 0,
  };
}

export function getFollowUpQuestions(intentId: string): string[] | null {
  const intent = intents.find((i) => i.id === intentId);
  return intent?.followUp ?? null;
}

export function getIntentById(id: string): Intent | undefined {
  return intents.find((i) => i.id === id);
}

export function resetContext(): void {
  lastMatchedIntent = null;
}

export function getLastMatchedIntent(): string | null {
  return lastMatchedIntent;
}
