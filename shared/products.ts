/**
 * Snipe Signals Product Catalog
 *
 * Card prices. Crypto is 10% off (handled as a Telegram invoice until a
 * crypto processor is wired). Annual is 25% off 12× monthly.
 */

export const PRODUCTS = {
  MONTHLY: {
    id: 'snipe_signals_monthly',
    name: 'Snipe Signals - Monthly',
    description: 'SnipeSignalsVIP channel + discussion group',
    price: 4999, // $49.99
    cryptoPrice: 4499, // 10% off
    currency: 'usd',
    interval: 'month' as const,
    displayPrice: '$49.99',
    cryptoDisplayPrice: '$44.99',
    features: [
      'SnipeSignalsVIP channel',
      'SnipeSignalsVIP discussion group',
      'No exchange signup required',
      'Priority support',
    ],
  },
  ANNUAL: {
    id: 'snipe_signals_annual',
    name: 'Snipe Signals - Annual',
    description: '12 months, 25% off vs monthly',
    price: 44991, // $49.99 × 12 × 0.75 = $449.91
    cryptoPrice: 40492, // 10% off
    currency: 'usd',
    interval: 'year' as const,
    displayPrice: '$449.91',
    cryptoDisplayPrice: '$404.92',
    features: [
      'SnipeSignalsVIP channel',
      'SnipeSignalsVIP discussion group',
      '25% off vs paying monthly',
      'No exchange signup required',
      'Priority support',
    ],
  },
  VIP: {
    id: 'snipe_signals_vip_desk',
    name: 'Snipe Signals - VIP 1-on-1',
    description: '1-on-1 access, questions, and personal entries / TPs / SLs',
    price: 24999, // $249.99
    cryptoPrice: 22499, // 10% off
    currency: 'usd',
    interval: 'month' as const,
    displayPrice: '$249.99',
    cryptoDisplayPrice: '$224.99',
    features: [
      'Everything in paid access',
      'Direct 1-on-1 access',
      'Questions answered',
      'Personal entries, TPs, and SLs',
    ],
  },
} as const;

export type ProductKey = keyof typeof PRODUCTS;
export type Product = (typeof PRODUCTS)[ProductKey];
