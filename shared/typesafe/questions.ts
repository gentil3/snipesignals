/**
 * TypeSafe question bank for Snipe Signals inbound messages.
 * Jev judges; decide.ts maps answers to actions.
 */
export const TYPESAFE_MODEL = "jev-latest" as const;

export const INBOUND_QUESTIONS = {
  wants_to_pay: {
    type: "noul" as const,
    instructions: "Does `message` ask to pay, buy, or subscribe to Snipe Signals?",
    criteria: {
      true: "The sender wants to purchase access now.",
      false: "The sender is not asking to pay.",
    },
  },
  wants_partnering: {
    type: "noul" as const,
    instructions:
      "Does `message` ask for free Partner Access after a BloFin, MEXC, or Pump.fun referral signup?",
    criteria: {
      true: "The sender wants the free referral path.",
      false: "The sender is not asking for free Partner Access.",
    },
  },
  is_support: {
    type: "noul" as const,
    instructions: "Is `message` a product, trading, or account question rather than a purchase?",
    criteria: {
      true: "The sender wants help or information, not a checkout.",
      false: "The sender is not asking a support question.",
    },
  },
  named_plan: {
    type: "choice" as const,
    instructions: "Which Snipe Signals plan does `message` name?",
    criteria: {
      partnering: "Free Partner Access via BloFin, MEXC, or Pump.fun",
      monthly: "Paid monthly access",
      six_month: "Paid six-month access",
      annual: "Paid year up front",
      private_desk: "Private Desk 1-on-1",
      unspecified: "No specific plan named",
    },
  },
};

export type NamedPlan = keyof (typeof INBOUND_QUESTIONS)["named_plan"]["criteria"];
