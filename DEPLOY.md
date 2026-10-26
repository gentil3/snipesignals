# Publish snipesignals.com without Manus

The live site was a Manus Express app. This repo now builds a **static Vite site**. Paid plans are **crypto only** (Telegram). TypeSafe classifies inbound pay/partner/support messages when `TYPESAFE_API_KEY` is set.

## TypeSafe

1. Get a key at https://typesafe.ai
2. Copy `.env.example` → `.env` and set `TYPESAFE_API_KEY` (never commit it)
3. `pnpm typesafe:smoke` (truth table, no API)
4. `pnpm typesafe:smoke -- --live` only after you approve sending sample text to TypeSafe
5. Cloudflare Pages: `npx wrangler pages secret put TYPESAFE_API_KEY --project-name=snipesignals`
6. POST `/api/classify-inbound` `{ "message": "..." }` → judgments + action

## Fastest path: Cloudflare Pages (classify Function)

1. `npx wrangler login` (once, in your own terminal)
2. `pnpm install && pnpm exec vite build`
3. `npx wrangler pages project create snipesignals`
4. `npx wrangler pages deploy dist/public --project-name=snipesignals`
5. Custom domain: add `snipesignals.com` on that Pages project.
6. At the registrar (Global Domain Group, `ns1.globaldomaingroup.com`) point the domain at Cloudflare Pages, **or** switch nameservers to Cloudflare.

Do **not** put `/api/*` in `_routes.json` exclude — that would serve HTML instead of the Function.

## GitHub Pages (site live, classify Function needs Cloudflare)

Push to `main` and enable Pages from GitHub Actions. Apex DNS:

- `A` → `185.199.108.153` / `.109` / `.110` / `.111`
- `CNAME www` → `gentil3.github.io`

Crypto pay already works (Telegram).

## Crypto

10% off. Buttons open Telegram to @Gentil3fx with the discounted amount. Wire NOWPayments later if you want invoices on-site.
