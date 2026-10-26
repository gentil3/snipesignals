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
      "Does `message` ask for free Partnering access (BloFin signup, SnipeSignalsVIP channel, discussion group) without paying?",
    criteria: {
      true: "The sender wants the free Partnering path.",
      false: "The sender is not asking for free Partnering.",
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
      partnering: "Free Partnering / BloFin signup only",
      monthly: "Paid monthly access",
      annual: "Paid year up front",
      vip_desk: "VIP 1-on-1 desk",
      unspecified: "No specific plan named",
    },
  },
};

export type NamedPlan = keyof (typeof INBOUND_QUESTIONS)["named_plan"]["criteria"];
