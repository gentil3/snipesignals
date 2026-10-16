import { z } from 'zod';
import { protectedProcedure, publicProcedure, router } from './_core/trpc';
import { stripe } from './stripe-client';
import { PRODUCTS, ProductKey } from '../shared/products';
import { getOrCreateStripeCustomer, getStripeCustomerId, upsertSubscription, createPayment, getUserPayments } from './stripe-db';
import { TRPCError } from '@trpc/server';

export const stripeRouter = router({
  /**
   * Create a Stripe Checkout session for a product.
   * Public so visitors can pay without a Manus login.
   */
  createCheckoutSession: publicProcedure
    .input(
      z.object({
        productKey: z.enum(['MONTHLY', 'ANNUAL', 'VIP']),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.user;
      const product = PRODUCTS[input.productKey as ProductKey];

      if (!product) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid product selected',
        });
      }

      const existingCustomerId = user ? await getStripeCustomerId(user.id) : null;

      const origin = (ctx.req.headers.origin as string | undefined) || 'https://snipesignals.com';
      const successUrl = `${origin}/?payment=success`;
      const cancelUrl = `${origin}/?payment=cancelled`;

      const sessionParams: any = {
        client_reference_id: user ? user.id.toString() : 'guest',
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: product.currency,
              product_data: {
                name: product.name,
                description: product.description,
              },
              unit_amount: product.price,
            },
            quantity: 1,
          },
        ],
        success_url: successUrl,
        cancel_url: cancelUrl,
        allow_promotion_codes: true,
        metadata: {
          user_id: user ? user.id.toString() : 'guest',
          customer_email: user?.email || '',
          customer_name: user?.name || '',
          product_id: product.id,
        },
      };

      if (existingCustomerId) {
        sessionParams.customer = existingCustomerId;
      } else if (user?.email) {
        sessionParams.customer_email = user.email;
      }

      const session = await stripe.checkout.sessions.create(sessionParams);

      if (user && !existingCustomerId && session.customer) {
        await getOrCreateStripeCustomer(user.id, session.customer as string);
      }

      return {
        sessionId: session.id,
        url: session.url,
      };
    }),

  /**
   * Get user's payment history
   */
  getPaymentHistory: protectedProcedure.query(async ({ ctx }) => {
    const payments = await getUserPayments(ctx.user.id);
    return payments;
  }),
});
