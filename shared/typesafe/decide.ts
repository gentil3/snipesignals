import { PRODUCTS } from "../products";
import type { NamedPlan } from "./questions";

const YES = 0.7;
const NO = 0.3;

export type InboundJudgments = {
  wants_to_pay: number;
  wants_partnering: number;
  is_support: number;
  named_plan: NamedPlan;
};

export type InboundDecision =
  | { action: "quote_crypto"; plan: "MONTHLY" | "SEMI_ANNUAL" | "ANNUAL" | "PRIVATE_DESK"; amountUsd: string }
  | { action: "partnering" }
  | { action: "ask_which_plan" }
  | { action: "human_support" }
  | { action: "clarify" };

function yes(p: number) {
  return p >= YES;
}
function no(p: number) {
  return p <= NO;
}

/** Truth table. Unsettled Nouls (0.3–0.7) fall through to clarify. */
export function decideInbound(j: InboundJudgments): InboundDecision {
  if (yes(j.wants_to_pay)) {
    if (j.named_plan === "monthly") {
      return { action: "quote_crypto", plan: "MONTHLY", amountUsd: PRODUCTS.MONTHLY.cryptoDisplayPrice };
    }
    if (j.named_plan === "six_month") {
      return { action: "quote_crypto", plan: "SEMI_ANNUAL", amountUsd: PRODUCTS.SEMI_ANNUAL.cryptoDisplayPrice };
    }
    if (j.named_plan === "annual") {
      return { action: "quote_crypto", plan: "ANNUAL", amountUsd: PRODUCTS.ANNUAL.cryptoDisplayPrice };
    }
    if (j.named_plan === "private_desk") {
      return { action: "quote_crypto", plan: "PRIVATE_DESK", amountUsd: PRODUCTS.PRIVATE_DESK.cryptoDisplayPrice };
    }
    return { action: "ask_which_plan" };
  }

  if (yes(j.wants_partnering) && no(j.wants_to_pay)) {
    return { action: "partnering" };
  }

  if (yes(j.is_support) && no(j.wants_to_pay)) {
    return { action: "human_support" };
  }

  return { action: "clarify" };
}
