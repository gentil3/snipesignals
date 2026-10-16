import { Request, Response } from 'express';
import { stripe } from './stripe-client';
import { getUserByOpenId } from './db';
import { getOrCreateStripeCustomer, upsertSubscription, createPayment } from './stripe-db';
import Stripe from 'stripe';

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

if (!WEBHOOK_SECRET) {
  console.warn('[Stripe Webhook] STRIPE_WEBHOOK_SECRET not set - webhook signature verification disabled');
}

export async function handleStripeWebhook(req: Request, res: Response) {
  const sig = req.headers['stripe-signature'];

  if (!sig) {
    console.error('[Stripe Webhook] No signature header found');
    return res.status(400).send('No signature');
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('[Stripe Webhook] Signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle test events
  if (event.id.startsWith('evt_test_')) {
    console.log('[Stripe Webhook] Test event detected, returning verification response');
    return res.json({
      verified: true,
    });
  }

  console.log('[Stripe Webhook] Event received:', event.type, event.id);

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        const userId = parseInt(session.metadata?.user_id || '0');
        const productId = session.metadata?.product_id || '';
        
        if (!userId || !productId) {
          console.error('[Stripe Webhook] Missing metadata in checkout session');
          break;
        }

        // Record the payment
        if (session.payment_intent && session.customer) {
          await createPayment({
            userId,
            stripePaymentIntentId: session.payment_intent as string,
            stripeCustomerId: session.customer as string,
            amount: session.amount_total || 0,
            currency: session.currency || 'usd',
            status: 'succeeded',
            productId,
          });
        }

        console.log(`[Stripe Webhook] Payment recorded for user ${userId}`);
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`[Stripe Webhook] PaymentIntent succeeded: ${paymentIntent.id}`);
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Extract user ID from customer metadata
        const customer = await stripe.customers.retrieve(subscription.customer as string);
        
        if (customer.deleted) {
          console.error('[Stripe Webhook] Customer was deleted');
          break;
        }

        const userId = parseInt(customer.metadata?.user_id || '0');
        
        if (!userId) {
          console.error('[Stripe Webhook] No user_id in customer metadata');
          break;
        }

        await upsertSubscription({
          userId,
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          productId: subscription.items.data[0]?.price.id || '',
          status: subscription.status,
        });

        console.log(`[Stripe Webhook] Subscription ${event.type} for user ${userId}`);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        const customer = await stripe.customers.retrieve(subscription.customer as string);
        
        if (customer.deleted) {
          console.error('[Stripe Webhook] Customer was deleted');
          break;
        }

        const userId = parseInt(customer.metadata?.user_id || '0');
        
        if (!userId) {
          console.error('[Stripe Webhook] No user_id in customer metadata');
          break;
        }

        await upsertSubscription({
          userId,
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          productId: subscription.items.data[0]?.price.id || '',
          status: 'canceled',
        });

        console.log(`[Stripe Webhook] Subscription canceled for user ${userId}`);
        break;
      }

      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('[Stripe Webhook] Error processing event:', error);
    res.status(500).send('Webhook processing error');
  }
}
