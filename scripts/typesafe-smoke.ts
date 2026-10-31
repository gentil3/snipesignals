/**
 * Local TypeSafe smoke. Does not call the API unless TYPESAFE_API_KEY is set
 * and you pass --live. Default: print setup status and run the truth table.
 */
import { decideInbound } from "../shared/typesafe/decide";

const live = process.argv.includes("--live");
const key = process.env.TYPESAFE_API_KEY;

console.log("TypeSafe setup");
console.log("  TYPESAFE_API_KEY:", key ? "present" : "missing");
console.log("  live flag:", live);

const sample = decideInbound({
  wants_to_pay: 0.91,
  wants_partnering: 0.05,
  is_support: 0.08,
  named_plan: "annual",
});
console.log("  truth-table sample (annual pay):", sample);

if (!live) {
  console.log("Skip live API. Add TYPESAFE_API_KEY and run: pnpm typesafe:smoke -- --live");
  process.exit(0);
}

if (!key) {
  console.error("Need TYPESAFE_API_KEY for --live");
  process.exit(1);
}

const { TypeSafeClient, noul, choice } = await import("@typesafe-ai/sdk");
const client = new TypeSafeClient({ apiKey: key });
const { answers } = await client.systemOne({
  state: { message: "I want to pay with crypto for the year" },
  questions: {
    wants_to_pay: noul("Does `message` ask to pay, buy, or subscribe to Snipe Signals?"),
    named_plan: choice("Which Snipe Signals plan does `message` name?", {
      partnering: "Free Partner Access via BloFin, MEXC, or Pump.fun",
      monthly: "Paid monthly access",
      six_month: "Paid six-month access",
      annual: "Paid year up front",
      private_desk: "Private Desk 1-on-1",
      unspecified: "No specific plan named",
    }),
  },
});

console.log("  live answers:", {
  wants_to_pay: answers.wants_to_pay.noul,
  named_plan: answers.named_plan.choice,
});
