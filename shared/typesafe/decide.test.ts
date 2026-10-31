import { describe, expect, it } from "vitest";
import { decideInbound } from "./decide";

describe("decideInbound", () => {
  it("quotes monthly crypto when they want to pay monthly", () => {
    expect(
      decideInbound({
        wants_to_pay: 0.9,
        wants_partnering: 0.1,
        is_support: 0.1,
        named_plan: "monthly",
      })
    ).toEqual({ action: "quote_crypto", plan: "MONTHLY", amountUsd: "$59.99" });
  });

  it("asks which plan when they want to pay but did not name one", () => {
    expect(
      decideInbound({
        wants_to_pay: 0.85,
        wants_partnering: 0.2,
        is_support: 0.1,
        named_plan: "unspecified",
      })
    ).toEqual({ action: "ask_which_plan" });
  });

  it("routes free Partnering when they are not paying", () => {
    expect(
      decideInbound({
        wants_to_pay: 0.1,
        wants_partnering: 0.92,
        is_support: 0.2,
        named_plan: "partnering",
      })
    ).toEqual({ action: "partnering" });
  });

  it("sends support when they are not buying", () => {
    expect(
      decideInbound({
        wants_to_pay: 0.2,
        wants_partnering: 0.1,
        is_support: 0.88,
        named_plan: "unspecified",
      })
    ).toEqual({ action: "human_support" });
  });

  it("clarifies unsettled nouls", () => {
    expect(
      decideInbound({
        wants_to_pay: 0.5,
        wants_partnering: 0.5,
        is_support: 0.5,
        named_plan: "unspecified",
      })
    ).toEqual({ action: "clarify" });
  });
});
