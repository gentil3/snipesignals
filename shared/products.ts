/**
 * Snipe Signals paid catalog (USD). Crypto checkout is Telegram until a processor is wired.
 */

export const PRODUCTS = {
  MONTHLY: {
    id: "snipe_signals_monthly",
    name: "Snipe Signals - Monthly",
    description: "Private Telegram channel + discussion group",
    price: 5999,
    cryptoPrice: 5999,
    currency: "usd",
    interval: "month" as const,
    displayPrice: "$59.99",
    cryptoDisplayPrice: "$59.99",
    features: ["Snipe Signals channel", "Discussion group", "No referral required"],
  },
  SEMI_ANNUAL: {
    id: "snipe_signals_6mo",
    name: "Snipe Signals - 6 Months",
    description: "Six months of paid access",
    price: 29999,
    cryptoPrice: 29999,
    currency: "usd",
    interval: "six_months" as const,
    displayPrice: "$299.99",
    cryptoDisplayPrice: "$299.99",
    features: ["Snipe Signals channel", "Discussion group", "No referral required"],
  },
  ANNUAL: {
    id: "snipe_signals_annual",
    name: "Snipe Signals - Annual",
    description: "Twelve months of paid access",
    price: 49999,
    cryptoPrice: 49999,
    currency: "usd",
    interval: "year" as const,
    displayPrice: "$499.99",
    cryptoDisplayPrice: "$499.99",
    features: ["Snipe Signals channel", "Discussion group", "No referral required"],
  },
  PRIVATE_DESK: {
    id: "snipe_signals_private_desk",
    name: "Snipe Signals - Private Desk",
    description: "1-on-1 access with direct messaging",
    price: 20000,
    cryptoPrice: 20000,
    currency: "usd",
    interval: "month" as const,
    displayPrice: "$200",
    cryptoDisplayPrice: "$200",
    features: ["Everything in paid access", "Direct 1-on-1 messaging", "Higher-touch support"],
  },
} as const;

export type ProductKey = keyof typeof PRODUCTS;
export type Product = (typeof PRODUCTS)[ProductKey];
