# Publish snipesignals.com without Manus

The live site was a Manus Express app. This repo now builds a **static Vite site** plus a **Cloudflare Pages Function** for Stripe.

## Fastest path: Cloudflare Pages (cards work)

1. `npx wrangler login` (once, in your own terminal)
2. `pnpm install && pnpm exec vite build`
3. `npx wrangler pages project create snipesignals`
4. `npx wrangler pages deploy dist/public --project-name=snipesignals`
5. In the Cloudflare dashboard → Pages → snipesignals → Settings → Environment variables:
   - `STRIPE_SECRET_KEY` = your Stripe secret
6. Custom domain: add `snipesignals.com` on that Pages project.
7. At the registrar (Global Domain Group, `ns1.globaldomaingroup.com`) point the domain at Cloudflare Pages, **or** switch nameservers to Cloudflare.

Do **not** put `/api/*` in `_routes.json` exclude — that would serve HTML instead of the Function.

## GitHub Pages (site live, card checkout needs Cloudflare)

Push to `main` and enable Pages from GitHub Actions. Apex DNS:

- `A` → `185.199.108.153` / `.109` / `.110` / `.111`
- `CNAME www` → `gentil3.github.io`

Crypto pay already works (Telegram). Card pay needs the Function + Stripe key.

## Crypto

10% off. Buttons open Telegram to @Gentil3fx with the discounted amount. Wire NOWPayments later if you want invoices on-site.
